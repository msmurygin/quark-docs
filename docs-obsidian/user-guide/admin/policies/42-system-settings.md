---
title: "Policy Reference - System Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# System Settings

This page lists every key of the table `system_settings`, the dashboard settings
(`dashboard_setting`, `dashboard_metric_threshold`), and the printing and label
settings that change behaviour.

Read the legend in [00-README.md](./00-README.md) first.
Paths are relative to `crates/libs/` unless they start with `crates/`.

## 1. How system settings work

| Item | Value |
|---|---|
| Table | `system_settings`, **one table per warehouse** (it lives in the warehouse schema, for example `wh1`). Each warehouse has its own values. |
| Menu path | `Sidebar > System Settings` |
| Screen fields | `Config Key`, `Value`, `Default Value`, `Description`, `Editable` |
| What you can change | Only `Value` (`config_value`). Key, default, description and the editable flag are read-only on the screen and in `update_system_settings`. |
| Refusal when not editable | `system setting <KEY> is read-only` |
| API | `list_system_settings`, `get_system_settings`, `update_system_settings` (roles `Admin`, `Manager`), `create_system_settings`, `delete_system_settings` (roles `Admin`, `Manager`) |
| Column sizes | `config_key` up to 30 characters, `config_value` and `default_value` up to 50, `description` up to 120. A longer value is refused by the database. |
| Reading rules | The server reads `config_value`. Some readers fall back to `default_value` when `config_value` is empty (marked "value, else default" below). |

Source: `wms-lib-core/src/model/sys_settings.rs`, `services/app-server/src/web/rpcs/sys_settings_rpc.rs`.

### 1.1 How the server reads a value

| Reader | What it does | Used for |
|---|---|---|
| `get_int` | Reads `config_value`. Whole numbers and the words `true/yes/on` (= 1) and `false/no/off` (= 0), in any case, spaces ignored. Anything else, or empty, counts as "not set" and the caller uses its built-in default. | most keys |
| `get_int_effective` | Reads `config_value`; if it is empty, reads `default_value`. | `TASK_*` |
| `lock_timeout_ms` | The one reader of every `*_LOCK_TIMEOUT_MS` key. It reads like `get_int_effective`, and answers 5000 for anything that is not a number above 0: no row, empty, text, `0`, a negative number (`SystemSettingsBmc::lock_timeout_ms`, `wms-lib-core/src/model/sys_settings.rs:226`). | `RECEIPT_LOCK_TIMEOUT_MS`, `ORDER_LOCK_TIMEOUT_MS`, `PUTAWAY_LOCK_TIMEOUT_MS` |
| `setting_is_on` | `get_int` result is not 0. A value that cannot be read means **off**. | audit keys, `CHECK_DIGIT_ENABLED` |
| text reader | Returns `config_value` as is. | `LOC_GEN_PATTERN`, `MOVE_HOLD_POLICY`, `LABEL_RENDERER_URL` |

A key that has **no row** counts as "not set". Because the baseline seeds the rows
listed in section 2, a row is missing only for the key in section 3.

A value of `0` or less for a `*_LOCK_TIMEOUT_MS` key is never used. In PostgreSQL
`lock_timeout = '0ms'` would mean "wait for ever", so the server uses 5000 instead
(fixed in P-13, commit `420b6746a`). The other time keys also reject `0` and use
their built-in default.

## 2. Keys seeded by the migrations (20)

The seed is in `wms-app/migrations/001_baseline.sql:9945-9962`, migration
`wms-app/migrations/071_count_on_scan_and_putaway_exceptions.sql:57-62` and migration
`wms-app/migrations/091_every_lock_timeout_is_a_setting.sql` (the two lock time-outs).
All rows are `editable = true`.

