# Count header

The header is the top part of the count document. It sets how the count is run: its type, mode, freeze and scope, and how many recounts a location may have. It also shows where the count stands.
The document is the shell `inventory_count_shell_form`: the header form `inventory_count_normal_form` on top and the [locations list](28-count-locations-list.md) below. The data object is `inventory_count_doc`. The header is loaded by `inventory_count_card_get`.

You get here by pressing `New` or by clicking a row of the [Counts list](26-counts-list.md).

**The header can be edited only before the first save.** After that the count has the status `Open`, and every field is read only. To change a choice, cancel the count and make a new one.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Number` | `count_number` | Text, up to 20 characters. Unique. | Yes (set for you) | `CNT` and 7 digits from the counter. Always read only. | The key of the count. |
| `Status` | `status` | Text | Yes | `New` before the first save, then `Open`, `Closed`, `Cancelled`. Always read only. | Where the count is. |
| `Mode` | `count_mode` | Drop-down | Yes | `Blind` (default): the counter does not see the system quantity. `Informed`: the counter sees it. | Whether the RF terminal shows the system quantity. |
| `Type` | `count_type` | Drop-down | Yes | `Selective` (default), `Full`, `Cycle`, `Event`. Hint: `Save the count, then add its locations below: «Add Locations» — by location, or whole zones.` | A label of the count, with one rule. See below. |
| `Freeze` | `freeze_mode` | Drop-down | No | `Hard` (default): the locations are frozen while they are counted. `Soft`: stock keeps moving; what moved after the snapshot is expected. | How the locations are treated while counted. |
| `Scope` | `scope_mode` | Drop-down | No | `Whole location` = `LocationFull` (default). `Only the item` = `IdentitySubset`. | What a counter counts in a location. |
| `SKUs` | `item_skus` | Pick list, several values | No | SKU codes. Hint: `Count by item: every location holding these SKUs is added when the count is saved.` | The item of the count: SKUs. |
| `Lots` | `item_lots` | Pick list, several values | No | Lot codes. Hint: `Only these lots; with SKUs, only these lots of those SKUs.` | The item: lots. |
| `LPNs` | `item_lpns` | Pick list, several values | No | Container codes. Hint: `Only what is in these containers.` | The item: containers. |
| `Comment` | `comment` | Text, up to 500 characters | No | Any text. | A note. |
| `Recounts per Location` | `max_recounts` | Whole number | No | 0 to 9. Default 2. Hint: `0 to 9. Past it a variance is accepted or the count cancelled.` | How many times a location with a variance may be counted again. |
| `To Count` | `tasks_open` | Whole number, read only | | Computed. | The number of locations with status `Open`. |
| `With Variance` | `tasks_variance` | Whole number, read only | | Computed. | The number of locations with status `Variance`. |
| `Closed` | `tasks_closed` | Whole number, read only | | Computed. | The number of locations with status `Closed`. |
| `Created At` | `add_when` | Date and time, read only | | | When the count was made. |
| `Closed At` | `closed_at` | Date and time, read only | | | When it closed. |
| `Cancelled At` | `cancelled_at` | Date and time, read only | | | When it was cancelled. |

Hidden fields: `ID`, `Version` (the version of the count, sent by `Cancel Count`) and `Locations` (the codes of the counted locations, comma separated; filled by the server).

The form saves with `create_inventory_count`. The count that is made has `source_type` `User`, and `recount_by_other_counter` on (a recount is not counted by the person who counted the attempt before).

## Type, mode, freeze, scope

### Type

- **Only `Selective` and `Full` can be saved.** `Cycle` and `Event` are in the drop-down, but saving them is refused: `a Cycle count is made by its policy or event, not started by hand`. Counts of these types are made by a cycle-count policy and by events.
- For a count started by hand `Selective` and `Full` work the same. The one difference: an **item** (SKUs, lots, LPNs) can be named only on a selective count (or a cycle count). Message: `only a selective or a cycle count is counted by item`.
- An `Event` count is given to counters before the others (priority 10 against the default 50 in Task Manager).

### Mode

- `Blind`: the RF terminal and the task view hide the system quantity while the location is counted.
- `Informed`: the counter sees what the system holds, line by line, on the **first** attempt. A recount is always blind.

### Freeze

- `Hard`: when a location is added, it is frozen with the flag `CycleCountActive`. Movement, allocation, putaway and picking respect the flag. The count is judged against the snapshot taken at the freeze.
- `Soft`: nothing is frozen. The count is judged against the snapshot plus the stock changes made after it and before the counter finished. A soft count starts only where a hard one could.

### Scope and item

- `Whole location`: the counter counts everything in the location.
- `Only the item`: the counter counts only the SKUs, lots and containers named. Other stock there is not counted and not compared. It needs an item: `a count of the item only needs the item: name SKUs, lots or LPNs`.
- When an item is named, the locations that hold it are added **when the count is saved**. Those that something else holds are left out. If none can be counted the save is refused: `nothing can be counted in {item}: every location is blocked or already being counted`.
- The item is chosen once with the header and never changed.

## Toolbar buttons

| Button | Enabled when | What it does | Task page |
|---|---|---|---|
| `Save` | Status is `New` (grey text `A started count is not edited`) | Makes the count. No location is frozen yet, unless an item is named. | [Creating a count](51-creating-a-count.md) |
| `Cancel Count` | Status is `Open` (grey text `Only an open count is cancelled`) | Cancels the count. Its live locations thaw. Nothing is adjusted. | [Cancelling a count](56-cancelling-a-count.md) |

Messages of `Cancel Count`: success `Count {number} cancelled: its locations are released`; failure `The count was not cancelled: {error}`; `Reopen the count: its id is unknown`; `Reopen the count: its version is unknown`.

## Rules of the header

- `Recounts per Location` must be 0 to 9: `recounts per location are 0 to 9, not {n}`.
- `Comment` is at most 500 characters: `a comment is at most 500 characters`.
- The number is at most 20 characters: `a count number is at most 20 characters`.
- A named container must exist: `no container {code}`. A SKU or a lot that does not exist is not checked on its own; it finds no location, and the save is refused with the message `nothing can be counted in ...` above.

## What it affects

- A saved count holds nothing and freezes nothing until locations are added, unless it was made by item.
- Adding locations creates a Task Manager task of type `Count` for each location. They appear on the task board and are given to counters on the RF terminal.

## Who can use it

`ADMIN`, `MANAGER` and `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Counts list](26-counts-list.md)
- [Count locations](28-count-locations-list.md)
- [Creating a count](51-creating-a-count.md)
- [Cancelling a count](56-cancelling-a-count.md)
- [Count statuses](90-statuses-and-transitions.md)
- [Operator guide: Inventory count](../../operator/08-inventory-count.md) (RF)
- API: `inventory_count_card_get`, `create_inventory_count` (stateless), `inventory_count_cancel` (stateful, version of `inventory_count`)
- RF terminal: `Inventory > Count location` (`CNTA`, `CNT00`, `CNT01`, `CNT02`, `CNT03`, `CNT_DONE`; `CNTLOT1` to `CNTLOT3` find a lot by its attributes)
