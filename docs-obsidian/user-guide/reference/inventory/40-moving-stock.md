# Moving stock

Use this page to move stock from one location to another, to repack it into a new container, or to merge it into a container that already exists.

## Before you start

- You are `ADMIN`, `MANAGER`, `SUPERVISOR` or `OPERATOR`. `VIEWER` cannot move stock.
- You know the position: location, SKU, lot and container.
- You know where it goes.

## Steps

1. Open `Management & Control > Inventory > Balances`. The tab `By Location` is open.
2. Find the position. Use the quick filters `Location`, `SKU` or `Owner`, or `More filters`.
3. Click the row. The [Move stock document](17-move-stock-document.md) opens.
4. Choose what to do with the container:
   - **Move the stock and keep the container.** Leave the mode on `Keep`. Pick the destination `Location`. It must differ from the source.
   - **Repack into a new container.** Press `New LPN`. A code appears. Pick the destination `Location` (it may be the same one). Press the printer button if you need the label first.
   - **Merge into a container that stands somewhere.** Press `Existing`. Pick the container. Leave `Location` empty.
5. The document starts `Move quantity` at the maximum it can move: quantity minus allocated and picked units. Type a smaller number for a partial move. A hold does not lower this maximum because a supervisor may authorise it at the next step.
6. If you want to, type a `Reason`.
7. Press `Move`.

To leave without moving, press `Cancel` or the back arrow.

## What the screen says

| Result | Message |
|---|---|
| Moved | `Moved {n} fragment(s)`, then `, {n} hold(s) released` and `, {n} hold(s) added` if holds followed the stock |
| Nothing to do | `Nothing to move — change the cell and/or the LPN` |
| Quantity wrong | `Quantity must be greater than zero`, `Quantity {r} exceeds available {a}` |
| Mode `Existing` without a container | `Pick the destination LPN to merge into` |
| Mode `New LPN` without a code | `New LPN not generated — click regenerate, or pick another mode` |
| Document too old | `Move session expired — reopen the position` |
| A supervisor is needed | `Supervisor authorization required to move held stock ({n} hold(s))` |
| Refused | `Move failed: {message}` |

After a move the screen returns to the [Balances screen](01-balances-screen-overview.md) and reads the list again.

## What changes

| What | Change |
|---|---|
| Balance rows | The stock leaves the source position and arrives at the destination. A partial move splits the row. |
| Container | A kept container gets the new location, with its child containers. A new container is created at the destination. |
| Ledger | Rows of type `Move` in [Transactions](32-transactions.md), one for each fragment, with your reason. |
| Holds | Holds that are fixed to the moved container may follow it. The message counts them. |
| Events | `process.inventory.moved`. |

Pressing `Move` twice in a row does not move twice. All presses of one open document carry the same idempotency key, so the second one gets the first answer.

## What can go wrong

| Message begins | Meaning | Fix |
|---|---|---|
| `Quantity {r} exceeds available {a}` | Part of the stock is allocated or picked, so the form stops the request before sending it. | Use the displayed maximum, or free the allocation. |
| `container move refused: container {id} still holds reserved stock` | The same, for a container. | Same. |
| `insufficient qty` | A partial quantity above what exists. | Lower the quantity. |
| `destination {code} is inactive` / `destination not found` | The location is switched off or unknown. | Choose another location. |
| `destination location blocked` / `source location blocked` | A hold or a flag forbids it. | See [Holds list](20-holds-list.md). A supervisor can accept some holds. |
| `the stock at destination {location} changed while the move was being prepared; repeat the move` | Someone else changed the destination at the same moment. | Press `Move` again. |

The full list of refusals is in `crates/libs/wms-inventory/src/movement/types.rs:445-540`.

## Related pages

- [Move stock document](17-move-stock-document.md)
- [By Location tab](10-by-location-tab.md)
- [Transactions](32-transactions.md)
- [Operator guide: Moving stock](../../operator/06-move.md) (RF)
- API: `move_execute` (stateless command). It needs an idempotency key.
- RF terminal: `Inventory > Move stock` (`INVMOV01` to `INVMOV04`).
