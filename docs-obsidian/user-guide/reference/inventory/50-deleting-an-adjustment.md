# Deleting an adjustment

Use this page to remove a document that was never posted, or to remove one line of it.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The adjustment is `Draft`, `Validated` or `Approved`. A posted adjustment is never deleted; reverse it ([Reversing an adjustment](49-reversing-an-adjustment.md)).

## Delete the document

From the list:

1. Open `Management & Control > Inventory > Adjustments`.
2. Tick one row.
3. Click `Delete`.

From the document:

1. Open the adjustment (it must be saved).
2. Click `Delete` in the header. The screen goes back to the list.

The button sends the version it saw. If the document changed in the meantime, the delete is refused (return code 40): read the document again.

| Result | Message |
|---|---|
| Deleted | `Adjustment {number} deleted` |
| Refused (list) | `Adjustment {number} was not deleted: {error}` |
| Refused (header) | `The adjustment was not deleted: {error}` |
| Posted | `a posted adjustment cannot be changed` |
| Unsaved document | `Save the adjustment first` |

The lines go with the document. Nothing else changes: a document that was not posted changed no stock.

## Delete one line

1. Open the adjustment. Tick the line in the bottom list and click `Delete`.
   Or open the line (click it) and click `Delete` in the line card.

| Result | Message |
|---|---|
| Removed (list) | `Line {n} deleted` |
| Removed (card) | `Line deleted` |
| Refused | `Line {n} was not deleted: {error}` / `The line was not deleted: {error}` |

Removing a line puts the document back to `Draft` and clears the verdicts of the other lines.

## Related pages

- [Adjustments list](22-adjustments-list.md)
- [Adjustment lines](24-adjustment-lines-list.md)
- API: `inventory_adjustment_delete` (stateful command; version of `inventory_adjustment`), `inventory_adjustment_remove_line` (stateful command; version of `inventory_adjustment_detail`)
- RF terminal: none.
