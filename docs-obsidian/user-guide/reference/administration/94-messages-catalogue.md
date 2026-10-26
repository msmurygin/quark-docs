# Messages catalogue

This page lists the messages that the Enterprise screens show, grouped by the page that explains them.
A part in `{braces}` is replaced by a value. A message that starts with a small letter is written so in the code.

Messages made by the generic save, delete and grid actions use the display name that the button binding gives (for example `User`, `Role`, `Event Registry`, `Subscriber`, `Handling Unit Type`).
Source: `crates/libs/wms-lib-customization-core/src/models.rs:649` and `crates/services/web-ui-server/src/extensions/generic/`.

## Generic buttons (all screens)

| Message | When |
|---|---|
| `{name} record created successfully` | `Save` on a new record. For example `User record created successfully`. |
| `{name} record saved successfully` | `Save` on an existing record that had changes. Nothing is said when there was nothing to save. |
| `New {name} initialized` | `New`. |
| `New record discarded` | A new, unsaved record is thrown away. |
| `{n} {name} record(s) deleted` | `Delete` on ticked rows of a list, where the record uses a single-row delete method. For example `2 Subscriber record(s) deleted`. |
| `{name} deleted` | `Delete` on a card. |
| `Please select at least one row to delete` | `Delete` with no row ticked. |
| `No changes to save` | `Save` on a grid with nothing changed. |
| `Changes saved` | A grid save that saved changed cells. |
| `New row saved` and `New row saved; dirty cells saved` | A grid save that also saved a new row. |
| `{Field} is required` | A required field is empty on a screen that checks it before saving, for example `Default text is required` on a translation. The field name is the column name with capitals and spaces. |
| `Cannot save: parent record not saved. Please save the parent first.` | You add a row to a child grid (for example `Assign`) before the parent record exists. |

Pages: [Users list](10-users-list.md), [Roles](14-roles.md), [Translations](17-translations.md).

## Sign-in and access

| Message | When | Page |
|---|---|---|
| `Invalid username or password` | Any failed sign-in, whatever the real cause. | [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md) |
| `Password must have at least 8 characters.` | The sign-in form rejects a password shorter than 6 characters. The text says 8; the rule is 6. | [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md) |
| `Session expired. Please login again.` | The session has run out. | [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md) |
| `Enterprise access requires ADMIN role` | You pick Enterprise in the warehouse switcher without holding the role `ADMIN` anywhere. | [Enterprise sidebar](00-administration-overview.md) |
| `Your role may not open this form.` | The form is closed to your role. | [Who can do what](91-who-can-do-what.md) |
| `You hold no role on this warehouse.` | You have no role in the active warehouse. | [Who can do what](91-who-can-do-what.md) |
| `Choose a warehouse first.` | No warehouse is active. | [Who can do what](91-who-can-do-what.md) |
| `Your role may not do this.` | A command from a component screen is refused. | [Who can do what](91-who-can-do-what.md) |
| `Forbidden("{action}")` | A button's web action is closed to your role. `{action}` is the action name, for example `generic_save`. | [Who can do what](91-who-can-do-what.md) |
| HTTP 403 with the API method name | An API call is refused because the role lacks **X** on that method. The call is written to the [Audit log](15-audit-log.md). | [Who can do what](91-who-can-do-what.md) |
| HTTP 403 with the user id | The user has no role at all in the scope. | [Who can do what](91-who-can-do-what.md) |
| HTTP 503 | The permission check itself failed. Nothing is allowed meanwhile. | [Who can do what](91-who-can-do-what.md) |
| `permission_matrix_save` (inside `Forbidden`) | A save to the Permission Matrix by a role that may not edit it. | [Permission matrix](16-permission-matrix.md) |

## Users

| Message | When | Page |
|---|---|---|
| `User {username} already exists` | The login is taken. | [User card, General tab](11-user-general-tab.md) |
| `Only a superuser can set a user's type to {type}` | You are not a super-user and you changed `Type`. | [User types and statuses](90-user-types-and-statuses.md) |
| `Only a superuser can change or delete the superuser account {id}` | You are not a super-user and the account is `Admin` or `Sys`. | [User types and statuses](90-user-types-and-statuses.md) |
| `Duplicate entry on {table} (constraint {constraint})` | A unique key is hit: a second row for the same user and warehouse (`user_warehouse_user_id_warehouse_id_key`), a second default warehouse (`idx_user_warehouse_default`), a duplicate role code, and so on. | [Warehouses & Roles](12-user-warehouses-and-roles-tab.md) |