| Key | Seed `Value` | `Default Value` | Type |
|---|---|---|---|
| `ENABLE_SKU_AUDIT` | `false` | `false` | on/off |
| `CHECK_DIGIT_ENABLED` | `true` | `true` | on/off |
| `LOC_GEN_PATTERN` | `<AISLE_PREFIX><AISLE>-<LEVEL>-<LOC>` | same | text |
| `IDEMPOTENCY_TTL_DAYS` | `7` | `7` | days |
| `RECEIPT_LOCK_TIMEOUT_MS` | `5000` | `5000` | milliseconds |
| `ORDER_LOCK_TIMEOUT_MS` | `5000` | `5000` | milliseconds |
| `PUTAWAY_LOCK_TIMEOUT_MS` | `5000` | `5000` | milliseconds |
| `ENABLE_RECEIPT_AUDIT` | `1` | `1` | on/off |
| `ALLOW_CLOSE_WITH_DISCREPANCY` | `1` | `1` | on/off |
| `MOVE_HOLD_POLICY` | `warn` | `warn` | `warn` or `silent` |
| `MOVE_REQUIRE_LPN` | `0` | `0` | `0` or `1` |
| `PUTAWAY_RESERVATION_TTL_MIN` | `15` | `15` | minutes |
| `LABEL_RENDERER_URL` | `http://localhost:8086` | same | URL |
| `TASK_LEASE_TTL_MIN` | `15` | `15` | minutes |
| `TASK_SKIP_COOLDOWN_MIN` | `10` | `10` | minutes |
| `TASK_SKIP_ESCALATE_AFTER` | `3` | `3` | count |
| `TASK_MAX_CONCURRENT_DEFAULT` | `1` | `1` | count |
| `TASK_ALLOW_RELEASE_DEFAULT` | `1` | `1` | `0` or `1` |
| `COUNT_ON_PUTAWAY_DEVIATION` | `0` | `0` | `0` or `1` |
| `COUNT_ON_PICK_CANCELLED` | `0` | `0` | `0` or `1` |
| `WAREHOUSE_TIMEZONE` | `UTC` | `UTC` | IANA time zone name |

Note: `ENABLE_RECEIPT_AUDIT` and `ALLOW_CLOSE_WITH_DISCREPANCY` are seeded **on**
(`Value` = 1), and since wms-app 109 their `Default Value` is `1` too. Before
that it said `false`, so the screen showed "off by default" for features a
fresh install runs.

### 2.1 Receiving and documents

#### `ALLOW_CLOSE_WITH_DISCREPANCY`
- **UI**: `System Settings`, row `ALLOW_CLOSE_WITH_DISCREPANCY`, column `Value`.
- **Type and range**: on/off (`1/0`, `true/false`). Not set or unreadable = off.
- **Default**: seed `1`, `Default Value` `1` (wms-app 109; it was `false` before P-24).
- **Meaning**: may a receipt be closed when its completion is `Partial`, or `Over`/`Pending` against a plan?
- **Affects**: `receipt_close` (`wms-inbound/src/service/receipt/lifecycle/close_receipt.rs:196-226`).
  Description: `Per D-21. Permit close with completion=Partial|Over via supervisor override (code 71).`
  - Off: the close is refused for good. Message: `Cannot close receipt <number>: completion is <Partial|Over|Pending> and ALLOW_CLOSE_WITH_DISCREPANCY is off` (code 71, not overridable).
  - On: the close needs code 71 confirmed by a person with the right `receipt.override_close_discrepancy`, or a supervisor grant for `receipt:<id>`. Message when not confirmed: `Receipt <number> is <completion> — supervisor override required to close`.
- **Example**: ASN expects 150, 149 received. On: a supervisor confirms, the receipt closes with `close_summary.discrepancy_override` naming the supervisor. Off: nobody can close it. Fix the quantity or cancel the missing line first.
- **Interactions**: a blind or return receipt (expected 0) is never a discrepancy and closes without this setting. Serial episodes (code 73) and pending damage (code 77) block the close whatever this says. See [40-receipt-policy-settings.md](./40-receipt-policy-settings.md) section 7.1.
- **When you change it**: affects the next close command only. Closed receipts stay closed.

#### `RECEIPT_LOCK_TIMEOUT_MS`
- **Type and range**: whole milliseconds above 0. Not set, empty, `0` or less = 5000 (section 1.1). Reads `Value`, then `Default Value`.
- **Default**: seed `5000`.
- **Meaning**: how long a receipt command waits for the receipt row that another command holds.
- **Affects**: every receipt command (`wms-inbound/src/repo/locking.rs:19-28`) and receipt line planning (`planning/parent_lock.rs:122`).
- **Message when it runs out**: `receipt is locked, please retry (timeout <ms>ms)` (code 41, retry).
- **Example**: two operators receive onto the same receipt. The second waits up to 5 seconds, then gets code 41 and presses again.
- **When you change it**: takes effect on the next command.

