# Tasks methods

The task manager: work areas, operators, equipment profiles and the claim, report and finish cycle of a task.

This page documents 48 methods of the `tasks` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **work_area**: [create_work_area](#create_work_area), [create_work_area_zone](#create_work_area_zone), [get_work_area](#get_work_area), [get_work_area_zone](#get_work_area_zone), [list_work_area](#list_work_area), [list_work_area_zone](#list_work_area_zone), [update_work_area](#update_work_area), [update_work_area_zone](#update_work_area_zone), [delete_work_area](#delete_work_area), [delete_work_area_zone](#delete_work_area_zone), [count_work_area](#count_work_area)
- **equipment_profile**: [create_equipment_profile](#create_equipment_profile), [create_equipment_profile_zone_exclusion](#create_equipment_profile_zone_exclusion), [get_equipment_profile](#get_equipment_profile), [get_equipment_profile_zone_exclusion](#get_equipment_profile_zone_exclusion), [list_equipment_profile](#list_equipment_profile), [list_equipment_profile_zone_exclusion](#list_equipment_profile_zone_exclusion), [update_equipment_profile](#update_equipment_profile), [update_equipment_profile_zone_exclusion](#update_equipment_profile_zone_exclusion), [delete_equipment_profile](#delete_equipment_profile), [delete_equipment_profile_zone_exclusion](#delete_equipment_profile_zone_exclusion), [delete_many_equipment_profile](#delete_many_equipment_profile), [delete_many_equipment_profile_zone_exclusion](#delete_many_equipment_profile_zone_exclusion), [count_equipment_profile](#count_equipment_profile)
- **operator**: [get_operator](#get_operator), [list_operator](#list_operator), [count_operator](#count_operator), [update_operator](#update_operator), [sync_operators](#sync_operators), [create_operator_task_permission](#create_operator_task_permission), [get_operator_task_permission](#get_operator_task_permission), [list_operator_task_permission](#list_operator_task_permission), [count_operator_task_permission](#count_operator_task_permission), [update_operator_task_permission](#update_operator_task_permission), [delete_operator_task_permission](#delete_operator_task_permission), [delete_many_operator_task_permission](#delete_many_operator_task_permission)
- **task**: [get_task](#get_task), [list_task](#list_task), [count_task](#count_task)
- **task_commands**: [task_claim](#task_claim), [task_heartbeat](#task_heartbeat), [task_report_progress](#task_report_progress), [task_finish](#task_finish), [task_skip](#task_skip), [task_reassign](#task_reassign), [task_force_release](#task_force_release), [task_delete](#task_delete), [task_delete_many](#task_delete_many)

## Module: work_area

### count_work_area

Count work_area — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_work_area` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].allow_task_release` | boolean filter | no | Filter on `allow_task_release`. |
| `filters[].picking_policy_code` | string filter | no | Filter on `picking_policy_code`. |
| `filters[].pack_station_location` | string filter | no | Filter on `pack_station_location`. |
| `filters[].consolidation_station_location` | string filter | no | Filter on `consolidation_station_location`. |
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
  "method": "count_work_area",
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

### create_work_area

Create a work area, optionally naming its pack station (a Pack location).

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_work_area` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (WorkAreaForCreate) | yes | A field left `None` is left out of the INSERT, so the column takes its DEFAULT (`''`, `1`, `true` — wms-app 315). |
| `data.allow_task_release` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.consolidation_station_location` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.max_concurrent_tasks` | integer (int16) or null | no |  |
| `data.pack_station_location` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": WorkArea }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_task_release` | boolean | yes | May an operator hand a task back here (Infor "Sign Off Allowed"). |
| `data.code` | string | yes |  |
| `data.consolidation_station_location` | string or null | no | The area's consolidation station (consolidation H1; wms-app 20261021191021): the `Consolidation` location where its packed units are put onto outbound pallets. |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.max_concurrent_tasks` | integer (int16) | yes | Tasks one operator may hold at once inside this area — only when the terminal names the area (spec §4.1). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.pack_station_location` | string or null | no | The area's pack station (wms-app 065; post-pick spec O-1, D-55): the `Pack` location where its carriers are delivered when their units go to packing. |
| `data.picking_policy_code` | string or null | no | Code of the picking policy this area works by (its published revision); `None` = `DISCRETE`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_task_release": false,
      "code": "<code>",
      "description": "<description>",
      "id": 1,
      "max_concurrent_tasks": 1,
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
  "method": "create_work_area",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### create_work_area_zone

Create a new work_area_zone — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_work_area_zone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (WorkAreaZoneForCreate) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": WorkAreaZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>",
      "work_area_id": 1
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
  "method": "create_work_area_zone",
  "params": {
    "data": {
      "putawayzone": "<putawayzone>",
      "work_area_id": 1
    }
  }
}'
```

### delete_work_area

Delete a work_area by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_work_area` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": WorkArea }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_task_release` | boolean | yes | May an operator hand a task back here (Infor "Sign Off Allowed"). |
| `data.code` | string | yes |  |
| `data.consolidation_station_location` | string or null | no | The area's consolidation station (consolidation H1; wms-app 20261021191021): the `Consolidation` location where its packed units are put onto outbound pallets. |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.max_concurrent_tasks` | integer (int16) | yes | Tasks one operator may hold at once inside this area — only when the terminal names the area (spec §4.1). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.pack_station_location` | string or null | no | The area's pack station (wms-app 065; post-pick spec O-1, D-55): the `Pack` location where its carriers are delivered when their units go to packing. |
| `data.picking_policy_code` | string or null | no | Code of the picking policy this area works by (its published revision); `None` = `DISCRETE`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_task_release": false,
      "code": "<code>",
      "description": "<description>",
      "id": 1,
      "max_concurrent_tasks": 1,
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
  "method": "delete_work_area",
  "params": {
    "id": 1
  }
}'
```

### delete_work_area_zone

Delete a work_area_zone by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_work_area_zone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": WorkAreaZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>",
      "work_area_id": 1
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
  "method": "delete_work_area_zone",
  "params": {
    "id": 1
  }
}'
```

### get_work_area

Get a work_area by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_work_area` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": WorkArea }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_task_release` | boolean | yes | May an operator hand a task back here (Infor "Sign Off Allowed"). |
| `data.code` | string | yes |  |
| `data.consolidation_station_location` | string or null | no | The area's consolidation station (consolidation H1; wms-app 20261021191021): the `Consolidation` location where its packed units are put onto outbound pallets. |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.max_concurrent_tasks` | integer (int16) | yes | Tasks one operator may hold at once inside this area — only when the terminal names the area (spec §4.1). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.pack_station_location` | string or null | no | The area's pack station (wms-app 065; post-pick spec O-1, D-55): the `Pack` location where its carriers are delivered when their units go to packing. |
| `data.picking_policy_code` | string or null | no | Code of the picking policy this area works by (its published revision); `None` = `DISCRETE`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_task_release": false,
      "code": "<code>",
      "description": "<description>",
      "id": 1,
      "max_concurrent_tasks": 1,
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
  "method": "get_work_area",
  "params": {
    "id": 1
  }
}'
```

### get_work_area_zone

Get a work_area_zone by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_work_area_zone` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": WorkAreaZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>",
      "work_area_id": 1
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
  "method": "get_work_area_zone",
  "params": {
    "id": 1
  }
}'
```

### list_work_area

List work_area — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_work_area` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].allow_task_release` | boolean filter | no | Filter on `allow_task_release`. |
| `filters[].picking_policy_code` | string filter | no | Filter on `picking_policy_code`. |
| `filters[].pack_station_location` | string filter | no | Filter on `pack_station_location`. |
| `filters[].consolidation_station_location` | string filter | no | Filter on `consolidation_station_location`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [WorkArea] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_task_release` | boolean | yes | May an operator hand a task back here (Infor "Sign Off Allowed"). |
| `data[].code` | string | yes |  |
| `data[].consolidation_station_location` | string or null | no | The area's consolidation station (consolidation H1; wms-app 20261021191021): the `Consolidation` location where its packed units are put onto outbound pallets. |
| `data[].description` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].max_concurrent_tasks` | integer (int16) | yes | Tasks one operator may hold at once inside this area — only when the terminal names the area (spec §4.1). |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].pack_station_location` | string or null | no | The area's pack station (wms-app 065; post-pick spec O-1, D-55): the `Pack` location where its carriers are delivered when their units go to packing. |
| `data[].picking_policy_code` | string or null | no | Code of the picking policy this area works by (its published revision); `None` = `DISCRETE`. |

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
  "method": "list_work_area",
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

