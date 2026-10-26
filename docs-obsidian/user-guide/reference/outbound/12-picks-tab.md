# Picks tab

The `Picks` tab is the third tab of the [order screen](01-order-screen-overview.md).
It lists the **picks** of the order. A pick is a reservation: "take this quantity of this SKU from this location (and pallet)".
Allocation makes the picks. The tab does not make them.
The form is `shipment_order_picks_form`. The data comes from the database view `pick_detail_by_order` (data object `pick_detail`).

The grid has check boxes. One toolbar button works on the ticked rows: `Delete Selected`.

## Columns

Every column is read only.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. The row key. |
| `Line #` | `line_no` | Whole number | The order line the pick belongs to. |
| `SKU` | `sku_code` | Text | The item. |
| `Lot` | `lot` | Text | The lot of the stock that is reserved. |
| `Location` | `location` | Text | The location the stock is taken from. |
| `LPN` | `container_id` | Whole number, shown as the container code | The pallet or box the stock is in. Empty when the stock is loose. |
| `UOM` | `uom` | Text | The unit the pick is counted in. |
| `Reserved` | `qty` | Decimal | The reserved quantity. |
| `Picked` | `qty_picked` | Decimal | How much of it was picked already. |
| `Status` | `status` | Text | Status of the pick. See below. |
| `Carton` | `cartonization_outcome` | Text, shown as a cell | The box this pick goes into, or the reason there is none. See below. |
| `DROPID` | `drop_code` | Text | The code of the drop the pick is collected into. |
| `Task` | `task_status` | Text | Status of the task of the pick. Empty when no task exists. |
| `Picker` | `assignee` | Text | The user name of the person who holds the task. |

Source: form `shipment_order_picks_form` in `001_baseline.sql` and `wms-meta-ui` migrations 015 and 083. The view is defined in `crates/libs/wms-lib-sql/sql/wms-app/migrations/046_the_picks_tab_names_the_dropid_and_the_picker.sql`.

The columns have no start sort. The `ID` column is the only hidden one.

## Pick status

The status is the value of `pick_detail.status` (`pick_detail_status`).

| Status | Meaning |
|---|---|
| `Allocated` | Stock is reserved. No task holds it yet. |
| `Released` | The pick was given to a pick task. |
| `Picked` | The pick is done. |
| `Cancelled` | The pick was cancelled. |
| `Shorted` | The picker found less than reserved. The missing part was given back. |

Source: the type in `001_baseline.sql`; the rule "a pick counts as released when its status is `Released`" in `crates/libs/wms-outbound/src/domain/shipment_order/status_derive.rs:22-27`.
The words of the five values are read from the type. The tab shows the stored spelling.

## The Carton cell

One cell answers one question: "where does this go?" It shows the box code when there is a box, or a word when there is none.

| Stored outcome | The cell shows | Meaning |
|---|---|---|
| `Planned` | The box code, with a box icon | The plan put this pick into that box. The cell is a link to the [Cartons tab](14-cartons-tab.md). |
| `Bypassed` | `not cartonized` | The pack level is not marked for cartonization. Normal. Nothing to fix. |
| `ShipAsIs` | `SHIP AS IS` | An exception the policy allowed. The item travels outside any box. |
| `Blocked` | `BLOCKED` | An exception the policy told to stop. The line waits until someone fixes the data. |
| `Pending` | `pending` | Cartonization has not run for this line yet. |

If the outcome is `Planned` and the code is missing, the cell says `carton code not available`.
Each word has a hover text. The words are the message keys `grid.outcome_*` and `grid.carton_code_missing`. The Russian words are in `wms-meta-ui` migration 015.
Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/cell_renderers.rs:11-60`, `wms-meta-ui` migrations 015, 030 and 031.

## Toolbar

| Button | Code | What it does |
|---|---|---|
| `Delete Selected` | `sop_del` | Deletes the ticked picks and gives the stock back. See [Deleting picks](38-deleting-picks.md). |

The button is grey until at least one row is ticked (`Select at least one pick`).
It is not grey by order status. The command refuses what must not be deleted.

## Related pages

- [Deleting picks](38-deleting-picks.md)
- [Tasks tab](13-tasks-tab.md)
- [Cartons tab](14-cartons-tab.md)
- [Allocating an order](36-allocating-an-order.md)
- Behind the tab: no API method. The tab reads the view `pick_detail_by_order` straight from the warehouse database (the data object `pick_detail` is read only). API behind the button: `pick_detail_delete`
- RF terminal: picking, screens `PICK04` to `PICK06` (see the [Operator guide: Picking](../../operator/09-picking.md)).
