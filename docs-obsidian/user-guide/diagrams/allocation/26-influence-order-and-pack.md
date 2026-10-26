---
title: "Influence: Order, Line, Pack and Owner Facts"
type: user-guide
audience: customer administrator, integrator
status: draft
updated: 2026-10-11
---

# Influence: Order, Line, Pack and Owner Facts

Besides the policies, allocation reads a few facts of the order, its lines, the pack of the SKU and the owner. This page lists the ones that change a decision, and the ones that look like settings but are not read.

## 1. Facts of the order header

**What this shows.** Which header field changes which decision.

```mermaid
flowchart LR
    ST["Order status"] -- "Closed, Cancelled, Picked" --> RF["Allocate refused"]
    RA["released_at"] -- "empty" --> NT["Stock reserved, no tasks"]
    RA -- "set" --> TK["Stock reserved and tasks created"]
    PR["Order priority"] --> TP["Priority of the tasks"]
    PR --> WP["Wave policy: range and order"]
    SD["Requested ship date"] --> WP
    CA["Carrier"] --> WP
    OT["Order type"] --> CK["Must exist and be active"]
```

| Field | What it changes | Visible outcome |
|---|---|---|
| `shipment_order.status` | `Allocate` is refused for `Closed`, `Cancelled` and `Picked` | Error: `cannot allocate an order in status {status}` |
| `shipment_order.released_at` | Tasks are created only when it is set | `Allocate` on a `New` order reserves and creates no task. `Release` sets it, then reserves and creates tasks |
| `shipment_order.priority` | Copied to the priority of each task made by the allocation pass. Also used by the wave policy (range and order) | No effect on which stock is reserved or which order is served first by `Allocate` |
| `shipment_order.requested_ship_date` | Wave policy only: the ship-date limit and the sort | No effect on allocation |
| `shipment_order.carrier_id` | Wave policy only: filter and grouping | No effect on allocation |
| `shipment_order.ship_to_id` | Must be an owner of type `Cus` for release. The address is frozen at the first release | Release refused with `ship_to owner {id} is not a customer` |
| `order_type` (by code) | Must exist and be active when the order is created or its type changed. Nothing else is read from it | `order type '{code}' is inactive`, or `not found` |

Reading notes.

- There is no rule that gives one order priority over another in `Allocate`. The command that takes the lock first gets the stock. Inside a wave, the member order decides (see [page 25](25-influence-wave-policy.md)).
- The order type has the columns `requires_release` and `allows_partial_ship`. No code reads them. The column `auto_allocate_on_release` was dropped: release always allocates.
- A shortage never blocks the release.

### Where it comes from

| Rule | Code |
|---|---|
| Status gate | `crates/libs/wms-outbound/src/service/order/allocate.rs:310-315` |
| Tasks only when `released_at` is set | `crates/libs/wms-outbound/src/service/order/allocate.rs:407-437` |
| Order priority goes to the task | `crates/libs/wms-outbound/src/service/order/allocate.rs:427-434` |
| Wave policy reads priority, ship date, carrier | `crates/libs/wms-lib-core/src/model/outbound/wave_policy.rs:330-343` |
| Ship-to must be a customer | `crates/libs/wms-outbound/src/service/shared/lookups.rs:105-115`, `crates/libs/wms-outbound/src/service/order/validate.rs:60-135` |
| Order type: existence and active check at create and update | `crates/libs/wms-outbound/src/service/shared/lookups.rs:31-45`, `crates/libs/wms-outbound/src/service/order/create.rs:155`, `crates/libs/wms-outbound/src/service/order/update.rs:84-111` |
| Order type columns; the dropped flag | `crates/libs/wms-lib-core/src/model/outbound/order_type.rs:18-30` |
| `release` always allocates | `crates/libs/wms-outbound/src/service/order/release.rs:17-23` |

## 2. Facts of the line, the SKU and the pack

**What this shows.** The quantity the line asks for, and which stock and which units are even considered.

```mermaid
flowchart LR
    Q["qty ordered, cancelled, allocated"] --> NEED["Open quantity"]
    NEED --> SHORT["Short if stock is less"]
    PK["Pack of the line"] --> ROWS["Only stock rows with this pack"]
    PU["Pack units: active, base qty above 0"] --> SPLIT["Units a step can use"]
    SK["SKU active, pack carries the UOM"] --> RC["Release checks"]
    OW["Owner of the line"] --> ROWS
    OP["Owner default policy"] --> POL["Policy when SKU has none"]
```

| Field | What it changes | Visible outcome |
|---|---|---|
| `shipment_order_line.qty_ordered`, `qty_cancelled`, `qty_allocated` | Open quantity = ordered - cancelled - allocated. Zero or less: the line is skipped | Each press of `Allocate` works on the open quantity only. Earlier picks stay |
| `shipment_order_line.pack_id` | Frozen from the SKU when the line is created. Only stock rows with the same pack are candidates | A balance with another pack is never reserved |
| `pack_item.is_active`, `pack_item.base_qty` | Only active units with `base_qty` above 0 form the ladder | A unit switched off in the pack is not used for new allocations. The line keeps its frozen snapshot |
| `shipment_order_line.uom`, `uom_factor` | The unit the line was entered in, and its factor, frozen at creation. The quantity of the line is in base units. The factor is used when the picker confirms | Allocation does not multiply the quantity by the factor |
| `sku.active` | An inactive SKU cannot be released | `sku '{sku}' is inactive` |
| `sku.allocation_policy_id`, `owner_config.default_allocation_policy_id` | See [page 22](22-influence-policy-binding.md) | |
| Owner of the line | Only stock of the same owner is a candidate | Stock of another owner is never reserved |

Reading notes.

- `sku.abc` is not read by allocation. The step field `Location ABC` filters the `abc` of the location.
- The pack of the line is frozen at creation, but the ladder is read again at every allocation. That is intended in the code: an order keeps what it meant, and a new allocation uses what the pack offers now.
- The line quantity is in base units. The field is documented in the order create command as `Quantity in BASE units`.

### Where it comes from

| Rule | Code |
|---|---|
| Open quantity | `crates/libs/wms-outbound/src/domain/shipment_order_line/aggregate.rs:69-71` |
| Pack and owner match in the stock read | `crates/libs/wms-lib-core/src/model/inventory/inventory_balance_atp.rs:454-456` |
| Pack and factor frozen on the line | `crates/libs/wms-outbound/src/service/shared/lookups.rs:56-95`, `crates/libs/wms-outbound/src/service/order/create.rs:246` |
| Ladder read again at each allocation, active units only | `crates/libs/wms-outbound/src/allocation/plan.rs:36-47`, `crates/libs/wms-outbound/src/allocation/plan.rs:83-102` |
| Quantity in base units | `crates/libs/wms-outbound/src/service/order/create.rs:48-51` |
| `uom_factor` used at pick commit | `crates/libs/wms-outbound/src/picking/commands/commit.rs:426` |
| SKU must be active and carry the UOM | `crates/libs/wms-outbound/src/service/shared/lookups.rs:56-95` |

## Related pages

- [Where the policy of a line comes from](22-influence-policy-binding.md)
- [Wave policy](25-influence-wave-policy.md)
- [Order status after allocation](28-order-status.md)
- [Owners, SKU, UOM and pack hierarchy](../../admin/04-owners-sku-uom-pack-hierarchy.md)
- [Outbound setup](../../admin/06-outbound-setup.md)
