# Removing a location from a count

Use this page to take a location off a count before anybody counted it.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The row is `Open`, it is attempt 1, no counter has recorded anything in it (not even a voided entry), and the counter has not said "empty".

## Steps

1. Open the count.
2. Tick the location in the bottom list.
3. Click `Remove Location`.

## What the screen says

| Result | Message |
|---|---|
| Removed | `{location} is no longer counted: it is released` |
| No row | `Tick one location` |
| The list changed | `The locations have moved on — tick the location again and retry` |
| Version unknown | `Tick the location again: its version is unknown` |
| Counted or started | `{location} stays in the count: {location} has been counted: it stays in the count — accept, recount or cancel` |
| Not open | `{location} stays in the count: the count of {location} is {status}: it is not being counted` |
| Count not open | `{location} stays in the count: the count is {status}, not open` |

## What changes

| What | Change |
|---|---|
| Row | Deleted, with its snapshot. |
| Location | Thawed (the flag `CycleCountActive` is cleared). |
| Task Manager | The task of the location is withdrawn. |
| Count | If no live row is left and at least one is `Closed`, the count closes. Otherwise its version goes up. |

A location that was counted, or recorded anything, cannot be removed. Decide it ([Accepting a variance](54-accepting-a-variance.md)), or [cancel the count](56-cancelling-a-count.md).

## Related pages

- [Count locations](28-count-locations-list.md)
- [Adding locations to a count](52-adding-locations-to-a-count.md)
- API: `inventory_count_remove_location` (stateful command; version of `inventory_count_task`)
- RF terminal: none.
