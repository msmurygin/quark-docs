# Orders list

The Orders list shows the outbound orders of the active warehouse. An order identifies what the customer needs, where it must go and when it should ship. Its lines identify the SKUs and quantities.

## How to open it

1. Sign in and select a warehouse.
2. Open `Management & Control > Orders & Waves > Orders`.

If the list is empty or an expected order is missing, confirm the warehouse code in the top bar and clear active filters.

## Screen overview

| Area | What it does |
|---|---|
| Orders toolbar | Creates a new order or refreshes the list. |
| Filter bar | Narrows the list by order number, status, owner, ship-to customer, date or another available column. |
| **Columns** | Changes which columns are shown and their order. |
| **Views** | Saves and reopens a useful filter or column arrangement when saved views are available. |
| Orders table | Shows one order per row. Select a row to open the order screen. |
| Paging controls | Changes the page and the number of orders shown. |

See [Interface overview](../../admin/01-interface-overview.md#4-list-screens) for the common list controls.

## Toolbar

| Button | What it does |
|---|---|
| **New** | Opens an empty order. The order number is assigned when the new order is opened. See [Creating an order](30-creating-an-order.md). |
| **Refresh** | Reads the list again without changing an order. |

Order actions such as **Release**, **Allocate**, **Unallocate** and **Cancel** are on the order screen, not on the list.

## Main columns

| Column | Meaning |
|---|---|
| **Order #** | The order number. Select it or its row to open the order. |
| **Status** | The current stage of the order, such as New, Released, Picked, Closed or Cancelled. See [Order statuses and transitions](90-order-statuses-and-transitions.md). |
| **Owner** | The inventory owner responsible for the order. |
| **Ship To** | The destination customer or site. |
| **Priority** | The order's priority. A smaller number is more urgent. |
| **Requested Ship** | The requested shipping date. |
| **Ordered** | When the order was created. On this list, Ordered is a date and time, not a quantity. |

Additional columns may be available through **Columns**. Every value on the Orders list is read only; open the order to make a change.

## Find an order

1. Use a quick filter or select **More filters**.
2. Enter the order number or choose another filter value.
3. Check the active-filter chips above the table.
4. Select the matching order row.

The order opens in an existing or new workspace tab. See [Order screen overview](01-order-screen-overview.md).

## What the list does not do

- Selecting a check box does not change an order by itself.
- Orders cannot be deleted from this list.
- Release, allocation and cancellation decisions are made after opening the order.
- Picking and packing are completed through their warehouse workflows, not from the Orders list.

## Related pages

- [Order screen overview](01-order-screen-overview.md)
- [Creating an order](30-creating-an-order.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- [Who can do what](91-who-can-do-what.md)
- [Operator guide: Picking](../../operator/09-picking.md)
- [Operator guide: Packing and verify](../../operator/10-packing-verify.md)
