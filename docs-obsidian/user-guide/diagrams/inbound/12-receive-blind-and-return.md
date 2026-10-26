# Blind receiving and customer returns

Blind receiving and returns have no planned line. The first receive makes the receipt and its first line. Later receives add lines to the same receipt.

## Diagram 1. The RF loops

**What this shows:** the screens of the blind flow and of the return flow, and the API method each one calls.

```mermaid
flowchart TD
    B1["RCBLIND01 owner code and SKU<br/>get_sku_envelope"] --> B2["RCBLIND01LINE qty, uom, location, LPN, lot<br/>receipt_receive_blind"]
    B2 -- "collect_serials" --> SN["RCSN01 capture_serial"]
    B2 -- "received" --> B3["RCBLIND01DONE"]
    B3 -- "next SKU" --> B4["RCBLIND02SKU get_sku_envelope"]
    B4 --> B5["RCBLIND02LINE<br/>receipt_receive_blind_line"]
    B5 --> B3
    B3 -- "F8" --> CL["RCCLOSE01 then receipt_close"]
    R1["RCRTN01 owner, RMA, SKU<br/>get_sku_envelope"] --> R2["RCRTN01LINE condition, reason, qty, location<br/>receipt_receive_return"]
    R2 --> R3["RCRTN01DONE"]
    R3 -- "next SKU" --> R4["RCRTN02SKU get_sku_envelope"]
    R4 --> R5["RCRTN02LINE<br/>receipt_receive_return_line"]
    R5 --> R3
    R3 -- "F8" --> CL
```

Reading notes:

- The first screen of each flow gets the SKU envelope only. Nothing is created until the line screen is submitted.
- The blind line screen offers the receipt type `Normal` only.
- The "next SKU" screens send the `receipt_id` that the first call returned. The first call is a command that creates; the next calls lock the existing receipt.
- Serial numbers are asked on `RCSN01` when the SKU needs them and none were sent with the receive. A return line does not open a serial episode.
- Damage information can be entered on the return line screen and on `RCDMG_RECV01` (page 15).

### Where it comes from

| Item | Source |
|---|---|
| Blind screens and routing | `crates/libs/wms-lib-sql/sql/rf-screens/040_uc_blind_declarative.sql:44-126` (RCBLIND01), `:147-246` (RCBLIND01LINE), `:285-361` (RCBLIND01DONE), `:389-452` (RCBLIND02SKU), `:459-556` (RCBLIND02LINE), `:586-641` (RCBLIND_SN_SUM) |
| Blind type `Normal` only | `crates/libs/wms-lib-sql/sql/rf-screens/040_uc_blind_declarative.sql:210-213` |
| Return screens and routing | `crates/libs/wms-lib-sql/sql/rf-screens/050_uc_rtn_declarative.sql:41-104`, `:122-261`, `:270-315`; `crates/libs/wms-lib-sql/sql/rf-screens/055_uc_rtn_multi_line.sql:59-152`, `:152-219`, `:245-386` |
| Methods and classes | `crates/services/app-server/src/web/rpcs/receipt_commands_rpc.rs:36-55` |

## Diagram 2. Inside `receipt_receive_blind`

**What this shows:** the first blind receive, in order. It is one transaction. The difference from the ASN receive is that the receipt and the line do not exist yet, so the checks run before the receipt is made.

```mermaid
sequenceDiagram
    autonumber
    participant RF as RF screen RCBLIND01LINE
    participant API as app-server RPC
    participant CM as ReceiveBlind
    participant VL as Validation rules
    participant DP as DepositService
    participant DB as Database

    RF->>API: receipt_receive_blind (owner_id, sku_code, qty, to_loc, to_lpn, lot)
    API->>DB: claim the idempotency key, begin
    CM->>DB: lock the destination location key
    CM->>DB: resolve the SKU and the LPN
    CM->>VL: run the rules (no receipt yet, no expected quantity)
    VL-->>CM: pass, refuse, ask for approval, or auto holds
    CM->>DB: insert receipt (status Open, number from the counter)
    CM->>DB: insert receipt_detail (status InProgress, expected 0, received qty)
    CM->>DB: event process.receipt.opened
    CM->>DP: DepositService.execute
    DP->>DB: lot, inventory_balances, container, transaction_log
    CM->>DB: receive event, serials, holds, completion, header InProgress
    CM->>DB: event process.receipt.line_received
    API->>DB: save the result and commit
    API-->>RF: receipt_id, receipt_number, line, completion, collect_serials
```

Reading notes:

- The rules of page 13 run in the same order. Quantity rules are skipped because no quantity is expected. A blind line has expected quantity 0, so its completion is `Over`.
- The header number is the next value of the `ReceiptNumber` counter (10 digits) unless the caller sends one.
- `receipt_receive_blind_line` (the next SKUs) is the same work on an existing receipt, which is locked first. It does not publish `process.receipt.opened`.
- `receipt_receive_blind` takes no receipt version and no expected version. A repeated key returns the stored result.