### list_work_area_zone

List work_area_zone — CRUD.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_work_area_zone` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].work_area_id` | integer filter | no | Filter on `work_area_id`. |
| `filters[].putawayzone` | string filter | no | Filter on `putawayzone`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [WorkAreaZone] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone` | string | yes |  |
| `data[].work_area_id` | integer (int64) | yes |  |

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
  "method": "list_work_area_zone",
  "params": {
    "filters": [
      {
        "work_area_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_work_area

Update work-area behavior and its pack station without changing its stable code.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_work_area` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (WorkAreaUpdateApi) | yes |  |
| `data.allow_task_release` | boolean | no |  |
| `data.consolidation_station_location` | string or null | no |  |
| `data.description` | string | no |  |
| `data.max_concurrent_tasks` | integer (int16) | no |  |
| `data.pack_station_location` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": WorkArea }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_task_release` | boolean | yes | May an operator hand a task back here (Infor "Sign Off Allowed"). |
| `data.code` | string | yes |  |
| `data.consolidation_station_location` | string or null | no | The area's consolidation station (consolidation H1; wms-app 20261021191021): the `Consolidation` location where its packed units are put onto outbound pallets. |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.max_concurrent_tasks` | integer (int16) | yes | Tasks one operator may hold at once inside this area — only when the terminal names the area (spec §4.1). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.pack_station_location` | string or null | no | The area's pack station (wms-app 065; post-pick spec O-1, D-55): the `Pack` location where its carriers are delivered when their units go to packing. |
| `data.picking_policy_code` | string or null | no | Code of the picking policy this area works by (its published revision); `None` = `DISCRETE`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_task_release": false,
      "code": "<code>",
      "description": "<description>",
      "id": 1,
      "max_concurrent_tasks": 1,
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
  "method": "update_work_area",
  "params": {
    "id": 1,
    "data": {
      "allow_task_release": false,
      "consolidation_station_location": "<consolidation_station_location>"
    }
  }
}'
```

### update_work_area_zone

Move a work-area association to another zone; null/work-area changes are rejected.

| | |
|---|---|
| Context / module | tasks / work_area |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_work_area_zone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (WorkAreaZoneUpdateApi) | yes |  |
| `data.putawayzone` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": WorkAreaZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>",
      "work_area_id": 1
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
  "method": "update_work_area_zone",
  "params": {
    "id": 1,
    "data": {
      "putawayzone": "<putawayzone>"
    }
  }
}'
```

