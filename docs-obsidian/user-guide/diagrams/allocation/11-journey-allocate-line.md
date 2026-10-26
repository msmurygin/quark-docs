---
title: "Journey: Allocation of One Order Line"
type: user-guide
audience: customer administrator, integrator, support
status: draft
updated: 2026-10-11
---

# Journey: Allocation of One Order Line

The allocation pass handles the lines of an order one by one, in `line_no` order. This page follows one line from "how much is open" to the `pick_detail` rows.

## 1. From the open quantity to the picks

**What this shows.** The planning phase reads stock but locks nothing. The reserving phase locks each chosen stock row and writes. A line that loses a race is planned once more.

```mermaid
sequenceDiagram
    participant LN as allocate_line
    participant POL as Frozen policy
    participant PL as Plan (trace.rs)
    participant ATP as Stock read
    participant SEL as select
    participant RES as reserve_draw
    participant DB as Database

    LN->>LN: need = ordered - cancelled - allocated
    LN->>PL: plan the line
    PL->>POL: load policy id and version of the line
    POL-->>PL: active steps by sequence
    PL->>DB: read sku rotation, pack units
    PL->>PL: split need over units named by steps
    loop each step by sequence
        PL->>ATP: candidates for this step
        ATP-->>PL: balance rows with atp above 0
        PL->>SEL: LPN rule, quantity fit, sort, take greedily
        SEL-->>PL: draws and remainder
    end
    PL-->>LN: draws sorted by balance id, short
    loop each draw
        LN->>RES: reserve this draw
        RES->>DB: lock line, container, balance (skip locked)
        RES->>DB: check holds and available again
        RES->>DB: qty_allocated on balance and line
        RES->>DB: insert pick_detail Allocated
        RES-->>LN: Taken, Raced, Gone or Contended
    end
    LN->>PL: plan again without tried rows (once, if Raced or Gone)
    LN->>DB: event process.order.line_allocated
```

Reading notes.

- If the open quantity is zero or less, the line is skipped without a message.
- Configuration faults are errors, not shortages. They stop the command: no policy on the line, policy version changed, no active step, a step the build cannot run, a pack with no active unit, a policy that names no unit of the pack, a `rotate_by` outside the code list.
- A step that has no share and no carry is skipped without reading stock (verdict `no_quantity_for_uom`).
- The pick keeps the policy id, the policy version, the step id and the step version that made it.
- `Contended` means the row (or its LPN) was locked by another transaction. The quantity is counted as deferred, not as short, and is not retried inside this command (see [page 14](14-journey-top-up.md)).
- The result of a line: `reserved_now` (allocated), `stock_short`, `contention_deferred`. `short = need - allocated - deferred`.

### Where it comes from

