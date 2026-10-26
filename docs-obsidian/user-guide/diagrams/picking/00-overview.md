# Picking and Task Manager: diagrams

These pages draw picking and the Task Manager from the code. There are sequence diagrams (who calls what, in which order), state diagrams (only where the code proves each arrow) and influence diagrams (this setting changes this decision, and the operator or supervisor then sees this). Every page ends with a table that points to the code.

Scope: the pick task and its life, the pick assignment of a cart, the RF pick screens, the supervisor screens of the Task Manager, and the settings that picking reads. Allocation, cartonization, packing and shipping have their own areas. This area stops where a pick hands its goods on: a pallet closed at its destination, or a cart delivered.

## Sequence diagrams

| Page | The question it answers |
|---|---|
| [10 How a pick becomes a task](10-pick-becomes-a-task.md) | What turns a reserved pick into a task in the pool? |
| [11 How an operator takes a task](11-operator-takes-a-task.md) | How does `pick_dispatch_next` choose and assign a task? |
| [12 How a cart is built](12-cart-assignment.md) | How does a cart get several boxes' tasks and its boxes? |
| [20 RF journey: one pick onto a pallet](20-rf-pick-discrete.md) | Which calls does the RF make from the card to the commit? |
| [21 RF journey: stops on a cart](21-rf-pick-cart-route.md) | How is a cart route walked, skipped, shorted and rejected? |
| [22 Short pick](22-short-pick.md) | What happens when the operator finds less stock? |
| [23 Drop-off of a pallet](23-drop-off-pallet.md) | Where does a discrete pick wait, and how is the pallet closed? |
| [24 Drop-off of a cart](24-drop-off-cart.md) | How is a cart delivered and unloaded? |
| [30 How a held task leaves its operator](30-task-return-paths.md) | Which doors return, reassign or dissolve, and in which state does the task end? |
| [31 Box full](31-box-full-and-target-exceptions.md) | What happens when a box is full, and how is a failed repair recovered? |
| [32 Box damaged](32-box-damaged.md) | How is a damaged box replaced on a cart? |

## State diagrams

| Page | Content |
|---|---|
| [40 Statuses](40-statuses.md) | Task, pick, pick assignment, cart position, box-full exception. |

## Influence diagrams

| Page | The question it answers |
|---|---|
| [50 Which policy is read](50-influence-which-policy-applies.md) | Which picking policy revision does each part of picking read? |
| [51 Cart policy fields](51-influence-picking-policy.md) | What do `Unit`, `Max Targets`, `Carrier Required`, `Quantity`, `Target`, `Completion` change? |
| [56 Pallet fields](56-influence-pallet-fields.md) | What do `Pallet Drop Cell Types` and `Count an Emptied Location` change? |
| [57 Source proof fields](57-influence-source-proof.md) | What decides which scans the operator must make at the shelf? |
| [52 Who gets which task](52-influence-who-gets-which-task.md) | Which rights, areas, equipment and flags decide who is offered a pick task? |
| [53 Short reasons](53-influence-short-reasons.md) | What does each field and action of a short reason change? |
| [54 SKU and lot settings](54-influence-sku-and-lot-settings.md) | Which SKU, lot and serial settings does picking read? |
| [59 Location and zone settings](59-influence-location-and-zone-settings.md) | Which location and zone fields does picking read? |
| [58 Delivery location](58-influence-delivery-destination.md) | How is the destination of a pallet or a cart found? |
| [55 Task settings](55-influence-task-settings.md) | What do `TASK_*` settings and the release flags change? |

## RF screens and API methods used in these pages

The screen codes and titles are those of the newest seeded revision in `crates/libs/wms-lib-sql/sql/rf-screens/`.