## Module: equipment_profile

### count_equipment_profile

Count equipment_profile — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_equipment_profile` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
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
  "method": "count_equipment_profile",
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

### create_equipment_profile

Create a new equipment_profile — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_equipment_profile` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (EquipmentProfileForCreate) | yes | A field left `None` is left out of the INSERT, so the column takes its DEFAULT (`''`, `0`, `0`, `true` — wms-app 320). |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.weight_reduction_per_level` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfile }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_weight` | number (double) | yes | What the machine lifts at ground level; `0` = no limit, the putaway engine's convention for every capacity column. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.weight_reduction_per_level` | number (double) | yes | Lost per location level: up there the machine lifts `max_weight - weight_reduction_per_level * location.level`. |

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
      "description": "<description>",
      "id": 1,
      "is_active": false,
      "max_weight": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "weight_reduction_per_level": 1
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
  "method": "create_equipment_profile",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### create_equipment_profile_zone_exclusion

Create a new equipment_profile_zone_exclusion — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (EquipmentProfileZoneExclusionForCreate) | yes |  |
| `data.equipment_profile_id` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfileZoneExclusion }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "equipment_profile_id": 1,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>"
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
  "method": "create_equipment_profile_zone_exclusion",
  "params": {
    "data": {
      "equipment_profile_id": 1,
      "putawayzone": "<putawayzone>"
    }
  }
}'
```

### delete_equipment_profile

Delete a equipment_profile by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_equipment_profile` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfile }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_weight` | number (double) | yes | What the machine lifts at ground level; `0` = no limit, the putaway engine's convention for every capacity column. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.weight_reduction_per_level` | number (double) | yes | Lost per location level: up there the machine lifts `max_weight - weight_reduction_per_level * location.level`. |

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
      "description": "<description>",
      "id": 1,
      "is_active": false,
      "max_weight": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "weight_reduction_per_level": 1
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
  "method": "delete_equipment_profile",
  "params": {
    "id": 1
  }
}'
```

### delete_equipment_profile_zone_exclusion

Delete a equipment_profile_zone_exclusion by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfileZoneExclusion }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "equipment_profile_id": 1,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>"
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
  "method": "delete_equipment_profile_zone_exclusion",
  "params": {
    "id": 1
  }
}'
```

### delete_many_equipment_profile

Delete multiple equipment_profile by IDs — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_equipment_profile` |
| Roles that have it by default | ADMIN, MANAGER |

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
  "method": "delete_many_equipment_profile",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_many_equipment_profile_zone_exclusion

Delete multiple equipment_profile_zone_exclusion by IDs — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER |

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
  "method": "delete_many_equipment_profile_zone_exclusion",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_equipment_profile

Get a equipment_profile by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_equipment_profile` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfile }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_weight` | number (double) | yes | What the machine lifts at ground level; `0` = no limit, the putaway engine's convention for every capacity column. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.weight_reduction_per_level` | number (double) | yes | Lost per location level: up there the machine lifts `max_weight - weight_reduction_per_level * location.level`. |

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
      "description": "<description>",
      "id": 1,
      "is_active": false,
      "max_weight": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "weight_reduction_per_level": 1
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
  "method": "get_equipment_profile",
  "params": {
    "id": 1
  }
}'
```

### get_equipment_profile_zone_exclusion

Get a equipment_profile_zone_exclusion by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfileZoneExclusion }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "equipment_profile_id": 1,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>"
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
  "method": "get_equipment_profile_zone_exclusion",
  "params": {
    "id": 1
  }
}'
```

### list_equipment_profile

List equipment_profile — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_equipment_profile` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [EquipmentProfile] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].max_weight` | number (double) | yes | What the machine lifts at ground level; `0` = no limit, the putaway engine's convention for every capacity column. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].weight_reduction_per_level` | number (double) | yes | Lost per location level: up there the machine lifts `max_weight - weight_reduction_per_level * location.level`. |

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
  "method": "list_equipment_profile",
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

