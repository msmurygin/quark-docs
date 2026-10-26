---
title: "Waves Overview"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Waves Overview

A wave is a group of shipment orders that you release together. This page explains what a wave is, how it is made and released, and what happens when a part of it fails. Page 13 lists every wave setting.

Paths start at `crates/libs/` unless they say otherwise. `file:line` shows where to check a claim.

## 1. No screen today

There is **no web screen** and no RF screen for waves or wave policies. Everything is done through the API (methods `wave_*` and `wave_policy_*`). The sidebar has no wave menu. The only places where a wave shows in the UI are indirect: the tasks carry a `wave_id`, and the orders are released. See `06-outbound-setup.md`, section 4, and `09-integrations-and-api.md`.

Wire rules for every command: send `meta.idempotency_key` (a new UUID for each new request; the same one when you repeat a request). A command on an existing wave or policy also sends the version you read (`expected_wave_version` or `expected_policy_version`) in `data`. The commands return code 40 and the current state when the version is old (`wms-outbound/src/waves/error.rs:80-120`).

| Method | What it does | Kind | Version in `data` | Roles | Code |
|---|---|---|---|---|---|
| `wave_policy_create` | Make a wave policy | stateless command | no | Admin, Manager | `app-server/src/web/rpcs/wave_rpc.rs:142` |
| `wave_policy_save` | Replace all settings of a policy | stateful command | `expected_policy_version` | Admin, Manager | `:160` |
| `wave_policy_build` | Build waves now from a policy | stateful command | `expected_policy_version` | Admin, Manager | `:179` |
| `wave_policy_get`, `wave_policy_list` | Read policies (list: 1 to 200 rows, default 50, sorted by code) | query | no | Admin, Manager, Supervisor | `:84-108` |
| `wave_policy_preview` | Show what a build would do. Writes nothing. | query | no | Admin, Manager, Supervisor | `:110` |
| `wave_create` | Make an empty manual wave | stateless command | no | Admin, Manager, Supervisor | `:124` |
| `wave_add_order` | Add an order to a Draft wave | stateful command | `expected_wave_version` | Admin, Manager, Supervisor | `:200-232` |
| `wave_remove_order` | Remove an order from a Draft wave | stateful command | `expected_wave_version` | same | same |
| `wave_cancel` | Cancel a wave before release starts | stateful command | `expected_wave_version` | same | same |
| `wave_release` | Freeze the wave and queue its orders | stateful command | `expected_wave_version` | same | `:239-280` |
| `wave_retry_blocked` | Retry the blocked or failed orders | stateful command | `expected_wave_version` | same | same |
| `wave_get`, `wave_list`, `wave_preview` | Read a wave (with members and counts), list waves, check release readiness | query | no | Admin, Manager, Supervisor | `:46-82` |

There is no method to delete a wave or a wave policy. To stop a policy, save it with `is_active = false`.

## 2. Waves compared with direct release

| | Direct release (button `Release`) | Wave release |
|---|---|---|
| Who starts it | An operator, for one order | An API caller (or a schedule), for many orders |
| What runs per order | `ReleaseShipmentOrder`: full validation, ship-to snapshot, allocation, tasks | Exactly the same command, once per order |
| Transaction | One order | One order each. **No transaction covers a whole wave.** One bad order cannot undo a good one. |
| Order of work | Immediate | Orders are queued. A background worker takes them one by one (every 2 seconds, up to 100 per warehouse per pass). |
| Result | A toast on the order screen | A status on each wave member |
| Extra effect | none | The tasks of the order carry the wave id (`task.wave_id`). Nothing reads that field except the task list filter. |
| An order in two groups | n/a | Not allowed. One order may be in **one active wave**. |

Release in both ways allocates stock inside the same transaction as the launch (page 10). So a wave is a way to release many orders and to decide **who gets stock first** (section 6).

## 3. The objects

