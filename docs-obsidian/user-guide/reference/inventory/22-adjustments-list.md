# Adjustments list

An **inventory adjustment** is a document that sets the stock of chosen places to a target quantity. The `Adjustments` screen lists the documents of the active warehouse.
The form is `inventory_adjustment_list_form`. The data object is `inventory_adjustment_doc`, over the table `inventory_adjustment`. The list is read by `inventory_adjustment_list`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Management & Control`, then `Inventory`.
3. Click `Adjustments`.

The sidebar item is `inventory_adjustment_list_menu` (tab `tab_inventory_adjustment_list`).

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Three buttons: `New`, `Delete`, `Refresh`. |
| Grid | One row for each document. A check box at the start of each row selects it. |
| Row click | Opens the document: the [header](23-adjustment-header.md) on top and the [lines](24-adjustment-lines-list.md) below (SelfSwap to `inventory_adjustment_shell_form`). |

## Columns

All columns are read only. This list has no filters and no sort set in the metadata.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The id of the document. |
| `Number` | `adjustment_number` | Text, up to 20 characters | Yes | The number of the document, for example `ADJ0000001`. Unique. |
| `Reason` | `reason_code` | Text, up to 40 characters | Yes | The reason of the document. See [Adjustment reasons](31-adjustment-reasons.md). |
| `Status` | `status` | Text | Yes | `Draft`, `Validated`, `Approved` or `Posted`. See [Statuses](90-statuses-and-transitions.md). |
| `Source` | `source_type` | Text, up to 40 characters | Yes | Where the document came from: `Manual` (made on this screen), `InventoryCount` (made by accepting a count variance), `Reversal` (made by `Reverse`). The column also allows `Import` and `Generated`; no screen makes them. |
| `Comment` | `comment` | Text, up to 500 characters | Yes | The comment of the header. |
| `Created At` | `add_when` | Date and time | Yes | When the document was made. |
| `Validated At` | `validated_at` | Date and time | Yes | When it was last validated. Empty when not validated. |
| `Approved At` | `approved_at` | Date and time | Yes | When it was approved. |
| `Posted At` | `posted_at` | Date and time | Yes | When it was posted. |
| `Version` | `version` | Whole number | Yes | The version counter of the document. See below. |

Sources: the table in `crates/libs/wms-lib-sql/sql/wms-app/migrations/053_the_inventory_adjustment_document.sql:16-47`; the list in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/088_inventory_adjustment_screens.sql` and `089_inventory_adjustment_ordinary_forms.sql`.

### Version

Every change of the document or of any of its lines raises the version by 1. `Approve`, `Post` and `Delete` send the version they saw. If the document changed in the meantime the server refuses with return code 40 and the screen shows the error. This is how the system stops you posting something you did not see.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `New` | Nothing | Opens an empty document in the screen. The number is drawn at once from the counter `inventory_adjustment`: `ADJ` and 7 digits. The defaults are status `Draft` and source `Manual`. | [Creating an adjustment](43-creating-an-adjustment.md) |
| `Delete` | One row, status `Draft`, `Validated` or `Approved` | Deletes the document and its lines. It sends the version of the row. | [Deleting an adjustment](50-deleting-an-adjustment.md) |
| `Refresh` | Nothing | Reads the list again. | |

The grey text of `Delete` is `Tick an adjustment to delete` when no row is ticked, and `A posted adjustment is not deleted: reverse it` when the ticked row is posted.

Messages (from the command bindings in `088_inventory_adjustment_screens.sql` and `103_inventory_adjustment_list_delete.sql`):

| Result | Message |
|---|---|
| Deleted | `Adjustment {number} deleted` |
| No row | `Tick one adjustment to delete` |
| The list changed | `The list has moved on — tick the adjustment again and retry` |
| Version unknown | `Tick the adjustment again: its version is unknown` |
| Refused | `Adjustment {number} was not deleted: {error}` |

> Not confirmed by code: that a number drawn by `New` and never saved is lost. The counter strategy is `rpc_key`; the document is created with the number the form showed. To verify: press `New`, leave without saving, press `New` again and compare the numbers.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. `OPERATOR` has no right to read adjustments. `New` and `Delete`: `ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Adjustment lines](24-adjustment-lines-list.md)
- [Creating an adjustment](43-creating-an-adjustment.md)
- [Adjustment statuses](90-statuses-and-transitions.md)
- API: `inventory_adjustment_list`, `inventory_adjustment_delete` (stateful command, version of `inventory_adjustment`), `inventory_adjustment_get`
- RF terminal: none.