#### `ORDER_LOCK_TIMEOUT_MS`
- **Seeded** `5000` (wms-app 091). Before that migration no row existed and the key did not show on the screen.
- **Type and range**: whole milliseconds above 0. Not set, empty, `0` or less = 5000 (section 1.1). Reads `Value`, then `Default Value`.
- **Affects**: order commands (allocate, release, cancel) wait for the order lock (`wms-outbound/src/repo/locking.rs:19-28`).
- **Message**: `order is locked by another operation (waited <ms>ms)` (code 41, retry).

#### `IDEMPOTENCY_TTL_DAYS`
- **Type and range**: whole days. Not set = 7.
- **Meaning**: how long a stored answer for an idempotency key is kept. A repeated request with the same key and payload inside this time returns the first answer instead of running again.
- **Affects**: every stateless or stateful command through the pipeline (`wms-shared/src/idempotency.rs:486-491`). The cleaner removes older keys.
- **When you change it**: new keys use the new time. Keys already stored keep their own expiry.

#### `ENABLE_RECEIPT_AUDIT`
- **Type and range**: on/off. Not set or unreadable = off.
- **Default**: seed `1`, `Default Value` `1` (wms-app 109; it was `false` before P-24).
- **Meaning**: write a field-level history of every change to a receipt header.
- **Affects**: table `receipt_audit` (screen tab `Audit` of the receipt) through `ReceiptBmc::audit_setting_key` (`wms-lib-core/src/model/receipt/receipt.rs:608`, `base/audit.rs:36-56`). A daily sweeper deletes audit rows older than **365 days**. That limit is a constant (`RECEIPT_AUDIT_RETENTION_DAYS`), not a setting (`crates/services/app-server/src/services/cleanup_tasks.rs:121`).
- **When you change it**: off stops new rows. Old rows stay until the sweeper removes them.

#### `ENABLE_SKU_AUDIT`
- **Type and range**: on/off. Seed `false`.
- **Affects**: table `sku_audit` (tab `Audit` of the SKU) (`wms-lib-core/src/model/sku.rs:573`). Not swept.
- **When you change it**: no past history is created when you switch it on.

### 2.2 Moves and putaway

#### `MOVE_HOLD_POLICY`
- **Type and range**: text, `warn` or `silent` (any case). Any other word means `warn`. Not set = `warn`.
- **Default**: seed `warn`.
- **Meaning**: what a move does when the **stock it takes** (an LPN or a lot) carries an active hold.
  - `warn`: each hold is judged by its hold code (file 43). Hard codes stop the move. Confirmable codes ask for a confirmation (code 80).
  - `silent`: holds on the source stock are ignored. The move runs.
- **Affects**: `wms-inventory/src/movement/validation.rs:332-400`, read at `movement/service.rs:367`. It does **not** switch off the location checks (source location hold, code 83; destination location hold, code 84). Moves of type "progressive" (QC release, move to QC, move to damage and similar) ignore holds whatever this says.
- **Messages (warn)**: hard: `hold #<id> ("<code>") blocks this move (policy: not overridable)`; confirmable: `move requires an acknowledged override of: <code 80 (<hold code>)>`.
- **When you change it**: next move only.

#### `MOVE_REQUIRE_LPN`
- **Type and range**: `1` = on. Any other value, or not set = off. (`true` also counts as 1.)
- **Meaning**: a move may not leave stock loose.
- **Affects**: `movement/service.rs:515-531`. When the stock would land without an LPN and the destination is not a discard-LPN location, the move is refused: `MOVE_REQUIRE_LPN=1: this move would leave stock loose — name or generate a destination LPN`. Moving a whole container (relocate) is never affected.
- **Interactions**: receipts are not affected; use the receipt policy `receipt_without_lpn` for those.