| Object | Table | What it is |
|---|---|---|
| Wave policy | `wave_policy` | The rules for selecting, grouping and sizing waves, and optionally a schedule. Page 13. |
| Policy run | `wave_policy_run` | One execution of a policy (build now or one scheduled slot). Counts how many orders were candidates, selected, excluded and how many waves were made. |
| Wave | `wave` | The group. Has a status (section 4) and a version. Waves from a policy keep `policy_id` and `policy_run_id`. |
| Wave member | `wave_order` | One order inside one wave, with its own status and its error text. |
| Claim | `wave_order_claim` | One row per order that is in an active wave. It makes sure an order is in at most one wave. |

## 4. Statuses

### 4.1 Wave status (`wave.status`, enum `wave_status`)

| Value | Meaning | Who sets it |
|---|---|---|
| `Draft` | Open. Orders can be added and removed. | Creation |
| `Planned` | Frozen. Members are queued (`Pending`). The worker is releasing them. | `wave_release`, auto-release of a policy, `wave_retry_blocked` |
| `Released` | Settled: no member is `Pending` or `Processing` any more. Some members may still be `Blocked` or `Failed`. | The worker, after the last queued member finishes (`wms-lib-core/src/model/outbound/wave.rs:337-373`) |
| `InProgress` | Reserved in the list. **No code sets it.** | none |
| `Completed` | Reserved in the list. **No code sets it.** `completed_at` is never written. | none |
| `Cancelled` | Cancelled before release finished. | `wave_cancel` |

Transitions that exist: `Draft -> Planned -> Released`, `Released -> Planned` (retry), `Draft -> Cancelled`, `Planned -> Cancelled`. A wave shown as `Released` is "settled", not "all good". Always read the member counts.

### 4.2 Member status (`wave_order.status`, enum `wave_order_status`)

| Value | Meaning |
|---|---|
| `Draft` | In a Draft wave. Not queued. May be removed. |
| `Pending` | Queued. The worker has not taken it yet. |
| `Processing` | The worker has it and runs the order release now. If the worker dies, the lease ends after 300 seconds and another worker takes it again. |
| `Released` | The order was released by this wave. |
| `Skipped` | The release hit an error, but the order was **already released** (by someone else). It counts as done. |
| `Blocked` | The order **refused** to release for a business reason. Shows `last_error_code` and `last_error_detail`. Needs a fix, then `wave_retry_blocked`. Also used for members that were queued when the wave was cancelled (`WAVE_CANCELLED`). |
| `Failed` | The release failed for a technical reason (not a business refusal), for example a lock timeout or a system error. Can be retried. |

Source: `wms-outbound/src/waves/worker.rs:160-188`, `wave.rs:548-569`.

### 4.3 What "blocked" means in each place

| Where | Meaning |
|---|---|
| Member status `Blocked` | The release of that order was refused. The code is `ORDER_RELEASE_BLOCKED` and the detail is the order's own error text. Examples in section 7. |
| `blocked` in `wave_preview` | The number of orders in the wave whose validation is **not ok** right now. Preview writes nothing. |
| `blocked` in the progress counts (`wave_get`, `wave_release`) | The number of members with status `Blocked`. |

### 4.4 What "retry" means in each place

| Where | Meaning |
|---|---|
| `wave_retry_blocked` | You ask the system to try again every member that is `Blocked` or `Failed`. The wave must be `Released` (settled). Details in section 7. |
| Lease re-claim | A `Processing` member that nobody finished within 300 seconds is taken again automatically. |
| Same idempotency key | If you send the same request again, you get the first answer. Nothing runs twice. |
| Scheduler | A slot whose build failed is rolled back completely. Then the failure is written as a run with `outcome` = `Failed` and its `error`, the schedule moves on to the next slot, and the pass goes on to the next due policy (P-12, wms-app 094). The failed slot is not tried again. |
| Allocation top-up | A separate job that retries allocation (page 10, section 8). It is not part of the wave. |

## 5. How a wave is made

### 5.1 By hand