### list_equipment_profile_zone_exclusion

List equipment_profile_zone_exclusion — CRUD.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].equipment_profile_id` | integer filter | no | Filter on `equipment_profile_id`. |
| `filters[].putawayzone` | string filter | no | Filter on `putawayzone`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [EquipmentProfileZoneExclusion] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].equipment_profile_id` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone` | string | yes |  |

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
  "method": "list_equipment_profile_zone_exclusion",
  "params": {
    "filters": [
      {
        "equipment_profile_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_equipment_profile

Update equipment limits without changing the profile's stable code.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_equipment_profile` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (EquipmentProfileUpdateApi) | yes |  |
| `data.description` | string | no |  |
| `data.is_active` | boolean | no |  |
| `data.max_weight` | number (double) | no |  |
| `data.weight_reduction_per_level` | number (double) | no |  |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfile }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_weight` | number (double) | yes | What the machine lifts at ground level; `0` = no limit, the putaway engine's convention for every capacity column. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.weight_reduction_per_level` | number (double) | yes | Lost per location level: up there the machine lifts `max_weight - weight_reduction_per_level * location.level`. |

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
      "description": "<description>",
      "id": 1,
      "is_active": false,
      "max_weight": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "weight_reduction_per_level": 1
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
  "method": "update_equipment_profile",
  "params": {
    "id": 1,
    "data": {
      "description": "<description>",
      "is_active": false
    }
  }
}'
```

### update_equipment_profile_zone_exclusion

Move an equipment-profile exclusion to another zone; null/profile changes are rejected.

| | |
|---|---|
| Context / module | tasks / equipment_profile |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_equipment_profile_zone_exclusion` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (EquipmentProfileZoneExclusionUpdateApi) | yes |  |
| `data.putawayzone` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": EquipmentProfileZoneExclusion }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "equipment_profile_id": 1,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone": "<putawayzone>"
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
  "method": "update_equipment_profile_zone_exclusion",
  "params": {
    "id": 1,
    "data": {
      "putawayzone": "<putawayzone>"
    }
  }
}'
```

## Module: operator

### count_operator

Count operator — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_operator` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].username` | string filter | no | Filter on `username`. |
| `filters[].full_name` | string filter | no | Filter on `full_name`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].equipment_profile_id` | integer filter | no | Filter on `equipment_profile_id`. |
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
  "method": "count_operator",
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

### count_operator_task_permission

Count operator_task_permission — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].operator_id` | integer filter | no | Filter on `operator_id`. |
| `filters[].task_type` | string filter | no | Filter on `task_type`. |
| `filters[].work_area_id` | integer filter | no | Filter on `work_area_id`. |
| `filters[].pick_execution_enabled` | boolean filter | no | Filter on `pick_execution_enabled`. |
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
  "method": "count_operator_task_permission",
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

### create_operator_task_permission

Create a new operator_task_permission — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OperatorTaskPermissionForCreate) | yes |  |
| `data.operator_id` | integer (int64) | yes |  |
| `data.pick_execution_enabled` | boolean or null | no | The Pick rollout gate, as the grant is created. |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": OperatorTaskPermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.operator_id` | integer (int64) | yes |  |
| `data.pick_execution_enabled` | boolean | yes | Rollout gate for the dedicated source-owned Pick RF flow. |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "operator_id": 1,
      "pick_execution_enabled": false,
      "task_type": "Pick",
      "work_area_id": 1
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
  "method": "create_operator_task_permission",
  "params": {
    "data": {
      "operator_id": 1,
      "task_type": "Pick",
      "work_area_id": 1
    }
  }
}'
```

### delete_many_operator_task_permission

Delete multiple operator_task_permission by IDs — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER |

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
  "method": "delete_many_operator_task_permission",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_operator_task_permission

Delete a operator_task_permission by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OperatorTaskPermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.operator_id` | integer (int64) | yes |  |
| `data.pick_execution_enabled` | boolean | yes | Rollout gate for the dedicated source-owned Pick RF flow. |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "operator_id": 1,
      "pick_execution_enabled": false,
      "task_type": "Pick",
      "work_area_id": 1
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
  "method": "delete_operator_task_permission",
  "params": {
    "id": 1
  }
}'
```

### get_operator

Get a operator by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_operator` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Operator }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) or null | no | The machine this operator drives (`equipment_profile`, wms-app 320); `None` = on foot. |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes | Equals `enterprise.user.id` — see the module doc comment. |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.synced_at` | string | yes |  |
| `data.username` | string | yes |  |

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
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "synced_at": "<synced_at>",
      "username": "<username>"
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
  "method": "get_operator",
  "params": {
    "id": 1
  }
}'
```

### get_operator_task_permission

