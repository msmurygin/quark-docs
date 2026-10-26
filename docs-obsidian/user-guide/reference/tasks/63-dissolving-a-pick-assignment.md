# Dissolving a pick assignment

Use this to end a cart-picking job that cannot go on: the operator left, the cart broke down, the plan must change.
A dissolve returns the tasks that are not picked yet to the pool and frees the cart. Goods that were already picked stay in their boxes.

## Before you start

- You need the role `ADMIN`, `MANAGER` or `SUPERVISOR`, or a role where an administrator granted `pick_assignment_dissolve_supervised`. See [Who can do what](91-who-can-do-what.md).
- The assignment must be `Building`, `Ready` or `Picking`. A `Delivering` assignment is completed (the cart is taken to its place), not dissolved. `Completed` and `Dissolved` ones are history.

## Steps

1. Open `Task Manager > Pick Assignments`.
2. Tick **one** assignment. `Dissolve` turns on only for `Building`, `Ready` or `Picking`.
3. Click `Dissolve`. The window `Dissolve Pick Assignment` opens.
4. Type the reason in `Reason` (required, 80 characters or fewer).
5. Click `Dissolve` in the window.

## What happens

On success the window closes and the list is read again. The message is `Pick assignment {code} dissolved`.
All of this happens in one transaction:

| Part | Result |
|---|---|
| Picks not yet picked | They leave the assignment. Their tasks go back to the pool: status `Created`, no holder, `How Returned` = `Seized`, `Return Reason` = your reason. `Qty Done` is kept. |
| Picks already picked or shorted | They stay in the history of the assignment. |
| Positions `Open`, and `Bound` positions whose box holds no goods | Become `Released`. Their boxes leave the cart: a reusable handling unit goes back to `Empty`; a disposable planned carton comes off the cart and stays `Planned`. |
| `Bound` and `Closed` positions whose box holds goods | They stay. The box stays on the cart. |
| The assignment | Becomes `Dissolved`. Its version goes up by one. |
| The cart | Goes back to `Empty` if nothing is left on it. |

A cart that still carries goods is delivered later with `pick_assignment_complete` (RF screen `PKA30`).
The command answers with the lists of released tasks, released positions, kept positions, boxes taken off, and whether the cart was freed.
The web screen shows only the one-line message.

Source: `crates/libs/wms-outbound/src/picking/commands/dissolve.rs:1-90,335-430`, `crates/libs/wms-outbound/src/domain/pick_assignment/aggregate.rs` (`plan_dissolve`).

The returned tasks do not write lines in [Skip History](40-skip-history.md).

## If it is refused

The failure message is `Pick assignment {code} was not dissolved: {error}`. The window stays open with the reason you typed. The list is read again, so the next press sends the new version.

| You see (the `{error}` part) | Code | Why |
|---|---|---|
| `the pick assignment changed since you read it: read it again` | `PICK_ASSIGNMENT_VERSION_CONFLICT` (return code 40) | The assignment changed after you read the list. |
| `the pick assignment is no longer live: {code} ({status})` | `PICK_ASSIGNMENT_NOT_LIVE` (70) | It is `Completed` or `Dissolved`. |
| `the pick assignment is being delivered: complete it instead: {code}` | `PICK_ASSIGNMENT_DELIVERING` (70) | Everything is picked. The cart is delivered. |
| `these picks wait for the recovery of a full box — hand them over: {code}, position {n}` | `CARTON_REPLAN_REQUIRED` (70) | A box was reported full and its repair failed. The holder must hand the picks over, or you must retry the repair first. See [Retrying a box-full repair](64-retrying-a-box-full-exception.md). |
| `a task cannot leave its holder: close its serial capture first: task {id} ({reason})` | `PICK_ASSIGNMENT_TASK_HELD` (70) | A serial scan of a member task is abandoned, or open under the SKU rule `Block`. Nothing is dissolved. |
| `the pick assignment changed meanwhile: try again: {code}` | `PICK_ASSIGNMENT_CHANGED` (70) | A pick, a box or the assignment changed while the command ran. |
| `no such pick assignment: {id}` | `PICK_ASSIGNMENT_UNKNOWN` (70) | The row is gone. |
| `reason is required` | n/a | The reason was empty after trimming. |
| `reason is too long: {n} chars, max 80` | n/a | The reason is over 80 characters. |
| `Tick exactly one pick assignment` | n/a | Not one row ticked. |
| `Say why the assignment is dissolved` | n/a | The window `Reason` is empty. |
| `The board has moved on — tick the assignment again and retry` | n/a | The ticked row is not on the list any more. |
| `Tick the assignment again: its version is unknown` | n/a | The version of the ticked row could not be read. |

Sources: `crates/libs/wms-outbound/src/picking/commands/dissolve.rs:208-280` (envelopes), `crates/libs/wms-outbound/src/domain/pick_assignment/aggregate.rs:429-508` (refusals), `crates/libs/wms-lib-core/src/model/narration/mod.rs:2291-2323` (English words), `086_the_supervisor_sees_and_dissolves_pick_assignments.sql:575-595` (messages of the web button).

## What it affects

- The operator's cart job ends. On the terminal the operator no longer has a live assignment.
- The tasks are offered again. A task with `Seized` has no cooldown, so another operator can take it at once.
- A supervisor dissolve works after goods were picked. The holder's own dissolve (`PKA09`) does not: after the first pick it needs a supervisor's confirmation.

## Related pages

- [Pick Assignments](20-pick-assignments-list.md)
- [Pick assignment card](21-pick-assignment-card.md)
- [Pick assignment statuses](90-task-statuses-and-transitions.md#pick-assignment-statuses)
- API: `pick_assignment_dissolve_supervised` (stateful command; sends `assignment_id`, `expected_version`, `reason`). The holder's own method is `pick_assignment_dissolve`.
- RF terminal: `PKA09` "Dissolve" (the holder, `pick_assignment_dissolve`).
