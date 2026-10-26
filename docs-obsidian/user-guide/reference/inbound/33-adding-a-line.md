# Adding a line

Use this page to add an expected line (SKU and planned quantity) to a saved receipt.

## Before you start

- The receipt is saved and its status is `Open` or `InProgress`. The `New` button is grey when the receipt is `OnHold`, `Closed` or `Cancelled`.
- The SKU exists for the owner of the receipt.
- You need the web action `receipt_detail_pre_save` and the API right `create_receipt_detail`. By default only `ADMIN` and `MANAGER` have both. `OPERATOR` has the API right but not the action. See [Who can do what](91-who-can-do-what.md).

## Steps

1. Open the receipt.
2. In the lines list click `New`.
   The line card opens. `Line Number` is filled (`00001`, `00002`, ...). `Owner`, `Receipt Type` and `Status` are copied from the receipt.
3. On the tab `Detail` pick the `SKU`.
4. Type `Qty Expected`.
5. Optional: change `Pack` and `UOM`. If you leave them empty, `Save` fills them from the SKU.
6. Optional: fill the tabs `Destination & Dates` and `Physical & PO`.
7. Click `Save`. The screen goes back to the lines list.
8. Optional: add expected lot attributes (see [Adding expected lot attributes](35-adding-expected-lot-attributes.md)). The line must be saved first.

![The card of a receipt line](../../assets/screens/receipt-detail-edit-form.png)

*Caption: the line card. Focus: 1 The card toolbar with Save, Delete and Report Damage. 2 The read only counters.*

## What changes

| What | Change |
|---|---|
| Table `receipt_detail` | One new row: `status` `Open`, `completion` `Pending`, all received quantities `0`, `lot_attr_check_mode` `Disabled`, `target_disposition` `Stock`. |
| The line number | Taken from the counter `receipt_line_number` of this receipt, five digits. |
| The header | Not changed. The completion of the receipt is not recalculated. |
| Inventory | Nothing changes. Goods are received later. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Owner id is required`, `Sku is required` | A required field is empty. | Fill it. |
| `Specify either qty_expected (ASN promise) or qty_received (physical receive) — both cannot be empty.` | `Qty Expected` is empty or 0. | Type a quantity. |
| `SKU {code} not found for owner {id}` | The SKU is not a SKU of this owner. | Pick another SKU. |
| `receipt {id} is {status} — cannot add receipt line in its current lifecycle state` | The receipt is `OnHold`, `Closed` or `Cancelled`. | Release the hold, or use another receipt. |
| `a planned line starts with nothing done — status cannot be set when planning (got InProgress)` | See the note below. | |

> Not confirmed by code: that adding a line to a receipt in status `InProgress` fails. The `New` button copies the status of the receipt into the new line (binding of the button `rcd_dn`, `parent_copy_fields` = `status`, `receipt_type`, `owner_id`). The server accepts a new line only with status `Open` (`crates/libs/wms-inbound/src/service/receipt/planning/add_receipt_line_plan.rs:143-171`). To verify: receive part of one line so the receipt is `InProgress`, press `New` in the lines list, fill `SKU` and `Qty Expected`, press `Save`. If the message above appears, a line can be added to a receipt in progress only through the API.

## Related pages

- [Line detail tab](21-line-detail-tab.md)
- [Receipt lines list](20-receipt-lines-list.md)
- [Editing and deleting lines](34-editing-and-deleting-lines.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `create_receipt_detail`. The optional parameter `expected_lpn` names the supplier pallet.
- RF terminal: none. The RF terminal does not add lines to a receipt. A scan of a SKU that is not on the receipt creates a line when the policy allows (see [Receiving a line](36-receiving-a-line.md)).
