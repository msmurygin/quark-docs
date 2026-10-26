# Command types and concurrency

Every method that changes data must be safe in two situations:

1. **You send the same call twice.** The network failed and you do not know if the first call worked.
2. **Two people change the same thing.** One of them decided based on data that is now old.

The API solves these with two tools: the **idempotency key** and the **version check**. Each method uses the tools it needs. The method's **command type** tells you which.

## The three command types

| Command type | What it does | Idempotency key | Version in the request |
|---|---|---|---|
| `query` | Reads. Changes nothing. | No | No |
| `stateless_command` | Changes data. The decision does not depend on what you read. | Yes | No |
| `stateful_command` | Changes data. The decision was made because of what you read. | Yes | Yes, for each row it checks |

The type is in the OpenRPC document under `x-quark-command-type`. The reference shows it as **Category** for each method.

### How to tell stateless from stateful

The project rule asks one question:

> If the user had seen different data on screen, would they still press **this** button with **these** values?

- **Yes**: the command is `stateless_command`. Example: an operator holds 25 boxes and receives 25. The number comes from the real world, not from the screen.
- **No**: the command is `stateful_command`. Example: "close this line as short". It makes sense only if the line is still short. If another person received the rest, the choice is now wrong.

| Command | Type | Why |
|---|---|---|
| `receipt_receive_against_asn` | stateless | The operator has the goods. They receive what they hold. |
| `receipt_report_damage` | stateless | A physical observation. |
| `pick_confirm_qty` | stateless | The operator scans what is in front of them. |
| `receipt_close` | stateful | "Close" depends on the totals the user reviewed. |
| `receipt_adjust_received_qty` | stateful | The new number is worked out from the number the user saw. |
| `pick_commit` | stateful | The operator decides on the card they see (the task version). |
| `shipment_order_release` | stateful | You release the order you reviewed. |

The thought experiment is the rule in `.claude/rules/api-versioning-and-idempotency.md`. The classifier lives on the **method**. A client does not choose it.

### What the catalog declares

| Declared command type | Methods |
|---|---|
| `query` | 17 |
| `stateless_command` | 125 |
| `stateful_command` | 68 |
| Not declared | 546 |

The 546 methods with no declared type are mostly standard reference-data CRUD: 372 read methods (`get_*`, `list_*`, `count_*`, and read models) and 174 write methods (`create_*`, `update_*`, `delete_*`, and some commands).

- Treat an undeclared **read** as a `query`. It is safe to repeat.
- For an undeclared **write**, the catalog gives no idempotency key and no version check. A repeat can run twice, and two editors can overwrite each other (last write wins). Write such calls so that a repeat is harmless, or check the result before you retry. For example, retry `create_*` only after a `list_*` shows the row is missing.

A handler may still refuse by a business rule (for example a status check or a unique code). "No version check" means the server does not compare a version you saw. It does not mean "no rule".

## The idempotency key

### What it is

A UUID that you make, one for each **action** (not for each HTTP try). Put it in `meta.idempotency_key`.

```json
"meta": { "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f" }
```

Make a new key (UUID v4) when the user starts a new action. Keep the same key for every retry of that action.

### What the server does with it

1. It computes a hash of your `data` (canonical JSON with sorted keys, SHA-256). Before it hashes, it removes control fields: `idempotency_key`, `acknowledged_overrides`, `override_grant_id`, and every field named `expected_..._version`. So a retry with a newer version or a new override grant is still "the same call".
2. It saves a claim for `(key, command name, hash)`.
3. It runs the command in one transaction. It saves the answer in the same transaction.
4. On a repeat with the same key and the same hash, it returns the **stored answer** and sets `meta.idempotency_replayed` to `true`. The command does not run again.

| You send | The server answers |
|---|---|
| New key | Runs the command. `idempotency_replayed: false`. |
| Same key, same data, first call finished | The stored answer. `idempotency_replayed: true`. |
| Same key, same data, first call still running | Waits up to about 6 seconds for it. If it is still running: `RF_ERROR`, return code **44**, class `Retry`. Send the same call again. |
| Same key, different command or different data | `RF_ERROR`, return code **42**, class `HardFail`. Make a new key. |
| Same key after a call that failed | The failed run released the key. The command runs again. You may keep the key. |

More facts from the code:

- The command keeps running if your connection drops. The server runs it on its own task, so a client time-out does not cancel it half way.
- If the server process dies in the middle, the claim stays empty. After 300 seconds a new request with the same key takes it over.
- The server keeps stored answers for 7 days by default (system setting `IDEMPOTENCY_TTL_DAYS`).
- The store belongs to the warehouse you selected (decision D-06 in the code comments). A key is not shared across warehouses.
- The key must be a valid UUID. Another text gives `RPC_PARAMS_INVALID`.
- For some "create" commands a missing key is allowed: the server makes one. That protects nothing on a retry. Always send your own key.

### Example: a safe repeat

First call:

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0", "id": 1, "method": "wave_create",
    "params": {
      "meta": { "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f" },
      "data": { "code": "WAVE-2026-10-10-A" }
    }
  }'
```

The connection drops before you see the answer. Send **exactly the same call** again. You get the first answer, and only one wave exists:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "meta": { "idempotency_replayed": true },
    "data": { "...": "the same data as the first answer" }
  }
}
```

## The version check

### What it is

Every row that a person reads and later changes has a `version` number. Each change adds 1. A `stateful_command` carries the version you **read**. The server changes the row only if the version is still the same. If not, someone else changed the row first and the command is refused. This is **optimistic locking**.

### Where the version goes

- The version goes in **`data`**, in a field named by the method. It does not go in `meta`.
- The field name is not always `expected_version`. The reference shows the exact name in the row **Version check**.

| Entity | Version field | Used by (examples) |
|---|---|---|
| `receipt` | `expected_receipt_version` | `receipt_close`, `receipt_cancel` |
| `receipt_detail` (a line) | `expected_line_version` | `receipt_adjust_received_qty` |
| `receipt_detail_damage` | `expected_damage_version` | `receipt_set_damage_disposition` |
| `shipment_order` | `expected_order_version` | `shipment_order_update`, `_release`, `_cancel`, `_close`, `_allocate`, `_cancel_allocation` |
| `shipment_order_line` | `expected_line_version` | `shipment_order_line_upsert`, `_remove`, `_cancel_qty`, `_adjust_qty` |
| `wave` | `expected_wave_version` | `wave_add_order`, `wave_remove_order`, `wave_cancel`, `wave_release`, `wave_retry_blocked` |
| `wave_policy` | `expected_policy_version` | `wave_policy_save`, `wave_policy_build` |
| `task` | `expected_task_version` | `pick_commit`, `pick_short`, `pick_reject`, `task_reassign`, `task_force_release` |
| `packing_carton` | `expected_version` | `packing_carton_close`, `_void`, `_reopen` |
| `pick_assignment` | `expected_version` | `pick_assignment_dissolve`, `_dissolve_supervised`, `_complete_supervised`; `pick_destination_retarget` with `assignment_id` |
| `pick_drop` (a pick pallet record; the version is read from `pick_drop_list` or `pick_drop_current`) | `expected_version` | `pick_destination_retarget` with `pick_drop_id` |
| `allocation_policy` | `expected_version` or `expected_policy_version` | `allocation_policy_publish`, `_deactivate`, `allocation_steps_reorder` |
| `allocation_policy_detail` (a step) | `expected_version`, or `steps[].expected_version` | `allocation_step_delete`, `allocation_steps_save` |
| `putaway_policy`, `putaway_policy_detail` | same pattern as allocation | `putaway_steps_save`, `putaway_steps_reorder`, `putaway_step_delete` |
| `inventory_adjustment`, `inventory_adjustment_detail` | `expected_version` | `inventory_adjustment_post`, `inventory_adjustment_update_line` |
| `inventory_count`, `inventory_count_task`, `inventory_count_policy` | `expected_version` | `inventory_count_cancel`, `inventory_count_accept`, `inventory_count_policy_save` |
| `picking_policy`, `pick_short_reason` | `expected_version` | `picking_policy_publish`, `pick_short_reason_publish` |
| others | `expected_version` | see the reference |

For a list such as `allocation_steps_save`, the version is a field of **each** element: `steps[].expected_version`. Every element must carry it. An empty list or one element without a version is refused.

Versions are **per row**, not per document. A receipt header and a receipt line have separate versions. Two people can work on two lines of one receipt without a conflict.

### Where to get the version

