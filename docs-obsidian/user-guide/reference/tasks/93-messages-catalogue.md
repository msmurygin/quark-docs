# Messages catalogue

This page lists the messages that the Task Manager screens show, grouped by the page that explains them.
A part in `{braces}` is replaced by a value. The page linked in the heading says when the message appears and what to do.

Messages are reproduced exactly as they appear in the application. A message may begin with a lower-case letter.

## [Task Board](10-task-board.md) buttons (grey text)

- `Select a task that is Assigned or InProgress`
- `Select a task that is Assigned, InProgress, or escalated to a supervisor`
- `Select at least one task`

## [Returning a task to the pool](60-returning-a-task-to-the-pool.md)

- `Task {code} returned to the pool`
- `Task {code} could not be returned to the pool: {error}`
- `Select exactly one task`
- `Say why the task is being returned to the pool`
- `The task board has moved on — reselect the task and try again`
- `version conflict on task {id} (current version {n})`
- `task {id} is in status {status}, this action does not apply`
- `task {id} cannot change hands: {code}`
- `skip_reason is required`
- `skip_reason is too long: {n} chars, max 80`
- `task {id} not found`

## [Reassigning a task](61-reassigning-a-task.md)

- `Task {code} reassigned`
- `Task {code} could not be reassigned: {error}`
- `Choose an operator to reassign the task to`
- `operator {id} is not an active assignee`
- plus the task refusals of the previous page

## [Deleting tasks](62-deleting-tasks.md)

- `Select at least one task`
- `The task board has moved on — reselect the tasks and try again`
- `Deleted {n} task(s) — their picks are back in reserve`
- `{orders} has nothing left in work — press Release to dispatch again` and the form with `have`
- `{n} not deleted: {reason}; {reason}`
- `Tasks could not be deleted: {message}`
- `task {id} is {status} — удалить можно только задачу, которую ещё никто не взял`
- `task {id} is a {type} task over '{source}' — it holds no reservation in an order`
- `task {id} is a {type} task over '{source}' — it belongs to no order`
- `task {id} belongs to order {a}, not order {b}`
- `pick_detail {id} points at task {x}, not {y} — the link has already diverged`
- `pick_detail {id} is {status}, not Released — нечего возвращать в резерв`
- `{entity} id={id} not found`

## [Pick Assignments](20-pick-assignments-list.md) and [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md)

- `Tick exactly one assignment in Building, Ready or Picking (a Delivering one is completed, not dissolved)` (grey text)
- `Pick assignment {code} dissolved`
- `Pick assignment {code} was not dissolved: {error}`
- `Tick exactly one pick assignment`
- `Say why the assignment is dissolved`
- `The board has moved on — tick the assignment again and retry`
- `Tick the assignment again: its version is unknown`
- `no such pick assignment: {id}`
- `the pick assignment changed since you read it: read it again`
- `the pick assignment is no longer live: {code} ({status})`
- `the pick assignment is being delivered: complete it instead: {code}`
- `a task cannot leave its holder: close its serial capture first: task {id} ({reason})`
- `the pick assignment changed meanwhile: try again: {code}`
- `these picks wait for the recovery of a full box — hand them over: {code}, position {n}`
- `reason is required`
- `reason is too long: {n} chars, max 80`

## [Pick Target Exceptions](30-pick-target-exceptions.md) and [Retrying a box-full repair](64-retrying-a-box-full-exception.md)

- `Tick exactly one planned-carton exception waiting for recovery` (grey text)
- `Exception {id}: {status}`
- `Exception {id} was not retried: {error}`
- `Tick exactly one exception`
- `The list has moved on — tick the exception again and retry`
- `this box-full exception does not wait for recovery: {id} ({status})`

## [Operators](50-operators-list.md) and [Syncing operators](65-syncing-operators.md)

- `Operators synced: {n} added or updated`
- `Operators synced: {n} deactivated`
- `Operators synced: {n} added or updated, {m} deactivated`
- `Operators are up to date — nothing changed`
- `Operator sync failed: {message}`
- `Choose a warehouse first — operators are synced per warehouse`

## What the RF terminal says when it asks for work

These come from the same commands and are shown on the terminal, not on the web screens. They explain why a task does not reach an operator.

- `you have no right to take {type} tasks in any work area — ask a supervisor`
- `you have no right to take {type} tasks in work area {area} — ask a supervisor`
- `there are {type} tasks in your work areas, but every one is heavier than your equipment lifts (up to {w} at ground level) — they wait for other equipment`
- `returning a task is not allowed in this warehouse — ask a supervisor to move it`
- `returning a task is not allowed in work area {area} — ask a supervisor to move it`
- `operator already has {type} task {id}; resume it before requesting Pick work`

## Sources

- `crates/libs/wms-tasks/src/error.rs`
- `crates/libs/wms-tasks/src/service/release.rs`
- `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/062_receipt_and_task_use_rpc_command.sql`, `063_task_reassign_uses_rpc_command.sql`, `086_the_supervisor_sees_and_dissolves_pick_assignments.sql`, `101_carton_execution_exceptions.sql`, `001_baseline.sql` (grey texts)
- `crates/services/web-ui-server/src/extensions/customization/task/lifecycle_action.rs`
- `crates/services/web-ui-server/src/extensions/customization/operator/sync_action.rs`
- `crates/libs/wms-outbound/src/service/status_manager/delete_task.rs`, `delete_tasks.rs`
- `crates/libs/wms-lib-core/src/model/narration/mod.rs:2291-2323`

> Not confirmed by code: that the web screens show the `{error}` text exactly as the command wrote it. The metadata puts `{error}` into the message. To verify: refuse each command on a test warehouse and compare the toast with this page.

## Related pages

- [Return codes](92-return-codes.md)
- [Who can do what](91-who-can-do-what.md)