Get a operator_task_permission by ID — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OperatorTaskPermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.operator_id` | integer (int64) | yes |  |
| `data.pick_execution_enabled` | boolean | yes | Rollout gate for the dedicated source-owned Pick RF flow. |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "operator_id": 1,
      "pick_execution_enabled": false,
      "task_type": "Pick",
      "work_area_id": 1
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
  "method": "get_operator_task_permission",
  "params": {
    "id": 1
  }
}'
```

### list_operator

List operator — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_operator` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].username` | string filter | no | Filter on `username`. |
| `filters[].full_name` | string filter | no | Filter on `full_name`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].equipment_profile_id` | integer filter | no | Filter on `equipment_profile_id`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Operator] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].equipment_profile_id` | integer (int64) or null | no | The machine this operator drives (`equipment_profile`, wms-app 320); `None` = on foot. |
| `data[].full_name` | string or null | no |  |
| `data[].id` | integer (int64) | yes | Equals `enterprise.user.id` — see the module doc comment. |
| `data[].is_active` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].synced_at` | string | yes |  |
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
  "method": "list_operator",
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

### list_operator_task_permission

List operator_task_permission — CRUD.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].operator_id` | integer filter | no | Filter on `operator_id`. |
| `filters[].task_type` | string filter | no | Filter on `task_type`. |
| `filters[].work_area_id` | integer filter | no | Filter on `work_area_id`. |
| `filters[].pick_execution_enabled` | boolean filter | no | Filter on `pick_execution_enabled`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [OperatorTaskPermission] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].operator_id` | integer (int64) | yes |  |
| `data[].pick_execution_enabled` | boolean | yes | Rollout gate for the dedicated source-owned Pick RF flow. |
| `data[].task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data[].work_area_id` | integer (int64) | yes |  |

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
  "method": "list_operator_task_permission",
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

### sync_operators

Sync this warehouse's operators from its users now (the same projection the 5-minute background sync runs).

| | |
|---|---|
| Context / module | tasks / operator |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `sync_operators` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not required |

**Notes**

- The catalog says this method needs no idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes | `sync_operators` takes nothing: the warehouse is the request context's. |

**Result**

The `result` member of the response is: `{ "data": SyncOperatorsResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.deactivated` | integer (uint64) | yes | Operators whose user lost RF login, went inactive or left the warehouse — deactivated, never deleted (`task.assignee` refers to them). |
| `data.upserted` | integer (uint64) | yes | Operators created, or refreshed from a user whose login, name or active state had changed. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "deactivated": 1,
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
  "method": "sync_operators",
  "params": {
    "data": {}
  }
}'
```

### update_operator

Update an operator's equipment profile; an explicit JSON null clears it (the operator is on foot).

| | |
|---|---|
| Context / module | tasks / operator |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_operator` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OperatorForUpdate) | yes | What a PERSON may change on an operator: the equipment profile, nothing else. |
| `data.equipment_profile_id` | integer (int64) or null | no | `None` leaves it alone; an explicit JSON `null` clears it (on foot) — see `OPERATOR_CLEARABLE_COLUMNS`. |

**Result**

The `result` member of the response is: `{ "data": Operator }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.equipment_profile_id` | integer (int64) or null | no | The machine this operator drives (`equipment_profile`, wms-app 320); `None` = on foot. |
| `data.full_name` | string or null | no |  |
| `data.id` | integer (int64) | yes | Equals `enterprise.user.id` — see the module doc comment. |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.synced_at` | string | yes |  |
| `data.username` | string | yes |  |

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
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "synced_at": "<synced_at>",
      "username": "<username>"
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
  "method": "update_operator",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

### update_operator_task_permission

Update a task permission's type, work area, or dedicated Pick rollout flag; null and operator changes are rejected.

| | |
|---|---|
| Context / module | tasks / operator |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_operator_task_permission` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OperatorTaskPermissionUpdateApi) | yes | `operator_id` is the immutable owner of the permission row. |
| `data.pick_execution_enabled` | boolean | no |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | no |  |
| `data.work_area_id` | integer (int64) | no |  |

**Result**

The `result` member of the response is: `{ "data": OperatorTaskPermission }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.operator_id` | integer (int64) | yes |  |
| `data.pick_execution_enabled` | boolean | yes | Rollout gate for the dedicated source-owned Pick RF flow. |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) | yes |  |

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
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "operator_id": 1,
      "pick_execution_enabled": false,
      "task_type": "Pick",
      "work_area_id": 1
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
  "method": "update_operator_task_permission",
  "params": {
    "id": 1,
    "data": {
      "pick_execution_enabled": false,
      "task_type": "Pick"
    }
  }
}'
```

## Module: task

### count_task

Count tasks, optionally filtered.

| | |
|---|---|
| Context / module | tasks / task |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_task` |
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
| `filters[].task_type` | string filter | no | Filter on `task_type`. |
| `filters[].source_type` | string filter | no | Filter on `source_type`. |
| `filters[].source_id` | integer filter | no | Filter on `source_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].from_location` | string filter | no | Filter on `from_location`. |
| `filters[].to_location` | string filter | no | Filter on `to_location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].assignee` | integer filter | no | Filter on `assignee`. |
| `filters[].batch_id` | integer filter | no | Filter on `batch_id`. |
| `filters[].wave_id` | integer filter | no | Filter on `wave_id`. |
| `filters[].skipped_at` | value (date, time or other) filter | no | Filter on `skipped_at`. |
| `filters[].refused_count` | integer filter | no | Filter on `refused_count`. |
| `filters[].escalated_at` | value (date, time or other) filter | no | Filter on `escalated_at`. |
| `filters[].return_kind` | string filter | no | Filter on `return_kind`. |
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
  "method": "count_task",
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

### get_task

Get a task by id.

| | |
|---|---|
| Context / module | tasks / task |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_task` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Task }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "get_task",
  "params": {
    "id": 1
  }
}'
```

### list_task

List tasks, optionally filtered.

| | |
|---|---|
| Context / module | tasks / task |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_task` |
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
| `filters[].task_type` | string filter | no | Filter on `task_type`. |
| `filters[].source_type` | string filter | no | Filter on `source_type`. |
| `filters[].source_id` | integer filter | no | Filter on `source_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].from_location` | string filter | no | Filter on `from_location`. |
| `filters[].to_location` | string filter | no | Filter on `to_location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].assignee` | integer filter | no | Filter on `assignee`. |
| `filters[].batch_id` | integer filter | no | Filter on `batch_id`. |
| `filters[].wave_id` | integer filter | no | Filter on `wave_id`. |
| `filters[].skipped_at` | value (date, time or other) filter | no | Filter on `skipped_at`. |
| `filters[].refused_count` | integer filter | no | Filter on `refused_count`. |
| `filters[].escalated_at` | value (date, time or other) filter | no | Filter on `escalated_at`. |
| `filters[].return_kind` | string filter | no | Filter on `return_kind`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Task] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].assignee` | integer (int64) or null | no |  |
| `data[].batch_id` | integer (int64) or null | no |  |
| `data[].claimed_at` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].created_at` | string | yes |  |
| `data[].ended_at` | string or null | no |  |
| `data[].escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data[].from_location` | string or null | no |  |
| `data[].heartbeat_at` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lease_expires_at` | string or null | no |  |
| `data[].lot` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) or null | no |  |
| `data[].priority` | integer (int16) | yes |  |
| `data[].qty` | number (double) or null | no |  |
| `data[].qty_done` | number (double) | yes |  |
| `data[].refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data[].return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data[].short_reason_code` | string or null | no |  |
| `data[].short_reason_note` | string or null | no |  |
| `data[].skip_reason` | string or null | no |  |
| `data[].skipped_at` | string or null | no |  |
| `data[].sku_code` | string or null | no |  |
| `data[].source_id` | integer (int64) | yes |  |
| `data[].source_type` | string | yes |  |
| `data[].started_at` | string or null | no |  |
| `data[].status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data[].task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data[].to_location` | string or null | no |  |
| `data[].uom` | string or null | no |  |
| `data[].version` | integer (int32) | yes |  |
| `data[].wave_id` | integer (int64) or null | no |  |
| `data[].weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data[].workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "list_task",
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

