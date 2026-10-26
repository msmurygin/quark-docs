---
title: "Wave Policy Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Wave Policy Settings

This page lists every field of a wave policy, a policy run, a wave and a wave member. Page 12 explains how waves work. Read it first.

**There is no screen.** Every field below is set through the API. The JSON key of a policy field is `data.policy.<field>` in `wave_policy_create` and `wave_policy_save`. The UI label of every field is therefore "none, API only".

Paths start at `crates/libs/` unless they say otherwise. `file:line` shows where to check a claim.

## 1. How a policy is read and written

- A policy is **one flat record**. Selection filters, grouping, size limits, schedule and release mode all live in the same row (`wave_policy`). Migrations: `wms-lib-sql/sql/wms-app/migrations/078_wave_policy_builder.sql`, `081_wave_policy_scheduling.sql`, `082_wave_policy_automatic_release.sql`.
- `wave_policy_save` **replaces every user field** at once. It is not a patch. A field you leave out becomes empty or false, with one exception rule below. Read the policy first (`wave_policy_get`), change what you need, send it all back with the version you read (`wms-lib-core/src/model/outbound/wave_policy.rs:212-246`).
- Required keys on the wire: `code`, `eligible_statuses`, `include_undated`, `group_by_owner`, `group_by_carrier`, `group_by_requested_ship_date`, `max_orders`, `max_waves_per_run`, `is_active`. Optional keys: `description`, `priority_from`, `priority_to`, `requested_ship_days_ahead`, `owner_id`, `carrier_id`, `max_lines`, `schedule_interval_minutes`, `schedule_starts_at`, `auto_release` (`wave_policy.rs:66-89`).
- **The schema defaults do not apply through the API.** The API has no default for `max_orders` (schema 100), `max_waves_per_run` (schema 10), `is_active` (schema true) or `eligible_statuses` (schema all three). You must send them. The defaults apply only to a direct SQL insert.
- `auto_release` has a default on the wire: if you leave it out, it is `false`. A `wave_policy_save` that forgets this key **turns auto-release off** (`wave_policy.rs:86-87`).
- No wave policy exists after install. No migration and no development seed creates one (`grep` of `wms-lib-sql` finds no insert).
- Normalisation: the code is trimmed; statuses are trimmed and duplicates dropped (`waves/policy.rs:355-423`).

Example (create a policy that builds every hour, without auto-release):

```json
{
  "jsonrpc": "2.0", "id": 1, "method": "wave_policy_create",
  "params": {
    "meta": { "idempotency_key": "6f1c2c1e-3c0e-4d51-8f0e-3f3f6c9d2a11" },
    "data": { "policy": {
      "code": "DAY",
      "description": "Daily waves per owner",
      "eligible_statuses": ["New", "Allocated"],
      "priority_from": 1, "priority_to": 50,
      "requested_ship_days_ahead": 2, "include_undated": false,
      "owner_id": null, "carrier_id": null,
      "group_by_owner": true, "group_by_carrier": false,
      "group_by_requested_ship_date": false,
      "max_orders": 3, "max_lines": 10, "max_waves_per_run": 2,
      "schedule_interval_minutes": 60,
      "schedule_starts_at": "2026-10-12T08:00:00Z",
      "auto_release": false, "is_active": true
    } }
  }
}
```

Roles: `wave_policy_create`, `wave_policy_save`, `wave_policy_build` = Admin, Manager. Read and preview = Admin, Manager, Supervisor (`app-server/src/web/rpcs/wave_rpc.rs:15-22`).

## 2. Policy fields (table `wave_policy`)

Each card has the same rows. "Code" in the last column of "What it affects" is the line that reads the field.

### 2.1 `id`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.id` |
| Type | bigint, generated |
| Default | generated |
| What it does | Key. `wave.policy_id` and `wave_policy_run.policy_id` point to it (restrict on delete). |
| When you change it | You cannot. |

### 2.2 `code`

| Item | Value |
|---|---|
| UI label | None (API only). Key `data.policy.code`. |
| Column | `wave_policy.code` |
| Type and range | text, 1 to 30 characters after trimming, unique (`uq_wave_policy_code`) |
| Default | none (required). No seed. |
| What it does | The name of the policy. Used only to find it (`wave_policy_list` sorts by it). It is **not** part of generated wave codes. |
| What it affects | Nothing in the engine. |
| Example | `DAY`, `NIGHT-EXPRESS` |
| Refusals | `wave policy code must not be blank`; `wave policy code must not exceed 30 characters`; `a wave policy with this code already exists` (error code `WAVE_POLICY_CODE_ALREADY_EXISTS`) (`waves/policy.rs:28-36`, `error.rs:57-60`) |
| When you change it | `wave_policy_save` can rename the policy. Existing waves are not affected. |

