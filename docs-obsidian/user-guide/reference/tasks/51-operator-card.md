# Operator card

The card opens when you click a row of [Operators](50-operators-list.md).
It shows one operator and what the operator may do. The form is `operator_shell_form` (kind Shell). It has two parts:

| Part | Form | Shows |
|---|---|---|
| Top (`slot_1`) | `operator_normal_form` | The operator: login, name, active, equipment profile. |
| Bottom (`slot_2`) | `operator_task_permission_list_form` | The task permissions of this operator. See [Task Permissions](52-task-permissions.md). |

The card has one toolbar button: `Save` (`opr_ss`). It runs `generic_validate`, then `generic_save`, which calls the method `update_operator`.

## Header

Table: `operator`.

| Label | Column | Type | Required | Allowed values / default | What it does |
|---|---|---|---|---|---|
| `Login` | `username` | Text, 128 | No | Read only | The login. Comes from the sync. |
| `Name` | `full_name` | Text, 200 | No | Read only | The full name. Comes from the sync. |
| `Active` | `is_active` | Check box | No | Read only. Default `Yes` | Whether the person can be given work. Comes from the sync. |
| `Equipment Profile` | `equipment_profile_id` | Whole number, chosen from a list of equipment profiles | No | Empty = on foot | The machine the operator drives. The only field you can change here. The RF terminal can also write it: see below. |

`Login`, `Name` and `Active` are written by the sync and by nothing else. The method `update_operator` accepts only `equipment_profile_id`.
Source: `crates/services/app-server/src/web/rpcs/operator_rpc.rs:1-12,60-75` and `crates/libs/wms-lib-core/src/model/tasks/operator.rs` (`OperatorForUpdate`).

To empty `Equipment Profile`, use `Clear value` in the picker footer and press `Save`.
The method treats an explicit empty value as "on foot" (`WithExplicitNulls`).

> Not confirmed by code: that the `Clear value` button is visible on this picker. The widget has it only when the form switches it on, and the migration that did so is archived. To verify: open the picker on an operator who has a profile.

### The terminal can change it too

When an operator asks for pick work on the RF terminal and names a machine, the system writes that machine to this field.
If the operator says "on foot", the field is emptied. If the operator names nothing, the field is left as it is.
So the value on the card is the machine of the last shift, not only what a supervisor typed.
Source: `crates/libs/wms-outbound/src/picking/commands/dispatch_next.rs:329-360` and `OperatorBmc::set_shift_equipment_profile`.

### What the equipment profile does

| Where | Effect |
|---|---|
| Handing out work | The profile gives a lifting limit: `max_weight`, lowered by `weight_reduction_per_level` for each level of the location. A task heavier than that limit is not offered to this operator. A profile with `max_weight` 0, or no profile, means no limit. |
| Cart picking | The work area has its own picking policy for each equipment profile. The policy of the operator's profile is the one used. |

Sources: `crates/libs/wms-tasks/src/service/claim.rs:170-187`, `crates/libs/wms-lib-core/src/model/equipment_profile.rs:55-90`, `crates/libs/wms-outbound/src/picking/commands/start.rs:182-190`.
The profiles themselves are set up in the work area screens, not here.

## Who can use it

| Role | Open the card | `Save` |
|---|---|---|
| `ADMIN`, `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Depends on the screen grants assigned by an administrator | No by default: `update_operator` is for `ADMIN` and `MANAGER` |
| `OPERATOR`, `VIEWER` | Yes (read) | No: the method refuses |

The web action `generic_save` is open to more roles than the method. The method decides.

## Related pages

- [Operators](50-operators-list.md)
- [Task Permissions](52-task-permissions.md)
- [Setting an operator's equipment](66-setting-an-operators-equipment.md)
- API: `get_operator`, `update_operator`
- RF terminal: `PKA00` "Get Area Work" (method `pick_dispatch_next`, with an area and a machine). The machine list comes from `list_equipment_profile`.