### Where it comes from

| Step | Source |
|---|---|
| Whole command | `crates/libs/wms-inbound/src/service/receipt/receive/receive_blind.rs:100-340` |
| Rules with `skip_qty_rollup_check = true` | `crates/libs/wms-inbound/src/service/receipt/receive/receive_blind.rs:148-176` |
| Header and first line | `crates/libs/wms-inbound/src/service/receipt/receive/receive_blind.rs:178-258` |
| Receive and finalize | `crates/libs/wms-inbound/src/service/receipt/receive/receive_blind.rs:260-330`, `crates/libs/wms-inbound/src/service/receipt/receive/receive_line_finalizer.rs:98-290` |
| Existing receipt variant | `crates/libs/wms-inbound/src/service/receipt/receive/receive_blind_line.rs:80-395` |
| Completion of a line with expected 0 | `crates/libs/wms-inbound/src/repo/completion_compute.rs:39-49` |

## Diagram 3. What the return condition changes

**What this shows:** for each return condition, where the goods go, which quantity column they count in, and which hold or disposition is set.

```mermaid
flowchart LR
    C{"condition on the return line"} -- Resaleable --> A1["Stock goes to the location typed.<br/>Counts in qty_received.<br/>No hold."]
    C -- NeedsRefurb --> A2["Stock goes to the location typed.<br/>Counts in qty_received.<br/>LPN hold CustomerReturn."]
    C -- Damaged --> A3["Stock goes to the location with code DAMAGE.<br/>Counts in qty_damaged.<br/>Disposition Hold Damaged."]
    C -- Discard --> D{"owner_config.default_discard_loc set?"}
    D -- yes --> A4["Stock goes to that location.<br/>Counts in qty_rejected.<br/>Disposition Hold Destroy."]
    D -- no --> A5["No stock is made.<br/>Counts in qty_rejected.<br/>No rules run."]
```

| Condition | Location of the stock | Quantity column | Receive bucket | Hold or disposition on the line | Source |
|---|---|---|---|---|---|
| `Resaleable` | the `to_loc` typed | `qty_received` | Received | disposition `Stock`, no hold | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:184-197`, `:265-280` |
| `NeedsRefurb` | the `to_loc` typed | `qty_received` | Received | LPN hold with code `CustomerReturn` when an LPN is given; disposition `Hold` | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:440-475`, `crates/libs/wms-inbound/src/service/receipt/damage/disposition_derivation.rs:43-66` |
| `Damaged` | the location with the code `DAMAGE` (fixed in code) | `qty_damaged` | Damaged | disposition `Hold` with `Damaged` | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:184-197`, `:265-280` |
| `Discard` | `owner_config.default_discard_loc`, or nowhere | `qty_rejected` | Rejected | disposition `Hold` with `Destroy` | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:184-197`, `:265-280` |

Reading notes:

- Rules run only when stock is made. A discarded return without `default_discard_loc` skips them.
- A `Damaged` return is checked as a "damage quarantine" destination, and a discarded one as a "discard staging" destination. The held-location rule then ignores a `Damaged` hold (or a `Destroy` hold) on that destination.
- The line also stores `return_reason` (the reason text typed) and the RMA is on the receipt header.
- `original_order_id` is accepted by `receipt_receive_return` and not used by any code.
- The receipt number of a return is `RMA-` plus the RMA. `receipt.receipt_number` has room for 10 characters, so the RMA can have at most 6.

### Where it comes from

| Item | Source |
|---|---|
| Return command | `crates/libs/wms-inbound/src/service/receipt/receive/receive_return.rs:148-215` |
| Condition to location, rules and quantity columns | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:72-262` |
| Hold for `NeedsRefurb` | `crates/libs/wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:440-475` |
| `original_order_id` declared, never read | `crates/libs/wms-inbound/src/service/receipt/receive/receive_return.rs:41` |
| Destination purposes | `crates/libs/wms-inbound/src/service/receipt/validation/rules/rule.rs:29-44`, `crates/libs/wms-inbound/src/service/receipt/validation/rules/held_location.rs:130-165` |

## Not confirmed by code

- Whether a location with the code `DAMAGE` exists in a real warehouse. The code fixes the string. To verify: list locations and search for `DAMAGE`.
- What the web screens show for the `Return` receipt type. Only the RF flow is read here.

## Related pages

- [Operator guide: blind receiving and returns](../../operator/03-blind-receiving-and-returns.md)
- [Ways a receipt starts](10-receiving-ways-to-start.md)
- [Receive checks and receipt policy](13-receive-checks-and-policy.md)
- [Damage](15-damage.md)
