# Unallocating an order

Unallocating gives back the stock that the order has reserved, so that other orders can use it.
It does not cancel the order.

## Before you start

- The status is `Partially allocated`, `Allocated`, `Partially released` or `Released`. For other statuses the button is grey. A `New` order has nothing to give back. A `Picked` order is past this.
- You have the web action `shipment_order_unallocate` and the API right `shipment_order_cancel_allocation`. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have them. `OPERATOR` does not. Giving stock away is a supervisor decision. See [Who can do what](91-who-can-do-what.md).

## Steps

1. Open the order.
2. Click `Unallocate` on the order toolbar. There is no question window.
3. Read the message.

## What the screen says

| Result | Message |
|---|---|
| Done | `Order {number} unallocated: released {qty} across {n} line(s)` |
| Some picks were in work | The same, plus `; {k} pick(s) in work kept` |
| The launch mark was cleared | The same, plus `; order back to New` |
| The order changed under you | `Order data was updated (now {status}) — the form has been refreshed, please retry` |
| The server refused | `Unallocate failed: {error}` |
| No order open | `Open an order first` |

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/unallocate_action.rs:50-150`.

## What it does

The command releases **every pick that is not in work**.

- A pick that a picker already holds (its task is assigned or later) is **kept** and counted in the message. This is not an error. The command gives back what it can.
- The released picks are **deleted**, not marked. The deleted picks give their quantity back to the lines and to the stock. The event `process.order.line_allocation_released` is the record.
- Pick tasks that nobody has taken are deleted with their picks.
- The cartonization plan describes work that is gone. When some picks remain, the plan the tab shows is declared `Stale`. When none remain, every plan of the order becomes history and leaves the screen, so the [Cartons tab](14-cartons-tab.md) is empty (`crates/libs/wms-outbound/src/cartonization/ensure.rs`, function `plan_lost_its_work`).
- If **no live pick is left**, the launch mark is cleared too. The order returns to `New`, the version of the order goes up, and the next `Release` launches it again.
- If some picks stay, the launch stands. The order reads `Partially released`.

Source: `crates/libs/wms-outbound/src/service/order/cancel_allocation.rs:1-175`.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `cannot cancel_allocation an order in status {status}` | The status has no reservation to give back. | None. |
| `version conflict on shipment_order {id}` | Another user changed the order. The screen repairs itself and asks you to press again. | Press `Unallocate` again. |

## Related pages

- [Deleting picks](38-deleting-picks.md): the same for single picks.
- [Allocating an order](36-allocating-an-order.md)
- [Editing and removing lines](33-editing-and-removing-lines.md)
- API: `shipment_order_cancel_allocation` (stateful command, version of the order)
- RF terminal: none.