1. `wave_create` with a `code` (1 to 30 characters, unique). The wave is `Draft`.
2. `wave_add_order` for each order, with the wave version you last read. Optional `sequence` (above 0) and `priority` (0 or more). Both are stored only (page 13).
3. `wave_remove_order` to take an order out again (only while the wave is `Draft` and the member is `Draft`).

An order can be added when it is not terminal (`Closed`, `Cancelled`), not released yet, and not in another active wave. Refusals:

- `wave must be Draft to add an order; current status is {status}`
- `order {id} is terminal in status {status}`
- `order {id} has already been released`
- `order {id} is already claimed by active wave {wave}` (error code `ORDER_ALREADY_IN_ACTIVE_WAVE`)
- `wave member sequence must be positive`, `wave member priority must not be negative`

(`wms-outbound/src/domain/wave/aggregate.rs:11-100`)

### 5.2 From a policy: preview

`wave_policy_preview` reads the live orders and shows the plan. It writes nothing and takes no lock, so the answer can be old a moment later. It returns:

- `candidate_count`: orders that pass all selection filters;
- `selected_order_count`;
- `batches`: for each future wave, its group (owner, carrier, ship date), its orders and its line count;
- `exclusions`: each left-out order with a reason.

Exclusion reasons you can see (`wms-outbound/src/waves/policy.rs:465-495`, `:330-333`):

- `order exceeds max_lines and cannot be split`
- `deferred by max_waves_per_run`
- `eligibility changed while acquiring order locks` (build only)

### 5.3 From a policy: build now

`wave_policy_build` (Admin, Manager) does the same plan for real, in one transaction (`waves/policy.rs:239-343`):

1. Lock the policy row. Check the version. Refuse an inactive policy: `wave policy {id} is inactive`.
2. Read the candidates and plan the batches.
3. Lock the selected orders in id order. Read the candidates again for those ids only. An order that changed in between is dropped with the reason `eligibility changed while acquiring order locks`.
4. Write one run row, then for each batch one `Draft` wave and its members. Each member gets the order's number in the batch (`sequence` 1, 2, ...) and a copy of the order priority. Each order gets a claim.
5. If `auto_release` is on, prepare each wave for release in the same transaction (section 6.1).
6. Close the run with the counts.

Wave codes are made by the system: `A` + run id in hexadecimal + `-` + batch number in hexadecimal. Example: run 26, batch 2 gives `A1A-2`. They fit the 30-character limit even for the biggest run id (`policy.rs:523`).

A build that finds no candidate still writes a run with zero waves.

### 5.4 From a policy: schedule

If the policy has an interval and a start time and is active, the app-server builds waves by itself. Every 5 seconds it asks each warehouse for due policies (at most 10 slots per warehouse per tick) (`app-server/src/services/cleanup_tasks.rs:158-163`). For one due policy:

1. Lock the policy row with "skip if locked", so two servers never run the same slot (`wave_policy.rs:250-267`).
2. Build exactly like "build now", marking the run with the slot time (`scheduled_for`).
3. Move `next_run_at` to the first slot **after now** (`wave_policy.rs:272-295`).
4. Commit. If anything fails, everything rolls back and the same slot stays due.

A slot can run only once: there is a unique index on `(policy_id, scheduled_for)` (migration 081). If the server was off for several slots, **one** catch-up run happens and the missed slots are skipped. Example: interval 60 minutes, start 08:00, server down until 10:30. At 10:30 one run happens (for the 08:00 slot). Next run is 11:00, not 09:00 or 10:00.

The scheduler works as the system user (user id 0).

## 6. Release

### 6.1 Freeze and queue (`wave_release`, or auto-release)

Rules (`waves/commands.rs:254-303`, `domain/wave/aggregate.rs:130-147`):

- The wave must be `Draft`: `wave must be Draft to release the wave; current status is {status}`.
- The wave must have at least one member: `an empty wave cannot be released`.
- Every member must be `Draft`: `wave member order {id} is not Draft and cannot be prepared`.
- All orders are locked in id order first. If the membership changed while locking: `wave membership changed while the command was acquiring locks; retry with the current version`.