#### `COUNT_ON_PUTAWAY_DEVIATION`
- **Type and range**: `1` = on. Anything else = off. Seed `0`.
- **Description**: `Directed putaway with an acknowledged deviation (code 85): 0=nothing, 1=count the destination location`.
- **Affects**: after a directed putaway move that the operator pushed through with an acknowledged deviation, the server asks for a count of the destination location (`movement/service.rs:862-880`, reader `validation.rs:748-762`). It only writes an outbox event; the count starts after the move commits.
- **When you change it**: next deviating move.

#### `COUNT_ON_PICK_CANCELLED`
- **Type and range**: `1` = on. Anything else = off. Seed `0` (wms-app 119).
- **Description**: `Order cancelled while its pick's source was already confirmed: 0=nothing, 1=count the source location`.
- **Affects**: an order cancel asks for a count of the source location of every pick it removes whose source an operator had already confirmed (`wms-outbound/src/picking/cancelled_pick.rs`, called from `service/order/cancel.rs`). It only writes an outbox event; the count starts after the cancel commits. Count spec Appendix N.
- **When you change it**: next order cancel.

#### `PUTAWAY_RESERVATION_TTL_MIN`
- **Type and range**: whole minutes above 0. Seed `15`.
- **Meaning**: how long a directed-putaway reservation of a location is held.
- **Affects**: the hold time of every directed-putaway reservation. Order: the owner's `Putaway Reservation TTL (min)` → this setting (`Value`, else `Default Value`) → the constant 15 (file 41, A.3). A value that is not whole digits does **not** fall back to `Default Value`; the built-in 15 is used.
- **When you change it**: new reservations only.

#### `PUTAWAY_LOCK_TIMEOUT_MS`
- **Seeded** `5000` (wms-app 091).
- **Type and range**: whole milliseconds above 0. Not set, empty, or 0 or less = 5000 (`DEFAULT_LOCK_TIMEOUT_MS`). Reads `Value`, then `Default Value`.
- **Meaning**: how long a putaway suggestion waits for a location that another operator is reserving.
- **Affects**: `wms-inventory/src/putaway/reserve.rs:362-366` (`lock_timeout_ms`); the value goes to `LocBmc::lock_all_by_code` (`reserve.rs:145`).

#### `OVERRIDE_GRANT_TTL_SECONDS`
- **Not seeded.**
- **Type and range**: whole seconds above 0. Not set, or 0 or less = **300**.
- **Meaning**: how long a supervisor override grant stays valid (moves and receipts).
- **Affects**: `wms-inventory/src/movement/override_grant.rs:96-99`, `:417-424`. An expired grant is refused as expired.
- **When you change it**: new grants. Grants already minted keep their own expiry.

### 2.3 Locations

#### `CHECK_DIGIT_ENABLED`
- **Type and range**: on/off. Seed `true`. Not set = off.
- **Description**: `Enable automatic check digit generation for new locations`.
- **Affects**: a new location gets its check digit computed from the code when on — one location (`New`, `create_loc`) and every location of the bulk generator `gen_locs` alike (`LocBmc::create`, `LocBmc::create_many_with_loc_generator`).
- **When you change it**: new locations only. Existing check digits stay.

#### `LOC_GEN_PATTERN`
- **Type and range**: text up to 50 characters. Empty or not set = `<AISLE_PREFIX><AISLE>-<LEVEL>-<LOC>`.
- **Description**: `location code generation pattern`.
- **Meaning**: the shape of the codes made by the bulk generator. Placeholders: `<AISLE_PREFIX>`, `<AISLE>`, `<AISLE_SUFFIX>`, `<LEVEL_PREFIX>`, `<LEVEL>`, `<LEVEL_SUFFIX>`, `<LOC_PREFIX>`, `<LOC>`, `<LOC_SUFFIX>` (`wms-lib-core/src/model/location.rs:1079-1092`).
- **Affects**: `gen_locs` only (`location_rpc.rs:112-119`, `:150-165`).
- **Example**: aisle prefix `A`, aisle `01`, level `02`, loc `03` with the default gives `A01-02-03`.
- **When you change it**: only locations generated afterwards.

### 2.4 Tasks (picking and counting work)

All five read `Value`, then `Default Value`. A value of 0 or less is replaced by the built-in default, except where noted.