### 2.3 `description`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.description` |
| Type and range | text up to 200 characters, may be empty (NULL) |
| Default | NULL |
| What it does | Stored only. It has no effect today. It is returned by `wave_policy_get` and `wave_policy_list`. |

### 2.4 `eligible_statuses`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.eligible_statuses` (list of text) |
| Type and range | A list with at least one value. Each value must be one of `New`, `PartiallyAllocated`, `Allocated` (case matters). Double values are dropped. |
| Default | Schema: all three. API: required. |
| What it does | Takes into the policy only orders whose status is in the list. All of them are orders **not yet released** (`released_at` empty and not cancelled). |
| What it affects | `wave_policy.rs:320` (`so.status::text = ANY(...)`). Checked on save in `waves/policy.rs:366-379` and again by the database (`chk_wave_policy_statuses_supported`). |
| Example | `["New"]` takes only orders with nothing reserved. `["Allocated"]` takes only orders fully reserved before the wave. |
| Interactions | The statuses mean: `New` = nothing reserved; `PartiallyAllocated` = some reserved; `Allocated` = all reserved. Any released status (`PartiallyReleased`, `Released`, `Picked`, ...) is not allowed. The release itself allocates stock, so `New` is a normal choice. |
| When empty | Refused: `wave policy must name at least one eligible status`. |
| Other refusal | `unsupported pre-release order status in wave policy: {value}` |
| When you change it | The next preview or build uses the new list. Existing waves are unchanged. Orders already in a wave stay there. |

### 2.5 `priority_from`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.priority_from` |
| Type and range | whole number 1 to 99, may be empty |
| Default | NULL |
| What it does | Takes only orders whose `shipment_order.priority` is **at least** this number. Order priority is 1 to 99, default 50. A smaller number is handled earlier (the plan and the task board both sort ascending). |
| What it affects | `wave_policy.rs:321` |
| Example | `priority_from = 10` skips orders with priority 1 to 9. |
| Interactions | Both bounds are inclusive. `priority_from` must not exceed `priority_to`. |
| When empty | No lower bound. |
| Refusals | `wave policy priority bounds must be between 1 and 99`; `wave policy priority_from must not exceed priority_to` |

### 2.6 `priority_to`

Same as 2.5 but the upper bound: takes orders with priority **at most** this number (`wave_policy.rs:322`). Example: `priority_to = 50` skips orders with priority 51 or more. Empty = no upper bound.

### 2.7 `requested_ship_days_ahead`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.requested_ship_days_ahead` |
| Type and range | whole number 0 to 3650 (days), may be empty |
| Default | NULL |
| What it does | Takes orders whose `requested_ship_date` is on or before `today + N days`. Dates in the past also pass (overdue orders). `0` means "today and overdue". |
| What it affects | `wave_policy.rs:323-325`. "Today" is `current_date` of the database. |
| Example | Today 10 Oct, `N = 2`: dates up to 12 Oct pass; 15 Oct does not. |
| Interactions | Orders with no ship date pass only if `include_undated` is true. |
| When empty | No date filter at all. Then every order passes, dated or not, and `include_undated` has no effect. |
| Refusal | `requested_ship_days_ahead must be between 0 and 3650` |

### 2.8 `include_undated`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.include_undated` |
| Type | true or false |
| Default | Schema false. API: required. |
| What it does | When a ship-date horizon is set, true lets orders without a requested ship date in. |
| What it affects | `wave_policy.rs:325` |
| Example | Horizon 2 days, `include_undated = true`: order O8 with no date is a candidate. With false it is not. |
| When there is no horizon | No effect. |

### 2.9 `owner_id`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.owner_id` (foreign key to `owners`, restrict on delete) |
| Type | owner id, may be empty |
| Default | NULL |
| What it does | Takes only orders of this owner. |
| What it affects | `wave_policy.rs:326` |
| Interactions | If you set it, `group_by_owner` makes no difference (one owner only). An id that does not exist fails with a database error on save. |
| When empty | All owners. |

