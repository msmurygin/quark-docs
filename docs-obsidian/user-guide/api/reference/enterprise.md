# Enterprise methods

Users, roles and permissions, user warehouses, API keys, audit log, system settings, supervisor override grants, projects, dashboard settings, handling unit types and the log level switch. These methods work across all warehouses.

This page documents 78 methods of the `enterprise` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **project**: [create_project](#create_project), [list_projects](#list_projects), [update_project](#update_project), [delete_project](#delete_project)
- **user**: [me](#me), [create_user](#create_user), [get_user](#get_user), [list_user](#list_user), [count_user](#count_user), [update_user](#update_user), [delete_user](#delete_user), [delete_many_user](#delete_many_user)
- **sys_settings**: [create_system_settings](#create_system_settings), [get_system_settings](#get_system_settings), [list_system_settings](#list_system_settings), [update_system_settings](#update_system_settings), [delete_system_settings](#delete_system_settings)
- **warehouse**: [warehouse_admin_list](#warehouse_admin_list), [warehouse_admin_get](#warehouse_admin_get), [warehouse_admin_create](#warehouse_admin_create), [warehouse_admin_update](#warehouse_admin_update), [list_user_warehouses](#list_user_warehouses), [get_warehouse_defaults](#get_warehouse_defaults), [warehouse_settings_list](#warehouse_settings_list), [warehouse_set_shared_tote_mixed_owners](#warehouse_set_shared_tote_mixed_owners), [warehouse_set_station_route_abandoned_after](#warehouse_set_station_route_abandoned_after)
- **role**: [create_role](#create_role), [get_role](#get_role), [list_role](#list_role), [update_role](#update_role), [delete_role](#delete_role), [delete_many_role](#delete_many_role), [count_role](#count_role), [create_role_permission](#create_role_permission), [get_role_permission](#get_role_permission), [list_role_permission](#list_role_permission), [update_role_permission](#update_role_permission), [delete_role_permission](#delete_role_permission), [delete_many_role_permission](#delete_many_role_permission), [count_role_permission](#count_role_permission)
- **override_grant**: [supervisor_override_grant](#supervisor_override_grant)
- **user_warehouse**: [create_user_warehouse](#create_user_warehouse), [get_user_warehouse](#get_user_warehouse), [list_user_warehouse](#list_user_warehouse), [update_user_warehouse](#update_user_warehouse), [delete_user_warehouse](#delete_user_warehouse), [delete_many_user_warehouse](#delete_many_user_warehouse), [count_user_warehouse](#count_user_warehouse)
- **user_api_key**: [generate_user_api_key](#generate_user_api_key), [revoke_user_api_key](#revoke_user_api_key), [get_user_api_key](#get_user_api_key), [list_user_api_key](#list_user_api_key), [count_user_api_key](#count_user_api_key)
- **audit_log**: [get_audit_log](#get_audit_log), [list_audit_log](#list_audit_log), [count_audit_log](#count_audit_log), [list_audit_event_kinds](#list_audit_event_kinds)
- **role_permission**: [batch_update_role_permissions](#batch_update_role_permissions), [list_role_permissions_tree](#list_role_permissions_tree)
- **permission_matrix**: [list_permission_matrix](#list_permission_matrix), [batch_upsert_permission_matrix](#batch_upsert_permission_matrix)
- **dashboard**: [dashboard_snapshot_rpc](#dashboard_snapshot_rpc)
- **dashboard_setting**: [update_dashboard_setting](#update_dashboard_setting), [create_dashboard_metric_threshold](#create_dashboard_metric_threshold), [update_dashboard_metric_threshold](#update_dashboard_metric_threshold), [dashboard_metric_threshold_delete](#dashboard_metric_threshold_delete), [dashboard_setting_get](#dashboard_setting_get), [dashboard_setting_list](#dashboard_setting_list), [dashboard_metric_threshold_get](#dashboard_metric_threshold_get), [dashboard_metric_threshold_list](#dashboard_metric_threshold_list), [dashboard_metric_catalogue](#dashboard_metric_catalogue)
- **log_level**: [set_log_level](#set_log_level), [get_log_level](#get_log_level)
- **handling_unit_type**: [create_handling_unit_type](#create_handling_unit_type), [get_handling_unit_type](#get_handling_unit_type), [list_handling_unit_type](#list_handling_unit_type), [count_handling_unit_type](#count_handling_unit_type), [update_handling_unit_type](#update_handling_unit_type)

## Module: project

### create_project

Create a project.

| | |
|---|---|
| Context / module | enterprise / project |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_project` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.
- The result is returned as is. It is not wrapped in a `data` object.

**Parameters** (the keys of `params`)

The catalog lists no parameters for this method because it registers an empty schema by hand. The table below is read from the handler source (`project_rpc.rs`).

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ProjectForCreate) | yes |  |
| `data.name` | string | yes |  |

**Result**

The result is returned as is. It is not wrapped in a `data` object. The fields below are read from the `Project` struct in `crates/libs/wms-lib-core/src/model/project.rs`, because the catalog gives only an empty object.

| Field | Type | Always present | Description |
|---|---|---|---|
| `result.id` | integer (int64) | yes |  |
| `result.owner_id` | integer (int64) | yes | The user who created the project. |
| `result.name` | string | yes |  |
| `result.add_who` | integer (int64) | yes |  |
| `result.add_when` | string (RFC 3339) | yes |  |
| `result.mod_who` | integer (int64) | yes |  |
| `result.mod_when` | string (RFC 3339) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_project",
  "params": {
    "data": {
      "name": "<name>"
    }
  }
}'
```

### delete_project

Delete a project.

| | |
|---|---|
| Context / module | enterprise / project |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_project` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.
- The result is returned as is. It is not wrapped in a `data` object.

**Parameters** (the keys of `params`)

The catalog lists no parameters for this method because it registers an empty schema by hand. The table below is read from the handler source (`project_rpc.rs`).

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes |  |

**Result**

The result is returned as is. It is not wrapped in a `data` object. The fields below are read from the `Project` struct in `crates/libs/wms-lib-core/src/model/project.rs`, because the catalog gives only an empty object.

| Field | Type | Always present | Description |
|---|---|---|---|
| `result.id` | integer (int64) | yes |  |
| `result.owner_id` | integer (int64) | yes | The user who created the project. |
| `result.name` | string | yes |  |
| `result.add_who` | integer (int64) | yes |  |
| `result.add_when` | string (RFC 3339) | yes |  |
| `result.mod_who` | integer (int64) | yes |  |
| `result.mod_when` | string (RFC 3339) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_project",
  "params": {
    "id": 1
  }
}'
```

### list_projects

List projects (filtered).

| | |
|---|---|
| Context / module | enterprise / project |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_projects` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- The result is returned as is. It is not wrapped in a `data` object.

**Parameters** (the keys of `params`)

The catalog lists no parameters for this method because it registers an empty schema by hand. The table below is read from the handler source (`project_rpc.rs`).

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no |  |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no |  |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |
| `list_options.order_bys` | string or array of string | no |  |

**Result**

The result is returned as is. It is not wrapped in a `data` object. The fields below are read from the `Project` struct in `crates/libs/wms-lib-core/src/model/project.rs`, because the catalog gives only an empty object.

| Field | Type | Always present | Description |
|---|---|---|---|
| `result[].id` | integer (int64) | yes |  |
| `result[].owner_id` | integer (int64) | yes | The user who created the project. |
| `result[].name` | string | yes |  |
| `result[].add_who` | integer (int64) | yes |  |
| `result[].add_when` | string (RFC 3339) | yes |  |
| `result[].mod_who` | integer (int64) | yes |  |
| `result[].mod_when` | string (RFC 3339) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_projects",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_project

Update a project.

| | |
|---|---|
| Context / module | enterprise / project |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_project` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.
- The result is returned as is. It is not wrapped in a `data` object.

**Parameters** (the keys of `params`)

The catalog lists no parameters for this method because it registers an empty schema by hand. The table below is read from the handler source (`project_rpc.rs`).

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes |  |
| `data` | object (ProjectForUpdate) | yes |  |
| `data.name` | string or null | no |  |
| `data.owner_id` | integer (int64) or null | no |  |

**Result**

The result is returned as is. It is not wrapped in a `data` object. The fields below are read from the `Project` struct in `crates/libs/wms-lib-core/src/model/project.rs`, because the catalog gives only an empty object.

| Field | Type | Always present | Description |
|---|---|---|---|
| `result.id` | integer (int64) | yes |  |
| `result.owner_id` | integer (int64) | yes | The user who created the project. |
| `result.name` | string | yes |  |
| `result.add_who` | integer (int64) | yes |  |
| `result.add_when` | string (RFC 3339) | yes |  |
| `result.mod_who` | integer (int64) | yes |  |
| `result.mod_when` | string (RFC 3339) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_project",
  "params": {
    "id": 1,
    "data": {
      "name": "<name>"
    }
  }
}'
```

## Module: user

### count_user

Count user — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_user` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].username` | string filter | no | Filter on `username`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_user",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_user

Create a new user — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_user` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (UserForCreate) | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.full_name` | string or null | no | What an admin can meaningfully set when creating an account through the Users screen. |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.pwd_clear` | string | yes | `pwd` is what the Users screen's field is called (form 171), as on `UserForUpdate::pwd_clear`. |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited or null | no | `None` leaves the column's DB default (`Active`) in place. |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent or null | no | The New form's Type dropdown. |
| `data.username` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": UserInfo }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data.api_access` | boolean | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.failed_login_attempts` | integer (int32) | yes |  |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_failed_login_at` | string or null | no |  |
| `data.last_login_at` | string or null | no |  |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data.pwd_changed_at` | string or null | no |  |
| `data.rf_login` | boolean | yes |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_user",
  "params": {
    "data": {
      "date_format": "<date_format>",
      "email": "<email>",
      "locale": "<locale>",
      "mode": "<mode>",
      "pwd_clear": "<pwd_clear>",
      "timezone": "<timezone>",
      "username": "<username>"
    }
  }
}'
```

### delete_many_user

Delete multiple user by IDs — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_user` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | array of integer (int64) | yes | Record IDs |

**Result**

The `result` member of the response is: `{ "data": integer (uint64) }`

Type of `data`: integer (uint64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_many_user",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_user

Delete a user by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_user` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": UserInfo }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data.api_access` | boolean | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.failed_login_attempts` | integer (int32) | yes |  |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_failed_login_at` | string or null | no |  |
| `data.last_login_at` | string or null | no |  |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data.pwd_changed_at` | string or null | no |  |
| `data.rf_login` | boolean | yes |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_user",
  "params": {
    "id": 1
  }
}'
```

### get_user

Get a user by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_user` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": UserInfo }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data.api_access` | boolean | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.failed_login_attempts` | integer (int32) | yes |  |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_failed_login_at` | string or null | no |  |
| `data.last_login_at` | string or null | no |  |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data.pwd_changed_at` | string or null | no |  |
| `data.rf_login` | boolean | yes |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_user",
  "params": {
    "id": 1
  }
}'
```

### list_user

List user — CRUD.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_user` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].username` | string filter | no | Filter on `username`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [UserInfo] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data[].api_access` | boolean | yes |  |
| `data[].date_format` | string | yes |  |
| `data[].email` | string | yes |  |
| `data[].employee_id` | string or null | no |  |
| `data[].failed_login_attempts` | integer (int32) | yes |  |
| `data[].full_name` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].last_failed_login_at` | string or null | no |  |
| `data[].last_login_at` | string or null | no |  |
| `data[].locale` | string | yes |  |
| `data[].mode` | string | yes |  |
| `data[].password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data[].pwd_changed_at` | string or null | no |  |
| `data[].rf_login` | boolean | yes |  |
| `data[].status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data[].timezone` | string | yes |  |
| `data[].typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data[].username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_user",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### me

Get current user info.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | Login required. No permission row is checked. |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- You must log in. The method skips the permission check, so every logged-in user can call it.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": UserInfo }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data.api_access` | boolean | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.failed_login_attempts` | integer (int32) | yes |  |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_failed_login_at` | string or null | no |  |
| `data.last_login_at` | string or null | no |  |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data.pwd_changed_at` | string or null | no |  |
| `data.rf_login` | boolean | yes |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "me",
  "params": {}
}'
```

### update_user

Update an account through the guarded security model; audit facts are read-only.

| | |
|---|---|
| Context / module | enterprise / user |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_user` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (UserUpdateApi) | yes | Security-owned user patch. |
| `data.api_access` | boolean | no |  |
| `data.date_format` | string | no |  |
| `data.email` | string | no |  |
| `data.employee_id` | string or null | no |  |
| `data.full_name` | string or null | no |  |
| `data.locale` | string | no |  |
| `data.mode` | string | no |  |
| `data.pwd_clear` | string | no |  |
| `data.rf_login` | boolean | no |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | no | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | no |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | no | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": UserInfo }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string or null | no | When the account was created — the AUDIT block's "Created" field. |
| `data.api_access` | boolean | yes |  |
| `data.date_format` | string | yes |  |
| `data.email` | string | yes |  |
| `data.employee_id` | string or null | no |  |
| `data.failed_login_attempts` | integer (int32) | yes |  |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_failed_login_at` | string or null | no |  |
| `data.last_login_at` | string or null | no |  |
| `data.locale` | string | yes |  |
| `data.mode` | string | yes |  |
| `data.password_age_days` | integer (int64) or null | no | "Password age" for the AUDIT block — derived from `pwd_changed_at`, in whole days. |
| `data.pwd_changed_at` | string or null | no |  |
| `data.rf_login` | boolean | yes |  |
| `data.status` | one of: Active \| Locked \| Disabled \| Invited | yes | Mirror of the `user_status` PostgreSQL enum (`enterprise` migration 044, tenant-manager migration 005). |
| `data.timezone` | string | yes |  |
| `data.typ` | one of: User \| Admin \| Sys \| Agent | yes | Mirror of the `enterprise.user_typ` PostgreSQL enum (migration 021). |
| `data.username` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_user",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: sys_settings

### create_system_settings

Create a new system_settings — CRUD.

| | |
|---|---|
| Context / module | enterprise / sys_settings |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_system_settings` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SystemSettingsForCreate) | yes |  |
| `data.config_key` | string | yes |  |
| `data.config_value` | string | yes |  |
| `data.default_value` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.editable` | boolean | yes |  |

**Result**

The `result` member of the response is: `{ "data": SystemSettings }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.config_key` | string | yes |  |
| `data.config_value` | string | yes |  |
| `data.default_value` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.editable` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "config_key": "<config_key>",
      "config_value": "<config_value>",
      "default_value": "<default_value>",
      "editable": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_system_settings",
  "params": {
    "data": {
      "config_key": "<config_key>",
      "config_value": "<config_value>",
      "default_value": "<default_value>",
      "editable": false
    }
  }
}'
```

### delete_system_settings

Delete a system_settings by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / sys_settings |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_system_settings` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SystemSettings }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.config_key` | string | yes |  |
| `data.config_value` | string | yes |  |
| `data.default_value` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.editable` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "config_key": "<config_key>",
      "config_value": "<config_value>",
      "default_value": "<default_value>",
      "editable": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_system_settings",
  "params": {
    "id": 1
  }
}'
```

### get_system_settings

Get a system_settings by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / sys_settings |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_system_settings` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SystemSettings }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.config_key` | string | yes |  |
| `data.config_value` | string | yes |  |
| `data.default_value` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.editable` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "config_key": "<config_key>",
      "config_value": "<config_value>",
      "default_value": "<default_value>",
      "editable": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_system_settings",
  "params": {
    "id": 1
  }
}'
```

### list_system_settings

List system_settings — CRUD.

| | |
|---|---|
| Context / module | enterprise / sys_settings |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_system_settings` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].config_key` | string filter | no | Filter on `config_key`. |
| `filters[].config_value` | string filter | no | Filter on `config_value`. |
| `filters[].default_value` | string filter | no | Filter on `default_value`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].editable` | boolean filter | no | Filter on `editable`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SystemSettings] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].config_key` | string | yes |  |
| `data[].config_value` | string | yes |  |
| `data[].default_value` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].editable` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_system_settings",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_system_settings

Update the value of an editable system setting; metadata is immutable.

| | |
|---|---|
| Context / module | enterprise / sys_settings |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_system_settings` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (SystemSettingsUpdateApi) | yes | Only the current value is operator-owned. |
| `data.config_value` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": SystemSettings }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.config_key` | string | yes |  |
| `data.config_value` | string | yes |  |
| `data.default_value` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.editable` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "config_key": "<config_key>",
      "config_value": "<config_value>",
      "default_value": "<default_value>",
      "editable": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_system_settings",
  "params": {
    "id": 1,
    "data": {
      "config_value": "<config_value>"
    }
  }
}'
```

## Module: warehouse

### get_warehouse_defaults

Get defaults for the active warehouse.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_warehouse_defaults` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": object (WarehouseDefaults) or null }`

Type of `data`: object (WarehouseDefaults) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {}
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_warehouse_defaults",
  "params": {}
}'
```

### list_user_warehouses

List warehouses accessible by a user (user_id optional → caller's Ctx.user_id by default).

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | Login required. No permission row is checked. |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- You must log in. The method skips the permission check, so every logged-in user can call it.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ParamsListUserWarehouses) | yes |  |
| `data.q` | string or null | no | Reserved for future substring filter (rf-go's F2 picker convention sends `q`). |
| `data.user_id` | integer (int64) or null | no | Target user_id. |

**Result**

The `result` member of the response is: `{ "data": [UserWarehouseWithDetails] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].is_default` | boolean | yes |  |
| `data[].role_code` | string | yes |  |
| `data[].role_id` | integer (int64) | yes |  |
| `data[].schema_name` | string | yes |  |
| `data[].user_warehouse_id` | integer (int64) | yes |  |
| `data[].warehouse_code` | string | yes |  |
| `data[].warehouse_id` | integer (int64) | yes |  |
| `data[].warehouse_name` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_user_warehouses",
  "params": {
    "data": {}
  }
}'
```

### warehouse_admin_create

Create an inactive warehouse and provision its complete application schema.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `warehouse_admin_create` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (WarehouseAdminCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.is_active` | boolean or null | no | Accepted for compatibility with generic forms, but always forced false. |
| `data.length_uom` | string | yes |  |
| `data.name` | string | yes |  |
| `data.schema_name` | string | yes |  |
| `data.volume_uom` | string | yes |  |
| `data.weight_uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": WarehouseAdminRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.length_uom` | string | yes |  |
| `data.name` | string | yes |  |
| `data.readiness` | one of: ready \| needs_provisioning \| outdated \| invalid | yes |  |
| `data.readiness_label` | string | yes |  |
| `data.readiness_reason` | string | yes |  |
| `data.schema_name` | string | yes |  |
| `data.volume_uom` | string | yes |  |
| `data.weight_uom` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "length_uom": "<length_uom>",
      "name": "<name>",
      "readiness": "ready",
      "readiness_label": "<readiness_label>",
      "readiness_reason": "<readiness_reason>",
      "schema_name": "<schema_name>",
      "volume_uom": "<volume_uom>",
      "weight_uom": "<weight_uom>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_admin_create",
  "params": {
    "data": {
      "code": "<code>",
      "length_uom": "<length_uom>",
      "name": "<name>",
      "schema_name": "<schema_name>",
      "volume_uom": "<volume_uom>",
      "weight_uom": "<weight_uom>"
    }
  }
}'
```

### warehouse_admin_get

Read one warehouse definition and schema readiness in Enterprise administration.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `warehouse_admin_get` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": WarehouseAdminRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.length_uom` | string | yes |  |
| `data.name` | string | yes |  |
| `data.readiness` | one of: ready \| needs_provisioning \| outdated \| invalid | yes |  |
| `data.readiness_label` | string | yes |  |
| `data.readiness_reason` | string | yes |  |
| `data.schema_name` | string | yes |  |
| `data.volume_uom` | string | yes |  |
| `data.weight_uom` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "length_uom": "<length_uom>",
      "name": "<name>",
      "readiness": "ready",
      "readiness_label": "<readiness_label>",
      "readiness_reason": "<readiness_reason>",
      "schema_name": "<schema_name>",
      "volume_uom": "<volume_uom>",
      "weight_uom": "<weight_uom>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_admin_get",
  "params": {
    "id": 1
  }
}'
```

### warehouse_admin_list

List warehouse definitions and actual schema readiness in Enterprise administration.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `warehouse_admin_list` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [WarehouseAdminRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].length_uom` | string | yes |  |
| `data[].name` | string | yes |  |
| `data[].readiness` | one of: ready \| needs_provisioning \| outdated \| invalid | yes |  |
| `data[].readiness_label` | string | yes |  |
| `data[].readiness_reason` | string | yes |  |
| `data[].schema_name` | string | yes |  |
| `data[].volume_uom` | string | yes |  |
| `data[].weight_uom` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_admin_list",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### warehouse_admin_update

Rename or change warehouse activity; activation requires current schema migrations.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `warehouse_admin_update` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (WarehouseAdminUpdateApi) | yes | Strict flat command input: generic UI commands carry every operand in data. |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | no |  |
| `data.name` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": WarehouseAdminRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.length_uom` | string | yes |  |
| `data.name` | string | yes |  |
| `data.readiness` | one of: ready \| needs_provisioning \| outdated \| invalid | yes |  |
| `data.readiness_label` | string | yes |  |
| `data.readiness_reason` | string | yes |  |
| `data.schema_name` | string | yes |  |
| `data.volume_uom` | string | yes |  |
| `data.weight_uom` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "length_uom": "<length_uom>",
      "name": "<name>",
      "readiness": "ready",
      "readiness_label": "<readiness_label>",
      "readiness_reason": "<readiness_reason>",
      "schema_name": "<schema_name>",
      "volume_uom": "<volume_uom>",
      "weight_uom": "<weight_uom>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_admin_update",
  "params": {
    "data": {
      "id": 1
    }
  }
}'
```

### warehouse_set_shared_tote_mixed_owners

Set whether goods of several owners may share one station route's tote in the active warehouse.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `warehouse_set_shared_tote_mixed_owners` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SetSharedToteMixedOwners) | yes | Wire command: the value the person chose for the caller's warehouse. |
| `data.allows_mixed_owners` | boolean | yes | `true` — owners may share a tote; `false` — one owner per tote. |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": WarehouseSettingsRow }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.shared_tote_allows_mixed_owners` | boolean | yes | May goods of several owners lie in one station route's shared tote at once? |
| `data.station_route_abandoned_after_minutes` | integer (int32) | yes | Minutes with no activity on a station route — no stop under a live lease, no route or stop change — before the supervisor's board calls it abandoned and the supervisor's door finishes its totes. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "meta": {
      "idempotency_replayed": false
    },
    "data": {
      "code": "<code>",
      "id": 1,
      "name": "<name>",
      "shared_tote_allows_mixed_owners": false,
      "station_route_abandoned_after_minutes": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 42 | The idempotency key was used before with different data. Make a new key. |
| 400 | RF_ERROR, return_code 44 | The first call with this key is still running. Send the same call again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_set_shared_tote_mixed_owners",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "allows_mixed_owners": false
    }
  }
}'
```

### warehouse_set_station_route_abandoned_after

Set after how many minutes with no activity a station route counts as abandoned in the active warehouse.

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `warehouse_set_station_route_abandoned_after` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SetStationRouteAbandonedAfter) | yes | Wire command: the number of minutes the person typed for the caller's warehouse. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.minutes` | integer (int64) | yes | Minutes with no activity on a station route before it counts as abandoned; at least 1. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": WarehouseSettingsRow }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.shared_tote_allows_mixed_owners` | boolean | yes | May goods of several owners lie in one station route's shared tote at once? |
| `data.station_route_abandoned_after_minutes` | integer (int32) | yes | Minutes with no activity on a station route — no stop under a live lease, no route or stop change — before the supervisor's board calls it abandoned and the supervisor's door finishes its totes. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "meta": {
      "idempotency_replayed": false
    },
    "data": {
      "code": "<code>",
      "id": 1,
      "name": "<name>",
      "shared_tote_allows_mixed_owners": false,
      "station_route_abandoned_after_minutes": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 42 | The idempotency key was used before with different data. Make a new key. |
| 400 | RF_ERROR, return_code 44 | The first call with this key is still running. Send the same call again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_set_station_route_abandoned_after",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "minutes": 1
    }
  }
}'
```

### warehouse_settings_list

List the active warehouse with the rules its settings screen sets (one row; an id filter rereads it).

| | |
|---|---|
| Context / module | enterprise / warehouse |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `warehouse_settings_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [WarehouseSettingsRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].shared_tote_allows_mixed_owners` | boolean | yes | May goods of several owners lie in one station route's shared tote at once? |
| `data[].station_route_abandoned_after_minutes` | integer (int32) | yes | Minutes with no activity on a station route — no stop under a live lease, no route or stop change — before the supervisor's board calls it abandoned and the supervisor's door finishes its totes. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "warehouse_settings_list",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

## Module: role

### count_role

Count role — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_role` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_role",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### count_role_permission

Count role_permission — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_role_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].resource_type` | string filter | no | Filter on `resource_type`. |
| `filters[].resource_code` | string filter | no | Filter on `resource_code`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_role_permission",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_role

Create a new role — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_role` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (RoleForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.name` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": Role }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_system` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_system": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_role",
  "params": {
    "data": {
      "code": "<code>",
      "name": "<name>"
    }
  }
}'
```

### create_role_permission

Create a new role_permission — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_role_permission` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (RolePermissionForCreate) | yes |  |
| `data.can_delete` | boolean or null | no |  |
| `data.can_execute` | boolean or null | no |  |
| `data.can_read` | boolean or null | no |  |
| `data.can_write` | boolean or null | no |  |
| `data.resource_code` | string | yes |  |
| `data.resource_type` | string | yes |  |
| `data.role_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": RolePermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.can_delete` | boolean | yes |  |
| `data.can_execute` | boolean | yes |  |
| `data.can_read` | boolean | yes |  |
| `data.can_write` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.resource_code` | string | yes |  |
| `data.resource_type` | string | yes |  |
| `data.role_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "can_delete": false,
      "can_execute": false,
      "can_read": false,
      "can_write": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "resource_code": "<resource_code>",
      "resource_type": "<resource_type>",
      "role_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_role_permission",
  "params": {
    "data": {
      "resource_code": "<resource_code>",
      "resource_type": "<resource_type>",
      "role_id": 1
    }
  }
}'
```

### delete_many_role

Delete multiple role by IDs — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_role` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | array of integer (int64) | yes | Record IDs |

**Result**

The `result` member of the response is: `{ "data": integer (uint64) }`

Type of `data`: integer (uint64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_many_role",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_many_role_permission

Delete multiple role_permission by IDs — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_role_permission` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | array of integer (int64) | yes | Record IDs |

**Result**

The `result` member of the response is: `{ "data": integer (uint64) }`

Type of `data`: integer (uint64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_many_role_permission",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_role

Delete a role by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_role` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Role }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_system` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_system": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_role",
  "params": {
    "id": 1
  }
}'
```

### delete_role_permission

Delete a role_permission by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_role_permission` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": RolePermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.can_delete` | boolean | yes |  |
| `data.can_execute` | boolean | yes |  |
| `data.can_read` | boolean | yes |  |
| `data.can_write` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.resource_code` | string | yes |  |
| `data.resource_type` | string | yes |  |
| `data.role_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "can_delete": false,
      "can_execute": false,
      "can_read": false,
      "can_write": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "resource_code": "<resource_code>",
      "resource_type": "<resource_type>",
      "role_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_role_permission",
  "params": {
    "id": 1
  }
}'
```

### get_role

Get a role by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_role` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Role }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_system` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_system": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_role",
  "params": {
    "id": 1
  }
}'
```

