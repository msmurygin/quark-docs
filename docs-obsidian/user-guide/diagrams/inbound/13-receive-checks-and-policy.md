# Receiving: the checks and what the receipt policy changes

Every receive runs the same list of rules before any stock is written. This page shows the order, and which receipt policy field or SKU field changes which rule.
Only settings that code reads are drawn. Settings that nothing reads are listed at the end under "Stored only. It has no effect today."

## Diagram 1. The twelve rules, in order

**What this shows:** the order of the rules that run for `receipt_receive_against_asn`, `receipt_receive_blind`, `receipt_receive_blind_line` and the stock-making returns, and the code each one can refuse with. The first refusal ends the receive and rolls everything back.

```mermaid
flowchart TD
    S["Receive request"] --> R1["1 LPN given?<br/>code 25"]
    R1 --> R2["2 External lot reused with other attributes?<br/>code 33"]
    R2 --> R3["3 Strict lot attributes match the line?<br/>code 34"]
    R3 --> R4["4 Destination location on hold?<br/>code 76"]
    R4 --> R5["5 Temperature captured and in range?<br/>codes 51, 50"]
    R5 --> R6["6 Quantity a multiple of the pack?<br/>code 30"]
    R6 --> R7["7 Quantity over or short of the plan?<br/>codes 27, 28"]
    R7 --> R8["8 Dates fit the SKU shelf life?<br/>codes 45 to 49"]
    R8 --> R9["9 Shortage reason given?<br/>code 43"]
    R9 --> R10["10 Serial numbers right?<br/>codes 65, 66, 67"]
    R10 --> R11["11 Lot attributes equal the expected ones?<br/>codes 36, 35"]
    R11 --> R12["12 Auto holds are worked out<br/>no refusal"]
    R12 --> D["Stock is deposited"]
```

Reading notes:

- Rules 3 and 11 run only when the receive hits a known line (receive against an ASN). A blind receive and a return have no expected attributes.
- Rules 7 and 9 are skipped when there is no plan to compare with: blind receives and returns.
- A rule can end in one of three ways. It passes, it refuses with no way round, or it refuses with an approval request (diagram 4).
- Rule 12 does not refuse. It returns the holds to place after the stock is written (diagram 5).
- A return line is checked only when its goods are put into stock (page 12).
## Diagram 2. Receipt policy fields with three values

**What this shows:** four receipt policy fields that take `Allow`, `Warning` or `HardError`, the question each one asks, and what each value does.

```mermaid
flowchart LR
    P1["receipt_without_lpn"] --> Q1{"Receive has no LPN?"}
    P2["no_sku_on_asn"] --> Q2{"SKU is not on the receipt?"}
    P3["qty_pack_multiple_check"] --> Q3{"Qty is not a multiple of<br/>the largest pack level?"}
    P4["date_deviation_check"] --> Q4{"A date breaks the<br/>SKU shelf-life rule?"}
    Q1 --> V{"Value of the field"}
    Q2 --> V
    Q3 --> V
    Q4 --> V
    V -- Allow --> A["The receive goes on"]
    V -- Warning --> W["Refused, approval can be given"]
    V -- HardError --> H["Refused, no approval"]
```

