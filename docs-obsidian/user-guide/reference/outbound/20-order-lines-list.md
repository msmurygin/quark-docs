# Order lines list

The lines list is the bottom part of the [order screen](01-order-screen-overview.md).
It shows the lines of the open order. A line asks for one SKU, in one unit, in one quantity.
The form is `shipment_order_line_list`. The data table is `shipment_order_line`. The list reads through `list_shipment_order_line`.

One column is editable in the grid: `Ordered`. Everything else is read only.

## Columns

| Label | Column | Type | Editable | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | Hidden. The row key. |
| `Line #` | `line_no` | Whole number | No | The number of the line, from 1. |
| `SKU` | `sku_code` | Text | No | The item. |
| `UOM` | `uom` | Text | No | The unit the line was entered in. |
| `Ordered` | `qty_ordered` | Decimal | **Yes** | The ordered quantity, in base units. |
| `Cancelled` | `qty_cancelled` | Decimal | No | The part that was cancelled. See [Cancelling part of a line](39-cancelling-part-of-a-line.md). |
| `Status` | `status` | Badge | No | The status of the line. See [Order statuses](90-order-statuses-and-transitions.md). |
| `SKU Description` | `sku_descr` | Text | No | The description of the SKU. No filter. |
| `Allocated` | `qty_allocated` | Decimal | No | The quantity that is reserved. |

## Toolbar

| Button | Code | What it does |
|---|---|---|
| `New` | `sol_ln` | Opens an empty [line card](21-line-card.md) in the bottom slot. See [Adding a line](32-adding-a-line.md). Grey when the order is launched or finished. |
| `Save` | `sol_lsave` | Saves the cells you changed in the `Ordered` column. See [Changing a line quantity](34-changing-a-line-quantity.md). |
| `Discard changes` | `sol_ldiscard` | Drops the cells you changed and shows what is stored. |
| `Refresh` | `sol_lr` | Reads the list again. |

Click a row to open the line card. The card has its own back arrow.

## Editing the `Ordered` cell

Type a new number in the cell. The cell is marked as changed. Nothing is written until you press `Save`.

- `Save` writes **row by row**. Each changed row is its own command with its own line version. A row that fails stays marked, with the reason in the message. The other rows are saved.
- The command depends on the line. A line that is open (the order is not launched and the line has no reservation) is written like a whole-line edit. A line that is launched or reserved is written by a second command that changes the quantity only, and that command needs the supervisor right. See [Changing a line quantity](34-changing-a-line-quantity.md).
- When a colleague changed the same line while you were typing, the version is refreshed. If the stored number is still the one you saw, your number is applied. If it is different, nothing is written, your number stays in the cell, and the message names both numbers.
- `Discard changes` says `Nothing to discard` when no cell is changed, and `Discarded changes on {n} line(s) — the grid shows what is stored` otherwise.

## Messages of the grid `Save`

- `Saved {n} line(s)`
- `Saved {n} line(s) ({h} after refreshing a changed line)`
- `Nothing saved — line {id}: {reason}`
- `Saved {n} line(s), {m} failed — line {id}: {reason}`
- `Nothing changed`
- `Open an order first`
- `the ordered quantity was {seen} when you started editing and is {stored} now — someone else changed it; your {typed} is still in the cell; press Save again to apply it, or Discard changes to drop it`

## Related pages

- [Line card](21-line-card.md)
- [Adding a line](32-adding-a-line.md)
- [Editing and removing lines](33-editing-and-removing-lines.md)
- [Changing a line quantity](34-changing-a-line-quantity.md)
- API: `list_shipment_order_line`, `shipment_order_line_upsert`, `shipment_order_line_adjust_qty`, `get_shipment_order_full`
- RF terminal: none.
