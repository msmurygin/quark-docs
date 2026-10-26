# Open Episodes tab

An **episode** is one visit of an operator to the serial capture of one business operation, for example "scan the serials of line 2 of receipt 15". The server keeps it in the table `serial_capture_episode`.
The `Open Episodes` tab lists the episodes that are **not closed yet**. A supervisor uses it to see unfinished serial scans.
The form is `serial_episode_open_list`. The data object is `serial_capture_episode_open`, over the view `serial_capture_episode_open`. The list is read by `list_serial_capture_episode_open`.

The list is read only and has no toolbar. A click on a row does nothing.
An open episode blocks closing the receipt it belongs to (return code 73). See [Closing a receipt](../inbound/42-closing-a-receipt.md).

## Which episodes are listed

Those with `closed_at` empty (`crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:5170-5195`). An episode with status `Committed`, `Cancelled` or `Abandoned` has a closing time and is not shown.

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `Episode #` | `id` | Whole number | Number | No | Yes | The id of the episode. |
| `Operation` | `business_operation` | Text | Text | Yes | Yes | The kind of work: `Receive`, `Putaway`, `Move`, `Pick`, `Pack`, `Ship`, `Return`, `Adjust` or `Inventory`. |
| `Document` | `business_ref_id` | Whole number | Number | No | Yes | The id of the document the work belongs to. For `Receive` it is the id of the receipt line. |
| `SKU` | `sku_code` | Text | Text | Yes | Yes | The SKU whose serials are scanned. |
| `Location` | `location` | Text | Text | No | Yes | The location where the scan happens. |
| `Operator` | `operator_id` | Whole number, shown as a user name | Number | No | Yes | Who started the episode. |
| `Status` | `status` | Text | Text | No | Yes | `Open`, `InProgress` or `AwaitingConfirmation` for an episode that is listed. |
| `Progress %` | `progress_pct` | Whole number | Number | No | Yes | `captured_qty` as a percentage of `expected_qty`, rounded. 0 when nothing is expected. Drawn as a bar. |
| `Age (min)` | `age_minutes` | Whole number | Number | No | Yes | Minutes since the episode was opened. |

The view also holds `expected_qty`, `captured_qty`, `owner_id`, `idempotency_key`, `opened_at` and `ttl_at`. The list does not show them.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`, `VIEWER`. The tab is read only. See [Who can do what](91-who-can-do-what.md).

> Not confirmed by code: what the meaning of `Document` is for operations other than `Receive`. The column `business_ref_id` is a number that each operation fills in its own way. To verify: start a serial capture on a move and read the value in this column.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [By Serial tab](14-by-serial-tab.md)
- [Capturing serial numbers](../inbound/37-capturing-serial-numbers.md)
- API: `list_serial_capture_episode_open`, `count_serial_capture_episode_open`
- RF terminal: `Receiving` screen `RCSN01`.
