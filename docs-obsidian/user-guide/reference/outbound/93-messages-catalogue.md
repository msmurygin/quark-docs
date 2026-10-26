# Messages catalogue

This page lists the messages that the order screens show, grouped by the page that explains them.
A part in `{braces}` is replaced by a value. The page linked in the heading says when the message appears and what to do.

Messages made by the server (domain refusals) are shown as the server wrote them. Some begin with a lower-case letter. That is how they are written in the code.

## [Creating an order](30-creating-an-order.md) and [Editing an order](31-editing-an-order.md)

- `Order {number} created — add its lines below`
- `Order saved`
- `Nothing changed`
- `Fill in Owner, Type, Ship To first` (only the missing names are listed)
- `That order type no longer exists — pick another`
- `Could not read the order type: {error}`
- `Save failed: {error}`
- `order type '{code}' is inactive`
- `order type '{code}' not found`
- `ship_to owner {id} is not a customer (owner_type must be 'Cus')`
- `'{field}' can only be changed before the order is released (it is {status})`
- `'{field}' can only be changed before the order is released (it was already released, and reads {status} only because every line was cancelled)`
- `'{field}' cannot be changed on a {status} order`
- `version conflict on shipment_order {id}`

## [Adding a line](32-adding-a-line.md), [Editing and removing lines](33-editing-and-removing-lines.md)

- `Line {n} saved`
- `Line removed`
- `Save the order before adding lines to it`
- `Fill in SKU, UOM first` (only the missing names are listed)
- `Ordered quantity must be greater than zero`
- `Select a saved line first`
- `Cannot remove the line: {error}`
- `Nothing changed`
- `Only the ordered quantity can change on this line — release its reservations first (Unallocate) to edit the rest`
- `This line has reservations — Unallocate first to remove it` (hover text of the grey `Delete`)
- `line {n} has {qty} reserved — release the reservation first (Unallocate or delete its picks); to change only the quantity, use Adjust Qty`
- `sku '{sku}' not found for owner {owner}`
- `sku '{sku}' is inactive`
- `sku '{sku}' has no '{uom}' unit in its pack (pack_id {id})`
- `pack unit '{uom}' for sku '{sku}' has base_qty {n} — must be greater than zero`
- `qty {n} must be greater than zero`
- `line {id} does not belong to order {id}`
- `editing a line requires expected_line_version`
- `version conflict on shipment_order_line {id}`

## [Changing a line quantity](34-changing-a-line-quantity.md), [Order lines list](20-order-lines-list.md)

- `Ordered qty set to {qty} — now {status}`
- `Save the line first`
- `Permission denied: changing the ordered quantity of a launched or reserved line is a supervisor action — ask a supervisor to make this change`
- `Permission denied: you do not have permission to edit this order's lines`
- `Could not change the ordered quantity: {error}`
- `cannot reduce qty_ordered to {new} — {committed} is already committed — release the line's reservations first (Unallocate)`
- `Saved {n} line(s)`
- `Saved {n} line(s) ({h} after refreshing a changed line)`
- `Saved {n} line(s), {m} failed — line {id}: {reason}`
- `Nothing saved — line {id}: {reason}`
- `Nothing changed on this line`
- `the ordered quantity was {seen} when you started editing and is {stored} now — someone else changed it; your {typed} is still in the cell; press Save again to apply it, or Discard changes to drop it`
- `the ordered quantity was changed to {stored} by someone else — your {typed} is still in the cell; press Save again to apply it, or Discard changes to drop it`
- `the line changed while you were editing — your {typed} is still in the cell; press Save again to apply it, or Discard changes to drop it`
- `Nothing to discard`
- `Discarded changes on {n} line(s) — the grid shows what is stored`

## [Releasing an order](35-releasing-an-order.md)

- `Order {number} released; allocated {a}, short {s}`
- `Order {number} released; allocated {a}, short {s}; deferred {d} (busy stock, try again)`
- `Order {number} released; allocated {a}, short {s}; {n} task(s) handed out`
- `Order {number} released; allocation failed: {error}`
- `Order {number} released`
- `Cannot release: {problems}` (each problem is `line {n}: {text}` or `{text}`, joined with `; `)
- `Release failed: {error}`
- `Order data was updated (now {status}) — the form has been refreshed, please retry`
- `Open an order first`
- `only an unreleased order, or a released one with work not yet handed out, can be released (this one is {status})`
- `the order has no lines`
- `every line is fully cancelled — nothing left to ship`
- `line owner {x} differs from order owner {y}`
- `requested ship date {date} is in the past` (warning; not shown by the button)
- `cannot release: {summary}`
- `cannot release again an order in status {status}`

## [Allocating an order](36-allocating-an-order.md)

