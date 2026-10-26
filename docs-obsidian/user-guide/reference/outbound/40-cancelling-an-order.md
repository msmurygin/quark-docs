# Cancelling an order

Use this page to drop a whole order. Cancelling is final.

## Before you start

- The order is not `Closed` or `Cancelled`. For these two the button is grey.
- **Nothing is picked yet.** If any line has a picked quantity, the command refuses.
- You have the web action `generic_rpc_command` (every role has it) and the API right `shipment_order_cancel`. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have the API right. `OPERATOR` does not. See [Who can do what](91-who-can-do-what.md).
- You know why. The reason is required.

## Steps

1. Open the order.
2. Open the [Ship To tab](11-ship-to-tab.md).
3. Type the reason in `Cancel Reason`. You do not need to save first.
4. Click `Cancel` on the order toolbar.

**There is no question window.** The button cancels the order at once.

## What the screen says

| Result | Message |
|---|---|
| Cancelled | `Order cancelled`. The order screen is read again. The list is refreshed. |
| No order open | `Open an order first` |
| Reason empty | `Enter a cancel reason first — it is the record of why the order was dropped` |
| The order has no version on screen | `Reload the order before cancelling it` |
| Refused | `Cancel failed: {error}` and the list is refreshed |

Source: the button binding in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/067_current_form_rpc_command.sql:70-110` (typed action `generic_rpc_command`).

## What the command checks

| Message | Meaning |
|---|---|
| `cancel requires a reason` | The reason is blank after trimming. |
| `cannot cancel an order in status {status}` | The order is `Closed` or `Cancelled`. |
| `line {n} already has {qty} picked` | Something was picked. Cancel the rest of the work another way. |
| `version conflict on shipment_order {id}` | Somebody changed the order after you opened it. Open it again. |

Source: `crates/libs/wms-outbound/src/service/order/cancel.rs:75-100`, `crates/libs/wms-outbound/src/domain/shipment_order/aggregate.rs:206-232`.

## What changes

| What | Change |
|---|---|
| Reservations | **Every** live reservation of every line is released first: the picks are deleted and the stock is given back. Unlike `Unallocate`, nothing is kept because a picker holds it. |
| Order | `status` becomes `Cancelled`, `cancelled_at` and `cancel_reason` are set, the version goes up. |
| Event | `process.order.cancelled` with the reason. |

The reservations go **before** the status changes. Without that the reserved quantity of the stock would be stuck for ever: once the order is `Cancelled`, nothing can clear it.

Source: `cancel.rs:1-30`, `crates/libs/wms-outbound/src/allocation/release.rs:225-250`.

> Not confirmed by code: what happens to a pick task that a picker has already claimed when the whole order is cancelled. The release uses the scope `All`, which removes every live reservation, but the handling of a claimed task was not traced to the end. To verify: claim a task on the RF terminal without committing, cancel the order on the web, and refresh the RF terminal.

## Related pages

- [Cancelling part of a line](39-cancelling-part-of-a-line.md)
- [Unallocating an order](37-unallocating-an-order.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- API: `shipment_order_cancel` (stateful command, version of the order)
- RF terminal: none.
