# Task Manager

`Task Manager` is the group in the left sidebar where a supervisor watches the work that operators do on the floor and fixes it when it gets stuck.
It has five screens. Every screen is a list.

A **task** is one unit of work handed to one operator: pick this, put this away, move this, count this location.
The system makes tasks. People do not type them in.
The operators take tasks on the RF terminal. This group is where a supervisor looks at them and steps in.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Task Manager`.
3. Click one of the five items.

The group is the menu item `task_manager_group`. The items and their forms are:

| Sidebar item | Menu item | Opens | Page |
|---|---|---|---|
| `Task Board` | `task_board_menu` | `task_board_list_form` | [Task Board](10-task-board.md) |
| `Pick Assignments` | `pick_assignment_board_menu` | `pick_assignment_board_list_form` | [Pick Assignments](20-pick-assignments-list.md) |
| `Pick Target Exceptions` | `pick_target_exception_menu` | `pick_target_exception_list_form` | [Pick Target Exceptions](30-pick-target-exceptions.md) |
| `Skip History` | `task_skip_board_menu` | `task_skip_board_list_form` | [Skip History](40-skip-history.md) |
| `Operators` | `operator_menu` | `operator_list_form` | [Operators](50-operators-list.md) |

Source: `docs-obsidian/user-guide/reference/_generated/menu-tree.md` and the menu rows in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql` (menu items 9110 to 9114).

## What each screen is for

| Screen | The question it answers | What you can do there |
|---|---|---|
| `Task Board` | Which tasks exist, who holds them, which are stuck? | Return a task to the pool, reassign it, delete tasks nobody has taken. |
| `Pick Assignments` | Which carts (carriers) are being picked, by whom, how far along? | Open one to see its positions. Dissolve a live one. |
| `Pick Target Exceptions` | Which boxes were reported full, and did the repair work? | Retry a repair that failed. |
| `Skip History` | Who refused or handed back which task, and why? | Read only. |
| `Operators` | Who can work in this warehouse, on what machine, with which rights? | Sync the list, set the machine, give or take away the right to take a type of task in a work area. |

## Ideas you need first

| Word | Meaning |
|---|---|
| Pool | The tasks with status `Created` that nobody holds. Operators take their next task from the pool. |
| Claim | An operator takes a task from the pool on the RF terminal. The task becomes `Assigned` to that operator. |
| Lease | The time an operator may keep a claimed task without a sign of life. A new claim sets it to 15 minutes by default. When it runs out, the system returns the task to the pool. |
| Refuse | The operator gives a task back and says why. The task rests for a while (the cooldown) and a counter goes up. |
| Hand back | The operator gives a task back with no reason. No cooldown and no counter. |
| Escalated | A task refused too many times. It leaves the pool and waits for a supervisor. |
| Pick assignment | A cart-picking job. One operator, one carrier (a cart), several boxes (positions), many picks. |

Statuses and the exact numbers (15 minutes, 10 minutes, 3 refusals) are on [Task statuses and transitions](90-task-statuses-and-transitions.md).

## Who can use it

The menu items are visible to the roles that hold the `menu_item` right.
A new database gives this right to `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`. Source: `crates/libs/wms-lib-auth/src/authorization/reconciler.rs:115-117`.
The buttons need more rights. The full table is on [Who can do what](91-who-can-do-what.md).

> Not confirmed by code: whether `SUPERVISOR` can open this group on a new database. The default menu grant in the code is only for `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`. No other default was found in the code or in the migrations. To verify: sign in as a `SUPERVISOR` user on a test warehouse and look at the sidebar. If the group is missing, grant the menu items in `Users & Roles > Permission Matrix`.

## What this group affects

- `Return to Pool`, `Reassign` and `Delete Task` change what operators see on their terminals.
- `Delete Task` removes the task and puts its pick back into reserve. See [Deleting tasks](62-deleting-tasks.md).
- `Dissolve` ends a pick assignment and sends its tasks back to the pool. See [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md).
- The `Operators` screen decides who can be given work. See [Task Permissions](52-task-permissions.md).

## Related pages

- [Task Board](10-task-board.md)
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- [Who can do what](91-who-can-do-what.md)
- API: `list_task`, `get_task`, `count_task` (read), `task_force_release`, `task_reassign`, `task_delete_many` (commands)
- RF terminal: menu `Picking`, screen `PICK01` "Get Pick Work" (method `pick_dispatch_next`).
