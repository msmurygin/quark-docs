# What happens when the operator finds less stock (short pick)

**What this shows.** The two phases of a short pick: the transaction of `pick_short`, then the clean-up that a background worker runs from the event. The operator's other way out, `pick_reject`, is on [page 30](30-task-return-paths.md).

```mermaid
sequenceDiagram
    actor Op as Operator
    participant RF as RF PICK10, PICK10R, PICK10C
    participant Short as pick_short
    participant Inv as Inventory
    participant DB as Tables and outbox
    participant Worker as Remediation worker

    Op->>RF: found quantity, reason code, note
    RF->>Short: pick_short
    Short->>DB: published reason, enabled actions
    Short->>Short: quantity and reason checks
    alt found above 0
        Short->>Short: instructions accepted, source proven
        Short->>Inv: found quantity onto pallet or box
    else nothing found
        Short->>DB: pick leaves its episode
    end
    Short->>Inv: release the part not found
    Short->>DB: pick Shorted, line and order updated
    opt reason has BlockSourceLocation
        Short->>DB: location flag CycleCountActive
    end
    Short->>DB: task Shorted, reason, note
    Short->>DB: event with a copy of the actions
    Short-->>RF: result (PICK12)
    Worker->>DB: read the event
    Worker->>DB: release related reservations
    Worker->>DB: residual stock to Lost
    Worker->>DB: request a count
    Worker->>DB: allocate affected orders again
```

## Reading the diagram

- Everything above the event is one transaction. If any rule fails, nothing is written.
- The reason is read from the **published** revision of the code the operator typed. No published revision means the short is refused. Disabled actions are dropped at read time and are not copied to the event.
- `Allow Partial` and `Allow Zero` of the reason decide which quantities the reason accepts. The quantity must be below the remaining quantity. To pick everything, the operator commits.
- A zero short deposits nothing, needs no pallet or box, proves nothing and does not move a cart.
- The note has at most 200 characters.
- `BlockSourceLocation` blocks the whole source location, whatever the `Scope`. Dispatch gives no new work from it (`LOCATION_BLOCKED`) and allocation skips it. A task already held may still finish at the blocked location.
- The worker steps run in this fixed order, whatever `Trigger After` says: release related reservations, move the residual to Lost, count, re-allocate. Related picks are released only when the task is `Created` with nothing done, or there is no task. A pick whose task is held stays.
- The count is requested after the move. A refused count does not fail the clean-up (`Required` is off in the seeded reasons). The location then stays blocked until someone counts it.
- The delivery to the worker is retried by the integration delivery (seeded subscriber `quark_outbound_execution`). Each step is safe to repeat.
- `HoldInventory`, `HoldContainer` and `RequestSupervisorReview` can be stored on a reason but no code runs them. See [short reasons: what each setting changes](53-influence-short-reasons.md).
## Related pages

- [Short reasons: what each setting changes](53-influence-short-reasons.md)
- [Task return paths](30-task-return-paths.md)
- [Pick short reasons (policy reference)](../../admin/policies/23-pick-short-reasons.md)
- [Inventory count policy](../../admin/policies/24-inventory-count-policy.md)
