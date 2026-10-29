# Deleting a count

Use this page to remove a count that nobody counted.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- Nothing was ever counted in it. Every location row is `Open` or `Cancelled`, is attempt 1, has no entry (not even a voided one) and no "empty" confirmation. A count with no location at all can be deleted too.

A count that has been counted is cancelled, not deleted. See [Cancelling a count](56-cancelling-a-count.md).

## Steps

1. Open `Management & Control > Inventory > Counts`.
2. Tick one row.
3. Click `Delete`.

The button does not look at the status. The server decides.

## What the screen says

| Result | Message |
|---|---|
| Deleted | `Count {number} deleted` |
| No row | `Tick one count to delete` |
| The list changed | `The list has moved on — tick the count again and retry` |
| Version unknown | `Tick the count again: its version is unknown` |
| Counted | `Count {number} was not deleted: count {number} has been counted: it is cancelled, not deleted` |
| Changed meanwhile | `version conflict on inventory_count {id}` (return code 40) |

## What changes

| What | Change |
|---|---|
| Count | The header, the location rows and their snapshots are deleted. |
| Locations | Those that were `Open` thaw. |
| Task Manager | The tasks of those rows are withdrawn. |
| Stock | Nothing. |

## Related pages

- [Counts list](26-counts-list.md)
- [Cancelling a count](56-cancelling-a-count.md)
- API: `inventory_count_delete` (stateful command; version of `inventory_count`)
- RF terminal: none.
