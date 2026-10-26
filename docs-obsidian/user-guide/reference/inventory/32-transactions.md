# Transactions

The `Transactions` screen is the **stock ledger**. Every change of stock writes one row: a receipt, a move, a pick, an adjustment. The rows are never changed.
The list form is `txn_log_list_form`, the detail form is `txn_log_normal_form`. The data object is `transaction_log`, over the table `transaction_log` (partitioned by month on `add_when`). The list is read by `list_transaction_log`, and one row by `get_transaction_log`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Inventory Balances`.
3. Click `Transactions`.

The sidebar item is `txn_log_menu` (tab `tab_txn_log_list`).

## List

The toolbar has one button, `Refresh`. A click on a row opens the detail form (SelfSwap to `txn_log_normal_form`).

| Label | Column | Type | Filter | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | Hidden. The id of the row. |
| `Code` | `code` | Text, up to 20 characters | Text | The code of the ledger row, from the counter `TransactionLog`. An adjustment line stores it in its column `Ledger`. |
| `Type` | `transaction_type` | Text | Text | See below. |
| `SKU` | `sku_code` | Text, up to 50 characters | Text | The SKU code. |
| `From Loc` | `from_loc` | Text, up to 20 characters | Text | The location the stock left. |
| `To Loc` | `to_loc` | Text, up to 20 characters | Text | The location the stock went to. |
| `Qty` | `qty` | Decimal | Number | The quantity. For `Adjust` it is the signed change. |
| `UOM` | `uom` | Text, up to 10 characters | Text | The unit of measure. |
| `Status` | `status` | Text, up to 10 characters | Text | The stock status at the time. `Ok` unless a hold code was given. |
| `Source` | `source_code` | Text, up to 20 characters | Text | The document the row belongs to: the receipt number, the adjustment number, or the kind of move. |
| `Date` | `effective_date` | Date and time | None | When the change took effect. |
| `Before` | `qty_before` | Decimal | None | The balance before the change. **Only adjustments fill it.** |
| `After` | `qty_after` | Decimal | None | The balance after the change. **Only adjustments fill it.** |

Sources: the table in `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:6294-6325`; the entity in `crates/libs/wms-lib-core/src/model/transaction_log.rs`; the list in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql`.

### Types

| Type | Written by |
|---|---|
| `Deposit` | Receiving and putaway deposits. |
| `Pick` | Picking. |
| `Withdraw` | Taking stock out. |
| `Move` | The move primitive (the [Move stock](17-move-stock-document.md) document and the RF move). |
| `Transfer` | Transfers. |
| `Adjust` | [Posting an adjustment](48-posting-an-adjustment.md): one row for each line that changed stock. |

No business operation writes `Withdraw` or `Transfer` today. Both exist only as values of the type `TransactionType` (`crates/libs/wms-lib-core/src/model/transaction_log.rs:28-34`) and as filter values of the dashboard; a search of the Rust and SQL code finds no place that inserts them. Shipping confirmation, which would write `Withdraw`, is not built.

## Detail form

Every field is read only. The form has no toolbar.

| Label | Column | Type |
|---|---|---|
| `Code` | `code` | Text |
| `Type` | `transaction_type` | Text |
| `Status` | `status` | Text |
| `Effective Date` | `effective_date` | Date and time |
| `Owner` | `owner_id` | Whole number, shown through the pick list of owners |
| `SKU` | `sku_code` | Text |
| `Lot` | `lot` | Text, up to 20 characters |
| `Source` | `source_code` | Text |
| `From Location` | `from_loc` | Text |
| `To Location` | `to_loc` | Text |
| `From LPN` | `from_lpn` | Text, up to 50 characters |
| `To LPN` | `to_lpn` | Text, up to 50 characters |
| `Quantity` | `qty` | Decimal |
| `UOM` | `uom` | Text |
| `Before` | `qty_before` | Decimal |
| `After` | `qty_after` | Decimal |

The table also stores the dates of the lot, `hold_code`, `pack_id`, `source_type`, `reason_code` (up to 80 characters), `idempotency_key` and `authorized_by`. The screens do not show them. `authorized_by` is the supervisor who approved an override or an adjustment; `reason_code` carries the reason of an adjustment line or the reason typed on the Move stock document.

## What it affects

Nothing. The screen only reads. Rows are written by the commands named above.

## Who can use it

Reading the list and detail: `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`, `VIEWER`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Posting an adjustment](48-posting-an-adjustment.md)
- [Move stock](17-move-stock-document.md)
- [Adjustment lines](24-adjustment-lines-list.md) (`Ledger` links a line to its row)
- API: `list_transaction_log`, `get_transaction_log`, `count_transaction_log`
- RF terminal: none.
