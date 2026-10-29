---
title: "Administrator Guide - Work Areas, Equipment and Operator Permissions"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Work Areas, Equipment and Operator Permissions

This page lists every setting that decides **who may take a pick task, where, and with what equipment**. It also lists the rules the task manager applies when an operator asks for work.

Paths in the "Affects" lines are relative to `crates/libs/` unless they start with another crate name.

Roles: `Admin` and `Manager` can create and change all rows on this page. `Operator` and `Viewer` can read them (`app-server/src/web/rpcs/work_area_rpc.rs:6-16`, `equipment_profile_rpc.rs:6-18`, `operator_rpc.rs:20-31`). `Supervisor` can also read equipment profiles because the RF screen `Pick by Area` lists them. The policy assignment commands are `Admin` and `Manager` only (`picking_policy_rpc.rs:17`).

Nothing on this page is seeded in a production database. The dev seed (`wms-lib-sql/sql/dev_only/install-db/900-dev-seed.sql:601-631`) creates one area `MAIN_AREA` with zones `DOCK` and `RACK`, and gives the demo users 1000, 1001 and 1002 every task type in that area. The seed does not switch on `Pick Execution`. Without rows, **no operator is handed any task** (see section 6).

## 1. Work area

Menu path: `Sidebar > Warehouse Configuration > Work Areas & Equipment > Work Areas`. Table `work_area`.

A work area is a group of putaway zones. An operator's rights are a grid of task type and work area. A task reaches its area through `task.from_location -> location.putawayzone -> work_area_zone`.

### `Code` (`code`)

- UI label: `Code` (required).
- Column: `varchar(10)`, unique, not null. Note: **10 characters at most**, not 20.
- Default: none.
- What it does: the key. The RF operator types or scans it at `Pick by Area` (screen `PKAA`, title `Pick by Area`). Spaces around it are cut.
- Affects: `wms-lib-core/src/model/work_area.rs` (`find_by_code`); `wms-outbound/src/picking/commands/dispatch_next.rs:259` and `start.rs`.
- Message for an unknown code: `no work area has this code: <code>`.
- Example: area `PICK-A`. The lookup is exact, so the operator must type `PICK-A` as it is stored (case counts).
- Open work: do not rename. Policies point at the area id; the code is only what people type.

### `Description` (`description`)

- UI label: `Description`.
- Column: `varchar(200)`, not null, default empty text.
- Stored only. It has no effect today (shown in lists).

### `Max Concurrent Tasks` (`max_concurrent_tasks`)

- UI label: `Max Concurrent Tasks` (required).
- Column: `smallint`, not null, default 1. Check: 1 or more (`ck_work_area_max_concurrent_tasks_positive`).
- What it does: how many tasks one operator may hold at once inside this area, when the terminal names the area.
- Affects: for task types **other than Pick**, `wms-lib-core/src/model/tasks/task.rs:1287` (`claim_next`: a new task is handed out only while the operator holds fewer than this number).
- **For Pick it has no effect beyond "greater than 0".** A Pick dispatch first returns the operator's own held task (`wms-tasks/src/service/candidate.rs:295-310`) and only checks `max_concurrent > 0` before searching the pool (`candidate.rs:335-348`). A cart start refuses when the operator already holds a task (`OperatorHasOtherWork`). So one operator holds either one single Pick task or one cart set, whatever this number says.
- Example: area limit 3. A putaway operator can hold 3 putaway tasks. A picker still holds 1.
- When no area is named (old RF entry `Discrete Pick`): the system setting `TASK_MAX_CONCURRENT_DEFAULT` is used and area limits are not applied (`wms-tasks/src/service/work_area_rules.rs`).
- Open work: lowering it does not take tasks away from operators who hold more.

### `Allow Task Release` (`allow_task_release`)