#### `TASK_LEASE_TTL_MIN`
- **Default**: seed 15, built-in 15 (`wms-tasks/src/service/claim.rs:26`, `:190-214`).
- **Meaning**: minutes a claimed task is held for the operator before the reaper gives it back to the pool.
- **Example**: an operator claims a task and the radio dies. After 15 minutes another operator can get it.
- **When you change it**: leases created later. A lease already running keeps its end time.

#### `TASK_SKIP_COOLDOWN_MIN`
- **Default**: seed 10, built-in 10 (`claim.rs:218-235`).
- **Meaning**: minutes a refused (skipped) task is invisible to everyone before it returns to the pool. The supervisor board view uses the same number (SQL view in `wms-app/migrations/051_…sql:88`, which needs whole digits above 0, else 10).

#### `TASK_SKIP_ESCALATE_AFTER`
- **Default**: seed 3, built-in 3 (`claim.rs:240-260`).
- **Meaning**: after this many refusals, the task leaves the pool and waits for a supervisor.

#### `TASK_MAX_CONCURRENT_DEFAULT`
- **Default**: seed 1, built-in 1 (`wms-tasks/src/service/work_area_rules.rs:63-80`).
- **Meaning**: how many tasks one operator may hold at once **when the terminal names no work area**. When a work area is named, that work area's `max_concurrent_tasks` applies and this setting is ignored.

#### `TASK_ALLOW_RELEASE_DEFAULT`
- **Default**: seed 1, built-in on (`work_area_rules.rs:84-108`).
- **Meaning**: may an operator hand back or refuse a task when the terminal names no work area. `0` is a real "no" here (not replaced). With a named work area, its `allow_task_release` applies.

### 2.5 Printing

#### `LABEL_RENDERER_URL`
- **Type and range**: URL, text up to 50 characters. Seed `http://localhost:8086`.
- **Description**: `Per D-16, D-22. External Typst/label renderer service URL. Used by LabelPrintService::print_label.`
- **Meaning and order**: the address of the label renderer. The setting wins **only if its `Value` differs from its own `Default Value`**. Otherwise the environment variable `RENDERER_URL` is used. If that is empty too, `http://localhost:8086`. An empty `Value` means "use the environment".
- **Affects**: all label printing from the warehouse (`wms-lib-core/src/renderer_url.rs:159-175`). When the setting overrides the environment with a different address, the server logs one warning per schema and address.
- **Example**: seed row. `Value` = `Default Value` = `http://localhost:8086`, so the environment wins. Set `Value` = `http://render.internal:8086`: it differs from the default, so it wins.
- **When you change it**: the next print.

### 2.6 Warehouse day

#### `WAREHOUSE_TIMEZONE`
- **Type and range**: an IANA time zone name, such as `Europe/Moscow` or `Asia/Novosibirsk`. Seed `UTC`. Empty = `Default Value`. No row = `UTC`.
- **Description**: `Time zone of this warehouse (IANA name, e.g. Europe/Moscow). Its date is the warehouse day`.
- **Meaning**: the time zone of this physical warehouse. Its local date is the **warehouse day**. It is a setting of each warehouse, not of the enterprise. IANA daylight-saving transitions are applied automatically; the day still changes at the warehouse's local midnight when its UTC offset changes.
- **Affects**: cycle-count policies run once per warehouse day — the scheduler and `Run Now` both write that date to `Last Run` (`SystemSettingsBmc::warehouse_today`; see `24-inventory-count-policy.md`).
- **Example**: `Europe/Moscow` (UTC+3). A policy that ran at 23:30 local time runs again after 00:00 local time, not after 03:00.
- **Wrong value**: an unknown name is refused when you save it: `unknown time zone 'Europe/Moskow': use an IANA name such as Europe/Moscow`.
- **When you change it**: the next scheduler pass (at most one hour). A policy that already ran on the new local date does not run again that day.

## 3. Keys read by the code but not seeded (1)

| Key | If no row | Meaning | Section |
|---|---|---|---|
| `OVERRIDE_GRANT_TTL_SECONDS` | 300 | supervisor grant life | 2.2 |

To use one, create the row with `create_system_settings`
(`config_key`, `config_value`, `default_value`, `description`, `editable`).

