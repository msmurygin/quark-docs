# Operators

The operators list shows who can be given work in the active warehouse.
An **operator** here is a copy of a system user. The copy is made by a sync. It is not typed in on this screen.
You cannot create or delete an operator. You can set the machine the operator drives, and give the operator rights to take tasks.
The form is `operator_list_form`. The data object is `operator` (table `operator`). It is read by the method `list_operator`.

## How to open it

1. In the left sidebar open `Warehouse Configuration`, then `Operator Permissions`.
2. Click `Operators`.

The menu item is `operator_menu`.

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Two buttons: `Refresh`, `Sync`. |
| Filter bar | Filters on `Login`, `Name`, `Equipment Profile` (the `Active` column has none). |
| Grid | One row per operator, 50 rows per page. Check boxes at the start of the rows. |
| `Columns` | Shows or hides columns. |

There is no `New` and no `Delete`. This is on purpose: a removed operator would come back with the next sync while the user still has RF login and the warehouse.
Source: the header of `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/archive_pre_baseline_2026-09-23/600_operator_screen.sql` and `crates/services/web-ui-server/src/extensions/customization/operator/sync_action.rs:1-15`.

## Columns

Table: `operator`. All columns are read only in the grid.

| Label | Column | Type | Shown at first | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The row key. It equals the id of the system user. |
| `Login` | `username` | Text, 128 | Yes | The login of the user. |
| `Name` | `full_name` | Text, 200 | Yes | The full name. May be empty. |
| `Active` | `is_active` | Yes/No | Yes | `Yes` when the user still has RF login, is `Active`, and belongs to this warehouse. Default `Yes`. |
| `Equipment Profile` | `equipment_profile_id` | Whole number, shown as the profile code | Yes | The machine the operator drives. Empty means on foot. |

The table also holds `synced_at`, the time of the last sync that changed the row. The screen does not show it.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `Refresh` | Nothing | Reads the list again. | |
| `Sync` | Nothing | Copies the users of this warehouse into the list now. | [Syncing operators](65-syncing-operators.md) |

## Row actions

| Action | Result |
|---|---|
| Click a row | Opens the operator card (`SelfSwap` to `operator_shell_form`). See [Operator card](51-operator-card.md). |

## Who can use it

| Role | Open the list | `Sync` |
|---|---|---|
| `ADMIN` | Yes | Yes |
| `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Depends on the assigned screen and read-method grants | No by default |
| `OPERATOR` | Yes (read) | No |
| `VIEWER` | Yes (read) | No |

`Sync` fails for a role that has no right to the web action `operator_sync` or to the method `sync_operators`. Both are for `ADMIN` and `MANAGER` by default. See [Who can do what](91-who-can-do-what.md).

## What this screen affects

- Only an active operator can be given a task by `Reassign` on the [Task Board](10-task-board.md).
- The equipment profile of an operator limits how heavy a task the operator is offered. See [Operator card](51-operator-card.md).

## Related pages

- [Operator card](51-operator-card.md)
- [Task Permissions](52-task-permissions.md)
- [Syncing operators](65-syncing-operators.md)
- API: `list_operator`, `get_operator`, `count_operator` (read); `sync_operators` (command); `update_operator`
- RF terminal: none. The user logs in on the RF terminal with the same login.
