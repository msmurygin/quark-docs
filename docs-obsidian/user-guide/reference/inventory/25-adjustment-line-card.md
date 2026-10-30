# Adjustment line card

The line card adds one line to an adjustment, or edits a line. It replaces the [lines list](24-adjustment-lines-list.md) in the bottom part of the document until you press `Save` or go back.
The form is `inventory_adjustment_line_form`. The data object is `inventory_adjustment_line_edit`, over the table `inventory_adjustment_detail`. An existing line is loaded by `get_inventory_adjustment_line`.

You get here by pressing `Add Line` or by clicking a row of the lines list.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Owner` | `owner_code` | Pick list of owners (form `owner_own_list_form`), or typed | Yes | An owner code. | Part of the stock identity. |
| `SKU` | `sku_code` | Pick list of SKUs (form `sku_list`), or typed. Up to 50 characters. | Yes | A SKU of that owner. | Part of the identity. The pack and the unit are taken from the SKU. |
| `Lot` | `lot` | Pick list of lots (form `inventory_balance_lot_list`), or typed. Up to 20 characters. | Yes | A lot code. | Part of the identity. |
| `Location` | `location` | Pick list of locations (form `location_list_form`), or typed. Up to 20 characters. | Yes | A location code. | Part of the identity. |
| `Container` | `container_code` | Pick list of containers (form `inventory_balance_container_list`), or typed | No | A container code. Empty means loose stock. | Part of the identity. |
| `Zone (From Stock only)` | `zone` | Pick list of put-away zones (form `putawayzone_list_form`), or typed | No | A zone code. Hint: `«From Stock» adds a line for every stock row these fields name; empty ones mean any.` | Used only by the button `From Stock`. |
| `Target Quantity` | `target_qty` | Decimal | For stock without serial tracking | A number of 0 or more. For a serial-tracked SKU, leave it empty. | The quantity the position should hold after `Post`. On a serial-tracked line, the serial fields set it. |
| `Serials to Write Off` | `serials_out` | Text area | For a serial-tracked decrease | One serial per line. Every serial must currently belong to this stock position. | Writes the named units off. |
| `Serials to Add` | `serials_in` | Text area | For a serial-tracked increase | One serial per line. The serial may be new, shipped, disposed or missing. | Adds the named units to this stock position as active units. |
| `Reason (if not the document's)` | `reason_code` | Drop-down (code list `inv_adjust_reason`) | No | Empty means the reason of the document. | A reason for this line only. |
| `Comment` | `comment` | Text, up to 500 characters | Sometimes | Any text. | A note. A reason that asks for a comment is satisfied by the line's comment **or** the document's. |
| `Line` | `line_no` | Whole number, read only | | Set by the system. | The number of the line. |
| `Status` | `status` | Text, read only | | See [Adjustment lines](24-adjustment-lines-list.md#line-statuses). | The status of the line. |
| `Validation` | `error_message` | Text, read only | | Empty when the line passed. | The last refusal of `Validate`. |

The fields `ID`, `Adjustment` and `Version` are hidden. They carry the line, its document and the version of the line.

After the first save `Owner`, `SKU`, `Lot`, `Location`, `Container` and `Zone` become read only. Only `Target Quantity`, the two serial fields, `Reason` and `Comment` can change. The identity of a saved line never changes: remove the line and add another.

## Toolbar buttons

| Button | Enabled when | What it does |
|---|---|---|
| `Save` | The document is not posted | Adds the line, or saves the changes. Then goes back to the lines list. |
| `From Stock` | The document is not posted | Adds a line for every stock row that the filled fields name. See below. |
| `Delete` | The line is saved, its status is `Pending`, `Valid` or `Invalid`, and the document is not posted | Removes the line. |

Grey texts: `Save` and `From Stock`: `A posted adjustment cannot be changed`. `Delete`: `Only a saved line of an unposted adjustment is deleted`.

## Rules

- `Owner`, `SKU`, `Lot` and `Location` must be filled. Message: `line {n}: SKU, unit, lot and location are all required`.
- The owner must exist: `no owner {code}`. The owner must have the SKU: `owner {code} has no SKU {sku}`. The SKU must have a default unit: `SKU {sku} has no default unit; name the unit`. The container must exist: `no container {code}`.
- Stock without serial tracking needs a finite target of 0 or more: `target quantity {n} is not a non-negative number` or `the target quantity is required`.
- A serial-tracked line leaves the target empty and names the units it changes, one per line. The system derives the target from the serials written off and added.
- The same stock may be on a document only once: `line {n}: the same stock is already on this adjustment`.
- A reason chosen for the line must be usable: `reason {reason} is not on the adjustment reason list` or `reason {reason} is retired`.
- A new line is saved at the end. The document goes back to `Draft`.

### From Stock

`From Stock` reads the filters `Owner`, `SKU`, `Lot`, `Location` and `Zone` from the card. It needs at least one of them: `name at least one of owner, SKU, lot, location or zone`. For every balance row that matches it adds a line whose target equals the current quantity, so the document would change nothing until you edit the targets.

- At most 1 000 lines are added in one go. A wider filter is refused, not cut: `the filter names more than 1000 stock rows; narrow it`.
- Stock that is already on the document is skipped.
- Messages: success `Lines added from stock`; failure `No lines were added: {error}`.

## Messages

| Button | Success | Failure |
|---|---|---|
| `Delete` | `Line deleted` | `The line was not deleted: {error}` |
| `Delete` without a saved line | | `Save the line first` |
| `Delete` without version | | `Reopen the line: its version is unknown` |
| `From Stock` without a document | | `Open the adjustment first` |

## What it affects

- Adding, changing or removing a line puts the document back to `Draft`, and every line back to `Pending`.
- The identity of a new line decides the [mode](24-adjustment-lines-list.md#mode) of the line.

## Who can use it

`ADMIN`, `MANAGER` and `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adjustment lines](24-adjustment-lines-list.md)
- [Adding lines to an adjustment](44-adding-lines-to-an-adjustment.md)
- [Generating lines from stock](45-generating-lines-from-stock.md)
- API: `create_inventory_adjustment_line` (the form's save, stateless), `update_inventory_adjustment_line` (stateful, version of `inventory_adjustment_detail`), `inventory_adjustment_add_line` (stateless), `inventory_adjustment_generate_lines` (stateless), `inventory_adjustment_remove_line` (stateful), `get_inventory_adjustment_line`
- RF terminal: none.