### get_role_permission

Get a role_permission by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_role_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": RolePermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.can_delete` | boolean | yes |  |
| `data.can_execute` | boolean | yes |  |
| `data.can_read` | boolean | yes |  |
| `data.can_write` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.resource_code` | string | yes |  |
| `data.resource_type` | string | yes |  |
| `data.role_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "can_delete": false,
      "can_execute": false,
      "can_read": false,
      "can_write": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "resource_code": "<resource_code>",
      "resource_type": "<resource_type>",
      "role_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_role_permission",
  "params": {
    "id": 1
  }
}'
```

### list_role

List role — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_role` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Role] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].is_system` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_role",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### list_role_permission

List role_permission — CRUD.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_role_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].resource_type` | string filter | no | Filter on `resource_type`. |
| `filters[].resource_code` | string filter | no | Filter on `resource_code`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [RolePermission] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].can_delete` | boolean | yes |  |
| `data[].can_execute` | boolean | yes |  |
| `data[].can_read` | boolean | yes |  |
| `data[].can_write` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].resource_code` | string | yes |  |
| `data[].resource_type` | string | yes |  |
| `data[].role_id` | integer (int64) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_role_permission",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_role

Update mutable role fields; code is immutable and null is explicit.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_role` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (RoleUpdateApi) | yes | A role code is stable permission identity. |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean | no |  |
| `data.name` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": Role }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_system` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_system": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_role",
  "params": {
    "id": 1,
    "data": {
      "description": "<description>",
      "is_active": false
    }
  }
}'
```

### update_role_permission

Update role-permission grants; null and identity changes are rejected.

| | |
|---|---|
| Context / module | enterprise / role |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_role_permission` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (RolePermissionUpdateApi) | yes | Strict wire patch for the mutable cells of one permission row. |
| `data.can_delete` | boolean | no |  |
| `data.can_execute` | boolean | no |  |
| `data.can_read` | boolean | no |  |
| `data.can_write` | boolean | no |  |

