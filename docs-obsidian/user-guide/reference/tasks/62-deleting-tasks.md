# Deleting tasks

Use this to remove tasks that nobody has taken yet. The picks behind the tasks go back into reserve. The stock stays reserved.
This removes the **work**, not the reservation. To remove the reservation too, use the order screen (`Unallocate` or delete the pick).

## Before you start

- You need the role `ADMIN`, `MANAGER`, or a role where an administrator granted both the web action `task_delete_confirm` and the method `task_delete_many`. See [Who can do what](91-who-can-do-what.md).
- Only a **pick** task can be deleted here. A task of another type (putaway, replenish, move, count) is refused.
- Only a task with status `Created` is removed. Any other status counts as "in work".

## Steps

1. Open `Management & Control > Execution Control > Task Board`.
2. Tick the check box of every task you want to delete. You can tick many.
3. Click `Delete Task`. The window `Delete Selected Tasks?` opens.
4. Read the text. Click `Delete`.

## What happens

The system takes each ticked task alone, in one pass, and runs the delete command for it.
A task that is refused does not stop the others.

| Result | Message in the toast |
|---|---|
| Some were deleted | `Deleted {n} task(s) — their picks are back in reserve` |
| An order has no more tasks in work after the delete | `{order numbers} has nothing left in work — press Release to dispatch again` (or `have`) |
| Some were refused | `{n} not deleted: {reason}; {reason}` |

The three parts are joined with `. `.
When at least one task was deleted, the window closes, the ticks are cleared and the grid is read again.
When nothing was deleted, the window stays open with the refusals in the message.

For each deleted task:

- The pick goes from `Released` back to `Allocated`.
- The reservation on the balance and the allocated quantity on the order line do not change.
- If it was the last task of an order, the launch mark of the order is cleared. The order goes back to `Allocated`. Press `Release` on the order to dispatch again.
- If the order has other tasks in work, it stays released. Press `Allocate` on the order to give the pick a new task.

Source: `crates/libs/wms-outbound/src/service/status_manager/delete_task.rs:1-50,100-190` and `crates/services/web-ui-server/src/extensions/customization/task/lifecycle_action.rs:48-100`.

## If a task is refused

The reason of each refused task is the text of its refusal. These are the ones you can meet:

| Reason | Why |
|---|---|
| `task {id} is {status} — удалить можно только задачу, которую ещё никто не взял` | The task is not `Created`. Somebody took it. |
| `task {id} is a {type} task over '{source}' — it holds no reservation in an order` | The task is not a pick task. |
| `task {id} is a {type} task over '{source}' — it belongs to no order` | Same, found while looking for the order. |
| `task {id} belongs to order {a}, not order {b}` | The link from the task to its order does not match. |
| `pick_detail {id} points at task {x}, not {y} — the link has already diverged` | The pick and the task no longer point at each other. |
| `pick_detail {id} is {status}, not Released — нечего возвращать в резерв` | The pick is not in the state `Released`. |
| `{entity} id={id} not found` | Somebody deleted it first. The `{entity}` is the name of the missing row (`task`, `pick_detail`). |

Some of these texts contain Russian words. That is how they are written in the code (see findings file `docs-obsidian/plans/reference-findings-tasks.md`).

If the whole call fails, the toast reads `Tasks could not be deleted: {message}`.
With no row ticked the toast reads `Select at least one task`.
If a ticked key is not a number the toast reads `The task board has moved on — reselect the tasks and try again`.

## What it affects

- The order status can change: `Released` or `PartiallyReleased` can fall back to `Allocated`. The order screen shows the new status.
- The deleted task id is gone. [Skip History](40-skip-history.md) keeps its lines. They have no link to the task row.
- The removed task is announced to subscribers as the event `bio.task.after_delete`. Source: comment in `task.rs:1736-1760`.

> Not confirmed by code: which refusal a `Created` and escalated task gets. The status test is `status != Created`, so it should be deleted. To verify: escalate a task (refuse it 3 times on a test warehouse) and delete it.

## Related pages

- [Task Board](10-task-board.md) and [its windows](11-task-board-dialogs.md)
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- API: `task_delete_many` (stateless command; sends `task_ids`). The one-task method is `task_delete` (sends `order_id`, `task_id`).
- RF terminal: none.
