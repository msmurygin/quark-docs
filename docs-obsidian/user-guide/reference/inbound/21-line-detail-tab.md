# Line detail tab

The line card opens when you click a line of the [lines list](20-receipt-lines-list.md) or press `New` there.
The card is a tabbed form (`receipt_detail_edit_form`, "Receipt Line"). Its first tab is `Detail`.
The form of the tab is `receipt_detail_fields_form`. The data table is `receipt_detail`.

![The Detail tab of line 00001 of receipt 0000000011](../../assets/screens/receipt-detail-edit-form.png)

*Caption: the card of a receipt line, tab Detail. Focus: 1 The Report Damage button in the card toolbar. 2 Qty Received, a grey field that only receiving can change.*

## Card toolbar (`receipt_detail_edit_toolbar`)

| Button | What it does |
|---|---|
| Back arrow | Returns to the lines list. |
| `Save` | Fills the pack and unit from the SKU when empty, checks the required fields, then saves the line and returns to the list. |
| `Delete` | Deletes this line and returns to the list. |
| `Report Damage` | Opens the window `Report Damage`. See [Reporting damage](39-reporting-damage.md). |

## Card tabs

| Tab | Page |
|---|---|
| `Detail` | This page. |
| `Destination & Dates` | [Line destination and dates tab](22-line-destination-and-dates-tab.md) |
| `Physical & PO` | [Line physical and PO tab](23-line-physical-and-po-tab.md) |
| `Serials` | [Line serials tab](24-line-serials-tab.md). Shown only for SKUs with continuous serial tracking. |
| `Pre-Advised Serials` | [Pre-advised serials tab](25-line-pre-advised-serials-tab.md) |
| `Expected Lot Attributes` | [Expected lot attributes tab](26-line-expected-lot-attributes-tab.md) |

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Line Number` | `receipt_line_number` | Text, up to 5 characters | Yes | Made by the system for a new line: `00001`, `00002`, and so on, counted for each receipt. Read only. Unique in the receipt. | Identifies the line. |
| `Owner` | `owner_id` | Pick list | Yes | Copied from the receipt. Read only. | The owner of the goods. |
| `SKU` | `sku` | Pick list of SKUs | Yes | A SKU of the owner. | The item. |
| `Barcode` | `barcode` | Text, up to 50 characters | No | Empty. | Stored only. It has no effect today. |
| `LPN` | `lpn` | Text | No | Shown for information. Read only. | The pallet the supplier announced for this line. |
| `Description` | (none) | Text | No | Read only. Filled from the SKU. | Shows the SKU description. Not saved. |
| `Status` | `status` | Drop-down | Yes | `Open`, `In progress`, `On hold`, `Closed`, `Cancelled`. Read only. | The status of the line. |
| `Receipt Type` | `receipt_type` | Drop-down | Yes | Copied from the receipt. Read only. | |
| `Completion` | `completion` | Drop-down | No | `Nothing received`, `Partially received`, `Fully received`, `Over receipt`. Read only. | How much of this line has arrived. |
| `Target Disposition` | `target_disposition` | Drop-down | No | `Put away to stock` (`Stock`, default), `Cross-dock`, `Hold for inspection`. Read only. | Stored only. It has no effect today. |
| `Hold Code` | `hold_code` | Drop-down | No | A hold code. Read only. Up to 20 characters. | Stored only. It has no effect today. |
| `Pack` | `pack_id` | Pick list of packs | Yes (see below) | The pack of the SKU is filled in when empty. | The pack used to convert units when you receive. |
| `UOM` | `uom` | Drop-down of units | Yes (see below) | The base unit of the pack is filled in when empty. | The unit of `Qty Expected`. |
| `Qty Expected` | `qty_expected` | Number | See below | Database default `0`. | The planned quantity. |
| `Qty Received` | `qty_received` | Number | No | `0`. Read only. | The received quantity. |
| `Qty Adjusted` | `qty_adjusted` | Number | No | `0`. Read only. | Stored only. It has no effect today. |
| `Qty Rejected` | `qty_rejected` | Number | No | `0`. Read only. | Counts as arrived goods in `Completion`. |
| `Qty Damaged` | `qty_damaged` | Number | No | `0`. Read only. | Counts as arrived goods in `Completion`. |
| `Lot Attr Check` | `lot_attr_check_mode` | Drop-down | Yes | `Lot attributes not validated` (`Disabled`, default), `Validate; supervisor override allowed` (`Advisory`), `ASN-pre-bound; hard reject on mismatch` (`Strict`). Read only. | How the lot attributes you scan are checked against the expected ones. |

The labels of `Status`, `Completion`, `Target Disposition` and `Lot Attr Check` come from code lists (`receipt_status`, `receipt_completion`, `target_disposition`, `LOTATTRMODE`).
The code list `LOTATTRMODE` and the lists of receipt type and hold codes are created by the development seed. A production tenant may use other words.

## What each field affects

### SKU

- The SKU must exist for the owner of the receipt. Otherwise the line is refused with `SKU {code} not found for owner {id}`.
- The SKU gives the pack, the unit, the lot policy and the serial settings used at receiving. It also gives the receipt policy (`Warehouse Configuration > Policies > Receipt Policy`) that judges quantity, pack multiples, dates and pallets.
- After you pick a SKU the tab is redrawn and the description is read from the SKU master.

### Barcode

Stored only. It has no effect today.
The database comment says the column is for audit: it keeps the raw scan when a SKU was found by a barcode.

### LPN

- A line gets an expected LPN only through the API method `create_receipt_detail` (parameter `expected_lpn`) or a case-level ASN. There is no field to type it on this card.
- The receive window offers this pallet as the target. A scan of this LPN finds the line.

### Status

- Set by the system. A line becomes `In progress` when goods are received. Hold, close and cancel of the receipt change every line that is not closed or cancelled. See [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md).
- The line gate of the buttons reads the status of the **receipt**, not of the line, for adding, editing and deleting.

### Completion

- Computed from the quantities: received + rejected + damaged against expected. `Pending` when nothing arrived, `Partial` when less, `Full` when equal, `Over` when more.
- A receipt can be cancelled only while every line is `Pending`.

### Target Disposition and Hold Code

Stored only. They have no effect today.
Receiving fills them from the status of the location: a location with status `Damage` gives `Hold` and the hold code `Damaged`. No other code reads them.

### Pack and UOM

- `Save` fills an empty `Pack` with the pack of the SKU, and an empty `UOM` with the base unit of that pack (the unit of the pack row that has no child), or the default unit of the SKU.
  Because of this, a normal SKU never fails on an empty `Pack`.
- A `UOM` that is not in the unit list is refused with `Code {code} not found`.
- The receive window counts in the units of the pack of the SKU. It converts them to the base unit.

### Qty Expected

- Saving a line with `Qty Expected` and `Qty Received` both empty or 0 is refused (see messages).
- The expected quantity of all lines of one SKU is added up. The receiving checks (excess, shortage, completion) work on this sum.
- The field is read only for receipts of type `Sscc` and `CaseLevel`.

### Qty Received, Qty Rejected, Qty Damaged

- Read only. `Qty Received` grows with `Receive` and changes with `Adjust Qty`.
- `Qty Damaged` grows only when the owner action for the severity is `Reject`.
- `Qty Rejected` is written only by the RF return flow. In the web screens it stays 0.

### Qty Adjusted

Stored only. It has no effect today.
It is never written after the line is created. `Adjust Qty` changes `Qty Received`, not `Qty Adjusted` (a search for writers of `qty_adjusted` found only the default and the event name).

### Lot Attr Check

- The web screens cannot change it. A line made on the web has `Disabled`. Other values come only from the API.
- `Strict`: the lot attributes you scan must equal the expected ones, or receiving is refused (code 34). `Advisory`: a difference is refused with code 36, which a supervisor can allow when the attribute allows overrides.

## Rules for editing

- These fields are read only at all times: `Line Number`, `Owner`, `Status`, `Receipt Type`, `Description`.
- After goods are received, `PO` and `PO Detail` on the tab [Physical & PO](23-line-physical-and-po-tab.md) are read only.
- `Save` of an **existing** line sends only the fields you changed. The server accepts only these fields for a line: `sku`, `barcode`, `qty_expected`, `uom`, `pack_id`, `to_loc`, `to_lot`, the four dates, `temperature`, `po_id`, `po_detail_id`, `reason_code`, `return_type`, `return_reason`, `rma`, `external_receipt_number`, `external_receipt_line_number`, `external_lot`.
- A line of a `Closed` or `Cancelled` receipt cannot be saved. A line of a receipt on hold can be saved.

## Messages

| When | Message |
|---|---|
| `Owner` is empty on `Save` | `Owner id is required` |
| `SKU` is empty on `Save` | `Sku is required` |
| `Pack` is still empty after the fill-in | `Pack id is required` |
| `UOM` is still empty after the fill-in | `Uom is required` |
| `Qty Expected` and `Qty Received` are both empty or 0 | `Specify either qty_expected (ASN promise) or qty_received (physical receive) — both cannot be empty.` |
| The SKU is not a SKU of the owner | `SKU {code} not found for owner {id}` |
| The unit is not in the unit list | `Code {code} not found` |
| The receipt is `Closed`, `Cancelled` or `OnHold` when you add a line | `receipt {id} is {status} — cannot add receipt line in its current lifecycle state` |
| The receipt is `Closed` or `Cancelled` when you edit a line | `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state` |

## Related pages

- [Receipt lines list](20-receipt-lines-list.md)
- [Adding a line](33-adding-a-line.md)
- [Editing and deleting lines](34-editing-and-deleting-lines.md)
- [Receiving a line](36-receiving-a-line.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `get_receipt_detail_line`, `create_receipt_detail`, `update_receipt_detail`
- RF terminal: `RCASN01LINE` (receive a line).