**Result**

The `result` member of the response is: `{ "data": RolePermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.can_delete` | boolean | yes |  |
| `data.can_execute` | boolean | yes |  |
| `data.can_read` | boolean | yes |  |
| `data.can_write` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.resource_code` | string | yes |  |
| `data.resource_type` | string | yes |  |
| `data.role_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "can_delete": false,
      "can_execute": false,
      "can_read": false,
      "can_write": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "resource_code": "<resource_code>",
      "resource_type": "<resource_type>",
      "role_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_role_permission",
  "params": {
    "id": 1,
    "data": {
      "can_delete": false,
      "can_execute": false
    }
  }
}'
```

## Module: override_grant

### supervisor_override_grant

Mint a supervisor override grant for the pairs a refused command reported.

| | |
|---|---|
| Context / module | enterprise / override_grant |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `supervisor_override_grant` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- There is no version check.
- This method can ask for a supervisor override. Send the codes the operator accepted in `acknowledged_overrides`. See 04-command-types-and-concurrency.md and 05-errors.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (GrantParams) | yes |  |
| `data.pairs` | array of object (AckToken) | yes | The pairs this grant authorizes. |
| `data.pairs[].code` | integer (int16) | yes |  |
| `data.pairs[].subject` | string | yes |  |
| `data.password` | string or null | no |  |
| `data.reason` | string or null | no | Why the authorizer is allowing it. |
| `data.username` | string or null | no | Required only when the caller cannot authorize every pair themselves. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": GrantResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.expires_at` | string (date-time) | yes | RFC 3339 in UTC. |
| `data.grant_id` | string (uuid) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "meta": {
      "idempotency_replayed": false
    },
    "data": {
      "expires_at": "2026-01-01T00:00:00Z",
      "grant_id": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 42 | The idempotency key was used before with different data. Make a new key. |
| 400 | RF_ERROR, return_code 44 | The first call with this key is still running. Send the same call again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "supervisor_override_grant",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "pairs": [
        {
          "code": 1,
          "subject": "<subject>"
        }
      ]
    }
  }
}'
```

## Module: user_warehouse

### count_user_warehouse

Count user_warehouse — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_user_warehouse` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].warehouse_id` | integer filter | no | Filter on `warehouse_id`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_user_warehouse",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_user_warehouse

Create a new user_warehouse — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_user_warehouse` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (UserWarehouseForCreate) | yes |  |
| `data.is_default` | boolean or null | no |  |
| `data.role_id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": UserWarehouse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.role_id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "id": 1,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "role_id": 1,
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_user_warehouse",
  "params": {
    "data": {
      "role_id": 1,
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}'
```

