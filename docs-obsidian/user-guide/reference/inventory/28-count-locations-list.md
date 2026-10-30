# Count locations

The locations list is the bottom part of the count document. It has **one row for each counting of a location**. A location that is recounted gets a second row for the second attempt.
The form is `inventory_count_task_list_form`. The data object is `inventory_count_task_row`, over the table `inventory_count_task`. The list is read by `inventory_count_list_tasks`.

A click on a row opens the [counted location card](30-counted-location-card.md) in the same place (TargetForm to `inventory_count_location_tabbed`, slot `slot_2`).

## Columns

All columns are read only.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The id of the counting (task). |
| `Location` | `location` | Text, up to 20 characters | Yes | The location code. |
| `Status` | `status` | Text | Yes | `Open`, `Variance`, `Closed`, `Recounted`, `Cancelled`. See below. |
| `Attempt` | `attempt_no` | Whole number | Yes | 1 for the first count, 2 for the first recount, and so on. |
| `Differences` | `differences` | Whole number | Yes | How many stock identities in the location did not match. 0 until the location has been counted. |
| `Empty` | `empty_confirmed` | Yes or no | Yes | Yes when the counter said "nothing here". |
| `Counted At` | `counted_at` | Date and time | Yes | When the counter finished. |
| `Decided At` | `decided_at` | Date and time | Yes | When the supervisor decided the variance (accepted it or sent it to be recounted). |
| `Adjustment` | `adjustment_id` | Whole number | Yes | The id of the adjustment that corrected the variance. Empty when none. |
| `Cause` | `variance_cause` | Text | Yes | Why the count differed, in words of the list `count_variance_cause`. `Within tolerance` when it was accepted on its own. Empty until accepted. |
| `Cause Comment` | `variance_comment` | Text | Yes | The supervisor's comment to the cause. |
| `Version` | `version` | Whole number | No | The version of the counting. Sent by `Accept Variance`, `Recount` and `Remove Location`. |
| `Recount Allowed` | `recount_allowed` | Yes or no | No | Computed: yes while `Attempt` is not above `Recounts per Location`. |

## Location statuses

| Status | Meaning |
|---|---|
| `Open` | The location is waiting to be counted, or is being counted. |
| `Variance` | It was counted and something differs from the snapshot. It waits for a decision. |
| `Closed` | It matched, or the variance was accepted and adjusted. Final. |
| `Recounted` | A supervisor sent it to be recounted. A new row with the next `Attempt` replaces it. Final for this row. |
| `Cancelled` | The count was cancelled before the location was decided. Final. |

A location can hold only one live row (`Open` or `Variance`) at a time, in the whole warehouse (unique index `uq_inventory_count_task_live_location`). A second count cannot take a location that is still being counted by another.

## Toolbar buttons

| Button | Enabled when | What it does | Task page |
|---|---|---|---|
| `Add Locations` | The count is `Open` (grey text `Save the count first; a closed or cancelled count takes no more locations`) | Opens the [Add Locations window](29-add-locations-dialog.md). | [Adding locations to a count](52-adding-locations-to-a-count.md) |
| `Remove Location` | The ticked row is `Open` (grey text `Tick a location that is still to be counted`) | Takes the location off the count and thaws it. | [Removing a location from a count](53-removing-a-location-from-a-count.md) |
| `Accept Variance` | The ticked row is `Variance` (grey text `Tick a location with a variance`) | Adjusts the stock to what was counted. | [Accepting a variance](54-accepting-a-variance.md) |
| `Recount` | The ticked row is `Variance` and `Recount Allowed` is on (grey text `Tick a location with a variance and recounts left: the count allows no more`) | Sends the location to be counted again. | [Recounting a location](55-recounting-a-location.md) |
| `Refresh` | Always | Reads the list again. | |

Messages of the buttons:

| Button | Success | Failure |
|---|---|---|
| `Remove Location` | `{location} is no longer counted: it is released` | `{location} stays in the count: {error}` |
| `Accept Variance` | `Location {location}: the variance is adjusted` | `The variance of {location} was not accepted: {error}` |
| `Recount` | `Location {location} goes to be counted again` | `{location} was not sent to recount: {error}` |

For all three: no row ticked: `Tick one location`; the list changed: `The locations have moved on — tick the location again and retry`; version unknown: `Tick the location again: its version is unknown`.

## What it affects

- A location of a `Hard` count is frozen (flag `CycleCountActive`) from the moment it is added until it is `Closed`, `Cancelled` or removed. No movement, allocation, putaway or picking may touch it.
- Each row of status `Open` is a task of type `Count` in Task Manager. It is withdrawn when the row is removed or the count is cancelled.
- When no row is `Open` or `Variance` any more, the count closes by itself.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. The four buttons: `ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Count header](27-count-header.md)
- [Counted location card](30-counted-location-card.md)
- [Count statuses](90-statuses-and-transitions.md)
- API: `inventory_count_list_tasks`, `inventory_count_remove_location` (stateful, version of `inventory_count_task`), `inventory_count_accept` (stateful), `inventory_count_recount` (stateful)
- RF terminal: `Inventory > Count location` (`CNT00` takes the next location of the count).