- UI label: `Allow Task Release`. Checkbox.
- Column: `boolean`, not null, default true.
- What it does: may an operator hand a task back or refuse it in this area. It gates both ways out: "hand back" and "refuse" (the RF screen `Reject Pick`, `PICK11`, and `Skip`/`Reject` in a cart).
- Affects: `wms-tasks/src/service/release.rs` (`skip_task_in_area`, gate after the "is it yours" and status checks), `work_area_rules.rs:80-103`.
- Message when off: `returning a task is not allowed in work area <code> — ask a supervisor to move it`. Without an area: `returning a task is not allowed in this warehouse — ask a supervisor to move it`.
- Example: a picker is stuck on task 812 in area `PICK-A` with the flag off. A supervisor opens `Sidebar > Management & Control > Execution Control > Task Board` and uses `Return to Pool` or `Reassign`.
- Interaction: `TASK_ALLOW_RELEASE_DEFAULT` rules when no area is named.
- Open work: takes effect on the next press.

### `Picking Policy` (`picking_policy_code`)

- UI label: `Picking Policy`. Read-only on the card and in the list. Changed only by the list button `Assign Policy`.
- Column: `work_area.picking_policy_code`, `varchar(20)`, null. NULL means `DISCRETE`.
- What it does: the default policy code of the area (see `21-picking-policy-settings.md`, section 1.3).
- Steps: tick one area in the list, press `Assign Policy`, choose a code in the window `Assign Picking Policy`, press `Assign`. The list of codes shows `<code> — <description>` for each published code except `DISCRETE`. Leave it empty to go back to `DISCRETE`. Helper text: `Leave empty: the area works by the default policy DISCRETE.`
- Command: `work_area_assign_picking_policy` (stateless). The code must have a `Published` revision, checked under a share lock so a retire cannot slip in.
- Messages: success `Work area {code}: picking policy assigned`. Failure `The policy was not assigned to work area {code}: {error}`. Errors: `Policy {code} has no published revision: it cannot be assigned to a work area`, `Work area {id} not found`. Selection: `Tick exactly one work area`; `The work-area list has moved on — tick the area again and retry`.
- Affects: `wms-lib-core/src/model/outbound/picking_policy.rs:582-650`.
- Open work: a live cart assignment keeps its own frozen policy copy. The new code is used at the next start or dispatch.
- Interaction: a per-equipment row wins over this default (section 3).

### `Pack station` (`pack_station_location`)

