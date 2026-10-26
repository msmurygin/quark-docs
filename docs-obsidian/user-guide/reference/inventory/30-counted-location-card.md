# Counted location card

The counted location card shows **one counting of one location** and what the counter found. It opens when you click a row of the [locations list](28-count-locations-list.md).
The form is `inventory_count_location_tabbed` (kind Tabbed). The data object is `inventory_count_location_card`. The card is loaded by `inventory_count_task_card_get`.

It has two tabs and two toolbar buttons.

## Toolbar buttons

| Button | Enabled when | What it does | Task page |
|---|---|---|---|
| `Accept Variance` | `Status` is `Variance` (grey text `Only a variance is accepted`) | Asks for the cause, then adjusts the stock to what was counted. | [Accepting a variance](54-accepting-a-variance.md) |
| `Recount` | `Status` is `Variance` and the count still allows a recount (grey text `Only a variance with recounts left is recounted: the count allows no more`) | Sends the location to be counted again. | [Recounting a location](55-recounting-a-location.md) |

Messages: `Accept Variance`: success `Location {location}: the variance is adjusted`, failure `The variance was not accepted: {error}`. `Recount`: success `Location {location} goes to be counted again`, failure `The location was not sent to recount: {error}`. If the task or its version is not known: `Reopen the location: its task is unknown`, `Reopen the location: its version is unknown`. After success the card goes back and the count is read again.

## Tab `Location`

The form is `inventory_count_location_card_form`. Every field is read only.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `Location` | `location` | Text | The location code. |
| `Status` | `status` | Text | `Open`, `Variance`, `Closed`, `Recounted` or `Cancelled`. |
| `Attempt` | `attempt_no` | Whole number | 1 for the first count, then 2, 3. |
| `Differences` | `differences` | Whole number | How many stock identities did not match. |
| `Counted At` | `counted_at` | Date and time | When the counter finished. |
| `Decided At` | `decided_at` | Date and time | When the supervisor decided. |
| `Confirmed Empty` | `empty_confirmed` | Check box | On when the counter said "nothing here". |
| `Cause` | `variance_cause` | Text | Why the count differed. Set by `Accept Variance`, or `Within tolerance` when it was accepted on its own. |
| `Cause Comment` | `variance_comment` | Text | The supervisor's comment to the cause. |

The fields `ID`, `Version` and `Recount Allowed` are hidden.

## Tab `Result Lines — every attempt, the latest first`

The form is `inventory_count_location_results_list_form`. The data object is `inventory_count_result_line`. It is read by `inventory_count_location_results`. It shows one line for each stock identity of **every attempt** of the location. Every column is read only.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `Attempt` | `attempt_no` | Whole number | The attempt the line belongs to. |
| `Attempt Status` | `task_status` | Text | The status of that attempt. |
| `SKU` | `sku_code` | Text | The SKU. |
| `Owner` | `owner_code` | Text | The owner code. |
| `Lot` | `lot` | Text | The lot. |
| `Expires` | `expiration_date` | Date, listed as text | The expiry date of the lot. |
| `Manufactured` | `manufactured_date` | Date, listed as text | The manufacturing date of the lot. |
| `Best By` | `best_by_date` | Date, listed as text | The best-by date of the lot. |
| `Deliver By` | `delivery_by_date` | Date, listed as text | The deliver-by date of the lot. |
| `Lot Attributes` | `lot_attributes` | Text | The other attributes of the lot, as text. |
| `LPN` | `lpn` | Text | The container. Empty for loose stock. |
| `UOM` | `uom` | Text | The unit of measure. |
| `Expected` | `expected_qty` | Decimal | What the snapshot held (a soft count: snapshot plus the stock changes since). |
| `Moved` | `movement_qty` | Decimal | The part of `Expected` that came from stock changes after the snapshot. 0 for a hard count. |
| `Counted` | `observed_qty` | Decimal | What the counter recorded. |
| `Difference` | `difference` | Decimal | `Counted − Expected`. Stored by the database. |
| `Result` | `result_type` | Text | `Match`, `QtyVariance`, `ExpectedButMissing` or `UnexpectedFound`. |
| `Adjustment` | `adjustment_number` | Text | The number of the adjustment that corrected the line. Empty until the variance is accepted. |

The column `Task` (`task_id`) is hidden.

### Result types

| Result | Meaning |
|---|---|
| `Match` | Counted equals expected. |
| `QtyVariance` | Both exist, with different quantities. |
| `ExpectedButMissing` | The snapshot had this stock and the counter recorded none of it. |
| `UnexpectedFound` | The counter recorded stock the snapshot did not have. |

Sources: the tables in `crates/libs/wms-lib-sql/sql/wms-app/migrations/056_a_count_observes_the_stock.sql:122-142`, `060_a_counted_location_keeps_its_result_lines.sql`, `073_a_count_may_let_stock_move.sql`; the forms in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/104_inventory_count_location_card.sql` and `105_inventory_count_location_tabs.sql`.

> Not confirmed by code: how the dates `Expires`, `Manufactured`, `Best By`, `Deliver By` are written in the cells (their format). They are typed as text in the list. To verify: open the card of a location counted with a dated lot.

## What it affects

- The buttons change stock only through the adjustment that `Accept Variance` posts.
- When the count is `Blind`, the quantities of the snapshot are hidden from the counter while the location is open; the supervisor sees them here after it is counted.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. The two buttons: `ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Count locations](28-count-locations-list.md)
- [Accepting a variance](54-accepting-a-variance.md)
- [Recounting a location](55-recounting-a-location.md)
- API: `inventory_count_task_card_get`, `inventory_count_location_results`, `inventory_count_accept`, `inventory_count_recount`
- RF terminal: `Inventory > Count location` (`CNT02`, `CNT03`) records what the card shows as `Counted`.