## Module: task_commands

### task_claim

Claim work: your own unfinished task if you have one, else one from the pool.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_claim` |
| Roles that have it by default | OPERATOR |
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
| `data` | object (ClaimTask) | yes | `task_claim` wire command. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.work_area_id` | integer (int64) or null | no | The work area the terminal is set to, when it names one (spec §4.1): only that area's tasks are handed out. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ClaimTaskResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.task` | object (Task) or null | no |  |
| `data.task.add_when` | string | yes |  |
| `data.task.add_who` | integer (int64) | yes |  |
| `data.task.assignee` | integer (int64) or null | no |  |
| `data.task.batch_id` | integer (int64) or null | no |  |
| `data.task.claimed_at` | string or null | no |  |
| `data.task.code` | string | yes |  |
| `data.task.container_id` | integer (int64) or null | no |  |
| `data.task.created_at` | string | yes |  |
| `data.task.ended_at` | string or null | no |  |
| `data.task.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.task.from_location` | string or null | no |  |
| `data.task.heartbeat_at` | string or null | no |  |
| `data.task.id` | integer (int64) | yes |  |
| `data.task.lease_expires_at` | string or null | no |  |
| `data.task.lot` | string or null | no |  |
| `data.task.mod_when` | string | yes |  |
| `data.task.mod_who` | integer (int64) | yes |  |
| `data.task.owner_id` | integer (int64) or null | no |  |
| `data.task.priority` | integer (int16) | yes |  |
| `data.task.qty` | number (double) or null | no |  |
| `data.task.qty_done` | number (double) | yes |  |
| `data.task.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.task.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.task.short_reason_code` | string or null | no |  |
| `data.task.short_reason_note` | string or null | no |  |
| `data.task.skip_reason` | string or null | no |  |
| `data.task.skipped_at` | string or null | no |  |
| `data.task.sku_code` | string or null | no |  |
| `data.task.source_id` | integer (int64) | yes |  |
| `data.task.source_type` | string | yes |  |
| `data.task.started_at` | string or null | no |  |
| `data.task.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.task.to_location` | string or null | no |  |
| `data.task.uom` | string or null | no |  |
| `data.task.version` | integer (int32) | yes |  |
| `data.task.wave_id` | integer (int64) or null | no |  |
| `data.task.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.task.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "task_claim",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "task_type": "Pick"
    }
  }
}'
```