### delete_many_user_warehouse

Delete multiple user_warehouse by IDs — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_user_warehouse` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | array of integer (int64) | yes | Record IDs |

**Result**

The `result` member of the response is: `{ "data": integer (uint64) }`

Type of `data`: integer (uint64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_many_user_warehouse",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_user_warehouse

Delete a user_warehouse by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_user_warehouse` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": UserWarehouse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.role_id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "id": 1,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "role_id": 1,
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | DEPENDENT_DATA_EXIST | Other rows still use this row. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "delete_user_warehouse",
  "params": {
    "id": 1
  }
}'
```

### get_user_warehouse

Get a user_warehouse by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_user_warehouse` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": UserWarehouse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.role_id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "id": 1,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "role_id": 1,
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_user_warehouse",
  "params": {
    "id": 1
  }
}'
```

### list_user_warehouse

List user_warehouse — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_user_warehouse` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].warehouse_id` | integer filter | no | Filter on `warehouse_id`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [UserWarehouse] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_default` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].role_id` | integer (int64) | yes |  |
| `data[].user_id` | integer (int64) | yes |  |
| `data[].warehouse_id` | integer (int64) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_user_warehouse",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_user_warehouse

Update an assignment's role/default marker; null and identity changes are rejected.

| | |
|---|---|
| Context / module | enterprise / user_warehouse |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_user_warehouse` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (UserWarehouseUpdateApi) | yes | A warehouse assignment keeps its `(user_id, warehouse_id)` identity. |
| `data.is_default` | boolean | no |  |
| `data.role_id` | integer (int64) | no |  |

