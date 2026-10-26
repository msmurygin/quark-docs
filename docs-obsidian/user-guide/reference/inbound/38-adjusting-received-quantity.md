# Adjusting received quantity

Use this page to correct the received quantity of a line, for example after a counting mistake.
You type the **correct** total. The system works out the difference.

## Before you start

- The receipt is `Open` or `InProgress`.
- The line is `Open`, `In progress` or `Closed`.
- You can run `receipt_adjust_received_qty`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` can. The web action is `generic_rpc_command`, allowed for all of them.
- You know the reason. The reason must come from the list `qty_adjust_reason`: `Keying mistake`, `Extra scan`, `Damaged while handling`, `Supplier adjustment`, `Other`.

## Steps

1. Open the receipt and tick **one** line.
2. Click `Adjust Qty`. The window `Adjust Received Qty` opens.
3. In `Correct Qty` type what the line really holds. The note says: `What the line really holds. The difference from what is recorded is posted with the reason.`
4. In `Reason` pick a reason.
5. Optional: type a `Comment`.
6. Click `Adjust`. Click `Back` to close without changing.

On success the screen shows `Line {line number} {sku}: {old quantity} → {new quantity}` and the list is read again.

## What changes

| What | Change |
|---|---|
| Line | `qty_received` becomes the quantity you typed. `completion` of the line and the receipt are recalculated. The versions of the line and the receipt go up. |
| Stock, quantity lowered | The difference is taken out of stock at the original receipt position. If less stock is left there, the correction still goes through and drains what remains. A transaction log row is written with the reason. |
| Stock, quantity raised | **Only the number on the line changes. No stock is added.** |
| Events | An adjustment event with the old and new quantity, the reason and the user. |
| `Qty Adjusted` | Not changed. That field stays 0. |

Source: `crates/libs/wms-inbound/src/service/receipt/receive/adjust_received_qty.rs`. The stock is changed only when the difference is below zero.

A correction that leaves the receipt off its plan is judged when the receipt is closed (see [Closing a receipt](42-closing-a-receipt.md)).

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Tick exactly one line` | None or several lines ticked. | Tick one line. |
| `The line list has moved on — tick the line again and retry` | The row changed after you ticked it. | Tick it again. |
| `Enter the correct quantity as a number` | `Correct Qty` is empty or not a number. | Type a number. |
| `Choose why the quantity is being corrected` | No reason. | Pick a reason. |
| `delta_qty must be != 0` | The new quantity equals the recorded one. | Type a different quantity. |
| `adjustment would make qty_received={n} < 0` | The result would be negative. | Type 0 or more. |
| `receipt was modified concurrently, please retry` | The line changed since you ticked it (version check, code 40). | Tick the line again and retry. |
| `Line {line number} was not adjusted: {error}` | Any refusal. The error follows the colon. | Read the error. |
| `invalid state for operation: status={status}, op=AdjustReceivedQty` | The receipt is not `Open` or `InProgress`. | Nothing can be adjusted. |
| A refusal of the stock part | There is nothing to take out of stock for the lowered quantity. | See `assess_reverse_receipt_qty` in `crates/libs/wms-inventory/src/inventory_service.rs`. The text comes from the inventory service. |

The list of reasons is read from the code list `qty_adjust_reason`. A reason that is not in the list is refused.

## Related pages

- [Receipt lines list](20-receipt-lines-list.md)
- [Line detail tab](21-line-detail-tab.md)
- [Closing a receipt](42-closing-a-receipt.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `receipt_adjust_received_qty`. It is a stateful command. It needs `expected_line_version`.
- RF terminal: `RCADJ01` (pick the line) and `RCADJ02` (enter the quantity).
