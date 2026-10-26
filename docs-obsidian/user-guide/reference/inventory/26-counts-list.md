# Counts list

An **inventory count** is a document that asks counters to count chosen locations and records what they found. A count never changes stock by itself. A difference that a supervisor accepts becomes an [adjustment](22-adjustments-list.md) that is posted at once.
The `Inventory Counts` screen lists the counts of the active warehouse.
The form is `inventory_count_list_form`. The data object is `inventory_count_doc`, over the table `inventory_count`. The list is read by `inventory_count_list`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Inventory Balances`.
3. Click `Inventory Counts`.

The sidebar item is `inventory_count_list_menu` (tab `tab_inventory_count_list`).

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Three buttons: `New`, `Delete`, `Refresh`. |
| Grid | One row for each count. A check box at the start of each row selects it. |
| Row click | Opens the count: the [header](27-count-header.md) on top and the [locations](28-count-locations-list.md) below (SelfSwap to `inventory_count_shell_form`). |

## Columns

All columns are read only. This list has no filters and no sort set in the metadata.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The id of the count. |
| `Number` | `count_number` | Text, up to 20 characters | Yes | The number of the count, for example `CNT0000001`. Unique. |
| `Status` | `status` | Text | Yes | `Open`, `Closed` or `Cancelled`. See [Statuses](90-statuses-and-transitions.md). |
| `Type` | `count_type` | Text | Yes | `Selective`, `Full`, `Cycle` or `Event`. |
| `Mode` | `count_mode` | Text | Yes | `Blind` or `Informed`. |
| `Source` | `source_type` | Text, up to 40 characters | Yes | Who asked for the count. See below. |
| `Comment` | `comment` | Text, up to 500 characters | Yes | The comment of the header. |
| `Created At` | `add_when` | Date and time | Yes | When the count was made. |
| `Closed At` | `closed_at` | Date and time | Yes | When it closed. |
| `Cancelled At` | `cancelled_at` | Date and time | Yes | When it was cancelled. |
| `Version` | `version` | Whole number | No | The version counter. It rises when the count is cancelled and each time a location is decided. |

Sources: the table in `crates/libs/wms-lib-sql/sql/wms-app/migrations/056_a_count_observes_the_stock.sql:30-60`; the list in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/093_inventory_count_screens.sql`.

### Source

| Value | Made by |
|---|---|
| `User` | A supervisor on this screen. |
| `Schedule` | A cycle-count policy (`Run now`, or the daily run). |
| `Adjustment` | A posted adjustment whose reason asks for a count (`count after posting`). |
| `PickToZero` | A pick that left its location empty, when the picking policy asks for a count. |
| `PutawayDeviation` | A directed move that went to another location than the one suggested, after a supervisor accepted it. |

Sources: `crates/libs/wms-lib-core/src/model/inventory/inventory_count_policy.rs:28`, `crates/libs/wms-inventory/src/service/inventory_adjustment/post.rs:43`, `crates/libs/wms-outbound/src/picking/emptied_location.rs:31`, `crates/libs/wms-inventory/src/movement/service.rs:76`.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `New` | Nothing | Opens an empty count in the screen. The number is drawn at once from the counter `inventory_count`: `CNT` and 7 digits. The defaults are status `New`, mode `Blind`, type `Selective`, scope `LocationFull`, freeze `Hard`, `Recounts per Location` 2. | [Creating a count](51-creating-a-count.md) |
| `Delete` | One row | Deletes a count that nobody has counted. It sends the version of the row. | [Deleting a count](57-deleting-a-count.md) |
| `Refresh` | Nothing | Reads the list again. | |

The status `New` is only a state of the form before the first save. The table has no such status.
The grey text of `Delete` is `Tick a count to delete`. The button does not look at the status; the server decides.

| Result of `Delete` | Message |
|---|---|
| Deleted | `Count {number} deleted` |
| No row | `Tick one count to delete` |
| The list changed | `The list has moved on — tick the count again and retry` |
| Version unknown | `Tick the count again: its version is unknown` |
| Refused | `Count {number} was not deleted: {error}` |

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. `OPERATOR` has no right to read counts on the web. `New` and `Delete`: `ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Count header](27-count-header.md)
- [Count locations](28-count-locations-list.md)
- [Creating a count](51-creating-a-count.md)
- [Count statuses](90-statuses-and-transitions.md)
- [Operator guide: Inventory count](../../operator/08-inventory-count.md) (RF)
- API: `inventory_count_list`, `inventory_count_delete` (stateful command, version of `inventory_count`), `inventory_count_get`
- RF terminal: `Inventory > Count location` (`CNTA`, `CNT00` to `CNT03`, `CNT_DONE`) counts the locations of a count.
