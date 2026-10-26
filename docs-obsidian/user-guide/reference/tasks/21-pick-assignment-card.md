# Pick assignment card

The card opens when you click a row of [Pick Assignments](20-pick-assignments-list.md).
It shows one assignment: its header on top and its positions below. Nothing on the card can be edited.
The form is `pick_assignment_board_shell_form` (kind Shell). It has two parts:

| Part | Form | Shows |
|---|---|---|
| Top (`slot_1`) | `pick_assignment_board_normal_form` | The header of the assignment. |
| Bottom (`slot_2`) | `pick_assignment_position_list_form` | The positions of the assignment. |

The header is read by the method `pick_assignment_board_get`. The positions are read by `pick_assignment_position_list`, filtered by the assignment.
The card has no toolbar of its own.

> Not confirmed by code: how to go back from the card to the list. The shell has no back button in its metadata. To verify: open a row, then look for a breadcrumb or a back button on the page.

## Header

Table: `pick_assignment` (view `pick_assignment_board`). All fields are read only.

| Label | Column | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | No | Hidden | The row key. |
| `Code` | `code` | Text, 20 | No | Unique | The assignment code. |
| `Status` | `status` | Text | No | `Building`, `Ready`, `Picking`, `Delivering`, `Completed`, `Dissolved` | Where the assignment stands. |
| `Version` | `version` | Whole number | No | | The change counter. |
| `Work Area` | `work_area_code` | Text | No | | The work area. |
| `Operator` | `assignee_username` | Text | No | | The holder. |
| `Carrier` | `carrier_code` | Text | No | Empty if none | The cart. |
| `Positions Bound` | `positions_bound` | Whole number | No | | Positions in status `Bound` or `Closed`. |
| `Positions` | `positions_total` | Whole number | No | | All positions. |
| `Created At` | `created_at` | Date and time | No | | When it was started. |
| `Ready At` | `ready_at` | Date and time | No | | When every position had a box. |
| `Dissolved At` | `dissolved_at` | Date and time | No | | When it was dissolved. |

The fields come four to a row. Fields that have no value are shown empty.

## Positions

Table: `pick_assignment_position` (view `pick_assignment_position_board`). The list has a `Refresh` button (`pap_refresh`). All columns are read only. One row can be selected at a time. No check boxes.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. |
| `Position` | `position_no` | Whole number | Yes | The place on the cart, from 1. |
| `Order` | `order_number` | Text | Yes | The sales order whose goods go into this box. |
| `Planned Carton` | `planned_carton_code` | Text | Yes | The box the cartonization plan named. Empty for a `Bypassed` target. |
| `Box` | `box_code` | Text | Yes | The real box that stands on the position now. Empty until it is bound. |
| `Target Kind` | `planned_target_kind` | Text | Yes | `PlannedCarton`, `Bypassed`, `ShipAsIs`. |
| `Status` | `status` | Text | Yes | `Open`, `Bound`, `Closed`, `Released`. |
| `Bound At` | `bound_at` | Date and time | Yes | When the box was put on the position. |

Meaning of the values:

| Value | Meaning |
|---|---|
| `PlannedCarton` | A box the cartonization plan named. The whole carton goes into one position. |
| `Bypassed` | Picks the plan did not put in a carton. All `Bypassed` picks of one order share a position. |
| `ShipAsIs` | A target that stands on the cart as it is and takes no box. The comment of the start says slice 3 does not make such targets. |
| `Open` | The position waits for a box. |
| `Bound` | A box stands on it. |
| `Closed` | The box was reported full, or delivered. The box stays on the cart until delivery. |
| `Released` | The position was let go (dissolve). It is history. |

Source: `crates/libs/wms-lib-core/src/model/outbound/pick_assignment.rs:49-70`, `crates/libs/wms-outbound/src/domain/pick_assignment/aggregate.rs` (the doc comments of `PlannedTarget` and `plan_dissolve`).

> Not confirmed by code: whether any position with `Target Kind` = `ShipAsIs` exists today. The comment in `aggregate.rs:58-60` says it is never a target in slice 3, and `judge_position` handles it (`aggregate.rs:266`). To verify: look for `ShipAsIs` in the positions of a test warehouse.

## Who can use it

The same as the list. See [Pick Assignments](20-pick-assignments-list.md#who-can-use-it).

## Related pages

- [Pick Assignments](20-pick-assignments-list.md)
- [Pick Target Exceptions](30-pick-target-exceptions.md): a full box closes its position.
- [Pick assignment statuses](90-task-statuses-and-transitions.md#pick-assignment-statuses)
- API: `pick_assignment_board_get`, `pick_assignment_position_list`
- RF terminal: `PKA02` "Prepare Carrier" puts a box on each position (`pick_assignment_bind_position`).
