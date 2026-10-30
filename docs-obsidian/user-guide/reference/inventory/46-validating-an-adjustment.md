# Validating an adjustment

Use this page to ask the system whether the document can be posted. `Validate` judges every line **without changing any stock**.

## Before you start

- The document has at least one line: `the adjustment has no lines`.
- The status is `Draft`, `Validated` or `Approved`. A posted document is not validated again.

## Steps

1. Open the adjustment.
2. Click `Validate`.
3. Read the message. If it says `Adjustment {number} is Validated`, all lines passed. If it says `Adjustment {number} is not validated: line 2 — ...`, open the list and read the column `Validation` of each `Invalid` line.
4. Fix the lines, and click `Validate` again.

## What it checks

For each line, in this order:

1. **The stock rules**, the same that `Post` applies. See the table below.
2. **The reason of the line** (its own, or the document's): it must be on the list and active.
3. **The direction**: a line that adds stock needs a reason that allows adding; a line that removes stock needs one that allows removing. A line whose change is 0 passes any reason.
4. **The comment**: if the reason asks for a comment, the line or the document must have a non-blank one.

The document becomes `Validated` only if **every** line passes. Otherwise it is `Draft`, and each refused line is `Invalid` with a code and a message.

### Line refusals

| Code | Message | Meaning |
|---|---|---|
| `INVALID_TARGET_QTY` | `target quantity {n} is not a non-negative number` | The target is negative or not a number. |
| `DUPLICATE_IDENTITY` | `the identity has more than one balance row ({ids})` | The books have two rows for one stock identity. Repair the data first. |
| `INVENTORY_IDENTITY_GONE` | `the stock this line was about is no longer there` | A `Existing` line, and the balance row has gone. |
| `BELOW_RESERVED_QTY` | `balance {id}: the target is below what is reserved (allocated {a}, picked {p})` | The target is lower than what orders have allocated or picked. |
| `STOCK_CHANGED_SINCE_COUNT` | `the stock changed since it was counted (counted against {e}, holds {c} now): count it again` | A line made by a count: the stock moved after the count. |
| `DUPLICATE_DOCUMENT_IDENTITY` | `the same identity is named by another line of the document` | Two lines name one stock. |
| `SERIAL_TRACKED_NOT_SUPPORTED` | `serial-tracked SKU {sku}: the line must name the serials it changes` | Leave the target empty and enter the individual units under `Serials to Write Off` and `Serials to Add`. |
| `LOT_UNKNOWN` | `lot {lot} does not exist for this owner and SKU` | A line that would create stock names a lot that does not exist. |
| `LOCATION_REFUSES_STOCK` | `the location refuses this stock: {message}` | A line that would create stock: the location's rules (mixing of SKUs or lots) forbid it. |
| `LOCATION_IN_TRANSIT` | `location {location} holds only open pick pallets: it is not adjusted` | The location of open pick pallets is never adjusted. |
| `CONTAINER_STANDS_ELSEWHERE` | `container {c} stands at {l}: no stock is created in it elsewhere` | A line that creates stock names a container that stands in another location. |
| `CONTAINER_HELD_BY_PICKING` | `container {c} is held by picking and stands at {l}: no stock is created in it elsewhere` | The same, and picking holds the container. |
| `REASON_UNKNOWN` | `reason {code} is not on the adjustment reason list` | |
| `REASON_INACTIVE` | `reason {code} is retired` | |
| `REASON_FORBIDS_INCREASE` | `reason {code} does not allow adding stock (+{n})` | |
| `REASON_FORBIDS_DECREASE` | `reason {code} does not allow removing stock ({n})` | |
| `REASON_REQUIRES_COMMENT` | `reason {code} requires a comment` | |

## What the screen says

| Result | Message |
|---|---|
| All lines passed | `Adjustment {number} is Validated` |
| Some refused | `Adjustment {number} is not validated: line {n} — {message}; ...` (first 3 lines, then `and {k} more`) |
| Error | `The adjustment was not validated: {error}` |
| No lines | `The adjustment was not validated: the adjustment has no lines` |
| Posted | `The adjustment was not validated: a posted adjustment cannot be changed` |

## What changes

| What | Change |
|---|---|
| Lines | Each line becomes `Valid` or `Invalid`, with `error_code` and `error_message`. The version of a line does not move. |
| Document | `Validated` (with `validated_by` and `validated_at`) or `Draft`. The approval, if any, is cleared. The version goes up. |
| Stock | Nothing. |

Validating is **not** a promise: the stock may change before the post. The post repeats the checks under lock.

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- [Return codes](92-return-codes.md)
- API: `inventory_adjustment_validate` (stateless command)
- RF terminal: none.
