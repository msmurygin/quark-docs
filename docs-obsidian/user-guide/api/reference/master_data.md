# Master data methods

Reference data: owners, SKUs, locations, put-away zones, packs, barcode formats, code lists and similar set-up records.

This page documents 127 methods of the `master_data` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **code**: [create_code_list](#create_code_list), [get_code_list](#get_code_list), [list_code_list](#list_code_list), [update_code_list](#update_code_list), [delete_code_list](#delete_code_list), [count_code_list](#count_code_list), [delete_many_code_list](#delete_many_code_list)
- **code_value**: [create_code_list_value](#create_code_list_value), [get_code_list_value](#get_code_list_value), [list_code_list_value](#list_code_list_value), [update_code_list_value](#update_code_list_value), [delete_code_list_value](#delete_code_list_value), [count_code_list_value](#count_code_list_value)
- **pack**: [create_pack](#create_pack), [create_pack_with_items](#create_pack_with_items), [create_pack_item](#create_pack_item), [get_pack](#get_pack), [get_pack_with_items](#get_pack_with_items), [get_pack_item](#get_pack_item), [update_pack](#update_pack), [update_pack_with_items](#update_pack_with_items), [update_pack_item](#update_pack_item), [list_packs](#list_packs), [list_pack_items](#list_pack_items), [delete_pack](#delete_pack), [delete_pack_item](#delete_pack_item), [delete_pack_with_items](#delete_pack_with_items), [count_pack](#count_pack), [get_pack_hierarchy](#get_pack_hierarchy), [convert_pack_uom](#convert_pack_uom), [calc_pack_quantity_breakdown](#calc_pack_quantity_breakdown), [calc_pack_pallet_breakdown](#calc_pack_pallet_breakdown), [recalculate_pack_hierarchy](#recalculate_pack_hierarchy)
- **owner**: [create_owner](#create_owner), [get_owner](#get_owner), [get_owner_full](#get_owner_full), [get_owner_config_by_owner](#get_owner_config_by_owner), [create_owner_full](#create_owner_full), [update_owner_full](#update_owner_full), [list_owner](#list_owner), [update_owner](#update_owner), [delete_owner](#delete_owner), [count_owner](#count_owner), [search_owners](#search_owners)
- **owner_address**: [create_owner_address](#create_owner_address), [get_owner_address](#get_owner_address), [list_owner_address](#list_owner_address), [update_owner_address](#update_owner_address), [delete_owner_address](#delete_owner_address), [count_owner_address](#count_owner_address)
- **owner_bank_account**: [create_owner_bank_account](#create_owner_bank_account), [get_owner_bank_account](#get_owner_bank_account), [list_owner_bank_account](#list_owner_bank_account), [update_owner_bank_account](#update_owner_bank_account), [delete_owner_bank_account](#delete_owner_bank_account), [delete_many_owner_bank_account](#delete_many_owner_bank_account), [count_owner_bank_account](#count_owner_bank_account)
- **owner_config**: [create_owner_config](#create_owner_config), [get_owner_config](#get_owner_config), [list_owner_config](#list_owner_config), [update_owner_config](#update_owner_config), [count_owner_config](#count_owner_config)
- **putawayzone**: [create_putawayzone](#create_putawayzone), [get_putawayzone](#get_putawayzone), [get_putawayzone_by_code](#get_putawayzone_by_code), [list_putawayzone](#list_putawayzone), [count_putawayzone](#count_putawayzone), [update_putawayzone](#update_putawayzone), [delete_putawayzone](#delete_putawayzone)
- **location**: [create_loc](#create_loc), [get_loc](#get_loc), [get_loc_by_code](#get_loc_by_code), [list_loc](#list_loc), [update_loc](#update_loc), [delete_loc](#delete_loc), [delete_many_locs](#delete_many_locs), [gen_locs](#gen_locs), [preview_gen_locs](#preview_gen_locs), [count_loc](#count_loc)
- **loc_lot_commingle**: [create_loc_lot_commingle](#create_loc_lot_commingle), [get_loc_lot_commingle](#get_loc_lot_commingle), [list_loc_lot_commingle](#list_loc_lot_commingle), [update_loc_lot_commingle](#update_loc_lot_commingle), [delete_loc_lot_commingle](#delete_loc_lot_commingle), [count_loc_lot_commingle](#count_loc_lot_commingle)
- **putawayzone_lot_commingle**: [create_putawayzone_lot_commingle](#create_putawayzone_lot_commingle), [get_putawayzone_lot_commingle](#get_putawayzone_lot_commingle), [list_putawayzone_lot_commingle](#list_putawayzone_lot_commingle), [count_putawayzone_lot_commingle](#count_putawayzone_lot_commingle), [update_putawayzone_lot_commingle](#update_putawayzone_lot_commingle), [delete_putawayzone_lot_commingle](#delete_putawayzone_lot_commingle)
- **sku**: [create_sku](#create_sku), [create_sku_full](#create_sku_full), [update_sku_full](#update_sku_full), [get_sku](#get_sku), [get_sku_full](#get_sku_full), [list_sku](#list_sku), [update_sku](#update_sku), [delete_sku](#delete_sku), [get_sku_info](#get_sku_info)
- **sku_audit**: [get_sku_audit](#get_sku_audit), [list_sku_audit](#list_sku_audit)
- **sku_barcode**: [create_sku_barcode](#create_sku_barcode), [get_sku_barcode](#get_sku_barcode), [list_sku_barcode](#list_sku_barcode), [update_sku_barcode](#update_sku_barcode), [delete_sku_barcode](#delete_sku_barcode), [delete_many_sku_barcode](#delete_many_sku_barcode), [count_sku_barcode](#count_sku_barcode)
- **barcode_format**: [create_barcode_format](#create_barcode_format), [get_barcode_format](#get_barcode_format), [list_barcode_format](#list_barcode_format), [update_barcode_format](#update_barcode_format), [delete_barcode_format](#delete_barcode_format), [delete_many_barcode_format](#delete_many_barcode_format), [count_barcode_format](#count_barcode_format), [parse_barcode](#parse_barcode)
- **barcode_format_detail**: [create_barcode_format_detail](#create_barcode_format_detail), [get_barcode_format_detail](#get_barcode_format_detail), [list_barcode_format_detail](#list_barcode_format_detail), [update_barcode_format_detail](#update_barcode_format_detail), [delete_barcode_format_detail](#delete_barcode_format_detail), [delete_many_barcode_format_detail](#delete_many_barcode_format_detail), [count_barcode_format_detail](#count_barcode_format_detail), [next_barcode_format_detail_sequence](#next_barcode_format_detail_sequence)
- **check_digit**: [generate_check_digit](#generate_check_digit)
- **key**: [get_next_key](#get_next_key)

## Module: code

### count_code_list

Count code_list — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_code_list` |
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
| `filters[].editable` | boolean filter | no | Filter on `editable`. |
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
  "method": "count_code_list",
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

### create_code_list

Create a new code_list — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_code_list` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (CodeListForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
| `data.editable` | boolean or null | no |  |

**Result**

The `result` member of the response is: `{ "data": CodeList }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
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
      "code": "<code>",
      "description": "<description>",
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
  "method": "create_code_list",
  "params": {
    "data": {
      "code": "<code>",
      "description": "<description>"
    }
  }
}'
```

### delete_code_list

Delete a code_list by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_code_list` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CodeList }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
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
      "code": "<code>",
      "description": "<description>",
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
  "method": "delete_code_list",
  "params": {
    "id": 1
  }
}'
```

### delete_many_code_list

Delete multiple code_list by IDs — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_code_list` |
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
  "method": "delete_many_code_list",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_code_list

Get a code_list by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_code_list` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CodeList }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
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
      "code": "<code>",
      "description": "<description>",
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
  "method": "get_code_list",
  "params": {
    "id": 1
  }
}'
```

### list_code_list

List code_list — CRUD.

| | |
|---|---|
| Context / module | master_data / code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_code_list` |
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
| `filters[].editable` | boolean filter | no | Filter on `editable`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CodeList] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
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
  "method": "list_code_list",
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

### update_code_list

Update code-list reference fields; null and identity changes are rejected.

| | |
|---|---|
| Context / module | master_data / code |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_code_list` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (CodeListUpdateApi) | yes | Editable fields of a code-list header. |
| `data.description` | string | no |  |
| `data.editable` | boolean | no |  |

**Result**

The `result` member of the response is: `{ "data": CodeList }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string | yes |  |
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
      "code": "<code>",
      "description": "<description>",
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
  "method": "update_code_list",
  "params": {
    "id": 1,
    "data": {
      "description": "<description>",
      "editable": false
    }
  }
}'
```

## Module: code_value

### count_code_list_value

Count code_list_value — CRUD.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code_list_id` | integer filter | no | Filter on `code_list_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].editable` | boolean filter | no | Filter on `editable`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `filters[].display_order` | integer filter | no | Filter on `display_order`. |
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
  "method": "count_code_list_value",
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

### create_code_list_value

Create a new code_list_value — CRUD.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (CodeListValueForCreate) | yes |  |
| `data.active` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.code_list_id` | integer (int64) | yes |  |
| `data.color` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.display_order` | integer (int16) or null | no |  |
| `data.editable` | boolean or null | no |  |
| `data.icon` | string or null | no |  |
| `data.short_description` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": CodeListValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_list_id` | integer (int64) | yes |  |
| `data.color` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.display_order` | integer (int16) | yes |  |
| `data.editable` | boolean | yes |  |
| `data.icon` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.short_description` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "code_list_id": 1,
      "description": "<description>",
      "display_order": 1,
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
  "method": "create_code_list_value",
  "params": {
    "data": {
      "code": "<code>",
      "code_list_id": 1,
      "description": "<description>"
    }
  }
}'
```

### delete_code_list_value

Delete a code_list_value by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CodeListValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_list_id` | integer (int64) | yes |  |
| `data.color` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.display_order` | integer (int16) | yes |  |
| `data.editable` | boolean | yes |  |
| `data.icon` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.short_description` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "code_list_id": 1,
      "description": "<description>",
      "display_order": 1,
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
  "method": "delete_code_list_value",
  "params": {
    "id": 1
  }
}'
```

### get_code_list_value

Get a code_list_value by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CodeListValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_list_id` | integer (int64) | yes |  |
| `data.color` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.display_order` | integer (int16) | yes |  |
| `data.editable` | boolean | yes |  |
| `data.icon` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.short_description` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "code_list_id": 1,
      "description": "<description>",
      "display_order": 1,
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
  "method": "get_code_list_value",
  "params": {
    "id": 1
  }
}'
```

### list_code_list_value

List code_list_value — CRUD.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code_list_id` | integer filter | no | Filter on `code_list_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].editable` | boolean filter | no | Filter on `editable`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `filters[].display_order` | integer filter | no | Filter on `display_order`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CodeListValue] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].active` | boolean | yes |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].code_list_id` | integer (int64) | yes |  |
| `data[].color` | string or null | no |  |
| `data[].description` | string | yes |  |
| `data[].display_order` | integer (int16) | yes |  |
| `data[].editable` | boolean | yes |  |
| `data[].icon` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].short_description` | string or null | no |  |

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
  "method": "list_code_list_value",
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

### update_code_list_value

Update a code-list value with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | master_data / code_value |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_code_list_value` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (CodeListValueUpdateApi) | yes | Editable fields of one value in a code list. |
| `data.active` | boolean | no |  |
| `data.color` | string or null | no |  |
| `data.description` | string | no |  |
| `data.display_order` | integer (int16) | no |  |
| `data.editable` | boolean | no |  |
| `data.icon` | string or null | no |  |
| `data.short_description` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": CodeListValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.code_list_id` | integer (int64) | yes |  |
| `data.color` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.display_order` | integer (int16) | yes |  |
| `data.editable` | boolean | yes |  |
| `data.icon` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.short_description` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "add_when": "<add_when>",
      "add_who": 1,
      "code": "<code>",
      "code_list_id": 1,
      "description": "<description>",
      "display_order": 1,
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
  "method": "update_code_list_value",
  "params": {
    "id": 1,
    "data": {
      "active": false,
      "color": "<color>"
    }
  }
}'
```

## Module: pack

### calc_pack_pallet_breakdown

Calculate pack pallet breakdown (alias of calc_pack_quantity_breakdown).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `calc_pack_pallet_breakdown` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `pack_id` | integer (int64) | yes |  |
| `qty` | number (double) | yes |  |
| `uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": QuantityBreakdown }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.display` | string | yes | Human-readable breakdown string (e.g., "1 PL + 35 CS + 4 EA") |
| `data.levels` | array of object (BreakdownLevel) | yes |  |
| `data.levels[].hierarchyLevel` | integer (int32) | yes |  |
| `data.levels[].qty` | integer (int32) | yes |  |
| `data.levels[].uom` | string | yes |  |
| `data.totalBaseQty` | number (double) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "display": "<display>",
      "levels": [
        {
          "hierarchyLevel": 1,
          "qty": 1,
          "uom": "<uom>"
        }
      ],
      "totalBaseQty": 1
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
  "method": "calc_pack_pallet_breakdown",
  "params": {
    "pack_id": 1,
    "qty": 1,
    "uom": "<uom>"
  }
}'
```

### calc_pack_quantity_breakdown

Calculate quantity breakdown across pack hierarchy levels.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `calc_pack_quantity_breakdown` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `pack_id` | integer (int64) | yes |  |
| `qty` | number (double) | yes |  |
| `uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": QuantityBreakdown }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.display` | string | yes | Human-readable breakdown string (e.g., "1 PL + 35 CS + 4 EA") |
| `data.levels` | array of object (BreakdownLevel) | yes |  |
| `data.levels[].hierarchyLevel` | integer (int32) | yes |  |
| `data.levels[].qty` | integer (int32) | yes |  |
| `data.levels[].uom` | string | yes |  |
| `data.totalBaseQty` | number (double) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "display": "<display>",
      "levels": [
        {
          "hierarchyLevel": 1,
          "qty": 1,
          "uom": "<uom>"
        }
      ],
      "totalBaseQty": 1
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
  "method": "calc_pack_quantity_breakdown",
  "params": {
    "pack_id": 1,
    "qty": 1,
    "uom": "<uom>"
  }
}'
```

### convert_pack_uom

Convert quantity between UOMs within a pack.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `convert_pack_uom` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `from_uom` | string | yes |  |
| `pack_id` | integer (int64) | yes |  |
| `qty` | number (double) | yes |  |
| `to_uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": ConvertUomResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.fromQty` | number (double) | yes |  |
| `data.fromUom` | string | yes |  |
| `data.toQty` | number (double) | yes |  |
| `data.toUom` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "fromQty": 1,
      "fromUom": "<fromUom>",
      "toQty": 1,
      "toUom": "<toUom>"
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
  "method": "convert_pack_uom",
  "params": {
    "from_uom": "<from_uom>",
    "pack_id": 1,
    "qty": 1,
    "to_uom": "<to_uom>"
  }
}'
```

### count_pack

Count packs.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_pack` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

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
  "method": "count_pack",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_pack

Create a pack (header only).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_pack` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PackInnerForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": PackInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
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
  "method": "create_pack",
  "params": {
    "data": {
      "code": "<code>",
      "descr": "<descr>"
    }
  }
}'
```

### create_pack_item

Create a single pack item.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_pack_item` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PackItemForCreateInner) | yes |  |
| `data.base_qty` | number (double) or null | no |  |
| `data.cartonize` | boolean or null | no |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) or null | no |  |
| `data.height` | number (double) or null | no |  |
| `data.hierarchy_level` | integer (int32) or null | no |  |
| `data.is_catch_weight` | boolean or null | no |  |
| `data.is_dual_uom` | boolean or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_revision_id` | integer (int64) or null | no | The revision this row belongs to. |
| `data.pallet_hi` | number (double) or null | no |  |
| `data.pallet_ti` | number (double) or null | no |  |
| `data.pallet_wood_height` | number (double) or null | no |  |
| `data.pallet_wood_length` | number (double) or null | no |  |
| `data.pallet_wood_width` | number (double) or null | no |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean or null | no |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly or null | no |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean or null | no |  |
| `data.uom` | string | yes |  |
| `data.weight` | number (double) or null | no |  |
| `data.width` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PackItemInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.base_qty` | number (double) | yes |  |
| `data.cartonize` | boolean | yes |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) | yes |  |
| `data.height` | number (double) | yes |  |
| `data.hierarchy_level` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_catch_weight` | boolean | yes |  |
| `data.is_dual_uom` | boolean | yes |  |
| `data.length` | number (double) | yes |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_revision_id` | integer (int64) | yes | The pack-hierarchy revision that this hierarchy item belongs to (migration 347). |
| `data.pallet_hi` | number (double) | yes |  |
| `data.pallet_ti` | number (double) | yes |  |
| `data.pallet_wood_height` | number (double) | yes |  |
| `data.pallet_wood_length` | number (double) | yes |  |
| `data.pallet_wood_width` | number (double) | yes |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean | yes |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly | yes |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean | yes |  |
| `data.uom` | string | yes |  |
| `data.weight` | number (double) | yes |  |
| `data.width` | number (double) | yes |  |

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
  "method": "create_pack_item",
  "params": {
    "data": {
      "pack_id": 1,
      "uom": "<uom>"
    }
  }
}'
```

### create_pack_with_items

Create a pack with child items.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_pack_with_items` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PackForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.items` | array of object (PackItemForCreate) | yes |  |
| `data.items[].cartonize` | boolean or null | no |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_uom` | string or null | no |  |
| `data.items[].cube` | number (double) or null | no |  |
| `data.items[].height` | number (double) or null | no |  |
| `data.items[].is_active` | boolean or null | no | ADR-045 §3 — defaults to true on INSERT. |
| `data.items[].is_catch_weight` | boolean or null | no |  |
| `data.items[].is_dual_uom` | boolean or null | no |  |
| `data.items[].length` | number (double) or null | no |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pallet_hi` | number (double) or null | no |  |
| `data.items[].pallet_ti` | number (double) or null | no |  |
| `data.items[].pallet_wood_height` | number (double) or null | no |  |
| `data.items[].pallet_wood_length` | number (double) or null | no |  |
| `data.items[].pallet_wood_width` | number (double) or null | no |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean or null | no |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly or null | no | How this level may be turned. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean or null | no |  |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) or null | no |  |
| `data.items[].width` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Pack }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.items` | array of object (PackItem) | yes |  |
| `data.items[].add_when` | string | yes |  |
| `data.items[].add_who` | integer (int64) | yes |  |
| `data.items[].base_qty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_pack_item_id` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchy_level` | integer (int32) | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].is_active` | boolean | yes | ADR-045 §3 — append-only convention. |
| `data.items[].is_catch_weight` | boolean | yes |  |
| `data.items[].is_dual_uom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].mod_when` | string | yes |  |
| `data.items[].mod_who` | integer (int64) | yes |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pack_id` | integer (int64) | yes |  |
| `data.items[].pack_revision_id` | integer (int64) | yes |  |
| `data.items[].pallet_hi` | number (double) | yes |  |
| `data.items[].pallet_ti` | number (double) | yes |  |
| `data.items[].pallet_wood_height` | number (double) | yes |  |
| `data.items[].pallet_wood_length` | number (double) | yes |  |
| `data.items[].pallet_wood_width` | number (double) | yes |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes | How this level may be turned when it is packed into a box. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean | yes | Explicit factory packaging. |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
      "id": 1,
      "items": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "base_qty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchy_level": 1,
          "id": 1,
          "is_active": false,
          "is_catch_weight": false,
          "is_dual_uom": false,
          "length": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "pack_id": 1,
          "pack_revision_id": 1,
          "pallet_hi": 1,
          "pallet_ti": 1,
          "pallet_wood_height": 1,
          "pallet_wood_length": 1,
          "pallet_wood_width": 1,
          "replenish": false,
          "rotation_rule": "All90",
          "ship_as_is": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
        }
      ],
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
  "method": "create_pack_with_items",
  "params": {
    "data": {
      "code": "<code>",
      "descr": "<descr>",
      "items": [
        {
          "uom": "<uom>"
        }
      ]
    }
  }
}'
```

### delete_pack

Delete a pack (header only).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_pack` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PackInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
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
  "method": "delete_pack",
  "params": {
    "id": 1
  }
}'
```

### delete_pack_item

Delete a pack item.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_pack_item` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PackItemInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.base_qty` | number (double) | yes |  |
| `data.cartonize` | boolean | yes |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) | yes |  |
| `data.height` | number (double) | yes |  |
| `data.hierarchy_level` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_catch_weight` | boolean | yes |  |
| `data.is_dual_uom` | boolean | yes |  |
| `data.length` | number (double) | yes |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_revision_id` | integer (int64) | yes | The pack-hierarchy revision that this hierarchy item belongs to (migration 347). |
| `data.pallet_hi` | number (double) | yes |  |
| `data.pallet_ti` | number (double) | yes |  |
| `data.pallet_wood_height` | number (double) | yes |  |
| `data.pallet_wood_length` | number (double) | yes |  |
| `data.pallet_wood_width` | number (double) | yes |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean | yes |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly | yes |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean | yes |  |
| `data.uom` | string | yes |  |
| `data.weight` | number (double) | yes |  |
| `data.width` | number (double) | yes |  |

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
  "method": "delete_pack_item",
  "params": {
    "id": 1
  }
}'
```

