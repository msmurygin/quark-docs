# Line card

The line card opens in the bottom part of the [order screen](01-order-screen-overview.md) when you click a line of the [lines list](20-order-lines-list.md), or press `New` on that list.
It replaces the lines list. The form is `shipment_order_line_form`. The data table is `shipment_order_line`.
The form has a back arrow that returns to the lines list.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Line #` | `line_no` | Whole number | Yes (set by the server) | Read only. A new line gets the next number: highest number plus 1. | The number of the line. A removed line leaves a gap. The numbers are not changed afterwards. |
| `SKU` | `sku_code` | Text, up to 50 characters. Pick list of SKUs. | Yes. `Save` says `Fill in SKU first`. | A SKU of the **owner of the order** (the list is filtered by that owner). The SKU must be active. | The item. |
| `UOM` | `uom` | Text, up to 10 characters. Drop-down. | Yes. `Save` says `Fill in UOM first`. | A unit that the pack of the SKU has. | The unit the line was entered in. |
| `Ordered` | `qty_ordered` | Decimal | Yes | Greater than zero. In **base units**. | How much the customer wants. |
| `Cancelled` | `qty_cancelled` | Decimal | No | Read only. Starts at 0. | The part that was cancelled. Changes only through `Cancel Qty`. |
| `Status` | `status` | Text | No | Read only. A new line is `NotAllocated`. | The status of the line. See [Order statuses](90-order-statuses-and-transitions.md). |
| `Pick Instruction` | `pick_instruction` | Long text | No | Any text. Spaces at both ends are cut. Blank means none. | A one-off note for the picker. |

Source: form `shipment_order_line_form` in `001_baseline.sql` and `wms-meta-ui` migration 082; table `shipment_order_line` in `wms-app` `001_baseline.sql`.

> Not confirmed by code: which units the `UOM` drop-down offers. The drop-down has no list of its own in the form metadata that was read. To verify: open the card of a line whose SKU has two pack levels and open the drop-down.

## What each field affects

### SKU and UOM

- When you add the line, the server finds the pack of the SKU and the size of the unit. It keeps that size on the line (`uom_factor`), so the quantity still means the same thing months later.
- It also keeps the allocation policy of the SKU, and the version of that policy, on the line. This is the policy that Allocate uses for the line later (`crates/libs/wms-outbound/src/service/order_line/upsert.rs:105-108`).
- Refused when the SKU does not exist for this owner (`sku '{sku}' not found for owner {owner}`), is inactive (`sku '{sku}' is inactive`), or has no such unit (`sku '{sku}' has no '{uom}' unit in its pack (pack_id {id})`) (`crates/libs/wms-outbound/src/service/shared/lookups.rs:65-92`).
- Refused when neither the SKU nor its owner names an allocation policy: `sku '{sku}' (owner {owner}) has no allocation policy — neither the sku nor its owner names one; assign one before allocating` (`crates/libs/wms-outbound/src/allocation/policy.rs:112-123`).
- Read only when the order is launched, and for a line that has a reservation (`crates/libs/wms-outbound/src/service/shared/mutability.rs:78-93`).

### Ordered

- The quantity is in base units. The unit field says in which unit it was typed, not how the number is counted.
- Stays editable while the order is working. The server uses one of two commands to change it. See [Changing a line quantity](34-changing-a-line-quantity.md).
- Lower bound: not below what is already reserved plus what is cancelled. The message is `cannot reduce qty_ordered to {new} — {committed} is already committed — release the line's reservations first (Unallocate)` (`crates/libs/wms-outbound/src/domain/shipment_order_line/aggregate.rs:22`, `crates/libs/wms-outbound/src/service/order_line/adjust_qty.rs:128-130`).
- The database refuses 0 or less (`chk_sol_qty_ordered`).

### Pick Instruction

- Shown to the picker on the RF terminal before a pick can be committed. The picker must acknowledge it. The SKU card has a standing instruction too. Both are shown, SKU first, then the line (`crates/libs/wms-outbound/src/picking/instructions.rs:1-14`).
- Blank is stored as none.

## Toolbar

| Button | Code | What it does | Grey when |
|---|---|---|---|
| `Save` | `sol_es` | Saves the line and returns to the lines list. | The order is finished. |
| `Delete` | `sol_ed` | Removes the line. See [Editing and removing lines](33-editing-and-removing-lines.md). | The order is launched or finished, or the line has a reservation. |
| `Cancel Qty` | `sol_cancelq` | Opens the window `Cancel Quantity`. See [Cancelling part of a line](39-cancelling-part-of-a-line.md). | The order is not launched, or is finished. |

## The window `Cancel Quantity`

| Label | Column | Type | Required | What it does |
|---|---|---|---|---|
| `Quantity to cancel` | `qty` | Decimal | Yes | The amount to **remove**, in base units. Not the new total. Hint: `The amount to REMOVE from the line, in base units — not the new total.` |
| `Reason` | `reason` | Text | Yes | Hint: `Required. A reduced line without a reason is unauditable.` |

Buttons: `Cancel` closes the window. `Cancel Qty` sends the command and closes the window.
The fields belong to a temporary object (`shipment_order_cancel_qty`) that has no table.

## Related pages

- [Adding a line](32-adding-a-line.md)
- [Editing and removing lines](33-editing-and-removing-lines.md)
- [Changing a line quantity](34-changing-a-line-quantity.md)
- [Cancelling part of a line](39-cancelling-part-of-a-line.md)
- API: `shipment_order_line_upsert`, `shipment_order_line_remove`, `shipment_order_line_adjust_qty`, `shipment_order_line_cancel_qty`
- RF terminal: the pick instruction appears on screen `PICKINS` (see the [Operator guide: Picking](../../operator/09-picking.md)).
