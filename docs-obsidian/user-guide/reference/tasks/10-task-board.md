# Task Board

The task board lists every task of the active warehouse, in any status.
It is the supervisor's view of the dispatch pool and of the work in hand.
The form is `task_board_list_form`. The data comes from the database view `task_board`.

## How to open it

1. In the left sidebar open `Task Manager`.
2. Click `Task Board`.

The menu item is `task_board_menu`.

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Three buttons: `Return to Pool`, `Reassign`, `Delete Task`. |
| Filter bar | Filters for the columns that have a filter (all of them except `Pick Assignment`). |
| Grid | One row per task, 50 rows per page. A check box at the start of each row ticks it. You can tick many rows. |
| `Columns` | Shows or hides columns. 25 of 28 are shown at first. |
| `Views` | Saves a set of filters and columns. |

A click on a row does not open anything. The board has no card.
The grid cannot be edited. All columns are read only.

> Not confirmed by code: in which order the rows come when you open the board. The metadata sets no sort for this list. To verify: open the board on a warehouse with several tasks and read the `Created` column.

## Columns

Table: `task` (read through the view `task_board`). Every column is read only.

| Label | Column | Type | Filter | Shown at first | What it shows |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | The row key. |
| `Task` | `code` | Text, 20 | Text | Yes | The task code. |
| `Type` | `task_type` | List | Set of values | Yes | `Pick`, `Putaway`, `Replenish`, `Move`, `Count`. |
| `Status` | `status` | Badge | Set of values | Yes | `Created`, `Assigned`, `InProgress`, `Completed`, `Shorted`, `Cancelled`. See [Task statuses](90-task-statuses-and-transitions.md). |
| `Priority` | `priority` | Whole number, 16 bit | Number | Yes | Default 50. A lower number is more urgent: the pool is read in ascending order. |
| `SKU` | `sku_code` | Text, 50 | Text | Yes | The item. Empty if the task has no item. |
| `Lot` | `lot` | Text, 10 | Text | Yes | The lot. |
| `Qty` | `qty` | Number | Number | Yes | The planned quantity. A `Count` task has none. |
| `UOM` | `uom` | Text, 10 | Text | Yes | Unit of the quantity. |
| `Qty Done` | `qty_done` | Number | Number | Yes | Quantity done so far. Default 0. It is kept when the task goes back to the pool. |
| `From` | `from_location` | Text, 20 | Text | Yes | The source location. The pool is filtered by the zone of this location. |
| `To` | `to_location` | Text, 20 | Text | Yes | The destination location, if any. |
| `Zone` | `zone` | Text | Text | Yes | The putaway zone of the `From` location. |
| `Assignee ID` | `assignee` | Whole number | Number | No | The operator id. Empty when the task is in the pool. |
| `Assignee` | `assignee_username` | Text, 128 | Text | Yes | The login of the holder. |
| `Assignee Name` | `assignee_name` | Text, 200 | Text | Yes | The full name of the holder. |
| `Created` | `created_at` | Date and time | Date | Yes | When the task was made. |
| `Claimed` | `claimed_at` | Date and time | Date | Yes | When the holder took it. Cleared when the task goes back to the pool. |
| `Started` | `started_at` | Date and time | Date | Yes | When the first progress was reported. Cleared on return to the pool. |
| `Ended` | `ended_at` | Date and time | Date | Yes | When the task finished. |
| `Lease Expires` | `lease_expires_at` | Date and time | Date | Yes | When the holder loses the task if nothing renews the lease. See below. |
| `Available From` | `available_from` | Date and time | Date | Yes | Until this time nobody is offered the task. See below. |
| `Return Reason` | `skip_reason` | Text, 80 | Text | Yes | The reason text of the last return to the pool. |
| `How Returned` | `return_kind` | List | Set of values | Yes | `Refused`, `HandedBack`, `Seized`, `Expired`. |
| `Refusals` | `refused_count` | Whole number | Number | Yes | How many times operators refused the task. Default 0. |
| `Escalated` | `escalated_at` | Date and time | Date | Yes | When the task was escalated to a supervisor. Empty if it was not. |
| `Version` | `version` | Whole number | Number | No | The change counter. `Return to Pool` and `Reassign` send it back. |
| `Pick Assignment` | `pick_assignment_code` | Text | none | Yes | The code of the live pick assignment that holds this task. Empty otherwise. |