### 2.10 `carrier_id`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.carrier_id` (foreign key to `owners`: a carrier is an owner record; restrict on delete) |
| Type | owner id of the carrier, may be empty |
| Default | NULL |
| What it does | Takes only orders whose `carrier_id` equals it. Orders without a carrier do not pass. |
| What it affects | `wave_policy.rs:327` |
| When empty | All carriers, and orders with no carrier. |

### 2.11 `group_by_owner`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.group_by_owner` |
| Type | true or false |
| Default | Schema false. API: required. |
| What it does | Orders of different owners never share a wave. |
| What it affects | `waves/policy.rs:430-441` (the group key) |
| Example | Owners 7 and 8, `max_orders` 3: owner 7 orders fill waves for owner 7; owner 8 orders go into other waves. |
| Interactions | The group key is the combination of the three `group_by_*` flags. All three false = one common group. Groups appear in order of the first order they contain (the best-priority order). Capacity limits apply inside each group. |
| When false | Owners may mix in one wave. |

### 2.12 `group_by_carrier`

Same as 2.11, with the order's carrier. Orders **without a carrier** form their own group (carrier empty). Code: `waves/policy.rs:432-436`.

### 2.13 `group_by_requested_ship_date`

Same as 2.11, with the requested ship date. Orders with no date form their own group. Code: `waves/policy.rs:437-441`. Example: with true, orders for 11 Oct and 12 Oct never share a wave.

### 2.14 `max_orders`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.max_orders` |
| Type and range | whole number 1 to 1000 |
| Default | Schema 100. API: required. |
| What it does | The most orders in one generated wave. When the current batch is full, the next order starts a new wave. |
| What it affects | `waves/policy.rs:471-479` |
| Example | 7 orders in one group, `max_orders` 3: waves of 3, 3 and 1. |
| Interactions | Together with `max_waves_per_run` it limits one run to `max_orders x max_waves_per_run` orders (at most 20 000). It does not split an order. |
| Refusal | `max_orders must be between 1 and 1000` |
| When you change it | Applies to the next run only. |

### 2.15 `max_lines`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.max_lines` |
| Type and range | whole number 1 to 100 000, may be empty |
| Default | NULL |
| What it does | The most order lines (lines not cancelled) in one generated wave. An order is never split. |
| What it affects | `waves/policy.rs:461-479` |
| Example | `max_lines` 10: orders with 5, 4 and 3 lines give a wave of the first two (9 lines) and a new wave for the third. |
| Interactions | An order that alone has more lines than `max_lines` can never be placed. It is left out with the reason `order exceeds max_lines and cannot be split`, in every run, until the limit grows or lines are cancelled. |
| When empty | No line limit. |
| Refusal | `max_lines must be between 1 and 100000` |

### 2.16 `max_waves_per_run`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.max_waves_per_run` |
| Type and range | whole number 1 to 20 |
| Default | Schema 10. API: required. |
| What it does | The most waves one run creates. Batches beyond the limit are dropped for this run. Their orders stay free for the next run. |
| What it affects | `waves/policy.rs:488-499` |
| Example | Three batches, limit 2: two waves; the orders of the third batch get the reason `deferred by max_waves_per_run`. |
| Interactions | Batches are kept in the order of their groups. The group of the best-priority order is first. |
| Refusal | `max_waves_per_run must be between 1 and 20` |

### 2.17 `schedule_interval_minutes`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.schedule_interval_minutes` |
| Type and range | whole number 1 to 10 080 (7 days), may be empty |
| Default | NULL = manual policy |
| What it does | The pause between two automatic builds. |
| What it affects | `wave_policy.rs:250-295` (due policy, next slot). The scheduler loop is in `app-server/src/services/cleanup_tasks.rs:289-325`. |
| Interactions | Must be set together with `schedule_starts_at`. Only an **active** policy has a next run. |
| When empty | The policy never runs by itself. You can still preview and build by hand. |
| Refusals | `schedule_interval_minutes and schedule_starts_at must be set together`; `schedule_interval_minutes must be between 1 and 10080`. The database has the same rules (`chk_wave_policy_schedule_interval`, `chk_wave_policy_schedule_pair`). |
| When you change it | See 2.18. |

