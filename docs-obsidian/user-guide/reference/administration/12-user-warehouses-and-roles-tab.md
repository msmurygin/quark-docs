# User card, Warehouses & Roles tab

The `Warehouses & Roles` tab says in which warehouses the user may work and with which role.
One row is one assignment. The form is `enterprise_user_warehouses`. The data object is `enterprise_user_warehouse` (table `enterprise.user_warehouse`).

The tab is a grid that you edit in place. You change cells, then press `Save`.

## Toolbar

| Button | What it does | Task page |
|---|---|---|
| `Assign` | Adds an empty row to the grid (`generic_new`). | [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md) |
| `Refresh` | Reads the grid again. | |
| `Remove` | Deletes the ticked rows, then refreshes the permission cache (`generic_delete_selected`, `rbac_cache_refresh`). | [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md) |
| `Save` | Saves the changed rows, then refreshes the permission cache (`generic_grid_save`, `rbac_cache_refresh`). | [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md) |

## Columns

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | | Hidden. | The row key. |
| `Warehouse` | `warehouse_id` | Drop-down of warehouses, shows the warehouse code | Yes | The active warehouses, sorted by code (`WHERE is_active = true`). | The warehouse the user may enter. |
| `Role` | `role_id` | Drop-down of roles, shows the role code | Yes | The active roles, sorted by code (`WHERE is_active = true`). | The role the user has **in this warehouse**. A user may have a different role in each warehouse. |
| `Default` | `is_default` | Check box | No | Off by default. | Marks the warehouse that opens at sign-in. |

The drop-down queries are in the column settings of the form (table `form_list_details`, column `cell_editor_params`).

Other columns of `enterprise.user_warehouse` are `user_id` (the user of the card), and the audit columns `add_who`, `add_when`, `mod_who`, `mod_when`.

## Rules

| Rule | Where it comes from |
|---|---|
| A user has at most one row for a given warehouse. | Unique key `user_warehouse_user_id_warehouse_id_key`. |
| A user has at most **one** default warehouse. | Unique index `idx_user_warehouse_default` (one row with `is_default` for each user). |
| After the row exists, you can change only `Role` and `Default`. To change the warehouse, remove the row and assign again. | `update_user_warehouse` accepts only these two fields. |
| A role that is in use cannot be deleted. | The foreign key from `user_warehouse.role_id` to `role` is `ON DELETE RESTRICT`. |
| Deleting a user or a warehouse removes its assignments. | The foreign keys to `user` and `warehouse` are `ON DELETE CASCADE`. |

A duplicate is refused with `Duplicate entry on user_warehouse (constraint ...)`.

## What it affects

- **Which warehouses the switcher offers.** The list is read by `list_user_warehouses`. Only active warehouses are listed.
- **The role in each warehouse.** Role resolution ignores a row whose role or warehouse is not active. A user with no usable role is refused by every API call.
- **The warehouse that opens at sign-in.** The web sign-in uses the row marked `Default`; without one it uses the first row.
- **Calls without a warehouse.** An API call that names no warehouse is accepted only when the user has exactly one default row. Otherwise it is refused as `warehouse_required`.
- **Enterprise.** A row with the role `ADMIN` is what lets the user open [Enterprise](00-administration-overview.md).

Each change writes an audit row of kind `user_warehouse_mutation` (see [Audit log](15-audit-log.md)) and clears the cached role decisions (the hook `after_mutation` of `UserWarehouseBmc`).
The cache of the web server is refreshed by the action `rbac_cache_refresh` that the buttons `Remove` and `Save` call.

## Who can use it

The API methods `create_user_warehouse`, `update_user_warehouse` and `delete_user_warehouse` are open to the default role `ADMIN` only.
`list_user_warehouse` and `count_user_warehouse` are open to `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`.

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [Roles](14-roles.md)
- [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_user_warehouse`, `update_user_warehouse`, `delete_user_warehouse`, `list_user_warehouse`. RF terminal: the warehouse and role decide what the user can do on the handheld too.