- UI label: `Pack station`. Dropdown of locations of type `Pack`. Empty is allowed.
- Column: `varchar(20)`, null, foreign key to `location(code)`. A database trigger demands the location type `Pack` (`work_area_pack_station_is_a_pack_location`, wms-app 079).
- What it does: names the place where this area's picked goods go to be packed.
- Affects (`wms-outbound/src/flow/route.rs`, `picking/commands/start.rs:205-218`, `deposit/onto_pallet.rs:97-106`):
  - Cart: only with `Completion` = `Confirm at the drop location`. The carrier delivery location becomes the station.
  - Pallet: only if the pallet's policy list `Pallet Drop Cell Types` holds `Pack`. The pallet's policy is the policy of the area (for the shift's equipment) when the pallet is opened through `Pick by Area` for a pick in a zone of the area; otherwise `DISCRETE`. The system finds the putaway zone of the pick's destination, then the areas that list that zone, then their stations. It routes only if **exactly one** distinct station answers. If areas disagree, the pallet is not routed.
  - With no station, nothing changes: picking delivers as before.
- Messages: `the area's pack station is not a location of this warehouse`, `the area's pack station must be a Pack location`.
- Example: area `PICK-A` has station `PACK-01`. The policy of the area (or `DISCRETE`, for a pallet that is not opened through the area) has `Stage`, `Door`, `Pack` in the list. A pallet whose destination `STAGE-1` stands in a zone of `PICK-A` is frozen to go to `PACK-01`, and a packing unit waits there.
- Open work: a pallet or cart that already froze its destination keeps it.
- The type of the location is not checked again after it became a station.

## 2. Work area zone

Table `work_area_zone`. In the area card the list `Work Area Zones`, button `New`.

### `Putaway Zone` (`putawayzone`)

- UI label: `Putaway Zone` (required, popup picker).
- Column: `varchar(20)`, foreign key to `putawayzone(code)`. Unique with the area (`uq_work_area_putawayzone`). A zone may belong to more than one area.
- What it does: puts every location of that zone into the area.
- Affects: the pool filter (section 8), the operator's reachable zones (`wms-lib-core/src/model/tasks/operator_task_permission.rs:155-182`), the pack station search.
- Example: area `PICK-A` has zones `RACK`, `DOCK`. A task from location `A-01-01` (zone `RACK`) belongs to `PICK-A`.
- Open work: removing a zone hides its tasks from operators who relied on it. Tasks they already hold stay with them.
- Delete of an area is refused while zones or permissions refer to it.

## 3. Policy by equipment kind

Card of the work area, list `Policy by Equipment Kind`, buttons `Add`, `Edit`, `Remove`. Table `work_area_picking_policy`. Commands: `work_area_equipment_policy_create`, `_update`, `_delete`, list `work_area_equipment_policy_list`.

### `Equipment Profile` (`equipment_profile_id`) and `Picking Policy` (`picking_policy_code`)

- UI labels: `Equipment Profile` (chosen when you add; cannot be edited later), `Picking Policy`.
- Columns: `equipment_profile_id bigint` (foreign key, restrict), `picking_policy_code varchar(20)` (upper case, not empty). Unique key `(work_area_id, equipment_profile_id)`.
- What it does: the area uses a different policy when the operator drives this equipment. It wins over the area default.
- Affects: `picking_policy.rs:614-635` (a `COALESCE` of this row, then the area default).
- Example: area `PICK-A` has default `DISCRETE`. Row: equipment `CART` -> `CART6`. An operator who chooses `CART` at `Pick by Area` gets the cart policy. An operator `On foot` gets `DISCRETE`.
- Messages (said in the reader's language from the narration catalogue; English shown): `no equipment kind has this id: <id>`; `the work area already names a policy for this equipment kind: change that row instead: <code>`; `the work area's policy for this equipment kind is gone: refresh the list`; and `Policy {code} has no published revision: it cannot be assigned to a work area`.
- Interaction: `Retire` of a policy code is refused while any area uses it, as default or in a row.
- Open work: same as the area default.

## 4. Equipment profile

Menu path: `Sidebar > Warehouse Configuration > Work Areas & Equipment > Equipment Profiles`. Table `equipment_profile`.

### `Code` (`code`)

- UI label: `Code` (required). `varchar(20)`, unique. Chosen by the operator by code at `Pick by Area`.
- Messages: `no equipment kind has this code: <code>`.

### `Description` (`description`)

- UI label: `Description`. `varchar(200)`, default empty. Stored only; shown in lists.

### `Max Weight` (`max_weight`)

- UI label: `Max Weight` (required). Column `double precision`, not null, default 0, check 0 or more.
- What it does: the heaviest load the machine lifts at ground level, in the weight unit of the warehouse. **0 means no limit.**
- Affects: `wms-lib-core/src/model/tasks/task.rs:1025` (`LIFTABLE_SQL`). A task is liftable when `task weight <= Max Weight - Weight Reduction per Level x location level`.
- Two cases always pass: `Max Weight` is 0 (or the operator has no profile), and the task weight is unknown (no weight on the pack or the SKU).
- Example: `Max Weight` 1000, reduction 100. A task at a location of level 3 can weigh up to 700. A task of 800 there is not offered to this operator. A task of 800 at level 0 is offered.
- Message when only too-heavy tasks remain: `there are Pick tasks in your work areas, but every one is heavier than your equipment lifts (up to 1000 at ground level) — they wait for other equipment`.
- Open work: takes effect at the next dispatch. A task already held stays.

### `Weight Reduction per Level` (`weight_reduction_per_level`)

- UI label: `Weight Reduction per Level` (required). Column `double precision`, not null, default 0, check 0 or more.
- What it does: how much lifting power is lost for each level of height. The level is the `Level` field of the location.
- Affects: same SQL as above. With `Max Weight` 0 it is ignored.

### `Active` (`is_active`)

- UI label: `Active`. Checkbox. Column `boolean`, not null, default true.
- What it does: an inactive profile cannot be chosen at `Pick by Area`. An operator who already drives it is refused at the next `Pick by Area` that keeps the same equipment, and chooses another kind or `On foot`.
- Message: `this equipment kind is switched off: <code>`.
- Affects: `wms-outbound/src/picking/commands/dispatch_next.rs` (`shift_equipment`). A carrier assignment already started, or a carrier still to deliver, is continued first; the refusal comes only when new work is asked for. Until the operator chooses again, the profile stays on the operator, and its lift limit and zone exclusions still apply (`wms-tasks/src/service/claim.rs`, `lift_capacity`). Switching a kind off never loosens a limit by itself.

### `Excluded Zone` (table `equipment_profile_zone_exclusion`)

- UI: list `Excluded Zones` on the profile card; field `Putaway Zone` (required).
- Columns: `equipment_profile_id`, `putawayzone varchar(20)`, unique together.
- What it does: removes that zone from the zones the operator can reach. A reach truck that cannot enter the `FLOOR` zone excludes `FLOOR`.
- Affects: `operator_task_permission.rs:155-182` (`NOT EXISTS` on the exclusion table).
- If every zone of the permitted areas is excluded: `you have no right to take Pick tasks in any work area — ask a supervisor`.
- Open work: next dispatch.

## 5. Operator and its equipment

Menu path: `Sidebar > Warehouse Configuration > Operator Permissions > Operators`. Table `operator`.

An operator row is a copy of a user. A user becomes an active operator when `RF device login` is on, the status is `Active`, and the user is assigned to the warehouse. The sync runs every 5 minutes. The `Sync` button runs it at once. You cannot create or delete operators.

### `Equipment Profile` (`equipment_profile_id`)

- UI label: `Equipment Profile`. Popup picker, can be empty. The only field you can edit.
- Column: `bigint`, null, foreign key restrict. NULL means on foot: no lift limit, no excluded zone.
- Written by: the operator card, and by the RF at `Pick by Area` (screen `PKAE` `Equipment`: 1 = on foot, 2 = from the list `PKAEL`).
- What it does: the filters of section 8 and the policy choice of section 3.
- Affects: `wms-tasks/src/service/claim.rs:172-187`, `candidate.rs:376`, `dispatch_next.rs:332-361`.
- Example: the picker chooses `On foot` for the shift. The profile is cleared. Excluded zones and lift limits no longer apply to them. The area default policy applies.
- Open work: a choice made at `Pick by Area` replaces the card value for the next shift.

`Login`, `Name` and `Active` are read-only. An inactive operator gets `operator <id> is not an active assignee` from the task manager, or at the RF `your operator record is not active in this warehouse: ask a supervisor`.

## 6. Operator task permission

On the operator card, list `Task Permissions`. Table `operator_task_permission`. One row is one right. No row means no right. Unique key `(operator_id, task_type, work_area_id)`.

### `Task Type` (`task_type`)

- UI label: `Task Type` (required). Dropdown: `Pick`, `Putaway`, `Replenish`, `Move`, `Count`.
- Column: enum `task_type`.
- What it does: the kind of task the right covers. `Count` is the inventory count (`24-inventory-count-policy.md`).
- `Replenish`: there is no replenishment engine in this version, so a `Replenish` right hands out nothing.

### `Work Area` (`work_area_id`)

- UI label: `Work Area` (required, popup picker). Foreign key, restrict.
- What it does: the area where the right applies. Zones of the area are the zones the operator can reach.

### `Pick Execution` (`pick_execution_enabled`)

- UI label: `Pick Execution`. Checkbox, required.
- Column: `boolean`, not null, **default false**.
- What it does: the rollout switch for new Pick work. A row with `Task Type` = `Pick` and this box off lets the operator see the area but hands out no new Pick tasks.
- Affects: `wms-outbound/src/picking/infrastructure/dispatch.rs:225-247` (`pick_execution_enabled_for_location`: there must be a `Pick` row with the switch on, in an area that contains the zone of the task's source location; with a named area, that area). It gates only **new** issue. A task already held, and the reconnect and commit of it, never stop.
- What the operator sees: the dispatch answers `No eligible Pick work` (RF `PICK01`). The reason code is `PICK_EXECUTION_ROLLOUT_DISABLED` in the answer's diagnostics. It is not shown on the RF screen.
- Example: operator `picker-a` has a `Pick` right in `PICK-A` with the box off. They get no pick. Tick the box. The next press hands out a task.
- Not used for task types other than `Pick`.
- Interaction: both are needed. Without the right row: `you have no right to take Pick tasks in any work area — ask a supervisor`. With the row but without the box: no work, no message.
- Open work: switching it off does not take tasks away.

## 7. Task manager system settings

Menu path: `Sidebar > Warehouse Configuration > Settings & Reference Data > System Settings`. All five settings are numbers. A value that is empty, zero or negative falls back to the built-in value for the first four.

| Key | Seed | Built-in fallback | What it does | Read at |
|---|---|---|---|---|
| `TASK_LEASE_TTL_MIN` | 15 | 15 | Minutes a claimed task is held. Each confirmation, commit or dispatch renews it. When it runs out the reaper returns the task to the pool. | `wms-tasks/src/service/claim.rs:189-219` |
| `TASK_SKIP_COOLDOWN_MIN` | 10 | 10 | Minutes a **refused** task is hidden from everyone. A hand-back is not hidden. | `claim.rs:222-244` |
| `TASK_SKIP_ESCALATE_AFTER` | 3 | 3 | Number of refusals after which the task leaves the pool and waits for a supervisor. | `claim.rs:247-264` |
| `TASK_MAX_CONCURRENT_DEFAULT` | 1 | 1 | Tasks one operator may hold when the terminal names no area. | `work_area_rules.rs:56-70` |
| `TASK_ALLOW_RELEASE_DEFAULT` | 1 | 1 (allowed) | Hand-back and refusal allowed when no area is named. Here 0 means "not allowed". | `work_area_rules.rs:80-103` |

Why a zero lease falls back to 15: a zero or negative lease would expire at once and give the task to a second operator while the first still carries the goods.

- Lease and carts: a cart assignment's lease is the lease of its tasks. They are renewed together. When none reaches "now", the lease sweeper dissolves the whole assignment and returns its tasks (`wms-outbound/src/picking/lease.rs`). An assignment with every member committed is not dissolved. It goes to delivery.
- The reaper and the sweeper run every 60 seconds (`app-server/src/services/cleanup_tasks.rs:142, 908`). The sweeper runs before the reaper. So a task can sit up to about `TASK_LEASE_TTL_MIN` + 1 minute before another operator gets it.
- A lease that already ran out cannot be renewed: `task <id> lease has expired; claim the work again`.
- Example: `TASK_SKIP_ESCALATE_AFTER` = 3. Three operators refuse task 812 with a reason. After the third refusal the task has `escalated_at`. Nobody is offered it. A supervisor uses `Reassign` on the task board. The first two refusals each hide it for 10 minutes.
- Open work: the new value applies to the next claim or renewal. Existing deadlines do not move.

### `Pick Episode Reassignment` (SKU setting that decides who may take a task away)

- UI label: `Pick Episode Reassignment`. Dropdown on the serial-tracking tab of the SKU (`sku_serial_config_form`). Column `sku_serial_config.pick_episode_reassignment_mode`, `varchar(32)`, not null, default `Block`.
- Values: `Block` (`Block movement`), `Handover` (`Hand over open episode`), `CancelAndRestart` (`Cancel and restart capture`). (The old value `Transfer` was renamed `Handover` in wms-app 040 and wms-meta-ui 079.)
- What it does: a pick with an open serial capture episode has units the holder already scanned. This value says what happens when the task would change hands (supervisor `Reassign` or `Return to Pool`, an operator's reject, lease expiry).

| Value | Reassign to another operator | Return to pool, reject, lease expiry |
|---|---|---|
| `Block` | refused | refused: the task stays with its holder |
| `Handover` | the open episode goes to the new holder, items kept | allowed; the next holder takes the episode over at the first scan |
| `CancelAndRestart` | the episode is cancelled, items kept for audit | allowed; the next holder starts a new one |

- Any mode: an `Abandoned` episode keeps the task with its holder until a supervisor closes it (RF `Force-Close Episode (supervisor)`, `RCSN_FORCE`). A pick in a live cart assignment is never moved alone: dissolve the assignment.
- Affects: `wms-outbound/src/picking/infrastructure/holder_change.rs:1-60` (rule), used by `wms-tasks/src/service/reap.rs`, `release.rs`.
- Message: `task 812 cannot change hands: SERIAL_EPISODE_OPEN` (other codes: `SERIAL_EPISODE_ABANDONED`, `PICK_ASSIGNMENT_LIVE`).
- Example: SKU with `Block`. Anna scanned 3 of 5 serials, then her terminal died. The lease expires after 15 minutes. The reaper cannot return the task. Nobody else gets it until Anna comes back, or a supervisor closes the episode.
- Open work: the value is read at the moment of the change.

## 8. The claim rules, in the order the system applies them

For the Pick type the RF calls `pick_dispatch_next` (`wms-outbound/src/picking/commands/dispatch_next.rs`). The generic `task_claim` refuses Pick: `dispatch for Pick tasks is source-owned; use the source capability command`.

1. **One request at a time per operator.** A lock on the operator queues double presses.
2. **A live cart assignment is continued first.** Then a carrier dissolved with goods and never delivered (`deliver your carrier with picked goods first`).
3. **The operator must be active.** See section 5.
4. **The named area and equipment** (only on `Pick by Area`): the area must exist; the equipment kind must exist and be active; "equipment and on foot" together, "equipment without area", and "area by code and by id" are refused: `choose an equipment kind or on foot, not both`, `the equipment kind is chosen together with a work area`, `name the work area once: by code or by id`.
5. **The policy** of (area, equipment) is read (section 3). If `Carrier Required` is Yes: only a held task is handed out; otherwise the answer is `Scan Carrier` and no task is claimed.
6. **A held task comes first.** The oldest claimed task of the operator. If it is another task type: `operator already has Putaway task 41; resume it before requesting Pick work`. If it is no longer executable: `assigned Pick task 812 is no longer executable: <code>`.
7. **The limit.** Section 1: only `> 0` matters for Pick.
8. **Reachable zones.** Zones of the areas where the operator has a `Task Type` right, minus the excluded zones. If none: `you have no right to take Pick tasks in work area PICK-A — ask a supervisor` (or `in any work area`).
9. **The pool.** A task is in the pool when all hold (`task.rs:999`):
   - status `Created`, no assignee, right task type;
   - its `from_location` is in a reachable zone;
   - not escalated;
   - not refused within the last `TASK_SKIP_COOLDOWN_MIN` minutes;
   - not excluded earlier in this search;
   - liftable by the operator's equipment (section 4).
10. **The order.** `task.priority` ascending (it is the order priority; smaller is sooner; default 50), then the location `Route Sequence` ascending (empty last), then oldest `created_at`, then id (`task.rs:630-641`).
11. **The source says yes or no** for the first candidate that is locked (skip-locked, so two operators never wait on one task). The source rules (`picking/infrastructure/dispatch.rs`) and their codes:

| Code | Meaning |
|---|---|
| `PICK_EXECUTION_ROLLOUT_DISABLED` | No `Pick Execution` box for this operator and area. |
| `PICK_NOT_RELEASED` | The pick is not `Released`. |
| `ORDER_NOT_RELEASED`, `ORDER_TERMINAL` | The order is not released, or is closed or cancelled. |
| `LOCATION_MISSING`, `LOCATION_BLOCKED` | The source location does not exist, or is not `Ok`, or carries an operation flag (for example `CycleCountActive` after a short). |
| `INVENTORY_HOLD` | An inventory hold covers the position. |
| `CARTONIZATION_PENDING`, `CARTONIZATION_BLOCKED`, `CARTONIZATION_INVALID` | The cartonization plan is not ready, is blocked, or contradicts itself. |
| `IN_CONTINUATION` | The pick is the rest of a box that was closed full. Only a cart start takes it. |
| `WRONG_TASK_TYPE`, `UNSUPPORTED_SOURCE`, `SOURCE_MISSING`, `SOURCE_TASK_MISMATCH`, `TASK_SNAPSHOT_MISMATCH` | The task and the pick no longer agree. Report to support. |

   A refused candidate stays `Created`. It is skipped only in this search. The codes go to `diagnostics` in the answer. The RF shows only `No eligible Pick work`.
12. **Nothing found.** If zones were reachable but every task is too heavy, the too-heavy message of section 4. Otherwise an empty answer: wait and press again.

In a named area the search uses only that area's zones (one phase `CurrentArea`). On the old entry the area is not named: the search covers every area the operator may pick in.

## 9. Reject, skip and the cooldown

- **Reject** (RF `PICK11` `Reject Pick`, field `Reason`): legal only before anything is picked. It returns the task to the pool, hides it for `TASK_SKIP_COOLDOWN_MIN` and counts one refusal. The reservation stays. In a cart the pick first leaves the assignment, and the cooldown uses the assignment's area.
- **Skip** in a cart (`PKA25` `Skip`): the stop goes to the end of the route. The task is not touched.
- **Reason length:** the server accepts at most 80 characters (`skip_reason is too long: 95 chars, max 80`). The RF field `Reason` also stops at 80 (rf-screens 113, P-07).

## 10. What happens to open work when you change these settings

| Change | Effect on open work |
|---|---|
| Remove a `Task Permissions` row | The operator keeps the tasks they hold. They cannot be handed a new one. A zone they no longer reach still lets them finish a held task. |
| Untick `Pick Execution` | Same: new issue stops, held work continues. |
| Remove a zone from an area | Tasks in that zone leave the pool of that area's operators. Held tasks stay. |
| Change `Max Weight` or add an exclusion | Next dispatch only. |
| Change the area policy (`Assign Policy`, equipment row) | Next dispatch or cart start. A live assignment is continued first. |
| Turn `Allow Task Release` off | Next hand-back or refusal is refused. |
| Change a `TASK_*` setting | Next claim or renewal. |
| Delete an area | Refused while zones, permissions or policy rows refer to it. |

## 11. Messages seen by operators and supervisors (summary)

| Message | When |
|---|---|
| `you have no right to take Pick tasks in any work area — ask a supervisor` | No permission row, or all zones excluded. |
| `you have no right to take Pick tasks in work area PICK-A — ask a supervisor` | Same, area named. |
| `there are Pick tasks in your work areas, but every one is heavier than your equipment lifts (up to N at ground level) — they wait for other equipment` | Section 4. |
| `returning a task is not allowed in work area PICK-A — ask a supervisor to move it` | `Allow Task Release` off. |
| `operator already has Putaway task 41; resume it before requesting Pick work` | A held task of another type. |
| `task 812 is not assigned to you (currently: Some(1002))` | Someone else holds it. |
| `task 812 is in status Completed, this action does not apply` | Wrong status. |
| `task 812 lease has expired; claim the work again` | Lease ran out. |
| `version conflict on task 812 (current version 9)` | The task changed. Code 40. Reload. |
| `No eligible Pick work` | RF text when the dispatch has nothing. |

## 12. Inconsistencies found while reading the code

1. `Max Concurrent Tasks` has no effect on Pick (section 1), although the model comment says it is read by claim since step 6.
2. Fixed (P-07, commit `356109c80`). The RF field `Reason` on `Reject Pick` (`PICK11` revision 2, `PKA27` revision 3) used to allow 250 characters while the server allows 80 (`wms-tasks/src/service/release.rs:64`). The terminal now stops at 80 (`wms-lib-sql/sql/rf-screens/113_rf_inputs_fit_the_server_limits.sql`).
3. Fixed (P-21). An operator who already drives a switched-off kind is refused at the next `Pick by Area` and chooses again; the limits stay until then (section 4).
4. The existing guide `06-outbound-setup.md` says `SUPERVISOR` can write pick short reasons. The code allows only `Admin` and `Manager` (`app-server/src/web/rpcs/pick_short_reason_rpc.rs:21`).
