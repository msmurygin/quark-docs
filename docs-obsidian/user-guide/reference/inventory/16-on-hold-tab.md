# On Hold tab

The `On Hold` tab shows the **balance rows that have a hold on them**: a hold on the lot, on the location or on the container of the row.
The form is `inventory_balance_on_hold_list`. The data object is `inventory_balance_on_hold`, over the view `inventory_balance_on_hold`, which is the ATP view limited to rows with `hold_status` not empty. The list is read by `list_inventory_balance_on_hold`.

The list is read only and has no toolbar. A click on a row does nothing. To place a hold use [Holds](20-holds-list.md).

## Which rows are listed

Every row for which at least one hold with `is_hold_on` applies. The test is wider than the test for ATP: a hold whose reason code does **not** block taking stock out still puts the row on this list, and the row keeps its full ATP (`crates/libs/wms-lib-sql/sql/wms-app/migrations/011_a_hold_says_what_it_forbids.sql:48-52`).

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | No | The id of the balance row. |
| `Location` | `location` | Text | Text | Yes | Yes | The location code. |
| `Container` | `container_id` | Whole number, shown as a container code | Number | No | Yes | The container of the row. Empty for loose stock. |
| `SKU` | `sku_code` | Text | Text | Yes | Yes | The SKU code. |
| `Lot` | `lot` | Text | Text | No | Yes | The lot. |
| `Qty` | `qty` | Decimal | Number | No | Yes | The quantity of the row. |
| `ATP` | `atp` | Decimal | Number | No | Yes | Available to promise. 0 when the hold blocks taking stock out. |
| `Hold reason` | `hold_detail` | Text | Text | Yes | Yes | The code of the hold and what it is fixed to, for example `Damaged · Location`. |

## What each column affects

- `Hold reason` shows one hold even when several apply. The order is container, then lot, then location.
- Compare `Qty` and `ATP`: when they differ for a row that is under a hold and has no allocation, the hold's code blocks taking stock out. When they are equal, the hold's code only marks the stock.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [By Location tab](10-by-location-tab.md)
- [Holds list](20-holds-list.md)
- [Placing a hold](41-placing-a-hold.md)
- API: `list_inventory_balance_on_hold`, `count_inventory_balance_on_hold`
- RF terminal: none.