The `Pick Assignment` column shows only a live assignment (`Building`, `Ready`, `Picking`, `Delivering`).
A task of a dissolved assignment shows no code.
Source: `crates/libs/wms-lib-sql/sql/wms-app/migrations/051_the_supervisor_sees_pick_assignments.sql:27-80`.

### Lease Expires

A claim sets the lease to now plus the setting `TASK_LEASE_TTL_MIN` (15 minutes by default).
The RF terminal renews it with `task_heartbeat` and with each progress report.
The system returns a task to the pool when the lease time is past.
The result is `Created`, no holder, `How Returned` = `Expired`, `Return Reason` = `auto-release (lease expired)`.
Source: `crates/libs/wms-lib-core/src/model/tasks/task.rs:1886-1923`.

### Available From

The column is the time of the last **refusal** plus the cooldown.
The cooldown is the setting `TASK_SKIP_COOLDOWN_MIN` (10 minutes by default).
Until that time nobody is offered the task, not even the operator who refused it.
The column is empty for a task that was handed back, taken back by a supervisor, or returned by an expired lease. These doors do not start a cooldown.
Source: view `task_board` in `051_the_supervisor_sees_pick_assignments.sql:61-64`; `task.rs:1546-1551` and `task.rs:1685-1708`.

### Escalated

When the number of refusals reaches the setting `TASK_SKIP_ESCALATE_AFTER` (3 by default), the system sets `Escalated`.
An escalated task is offered to nobody, even after the cooldown.
Only `Reassign` takes it out. `Reassign` also sets `Refusals` back to 0 and clears `Escalated`.
Source: `task.rs:1550-1552` (escalation), `task.rs:1627-1637` (reassign).

## Toolbar buttons

The buttons are in the toolbar `task_board_tb`.
A button is grey when the ticked rows do not fit. The grey text says why when you point at the button.

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `Return to Pool` | Exactly one ticked task with status `Assigned` or `InProgress` | Opens the window `Return Task to Pool`. | [Returning a task to the pool](60-returning-a-task-to-the-pool.md) |
| `Reassign` | Exactly one ticked task that is `Assigned`, `InProgress`, or escalated | Opens the window `Reassign Task`. | [Reassigning a task](61-reassigning-a-task.md) |
| `Delete Task` | One or more ticked tasks | Opens the window `Delete Selected Tasks?`. | [Deleting tasks](62-deleting-tasks.md) |

The grey texts are:

| Button | Text when grey |
|---|---|
| `Return to Pool` | `Select a task that is Assigned or InProgress` |
| `Reassign` | `Select a task that is Assigned, InProgress, or escalated to a supervisor` |
| `Delete Task` | `Select at least one task` |

Source: the rows for form 294 in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql:5517-5520`.
The toolbar is drawn again each time you tick or untick a row (interaction `int_task_board_selection`).
With no row or with several rows ticked, the two one-row buttons stay grey, because there is no single row to read the status from. Source: the note in `086_the_supervisor_sees_and_dissolves_pick_assignments.sql:553-566`, which describes the same kind of gate.

The test for `Reassign` reads a value of the board view that is not a column on the screen.
The value is `yes` for `Assigned`, `InProgress`, and for `Created` with `Escalated` set. Source: view `task_board`, `051_the_supervisor_sees_pick_assignments.sql:53-57`.

## Who can use it

| Role | Open the board | `Return to Pool`, `Reassign` | `Delete Task` |
|---|---|---|---|
| `ADMIN` | Yes | Yes | Yes |
| `MANAGER` | Yes | Yes | Yes |
| `SUPERVISOR` | Not confirmed (see the [overview](00-task-manager-overview.md)) | No by default | No by default |
| `OPERATOR` | Yes (read only) | No | No |
| `VIEWER` | Yes (read only) | No | No |

The reason for each cell is on [Who can do what](91-who-can-do-what.md).

## What this screen affects

- `Return to Pool` and `Reassign` change the holder, the status and the lease of a task. The terminal of the old holder loses the task.
- `Delete Task` removes the task and puts its pick back into reserve.
- Nothing on this screen changes stock.

## Related pages

- [Task Board windows](11-task-board-dialogs.md)
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- [Skip History](40-skip-history.md)
- API: read `list_task`, `get_task`; commands `task_force_release`, `task_reassign`, `task_delete_many`
- RF terminal: `PICK01` "Get Pick Work" claims a pick task (`pick_dispatch_next`). A pick operator gives a task back with `Reject Pick` (`PICK11`, method `pick_reject`). That is always a refusal, with a reason.
