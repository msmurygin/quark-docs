# Who can do what

This page shows who may open each Enterprise screen and press each button, by default.
It describes the **defaults** that a new database gets. An administrator can change every cell in the [Permission matrix](16-permission-matrix.md). A change made there wins over this page.

## The gates, in order

A button works only when all of these are open.

| # | Gate | What decides | Refusal |
|---|---|---|---|
| 1 | **Enterprise mode** | You hold the role `ADMIN` on some warehouse. Under Enterprise the server accepts only this role. | `Enterprise access requires ADMIN role` |
| 2 | **Sidebar item** | The `menu_item` row allows reading. No row means allowed. | The item is not drawn. |
| 3 | **Form** | The `form` row allows any bit, or no role has a row for the form. | `Your role may not open this form.` |
| 4 | **Web action** | The `server_action` row has **X** on for the role. A super-user who has **no role** in the scope is let through; a super-user who holds a role is checked by that role. | `Forbidden("{action}")` |
| 5 | **API method** | The `api` row has **X** on. Super-users always skip this gate. | HTTP 403 with the method name; the call is written to the [Audit log](15-audit-log.md) as `permission_denied`. |

Gate 1 means that, in practice, only a user with the role `ADMIN` ever sees these screens. The lists below name `MANAGER`, `OPERATOR` and `VIEWER` because the API methods are open to them if they call the API directly in a warehouse scope, for example with an API key.

## Roles

The built-in role codes are `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER`. See [Roles](14-roles.md).
A role with any other code starts with no permissions.

## Web actions (gate 4)

The buttons on these screens use the generic web actions. Default grants:

| Web action | `ADMIN` | `MANAGER` | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|---|
| `generic_new`, `generic_save`, `generic_delete`, `generic_delete_selected`, `generic_grid_save`, `generic_validate` | Yes | Yes | Yes | Yes | No |
| `generic_refresh` | Yes | Yes | Yes | Yes | Yes |
| `rbac_cache_refresh` | Yes | Yes | No | No | No |
| `rbac/generate_api_key_confirmed`, `rbac/revoke_api_key_confirmed` | Yes | Yes | No | No | No |

`ADMIN` and `MANAGER` get every web action. `OPERATOR` and `SUPERVISOR` get only the listed operational actions. `VIEWER` gets only read-like actions.
So the web action gate is open to many roles; the **API method** is what really limits these screens.

## Screens and buttons

`A` = `ADMIN`, `M` = `MANAGER`, `S` = `SUPERVISOR`, `O` = `OPERATOR`, `V` = `VIEWER`. "Yes" lists the default roles that may call the API method.

| What | Web action | API method | Default roles |
|---|---|---|---|
| Open the Users list | the list form | `list_user`, `get_user`, `count_user` | A, M, O, V |
| `New User`, `Save` (user) | `generic_new`, `generic_save` | `create_user`, `update_user` | A |
| `Delete` (user) | `generic_delete` | `delete_user` | A |
| `Assign`, `Save` (Warehouses & Roles) | `generic_new`, `generic_grid_save`, `rbac_cache_refresh` | `create_user_warehouse`, `update_user_warehouse` | A |
| `Remove` (Warehouses & Roles) | `generic_delete_selected`, `rbac_cache_refresh` | `delete_user_warehouse`, `delete_many_user_warehouse` | A |
| Read assignments | the list form | `list_user_warehouse`, `get_user_warehouse`, `count_user_warehouse` | A, M, O, V |
| `Generate Key` | `rbac/generate_api_key_confirmed` | `generate_user_api_key` | A |
| `Revoke` (API key) | `rbac/revoke_api_key_confirmed` | `revoke_user_api_key` | A |
| Read API keys | the list form | `list_user_api_key`, `get_user_api_key`, `count_user_api_key` | A |
| `New Role`, `Save` (role) | `generic_new`, `generic_save`, `rbac_cache_refresh` | `create_role`, `update_role` | A |
| `Delete` (role) | `generic_delete`, `rbac_cache_refresh` | `delete_role` | A |
| Read roles | the list form | `list_role`, `get_role`, `count_role` | A, M, O, V |
| Read the audit log | the list form | `list_audit_log`, `get_audit_log`, `count_audit_log`, `list_audit_event_kinds` | A, M, O, V |
| Read the Permission Matrix | the matrix form | `list_permission_matrix` | A, M, O, V |
| Change a cell, `Import CSV` | route `permission_matrix_save` | `batch_upsert_permission_matrix` | A, M |
| Translate a label or message | `generic_save`, `generic_grid_save`, `generic_validate` | none | not applicable |
| `New`, `Save` (handling unit type) | `generic_new`, `generic_save` | `create_handling_unit_type`, `update_handling_unit_type` | A, M |
| Read handling unit types | the list form | `list_handling_unit_type`, `get_handling_unit_type`, `count_handling_unit_type` | A, M, S, O, V |
| `New`, `Save`, `Delete` (event type) | `generic_new`, `generic_save`, `generic_delete`, `generic_delete_selected` | `create_event_registry`, `update_event_registry`, `delete_event_registry` | A, M |
| Read the event registry | the list form | `list_event_registry`, `get_event_registry`, `count_event_registry` | A, M, O, V |
| Read the event monitor | the list form | `list_integration_event`, `get_integration_event`, `count_integration_event` | A, M, O, V |
| `New`, `Save`, `Delete` (subscriber) | `generic_new`, `generic_save`, `generic_delete`, `generic_delete_selected` | `create_integration_subscriber`, `update_integration_subscriber`, `delete_integration_subscriber` | A, M |
| Read subscribers | the list form | `list_integration_subscriber`, `get_integration_subscriber`, `count_integration_subscriber` | A, M, O, V |
| Read the delivery log | the list form | `list_integration_event_delivery`, `get_integration_event_delivery`, `count_integration_event_delivery` | A, M, O, V |

Other API methods near these screens, with no button:

| API method | Default roles | What it does |
|---|---|---|
| `batch_update_role_permissions`, `list_role_permissions_tree` | A | Update permissions in bulk; read the permission tree of a role. |
| `create_role_permission`, `update_role_permission`, `delete_role_permission`, `delete_many_role_permission` | A | Edit single permission rows. |
| `delete_many_role` | A, M | Delete several roles. |
| `me` | A, M, S, O, V | Read the signed-in user's own record. |
| `list_user_warehouses`, `get_warehouse_defaults` | A, M, O, V | Feed the warehouse switcher and defaults. |
| `admin.rbac.reseed` (an administrative capability, not a method) | A | Rebuild the permission catalogue. |

## Super-users

A user whose `Type` is `Admin` or `Sys` always skips gate 5 (the API method). Gate 4 (the web action) is skipped only when the super-user has no role in the current scope. See [User types and statuses](90-user-types-and-statuses.md).
A super-user also needs the role `ADMIN` on a warehouse to open Enterprise from the switcher.

## Inconsistencies seen

- `get_user`, `list_user` and `count_user` are open to `OPERATOR` and `VIEWER` but not to `SUPERVISOR`. An operator who calls the API can read every user's login and email.
- `delete_many_role` is open to `MANAGER`, but `delete_role` is not.
- `batch_upsert_permission_matrix` is open to `MANAGER`. A role may edit its own cells through the API. The web screen is closed to `MANAGER` only because Enterprise mode needs `ADMIN`.

## Related pages

- [Permission matrix](16-permission-matrix.md)
- [Roles](14-roles.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- [Messages catalogue](94-messages-catalogue.md)
- API: all methods named above. RF terminal: none.
