# Returning a task to the pool

Use this when a task sits with an operator who is not doing it. The operator left, forgot it, or went on leave with the task still open.
You take the task away and it goes back to the pool for anyone to pick up at once.

## Before you start

- You need the role `ADMIN`, `MANAGER` or `SUPERVISOR`, or a role where an administrator granted the method `task_force_release`. See [Who can do what](91-who-can-do-what.md).
- The task must be `Assigned` or `InProgress`.
- The task must not be in a live pick assignment. Dissolve the assignment instead. See [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md).

## Steps

1. Open `Management & Control > Execution Control > Task Board`.
2. Find the task. Use the filters, for example `Assignee` or `Status`.
3. Tick the check box of **one** task. `Return to Pool` turns on only for `Assigned` or `InProgress`.
4. Click `Return to Pool`. The window `Return Task to Pool` opens.
5. Type the reason in `Reason`. Do not leave it empty. Use 80 characters or fewer.
6. Click `Return to Pool` in the window.

## What happens

On success the window closes and the grid is read again. The message is `Task {code} returned to the pool`.
The task row now shows:

| Column | Value |
|---|---|
| `Status` | `Created` |
| `Assignee`, `Claimed`, `Started`, `Lease Expires` | Empty |
| `Return Reason` | The text you typed |
| `How Returned` | `Seized` |
| `Qty Done` | Unchanged. The work done stays done. |
| `Refusals`, `Escalated` | Unchanged |
| `Available From` | Empty. A supervisor's return starts no cooldown. The task can be taken at once. |
| `Version` | Up by one |

The command writes your user as the one who changed the row. It writes no line in the audit log, and the reason text is erased when the next operator takes the task.

The return does not write a line in [Skip History](40-skip-history.md). That list shows only operator refusals and hand backs.

## If it is refused

The failure message is `Task {code} could not be returned to the pool: {error}`.
The window stays open. The grid is not changed.

| You see (the `{error}` part) | Why | What to do |
|---|---|---|
| `version conflict on task {id} (current version {n})` | The task changed after you read the board. Return code 40. | Close the window, press the grid refresh, tick the task again and retry. |
| `task {id} is in status {status}, this action does not apply` | The task is not `Assigned` or `InProgress` any more. Return code 70. | Read the board again. |
| `task {id} cannot change hands: PICK_ASSIGNMENT_LIVE` | The pick is in a live pick assignment. Return code 70. | Dissolve the pick assignment. |
| `task {id} cannot change hands: SERIAL_EPISODE_OPEN` | The operator has a serial scan open and the SKU rule is `Block`. Return code 70. | Wait until the scan is finished, or change the SKU rule. |
| `task {id} cannot change hands: SERIAL_EPISODE_ABANDONED` | An abandoned serial scan holds the task. Return code 70. | A supervisor must close the scan first. |
| `skip_reason is too long: {n} chars, max 80` | The reason is over 80 characters. | Shorten it. |
| `task {id} not found` | Another user deleted it. | Read the board again. |
| `Select exactly one task` | Not one row ticked. | Tick one row. |
| `Say why the task is being returned to the pool` | The reason is empty. | Type a reason. |
| `The task board has moved on — reselect the task and try again` | The ticked row is not on the board any more, or its version is not known. | Refresh and tick again. |

## What it affects

- The old holder's terminal no longer has the task. A later report from the old holder is refused.
- The task is offered again to operators who have the right and the equipment for it.
- For a `Count` task, the count rules never refuse a return to the pool. Only a reassign can be refused by them.

## Related pages

- [Task Board](10-task-board.md) and [its windows](11-task-board-dialogs.md)
- [Task statuses and transitions](90-task-statuses-and-transitions.md)
- [Return codes](92-return-codes.md)
- API: `task_force_release` (stateful command; sends `expected_task_version` and `reason`)
- RF terminal: the operator's own way to give a task back is `Reject Pick` (`PICK11`, method `pick_reject`).
