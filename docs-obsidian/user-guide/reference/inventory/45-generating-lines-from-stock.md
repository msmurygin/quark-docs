# Generating lines from stock

Use this page to fill an adjustment from the stock that exists: for example, every position of a zone, so that people can write the counted quantity next to each.

## Before you start

- The adjustment is saved and not posted.
- You know at least one filter: an owner, a SKU, a lot, a location or a zone.
- The filter names at most 1 000 balance rows.

## Steps

1. Open the adjustment and click `Add Line`. The [line card](25-adjustment-line-card.md) opens.
2. Fill only the filters you need: `Owner`, `SKU`, `Lot`, `Location`, `Zone (From Stock only)`. Leave the others empty. Empty means "any".
3. Click `From Stock`. Do **not** click `Save`.
4. The card closes. The lines list shows one line for every stock row that matched.
5. Open each line and type the `Target Quantity`.

## What the screen says

| Result | Message |
|---|---|
| Done | `Lines added from stock` |
| No filter | `No lines were added: name at least one of owner, SKU, lot, location or zone` |
| Too many rows | `No lines were added: the filter names more than 1000 stock rows; narrow it` |
| Unknown owner | `No lines were added: no owner {code}` |

## What changes

| What | Change |
|---|---|
| Lines | One line for each stock row, with `Target` equal to the current quantity, mode `Existing`, status `Pending`. Stock that is already on the document is skipped. Rows of one identity give one line. |
| Document | Back to `Draft`. The version goes up. |
| Stock | Nothing. A document made only of generated lines posts as "no change". |

Source: `crates/libs/wms-inventory/src/service/inventory_adjustment/generate_lines.rs`.

## Related pages

- [Adjustment line card](25-adjustment-line-card.md)
- [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md)
- API: `inventory_adjustment_generate_lines` (stateless)
- RF terminal: none.
