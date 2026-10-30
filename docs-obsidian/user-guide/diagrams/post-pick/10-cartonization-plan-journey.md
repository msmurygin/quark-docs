# Cartonization: how a plan is made

**What this shows.** The steps from "Release" or "Allocate" on an order to a saved carton plan, and how the plan reaches the pickers.

There is no button and no RPC for cartonization. It runs inside the reserve command. If it fails, the reservation stays and the command result carries the error text.

```mermaid
sequenceDiagram
    actor Sup as Planner
    participant Rpc as Release or Allocate
    participant Alloc as allocate_order_lines
    participant Door as ensure_plan_reporting
    participant Read as read reservation
    participant Solve as plan_reservation_over
    participant Write as write_plan
    participant Db as plan tables and picks
    participant Task as task generator

    Sup->>Rpc: press Release or Allocate
    Rpc->>Alloc: reserve stock, create picks
    Alloc->>Door: order id, version, released flag
    Note over Door: opens a savepoint
    Door->>Read: picks Allocated or Released
    Read-->>Door: groups and bypassed picks
    Door->>Solve: groups, policy, cartons
    Solve-->>Door: cartons and unplaced units
    alt same input hash as the live plan
        Door-->>Alloc: no new plan
    else input changed or no plan yet
        Door->>Door: validate the proposal
        Door->>Db: old plan Superseded
        Door->>Write: save the new plan
        Write->>Db: plan, cartons, placements, unplaced
        Write->>Db: pick outcome and carton
    end
    Note over Door: any error rolls back to the savepoint
    Door-->>Alloc: plan, or error text
    opt order is released
        Alloc->>Task: picks that can be executed
        Task->>Db: pick tasks
    end
    Alloc-->>Sup: result with cartonization or cartonization_error
```

## What the steps mean

| Step | What happens |
|---|---|
| Savepoint | The whole attempt is nested in the reserve transaction. A failure undoes only the plan, not the reservation. |
| Read reservation | Only picks with status `Allocated` or `Released` are read. A pick quantity becomes whole units of the pick's pack level. |
| Bypassed picks | A pick skips the solver when its pack level is unknown, is a factory package, is not cartonized, or no policy resolves. See [11](11-cartonization-influence-policy-and-pack-level.md). |
| Input hash | After release, if the hash of the input equals the live plan, nothing is rewritten. |
| After release | The engine plans only the new work around boxes that already stand. Before release it makes a full new plan. |
| Write | Plan status is `Planned`, or `PlannedWithExceptions` if any unit is unplaced. A pick that spans two cartons is split into two pick rows. |
| Tasks | Only picks whose outcome is `Planned`, `ShipAsIs` or `Bypassed` get a task. `Pending` and `Blocked` get none. Tasks are created only when the order is released. |

Plans are also marked after other commands: `Unallocate` and `Delete Selected` (picks) call `plan_lost_its_work`, which sets the live plan to `Superseded` or `Stale`.
## Related pages

- [Cartonization policy: how it works](../../admin/policies/30-cartonization-overview.md)
- [Cartonization policy settings](../../admin/policies/31-cartonization-policy-settings.md)
- [Releasing an order](../../reference/outbound/35-releasing-an-order.md)
- [Cartons tab](../../reference/outbound/14-cartons-tab.md)
- [Overview of this area](00-overview.md)
