# Setting an operator's equipment

Use this to say which machine an operator drives, or that the operator walks.
The machine decides how heavy a task the operator is offered, and which picking policy a work area uses for cart picking.

## Before you start

- You need the role `ADMIN` or `MANAGER`. The method `update_operator` is for these two roles by default. See [Who can do what](91-who-can-do-what.md).
- The equipment profile must exist. Profiles are set up on the work area and equipment screens, not here.

## Steps

1. Open `Warehouse Configuration > Operator Permissions > Operators`.
2. Click the operator. The [Operator card](51-operator-card.md) opens.
3. In `Equipment Profile` click the picker and choose a profile.
   To make the operator walk, use `Clear value` in the picker.
4. Click `Save`.

## What happens

The operator row is updated. Only `Equipment Profile` is sent. Login, name and active cannot be changed here.

| Result | What follows |
|---|---|
| A profile with `max_weight` above 0 | A task heavier than `max_weight` minus `weight_reduction_per_level` times the level of its location is not offered to the operator. |
| A profile with `max_weight` 0, or no profile | No lifting limit. |

A task with no known weight passes any limit.

The value can be replaced later when the operator names a machine on the RF terminal. See [Operator card](51-operator-card.md#the-terminal-can-change-it-too).

## If it is refused

| You see | Why |
|---|---|
| A refusal that names the profile (restrict key) | The profile does not exist or cannot be used. |
| `Forbidden` for the method | Your role has no right to `update_operator`. |

## Related pages

- [Operators](50-operators-list.md)
- [Operator card](51-operator-card.md)
- API: `update_operator` (sends `id` and `equipment_profile_id`; an explicit `null` clears it)
- RF terminal: `PKA00` "Get Area Work"
