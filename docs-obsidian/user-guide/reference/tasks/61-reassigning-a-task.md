# Reassigning a task

Use this to hand a task to another named operator. The task keeps its progress. The new operator carries on where the old one stopped.
It is also the only way to take a task out of the escalated state.

## Before you start

- You need the role `ADMIN`, `MANAGER` or `SUPERVISOR`, or a role where an administrator granted the method `task_reassign`. See [Who can do what](91-who-can-do-what.md).
- The task must be `Assigned`, `InProgress`, or `Created` with a value in `Escalated`.
- The new operator must be active. Run [Syncing operators](65-syncing-operators.md) if the person is missing from the list.
- The task must not be in a live pick assignment. Dissolve the assignment instead.

## Steps

1. Open `Task Manager > Task Board`.
2. Tick the check box of **one** task.
3. Click `Reassign`. The window `Reassign Task` opens.
4. In `Operator` click the picker and choose the new holder.
5. Click `Reassign` in the window.

## What happens

On success the window closes and the grid is read again. The message is `Task {code} reassigned`.

| Column | Value after |
|---|---|
| `Assignee` | The new operator |
| `Status` | `Assigned` if it was `Created` (an escalated task). Otherwise it keeps its status (`Assigned` or `InProgress`). |
| `Claimed`, `Lease Expires` | Set to now, and to now plus `TASK_LEASE_TTL_MIN` (15 minutes by default) |
| `Return Reason`, `How Returned`, `Available From` | Empty |
| `Refusals` | 0 |
| `Escalated` | Empty |
| `Qty Done` | Unchanged |
| `Version` | Up by one |

The command writes your user as the one who changed the row. It writes no line in the audit log.
Source: `crates/libs/wms-lib-core/src/model/tasks/task.rs:1617-1647` and `crates/libs/wms-tasks/src/service/release.rs:224-300`.

For a pick with a serial scan already open, the rule of the SKU (`pick_episode_reassignment_mode`) decides what happens to the scanned units:

| SKU rule | Reassign to another operator |
|---|---|
| `Block` (the default when the SKU has no serial setup) | Refused with `SERIAL_EPISODE_OPEN` |
| `Handover` | The scan goes to the new operator with the units already scanned |
| `CancelAndRestart` | The scan is cancelled. The scanned units are kept for audit. The new operator starts the scan again. |

An abandoned scan refuses the reassign whatever the rule is (`SERIAL_EPISODE_ABANDONED`).
Source: `crates/libs/wms-outbound/src/picking/infrastructure/holder_change.rs:1-30,90-130`.

## If it is refused

The failure message is `Task {code} could not be reassigned: {error}`.

| You see (the `{error}` part) | Why | What to do |
|---|---|---|
| `version conflict on task {id} (current version {n})` | The task changed after you read the board. Return code 40. | Refresh the grid, tick the task, try again. |
| `task {id} is in status {status}, this action does not apply` | The task is `Completed`, `Shorted`, or a `Created` task that is not escalated. Return code 70. | Read the board again. |
| `operator {id} is not an active assignee` | The chosen operator is inactive or does not exist. | Choose an active operator. |
| `task {id} cannot change hands: PICK_ASSIGNMENT_LIVE` | The pick is in a live pick assignment. Return code 70. | Dissolve the assignment. |
| `task {id} cannot change hands: SERIAL_EPISODE_OPEN` or `SERIAL_EPISODE_ABANDONED` | See the table above. Return code 70. | Finish or close the serial scan. |
| `task {id} cannot change hands: COUNT_SAME_COUNTER` | A `Count` task. The count asks for a recount by another counter, and you chose the operator who did the first count. Return code 70. | Choose another operator. |
| `task {id} not found` | Another user deleted it. | Read the board again. |
| `Select exactly one task` | Not one row ticked. | Tick one row. |
| `Choose an operator to reassign the task to` | `Operator` is empty. | Choose one. |
| `The task board has moved on — reselect the task and try again` | The ticked row is gone, or its version is not known. | Refresh and tick again. |

Sources: `release.rs:224-300`, `crates/libs/wms-tasks/src/error.rs`, `crates/libs/wms-inventory/src/domain/inventory_count/aggregate.rs:329-341`, `063_task_reassign_uses_rpc_command.sql:25-70`.

> Not confirmed by code: whether a reassign to the operator who already holds the task is refused. The code has no rule for it. To verify: reassign a task to its own holder on a test warehouse.

## What it affects

- The old holder's terminal loses the task. The new holder finds it as their own open task.
- Nothing checks the new operator's rights (`Task Permissions`) or equipment. A supervisor may give any active operator any task.

> Not confirmed by code: that no check of rights happens. The reassign code path (`release.rs:224-300`) reads only the operator row and its `is_active` flag. To verify: reassign a `Pick` task to an operator who has no `Pick` right and try to continue it on the RF terminal.

## Related pages

- [Task Board](10-task-board.md) and [its windows](11-task-board-dialogs.md)
- [Task Permissions](52-task-permissions.md)
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- API: `task_reassign` (stateful command; sends `to` and `expected_task_version`)
- RF terminal: the new holder resumes the task from `PICK01` "Get Pick Work" (method `pick_dispatch_next`).
