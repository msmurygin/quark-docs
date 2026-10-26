# Task statuses and transitions

This page lists the statuses of a task and of a pick assignment, and what moves them.
The rules live in `crates/libs/wms-tasks/src/domain/task/aggregate.rs`, `crates/libs/wms-tasks/src/service/` and `crates/libs/wms-outbound/src/picking/`.

## Task statuses

| Status | Meaning |
|---|---|
| `Created` | In the pool. Nobody holds it. Operators take their next task from here. |
| `Assigned` | Taken by an operator (or given by a supervisor). Not started. |
| `InProgress` | The holder reported the first progress. |
| `Completed` | Finished with the full quantity. Final. |
| `Shorted` | Finished with less than the planned quantity. Final. |
| `Cancelled` | Declared, but **nothing writes it**. A task whose pick is removed is deleted instead (owner ruling, 2026-09-04). You will not see this status. |

Source: `crates/libs/wms-lib-core/src/model/tasks/task.rs:36-56`.

## Transitions

| From | Action | To | Page |
|---|---|---|---|
| `Created` | The operator takes it on the RF terminal | `Assigned` | |
| `Created` and escalated | `Reassign` on the Task Board | `Assigned` to the chosen operator. The refusal counter is reset. | [Reassigning a task](61-reassigning-a-task.md) |
| `Assigned` | First progress is reported | `InProgress` | |
| `Assigned`, `InProgress` | The source finishes it (pick commit or short, count result) | `Completed` if the quantity done reaches the plan, else `Shorted` | |
| `Assigned`, `InProgress` | The operator refuses (reason) or hands back (no reason) | `Created` | [Skip History](40-skip-history.md) |
| `Assigned`, `InProgress` | `Return to Pool` | `Created`, `How Returned` = `Seized` | [Returning a task to the pool](60-returning-a-task-to-the-pool.md) |
| `Assigned`, `InProgress` | The lease runs out | `Created`, `How Returned` = `Expired` | |
| `Assigned`, `InProgress` | A supervisor dissolves its pick assignment | `Created`, `How Returned` = `Seized` | [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md) |
| `Assigned`, `InProgress` | `Reassign` | The same status, a new holder | [Reassigning a task](61-reassigning-a-task.md) |
| `Created` | `Delete Task` | The row is deleted | [Deleting tasks](62-deleting-tasks.md) |
| `Completed`, `Shorted` | Nothing | Nothing | |

Sources: `aggregate.rs:60-200` (start, finish), `release.rs:93-180` (refuse, hand back), `release.rs:224-400` (reassign, return), `task.rs:1886-1923` (lease), `dissolve.rs` (dissolve).

When a task goes back to the pool, `Qty Done` stays and `Version` goes up by one.
The holder, the claim time, the start time and the lease are cleared.

## How a task was returned

The column `How Returned` on the [Task Board](10-task-board.md) holds one of four values. It is cleared when the task is taken again.

| Value | Door | Reason text | Cooldown | Refusal counter | Logged in Skip History |
|---|---|---|---|---|---|
| `Refused` | The operator gives it back with a reason | The operator's text | Yes | Plus 1 | Yes |
| `HandedBack` | The operator gives it back with no reason | None | No | No change | Yes |
| `Seized` | A supervisor: `Return to Pool` or `Dissolve` | The supervisor's text | No | No change | No |
| `Expired` | The lease ran out | `auto-release (lease expired)` | No | No change | No |

Source: `task.rs:1512-1575` (refused, handed back), `task.rs:1685-1708` (seized), `task.rs:1904-1923` (expired), `task.rs:854-885` (set release by dissolve), constraint `ck_task_return_kind` in `001_baseline.sql`.

## Numbers that decide what you see

These are system settings. The values below are the defaults of a new database. An administrator can change them on the system settings screen.

