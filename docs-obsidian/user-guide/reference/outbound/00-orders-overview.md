# Orders list

The orders list shows every outbound order (shipment order) of the active warehouse.
An order is a request from a customer: "send these items to this address".
The order has lines. A line says which SKU, in which unit, how many.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Management & Control`.
3. Open `Orders & Waves`, then click `Orders`.

The sidebar item is `Management & Control > Orders & Waves > Orders` (menu item `shipment_order_menu`, form `shipment_order_list`).
Related outbound screens are split between `Orders & Waves`, `Shipping`, `Execution Control`, `Exceptions` and `Stations`.

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Two buttons: `New` and `Refresh`. |
| Grid | One row per order, 50 rows per page (the page size can be changed to 10, 20 or 100). A check box starts each row. |
| Row click | Click a row to open the order. It opens in the [order screen](01-order-screen-overview.md). |

The check boxes are on, but no button of the list uses them.
There is no delete button on the list and no status button.
Release, Allocate, Cancel and the other order buttons are on the order screen.

Source: form `shipment_order_list` and list properties in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql` (search `shipment_order_list`).

## Toolbar

| Button | What it does |
|---|---|
| `New` | Opens a new empty order in the order screen. The order number is taken from the counter at this moment. See [Creating an order](30-creating-an-order.md). |
| `Refresh` | Reads the list again. |

## Columns

The list reads from the API method `list_shipment_order`. The row count comes from `count_shipment_order`. Every column is read only.

| Label | Column | Type | Filter | Notes |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | Hidden. It is the row key. |
| `Order #` | `order_number` | Text | Text | The number of the order. |
| `Status` | `status` | Badge | Text | `New`, `Partially allocated`, `Allocated`, `Partially released`, `Released`, `Partially picked`, `Picked`, `Closed` or `Cancelled`. See [Order statuses](90-order-statuses-and-transitions.md). The labels come from the code list `ORDER_STATUS`. |
| `Owner` | `owner_id` | Whole number | Number | Shows the owner code. |
| `Ship To` | `ship_to_id` | Whole number | Number | Shows the code of the customer. |
| `Priority` | `priority` | Whole number | Number | 1 to 99. Smaller is more urgent. |
| `Requested Ship` | `requested_ship_date` | Date | Date | The date the customer wants the goods to leave. |
| `Ordered` | `order_date` | Date and time | Date | When the order was made. Not the ordered quantity: the line column with the same label is a quantity. |

No column has a start sort. Source for the code lists and the owner lookup: the column definitions of form `shipment_order_list` (renderer `CodeListBadgeRenderer`, formatter `fk:owners:code`) in `001_baseline.sql`.
The labels of the statuses are in `crates/libs/wms-lib-sql/sql/wms-app/migrations/018_the_code_lists_speak_the_products_language.sql:48-56`.

## What the list does not have

- No `Close` button. Closing an order exists only in the API (`shipment_order_close`). See [Order statuses](90-order-statuses-and-transitions.md).
- No hold. An order has no on-hold status.
- No wave, packing or shipping screen. Packing is done on the RF terminal. See [Related pages](#related-pages).

## Related pages

- [Order screen](01-order-screen-overview.md)
- [Creating an order](30-creating-an-order.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- [Who can do what](91-who-can-do-what.md)
- API: `list_shipment_order`, `count_shipment_order`, `get_shipment_order`
- RF terminal: picking, see the [Operator guide: Picking](../../operator/09-picking.md). Packing, see [Operator guide: Packing and verify](../../operator/10-packing-verify.md).
