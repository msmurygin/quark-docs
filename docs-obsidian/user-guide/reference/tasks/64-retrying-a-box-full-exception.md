# Retrying a box-full repair

Use this when an exception is in the status `RecoveryRequired`. The repair of a full box failed.
First fix what made it fail (the data of the pack card, the cartonization policy). Then press `Retry`.
If nothing was fixed, the retry gives the same answer.

## Before you start

- You need the role `ADMIN`, `MANAGER` or `SUPERVISOR`, or a role where an administrator granted `cartonization_exception_retry`. See [Who can do what](91-who-can-do-what.md).
- The row must have `Target Kind` = `PlannedCarton` and `Status` = `RecoveryRequired`. Read `Error` first: it tells you what to fix. The codes are on [Pick Target Exceptions](30-pick-target-exceptions.md#error).

## Steps

1. Open `Management & Control > Exceptions > Pick Target Exceptions`.
2. Tick **one** exception. `Retry` turns on only for a `PlannedCarton` row in `RecoveryRequired`.
3. Click `Retry`. There is no window. The command runs at once.

## What happens

1. Picks of the exception that are still on a cart are handed over first. They leave the cart. Their tasks go back to the pool with `How Returned` = `Seized`.
2. The same exception is repaired again over the same picks.
3. The outcome decides the status:

| Outcome | New status | What you see |
|---|---|---|
| The repair works | `Resolved` | `Resulting Plan` is filled. The picks are planned into new whole cartons. They wait for the next `pick_assignment_start`. |
| The repair fails again | `RecoveryRequired` | `Error` holds the new code. |
| None of the picks is a live reservation any more | `Cancelled` | `Error` = `CARTON_REPLAN_NOTHING_LEFT`. Final. |

The toast is `Exception {id}: {status}`, for example `Exception 12: Resolved`. It reads the same when the repair failed again, so look at the `Status` column after the grid is read again.
Pressing `Retry` on an exception that is already `Resolved` or `Cancelled` writes nothing and answers its result.

Source: `crates/libs/wms-outbound/src/picking/commands/retry_carton_exception.rs:1-60`, `crates/libs/wms-outbound/src/picking/target/recovery.rs:192-300`, `crates/libs/wms-outbound/src/domain/target_exception/aggregate.rs:62-99`.

## If it is refused

The failure message is `Exception {id} was not retried: {error}`. The list is read again.

| You see (the `{error}` part) | Code | Why |
|---|---|---|
| `this box-full exception does not wait for recovery: {id} ({status})` | `CARTON_EXCEPTION_NOT_RECOVERING` | The exception is a `Bypassed` one, or its status is `Reported`. The command retries `RecoveryRequired` and `Resolving`, and answers a finished one. The button is grey for all but `RecoveryRequired`. |
| `Tick exactly one exception` | n/a | Not one row ticked. |
| `The list has moved on — tick the exception again and retry` | n/a | The ticked row is not in the list any more. |
| `the pick assignment changed meanwhile: try again: {code}` | `PICK_ASSIGNMENT_CHANGED` | The cart membership changed while the command ran. |

Other refusals can come from the locks and the planner. They arrive as plain messages of the command.
Sources: `aggregate.rs:30-35` (not recovering), `refusal_wording.rs:243-273`, `crates/libs/wms-lib-core/src/model/narration/mod.rs:2291-2292`, `101_carton_execution_exceptions.sql` part 5 (messages of the web button).

> Not confirmed by code: the wording of a retry that fails on a locked row or on the planner budget. To verify: retry an exception while another user runs a command on the same order.

## What it affects

- Tasks of the exception's picks may return to the pool. Operators see them again.
- A new cartonization plan can replace the old one for the unpicked rest of the order.
- The picker's own way out is the hand-over on the RF terminal (`PKA52`). It does the same first step without a repair.

## Related pages

- [Pick Target Exceptions](30-pick-target-exceptions.md)
- [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md): refused while a position waits for recovery.
- Administrator guide: [Cartonization overview](../../admin/policies/30-cartonization-overview.md)
- API: `cartonization_exception_retry` (stateless command; sends `exception_id`; no version)
- RF terminal: `PKA52` "Recovery" (`pick_assignment_position_hand_over`)
