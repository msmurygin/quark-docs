# Creating an adjustment

Use this page to start a document that will correct stock. You make the header first, then you add lines.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- You know the reason. Look at [Adjustment reasons](31-adjustment-reasons.md): the reason decides if you may add or remove stock, if a comment is needed and if someone must approve.

## Steps

1. Open `Management & Control > Inventory > Adjustments`.
2. Click `New`. The document opens. The `Number` is already filled (`ADJ` and 7 digits). The status is `Draft`.
3. Choose the `Reason`.
4. If the reason asks for a comment, type it in `Comment`. Type a comment in any case if you want one.
5. Click `Save`.
6. Add the lines. See [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md).

## What the screen says

| Result | Message |
|---|---|
| Reason empty | The form does not save. The field `Reason` is required. |
| Reason not usable | `reason {reason} is not on the adjustment reason list` or `reason {reason} is retired` |
| Comment missing | `reason {reason} requires a comment` |
| Number too long | `an adjustment number is at most 20 characters` |
| `REVERSAL` chosen | `a reversal is made from the posted adjustment it reverses, not by hand` |

> Not confirmed by code: how the window words the check on an empty `Reason`. To verify: press `Save` with an empty `Reason`.

## What changes

| What | Change |
|---|---|
| `inventory_adjustment` | A new row: status `Draft`, source `Manual`, version 1, the number shown. |
| Stock | Nothing. |
| Counter | The number comes from the counter `inventory_adjustment` when you press `New`. |

The save is the API method `create_inventory_adjustment`. It makes its own idempotency key, because a form save carries none.

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md)
- [Adjustments list](22-adjustments-list.md)
- API: `create_inventory_adjustment` (stateless). The same work is `inventory_adjustment_create`, which can also take lines in the same call.
- RF terminal: none.