**Result**

The `result` member of the response is: `{ "data": UserWarehouse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.role_id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "id": 1,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "role_id": 1,
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_user_warehouse",
  "params": {
    "id": 1,
    "data": {
      "is_default": false,
      "role_id": 1
    }
  }
}'
```

## Module: user_api_key

### count_user_api_key

Count user_api_key — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_api_key |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_user_api_key` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].key_prefix` | string filter | no | Filter on `key_prefix`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_user_api_key",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### generate_user_api_key

Generate API key for user; returns plaintext exactly once.

| | |
|---|---|
| Context / module | enterprise / user_api_key |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `generate_user_api_key` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GenerateApiKeyParams) | yes |  |
| `data.expires_at` | string or null | no |  |
| `data.name` | string | yes |  |
| `data.user_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": GenerateApiKeyResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.expires_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.key_prefix` | string | yes |  |
| `data.plaintext_key` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "id": 1,
      "key_prefix": "<key_prefix>",
      "plaintext_key": "<plaintext_key>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "generate_user_api_key",
  "params": {
    "data": {
      "name": "<name>",
      "user_id": 1
    }
  }
}'
```

### get_user_api_key

Get a user_api_key by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_api_key |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_user_api_key` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": UserApiKey }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.expires_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.key_hash` | string | yes | argon2id PHC hash of the full plaintext key. |
| `data.key_prefix` | string | yes |  |
| `data.last_used_at` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.revoked_at` | string or null | no |  |
| `data.user_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "id": 1,
      "key_hash": "<key_hash>",
      "key_prefix": "<key_prefix>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "user_id": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_user_api_key",
  "params": {
    "id": 1
  }
}'
```

### list_user_api_key

List user_api_key — CRUD.

| | |
|---|---|
| Context / module | enterprise / user_api_key |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_user_api_key` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].key_prefix` | string filter | no | Filter on `key_prefix`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [UserApiKey] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].expires_at` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].key_hash` | string | yes | argon2id PHC hash of the full plaintext key. |
| `data[].key_prefix` | string | yes |  |
| `data[].last_used_at` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].revoked_at` | string or null | no |  |
| `data[].user_id` | integer (int64) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_user_api_key",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### revoke_user_api_key

Revoke an API key for its parent user; retries preserve the first revoke time.

| | |
|---|---|
| Context / module | enterprise / user_api_key |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `revoke_user_api_key` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (RevokeApiKeyParams) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.user_id` | integer (int64) | yes | The user card whose API-key list the caller is acting on. |

**Result**

The `result` member of the response is: `{ "data": any }`

Type of `data`: any

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {}
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "revoke_user_api_key",
  "params": {
    "data": {
      "id": 1,
      "user_id": 1
    }
  }
}'
```

## Module: audit_log

### count_audit_log

Count audit_log — CRUD.

| | |
|---|---|
| Context / module | enterprise / audit_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_audit_log` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_kind` | string filter | no | Filter on `event_kind`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].warehouse_id` | integer filter | no | Filter on `warehouse_id`. |
| `filters[].warehouse_code` | string filter | no | Filter on `warehouse_code`. |
| `filters[].target_label` | string filter | no | Filter on `target_label`. |
| `filters[].resource_label` | string filter | no | Filter on `resource_label`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].resource_type` | string filter | no | Filter on `resource_type`. |
| `filters[].resource_code` | string filter | no | Filter on `resource_code`. |
| `filters[].event_time` | value (date, time or other) filter | no | Filter on `event_time`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_audit_log",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### get_audit_log

Get a audit_log by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / audit_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_audit_log` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AuditLog }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.detail` | any | no |  |
| `data.event_kind` | string | yes |  |
| `data.event_time` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.required_bit` | string or null | no |  |
| `data.resource_code` | string or null | no |  |
| `data.resource_label` | string or null | no | Alias of `resource_code` until the resource_catalog lands (ADR-025 §D4). |
| `data.resource_type` | string or null | no |  |
| `data.role_code` | string or null | no | Resolved via LEFT JOIN on `enterprise.role`. |
| `data.role_id` | integer (int64) or null | no |  |
| `data.target_extra` | string or null | no |  |
| `data.target_id` | any | no | Extracted from `detail->'target_pk'` (JSON — scalar for single-PK tables, array for composite). |
| `data.target_label` | string or null | no | Human label for the target row (`r.code`, `u.username`, …) joined from the six RBAC entity types (ADR-025 §D2). |
| `data.target_type` | string or null | no | Extracted from `detail->>'target_table'` — which entity was mutated. |
| `data.user_id` | integer (int64) or null | no |  |
| `data.username` | string or null | no | Resolved via LEFT JOIN on `enterprise."user"`. |
| `data.warehouse_code` | string or null | no | Resolved via LEFT JOIN on `enterprise.warehouse`. |
| `data.warehouse_id` | integer (int64) or null | no |  |
| `data.warehouse_name` | string or null | no | Resolved via LEFT JOIN on `enterprise.warehouse`. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_audit_log",
  "params": {
    "id": 1
  }
}'
```

### list_audit_event_kinds

Distinct event_kind values from enterprise.audit_log_view (set-filter feed).

| | |
|---|---|
| Context / module | enterprise / audit_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_audit_event_kinds` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": [string] }`

