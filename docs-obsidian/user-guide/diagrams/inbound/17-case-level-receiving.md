# Receiving case by case

In case-level receiving the supplier announces every pallet and every case on the ASN. The operator scans one case label at a time. This page shows how such a receipt is made, how one scan is handled, and which settings change the result.

## Diagram 1. Loading a case-level ASN

**What this shows:** what `receipt_create_case_level_asn` checks and writes. It is one transaction. No RF screen calls it; it is an API method for the ERP.

```mermaid
flowchart TD
    A["receipt_create_case_level_asn"] --> B["Check the payload"]
    B --> C["Resolve granularity<br/>and unplanned-case policy"]
    C --> D["Receipt number:<br/>given, or next counter value"]
    D --> E["Insert receipt header, Open"]
    E --> F["One receipt_detail per ASN line"]
    F --> G["Pallet and case containers,<br/>one receipt_detail_case per case"]
    G --> H["Expected lot attributes<br/>of each line"]
    H --> I["Line expected qty equals<br/>sum of its cases?"]
    I --> J["Event process.receipt.case_level_loaded"]
```

Reading notes:

- The payload check refuses: an owner that does not exist or is not of type `Own`; no lines; a line with no pallets; a pallet with no cases; a blank SKU, pallet code or case label; a pallet code or case label used twice in the payload; a case with expected quantity of 0 or less; a SKU that does not exist for the owner.
- Granularity is the first value found of: the payload, `owner_config.default_inventory_tracking_granularity`, and at last `Aggregate`. The code has a slot for an operator choice, but it always passes none.
- The unplanned-case policy (what to do with a scanned case that is not on the ASN) is the first value found of: the payload and `owner_config.default_unplanned_case_on_asn`. If the granularity is `Pallet` or `Case` and none is found, the load is refused. With `Aggregate` the policy is ignored.
- Both values are saved on the receipt header and do not change later.
- The method is a `stateless_command`, open to `Admin` and `Manager`.
## Diagram 2. The RF screens

**What this shows:** the RF screens of case-level receiving and the method each one calls.

```mermaid
flowchart TD
    A["RCCASE01 receipt number<br/>get_case_level_asn_by_number"] --> B["RCCASE02 scan a case label<br/>get_case_envelope"]
    B --> C["RCCASE02LINE qty, unit, location<br/>receipt_receive_case_level_line"]
    C -- "line complete" --> D["RCCASE_DONE"]
    C -- "otherwise" --> B
    D -- "Enter" --> B
    D -- "F8" --> E["RCCLOSE01 then receipt_close"]
    B -- "F6" --> F["RCCASE_REPAL<br/>receipt_replace_pallet"]
    B -- "F7" --> G["RCCASE_CANCEL<br/>receipt_cancel_planned_case"]
```

Reading notes:

- `RCCASE01` refuses a receipt whose granularity is not exactly `Case`. A `Pallet` receipt is told to use "Receive Against ASN".
- After each scan the screen goes back to `RCCASE02`. When the response says `line_complete`, it goes to `RCCASE_DONE` first.
- On `RCCASE02`, `F2` on the Case field lists the receipt's unreceived cases (`find_unreceived_cases`). The picker `RCCASE_LIST`, which nothing opened, was removed.
- Closing uses the normal close screens (page 16).
## Diagram 3. What one scan does

**What this shows:** how `receipt_receive_case_level_line` treats a scanned case label.

```mermaid
flowchart TD
    A["Scan of a case label"] --> B["Lock receipt, not Closed<br/>or Cancelled"]
    B --> C{"Granularity<br/>Aggregate?"}
    C -- yes --> X1["Refused"]
    C -- no --> D{"Case planned<br/>on this receipt?"}
    D -- yes --> E{"Case status<br/>Planned?"}
    E -- no --> X2["Refused: already received<br/>or cancelled"]
    E -- yes --> F["Convert qty to base units<br/>check against case qty"]
    F --> G["Case Received, line qty up,<br/>deposit, event"]
    D -- no --> H{"unplanned_case_on_asn<br/>HardError?"}
    H -- yes --> X3["Refused"]
    H -- no --> I["Find the line by SKU,<br/>or make one if policy allows"]
    I --> J["New case row, already Received,<br/>deposit, event"]
```

Reading notes:

- The planned path: `qty` in unit `CS` is multiplied by the planned quantity of that case. Any other unit is taken as base units. If the result differs from the planned case quantity, the policy check of Diagram 4 runs.
- The unplanned path needs the SKU in the request. It does not convert units: the typed `qty` is used as it is, even when the unit is `CS` (see the findings file).
- Both paths deposit through `DepositService`. With granularity `Case`, the stock goes on the case container. With `Pallet`, it goes on the parent pallet.
- The lot attributes typed by the operator are merged over the expected ones of the line. The operator value wins.
- A case in the unplanned path gets no parent pallet. `RCCASE_REPAL` can place it later.
- After a planned scan the case and its pallet become `Active`, the line copies the location, pallet and unit, and the event `process.receipt.case_received` is published.
- `line_complete` is true when the line `qty_received` is at least `qty_expected`.
- The 12 rules of page 13, serial capture, auto holds and damage information are not part of this command.
- The scan does not change the receipt status, the line status or the completion. They are recomputed by `receipt_close` (see the findings file).
## Diagram 4. What the settings change

**What this shows:** which setting decides each outcome of a scan, and what the operator sees.