Effect:

- Wave: `Draft -> Planned`, `release_generation` + 1, `planned_at` set, `release_requested_by` = the user.
- Each member: `Draft -> Pending`, with the **current version of its order** stored as the expected version, and a fixed idempotency key (`wave.release_order` + wave id + generation + order id).

Nothing is released yet. The call returns the wave and the member counts (`Pending` = number of orders).

### 6.2 The worker

Every 2 seconds the worker takes up to 100 queued members per warehouse (`cleanup_tasks.rs:156-159`). For each member (`waves/worker.rs:47-263`):

1. **Claim** (own transaction): take the lowest `wave_order.id` that is `Pending` in a `Planned` wave of the current generation, or a `Processing` one older than 300 seconds. Set `Processing`, add 1 to `attempt_count`. (`wave.rs:608-641`)
2. **Release** (own transaction): run `ReleaseShipmentOrder` as the user who requested the release (or as the system user if that user is 0), with the stored expected version and key. This validates the order, freezes its ship-to address, allocates stock, creates tasks. (`worker.rs:84-158`)
3. **Record** (own transaction): store `Released`, `Skipped`, `Blocked` or `Failed`, the order's new version and status, or the error. If no member of this generation is `Pending` or `Processing` any more, set the wave to `Released`. (`worker.rs:190-263`)

Classification of a failed release (`worker.rs:160-188`):

| Situation | Member status | `last_error_code` |
|---|---|---|
| Error, but the order already has `released_at` | `Skipped` | none |
| Business refusal, not found, bad status transition, or version conflict | `Blocked` | `ORDER_RELEASE_BLOCKED` |
| Any other error (system, lock timeout, idempotency) | `Failed` | `ORDER_RELEASE_FAILED` |
| Member has no stored version or key | `Failed` | `WAVE_RELEASE_IDENTITY_MISSING` |
| Wave vanished or unreadable | `Failed` | `WAVE_NOT_FOUND`, `WAVE_READ_FAILED` |
| Wave has no releasing user, or the user cannot be used, or the warehouse scope is missing | `Failed` | `WAVE_RELEASE_USER_MISSING`, `WAVE_RELEASE_USER_INVALID`, `WAVE_SCOPE_MISSING` |

A shortage of stock is **not** a block. The order releases with a partial allocation (page 10). A bad allocation policy is not a block either: the order still launches, and the allocation error is part of the order release result (`release.rs:354-380`). Check the order after the wave if stock is short.

### 6.3 Who gets stock first

The worker takes members in the order of `wave_order.id`, which is the order they were added. For a policy wave, that is the plan order: lowest `priority` number first, then earliest requested ship date (undated last), then lowest order id (`wave_policy.rs:330-332`). Within one wave, the first order allocates first and takes what it needs. The `sequence` and `priority` of the member are **not** used for this (`wave.rs:627` sorts only by id).

If you run several app-server instances, the "skip if locked" claim lets two workers process different members at the same time, so the order is then approximate.

### 6.4 Cancel (`wave_cancel`)

Allowed when the wave is `Draft` or `Planned` and no member is `Processing`, `Released` or `Skipped` (`aggregate.rs:104-120`). Effect: members that were `Pending` become `Blocked` with code `WAVE_CANCELLED` and detail `wave was cancelled before this order started`; all claims of the wave are deleted (the orders are free again); the wave becomes `Cancelled`.

Refusals: `wave cannot be cancelled while an order is processing or already released`. For a wave that is `Released` or `Cancelled`, the text is `a wave can be cancelled only while Draft or Planned; current status is {status}`.

## 7. Retry (`wave_retry_blocked`)

Use it after you fixed the cause of a `Blocked` or `Failed` member (`waves/commands.rs:305-362`).

Rules:

