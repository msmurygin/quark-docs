# Skip History

Skip History is the log of every time an operator gave a task back to the pool: who, which task, when, and why.
Use it to find tasks that operators keep refusing, or locations where picking often fails.
The screen is read only. It has no buttons.
The form is `task_skip_board_list_form`. The data comes from the view `task_skip_board`, which joins the table `task_skip_event` with the operator.

## How to open it

1. In the left sidebar open `Task Manager`.
2. Click `Skip History`.

The menu item is `task_skip_board_menu`.

## What the screen has

| Part | What it is |
|---|---|
| Grid | One row per event, 50 rows per page, newest first (the `When` column is sorted descending). One row can be selected. No check boxes. |
| Filter bar | Filters on the columns. |
| `Columns` | Shows or hides columns. 8 of 12 are shown at first. |
| `Views` | Saves a set of filters and columns. |

There is no toolbar. A row click does nothing.

## Columns

Table: `task_skip_event`. All columns are read only.

| Label | Column | Type | Filter | Shown at first | What it shows |
|---|---|---|---|---|---|
| `When` | `occurred_at` | Date and time | Date | Yes | When the task was given back. Default sort: newest first. |
| `Task` | `task_code` | Text, 20 | Text | Yes | The task code, copied at that time. |
| `Kind` | `skip_kind` | List, text 20 | Set of values | Yes | `Refused` or `HandedBack`. See below. |
| `Reason` | `reason` | Text, 80 | Text | Yes | The reason text the operator gave. Empty for a hand back. |
| `From` | `from_location` | Text, 20 | Text | Yes | The source location of the task. |
| `SKU` | `sku_code` | Text, 50 | Text | Yes | The item of the task. |
| `Operator` | `operator_username` | Text | Text | Yes | The login of the operator who gave the task back. |
| `Operator Name` | `operator_name` | Text | Text | No | The full name. |
| `Status Before` | `status_before` | List | Set of values | Yes | `Assigned` or `InProgress`. |
| `Status After` | `status_after` | List | Set of values | No | Always `Created`. |
| `Task ID` | `task_id` | Whole number | Number | No | The id of the task. |
| `ID` | `id` | Whole number | Number | No | The id of the event. |

`Operator` and `Operator Name` come from the table `operator`. They are empty if the operator row is missing.

### Kind

| Value | Meaning |
|---|---|
| `Refused` | The operator gave the task back with a reason. The task rests for the cooldown (10 minutes by default), and its `Refusals` counter goes up. |
| `HandedBack` | The operator gave it back with no reason. No cooldown. No counter. |

## What is written here, and what is not

The log has exactly one writer: the call that returns a task to the pool at the operator's request.
It writes a line in the same statement that changes the task, so the log cannot miss a return that goes through this door.
Source: `crates/libs/wms-lib-core/src/model/tasks/task.rs:1512-1575` (the only `INSERT INTO task_skip_event` in the code).

These returns are **not** logged here:

| Return | Where to see it instead |
|---|---|
| A supervisor's `Return to Pool` on the [Task Board](10-task-board.md) (`How Returned` = `Seized`) | The `Return Reason` column of the task row, until the next operator takes the task. |
| An expired lease (`Expired`) | The same column. |
| A dissolve of a pick assignment | The same column. |
| A set of tasks handed back together by a holder | Not logged. |

The line stays when the task is deleted. The table has no foreign key to `task` on purpose.
Source: the test `the_trace_outlives_the_task_it_describes` in `crates/libs/wms-tasks/tests/lifecycle.rs:1578-1615`.

No cleanup job for this table was found in the code or the migrations.

> Not confirmed by code: that the lines are kept forever. The search of `crates` for `task_skip_event` found only the insert and the tests. To verify: ask the administrator whether a database job outside the product removes old lines.

## Who can use it

| Role | Open the list |
|---|---|
| `ADMIN`, `MANAGER` | Yes |
| `OPERATOR`, `VIEWER` | Yes (menu and form defaults). The screen has no buttons. |
| `SUPERVISOR` | Not confirmed (see the [overview](00-task-manager-overview.md)) |

## What this screen affects

Nothing. It only reads.

## Related pages

- [Task Board](10-task-board.md): the columns `Refusals`, `Escalated`, `Available From` show what the log led to.
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- API: there is no method for this list. The screen reads the view `task_skip_board` directly.
- RF terminal: a pick operator gives a task back with `Reject Pick` (`PICK11`, method `pick_reject`). It is always logged as `Refused`.
