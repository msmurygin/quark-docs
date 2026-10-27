# Pick Assignments

A **pick assignment** is a cart-picking job. One operator takes a carrier (a cart), puts a box on each of its positions, and walks a route picking into the boxes.
This list shows every pick assignment of the warehouse in **any** status, newest first: live, completed and dissolved.
The form is `pick_assignment_board_list_form`. The data comes from the database view `pick_assignment_board`.

## How to open it

1. In the left sidebar open `Task Manager`.
2. Click `Pick Assignments`.

The menu item is `pick_assignment_board_menu`.
Click a row to open the assignment. See [Pick assignment card](21-pick-assignment-card.md).

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Two buttons: `Dissolve`, `Refresh`. |
| Grid | One row per assignment, 50 rows per page. A check box at the start of each row ticks it. |

The columns have no filter and no sort control in the metadata.
The list is read by the method `pick_assignment_list`, which returns newest first.

## Columns

Table: `pick_assignment` (read through the view `pick_assignment_board`). All columns are read only.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. |
| `Code` | `code` | Text, 20 | Yes | The assignment code. Unique. |
| `Status` | `status` | Text | Yes | `Building`, `Ready`, `Picking`, `Delivering`, `Completed`, `Dissolved`. See [Pick assignment statuses](90-task-statuses-and-transitions.md#pick-assignment-statuses). |
| `Work Area` | `work_area_code` | Text | Yes | The work area the assignment was started in. |
| `Operator` | `assignee_username` | Text | Yes | The login of the holder. |
| `Operator Name` | `assignee_name` | Text | Yes | The full name of the holder. |
| `Carrier` | `carrier_code` | Text | Yes | The code of the cart (container). Empty if the assignment has none. |
| `Bound` | `positions_bound` | Whole number | Yes | Positions in status `Bound` or `Closed`: those that hold a box now, or held one to the end. |
| `Positions` | `positions_total` | Whole number | Yes | All positions of the assignment, including `Released` ones. |
| `Created At` | `created_at` | Date and time | Yes | When the operator started the assignment. |
| `Ready At` | `ready_at` | Date and time | Yes | When every position had its box. Empty before that. |
| `Dissolved At` | `dissolved_at` | Date and time | Yes | When it was dissolved. Empty if it was not. |
| `Version` | `version` | Whole number | Yes | The change counter. `Dissolve` sends it back. |

The view also has the completion time (`completed_at`), the policy grouping unit and the work area id. The list does not show them.
Source: view `pick_assignment_board` in `crates/libs/wms-lib-sql/sql/wms-app/migrations/051_the_supervisor_sees_pick_assignments.sql:91-130`.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `Dissolve` | Exactly one ticked assignment with status `Building`, `Ready` or `Picking` | Opens the window `Dissolve Pick Assignment`. | [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md) |
| `Refresh` | Nothing | Reads the list again. | |

The grey text of `Dissolve` is `Tick exactly one assignment in Building, Ready or Picking (a Delivering one is completed, not dissolved)`.
Source: the binding `generic_disable_unless_field_in` in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/086_the_supervisor_sees_and_dissolves_pick_assignments.sql:561-564`.

## Row actions

| Action | Result |
|---|---|
| Click a row | Opens the assignment in the card: header on top, positions below (`SelfSwap` to `pick_assignment_board_shell_form`). |
| Tick the check box | Selects the row for `Dissolve`. |

## The window `Dissolve Pick Assignment` (`pick_assignment_dissolve_modal`)

| Label | Field | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| (text) | `notice` | Notice | n/a | `Dissolving returns the assignment's tasks to the pool and takes empty boxes off the carrier; boxes with goods stay on it.` | Explains the action. |
| `Reason` | `reason` | Text | Yes | No default. Hint: `Written on every task the dissolve returns to the pool.` Up to 80 characters after trimming. | Saved as `Return Reason` of each returned task. |

Buttons: `Cancel` closes the window. `Dissolve` runs the command `pick_assignment_dissolve_supervised`.

## Who can use it

| Role | Open the list | `Dissolve` |
|---|---|---|
| `ADMIN` | Yes | Yes |
| `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Depends on the assigned menu grants; the read methods allow this role | Yes by method and by web action, if the menu is visible |
| `OPERATOR` | Yes (menu and form default) but the methods behind the list are not open to `OPERATOR` | No |
| `VIEWER` | Same as `OPERATOR` | No |

The details are on [Who can do what](91-who-can-do-what.md).

> Not confirmed by code: what an `OPERATOR` or `VIEWER` sees when they open this list. The menu and form defaults allow it. The read methods `pick_assignment_list`, `pick_assignment_board_get` and `pick_assignment_position_list` are for `ADMIN`, `MANAGER` and `SUPERVISOR` only. To verify: sign in as `OPERATOR` on a test warehouse and open `Pick Assignments`.

## What this screen affects

- `Dissolve` ends the assignment. See the task page for the full list of changes.
- The picking itself happens on the RF terminal. This list changes nothing else.

## Related pages

- [Pick assignment card](21-pick-assignment-card.md)
- [Dissolving a pick assignment](63-dissolving-a-pick-assignment.md)
- [Task Board](10-task-board.md): the `Pick Assignment` column names the live assignment of a task.
- API: `pick_assignment_list`, `pick_assignment_board_get`, `pick_assignment_position_list` (read); `pick_assignment_dissolve_supervised` (command)
- RF terminal: `Picking` menu. `PKA01` "Scan Carrier" starts an assignment (`pick_assignment_start`); `PKA02` "Prepare Carrier" binds a box to each position (`pick_assignment_bind_position`); `PKA09` "Dissolve" lets the holder dissolve their own assignment (`pick_assignment_dissolve`); `PKA30` "Deliver Carrier" completes it (`pick_assignment_complete`).
