# Workflows by example

These are end-to-end call sequences. Every method name and field name comes from the catalog ([reference/index.md](reference/index.md)). Values such as ids, codes and quantities are made up. Replace them with your own.

> Not confirmed by code: the exact response bodies. They are built from the result types in the code, not copied from a live run. Read the field names and the order of the steps. Do not rely on the sample values. To verify: run the step on a development database from `wms-dev-db` and compare the `result` with the sample.

## Setup used in all examples

```bash
export BASE_URL="http://localhost:8081"
export WMS_API_KEY="wms_live_sk_..."     # see 02-authentication.md
export WAREHOUSE_ID=1000

# One helper: send a JSON-RPC request body, print the answer.
rpc() {
  curl -s -X POST "$BASE_URL/api/rpc" \
    -H "Authorization: Bearer $WMS_API_KEY" \
    -H "X-Warehouse-Id: $WAREHOUSE_ID" \
    -H "Content-Type: application/json" \
    -d "$1"
}

# A fresh idempotency key for each NEW action.
newkey() { uuidgen | tr 'A-Z' 'a-z'; }
```

Rules used in every step:

- A command gets a **new key** for each new action. When you **retry** the same action, send the **same key**.
- A `stateful_command` carries the version of the row you read, in `data`.
- Read the answer's `result.data`. For a command it sits next to `result.meta`.
- If a call fails, read `error.message` first. See [05-errors.md](05-errors.md).

The roles in the notes are the **default** roles. Your administrator may have changed them.

---

## Workflow 1. Receive goods against an ASN

You have an ASN (advance shipping notice) with a number. A truck arrives. You receive a pallet against one line, then close the receipt.

Methods: `get_asn_by_number`, `list_receipt_detail`, `generate_lpn`, `pre_validate_receive_against_asn`, `receipt_receive_against_asn`, `supervisor_override_grant`, `receipt_close`.

### Step 1. Find the ASN

`get_asn_by_number` is an exact lookup (query). It fails with a "document not found" error if the number is unknown.

```bash
rpc '{
  "jsonrpc": "2.0", "id": 1, "method": "get_asn_by_number",
  "params": { "data": { "receipt_number": "RC000123" } }
}'
```

Read from `result.data`: `id` (this is the `receipt_id`), `version` (the receipt version), `status`, `completion`, `qty_expected_total`, `qty_received_total`, `inventory_tracking_granularity`, `owner_id`.

```json
{ "jsonrpc": "2.0", "id": 1, "result": { "data": {
  "id": 42, "receipt_number": "RC000123", "version": 7,
  "status": "Open", "completion": "Pending",
  "qty_expected_total": 100.0, "qty_received_total": 0.0,
  "owner_id": 1000, "owner_code": "OWNER1", "owner_company": "Example Co"
} } }
```

(Only some fields are shown.) To search by part of a number use `lookup_asn` (`{"data": {}}` with its search fields; see the reference).

### Step 2. List the lines

```bash
rpc '{
  "jsonrpc": "2.0", "id": 2, "method": "list_receipt_detail",
  "params": { "filters": [ { "receipt_id": 42 } ], "list_options": { "limit": 100, "order_bys": "id" } }
}'
```

Each row has `id` (the line id), `receipt_line_number`, `sku`, `qty_expected`, `qty_received`, `uom`, `status`, `version`.

For the prompts the Receive screen shows for one line (pack units, lot prompts, an offered LPN), call `get_receipt_receive_context` with `{"id": <line id>}`.

### Step 3. Get a pallet code (optional)

If the pallet has no label yet, ask for the next code. `generate_lpn` is a `stateless_command` that needs no key.

```bash
rpc '{ "jsonrpc": "2.0", "id": 3, "method": "generate_lpn",
       "params": { "data": { "owner_id": 1000 } } }'
```

The answer holds `result.data.code`, for example `LPN0000001`. (Default roles: ADMIN, MANAGER.)

### Step 4. Check before you receive (optional)

`pre_validate_receive_against_asn` is a dry run. It checks the receipt status, quantity, temperature, pack multiple, dates, serials, lot attributes and holds. It writes nothing.

