# Cartonization: a box is full at the floor

**What this shows.** What happens when the picker reports that the real box is full before the plan says so (`CARTON_FULL`).

The picker uses RF screen `PKA50` (F2 "Box full" on the route screen). The reason is one of six codes: `MASTER_DATA_DIMENSIONS`, `PROTECTIVE_PACKAGING`, `ORIENTATION_NOT_FEASIBLE`, `PRODUCT_OR_CARTON_DEFORMED`, `SOLVER_LAYOUT_NOT_FEASIBLE`, `OTHER` (needs a comment).

```mermaid
sequenceDiagram
    actor Pk as Picker
    participant Rf as RF PKA50
    participant Rpc as pick_assignment_position_close
    participant Close as close_position_in_txn
    participant Rep as repair_after_carton_full
    participant Db as exception, plan, picks, positions
    participant Tk as pick tasks

    Pk->>Rf: Box full, reason code
    Rf->>Rpc: position number, reason, comment
    Rpc->>Close: close the position
    Note over Close: locks order, lines, plan, picks, tasks, assignment
    Close->>Db: position Closed (CartonFull)
    Close->>Db: exception row, status Resolving
    alt position has a planned carton
        Close->>Rep: replan the unpicked rest
        Note over Rep: own savepoint, child plan, full box frozen
        alt repair works
            Rep->>Db: child plan, new cartons, picks
            Close->>Db: first new cartons become open positions
            Close->>Tk: the rest leaves the carrier, tasks go to the pool
            Close->>Db: exception Resolved
        else repair fails
            Rep-->>Close: failure code
            Close->>Db: exception RecoveryRequired
            Note over Db: picks stay members of the closed position
        end
    else position has no plan (Bypassed)
        Close->>Db: rest becomes a continuation
        Close->>Db: exception Resolved
    end
    Rpc-->>Rf: next_action
```

## Rules in the diagram

- The full box stays on the carrier until delivery. It keeps only what was picked.
- The repair makes new whole cartons for the unpicked rest. Every other standing carton takes nothing new during this repair.
- A failed repair never undoes the close. The fact is kept as `RecoveryRequired`. See [16](16-cartonization-exception-recovery.md).
- A replay with a new key on a position that is already closed full answers the existing exception.
- `pick_assignment_position_close` is a stateless command. Roles: Admin, Manager, Supervisor, Operator.
## Related pages

- [Cartonization: how it works](../../admin/policies/30-cartonization-overview.md)
- [Picking (operator)](../../operator/09-picking.md)
- [Recovery of a failed repair](16-cartonization-exception-recovery.md)
- [Overview of this area](00-overview.md)
