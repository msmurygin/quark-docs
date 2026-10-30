---
title: "Influence: Wave Policy"
type: user-guide
audience: customer administrator, integrator
status: draft
updated: 2026-10-11
---

# Influence: Wave Policy

A wave policy is one flat record. Its fields decide which orders enter a wave, how they are grouped and cut, when the build runs, and whether the wave is released without a person. There is no screen for it. Every field is set through the API methods `wave_policy_create` and `wave_policy_save` (key `data.policy.<field>`).

## 1. Which orders go into which wave

**What this shows.** The filters, the grouping and the size limits, in the order the builder applies them.

```mermaid
flowchart LR
    A["eligible_statuses"] --> CAND["Candidate orders"]
    B["priority_from, priority_to"] --> CAND
    C["requested_ship_days_ahead, include_undated"] --> CAND
    D["owner_id, carrier_id"] --> CAND
    CAND --> G["group_by owner, carrier, ship date"]
    G --> GR["Groups"]
    GR --> L["max_orders, max_lines"]
    L --> BA["Batches"]
    BA --> W["max_waves_per_run"]
    W --> WV["Waves of this run"]
    L -. "order has too many lines" .-> EX1["Order left out"]
    W -. "over the limit" .-> EX2["Orders wait for next run"]
```

| Field | What it changes | Visible outcome |
|---|---|---|
| `eligible_statuses` | Only orders with a status from this list. Allowed values: `New`, `PartiallyAllocated`, `Allocated`. The list must not be empty | An order in another status is never a candidate |
| `priority_from`, `priority_to` | Order priority from and to, both included (1 to 99). A smaller number is earlier | Orders outside the range are not candidates |
| `requested_ship_days_ahead` | Orders whose requested ship date is on or before today plus N days. Late orders pass. `0` means today and late | Empty means no date filter at all |
| `include_undated` | With a ship-date limit set, lets orders without a ship date pass | Without the limit it has no effect |
| `owner_id` | Orders of this owner only | Empty means all owners |
| `carrier_id` | Orders with this carrier only. An order without a carrier does not pass | Empty means all carriers and orders without a carrier |
| `group_by_owner`, `group_by_carrier`, `group_by_requested_ship_date` | Orders with different values of a flagged key never share a wave. An order without a carrier or a date forms its own group | One wave holds one owner, one carrier or one date, as flagged |
| `max_orders` (1 to 1000) | The most orders in one wave | The next order starts a new wave |
| `max_lines` (1 to 100000, may be empty) | The most not-cancelled lines in one wave. An order is never split | An order that alone has more lines is left out in every run, with the reason `order exceeds max_lines and cannot be split` |
| `max_waves_per_run` (1 to 20) | The most waves one build creates | The rest is left for the next run, with the reason `deferred by max_waves_per_run` |

Always true, whatever the policy says: the order has not been released and not cancelled, it has no claim from another wave, and it has at least one line that is not cancelled. The candidates are read in this order: lowest priority number, then earliest ship date (undated last), then lowest order id. At most 50 000 are read.

Reading notes.

- Groups are numbered in the order of their first order. Batches follow the groups in that order. So the group with the best-priority order is cut first.
- After the policy has chosen the orders, the first read is repeated for the chosen ids under the order locks. An order that changed in between is dropped with the reason `eligibility changed while acquiring order locks`.
- Preview (`wave_policy_preview`) shows the same plan and writes nothing.
- The save is a full replace. A field that is left out becomes empty or false. In particular, leaving out `auto_release` turns it off.
## 2. When the build runs and who releases the wave

**What this shows.** The schedule fields and `auto_release`.

```mermaid
flowchart TD
    S["schedule_interval_minutes and schedule_starts_at"] --> NR["next_run_at"]
    I["is_active"] --> NR
    NR --> T{"Policy active and slot due?"}
    T -- "yes" --> BU["Build waves"]
    T -- "no" --> W["Nothing happens"]
    BU --> AR{"auto_release?"}
    AR -- "yes" --> PL["Wave Planned, worker releases the orders"]
    AR -- "no" --> DR["Wave stays Draft, a person releases it"]
    BU --> MV["next_run_at moves to the first slot after now"]
```

| Field | What it changes | Visible outcome |
|---|---|---|
| `schedule_interval_minutes` (1 to 10080) and `schedule_starts_at` | Both or none. The first slot is the start time, then every interval | Several missed slots give one catch-up run. The next slot is the first one after now |
| `is_active` | An inactive policy cannot be built and is never scheduled. A save with `false` clears `next_run_at` | Error on build: `wave policy {id} is inactive`. Preview still works |
| `auto_release` | On: each wave is made `Planned` and its members `Pending` in the same transaction | The orders are released by the worker within seconds. Off: a person calls `wave_release` |
| `version` | `wave_policy_save` and `wave_policy_build` must send the version they read | A stale version gives the code 40 error with the current policy |

Reading notes.

- A scheduled build runs as the system user. A build by hand runs as the caller. The worker releases the orders as the user who requested the release.
- A wave built with `auto_release` shows `Released` when the worker has finished, even if some members are `Blocked` or `Failed`.
- Nobody tells the operator about a blocked member except `wave_get` and the server log.
## 3. What a wave changes in allocation

**What this shows.** The two places where a wave touches stock or tasks.

```mermaid
flowchart LR
    M["Member order in the wave"] --> O["Worker takes members by member id"]
    O --> R["First order reserves stock first"]
    M --> TW["Task gets the wave id"]
```

Reading notes.

- The worker takes members in the order of the member id. For a wave from a policy the members are added in the plan order, so the order with the smallest priority number reserves first.
- The stock choice for each order is the same as for a single release. A wave has no stock rule of its own.
- A task of an order that is in a wave carries `wave_id`. The claim stays after the release, so a later top-up task carries it too.
## Stored only. It has no effect today.

| Field | Note |
|---|---|
| `wave_policy.code` | Only a label and the sort key of the list. Wave codes are not built from it |
| `wave_policy.description` | Returned by the API, read by nothing |
| `wave_order.priority` | Copied from the order priority by the builder, or given in `wave_add_order`. Read by nothing |
| `wave_order.sequence` | Position in the batch. It only sets the order of the member list that `wave_get` returns. It does not change the release order |
| `wave.completed_at`, statuses `InProgress`, `Completed` | Never set |
## Related pages

- [Wave build and release](12-journey-wave.md)
- [Release and Allocate an order](10-journey-release.md)
- [Waves overview (policy reference)](../../admin/policies/12-wave-overview.md)
- [Wave policy settings (policy reference)](../../admin/policies/13-wave-policy-settings.md)