Type of `data[]`: array of string

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_audit_event_kinds",
  "params": {}
}'
```

### list_audit_log

List audit_log — CRUD.

| | |
|---|---|
| Context / module | enterprise / audit_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_audit_log` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_kind` | string filter | no | Filter on `event_kind`. |
| `filters[].user_id` | integer filter | no | Filter on `user_id`. |
| `filters[].warehouse_id` | integer filter | no | Filter on `warehouse_id`. |
| `filters[].warehouse_code` | string filter | no | Filter on `warehouse_code`. |
| `filters[].target_label` | string filter | no | Filter on `target_label`. |
| `filters[].resource_label` | string filter | no | Filter on `resource_label`. |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `filters[].resource_type` | string filter | no | Filter on `resource_type`. |
| `filters[].resource_code` | string filter | no | Filter on `resource_code`. |
| `filters[].event_time` | value (date, time or other) filter | no | Filter on `event_time`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [AuditLog] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].detail` | any | no |  |
| `data[].event_kind` | string | yes |  |
| `data[].event_time` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].required_bit` | string or null | no |  |
| `data[].resource_code` | string or null | no |  |
| `data[].resource_label` | string or null | no | Alias of `resource_code` until the resource_catalog lands (ADR-025 §D4). |
| `data[].resource_type` | string or null | no |  |
| `data[].role_code` | string or null | no | Resolved via LEFT JOIN on `enterprise.role`. |
| `data[].role_id` | integer (int64) or null | no |  |
| `data[].target_extra` | string or null | no |  |
| `data[].target_id` | any | no | Extracted from `detail->'target_pk'` (JSON — scalar for single-PK tables, array for composite). |
| `data[].target_label` | string or null | no | Human label for the target row (`r.code`, `u.username`, …) joined from the six RBAC entity types (ADR-025 §D2). |
| `data[].target_type` | string or null | no | Extracted from `detail->>'target_table'` — which entity was mutated. |
| `data[].user_id` | integer (int64) or null | no |  |
| `data[].username` | string or null | no | Resolved via LEFT JOIN on `enterprise."user"`. |
| `data[].warehouse_code` | string or null | no | Resolved via LEFT JOIN on `enterprise.warehouse`. |
| `data[].warehouse_id` | integer (int64) or null | no |  |
| `data[].warehouse_name` | string or null | no | Resolved via LEFT JOIN on `enterprise.warehouse`. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_audit_log",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

## Module: role_permission

### batch_update_role_permissions

Batch-update role_permission cells (Permission Matrix save).

| | |
|---|---|
| Context / module | enterprise / role_permission |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `batch_update_role_permissions` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (BatchUpdateParams) | yes |  |
| `data.changes` | array of object (PermissionChange) | yes |  |
| `data.changes[].can_delete` | boolean | yes |  |
| `data.changes[].can_execute` | boolean | yes |  |
| `data.changes[].can_read` | boolean | yes |  |
| `data.changes[].can_write` | boolean | yes |  |
| `data.changes[].resource_code` | string | yes |  |
| `data.changes[].resource_type` | string | yes |  |
| `data.changes[].role_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": BatchUpdateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.duration_ms` | integer (uint128) | yes |  |
| `data.updated_count` | integer (uint) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "duration_ms": 1,
      "updated_count": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "batch_update_role_permissions",
  "params": {
    "data": {
      "changes": [
        {
          "can_delete": false,
          "can_execute": false,
          "can_read": false,
          "can_write": false,
          "resource_code": "<resource_code>",
          "resource_type": "<resource_type>",
          "role_id": 1
        }
      ]
    }
  }
}'
```

### list_role_permissions_tree

Tree view of role_permission rows grouped by resource_type (AG Grid SSRM).

| | |
|---|---|
| Context / module | enterprise / role_permission |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_role_permissions_tree` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].role_id` | integer filter | no | Filter on `role_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": RolePermissionTreeResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.items` | array of object (RolePermissionTreeRow) | yes |  |
| `data.items[].can_delete` | boolean | yes |  |
| `data.items[].can_execute` | boolean | yes |  |
| `data.items[].can_read` | boolean | yes |  |
| `data.items[].can_write` | boolean | yes |  |
| `data.items[].child_count` | integer (int64) or null | no | Only populated for group rows — total leaves under this branch. |
| `data.items[].form_code` | string or null | no | Populated only when `resource_type = 'form'` — becomes the source field for `lookup:public.form_base:code:name:form_code`. |
| `data.items[].hierarchyLevel` | integer (uint8) | yes |  |
| `data.items[].hierarchyPath` | array of string | yes |  |
| `data.items[].id` | integer (int64) | yes | Synthetic negative id for group rows; real `role_permission.id` for leaves. |
| `data.items[].is_admin_only` | boolean | yes |  |
| `data.items[].label` | string | yes | Group-row display label (`"Menu Items"`, `"Forms"`, …) — only meaningful at `hierarchy_level = 0`. |
| `data.items[].menu_code` | string or null | no | Populated only when `resource_type = 'menu_item'` — becomes the source field for `lookup:public.menu_items:code:label:menu_code`. |
| `data.items[].resource_code` | string | yes |  |
| `data.items[].resource_type` | string | yes |  |
| `data.items[].role_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "items": [
        {
          "can_delete": false,
          "can_execute": false,
          "can_read": false,
          "can_write": false,
          "hierarchyLevel": 1,
          "hierarchyPath": [
            "<hierarchyPath>"
          ],
          "id": 1,
          "is_admin_only": false,
          "label": "<label>",
          "resource_code": "<resource_code>",
          "resource_type": "<resource_type>",
          "role_id": 1
        }
      ]
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_role_permissions_tree",
  "params": {
    "filters": [
      {
        "role_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

## Module: permission_matrix

### batch_upsert_permission_matrix

Insert-or-update role_permission cells from the Permission Matrix UI.

| | |
|---|---|
| Context / module | enterprise / permission_matrix |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `batch_upsert_permission_matrix` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (MatrixBatchUpsertParams) | yes |  |
| `data.changes` | array of object (MatrixCell) | yes |  |
| `data.changes[].d` | boolean | yes |  |
| `data.changes[].r` | boolean | yes |  |
| `data.changes[].resource_code` | string | yes |  |
| `data.changes[].resource_type` | string | yes |  |
| `data.changes[].role_id` | integer (int64) | yes |  |
| `data.changes[].w` | boolean | yes |  |
| `data.changes[].x` | boolean | yes |  |

**Result**

The `result` member of the response is: `{ "data": MatrixBatchUpsertResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.touched_roles` | integer (uint) | yes |  |
| `data.upserted` | integer (uint) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "touched_roles": 1,
      "upserted": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "batch_upsert_permission_matrix",
  "params": {
    "data": {
      "changes": [
        {
          "d": false,
          "r": false,
          "resource_code": "<resource_code>",
          "resource_type": "<resource_type>",
          "role_id": 1,
          "w": false,
          "x": false
        }
      ]
    }
  }
}'
```

### list_permission_matrix

List permission matrix slice (resources × roles × R/W/D/X bits).

| | |
|---|---|
| Context / module | enterprise / permission_matrix |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_permission_matrix` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (MatrixFilter) | yes | Filter shape accepted by `list_permission_matrix`. |
| `data.limit` | integer (int64) or null | no |  |
| `data.offset` | integer (int64) or null | no |  |
| `data.resource_type` | string or null | no | One of "form" \\| "menu_item" \\| "api" \\| "server_action". |
| `data.role_codes` | array of string or null | no | Subset of role codes to render as columns. |
| `data.search` | string or null | no | Substring on `resource_code` (case-insensitive). |

**Result**

The `result` member of the response is: `{ "data": MatrixPage }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.cells` | array of object (MatrixCell) | yes |  |
| `data.cells[].d` | boolean | yes |  |
| `data.cells[].r` | boolean | yes |  |
| `data.cells[].resource_code` | string | yes |  |
| `data.cells[].resource_type` | string | yes |  |
| `data.cells[].role_id` | integer (int64) | yes |  |
| `data.cells[].w` | boolean | yes |  |
| `data.cells[].x` | boolean | yes |  |
| `data.resources` | array of object (MatrixResource) | yes |  |
| `data.resources[].label` | string or null | no |  |
| `data.resources[].module` | string or null | no |  |
| `data.resources[].resource_code` | string | yes |  |
| `data.resources[].resource_type` | string | yes |  |
| `data.roles` | array of object (MatrixRole) | yes |  |
| `data.roles[].role_code` | string | yes |  |
| `data.roles[].role_id` | integer (int64) | yes |  |
| `data.roles[].role_label` | string | yes |  |
| `data.total_resources` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "cells": [
        {
          "d": false,
          "r": false,
          "resource_code": "<resource_code>",
          "resource_type": "<resource_type>",
          "role_id": 1,
          "w": false,
          "x": false
        }
      ],
      "resources": [
        {
          "resource_code": "<resource_code>",
          "resource_type": "<resource_type>"
        }
      ],
      "roles": [
        {
          "role_code": "<role_code>",
          "role_id": 1,
          "role_label": "<role_label>"
        }
      ],
      "total_resources": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_permission_matrix",
  "params": {
    "data": {}
  }
}'
```

## Module: dashboard

### dashboard_snapshot_rpc

Dashboard: control-center snapshot.

| | |
|---|---|
| Context / module | enterprise / dashboard |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_snapshot_rpc` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (DashboardSnapshotInput) | yes |  |
| `data.rail` | array of string or null | no | The reader's own six rail metrics (dashboard spec 2026-10-09 §6), from their board layout. |
| `data.scope` | string or null | no | `shift` \\| `today` \\| `7d`. |

**Result**

The `result` member of the response is: `{ "data": any }`

Type of `data`: any

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {}
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_snapshot_rpc",
  "params": {
    "data": {}
  }
}'
```

## Module: dashboard_setting

### create_dashboard_metric_threshold

Dashboard: a threshold for a metric that has none.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_dashboard_metric_threshold` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ThresholdForm) | yes | A new threshold, as its form sends it. |
| `data.alert_at` | number (double) or null | no |  |
| `data.bad_when` | string or null | no | `Above` (default) or `Below`. |
| `data.critical_at` | number (double) or null | no |  |
| `data.metric_key` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": DashboardMetricThreshold }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.alert_at` | number (double) or null | no |  |
| `data.bad_when` | string | yes | `Above` or `Below` — which side of the levels is bad. |
| `data.critical_at` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.metric_key` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "bad_when": "<bad_when>",
      "id": 1,
      "metric_key": "<metric_key>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "version": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_dashboard_metric_threshold",
  "params": {
    "data": {}
  }
}'
```

### dashboard_metric_catalogue

Dashboard: every metric the rail can hold — key, name, live or demo.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_metric_catalogue` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CatalogueMetric] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].key` | string | yes |  |
| `data[].label` | string | yes |  |
| `data[].live` | boolean | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_metric_catalogue",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### dashboard_metric_threshold_delete

Dashboard: delete a threshold, on the version read.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `dashboard_metric_threshold_delete` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `dashboard_metric_threshold`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeleteThresholdInput) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": any }`

