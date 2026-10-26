# Adding a line

Use this page to add a line to an order that is not launched yet.

## Before you start

- The order is **saved**. A new order must be saved once first (see [Creating an order](30-creating-an-order.md)).
- The order is in the New family: status `New`, `Partially allocated` or `Allocated`, and it was never released. After the first release the button `New` of the lines list is grey. The server refuses too.
- You have the web action `shipment_order_line_save` and the API right `shipment_order_line_upsert`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` have both.
- The SKU belongs to the owner of the order, is active, has the unit you want in its pack, and has an allocation policy (on the SKU, or the default of its owner).

## Steps

1. Open the order.
2. In the lines list click `New`. An empty [line card](21-line-card.md) opens.
3. Pick the `SKU`. The list shows only SKUs of the owner of the order.
4. Pick the `UOM`.
5. Type the `Ordered` quantity, in base units. It must be greater than zero.
6. Type a `Pick Instruction` if the picker must read something. This is optional.
7. Click `Save`. The card closes and the lines list shows the new line.

Repeat from step 2 for the next line.

## What the screen says

| Result | Message |
|---|---|
| Saved | `Line {n} saved` |
| The order is not saved | `Save the order before adding lines to it` |
| A field is missing | `Fill in SKU, UOM first` (only the missing names are listed) |
| Quantity is empty or zero | `Ordered quantity must be greater than zero` |
| Refused by the server | `Save failed: {error}` and the grid refreshes |

Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/line_save_action.rs:104-252`.

## What changes

| What | Change |
|---|---|
| Line | A row is made with status `NotAllocated`, version 1, and the next line number (highest number plus 1). The order's owner is copied to the line. |
| Pack | The size of the unit (`uom_factor`) and the pack are looked up and kept on the line. |
| Allocation policy | The policy that governs the SKU, and its version, are kept on the line. Allocate uses these later. |
| Order | The status is worked out again. A new line that has no reservation can move an `Allocated` order back to `Partially allocated`. The order header on screen is read again. |

Source: `crates/libs/wms-outbound/src/service/order_line/upsert.rs:96-193`.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `'order line' can only be changed before the order is released ({why})` | The order is launched. | Cannot add a line. Make a new order. |
| `sku '{sku}' not found for owner {owner}` | The SKU does not exist for this owner. | Pick another SKU. |
| `sku '{sku}' is inactive` | The SKU is switched off. | Activate it on the SKU screen, or pick another. |
| `sku '{sku}' has no '{uom}' unit in its pack (pack_id {id})` | The pack has no such unit. | Pick a unit that the pack has. |
| `pack unit '{uom}' for sku '{sku}' has base_qty {n} — must be greater than zero` | The pack is wrong. | Fix the pack. |
| `sku '{sku}' (owner {owner}) has no allocation policy — neither the sku nor its owner names one; assign one before allocating` | No allocation policy found. | Set one on the SKU, or the default of the owner. |
| `qty {n} must be greater than zero` | The quantity is zero or smaller than 0.000001. | Type a real quantity. |

Source: `crates/libs/wms-outbound/src/service/shared/mutability.rs:36-67`, `lookups.rs:60-95`, `crates/libs/wms-outbound/src/allocation/policy.rs:112-140`.

## Related pages

- [Line card](21-line-card.md)
- [Editing and removing lines](33-editing-and-removing-lines.md)
- [Releasing an order](35-releasing-an-order.md)
- API: `shipment_order_line_upsert` (stateful command, version of the line; an insert sends no version)
- RF terminal: none.
