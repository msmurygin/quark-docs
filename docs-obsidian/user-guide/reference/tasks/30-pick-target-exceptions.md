# Pick Target Exceptions

A **pick target exception** is the record of a box that was reported full while picking.
The operator presses `Box Full` on the RF terminal. The system closes the position, keeps the full box on the cart, and plans the rest of the goods into new cartons.
If that repair fails, the exception waits for a supervisor. This list is where the supervisor sees it and retries.
The form is `pick_target_exception_list_form`. The data object is `pick_target_exception_board`. It is read by the method `cartonization_exception_list`, newest first.

## How to open it

1. In the left sidebar open `Management & Control`, then `Exceptions`.
2. Click `Pick Target Exceptions`.

The menu item is `pick_target_exception_menu`.

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Two buttons: `Retry`, `Refresh`. |
| Grid | One row per exception, 50 rows per page. A check box at the start of each row ticks it. |
| `Columns` | Shows or hides columns. 16 of 19 are shown at first. |

The columns have no filter and no sort control in the metadata. A row click does nothing.

## Columns

Table: `pick_target_execution_exception`. All columns are read only.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. |
| `Status` | `status` | Text | Yes | `Reported`, `Resolving`, `Resolved`, `RecoveryRequired`, `Cancelled`. See below. |
| `Target Kind` | `target_kind` | Text | Yes | `PlannedCarton` (a box of the cartonization plan) or `Bypassed` (picks with no planned carton). |
| `Order` | `order_number` | Text | Yes | The sales order. |
| `Pick Assignment` | `assignment_code` | Text | Yes | The pick assignment. |
| `Position` | `position_no` | Whole number | Yes | The position of the full box. |
| `Planned Carton` | `source_carton_code` | Text | Yes | The planned carton of the full box (`PlannedCarton` only). |
| `Box` | `box_code` | Text | Yes | The box that was reported full. |
| `Reason` | `reason_code` | Text | Yes | Why the operator said it is full. See below. |
| `Comment` | `comment` | Text | Yes | The operator's comment. Required when the reason is `OTHER`. |
| `Picks` | `picks` | Whole number | Yes | How many picks the repair replans. |
| `Error` | `error_code` | Text, 60 | Yes | Why the repair failed, or why nothing was repaired. Empty when it worked. |
| `Error Detail` | `error_detail` | Text | Yes | More words about the error. |
| `Handed Over At` | `handed_over_at` | Date and time | Yes | When the holder handed the picks over to recovery. Empty if not. |
| `Reported By` | `reported_by_name` | Text | Yes | The operator who pressed `Box Full`. |
| `Reported At` | `reported_at` | Date and time | Yes | When. |
| `Resolved At` | `resolved_at` | Date and time | Yes | When it was resolved or cancelled. |
| `Resulting Plan` | `resulting_plan_id` | Whole number | No | The new cartonization plan made by a repair (`PlannedCarton`). |
| `Continuation` | `continuation_id` | Whole number | No | The continuation made for a `Bypassed` exception. |

### Status

| Value | Meaning |
|---|---|
| `Reported` | Declared for a two-step variant. Nothing writes it today. |
| `Resolving` | The close is repairing it right now. |
| `Resolved` | Repaired. A `PlannedCarton` exception got a new plan. A `Bypassed` one got a continuation. |
| `RecoveryRequired` | The repair failed. `Error` says why. A supervisor retries. |
| `Cancelled` | Final. None of its picks is a live reservation any more (deleted, shorted or picked). |

Source: `crates/libs/wms-lib-core/src/model/outbound/pick_target_execution_exception.rs:27-64`.
An exception that is not finished (`Reported`, `Resolving`, `RecoveryRequired`) is unique per position.
Source: index `uq_ptee_open_per_position` in `059_carton_execution_exceptions_and_a_planned_tare_type.sql`.

### Reason

The operator types the reason on the RF screen `PKA50` "Box Full" (the field is upper-cased, up to 50 characters). The values are:
`MASTER_DATA_DIMENSIONS`, `PROTECTIVE_PACKAGING`, `ORIENTATION_NOT_FEASIBLE`, `PRODUCT_OR_CARTON_DEFORMED`, `SOLVER_LAYOUT_NOT_FEASIBLE`, `OTHER`.
`OTHER` needs a comment. The database refuses a blank comment for it (`chk_ptee_other_needs_comment`).

### Error

| Code | Meaning |
|---|---|
| `CARTON_REPLAN_UNPLACED` | A unit could not be placed in the repair. |
| `SOLVER_BUDGET_EXCEEDED` | The time budget of the packing solver ran out. |
| `CARTON_REPLAN_NOT_REPAIRABLE` | The plan cannot be repaired. |
| `CARTON_REPLAN_INVALID` | The validator refused the repair. |
| `CARTON_REPLAN_NOTHING_LEFT` | No pick of the exception is a live reservation any more. The exception becomes `Cancelled`. |

Source: `crates/libs/wms-outbound/src/cartonization/repair.rs:43-50` and `crates/libs/wms-outbound/src/domain/target_exception/aggregate.rs:81-83`.
While an exception waits (`RecoveryRequired`), the route and the delivery of the assignment refuse its picks with `CARTON_REPLAN_REQUIRED`.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `Retry` | Exactly one ticked exception with `Target Kind` = `PlannedCarton` and `Status` = `RecoveryRequired` | Repairs it again. | [Retrying a box-full repair](64-retrying-a-box-full-exception.md) |
| `Refresh` | Nothing | Reads the list again. | |

The grey text of `Retry` is `Tick exactly one planned-carton exception waiting for recovery`.
Source: the binding `generic_disable_unless_field_in` in part 5 of `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/101_carton_execution_exceptions.sql`.

## Who can use it

| Role | Open the list | `Retry` |
|---|---|---|
| `ADMIN` | Yes | Yes |
| `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Depends on the assigned menu grants; the read method allows this role | Yes by method and web action, if the menu is visible |
| `OPERATOR`, `VIEWER` | The menu allows it. The read method does not. See below. | No |

> Not confirmed by code: what `OPERATOR` and `VIEWER` see. `cartonization_exception_list` is for `ADMIN`, `MANAGER` and `SUPERVISOR` only. To verify: sign in as `OPERATOR` on a test warehouse and open the list.

## What this screen affects

`Retry` can plan new cartons, take picks off a cart, and send their tasks back to the pool. See the task page.

## Related pages

- [Retrying a box-full repair](64-retrying-a-box-full-exception.md)
- [Pick Assignments](20-pick-assignments-list.md)
- Administrator guide: [Cartonization overview](../../admin/policies/30-cartonization-overview.md), section on box-full exceptions
- API: `cartonization_exception_list` (read); `cartonization_exception_retry` (command)
- RF terminal: `PKA50` "Box Full" (`pick_assignment_position_close`), `PKA51` "Box Damaged" (`pick_assignment_position_replace_container`), `PKA52` "Recovery" (`pick_assignment_position_hand_over`)
