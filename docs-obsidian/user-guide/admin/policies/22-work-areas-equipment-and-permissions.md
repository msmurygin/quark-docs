---
title: "Work Areas, Equipment and Operator Permissions"
type: user-guide
audience: customer administrator
status: published
updated: 2026-10-30
---

# Work Areas, Equipment and Operator Permissions

Use this setup to decide where an operator may work, which equipment limits apply, and whether the operator may receive new tasks. A valid picking setup needs all three parts:

1. The source zone belongs to a work area.
2. The operator has `Pick` permission for that work area.
3. `Pick Execution` is enabled on that permission.

If any part is missing, the operator will not receive the pick.

## Before you start

- Sign in as an administrator or manager.
- Create the required putaway zones and locations first.
- Publish the picking policy before assigning it to a work area or equipment profile.
- Decide which operators work on foot and which use equipment with weight or zone limits.

## 1. Create a work area

Open `Warehouse Configuration > Work Areas & Equipment > Work Areas`, then create or open a work area.

| Field | What to enter | Effect |
|---|---|---|
| `Code` | A short warehouse code, for example `PICK-A`. | Operators can scan or enter it in `Pick by Area`. Treat the code as a permanent label. |
| `Description` | A name operators and supervisors will understand. | Helps identify the area in lists. |
| `Max Concurrent Tasks` | A positive number. | Limits concurrent work for supported task types. A picker still works one discrete task or one cart assignment at a time. |
| `Allow Task Release` | On when operators may return or reject work. | When off, a supervisor must move blocked work. |
| `Picking Policy` | A published policy, or empty for the warehouse default. | Controls how new picking work starts and completes in this area. |
| `Pack station` | A location of type `Pack`, or empty. | Sends eligible completed work to that packing station. |
| `Control Station` | A location of type `Control`, or empty. | Sends eligible completed orders to order control. |

Save the work area before adding zones or equipment-specific rules.

### Pack and control stations

The station location and the picking policy must agree. For example, a pallet reaches a pack or control station only when that destination type is allowed by the policy. Work already in progress keeps the destination it received when it started.

Only one control station can be used across the warehouse. Another work area cannot point to a different one. Move the station only when no containers are waiting there; containers already routed to the old station will not move automatically.

See [Order control after picking](../../operator/11-order-control-after-picking.md) for the complete setup and operating flow.

## 2. Add zones to the work area

Open the work area's zone list and add every putaway zone its operators may reach.

A source location belongs to a picker’s reachable work only through its putaway zone. If `A-04-0` belongs to zone `RACK`, add `RACK` to the work area; do not enter the zone code when the terminal asks for a work-area code.

A zone can belong to more than one work area. Keep overlapping areas intentional so supervisors can explain which policy and equipment rules apply.

## 3. Assign the picking policy

On the work-area list, select exactly one area and choose `Assign Policy`.

- Choose a published picking policy for that area.
- Leave the value empty to use the default `DISCRETE` policy.
- A live cart assignment or open pallet keeps its existing policy decision. The new assignment applies to the next start.

For different behavior by equipment, add a policy-by-equipment row on the work area. The equipment-specific policy takes priority over the area default.

See [Picking policy settings](21-picking-policy-settings.md) for every policy option.

## 4. Create equipment profiles

Open `Warehouse Configuration > Work Areas & Equipment > Equipment Profiles`.

| Field | What it controls |
|---|---|
| `Code` | The equipment choice shown to the operator. |
| `Description` | A clear warehouse name such as `Reach truck`. |
| `Max Weight` | The maximum task weight this equipment may take. |
| `Weight Reduction per Level` | Reduces the allowed weight for higher storage levels. |
| `Active` | Makes the profile available for new work. |
| Excluded zones | Prevents this equipment from receiving work in unsafe or unreachable zones. |

Use exclusions for physical access restrictions, not as a substitute for operator permissions. An operator needs both a reachable area and suitable equipment.

If a profile is deactivated during a shift, work already held is not automatically reassigned. The operator must choose an active profile before requesting new work.

## 5. Assign equipment to an operator

Open `Warehouse Configuration > Operator Permissions > Operators` and open the operator.

Set `Equipment Profile` when the operator starts the shift with known equipment. Leave it empty for work on foot. The operator can also choose equipment in `Pick by Area`; that choice applies to the next work request.

The operator list follows the users assigned to the warehouse. Use `Sync` when a recently assigned user is not yet shown.

## 6. Grant task permission

On the operator card, open `Task Permissions` and add one row for each task type and work area the operator may use.

| Field | What to choose |
|---|---|
| `Task Type` | `Pick`, `Putaway`, `Replenish`, `Move`, or `Count`. |
| `Work Area` | The area whose zones the operator may reach for this task type. |
| `Pick Execution` | Enable for a `Pick` row when this operator may receive new pick work. |

