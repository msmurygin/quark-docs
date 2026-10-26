# Line serials tab

The tab `Serials` is the fourth tab of the [line card](21-line-detail-tab.md).
It lists the serial numbers that were received on the line.
The form is `receipt_detail_serials_form`. The data table is `inventory_balances_serial`, rows where `received_via` is the id of the line.

The tab is shown only when the SKU of the line has **continuous serial tracking** switched on (`sku_serial_config.continuous_serial_tracking`). For other SKUs the tab is hidden (`crates/services/web-ui-server/src/extensions/customization/receipt/detail_render_action.rs:116-120`).

## Columns

All columns are read only. The list has no toolbar.

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | |
| `Serial Number` | `serial_number` | Text | |
| `Status` | `status` | Text | The status of the serial in stock. |
| `Location` | `location` | Text | Where the serial is. |
| `Lot` | `lot` | Text | |
| `Capture` | `capture_method` | Text | How the serial was captured. |
| `Received At` | `received_at` | Date and time | |

## How rows get here

Rows are created when you scan serials: in the receive window, on the serial scan page, or on the RF terminal.
They are not created from this tab. See [Capturing serial numbers](37-capturing-serial-numbers.md).

## What it affects

Nothing. It is a view of stock records.

## Messages

None.

## Related pages

- [Capturing serial numbers](37-capturing-serial-numbers.md)
- [Pre-advised serials tab](25-line-pre-advised-serials-tab.md)
- [Administrator guide: Serial configuration](../../admin/policies/33-serial-configuration.md)
- API: `capture_serial`
- RF terminal: `RCSN01` (Serial Capture).
