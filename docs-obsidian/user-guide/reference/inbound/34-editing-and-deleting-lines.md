# Editing and deleting lines

Use this page to change the plan of a line, or to remove lines that are not needed.
Quantities that were received are not changed here. Use [Adjusting received quantity](38-adjusting-received-quantity.md) for that.

## Before you start

- To edit a line the receipt must not be `Closed` or `Cancelled`.
- To delete a line the receipt must be `Open` or `InProgress`.
- By default only `ADMIN` has the API rights `update_receipt_detail`, `delete_receipt_detail` and `delete_many_receipt_detail`. `MANAGER` and `OPERATOR` can press the buttons, but the server refuses the call. See [Who can do what](91-who-can-do-what.md).
- `Save` of a line also needs the web action `receipt_detail_pre_save`, which `OPERATOR` does not have by default.

## Steps: edit a line

1. Open the receipt and click the line.
2. Change the fields on the tabs of the card. Fields that are grey cannot be changed.
3. Click `Save`. The screen goes back to the lines list.

## Steps: delete lines

From the list:

1. Tick one or more lines in the lines list.
2. Click `Delete`.

From the card:

1. Open the line.
2. Click `Delete` in the card toolbar. The screen goes back to the list.

## What changes

- Edit: the table `receipt_detail` is updated with the fields you changed. The version of the line is not changed. Stock is not changed.
- Delete: the line rows are removed. The expected lot attributes, damage records and pre-advised serials of the line are removed with them.
- Several lines are deleted in one step. If one line is refused, none is deleted.
- The command **does not check the received quantity** of the line. A web check that did this was removed from the screen (`wms-meta-ui` migration 065) and the command did not take it over (`crates/libs/wms-inbound/src/service/receipt/planning/delete_receipt_line.rs`).

> Not confirmed by code: what stops the deletion of a line that has received goods. To verify: on a test receipt receive 1 unit on a line, then tick the line and press `Delete` as `ADMIN`. If the line is deleted, the received quantity is lost from the receipt. If a foreign key refuses it, note the message.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state` | The receipt is `Closed` or `Cancelled`. | Nothing can be edited. |
| `receipt {id} is {status} — cannot delete receipt line in its current lifecycle state` | The receipt is `OnHold`, `Closed` or `Cancelled`. | Release the hold first. |
| `receipt_detail id={id} not found` | The line was removed by someone else. | Refresh the list. |
| An "unknown field" refusal | The line form sent a field the server does not accept for lines. | Only the fields listed on [Line detail tab](21-line-detail-tab.md) can be saved. |
| `Forbidden(...)` | Your role may not run the command. | Ask an administrator. |

## Related pages

- [Line detail tab](21-line-detail-tab.md)
- [Adding a line](33-adding-a-line.md)
- [Adjusting received quantity](38-adjusting-received-quantity.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `update_receipt_detail`, `delete_receipt_detail`, `delete_many_receipt_detail`
- RF terminal: none.