### delete_pack_with_items

Delete a pack with its items.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_pack_with_items` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Pack }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.items` | array of object (PackItem) | yes |  |
| `data.items[].add_when` | string | yes |  |
| `data.items[].add_who` | integer (int64) | yes |  |
| `data.items[].base_qty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_pack_item_id` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchy_level` | integer (int32) | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].is_active` | boolean | yes | ADR-045 §3 — append-only convention. |
| `data.items[].is_catch_weight` | boolean | yes |  |
| `data.items[].is_dual_uom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].mod_when` | string | yes |  |
| `data.items[].mod_who` | integer (int64) | yes |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pack_id` | integer (int64) | yes |  |
| `data.items[].pack_revision_id` | integer (int64) | yes |  |
| `data.items[].pallet_hi` | number (double) | yes |  |
| `data.items[].pallet_ti` | number (double) | yes |  |
| `data.items[].pallet_wood_height` | number (double) | yes |  |
| `data.items[].pallet_wood_length` | number (double) | yes |  |
| `data.items[].pallet_wood_width` | number (double) | yes |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes | How this level may be turned when it is packed into a box. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean | yes | Explicit factory packaging. |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
      "id": 1,
      "items": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "base_qty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchy_level": 1,
          "id": 1,
          "is_active": false,
          "is_catch_weight": false,
          "is_dual_uom": false,
          "length": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "pack_id": 1,
          "pack_revision_id": 1,
          "pallet_hi": 1,
          "pallet_ti": 1,
          "pallet_wood_height": 1,
          "pallet_wood_length": 1,
          "pallet_wood_width": 1,
          "replenish": false,
          "rotation_rule": "All90",
          "ship_as_is": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
        }
      ],
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
  "method": "delete_pack_with_items",
  "params": {
    "id": 1
  }
}'
```

### get_pack

Get a pack by ID (header only).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_pack` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PackInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
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
  "method": "get_pack",
  "params": {
    "id": 1
  }
}'
```

### get_pack_hierarchy

Get pack items as tree/hierarchy view.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_pack_hierarchy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

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

The `result` member of the response is: `{ "data": PackHierarchyResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.items` | array of object (PackItemTreeView) | yes |  |
| `data.items[].baseQty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catchWeightUom` | string or null | no |  |
| `data.items[].childPackItemId` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchyLevel` | integer (int32) | yes |  |
| `data.items[].hierarchyPath` | array of string | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].isBaseUnit` | boolean | yes |  |
| `data.items[].isCatchWeight` | boolean | yes |  |
| `data.items[].isDualUom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].maxWeight` | number (double) | yes |  |
| `data.items[].minWeight` | number (double) | yes |  |
| `data.items[].nominalWeight` | number (double) | yes |  |
| `data.items[].packId` | integer (int64) | yes |  |
| `data.items[].palletHi` | number (double) | yes |  |
| `data.items[].palletTi` | number (double) | yes |  |
| `data.items[].qtyPerChild` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].secondaryUom` | string or null | no |  |
| `data.items[].shipAsIs` | boolean | yes |  |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
| `data.pack` | object (PackInner) or null | no |  |
| `data.pack.add_when` | string | yes |  |
| `data.pack.add_who` | integer (int64) | yes |  |
| `data.pack.code` | string | yes |  |
| `data.pack.descr` | string | yes |  |
| `data.pack.id` | integer (int64) | yes |  |
| `data.pack.mod_when` | string | yes |  |
| `data.pack.mod_who` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "items": [
        {
          "baseQty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchyLevel": 1,
          "hierarchyPath": [
            "<hierarchyPath>"
          ],
          "id": 1,
          "isBaseUnit": false,
          "isCatchWeight": false,
          "isDualUom": false,
          "length": 1,
          "maxWeight": 1,
          "minWeight": 1,
          "nominalWeight": 1,
          "packId": 1,
          "palletHi": 1,
          "palletTi": 1,
          "replenish": false,
          "shipAsIs": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
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
  "method": "get_pack_hierarchy",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### get_pack_item

Get a pack item by ID.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_pack_item` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PackItemInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.base_qty` | number (double) | yes |  |
| `data.cartonize` | boolean | yes |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) | yes |  |
| `data.height` | number (double) | yes |  |
| `data.hierarchy_level` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_catch_weight` | boolean | yes |  |
| `data.is_dual_uom` | boolean | yes |  |
| `data.length` | number (double) | yes |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_revision_id` | integer (int64) | yes | The pack-hierarchy revision that this hierarchy item belongs to (migration 347). |
| `data.pallet_hi` | number (double) | yes |  |
| `data.pallet_ti` | number (double) | yes |  |
| `data.pallet_wood_height` | number (double) | yes |  |
| `data.pallet_wood_length` | number (double) | yes |  |
| `data.pallet_wood_width` | number (double) | yes |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean | yes |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly | yes |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean | yes |  |
| `data.uom` | string | yes |  |
| `data.weight` | number (double) | yes |  |
| `data.width` | number (double) | yes |  |

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
  "method": "get_pack_item",
  "params": {
    "id": 1
  }
}'
```

### get_pack_with_items

Get a pack by ID with items.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_pack_with_items` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Pack }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.items` | array of object (PackItem) | yes |  |
| `data.items[].add_when` | string | yes |  |
| `data.items[].add_who` | integer (int64) | yes |  |
| `data.items[].base_qty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_pack_item_id` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchy_level` | integer (int32) | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].is_active` | boolean | yes | ADR-045 §3 — append-only convention. |
| `data.items[].is_catch_weight` | boolean | yes |  |
| `data.items[].is_dual_uom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].mod_when` | string | yes |  |
| `data.items[].mod_who` | integer (int64) | yes |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pack_id` | integer (int64) | yes |  |
| `data.items[].pack_revision_id` | integer (int64) | yes |  |
| `data.items[].pallet_hi` | number (double) | yes |  |
| `data.items[].pallet_ti` | number (double) | yes |  |
| `data.items[].pallet_wood_height` | number (double) | yes |  |
| `data.items[].pallet_wood_length` | number (double) | yes |  |
| `data.items[].pallet_wood_width` | number (double) | yes |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes | How this level may be turned when it is packed into a box. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean | yes | Explicit factory packaging. |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
      "id": 1,
      "items": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "base_qty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchy_level": 1,
          "id": 1,
          "is_active": false,
          "is_catch_weight": false,
          "is_dual_uom": false,
          "length": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "pack_id": 1,
          "pack_revision_id": 1,
          "pallet_hi": 1,
          "pallet_ti": 1,
          "pallet_wood_height": 1,
          "pallet_wood_length": 1,
          "pallet_wood_width": 1,
          "replenish": false,
          "rotation_rule": "All90",
          "ship_as_is": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
        }
      ],
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
  "method": "get_pack_with_items",
  "params": {
    "id": 1
  }
}'
```

### list_pack_items

List pack items (filtered).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_pack_items` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

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

The `result` member of the response is: `{ "data": [PackItemInner] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].base_qty` | number (double) | yes |  |
| `data[].cartonize` | boolean | yes |  |
| `data[].catch_weight_uom` | string or null | no |  |
| `data[].child_pack_item_id` | integer (int64) or null | no |  |
| `data[].cube` | number (double) | yes |  |
| `data[].height` | number (double) | yes |  |
| `data[].hierarchy_level` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_catch_weight` | boolean | yes |  |
| `data[].is_dual_uom` | boolean | yes |  |
| `data[].length` | number (double) | yes |  |
| `data[].max_weight` | number (double) or null | no |  |
| `data[].min_weight` | number (double) or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].nominal_weight` | number (double) or null | no |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].pack_revision_id` | integer (int64) | yes | The pack-hierarchy revision that this hierarchy item belongs to (migration 347). |
| `data[].pallet_hi` | number (double) | yes |  |
| `data[].pallet_ti` | number (double) | yes |  |
| `data[].pallet_wood_height` | number (double) | yes |  |
| `data[].pallet_wood_length` | number (double) | yes |  |
| `data[].pallet_wood_width` | number (double) | yes |  |
| `data[].qty_per_child` | number (double) or null | no |  |
| `data[].replenish` | boolean | yes |  |
| `data[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes |  |
| `data[].secondary_uom` | string or null | no |  |
| `data[].ship_as_is` | boolean | yes |  |
| `data[].uom` | string | yes |  |
| `data[].weight` | number (double) | yes |  |
| `data[].width` | number (double) | yes |  |

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
  "method": "list_pack_items",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### list_packs

List packs (filtered).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_packs` |
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
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PackInner] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].descr` | string | yes |  |
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
  "method": "list_packs",
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

### recalculate_pack_hierarchy

Recalculate base_qty and hierarchy_level for all items in a pack.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `recalculate_pack_hierarchy` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Pack }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.items` | array of object (PackItem) | yes |  |
| `data.items[].add_when` | string | yes |  |
| `data.items[].add_who` | integer (int64) | yes |  |
| `data.items[].base_qty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_pack_item_id` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchy_level` | integer (int32) | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].is_active` | boolean | yes | ADR-045 §3 — append-only convention. |
| `data.items[].is_catch_weight` | boolean | yes |  |
| `data.items[].is_dual_uom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].mod_when` | string | yes |  |
| `data.items[].mod_who` | integer (int64) | yes |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pack_id` | integer (int64) | yes |  |
| `data.items[].pack_revision_id` | integer (int64) | yes |  |
| `data.items[].pallet_hi` | number (double) | yes |  |
| `data.items[].pallet_ti` | number (double) | yes |  |
| `data.items[].pallet_wood_height` | number (double) | yes |  |
| `data.items[].pallet_wood_length` | number (double) | yes |  |
| `data.items[].pallet_wood_width` | number (double) | yes |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes | How this level may be turned when it is packed into a box. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean | yes | Explicit factory packaging. |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
      "id": 1,
      "items": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "base_qty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchy_level": 1,
          "id": 1,
          "is_active": false,
          "is_catch_weight": false,
          "is_dual_uom": false,
          "length": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "pack_id": 1,
          "pack_revision_id": 1,
          "pallet_hi": 1,
          "pallet_ti": 1,
          "pallet_wood_height": 1,
          "pallet_wood_length": 1,
          "pallet_wood_width": 1,
          "replenish": false,
          "rotation_rule": "All90",
          "ship_as_is": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
        }
      ],
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
  "method": "recalculate_pack_hierarchy",
  "params": {
    "id": 1
  }
}'
```

### update_pack

Update a pack (header only).

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_pack` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PackInnerForUpdate) | yes |  |
| `data.code` | string or null | no |  |
| `data.descr` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PackInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
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
  "method": "update_pack",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

### update_pack_item

Update a pack item.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_pack_item` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PackItemForUpdateInner) | yes |  |
| `data.base_qty` | number (double) or null | no |  |
| `data.cartonize` | boolean or null | no |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) or null | no |  |
| `data.height` | number (double) or null | no |  |
| `data.hierarchy_level` | integer (int32) or null | no |  |
| `data.is_catch_weight` | boolean or null | no |  |
| `data.is_dual_uom` | boolean or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pallet_hi` | number (double) or null | no |  |
| `data.pallet_ti` | number (double) or null | no |  |
| `data.pallet_wood_height` | number (double) or null | no |  |
| `data.pallet_wood_length` | number (double) or null | no |  |
| `data.pallet_wood_width` | number (double) or null | no |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean or null | no |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly or null | no |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean or null | no |  |
| `data.uom` | string or null | no |  |
| `data.weight` | number (double) or null | no |  |
| `data.width` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PackItemInner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.base_qty` | number (double) | yes |  |
| `data.cartonize` | boolean | yes |  |
| `data.catch_weight_uom` | string or null | no |  |
| `data.child_pack_item_id` | integer (int64) or null | no |  |
| `data.cube` | number (double) | yes |  |
| `data.height` | number (double) | yes |  |
| `data.hierarchy_level` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_catch_weight` | boolean | yes |  |
| `data.is_dual_uom` | boolean | yes |  |
| `data.length` | number (double) | yes |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_weight` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.nominal_weight` | number (double) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_revision_id` | integer (int64) | yes | The pack-hierarchy revision that this hierarchy item belongs to (migration 347). |
| `data.pallet_hi` | number (double) | yes |  |
| `data.pallet_ti` | number (double) | yes |  |
| `data.pallet_wood_height` | number (double) | yes |  |
| `data.pallet_wood_length` | number (double) | yes |  |
| `data.pallet_wood_width` | number (double) | yes |  |
| `data.qty_per_child` | number (double) or null | no |  |
| `data.replenish` | boolean | yes |  |
| `data.rotation_rule` | one of: All90 \| None \| UprightOnly | yes |  |
| `data.secondary_uom` | string or null | no |  |
| `data.ship_as_is` | boolean | yes |  |
| `data.uom` | string | yes |  |
| `data.weight` | number (double) | yes |  |
| `data.width` | number (double) | yes |  |

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
  "method": "update_pack_item",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

### update_pack_with_items

Update a pack with child items.