## 4. Constants that look like settings but are not

These are hard-coded. There is no screen and no key.

| Constant | Value | Where | What it does |
|---|---|---|---|
| `RECEIPT_AUDIT_RETENTION_DAYS` | 365 | `app-server/src/services/cleanup_tasks.rs:121` | age at which receipt audit rows are deleted |
| `DEFAULT_TTL_MINUTES` | 15 | `wms-inventory/src/putaway/reserve.rs:22` | last-resort reservation time |
| `LONG_REDIRECT_DISTANCE` | 30 | `wms-inventory/src/putaway/mod.rs:293` | a putaway redirect longer than this is marked long in the trace |
| `ABANDONED_PER_TICK_ALERT` | 20 | `wms-inventory/src/putaway/sweeper.rs:91` | the sweeper warns when it frees this many abandoned reservations in one 5-minute pass |
| `SWEEP_INTERVAL` | 5 minutes | `sweeper.rs:57` | how often the sweeper runs |
| `DEFAULT_EPISODE_TTL` | 8 hours | `wms-serial/src/service/serial/episode_lifecycle.rs:57` | life of a serial-capture episode before it is marked abandoned |
| `MAX_REGISTRATION_BATCH` | 500 | `wms-inventory/src/domain/handling_unit/aggregate.rs:5` | handling units registered at once |

## 5. Dashboard settings

### 5.1 Where

| Item | Value |
|---|---|
| Menu path | `Sidebar > Control Center > Board Settings` and `Sidebar > Control Center > Metric Thresholds` (the group sits right after `System Settings`) |
| Screens | `Dashboard Settings` (list and card), `Metric Thresholds` (list and card), `Dashboard Metrics` (read-only catalogue) |
| Roles | change: `Admin`, `Manager`. Read the settings: `Admin`, `Manager`. Read the catalogue: every role. |
| API | `dashboard_setting_get`, `dashboard_setting_list`, `update_dashboard_setting`, `dashboard_metric_threshold_*` (`create`, `update`, `delete`, `get`, `list`), `dashboard_metric_catalogue` |
| Scope | one `dashboard_setting` row per warehouse (`id = 1`), plus one threshold row per metric |
| Versioning | both are versioned. A save sends the version it read. Stale: optimistic-lock conflict with the current version. |

Source: `wms-dashboard/src/domain/setting/aggregate.rs`, `wms-dashboard/src/service/setting/`,
`wms-app/migrations/080_dashboard_settings.sql`, `wms-meta-ui/migrations/123_dashboard_settings_screens.sql`.

If the settings cannot be read, the board is drawn with the defaults and shows
`board settings unavailable — showing the defaults`.

### 5.2 `dashboard_setting` (the board settings card)

Seed: one row made by migration 080 (`INSERT … (id) VALUES (1)`), so a save is always an update.

#### Rail (`rail`) - `Rail slot 1` ... `Rail slot 6`
- **Column and type**: `rail` text array, either empty (NULL) or **exactly 6** metric keys. On the screen the card shows six slots, each a picker of a metric key.
- **Default**: NULL = the design rail: `orders_released`, `lines_picked`, `shipments_pending`, `dock_utilisation`, `inventory_accuracy`, `labour_on_floor`. Saving the design rail again stores NULL, so a later change of the design still reaches this warehouse.
- **Meaning**: which six measures show in the top rail of the Control Center.
- **Refusals**: `the rail holds exactly 6 metrics, not <n>`, `no metric '<key>' in the catalogue`, `metric '<key>' is on the rail twice` (an emptied slot is an empty key and is refused by name).
- **Affects**: `wms-dashboard/src/service/snapshot.rs:132-170`. A user can also keep a personal rail. A key that was removed from the catalogue, or repeated, takes the warehouse's metric at that position; the rail never shrinks.
- **Metrics** you can choose (11):