### 2.18 `schedule_starts_at`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.schedule_starts_at` |
| Type | date and time with time zone (send a value with a zone, for example `2026-10-12T08:00:00Z`), may be empty |
| Default | NULL |
| What it does | The anchor of the schedule. The first run is due at this time. Later runs are due at anchor + n x interval. |
| What it affects | `wave_policy.rs:182-246` (sets `next_run_at`) |
| Example | Start 08:00, interval 60: slots at 08:00, 09:00, 10:00 ... |
| Interactions | In `wave_policy_create`, `next_run_at` is set to this value if the policy is active and has an interval. In `wave_policy_save`, `next_run_at` goes back to this value when the interval or the start changes, when the policy was inactive, or when there was no next run. If the value is in the past, the policy is due **at once** (one run), and then the next slot is the first one after now. |
| When empty | See 2.17. |

### 2.19 `next_run_at`

| Item | Value |
|---|---|
| UI label | None. Read-only. |
| Column | `wave_policy.next_run_at` |
| Type | date and time, may be empty |
| What it does | When the policy is next due. Owned by the scheduler; you cannot write it. Returned by `wave_policy_get`. |
| What it affects | `wave_policy.rs:250-267` (a policy is due when active and `next_run_at <= now`) |
| Interactions | Empty while the policy is inactive or has no schedule (`chk_wave_policy_next_run`). After a run it moves to `next_run_at + interval x (whole intervals since the slot + 1)`, that is the first boundary after now (`wave_policy.rs:283-290`). |
| Example | Slot 08:00, interval 60, finished at 08:00:05: next 09:00. Server down until 10:30: one run, then 11:00. |
| Does not bump | `version` (the scheduler does not change the user version). |

### 2.20 `last_scheduled_at`

Read-only. The slot time that the scheduler committed most recently (`wave_policy.rs:283`). Informational. Empty until the first scheduled run. A build by hand does not set it.

### 2.21 `auto_release`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.auto_release` |
| Type | true or false |
| Default | false (schema and wire) |
| What it does | **False:** generated waves stay `Draft` for a person to inspect and release. **True:** every generated wave is prepared for release in the same transaction (`Planned`, members `Pending`), and the background worker releases the orders. |
| What it affects | `waves/policy.rs:288-294` (`prepare_release_locked`, the same path as `wave_release`) |
| Example | `auto_release = true`, schedule 60 minutes: every hour the eligible orders are released with no human step. |
| Interactions | Works for build-now and for scheduled builds. For a scheduled build the release is requested by the system user (id 0). For build-now it is requested by the user who called `wave_policy_build`. A wave released this way settles as `Released` even when members are `Blocked`; nobody is told except through `wave_get` and the logs. |
| When you change it | Only future builds change. Waves that are already `Planned` keep going. |

### 2.22 `is_active`

| Item | Value |
|---|---|
| UI label | None (API only). |
| Column | `wave_policy.is_active` |
| Type | true or false |
| Default | Schema true. API: required. |
| What it does | An inactive policy cannot be built (`wave policy {id} is inactive`) and is never scheduled. Preview still works. |
| What it affects | `waves/policy.rs:228-233`, `wave_policy.rs:261` |
| Interactions | Saving with false clears `next_run_at`. Saving with true again sets `next_run_at` to the start time. If that time is in the past, the policy runs once at the next tick. Waves already built stay as they are, and a `Planned` wave of an inactive policy is still released by the worker. |

### 2.23 `version`

| Item | Value |
|---|---|
| UI label | None. Read-only. |
| Column | `wave_policy.version` |
| Type | integer, at least 1 |
| Default | 1 |
| What it does | Optimistic lock. `wave_policy_save` and `wave_policy_build` must send `expected_policy_version`. A stale value is refused with code 40 and the current policy: `version conflict on wave policy {id}` (error code `WAVE_POLICY_VERSION_CONFLICT`). |
| When you change it | +1 on every `wave_policy_save`. Not changed by builds or by the scheduler. |

### 2.24 Audit columns

`add_who`, `add_when`, `mod_who`, `mod_when`. Filled by the system. No effect.

## 3. Policy run (table `wave_policy_run`)

One row per build (by hand or by schedule), and one row per scheduled slot whose build failed. There is no list method. The row comes back in the answer of `wave_policy_build` as `run`, and the waves carry its id in `wave.policy_run_id`. All fields are written by the system.