Type of `data`: any

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {}
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 40 | The row changed since you read it. The answer carries `context.current_state`. Read again and decide again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_metric_threshold_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "id": 1
    }
  }
}'
```

### dashboard_metric_threshold_get

Dashboard: one metric threshold, as its card loads it.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_metric_threshold_get` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": DashboardMetricThreshold }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.alert_at` | number (double) or null | no |  |
| `data.bad_when` | string | yes | `Above` or `Below` — which side of the levels is bad. |
| `data.critical_at` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.metric_key` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "bad_when": "<bad_when>",
      "id": 1,
      "metric_key": "<metric_key>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "version": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_metric_threshold_get",
  "params": {
    "id": 1
  }
}'
```

### dashboard_metric_threshold_list

Dashboard: the warehouse's metric thresholds.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_metric_threshold_list` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].metric_key` | string filter | no | Filter on `metric_key`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [DashboardMetricThreshold] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].alert_at` | number (double) or null | no |  |
| `data[].bad_when` | string | yes | `Above` or `Below` — which side of the levels is bad. |
| `data[].critical_at` | number (double) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].metric_key` | string | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].version` | integer (int32) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_metric_threshold_list",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### dashboard_setting_get

Dashboard: the warehouse's board settings card.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_setting_get` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SettingCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.expiring_within_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.rail_1` | string | yes |  |
| `data.rail_2` | string | yes |  |
| `data.rail_3` | string | yes |  |
| `data.rail_4` | string | yes |  |
| `data.rail_5` | string | yes |  |
| `data.rail_6` | string | yes |  |
| `data.show_demo` | boolean | yes |  |
| `data.throughput_plan_per_hour` | number (double) or null | no |  |
| `data.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "expiring_within_days": 1,
      "id": 1,
      "rail_1": "<rail_1>",
      "rail_2": "<rail_2>",
      "rail_3": "<rail_3>",
      "rail_4": "<rail_4>",
      "rail_5": "<rail_5>",
      "rail_6": "<rail_6>",
      "show_demo": false,
      "version": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_setting_get",
  "params": {
    "id": 1
  }
}'
```

### dashboard_setting_list

Dashboard: the board settings, as a one-row list.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `dashboard_setting_list` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SettingCard] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].expiring_within_days` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].rail_1` | string | yes |  |
| `data[].rail_2` | string | yes |  |
| `data[].rail_3` | string | yes |  |
| `data[].rail_4` | string | yes |  |
| `data[].rail_5` | string | yes |  |
| `data[].rail_6` | string | yes |  |
| `data[].show_demo` | boolean | yes |  |
| `data[].throughput_plan_per_hour` | number (double) or null | no |  |
| `data[].version` | integer (int32) | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "dashboard_setting_list",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_dashboard_metric_threshold

Dashboard: save a threshold's levels, on the version read.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_dashboard_metric_threshold` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `dashboard_metric_threshold`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (ThresholdChange) | yes | What a save of a threshold changed. |
| `data.data.alert_at` | number (double) or null | no |  |
| `data.data.bad_when` | string or null | no |  |
| `data.data.critical_at` | number (double) or null | no |  |
| `data.data.metric_key` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": DashboardMetricThreshold }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.alert_at` | number (double) or null | no |  |
| `data.bad_when` | string | yes | `Above` or `Below` — which side of the levels is bad. |
| `data.critical_at` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.metric_key` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "bad_when": "<bad_when>",
      "id": 1,
      "metric_key": "<metric_key>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "version": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 40 | The row changed since you read it. The answer carries `context.current_state`. Read again and decide again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_dashboard_metric_threshold",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "data": {},
      "id": 1
    }
  }
}'
```

### update_dashboard_setting

Dashboard: save the board settings card, on the version read.

| | |
|---|---|
| Context / module | enterprise / dashboard_setting |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_dashboard_setting` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `dashboard_setting`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (SettingChange) | yes | What a save of the settings card changed. |
| `data.data.expiring_within_days` | integer (int32) or null | no |  |
| `data.data.rail_1` | string or null | no |  |
| `data.data.rail_2` | string or null | no |  |
| `data.data.rail_3` | string or null | no |  |
| `data.data.rail_4` | string or null | no |  |
| `data.data.rail_5` | string or null | no |  |
| `data.data.rail_6` | string or null | no |  |
| `data.data.show_demo` | boolean or null | no |  |
| `data.data.throughput_plan_per_hour` | number (double) or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": SettingCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.expiring_within_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.rail_1` | string | yes |  |
| `data.rail_2` | string | yes |  |
| `data.rail_3` | string | yes |  |
| `data.rail_4` | string | yes |  |
| `data.rail_5` | string | yes |  |
| `data.rail_6` | string | yes |  |
| `data.show_demo` | boolean | yes |  |
| `data.throughput_plan_per_hour` | number (double) or null | no |  |
| `data.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "expiring_within_days": 1,
      "id": 1,
      "rail_1": "<rail_1>",
      "rail_2": "<rail_2>",
      "rail_3": "<rail_3>",
      "rail_4": "<rail_4>",
      "rail_5": "<rail_5>",
      "rail_6": "<rail_6>",
      "show_demo": false,
      "version": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 40 | The row changed since you read it. The answer carries `context.current_state`. Read again and decide again. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_dashboard_setting",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "data": {},
      "id": 1
    }
  }
}'
```

## Module: log_level

### get_log_level

Read the live log filter directive.

| | |
|---|---|
| Context / module | enterprise / log_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_log_level` |
| Roles that have it by default | ADMIN |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": LogLevelResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.filter` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "filter": "<filter>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_log_level",
  "params": {}
}'
```

### set_log_level

Set the live log filter directive.

| | |
|---|---|
| Context / module | enterprise / log_level |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `set_log_level` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filter` | string | yes | A directive in `RUST_LOG` syntax. |

