# Tasks tab

The `Tasks` tab is the fourth tab of the [order screen](01-order-screen-overview.md).
It is the task board, narrowed to the tasks of this one order.
A task is a unit of work for a picker. Allocation and release make the pick tasks.
The form is `shipment_order_tasks_form`. The data comes from the database view `task_board` (data object `order_task`).

The tab shows every column that the task board shows (checked by the test `crates/services/web-ui-server/tests/shipment_order_metadata.rs`, see `wms-meta-ui` migration 086).
The grid has check boxes. Task-management buttons work on the ticked rows. Paper-pick buttons record the physical pick and place its pallet.

## Columns

The task columns are read only. The paper-pick input columns are editable and are saved only through **Save Picks**.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. |
| `Task` | `code` | Text | Yes | The task code. |
| `Type` | `task_type` | Choice | Yes | `Pick`, `Putaway`, `Replenish` or `Move`. The tasks of an order are made from its picks. |
| `Status` | `status` | Choice | Yes | `Created`, `Assigned`, `InProgress`, `Completed`, `Cancelled` or `Shorted`. |
| `Priority` | `priority` | Whole number | Yes | The priority of the task. It comes from the order. |
| `SKU` | `sku_code` | Text | Yes | The item. |
| `Lot` | `lot` | Text | Yes | The lot. |
| `Qty` | `qty` | Decimal | Yes | The quantity to pick. |
| `UOM` | `uom` | Text | Yes | The unit. |
| `Qty Done` | `qty_done` | Decimal | Yes | The quantity done. |
| `From` | `from_location` | Text | Yes | The source location. |
| `To` | `to_location` | Text | Yes | The target location. |
| `Zone` | `zone` | Text | Yes | The zone. |
| `Assignee ID` | `assignee` | Whole number | No | The id of the user who holds the task. |
| `Assignee` | `assignee_username` | Text | Yes | The user name. |
| `Assignee Name` | `assignee_name` | Text | Yes | The full name. |
| `Created` | `created_at` | Date and time | Yes | When the task was made. |
| `Claimed` | `claimed_at` | Date and time | Yes | When a picker took it. |
| `Started` | `started_at` | Date and time | Yes | When work began. |
| `Ended` | `ended_at` | Date and time | Yes | When work ended. |
| `Lease Expires` | `lease_expires_at` | Date and time | Yes | When the hold of the picker runs out. |
| `Available From` | `available_from` | Date and time | Yes | Earliest time the task can be taken. |
| `Return Reason` | `skip_reason` | Text | Yes | The reason a task was returned. |
| `How Returned` | `return_kind` | Choice | Yes | `Refused`, `HandedBack`, `Seized` or `Expired`. |
| `Refusals` | `refused_count` | Whole number | Yes | How many pickers refused the task. |
| `Escalated` | `escalated_at` | Date and time | Yes | When the task was escalated to a supervisor. |
| `Version` | `version` | Whole number | No | The version the buttons send back. |
| `Carton` | `cartonization_outcome` | Text, shown as a cell | Yes | The same cell as on the [Picks tab](12-picks-tab.md). |
| `Pick Assignment` | `pick_assignment_code` | Text | Yes | The pick assignment the task belongs to. |

Source: form `shipment_order_tasks_form` in `001_baseline.sql`, and `wms-meta-ui` migrations 027, 030 and 086. The task values are the types `task_status` and `task_type` and the constraint `ck_task_return_kind` in `wms-app` `001_baseline.sql`.

> Not confirmed by code: the exact meaning of `Lease Expires`, `Available From`, `Refusals`, `How Returned` and `Pick Assignment`. The names are clear, but the rules behind them live in the task manager and were not read for this page. To verify: read `crates/libs/wms-tasks` and the Task Board pages when they are written.

## Toolbar

| Button | Code | Needs | What it does |
|---|---|---|---|
| `Save Picks` | `pick_save` | One or more changed Pick rows with `Picked / Completed` or `Short` selected | Records each changed row and puts any found stock on the operator's open pick pallet in transit. |
| `Pick instructions` | `pick_review` | A Pick task to review | Shows the confirmations and instructions required before the row can be saved. |
| `Place Pallet` | `pick_place_plt` | No selected row | Opens a window for the `DRP` pallet and the destination location. A successful confirmation sends the pallet to the next workflow step. |
| `Return to Pool` | `sot_release` | One task, status `Assigned` or `InProgress` | Takes the task from its picker and puts it back in the pool. |
| `Reassign` | `sot_reassign` | One task that can be reassigned (`Assigned`, `InProgress`, or escalated to a supervisor) | Gives the task to another operator. |
| `Delete Task` | `sot_delete` | One or more tasks | Deletes the tasks nobody has taken, and puts their picks back in reserve. |

The buttons are grey until the rule is met. The grey text is `Select a task that is Assigned or InProgress`, `Select a task that is Assigned, InProgress, or escalated to a supervisor` and `Select at least one task`.
See [Working with tasks from the order](41-working-with-tasks-from-the-order.md).

For the paper workflow, including completed and short rows, see [Paper picking in the operator guide](../../operator/09-picking.md#c-paper-picking-in-the-web-app). Saving does not hand off the pallet. Use **Place Pallet** only after the pallet reaches the destination shown by the pick card.

## Related pages

- [Working with tasks from the order](41-working-with-tasks-from-the-order.md)
- [Picks tab](12-picks-tab.md)
- [Releasing an order](35-releasing-an-order.md)
- API behind the buttons: `task_force_release`, `task_reassign`, `task_delete_many`
- RF terminal: picking (see the [Operator guide: Picking](../../operator/09-picking.md)).
