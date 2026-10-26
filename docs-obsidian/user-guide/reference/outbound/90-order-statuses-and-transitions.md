# Order statuses and transitions

This page lists the statuses of an order and of its lines, what moves them, and what each status allows.
The rules live in `crates/libs/wms-outbound/src/domain/shipment_order/aggregate.rs` and `status_derive.rs`.

## Statuses are worked out, not typed

Nobody types a status. After every command that changes a quantity or a mark, the program works the status out again from the numbers and the marks, inside the same transaction.
The numbers are, for each line: ordered, cancelled, allocated (reserved), picked, shipped. The marks are `released_at`, `cancelled_at`, `closed_at`.
The stored status exists for lists and filters. A test checks that it always equals what the rules say.

## Order statuses

| Status | Label in the list | Meaning |
|---|---|---|
| `New` | `New` | No live line has a reservation. Also the status of a launched order whose lines were all cancelled. |
| `PartiallyAllocated` | `Partially allocated` | Some stock is reserved, but not every live line is fully reserved. Not launched. |
| `Allocated` | `Allocated` | Every live line is fully reserved. Not launched. |
| `PartiallyReleased` | `Partially released` | Launched. Not every live line has all its picks handed to pick tasks. |
| `Released` | `Released` | Launched. Every live line has all its picks handed to pick tasks. |
| `PartiallyPicked` | `Partially picked` | Picking has started. |
| `Picked` | `Picked` | Every live line is fully picked. |
| `Closed` | `Closed` | Finished. Final. Set by the API close. |
| `Cancelled` | `Cancelled` | Dropped. Final. |

Labels: `wms-app` migration 018 (code list `ORDER_STATUS`).

How the status is chosen:

1. `cancelled_at` set: `Cancelled`. Else `closed_at` set: `Closed`.
2. Lines that are `Cancelled` or `Closed` are left out. If no line is left, the order is `New`.
3. The highest step any live line reached counts: reserved, handed out, picked. Partly and fully count as the same step. A set `released_at` lifts the step to at least "handed out".
4. On that step the order reads the full form only when **every** live line reached the full form of that step or higher. Else it reads `Partially ...`.

Source: `status_derive.rs:90-150`.

Since 2026-09-12 the step "handed out" is measured by **tasks**: a pick counts as handed out when its status is `Released`, which is when a pick task exists for it. An order whose tasks were partly deleted reads `Partially released`.

## Line statuses

| Status | Label | Rule (first one that fits, from the top) |
|---|---|---|
| `Closed` | `Closed` | The order is closed. |
| `Cancelled` | `Cancelled` | Ordered - cancelled - shipped is zero. |
| `Picked` | `Picked` | Picked reached ordered - cancelled. |
| `PartiallyPicked` | `Partially picked` | Something is picked. |
| `Released` | `Released` | The quantity of picks with status `Released` reached ordered - cancelled. |
| `PartiallyReleased` | `Partially released` | Some picks have status `Released`. |
| `Allocated` | `Allocated` | Reserved reached ordered - cancelled. |
| `PartiallyAllocated` | `Partially allocated` | Something is reserved. |
| `NotAllocated` | `Not allocated` | Nothing is reserved. A new line starts here. |

Source: `status_derive.rs:46-80`; labels in `wms-app` migration 018 (code list `ORDER_LINE_STATUS`).

## The launch mark

`released_at` is set by the first `Release`. The code clears it when the last live work is taken away by `Unallocate` or by `Delete Task`.
It is not a status. It outranks one: an order that reads `New` but has the mark is "launched". Its `Type`, `Ship To`, `Carrier` and lines stay locked, and `Release` stays grey.

## Transitions

