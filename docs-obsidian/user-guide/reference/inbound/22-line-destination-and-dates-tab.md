# Line destination and dates tab

The tab `Destination & Dates` is the second tab of the [line card](21-line-detail-tab.md).
The form is `receipt_detail_destination_form`. The data table is `receipt_detail`.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `To Location` | `to_loc` | Pick list of locations | No | A location code, up to 20 characters (the width of the location code; `receipt_detail.to_loc` was widened from 10 by wms-app migration 089). The code is changed to upper case when you save. Empty by default. | The planned destination. See the note below. |
| `To Lot` | `to_lot` | Text, up to 10 characters | No | Empty by default. | The lot of the line. See the note below. |
| `To LPN` | `to_lpn` | Text | No | Read only. | The pallet the goods were received onto. Set by receiving. |
| `Delivery By Date` | `delivery_by_date` | Date | No | Empty by default. | Stored only. It has no effect today. |
| `Best By Date` | `best_by_date` | Date | No | Empty by default. | Stored only. It has no effect today. |
| `Expiration Date` | `expiration_date` | Date | No | Empty by default. | Stored only. It has no effect today. |
| `Manufactured Date` | `manufactured_date` | Date | No | Empty by default. | Stored only. It has no effect today. |

## What each field affects

### To Location and To Lot

- A location that does not exist is refused by the database (`fk_receipt_detail_to_loc`, rule `ON DELETE RESTRICT`).
- Every receive writes the location and the lot back to the line (`crates/libs/wms-inbound/src/service/receipt/receive/receive_line_finalizer.rs:192-199`). A planned value is therefore replaced at the first receive.
- The receive window does not read the planned location. Its default is the receiving location of the owner (`default_receiving_loc` in `Owners > WH Settings`).
- The lot is chosen by the lot policy of the SKU when goods are received. A lot you type here is not used for that.
- Before the first receive, no rule reads either value. Treat them as notes.
- The tab `To Location` is read only for receipts of type `Sscc` and `CaseLevel` (`crates/services/web-ui-server/src/extensions/customization/receipt/detail_render_action.rs:93-98`).

### To LPN

- Set by receiving. It shows the code of the pallet (container) that received goods went into (`receive_line_finalizer.rs:132`).
- The planned pallet of the line is the field `LPN` on the [Detail tab](21-line-detail-tab.md).

### The four dates

Stored only. They have no effect today.
The date check at receiving reads the dates you scan as lot attributes (`expiration_date`, `manufactured_date`, `delivery_by_date`, `best_by_date`), not these planned dates (`crates/libs/wms-inbound/src/service/receipt/validation/rules/date_deviations.rs:40-125`).
The planned dates are written only when a line is created by an unplanned receive (`receive_against_asn.rs:790-816`).

The four fields are read only when the status of the line is `InProgress`, `OnHold`, `Closed` or `Cancelled` (`detail_render_action.rs:73-86`).

> Not confirmed by code: whether the four date fields are really read only on this tab for a line that is `In progress`. The rule reads the field `status`, which is on the Detail tab and not on this tab. To verify: open a line with status `In progress`, open this tab, and try to type a date.

## Messages

| When | Message |
|---|---|
| The location does not exist | A database refusal on `fk_receipt_detail_to_loc`. The exact text on screen is not confirmed. |
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state` |

## Related pages

- [Line detail tab](21-line-detail-tab.md)
- [Receiving a line](36-receiving-a-line.md)
- [Editing and deleting lines](34-editing-and-deleting-lines.md)
- API: `update_receipt_detail`
