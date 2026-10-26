---
title: "Journey: Wave Build and Release"
type: user-guide
audience: customer administrator, integrator, support
status: draft
updated: 2026-10-11
---

# Journey: Wave Build and Release

A wave groups orders that are released together. There is no web screen or RF screen for waves. Everything runs through the API methods `wave_*` and `wave_policy_*` and through two background loops of `app-server`. A wave does not allocate by itself. For every member it runs the same `ReleaseShipmentOrder` command as the `Release` button (see [page 10](10-journey-release.md)).

## 1. How a policy builds waves

**What this shows.** One build, started by hand (`wave_policy_build`) or by the scheduler for a due slot.

```mermaid
sequenceDiagram
    participant C as Caller or scheduler
    participant B as Policy builder
    participant DB as Database

    C->>B: wave_policy_build, or a due slot
    B->>DB: lock wave_policy row
    B->>B: refuse if version old or policy inactive
    B->>DB: read candidate orders
    B->>B: group, then cut batches
    B->>DB: lock chosen orders by id, read again
    B->>DB: insert wave_policy_run
    loop each batch up to max_waves_per_run
        B->>DB: insert wave Draft
        B->>DB: insert wave_order members and claims
        opt auto_release is on
            B->>DB: wave Planned, members Pending
        end
    end
    B->>DB: close run with counts
```

Reading notes.

- The filters, the grouping and the size limits come from the wave policy. They are drawn on [page 25](25-influence-wave-policy.md).
- The build is one transaction. A scheduled slot that fails is rolled back and then recorded as a run with `outcome = Failed`. The schedule moves to the next slot.
- The scheduler wakes every 5 seconds and takes at most 10 due slots per warehouse. A policy row is taken with "skip locked", so two servers never build the same slot.
- Every member gets a claim row. An order with a claim cannot enter another wave.

### Where it comes from

| Step in the diagram | Code |
|---|---|
| Build entry, lock the policy, version and active checks | `crates/libs/wms-outbound/src/waves/policy.rs:225-236` |
| Candidate read, planning, second read under order locks, run and waves | `crates/libs/wms-outbound/src/waves/policy.rs:239-343` |
| Candidate SQL (filters, order by priority, ship date, id) | `crates/libs/wms-lib-core/src/model/outbound/wave_policy.rs:311-344` |
| Grouping and batches | `crates/libs/wms-outbound/src/waves/policy.rs:430-510` |
| Member and claim rows | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:452-488` |
| `auto_release` prepares the release in the same transaction | `crates/libs/wms-outbound/src/waves/policy.rs:288-294` |
| Scheduler: lock one due policy, build, move `next_run_at` | `crates/libs/wms-outbound/src/waves/scheduler.rs:36-108`, `crates/libs/wms-lib-core/src/model/outbound/wave_policy.rs:261-305` |
| A failed slot is recorded as a failed run | `crates/libs/wms-outbound/src/waves/scheduler.rs:111-136` |
| Loop timing: 5 seconds, 10 slots | `crates/services/app-server/src/services/cleanup_tasks.rs:160-163`, `crates/services/app-server/src/services/cleanup_tasks.rs:289-325` |
| API methods and roles | `crates/services/app-server/src/web/rpcs/wave_rpc.rs:46-270` |

## 2. How a wave releases its orders

**What this shows.** `wave_release` only queues the work. A worker releases the orders one by one.

```mermaid
sequenceDiagram
    participant C as API caller
    participant W as Wave commands
    participant K as Release worker
    participant R as ReleaseShipmentOrder
    participant DB as Database

    C->>W: wave_release (wave version)
    W->>DB: lock orders by id, then wave
    W->>DB: wave Planned, members Pending
    W-->>C: wave and progress counts
    loop every 2 seconds, up to 100 members
        K->>DB: claim lowest Pending member id
        K->>R: release the order (stored version and key)
        R->>DB: allocate, create tasks (page 10)
        K->>DB: member outcome
        K->>DB: wave Released when none Pending or Processing
    end
    C->>W: wave_retry_blocked (after a fix)
    W->>DB: Blocked and Failed members back to Pending
    W->>DB: wave back to Planned
