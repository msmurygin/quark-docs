---
title: "Journey: Unallocate and Cancel"
type: user-guide
audience: customer administrator, integrator, support
status: draft
updated: 2026-10-11
---

# Journey: Unallocate and Cancel

Stock that an order has reserved comes back in four ways: the `Unallocate` button, deleting one pick, cancelling the order, and a short pick (see [page 14](14-journey-top-up.md)). This page shows what each one frees and what it keeps.

## 1. What the `Unallocate` button does

**What this shows.** `Unallocate` frees the picks that nobody works on and keeps the rest.

```mermaid
sequenceDiagram
    actor Op as Operator
    participant UI as Order screen
    participant API as app-server RPC
    participant CMD as CancelOrderAllocation
    participant REL as release_allocation_for_order
    participant DB as Database

    Op->>UI: press Unallocate
    UI->>API: shipment_order_cancel_allocation
    API->>CMD: run under order lock
    CMD->>CMD: status must be Allocated or Released family
    CMD->>REL: all lines, skip picks in work
    REL->>DB: lock lines, picks, tasks, balances (in order)
    REL->>DB: balance qty_allocated down
    REL->>DB: delete pick_detail and its Created task
    REL->>DB: line qty_allocated down
    REL->>DB: event process.order.line_allocation_released
    CMD->>DB: count picks still live (in work)
    CMD->>DB: clear released_at if none left
    CMD->>DB: recompute statuses
    API-->>UI: released qty, picks kept, launch_cleared
    UI-->>Op: toast "unallocated"
```

Reading notes.

- A pick is "in work" when its task has a status other than `Created`. Those picks stay, with their task and their reservation.
- If the order was released and no live pick is left, the release marker is cleared. The order goes back to `New`, and the toast adds `order back to New`.
- If some picks stay, the toast adds `N pick(s) in work kept`.
- The statuses accepted by the button: `PartiallyAllocated`, `Allocated`, `PartiallyReleased`, `Released`. Any other status is refused as an invalid transition.
- The freed stock is available again at once. Nothing allocates it again by itself. Somebody must press `Allocate` or `Release`.
## 2. Which action frees which reservation

**What this shows.** The five actions that touch a reservation, and the rule each one applies.

```mermaid
flowchart TD
    R["Reserved stock of an order"]
    R --> U["Unallocate"]
    R --> P["Delete one pick"]
    R --> C["Cancel order"]
    R --> Q["Cancel qty of a line"]
    R --> E["Edit or remove a line"]
    U --> U1["Frees picks with task Created or no task"]
    U --> U2["Keeps picks with a task in work"]
    P --> P1["Frees one pick: nothing picked, task not in work"]
    C --> C1["Frees all live picks and deletes their tasks"]
    C --> C2["Refused if any line has picked qty"]
    Q --> Q1["Cancels only qty that is not reserved"]
    E --> E1["Adjust qty cannot go below allocated plus cancelled"]
    E --> E2["Remove or edit needs New family and no reservation"]
```

Reading notes.

- `Cancel order` uses the scope "all". It frees every live pick (`Allocated` or `Released`), also those with a task in work, and deletes the task of each. It is refused only when some line already has picked quantity.
- `Cancel qty` works on `ordered - cancelled - max(allocated, shipped)`. A reserved unit cannot be cancelled. Unallocate it first.
- `Adjust qty` sets a new absolute quantity. It is refused below `allocated + cancelled`.
- Removing a line, or changing a line through the editor, is allowed only while the order is in the `New` family without a release marker, and only if the line has no reserved quantity. The refusal text says: `release the reservation first (Unallocate or delete its picks)`.
- Unallocating does not change the policy of a line. The line keeps the policy it froze when it was created or last saved (see [page 22](22-influence-policy-binding.md)).
## Related pages

- [Release and Allocate an order](10-journey-release.md)
- [Top-up and short pick](14-journey-top-up.md)
- [What a reservation protects](27-reservation-protects-stock.md)
- [Order status after allocation](28-order-status.md)
- [Allocation overview (policy reference)](../../admin/policies/10-allocation-overview.md)
