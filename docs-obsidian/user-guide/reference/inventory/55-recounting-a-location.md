# Recounting a location

Use this page when a count found a difference that you do not trust, or the stock moved after the count. The location is counted again as a new attempt.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The count is `Open`. The location has the status `Variance`.
- The count still allows a recount. `Attempt` must not be above `Recounts per Location`. With the default 2, attempts 1 and 2 may be recounted and attempt 3 may not.

## Steps

From the list: tick the location with the status `Variance`, click `Recount`.
From the card: open the location, click `Recount`.

## What the screen says

| Result | Message |
|---|---|
| Sent to recount | `Location {location} goes to be counted again` |
| No row | `Tick one location` |
| Refused | `{location} was not sent to recount: {error}` (card: `The location was not sent to recount: {error}`) |
| Limit reached | `{location} has been recounted {n} time(s), the most this count allows: accept the variance or cancel the count` |
| Not a variance | `the count of {location} is {status}: there is no variance to decide` |
| Count closed | `the count is {status}, not open` |

The button is grey with `Tick a location with a variance and recounts left: the count allows no more` when the row is not a variance or the limit is reached.

## What changes

| What | Change |
|---|---|
| Old row | Status `Recounted`, `decided_at` set. |
| New row | Status `Open`, `Attempt` + 1, points to the old one. |
| Location | Stays frozen (a `Hard` count). |
| Snapshot | The stock is read again for the new attempt. |
| Task Manager | A new `Count` task for the location. |
| Counter | When the count asks for it (default: yes), the new attempt cannot be counted by the person who counted the attempt before: `a recount of {location} is counted by somebody other than the first counter`. |
| Mode | A recount is always blind, even in an `Informed` count. |
| Count | The version goes up. |

## Related pages

- [Counted location card](30-counted-location-card.md)
- [Accepting a variance](54-accepting-a-variance.md)
- [Count header](27-count-header.md) (`Recounts per Location`)
- API: `inventory_count_recount` (stateful command; version of `inventory_count_task`)
- RF terminal: the counter gets the new attempt on `CNT00`.