| | |
|---|---|
| Context / module | master_data / pack |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_pack_with_items` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PackForUpdate) | yes |  |
| `data.code` | string or null | no |  |
| `data.descr` | string or null | no |  |
| `data.items` | array of object (PackItemForUpdate) or null | no |  |
| `data.items[].cartonize` | boolean or null | no |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].cube` | number (double) or null | no |  |
| `data.items[].height` | number (double) or null | no |  |
| `data.items[].id` | integer (int64) or null | no |  |
| `data.items[].is_active` | boolean or null | no | ADR-045 §3 — flip to false to retire (don't UPDATE other fields). |
| `data.items[].is_catch_weight` | boolean or null | no |  |
| `data.items[].is_dual_uom` | boolean or null | no |  |
| `data.items[].length` | number (double) or null | no |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pallet_hi` | number (double) or null | no |  |
| `data.items[].pallet_ti` | number (double) or null | no |  |
| `data.items[].pallet_wood_height` | number (double) or null | no |  |
| `data.items[].pallet_wood_length` | number (double) or null | no |  |
| `data.items[].pallet_wood_width` | number (double) or null | no |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean or null | no |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly or null | no | How this level may be turned. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean or null | no |  |
| `data.items[].uom` | string or null | no |  |
| `data.items[].weight` | number (double) or null | no |  |
| `data.items[].width` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Pack }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.items` | array of object (PackItem) | yes |  |
| `data.items[].add_when` | string | yes |  |
| `data.items[].add_who` | integer (int64) | yes |  |
| `data.items[].base_qty` | number (double) | yes |  |
| `data.items[].cartonize` | boolean | yes |  |
| `data.items[].catch_weight_uom` | string or null | no |  |
| `data.items[].child_pack_item_id` | integer (int64) or null | no |  |
| `data.items[].cube` | number (double) | yes |  |
| `data.items[].height` | number (double) | yes |  |
| `data.items[].hierarchy_level` | integer (int32) | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].is_active` | boolean | yes | ADR-045 §3 — append-only convention. |
| `data.items[].is_catch_weight` | boolean | yes |  |
| `data.items[].is_dual_uom` | boolean | yes |  |
| `data.items[].length` | number (double) | yes |  |
| `data.items[].max_weight` | number (double) or null | no |  |
| `data.items[].min_weight` | number (double) or null | no |  |
| `data.items[].mod_when` | string | yes |  |
| `data.items[].mod_who` | integer (int64) | yes |  |
| `data.items[].nominal_weight` | number (double) or null | no |  |
| `data.items[].pack_id` | integer (int64) | yes |  |
| `data.items[].pack_revision_id` | integer (int64) | yes |  |
| `data.items[].pallet_hi` | number (double) | yes |  |
| `data.items[].pallet_ti` | number (double) | yes |  |
| `data.items[].pallet_wood_height` | number (double) | yes |  |
| `data.items[].pallet_wood_length` | number (double) | yes |  |
| `data.items[].pallet_wood_width` | number (double) | yes |  |
| `data.items[].qty_per_child` | number (double) or null | no |  |
| `data.items[].replenish` | boolean | yes |  |
| `data.items[].rotation_rule` | one of: All90 \| None \| UprightOnly | yes | How this level may be turned when it is packed into a box. |
| `data.items[].secondary_uom` | string or null | no |  |
| `data.items[].ship_as_is` | boolean | yes | Explicit factory packaging. |
| `data.items[].uom` | string | yes |  |
| `data.items[].weight` | number (double) | yes |  |
| `data.items[].width` | number (double) | yes |  |
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
      "code": "<code>",
      "descr": "<descr>",
      "id": 1,
      "items": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "base_qty": 1,
          "cartonize": false,
          "cube": 1,
          "height": 1,
          "hierarchy_level": 1,
          "id": 1,
          "is_active": false,
          "is_catch_weight": false,
          "is_dual_uom": false,
          "length": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "pack_id": 1,
          "pack_revision_id": 1,
          "pallet_hi": 1,
          "pallet_ti": 1,
          "pallet_wood_height": 1,
          "pallet_wood_length": 1,
          "pallet_wood_width": 1,
          "replenish": false,
          "rotation_rule": "All90",
          "ship_as_is": false,
          "uom": "<uom>",
          "weight": 1,
          "width": 1
        }
      ],
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
  "method": "update_pack_with_items",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: owner

### count_owner

Count owner — CRUD.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_owner` |
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
| `filters[].owner_type` | string filter | no | Filter on `owner_type`. |
| `filters[].company` | string filter | no | Filter on `company`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].vat` | string filter | no | Filter on `vat`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].credit_limit` | value (date, time or other) filter | no | Filter on `credit_limit`. |
| `filters[].currency_code` | string filter | no | Filter on `currency_code`. |
| `filters[].locale` | string filter | no | Filter on `locale`. |
| `filters[].timezone` | string filter | no | Filter on `timezone`. |
| `filters[].parent_id` | integer filter | no | Filter on `parent_id`. |
| `filters[].picking_toloc` | string filter | no | Filter on `picking_toloc`. |
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
  "method": "count_owner",
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

### create_owner

Create an owner master-data root.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_owner` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OwnerForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.locale` | string or null | no |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no |  |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Owner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.locale` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no | Delivery location of this owner's orders for a pick carrier (ADR-091). |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

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
  "method": "create_owner",
  "params": {
    "data": {
      "code": "<code>",
      "company": "<company>",
      "owner_type": "Sup"
    }
  }
}'
```

### create_owner_full

Create owner with addresses and config in one call.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_owner_full` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OwnerFullForCreate) | yes |  |
| `data.addresses` | array of object (OwnerAddressForCreateInner) or null | no |  |
| `data.addresses[].address1` | string or null | no |  |
| `data.addresses[].address2` | string or null | no |  |
| `data.addresses[].address3` | string or null | no |  |
| `data.addresses[].address4` | string or null | no |  |
| `data.addresses[].address_type` | string | yes |  |
| `data.addresses[].city` | string or null | no |  |
| `data.addresses[].company` | string or null | no |  |
| `data.addresses[].contact1` | string or null | no |  |
| `data.addresses[].contact2` | string or null | no |  |
| `data.addresses[].country` | string or null | no |  |
| `data.addresses[].email` | string or null | no |  |
| `data.addresses[].is_default` | boolean or null | no |  |
| `data.addresses[].iso_country_code` | string or null | no |  |
| `data.addresses[].phone1` | string or null | no |  |
| `data.addresses[].phone2` | string or null | no |  |
| `data.addresses[].state` | string or null | no |  |
| `data.addresses[].zip` | string or null | no |  |
| `data.config` | object (OwnerConfigForCreateInner) or null | no |  |
| `data.config.allow_commingled_lpn` | boolean or null | no |  |
| `data.config.allow_duplicate_lpn` | boolean or null | no |  |
| `data.config.allow_mixed_lpn` | boolean or null | no |  |
| `data.config.allow_system_generated_lpn` | boolean or null | no |  |
| `data.config.auto_close_asn` | boolean or null | no |  |
| `data.config.auto_close_po` | boolean or null | no |  |
| `data.config.auto_print_lpn_on_receive` | boolean or null | no |  |
| `data.config.carton_group` | string or null | no |  |
| `data.config.confirm_empty_on_move` | boolean or null | no |  |
| `data.config.cube_uom` | string or null | no |  |
| `data.config.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.config.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.config.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.config.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.config.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.config.default_discard_loc` | string or null | no |  |
| `data.config.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.config.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.config.default_qc_loc` | string or null | no |  |
| `data.config.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.config.default_receiving_loc` | string or null | no |  |
| `data.config.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.config.default_returns_loc` | string or null | no |  |
| `data.config.default_rtv_loc` | string or null | no |  |
| `data.config.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.config.dimension_uom` | string or null | no |  |
| `data.config.hide_expected_qty_from_operator` | boolean or null | no |  |
| `data.config.lpn_length` | integer (int32) or null | no |  |
| `data.config.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.config.lpn_start_number` | integer (int64) or null | no |  |
| `data.config.next_lpn_number` | integer (int64) or null | no |  |
| `data.config.pick_code` | string or null | no |  |
| `data.config.putaway_reservation_ttl_min` | integer (int32) or null | no |  |
| `data.config.roll_receipt` | boolean or null | no |  |
| `data.config.rtv_gl_account_hint` | string or null | no |  |
| `data.config.shelf_life_warning_multiplier_pct` | integer (int32) or null | no |  |
| `data.config.track_inventory_by` | string or null | no |  |
| `data.config.weight_uom` | string or null | no |  |
| `data.config.write_off_gl_account_hint` | string or null | no |  |
| `data.owner` | object (OwnerForCreate) | yes |  |
| `data.owner.code` | string | yes |  |
| `data.owner.company` | string | yes |  |
| `data.owner.credit_limit` | number (double) or null | no |  |
| `data.owner.currency_code` | string or null | no |  |
| `data.owner.description` | string or null | no |  |
| `data.owner.locale` | string or null | no |  |
| `data.owner.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.owner.parent_id` | integer (int64) or null | no |  |
| `data.owner.picking_toloc` | string or null | no |  |
| `data.owner.status` | string or null | no |  |
| `data.owner.timezone` | string or null | no |  |
| `data.owner.vat` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.addresses` | array of object (OwnerAddress) | yes |  |
| `data.addresses[].add_when` | string | yes |  |
| `data.addresses[].add_who` | integer (int64) | yes |  |
| `data.addresses[].address1` | string or null | no |  |
| `data.addresses[].address2` | string or null | no |  |
| `data.addresses[].address3` | string or null | no |  |
| `data.addresses[].address4` | string or null | no |  |
| `data.addresses[].address_type` | string | yes |  |
| `data.addresses[].city` | string or null | no |  |
| `data.addresses[].company` | string or null | no |  |
| `data.addresses[].contact1` | string or null | no |  |
| `data.addresses[].contact2` | string or null | no |  |
| `data.addresses[].country` | string or null | no |  |
| `data.addresses[].email` | string or null | no |  |
| `data.addresses[].id` | integer (int64) | yes |  |
| `data.addresses[].is_default` | boolean | yes |  |
| `data.addresses[].iso_country_code` | string or null | no |  |
| `data.addresses[].mod_when` | string | yes |  |
| `data.addresses[].mod_who` | integer (int64) | yes |  |
| `data.addresses[].owner_id` | integer (int64) | yes |  |
| `data.addresses[].phone1` | string or null | no |  |
| `data.addresses[].phone2` | string or null | no |  |
| `data.addresses[].state` | string or null | no |  |
| `data.addresses[].zip` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.config` | object (OwnerConfig) or null | no |  |
| `data.config.add_when` | string | yes |  |
| `data.config.add_who` | integer (int64) | yes |  |
| `data.config.allow_commingled_lpn` | boolean or null | no |  |
| `data.config.allow_duplicate_lpn` | boolean or null | no |  |
| `data.config.allow_mixed_lpn` | boolean or null | no |  |
| `data.config.allow_system_generated_lpn` | boolean or null | no |  |
| `data.config.auto_close_asn` | boolean or null | no |  |
| `data.config.auto_close_po` | boolean or null | no |  |
| `data.config.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.config.carton_group` | string or null | no |  |
| `data.config.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.config.cube_uom` | string or null | no |  |
| `data.config.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.default_allocation_policy_id` | integer (int64) or null | no |  |
| … | | | 44 more fields. See `openrpc.json`. |

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
  "method": "create_owner_full",
  "params": {
    "data": {
      "owner": {
        "code": "<code>",
        "company": "<company>",
        "owner_type": "Sup"
      }
    }
  }
}'
```

### delete_owner

Delete an unreferenced owner and its owned master-data subresources.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_owner` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Owner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.locale` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no | Delivery location of this owner's orders for a pick carrier (ADR-091). |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

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
  "method": "delete_owner",
  "params": {
    "id": 1
  }
}'
```

### get_owner

Get a owner by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_owner` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Owner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.locale` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no | Delivery location of this owner's orders for a pick carrier (ADR-091). |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

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
  "method": "get_owner",
  "params": {
    "id": 1
  }
}'
```

### get_owner_config_by_owner

Get owner config by owner ID (1:1 relationship).

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_owner_config_by_owner` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": object (OwnerConfig) or null }`

Type of `data`: object (OwnerConfig) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "auto_print_lpn_on_receive": false,
      "confirm_empty_on_move": false,
      "damage_major_action": "None",
      "damage_minor_action": "None",
      "damage_total_action": "None",
      "hide_expected_qty_from_operator": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1,
      "shelf_life_warning_multiplier_pct": 1
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
  "method": "get_owner_config_by_owner",
  "params": {
    "id": 1
  }
}'
```

### get_owner_full

Get owner with addresses and config aggregated.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_owner_full` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.addresses` | array of object (OwnerAddress) | yes |  |
| `data.addresses[].add_when` | string | yes |  |
| `data.addresses[].add_who` | integer (int64) | yes |  |
| `data.addresses[].address1` | string or null | no |  |
| `data.addresses[].address2` | string or null | no |  |
| `data.addresses[].address3` | string or null | no |  |
| `data.addresses[].address4` | string or null | no |  |
| `data.addresses[].address_type` | string | yes |  |
| `data.addresses[].city` | string or null | no |  |
| `data.addresses[].company` | string or null | no |  |
| `data.addresses[].contact1` | string or null | no |  |
| `data.addresses[].contact2` | string or null | no |  |
| `data.addresses[].country` | string or null | no |  |
| `data.addresses[].email` | string or null | no |  |
| `data.addresses[].id` | integer (int64) | yes |  |
| `data.addresses[].is_default` | boolean | yes |  |
| `data.addresses[].iso_country_code` | string or null | no |  |
| `data.addresses[].mod_when` | string | yes |  |
| `data.addresses[].mod_who` | integer (int64) | yes |  |
| `data.addresses[].owner_id` | integer (int64) | yes |  |
| `data.addresses[].phone1` | string or null | no |  |
| `data.addresses[].phone2` | string or null | no |  |
| `data.addresses[].state` | string or null | no |  |
| `data.addresses[].zip` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.config` | object (OwnerConfig) or null | no |  |
| `data.config.add_when` | string | yes |  |
| `data.config.add_who` | integer (int64) | yes |  |
| `data.config.allow_commingled_lpn` | boolean or null | no |  |
| `data.config.allow_duplicate_lpn` | boolean or null | no |  |
| `data.config.allow_mixed_lpn` | boolean or null | no |  |
| `data.config.allow_system_generated_lpn` | boolean or null | no |  |
| `data.config.auto_close_asn` | boolean or null | no |  |
| `data.config.auto_close_po` | boolean or null | no |  |
| `data.config.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.config.carton_group` | string or null | no |  |
| `data.config.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.config.cube_uom` | string or null | no |  |
| `data.config.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.default_allocation_policy_id` | integer (int64) or null | no |  |
| … | | | 44 more fields. See `openrpc.json`. |

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
  "method": "get_owner_full",
  "params": {
    "id": 1
  }
}'
```

### list_owner

List owner — CRUD.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_owner` |
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
| `filters[].owner_type` | string filter | no | Filter on `owner_type`. |
| `filters[].company` | string filter | no | Filter on `company`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].vat` | string filter | no | Filter on `vat`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].credit_limit` | value (date, time or other) filter | no | Filter on `credit_limit`. |
| `filters[].currency_code` | string filter | no | Filter on `currency_code`. |
| `filters[].locale` | string filter | no | Filter on `locale`. |
| `filters[].timezone` | string filter | no | Filter on `timezone`. |
| `filters[].parent_id` | integer filter | no | Filter on `parent_id`. |
| `filters[].picking_toloc` | string filter | no | Filter on `picking_toloc`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Owner] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].company` | string | yes |  |
| `data[].credit_limit` | number (double) or null | no |  |
| `data[].currency_code` | string or null | no |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].locale` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data[].parent_id` | integer (int64) or null | no |  |
| `data[].picking_toloc` | string or null | no | Delivery location of this owner's orders for a pick carrier (ADR-091). |
| `data[].status` | string or null | no |  |
| `data[].timezone` | string or null | no |  |
| `data[].vat` | string or null | no |  |

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
  "method": "list_owner",
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

### search_owners

Substring search of owners (owner_type='Own' only); used by the RCBLIND01 F2 picker.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `search_owners` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SearchOwnersInput) | yes |  |
| `data.page` | integer (int64) or null | no | 1-indexed page number. |
| `data.page_size` | integer (int64) or null | no | Page size. Default 50, capped at 200. |
| `data.q` | string or null | no | Optional substring matched against `code` and `company` with ILIKE. |

**Result**

The `result` member of the response is: `{ "data": [OwnerSummary] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].company` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |

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
  "method": "search_owners",
  "params": {
    "data": {}
  }
}'
```

### update_owner

Update owner master data with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_owner` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OwnerUpdateApi) | yes |  |
| `data.company` | string | no |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.locale` | string or null | no |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | no |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no |  |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Owner }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.credit_limit` | number (double) or null | no |  |
| `data.currency_code` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.locale` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | yes |  |
| `data.parent_id` | integer (int64) or null | no |  |
| `data.picking_toloc` | string or null | no | Delivery location of this owner's orders for a pick carrier (ADR-091). |
| `data.status` | string or null | no |  |
| `data.timezone` | string or null | no |  |
| `data.vat` | string or null | no |  |

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
  "method": "update_owner",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

### update_owner_full

Update owner with addresses and config in one call.

| | |
|---|---|
| Context / module | master_data / owner |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_owner_full` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OwnerFullForUpdate) | yes |  |
| `data.addresses` | array of object (OwnerAddressUpdate) or null | no |  |
| `data.addresses[].data` | object (OwnerAddressUpdateApi) | yes |  |
| `data.addresses[].id` | integer (int64) | yes |  |
| `data.config` | object (OwnerConfigForCreateInner) or object or null | no |  |
| `data.owner` | object (OwnerUpdateApi) or null | no |  |
| `data.owner.company` | string | no |  |
| `data.owner.credit_limit` | number (double) or null | no |  |
| `data.owner.currency_code` | string or null | no |  |
| `data.owner.description` | string or null | no |  |
| `data.owner.locale` | string or null | no |  |
| `data.owner.owner_type` | one of: Sup \| Cus \| Trn \| Rec \| Con \| Own \| Man \| Dst \| Vnd \| Brk | no |  |
| `data.owner.parent_id` | integer (int64) or null | no |  |
| `data.owner.picking_toloc` | string or null | no |  |
| `data.owner.status` | string or null | no |  |
| `data.owner.timezone` | string or null | no |  |
| `data.owner.vat` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.addresses` | array of object (OwnerAddress) | yes |  |
| `data.addresses[].add_when` | string | yes |  |
| `data.addresses[].add_who` | integer (int64) | yes |  |
| `data.addresses[].address1` | string or null | no |  |
| `data.addresses[].address2` | string or null | no |  |
| `data.addresses[].address3` | string or null | no |  |
| `data.addresses[].address4` | string or null | no |  |
| `data.addresses[].address_type` | string | yes |  |
| `data.addresses[].city` | string or null | no |  |
| `data.addresses[].company` | string or null | no |  |
| `data.addresses[].contact1` | string or null | no |  |
| `data.addresses[].contact2` | string or null | no |  |
| `data.addresses[].country` | string or null | no |  |
| `data.addresses[].email` | string or null | no |  |
| `data.addresses[].id` | integer (int64) | yes |  |
| `data.addresses[].is_default` | boolean | yes |  |
| `data.addresses[].iso_country_code` | string or null | no |  |
| `data.addresses[].mod_when` | string | yes |  |
| `data.addresses[].mod_who` | integer (int64) | yes |  |
| `data.addresses[].owner_id` | integer (int64) | yes |  |
| `data.addresses[].phone1` | string or null | no |  |
| `data.addresses[].phone2` | string or null | no |  |
| `data.addresses[].state` | string or null | no |  |
| `data.addresses[].zip` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.company` | string | yes |  |
| `data.config` | object (OwnerConfig) or null | no |  |
| `data.config.add_when` | string | yes |  |
| `data.config.add_who` | integer (int64) | yes |  |
| `data.config.allow_commingled_lpn` | boolean or null | no |  |
| `data.config.allow_duplicate_lpn` | boolean or null | no |  |
| `data.config.allow_mixed_lpn` | boolean or null | no |  |
| `data.config.allow_system_generated_lpn` | boolean or null | no |  |
| `data.config.auto_close_asn` | boolean or null | no |  |
| `data.config.auto_close_po` | boolean or null | no |  |
| `data.config.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.config.carton_group` | string or null | no |  |
| `data.config.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.config.cube_uom` | string or null | no |  |
| `data.config.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.config.default_allocation_policy_id` | integer (int64) or null | no |  |
| … | | | 44 more fields. See `openrpc.json`. |

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
  "method": "update_owner_full",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: owner_address

### count_owner_address

Count owner_address — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_owner_address` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].address_type` | string filter | no | Filter on `address_type`. |
| `filters[].company` | string filter | no | Filter on `company`. |
| `filters[].address1` | string filter | no | Filter on `address1`. |
| `filters[].city` | string filter | no | Filter on `city`. |
| `filters[].state` | string filter | no | Filter on `state`. |
| `filters[].zip` | string filter | no | Filter on `zip`. |
| `filters[].country` | string filter | no | Filter on `country`. |
| `filters[].iso_country_code` | string filter | no | Filter on `iso_country_code`. |
| `filters[].contact1` | string filter | no | Filter on `contact1`. |
| `filters[].email` | string filter | no | Filter on `email`. |
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
  "method": "count_owner_address",
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

### create_owner_address

Create a new owner_address — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_owner_address` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OwnerAddressForCreate) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | yes |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.is_default` | boolean or null | no |  |
| `data.iso_country_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerAddress }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | yes |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.iso_country_code` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

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
  "method": "create_owner_address",
  "params": {
    "data": {
      "address_type": "<address_type>",
      "owner_id": 1
    }
  }
}'
```