## Roles

| Message | When | Page |
|---|---|---|
| `System role {id} cannot be renamed, deactivated, or deleted` | A save or delete tries to change a built-in role. The role is unchanged; a mixed bulk delete leaves every selected role unchanged. | [Roles](14-roles.md) |

## API keys

| Message | When | Page |
|---|---|---|
| `API key generated — copy it now, it won't be shown again.` | A key was made. | [API Keys tab](13-user-api-keys-tab.md) |
| `API key revoked.` | A key was revoked. | [API Keys tab](13-user-api-keys-tab.md) |
| `No user selected — open a user detail first.` | `Generate` ran without a user card open. | [API Keys tab](13-user-api-keys-tab.md) |
| `No API key row is selected.` | `Revoke` with no row ticked. | [API Keys tab](13-user-api-keys-tab.md) |
| `generated API key {id} was revoked because its one-time value could not be displayed` | The new key could not be shown, so it was revoked at once. | [API Keys tab](13-user-api-keys-tab.md) |
| `Copied` | The key text was copied from the `API Key Created` window. | [API Keys tab](13-user-api-keys-tab.md) |

## Permission matrix

| Message | When |
|---|---|
| `Failed to update permission` (red, with `Retry`) | A cell could not be saved. The switch flips back. |
| `Rolled back · {reason}` | The reason line of the same failure. |
| `This row is no longer on screen` and `Search, clear filters, or page back to it, then try again.` | `Retry` was pressed after the row left the screen. |
| `Invalid CSV: {reason}` | The file has no header with the required columns. |
| `No matching rows in CSV.` | No line names a role that is on screen. |
| `Apply {n} permission changes from CSV?` | The confirmation before an import. |
| `Imported {n} cells across {m} roles.` | An import finished. |
| `Import failed: {reason}` | An import was refused. |

Page: [Permission matrix](16-permission-matrix.md). Keys: `permmatrix.*` in the table `message_keys`.

## Roles and users lists

| Message | Where |
|---|---|
| `Search by login, name, email…`, `All statuses`, `All roles`, `All warehouses`, `No users match filters`, `users` | [Users list](10-users-list.md) |
| `Search roles…`, `SYS`, `Built-in role`, `members`, `resources`, `roles`, `No roles match` | [Roles](14-roles.md) |

## Handling unit types, events and subscribers

| Message | When | Page |
|---|---|---|
| A check-constraint error naming `ck_hut_positions`, `ck_hut_holds_something`, `ck_hut_physics_not_negative` or `ck_hut_code_prefix` | A rule of the type is broken. | [Handling unit types](18-handling-unit-types.md) |
| `Duplicate entry on handling_unit_type (constraint ...)` | The code is taken. | [Handling unit types](18-handling-unit-types.md) |
| `Duplicate entry on event_registry (constraint ...)` | The event code is taken. | [Event registry](20-event-registry.md) |
| `{n} Event Registry record(s) deleted` | `Delete` on the registry list. | [Event registry](20-event-registry.md) |
| `{n} Subscriber record(s) deleted` | `Delete` on the subscriber list. | [Subscribers](22-subscribers.md) |
| `No webhook URL configured` | A webhook subscriber has no URL (in the Delivery log, `Last Error`). | [Subscribers](22-subscribers.md) |
| `blocked webhook destination` | The webhook resolved to a private or special-purpose address that is not explicitly allowed by app-server configuration. | [Subscribers](22-subscribers.md) |
| `HTTP {code}: {answer}` | The webhook answered with an error status (in `Last Error`). | [Delivery log](23-delivery-log.md) |
| `unknown delivery method {value}` | The subscriber's `Delivery` is not known to the worker (in `Last Error`). | [Subscribers](22-subscribers.md) |
| `no internal handler registered for subscriber {code}` | An `internal` subscriber has a code the system does not handle (in `Last Error`). | [Subscribers](22-subscribers.md) |

## Related pages

- [Who can do what](91-who-can-do-what.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
