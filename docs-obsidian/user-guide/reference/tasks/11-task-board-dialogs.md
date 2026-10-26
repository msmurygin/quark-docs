# Task Board windows

The three toolbar buttons of the [Task Board](10-task-board.md) each open a small window.
The windows are forms of kind `Modal`, 480 px wide. Their fields are not saved to a table. The window sends them to a command.

## Return Task to Pool (`task_force_release_modal`)

Opened by `Return to Pool`. Data object `task_force_release`.

| Label | Field | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| (text) | `notice` | Notice | n/a | `The task keeps its progress and goes back to the pool for anyone to pick up.` | Explains the action. |
| `Reason` | `reason` | Text | Yes | No default. Hint on the field: `Why is this task going back to the pool?`. The command accepts up to 80 characters after trimming spaces. | Saved as `Return Reason` of the task. |

Buttons: `Cancel` closes the window. `Return to Pool` runs the command `task_force_release`.

The window does not tell you the 80 character limit. A longer text is refused with `skip_reason is too long: {len} chars, max 80`.

> Not confirmed by code: whether the `Reason` box stops typing at 80 characters. To verify: type 90 characters and press `Return to Pool`. The command refusal above is what the code guarantees.

## Reassign Task (`task_reassign_modal`)

Opened by `Reassign`. Data object `task_reassign`.

| Label | Field | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| (text) | `notice` | Notice | n/a | `The task keeps its progress. The new operator picks up where it left off.` | Explains the action. |
| `Operator` | `to` | Whole number (operator id), chosen from a list | Yes | Opens a list of operators with `Username`, `Name`, `Active`. No default. | The new holder. |

The list in the picker comes from the data object `operator_picker` (the table `operator`). It does not hide inactive operators.
Pick an active one. An inactive operator is refused when you press the button.

Buttons: `Cancel` closes the window. `Reassign` runs the command `task_reassign`.

## Delete Selected Tasks? (`task_delete_modal`)

Opened by `Delete Task`. Data object `task_delete`.

| Label | Field | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| (text) | `notice` | Notice | n/a | `Every selected task nobody has taken yet is removed, and its pick goes back to reserve. Tasks already taken are skipped and named. An order left with nothing in work goes back to Allocated — press Release on it to dispatch it again.` | Explains the action. |

The window has no input. It acts on every task that is ticked on the board.

Buttons: `Cancel` closes the window. `Delete` runs the server action `task_delete_confirm`, which calls `task_delete_many`.

## Source

- Fields and buttons: `docs-obsidian/user-guide/reference/_generated/forms/receipt/task_force_release_modal.md`, `task_reassign_modal.md`, `task_delete_modal.md`.
- Command wiring: `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/062_receipt_and_task_use_rpc_command.sql:100-150` (return), `063_task_reassign_uses_rpc_command.sql:25-70` (reassign), `crates/services/web-ui-server/src/extensions/customization/task/lifecycle_action.rs:117-168` (delete).
- The 80 character limit: `crates/libs/wms-tasks/src/service/release.rs:62` and `:331-343`.

## Related pages

- [Returning a task to the pool](60-returning-a-task-to-the-pool.md)
- [Reassigning a task](61-reassigning-a-task.md)
- [Deleting tasks](62-deleting-tasks.md)
- API: `task_force_release`, `task_reassign`, `task_delete_many`
- RF terminal: none. These three actions exist only on the web screen.
