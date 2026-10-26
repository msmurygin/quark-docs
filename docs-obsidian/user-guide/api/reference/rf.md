# RF screens methods

Handheld (RF) screen definitions and the screen graph.

This page documents 11 methods of the `rf` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **screen_def**: [list_screen_def](#list_screen_def), [get_screen_def](#get_screen_def), [get_screen_defs](#get_screen_defs), [save_all_screen_defs](#save_all_screen_defs), [get_screen_tree](#get_screen_tree)
- **metadata**: [fetch_screen](#fetch_screen), [fetch_reachable_from](#fetch_reachable_from), [list_screens](#list_screens), [get_revision](#get_revision), [save_screen](#save_screen), [activate_revision](#activate_revision)

## Module: screen_def

### get_screen_def

Get a single screen definition by ID.

| | |
|---|---|
| Context / module | rf / screen_def |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_screen_def` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `screen_id` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": ScreenDefRecord }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.definition` | any | yes |  |
| `data.screen_id` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "definition": {},
      "screen_id": "<screen_id>"
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
  "method": "get_screen_def",
  "params": {
    "screen_id": "<screen_id>"
  }
}'
```

### get_screen_defs

Batch-fetch screen definitions by IDs.

| | |
|---|---|
| Context / module | rf / screen_def |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_screen_defs` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `screen_ids` | array of string | yes |  |

**Result**

The `result` member of the response is: `{ "data": object (map) }`

Type of `data`: object (map)

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
  "method": "get_screen_defs",
  "params": {
    "screen_ids": [
      "<screen_ids>"
    ]
  }
}'
```

### get_screen_tree

Get the designer tree structure.

| | |
|---|---|
| Context / module | rf / screen_def |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_screen_tree` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


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
  "method": "get_screen_tree",
  "params": {}
}'
```

### list_screen_def

List all screen definitions for the current warehouse.

| | |
|---|---|
| Context / module | rf / screen_def |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_screen_def` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": [ScreenDefRecord] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].definition` | any | yes |  |
| `data[].screen_id` | string | yes |  |

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
  "method": "list_screen_def",
  "params": {}
}'
```

### save_all_screen_defs

Atomically replace all screen definitions and save tree.

| | |
|---|---|
| Context / module | rf / screen_def |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `save_all_screen_defs` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `screens` | array of object (ScreenDefForSave) | yes |  |
| `screens[].definition` | any | yes |  |
| `screens[].screen_id` | string | yes |  |
| `tree` | any | yes |  |

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
  "method": "save_all_screen_defs",
  "params": {
    "screens": [
      {
        "definition": {},
        "screen_id": "<screen_id>"
      }
    ],
    "tree": {}
  }
}'
```

## Module: metadata

### activate_revision

Set an existing revision as the active one for (id, environment); returns the previous.

| | |
|---|---|
| Context / module | rf / metadata |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `activate_revision` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ActivateRevisionParams) | yes |  |
| `data.environment` | string | no |  |
| `data.id` | string | yes |  |
| `data.revision` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ActivateRevisionResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.environment` | string | yes |  |
| `data.id` | string | yes |  |
| `data.previous_revision` | integer (int64) or null | no |  |
| `data.revision` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "environment": "<environment>",
      "id": "<id>",
      "revision": 1
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
  "method": "activate_revision",
  "params": {
    "data": {
      "id": "<id>",
      "revision": 1
    }
  }
}'
```

### fetch_reachable_from

Bundle: every ScreenFile transitively reachable from rootId via metadata graph.

| | |
|---|---|
| Context / module | rf / metadata |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | None. Anonymous access is allowed. |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- You can call this method without logging in.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FetchReachableFromParams) | yes |  |
| `data.environment` | string | no |  |
| `data.root_id` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": FetchReachableFromResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.revisions` | object (map) | yes |  |
| `data.screens` | object (map) | yes |  |
| `data.ttl` | integer (uint32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "revisions": {},
      "screens": {},
      "ttl": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| - | (none for access) | This method needs no login and no permission. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "fetch_reachable_from",
  "params": {
    "data": {
      "root_id": "<root_id>"
    }
  }
}'
```

### fetch_screen

Fetch one ScreenFile JSON v2 by id (with optional ifNoneMatch ETag check).

| | |
|---|---|
| Context / module | rf / metadata |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | None. Anonymous access is allowed. |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- You can call this method without logging in.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FetchScreenParams) | yes |  |
| `data.environment` | string | no |  |
| `data.id` | string | yes |  |
| `data.if_none_match` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": object }`

Type of `data`: object

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "not_modified": false,
      "revision": 1,
      "screen": {},
      "ttl": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| - | (none for access) | This method needs no login and no permission. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "fetch_screen",
  "params": {
    "data": {
      "id": "<id>"
    }
  }
}'
```

### get_revision

Cheap revision-only check (no body) for a given screen + environment.

| | |
|---|---|
| Context / module | rf / metadata |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | None. Anonymous access is allowed. |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- You can call this method without logging in.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetRevisionParams) | yes |  |
| `data.environment` | string | no |  |
| `data.id` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": GetRevisionResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.revision` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "revision": 1
    }
  }
}
```

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| - | (none for access) | This method needs no login and no permission. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_revision",
  "params": {
    "data": {
      "id": "<id>"
    }
  }
}'
```

### list_screens

List screens active in environment (id/title/type/category/revision; no body).

| | |
|---|---|
| Context / module | rf / metadata |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | None. Anonymous access is allowed. |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- You can call this method without logging in.
- This method only reads. It changes nothing and needs no idempotency key.
- A tenant extension cannot replace this method.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListScreensParams) | yes |  |
| `data.category` | string or null | no |  |
| `data.environment` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": [ScreenSummaryResponse] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].category` | string or null | no |  |
| `data[].id` | string | yes |  |
| `data[].revision` | integer (int64) | yes |  |
| `data[].title` | string | yes |  |
| `data[].type` | string | yes |  |

**Errors**

| HTTP | Error | When |
|---|---|---|
| 400 | RPC_PARAMS_INVALID | A parameter is missing or has the wrong type. |
| - | (none for access) | This method needs no login and no permission. |

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_screens",
  "params": {
    "data": {}
  }
}'
```

### save_screen

Validate body and append a new ScreenFile revision (does NOT activate).

| | |
|---|---|
| Context / module | rf / metadata |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `save_screen` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SaveScreenParams) | yes |  |
| `data.body` | any | yes |  |
| `data.comment` | string or null | no |  |
| `data.id` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": SaveScreenResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.id` | string | yes |  |
| `data.revision` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "id": "<id>",
      "revision": 1
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
  "method": "save_screen",
  "params": {
    "data": {
      "body": {},
      "id": "<id>"
    }
  }
}'
```