```mermaid
flowchart LR
    S1["owner_config.default_inventory_<br/>tracking_granularity"] --> D1["Where stock goes:<br/>case LPN or pallet LPN"]
    S2["unplanned_case_on_asn<br/>on the receipt"] --> D2["Case not on the ASN:<br/>refuse or accept"]
    S3["receipt policy<br/>no_sku_on_asn"] --> D3["SKU not on the ASN:<br/>refuse or add a line"]
    S4["receipt policy excess and<br/>shortage fields"] --> D4["Counted qty differs<br/>from the case qty"]
    S5["SKU lot policy"] --> D5["Which lot the stock gets"]
```

| Setting | What it changes | What the operator sees | Source |
|---|---|---|---|
| Receipt granularity `Aggregate`, `Pallet`, `Case` | `Aggregate`: case scans are refused. `Case`: stock on the case container. `Pallet`: stock on the parent pallet. The RF entry screen accepts only `Case`. | A refusal text on `RCCASE01` or `RCCASE02LINE`. | `crates/libs/wms-inbound/src/service/receipt/case_level/commands/receive_case_level_line.rs:211-219`, `:758-783`, `crates/services/app-server/src/web/rpcs/case_level_rpc.rs:457-473` |
| `unplanned_case_on_asn` (`Allow`, `Warning`, `HardError`) | `HardError` refuses a case that is not on the ASN. `Allow` and `Warning` both accept it. `Warning` asks nothing. | A refusal, or a received case that is marked unplanned. | `crates/libs/wms-inbound/src/service/receipt/case_level/commands/receive_case_level_line.rs:1011-1035` |
| `receipt_policy.no_sku_on_asn` | For an unplanned case whose SKU has no line: `HardError` refuses. Other values make a new line. | A refusal naming the policy. | `crates/libs/wms-inbound/src/service/receipt/case_level/commands/receive_case_level_line.rs:1112-1138` |
| `excess_error` and `excess_error_percent` | A planned case counted above the plan by more than the percent is refused. Not approvable. | Code 27, no approval. | `crates/libs/wms-inbound/src/service/receipt/validation/rules/case_qty.rs:40-62` |
| `excess_override` and `excess_override_percent` | Above this percent the scan needs an approval. | Code 27, "Receive Anyway?". | `crates/libs/wms-inbound/src/service/receipt/validation/rules/case_qty.rs:63-75` |
| `shortage_override` and `shortage_override_percent` | A case counted short by more than the percent needs an approval. | Code 28, "Receive Anyway?". | `crates/libs/wms-inbound/src/service/receipt/validation/rules/case_qty.rs:77-89` |
| SKU lot policy `lot_creation` and attributes | As on page 14. Attributes typed at the scan are merged over the expected ones. | Lot attribute prompts on `RCCASE02LINE`. | `crates/libs/wms-inventory/src/deposit/deposit.rs:710-797` |

Reading notes:

- The quantity check is skipped when the counted quantity equals the planned case quantity, or when the planned case quantity is 0 or less.
- Codes 27 and 28 need the capability for the code (supervisor), or a supervisor grant for the line of the case. The grant must name `receipt:<id>/line:<detail id>`.
- There is no shortage error percent. A case that is short is refused only through `shortage_override`.
- `receipt_without_asn`, `receipt_without_po` and the PO fields are not read here either (page 13).
## Diagram 5. Exceptions: move cases, cancel a case

**What this shows:** the two exception commands and what each one changes.

```mermaid
flowchart TD
    A["RCCASE_REPAL<br/>old pallet, new pallet,<br/>optional case labels"] --> B["Both pallets are on<br/>this receipt?"]
    B -- "new pallet unknown" --> C["New pallet container made"]
    B -- "new pallet on another receipt" --> X["Refused"]
    B -- ok --> D["Cases get a new parent pallet"]
    D --> E["Event process.receipt.pallet_replaced"]
    F["RCCASE_CANCEL<br/>case label, reason"] --> G{"Case status<br/>Planned?"}
    G -- no --> X2["Refused"]
    G -- yes --> H["Case Cancelled,<br/>line expected qty reduced"]
    H --> I["Completion recomputed,<br/>audit row, event"]
```

Reading notes:

- `receipt_replace_pallet` changes only the link between the case and its pallet. It does not look at the case status. It does not move stock and it does not change the location of the containers.
- With a list of case labels, every label must be on the old pallet. If one is not, the whole call fails.
- `receipt_cancel_planned_case` needs a reason. The reason is saved in `receipt_audit` and in the event. The case container is kept.
- The cancelled case no longer counts in the parent line's expected quantity. The command bumps the line version and recomputes line/header completion in the same transaction.
- Closing a receipt marks case rows still in `Planned` as `NotReceived`. Their planned container rows are retained for audit and later disposal hygiene.
- Roles: move cases is open to the floor roles. Cancel a case is for `Supervisor`, `Manager` and `Admin`.
## Related pages

- [Reference: expected boxes tab](../../reference/inbound/16-expected-boxes-tab.md)
- [Reference: moving and cancelling expected boxes](../../reference/inbound/44-moving-and-cancelling-expected-boxes.md)
- [Policy reference: receipt policy settings](../../admin/policies/40-receipt-policy-settings.md)
- [Ways a receipt starts](10-receiving-ways-to-start.md)
- [Receive checks and receipt policy](13-receive-checks-and-policy.md)
- [Serial numbers, lots and LPNs](14-serials-lots-lpn.md)
- [Hold, adjust, close and cancel](16-hold-adjust-close-cancel.md)
