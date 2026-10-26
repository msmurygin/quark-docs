# Adding lines to an adjustment

Use this page to say which stock the adjustment changes and what it should hold.

## Before you start

- The adjustment is saved and its status is `Draft`, `Validated` or `Approved`. A posted adjustment takes no lines.
- You know, for each line, the owner, SKU, lot, location and container (if any), and the **quantity the stock should hold after posting**. The target is the final quantity, not the difference.

## Steps

1. Open the adjustment. Its lines are in the bottom part.
2. Click `Add Line`. The [line card](25-adjustment-line-card.md) opens.
3. Fill `Owner`, `SKU`, `Lot` and `Location`. Leave `Container` empty for loose stock.
4. Type the `Target Quantity`. 0 is allowed and means "no stock here".
5. If this line has a different reason from the document, choose it in `Reason (if not the document's)`. Add a `Comment` if the reason asks for one.
6. Click `Save`. The card closes and the list shows the line.
7. Repeat for the next line.

To fill the lines from the stock itself, use [Generating lines from stock](45-generating-lines-from-stock.md).

## What the screen says

| Result | Message |
|---|---|
| Blank identity | `line {n}: SKU, unit, lot and location are all required` |
| Owner unknown | `no owner {code}` |
| SKU unknown for the owner | `owner {code} has no SKU {sku}` |
| SKU without a default unit | `SKU {sku} has no default unit; name the unit` |
| Container unknown | `no container {code}` |
| Negative target | `target quantity {n} is not a non-negative number` |
| The same stock twice | `line {n}: the same stock is already on this adjustment` |
| Reason not usable | `reason {reason} is not on the adjustment reason list` / `reason {reason} is retired` |
| Posted document | `a posted adjustment cannot be changed` |

## What changes

| What | Change |
|---|---|
| Lines | A new line with the next number, status `Pending`. Its mode is set by the system: `Existing` when the stock is on the books, `CreateIfMissing` when it is not. |
| Document | The status goes back to `Draft`. The verdicts of all lines are cleared. The version goes up. |
| Stock | Nothing. |

A target of 0 for stock that does not exist is a line that changes nothing. A target above 0 for stock that does not exist **creates** stock when the document is posted. Check the lot, SKU and location carefully.

## Related pages

- [Adjustment line card](25-adjustment-line-card.md)
- [Adjustment lines](24-adjustment-lines-list.md)
- [Validating an adjustment](46-validating-an-adjustment.md)
- API: `create_inventory_adjustment_line` (stateless; the form's save), `inventory_adjustment_add_line` (stateless), `inventory_adjustment_add_lines` (stateless; many lines in one call)
- RF terminal: none.
