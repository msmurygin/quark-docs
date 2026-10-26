# By Location tab

The `By Location` tab is the first tab of the [Balances screen](01-balances-screen-overview.md). It shows **one row for each balance**: one SKU and lot, in one location, in one container (or loose), for one owner.
The form is `inventory_balance_list`. The data object is `inventory_balance`, over the view `inventory_balance_atp`. The list is read by the API method `list_inventory_balance`.

Click a row to open the [Move stock](17-move-stock-document.md) document for that balance. The click is a SelfSwap to the form `balance_move_doc`.

## Columns

Every column is read only. Quick filter means the column has a quick filter box in the filter bar.

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | No | The id of the balance row. |
| `SKU Description` | `sku_descr` | Text | None | No | No | The description of the SKU (`sku.descr`). It feeds the `SKU` cell, which shows the description under the code. |
| `Location` | `location` | Text, up to 20 characters | Text | Yes | Yes | The location code. |
| `Container` | `lpn` | Text | Text | No | Yes | The code of the container (LPN). Empty for loose stock. Drawn with a glyph for the container type. |
| `SKU` | `sku_code` | Text, up to 50 characters | Text | Yes | Yes | The SKU code. |
| `Lot` | `lot` | Text, up to 10 characters | Text | No | Yes | The lot. |
| `Qty` | `qty` | Decimal | Number | No | Yes | The quantity in the row. |
| `Alloc` | `qty_allocated` | Decimal | Number | No | Yes | The part promised to orders and not yet picked. Never more than `Qty`. |
| `ATP` | `atp` | Decimal | Number | No | Yes | Available to promise. See [ATP](01-balances-screen-overview.md#atp-available-to-promise). |
| `Owner` | `owner_id` | Whole number | Number | Yes | Yes | Shown as the owner code. |
| `Last move` | `mod_when` | Date and time | Date | No | Yes | When the row was last changed. |
| `Status` | `hold_status` | Text | Text | No | Yes | `On hold` when any hold that is on applies to the row. Empty when no hold applies. |
| `Hold reason` | `hold_detail` | Text | Text | No | Yes | The code of the hold and what it is fixed to, for example `QcQuarantine · Container`. Empty when no hold applies. |

Sources: the form list in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql` (form `inventory_balance_list`); the view in `crates/libs/wms-lib-sql/sql/wms-app/migrations/011_a_hold_says_what_it_forbids.sql:77-155`; the table `inventory_balances` in `001_baseline.sql` of the same folder.

Widths of the columns in the table: `inventory_balances.lot` is `varchar(10)` and `location` is `varchar(20)` (widened by wms-app migration 089); `sku_code` is `varchar(50)`. `qty`, `qty_allocated` and `qty_picked` are `double precision`. A balance row must have `0 <= qty_allocated <= qty` (database check `chk_inv_bal_qty_allocated`).

## What each column affects

### Qty, Alloc, ATP

- `Alloc` is raised by allocation of orders and lowered by picking. This screen does not change it.
- `ATP` is computed, not stored. It is 0 for a row under a hold that blocks taking stock out.

### Status and Hold reason

- Both come from the table `inventory_hold`. A hold applies to a row when it names the row's lot, its location, or the code of its container. See [Placing a hold](41-placing-a-hold.md).
- If several holds apply, `Hold reason` shows one. The order is: a hold on the container first, then on the lot, then on the location (`011_a_hold_says_what_it_forbids.sql:123-141`).
- `Status` is `On hold` even for a hold whose code does not block anything. `ATP` is not lowered for such a hold.

### Last move

- It is the column `mod_when` of the balance row. Any change of the row (quantity, allocation) updates it.

## Row click

A click on a row opens [Move stock](17-move-stock-document.md). The document needs the row's location, SKU, lot, owner and container, and the quantities shown above. They are read from the row when you click and kept in the session (`crates/services/web-ui-server/src/extensions/customization/balance/move_action.rs:55-63`).

> Not confirmed by code: what the Move stock document does for a balance whose container is `InTransit`, `Empty` or in another unusual status. The list does not filter by container status. To verify: click a row whose container is `InTransit` and press `Move`; read the message.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [Move stock](17-move-stock-document.md)
- [On Hold tab](16-on-hold-tab.md)
- API: `list_inventory_balance`, `count_inventory_balance`
- RF terminal: `Inventory > Stock inquiry` (`INVINQ01` to `INVINQ03`), `Inventory > Move stock` (`INVMOV01` to `INVMOV04`)