- The wave must be `Released` (settled): `only a settled Released wave can retry blocked or failed orders; current status is {status}`.
- At least one member must be `Blocked` or `Failed`: `wave has no blocked or failed orders to retry`.
- The orders are locked first; the version you send must be current.

Effect: each `Blocked` or `Failed` member goes back to `Pending`. Its expected order version is replaced by the **current** version of the order, its error and outcome fields are cleared, `attempt_count` is kept and grows. The wave goes back to `Planned`. The worker then processes only those members, and the wave settles to `Released` again.

Typical blocked texts (`detail`) and the fix:

| Detail starts with | Cause | Fix |
|---|---|---|
| `cannot release: only an unreleased order, or a released one with work not yet handed out, can be released (this one is {status}) (status)` | The order is in the wrong status (for example `Cancelled`) | Cancel the order or take it out of future waves |
| `cannot release: the order has no lines (lines)` | No lines | Add lines |
| `cannot release: every line is fully cancelled — nothing left to ship (lines)` | All cancelled | Cancel the order |
| `cannot release: ... (ship_to_id)` | The ship-to is not a customer | Fix the ship-to |
| `cannot release: line {n}: ... (sku_code)` | SKU removed, inactive, or the UOM is no longer on the pack | Fix the SKU or the line |
| `cannot release: line {n}: line owner {a} differs from order owner {b} (owner_id)` | Data fault | Fix the line |
| `version conflict on shipment_order {id}` | Someone changed the order after the wave was released for processing | Retry; the retry takes the new version |
| `cannot {action} an order in status {status}` | Wrong status for the action | Check the order |

(Texts from `wms-outbound/src/service/order/validate.rs:60-135` and `error.rs:27-34`.)

## 8. Operator view: what you see and what you do not

- **API.** `wave_get` returns `wave`, `members` (each with status, `attempt_count`, `last_error_code`, `last_error_detail`, `outcome_order_version`, `outcome_order_status`) and `progress` with these counts: `draft`, `pending`, `processing`, `released`, `blocked`, `failed`, `skipped`.
- **Wave list.** `wave_list` sorts by `add_when` descending (1 to 200 rows, default 50). There are no filters.
- **Order screen.** An order released by a wave looks like any released order. Its status is `Released` or `PartiallyReleased`.
- **Tasks.** The tasks of a released order carry the wave id (`wms-outbound/src/waves/task_grouping.rs:8-18`). The claim stays after release, so a later top-up task also carries it.
- **Logs.** The server logs `wave release pass` and `wave policy schedule pass` lines, and `wave policy scheduler failed` when a build fails. A pass that had failures is logged with the number of `failures`.

## 9. Worked example with numbers

Policy `DAY`: eligible statuses `New`, `Allocated`; priority 1 to 50; ship horizon 2 days; undated orders not included; group by owner; `max_orders` 3; `max_lines` 10; `max_waves_per_run` 2. Today is 10 Oct 2026, so the horizon is 12 Oct.

Orders in the system:

| Order | Owner | Priority | Ship date | Lines | Status | Candidate? |
|---|---|---|---|---|---|---|
| O1 | 7 | 10 | 10 Oct | 5 | New | yes |
| O2 | 7 | 10 | 11 Oct | 4 | New | yes |
| O9 | 7 | 15 | 10 Oct | 12 | New | yes |
| O3 | 8 | 20 | 11 Oct | 6 | New | yes |
| O4 | 7 | 30 | 12 Oct | 3 | Allocated | yes |
| O5 | 7 | 30 | 12 Oct | 2 | Allocated | yes |
| O6 | 7 | 40 | 15 Oct | 2 | New | no (after 12 Oct) |
| O7 | 8 | 60 | 10 Oct | 2 | New | no (priority above 50) |
| O8 | 7 | 25 | none | 2 | New | no (undated, `include_undated` is false) |

Plan:

