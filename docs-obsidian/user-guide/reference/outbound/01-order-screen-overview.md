# Order screen

The order screen shows one outbound order. Use it to review the order header and lines, save changes, reserve stock and release work to the warehouse.

## How to open it

1. Open `Management & Control > Orders & Waves > Orders`.
2. Select an order row, or select **New** to start an order.

## Screen overview

The screen is divided into an upper order area and a lower lines area.

| Area | What it contains |
|---|---|
| Breadcrumb | The path back to the Orders list and the current order number. |
| Order toolbar | Actions for the whole order: **Save**, **Release**, **Cancel**, **Allocate**, **Unallocate** and **Ship order**. |
| Order tabs | Header, destination, picks, tasks, cartons, exceptions, fulfilment and shipment history. |
| Order header | Order number, status, owner, priority, requested ship date and other order-level information. |
| Lines toolbar | Actions that apply to order lines. |
| Order lines | The SKUs, units, ordered quantities, cancellations, allocations and line statuses. |

The upper and lower areas have separate toolbars. Check which area you are working in before selecting **New**, **Save** or another action.

See [Interface overview](../../admin/01-interface-overview.md#5-record-and-document-screens) for the common header-and-lines pattern.

## Order tabs

| Tab | What it holds | Details |
|---|---|---|
| **Header** | Order number, status, type, owner, priority, requested ship date and notes. | [Header tab](10-header-tab.md) |
| **Ship To** | Destination customer, carrier and cancellation reason. | [Ship To tab](11-ship-to-tab.md) |
| **Picks** | Stock reserved for the order. | [Picks tab](12-picks-tab.md) |
| **Tasks** | Picking work created for the order. | [Tasks tab](13-tasks-tab.md) |
| **Cartons** | Planned cartons. This tab is read only. | [Cartons tab](14-cartons-tab.md) |
| **Cartonization exceptions** | Lines the cartonization plan could not place. This tab is read only. | [Cartonization exceptions tab](15-cartonization-exceptions-tab.md) |
| **Fulfilment — base quantities** | Ordered, cancelled, picked, shipped and remaining quantities in each SKU's base unit. This tab is read only. | Use it to review what remains to fulfil. |
| **Shipments — base quantities** | Each completed Goods Issue, including the quantity, receipt, Load when applicable, time and user. This tab is read only. | Use it as the shipment history. |

## Order toolbar

| Button | What it does | Details |
|---|---|---|
| **Save** | Creates a new order or saves changed order fields. | [Creating an order](30-creating-an-order.md), [Editing an order](31-editing-an-order.md) |
| **Release** | Checks the order, reserves available stock and releases warehouse work. | [Releasing an order](35-releasing-an-order.md) |
| **Cancel** | Cancels the order after a cancellation reason is selected. | [Cancelling an order](40-cancelling-an-order.md) |
| **Allocate** | Reserves available stock for order lines that are not fully allocated. | [Allocating an order](36-allocating-an-order.md) |
| **Unallocate** | Returns reservations that have not entered warehouse work. | [Unallocating an order](37-unallocating-an-order.md) |
| **Ship order** | Opens a review window for direct Goods Issue of ready picked content. Confirmation deducts stock and cannot be undone from this screen. | Use this for one order that is not committed to an active Load. Load shipment is a separate workflow. |

After **Release**, **Cancel**, **Allocate**, **Unallocate** or a confirmed **Ship order**, the screen refreshes the order status and the available actions.

An order cannot be deleted from this screen. Goods Issue and order cancellation are controlled business actions; they are not the same as deleting a record.

## Lines area

The lower area shows the lines of the order. See [Order lines list](20-order-lines-list.md).

Select a line to open its line card. The card replaces the lines list in the lower area. Use the breadcrumb or back action in that area to return to the list. See [Line card](21-line-card.md).

## Why buttons and fields become grey

The order status and your permissions determine what can be changed. A grey button is not available in the current state.

| Order stage | What you can normally do |
|---|---|
| New or allocated, but not released | Edit the order and its lines, save it, allocate stock or release it. |
| Released or being picked | Update the remaining editable header fields, review picks and tasks, allocate remaining quantity or cancel allowed quantity. |
| Picked | Review the completed picking result. Allocation is no longer available. |
| Closed or cancelled | Review the order. Order and line fields are read only. |

More detailed rules:

| Field or action | Before release | After release | Closed or cancelled |
|---|---|---|---|
| Type, Ship To and Carrier | Editable | Read only | Read only |
| Priority, Requested Ship and Notes | Editable | Editable while the order remains active | Read only |
| **Save** order | Available | Available for editable fields | Grey |
| **Release** | Available | Available only when more quantity can be released | Grey |
| **Cancel** | Available | Available while cancellation is allowed | Grey |
| **Allocate** | Available | Available until picking is complete | Grey |
| **Unallocate** | Available when unused reservations exist | Available only before picking starts and unused reservations exist | Grey |
| **Ship order** | Selectable; selecting it shows why direct shipment is refused | Selectable; it opens the review when eligible, otherwise it shows a refusal | Selectable; selecting it shows why direct shipment is refused |
| **New** line | Available | Grey | Grey |
| Edit SKU or unit on a line | Available before stock is reserved | Read only | Read only |
| Edit ordered quantity | Available | Available while the remaining quantity can be changed | Read only |

If another user changes the order while you have it open, refresh the order and repeat your change against the current version.

## Related pages

- [Orders list](00-orders-overview.md)
- [Creating an order](30-creating-an-order.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- [Who can do what](91-who-can-do-what.md)
- [Picking](../../operator/09-picking.md)
- [Packing and verify](../../operator/10-packing-verify.md)
