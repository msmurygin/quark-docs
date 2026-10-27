# Working with tasks from the order

The [Tasks tab](13-tasks-tab.md) has three task-management buttons for a supervisor. Each opens a small window.
The same three buttons exist on the task board (menu `Task Manager > Task Board`). The windows and the rules are the same. The grids also have separate paper-pick actions: **Save Picks**, **Pick instructions** and **Place Pallet**. See [Paper picking](../../operator/09-picking.md#c-paper-picking-in-the-web-app).

## Before you start

- You have the API right for the button. By default `ADMIN`, `MANAGER` and `SUPERVISOR` have `task_force_release`, `task_reassign` and `task_delete_many`. `OPERATOR` does not. See [Who can do what](91-who-can-do-what.md).
- The web action is `generic_rpc_command` for `Return to Pool` and `Reassign` (every role has it), and `task_delete_confirm` for `Delete Task` (the supervisor band).

## Return a task to the pool

Use this when a picker is stuck or away. The task keeps its progress and goes back to the pool for anyone to take.

1. Tick **one** task whose status is `Assigned` or `InProgress`. The button is grey otherwise (`Select a task that is Assigned or InProgress`).
2. Click `Return to Pool`. The window `Return Task to Pool` opens. It says: `The task keeps its progress and goes back to the pool for anyone to pick up.`
3. Type the `Reason`. It is required: `Why is this task going back to the pool?`
4. Click `Return to Pool`. Click `Cancel` to leave.

| Result | Message |
|---|---|
| Done | `Task {code} returned to the pool` |
| Not one task ticked | `Select exactly one task` |
| Reason empty | `Say why the task is being returned to the pool` |
| The list moved on | `The task board has moved on — reselect the task and try again` |
| Refused | `Task {code} could not be returned to the pool: {error}` |

The call is `task_force_release` with the task id, the reason, and the version of the task that you ticked.

## Reassign a task

Use this to give a task to another operator. The task keeps its progress.

1. Tick **one** task that can be reassigned: `Assigned`, `InProgress`, or escalated to a supervisor. The button is grey otherwise (`Select a task that is Assigned, InProgress, or escalated to a supervisor`).
2. Click `Reassign`. The window `Reassign Task` opens. It says: `The task keeps its progress. The new operator picks up where it left off.`
3. Pick the `Operator`. It is required.
4. Click `Reassign`.

| Result | Message |
|---|---|
| Done | `Task {code} reassigned` |
| Operator empty | `Choose an operator to reassign the task to` |
| Not one task ticked | `Select exactly one task` |
| Refused | `Task {code} could not be reassigned: {error}` |

The call is `task_reassign` with the task id, the operator, and the version of the task.

## Delete tasks

Use this to remove tasks that nobody has taken. Their picks go back in reserve.

1. Tick one or more tasks. The button is grey until you tick one (`Select at least one task`).
2. Click `Delete Task`. The window `Delete Selected Tasks?` opens. It says: `Every selected task nobody has taken yet is removed, and its pick goes back to reserve. Tasks already taken are skipped and named. An order left with nothing in work goes back to Allocated — press Release on it to dispatch it again.`
3. Click `Delete`.

| Result | Message |
|---|---|
| Done | `Deleted {n} task(s) — their picks are back in reserve` |
| An order lost all its work | `{order numbers} has nothing left in work — press Release to dispatch again` (`have` for several) |
| Some refused | `{k} not deleted: {reason}; {reason}` |
| Nothing deleted | The window stays open with the message. |
| Nothing ticked | `Select at least one task` |
| Refused as a whole | `Tasks could not be deleted: {error}` |

The call is `task_delete_many`. It finds the order of each task itself and has no version. A task that is taken comes back as a named refusal and does not stop the others.
Source: `crates/services/web-ui-server/src/extensions/customization/task/lifecycle_action.rs:44-130`, and the `generic_rpc_command` bindings in `wms-meta-ui` migrations 062 and 063.

After `Delete Task` an order with no task in work reads `Allocated` again, and `Release` is on again for it. See [Releasing an order](35-releasing-an-order.md).

> Not confirmed by code: the status words that `Tasks` shows for a task after the return to pool, and the rules of `task_force_release` and `task_reassign` beyond the grey conditions above. They belong to the task manager. To verify: use the task on the board and read the `Status` and `How Returned` columns.

## Related pages

- [Tasks tab](13-tasks-tab.md)
- [Deleting picks](38-deleting-picks.md)
- API: `task_force_release`, `task_reassign`, `task_delete_many` (commands on a task)
- RF terminal: the picker sees the task in the pick list (see the [Operator guide: Picking](../../operator/09-picking.md)).