| Field | Question | Codes | Notes |
|---|---|---|---|
| `receipt_without_lpn` | A receive with no LPN (a generated pallet code counts as an LPN). | 25 | Rule 1. |
| `no_sku_on_asn` | No line of the receipt matches the SKU, lot attributes, LPN and external lot. `Allow` creates a synthetic line with expected 0. | 24 | `Warning` returns code 24 as approvable, but the check does not read the acknowledged codes. It is refused each time (see the findings file). |
| `qty_pack_multiple_check` | The quantity typed is not a multiple of the largest pack level above 1 (the largest `base_qty` of the SKU's pack). Skipped if the SKU has no pack or no level above 1. | 30 | `Warning` makes the failure approvable, `HardError` not. |
| `date_deviation_check` | The expiration date is not later than today plus `sku.min_shelf_life_on_rec` days, or is already past (code 45); the manufactured date is older than `sku.max_age_on_rec` days (46); the `delivery_by_date` is not later than today (47); the `best_by_date` is not later than today (48); the lot has no expiration although one is required (49). | 45 to 49 | Dates come from the lot attributes typed on the receive. A missing expiration, best-by or delivery-by is first worked out from the manufactured date and the SKU's `expire_days`, `best_by_days` and `deliver_by_days`; "today" is the warehouse day. `Allow` skips every date check. |
## Diagram 3. The quantity decision

**What this shows:** how `qty_validation` and the excess and shortage fields turn "expected 100, received so far 90, now 30" into a pass, an approval request, or a refusal.

```mermaid
flowchart TD
    Q["receipt_policy.qty_validation<br/>None, Sku or Lot"] --> N{"None?"}
    N -- yes --> OK["No quantity check"]
    N -- no --> T["Totals of expected and received for the<br/>SKU on the receipt (or the lot)"]
    T --> E{"received + now, over expected by more than<br/>excess_error_percent?"}
    E -- yes --> X["Refused, code 27, no approval"]
    E -- no --> F{"over by more than<br/>excess_override_percent?"}
    F -- yes --> W["Approval asked, code 27"]
    F -- no --> S{"This is the last open line and the total<br/>is short by more than shortage_override_percent?"}
    S -- yes --> H["Approval asked, code 28, reason required, code 43"]
    S -- no --> P["Passes"]
```

| Field | What it does |
|---|---|
| `qty_validation` | `None` turns the check off. `Sku` compares the totals of the SKU on the receipt. `Lot` compares the totals of the lines with the scanned external lot, and falls back to the SKU when no line has it. |
| `excess_error` and `excess_error_percent` | When on, receiving more than this percent over the expected total is refused for good. Percent is `(received + now - expected) x 100 / expected`. |
| `excess_override` and `excess_override_percent` | When on, receiving more than this percent over the expected total asks for an approval. |
| both excess flags off and expected is 0 | The refusal is approvable. When `excess_error` is on and expected is 0, any receive is refused for good. |
| `shortage_override` and `shortage_override_percent` | When on, a total short by more than this percent asks for an approval and a shortage reason. Shortage is judged only when the receive goes to the last open line of the SKU. A shortage is never refused for good. |

Reading notes:

- Codes 27 and 28 need a supervisor capability. See diagram 4.
- The shortage reason must be an active value of the code list `shortage_reason`. Otherwise the receive is refused with code 43.
## Diagram 4. Who may approve

**What this shows:** what happens to a refusal that can be approved.

```mermaid
flowchart TD
    F["A rule refuses and marks it approvable"] --> G{"A supervisor grant covers this code?"}
    G -- yes --> OK["Accepted: event override_applied<br/>with the supervisor as authorizer"]
    G -- no --> A{"The code is in acknowledged_overrides?"}
    A -- no --> R["Refused with the approval request:<br/>is_overridable true and the pair"]
    A -- yes --> C{"The code needs a capability?<br/>27, 28 and 71 do"}
    C -- no --> OK2["Accepted: event override_applied<br/>with the caller as authorizer"]
    C -- yes --> H{"Caller holds the capability?"}
    H -- yes --> OK2
    H -- no --> S["Refused: A supervisor must authorise this"]
```

| Code | Capability needed to approve | Held by (baseline) |
|---|---|---|
| 27 excess | `receipt.override_qty_excess` | Supervisor only |
| 28 shortage | `receipt.override_qty_shortage` | Supervisor only |
| 71 close with a discrepancy | `receipt.override_close_discrepancy` | Supervisor only |
| 24, 25, 36, 45 to 49, 50, 76 | none: the operator's own confirmation is enough | none |

Reading notes:

- A grant is made by `supervisor_override_grant`. It is single use, expires in minutes, and is bound to the operator, the pairs, and the receipt (code 71) or the line (codes 27, 28). An Admin or a Manager cannot authorize these three codes.
- The RF screens offer an approval for only two codes: 28 on `RCASN01RSN` (the screen sends `acknowledged_overrides = [28]` with the reason) and 71 on `RCCLOSE_OVR` (a grant). For any other approvable refusal the RF shows the message and stays on the screen.
## Diagram 5. SKU, owner and location fields that change a receive

**What this shows:** the master data fields read by the rules 4, 5, 8, 10 and 12, and the visible result.

```mermaid
flowchart LR
    A["sku.requires_temperature_capture,<br/>sku.min_temperature, max_temperature"] --> T{"Rule 5 Temperature"}
    T --> T1["codes 51 and 50"]
    B["sku.min_shelf_life_on_rec,<br/>sku.max_age_on_rec"] --> D{"Rule 8 Dates"}
    D --> D1["codes 45 to 49 (by date_deviation_check)"]
    C["sku_serial_config: continuous_serial_tracking,<br/>allow_deferred_capture, serial_mask_format, scope"] --> S{"Rule 10 Serials"}
    S --> S1["codes 65, 66, 67, or a serial episode"]
    E["inventory holds on the destination location,<br/>inventory_hold_code enforce and overridable"] --> L{"Rule 4 Held location"}
    L --> L1["code 76: approvable or blocked"]
    H1["sku.receipt_hold_code"] --> AH{"Rule 12 Auto holds"}
    H2["owner_config.shelf_life_warning_multiplier_pct,<br/>sku.min_shelf_life_on_rec, expiration date"] --> AH
    H3["sku.warning_temperature_min, max, temperature"] --> AH
    AH --> AH1["Hold on the LPN (or the location)"]
```

| Field | Decision it changes | What you see |
|---|---|---|
| `sku.requires_temperature_capture` | When on, a temperature must be captured. | Missing: code 51, no approval. |
| `sku.min_temperature`, `sku.max_temperature` | The captured temperature must lie between them. | Code 50, approvable. |
| `sku.min_shelf_life_on_rec`, `sku.max_age_on_rec` | Limits for the dates (rule 8). `min_shelf_life_on_rec` also feeds the auto hold band. | Codes 45, 46. |
| `sku.expire_days`, `sku.best_by_days`, `sku.deliver_by_days`, and `required_expiration_date` on the lot policy | A missing date is worked out from the manufactured date. A lot that needs an expiration and has neither one nor a manufactured date to work it out from is refused. | Code 49. |
| `sku_serial_config` | With `continuous_serial_tracking` on, serials are needed: the right count (by scope `PerUnit`, `PerCase`, `PerPallet`, `PerInnerPack`), the format mask, and no duplicate for the owner. With `allow_deferred_capture` on, a receive without serials is allowed and opens a serial episode. | Codes 65, 66, 67; or `collect_serials` in the answer. |
| Inventory holds on the destination location | A hold that does not enforce is ignored. An enforcing, approvable hold asks "Receive here anyway?". An enforcing, non-approvable one says "blocked - receive somewhere else". | Code 76. |
| `sku.receipt_hold_code` | A hold with this code is placed on the LPN (the location if no LPN). The code `NewItem` holds only the first receive of the SKU. Values `None`, `Ok`, `NotHold` and empty mean no hold. | `holds_applied` in the answer. |
| `owner_config.shelf_life_warning_multiplier_pct` (200 if the owner has no config row) and `sku.min_shelf_life_on_rec` | If the expiration date (typed, or worked out from `expire_days`) is not later than today plus `min_shelf_life_on_rec` x percent / 100 days, the stock gets a `QcQuarantine` hold. | `holds_applied` |
| `sku.warning_temperature_min`, `sku.warning_temperature_max` | A captured temperature outside this band gives a `QcQuarantine` hold. | `holds_applied` |

Auto holds do not block the receive. A hold that cannot be placed refuses the whole receive (`HoldNotPlaced`).
## Stored only. It has no effect today.

These receipt policy fields are stored and shown, but no receiving code reads them.

| Field | Note |
|---|---|
| `receipt_without_po` | Nothing reads it. |
| `receipt_without_asn` | Nothing reads it. A blind receive is not judged by it. |
| `no_sku_on_po` | Nothing reads it. |
| `asn_po_qty_discrepancy` | Nothing reads it. |
| `po_qty_validation`, `po_excess_message`, `po_excess_override`, `po_excess_override_percent`, `po_excess_error`, `po_excess_error_percent`, `po_shortage_message`, `po_shortage_override`, `po_shortage_override_percent` | The purchase order checks do not exist. |
| `excess_message`, `shortage_message` | Only the policy form enables or disables them. The server does not read them. |
## Related pages

- [Policy reference: receipt policy settings](../../admin/policies/40-receipt-policy-settings.md)
- [Policy reference: SKU level settings](../../admin/policies/34-sku-level-settings.md)
- [Reference: return codes](../../reference/inbound/92-return-codes.md)
- [Receive against an ASN](11-receive-against-asn.md)
- [Serial numbers, lots and LPNs](14-serials-lots-lpn.md)