- `Order {number} allocated {a}, short {s}`
- `Order {number} allocated {a}, short {s}; deferred {d} (busy stock, try again)`
- `Order {number} allocated {a}, short {s}; {n} task(s) handed out`
- `a {status} order has nothing left to allocate`
- `Allocate failed: {error}`
- `cannot allocate an order in status {status}`
- `sku '{sku}' (owner {owner}) has no allocation policy — neither the sku nor its owner names one; assign one before allocating`
- `allocation policy '{code}' is inactive — sku '{sku}' cannot allocate against a disabled policy; activate '{code}' or point the sku/owner at a different one`
- `allocation policy '{code}' has no active steps — ...`
- `allocation policy '{code}' contains {n} step(s) this build cannot execute`
- `allocation policy '{code}' has no executable step for sku '{sku}' pack hierarchy`
- `allocation policy '{code}' version mismatch for sku '{sku}': line froze version {a}, current version is {b}`
- `frozen allocation policy '{code}' has no active steps for sku '{sku}'`
- `allocation policy '{code}' has unsupported active step(s) and cannot execute safely — sku '{sku}' cannot be allocated until the policy is fixed: {reasons}`

## [Unallocating an order](37-unallocating-an-order.md)

- `Order {number} unallocated: released {qty} across {n} line(s)`
- `Order {number} unallocated: released {qty} across {n} line(s); {k} pick(s) in work kept`
- `Order {number} unallocated: released {qty} across {n} line(s); order back to New`
- `Unallocate failed: {error}`
- `cannot cancel_allocation an order in status {status}`

## [Deleting picks](38-deleting-picks.md)

- `Pick deleted; released {qty}`
- `{n} picks deleted; released {qty}`
- `{k} deleted, {f} could not be — pick {id}: {error}`
- `Select the picks to delete first`
- `Select at least one pick` (hover text of the grey `Delete Selected`)
- `cannot delete a reservation from an order in status {status}`
- `pick_detail {id} belongs to order {a}, not order {b}`
- `pick_detail {id} already has {qty} picked — a started pick cannot be deleted; short it or cancel the pick itself (picking-phase operations)`
- `pick_detail {id} взята в работу (task {id} is in work) — снять её может только фаза отбора`

## [Cancelling part of a line](39-cancelling-part-of-a-line.md)

- `Line {n}: cancelled {qty}; {open} still open`
- `Enter the quantity to cancel`
- `Enter a reason — a reduced line without one is unauditable`
- `Open an order line first`
- `Save the line first`
- `Cancel qty failed: {error}`
- `cancel_qty requires a reason`
- `cannot cancel {requested} — only {open} is still open`
- `quantity must be greater than zero`
- `line is already {status}`

## [Cancelling an order](40-cancelling-an-order.md)

- `Order cancelled`
- `Cancel failed: {error}`
- `Open an order first`
- `Enter a cancel reason first — it is the record of why the order was dropped`
- `Reload the order before cancelling it`
- `cancel requires a reason`
- `cannot cancel an order in status {status}`
- `line {n} already has {qty} picked`

## [Working with tasks from the order](41-working-with-tasks-from-the-order.md)

- `Task {code} returned to the pool`
- `Task {code} could not be returned to the pool: {error}`
- `Task {code} reassigned`
- `Task {code} could not be reassigned: {error}`
- `Select exactly one task`
- `Say why the task is being returned to the pool`
- `Choose an operator to reassign the task to`
- `The task board has moved on — reselect the task and try again`
- `Select at least one task`
- `Deleted {n} task(s) — their picks are back in reserve`
- `{orders} has nothing left in work — press Release to dispatch again`
- `{k} not deleted: {reason}`
- `Tasks could not be deleted: {error}`

## [Cartons tab](14-cartons-tab.md) and [Cartonization exceptions tab](15-cartonization-exceptions-tab.md)

These are words in cells, not messages.
`not cartonized`, `SHIP AS IS`, `BLOCKED`, `pending`, `carton code not available`, `unknown`, `Planned`, `With exceptions`, `Stale`, `No dimensions`, `No weight`, `No candidate cartons`, `Nothing fits`, `Overweight`, `Splitting not allowed`, `fix on the pack card`, `fix in the policy`, `Stop this line`, `Let it ship as is`, `decided at {time}`.

## Server errors with no screen text of their own

- `order is locked by another operation (waited {ms}ms)`
- `system error: {text}` (the operator cannot fix it; do not retry)
- `{entity} id={id} not found`

Source of the web messages: the files `crates/services/web-ui-server/src/extensions/customization/shipment_order/*.rs` and `.../customization/task/lifecycle_action.rs`. Source of the server messages: `crates/libs/wms-outbound/src` (see each page).
