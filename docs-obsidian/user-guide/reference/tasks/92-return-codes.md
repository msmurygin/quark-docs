# Return codes

A refused task command carries a **return code**. The web screens show the message. The RF terminal and the API show the code too.
This page lists the codes that the Task Manager commands use, in plain words, and the named reasons (`context.code`) that come with code 70.

## Codes of the task commands

| Code | Class | Meaning | Where you meet it |
|---|---|---|---|
| 0 | HardFail | A plain refusal with a message. Nothing to retry. | Many. See below. |
| 40 | Retry | The record changed since you read it. The answer carries the current state (`context.current_state`). | [Returning a task](60-returning-a-task-to-the-pool.md), [Reassigning a task](61-reassigning-a-task.md), [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md) |
| 42 | HardFail | The same request key was used for a different request. | API clients. The web screens make a new key for each press. |
| 44 | Retry | The same request is still being processed. Send it again with the same key. | API clients. |
| 70 | HardFail | The status or state of the record does not allow the action. | Every task page. |

The task errors have no code 41 (lock timeout). The comment in `error.rs` says the task SQL uses `SKIP LOCKED` or an atomic compare-and-swap.
For the shared meaning of 40, 42 and 44 see [Return codes](../inbound/92-return-codes.md) in the Inbound section.

## Which refusal has which code

| Refusal | Code |
|---|---|
| Version conflict on a task (`version conflict on task {id} (current version {n})`) | 40 |
| Version conflict on a pick assignment (`PICK_ASSIGNMENT_VERSION_CONFLICT`) | 40 |
| Task in a status that does not fit (`task {id} is in status {status}, this action does not apply`) | 70 |
| Task source owns the action (`... is source-owned for ... use the source capability command`) | 70 |
| The source refuses to let the task change hands (`task {id} cannot change hands: {code}`) | 70 |
| The operator already has an open task (`operator already has ... task ...`) | 70 |
| A set of tasks cannot be claimed or released (`the task set cannot be ...`) | 70 |
| A refusal to dissolve (`PICK_ASSIGNMENT_NOT_LIVE`, `..._DELIVERING`, `..._TASK_HELD`, `..._CHANGED`, `..._UNKNOWN`, `CARTON_REPLAN_REQUIRED`) | 70 |
| A refusal of a box-full command (`CARTON_EXCEPTION_NOT_RECOVERING` and others) | 70 |
| `operator {id} is not an active assignee` | 0 |
| `{field} is required`, `{field} is too long: ...` | 0 |
| `task {id} not found` | 0 |
| `you have no right to take {type} tasks ...` | 0 |
| `returning a task is not allowed in ...` | 0 |
| `task {id} is not assigned to you` | 0 |

## Named reasons that come with code 70 on these screens

| `context.code` | Meaning | Where you meet it |
|---|---|---|
| `PICK_ASSIGNMENT_LIVE` | The pick is in a live pick assignment. Its dissolve is the way to free it. | `Return to Pool`, `Reassign` |
| `SERIAL_EPISODE_OPEN` | An open serial scan holds the task and the SKU rule is `Block`. | `Return to Pool`, `Reassign` |
| `SERIAL_EPISODE_ABANDONED` | An abandoned serial scan holds the task, whatever the SKU rule. A supervisor must close the scan first. | `Return to Pool`, `Reassign`, `Dissolve` |
| `COUNT_SAME_COUNTER` | The count asks for a recount by another counter and the chosen operator did the first count. | `Reassign` of a `Count` task |
| `PICK_ASSIGNMENT_UNKNOWN`, `PICK_ASSIGNMENT_NOT_LIVE`, `PICK_ASSIGNMENT_DELIVERING`, `PICK_ASSIGNMENT_TASK_HELD`, `PICK_ASSIGNMENT_CHANGED` | See the table on [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md#if-it-is-refused). | `Dissolve` |
| `PICK_ASSIGNMENT_NOT_YOURS` | Only for the holder's own dissolve on the terminal. | RF only |
| `SUPERVISOR_CONFIRMATION_REQUIRED` | The holder tries to dissolve after the first pick. This is the one **overridable** code: a supervisor confirms on the terminal. | RF only (`PKA09`) |
| `OVERRIDE_GRANT_REFUSED`, `OVERRIDE_GRANT_NOT_FOR_THIS_ASSIGNMENT` | The supervisor's permission cannot be used. | RF only |
| `CARTON_REPLAN_REQUIRED` | A position waits for carton recovery. | `Dissolve` |
| `CARTON_EXCEPTION_NOT_RECOVERING` | The box-full exception does not wait for recovery. | `Retry` |
| `IN_PICK_ASSIGNMENT` | A single-task pick door was used for a task that is in a live pick assignment. | RF only |

## Related pages

- [Messages catalogue](93-messages-catalogue.md)
- [Who can do what](91-who-can-do-what.md)
- API: the error table of each method in the Tasks and Outbound API reference