### task_delete

Delete a task nobody has claimed; its pick stays reserved.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
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
| `data` | object (DeleteTask) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.order_id` | integer (int64) | yes |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DeleteTaskResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.launch_cleared` | boolean | yes | The last task of the order was deleted and the launch was cleared. |
| `data.line_status` | one of: NotAllocated \| PartiallyAllocated \| Allocated \| PartiallyReleased \| Released \| PartiallyPicked \| Picked \| PartiallyShipped \| Shipped \| Closed \| Cancelled | yes | The line's status ladder (migration 285, spec 2026-08-19 §1.2). |
| `data.new_version` | integer (int32) | yes | The order header version after the command. |
| `data.order_id` | integer (int64) | yes |  |
| `data.order_number` | string | yes | The order number, for the message on the screen: a supervisor knows the order by number, not by id. |
| `data.order_status` | one of: New \| PartiallyAllocated \| Allocated \| PartiallyReleased \| Released \| PartiallyPicked \| Picked \| PartiallyShipped \| Shipped \| Closed \| Cancelled | yes | The order status AFTER the recount in this same transaction, so the screen need not guess (the same contract as `DeletePickDetailResult`). |
| `data.pick_detail_id` | integer (int64) | yes |  |
| `data.task_id` | integer (int64) | yes |  |

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
      "launch_cleared": false,
      "line_status": "NotAllocated",
      "new_version": 1,
      "order_id": 1,
      "order_number": "<order_number>",
      "order_status": "New",
      "pick_detail_id": 1,
      "task_id": 1
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
  "method": "task_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "order_id": 1,
      "task_id": 1
    }
  }
}'
```

### task_delete_many

Delete several unclaimed tasks at once; claimed ones are skipped and named.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_delete_many` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
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
| `data` | object (DeleteTasks) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_ids` | array of integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DeleteTasksResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.deleted` | array of object (DeleteTaskResult) | yes | The deleted tasks, in the order they were sent, one `DeleteTask` answer per task (with the order, the statuses and `launch_cleared`). |
| `data.deleted[].launch_cleared` | boolean | yes | The last task of the order was deleted and the launch was cleared. |
| `data.deleted[].line_status` | one of: NotAllocated \| PartiallyAllocated \| Allocated \| PartiallyReleased \| Released \| PartiallyPicked \| Picked \| PartiallyShipped \| Shipped \| Closed \| Cancelled | yes | The line's status ladder (migration 285, spec 2026-08-19 §1.2). |
| `data.deleted[].new_version` | integer (int32) | yes | The order header version after the command. |
| `data.deleted[].order_id` | integer (int64) | yes |  |
| `data.deleted[].order_number` | string | yes | The order number, for the message on the screen: a supervisor knows the order by number, not by id. |
| `data.deleted[].order_status` | one of: New \| PartiallyAllocated \| Allocated \| PartiallyReleased \| Released \| PartiallyPicked \| Picked \| PartiallyShipped \| Shipped \| Closed \| Cancelled | yes | The order status AFTER the recount in this same transaction, so the screen need not guess (the same contract as `DeletePickDetailResult`). |
| `data.deleted[].pick_detail_id` | integer (int64) | yes |  |
| `data.deleted[].task_id` | integer (int64) | yes |  |
| `data.refused` | array of object (TaskNotDeleted) | yes | The tasks that were not deleted, each with the reason in plain words. |
| `data.refused[].reason` | string | yes |  |
| `data.refused[].task_id` | integer (int64) | yes |  |

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
      "deleted": [
        {
          "launch_cleared": false,
          "line_status": "NotAllocated",
          "new_version": 1,
          "order_id": 1,
          "order_number": "<order_number>",
          "order_status": "New",
          "pick_detail_id": 1,
          "task_id": 1
        }
      ],
      "refused": [
        {
          "reason": "<reason>",
          "task_id": 1
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
  "method": "task_delete_many",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "task_ids": [
        1
      ]
    }
  }
}'
```

### task_finish

Finish a claimed task (Completed or Shorted, decided by qty done).

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_finish` |
| Roles that have it by default | OPERATOR |
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
| `data` | object (FinishTask) | yes | `task_finish` wire command. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.short_reason` | string or null | no | Only persisted when `finish_task` decides the task is `Shorted` — a reason posted for a task that turns out `Completed` is silently dropped, mirroring `finish_task`'s own contract (the terminal status is the aggregate's call, not the caller's). |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "task_finish",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "task_id": 1
    }
  }
}'
```

