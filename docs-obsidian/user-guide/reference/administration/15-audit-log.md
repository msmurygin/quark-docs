# Audit log

The `Audit Log` screen shows the security events of the company: who changed users, roles, permissions and API keys, and which calls were refused because the role lacked the right.
It is a read-only list.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Configuration > Users & Roles > Audit Log`.

The menu item is `ent_audit_log`. It opens the form `enterprise_audit_log`. The data comes from the view `enterprise.audit_log_view` (table `enterprise.audit_log`).

## Toolbar

| Button | What it does |
|---|---|
| `Refresh` | Reads the list again. |

There is no button to add, change or delete a row. The table is written only by the server.

## Columns

All columns are read only. The filter bar offers the filters named in the last column.

| Label | Column | Type | Visible | Filter | What it shows |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | No | | The row id. |
| `Time` | `event_time` | Date and time | Yes | Date | When the event was written. |
| `Event` | `event_kind` | Text | Yes | Set | The kind of event. See the next table. |
| `Resource Type` | `resource_type` | Text | Yes | Set | `api`, for refused calls. Empty for the change events. |
| `Resource` | `resource_code` | Text | No | Text | The API method that was refused. |
| `Bit` | `required_bit` | Text | Yes | | Why the call was refused: `can_execute` (the role lacks the right) or `no_role` (the user has no role). |
| `User` | `username` | Text | Yes | | The login of the actor. Empty for events with no actor. |
| `Role` | `role_code` | Text | Yes | | The role of the actor, for refusals. |
| `Detail` | `detail` | JSON, shown as a summary | Yes | | The details of the event. See below. |
| `Warehouse` | `warehouse_code` | Text | Yes | Set | The warehouse of the event. Empty for enterprise-wide events. |
| `Target` | `target_label` | Text | Yes | Text | The row that was changed: a role code, a login, `login @ warehouse` for an assignment, `ROLE / type:code` for a permission, the key prefix for an API key. Empty (shown as a dash) when the target is unknown or has a composite key. |
| `Resource` | `resource_label` | Text | Yes | Text | A copy of `Resource`. There is no separate catalogue of labels yet. |

The view is defined in `crates/libs/wms-lib-sql/sql/wms-enterprise/migrations/001_baseline.sql:356`.
The `Event` filter reads its values from `list_audit_event_kinds`, so it lists the kinds that exist in your data.

## Event kinds

The database accepts only these kinds (check constraint `audit_log_event_kind_chk`, migration `010_mutation_audits_are_allowed_again.sql`).

| Event | Written when | Written by |
|---|---|---|
| `permission_denied` | An API call is refused because the role lacks the right, or the user has no role. | `check_api_call`, `crates/libs/wms-lib-auth/src/authorization/api_check.rs:352` |
| `user_mutation` | A user is created, changed or deleted, or a password is changed. | `UserBmc` |
| `role_mutation` | A role is created, changed or deleted. | `RoleBmc` |
| `user_warehouse_mutation` | A warehouse assignment is created, changed or deleted. | `UserWarehouseBmc` |
| `role_permission_mutation` | A permission cell is changed in the [Permission matrix](16-permission-matrix.md). | `batch_upsert_permission_matrix` |
| `api_key_mutation` | An API key is generated or revoked. | `user_api_key_rpc.rs` |
| `admin_rbac_reseed` | The permission catalogue is reseeded. | `app-server/src/web/admin_rbac.rs:207` |
| `task_mutation` | A task is changed. | `TaskBmc` |
| `rf_screen_mutation`, `rf_screen_revision_mutation` | An RF screen is published or reverted. | RF screen code |
| `studio_meta_create`, `api_key_created`, `api_key_revoked` | Allowed by the constraint. No code that writes them was found. | |

### What `Detail` holds

For a change event, `detail` has five keys (`crates/libs/wms-lib-auth/src/authorization/audit.rs:143`):

| Key | Meaning |
|---|---|
| `target_table` | The table that changed, for example `role`. |
| `target_pk` | The key of the row. A list for a composite key. |
| `action` | `insert`, `update` or `delete`. |
| `before` | The row before the change, or empty for an insert. |
| `after` | The row after the change, or empty for a delete. |

For a refusal, `detail` holds `{"scope": "enterprise"}` or `{"scope": "warehouse"}`.

Secrets are not written. The keys `key_hash`, `password_hash`, `token_salt`, `plaintext_key`, `pwd` and `pwd_salt` are replaced by `[redacted]` (`audit.rs`, constant `REDACT_KEYS`).
For a user, only an allowed list of columns is written, so the password hash never appears (`UserBmc::mutation_audit_columns`, `user.rs:446`).
Whether a password changed is visible through `pwd_changed_at`.
Migration `018_user_mutation_audit_holds_no_credentials.sql` removed password hashes that older versions had written.

The `Detail` column shows the JSON as compact text in small grey type. A text longer than 60 characters is cut to its first 57 characters and `…`; the full text is in the tooltip (renderer `JsonSummaryRenderer`, `crates/services/web-ui-server/src/rendering/cell_renderer.rs`, function `json_summary`). The list loads when `detail` is a JSON object: the server turns an object in a text field into its compact JSON text (`BioValue::decode_from_server`, F-05, commit `49bbbf5f1`). Before the fix the whole list answered HTTP 503 as soon as one row had a JSON `detail`.

## Good to know

- **Audit never blocks work.** The write is best effort. If the write fails, the change still happens and the failure goes only to the server log (`audit.rs`, function `log_event`).
- **Refused calls are only logged for the API.** A button refused by the web action gate (`Forbidden("{action}")`) is not written to this table by the code read for this page.
- **There is no clean-up.** No job that deletes old rows of `audit_log` was found.
- **Rows pin their user and role.** The foreign keys `audit_log_user_id_fkey` and `audit_log_role_id_fkey` have no `ON DELETE` rule. A user or a role that appears in the log cannot be deleted (see [Deleting a user](34-deleting-a-user.md)).
- **Checks in `log_only` mode.** When the server runs with `RBAC_ENFORCEMENT_MODE=log_only`, refused calls are written here but not blocked (`crates/libs/wms-lib-auth/src/authorization/enforcement.rs`).

## Who can use it

The API methods `list_audit_log`, `get_audit_log`, `count_audit_log` and `list_audit_event_kinds` are open to the default roles `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`
(`crates/services/app-server/src/web/rpcs/audit_log_rpc.rs:7`).
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Permission matrix](16-permission-matrix.md)
- [Who can do what](91-who-can-do-what.md)
- API: `list_audit_log`, `get_audit_log`, `count_audit_log`, `list_audit_event_kinds`. RF terminal: none.