```

Reading notes.

- The worker takes members in the order of the member id. For a wave from a policy, that is the order of the plan: lowest order priority number first, then earliest requested ship date, then lowest order id. So the first order of a wave reserves its stock first. `wave_order.priority` and `wave_order.sequence` do not change this.
- Every member is released in its own transaction. No transaction covers a whole wave.
- The member outcome is `Released`, `Skipped` (the order was already released), `Blocked` (business refusal, not found, bad transition, version conflict) or `Failed` (anything else).
- A wave that shows `Released` is only "settled". Members can still be `Blocked` or `Failed`. Read the member counts.
- A shortage of stock does not block a member. A bad allocation policy does not block it either: the order still launches, and the allocation error stays in the order release result, not in the wave.

### Where it comes from

| Step in the diagram | Code |
|---|---|
| Freeze: lock orders, wave must be `Draft`, not empty, all members `Draft` | `crates/libs/wms-outbound/src/waves/commands.rs:254-303`, `crates/libs/wms-outbound/src/domain/wave/aggregate.rs:140-157` |
| Claim: lowest `wave_order.id`, lease of 300 seconds | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:608-641`, `crates/libs/wms-outbound/src/waves/worker.rs:14` |
| The worker runs `ReleaseShipmentOrder` | `crates/libs/wms-outbound/src/waves/worker.rs:84-158` |
| Outcome classes | `crates/libs/wms-outbound/src/waves/worker.rs:160-188` |
| Record outcome and settle the wave | `crates/libs/wms-outbound/src/waves/worker.rs:190-263`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:337-373` |
| Loop timing: 2 seconds, 100 members per warehouse | `crates/services/app-server/src/services/cleanup_tasks.rs:156-159`, `crates/services/app-server/src/services/cleanup_tasks.rs:251-285` |
| Retry: wave must be `Released`, a member must be `Blocked` or `Failed` | `crates/libs/wms-outbound/src/waves/commands.rs:305-362`, `crates/libs/wms-outbound/src/domain/wave/aggregate.rs:159-179` |
| Retry puts members to `Pending` and the wave to `Planned` | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:309-331`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:695-725` |

## 3. Statuses of a wave and of a member

**What this shows.** Every change of status that code performs. `InProgress` and `Completed` exist in the enum, but no code sets them.

Status of the wave (`wave.status`):

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Draft: wave created
    Draft --> Planned: wave_release or auto_release
    Planned --> Released: no member Pending or Processing
    Released --> Planned: wave_retry_blocked
    Draft --> Cancelled: wave_cancel
    Planned --> Cancelled: wave_cancel
```

Status of a member (`wave_order.status`):

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Draft: order added
    Draft --> Pending: wave_release
    Pending --> Processing: worker claims
    Processing --> Released: order released
    Processing --> Skipped: order already released
    Processing --> Blocked: business refusal
    Processing --> Failed: other error
    Blocked --> Pending: wave_retry_blocked
    Failed --> Pending: wave_retry_blocked
    Pending --> Blocked: wave_cancel
```

Reading notes.

- `wave_cancel` is refused when a member is `Processing`, `Released` or `Skipped`. Queued members become `Blocked` with `last_error_code = WAVE_CANCELLED`, and the claims of the wave are deleted.
- A `Processing` member that nobody finishes within 300 seconds is claimed again by the worker.

### Where it comes from

| Change | Code |
|---|---|
| Wave `Cancelled`, `Planned` (freeze), `Planned` (reopen), `Released` (settle) | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:274`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:298`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:324`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:350` |
| Cancel rule: only `Draft` or `Planned`, no started member | `crates/libs/wms-outbound/src/domain/wave/aggregate.rs:123-138` |
| Member `Blocked` on cancel, `Pending` on freeze, `Processing` on claim, outcome, `Pending` on retry | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:560`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:585`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:631`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:676`, `crates/libs/wms-lib-core/src/model/outbound/wave.rs:710` |
| Statuses `InProgress`, `Completed` exist but are never assigned | `crates/libs/wms-lib-core/src/model/outbound/wave.rs:25-26` |

## Not shown here

- Nothing in the code moves a wave to `Completed`, so there is no "wave finished" step to draw. The field `wave.completed_at` is never written.
- Sorting, loading and shipping after the pick are not part of a wave in the code.

## Related pages

- [Wave policy: which setting changes what](25-influence-wave-policy.md)
- [Release and Allocate an order](10-journey-release.md)
- [Waves overview (policy reference)](../../admin/policies/12-wave-overview.md)
- [Wave policy settings (policy reference)](../../admin/policies/13-wave-policy-settings.md)
