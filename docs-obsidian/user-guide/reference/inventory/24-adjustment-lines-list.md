# Adjustment lines

The lines list is the bottom part of the adjustment document. Each line names **one stock position** (owner, SKU, lot, location, container) and the **target quantity** it should hold after posting.
The form is `inventory_adjustment_line_list_form`. The data object is `inventory_adjustment_line`, over the table `inventory_adjustment_detail`. The list is read by `inventory_adjustment_line_preview_list`, which adds a live forecast to every line.

A click on a row opens the [line card](25-adjustment-line-card.md) in the same place (TargetForm to `inventory_adjustment_line_form`, slot `slot_2`).

## Columns

All columns are read only. The columns `Mode`, `ID` and `Version` are hidden.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `Line` | `line_no` | Whole number | The number of the line in the document. New lines get the next number. |
| `Owner` | `owner_code` | Text | The code of the owner. |
| `SKU` | `sku_code` | Text, up to 50 characters | The SKU code. |
| `Lot` | `lot` | Text, up to 20 characters | The lot. |
| `Location` | `location` | Text, up to 20 characters | The location. |
| `Container` | `container_code` | Text | The container code. Empty means loose stock. |
| `Unit` | `uom` | Text, up to 10 characters | The unit of measure. Taken from the SKU when the line is made. |
| `Current` | `current_qty` | Decimal | **Before posting:** what the position holds now (0 when it has no balance row). Empty when the forecast refuses the line. **After posting:** empty. |
| `Target` | `target_qty` | Decimal | The quantity the position should hold after posting. Never negative. |
| `Effect` | `effect_qty` | Decimal | **Before posting:** `Target − Current`, the change the post would make. |
| `Before` | `qty_before` | Decimal | **After posting:** the quantity before, read from the ledger. For a line that changed nothing: the target. |
| `Delta` | `qty_delta` | Decimal | **After posting:** the change, from the ledger. 0 for a line that changed nothing. |
| `After` | `qty_after` | Decimal | **After posting:** the quantity after. |
| `Mode` | `target_mode` | Text | Hidden. `Existing` or `CreateIfMissing`. See below. |
| `Reason` | `reason_code` | Text, up to 40 characters | The reason of the line. Empty means the reason of the document. |
| `Status` | `status` | Text | The status of the line: `Pending`, `Valid`, `Invalid`, `Posted`, `NoChange`. |
| `Would Refuse` | `forecast_message` | Text | **Before posting:** why `Post` would refuse this line now. Empty when it would accept it. |
| `Validation` | `error_message` | Text | The refusal stored by the last `Validate`. Empty when the line passed or was never validated. |
| `Ledger` | `transaction_log_code` | Text, up to 20 characters | After posting: the code of the ledger row in [Transactions](32-transactions.md). Empty for a line that changed nothing. |

Sources: the columns of the table in `crates/libs/wms-lib-sql/sql/wms-app/migrations/053_the_inventory_adjustment_document.sql:49-75`; the columns of the preview in `crates/libs/wms-inventory/src/service/inventory_adjustment/read.rs:111-146`; the list in `088_inventory_adjustment_screens.sql` (meta-ui).

## Line statuses

| Status | Meaning |
|---|---|
| `Pending` | New or changed. Not judged yet. |
| `Valid` | The last `Validate` accepted it. |
| `Invalid` | The last `Validate` refused it. `Validation` says why. |
| `Posted` | The post changed the stock. `Ledger` holds the ledger code. |
| `NoChange` | The post found the stock already at the target and wrote nothing. |

Any content change to the document (a line added, changed or removed, or a changed `Reason` or `Comment` saved on the header) puts every line back to `Pending` and clears `Validation` (`crates/libs/wms-lib-core/src/model/inventory/inventory_adjustment.rs:571-583`). Saving unchanged effective header values preserves the existing line verdicts.

## Mode

The mode is **not chosen by the user**. When a line is added, the system looks for a balance row with the same owner, SKU, pack, unit, lot, location and container:

- It exists: the mode is `Existing`. `Post` adjusts that row. If the stock has moved away by the time of the post, the line is refused with `INVENTORY_IDENTITY_GONE`. It is never recreated.
- It does not exist: the mode is `CreateIfMissing`. `Post` creates the stock. This is for stock that was found and the system did not have.

Source: `crates/libs/wms-inventory/src/service/inventory_adjustment/add_line.rs:90-96`.

## Toolbar buttons

| Button | Enabled when | What it does | Task page |
|---|---|---|---|
| `Add Line` | The document is saved and not posted | Opens an empty [line card](25-adjustment-line-card.md) for this document. | [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md) |
| `Delete` | One line is ticked, and the document is not posted | Removes the line. It sends the version of the line. | [Deleting an adjustment](50-deleting-an-adjustment.md) |
| `Refresh` | Always | Reads the list again. | |

Grey texts: `Add Line`: `Save the adjustment first` (new document) or `A posted adjustment cannot be changed`. `Delete`: `Tick a line to delete`, `A posted adjustment cannot be changed`.

| Result of `Delete` | Message |
|---|---|
| Removed | `Line {line} deleted` |
| No row | `Tick one line to delete` |
| The list changed | `The lines have moved on — tick the line again and retry` |
| Version unknown | `Tick the line again: its version is unknown` |
| Refused | `Line {line} was not deleted: {error}` |

## What it affects

- Adding, changing or removing a line moves the version of the document and puts it back to `Draft`.
- Nothing changes stock until the document is [posted](48-posting-an-adjustment.md).
- The forecast columns read the stock of every line each time the list is drawn; they take no locks.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. Adding and removing lines: `ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Adjustment line card](25-adjustment-line-card.md)
- [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md)
- [Return codes](92-return-codes.md) for the refusal codes of a line
- API: `inventory_adjustment_line_preview_list`, `inventory_adjustment_remove_line` (stateful command, version of `inventory_adjustment_detail`), `inventory_adjustment_list_lines`
- RF terminal: none.
