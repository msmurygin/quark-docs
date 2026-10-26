# Cancelling a count

Use this page to stop a count. The locations are released. Nothing is adjusted.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The count is `Open`. A closed or cancelled count cannot be cancelled again.
- Locations that were already decided keep their result. An accepted variance stays posted.

## Steps

1. Open the count.
2. Click `Cancel Count` in the header.

## What the screen says

| Result | Message |
|---|---|
| Cancelled | `Count {number} cancelled: its locations are released` |
| Refused | `The count was not cancelled: {error}` |
| Count not open | `the count is {status}, not open` |
| Id or version unknown | `Reopen the count: its id is unknown` / `Reopen the count: its version is unknown` |
| Changed meanwhile | `version conflict on inventory_count {id}` (return code 40) |

The button is grey with `Only an open count is cancelled` when the status is not `Open`.

## What changes

| What | Change |
|---|---|
| Count | Status `Cancelled`, `cancelled_at`. |
| Locations of the count | Every row that is `Open` or `Variance` becomes `Cancelled`. The locations thaw. |
| Task Manager | The tasks of the rows that were `Open` are withdrawn. |
| Entries | What the counters recorded stays in the database. |
| Stock | Nothing. |

## Related pages

- [Count header](27-count-header.md)
- [Deleting a count](57-deleting-a-count.md)
- API: `inventory_count_cancel` (stateful command; version of `inventory_count`)
- RF terminal: none.