### delete_owner_address

Delete a owner_address by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_owner_address` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerAddress }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | yes |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.iso_country_code` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

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
  "method": "delete_owner_address",
  "params": {
    "id": 1
  }
}'
```

### get_owner_address

Get a owner_address by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_owner_address` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerAddress }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | yes |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.iso_country_code` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

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
  "method": "get_owner_address",
  "params": {
    "id": 1
  }
}'
```

### list_owner_address

List owner_address — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_owner_address` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].address_type` | string filter | no | Filter on `address_type`. |
| `filters[].company` | string filter | no | Filter on `company`. |
| `filters[].address1` | string filter | no | Filter on `address1`. |
| `filters[].city` | string filter | no | Filter on `city`. |
| `filters[].state` | string filter | no | Filter on `state`. |
| `filters[].zip` | string filter | no | Filter on `zip`. |
| `filters[].country` | string filter | no | Filter on `country`. |
| `filters[].iso_country_code` | string filter | no | Filter on `iso_country_code`. |
| `filters[].contact1` | string filter | no | Filter on `contact1`. |
| `filters[].email` | string filter | no | Filter on `email`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [OwnerAddress] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].address1` | string or null | no |  |
| `data[].address2` | string or null | no |  |
| `data[].address3` | string or null | no |  |
| `data[].address4` | string or null | no |  |
| `data[].address_type` | string | yes |  |
| `data[].city` | string or null | no |  |
| `data[].company` | string or null | no |  |
| `data[].contact1` | string or null | no |  |
| `data[].contact2` | string or null | no |  |
| `data[].country` | string or null | no |  |
| `data[].email` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_default` | boolean | yes |  |
| `data[].iso_country_code` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].phone1` | string or null | no |  |
| `data[].phone2` | string or null | no |  |
| `data[].state` | string or null | no |  |
| `data[].zip` | string or null | no |  |

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
  "method": "list_owner_address",
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

### update_owner_address

Update an owner address without changing its owner identity.

| | |
|---|---|
| Context / module | master_data / owner_address |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_owner_address` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OwnerAddressUpdateApi) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | no |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.is_default` | boolean | no |  |
| `data.iso_country_code` | string or null | no |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerAddress }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.address1` | string or null | no |  |
| `data.address2` | string or null | no |  |
| `data.address3` | string or null | no |  |
| `data.address4` | string or null | no |  |
| `data.address_type` | string | yes |  |
| `data.city` | string or null | no |  |
| `data.company` | string or null | no |  |
| `data.contact1` | string or null | no |  |
| `data.contact2` | string or null | no |  |
| `data.country` | string or null | no |  |
| `data.email` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.iso_country_code` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.phone1` | string or null | no |  |
| `data.phone2` | string or null | no |  |
| `data.state` | string or null | no |  |
| `data.zip` | string or null | no |  |

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
  "method": "update_owner_address",
  "params": {
    "id": 1,
    "data": {
      "address1": "<address1>",
      "address2": "<address2>"
    }
  }
}'
```

## Module: owner_bank_account

### count_owner_bank_account

Count owner_bank_account — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].bank_name` | string filter | no | Filter on `bank_name`. |
| `filters[].bic` | string filter | no | Filter on `bic`. |
| `filters[].account` | string filter | no | Filter on `account`. |
| `filters[].currency` | string filter | no | Filter on `currency`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
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
  "method": "count_owner_bank_account",
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

### create_owner_bank_account

Create a new owner_bank_account — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OwnerBankAccountForCreate) | yes |  |
| `data.account` | string | yes |  |
| `data.bank_name` | string | yes |  |
| `data.bic` | string | yes |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.is_default` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": OwnerBankAccount }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.account` | string | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.bank_name` | string | yes |  |
| `data.bic` | string | yes |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "account": "<account>",
      "add_when": "<add_when>",
      "add_who": 1,
      "bank_name": "<bank_name>",
      "bic": "<bic>",
      "currency": "<currency>",
      "id": 1,
      "is_active": false,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1
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
  "method": "create_owner_bank_account",
  "params": {
    "data": {
      "account": "<account>",
      "bank_name": "<bank_name>",
      "bic": "<bic>",
      "owner_id": 1
    }
  }
}'
```

### delete_many_owner_bank_account

Delete multiple owner_bank_account by IDs — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_owner_bank_account` |
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
  "method": "delete_many_owner_bank_account",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_owner_bank_account

Delete a owner_bank_account by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerBankAccount }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.account` | string | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.bank_name` | string | yes |  |
| `data.bic` | string | yes |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "account": "<account>",
      "add_when": "<add_when>",
      "add_who": 1,
      "bank_name": "<bank_name>",
      "bic": "<bic>",
      "currency": "<currency>",
      "id": 1,
      "is_active": false,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1
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
  "method": "delete_owner_bank_account",
  "params": {
    "id": 1
  }
}'
```

### get_owner_bank_account

Get a owner_bank_account by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerBankAccount }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.account` | string | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.bank_name` | string | yes |  |
| `data.bic` | string | yes |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "account": "<account>",
      "add_when": "<add_when>",
      "add_who": 1,
      "bank_name": "<bank_name>",
      "bic": "<bic>",
      "currency": "<currency>",
      "id": 1,
      "is_active": false,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1
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
  "method": "get_owner_bank_account",
  "params": {
    "id": 1
  }
}'
```

### list_owner_bank_account

List owner_bank_account — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].bank_name` | string filter | no | Filter on `bank_name`. |
| `filters[].bic` | string filter | no | Filter on `bic`. |
| `filters[].account` | string filter | no | Filter on `account`. |
| `filters[].currency` | string filter | no | Filter on `currency`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [OwnerBankAccount] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].account` | string | yes |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].bank_name` | string | yes |  |
| `data[].bic` | string | yes |  |
| `data[].corr_account` | string or null | no |  |
| `data[].currency` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].is_default` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |

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
  "method": "list_owner_bank_account",
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

### update_owner_bank_account

Update an owner bank account without changing its owner identity.

| | |
|---|---|
| Context / module | master_data / owner_bank_account |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_owner_bank_account` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OwnerBankAccountUpdateApi) | yes |  |
| `data.account` | string | no |  |
| `data.bank_name` | string | no |  |
| `data.bic` | string | no |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string | no |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean | no |  |
| `data.is_default` | boolean | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerBankAccount }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.account` | string | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.bank_name` | string | yes |  |
| `data.bic` | string | yes |  |
| `data.corr_account` | string or null | no |  |
| `data.currency` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "account": "<account>",
      "add_when": "<add_when>",
      "add_who": 1,
      "bank_name": "<bank_name>",
      "bic": "<bic>",
      "currency": "<currency>",
      "id": 1,
      "is_active": false,
      "is_default": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1
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
  "method": "update_owner_bank_account",
  "params": {
    "id": 1,
    "data": {
      "account": "<account>",
      "bank_name": "<bank_name>"
    }
  }
}'
```

## Module: owner_config

### count_owner_config

Count owner_config — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_owner_config` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].allow_mixed_lpn` | boolean filter | no | Filter on `allow_mixed_lpn`. |
| `filters[].allow_system_generated_lpn` | boolean filter | no | Filter on `allow_system_generated_lpn`. |
| `filters[].default_sku_rotation` | string filter | no | Filter on `default_sku_rotation`. |
| `filters[].default_receipt_policy_id` | integer filter | no | Filter on `default_receipt_policy_id`. |
| `filters[].default_putaway_policy_id` | integer filter | no | Filter on `default_putaway_policy_id`. |
| `filters[].default_allocation_policy_id` | integer filter | no | Filter on `default_allocation_policy_id`. |
| `filters[].default_replenishment_policy_id` | integer filter | no | Filter on `default_replenishment_policy_id`. |
| `filters[].default_cartonization_policy_id` | integer filter | no | Filter on `default_cartonization_policy_id`. |
| `filters[].default_lot_policy_id` | integer filter | no | Filter on `default_lot_policy_id`. |
| `filters[].weight_uom` | string filter | no | Filter on `weight_uom`. |
| `filters[].dimension_uom` | string filter | no | Filter on `dimension_uom`. |
| `filters[].cube_uom` | string filter | no | Filter on `cube_uom`. |
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
  "method": "count_owner_config",
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

### create_owner_config

Create the optional configuration owned by one owner.

| | |
|---|---|
| Context / module | master_data / owner_config |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_owner_config` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (OwnerConfigForCreate) | yes |  |
| `data.allow_commingled_lpn` | boolean or null | no |  |
| `data.allow_duplicate_lpn` | boolean or null | no |  |
| `data.allow_mixed_lpn` | boolean or null | no |  |
| `data.allow_system_generated_lpn` | boolean or null | no |  |
| `data.auto_close_asn` | boolean or null | no |  |
| `data.auto_close_po` | boolean or null | no |  |
| `data.auto_print_lpn_on_receive` | boolean or null | no |  |
| `data.carton_group` | string or null | no |  |
| `data.confirm_empty_on_move` | boolean or null | no |  |
| `data.cube_uom` | string or null | no |  |
| `data.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy or null | no |  |
| `data.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.default_discard_loc` | string or null | no |  |
| `data.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.default_qc_loc` | string or null | no |  |
| `data.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.default_receiving_loc` | string or null | no |  |
| `data.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.default_returns_loc` | string or null | no |  |
| `data.default_rtv_loc` | string or null | no |  |
| `data.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.dimension_uom` | string or null | no |  |
| `data.hide_expected_qty_from_operator` | boolean or null | no |  |
| `data.lpn_length` | integer (int32) or null | no |  |
| `data.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.lpn_start_number` | integer (int64) or null | no |  |
| `data.next_lpn_number` | integer (int64) or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_code` | string or null | no |  |
| `data.putaway_reservation_ttl_min` | integer (int32) or null | no | Blank on the form means NULL means inherit — see `OwnerConfig`. |
| `data.roll_receipt` | boolean or null | no |  |
| `data.rtv_gl_account_hint` | string or null | no |  |
| `data.shelf_life_warning_multiplier_pct` | integer (int32) or null | no |  |
| `data.track_inventory_by` | string or null | no |  |
| `data.weight_uom` | string or null | no |  |
| `data.write_off_gl_account_hint` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_commingled_lpn` | boolean or null | no |  |
| `data.allow_duplicate_lpn` | boolean or null | no |  |
| `data.allow_mixed_lpn` | boolean or null | no |  |
| `data.allow_system_generated_lpn` | boolean or null | no |  |
| `data.auto_close_asn` | boolean or null | no |  |
| `data.auto_close_po` | boolean or null | no |  |
| `data.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.carton_group` | string or null | no |  |
| `data.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.cube_uom` | string or null | no |  |
| `data.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.default_discard_loc` | string or null | no | E.2 (migration 162). |
| `data.default_inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no |  |
| `data.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.default_qc_loc` | string or null | no |  |
| `data.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.default_receiving_loc` | string or null | no | Migration 350. |
| `data.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.default_returns_loc` | string or null | no |  |
| `data.default_rtv_loc` | string or null | no | T-062 (migration 148). |
| `data.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.default_unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.dimension_uom` | string or null | no |  |
| `data.hide_expected_qty_from_operator` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lpn_length` | integer (int32) or null | no |  |
| `data.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.lpn_start_number` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.next_lpn_number` | integer (int64) or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_code` | string or null | no |  |
| `data.putaway_reservation_ttl_min` | integer (int32) or null | no | Minutes a directed-putaway location reservation (`inventory_pending_move_in`) is held for this owner's stock before the TTL sweeper releases it. |
| `data.roll_receipt` | boolean or null | no |  |
| `data.rtv_gl_account_hint` | string or null | no | T-062 (migration 148). |
| `data.shelf_life_warning_multiplier_pct` | integer (int32) | yes |  |
| `data.track_inventory_by` | string or null | no |  |
| … | | | 2 more fields. See `openrpc.json`. |

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
  "method": "create_owner_config",
  "params": {
    "data": {
      "owner_id": 1
    }
  }
}'
```

### get_owner_config

