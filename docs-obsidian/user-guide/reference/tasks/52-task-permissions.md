# Task Permissions

Task Permissions is the bottom part of the [Operator card](51-operator-card.md).
Each row says: this operator may take this type of task in this work area.
**The row is the permission. No row, no right.**
The list is `operator_task_permission_list_form`. The form to add or change a row is `operator_task_permission_normal_form`. The table is `operator_task_permission`.
The list is read by the method `list_operator_task_permission`, filtered by the operator of the card.

## List

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. |
| `Task Type` | `task_type` | Text | Yes | `Pick`, `Putaway`, `Replenish`, `Move`, `Count`. |
| `Work Area` | `work_area_id` | Whole number, shown as the work area code | Yes | The work area. |
| `Pick Execution` | `pick_execution_enabled` | Yes/No | Yes | The rollout switch for new pick work. See below. |

The list has check boxes. Click a row to open it in the form below the list.

### Toolbar of the list

| Button | Needs | What it does |
|---|---|---|
| `New` | Nothing | Opens an empty form for a new row (`generic_new`). The operator is the one on the card. |
| `Delete` | One or more ticked rows | Deletes the ticked rows (`generic_delete_selected`). No question is asked. |
| `Refresh` | Nothing | Reads the list again. |

## Form

Table: `operator_task_permission`. The operator is not a field. The row belongs to the operator on the card and cannot be moved to another one.

| Label | Column | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| `Task Type` | `task_type` | Choice of a list | Yes | `Pick`, `Putaway`, `Replenish`, `Move`, `Count` | The type of task the operator may take. |
| `Work Area` | `work_area_id` | Whole number, chosen from the list of work areas (shows the code) | Yes | An existing work area | Where the operator may take it. |
| `Pick Execution` | `pick_execution_enabled` | Check box | Yes | Default `No` (database default `false`) | Whether the operator is offered new **pick** work in this area. |

Buttons: `Save` (`generic_validate`, then `generic_save`) and `Delete` (`generic_delete`). Both return to the list.

A row is unique for one operator, one task type and one work area (`uq_operator_task_permission`).
A work area that has permission rows cannot be deleted (foreign key `RESTRICT`), and an operator cannot be deleted either.
Source: `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql` (table `operator_task_permission` and its constraints).

> Not confirmed by code: the exact text shown when you save a second row for the same operator, type and area. The database refuses it. To verify: add the same row twice on a test warehouse.

## What the rights do

| Right | Effect |
|---|---|
| A row for the type and area | The operator may be given tasks of that type from the zones of that work area. Without any row, the claim is refused with `you have no right to take {type} tasks in any work area — ask a supervisor`. With rows, but none in the area the terminal named, with `you have no right to take {type} tasks in work area {area} — ask a supervisor`. |
| `Pick Execution` = `Yes` on a `Pick` row | The operator may be given **new** pick work from locations in the zones of that area. |
| `Pick Execution` = `No` on a `Pick` row | New pick work is refused for the operator in that area. Work the operator already holds can be finished. |

The flag has no effect on the other task types. It is read only when pick work is handed out.
Sources: `crates/libs/wms-tasks/src/error.rs` (`NoWorkArea`), `crates/libs/wms-lib-core/src/model/tasks/operator_task_permission.rs:106-140`, `crates/libs/wms-outbound/src/picking/infrastructure/dispatch.rs:205-245`, `039_pick_cutover_hardening.sql`.

Zones belong to a work area. The zone of a location decides which area a task is in (`work_area_zone`).
The equipment profile of the operator then removes the zones and tasks the machine cannot serve. See [Operator card](51-operator-card.md).

## Who can use it

| Role | Read | `New`, `Save`, `Delete` |
|---|---|---|
| `ADMIN`, `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Not confirmed | No by default: `create_`, `update_`, `delete_operator_task_permission` are for `ADMIN` and `MANAGER` |
| `OPERATOR`, `VIEWER` | Yes | No: the method refuses |

## What it affects

- Who is offered which task on the RF terminal.
- Nothing already held: a task that an operator holds is not taken away when the row is deleted.

> Not confirmed by code: that a held task is not taken away. No code path was found that reacts to a deleted permission row. To verify: delete a row while the operator holds a task of that type.

## Related pages

- [Operator card](51-operator-card.md)
- [Setting an operator's rights](67-giving-an-operator-the-right-to-take-tasks.md)
- API: `list_operator_task_permission`, `get_operator_task_permission` (read); `create_operator_task_permission`, `update_operator_task_permission`, `delete_operator_task_permission`, `delete_many_operator_task_permission`
- RF terminal: none. The refusal text above appears on the terminal that asks for work.
