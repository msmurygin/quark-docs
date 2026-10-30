# Deleting receipts

Use this page to remove receipts that were made by mistake.
Deleting is final. The receipt, its lines and its planned boxes are removed from the database.

## Before you start

- No line of the receipt may have received goods.
- You need the right to delete receipts (`delete_receipt`, `delete_many_receipt`). By default `ADMIN`, `MANAGER` and `OPERATOR` have it.

## Steps: from the list

1. Open `Management & Control > Receiving > Receipts`.
2. Tick one or more receipts.
3. Click `Delete`.

## Steps: from the receipt

1. Open the receipt.
2. Click `Delete` in the toolbar of the header. The screen goes back to the list.

## What changes

- All receipts you ticked are deleted in **one** step. When one of them cannot be deleted, none is deleted.
- These rows are removed: the planned cases of the receipt, the planned boxes (containers), all lines of the receipt, and the receipt rows.
- The expected lot attributes, damage records, pre-advised serials and audit rows of the receipt are removed with them (database rule `ON DELETE CASCADE`).
- The status of the receipt does not matter. A receipt that is `Closed` or `Cancelled` can be deleted when nothing was received.
- Stock does not change, because nothing was received.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Cannot delete {number} — {qty} units have been received on its lines. Adjust qty to 0 or close the receipt instead.` | A line has received quantity. | Use [Adjusting received quantity](38-adjusting-received-quantity.md) to bring it to 0, or close the receipt. |
| `Cannot delete {number} — box {code} {held_by}. Close the receipt instead.` | A planned box already has stock or a pending move. | Close the receipt. |
| `receipt {id} not found` | The receipt is already gone. | Refresh the list. |

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Cancelling a receipt](43-cancelling-a-receipt.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `delete_receipt`, `delete_many_receipt`
- RF terminal: none.