| Field | Meaning |
|---|---|
| `id` | The run number. It is part of generated wave codes (in hexadecimal). |
| `policy_id` | The policy. |
| `candidate_count` | Orders that passed all filters in the first read. |
| `selected_order_count` | Orders placed in waves. |
| `excluded_order_count` | `candidate_count - selected_order_count`. |
| `wave_count` | Waves created. |
| `scheduled_for` | The slot time for a scheduled run; empty for build-now. Unique per policy (`uq_wave_policy_run_scheduled_slot`). |
| `started_at`, `completed_at` | Start and end of the build. |
| `add_who` | The user, or 0 for the scheduler. |
| `outcome` | `Succeeded` (default; every build before wms-app 094) or `Failed`. |
| `error` | Why a `Failed` run failed. Empty exactly when the run succeeded (check `chk_wave_policy_run_failure_says_why`). A failed run has 0 candidates and takes the slot's unique index, so one slot is never recorded twice. |

The counts are results. Nothing reads them back (`wave_policy.rs:347-397`).

## 4. Wave (table `wave`)

| Field | Type | Default | Meaning and use |
|---|---|---|---|
| `id` | bigint | generated | Key. |
| `code` | text 1 to 30, unique (`uq_wave_code`) | none | Set by you in `wave_create`. Generated as `A{run hex}-{batch hex}` for policy waves. Duplicate: `a wave with this code already exists` (`WAVE_CODE_ALREADY_EXISTS`). Blank: `wave code must not be blank`. Over 30: `wave code must not exceed 30 characters`. |
| `policy_id`, `policy_run_id` | bigint, both set or both empty | empty | Provenance of a policy wave. Manual waves have neither. |
| `status` | `wave_status` | `Draft` | See page 12, section 4.1. |
| `release_generation` | integer | 0 | Counts how many times the wave was frozen for release. A member is processed only when its generation equals the wave's. Set to +1 by `wave_release`/auto-release. Retry keeps it. |
| `release_requested_by` | user id | empty | The user who released. 0 = system (scheduler). The worker releases the orders as this user. |
| `version` | integer | 1 | Optimistic lock for every wave command. +1 on add, remove, prepare, cancel, retry, and when the worker settles the wave. Read the wave again before the next command. |
| `planned_at` | time | empty | Set when frozen. |
| `released_at` | time | empty | Set when the wave settles as `Released`; cleared again when a retry reopens the wave. |
| `cancelled_at` | time | empty | Set by cancel. |
| `completed_at` | time | empty | Never written today. |
| `add_who`, `add_when`, `mod_who`, `mod_when` | audit | | |

Constraints (`077_manual_order_waves.sql:36-58`): the markers must agree with the status. For example `Draft` has no `planned_at`; `Released`, `InProgress` and `Completed` have `released_at`; `Cancelled` has `cancelled_at`; a wave with a release generation has a releasing user.

## 5. Wave member (table `wave_order`)

| Field | Type | Default | Meaning and use |
|---|---|---|---|
| `id` | bigint | generated | Key. **The worker processes members in this order.** |
| `wave_id`, `order_id` | bigint | none | The pair is unique. |
| `sequence` | integer above 0, may be empty | empty | Stored only. It has no effect today. Policy waves fill it with 1, 2, 3 ... (position in the batch). `wave_add_order` accepts it. |
| `priority` | integer 0 or more, may be empty | empty | Stored only. It has no effect today. Policy waves copy the order priority. |
| `status` | `wave_order_status` | `Draft` | See page 12, section 4.2. |
| `release_generation` | integer | 0 | Generation of the last prepare. |
| `release_expected_order_version` | integer | empty | The version of the order that the release must still find. A change in between makes the member `Blocked` with a version conflict. Retry replaces it with the current version. |
| `release_idempotency_key` | uuid | empty | Fixed key of the release (`wave.release_order` + wave + generation + order). The same key is reused by retries. |
| `attempt_count` | integer | 0 | +1 each time the worker claims the member. Reset to 0 by prepare, kept by retry. Informational. |
| `processing_started_at` | time | empty | The lease start. A lease older than 300 seconds is taken over. |
| `released_at` | time | empty | Set for `Released` and `Skipped`. |
| `outcome_order_version`, `outcome_order_status` | integer, order status | empty | The order's version and status after the release (for `Released` and `Skipped`). |
| `last_error_code`, `last_error_detail` | text 80, text | empty | Set for `Blocked` and `Failed`. See page 12, section 6.2. |
| audit columns | | | |

## 6. Claim (table `wave_order_claim`)