| Key | Label | Unit | Source |
|---|---|---|---|
| `orders_released` | Orders released | `ord` | live, counted in the board window |
| `lines_picked` | Lines picked | `ln` | live, window |
| `shipments_pending` | Shipments pending | `shp` | live |
| `dock_utilisation` | Dock utilisation | `%` | **demo only** (dock doors are not modelled). Sample 78%. |
| `inventory_accuracy` | Inventory accuracy | `%` | live: matched first looks out of all first looks in the window, one decimal. No count = no number (shown as a dash). |
| `labour_on_floor` | Labour on floor | `ppl` | live |
| `receipts_open` | Receipts open | `rcp` | live |
| `lines_received` | Lines received | `ln` | live, window |
| `putaway_pending` | Putaway pending | `ln` | live |
| `stock_on_hold` | Stock on hold | `hld` | live |
| `moves_executed` | Moves executed | `mv` | live, window |

#### `show_demo` - `Show demo figures`
- **Column and type**: boolean, not null, default `true`.
- **Meaning**: whether demo numbers may appear.
- **Affects**: a slot with a demo-only source (`dock_utilisation`, and the exception `below_reorder_point`) shows the sample figure when on. When off it shows `no source` (`snapshot.rs:286-292`). Real measured numbers are never changed by this.
- **Helper text on the screen**: `Off: a slot, row or panel with no module behind it says so instead of drawing the design's figure.`

#### `throughput_plan_per_hour` - `Throughput plan (units/hour)`
- **Column and type**: double precision, empty allowed, must be above 0 and finite. Default empty.
- **Meaning**: the plan line on the throughput chart. The chart has 12 buckets over the board window, so the plan for one bucket is the hourly plan × the bucket's hours.
- **Refusal**: `the throughput plan must be a positive number per hour`.
- **Empty**: no plan line.

#### `expiring_within_days` - `Expiring within (days)`
- **Column and type**: integer 1 to 365, not null, default **30**. Required on the card (the six rail slots are required too).
- **Meaning**: how far ahead the exception `Lots expiring` looks. Its subtitle reads `<n> days`.
- **Refusal**: `the expiry horizon is 1 to 365 days, not <n>`.
- **Affects**: `wms-dashboard/src/domain/metric/postgres_repository.rs:156-164`.
- **When you change it**: the next board refresh. No stock or document changes.

#### `version` - hidden. Optimistic lock. Bumped on each save.

### 5.3 `dashboard_metric_threshold`

One row per metric (unique on `metric_key`). Without a row the metric has no alert level and always shows normal.

| UI label | Column | Type | Rule |
|---|---|---|---|
| `Metric` (required) | `metric_key` | text, a key from the catalogue | cannot be changed after creation: `a threshold's metric does not change — add a threshold for the other metric` |
| `Bad when` (required) | `bad_when` | `Above` or `Below` (labels `Above — high is bad`, `Below — low is bad`) | empty on create = `Above`. Anything else: `bad_when <x> is not Above or Below` |
| `Alert at` | `alert_at` | number | at least one of the two levels is required |
| `Critical at` | `critical_at` | number | must be finite |
| (hidden) `Version` | `version` | integer | optimistic lock |

- **Order rule**: `Above`: alert ≤ critical. `Below`: alert ≥ critical.
  Messages: `a threshold needs an alert level, a critical level, or both`,
  `the critical level must be at least as bad as the alert level`,
  `a threshold level must be a finite number`.
- **How a value is judged** (`aggregate.rs:196-216`): a level is reached **at** its value. `Above`: `value >= critical` is Critical, `value >= alert` is Alert. `Below`: `value <= …`. A value that is not a number is normal. Only measured values are judged; demo values and failed reads are always normal (`snapshot.rs:164-170`).
- **Example**: metric `shipments_pending`, `Above`, alert 40, critical 60. A value of 40 is Alert, 60 is Critical, 39 is normal. For `inventory_accuracy`, `Below`, alert 98, critical 95: 98 is Alert, 95 is Critical.
- **Affects**: only the colour/level of the rail slot. No document or stock changes.

## 6. Printing and label settings that act like policy

