# Order screen

The order screen opens when you click a row of the [orders list](00-orders-overview.md) or press `New`.
It shows one order. The **header** is in the top part. The **lines** are in the bottom part.

## Layout

The screen is a shell form (`shipment_order_shell`) with two slots.

| Slot | Form | Content |
|---|---|---|
| Top | `shipment_order_tabbed` ("Shipment Order") | The header, in six tabs. |
| Bottom | `shipment_order_line_list` ("Order Lines") | The lines of the order. |

The top form shows a back arrow (the form is set to show one).

> Not confirmed by code: where the back arrow leads. To verify: open an order from the list, click the arrow, and note the screen that opens.

## Tabs

| Tab | Page | What it holds |
|---|---|---|
| `Header` | [Header tab](10-header-tab.md) | Order number, status, type, owner, priority, requested ship date, notes. |
| `Ship To` | [Ship To tab](11-ship-to-tab.md) | Customer, carrier, cancel reason. |
| `Picks` | [Picks tab](12-picks-tab.md) | The reservations of the order. One row per pick. Has `Delete Selected`. |
| `Tasks` | [Tasks tab](13-tasks-tab.md) | The pick tasks of this order. Has `Return to Pool`, `Reassign`, `Delete Task`. |
| `Cartons` | [Cartons tab](14-cartons-tab.md) | The boxes the plan says to use. Read only. |
| `Cartonization exceptions` | [Cartonization exceptions tab](15-cartonization-exceptions-tab.md) | The lines the plan could not place. Read only. |

Source: form `shipment_order_tabbed` in `001_baseline.sql` and the tab rows added by `wms-meta-ui` migrations 015 and 086.

## Order toolbar (`shipment_order_tabbed`)

| Button | Code | What it does | Page |
|---|---|---|---|
| `Save` | `so_ts` | Creates the order, or saves the changed fields of a saved order. | [Creating an order](30-creating-an-order.md), [Editing an order](31-editing-an-order.md) |
| `Release` | `so_release` | Checks the order, launches it, and reserves stock. | [Releasing an order](35-releasing-an-order.md) |
| `Cancel` | `so_cancel` | Cancels the whole order. Needs the `Cancel Reason` of the Ship To tab. | [Cancelling an order](40-cancelling-an-order.md) |
| `Allocate` | `so_allocate` | Reserves stock for the lines that have no reservation yet. | [Allocating an order](36-allocating-an-order.md) |
| `Unallocate` | `so_unalloc` | Gives back the reservations that are not in work. | [Unallocating an order](37-unallocating-an-order.md) |

After `Release`, `Cancel`, `Allocate` and `Unallocate` the whole order screen is drawn again, so the status and the grey buttons are new.
There is no `Delete` button for an order and no `Close` button.
There was a `Preview Allocation` button. It was removed. The API method `shipment_order_allocate_preview` still exists, but no button calls it (`crates/services/web-ui-server/src/extensions/customization/shipment_order/allocate_action.rs:1-9`).

## Lines area

The lines list has its own toolbar. See [Order lines list](20-order-lines-list.md).
Click a line to open the **line card**. The card replaces the lines list in the bottom slot. See [Line card](21-line-card.md).

## What changes on screen with the status

The screen greys the buttons and the fields that the server would refuse.
The server decides. The screen only shows it early.
The orders are grouped in three families.

| Family | Statuses | Remark |
|---|---|---|
| New family | `New`, `Partially allocated`, `Allocated` | Not launched. The order has never been released. |
| Released family | `Partially released`, `Released`, `Partially picked`, `Picked` | Launched. Also an order that was released and whose lines were all cancelled, even if it reads `New` again. |
| Finished | `Closed`, `Cancelled` | Also any status the screen does not know. |

The family uses the status **and** the launch marker (`released_at`). The marker wins over a New-family status (`status_render.rs:285-293`).

| | New family | Released family | Finished |
|---|---|---|---|
| Fields `Type`, `Ship To`, `Carrier` | Editable | Read only | Read only |
| Fields `Priority`, `Requested Ship`, `Notes` | Editable | Editable | Read only |
| `Save` (order) | On | On | Grey |
| `Release` | On | On only when the status is `Partially released`, else grey | Grey |
| `Cancel` | On | On | Grey |
| `Allocate` | On | On, but grey when the status is `Picked` | Grey |
| `Unallocate` | On only for `Partially allocated`, `Allocated`, `Partially released`, `Released` | same | Grey |
| Line list `New` | On | Grey | Grey |
| Line card `Delete` | On, but grey for a line that has a reservation | Grey | Grey |
| Line card `Cancel Qty` | Grey | On | Grey |
| Line card `Save` | On | On | Grey |
| Line field `Ordered` | Editable | Editable | Read only |
| Line fields `SKU`, `UOM` | Editable, but read only for a line that has a reservation | Read only | Read only |

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/status_render.rs:218-262` (the grey buttons) and `:72-92`, `:150-168` (the read only fields).

A New order that has not been saved has no status yet. The screen then changes nothing (`status_render.rs`, the early return on an empty status).

> Not confirmed by code: whether a grey button shows a tooltip. Only the line `Delete` has a coded reason ("This line has reservations — Unallocate first to remove it"). To verify: hover over a grey `Release` on a `Released` order.

## Related pages

- [Orders list](00-orders-overview.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- [Who can do what](91-who-can-do-what.md)
- API behind the buttons: `shipment_order_create`, `shipment_order_update`, `shipment_order_release`, `shipment_order_cancel`, `shipment_order_allocate`, `shipment_order_cancel_allocation`
- RF terminal: none. Orders are made and released on the web.
