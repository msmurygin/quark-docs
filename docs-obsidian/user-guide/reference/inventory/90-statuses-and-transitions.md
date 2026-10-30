# Statuses and transitions

This page lists the statuses of the documents and records of the `Inventory` screens, and what moves each one to the next.

## Adjustment document

| Status | Meaning |
|---|---|
| `Draft` | Being written, or changed after a validation, or refused by the last validation. |
| `Validated` | Every line passed the last `Validate`. Not changed since. |
| `Approved` | Validated and approved. Not changed since. |
| `Posted` | Posted. Final. It never changes again. |

The database keeps the dates in step with the status (check `chk_inventory_adjustment_lifecycle`): `Validated` has `validated_at`; `Approved` has `validated_at` and `approved_at`; `Posted` has `validated_at` and `posted_at`.

### Transitions

| From | Action | To | Page |
|---|---|---|---|
| (none) | `New`, `Save` | `Draft` | [Creating an adjustment](43-creating-an-adjustment.md) |
| `Draft`, `Validated`, `Approved` | Add, change or remove a line; save a changed header `Reason` or `Comment` | `Draft`. All lines go back to `Pending`; the validation and the approval are cleared. Saving the same effective header values leaves status and evidence unchanged. | [Adding lines](44-adding-lines-to-an-adjustment.md) |
| `Draft`, `Validated`, `Approved` | `Validate`, every line passes | `Validated`. The approval is cleared. | [Validating](46-validating-an-adjustment.md) |
| `Draft`, `Validated`, `Approved` | `Validate`, some line is refused | `Draft` | [Validating](46-validating-an-adjustment.md) |
| `Validated` | `Approve` | `Approved` | [Approving](47-approving-an-adjustment.md) |
| `Validated` (no reason asks for approval), `Approved` | `Post` | `Posted` | [Posting](48-posting-an-adjustment.md) |
| `Posted` | `Reverse` | stays `Posted`; a new `Draft` is made | [Reversing](49-reversing-an-adjustment.md) |
| `Draft`, `Validated`, `Approved` | `Delete` | (the document is gone) | [Deleting](50-deleting-an-adjustment.md) |

### What each status allows

| Operation | `Draft` | `Validated` | `Approved` | `Posted` |
|---|---|---|---|---|
| Change header or lines | Yes | Yes (goes to `Draft`) | Yes (goes to `Draft`) | No |
| Validate | Yes | Yes | Yes | No |
| Approve | No | Yes | No | No |
| Post | No | Yes, if no reason asks for approval | Yes | No |
| Reverse | No | No | No | Yes, once |
| Delete | Yes | Yes | Yes | No |

### Adjustment line statuses

| Status | Meaning |
|---|---|
| `Pending` | New, or the document changed after the last validation. |
| `Valid` | The last validation accepted it. |
| `Invalid` | The last validation refused it. The line holds the code and the message. |
| `Posted` | The post changed stock. The line holds the ledger code. |
| `NoChange` | The post found the stock at the target and wrote nothing. |

The mode of a line (`Existing`, `CreateIfMissing`) is not a status: see [Adjustment lines](24-adjustment-lines-list.md#mode).

## Count

| Status | Meaning |
|---|---|
| `New` | Only on the screen: the header before the first save. The table has no such status. |
| `Open` | The count exists and may have locations to count. |
| `Closed` | No location is `Open` or `Variance` any more. Final. |
| `Cancelled` | Cancelled by a supervisor. Final. |

| From | Action | To |
|---|---|---|
| (none) | `Save` of the header | `Open` |
| `Open` | A counter finishes a location, a supervisor decides a variance, or a location is removed, and no location is left `Open` or `Variance` | `Closed` (a removal closes it only if at least one location is `Closed`) |
| `Open` | `Cancel Count` | `Cancelled` |
| `Open` | `Delete`, when nothing was counted | (the count is gone) |

The database allows a count to be `Closed` or `Cancelled` only with the matching date set (`chk_inventory_count_lifecycle`).

### Count location (counting row)

| Status | Meaning |
|---|---|
| `Open` | Waiting to be counted, or being counted. |
| `Variance` | Counted, and something differs. Waits for a decision. |
| `Closed` | Matched, or the variance was accepted. Final. |
| `Recounted` | Replaced by a new attempt. Final for this row. |
| `Cancelled` | The count was cancelled. Final. |

| From | Action | To |
|---|---|---|
| (new) | Location added | `Open` |
| `Open` | The counter finishes ("Done"), all lines match | `Closed` (the location thaws) |
| `Open` | The counter finishes, some line differs, all within the count tolerances | `Closed` (accepted on its own; cause `Within tolerance`; an adjustment is posted) |
| `Open` | The counter finishes, some line differs | `Variance` |
| `Variance` | `Accept Variance` with a cause | `Closed` (the location thaws; an adjustment is posted; the cause is kept) |
| `Variance` | `Recount` | `Recounted`; a new row `Open` with the next attempt |
| `Open`, `Variance` | `Cancel Count` | `Cancelled` |
| `Open` (attempt 1, nothing recorded) | `Remove Location` | (the row is gone) |

A location can be in one live row (`Open` or `Variance`) of one count at a time. Finishing needs at least one entry or the "empty" confirmation: `nothing was counted in {location}: record what is there, or confirm that it is empty`.

### Count result types

`Match`, `QtyVariance`, `ExpectedButMissing`, `UnexpectedFound`. See [Counted location card](30-counted-location-card.md#result-types).

## Hold

A hold has no status in the screens. It is **on** or **off** (`is_hold_on`). Only holds that are on are listed. A hold goes off when it is released (the API method, the hold cascade of a move, the write-off of damage, the sweeper). The date and the user of the release are stored in `date_off` and `who_off`. An optional `auto_release_date` schedules the sweeper; empty means no scheduled release.

The status of the *location* that a hold sets is `Ok`, `Hold` or `Damage`. See [Placing a hold](41-placing-a-hold.md#what-changes).

## Pending move-in

| Status | Meaning | How it is reached |
|---|---|---|
| `Active` | The space is held. | A putaway suggestion made it. |
| `Consumed` | The pallet arrived and used it. | A move into the location with the reservation. |
| `Cancelled` | Released by a person. | `Release`. |
| `Expired` | The time ran out. | The sweeper. |

`Consumed`, `Cancelled` and `Expired` are final.

## Other statuses shown on the Balances tabs

| Where | Values |
|---|---|
| Container (`By Container`) | `Active`, `Empty`, `InTransit`; shown as `On hold` while a hold is on. `Disposed` and `Planned` containers are not listed. |
| Serial (`By Serial`) | `Active`, `Reserved`, `Picked`, `Packed`, `Shipped`, `Returned`, `Damaged`, `Held`, `Disposed`. |
| Serial capture episode (`Open Episodes`) | Listed: `Open`, `InProgress`, `AwaitingConfirmation`. Not listed: `Committed`, `Cancelled`, `Abandoned`. |
| Lot (`By Lot`) | `Active`, `On hold`. |
| Balance row (`By Location`) | Empty, or `On hold`. |

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Count header](27-count-header.md)
- [Pending Move-In](33-pending-move-in.md)
- [Return codes](92-return-codes.md)
