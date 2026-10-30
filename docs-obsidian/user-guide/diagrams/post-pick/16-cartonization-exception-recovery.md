# Cartonization: recovery of a failed box-full repair

**What this shows.** The two ways out of `RecoveryRequired`: the picker hands the picks over, or a supervisor retries the repair.

While an exception is `RecoveryRequired`, its picks stay members of the closed position. The route, dissolve and delivery refuse them with `CARTON_REPLAN_REQUIRED`.

```mermaid
sequenceDiagram
    actor Pk as Picker
    actor Sv as Supervisor
    participant Ho as pick_assignment_position_hand_over
    participant Re as cartonization_exception_retry
    participant Run as run_repair
    participant Db as exception, picks, tasks

    Note over Db: exception is RecoveryRequired
    opt Picker hands the picks over
        Pk->>Ho: position number
        Ho->>Db: picks leave the carrier, outcome Blocked
        Ho->>Db: tasks go back to the pool
        Ho->>Db: handed_over_at is set
    end
    Note over Sv: fixes the data first (pack card or policy)
    Sv->>Re: retry the exception
    alt picks still on a carrier
        Re->>Db: hand them over first, tasks Seized
    end
    alt none of its picks is a live reservation
        Re->>Db: exception Cancelled, CARTON_REPLAN_NOTHING_LEFT
    else
        Re->>Run: repair the same exception
        alt repair works
            Run->>Db: picks planned into new whole cartons
            Re->>Db: exception Resolved
        else repair fails again
            Run->>Db: stays RecoveryRequired with the new error
        end
    end
```

## Rules in the diagram

- Retry is a stateless command for Admin, Manager and Supervisor. It does not change data. Fix the pack card or the policy first. With nothing changed, the same answer comes back.
- The screen is Task Manager, "Pick Target Exceptions". The read RPC is `cartonization_exception_list`.
- `Resolved` and `Cancelled` are final. A retry of a finished exception answers its stored result.
## Related pages

- [Cartonization: how it works](../../admin/policies/30-cartonization-overview.md)
- [Box is full at the floor](15-cartonization-box-full-exception.md)
- [Working with tasks from the order](../../reference/outbound/41-working-with-tasks-from-the-order.md)
- [Overview of this area](00-overview.md)
