# Editing an order

Use this page to change the header of a saved order.

## Before you start

- The order is not `Closed` or `Cancelled`.
- You have the web action `shipment_order_save` and the API right `shipment_order_update`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` have both.
- Know what is locked. `Type`, `Ship To` and `Carrier` can change only **before the order is launched** (before the first release). `Priority`, `Requested Ship` and `Notes` can change until the order is `Closed` or `Cancelled`. See the table in [Order screen](01-order-screen-overview.md).
- `Owner` cannot be changed after the first save, even if the field looks open. See below.

## Steps

1. Open the order from `Management & Control > Orders & Waves > Orders`.
2. Change the fields you need on the [Header tab](10-header-tab.md) or the [Ship To tab](11-ship-to-tab.md).
3. Click `Save` on the order toolbar.

## What `Save` sends

`Save` sends **only the fields you changed**, with the version of the order that you saw.
It does not send the fields you left alone. This matters on a released order: a field that is locked is checked only when it is sent. If `Save` sent every field, any save on a released order would be refused for a field you never touched.

The fields `Save` can send are `Type`, `Ship To`, `Carrier`, `Priority`, `Requested Ship`, `Notes` and the hidden `external_id`.
If you changed nothing that is on this list, `Save` does not call the server. It says `Nothing changed`.
The fields `Owner`, `Order #`, `Status` and `Cancel Reason` are not on the list. Changing only one of them gives `Nothing changed`, and the change is not kept.

## What the screen says

| Result | Message |
|---|---|
| Saved | `Order saved` |
| Nothing to send | `Nothing changed` |
| A required value was emptied | `Fill in Owner, Type first` (only the missing names are listed) |
| The server refused | `Save failed: {error}` and the grid refreshes |

## What changes

| What | Change |
|---|---|
| Order | The changed fields are written. The version goes up by one. |
| Pick tasks | If `Priority` changed, every pick task of the order gets the new priority at once. |
| Event | None for an order edit. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `'order_type_id' can only be changed before the order is released (it is {status})` | You changed a locked field on a launched order. The same wording is used for `ship_to_id` and `carrier_id`. | Cannot be fixed. The order was promised to the customer. Cancel the order, or leave the field. |
| `'order_type_id' can only be changed before the order is released (it was already released, and reads {status} only because every line was cancelled)` | The order reads `New` again, but it was launched before. | Same. |
| `'priority' cannot be changed on a {status} order` (also `requested_ship_date`, `notes`, `external_id`) | The order is finished. | Cannot be fixed. |
| `ship_to owner {id} is not a customer (owner_type must be 'Cus')` | The new `Ship To` is not a customer. | Pick a customer. |
| `Save failed: version conflict on shipment_order {id}` | Somebody saved the order after you opened it. The error carries the current version and status. | Press `Refresh` or open the order again, and repeat your change. |

Unlike `Release`, `Allocate` and `Unallocate`, `Save` does not repair its own copy after a version conflict. You must reopen the order.

## Related pages

- [Header tab](10-header-tab.md)
- [Ship To tab](11-ship-to-tab.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- API: `shipment_order_update` (stateful command, version of the order)
- RF terminal: none.