1. Sorted candidates: O1, O2, O9, O3, O4, O5 (priority, then date, then id). `candidate_count` = 6.
2. Groups by owner, in order of first appearance: owner 7 = O1, O2, O9, O4, O5; owner 8 = O3.
3. Owner 7: O1 (5 lines) starts a batch. O2 (4) fits: 9 lines. O9 has 12 lines, more than `max_lines` 10: excluded, `order exceeds max_lines and cannot be split`. O4 (3) would make 12 lines: close the batch [O1, O2]; start [O4]. O5 (2) fits: [O4, O5], 5 lines.
4. Owner 8: [O3], 6 lines.
5. Three batches, but `max_waves_per_run` is 2. The third batch [O3] is dropped: `deferred by max_waves_per_run`.
6. Result: run 26 with `candidate_count` 6, `selected_order_count` 4, `excluded_order_count` 2, `wave_count` 2. Waves `A1A-1` = [O1, O2] and `A1A-2` = [O4, O5], both `Draft`, owner 7. O9 and O3 stay free. The next run can take O3. O9 can never be taken by this policy.

Release `A1A-1` (the builder leaves the wave at version 1, so send `expected_wave_version` 1): wave becomes `Planned`, O1 and O2 `Pending`. The worker takes O1 first (lower member id). Suppose O1's SKU was set inactive in between: O1 is `Blocked`, code `ORDER_RELEASE_BLOCKED`, detail starts with `cannot release: line 1: ...`. O2 releases: `Released`. No member is queued, so the wave becomes `Released` with `released 1, blocked 1`. After you fix the SKU, call `wave_retry_blocked` with the new wave version. O1 goes `Pending`, the wave goes `Planned`, the worker releases O1, and the wave is `Released` with `released 2`.

A schedule example: interval 60 minutes, start 12 Oct 08:00 UTC, active. `next_run_at` is 08:00. At 08:00:05 the scheduler builds a run (`scheduled_for` 08:00) and sets `next_run_at` to 09:00. With `auto_release` on, the waves are `Planned` at once and the worker releases the orders within seconds. With it off, the waves stay `Draft` for a person to inspect.

## 10. Known gaps and inconsistencies

| # | What | Where |
|---|---|---|
| 1 | `InProgress` and `Completed` exist but nothing sets them. `completed_at` is never written. The table comment says claims are removed "later on Wave completion". There is no completion. | `wave.rs:21-28`, `077_manual_order_waves.sql:132-133` |
| 2 | `wave_order.sequence` and `wave_order.priority` are stored but nothing reads them. The worker orders by member id. | `wave.rs:608-641` |
| 3 | A `Blocked` or `Failed` member of a **settled** (`Released`) wave cannot be removed or cancelled. It keeps its claim. The order can then not join any other wave or policy build until a retry succeeds. | `aggregate.rs:104-120` (cancel needs `Draft` or `Planned`), `aggregate.rs:55-100` (remove needs `Draft`) |
| 4 | ~~The message `wave must be Draft to cancel the wave` is wrong for the allowed `Planned` case.~~ Fixed: the refusal now names both cancellable statuses. | `aggregate.rs` (`NotCancellable`) |
| 5 | ~~A failing scheduled policy stopped the pass and held back the other due policies; no failed run was stored.~~ Fixed: a slot whose build fails is recorded as a run with `outcome = Failed` and its `error`, its schedule moves on to the next slot, and the pass goes on to the next due policy (wms-app 094). | `waves/scheduler.rs`, `WavePolicyBmc::record_failed_run` |
| 6 | The README of the module says W2a only. The code includes W2b (schedule and auto-release). | `waves/README.md` |
| 7 | ~~Release of an order inside a wave could finish with `auto_allocation_error` (bad allocation policy) and still count as `Released`.~~ Fixed: the Order launch remains committed, while the member becomes retryable `Blocked` with `ORDER_AUTO_ALLOCATION_FAILED` and the allocation detail. | `release.rs` (`run_release_allocation`), `waves/worker.rs` (`release_one`) |