Get a owner_config by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_owner_config` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": OwnerConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_commingled_lpn` | boolean or null | no |  |
| `data.allow_duplicate_lpn` | boolean or null | no |  |
| `data.allow_mixed_lpn` | boolean or null | no |  |
| `data.allow_system_generated_lpn` | boolean or null | no |  |
| `data.auto_close_asn` | boolean or null | no |  |
| `data.auto_close_po` | boolean or null | no |  |
| `data.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.carton_group` | string or null | no |  |
| `data.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.cube_uom` | string or null | no |  |
| `data.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.default_discard_loc` | string or null | no | E.2 (migration 162). |
| `data.default_inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no |  |
| `data.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.default_qc_loc` | string or null | no |  |
| `data.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.default_receiving_loc` | string or null | no | Migration 350. |
| `data.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.default_returns_loc` | string or null | no |  |
| `data.default_rtv_loc` | string or null | no | T-062 (migration 148). |
| `data.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.default_unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.dimension_uom` | string or null | no |  |
| `data.hide_expected_qty_from_operator` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lpn_length` | integer (int32) or null | no |  |
| `data.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.lpn_start_number` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.next_lpn_number` | integer (int64) or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_code` | string or null | no |  |
| `data.putaway_reservation_ttl_min` | integer (int32) or null | no | Minutes a directed-putaway location reservation (`inventory_pending_move_in`) is held for this owner's stock before the TTL sweeper releases it. |
| `data.roll_receipt` | boolean or null | no |  |
| `data.rtv_gl_account_hint` | string or null | no | T-062 (migration 148). |
| `data.shelf_life_warning_multiplier_pct` | integer (int32) | yes |  |
| `data.track_inventory_by` | string or null | no |  |
| … | | | 2 more fields. See `openrpc.json`. |

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
  "method": "get_owner_config",
  "params": {
    "id": 1
  }
}'
```

### list_owner_config

List owner_config — CRUD.

| | |
|---|---|
| Context / module | master_data / owner_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_owner_config` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].allow_mixed_lpn` | boolean filter | no | Filter on `allow_mixed_lpn`. |
| `filters[].allow_system_generated_lpn` | boolean filter | no | Filter on `allow_system_generated_lpn`. |
| `filters[].default_sku_rotation` | string filter | no | Filter on `default_sku_rotation`. |
| `filters[].default_receipt_policy_id` | integer filter | no | Filter on `default_receipt_policy_id`. |
| `filters[].default_putaway_policy_id` | integer filter | no | Filter on `default_putaway_policy_id`. |
| `filters[].default_allocation_policy_id` | integer filter | no | Filter on `default_allocation_policy_id`. |
| `filters[].default_replenishment_policy_id` | integer filter | no | Filter on `default_replenishment_policy_id`. |
| `filters[].default_cartonization_policy_id` | integer filter | no | Filter on `default_cartonization_policy_id`. |
| `filters[].default_lot_policy_id` | integer filter | no | Filter on `default_lot_policy_id`. |
| `filters[].weight_uom` | string filter | no | Filter on `weight_uom`. |
| `filters[].dimension_uom` | string filter | no | Filter on `dimension_uom`. |
| `filters[].cube_uom` | string filter | no | Filter on `cube_uom`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [OwnerConfig] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_commingled_lpn` | boolean or null | no |  |
| `data[].allow_duplicate_lpn` | boolean or null | no |  |
| `data[].allow_mixed_lpn` | boolean or null | no |  |
| `data[].allow_system_generated_lpn` | boolean or null | no |  |
| `data[].auto_close_asn` | boolean or null | no |  |
| `data[].auto_close_po` | boolean or null | no |  |
| `data[].auto_print_lpn_on_receive` | boolean | yes |  |
| `data[].carton_group` | string or null | no |  |
| `data[].confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data[].cube_uom` | string or null | no |  |
| `data[].damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data[].damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data[].damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data[].default_allocation_policy_id` | integer (int64) or null | no |  |
| `data[].default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data[].default_discard_loc` | string or null | no | E.2 (migration 162). |
| `data[].default_inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no |  |
| `data[].default_lot_policy_id` | integer (int64) or null | no |  |
| `data[].default_putaway_policy_id` | integer (int64) or null | no |  |
| `data[].default_qc_loc` | string or null | no |  |
| `data[].default_receipt_policy_id` | integer (int64) or null | no |  |
| `data[].default_receiving_loc` | string or null | no | Migration 350. |
| `data[].default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data[].default_returns_loc` | string or null | no |  |
| `data[].default_rtv_loc` | string or null | no | T-062 (migration 148). |
| `data[].default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data[].default_unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no |  |
| `data[].dimension_uom` | string or null | no |  |
| `data[].hide_expected_qty_from_operator` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lpn_length` | integer (int32) or null | no |  |
| `data[].lpn_rollback_number` | integer (int64) or null | no |  |
| `data[].lpn_start_number` | integer (int64) or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].next_lpn_number` | integer (int64) or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pick_code` | string or null | no |  |
| `data[].putaway_reservation_ttl_min` | integer (int32) or null | no | Minutes a directed-putaway location reservation (`inventory_pending_move_in`) is held for this owner's stock before the TTL sweeper releases it. |
| `data[].roll_receipt` | boolean or null | no |  |
| `data[].rtv_gl_account_hint` | string or null | no | T-062 (migration 148). |
| `data[].shelf_life_warning_multiplier_pct` | integer (int32) | yes |  |
| `data[].track_inventory_by` | string or null | no |  |
| … | | | 2 more fields. See `openrpc.json`. |

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
  "method": "list_owner_config",
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

### update_owner_config

Update owner configuration with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | master_data / owner_config |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_owner_config` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (OwnerConfigUpdateApi) | yes |  |
| `data.allow_commingled_lpn` | boolean or null | no |  |
| `data.allow_duplicate_lpn` | boolean or null | no |  |
| `data.allow_mixed_lpn` | boolean or null | no |  |
| `data.allow_system_generated_lpn` | boolean or null | no |  |
| `data.auto_close_asn` | boolean or null | no |  |
| `data.auto_close_po` | boolean or null | no |  |
| `data.auto_print_lpn_on_receive` | boolean | no |  |
| `data.carton_group` | string or null | no |  |
| `data.confirm_empty_on_move` | boolean | no |  |
| `data.cube_uom` | string or null | no |  |
| `data.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | no | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | no | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | no | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.default_discard_loc` | string or null | no |  |
| `data.default_inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no |  |
| `data.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.default_qc_loc` | string or null | no |  |
| `data.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.default_receiving_loc` | string or null | no |  |
| `data.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.default_returns_loc` | string or null | no |  |
| `data.default_rtv_loc` | string or null | no |  |
| `data.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.default_unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.dimension_uom` | string or null | no |  |
| `data.hide_expected_qty_from_operator` | boolean | no |  |
| `data.lpn_length` | integer (int32) or null | no |  |
| `data.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.lpn_start_number` | integer (int64) or null | no |  |
| `data.next_lpn_number` | integer (int64) or null | no |  |
| `data.pick_code` | string or null | no |  |
| `data.putaway_reservation_ttl_min` | integer (int32) or null | no |  |
| `data.roll_receipt` | boolean or null | no |  |
| `data.rtv_gl_account_hint` | string or null | no |  |
| `data.shelf_life_warning_multiplier_pct` | integer (int32) | no |  |
| `data.track_inventory_by` | string or null | no |  |
| `data.weight_uom` | string or null | no |  |
| `data.write_off_gl_account_hint` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": OwnerConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_commingled_lpn` | boolean or null | no |  |
| `data.allow_duplicate_lpn` | boolean or null | no |  |
| `data.allow_mixed_lpn` | boolean or null | no |  |
| `data.allow_system_generated_lpn` | boolean or null | no |  |
| `data.auto_close_asn` | boolean or null | no |  |
| `data.auto_close_po` | boolean or null | no |  |
| `data.auto_print_lpn_on_receive` | boolean | yes |  |
| `data.carton_group` | string or null | no |  |
| `data.confirm_empty_on_move` | boolean | yes | Count spec Appendix L (wms-app 116): a manual move that takes the last stock of this owner out of its source location asks the operator whether the location is empty. |
| `data.cube_uom` | string or null | no |  |
| `data.damage_major_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_minor_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_total_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.default_allocation_policy_id` | integer (int64) or null | no |  |
| `data.default_cartonization_policy_id` | integer (int64) or null | no |  |
| `data.default_discard_loc` | string or null | no | E.2 (migration 162). |
| `data.default_inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no |  |
| `data.default_lot_policy_id` | integer (int64) or null | no |  |
| `data.default_putaway_policy_id` | integer (int64) or null | no |  |
| `data.default_qc_loc` | string or null | no |  |
| `data.default_receipt_policy_id` | integer (int64) or null | no |  |
| `data.default_receiving_loc` | string or null | no | Migration 350. |
| `data.default_replenishment_policy_id` | integer (int64) or null | no |  |
| `data.default_returns_loc` | string or null | no |  |
| `data.default_rtv_loc` | string or null | no | T-062 (migration 148). |
| `data.default_sku_rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.default_unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.dimension_uom` | string or null | no |  |
| `data.hide_expected_qty_from_operator` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lpn_length` | integer (int32) or null | no |  |
| `data.lpn_rollback_number` | integer (int64) or null | no |  |
| `data.lpn_start_number` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.next_lpn_number` | integer (int64) or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_code` | string or null | no |  |
| `data.putaway_reservation_ttl_min` | integer (int32) or null | no | Minutes a directed-putaway location reservation (`inventory_pending_move_in`) is held for this owner's stock before the TTL sweeper releases it. |
| `data.roll_receipt` | boolean or null | no |  |
| `data.rtv_gl_account_hint` | string or null | no | T-062 (migration 148). |
| `data.shelf_life_warning_multiplier_pct` | integer (int32) | yes |  |
| `data.track_inventory_by` | string or null | no |  |
| … | | | 2 more fields. See `openrpc.json`. |

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
  "method": "update_owner_config",
  "params": {
    "id": 1,
    "data": {
      "allow_commingled_lpn": false,
      "allow_duplicate_lpn": false
    }
  }
}'
```

## Module: putawayzone

### count_putawayzone

Count putawayzone — CRUD.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_putawayzone` |
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
| `filters[].inbound_loc` | string filter | no | Filter on `inbound_loc`. |
| `filters[].outbound_loc` | string filter | no | Filter on `outbound_loc`. |
| `filters[].picking_toloc` | string filter | no | Filter on `picking_toloc`. |
| `filters[].missing_toloc` | string filter | no | Filter on `missing_toloc`. |
| `filters[].replenishment_allowed` | boolean filter | no | Filter on `replenishment_allowed`. |
| `filters[].replenishment_threshold` | integer filter | no | Filter on `replenishment_threshold`. |
| `filters[].max_cube` | number filter | no | Filter on `max_cube`. |
| `filters[].max_weight` | number filter | no | Filter on `max_weight`. |
| `filters[].max_cases_count` | number filter | no | Filter on `max_cases_count`. |
| `filters[].auto_print_addr_label` | boolean filter | no | Filter on `auto_print_addr_label`. |
| `filters[].auto_print_carton_label` | boolean filter | no | Filter on `auto_print_carton_label`. |
| `filters[].default_label_printer` | string filter | no | Filter on `default_label_printer`. |
| `filters[].default_report_printer` | string filter | no | Filter on `default_report_printer`. |
| `filters[].rf_pick_strategy` | string filter | no | Filter on `rf_pick_strategy`. |
| `filters[].color` | string filter | no | Filter on `color`. |
| `filters[].min_temperature` | number filter | no | Filter on `min_temperature`. |
| `filters[].max_temperature` | number filter | no | Filter on `max_temperature`. |
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
  "method": "count_putawayzone",
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

### create_putawayzone

Create a new putawayzone — CRUD.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_putawayzone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PutawayZoneForCreate) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string or null | no |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.inbound_loc` | string or null | no |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.missing_toloc` | string or null | no |  |
| `data.outbound_loc` | string or null | no |  |
| `data.picking_toloc` | string or null | no |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PutawayZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string | yes |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inbound_loc` | string | yes |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data.missing_toloc` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.outbound_loc` | string | yes |  |
| `data.picking_toloc` | string | yes |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

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
  "method": "create_putawayzone",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### delete_putawayzone

Delete a putawayzone by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_putawayzone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string | yes |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inbound_loc` | string | yes |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data.missing_toloc` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.outbound_loc` | string | yes |  |
| `data.picking_toloc` | string | yes |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

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
  "method": "delete_putawayzone",
  "params": {
    "id": 1
  }
}'
```

### get_putawayzone

Get a putawayzone by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putawayzone` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string | yes |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inbound_loc` | string | yes |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data.missing_toloc` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.outbound_loc` | string | yes |  |
| `data.picking_toloc` | string | yes |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

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
  "method": "get_putawayzone",
  "params": {
    "id": 1
  }
}'
```

### get_putawayzone_by_code

Get putaway zone by code (varchar PK).

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putawayzone_by_code` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": PutawayZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string | yes |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inbound_loc` | string | yes |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data.missing_toloc` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.outbound_loc` | string | yes |  |
| `data.picking_toloc` | string | yes |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

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
  "method": "get_putawayzone_by_code",
  "params": {
    "code": "<code>"
  }
}'
```

### list_putawayzone

List putawayzone — CRUD.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_putawayzone` |
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
| `filters[].inbound_loc` | string filter | no | Filter on `inbound_loc`. |
| `filters[].outbound_loc` | string filter | no | Filter on `outbound_loc`. |
| `filters[].picking_toloc` | string filter | no | Filter on `picking_toloc`. |
| `filters[].missing_toloc` | string filter | no | Filter on `missing_toloc`. |
| `filters[].replenishment_allowed` | boolean filter | no | Filter on `replenishment_allowed`. |
| `filters[].replenishment_threshold` | integer filter | no | Filter on `replenishment_threshold`. |
| `filters[].max_cube` | number filter | no | Filter on `max_cube`. |
| `filters[].max_weight` | number filter | no | Filter on `max_weight`. |
| `filters[].max_cases_count` | number filter | no | Filter on `max_cases_count`. |
| `filters[].auto_print_addr_label` | boolean filter | no | Filter on `auto_print_addr_label`. |
| `filters[].auto_print_carton_label` | boolean filter | no | Filter on `auto_print_carton_label`. |
| `filters[].default_label_printer` | string filter | no | Filter on `default_label_printer`. |
| `filters[].default_report_printer` | string filter | no | Filter on `default_report_printer`. |
| `filters[].rf_pick_strategy` | string filter | no | Filter on `rf_pick_strategy`. |
| `filters[].color` | string filter | no | Filter on `color`. |
| `filters[].min_temperature` | number filter | no | Filter on `min_temperature`. |
| `filters[].max_temperature` | number filter | no | Filter on `max_temperature`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PutawayZone] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].auto_print_addr_label` | boolean or null | no |  |
| `data[].auto_print_carton_label` | boolean or null | no |  |
| `data[].code` | string | yes |  |
| `data[].color` | string | yes |  |
| `data[].default_label_printer` | string or null | no |  |
| `data[].default_report_printer` | string or null | no |  |
| `data[].description` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inbound_loc` | string | yes |  |
| `data[].max_cases_count` | number (double) or null | no |  |
| `data[].max_cube` | number (double) or null | no |  |
| `data[].max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data[].max_weight` | number (double) or null | no |  |
| `data[].min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data[].missing_toloc` | string | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].outbound_loc` | string | yes |  |
| `data[].picking_toloc` | string | yes |  |
| `data[].replenishment_allowed` | boolean or null | no |  |
| `data[].replenishment_threshold` | integer (int32) or null | no |  |
| `data[].rf_pick_strategy` | string or null | no |  |

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
  "method": "list_putawayzone",
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

### update_putawayzone

Update putaway-zone settings without changing its stable code.

| | |
|---|---|
| Context / module | master_data / putawayzone |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_putawayzone` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PutawayZoneUpdateApi) | yes |  |
| `data.auto_print_addr_label` | boolean | no |  |
| `data.auto_print_carton_label` | boolean | no |  |
| `data.color` | string | no |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | no |  |
| `data.inbound_loc` | string | no |  |
| `data.max_cases_count` | number (double) | no |  |
| `data.max_cube` | number (double) | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.max_weight` | number (double) | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.missing_toloc` | string | no |  |
| `data.outbound_loc` | string | no |  |
| `data.picking_toloc` | string | no |  |
| `data.replenishment_allowed` | boolean | no |  |
| `data.replenishment_threshold` | integer (int32) | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PutawayZone }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_print_addr_label` | boolean or null | no |  |
| `data.auto_print_carton_label` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.color` | string | yes |  |
| `data.default_label_printer` | string or null | no |  |
| `data.default_report_printer` | string or null | no |  |
| `data.description` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inbound_loc` | string | yes |  |
| `data.max_cases_count` | number (double) or null | no |  |
| `data.max_cube` | number (double) or null | no |  |
| `data.max_temperature` | number (double) or null | no | Warmest temperature this zone holds. |
| `data.max_weight` | number (double) or null | no |  |
| `data.min_temperature` | number (double) or null | no | Coldest temperature this zone holds. |
| `data.missing_toloc` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.outbound_loc` | string | yes |  |
| `data.picking_toloc` | string | yes |  |
| `data.replenishment_allowed` | boolean or null | no |  |
| `data.replenishment_threshold` | integer (int32) or null | no |  |
| `data.rf_pick_strategy` | string or null | no |  |

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
  "method": "update_putawayzone",
  "params": {
    "id": 1,
    "data": {
      "auto_print_addr_label": false,
      "auto_print_carton_label": false
    }
  }
}'
```

## Module: location

### count_loc

Count locations.

| | |
|---|---|
| Context / module | master_data / location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_loc` |
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
| `filters[].cube` | number filter | no | Filter on `cube`. |
| `filters[].length` | number filter | no | Filter on `length`. |
| `filters[].width` | number filter | no | Filter on `width`. |
| `filters[].height` | number filter | no | Filter on `height`. |
| `filters[].loc_type` | string filter | no | Filter on `loc_type`. |
| `filters[].loc_flag` | string filter | no | Filter on `loc_flag`. |
| `filters[].loc_processing_type` | string filter | no | Filter on `loc_processing_type`. |
| `filters[].loc_category` | string filter | no | Filter on `loc_category`. |
| `filters[].route_sequence` | string filter | no | Filter on `route_sequence`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].max_cube_capacity` | number filter | no | Filter on `max_cube_capacity`. |
| `filters[].max_weight_capacity` | number filter | no | Filter on `max_weight_capacity`. |
| `filters[].discard_lpn` | boolean filter | no | Filter on `discard_lpn`. |
| `filters[].abc` | string filter | no | Filter on `abc`. |
| `filters[].putawayzone` | string filter | no | Filter on `putawayzone`. |
| `filters[].mix_sku` | boolean filter | no | Filter on `mix_sku`. |
| `filters[].mix_lot` | boolean filter | no | Filter on `mix_lot`. |
| `filters[].level` | integer filter | no | Filter on `level`. |
| `filters[].check_digit` | string filter | no | Filter on `check_digit`. |
| `filters[].x_coord` | number filter | no | Filter on `x_coord`. |
| `filters[].y_coord` | number filter | no | Filter on `y_coord`. |
| `filters[].z_coord` | number filter | no | Filter on `z_coord`. |
| `filters[].aisle` | string filter | no | Filter on `aisle`. |
| `filters[].bay` | integer filter | no | Filter on `bay`. |
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
  "method": "count_loc",
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

### create_loc

Create a location (auto check-digit).

| | |
|---|---|
| Context / module | master_data / location |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_loc` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LocForCreate) | yes |  |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.aisle` | string or null | no |  |
| `data.bay` | integer (int32) or null | no |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) or null | no |  |
| `data.height` | number (double) or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) or null | no |  |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff or null | no |  |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) or null | no |  |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no |  |
| `data.stack_limit` | integer (int16) or null | no |  |
| `data.status` | one of: Ok \| Hold \| Damage or null | no |  |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) or null | no |  |
| `data.y_coord` | number (double) or null | no |  |
| `data.z_coord` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Loc }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string | yes |  |
| `data.bay` | integer (int32) | yes |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data.height` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data.stack_limit` | integer (int16) | yes |  |
| `data.status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) | yes |  |
| `data.y_coord` | number (double) | yes |  |
| `data.z_coord` | number (double) | yes |  |

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
  "method": "create_loc",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### delete_loc

Delete a location.

| | |
|---|---|
| Context / module | master_data / location |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_loc` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Loc }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string | yes |  |
| `data.bay` | integer (int32) | yes |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data.height` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data.stack_limit` | integer (int16) | yes |  |
| `data.status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) | yes |  |
| `data.y_coord` | number (double) | yes |  |
| `data.z_coord` | number (double) | yes |  |

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
  "method": "delete_loc",
  "params": {
    "id": 1
  }
}'
```

### delete_many_locs

Delete multiple locations by IDs.

| | |
|---|---|
| Context / module | master_data / location |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_locs` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

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
  "method": "delete_many_locs",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### gen_locs

Generate locations from a pattern (bulk create).

| | |
|---|---|
| Context / module | master_data / location |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `gen_locs` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LocGenerationRequest) | yes | Backward-compatible generator wire data. |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.aisle` | string or null | no |  |
| `data.bay` | integer (int32) or null | no |  |
| `data.check_digit` | string or null | no |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.exclude_codes` | array of string | no |  |
| `data.expected_pattern` | string or null | no |  |
| `data.footprint` | integer (int16) or null | no |  |
| `data.generator_attributes` | object (LocationGeneratorAttributes) | yes |  |
| `data.generator_attributes.aisle_pfx` | string or null | no |  |
| `data.generator_attributes.aisle_sfx` | string or null | no |  |
| `data.generator_attributes.aisles` | object (LocationCodeGenRange) | yes |  |
| `data.generator_attributes.level_pfx` | string or null | no |  |
| `data.generator_attributes.level_sfx` | string or null | no |  |
| `data.generator_attributes.levels` | object (LocationCodeGenRange) | yes |  |
| `data.generator_attributes.loc_pfx` | string or null | no |  |
| `data.generator_attributes.loc_sfx` | string or null | no |  |
| `data.generator_attributes.locs` | object (LocationCodeGenRange) | yes |  |
| `data.height` | number (double) or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) or null | no |  |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff or null | no |  |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) or null | no |  |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no |  |
| `data.stack_limit` | integer (int16) or null | no |  |
| `data.status` | one of: Ok \| Hold \| Damage or null | no |  |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) or null | no |  |
| `data.y_coord` | number (double) or null | no |  |
| `data.z_coord` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": [Loc] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].abc` | one of: A \| B \| C or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].aisle` | string | yes |  |
| `data[].bay` | integer (int32) | yes |  |
| `data[].check_digit` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].cube` | number (double) or null | no |  |
| `data[].discard_lpn` | boolean or null | no |  |
| `data[].footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data[].height` | number (double) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].length` | number (double) or null | no |  |
| `data[].level` | integer (int32) or null | no |  |
| `data[].loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data[].loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data[].loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data[].loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data[].max_cube_capacity` | number (double) or null | no |  |
| `data[].max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data[].max_weight_capacity` | number (double) or null | no |  |
| `data[].mix_lot` | boolean or null | no |  |
| `data[].mix_sku` | boolean or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone` | string | yes |  |
| `data[].route_sequence` | string or null | no |  |
| `data[].section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data[].stack_limit` | integer (int16) | yes |  |
| `data[].status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data[].width` | number (double) or null | no |  |
| `data[].x_coord` | number (double) | yes |  |
| `data[].y_coord` | number (double) | yes |  |
| `data[].z_coord` | number (double) | yes |  |

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
  "method": "gen_locs",
  "params": {
    "data": {
      "generator_attributes": {
        "aisles": {
          "end": 1,
          "start": 1
        },
        "levels": {
          "end": 1,
          "start": 1
        },
        "locs": {
          "end": 1,
          "start": 1
        }
      }
    }
  }
}'
```

