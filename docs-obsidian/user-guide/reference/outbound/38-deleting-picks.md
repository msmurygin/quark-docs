# Deleting picks

Use this page to give back the reservation of single picks, without touching the rest of the order.
For all picks at once see [Unallocating an order](37-unallocating-an-order.md).

## Before you start

- The order status is `Partially allocated`, `Allocated`, `Partially released` or `Released`.
- You have the web action `pick_detail_delete_selected` and the API right `pick_detail_delete`. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have them. `OPERATOR` does not.
- The pick is **not started**: nothing was picked against it, and its task (if any) is not taken yet.

## Steps

1. Open the order and click the [Picks tab](12-picks-tab.md).
2. Tick the picks to delete.
3. Click `Delete Selected`. The button is grey until you tick a row.
4. Read the message.

## What the screen says

| Result | Message |
|---|---|
| One pick deleted | `Pick deleted; released {qty}` |
| Several deleted | `{n} picks deleted; released {qty}` |
| Some failed | `{k} deleted, {f} could not be — pick {id}: {first error}` |
| Nothing ticked | `Select the picks to delete first` |
| No order open | `Open an order first` |

The screen calls the command once for each ticked row, and each call has its own key. A failed row does not stop the others. Only the **first** error is shown. After the run the selection is cleared, the grid is read again, and the status box of the header is updated.

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/pick_delete_action.rs:30-130`.

## What the command checks

In this order:

1. The order status is one of the four above. Else `cannot delete a reservation from an order in status {status}`.
2. The pick belongs to this order. Else `pick_detail {id} belongs to order {a}, not order {b}`.
3. Nothing is picked: `pick_detail {id} already has {qty} picked — a started pick cannot be deleted; short it or cancel the pick itself (picking-phase operations)`.
4. The task is not in work. A task that nobody has claimed (`Created`) does not protect the pick: it is deleted together with the pick. A task that is `Assigned` or later refuses. The text is `pick_detail {id} взята в работу (task {id} is in work) — снять её может только фаза отбора`. Part of this message is in Russian in the code. It means: the pick is taken into work, only the picking phase can release it.

Source: `crates/libs/wms-outbound/src/service/order/delete_pick.rs:107-185`.

## What changes

| What | Change |
|---|---|
| Pick | The row is deleted. The event `process.order.line_allocation_released` is the record. |
| Line | `Allocated` goes down by the pick quantity. The line status is worked out again. |
| Stock | The reserved quantity of the balance goes down. |
| Task | A task of the pick that nobody claimed is deleted. |
| Order status | Worked out again. A `Released` order that loses a pick reads `Partially released`. The header on screen is updated. |
| Cartonization | The placements of the pick go with it, so the plan is declared `Stale` (or leaves the screen when no picks remain). |

## Related pages

- [Picks tab](12-picks-tab.md)
- [Unallocating an order](37-unallocating-an-order.md)
- [Tasks tab](13-tasks-tab.md): `Delete Task` deletes unclaimed tasks and puts their picks back in reserve.
- API: `pick_detail_delete` (stateless command: no version, the command checks the state itself)
- RF terminal: a started pick is shorted or rejected on the RF terminal (see the [Operator guide: Picking](../../operator/09-picking.md)).