| Screen | Title | API method |
|---|---|---|
| `PICK01` | Get Pick Work | `pick_dispatch_next` |
| `PKAA`, `PKAE`, `PKAEL` | Pick by Area, Equipment | none (the equipment list is read with `list_equipment_profile`) |
| `PKA00` | Get Area Work | `pick_dispatch_next` |
| `PICK02` | Pick Work | `pick_work_get` (prefetch) |
| `PICK03` | Open Pallet | `pick_drop_open` |
| `PICK04`, `PICK05`, `PICK06`, `PICK14`, `PICK15` | Confirm Source, Item, Source LPN, Lot, Lot Attribute | `pick_confirm_location`, `pick_confirm_item`, `pick_confirm_source_lpn`, `pick_confirm_internal_lot`, `pick_confirm_lot_attributes` |
| `PICK07` | Pick Serials | `pick_confirm_serial` |
| `PICK08` | Confirm Quantity | `pick_confirm_qty` |
| `PICK09` | Confirm Pick | `pick_commit` |
| `PICK10`, `PICK10R`, `PICK10C` | Short Pick, Short Reason, Confirm Short | `pick_short` (from `PICK10C`) |
| `PICK11` | Reject Pick | `pick_reject` |
| `PICK13`, `PICK13_OVR` | Close Pallet, Supervisor Confirmation | `pick_drop_close`, `supervisor_override_grant` |
| `PICKINS` | Pick Instructions | none (the acceptance is sent with the commit) |
| `PKA01` | Scan Carrier | `pick_assignment_start` |
| `PKA02` | Prepare Carrier | `pick_assignment_bind_position` |
| `PKA09`, `PKA_OVR` | Dissolve, Supervisor Confirmation | `pick_assignment_dissolve`, `supervisor_override_grant` |
| `PKA20` | Next Pick | `pick_assignment_get` (prefetch) |
| `PKA21`, `PKA21L`, `PKA21A`, `PKA22`, `PKA23` | Confirm Location, Lot, Lot Attribute, Item, Source LPN | the same `pick_confirm_*` methods |
| `PKA24`, `PKA24S` | Confirm Quantity, Pick Serials | `pick_confirm_qty`, `pick_confirm_serial` |
| `PKA25`, `PKA26C`, `PKA27`, `PKA28` | Skip, Confirm Short, Reject Pick, Into Box | `pick_assignment_skip`, `pick_short`, `pick_reject`, `pick_commit` |
| `PKA30` | Deliver Carrier | `pick_assignment_complete` |
| `PKA50`, `PKA51`, `PKA52` | Box Full, Box Damaged, Recovery | `pick_assignment_position_close`, `pick_assignment_position_replace_container`, `pick_assignment_position_hand_over` |

Supervisor screens (`Task Manager` group) call `task_force_release`, `task_reassign`, `task_delete_many`, `pick_assignment_list`, `pick_assignment_dissolve_supervised`, `cartonization_exception_list` and `cartonization_exception_retry`.

## Reading rules

- A box in a diagram is something the code does. A name in code font is a method, a table column, a status or a setting as the code or the screen spells it.
- An arrow in a state diagram is drawn only when a statement in the code writes that change.
- A setting appears in an influence diagram only if code reads it. Settings that are stored but not read are listed under "Stored only. It has no effect today." on the page that fits them.

## Where it comes from

| What | Source |
|---|---|
| RF screens, newest seeded revisions | `crates/libs/wms-lib-sql/sql/rf-screens/094_uc_pick.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/095_uc_pick_assignment.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/096_uc_pick_route.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/098_uc_pick_carton_exceptions.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/101_uc_pick_drop_close.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/105_uc_pick_source_confirmation.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/110_uc_pick_aggregated_cart.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/111_uc_pick_drop_area.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/112_uc_pick_aggregated_cart_followups.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/113_rf_inputs_fit_the_server_limits.sql` |
| Pick methods and their classes | `crates/services/app-server/src/web/rpcs/pick_commands_rpc.rs`, `crates/services/app-server/src/web/rpcs/pick_assignment_rpc.rs` |
| Task methods | `crates/services/app-server/src/web/rpcs/task_commands_rpc.rs`, `crates/services/app-server/src/web/rpcs/task_rpc.rs` |
| Task Board rows | `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:6153-6215` (view `task_board`) |
| Method list | `docs-obsidian/user-guide/api/openrpc.json` |

## What is not drawn, and why

- **Not confirmed by code: sorting, loading and shipping after a pick.** A pallet or a cart ends at its destination, and the goods can be handed to the Outbound Flow Router, which waits for `Pack` at a pack station. What happens at a sort or load step is not part of the picking code. To verify: read `crates/libs/wms-outbound/src/flow/` and the packing area.
- **Replenishment.** A `Replenish` task type exists and rights can be granted for it. A search of the Rust code finds no code that creates such a task.
- **Dispatch strategies other than the fixed order.** The code has one fixed search order (held task, then the area, then every permitted area). A configurable strategy for the pool is not in code. To verify: read `crates/libs/wms-tasks/src/service/candidate.rs`.
- **Task status `Cancelled`.** Declared, never written.
- **Pick status `Cancelled`.** Declared, never written.
- **`pick_reconciliation_report`.** A read-only report for `Admin`, `Manager` and `Supervisor` that lists drift between tasks and picks (`OrphanTask`, `MissingTask`, `DuplicateLiveTask`, `SourceOutcomeMissing`, `TaskOutcomeMissing`, `InvalidTaskState`, `SourceNotEligible`). It changes nothing and is not drawn. Source: `crates/libs/wms-outbound/src/picking/queries/reconcile.rs:1-60`.

## Related pages

- [Task Manager (reference)](../../reference/tasks/00-task-manager-overview.md)
- [Picking overview (administrator)](../../admin/policies/20-picking-overview.md)
- [Operator guide: picking](../../operator/09-picking.md)
- [Orders (reference)](../../reference/outbound/00-orders-overview.md)
