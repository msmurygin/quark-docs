# Roles

A **role** is a named set of permissions. A user gets a role for each warehouse in the tab [Warehouses & Roles](12-user-warehouses-and-roles-tab.md).
The `Roles` screen lists the roles, makes new ones and shows who holds a role.
The permissions of a role are edited in the [Permission matrix](16-permission-matrix.md), not here.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Configuration > Users & Roles > Roles`.

The menu item is `ent_roles_list`. It opens the form `enterprise_role_detail` (a shell). The shell has two slots:
the list `enterprise_roles_list` on the left, and the role pane `enterprise_role_detail_pane` on the right.
The pane is a shell too: the role card `enterprise_role_basic` above, the member list `enterprise_role_members` below.

## The list

The list has a search box (`Search roles…`) that filters the rows in the browser by code, name and description, a count, and the buttons below.
A row shows the role name, a `SYS` badge for a built-in role (tooltip `Built-in role`) and a line `CODE · N members · N resources`.
A role that is not active is drawn dimmed.

| Part of the row | Source |
|---|---|
| Name | `name`, or `code` when the name is empty. |
| `SYS` badge | `is_system` is true. |
| `N members` | The number of **assignments** of the role: rows of `user_warehouse` with this role. One user with the role in two warehouses counts twice. |
| `N resources` | The number of permission rows of the role that have at least one of the four bits on. |

The counts come from the view `enterprise.role_with_counters` (`crates/libs/wms-lib-sql/sql/wms-enterprise/migrations/001_baseline.sql:805`).
The form also defines these columns, all read only: `Code`, `Name`, `Description`, `Active`, `System`, `Members`, `Resources`.

| Button | What it does | Task page |
|---|---|---|
| `New Role` | Opens an empty role card on the right (`generic_new`). | [Creating a role](37-creating-a-role.md) |
| `Refresh` | Reads the list again. | |

Click a row to open the role.

## The role card

The form is `enterprise_role_basic`. The data object is `enterprise_role` (table `enterprise.role`).

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Code` | `code` | Text, up to 50 characters. Unique. | Yes | Any text. Use capitals, as the built-in roles do. | The stable name of the role. The default permissions are matched on the exact text `ADMIN`, `MANAGER`, and so on. **After the first save it cannot be changed.** |
| `Name` | `name` | Text, up to 200 characters | Yes | Any text for a custom role. | The name shown in lists. A built-in role cannot be renamed. |
| `Description` | `description` | Text, no length limit | No | Any text, or empty. | A note on the purpose of the role. It is not printed on the list, but the list search matches it (`ui/wms-lib/cortive-role-list.ts:38`). |
| `Active` | `is_active` | Check box | No | On by default. | When off, the role stops counting: users who hold it lose the access it gave. A built-in role cannot be deactivated. |

The column `is_system` (default off) has no field on the card. It is set only by migrations. It marks the roles that ship with the product.

| Button | What it does |
|---|---|
| `Save` | Saves the role and refreshes the permission cache (`generic_save`, `rbac_cache_refresh`). |
| `Delete` | Deletes the role, refreshes the cache and goes back (`generic_delete`, `rbac_cache_refresh`). |

Why `Code` cannot change: `update_role` accepts only `name`, `description` and `is_active`, and refuses any other field (`crates/services/app-server/src/web/rpcs/role_rpc.rs:46`).

### The Members list

The form is `enterprise_role_members`. It is read only. One row for each assignment of the role.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `User` | `user_id` | Whole number, shown as the login | The user. |
| `Warehouse` | `warehouse_id` | Whole number, shown as the warehouse code | The warehouse. |
| `Default` | `is_default` | Text | Whether it is the default warehouse of the user. |

## The built-in roles

| Code | Name | Description (as stored) | `is_system` |
|---|---|---|---|
| `ADMIN` | Administrator | Full access to all forms | Yes |
| `MANAGER` | Warehouse Manager | Config and operations access | Yes |
| `OPERATOR` | Operator | Day-to-day warehouse operations | Yes |
| `VIEWER` | Viewer | Read-only access | Yes |
| `SUPERVISOR` | Supervisor | Authorizes overrides (close-with-discrepancy etc.) | Yes |
| `metadata_admin` | RF Metadata Admin | Can read AND write RF screen metadata | No |

Source: `crates/libs/wms-lib-sql/sql/wms-enterprise/migrations/001_baseline.sql:1417`.
The default permissions of these roles are in [Who can do what](91-who-can-do-what.md).

## Rules

| Rule | Where it comes from |
|---|---|
| A role that any user holds cannot be deleted. | The foreign key `user_warehouse.role_id` is `ON DELETE RESTRICT`. |
| A role that appears in the audit log (as the role of a refused call) cannot be deleted either. | The foreign key `audit_log.role_id` has no `ON DELETE` rule (`001_baseline.sql:2125`). |
| Deleting a role deletes its permission rows. | The foreign key `role_permission.role_id` is `ON DELETE CASCADE`. |
| A new role has **no permissions**. | A missing permission row means "denied" (`crates/libs/wms-lib-auth/src/authorization/mod.rs`, function `is_invokable`). Give it rows in the [Permission matrix](16-permission-matrix.md). |
| Saving or deleting a role clears the cached role and permission decisions. | `RoleBmc::after_mutation` (`crates/libs/wms-lib-core/src/model/role.rs:93`). |
| A built-in role (`is_system = true`) cannot be renamed, deactivated or deleted. A bulk delete containing one is refused before any role is deleted. | `RoleBmc::ensure_update_allowed` and `RoleBmc::ensure_not_system` (`crates/libs/wms-lib-core/src/model/role.rs`). |

Each save writes an audit row of kind `role_mutation` (see [Audit log](15-audit-log.md)).

> Not confirmed by code: the text shown when you delete a role that users still hold. The database refuses it with a foreign key error. To verify: assign a test role to a test user, then press `Delete` on the role.

## Who can use it

The API methods `create_role`, `update_role` and `delete_role` are open to the default role `ADMIN`.
`delete_many_role` is also open only to `ADMIN`. The read methods are open to `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`
(`crates/services/app-server/src/web/rpcs/role_rpc.rs:17`).

## Related pages

- [User card, Warehouses & Roles tab](12-user-warehouses-and-roles-tab.md)
- [Permission matrix](16-permission-matrix.md)
- [Creating a role](37-creating-a-role.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_role`, `update_role`, `delete_role`, `list_role`, `get_role`. RF terminal: none.
