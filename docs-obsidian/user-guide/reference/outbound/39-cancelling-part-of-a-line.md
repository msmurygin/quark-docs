# Cancelling part of a line

Use this page to reduce a line of an order that is already launched. The customer wants less, or you cannot supply the full quantity.
This is the way to reduce a launched line. You cannot just retype a lower number: a reduced promise needs a reason on record.

## Before you start

- The order is launched (the `Cancel Qty` button is grey for an order that was never released: there you edit the line itself). It is not `Closed` or `Cancelled`.
- The line is saved and open on the [line card](21-line-card.md).
- You have the web action `shipment_order_line_cancel_qty` and the API right `shipment_order_line_cancel_qty`. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have them.
- The part you cancel is not reserved. You can cancel at most: ordered - already cancelled - the larger of (reserved, shipped). To cancel more, give the reservation back first. See [Unallocating an order](37-unallocating-an-order.md) and [Deleting picks](38-deleting-picks.md).

## Steps

1. Open the order, then click the line. The line card opens.
2. Click `Cancel Qty`. The window `Cancel Quantity` opens.
3. In `Quantity to cancel` type the amount to **remove**, in base units. It is not the new total.
4. In `Reason` type why. The reason is required.
5. Click `Cancel Qty` in the window. Click `Cancel` to leave without cancelling.

## What the screen says

| Result | Message |
|---|---|
| Done | `Line {n}: cancelled {qty}; {open} still open` |
| Quantity empty or zero | `Enter the quantity to cancel` |
| Reason empty | `Enter a reason — a reduced line without one is unauditable` |
| No line open | `Open an order line first` |
| The line is not saved | `Save the line first` |
| Refused by the server | `Cancel qty failed: {error}` |

If the server refuses, the window **stays open** with your numbers still typed, so you can correct them. After success the window closes, the lines grid is read again, the line is updated, the header status is updated, and the typed numbers are cleared (so they do not appear in the next line's window).

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/cancel_qty_action.rs:35-125`, `line_modal.rs`.

## What the command checks

| Message | Meaning |
|---|---|
| `'line qty' cannot be changed on a {status} order` | The order is `Closed` or `Cancelled`. |
| `cancel_qty requires a reason` | The reason is blank. |
| `line {id} does not belong to order {id}` | Wrong order. |
| `line is already {status}` | The line is `Closed` or `Cancelled`. |
| `quantity must be greater than zero` | The quantity is zero or negative. |
| `cannot cancel {requested} — only {open} is still open` | You asked for more than is free to cancel. |
| `version conflict on shipment_order_line {id}` | Somebody changed the line after you opened it. |

Source: `crates/libs/wms-outbound/src/service/order_line/cancel_qty.rs:70-110`, `crates/libs/wms-outbound/src/domain/shipment_order_line/aggregate.rs:16-30,100-130`.

## What changes

| What | Change |
|---|---|
| Line | `Cancelled` goes up and the reason is stored. The version goes up. |
| Line status | `Cancelled` when nothing is left to ship (ordered - cancelled - shipped is zero). Else worked out from the numbers. Cancelling the unreserved rest of a partly allocated line can lift it to `Allocated`. |
| Order status | Worked out again in the same transaction. When every line is cancelled, a launched order reads `New` again but keeps its launch mark. |
| Event | `process.order.line_cancelled`. |

## Related pages

- [Line card](21-line-card.md)
- [Changing a line quantity](34-changing-a-line-quantity.md)
- [Cancelling an order](40-cancelling-an-order.md)
- API: `shipment_order_line_cancel_qty` (stateful command, version of the line)
- RF terminal: none.
