# Releasing an order

Use this page to launch an order to the warehouse floor.
Releasing does three things in one step: it checks the order, it marks the order as launched, and it reserves stock and makes the pick tasks.

## Before you start

- The order has at least one line, and at least one line still has something to ship.
- The order is in status `New`, `Partially allocated` or `Allocated` (not launched), **or** it is `Partially released` (launched, but some work is not handed out yet). For other statuses the button is grey.
- You have the web action `shipment_order_release` and the API right `shipment_order_release`. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have them. `OPERATOR` does not. See [Who can do what](91-who-can-do-what.md).
- The SKUs of the lines still exist, are active, and have an allocation policy that can run. If the policy is broken the order is still released, but nothing is reserved. See below.

## Steps

1. Open the order.
2. Click `Release` on the order toolbar.
3. Read the message. If it starts with `Cannot release:`, fix the problems it lists and press `Release` again.

The screen first asks the server for a dry run (`shipment_order_validate`). The dry run lists **all** the problems together, so you do not fix them one by one. Only when the dry run is clean does the screen call `shipment_order_release`. The server runs the same check again under the lock, because a SKU can be switched off between the two calls.

## What the check looks at

| Check | Message (`{...}` is replaced) |
|---|---|
| The status allows a release | `only an unreleased order, or a released one with work not yet handed out, can be released (this one is {status})` |
| The order has lines | `the order has no lines` |
| Something is left to ship | `every line is fully cancelled — nothing left to ship` |
| `Ship To` is a customer | `ship_to owner {id} is not a customer (owner_type must be 'Cus')` |
| Each line has the owner of the order | `line owner {x} differs from order owner {y}` (names the line) |
| Each line's SKU is active and has the unit | `sku '{sku}' not found for owner {owner}`, `sku '{sku}' is inactive`, or `sku '{sku}' has no '{uom}' unit in its pack (pack_id {id})` (names the line) |

Source: `crates/libs/wms-outbound/src/service/order/validate.rs:60-160`.

A requested ship date in the past gives a **warning** (`requested ship date {date} is in the past`). A warning does not stop the release; the successful Release message includes it.

## What the screen says

| Result | Message |
|---|---|
| Released, all reserved | `Order {number} released; allocated {a}, short {s}` |
| Released, stock row was busy | The same, plus `; deferred {d} (busy stock, try again)` |
| Released, tasks made | The same, plus `; {n} task(s) handed out` |
| Released, but the reservation failed | `Order {number} released; allocation failed: {error}` |
| Released, no allocation answer | `Order {number} released` |
| Released with dry-run warnings | The normal success message, plus `; warning: {message}` (or `; warnings: ...` for several; line-level warnings start with `line {n}:`) |
| The dry run found problems | `Cannot release: line 2: {message}; {message}` |
| The server refused | `Release failed: {error}` |
| The order changed under you | `Order data was updated (now {status}) — the form has been refreshed, please retry` |
| No order open | `Open an order first` |

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/release_action.rs:55-190`, `current_order.rs:314-316`.

If you see the conflict message, look at the new status and press `Release` again. The screen has already been repaired with the current version.

## What changes

| What | Change |
|---|---|
| Launch mark | `released_at` is set. From now on the order is "launched". |
| Address | The address of the customer is copied into the order (`ship_to_snapshot`). Later changes to the customer card do not change this order. |
| Stock | The program reserves stock for every line, in the same transaction (the same pass as `Allocate`). It makes the picks, and a pick task for each pick. The cartonization plan is calculated at the reservation. |
| Status | Worked out from the lines. `Released` when every live line has its picks handed to tasks, else `Partially released`. |
| Event | `process.order.released` (first release only). |

If the reservation pass fails (for example the allocation policy is not set up), the release **still succeeds**. The failure is shown in the message. The lines stay `NotAllocated`, and you can press `Allocate` after you fix the policy.
A shortage of stock is not a failure. The order launches and reads `Partially released` until stock arrives and you press `Allocate`.

Source: `crates/libs/wms-outbound/src/service/order/release.rs:1-120`, `release.rs:150-260`.

## Releasing again

On an order that reads `Partially released` the `Release` button works again. It means "hand out the work". The server runs the same reservation pass: it reserves what is still missing and makes tasks for every pick that has none. It does not set the launch mark again, does not copy the address again, and does not send a second event.
The message says `Order {number} released; allocated {a}, short {s}; {n} task(s) handed out`.

A fully `Released` order cannot be released again. The dry run refuses it: `only an unreleased order, or a released one with work not yet handed out, can be released (this one is Released)`.
An order whose lines were all cancelled after the launch reads `New` and still has the launch mark. The button is grey. If the call is made anyway, the dry run refuses it: `every line is fully cancelled — nothing left to ship`.

Source: `crates/libs/wms-outbound/src/domain/shipment_order/aggregate.rs:186-196`, `validate.rs:70-95`.

## Related pages

- [Allocating an order](36-allocating-an-order.md)
- [Unallocating an order](37-unallocating-an-order.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- [Tasks tab](13-tasks-tab.md)
- API: `shipment_order_validate` (dry run, reads only), `shipment_order_release` (stateful command, version of the order)
- RF terminal: the tasks made by the release are picked on the RF terminal (see the [Operator guide: Picking](../../operator/09-picking.md)).
