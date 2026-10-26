# Reversing an adjustment

Use this page to undo a posted adjustment. A posted document never changes. A **reversal** is a new document that sets the stock back to what it was before.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The adjustment is `Posted`, it changed at least one line, and nobody has reversed it yet. One document can be reversed once.

## Steps

1. Open the posted adjustment.
2. Click `Reverse`. The message says `Reversal {number} made: open it, say why on its header, validate and post it`.
3. Open the new document (find it in the list: the field `Reversal Of` holds the number of the original, and the original now shows `Reversed By`).
4. Type the `Comment` that says why. The reason `REVERSAL` requires a comment.
5. Click `Save`, then `Validate`, then `Post`. See [Validating an adjustment](46-validating-an-adjustment.md) and [Posting an adjustment](48-posting-an-adjustment.md).

## What the reversal is

- Source `Reversal`, reason `REVERSAL` (adds and removes allowed, comment required, no approval needed), status `Draft`.
- One line for each line of the original that changed stock. The identity is the same. The **target is the quantity before** the original post, read from the ledger (`qty_before`).
- The reversal sets the stock back to that quantity **whatever happened in between**. If the stock changed since the original post, the reversal overwrites those changes. Check the column `Effect` before you post it.

Source: `crates/libs/wms-inventory/src/service/inventory_adjustment/reverse.rs`, `crates/libs/wms-lib-sql/sql/wms-app/migrations/054_an_adjustment_is_reversed_by_another.sql`.

## What the screen says

| Result | Message |
|---|---|
| Made | `Reversal {number} made: open it, say why on its header, validate and post it` |
| Error | `The adjustment was not reversed: {error}` |
| Not posted | `only a posted adjustment can be reversed` |
| Reversed already | `the adjustment is already reversed by {number}` |
| Nothing changed | `the adjustment changed no stock: there is nothing to reverse` |
| A ledger row without a quantity before | `line {n}: its ledger row {code} records no quantity before; it cannot be reversed` |

The button `Reverse` is grey unless the document can be reversed. Its text is `Only a posted adjustment is reversed, and only once`.

## What changes

| What | Change |
|---|---|
| New document | A `Draft` with a new number and the lines described above. |
| Original | Unchanged. It shows `Reversed By`. |
| Stock | Nothing until the reversal is posted. |

A database index allows one reversal for each document (`uq_inventory_adjustment_one_reversal`).

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- [Adjustment reasons](31-adjustment-reasons.md)
- API: `inventory_adjustment_reverse` (stateless command)
- RF terminal: none.
