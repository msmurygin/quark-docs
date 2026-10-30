# Ship To tab

The `Ship To` tab is the second tab of the [order screen](01-order-screen-overview.md).
It says who gets the goods, who carries them, and why an order was cancelled.
The form is `shipment_order_shipto_form`. The data table is `shipment_order`.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Ship To` | `ship_to_id` | Pick list of customers | Yes. `Save` of a new order says `Fill in Ship To first`. | An owner of type **Customer**. The list shows `Code`, `Company`, `ID` (form `shipment_order_customer_list`). | The receiver of the goods. |
| `Carrier` | `carrier_id` | Pick list of owners | No | An owner of type **Carrier** (form `owner_carrier_list_form`). Empty by default. | The company that carries the goods. |
| `Cancel Reason` | `cancel_reason` | Text, up to 200 characters | Needed only for `Cancel` | Any text. Empty by default. | The reason you type before you press `Cancel`. |

## What each field affects

### Ship To

- The owner must be a customer. Any other type is refused: `ship_to owner {id} is not a customer (owner_type must be 'Cus')`. The check runs at create, at update, and again at release.
- `Release` copies the address of the customer into the order (`ship_to_snapshot`). After that a change of the customer card does not change the order. The shipping label reads this copy.
- Read only after the order is launched.

### Carrier

- Read only after the order is launched.
- The wave policy can group orders by carrier. There is no web screen for waves.
- No rule on the order itself reads it.

### Cancel Reason

- **Type the reason first, then press `Cancel`.** The button reads this field from the open form. It does not need a `Save` first.
- The reason is required. Without it the button answers `Enter a cancel reason first — it is the record of why the order was dropped`.
- `Save` does not write this field. Typing a reason and pressing `Save` alone keeps nothing.
- After the cancel the reason is stored in the order and sent in the event `process.order.cancelled`.

## Related pages

- [Cancelling an order](40-cancelling-an-order.md)
- [Editing an order](31-editing-an-order.md)
- [Header tab](10-header-tab.md)
- API: `shipment_order_create`, `shipment_order_update`, `shipment_order_cancel`
- RF terminal: none.