| Setting | Default | What it does |
|---|---|---|
| `TASK_LEASE_TTL_MIN` | 15 | Minutes an operator may keep a task without a sign of life. Then the lease reaper returns it. |
| `TASK_SKIP_COOLDOWN_MIN` | 10 | Minutes after a refusal during which nobody is offered the task. |
| `TASK_SKIP_ESCALATE_AFTER` | 3 | Number of refusals after which the task is escalated: it leaves the pool and waits for a supervisor. |
| `TASK_MAX_CONCURRENT_DEFAULT` | 1 | Tasks one operator may hold at once when the terminal names no work area. |
| `TASK_ALLOW_RELEASE_DEFAULT` | 1 | Whether an operator may refuse or hand back a task when the terminal names no work area. `0` forbids it. |

Source: `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql` (table `system_settings`, ids 1014 to 1018) and `crates/libs/wms-tasks/src/service/claim.rs:189-261`.
A setting of zero or less for the lease, the cooldown or the escalation limit is ignored and the built-in default is used.

A work area can also forbid returns (`allow_task_release` = off). Then both a refusal and a hand back are refused with `returning a task is not allowed in work area {area} — ask a supervisor to move it`.
The supervisor's way out is `Return to Pool` or `Reassign`. Source: `crates/libs/wms-tasks/src/error.rs` (`ReleaseNotAllowed`).

## Pick assignment statuses

| Status | Meaning |
|---|---|
| `Building` | Positions are being bound to physical boxes. |
| `Ready` | Every position is bound. The route may start. |
| `Picking` | The operator picks along the route. |
| `Delivering` | Everything is picked. The cart goes to its delivery place. |
| `Completed` | Delivered. Final. |
| `Dissolved` | Ended without delivery. Final. |

`Building`, `Ready`, `Picking` and `Delivering` are **live**: they hold an operator, a cart, cartons and picks.
Source: `crates/libs/wms-lib-core/src/model/outbound/pick_assignment.rs:27-47`.

| From | Action | To |
|---|---|---|
| `Building`, `Ready`, `Picking` | `Dissolve` on the Pick Assignments list | `Dissolved` |
| `Building`, `Ready`, `Picking` | The holder dissolves it on the terminal (`PKA09`). After the first pick this needs a supervisor's confirmation. | `Dissolved` |
| `Building`, `Ready`, `Picking` | The lease sweeper, when the assignment's lease ran out or it has no live member | `Dissolved` |
| `Delivering` | `Dissolve` | Refused with `PICK_ASSIGNMENT_DELIVERING` |
| `Delivering` | The holder delivers the cart (`PKA30`) | `Completed` |
| `Completed`, `Dissolved` | Nothing | Nothing. `Dissolve` is refused with `PICK_ASSIGNMENT_NOT_LIVE`. |

Source: `crates/libs/wms-outbound/src/picking/commands/dissolve.rs:1-90`, `crates/libs/wms-outbound/src/domain/pick_assignment/aggregate.rs:538-581`.

How the other statuses change (`crates/libs/wms-lib-core/src/model/outbound/pick_assignment.rs`):

- `Building` becomes `Ready` in the same statement that binds the last `Open` position: no position is `Open` any more (`PickAssignmentBmc::record_position_change`, ruling R7).
- After every route command (commit, short, skip, reject inside the assignment), the assignment becomes `Delivering` when no live member pick is `Released` any more. Otherwise a `Ready` assignment becomes `Picking`; a `Picking` one stays (`PickAssignmentBmc::record_route_change`, ruling R3). So a route whose last pick is committed or shorted goes straight to `Delivering`, also from `Ready`.

Position statuses are on [Pick assignment card](21-pick-assignment-card.md#positions). Exception statuses are on [Pick Target Exceptions](30-pick-target-exceptions.md#status).

## Related pages

- [Task Board](10-task-board.md)
- [Pick Assignments](20-pick-assignments-list.md)
- [Return codes](92-return-codes.md)
- API: `task_force_release`, `task_reassign`, `task_delete_many`, `pick_assignment_dissolve_supervised`