| Field | Meaning |
|---|---|
| `order_id` (primary key) | The order. One row at most, so an order is in at most one active wave. |
| `wave_id` | The wave. |
| `claimed_at`, `claimed_by` | When and who. |

A claim is written when an order is added to a wave, removed when a Draft member is removed, and removed for all members when a wave is cancelled. It is **not** removed when the wave is released or settled. A policy build and a manual add skip claimed orders (`wave_policy.rs:328`, `aggregate.rs:55-80`).

## 7. Fixed values (not settings)

| Value | What | Code |
|---|---|---|
| 30 characters | Longest wave or policy code | `aggregate.rs:44-50`, `waves/policy.rs:363` |
| 50 000 | Most candidates read in one plan | `wave_policy.rs:333` |
| 300 seconds | Lease of a `Processing` member | `waves/worker.rs:14` |
| 2 seconds, 100 members | Release worker tick and members per warehouse per tick | `cleanup_tasks.rs:158-159` |
| 5 seconds, 10 slots | Scheduler tick and policy slots per warehouse per tick | `cleanup_tasks.rs:162-163` |
| 1 to 200, default 50 | Page size of `wave_list` and `wave_policy_list` | `waves/queries.rs:49-56`, `waves/policy.rs:136-143`, `wave_rpc.rs:41-43` |
| `New`, `PartiallyAllocated`, `Allocated` | The only statuses a policy may name | `waves/policy.rs:26` |

## 8. Enums

| Enum | Values |
|---|---|
| `wave_status` | `Draft`, `Planned`, `Released`, `InProgress`, `Completed`, `Cancelled` |
| `wave_order_status` | `Draft`, `Pending`, `Processing`, `Released`, `Blocked`, `Failed`, `Skipped` |
| Policy `eligible_statuses` items | `New`, `PartiallyAllocated`, `Allocated` |

Meanings: page 12, section 4.

## 9. Refusal texts of the policy commands

| Text | Cause |
|---|---|
| `wave policy {id} not found` (`WAVE_POLICY_NOT_FOUND`) | Wrong id |
| `a wave policy with this code already exists` | Duplicate code |
| `version conflict on wave policy {id}` | Old `expected_policy_version`; the answer carries the current policy |
| `wave policy {id} is inactive` | Build on an inactive policy |
| `wave policy code must not be blank`, `... must not exceed 30 characters` | Code |
| `wave policy must name at least one eligible status` | Empty list |
| `unsupported pre-release order status in wave policy: {value}` | Bad status |
| `wave policy priority bounds must be between 1 and 99` | Priority out of range |
| `wave policy priority_from must not exceed priority_to` | Range turned round |
| `requested_ship_days_ahead must be between 0 and 3650` | Horizon |
| `max_orders must be between 1 and 1000` | Size |
| `max_lines must be between 1 and 100000` | Size |
| `max_waves_per_run must be between 1 and 20` | Size |
| `schedule_interval_minutes and schedule_starts_at must be set together` | One of the two missing |
| `schedule_interval_minutes must be between 1 and 10080` | Interval |
| `wave membership changed while the command was acquiring locks; retry with the current version` | Race during build |

All these refusals are hard failures except the version conflict and the membership change (code 40, class `Retry`). Source: `waves/policy.rs:28-56`, `waves/error.rs`.

## 10. What happens when you change a policy

| Change | New runs | Waves already built | Orders already in waves |
|---|---|---|---|
| Any selection field, grouping, size limit | Uses the new value | Unchanged | Stay in their wave |
| `auto_release` | New waves follow it | Unchanged | Unchanged |
| `is_active` false | No build, no schedule; `next_run_at` cleared | Unchanged. A `Planned` wave is still released. | Unchanged |
| `is_active` true again | Runs at the next tick if the start time is in the past | Unchanged | Unchanged |
| Interval or start time | `next_run_at` restarts at the start time | Unchanged | Unchanged |
| `code`, `description` | Label only | Unchanged | Unchanged |

## 11. Settings that have no effect

| Field | Status |
|---|---|
| `wave_policy.description` | Stored only. It has no effect today. |
| `wave_policy.code` | A label only. Nothing in the engine reads it. |
| `wave_order.sequence` | Stored only. It has no effect today. |
| `wave_order.priority` | Stored only. It has no effect today. |
| `wave.completed_at` and the statuses `InProgress`, `Completed` | Never set. |
| `wave_order.attempt_count` | Counter for information. Nothing reads it for a decision. |
