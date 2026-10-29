# Creating a count

Use this page to start an inventory count. You make the count first, then you add the locations to count.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- You know what to count: some locations, whole zones, or a SKU, lot or container wherever it lies.
- You know if the counter may see the system quantity (`Informed`) or not (`Blind`), and if stock may move while the count runs (`Soft`) or not (`Hard`).

## Steps

1. Open `Management & Control > Inventory > Counts`.
2. Click `New`. The header opens. The `Number` is filled (`CNT` and 7 digits). The status is `New`.
3. Choose `Mode`, `Type`, `Freeze` and `Scope`. Type `Recounts per Location` (0 to 9, default 2). Type a `Comment` if you want one.
4. **To count by item:** pick `SKUs`, `Lots` or `LPNs`. Leave the locations. To count only the item, set `Scope` to `Only the item`.
5. Click `Save`. The status becomes `Open`. The header is now read only.
6. **To count places:** add the locations. See [Adding locations to a count](52-adding-locations-to-a-count.md).

The details of every field are on [Count header](27-count-header.md).

## What the screen says

| Result | Message |
|---|---|
| `Type` is `Cycle` or `Event` | `a Cycle count is made by its policy or event, not started by hand` (or `Event`) |
| Item on a `Full` count | `only a selective or a cycle count is counted by item` |
| `Only the item` without an item | `a count of the item only needs the item: name SKUs, lots or LPNs` |
| Item found nowhere | `nothing can be counted in {item}: every location is blocked or already being counted` |
| Recounts out of range | `recounts per location are 0 to 9, not {n}` |
| Container unknown | `no container {code}` |
| Comment too long | `a comment is at most 500 characters` |

> Not confirmed by code: the exact way the screen shows an error from the save. To verify: press `Save` with `Type` set to `Event` and read the message.

## What changes

| What | Change |
|---|---|
| `inventory_count` | A new row, status `Open`, source `User`, the choices you made, version 1. |
| Locations | Nothing, when you name no item. With an item: every location that holds it and can be counted is added now (see [Adding locations to a count](52-adding-locations-to-a-count.md) for what that does). |
| Stock | Nothing. A count never changes stock by itself. |

The save is the API method `create_inventory_count`. The form carries no idempotency key, so the method makes one.

## Related pages

- [Count header](27-count-header.md)
- [Adding locations to a count](52-adding-locations-to-a-count.md)
- [Counts list](26-counts-list.md)
- [Operator guide: Inventory count](../../operator/08-inventory-count.md) (RF)
- API: `create_inventory_count` (stateless; the form's save). The API method `inventory_count_create` makes a count with its locations in one call.
- RF terminal: counters count the locations with `Inventory > Count location`.
