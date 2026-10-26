# Allocating an order

Allocating means reserving stock for the lines of an order. The result is one pick per place the stock is taken from.
You can allocate before the release, to hold stock. After the release it tops up the lines that the release could not cover.

## Before you start

- The order is not `Closed`, `Cancelled` or `Picked`. For these three the button is grey and the screen answers `a {status} order has nothing left to allocate`.
- You have the web action `shipment_order_allocate` and the API right `shipment_order_allocate`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` have them. See [Who can do what](91-who-can-do-what.md).
- Every line has an allocation policy that can run (see [Adding a line](32-adding-a-line.md)). The policy was kept on the line when the line was added.

## Steps

1. Open the order.
2. Click `Allocate` on the order toolbar.
3. Read the message. `short` is the quantity for which no stock was found. `deferred` is stock the allocator found but could not lock in this pass.

## What the screen says

| Result | Message |
|---|---|
| Reserved | `Order {number} allocated {a}, short {s}` |
| Stock row was busy | The same, plus `; deferred {d} (busy stock, try again)` |
| Reserved on a launched order | The same, plus `; {n} task(s) handed out` (nothing is added when no task was made) |
| The order is finished or picked | `a {status} order has nothing left to allocate` |
| The order changed under you | `Order data was updated (now {status}) — the form has been refreshed, please retry` |
| The server refused | `Allocate failed: {error}` |
| No order open | `Open an order first` |

On an order that is already fully reserved the button is not an error. It answers `allocated 0, short 0`.
Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/allocate_action.rs:55-160`, `crates/libs/wms-outbound/src/service/order/allocate.rs:310-320`.

When another transaction holds a candidate stock row, the allocator does not wait on it. That quantity is `deferred`, not `short`, and the toast asks you to try again. A background retry may also run from the emitted contention event.

## What changes

| What | Change |
|---|---|
| Picks | One `pick_detail` row for each place the stock comes from, status `Allocated`. |
| Stock | The reserved quantity of the balance rows goes up. |
| Lines | `Allocated` goes up. The line status moves to `Partially allocated` or `Allocated`. |
| Order status | Worked out again. Before launch: `Partially allocated` or `Allocated`. After launch: `Partially released` or `Released`. |
| Tasks | On a launched order, a pick task is made for every pick that has none. Before launch no task is made. |
| Cartonization | The plan is calculated at the reservation. See the [Cartons tab](14-cartons-tab.md). |
| Order version | The header version does not change. The command only echoes it. |
| Events | `process.order.line_allocated` for each line, and `process.order.line_allocation_short` when a line is short. |

Source: `allocate.rs:1-100` (module comment), `crates/libs/wms-lib-core/src/model/integration/event_payloads/order.rs`.

## How a shortage behaves

- A shortage never makes the command fail. The line stays `Not allocated` or `Partially allocated`, and the message shows `short`.
- A **configuration fault** does stop the whole command and nothing is reserved. Examples:
  - `sku '{sku}' (owner {owner}) has no allocation policy — neither the sku nor its owner names one; assign one before allocating`
  - `allocation policy '{code}' is inactive — sku '{sku}' cannot allocate against a disabled policy; activate '{code}' or point the sku/owner at a different one`
  - `allocation policy '{code}' has no active steps — ...`
  - `allocation policy '{code}' version mismatch for sku '{sku}': line froze version {a}, current version is {b}`
  Fix the policy on the allocation policy screen, then press `Allocate` again.

Source: `crates/libs/wms-outbound/src/allocation/policy.rs:112-260`.

## Related pages

- [Releasing an order](35-releasing-an-order.md)
- [Unallocating an order](37-unallocating-an-order.md)
- [Picks tab](12-picks-tab.md)
- Administrator guide: the allocation policy is set in the menu `Policy > Allocation Policy`.
- API: `shipment_order_allocate` (stateful command, version of the order). The dry run `shipment_order_allocate_preview` exists in the API, but no button calls it.
- RF terminal: none.