- From the row you read: `get_*`, `list_*`, or a read model such as `get_shipment_order_full` or `get_asn_by_number` (the field is called `version`).
- From the answer of your last command on that row (fields such as `new_version`, `version`, `task_version`, `carton_version`).

### The conflict answer

When the version is old, the server returns HTTP 400 with the error `RF_ERROR`. The `detail` holds return code **40**, class `Retry`, and the **current state** of the row:

```json
{
  "id": 1,
  "error": {
    "message": "RF_ERROR",
    "data": {
      "req_uuid": "6f3d2a7e-0f44-4a43-bb51-0a9c3c8a5d11",
      "detail": {
        "message": "receipt was modified concurrently, please retry",
        "return_code": 40,
        "class": "Retry",
        "is_overridable": false,
        "context": {
          "current_state": { "version": 9, "status": "Closed" }
        }
      }
    }
  }
}
```

What `current_state` holds depends on the domain:

| Domain | `context.current_state` |
|---|---|
| Receipt | `version`, and `status` when known |
| Shipment order and order line | `version`, `status`, and a few row fields (`order_number`; for a line `line_no`, `qty_ordered`, `qty_cancelled`) |
| Wave and wave policy | The whole row |
| Packing carton | `version`, `status` |
| Pick assignment (dissolve) | `version`, `status`, `positions` and a count of committed picks |
| Inventory count, count task, adjustment | `version`, `status` |
| Inventory count policy | `version`, `is_active` |
| Putaway policy and other generic policy saves | `version` only |
| Putaway steps save (`putaway_policy`) | No top-level `version`. A list `conflicts[]`, one item per moved step, with `step_id` and `version`. |
| Task | The whole task row |

`version` is the field to read first. All other fields are extra, and a domain may add more. The generic update of a row (no special domain code) returns only `version`.

### What to do on a conflict

1. Take the new `version` from `context.current_state`. You do not need a second read to get it.
2. Look at the rest of the state. Is your action still right? "Close the receipt" may be pointless if the receipt is already `Closed`.
3. If yes, send the call again with the new version. You may keep the same idempotency key, because the failed call released it and the version is not part of the hash.
4. If no, tell the user and stop.

Do not loop: retrying 40 with the same old version fails again.

## Errors that tell you to retry

The error class tells you what to do. See [05-errors.md](05-errors.md) for all codes.

| Return code | Class | Meaning | What to do |
|---|---|---|---|
| 40 | Retry | Version conflict | Read the new state. Decide again. Send with the new version. |
| 41 | Retry | A row lock timed out, or stock changed during a post | Send the same call again after a short wait. |
| 44 | Retry | The first call with this key is still running | Wait a moment. Send the same call with the same key. |
| 42 | HardFail | The key was used for different data | Make a new key. Check your data. |
| 70 | HardFail or UserInput | The thing is in the wrong state for this action | Read the state. Do not retry unchanged. |
| 0 | HardFail | A business message | Show `detail.message`. |

## When you do not know the result

| Situation | Do this |
|---|---|
| A command timed out or the connection dropped | Send the same call again with the **same key**. You get the stored answer, or the command runs once. |
| HTTP 5xx or `SERVICE_ERROR` on a command | Same as above. The server may have committed. The key makes a repeat safe. |
| A query timed out | Repeat it. |
| A write with no declared type timed out | Check the result with a read first. A repeat may run twice. |

## Supervisor overrides

Some stateless or stateful commands refuse an action that a supervisor may allow. The refusal has `is_overridable: true` or class `SupervisorOverride`. The `detail.context.pairs` lists what must be accepted.

- If the operator may accept it alone, repeat the command with the codes in `meta.acknowledged_overrides`.
- If a supervisor must accept it (codes 27, 28 and 71 for receipts), call `supervisor_override_grant`, then repeat the command with `override_grant_id`.

Neither `acknowledged_overrides` nor `override_grant_id` changes the idempotency hash. A repeat with or without them is the same call. See [02-authentication.md](02-authentication.md) for who may approve.

Example (a receipt close that needs a discrepancy override, then the retry):

```json
{
  "jsonrpc": "2.0", "id": 2, "method": "receipt_close",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f",
      "acknowledged_overrides": [71]
    },
    "data": { "receipt_id": 42, "expected_receipt_version": 7 }
  }
}
```

Code 71 needs the capability `receipt.override_close_discrepancy`, so a receiver without it must pass `data.override_grant_id` from a supervisor's grant instead.