**Result**

The `result` member of the response is: `{ "data": LogLevelResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.filter` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "filter": "<filter>"
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR (other return codes) | A business rule refused the command. Read `detail.message`, `detail.return_code` and `detail.class`. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "set_log_level",
  "params": {
    "filter": "<filter>"
  }
}'
```

## Module: handling_unit_type

### count_handling_unit_type

Count handling_unit_type — CRUD.

| | |
|---|---|
| Context / module | enterprise / handling_unit_type |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_handling_unit_type` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `filters[].tracking` | string filter | no | Filter on `tracking`. |
| `filters[].holds_inventory` | boolean filter | no | Filter on `holds_inventory`. |
| `filters[].holds_containers` | boolean filter | no | Filter on `holds_containers`. |
| `filters[].shippable` | boolean filter | no | Filter on `shippable`. |
| `filters[].returnable` | boolean filter | no | Filter on `returnable`. |
| `filters[].default_usage_policy` | string filter | no | Filter on `default_usage_policy`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": integer (int64) }`

Type of `data`: integer (int64)

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": 1
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "count_handling_unit_type",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_handling_unit_type

Create a new handling_unit_type — CRUD.

| | |
|---|---|
| Context / module | enterprise / handling_unit_type |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_handling_unit_type` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (HandlingUnitTypeForCreate) | yes | A field left `None` is left out of the INSERT, so the column takes its DEFAULT. |
| `data.active` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.code_prefix` | string or null | no |  |
| `data.default_usage_policy` | one of: OwnOnly \| WarehouseShared or null | no |  |
| `data.holds_containers` | boolean or null | no |  |
| `data.holds_inventory` | boolean or null | no |  |
| `data.inner_height` | number (double) or null | no |  |
| `data.inner_length` | number (double) or null | no |  |
| `data.inner_width` | number (double) or null | no |  |
| `data.max_gross_weight` | number (double) or null | no |  |
| `data.name` | string | yes |  |
| `data.positions` | integer (int16) or null | no |  |
| `data.return_inspection` | boolean or null | no |  |
| `data.returnable` | boolean or null | no |  |
| `data.shippable` | boolean or null | no |  |
| `data.tare_weight` | number (double) or null | no |  |
| `data.tracking` | one of: ByInstance or null | no |  |

**Result**

The `result` member of the response is: `{ "data": HandlingUnitType }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_prefix` | string or null | no |  |
| `data.default_usage_policy` | one of: OwnOnly \| WarehouseShared or null | no |  |
| `data.holds_containers` | boolean | yes |  |
| `data.holds_inventory` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inner_height` | number (double) | yes |  |
| `data.inner_length` | number (double) | yes |  |
| `data.inner_width` | number (double) | yes |  |
| `data.max_gross_weight` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.positions` | integer (int16) or null | no |  |
| `data.return_inspection` | boolean | yes |  |
| `data.returnable` | boolean | yes |  |
| `data.shippable` | boolean | yes |  |
| `data.tare_weight` | number (double) | yes |  |
| `data.tracking` | one of: ByInstance | yes | How a unit of this type is told apart. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | UNIQUE_VIOLATION or INVALID_DATA | The code already exists, or a value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "create_handling_unit_type",
  "params": {
    "data": {
      "code": "<code>",
      "name": "<name>"
    }
  }
}'
```

### get_handling_unit_type

Get a handling_unit_type by ID — CRUD.

| | |
|---|---|
| Context / module | enterprise / handling_unit_type |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_handling_unit_type` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": HandlingUnitType }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_prefix` | string or null | no |  |
| `data.default_usage_policy` | one of: OwnOnly \| WarehouseShared or null | no |  |
| `data.holds_containers` | boolean | yes |  |
| `data.holds_inventory` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inner_height` | number (double) | yes |  |
| `data.inner_length` | number (double) | yes |  |
| `data.inner_width` | number (double) | yes |  |
| `data.max_gross_weight` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.positions` | integer (int16) or null | no |  |
| `data.return_inspection` | boolean | yes |  |
| `data.returnable` | boolean | yes |  |
| `data.shippable` | boolean | yes |  |
| `data.tare_weight` | number (double) | yes |  |
| `data.tracking` | one of: ByInstance | yes | How a unit of this type is told apart. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_handling_unit_type",
  "params": {
    "id": 1
  }
}'
```

### list_handling_unit_type

List handling_unit_type — CRUD.

| | |
|---|---|
| Context / module | enterprise / handling_unit_type |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_handling_unit_type` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `filters[].tracking` | string filter | no | Filter on `tracking`. |
| `filters[].holds_inventory` | boolean filter | no | Filter on `holds_inventory`. |
| `filters[].holds_containers` | boolean filter | no | Filter on `holds_containers`. |
| `filters[].shippable` | boolean filter | no | Filter on `shippable`. |
| `filters[].returnable` | boolean filter | no | Filter on `returnable`. |
| `filters[].default_usage_policy` | string filter | no | Filter on `default_usage_policy`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [HandlingUnitType] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].active` | boolean | yes |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].code_prefix` | string or null | no |  |
| `data[].default_usage_policy` | one of: OwnOnly \| WarehouseShared or null | no |  |
| `data[].holds_containers` | boolean | yes |  |
| `data[].holds_inventory` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inner_height` | number (double) | yes |  |
| `data[].inner_length` | number (double) | yes |  |
| `data[].inner_width` | number (double) | yes |  |
| `data[].max_gross_weight` | number (double) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].positions` | integer (int16) or null | no |  |
| `data[].return_inspection` | boolean | yes |  |
| `data[].returnable` | boolean | yes |  |
| `data[].shippable` | boolean | yes |  |
| `data[].tare_weight` | number (double) | yes |  |
| `data[].tracking` | one of: ByInstance | yes | How a unit of this type is told apart. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 500 | SERVICE_ERROR | `list_options.limit` is above 5000 (the code maps this refusal to the general error). |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_handling_unit_type",
  "params": {
    "filters": [
      {
        "id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_handling_unit_type

Update a handling unit type; its code is the stable key and cannot change.

| | |
|---|---|
| Context / module | enterprise / handling_unit_type |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_handling_unit_type` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (HandlingUnitTypeUpdateApi) | yes |  |
| `data.active` | boolean | no |  |
| `data.code_prefix` | string | no |  |
| `data.default_usage_policy` | one of: OwnOnly \| WarehouseShared | no | To whom an instance may be handed out by default. |
| `data.holds_containers` | boolean | no |  |
| `data.holds_inventory` | boolean | no |  |
| `data.inner_height` | number (double) | no |  |
| `data.inner_length` | number (double) | no |  |
| `data.inner_width` | number (double) | no |  |
| `data.max_gross_weight` | number (double) | no |  |
| `data.name` | string | no |  |
| `data.positions` | integer (int16) | no |  |
| `data.return_inspection` | boolean | no |  |
| `data.returnable` | boolean | no |  |
| `data.shippable` | boolean | no |  |
| `data.tare_weight` | number (double) | no |  |

**Result**

The `result` member of the response is: `{ "data": HandlingUnitType }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_prefix` | string or null | no |  |
| `data.default_usage_policy` | one of: OwnOnly \| WarehouseShared or null | no |  |
| `data.holds_containers` | boolean | yes |  |
| `data.holds_inventory` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inner_height` | number (double) | yes |  |
| `data.inner_length` | number (double) | yes |  |
| `data.inner_width` | number (double) | yes |  |
| `data.max_gross_weight` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.positions` | integer (int16) or null | no |  |
| `data.return_inspection` | boolean | yes |  |
| `data.returnable` | boolean | yes |  |
| `data.shippable` | boolean | yes |  |
| `data.tare_weight` | number (double) | yes |  |
| `data.tracking` | one of: ByInstance | yes | How a unit of this type is told apart. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | ENTITY_NOT_FOUND | No row has this id. |
| 400 | INVALID_DATA | A value breaks a rule. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "update_handling_unit_type",
  "params": {
    "id": 1,
    "data": {
      "active": false,
      "code_prefix": "<code_prefix>"
    }
  }
}'
```
