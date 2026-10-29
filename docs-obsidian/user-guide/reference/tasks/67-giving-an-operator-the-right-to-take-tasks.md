# Setting an operator's rights

Use this to let an operator take a type of task in a work area, to change that right, or to take it away.
It is also how you switch on new pick work for an operator in an area.

## Before you start

- You need the role `ADMIN` or `MANAGER`. See [Who can do what](91-who-can-do-what.md).
- The operator must be in the list. Run [Syncing operators](65-syncing-operators.md) if not.
- The work area must exist, and it must have zones. The zones decide which locations belong to it.

## Add a right

1. Open `Warehouse Configuration > Operator Permissions > Operators` and click the operator.
2. In the bottom list `Task Permissions` click `New`.
3. In `Task Type` choose the type.
4. In `Work Area` open the picker and choose the area.
5. For a `Pick` right, tick `Pick Execution` if the operator should be offered new pick work. Leave it clear to keep the operator out of new pick work in that area.
6. Click `Save`. The form returns to the list.

## Change a right

1. Click the row in the list. The form opens.
2. Change `Task Type`, `Work Area` or `Pick Execution`. None can be emptied. The operator cannot be changed.
3. Click `Save`.

## Take a right away

- One row: click the row, then `Delete` in the form.
- Many rows: tick them in the list and click `Delete`. No question is asked.

## What happens

The row is written, changed or deleted. The next request for work from the terminal sees the new state.
A second row for the same operator, type and area is refused by the database.
Tasks the operator already holds are not changed.

## If it is refused

| You see | Why |
|---|---|
| `Forbidden` for the method | Your role has no right to `create_`, `update_` or `delete_operator_task_permission`. |
| A message about a missing value | `Task Type` or `Work Area` is empty. The form needs both. |
| A duplicate message | The same operator, type and area exist already. |

> Not confirmed by code: the exact text of these refusals on the screen. To verify: try each on a test warehouse.

## What it affects

- What the operator is offered on the RF terminal. See [Task Permissions](52-task-permissions.md#what-the-rights-do).

## Related pages

- [Task Permissions](52-task-permissions.md)
- [Operator card](51-operator-card.md)
- API: `create_operator_task_permission`, `update_operator_task_permission`, `delete_operator_task_permission`, `delete_many_operator_task_permission`
- RF terminal: none.
