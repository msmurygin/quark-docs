# Task control screens

The task-control screens are split between three groups. `Management & Control > Execution Control` holds the task board and pick assignments. `Management & Control > Exceptions` holds operational exceptions and skip history. `Warehouse Configuration > Operator Permissions` holds the operator list.

A **task** is one unit of work handed to one operator: pick this, put this away, move this, count this location.
The system makes tasks. People do not type them in.
The operators take tasks on the RF terminal. This group is where a supervisor looks at them and steps in.

## How to open it

1. Sign in and select a warehouse.
2. Open the sidebar path shown in the table below.
3. Click the required screen.

| Sidebar path | Page |
|---|---|
| `Management & Control > Execution Control > Task Board` | [Task Board](10-task-board.md) |
| `Management & Control > Execution Control > Pick Assignments` | [Pick Assignments](20-pick-assignments-list.md) |
| `Management & Control > Exceptions > Pick Target Exceptions` | [Pick Target Exceptions](30-pick-target-exceptions.md) |
| `Management & Control > Exceptions > Skip History` | [Skip History](40-skip-history.md) |
| `Warehouse Configuration > Operator Permissions > Operators` | [Operators](50-operators-list.md) |

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

The menu items and their buttons follow the permissions assigned to your role. If a screen is missing, ask an administrator to check your menu and action permissions. The full table is on [Who can do what](91-who-can-do-what.md).

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