```bash
rpc '{
  "jsonrpc": "2.0", "id": 4, "method": "pre_validate_receive_against_asn",
  "params": { "data": { "receipt_id": 42, "sku_code": "SKU-001", "qty": 25 } }
}'
```

### Step 5. Receive

`receipt_receive_against_asn` is a `stateless_command`: the operator holds 25 units and receives 25, whatever the screen showed. It needs an idempotency key and no version. (Default roles: ADMIN, MANAGER.)

```bash
KEY=$(newkey)
rpc '{
  "jsonrpc": "2.0", "id": 5, "method": "receipt_receive_against_asn",
  "params": {
    "meta": { "idempotency_key": "'"$KEY"'" },
    "data": {
      "receipt_id": 42,
      "sku_code": "SKU-001",
      "qty": 25,
      "to_loc": "RECV-01",
      "to_lpn": "LPN0000001"
    }
  }
}'
```

Required in `data`: `receipt_id`, `sku_code`, `qty`, `to_loc`. Useful optional fields: `to_lpn`, `uom`, `lot_attributes`, `external_lot`, `serial_numbers`, `temperature`, `damage_info`, `shortage_reason`. The code describes `to_lpn` as the older, plain-text LPN input. `target_container` is the newer way to name the container (see the reference for its shape).

Answer (shape):

```json
{ "jsonrpc": "2.0", "id": 5, "result": {
  "meta": { "idempotency_replayed": false },
  "data": {
    "receipt_id": 42, "receipt_detail_id": 105, "line_number": "00001",
    "sku_code": "SKU-001", "sku_id": 900, "owner_id": 1000,
    "qty_received": 25.0, "new_version": 8,
    "completion_detail": "Partial", "completion_header": "Partial",
    "holds_applied": [],
    "collect_serials": false, "serials_to_collect_qty": 0, "open_episode": null
  }
} }
```

What to do next:

- If the call timed out, send **the same call with the same `KEY`**. You get the stored answer. See [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md).
- `holds_applied` lists holds the system put on the pallet during this receive.
- If `collect_serials` is `true`, the SKU is serial-tracked and you must capture `serials_to_collect_qty` serial numbers with `capture_serial` (it takes `data.business_ref_id` and `data.serial_number`; see [reference/inventory.md](reference/inventory.md#capture_serial)). The receipt cannot close while a capture episode is open (return code 73).
- To correct a quantity later, use `receipt_adjust_received_qty` (a `stateful_command` on the **line** version, `expected_line_version`).

### Step 6. When the system asks for an override

Suppose you receive 130 against a plan of 100 and the policy allows less excess. The call fails with HTTP 400:

```json
{ "id": 5, "error": { "message": "RF_ERROR", "data": { "req_uuid": "…", "detail": {
  "message": "…",
  "return_code": 27,
  "class": "SupervisorOverride",
  "is_overridable": true,
  "context": { "pairs": [ { "code": 27, "subject": "receipt:42/line:105" } ] }
} } } }
```

Code 27 (excess) needs a supervisor with the capability `receipt.override_qty_excess`. Do this:

```bash
# 1. A supervisor approves. Send their name and password if you cannot approve yourself.
rpc '{
  "jsonrpc": "2.0", "id": 6, "method": "supervisor_override_grant",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": {
      "pairs": [ { "code": 27, "subject": "receipt:42/line:105" } ],
      "username": "<supervisor-user>",
      "password": "<supervisor-password>"
    }
  }
}'
# -> result.data.grant_id, result.data.expires_at   (single use, a few minutes)

# 2. Send the SAME receive again, with the same key and the grant.
rpc '{
  "jsonrpc": "2.0", "id": 7, "method": "receipt_receive_against_asn",
  "params": {
    "meta": { "idempotency_key": "'"$KEY"'" },
    "data": {
      "receipt_id": 42, "sku_code": "SKU-001", "qty": 130, "to_loc": "RECV-01",
      "to_lpn": "LPN0000001",
      "override_grant_id": "<grant_id from step 1>"
    }
  }
}'
```

The grant does not change the idempotency hash, so it is the same call. (The default roles of `supervisor_override_grant` are ADMIN and MANAGER. A grant for a receipt code is accepted only from a person with the matching capability, which the default seed gives to SUPERVISOR only.)

### Step 7. Close the receipt

Read the receipt again to get the current version, then close. `receipt_close` is a `stateful_command`: you close the receipt you reviewed.

```bash
rpc '{ "jsonrpc": "2.0", "id": 8, "method": "get_asn_by_number",
       "params": { "data": { "receipt_number": "RC000123" } } }'
# -> data.version, say 9

rpc '{
  "jsonrpc": "2.0", "id": 9, "method": "receipt_close",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": { "receipt_id": 42, "expected_receipt_version": 9 }
  }
}'
```

Answer fields: `receipt_id`, `status`, `completion`, `new_version`, `close_summary`.

Possible refusals:

| You see | Meaning | Do |
|---|---|---|
| `RF_ERROR`, code 40, `context.current_state.version` | Someone changed the receipt. | Read the state. If you still want to close, send again with the new version. |
| code 71, class `SupervisorOverride` | The receipt is not fully received. | Get a grant for `{code: 71, subject: "receipt:42"}`. Send it as `data.override_grant_id`. |
| code 73 | A serial capture episode is open. | Finish or cancel it. |
| code 77 | Damage records have no final disposition. | Use `receipt_set_damage_disposition`. |

---

## Workflow 2. Put a pallet away

After receiving, the pallet stands in the receiving location. You ask the system for a storage location, then move the pallet there.

Methods: `list_inventory_balance_by_container`, `putaway_suggest_location`, `move_execute`, `putaway_release_reservation`.

### Step 1. Find the container

```bash
rpc '{
  "jsonrpc": "2.0", "id": 1, "method": "list_inventory_balance_by_container",
  "params": { "filters": [ { "code": "LPN0000001" } ] }
}'
```

Read `result.data[0].id` (the `container_id`) and `location` (where it stands now).

### Step 2. Ask for a location

`putaway_suggest_location` picks a storage location and **reserves space** there (a row in `inventory_pending_move_in`). It is a `stateless_command`. (Default roles: ADMIN, MANAGER.)

```bash
rpc '{
  "jsonrpc": "2.0", "id": 2, "method": "putaway_suggest_location",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": { "container_id": 55 }
  }
}'
```

Optional `data` fields: `exclude_locations` (a list of location codes to avoid) and `trace_detail` (`Summary` or `Full`: how much of the decision to return).

Answer fields: `location`, `pending_move_in_id`, `expires_at`, `reason`, `trace`.

```json
{ "jsonrpc": "2.0", "id": 2, "result": {
  "meta": { "idempotency_replayed": false },
  "data": { "location": "A-01-02", "pending_move_in_id": 311,
            "expires_at": "2026-10-10T12:15:00Z", "reason": null, "trace": {} }
} }
```

If `location` is `null`, no location was found. The `reason` says why.

The reservation holds the space for 15 minutes by default (see [06-rate-limits-and-limits.md](06-rate-limits-and-limits.md)). To see why a location was chosen, call `putaway_explain_location`. To give the space back before it expires, call `putaway_release_reservation` with `{"data": {"pending_move_in_id": 311}}`.

### Step 3. Move the pallet

`move_execute` is the generic move command. Give it the reservation and it runs a **directed** move. Put the key in `meta`. Put the move in `data.ctx`.

```bash
rpc '{
  "jsonrpc": "2.0", "id": 3, "method": "move_execute",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": {
      "ctx": {
        "source_type": "putaway",
        "recursive": false,
        "source_lpn": "LPN0000001",
        "dest_loc": "A-01-02",
        "pending_move_in_id": 311
      }
    }
  }
}'
```

`data.ctx.source_type` and `data.ctx.recursive` are required. `recursive: true` moves child containers too.

Answer fields: `total_qty_moved`, `fragments_processed`, `created_lpn`, `holds_added`, `holds_released`, `warnings`, `idempotency_key`.

### Step 4. Handle a refusal

| Error | Meaning | Do |
|---|---|---|
| `RF_ERROR`, code 85, `is_overridable`, `context.pairs` | A soft rule (capacity, mixing, location type) refused the system's own location. The operator stands there with the pallet. | Ask the operator to accept. Send the pairs back as `meta.acknowledged_overrides`: `[{"code": 85, "subject": "capacity"}]`. One pair per rule. |
| `context.redirect = {location, pending_move_in_id}` | The location is not usable. The system found the nearest one and reserved it. | Move to `redirect.location` with `pending_move_in_id` set to the new id. |
| code 83 or 84 | A hold on the source or destination location. | Same override flow. Or use `supervisor_override_grant` and send `data.ctx.override_grant_id`. |
| code 86 | An open serial-capture episode blocks the move. | Finish the episode first. Not overridable. |
| `context.code` = `CONTAINER_STANDS_ELSEWHERE` | The container is not where you said. `context.stands_at` says where. | Fix the source. |
| code 41 | Contention on a row. | Send the same call again. |
| `ENTITY_NOT_FOUND` or `LOCATION_NOT_FOUND` | Bad location or container. | Check the codes. |

The override example, sent again with the same key:

```json
{
  "meta": {
    "idempotency_key": "<same key as the refused call>",
    "acknowledged_overrides": [ { "code": 85, "subject": "capacity" } ]
  },
  "data": { "ctx": { "source_type": "putaway", "recursive": false,
                      "source_lpn": "LPN0000001", "dest_loc": "A-01-02",
                      "pending_move_in_id": 311 } }
}
```

Acking a pair the server did not raise is refused with a hard error (`UnknownAckSubject`).

Putaway does not run as a task. `Putaway` is a value of `task_type`, but no code creates a task of that type, and no JSON-RPC method creates generic tasks. Tasks are made only for picking and counting. So `task_claim` has nothing to claim for putaway. Use the putaway methods in this workflow.

---

## Workflow 3. Fulfil an order: create, release, wave, pick, pack, ship

The whole outbound flow in one list:

```text
shipment_order_create   -> a draft order with lines
shipment_order_validate -> dry run of the release checks (optional)
shipment_order_release  -> release (also tries to allocate stock, in the same call)
   or  wave_create / wave_add_order / wave_release  (release many orders as a group)
shipment_order_allocate -> allocate again (top-up) if release left lines short
pick_dispatch_next ... pick_commit ... pick_drop_close   (the picker)
packing_queue_list ... packing_carton_close              (the packer)
either shipment_order_ship                                (one complete order)
or dispatch_* ... stage_unit_* ... load_plan_* ... load_* ... confirm_shipment
shipment_order_shipment_history -> read the Goods Issue receipt
```

Choose one Goods Issue path. Direct shipment is for one fully picked order whose physical content belongs only to it. Use the Load path for a planned departure, shared outbound pallet or multi-order transport. Loading alone does not deduct stock.

### Step 1. Create the order

You need `owner_id` (from `list_owner`), `order_type_code` (from `list_order_type`) and `ship_to_id` (the id of an owner address, from `list_owner_address`). (Default roles: ADMIN, MANAGER.)

```bash
rpc '{
  "jsonrpc": "2.0", "id": 1, "method": "shipment_order_create",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": {
      "owner_id": 1000,
      "order_type_code": "STD",
      "ship_to_id": 77,
      "source": "Api",
      "lines": [
        { "sku_code": "SKU-001", "uom": "EA", "qty": 10 },
        { "sku_code": "SKU-002", "uom": "EA", "qty": 4 }
      ]
    }
  }
}'
```

Required in `data`: `owner_id`, `order_type_code`, `ship_to_id`, `source` (`Ui` or `Api`), `lines` (may be empty). Each line needs `sku_code`, `uom` and `qty`. The field description says `qty` is in BASE units and `uom` is the entry unit (the server resolves and stores its factor from the pack). Other optional fields: `notes`, `priority`, `external_id`, `carrier_id`, `order_number`. The format of `requested_ship_date` is not stated in the catalog, so the example leaves it out.

```json
{ "jsonrpc": "2.0", "id": 1, "result": {
  "meta": { "idempotency_replayed": false },
  "data": { "order_id": 900, "order_number": "SO000045", "version": 1, "line_ids": [1801, 1802] }
} }
```

Keep `order_id` and `version`. Edit a draft with `shipment_order_update`, `shipment_order_line_upsert` and `shipment_order_line_remove` (all `stateful_command`: they carry `expected_order_version` or `expected_line_version`).

### Step 2. Check the order (optional)

```bash
rpc '{ "jsonrpc": "2.0", "id": 2, "method": "shipment_order_validate",
       "params": { "data": { "order_id": 900 } } }'
```

It runs the release checks and writes nothing. To read the order with its lines, use `get_shipment_order_full` with `{"data": {"order_id": 900}}`.

### Step 3a. Release the order directly

`shipment_order_release` is a `stateful_command`. It validates the order, freezes the ship-to address and moves it from draft to released. In the same transaction it **always tries to allocate stock** (the allocation result is in `auto_allocation`). A failed allocation does not fail the release.

```bash
rpc '{
  "jsonrpc": "2.0", "id": 3, "method": "shipment_order_release",
  "params": {
    "meta": { "idempotency_key": "'"$(newkey)"'" },
    "data": { "order_id": 900, "expected_order_version": 1 }
  }
}'
```

Read from `result.data`: `status` (`Released` when every line was allocated, `PartiallyReleased` when not), `new_version`, `auto_allocation` (`allocated`, `short`, `picks`, `dispatched_tasks`, …) or `auto_allocation_error`.

### Step 3b. Or release through a wave

A wave groups orders and releases them one by one with a background worker. Use it instead of step 3a, not after it.

```bash
# Make a wave. Its version is in result.data.wave.version.
rpc '{ "jsonrpc": "2.0", "id": 4, "method": "wave_create",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "code": "WAVE-2026-10-10-A" } } }'

# Add the order. Needs the wave version. The answer has the new wave version.
rpc '{ "jsonrpc": "2.0", "id": 5, "method": "wave_add_order",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "wave_id": 12, "order_id": 900, "expected_wave_version": 1 } } }'

# Look before you release. Writes nothing. Shows ready and blocked orders.
rpc '{ "jsonrpc": "2.0", "id": 6, "method": "wave_preview",
       "params": { "data": { "wave_id": 12 } } }'

# Release the wave. The worker then releases each order in its own transaction.
rpc '{ "jsonrpc": "2.0", "id": 7, "method": "wave_release",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "wave_id": 12, "expected_wave_version": 2 } } }'  # use the version from the last answer

# Follow the progress.
rpc '{ "jsonrpc": "2.0", "id": 8, "method": "wave_get",
       "params": { "data": { "wave_id": 12 } } }'
```

`wave_get` returns `wave`, `progress` (`draft`, `pending`, `processing`, `released`, `blocked`, `failed`, `skipped`) and `members` (one row per order with `status`, `last_error_code`, `last_error_detail`). To retry only the blocked or failed orders, call `wave_retry_blocked` with the wave id and version. Wave errors carry `detail.error_code` (see [05-errors.md](05-errors.md)). (Default roles for the wave methods: ADMIN, MANAGER, SUPERVISOR.)

To build waves from rules instead, use the wave policy methods: `wave_policy_create`, `wave_policy_save`, `wave_policy_preview`, `wave_policy_build`.

### Step 4. Allocate again if needed

If `auto_allocation.short` is above zero, or `auto_allocation_error` is set, fix the cause (stock, policy), then:

```bash
# What would happen? Writes nothing.
rpc '{ "jsonrpc": "2.0", "id": 9, "method": "shipment_order_allocate_preview",
       "params": { "data": { "order_id": 900 } } }'

# Do it. Use the CURRENT order version (read it with get_shipment_order_full).
rpc '{ "jsonrpc": "2.0", "id": 10, "method": "shipment_order_allocate",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "order_id": 900, "expected_order_version": 2 } } }'
```

Answer fields: `allocated`, `short`, `contention_deferred`, `picks` (pick ids), `dispatched_tasks` (task ids), `status`, `new_version`, `cartonization`, `cartonization_error`.

To undo, call `shipment_order_cancel_allocation` (it deletes the picks). The system also retries allocation itself when it sees the events `process.order.allocation_contention_deferred` and `process.order.line_allocation_short` (see [07-webhooks-and-events.md](07-webhooks-and-events.md)).

### Step 5. Pick

The picker (an operator on a handheld) asks for work and works through it. All these methods are in the `outbound` context. Default roles: ADMIN, MANAGER, SUPERVISOR, OPERATOR.

**5.1 Get the next pick.** `pick_dispatch_next` is a `stateless_command`.

```bash
rpc '{ "jsonrpc": "2.0", "id": 11, "method": "pick_dispatch_next",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "work_area_code": "PICK-A" } } }'
```

All `data` fields are optional (`work_area_code`, `work_area_id`, `equipment_profile_code`, `current_location`, `current_zone`, `on_foot`). Read from `result.data`:

- `work` : the pick to do. It holds `task` (with `id` and `version`), `pick_detail_id`, `order_id`, `phase` and `packaging`. It is `null` when there is no work. Then `diagnostics` says why.
- `drop_to_close`: an open pick pallet you must close first.
- `assignment`: a pick assignment, if the policy uses them.

**5.2 Read the card.** `pick_work_get` (query) with `{"data": {"task_id": 4001}}`. It returns `source` (location, lot, quantity, SKU, container), `allowed_actions`, `instructions`, and `target` (the pallet).

`allowed_actions` lists the next steps that are allowed, for example `ConfirmLocation`, `ConfirmItem`, `ConfirmSourceLpn`, `ConfirmInternalLot`, `ConfirmLotAttributes`, `ConfirmQuantity`, `Commit`, `Short`, `Reject`, `OpenDrop`.

**5.3 Open the pick pallet** (a scanned `DRP` label), when `OpenDrop` is allowed:

```bash
rpc '{ "jsonrpc": "2.0", "id": 12, "method": "pick_drop_open",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "task_id": 4001, "drop_code": "DRP0000001" } } }'
```

The answer has `drop_id`, `drop_code`, `already_open`, `created`, `task_version`.

**5.4 Confirm what you see.** Each confirmation is a `stateless_command`. It records a fact and renews the task lease. Each answer has `task_version` and `next` (the evidence still needed).

```bash
rpc '{ "jsonrpc": "2.0", "id": 13, "method": "pick_confirm_location",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "task_id": 4001, "scanned_location": "A-01-02" } } }'
rpc '{ "jsonrpc": "2.0", "id": 14, "method": "pick_confirm_item",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "task_id": 4001, "scanned_item": "04012345678901" } } }'
rpc '{ "jsonrpc": "2.0", "id": 15, "method": "pick_confirm_qty",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "task_id": 4001, "qty": 10 } } }'
```

Which confirmations you must send depends on the picking policy. Follow `allowed_actions` and `next`. Other confirmations: `pick_confirm_source_lpn`, `pick_confirm_internal_lot`, `pick_confirm_lot_attributes`, `pick_confirm_serial`. A wrong scan comes back as `RF_ERROR` code 70 with a `context.code` such as `WRONG_SOURCE_LPN`.

**5.5 Commit.** `pick_commit` is a `stateful_command`: the operator decides on the card they saw. Send the **latest `task_version`** (from the last confirmation, or from `pick_drop_open`).

```bash
rpc '{ "jsonrpc": "2.0", "id": 16, "method": "pick_commit",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "task_id": 4001, "expected_task_version": 5 } } }'
```

The answer has `qty_picked`, `pick_status`, `line_status`, `order_status`, `task_version`, `movement_id`, `already_committed`, and `route` for assignments. If the version is old you get code 40 and the current task in `context.current_state`.

**If the shelf is short:** use `pick_short` instead, with `data.actual_qty`, `data.reason_code` (a published pick-short reason, see `pick_short_reason_list`), `task_id` and `expected_task_version`.
**If you cannot pick it now:** use `pick_reject` with `task_id`, `expected_task_version` and `reason`.

**5.6 Close the pallet.** When the pallet is full or the order is picked, `pick_drop_close` moves its whole tree from the in-transit location to its destination:

```bash
rpc '{ "jsonrpc": "2.0", "id": 17, "method": "pick_drop_close",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "drop_code": "DRP0000001", "location_code": "PACK-01" } } }'
```

Closing another operator's pallet needs the capability `pick_drop.close_foreign`, or a grant (`override_grant_id`, code 121). The answer has `balances_moved`, `location`, `already_closed`.

After a reconnect, `pick_work_get` and `pick_drop_current` (the operator's open pallet) restore the screen.

### Step 6. Pack

The packer works at a station. Default roles: ADMIN, MANAGER, SUPERVISOR, OPERATOR.

```bash
# What waits at the station? (oldest first)
rpc '{ "jsonrpc": "2.0", "id": 18, "method": "packing_queue_list",
       "params": { "data": { "station": "PACK-01", "limit": 20 } } }'

# Open the work of one unit, by its id or by the label of its container.
rpc '{ "jsonrpc": "2.0", "id": 19, "method": "packing_work_open",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "station": "PACK-01", "container_code": "DRP0000001" } } }'
# -> unit_id, job_id, job_version, obligation_id, obligation_version, action (Repack or Verify), already_open
# -> Verify also: carton_id, carton_version

# See what the package should hold and what it holds.
rpc '{ "jsonrpc": "2.0", "id": 20, "method": "packing_work_get",
       "params": { "data": { "unit_id": 3001 } } }'

# Close the verified package with its measured weight. Prints the shipping label.
rpc '{ "jsonrpc": "2.0", "id": 21, "method": "packing_carton_close",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "carton_id": 8001, "expected_version": 1,
                             "measured_gross_weight": 12.4, "printer_code": "ZEBRA-1" } } }'
```

`packing_carton_close` is a `stateful_command` on the carton version (`expected_version` = `carton_version` from `packing_work_open`). The answer has `job_status`, `order_packed`, `unit_next` (`Pack`, `Consolidate`, `Stage`, `Ship` or `None`), `weight_verdict` and `label_printer`.

`packing_work_open` decides the action from what the unit is: a box off a cart is **verified** (the steps above), a discrete pick pallet is **repacked** (below).

**Repack a pallet.** The answer has `action: "Repack"`, an `obligation_id` and an `obligation_version`, and no carton.

| Step | Method | What it does |
|---|---|---|
| 1 | `packing_carton_open` | Takes the next output carton for the job: a planned carton of the order, or an empty registered container at the station (`unit_id`, `carton_code`). `stateless_command`. |
| 2 | `packing_add` | Moves picked goods from the pallet into the open carton (`unit_id`, `carton_id`, `sku_code`, `qty`, optional `lot`). The answer has `carton_version`, `source_picked_left` and `source_empty`. `stateless_command`. |
| 3 | `packing_remove` | Takes goods out of a carton, back onto the pallet while it is open (`to_unit_id`) or into another open carton (`to_carton_id`). `stateless_command`. |
| 4 | `packing_carton_close` | Closes the output carton with its measured weight (optional `carton_full`). `stateful_command` on the carton version; `packing_add` and `packing_remove` move that version, so read the new `carton_version` from their answers. |
| 5 | `packing_source_complete` | Completes the pallet when nothing of the order is left on it (`PACK_SOURCE_NOT_EMPTY` otherwise). `stateful_command` on the obligation version. After it, nothing goes back onto the pallet (`PACK_SOURCE_CONSUMED`). |

The pallet is never completed by the last `packing_add`: only `packing_source_complete` completes it. The order is packed when every pallet is complete and every carton is closed. Serial-tracked stock is refused (`SERIAL_PACKING_NOT_SUPPORTED`).

Other packing commands:

| Method | Use |
|---|---|
| `packing_carton_void` | Void an open package. The unit goes back to the queue. |
| `packing_carton_reopen` | Reopen a closed package. Needs a supervisor grant (code 122) and a reason. |
| `packing_exception_report` | Report missing or unexpected goods. It blocks the order's packing. |

### Step 7. Confirm Goods Issue

Goods Issue is the warehouse-departure commitment. It writes shipment history, deducts picked stock, advances serials and updates order counters in one transaction.

#### Path A. Ship one complete order

Read the current order and its version with `get_shipment_order_full`. No line may already have a shipped quantity. For every line, the effective demand (`qty_ordered - qty_cancelled`) must be fully allocated and picked. The physical roots must belong only to this order, and the order must not belong to an active Load. After any partial Goods Issue, use the Load path for the follow-up shipment.

```bash
rpc '{ "jsonrpc": "2.0", "id": 22, "method": "shipment_order_ship",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "order_id": 900, "expected_order_version": 4 } } }'
```

Read from `result.data`: `goods_issue_id`, `shipped_quantities`, `journal_ids`, `serial_ids`, `new_version`, `already_committed` and `order_closed`. A complete shipment closes the order automatically.

#### Path B. Plan, load and ship a Load

Plan the Dispatch before hand-off when possible, so its route and stop intent is copied to ready units. If units already exist, review and explicitly align them through `outbound_unit_assign` or `outbound_unit_reassign`.

| Stage | Methods | Rule |
|---|---|---|
| Register transport | `transport_unit_register` | A transport resource is not a warehouse container. Keep its id, version and exact `external_ref`. |
| Plan departure | `dispatch_create`, `dispatch_stop_add`, `dispatch_add_order`, `dispatch_plan` | Add stops before orders. Send the latest Dispatch version after every mutation. Planning moves no stock. |
| Stage ready units | `stage_unit_assign`, `stage_unit_confirm` | Assignment is intent; confirmation moves the complete physical root to the reviewed Stage. Skip only when the Load policy does not require staging. |
| Build the plan | `load_plan_create`, `load_plan_generate`, `load_plan_get`, `load_plan_freeze` | Freeze the exact reviewed units and their versions. A frozen plan is not loading authorization. |
| Open the Load | `load_open` | Bind one unused active transport to the frozen plan. |
| Start and load | `load_start`, then `load_unit_review` and `load_unit_confirm` for every root | Review is read-only. Confirm only after the physical act. |
| Complete loading | `load_complete` | Every required unit must be loaded and its immutable content must still match. Status becomes `Loaded`; stock is still in the warehouse. |
| Goods Issue | `confirm_shipment` | Ships the complete Load atomically and marks the Load and Dispatch `Shipped`. |

Every state-changing method uses a fresh idempotency key and the current version returned by the preceding step. Do not retry a version conflict by changing only the version: read the current card and review the decision again.

The final call has this compact shape:

```bash
rpc '{ "jsonrpc": "2.0", "id": 23, "method": "confirm_shipment",
       "params": { "meta": { "idempotency_key": "'"$(newkey)"'" },
                   "data": { "load_id": 700, "expected_load_version": 9 } } }'
```

`result.data.orders` contains one Goods Issue result per represented order. An order can remain `PartiallyShipped` when the Load carried only part of its demand.

### Step 8. Verify the shipment and closure

Use `shipment_order_fulfilment_list` for current base quantities and `shipment_order_shipment_history` for immutable Goods Issue deltas. Use `load_get` and `dispatch_get` to verify the physical departure objects.

`shipment_order_close` is a separate administrative lifecycle command for `ADMIN` and `MANAGER`. Call it only when every line is already terminal through shipped quantity, cancelled quantity or a permitted mixture. Do not call it after a complete direct Goods Issue: `shipment_order_ship` already closes that order.

To cancel instead, use `shipment_order_cancel` before anything is picked. To cancel part of a line, use `shipment_order_line_cancel_qty` for the still-open quantity.

Picking work is still created through order or wave release; there is no generic API method that invents a picking task independently. To see the next required capability of a packing unit, read `unit_next` in the packing answer.

---

## Reading tips for all workflows

- Look up each method in the reference to see all fields, the version field and the default roles.
- Keep the `req_uuid` of any failure.
- Use `X-Correlation-Id` with one UUID for all calls of one workflow. The server logs it with every call, so support can follow the whole flow.
- Never reuse a key for a different action.
