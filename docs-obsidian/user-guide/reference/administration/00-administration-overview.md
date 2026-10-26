# Enterprise sidebar: Configuration and Integration

The **Enterprise sidebar** holds the screens that work across all warehouses: users, roles, permissions, translations, handling unit types and the event system.
It is a different sidebar from the warehouse sidebar (`Inbound`, `Inventory`, ...).
This section describes every screen under the two Enterprise groups, `Configuration` and `Integration`.

## How to open it

1. Sign in.
2. Open the warehouse switcher and pick **Enterprise**. The sidebar footer then reads `Enterprise · ADMIN`.
3. The sidebar shows the groups `Dashboard`, `Configuration` and `Integration`.

The switcher offers Enterprise **only** to a user who holds the role `ADMIN` on at least one warehouse.
The switch is refused otherwise with `Enterprise access requires ADMIN role` (`crates/services/web-ui-server/src/routes/warehouse_handler.rs:67`).
While you are in Enterprise, the server accepts only the role `ADMIN` for every check (`crates/services/web-ui-server/src/domain/warehouse.rs:40`, `crates/libs/wms-lib-auth/src/authorization/role_resolver.rs:69`).
A role named `MANAGER` or `SUPERVISOR` does not open Enterprise, even if an API list on these pages names it.

> The user type `Admin` is not enough to open Enterprise from the switcher. The switcher looks for the **role** `ADMIN` on a warehouse (a `user_warehouse` row), not at the user type. See [User types and statuses](90-user-types-and-statuses.md).

## What the sidebar has

| Group | Item | Menu item code | Opens | Page |
|---|---|---|---|---|
| `Configuration` | `Warehouses` | `ent_warehouses` | Form `warehouse_admin_list_form` | |
| `Configuration` | `Users & Roles` | `ent_users` | A group of four items. | |
| `Users & Roles` | `Users` | `ent_users_list` | Form `enterprise_users_shell` | [Users list](10-users-list.md) |
| `Users & Roles` | `Roles` | `ent_roles_list` | Form `enterprise_role_detail` | [Roles](14-roles.md) |
| `Users & Roles` | `Audit Log` | `ent_audit_log` | Form `enterprise_audit_log` | [Audit log](15-audit-log.md) |
| `Users & Roles` | `Permission Matrix` | `ent_permission_matrix` | Form `enterprise_permission_matrix` | [Permission matrix](16-permission-matrix.md) |
| `Configuration` | `Translations` | `ent_translations` | Form `translations_tabbed` | [Translations](17-translations.md) |
| `Configuration` | `Handling Unit Types` | `handling_unit_type_menu` | Form `handling_unit_type_list_form` | [Handling unit types](18-handling-unit-types.md) |
| `Integration` | `Event Registry` | `ent_event_registry_menu` | Form `ent_event_registry_list_form` | [Event registry](20-event-registry.md) |
| `Integration` | `Event Monitor` | `ent_integration_event_menu` | Form `ent_integration_event_list_form` | [Event monitor](21-event-monitor.md) |
| `Integration` | `Subscribers` | `ent_integration_subscriber_menu` | Form `ent_integration_subscriber_list_form` | [Subscribers](22-subscribers.md) |
| `Integration` | `Delivery Log` | `ent_event_delivery_menu` | Form `ent_event_delivery_list_form` | [Delivery log](23-delivery-log.md) |

Source: the menu `Enterprise` (menu id 3) in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql` (table `menu_items`) and the events `nav_ent_*` and `nav_handling_unit_type_list` in table `ui_event`.
The first group in the sidebar, `Dashboard` (`ent_dashboard`), is not described here.

### Warehouse definitions and owners

`Warehouses` opens the Enterprise warehouse administration form. Registration
creates an inactive warehouse definition; it does not provision a PostgreSQL
schema. The list reports whether the schema is ready, and activation is refused
until deployment preparation is complete.

Owners are maintained in the **warehouse** sidebar (`owner_list`) after a
warehouse is selected. They are stored inside that warehouse's schema, so the
old `ent_owners` placeholder is inactive and is not rendered in Enterprise.

## Which items you see

The sidebar hides an item when either of these is true (`crates/services/web-ui-server/src/components/partials/sidenav.rs:91`):

1. The role has a `menu_item` permission row for the item and its **R** (read) bit is off. No row at all means the item is shown.
2. The form behind the item is closed to the role (`MetaCache::may_read_form`, `crates/services/web-ui-server/src/meta/cache.rs:3221`). A form is closed only when some role has a `form` row for it and this role has none, or has all four bits off.

A hidden item also cannot be opened by its address (`navigation_handler.rs:54`).
An administrator edits these rows in [Permission matrix](16-permission-matrix.md).

## What a button needs

A button works only when all the gates are open.

| Gate | Where it is checked | Refusal |
|---|---|---|
| The form may be opened | `services/form_access.rs` | `Your role may not open this form.` |
| The web action behind the button may run | `extensions/tx_helper.rs`, `check_action_chain_permissions` | `Forbidden("{action}")` |
| The API method behind the button may run | app-server `check_api_call` | HTTP 403 with the method name |

The details, with the default role lists, are on [Who can do what](91-who-can-do-what.md).

## Pages in this section

**Screens**

[Users list](10-users-list.md), [User card: General tab](11-user-general-tab.md), [Warehouses & Roles tab](12-user-warehouses-and-roles-tab.md), [API Keys tab](13-user-api-keys-tab.md), [Roles](14-roles.md), [Audit log](15-audit-log.md), [Permission matrix](16-permission-matrix.md), [Translations](17-translations.md), [Handling unit types](18-handling-unit-types.md), [Event registry](20-event-registry.md), [Event monitor](21-event-monitor.md), [Subscribers](22-subscribers.md), [Delivery log](23-delivery-log.md).

**Tasks**

[Creating a user](30-creating-a-user.md), [Resetting a password](31-resetting-a-password.md), [Locking or disabling an account](32-locking-or-disabling-an-account.md), [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md), [Deleting a user](34-deleting-a-user.md), [Generating an API key](35-generating-an-api-key.md), [Revoking an API key](36-revoking-an-api-key.md), [Creating a role](37-creating-a-role.md), [Changing permissions in the matrix](38-changing-permissions-in-the-matrix.md), [Translating a label or message](39-translating-a-label-or-message.md), [Creating a handling unit type](40-creating-a-handling-unit-type.md), [Adding an event type](41-adding-an-event-type.md), [Adding a subscriber](42-adding-a-subscriber.md), [Finding out why an event was not delivered](43-finding-why-an-event-was-not-delivered.md).

**Reference**

[User types and statuses](90-user-types-and-statuses.md), [Who can do what](91-who-can-do-what.md), [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md), [Event and delivery statuses](93-event-and-delivery-statuses.md), [Messages catalogue](94-messages-catalogue.md).

## Related pages

- [Users list](10-users-list.md)
- [Who can do what](91-who-can-do-what.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- Administrator guide: [Users, roles and permissions](../../admin/02-users-roles-permissions.md), [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `list_user_warehouses` (fills the warehouse switcher). RF terminal: none.