### task_force_release

Supervisor forcibly returns someone else's claimed task, or an escalated pooled one, to the pool.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_force_release` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `task`: send `expected_task_version` for row `task_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_task_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (ForceReleaseTask) | yes | `task_force_release` wire command — the supervisor band's counterpart to `ReassignTask`. |
| `data.expected_task_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason` | string | yes |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 42 | The idempotency key was used before with different data. Make a new key. |
| 400 | RF_ERROR, return_code 44 | The first call with this key is still running. Send the same call again. |
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
  "method": "task_force_release",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "expected_task_version": 1,
      "reason": "<reason>",
      "task_id": 1
    }
  }
}'
```

### task_heartbeat

Renew the holder's live task lease without reporting quantity progress.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_heartbeat` |
| Roles that have it by default | OPERATOR |
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
| `data` | object (HeartbeatTask) | yes | Wire command. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "task_heartbeat",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "task_id": 1
    }
  }
}'
```

### task_reassign

Supervisor reassigns a task to another operator.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_reassign` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `task`: send `expected_task_version` for row `task_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_task_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (ReassignTask) | yes | `task_reassign` wire command — one of two `stateful_command`s in this crate (`task_force_release`, below, is the other). |
| `data.expected_task_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_id` | integer (int64) | yes |  |
| `data.to` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| 401 | NO_AUTH | No valid cookie, API key or service token. |
| 403 | RBAC_FORBIDDEN / RBAC_NO_ROLE | Your role may not call this method, or you have no role in the warehouse. |
| 400 / 403 | WAREHOUSE_REQUIRED, WAREHOUSE_NOT_AVAILABLE, WAREHOUSE_SELECTOR_INVALID | The `X-Warehouse-Id` header is missing, wrong or not yours. |
| 400 | RF_ERROR, return_code 42 | The idempotency key was used before with different data. Make a new key. |
| 400 | RF_ERROR, return_code 44 | The first call with this key is still running. Send the same call again. |
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
  "method": "task_reassign",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "expected_task_version": 1,
      "task_id": 1,
      "to": 1
    }
  }
}'
```

### task_report_progress

Report progress (qty done) on a claimed task.

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_report_progress` |
| Roles that have it by default | OPERATOR |
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
| `data` | object (ReportTaskProgress) | yes | `task_report_progress` wire command. |
| `data.delta` | number (double) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "task_report_progress",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "delta": 1,
      "task_id": 1
    }
  }
}'
```

### task_skip

Give a claimed task back: refuse it (cools down) or hand it back (available at once).

| | |
|---|---|
| Context / module | tasks / task_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `task_skip` |
| Roles that have it by default | OPERATOR |
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
| `data` | object | yes | `task_skip` wire command. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.task_id` | integer (int64) | yes |  |
| `data.work_area_id` | integer (int64) or null | no | The work area the terminal is set to (step 6). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Task }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.assignee` | integer (int64) or null | no |  |
| `data.batch_id` | integer (int64) or null | no |  |
| `data.claimed_at` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.created_at` | string | yes |  |
| `data.ended_at` | string or null | no |  |
| `data.escalated_at` | string or null | no | Set when the task went to a supervisor: refusals reached the threshold `TASK_SKIP_ESCALATE_AFTER`. |
| `data.from_location` | string or null | no |  |
| `data.heartbeat_at` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lease_expires_at` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.priority` | integer (int16) | yes |  |
| `data.qty` | number (double) or null | no |  |
| `data.qty_done` | number (double) | yes |  |
| `data.refused_count` | integer (int32) | yes | How many times the task was REFUSED (a hand-back does not count). |
| `data.return_kind` | string or null | no | HOW the task last went back to the pool: `Refused` (operator refused), `HandedBack` (operator handed it back), `Seized` (a supervisor took it), `Expired` (the lease ran out). |
| `data.short_reason_code` | string or null | no |  |
| `data.short_reason_note` | string or null | no |  |
| `data.skip_reason` | string or null | no |  |
| `data.skipped_at` | string or null | no |  |
| `data.sku_code` | string or null | no |  |
| `data.source_id` | integer (int64) | yes |  |
| `data.source_type` | string | yes |  |
| `data.started_at` | string or null | no |  |
| `data.status` | one of: InProgress \| Completed \| Shorted \| Created \| Assigned \| Cancelled | yes |  |
| `data.task_type` | one of: Pick \| Putaway \| Replenish \| Move \| Count | yes |  |
| `data.to_location` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |
| `data.wave_id` | integer (int64) or null | no |  |
| `data.weight` | number (double) or null | no | The stock weight of the task when it was created, using the one weight formula (`pack::StockWeights`), copied like `qty` (wms-app 340). |
| `data.workstation_completed_by` | integer (int64) or null | no | Real web executor of source-owned workstation Pick completion. |

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
  "method": "task_skip",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "kind": "Refused",
      "reason": "<reason>"
    }
  }
}'
```