### get_loc

Get a location by ID.

| | |
|---|---|
| Context / module | master_data / location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_loc` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Loc }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string | yes |  |
| `data.bay` | integer (int32) | yes |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data.height` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data.stack_limit` | integer (int16) | yes |  |
| `data.status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) | yes |  |
| `data.y_coord` | number (double) | yes |  |
| `data.z_coord` | number (double) | yes |  |

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
  "method": "get_loc",
  "params": {
    "id": 1
  }
}'
```

### get_loc_by_code

Get location by code (varchar PK).

| | |
|---|---|
| Context / module | master_data / location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_loc_by_code` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": Loc }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string | yes |  |
| `data.bay` | integer (int32) | yes |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data.height` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data.stack_limit` | integer (int16) | yes |  |
| `data.status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) | yes |  |
| `data.y_coord` | number (double) | yes |  |
| `data.z_coord` | number (double) | yes |  |

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
  "method": "get_loc_by_code",
  "params": {
    "code": "<code>"
  }
}'
```

### list_loc

List locations (filtered).

| | |
|---|---|
| Context / module | master_data / location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_loc` |
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
| `filters[].cube` | number filter | no | Filter on `cube`. |
| `filters[].length` | number filter | no | Filter on `length`. |
| `filters[].width` | number filter | no | Filter on `width`. |
| `filters[].height` | number filter | no | Filter on `height`. |
| `filters[].loc_type` | string filter | no | Filter on `loc_type`. |
| `filters[].loc_flag` | string filter | no | Filter on `loc_flag`. |
| `filters[].loc_processing_type` | string filter | no | Filter on `loc_processing_type`. |
| `filters[].loc_category` | string filter | no | Filter on `loc_category`. |
| `filters[].route_sequence` | string filter | no | Filter on `route_sequence`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].max_cube_capacity` | number filter | no | Filter on `max_cube_capacity`. |
| `filters[].max_weight_capacity` | number filter | no | Filter on `max_weight_capacity`. |
| `filters[].discard_lpn` | boolean filter | no | Filter on `discard_lpn`. |
| `filters[].abc` | string filter | no | Filter on `abc`. |
| `filters[].putawayzone` | string filter | no | Filter on `putawayzone`. |
| `filters[].mix_sku` | boolean filter | no | Filter on `mix_sku`. |
| `filters[].mix_lot` | boolean filter | no | Filter on `mix_lot`. |
| `filters[].level` | integer filter | no | Filter on `level`. |
| `filters[].check_digit` | string filter | no | Filter on `check_digit`. |
| `filters[].x_coord` | number filter | no | Filter on `x_coord`. |
| `filters[].y_coord` | number filter | no | Filter on `y_coord`. |
| `filters[].z_coord` | number filter | no | Filter on `z_coord`. |
| `filters[].aisle` | string filter | no | Filter on `aisle`. |
| `filters[].bay` | integer filter | no | Filter on `bay`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Loc] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].abc` | one of: A \| B \| C or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].aisle` | string | yes |  |
| `data[].bay` | integer (int32) | yes |  |
| `data[].check_digit` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].cube` | number (double) or null | no |  |
| `data[].discard_lpn` | boolean or null | no |  |
| `data[].footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data[].height` | number (double) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].length` | number (double) or null | no |  |
| `data[].level` | integer (int32) or null | no |  |
| `data[].loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data[].loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data[].loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data[].loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data[].max_cube_capacity` | number (double) or null | no |  |
| `data[].max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data[].max_weight_capacity` | number (double) or null | no |  |
| `data[].mix_lot` | boolean or null | no |  |
| `data[].mix_sku` | boolean or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone` | string | yes |  |
| `data[].route_sequence` | string or null | no |  |
| `data[].section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data[].stack_limit` | integer (int16) | yes |  |
| `data[].status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data[].width` | number (double) or null | no |  |
| `data[].x_coord` | number (double) | yes |  |
| `data[].y_coord` | number (double) | yes |  |
| `data[].z_coord` | number (double) | yes |  |

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
  "method": "list_loc",
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

### preview_gen_locs

Preview generated locations and per-location attributes without creating them.

| | |
|---|---|
| Context / module | master_data / location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `preview_gen_locs` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LocGenerationRequest) | yes | Backward-compatible generator wire data. |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.aisle` | string or null | no |  |
| `data.bay` | integer (int32) or null | no |  |
| `data.check_digit` | string or null | no |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.exclude_codes` | array of string | no |  |
| `data.expected_pattern` | string or null | no |  |
| `data.footprint` | integer (int16) or null | no |  |
| `data.generator_attributes` | object (LocationGeneratorAttributes) | yes |  |
| `data.generator_attributes.aisle_pfx` | string or null | no |  |
| `data.generator_attributes.aisle_sfx` | string or null | no |  |
| `data.generator_attributes.aisles` | object (LocationCodeGenRange) | yes |  |
| `data.generator_attributes.level_pfx` | string or null | no |  |
| `data.generator_attributes.level_sfx` | string or null | no |  |
| `data.generator_attributes.levels` | object (LocationCodeGenRange) | yes |  |
| `data.generator_attributes.loc_pfx` | string or null | no |  |
| `data.generator_attributes.loc_sfx` | string or null | no |  |
| `data.generator_attributes.locs` | object (LocationCodeGenRange) | yes |  |
| `data.height` | number (double) or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) or null | no |  |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff or null | no |  |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) or null | no |  |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no |  |
| `data.stack_limit` | integer (int16) or null | no |  |
| `data.status` | one of: Ok \| Hold \| Damage or null | no |  |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) or null | no |  |
| `data.y_coord` | number (double) or null | no |  |
| `data.z_coord` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": LocationGenerationPreview }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.excluded_count` | integer (uint) | yes |  |
| `data.pattern` | string | yes |  |
| `data.rows` | array of object (LocForCreate) | yes |  |
| `data.rows[].abc` | one of: A \| B \| C or null | no |  |
| `data.rows[].aisle` | string or null | no |  |
| `data.rows[].bay` | integer (int32) or null | no |  |
| `data.rows[].check_digit` | string or null | no |  |
| `data.rows[].code` | string | yes |  |
| `data.rows[].cube` | number (double) or null | no |  |
| `data.rows[].discard_lpn` | boolean or null | no |  |
| `data.rows[].footprint` | integer (int16) or null | no |  |
| `data.rows[].height` | number (double) or null | no |  |
| `data.rows[].length` | number (double) or null | no |  |
| `data.rows[].level` | integer (int32) or null | no |  |
| `data.rows[].loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) or null | no |  |
| `data.rows[].loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff or null | no |  |
| `data.rows[].loc_processing_type` | one of: None \| Pallet \| Case \| Piece or null | no |  |
| `data.rows[].loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.rows[].max_cube_capacity` | number (double) or null | no |  |
| `data.rows[].max_qty_capacity` | number (double) or null | no |  |
| `data.rows[].max_weight_capacity` | number (double) or null | no |  |
| `data.rows[].mix_lot` | boolean or null | no |  |
| `data.rows[].mix_sku` | boolean or null | no |  |
| `data.rows[].putawayzone` | string or null | no |  |
| `data.rows[].route_sequence` | string or null | no |  |
| `data.rows[].section` | string or null | no |  |
| `data.rows[].stack_limit` | integer (int16) or null | no |  |
| `data.rows[].status` | one of: Ok \| Hold \| Damage or null | no |  |
| `data.rows[].width` | number (double) or null | no |  |
| `data.rows[].x_coord` | number (double) or null | no |  |
| `data.rows[].y_coord` | number (double) or null | no |  |
| `data.rows[].z_coord` | number (double) or null | no |  |
| `data.total_count` | integer (uint) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "excluded_count": 1,
      "pattern": "<pattern>",
      "rows": [
        {
          "code": "<code>"
        }
      ],
      "total_count": 1
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
  "method": "preview_gen_locs",
  "params": {
    "data": {
      "generator_attributes": {
        "aisles": {
          "end": 1,
          "start": 1
        },
        "levels": {
          "end": 1,
          "start": 1
        },
        "locs": {
          "end": 1,
          "start": 1
        }
      }
    }
  }
}'
```

### update_loc

Update a location; an explicit JSON null or a blank on section clears it back to NULL (its own section).

| | |
|---|---|
| Context / module | master_data / location |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_loc` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (LocForUpdate) | yes |  |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.aisle` | string or null | no |  |
| `data.bay` | integer (int32) or null | no |  |
| `data.check_digit` | string or null | no |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) or null | no |  |
| `data.height` | number (double) or null | no |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) or null | no |  |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff or null | no |  |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) or null | no |  |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no |  |
| `data.stack_limit` | integer (int16) or null | no |  |
| `data.status` | one of: Ok \| Hold \| Damage or null | no |  |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) or null | no |  |
| `data.y_coord` | number (double) or null | no |  |
| `data.z_coord` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Loc }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string | yes |  |
| `data.bay` | integer (int32) | yes |  |
| `data.check_digit` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.discard_lpn` | boolean or null | no |  |
| `data.footprint` | integer (int16) | yes | How many pallets stand on the floor here, and how high they stack. |
| `data.height` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.length` | number (double) or null | no |  |
| `data.level` | integer (int32) or null | no |  |
| `data.loc_category` | one of: None \| NoPalletization \| Asrs \| CantileverRack \| CartonFlow \| DenseStorage \| DoubleDeepRack \| DriveInRack \| DriveThroughRack \| HorizontalCarousel \| Other \| PalletFlowRack \| … (+5) | yes | LocCategory - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_category` (phase 2a) holds a `PropRule<LocCategory>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.loc_flag` | one of: None \| CycleCountActive \| SanitationActive \| MaintenanceActive \| ReceivingHoldoff | yes | LocFlag — operational temporary state (NOT location status). |
| `data.loc_processing_type` | one of: None \| Pallet \| Case \| Piece | yes | LocProcessingType represents the multiselect values for the location handling field `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_processing_type` (phase 2a) holds a `PropRule<LocProcessingType>`, and `CandidateFilter` derives `P… |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) | yes | LocType — dependent type, mirrors PostgreSQL `loc_type` enum. |
| `data.max_cube_capacity` | number (double) or null | no |  |
| `data.max_qty_capacity` | number (double) | yes | How much stock this location holds before it is full, in its own UOM. |
| `data.max_weight_capacity` | number (double) or null | no |  |
| `data.mix_lot` | boolean or null | no |  |
| `data.mix_sku` | boolean or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string | yes |  |
| `data.route_sequence` | string or null | no |  |
| `data.section` | string or null | no | The run of positions this location belongs to — locations with no beam between them. |
| `data.stack_limit` | integer (int16) | yes |  |
| `data.status` | one of: Ok \| Hold \| Damage | yes | LocStatus - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`): `CandidateFilter::loc_status` (phase 2a) holds a `PropRule<LocStatus>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.width` | number (double) or null | no |  |
| `data.x_coord` | number (double) | yes |  |
| `data.y_coord` | number (double) | yes |  |
| `data.z_coord` | number (double) | yes |  |

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
  "method": "update_loc",
  "params": {
    "id": 1,
    "data": {
      "abc": "A",
      "aisle": "<aisle>"
    }
  }
}'
```

## Module: loc_lot_commingle

### count_loc_lot_commingle

Count location lot commingle rules.

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].location_code` | string filter | no | Filter on `location_code`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].allow_mix` | boolean filter | no | Filter on `allow_mix`. |
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
  "method": "count_loc_lot_commingle",
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

### create_loc_lot_commingle

Create a location lot commingle rule.

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LocLotCommingleForCreate) | yes |  |
| `data.allow_mix` | boolean or null | no |  |
| `data.attrib_code` | string | yes |  |
| `data.location_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": LocLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location_code` | string | yes |  |
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
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "location_code": "<location_code>",
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
  "method": "create_loc_lot_commingle",
  "params": {
    "data": {
      "attrib_code": "<attrib_code>",
      "location_code": "<location_code>"
    }
  }
}'
```

### delete_loc_lot_commingle

Delete a location lot commingle rule.

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LocLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location_code` | string | yes |  |
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
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "location_code": "<location_code>",
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
  "method": "delete_loc_lot_commingle",
  "params": {
    "id": 1
  }
}'
```

### get_loc_lot_commingle

Get a location lot commingle rule by ID.

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LocLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location_code` | string | yes |  |
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
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "location_code": "<location_code>",
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
  "method": "get_loc_lot_commingle",
  "params": {
    "id": 1
  }
}'
```

### list_loc_lot_commingle

List location lot commingle rules (filtered).

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].location_code` | string filter | no | Filter on `location_code`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].allow_mix` | boolean filter | no | Filter on `allow_mix`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LocLotCommingle] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_mix` | boolean | yes |  |
| `data[].attrib_code` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].location_code` | string | yes |  |
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
  "method": "list_loc_lot_commingle",
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

### update_loc_lot_commingle

Update a location lot commingle rule.

| | |
|---|---|
| Context / module | master_data / loc_lot_commingle |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_loc_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (LocLotCommingleForUpdate) | yes |  |
| `data.allow_mix` | boolean or null | no |  |
| `data.attrib_code` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": LocLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location_code` | string | yes |  |
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
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "location_code": "<location_code>",
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
  "method": "update_loc_lot_commingle",
  "params": {
    "id": 1,
    "data": {
      "allow_mix": false,
      "attrib_code": "<attrib_code>"
    }
  }
}'
```

## Module: putawayzone_lot_commingle

### count_putawayzone_lot_commingle

Count putawayzone lot commingle rules.

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putawayzone_code` | string filter | no | Filter on `putawayzone_code`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].allow_mix` | boolean filter | no | Filter on `allow_mix`. |
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
  "method": "count_putawayzone_lot_commingle",
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

### create_putawayzone_lot_commingle

Create a putawayzone lot commingle rule.

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PutawayzoneLotCommingleForCreate) | yes |  |
| `data.allow_mix` | boolean or null | no |  |
| `data.attrib_code` | string | yes |  |
| `data.putawayzone_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": PutawayzoneLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone_code` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone_code": "<putawayzone_code>"
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
  "method": "create_putawayzone_lot_commingle",
  "params": {
    "data": {
      "attrib_code": "<attrib_code>",
      "putawayzone_code": "<putawayzone_code>"
    }
  }
}'
```

### delete_putawayzone_lot_commingle

Delete a putawayzone lot commingle rule.

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayzoneLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone_code` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone_code": "<putawayzone_code>"
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
  "method": "delete_putawayzone_lot_commingle",
  "params": {
    "id": 1
  }
}'
```

### get_putawayzone_lot_commingle

Get a putawayzone lot commingle rule by ID.

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayzoneLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone_code` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone_code": "<putawayzone_code>"
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
  "method": "get_putawayzone_lot_commingle",
  "params": {
    "id": 1
  }
}'
```

### list_putawayzone_lot_commingle

List putawayzone lot commingle rules (filtered).

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putawayzone_code` | string filter | no | Filter on `putawayzone_code`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].allow_mix` | boolean filter | no | Filter on `allow_mix`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PutawayzoneLotCommingle] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_mix` | boolean | yes |  |
| `data[].attrib_code` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone_code` | string | yes |  |

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
  "method": "list_putawayzone_lot_commingle",
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

### update_putawayzone_lot_commingle

Update a putawayzone lot commingle rule.

| | |
|---|---|
| Context / module | master_data / putawayzone_lot_commingle |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_putawayzone_lot_commingle` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PutawayzoneLotCommingleForUpdate) | yes |  |
| `data.allow_mix` | boolean or null | no |  |
| `data.attrib_code` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PutawayzoneLotCommingle }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mix` | boolean | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone_code` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_mix": false,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "putawayzone_code": "<putawayzone_code>"
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
  "method": "update_putawayzone_lot_commingle",
  "params": {
    "id": 1,
    "data": {
      "allow_mix": false,
      "attrib_code": "<attrib_code>"
    }
  }
}'
```

## Module: sku

### create_sku

Create a SKU master-data root after validating its packaging UOM.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SkuForCreate) | yes | Used when creating a new SKU. |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no |  |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean or null | no |  |
| `data.return_location` | string or null | no |  |
| `data.rotate_by` | string or null | no |  |
| `data.rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.shelf_life` | integer (int32) or null | no |  |
| `data.sku_group` | string or null | no |  |
| `data.stack_limit` | integer (int16) or null | no |  |
| `data.tare_weight` | number (double) or null | no |  |
| `data.warning_temperature_max` | number (double) or null | no |  |
| `data.warning_temperature_min` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Sku }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "create_sku",
  "params": {
    "data": {
      "code": "<code>",
      "descr": "<descr>",
      "owner_id": 1,
      "pack_id": 1
    }
  }
}'
```

### create_sku_full

