# Changing a line quantity

The `Ordered` quantity of a line is the one field that stays editable after the order is launched.
You can change it in two places:

- the `Ordered` box of the [line card](21-line-card.md), then `Save`;
- the `Ordered` cell of the [lines list](20-order-lines-list.md), then the `Save` of the lines toolbar.

Both places use the same rule. They pick the command by the state of the line.

## Which command runs

| State of the order and the line | Command | Who may run it |
|---|---|---|
| The order is in the New family, was never released, and the line has no reservation | `shipment_order_line_upsert` (a whole-line write) | `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` |
| The order is launched, **or** the line has a reservation | `shipment_order_line_adjust_qty` (changes the quantity only) | `ADMIN`, `MANAGER`, `SUPERVISOR` |
| The order is `Closed` or `Cancelled` | Neither. The `Ordered` field is read only. | Nobody |

The screen does not hide the field from an operator. The operator may type the number. If the second command is needed, the server refuses with a sentence that says to ask a supervisor. Hiding the field per role would be a weaker second copy of the server rule.

## Steps

1. Open the order. Check the line.
2. Change `Ordered` in the line card, or in the grid cell.
3. Click `Save` (card) or `Save` of the lines toolbar (grid).

## Rules of the quantity

- It must be greater than zero.
- It cannot go below what is already committed: the reserved quantity plus the cancelled quantity. The message is `cannot reduce qty_ordered to {new} — {committed} is already committed — release the line's reservations first (Unallocate)`. To go lower, give the reservation back first. See [Unallocating an order](37-unallocating-an-order.md).
- To take a part of the quantity away from a launched line **with a reason**, use `Cancel Qty` instead. See [Cancelling part of a line](39-cancelling-part-of-a-line.md).
- Raising the quantity of a line that was fully cancelled brings the line back to `NotAllocated`. The program works the status out from the numbers.

## What the screen says

| Where | Result | Message |
|---|---|---|
| Card | Saved by the quantity-only command | `Ordered qty set to {qty} — now {status}` |
| Card | The line is not saved yet | `Save the line first` |
| Card | Zero or empty | `Ordered quantity must be greater than zero` |
| Card | Refused, permission | `Permission denied: changing the ordered quantity of a launched or reserved line is a supervisor action — ask a supervisor to make this change` |
| Card | Refused, other reason | `Could not change the ordered quantity: {error}` |
| Card | You changed something other than `Ordered` on a frozen line | `Only the ordered quantity can change on this line — release its reservations first (Unallocate) to edit the rest` |
| Grid | Reason of a failed row (whole-line command) | `Could not save the line: {error}`, or `Permission denied: you do not have permission to edit this order's lines` |
| Grid | Reason of a failed row (quantity-only command) | `Could not change the ordered quantity: {error}`, or the supervisor sentence above |
| Grid | Saved | `Saved {n} line(s)` |
| Grid | Not saved | `Nothing saved — line {id}: {reason}` |
| Grid | Part saved | `Saved {n} line(s), {m} failed — line {id}: {reason}` |
| Grid | Somebody else changed the same line | `the ordered quantity was {seen} when you started editing and is {stored} now — someone else changed it; your {typed} is still in the cell; press Save again to apply it, or Discard changes to drop it` |

## What changes

| What | Change |
|---|---|
| Line | `Ordered` and the version are written. |
| Line status | Worked out again from the numbers. For example `Allocated` can become `Partially allocated` after a raise. |
| Order status | Worked out again in the same transaction. The order header on screen is read again. |
| Event | `process.order.line_qty_adjusted` (only for the quantity-only command). |

## Related pages

- [Line card](21-line-card.md)
- [Order lines list](20-order-lines-list.md)
- [Cancelling part of a line](39-cancelling-part-of-a-line.md)
- [Who can do what](91-who-can-do-what.md)
- API: `shipment_order_line_upsert`, `shipment_order_line_adjust_qty` (stateful commands, version of the line)
- RF terminal: none.