| Setting | Where | What it controls | Used? |
|---|---|---|---|
| `LABEL_RENDERER_URL` | system setting | label renderer address (section 2.5) | yes |
| `Auto-Print LPN` (`owner_config.auto_print_lpn_on_receive`) | owner, tab `Receiving` | print the LPN label after a receive (file 41, B.8) | yes |
| Printer assignment | table `printer_assignments`, API only | which printer a print goes to. Fields: `scope_type` (`User`, `Zone`, `Owner`, `Warehouse`), `scope_id` (the user id, zone id or owner id; empty for the warehouse), `printer_id`, `priority` (default 100, lower wins inside a scope), `is_active` (default true). Order: **Zone → User → Owner → Warehouse** (`wms-lib-core/src/model/printer_assignments.rs:170-222`). A print with no location has no zone, so the order is User → Owner → Warehouse. | yes |
| Printer configuration | table `printer_configurations`, API only (`printer_configuration_rpc.rs`) | `code`, `name`, `description`, `printer_host`, `printer_port` (default 9100), `printer_model`, `zone_code`, `is_default`, `label_definition_id`, `is_active` (default true) | only `code`, `printer_host`, `printer_port` are used (`wms-printing/src/label_print_service.rs:772-822`). **`is_active`, `zone_code`, `is_default`, `label_definition_id`, `printer_model` are stored only**: a printer with `is_active = false` still prints if an active assignment points to it. |
| Label definitions and templates | tables `label_definitions`, `label_templates`; designer in `Sidebar > Reports` | the label layout. The code looks a label up by its exact code: `lpn_id_label` (receive), `handling_unit_label` (handling unit registry), `shipping_label` (carton close) | yes |
| Zone printer fields | `Topology > Putaway Zones > Printer Settings`: `Default Label Printer`, `Auto Print Addr Label`, `Auto Print Carton Label`, `Default Report Printer` | meant to set default printers | **Stored only. They have no effect today.** The model reads and writes them; no print path reads them. Use a printer assignment with scope `Zone`. |

Print results never fail the business command. A missing printer, a missing
template or an unreachable device is logged and the receive or the carton close still
succeeds (`wms-inbound/.../shared/auto_print.rs:25-30`).

See also the guide `../07-printing-and-labels.md`.

## 7. Count of keys

- System settings: 19 seeded + 1 read but not seeded = **20 keys**. All 20 are read by code.
- Dashboard: 4 board settings (`rail` as one field of six slots, `show_demo`, `throughput_plan_per_hour`, `expiring_within_days`) plus the hidden `version`, and 4 threshold fields (`metric_key`, `bad_when`, `alert_at`, `critical_at`).

## 8. Findings

| # | Finding | Where |
|---|---|---|
| 1 | Fixed (P-13, commit `420b6746a`). `RECEIPT_LOCK_TIMEOUT_MS` and `ORDER_LOCK_TIMEOUT_MS` used to pass `0` to PostgreSQL, which means "wait for ever". All three lock time-out keys now go through `SystemSettingsBmc::lock_timeout_ms`, which uses 5000 for `0`, a negative number or text. `ORDER_LOCK_TIMEOUT_MS` and `PUTAWAY_LOCK_TIMEOUT_MS` are now seeded (wms-app 091). | `wms-lib-core/src/model/sys_settings.rs:226`, `wms-inbound/src/repo/locking.rs`, `wms-outbound/src/repo/locking.rs` |
| 2 | Fixed (P-24, wms-app 109). `ENABLE_RECEIPT_AUDIT` and `ALLOW_CLOSE_WITH_DISCREPANCY` used to have `Value` `1` and `Default Value` `false`; the default now matches. | `109_a_setting_default_says_what_a_fresh_install_does.sql` |
| 3 | `PUTAWAY_RESERVATION_TTL_MIN` with a non-numeric `Value` skips `Default Value` and uses the constant 15. The task keys fall back to `Default Value` instead. | `pending_move_in.rs:736-741` |
| 4 | `CHECK_DIGIT_ENABLED` is read by `create_loc` only, not by the bulk generator, although its description says "new locations". | `location_rpc.rs:44`, `:112-119` |
| 5 | Zone printer fields on the putaway zone screen, and `is_active`, `zone_code`, `is_default`, `label_definition_id` of a printer configuration, are stored only. | search over `*.rs` |
| 6 | The `printer_assignments` column comment lists the order `User → Zone → Owner → Warehouse`; the code does `Zone → User → Owner → Warehouse`. | `001_baseline.sql:3892`, `printer_assignments.rs:170-184` |