Create a SKU and optional serial configuration atomically.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_sku_full` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SkuFullForCreate) | yes |  |
| `data.serial_config` | object (SkuSerialConfigForCreateInner) or null | no |  |
| `data.serial_config.allow_asn_pre_advised` | boolean or null | no |  |
| `data.serial_config.allow_deferred_capture` | boolean or null | no |  |
| `data.serial_config.allow_receive_capture` | boolean or null | no |  |
| `data.serial_config.anomaly_block_severity` | boolean or null | no |  |
| `data.serial_config.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.serial_config.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.serial_config.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.serial_config.check_digit_algorithm` | string or null | no |  |
| `data.serial_config.continuous_serial_tracking` | boolean or null | no |  |
| `data.serial_config.industry_profile` | string or null | no |  |
| `data.serial_config.multi_serial_delimiter` | string or null | no |  |
| `data.serial_config.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.serial_config.pick_episode_reassignment_mode` | string or null | no |  |
| `data.serial_config.profile_mode` | string or null | no |  |
| `data.serial_config.require_unique_global` | boolean or null | no |  |
| `data.serial_config.serial_auto_increment` | boolean or null | no |  |
| `data.serial_config.serial_format` | string or null | no |  |
| `data.serial_config.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_config.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_config.serial_length` | integer (int32) or null | no |  |
| `data.serial_config.serial_mask_format` | string or null | no |  |
| `data.serial_config.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_config.serial_parse_mode` | one of: None \| Fixed \| Bounded or null | no |  |
| `data.serial_config.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_config.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_config.serial_scope` | string or null | no |  |
| `data.serial_config.serials_per_barcode` | integer (int32) or null | no |  |
| `data.serial_config.warranty_period_days` | integer (int32) or null | no |  |
| `data.sku` | object (SkuForCreate) | yes | Used when creating a new SKU. |
| `data.sku.abc` | one of: A \| B \| C or null | no |  |
| `data.sku.active` | boolean or null | no |  |
| `data.sku.allocation_policy_id` | integer (int64) or null | no |  |
| `data.sku.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.sku.barcode_format_id` | integer (int64) or null | no |  |
| `data.sku.best_by_days` | integer (int32) or null | no |  |
| `data.sku.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.sku.class` | string or null | no |  |
| `data.sku.code` | string | yes |  |
| `data.sku.cube` | number (double) or null | no |  |
| `data.sku.default_uom` | string or null | no |  |
| `data.sku.deliver_by_days` | integer (int32) or null | no |  |
| `data.sku.descr` | string | yes |  |
| `data.sku.expire_days` | integer (int32) or null | no |  |
| `data.sku.external_id` | string or null | no |  |
| `data.sku.gross_wgt` | number (double) or null | no |  |
| `data.sku.lot_policy_id` | integer (int64) or null | no |  |
| `data.sku.max_age_on_rec` | integer (int32) or null | no |  |
| `data.sku.max_temperature` | number (double) or null | no |  |
| `data.sku.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.sku.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.sku.min_temperature` | number (double) or null | no |  |
| `data.sku.net_wgt` | number (double) or null | no |  |
| `data.sku.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.sku.owner_id` | integer (int64) | yes |  |
| `data.sku.pack_id` | integer (int64) | yes |  |
| `data.sku.pack_location` | string or null | no |  |
| `data.sku.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.sku.positions_required` | integer (int16) or null | no |  |
| `data.sku.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.sku.putaway_loc` | string or null | no |  |
| `data.sku.putaway_policy_id` | integer (int64) or null | no |  |
| `data.sku.putawayzone` | string or null | no |  |
| `data.sku.receipt_hold_code` | string or null | no |  |
| `data.sku.receipt_policy_id` | integer (int64) or null | no |  |
| `data.sku.receipt_qc_loc` | string or null | no |  |
| `data.sku.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.sku.requires_temperature_capture` | boolean or null | no |  |
| `data.sku.return_location` | string or null | no |  |
| `data.sku.rotate_by` | string or null | no |  |
| `data.sku.rotation` | one of: Fifo \| Lifo \| Fefo or null | no |  |
| `data.sku.shelf_life` | integer (int32) or null | no |  |
| `data.sku.sku_group` | string or null | no |  |
| `data.sku.stack_limit` | integer (int16) or null | no |  |
| `data.sku.tare_weight` | number (double) or null | no |  |
| `data.sku.warning_temperature_max` | number (double) or null | no |  |
| `data.sku.warning_temperature_min` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 43 more fields. See `openrpc.json`. |

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
  "method": "create_sku_full",
  "params": {
    "data": {
      "sku": {
        "code": "<code>",
        "descr": "<descr>",
        "owner_id": 1,
        "pack_id": 1
      }
    }
  }
}'
```

### delete_sku

Delete an unreferenced SKU and its owned serial configuration.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Sku }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "delete_sku",
  "params": {
    "id": 1
  }
}'
```

### get_sku

Get a sku by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Sku }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "get_sku",
  "params": {
    "id": 1
  }
}'
```

### get_sku_full

Get SKU with its optional serial configuration.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku_full` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 43 more fields. See `openrpc.json`. |

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
  "method": "get_sku_full",
  "params": {
    "id": 1
  }
}'
```

### get_sku_info

Get SKU by sku_code + owner_id.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_sku_info` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `owner_id` | integer (int64) or null | no |  |
| `sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": Sku }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "get_sku_info",
  "params": {
    "sku_code": "<sku_code>"
  }
}'
```

### list_sku

List sku — CRUD.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].tare_weight` | number filter | no | Filter on `tare_weight`. |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].external_id` | string filter | no | Filter on `external_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].gross_wgt` | number filter | no | Filter on `gross_wgt`. |
| `filters[].net_wgt` | number filter | no | Filter on `net_wgt`. |
| `filters[].cube` | number filter | no | Filter on `cube`. |
| `filters[].abc` | string filter | no | Filter on `abc`. |
| `filters[].class` | string filter | no | Filter on `class`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `filters[].sku_group` | string filter | no | Filter on `sku_group`. |
| `filters[].barcode_format_id` | integer filter | no | Filter on `barcode_format_id`. |
| `filters[].allocation_policy_id` | integer filter | no | Filter on `allocation_policy_id`. |
| `filters[].replenishment_policy_id` | integer filter | no | Filter on `replenishment_policy_id`. |
| `filters[].putaway_policy_id` | integer filter | no | Filter on `putaway_policy_id`. |
| `filters[].cartonization_policy_id` | integer filter | no | Filter on `cartonization_policy_id`. |
| `filters[].receipt_policy_id` | integer filter | no | Filter on `receipt_policy_id`. |
| `filters[].lot_policy_id` | integer filter | no | Filter on `lot_policy_id`. |
| `filters[].on_rec_copy_receipt_number` | boolean filter | no | Filter on `on_rec_copy_receipt_number`. |
| `filters[].putaway_loc` | string filter | no | Filter on `putaway_loc`. |
| `filters[].putawayzone` | string filter | no | Filter on `putawayzone`. |
| `filters[].putaway_class` | string filter | no | Filter on `putaway_class`. |
| `filters[].receipt_qc_loc` | string filter | no | Filter on `receipt_qc_loc`. |
| `filters[].default_uom` | string filter | no | Filter on `default_uom`. |
| `filters[].return_location` | string filter | no | Filter on `return_location`. |
| `filters[].pack_location` | string filter | no | Filter on `pack_location`. |
| `filters[].rotation` | string filter | no | Filter on `rotation`. |
| `filters[].shelf_life` | integer filter | no | Filter on `shelf_life`. |
| `filters[].min_shelf_life_on_pick` | integer filter | no | Filter on `min_shelf_life_on_pick`. |
| `filters[].min_shelf_life_on_rec` | integer filter | no | Filter on `min_shelf_life_on_rec`. |
| `filters[].receipt_hold_code` | string filter | no | Filter on `receipt_hold_code`. |
| `filters[].expire_days` | integer filter | no | Filter on `expire_days`. |
| `filters[].deliver_by_days` | integer filter | no | Filter on `deliver_by_days`. |
| `filters[].best_by_days` | integer filter | no | Filter on `best_by_days`. |
| `filters[].allow_multi_lot_on_lpn` | boolean filter | no | Filter on `allow_multi_lot_on_lpn`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Sku] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].abc` | one of: A \| B \| C or null | no |  |
| `data[].active` | boolean or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allocation_policy_id` | integer (int64) or null | no |  |
| `data[].allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data[].barcode_format_id` | integer (int64) or null | no |  |
| `data[].best_by_days` | integer (int32) or null | no |  |
| `data[].cartonization_policy_id` | integer (int64) or null | no |  |
| `data[].class` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].cube` | number (double) or null | no |  |
| `data[].default_uom` | string or null | no |  |
| `data[].deliver_by_days` | integer (int32) or null | no |  |
| `data[].descr` | string | yes |  |
| `data[].expire_days` | integer (int32) or null | no |  |
| `data[].external_id` | string or null | no |  |
| `data[].force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data[].gross_wgt` | number (double) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot_policy_id` | integer (int64) or null | no |  |
| `data[].max_age_on_rec` | integer (int32) or null | no |  |
| `data[].max_temperature` | number (double) or null | no |  |
| `data[].min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data[].min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data[].min_temperature` | number (double) or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].net_wgt` | number (double) or null | no |  |
| `data[].on_rec_copy_receipt_number` | boolean or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].pack_location` | string or null | no |  |
| `data[].pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data[].positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data[].putaway_class` | one of: None \| NoMix or null | no |  |
| `data[].putaway_loc` | string or null | no |  |
| `data[].putaway_policy_id` | integer (int64) or null | no |  |
| `data[].putawayzone` | string or null | no |  |
| `data[].receipt_hold_code` | string or null | no |  |
| `data[].receipt_policy_id` | integer (int64) or null | no |  |
| `data[].receipt_qc_loc` | string or null | no |  |
| `data[].replenishment_policy_id` | integer (int64) or null | no |  |
| `data[].requires_temperature_capture` | boolean | yes |  |
| `data[].return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "list_sku",
  "params": {
    "filters": [
      {
        "tare_weight": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_sku

Update mutable SKU attributes without changing owner or SKU code.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (SkuUpdateApi) | yes |  |
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean | no |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) | no |  |
| `data.class` | string or null | no |  |
| `data.cube` | number (double) | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | no |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.gross_wgt` | number (double) | no |  |
| `data.lot_policy_id` | integer (int64) | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.net_wgt` | number (double) | no |  |
| `data.on_rec_copy_receipt_number` | boolean | no |  |
| `data.pack_id` | integer (int64) | no |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no |  |
| `data.positions_required` | integer (int16) | no |  |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) | no |  |
| `data.requires_temperature_capture` | boolean | no |  |
| `data.return_location` | string or null | no |  |
| `data.rotate_by` | string | no |  |
| `data.rotation` | one of: Fifo \| Lifo \| Fefo | no | Represents SKU rotation policy, determining the order in which stock is picked. |
| `data.shelf_life` | integer (int32) or null | no |  |
| `data.sku_group` | string or null | no |  |
| `data.stack_limit` | integer (int16) | no |  |
| `data.tare_weight` | number (double) | no |  |
| `data.warning_temperature_max` | number (double) or null | no |  |
| `data.warning_temperature_min` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": Sku }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 8 more fields. See `openrpc.json`. |

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
  "method": "update_sku",
  "params": {
    "id": 1,
    "data": {
      "abc": "A",
      "active": false
    }
  }
}'
```

### update_sku_full

Update a SKU aggregate atomically.

| | |
|---|---|
| Context / module | master_data / sku |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_sku_full` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (SkuFullForUpdate) | yes |  |
| `data.serial_config` | object (SkuSerialConfigForCreateInner) or object or null | no |  |
| `data.sku` | object (SkuUpdateApi) or null | no |  |
| `data.sku.abc` | one of: A \| B \| C or null | no |  |
| `data.sku.active` | boolean | no |  |
| `data.sku.allocation_policy_id` | integer (int64) or null | no |  |
| `data.sku.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.sku.barcode_format_id` | integer (int64) or null | no |  |
| `data.sku.best_by_days` | integer (int32) or null | no |  |
| `data.sku.cartonization_policy_id` | integer (int64) | no |  |
| `data.sku.class` | string or null | no |  |
| `data.sku.cube` | number (double) | no |  |
| `data.sku.default_uom` | string or null | no |  |
| `data.sku.deliver_by_days` | integer (int32) or null | no |  |
| `data.sku.descr` | string | no |  |
| `data.sku.expire_days` | integer (int32) or null | no |  |
| `data.sku.external_id` | string or null | no |  |
| `data.sku.gross_wgt` | number (double) | no |  |
| `data.sku.lot_policy_id` | integer (int64) | no |  |
| `data.sku.max_age_on_rec` | integer (int32) or null | no |  |
| `data.sku.max_temperature` | number (double) or null | no |  |
| `data.sku.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.sku.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.sku.min_temperature` | number (double) or null | no |  |
| `data.sku.net_wgt` | number (double) | no |  |
| `data.sku.on_rec_copy_receipt_number` | boolean | no |  |
| `data.sku.pack_id` | integer (int64) | no |  |
| `data.sku.pack_location` | string or null | no |  |
| `data.sku.pick_instruction` | string or null | no |  |
| `data.sku.positions_required` | integer (int16) | no |  |
| `data.sku.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.sku.putaway_loc` | string or null | no |  |
| `data.sku.putaway_policy_id` | integer (int64) or null | no |  |
| `data.sku.putawayzone` | string or null | no |  |
| `data.sku.receipt_hold_code` | string or null | no |  |
| `data.sku.receipt_policy_id` | integer (int64) | no |  |
| `data.sku.receipt_qc_loc` | string or null | no |  |
| `data.sku.replenishment_policy_id` | integer (int64) | no |  |
| `data.sku.requires_temperature_capture` | boolean | no |  |
| `data.sku.return_location` | string or null | no |  |
| `data.sku.rotate_by` | string | no |  |
| `data.sku.rotation` | one of: Fifo \| Lifo \| Fefo | no | Represents SKU rotation policy, determining the order in which stock is picked. |
| `data.sku.shelf_life` | integer (int32) or null | no |  |
| `data.sku.sku_group` | string or null | no |  |
| `data.sku.stack_limit` | integer (int16) | no |  |
| `data.sku.tare_weight` | number (double) | no |  |
| `data.sku.warning_temperature_max` | number (double) or null | no |  |
| `data.sku.warning_temperature_min` | number (double) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuFull }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.active` | boolean or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allocation_policy_id` | integer (int64) or null | no |  |
| `data.allow_multi_lot_on_lpn` | boolean or null | no |  |
| `data.barcode_format_id` | integer (int64) or null | no |  |
| `data.best_by_days` | integer (int32) or null | no |  |
| `data.cartonization_policy_id` | integer (int64) or null | no |  |
| `data.class` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.cube` | number (double) or null | no |  |
| `data.default_uom` | string or null | no |  |
| `data.deliver_by_days` | integer (int32) or null | no |  |
| `data.descr` | string | yes |  |
| `data.expire_days` | integer (int32) or null | no |  |
| `data.external_id` | string or null | no |  |
| `data.force_separate_lpn_per_lot` | boolean or null | no | The same prohibition as `allow_multi_lot_on_lpn = false`, asked of the ARRIVING SKU instead of the ones already on the pallet. |
| `data.gross_wgt` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.max_age_on_rec` | integer (int32) or null | no |  |
| `data.max_temperature` | number (double) or null | no |  |
| `data.min_shelf_life_on_pick` | integer (int32) or null | no |  |
| `data.min_shelf_life_on_rec` | integer (int32) or null | no |  |
| `data.min_temperature` | number (double) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.net_wgt` | number (double) or null | no |  |
| `data.on_rec_copy_receipt_number` | boolean or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.pack_location` | string or null | no |  |
| `data.pick_instruction` | string or null | no | Standing pick instruction for this item (wms-app 044): shown on every pick of it and acknowledged before the pick commits (RF `PICKINS`). |
| `data.positions_required` | integer (int16) or null | no | How many adjacent positions of one section this item occupies. |
| `data.putaway_class` | one of: None \| NoMix or null | no |  |
| `data.putaway_loc` | string or null | no |  |
| `data.putaway_policy_id` | integer (int64) or null | no |  |
| `data.putawayzone` | string or null | no |  |
| `data.receipt_hold_code` | string or null | no |  |
| `data.receipt_policy_id` | integer (int64) or null | no |  |
| `data.receipt_qc_loc` | string or null | no |  |
| `data.replenishment_policy_id` | integer (int64) or null | no |  |
| `data.requires_temperature_capture` | boolean | yes |  |
| `data.return_location` | string or null | no |  |
| … | | | 43 more fields. See `openrpc.json`. |

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
  "method": "update_sku_full",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: sku_audit

### get_sku_audit

Get a sku_audit by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_audit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_sku_audit` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuAudit }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.changed_at` | string | yes |  |
| `data.changed_by` | integer (int64) | yes |  |
| `data.field_name` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.new_value` | string or null | no |  |
| `data.old_value` | string or null | no |  |
| `data.sku_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "changed_at": "<changed_at>",
      "changed_by": 1,
      "field_name": "<field_name>",
      "id": 1,
      "sku_id": 1
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
  "method": "get_sku_audit",
  "params": {
    "id": 1
  }
}'
```

### list_sku_audit

List sku_audit — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_audit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_sku_audit` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_id` | integer filter | no | Filter on `sku_id`. |
| `filters[].field_name` | string filter | no | Filter on `field_name`. |
| `filters[].changed_by` | integer filter | no | Filter on `changed_by`. |
| `filters[].changed_at` | value (date, time or other) filter | no | Filter on `changed_at`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SkuAudit] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].changed_at` | string | yes |  |
| `data[].changed_by` | integer (int64) | yes |  |
| `data[].field_name` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].new_value` | string or null | no |  |
| `data[].old_value` | string or null | no |  |
| `data[].sku_id` | integer (int64) | yes |  |

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
  "method": "list_sku_audit",
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

## Module: sku_barcode

### count_sku_barcode

Count sku_barcode — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_id` | integer filter | no | Filter on `sku_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].barcode` | string filter | no | Filter on `barcode`. |
| `filters[].vendor_id` | string filter | no | Filter on `vendor_id`. |
| `filters[].pack_id` | string filter | no | Filter on `pack_id`. |
| `filters[].default_uom` | string filter | no | Filter on `default_uom`. |
| `filters[].barcode_type` | string filter | no | Filter on `barcode_type`. |
| `filters[].user_notes1` | string filter | no | Filter on `user_notes1`. |
| `filters[].user_notes2` | string filter | no | Filter on `user_notes2`. |
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
  "method": "count_sku_barcode",
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

