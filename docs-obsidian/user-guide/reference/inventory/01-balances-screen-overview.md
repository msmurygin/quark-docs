# Balances screen

The `Balances` screen shows all the stock of the active warehouse. A **balance** is one row of stock: this SKU, this lot, in this location, in this container, owned by this owner.
The screen has a **summary strip** on top and **seven tabs** below it. Each tab is a read-only list that looks at the same stock in a different way.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Inventory Balances`.
3. Click `Balances`.

The sidebar item is `inventory_balance_list_menu`. It opens the form `inventory_balances` (kind Tabbed, style `balshell`).

## The summary strip

Above the tabs a strip shows five totals. They are read from the API method `list_inventory_balance_kpi` (one row, view `inventory_balance_kpi`).
The code is `crates/services/web-ui-server/src/components/layout/balances_shell.rs:60-90`.

| Tile | Small text | How it is counted |
|---|---|---|
| `Total qty` | `{n} balance rows` | The sum of `qty` over all balance rows. `n` is the number of rows. |
| `Available (ATP)` | `qty − alloc − hold` | The sum of `atp` over all balance rows. See [ATP](#atp-available-to-promise). |
| `Allocated` | `for shipments` | The sum of `qty_allocated`. |
| `On hold` | `{n} active holds` | The sum of `qty_on_hold` (only holds that block taking stock out). `n` is the number of rows of `inventory_hold` that are on (any code). |
| `Expected` | `open ASN` | The quantity that is still expected on open receipt lines, counted once for each SKU and owner. Shown with a plus sign. |

A legend under the strip says `Stored — DB column` and `Computed — view / aggregation`. Column values are drawn in two styles to show which kind they are.
The legend also says `hover row → ⋮ for actions`. No row action is defined for the lists of this screen (`Row action` is `no` for every column in the metadata).

> Not confirmed by code: what the strip shows when the warehouse has no stock at all. To verify: open `Balances` in a new empty warehouse. The code uses 0 for a missing value.

## The tabs

All seven tabs show a count next to the tab name (`Shows count` is on for every tab).

| Tab | Code | Form | What one row is | Page |
|---|---|---|---|---|
| `By Location` | `loc` | `inventory_balance_list` | One balance row. Click it to move the stock. | [By Location](10-by-location-tab.md) |
| `By Container` | `cnt` | `inventory_balance_container_list` | One container (pallet, case, tote). | [By Container](11-by-container-tab.md) |
| `By SKU` | `sku` | `inventory_balance_sku_list` | One SKU of one owner, summed over all places. | [By SKU](12-by-sku-tab.md) |
| `By Lot` | `lot` | `inventory_balance_lot_list` | One lot of one SKU and owner, summed over all places. | [By Lot](13-by-lot-tab.md) |
| `By Serial` | `srl` | `inventory_balance_serial_list` | One serial number. | [By Serial](14-by-serial-tab.md) |
| `Open Episodes` | `epi` | `serial_episode_open_list` | One serial capture that is not finished. | [Open Episodes](15-open-episodes-tab.md) |
| `On Hold` | `hld` | `inventory_balance_on_hold_list` | One balance row that has a hold on it. | [On Hold](16-on-hold-tab.md) |

Every list in the screen is read only: no cell is editable and no list has a toolbar.
Every list has a filter bar (`More filters`), a `Columns` menu and `Views`, like the receipts list. Quick filters are marked on each tab page.

## ATP (available to promise)

ATP is the quantity that can be promised to an order. It is computed by the view `inventory_balance_atp` (`crates/libs/wms-lib-sql/sql/wms-app/migrations/011_a_hold_says_what_it_forbids.sql:77-155`):

```
ATP = max( 0 , qty − qty_allocated − qty_picked − (qty if a blocking hold applies, else 0) )
```

- `qty_picked` is stock already picked and not yet shipped.
- A hold **applies** to a balance row when it is on (`is_hold_on`) and it names the row's **lot**, its **location**, or the **code of its container**.
- A hold **blocks** when its reason code is active and has the flag `block_outbound_flow` (take-out is forbidden). A reason code that is missing from the table of codes blocks too. A reason code that is switched off (`active` off) does not block.
- When a blocking hold applies, the whole `qty` of the row is taken away, so ATP is 0.

The column `qty_on_hold` is `qty` for such a row, and 0 for the others.
The tabs `By SKU`, `By Lot`, `By Container` and the strip add these values up.

The text `On hold` (column `Status`) is wider than the rule above. It is shown for **any** hold that is on, even a hold whose code does not block taking stock out. The migration says so on purpose: "a hold exists" stays true although it does not lock the door (`011_a_hold_says_what_it_forbids.sql:48-52`).

## What this screen affects

- Nothing is changed by looking. The only action is the click on a `By Location` row, which opens the [Move stock](17-move-stock-document.md) document.
- The numbers change when receiving, putaway, picking, moves, [adjustments](48-posting-an-adjustment.md), [holds](41-placing-a-hold.md) and allocation run.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER` by the default API lists, and `SUPERVISOR` by the grants of the database baseline. Moving stock: `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Move stock](17-move-stock-document.md)
- [Placing a hold](41-placing-a-hold.md)
- [Transactions](32-transactions.md)
- [Operator guide: Inventory inquiry](../../operator/07-inventory-inquiry.md) (RF)
- API: `list_inventory_balance_kpi`, `list_inventory_balance`, `list_inventory_balance_by_container`, `list_inventory_balance_by_sku`, `list_inventory_balance_by_lot`, `list_inventory_balance_serial`, `list_serial_capture_episode_open`, `list_inventory_balance_on_hold`. Each list has a `count_...` partner.
- RF terminal: `Inventory > Stock inquiry` (`INVINQ01` to `INVINQ03`).