| Action (button or API) | Needs | Effect on the status | Page |
|---|---|---|---|
| `Save` of a new order | Owner, type, customer | The order starts as `New` | [Creating an order](30-creating-an-order.md) |
| Add or remove a line | Not launched | The status is worked out again. A new line can lower `Allocated` to `Partially allocated`. | [Adding a line](32-adding-a-line.md) |
| `Allocate` | Not finished, not `Picked` | Moves up to `Partially allocated` or `Allocated` (not launched), or within the launched steps | [Allocating an order](36-allocating-an-order.md) |
| `Release` | `New`, `Partially allocated`, `Allocated` (never launched), or `Partially released` | Sets the launch mark. Lands on `Released` or `Partially released`. | [Releasing an order](35-releasing-an-order.md) |
| `Unallocate` | `Partially allocated`, `Allocated`, `Partially released`, `Released` | Reserved picks that are not in work go. With none left the launch mark is cleared and the order is `New`. | [Unallocating an order](37-unallocating-an-order.md) |
| `Delete Selected` (picks) | Same four statuses | Worked out again. `Released` can fall to `Partially released`. | [Deleting picks](38-deleting-picks.md) |
| `Delete Task` | A task nobody took | The pick goes back in reserve. An order with nothing in work goes back to `Allocated`. | [Working with tasks](41-working-with-tasks-from-the-order.md) |
| `Cancel Qty` | Launched, not finished | The line may become `Cancelled`. The order is worked out again. | [Cancelling part of a line](39-cancelling-part-of-a-line.md) |
| Picking on the RF terminal | A pick task | Moves to `Partially picked`, then `Picked` | [Operator guide: Picking](../../operator/09-picking.md) |
| `Cancel` | Not finished, nothing picked | `Cancelled`. Final. | [Cancelling an order](40-cancelling-an-order.md) |
| Close (API only) | Launched, not finished, **every line** `Closed` or `Cancelled` | `Closed`. Final. | below |
| `Closed`, `Cancelled` | Nothing | Nothing | |

### Close

There is no `Close` button. The API method `shipment_order_close` closes a launched order when every line is finished. It writes `closed_at` and a summary of the lines (counts and quantities, and who closed it). The event is `process.order.closed`.
Before the picking phase the only way a line became finished was cancelling it. The code comment says the command was written first and was not given a shortcut.

No action makes a line `Closed` by shipping today. The folder `crates/libs/wms-outbound/src/shipping/` holds only a `README.md` ("reserved; no compiled Rust module yet"), and no code writes `qty_shipped`. A line reads `Closed` only after its order is closed: `derive_line_status` returns `Closed` first when the order has `closed_at` (`crates/libs/wms-outbound/src/domain/shipment_order/status_derive.rs:46-53`). `shipment_order_close` is refused with `LinesStillOpen` while a line is not `Closed` or `Cancelled` (`aggregate.rs:247-257`). So today an order can be closed only when every line is finished by cancelling its quantity.

Source: `aggregate.rs:236-285`, `crates/libs/wms-outbound/src/service/order/close.rs`.

## What each status allows

| Operation | `New` | `Partially allocated` | `Allocated` | `Partially released` | `Released` | `Partially picked` | `Picked` | `Closed` | `Cancelled` |
|---|---|---|---|---|---|---|---|---|---|
| Edit `Type`, `Ship To`, `Carrier` | Yes* | Yes* | Yes* | No | No | No | No | No | No |
| Edit `Priority`, `Requested Ship`, `Notes` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| Add a line | Yes* | Yes* | Yes* | No | No | No | No | No | No |
| Edit or remove a line | Yes* ** | Yes* ** | Yes* ** | No | No | No | No | No | No |
| Change the `Ordered` quantity | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| `Cancel Qty` (button) | No | No | No | Yes | Yes | Yes | Yes | No | No |
| `Release` | Yes* | Yes* | Yes* | Yes | No | No | No | No | No |
| `Allocate` | Yes | Yes | Yes | Yes | Yes | Yes | No | No | No |
| `Unallocate` | No | Yes | Yes | Yes | Yes | No | No | No | No |
| Delete picks | No | Yes | Yes | Yes | Yes | No | No | No | No |
| `Cancel` | Yes | Yes | Yes | Yes | Yes | No (note 3) | No (note 3) | No | No |

\* Only while the launch mark is not set. An order that reads `New` but was launched is treated as launched. The `Release` of a launched `New` order is also refused by the dry run when every line is cancelled.

\*\* Only for a line with no reservation.

Note 3: the button is on for `Partially picked` and `Picked`, but the command refuses an order that has a picked quantity: `line {n} already has {qty} picked`. Those two statuses mean something is picked.

Source: `crates/libs/wms-outbound/src/service/shared/mutability.rs`, `status_render.rs:218-262`, and the gates quoted on the task pages.

## Related pages

- [Orders list](00-orders-overview.md)
- [Order screen](01-order-screen-overview.md)
- [Who can do what](91-who-can-do-what.md)
- API: `get_shipment_order`, `shipment_order_close`
- RF terminal: picking moves the order up to `Partially picked` and `Picked`.
