# Editing and removing lines

Use this page to change a line, or to take a line off an order that is not launched yet.
To change only the quantity of a line, also see [Changing a line quantity](34-changing-a-line-quantity.md).

## Before you start

- The order is in the New family and was never released.
- The line has **no reservation** (the `Allocated` column of the lines list is 0). A reserved line is frozen, even in a `New` order, because Allocate can run before the release. To open it again, give the reservation back: press `Unallocate` or delete its picks. See [Unallocating an order](37-unallocating-an-order.md) and [Deleting picks](38-deleting-picks.md).
- You have the web actions `shipment_order_line_save` and `shipment_order_line_delete`, and the API rights `shipment_order_line_upsert` and `shipment_order_line_remove`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` have them.

## Editing a line

1. In the lines list click the line. The [line card](21-line-card.md) opens.
2. Change `SKU`, `UOM`, `Ordered` or `Pick Instruction`.
3. Click `Save`. The card closes.

`Save` looks at what you changed and picks the command:

| Situation | Command |
|---|---|
| The order is open and the line has no reservation | `shipment_order_line_upsert` (whole line) |
| The order is launched, or the line is reserved, and you changed **only** `Ordered` | `shipment_order_line_adjust_qty`. See [Changing a line quantity](34-changing-a-line-quantity.md). |
| The order is launched, or the line is reserved, and you changed anything else | Refused: `Only the ordered quantity can change on this line — release its reservations first (Unallocate) to edit the rest` |
| You changed nothing | `Nothing changed`. No command is called. |

## Removing a line

1. Open the line card.
2. Click `Delete`. There is no question window.
3. The screen says `Line removed` and the card closes.

The button is grey when the order is launched or finished, or when the line has a reservation (hover text: `This line has reservations — Unallocate first to remove it`).

Lines are **not renumbered** after a removal. `Line #` is an identifier that other systems may have quoted. A gap stays.
Removing the only line that was not allocated can lift a `Partially allocated` order back to `Allocated`.

## What the screen says

| Result | Message |
|---|---|
| Saved | `Line {n} saved` |
| No change | `Nothing changed` |
| Removed | `Line removed` |
| No saved line is open | `Select a saved line first` |
| Refused on save | `Save failed: {error}` |
| Refused on delete | `Cannot remove the line: {error}` |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `line {n} has {qty} reserved — release the reservation first (Unallocate or delete its picks); to change only the quantity, use Adjust Qty` | The line has a reservation. | Unallocate, or delete the picks. |
| `'order line' can only be changed before the order is released ({why})` | The order is launched. | Use `Cancel Qty` to reduce a line. |
| `version conflict on shipment_order_line {id}` | Somebody changed the line after you opened it. | Close the card and open the line again. |
| `line {id} does not belong to order {id}` | The line is of another order. | Open the right order. |

## Related pages

- [Line card](21-line-card.md)
- [Changing a line quantity](34-changing-a-line-quantity.md)
- [Cancelling part of a line](39-cancelling-part-of-a-line.md)
- API: `shipment_order_line_upsert`, `shipment_order_line_remove` (stateful commands, version of the line)
- RF terminal: none.
