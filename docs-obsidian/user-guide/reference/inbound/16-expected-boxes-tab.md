# Expected Boxes tab

The `Expected Boxes` tab lists the pallets and boxes that were planned for the receipt.
The form is `receipt_expected_boxes_form` ("Expected Boxes"). The data comes from the table `container`, rows with `planned_at_receipt_id` equal to the open receipt.
It is used for case-level receiving, where an ASN names every box and the pallet it travels on.

The web screens cannot create planned boxes. They are created by the API method `receipt_create_case_level_asn` (`crates/services/app-server/src/web/rpcs/case_level_commands_rpc.rs:18`).
On a receipt made in the web UI the tab is empty.

## Columns

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. |
| `Box` | `code` | Text | The label of the pallet or box. This column has a quick filter. |
| `Type` | `container_type` | Text | `Pallet` or `Case`. |
| `Parent` | `parent_id` | Whole number | Shown as the code of the pallet that holds the box. |
| `Location` | `current_loc` | Text | Where the container is. Empty while it is only planned. |
| `Status` | `status` | Badge | The status of the container, for example `Planned`. |

All columns are read only. Rows can be ticked.

## Toolbar buttons

The toolbar is `receipt_expected_boxes_toolbar`.

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `Move Boxes` | One ticked row of type `Pallet` | Opens the window `Move Boxes`. Moves the boxes of the ticked pallet to another pallet. | [Moving and cancelling expected boxes](44-moving-and-cancelling-expected-boxes.md) |
| `Cancel Box` | One ticked row of type `Case` | Opens the window `Cancel Planned Box`. Cancels a box that will not arrive. | [Moving and cancelling expected boxes](44-moving-and-cancelling-expected-boxes.md) |

The grey text of the buttons is "Tick the pallet the boxes are on" and "Tick one box".
The toolbar is redrawn each time you tick a row.
Source: `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/084_web_receipt_adjust_and_box_exceptions.sql`.

## What it affects

- A cancelled box is no longer expected. The box row keeps its status `Planned`. The plan row of the case is marked cancelled.
- A move changes the parent of the boxes. If the new pallet code does not exist, a planned pallet is created.
- Both actions are written to the receipt events. Cancelling a box also writes a row to the [Audit tab](14-audit-tab.md).

## Messages

See [Moving and cancelling expected boxes](44-moving-and-cancelling-expected-boxes.md).

## Related pages

- [Moving and cancelling expected boxes](44-moving-and-cancelling-expected-boxes.md)
- [Audit tab](14-audit-tab.md)
- API: `receipt_replace_pallet`, `receipt_cancel_planned_case`, `receipt_create_case_level_asn`
- RF terminal: the case-level receiving screens `RCCASE_REPAL` (move) and `RCCASE_CANCEL` (cancel a case).