### Why `Pick Execution` matters

A `Pick` permission row by itself is not enough. With `Pick Execution` off, the operator can see the area but receives no new pick. On the terminal, this normally appears as **No eligible Pick work**.

To enable a picker:

1. Open `Operator Permissions > Operators`.
2. Open the operator.
3. Open the existing `Pick` permission for the correct work area, or create it.
4. Enable `Pick Execution`.
5. Save.
6. Ask the operator to request work again.

Changing this switch does not interrupt a task already held by the operator.

## 7. Configure task timing

Open `Warehouse Configuration > Settings & Reference Data > System Settings` only when the warehouse needs values different from its operating standard.

| Setting | Purpose |
|---|---|
| `TASK_LEASE_TTL_MIN` | Minutes a claimed task remains held while the operator is inactive. |
| `TASK_SKIP_COOLDOWN_MIN` | Minutes a rejected task waits before it can be offered again. |
| `TASK_SKIP_ESCALATE_AFTER` | Number of rejections after which the task waits for a supervisor. |
| `TASK_MAX_CONCURRENT_DEFAULT` | Concurrent-task limit when no work area is selected. |
| `TASK_ALLOW_RELEASE_DEFAULT` | Whether work without an area may be returned or rejected. |

Use positive values for the first four settings. Set `TASK_ALLOW_RELEASE_DEFAULT` to `1` to allow release or `0` to disable it. Changes apply to the next claim, renewal, rejection, or release; they do not rewrite existing deadlines.

## 8. Serial-pick reassignment

For a serial-tracked SKU, `Pick Episode Reassignment` decides what happens when an open serial capture would change operators.

| Value | Use it when |
|---|---|
| `Block movement` | The same operator must finish the open serial capture. |
| `Hand over open episode` | A new operator may continue the same open capture. |
| `Cancel and restart capture` | The old capture should close and the next operator must start a new one. |

Do not reassign a live cart task by itself. Resolve or dissolve the cart assignment through the supervisor workflow.

## 9. How the system chooses work

When an operator asks for a pick, the system checks the current situation in this order:

1. Resume the operator’s held work first.
2. Confirm the operator is active.
3. Apply the selected work area and equipment profile.
4. Confirm the operator has `Pick` permission for the source zone.
5. Confirm `Pick Execution` is enabled.
6. Exclude held stock, blocked locations, unsuitable equipment and work that is not released.
7. Offer the highest-priority eligible task.

Task priority is followed by the warehouse route order and then task age. Two operators cannot receive the same task.

## 10. Reject and return work

- `Reject Pick` is available only before any quantity is picked.
- A rejected task waits for the configured cooldown and counts toward supervisor escalation.
- `Skip` on a cart moves the stop later in that cart route; it does not reject the underlying task.
- When `Allow Task Release` is off, the operator must ask a supervisor to return or reassign the work.

Keep the rejection reason short and operational: describe what prevents the pick and what the supervisor should check.

## 11. What changes affect open work

| Change | Effect |
|---|---|
| Remove a task permission | Stops new work in that area; held work can still be completed. |
| Turn off `Pick Execution` | Stops new picks; held picks continue. |
| Remove a zone from an area | Removes unclaimed work in that zone from the area; held work stays. |
| Change equipment weight or exclusions | Applies to the next work request. |
| Change the picking policy | Applies to the next start; live carts and open pallets keep their existing decision. |
| Turn off `Allow Task Release` | Applies to the next return or rejection. |

## 12. Troubleshooting

| What the operator sees | What the administrator checks |
|---|---|
| **No eligible Pick work** | Confirm released work exists; the source zone belongs to the area; the operator has a `Pick` row for that area; and `Pick Execution` is enabled. |
| **No eligible Pick work in the area** | Confirm the scanned value is a work-area code, not a putaway-zone code, and that eligible sources belong to one of the area's zones. |
| No right to take Pick tasks | Add or correct the operator's `Pick` permission for the source area. |
| All tasks are too heavy for the equipment | Assign suitable equipment or correct the profile’s weight and level settings. |
| Returning work is not allowed | A supervisor must return or reassign it, or the administrator must enable task release for future work. |
| The operator already has another task | Finish or return the held task before requesting a new pick. |
| The task lease expired | Request the work again. If the problem repeats, review the lease duration and connection stability. |
| The task changed while it was open | Refresh or rescan and review the current task. Do not force the old decision. |

## Related guides

- [Picking](../../operator/09-picking.md)
- [Picking policy settings](21-picking-policy-settings.md)
- [Order control after picking](../../operator/11-order-control-after-picking.md)
- [Task Board](../../reference/tasks/10-task-board.md)
