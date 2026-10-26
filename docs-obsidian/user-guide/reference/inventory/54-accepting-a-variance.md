# Accepting a variance

Use this page when a counter has finished a location and the count found a difference. Accepting makes the system stock equal to what was counted.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The count is `Open`. The location has the status `Variance`.
- You looked at the [counted location card](30-counted-location-card.md) and the `Result Lines`: `Expected`, `Counted`, `Difference`, `Result`.

## Steps

From the list:

1. Open the count. Tick the location with the status `Variance`.
2. Click `Accept Variance`. The window `Accept Variance` opens.
3. Pick `Cause` (required). Type `Comment` if it helps (up to 200 characters).
4. Click `Accept`. The list stays and refreshes. `Cancel` closes the window and changes nothing.

From the card:

1. Click the location. The card opens.
2. Click `Accept Variance`. The same window opens.
3. Pick `Cause`, type `Comment` if it helps, click `Accept`. The screen goes back to the count.

`Cause` offers the active values of the code list `count_variance_cause`, in `Display Order`, without `Within tolerance`. The list and the causes you can add: [Inventory count policy, section 6b](../../admin/policies/24-inventory-count-policy.md).

A difference within the count tolerances is accepted on its own when the counter finishes. Its cause is `Within tolerance` (same page, section 6a).

## What the server does

`inventory_count_accept` works in one transaction (`crates/libs/wms-inventory/src/service/inventory_count/accept.rs`):

1. Checks the cause before it writes anything: an active value of `count_variance_cause` that is not the system's own. The comment is at most 200 characters.
2. Locks the count and the location row and checks the status and the version. A difference worth more than the accepter's limit is refused with `COUNT_VARIANCE_ABOVE_LIMIT` unless the user has `inventory_count.accept_large_variance`.
3. Makes an [adjustment](22-adjustments-list.md) with source `InventoryCount`, reason `COUNT_VARIANCE` and the comment `Count {number} of {location}, attempt {n} — cause {code}`. It has one line for each identity that did **not** match. The line's target is the counted quantity, and its snapshot is the quantity the count was judged against. A line for stock that was found but not expected can create stock.
4. For a `Soft` count the line's target is worked out from what the location holds now: `target = now + (counted − expected)`. A pick made after the count is not undone.
5. Validates the adjustment and posts it in the same transaction.
6. Sets the row `Closed` and stores the adjustment, the cause and the comment. Thaws the location, and closes the count if no live row is left.

If the stock moved after the count (a hard count's snapshot no longer holds), the post is refused with `STOCK_CHANGED_SINCE_COUNT`, **nothing is written**, and the row stays `Variance`. Send it to be recounted ([Recounting a location](55-recounting-a-location.md)).

## What the screen says

| Result | Message |
|---|---|
| Accepted | `Location {location}: the variance is adjusted` |
| No row | `Tick one location` (card: `Reopen the location: its task is unknown`) |
| No cause | `Choose the cause: «Not established» if nobody knows` |
| Cause not offered | `{code} is not a cause you can choose` (return `COUNT_CAUSE_NOT_OFFERED`) |
| Above your limit | `this variance is worth {value}, more than the {limit} you may accept: a manager accepts it` (return `COUNT_VARIANCE_ABOVE_LIMIT`) |
| Refused | `The variance of {location} was not accepted: {error}` (card: `The variance was not accepted: {error}`) |
| Not a variance | `the count of {location} is {status}: there is no variance to decide` |
| Count closed | `the count is {status}, not open` |
| Stock moved after a hard count | `the variance cannot be adjusted: 1 adjustment line(s) cannot be posted` (the line names `STOCK_CHANGED_SINCE_COUNT`) |
| Soft count lost more than found | `more stock left {location} after it was counted than the count found there: recount it` |
| The reason needs approval | `the COUNT_VARIANCE reason asks for approval, which a count cannot give; adjust this variance by hand` |
| Version changed | `version conflict on inventory_count_task {id}` (return code 40) |

## What changes

| What | Change |
|---|---|
| Stock | Set to the counted quantity for every identity that differed. |
| Ledger | Rows of type `Adjust`, source `{adjustment number}`, reason `COUNT_VARIANCE`. |
| Adjustment | A document with status `Posted`, source `InventoryCount`. It is in [Adjustments](22-adjustments-list.md) and its number is in the result lines. |
| Counting row | `Closed`, `decided_at`, `adjustment_id`, `variance_cause`, `variance_comment`. The list and the card show `Cause` and `Cause Comment`. |
| Board and report | The difference counts in the panel `Variance causes` and the report `Count Variance Causes` ([Reports and dashboards](../../admin/08-reports-and-dashboards.md)). |
| Location | Thawed. |
| Events | `process.inventory.adjusted`. A count's own adjustment asks for no new count. |

## Related pages

- [Counted location card](30-counted-location-card.md)
- [Recounting a location](55-recounting-a-location.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- API: `inventory_count_accept` (stateful command; version of `inventory_count_task`; `cause_code` required, `comment` optional)
- RF terminal: none. The counter's side is `Inventory > Count location`.