### create_sku_barcode

Attach a barcode to one SKU, deriving owner and SKU code from its id.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SkuBarcodeCreateApi) | yes | Public create contract for a barcode. |
| `data.barcode` | string | yes |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.default_uom` | string | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.sku_code` | string or null | no |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuBarcode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string | yes |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.default_uom` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

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
  "method": "create_sku_barcode",
  "params": {
    "data": {
      "barcode": "<barcode>",
      "default_uom": "<default_uom>",
      "pack_id": 1,
      "sku_id": 1
    }
  }
}'
```

### delete_many_sku_barcode

Delete multiple sku_barcode by IDs — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

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
  "method": "delete_many_sku_barcode",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_sku_barcode

Delete a sku_barcode by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuBarcode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string | yes |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.default_uom` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

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
  "method": "delete_sku_barcode",
  "params": {
    "id": 1
  }
}'
```

### get_sku_barcode

Get a sku_barcode by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuBarcode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string | yes |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.default_uom` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

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
  "method": "get_sku_barcode",
  "params": {
    "id": 1
  }
}'
```

### list_sku_barcode

List sku_barcode — CRUD.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_id` | integer filter | no | Filter on `sku_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].barcode` | string filter | no | Filter on `barcode`. |
| `filters[].vendor_id` | string filter | no | Filter on `vendor_id`. |
| `filters[].pack_id` | string filter | no | Filter on `pack_id`. |
| `filters[].default_uom` | string filter | no | Filter on `default_uom`. |
| `filters[].barcode_type` | string filter | no | Filter on `barcode_type`. |
| `filters[].user_notes1` | string filter | no | Filter on `user_notes1`. |
| `filters[].user_notes2` | string filter | no | Filter on `user_notes2`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SkuBarcode] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].barcode` | string | yes |  |
| `data[].barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data[].default_uom` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].sku_id` | integer (int64) | yes |  |
| `data[].user_notes1` | string or null | no |  |
| `data[].user_notes2` | string or null | no |  |
| `data[].vendor_id` | integer (int64) or null | no |  |

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
  "method": "list_sku_barcode",
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

### update_sku_barcode

Update a SKU barcode without re-parenting it to another SKU or owner.

| | |
|---|---|
| Context / module | master_data / sku_barcode |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_sku_barcode` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (SkuBarcodeUpdateApi) | yes |  |
| `data.barcode` | string | no |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin | no | EAN, UPC, GTIN, etc.. |
| `data.default_uom` | string | no |  |
| `data.pack_id` | integer (int64) | no |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuBarcode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string | yes |  |
| `data.barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.default_uom` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.user_notes1` | string or null | no |  |
| `data.user_notes2` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

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
  "method": "update_sku_barcode",
  "params": {
    "id": 1,
    "data": {
      "barcode": "<barcode>",
      "barcode_type": "None"
    }
  }
}'
```

## Module: barcode_format

### count_barcode_format

Count barcode_format — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].format_group` | string filter | no | Filter on `format_group`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].barcode_identifier` | string filter | no | Filter on `barcode_identifier`. |
| `filters[].chars_to_trim` | integer filter | no | Filter on `chars_to_trim`. |
| `filters[].auto_detect_identifier` | boolean filter | no | Filter on `auto_detect_identifier`. |
| `filters[].parsing_rules` | string filter | no | Filter on `parsing_rules`. |
| `filters[].default_ending_delimiter` | string filter | no | Filter on `default_ending_delimiter`. |
| `filters[].notes` | string filter | no | Filter on `notes`. |
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
  "method": "count_barcode_format",
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

### create_barcode_format

Create a new barcode_format — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (BarcodeFormatForCreate) | yes |  |
| `data.auto_detect_identifier` | boolean or null | no |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) or null | no |  |
| `data.check_digit_algorithm` | string or null | no | Slice S5 — optional on create; DB default "None" when omitted. |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | yes |  |
| `data.format_group` | string | yes |  |
| `data.name` | string | yes |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormat }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_detect_identifier` | boolean | yes |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) | yes |  |
| `data.check_digit_algorithm` | string | yes | Slice S5 — per-format check-digit algorithm. |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | yes |  |
| `data.format_group` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | yes |  |

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
  "method": "create_barcode_format",
  "params": {
    "data": {
      "descr": "<descr>",
      "format_group": "<format_group>",
      "name": "<name>",
      "parsing_rules": "<parsing_rules>"
    }
  }
}'
```

### delete_barcode_format

Delete a barcode_format by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormat }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_detect_identifier` | boolean | yes |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) | yes |  |
| `data.check_digit_algorithm` | string | yes | Slice S5 — per-format check-digit algorithm. |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | yes |  |
| `data.format_group` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | yes |  |

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
  "method": "delete_barcode_format",
  "params": {
    "id": 1
  }
}'
```

### delete_many_barcode_format

Delete multiple barcode_format by IDs — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_barcode_format` |
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
  "method": "delete_many_barcode_format",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_barcode_format

Get a barcode_format by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormat }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_detect_identifier` | boolean | yes |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) | yes |  |
| `data.check_digit_algorithm` | string | yes | Slice S5 — per-format check-digit algorithm. |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | yes |  |
| `data.format_group` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | yes |  |

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
  "method": "get_barcode_format",
  "params": {
    "id": 1
  }
}'
```

### list_barcode_format

List barcode_format — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].name` | string filter | no | Filter on `name`. |
| `filters[].format_group` | string filter | no | Filter on `format_group`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].barcode_identifier` | string filter | no | Filter on `barcode_identifier`. |
| `filters[].chars_to_trim` | integer filter | no | Filter on `chars_to_trim`. |
| `filters[].auto_detect_identifier` | boolean filter | no | Filter on `auto_detect_identifier`. |
| `filters[].parsing_rules` | string filter | no | Filter on `parsing_rules`. |
| `filters[].default_ending_delimiter` | string filter | no | Filter on `default_ending_delimiter`. |
| `filters[].notes` | string filter | no | Filter on `notes`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [BarcodeFormat] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].auto_detect_identifier` | boolean | yes |  |
| `data[].barcode_identifier` | string or null | no |  |
| `data[].chars_to_trim` | integer (int32) | yes |  |
| `data[].check_digit_algorithm` | string | yes | Slice S5 — per-format check-digit algorithm. |
| `data[].default_ending_delimiter` | string or null | no |  |
| `data[].descr` | string | yes |  |
| `data[].format_group` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].notes` | string or null | no |  |
| `data[].parsing_rules` | string | yes |  |

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
  "method": "list_barcode_format",
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

### parse_barcode

Parse a raw barcode string using a named or ID-referenced format.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `parse_barcode` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `format_id` | integer (int64) or null | no |  |
| `format_name` | string or null | no |  |
| `raw_barcode` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": ParseBarcodeResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.fields` | array of object (ParsedField) | yes |  |
| `data.fields[].app_identifier` | string or null | no |  |
| `data.fields[].data_element_name` | string | yes |  |
| `data.fields[].sequence` | integer (int32) | yes |  |
| `data.fields[].value` | string | yes |  |
| `data.format_name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "fields": [
        {
          "data_element_name": "<data_element_name>",
          "sequence": 1,
          "value": "<value>"
        }
      ],
      "format_name": "<format_name>"
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
  "method": "parse_barcode",
  "params": {
    "raw_barcode": "<raw_barcode>"
  }
}'
```

### update_barcode_format

Update a barcode format with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | master_data / barcode_format |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_barcode_format` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (BarcodeFormatUpdateApi) | yes |  |
| `data.auto_detect_identifier` | boolean | no |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) | no |  |
| `data.check_digit_algorithm` | string | no |  |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | no |  |
| `data.format_group` | string | no |  |
| `data.name` | string | no |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormat }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_detect_identifier` | boolean | yes |  |
| `data.barcode_identifier` | string or null | no |  |
| `data.chars_to_trim` | integer (int32) | yes |  |
| `data.check_digit_algorithm` | string | yes | Slice S5 — per-format check-digit algorithm. |
| `data.default_ending_delimiter` | string or null | no |  |
| `data.descr` | string | yes |  |
| `data.format_group` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.notes` | string or null | no |  |
| `data.parsing_rules` | string | yes |  |

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
  "method": "update_barcode_format",
  "params": {
    "id": 1,
    "data": {
      "auto_detect_identifier": false,
      "barcode_identifier": "<barcode_identifier>"
    }
  }
}'
```

## Module: barcode_format_detail

### count_barcode_format_detail

Count barcode_format_detail — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].barcode_format_id` | integer filter | no | Filter on `barcode_format_id`. |
| `filters[].sequence` | integer filter | no | Filter on `sequence`. |
| `filters[].data_app_identifier` | string filter | no | Filter on `data_app_identifier`. |
| `filters[].data_element_name` | string filter | no | Filter on `data_element_name`. |
| `filters[].data_group_name` | string filter | no | Filter on `data_group_name`. |
| `filters[].repeats_until_end` | boolean filter | no | Filter on `repeats_until_end`. |
| `filters[].data_length_type` | string filter | no | Filter on `data_length_type`. |
| `filters[].data_length` | integer filter | no | Filter on `data_length`. |
| `filters[].delimiter_before` | string filter | no | Filter on `delimiter_before`. |
| `filters[].delimiter_after` | string filter | no | Filter on `delimiter_after`. |
| `filters[].prefix_trim_number` | integer filter | no | Filter on `prefix_trim_number`. |
| `filters[].suffix_trim_number` | integer filter | no | Filter on `suffix_trim_number`. |
| `filters[].start_position` | integer filter | no | Filter on `start_position`. |
| `filters[].stop_position` | integer filter | no | Filter on `stop_position`. |
| `filters[].add_decimal_at_place` | integer filter | no | Filter on `add_decimal_at_place`. |
| `filters[].date_field_format` | string filter | no | Filter on `date_field_format`. |
| `filters[].validation` | string filter | no | Filter on `validation`. |
| `filters[].lot_policy_id` | integer filter | no | Filter on `lot_policy_id`. |
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
  "method": "count_barcode_format_detail",
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

### create_barcode_format_detail

Create a new barcode_format_detail — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (BarcodeFormatDetailForCreate) | yes |  |
| `data.add_decimal_at_place` | integer (int32) or null | no |  |
| `data.barcode_format_id` | integer (int64) | yes |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.prefix_trim_number` | integer (int32) or null | no |  |
| `data.repeats_until_end` | boolean or null | no |  |
| `data.sequence` | integer (int32) or null | no |  |
| `data.start_position` | integer (int32) or null | no |  |
| `data.stop_position` | integer (int32) or null | no |  |
| `data.suffix_trim_number` | integer (int32) or null | no |  |
| `data.validation` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormatDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_decimal_at_place` | integer (int32) | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode_format_id` | integer (int64) | yes |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.prefix_trim_number` | integer (int32) | yes |  |
| `data.repeats_until_end` | boolean | yes |  |
| `data.sequence` | integer (int32) | yes |  |
| `data.start_position` | integer (int32) | yes |  |
| `data.stop_position` | integer (int32) | yes |  |
| `data.suffix_trim_number` | integer (int32) | yes |  |
| `data.validation` | string or null | no |  |

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
  "method": "create_barcode_format_detail",
  "params": {
    "data": {
      "barcode_format_id": 1
    }
  }
}'
```

### delete_barcode_format_detail

Delete a barcode_format_detail by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormatDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_decimal_at_place` | integer (int32) | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode_format_id` | integer (int64) | yes |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.prefix_trim_number` | integer (int32) | yes |  |
| `data.repeats_until_end` | boolean | yes |  |
| `data.sequence` | integer (int32) | yes |  |
| `data.start_position` | integer (int32) | yes |  |
| `data.stop_position` | integer (int32) | yes |  |
| `data.suffix_trim_number` | integer (int32) | yes |  |
| `data.validation` | string or null | no |  |

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
  "method": "delete_barcode_format_detail",
  "params": {
    "id": 1
  }
}'
```

### delete_many_barcode_format_detail

Delete multiple barcode_format_detail by IDs — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_barcode_format_detail` |
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
  "method": "delete_many_barcode_format_detail",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_barcode_format_detail

Get a barcode_format_detail by ID — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormatDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_decimal_at_place` | integer (int32) | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode_format_id` | integer (int64) | yes |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.prefix_trim_number` | integer (int32) | yes |  |
| `data.repeats_until_end` | boolean | yes |  |
| `data.sequence` | integer (int32) | yes |  |
| `data.start_position` | integer (int32) | yes |  |
| `data.stop_position` | integer (int32) | yes |  |
| `data.suffix_trim_number` | integer (int32) | yes |  |
| `data.validation` | string or null | no |  |

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
  "method": "get_barcode_format_detail",
  "params": {
    "id": 1
  }
}'
```

### list_barcode_format_detail

List barcode_format_detail — CRUD.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].barcode_format_id` | integer filter | no | Filter on `barcode_format_id`. |
| `filters[].sequence` | integer filter | no | Filter on `sequence`. |
| `filters[].data_app_identifier` | string filter | no | Filter on `data_app_identifier`. |
| `filters[].data_element_name` | string filter | no | Filter on `data_element_name`. |
| `filters[].data_group_name` | string filter | no | Filter on `data_group_name`. |
| `filters[].repeats_until_end` | boolean filter | no | Filter on `repeats_until_end`. |
| `filters[].data_length_type` | string filter | no | Filter on `data_length_type`. |
| `filters[].data_length` | integer filter | no | Filter on `data_length`. |
| `filters[].delimiter_before` | string filter | no | Filter on `delimiter_before`. |
| `filters[].delimiter_after` | string filter | no | Filter on `delimiter_after`. |
| `filters[].prefix_trim_number` | integer filter | no | Filter on `prefix_trim_number`. |
| `filters[].suffix_trim_number` | integer filter | no | Filter on `suffix_trim_number`. |
| `filters[].start_position` | integer filter | no | Filter on `start_position`. |
| `filters[].stop_position` | integer filter | no | Filter on `stop_position`. |
| `filters[].add_decimal_at_place` | integer filter | no | Filter on `add_decimal_at_place`. |
| `filters[].date_field_format` | string filter | no | Filter on `date_field_format`. |
| `filters[].validation` | string filter | no | Filter on `validation`. |
| `filters[].lot_policy_id` | integer filter | no | Filter on `lot_policy_id`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [BarcodeFormatDetail] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_decimal_at_place` | integer (int32) | yes |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].barcode_format_id` | integer (int64) | yes |  |
| `data[].data_app_identifier` | string or null | no |  |
| `data[].data_element_name` | string or null | no |  |
| `data[].data_group_name` | string or null | no |  |
| `data[].data_length` | integer (int32) or null | no |  |
| `data[].data_length_type` | string or null | no |  |
| `data[].date_field_format` | string or null | no |  |
| `data[].delimiter_after` | string or null | no |  |
| `data[].delimiter_before` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot_policy_id` | integer (int64) or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].prefix_trim_number` | integer (int32) | yes |  |
| `data[].repeats_until_end` | boolean | yes |  |
| `data[].sequence` | integer (int32) | yes |  |
| `data[].start_position` | integer (int32) | yes |  |
| `data[].stop_position` | integer (int32) | yes |  |
| `data[].suffix_trim_number` | integer (int32) | yes |  |
| `data[].validation` | string or null | no |  |

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
  "method": "list_barcode_format_detail",
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

### next_barcode_format_detail_sequence

Get next sequence value for a barcode format detail.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `next_barcode_format_detail_sequence` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `barcode_format_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": integer (int32) }`

Type of `data`: integer (int32)

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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "next_barcode_format_detail_sequence",
  "params": {
    "barcode_format_id": 1
  }
}'
```

### update_barcode_format_detail

Update a barcode format detail with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | master_data / barcode_format_detail |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_barcode_format_detail` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (BarcodeFormatDetailUpdateApi) | yes |  |
| `data.add_decimal_at_place` | integer (int32) | no |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.prefix_trim_number` | integer (int32) | no |  |
| `data.repeats_until_end` | boolean | no |  |
| `data.sequence` | integer (int32) | no |  |
| `data.start_position` | integer (int32) | no |  |
| `data.stop_position` | integer (int32) | no |  |
| `data.suffix_trim_number` | integer (int32) | no |  |
| `data.validation` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": BarcodeFormatDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_decimal_at_place` | integer (int32) | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode_format_id` | integer (int64) | yes |  |
| `data.data_app_identifier` | string or null | no |  |
| `data.data_element_name` | string or null | no |  |
| `data.data_group_name` | string or null | no |  |
| `data.data_length` | integer (int32) or null | no |  |
| `data.data_length_type` | string or null | no |  |
| `data.date_field_format` | string or null | no |  |
| `data.delimiter_after` | string or null | no |  |
| `data.delimiter_before` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.prefix_trim_number` | integer (int32) | yes |  |
| `data.repeats_until_end` | boolean | yes |  |
| `data.sequence` | integer (int32) | yes |  |
| `data.start_position` | integer (int32) | yes |  |
| `data.stop_position` | integer (int32) | yes |  |
| `data.suffix_trim_number` | integer (int32) | yes |  |
| `data.validation` | string or null | no |  |

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
  "method": "update_barcode_format_detail",
  "params": {
    "id": 1,
    "data": {
      "add_decimal_at_place": 1,
      "data_app_identifier": "<data_app_identifier>"
    }
  }
}'
```

## Module: check_digit

### generate_check_digit

Compute check digit for a location code.

| | |
|---|---|
| Context / module | master_data / check_digit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `generate_check_digit` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `location_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": CheckDigitResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.check_digit` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "check_digit": "<check_digit>"
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
  "method": "generate_check_digit",
  "params": {
    "location_code": "<location_code>"
  }
}'
```

## Module: key

### get_next_key

Get next global or scoped counter value.

| | |
|---|---|
| Context / module | master_data / key |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `get_next_key` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `counter_name` | string | yes |  |
| `scope` | string or null | no | Optional partition key. |
| `size` | integer (uint) or null | no | Output width. |

**Result**

The `result` member of the response is: `{ "data": string }`

Type of `data`: string

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": "<value>"
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
  "method": "get_next_key",
  "params": {
    "counter_name": "<counter_name>"
  }
}'
```