| Step in the diagram | Code |
|---|---|
| Open quantity `ordered - cancelled - allocated`; zero or less skips the line | `crates/libs/wms-outbound/src/domain/shipment_order_line/aggregate.rs:69-71`, `crates/libs/wms-outbound/src/service/order/allocate.rs:493-504` |
| Lines in `line_no` order | `crates/libs/wms-lib-core/src/model/outbound/shipment_order_line.rs:220-230` |
| Plan the line (same code for the preview) | `crates/libs/wms-outbound/src/allocation/trace.rs:260-313` |
| Frozen policy: id and version from the line; version must match; active steps; the whole policy is refused if one step cannot run | `crates/libs/wms-outbound/src/allocation/policy.rs:203-230` |
| SKU facts: rotation, `rotate_by`, minimum shelf life on pick and shelf life (reserve limit) | `crates/libs/wms-outbound/src/allocation/trace.rs` |
| Pack units: active, `base_qty` above 0, biggest first | `crates/libs/wms-outbound/src/allocation/plan.rs:83-102` |
| Split of the need over the units that active steps name | `crates/libs/wms-outbound/src/allocation/trace.rs:330-436`, `crates/libs/wms-lib-core/src/model/pack/breakdown.rs:72-110` |
| Step loop: share of the unit plus the carry of earlier steps | `crates/libs/wms-outbound/src/allocation/trace.rs:534-553` |
| Stock read per step | `crates/libs/wms-outbound/src/allocation/trace.rs:574-575`, `crates/libs/wms-lib-core/src/model/inventory/inventory_balance_atp.rs:430-473` |
| Earlier steps of the same plan are subtracted from the same row | `crates/libs/wms-outbound/src/allocation/trace.rs:585-590` |
| LPN rule, quantity fit, sort ranks, greedy take | `crates/libs/wms-outbound/src/allocation/select.rs:162-216` |
| Plan sorted by balance id; short = unit gap + carry | `crates/libs/wms-outbound/src/allocation/trace.rs:680-698` |
| Reserve: lock line, skip-locked container and balance, hold re-check, counters, `pick_detail` | `crates/libs/wms-outbound/src/allocation/reserve.rs:100-239` |
| Result values `Taken`, `Raced`, `Contended`, `Gone` | `crates/libs/wms-outbound/src/allocation/reserve.rs:76-91` |
| Raced or Gone: one new plan without the tried rows | `crates/libs/wms-outbound/src/service/order/allocate.rs:549-610` |
| Event `process.order.line_allocated` | `crates/libs/wms-outbound/src/service/order/allocate.rs:616-636` |
| Short is not counted for deferred quantity | `crates/libs/wms-outbound/src/service/order/allocate.rs:667-669` |

## 2. What the whole pass does after the last line

**What this shows.** The three things that follow the line loop.

```mermaid
flowchart TD
    A["All lines handled"] --> B["Build carton plan"]
    B --> C{"Order has released_at?"}
    C -- "no" --> F["Recompute statuses"]
    C -- "yes" --> D["Live picks without a task"]
    D --> E{"Pick can get a task now?"}
    E -- "carton plan ready" --> G["Create task, pick Released"]
    E -- "plan pending or blocked" --> H["No task yet"]
    G --> F
    H --> F
```

Reading notes.

- A failure of the carton plan does not undo the reservation. The error is returned in `cartonization_error`.
- The task step looks at all live picks of the order that have no task, not only the picks of this run.
- A pick gets a task only when its carton outcome is executable (`Planned` with a carton, `ShipAsIs` with the factory-package proof, or `Bypassed`). `Pending` and `Blocked` picks wait.
- The task carries the order priority and, if the order is in a wave, the wave id.

### Where it comes from

| Step in the diagram | Code |
|---|---|
| Carton plan after the reservation, a failure is reported not thrown | `crates/libs/wms-outbound/src/service/order/allocate.rs:398-405` |
| Tasks only when `released_at` is set; all live picks of the order | `crates/libs/wms-outbound/src/service/order/allocate.rs:407-437` |
| Which carton outcomes are executable | `crates/libs/wms-outbound/src/cartonization/handoff.rs:27-67` |
| Create the task and set the pick to `Released` | `crates/libs/wms-outbound/src/picking/infrastructure/tasks.rs:119-143` |
| Wave id for the task | `crates/libs/wms-outbound/src/waves/task_grouping.rs:8-18` |
| Statuses recomputed | `crates/libs/wms-outbound/src/service/order/allocate.rs:444` |

## Not shown here

- The carton plan itself (policy, boxes, weights) belongs to the cartonization area.
- What the operator does with the task belongs to the picking area. See [picking](../../operator/09-picking.md).

## Related pages

- [Release and Allocate an order](10-journey-release.md)
- [Which stock is eligible](20-influence-policy-source.md)
- [How the stock is chosen](21-influence-policy-selection.md)
- [Allocation overview (policy reference)](../../admin/policies/10-allocation-overview.md)
- [Allocation policy: steps and criteria](../../admin/policies/11-allocation-policy-steps-and-criteria.md)
