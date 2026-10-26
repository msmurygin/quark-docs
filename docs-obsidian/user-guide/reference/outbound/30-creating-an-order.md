# Creating an order

Use this page to make a new outbound order by hand.
Orders can also come from other systems through the API. Those orders have the source `Api` and are not described here.

## Before you start

- You have the web action `shipment_order_save` and the API right `shipment_order_create`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` have both. `VIEWER` has neither. See [Who can do what](91-who-can-do-what.md).
- The customer exists as an owner of type **Customer**.
- The SKUs you will order exist, are active, and have an allocation policy (on the SKU or on its owner). You need this when you add the lines.

## Steps

1. Open `Outbound > Orders`.
2. Click `New`. The order screen opens. `Order #` already shows a number and `Status` is `New`.
3. On the [Header tab](10-header-tab.md) pick the `Type` and the `Owner`. Fill `Priority`, `Requested Ship` and `Notes` if you need them.
4. On the [Ship To tab](11-ship-to-tab.md) pick the `Ship To` customer. Pick a `Carrier` if you need one.
5. Click `Save` on the order toolbar.
6. The screen says `Order {number} created — add its lines below`. Now add the lines. See [Adding a line](32-adding-a-line.md).

The order is a draft until you release it. A draft may have no lines. `Release` refuses an order with no lines.

## What the screen says

| Result | Message |
|---|---|
| Created | `Order {number} created — add its lines below` |
| A field is missing | `Fill in Owner, Type, Ship To first` (only the missing names are listed) |
| The type was deleted | `That order type no longer exists — pick another` |
| The type could not be read | `Could not read the order type: {error}` |
| Refused by the server | `Save failed: {error}` |

## What changes

| What | Change |
|---|---|
| Order | A row is made with status `New`, source `Ui`, version 1. The number is the one shown on the screen. |
| Number | It was taken from the counter when you pressed `New`. A number you never save is lost. |
| Event | `process.order.created`. |
| Lines | None. |

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/save_action.rs:56-110` (the screen), `crates/libs/wms-outbound/src/service/order/create.rs` (the command).

After the first save the screen knows the order. The next `Save` is an update, so pressing `Save` again does not make a second order.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `order type '{code}' is inactive` | The type is switched off. | Pick another type. |
| `order type '{code}' not found` | The type does not exist. | Pick another type. |
| `ship_to owner {id} is not a customer (owner_type must be 'Cus')` | The `Ship To` owner is not a customer. | Pick a customer. |
| `Save failed: ...` and the grid refreshes | The server refused the request. | Read the message. |

> Not confirmed by code: what the screen shows when `Priority` is outside 1 to 99. The database refuses it (`chk_shipment_order_priority`), but the text that reaches the screen was not traced. To verify: type 0 in `Priority` of a new order and press `Save`.

## Related pages

- [Header tab](10-header-tab.md)
- [Ship To tab](11-ship-to-tab.md)
- [Adding a line](32-adding-a-line.md)
- [Releasing an order](35-releasing-an-order.md)
- API: `shipment_order_create` (stateless command), `get_order_type`
- RF terminal: none.
