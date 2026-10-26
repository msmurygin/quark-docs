# Integration methods

Methods for integrations: stock and balance reads, marking (SGTIN) confirmations, entity attributes, the event registry, integration events and their deliveries.

This page documents 74 methods of the `integration` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **inventory**: [get_available_stock](#get_available_stock), [get_all_stock](#get_all_stock), [sync_stock_log](#sync_stock_log), [list_inventory_balance](#list_inventory_balance), [list_inventory_balance_on_hold](#list_inventory_balance_on_hold), [list_inventory_balance_lot](#list_inventory_balance_lot), [count_inventory_balance](#count_inventory_balance), [count_inventory_balance_on_hold](#count_inventory_balance_on_hold), [count_inventory_balance_lot](#count_inventory_balance_lot), [list_inventory_hold](#list_inventory_hold), [count_inventory_hold](#count_inventory_hold), [get_inventory_hold](#get_inventory_hold), [update_inventory_hold](#update_inventory_hold), [list_inventory_balance_by_sku](#list_inventory_balance_by_sku), [list_inventory_balance_by_lot](#list_inventory_balance_by_lot), [list_inventory_balance_by_container](#list_inventory_balance_by_container), [count_inventory_balance_by_sku](#count_inventory_balance_by_sku), [count_inventory_balance_by_lot](#count_inventory_balance_by_lot), [count_inventory_balance_by_container](#count_inventory_balance_by_container), [get_container_hierarchy](#get_container_hierarchy), [list_inventory_hold_detail](#list_inventory_hold_detail), [count_inventory_hold_detail](#count_inventory_hold_detail), [list_serial_capture_episode_open](#list_serial_capture_episode_open), [count_serial_capture_episode_open](#count_serial_capture_episode_open), [list_inventory_balance_kpi](#list_inventory_balance_kpi), [list_inventory_pending_move_in_ui](#list_inventory_pending_move_in_ui), [count_inventory_pending_move_in_ui](#count_inventory_pending_move_in_ui)
- **inventory_search**: [search_inventory_balances](#search_inventory_balances), [list_position_serials](#list_position_serials)
- **marking**: [get_expected_sgtins](#get_expected_sgtins), [get_shipment_sgtins](#get_shipment_sgtins), [get_box_sgtins](#get_box_sgtins), [get_withdrawal_codes](#get_withdrawal_codes), [get_pharma_sgtins](#get_pharma_sgtins), [get_kz_inbound_codes](#get_kz_inbound_codes), [confirm_inbound](#confirm_inbound), [confirm_outbound](#confirm_outbound), [confirm_aggregation](#confirm_aggregation), [confirm_pharma_inbound](#confirm_pharma_inbound), [confirm_kz_inbound](#confirm_kz_inbound)
- **entity_attribute**: [create_attribute_def](#create_attribute_def), [get_attribute_def](#get_attribute_def), [list_attribute_def](#list_attribute_def), [count_attribute_def](#count_attribute_def), [update_attribute_def](#update_attribute_def), [delete_attribute_def](#delete_attribute_def), [create_attribute_value](#create_attribute_value), [get_attribute_value](#get_attribute_value), [list_attribute_value](#list_attribute_value), [count_attribute_value](#count_attribute_value), [update_attribute_value](#update_attribute_value), [delete_attribute_value](#delete_attribute_value), [get_entity_attributes](#get_entity_attributes), [get_entity_attribute_row](#get_entity_attribute_row), [get_attribute_value_enriched](#get_attribute_value_enriched), [save_entity_attributes](#save_entity_attributes)
- **event_registry**: [create_event_registry](#create_event_registry), [get_event_registry](#get_event_registry), [list_event_registry](#list_event_registry), [count_event_registry](#count_event_registry), [update_event_registry](#update_event_registry), [delete_event_registry](#delete_event_registry)
- **integration_event**: [get_integration_event](#get_integration_event), [list_integration_event](#list_integration_event), [count_integration_event](#count_integration_event), [create_integration_subscriber](#create_integration_subscriber), [get_integration_subscriber](#get_integration_subscriber), [list_integration_subscriber](#list_integration_subscriber), [count_integration_subscriber](#count_integration_subscriber), [update_integration_subscriber](#update_integration_subscriber), [delete_integration_subscriber](#delete_integration_subscriber)
- **integration_event_delivery**: [get_integration_event_delivery](#get_integration_event_delivery), [list_integration_event_delivery](#list_integration_event_delivery), [count_integration_event_delivery](#count_integration_event_delivery)

## Module: inventory

### count_inventory_balance

Count inventory_balance — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].qty_allocated` | number filter | no | Filter on `qty_allocated`. |
| `filters[].qty_picked` | number filter | no | Filter on `qty_picked`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_on_hold` | number filter | no | Filter on `qty_on_hold`. |
| `filters[].atp` | number filter | no | Filter on `atp`. |
| `filters[].hold_status` | string filter | no | Filter on `hold_status`. |
| `filters[].hold_detail` | string filter | no | Filter on `hold_detail`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].owner_name` | string filter | no | Filter on `owner_name`. |
| `filters[].sku_descr` | string filter | no | Filter on `sku_descr`. |
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
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
  "method": "count_inventory_balance",
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

### count_inventory_balance_by_container

Count inventory_balance_by_container — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_by_container` |
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
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
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
  "method": "count_inventory_balance_by_container",
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

### count_inventory_balance_by_lot

Count inventory_balance_by_lot — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_by_lot` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
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
  "method": "count_inventory_balance_by_lot",
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

### count_inventory_balance_by_sku

Count inventory_balance_by_sku — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_by_sku` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
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
  "method": "count_inventory_balance_by_sku",
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

### count_inventory_balance_lot

Count inventory_balance_lot — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_lot` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].receipt_number` | string filter | no | Filter on `receipt_number`. |
| `filters[].manufactured_date` | value (date, time or other) filter | no | Filter on `manufactured_date`. |
| `filters[].expiration_date` | value (date, time or other) filter | no | Filter on `expiration_date`. |
| `filters[].delivery_by_date` | value (date, time or other) filter | no | Filter on `delivery_by_date`. |
| `filters[].best_by_date` | value (date, time or other) filter | no | Filter on `best_by_date`. |
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
  "method": "count_inventory_balance_lot",
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

### count_inventory_balance_on_hold

Count inventory_balance_on_hold — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_on_hold` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].qty_allocated` | number filter | no | Filter on `qty_allocated`. |
| `filters[].qty_picked` | number filter | no | Filter on `qty_picked`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_on_hold` | number filter | no | Filter on `qty_on_hold`. |
| `filters[].atp` | number filter | no | Filter on `atp`. |
| `filters[].hold_status` | string filter | no | Filter on `hold_status`. |
| `filters[].hold_detail` | string filter | no | Filter on `hold_detail`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].owner_name` | string filter | no | Filter on `owner_name`. |
| `filters[].sku_descr` | string filter | no | Filter on `sku_descr`. |
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
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
  "method": "count_inventory_balance_on_hold",
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

### count_inventory_hold

Count inventory_hold — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_hold` |
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
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].loc` | string filter | no | Filter on `loc`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].is_hold_on` | boolean filter | no | Filter on `is_hold_on`. |
| `filters[].who_on` | integer filter | no | Filter on `who_on`. |
| `filters[].who_off` | integer filter | no | Filter on `who_off`. |
| `filters[].date_on` | value (date, time or other) filter | no | Filter on `date_on`. |
| `filters[].date_off` | value (date, time or other) filter | no | Filter on `date_off`. |
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
  "method": "count_inventory_hold",
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

### count_inventory_hold_detail

Count inventory_hold_detail — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_hold_detail` |
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
| `filters[].scope` | string filter | no | Filter on `scope`. |
| `filters[].target` | string filter | no | Filter on `target`. |
| `filters[].status` | string filter | no | Filter on `status`. |
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
  "method": "count_inventory_hold_detail",
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

### count_inventory_pending_move_in_ui

Count inventory_pending_move_in_ui — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_pending_move_in_ui` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].share_of` | integer filter | no | Filter on `share_of`. |
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
  "method": "count_inventory_pending_move_in_ui",
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

### count_serial_capture_episode_open

Count serial_capture_episode_open — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_serial_capture_episode_open` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].business_operation` | string filter | no | Filter on `business_operation`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
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
  "method": "count_serial_capture_episode_open",
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

### get_all_stock

Inventory: get all stock.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_all_stock` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": [AllStock] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].allocated_qty` | number (double) | yes |  |
| `data[].available_qty` | number (double) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].total_qty` | number (double) | yes |  |

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
  "method": "get_all_stock",
  "params": {
    "id": 1
  }
}'
```

### get_available_stock

Inventory: get available stock.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_available_stock` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": [AvailableStock] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].allocated_qty` | number (double) | yes |  |
| `data[].available_qty` | number (double) | yes |  |
| `data[].location_count` | integer (int64) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].total_qty` | number (double) | yes |  |

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
  "method": "get_available_stock",
  "params": {
    "id": 1
  }
}'
```

### get_container_hierarchy

Get by-container balances as a hierarchy (tree) view.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_container_hierarchy` |
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
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": ContainerHierarchyResponse }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.items` | array of object (ContainerTreeItem) | yes |  |
| `data.items[].atp` | number (double) | yes |  |
| `data.items[].code` | string | yes |  |
| `data.items[].container_type` | string or null | no |  |
| `data.items[].created` | string | yes |  |
| `data.items[].group` | boolean | yes | True iff this container actually has child containers in the cut. |
| `data.items[].hierarchyLevel` | integer (int32) | yes |  |
| `data.items[].hierarchyPath` | array of string | yes |  |
| `data.items[].id` | integer (int64) | yes |  |
| `data.items[].location` | string or null | no |  |
| `data.items[].origin` | string or null | no |  |
| `data.items[].owner_id` | integer (int64) | yes |  |
| `data.items[].parent_code` | string or null | no |  |
| `data.items[].qty` | number (double) | yes |  |
| `data.items[].qty_allocated` | number (double) | yes |  |
| `data.items[].sku_count` | integer (int64) | yes |  |
| `data.items[].status` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "items": [
        {
          "atp": 1,
          "code": "<code>",
          "created": "<created>",
          "group": false,
          "hierarchyLevel": 1,
          "hierarchyPath": [
            "<hierarchyPath>"
          ],
          "id": 1,
          "owner_id": 1,
          "qty": 1,
          "qty_allocated": 1,
          "sku_count": 1
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
  "method": "get_container_hierarchy",
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

### get_inventory_hold

Get a inventory_hold by ID — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_inventory_hold` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryHold }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_release_date` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.comments` | string or null | no |  |
| `data.date_off` | string or null | no |  |
| `data.date_on` | string or null | no |  |
| `data.hours_to_hold` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_hold_on` | boolean | yes |  |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.lpn` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.status` | one of: None \| Ok \| PIHold \| QcRequired \| NewItem \| NotHold \| QcQuarantine \| Customs \| CustomerReturn \| Expired \| Damaged \| Rtv \| … (+4) | yes | Mirror of the PostgreSQL `inv_hold_code` enum (15 values after migration 142). |
| `data.who_off` | integer (int64) or null | no |  |
| `data.who_on` | integer (int64) or null | no |  |

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
  "method": "get_inventory_hold",
  "params": {
    "id": 1
  }
}'
```

### list_inventory_balance

List inventory_balance — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].qty_allocated` | number filter | no | Filter on `qty_allocated`. |
| `filters[].qty_picked` | number filter | no | Filter on `qty_picked`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_on_hold` | number filter | no | Filter on `qty_on_hold`. |
| `filters[].atp` | number filter | no | Filter on `atp`. |
| `filters[].hold_status` | string filter | no | Filter on `hold_status`. |
| `filters[].hold_detail` | string filter | no | Filter on `hold_detail`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].owner_name` | string filter | no | Filter on `owner_name`. |
| `filters[].sku_descr` | string filter | no | Filter on `sku_descr`. |
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceAtp] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].atp` | number (double) | yes | Computed: Available-to-promise = `GREATEST(qty − allocated − picked − on_hold, 0)`. |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].container_type` | one of: Pallet \| Case \| Tote \| Generic \| Carton or null | no | Display (migration 178): `container.container_type` (Pallet/Case/…) — drives the type-glyph badge on the Container column, paired with `lpn`. |
| `data[].hold_detail` | string or null | no | VIRTUAL: reason + scope of the matching hold, e.g. |
| `data[].hold_status` | string or null | no | VIRTUAL: `'On hold'` when an active hold matches this row's lot / loc / lpn, else `''` (empty → the grid renders no chip). |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].lpn` | string or null | no | Display (migration 178): `container.code` (LPN) for `container_id`; `None` for loose stock. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].owner_name` | string or null | no | Display (migration 178): `owners.company` for `owner_id` (vs the raw `#id`). |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].qty_expected` | number (double) | yes | Computed: Σ open-ASN remaining (`qty_expected − qty_received`) for this sku+owner. |
| `data[].qty_on_hold` | number (double) | yes | Computed: `qty` when an active hold matches this row's lot / loc / lpn, else `0`. |
| `data[].qty_picked` | number (double) | yes |  |
| `data[].serial_tracked` | boolean | no | Whether this row's SKU is configured for end-to-end serial capture. |
| `data[].sku_code` | string | yes |  |
| `data[].sku_descr` | string or null | no | Display (migration 178): `sku.descr` (item name) for `(sku_code, owner_id)`. |
| `data[].uom` | string | yes |  |

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
  "method": "list_inventory_balance",
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

### list_inventory_balance_by_container

List inventory_balance_by_container — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_by_container` |
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
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceByContainer] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].atp` | number (double) | yes |  |
| `data[].code` | string | yes |  |
| `data[].container_type` | string or null | no |  |
| `data[].created` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string or null | no |  |
| `data[].origin` | string or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].parent_code` | string or null | no |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].sku_count` | integer (int64) | yes |  |
| `data[].status` | string or null | no |  |

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
  "method": "list_inventory_balance_by_container",
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

### list_inventory_balance_by_lot

List inventory_balance_by_lot — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_by_lot` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceByLot] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].atp` | number (double) | yes |  |
| `data[].best_by_date_source` | one of: Explicit \| Derived or null | no |  |
| `data[].days_left` | integer (int32) or null | no | Expiration minus the warehouse day (`warehouse_today()`). |
| `data[].delivery_by_date_source` | one of: Explicit \| Derived or null | no |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].expiration_date_source` | one of: Explicit \| Derived or null | no | Where each date came from; `None` when the lot has no such date. |
| `data[].expired` | boolean | yes | The lot expires today or earlier. |
| `data[].id` | integer (int64) | yes |  |
| `data[].locs` | integer (int64) | yes |  |
| `data[].lot` | string | yes |  |
| `data[].manufactured_date` | string or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |

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
  "method": "list_inventory_balance_by_lot",
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

### list_inventory_balance_by_sku

List inventory_balance_by_sku — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_by_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceBySku] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].atp` | number (double) | yes |  |
| `data[].descr` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].locs` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].qty_expected` | number (double) | yes |  |
| `data[].qty_on_hold` | number (double) | yes |  |
| `data[].sku_code` | string | yes |  |

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
  "method": "list_inventory_balance_by_sku",
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

### list_inventory_balance_kpi

List inventory_balance_kpi — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_kpi` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

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

The `result` member of the response is: `{ "data": [InventoryBalanceKpi] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].allocated` | number (double) | yes |  |
| `data[].atp` | number (double) | yes |  |
| `data[].expected` | number (double) | yes |  |
| `data[].hold_count` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].on_hold` | number (double) | yes |  |
| `data[].row_count` | integer (int64) | yes |  |
| `data[].total_qty` | number (double) | yes |  |

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
  "method": "list_inventory_balance_kpi",
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

### list_inventory_balance_lot

List inventory_balance_lot — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_lot` |
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
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].receipt_number` | string filter | no | Filter on `receipt_number`. |
| `filters[].manufactured_date` | value (date, time or other) filter | no | Filter on `manufactured_date`. |
| `filters[].expiration_date` | value (date, time or other) filter | no | Filter on `expiration_date`. |
| `filters[].delivery_by_date` | value (date, time or other) filter | no | Filter on `delivery_by_date`. |
| `filters[].best_by_date` | value (date, time or other) filter | no | Filter on `best_by_date`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceLot] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].best_by_date_source` | one of: Explicit \| Derived or null | no |  |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].delivery_by_date_source` | one of: Explicit \| Derived or null | no |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].expiration_date_source` | one of: Explicit \| Derived or null | no | Where each date came from; `None` when the lot has no such date. |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot` | string | yes |  |
| `data[].manufactured_date` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_number` | string or null | no |  |
| `data[].sku_code` | string | yes |  |

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
  "method": "list_inventory_balance_lot",
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

### list_inventory_balance_on_hold

List inventory_balance_on_hold — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_on_hold` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].qty_allocated` | number filter | no | Filter on `qty_allocated`. |
| `filters[].qty_picked` | number filter | no | Filter on `qty_picked`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_on_hold` | number filter | no | Filter on `qty_on_hold`. |
| `filters[].atp` | number filter | no | Filter on `atp`. |
| `filters[].hold_status` | string filter | no | Filter on `hold_status`. |
| `filters[].hold_detail` | string filter | no | Filter on `hold_detail`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].owner_name` | string filter | no | Filter on `owner_name`. |
| `filters[].sku_descr` | string filter | no | Filter on `sku_descr`. |
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceAtp] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].atp` | number (double) | yes | Computed: Available-to-promise = `GREATEST(qty − allocated − picked − on_hold, 0)`. |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].container_type` | one of: Pallet \| Case \| Tote \| Generic \| Carton or null | no | Display (migration 178): `container.container_type` (Pallet/Case/…) — drives the type-glyph badge on the Container column, paired with `lpn`. |
| `data[].hold_detail` | string or null | no | VIRTUAL: reason + scope of the matching hold, e.g. |
| `data[].hold_status` | string or null | no | VIRTUAL: `'On hold'` when an active hold matches this row's lot / loc / lpn, else `''` (empty → the grid renders no chip). |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].lpn` | string or null | no | Display (migration 178): `container.code` (LPN) for `container_id`; `None` for loose stock. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].owner_name` | string or null | no | Display (migration 178): `owners.company` for `owner_id` (vs the raw `#id`). |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].qty_expected` | number (double) | yes | Computed: Σ open-ASN remaining (`qty_expected − qty_received`) for this sku+owner. |
| `data[].qty_on_hold` | number (double) | yes | Computed: `qty` when an active hold matches this row's lot / loc / lpn, else `0`. |
| `data[].qty_picked` | number (double) | yes |  |
| `data[].serial_tracked` | boolean | no | Whether this row's SKU is configured for end-to-end serial capture. |
| `data[].sku_code` | string | yes |  |
| `data[].sku_descr` | string or null | no | Display (migration 178): `sku.descr` (item name) for `(sku_code, owner_id)`. |
| `data[].uom` | string | yes |  |

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
  "method": "list_inventory_balance_on_hold",
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

### list_inventory_hold

List inventory_hold — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_hold` |
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
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].loc` | string filter | no | Filter on `loc`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].is_hold_on` | boolean filter | no | Filter on `is_hold_on`. |
| `filters[].who_on` | integer filter | no | Filter on `who_on`. |
| `filters[].who_off` | integer filter | no | Filter on `who_off`. |
| `filters[].date_on` | value (date, time or other) filter | no | Filter on `date_on`. |
| `filters[].date_off` | value (date, time or other) filter | no | Filter on `date_off`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryHold] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].auto_release_date` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].comments` | string or null | no |  |
| `data[].date_off` | string or null | no |  |
| `data[].date_on` | string or null | no |  |
| `data[].hours_to_hold` | number (double) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_hold_on` | boolean | yes |  |
| `data[].loc` | string or null | no |  |
| `data[].lot` | string or null | no |  |
| `data[].lpn` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].status` | one of: None \| Ok \| PIHold \| QcRequired \| NewItem \| NotHold \| QcQuarantine \| Customs \| CustomerReturn \| Expired \| Damaged \| Rtv \| … (+4) | yes | Mirror of the PostgreSQL `inv_hold_code` enum (15 values after migration 142). |
| `data[].who_off` | integer (int64) or null | no |  |
| `data[].who_on` | integer (int64) or null | no |  |

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
  "method": "list_inventory_hold",
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

### list_inventory_hold_detail

List inventory_hold_detail — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_hold_detail` |
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
| `filters[].scope` | string filter | no | Filter on `scope`. |
| `filters[].target` | string filter | no | Filter on `target`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryHoldDetail] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].auto_release_date` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].comments` | string or null | no |  |
| `data[].date_on` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_hold_on` | boolean | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].scope` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].target` | string or null | no |  |
| `data[].who_on` | integer (int64) or null | no |  |

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
  "method": "list_inventory_hold_detail",
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

### list_inventory_pending_move_in_ui

List inventory_pending_move_in_ui — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_pending_move_in_ui` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].share_of` | integer filter | no | Filter on `share_of`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryPendingMoveInUi] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].container_id` | integer (int64) | yes |  |
| `data[].cube` | number (double) or null | no |  |
| `data[].expires_at` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lpn` | string or null | no |  |
| `data[].share_of` | integer (int64) or null | no |  |
| `data[].skus` | string or null | no |  |
| `data[].source` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].weight` | number (double) or null | no |  |

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
  "method": "list_inventory_pending_move_in_ui",
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

### list_serial_capture_episode_open

List serial_capture_episode_open — CRUD.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_serial_capture_episode_open` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].business_operation` | string filter | no | Filter on `business_operation`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].owner_id` | number filter | no | Filter on `owner_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SerialCaptureEpisodeOpen] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].age_minutes` | integer (int32) | yes |  |
| `data[].business_operation` | string | yes |  |
| `data[].business_ref_id` | integer (int64) or null | no |  |
| `data[].captured_qty` | integer (int32) | yes |  |
| `data[].expected_qty` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].idempotency_key` | string | yes |  |
| `data[].location` | string or null | no |  |
| `data[].opened_at` | string | yes |  |
| `data[].operator_id` | integer (int64) or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].progress_pct` | integer (int32) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].ttl_at` | string or null | no |  |

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
  "method": "list_serial_capture_episode_open",
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

### sync_stock_log

Inventory: sync stock log.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `sync_stock_log` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

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
  "method": "sync_stock_log",
  "params": {
    "id": 1
  }
}'
```

### update_inventory_hold

Update inventory-hold comments and auto-release schedule.

| | |
|---|---|
| Context / module | integration / inventory |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_inventory_hold` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (UpdateInventoryHoldFields) | yes |  |
| `data.auto_release_date` | string (date-time) or null | no | Omitted keeps the schedule, null removes it, and an RFC 3339 value schedules release at that absolute instant. |
| `data.comments` | string or null | no | Omitted = invalid no-op, null = clear, string = replace. |

**Result**

The `result` member of the response is: `{ "data": InventoryHold }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.auto_release_date` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.comments` | string or null | no |  |
| `data.date_off` | string or null | no |  |
| `data.date_on` | string or null | no |  |
| `data.hours_to_hold` | number (double) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_hold_on` | boolean | yes |  |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.lpn` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.status` | one of: None \| Ok \| PIHold \| QcRequired \| NewItem \| NotHold \| QcQuarantine \| Customs \| CustomerReturn \| Expired \| Damaged \| Rtv \| … (+4) | yes | Mirror of the PostgreSQL `inv_hold_code` enum (15 values after migration 142). |
| `data.who_off` | integer (int64) or null | no |  |
| `data.who_on` | integer (int64) or null | no |  |

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
  "method": "update_inventory_hold",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: inventory_search

### list_position_serials

Serial numbers on one inventory position (container or loose location + sku/lot/owner).

| | |
|---|---|
| Context / module | integration / inventory_search |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_position_serials` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PositionSerialQuery) | yes | The picked position's identity, exactly as the RF card holds it. |
| `data.container_id` | integer (int64) or null | no | Set for a containerized position; `None` + `loc` for a loose one. |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": PositionSerialsResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serials` | array of string | yes |  |
| `data.truncated` | boolean | yes | True when the position holds more units than were returned. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "serials": [
        "<serials>"
      ],
      "truncated": false
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
  "method": "list_position_serials",
  "params": {
    "data": {
      "owner_id": 1,
      "sku_code": "<sku_code>"
    }
  }
}'
```

### search_inventory_balances

RF stock search by any of lot / location / LPN / serial / SKU / owner.

| | |
|---|---|
| Context / module | integration / inventory_search |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `search_inventory_balances` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (InquiryFilters) | yes | The six filters, exactly as the RF screen sends them. |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.lpn` | string or null | no |  |
| `data.owner` | string or null | no | Owner id (all digits) or a company-name fragment. |
| `data.serial` | string or null | no |  |
| `data.sku` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceAtp] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].atp` | number (double) | yes | Computed: Available-to-promise = `GREATEST(qty − allocated − picked − on_hold, 0)`. |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].container_type` | one of: Pallet \| Case \| Tote \| Generic \| Carton or null | no | Display (migration 178): `container.container_type` (Pallet/Case/…) — drives the type-glyph badge on the Container column, paired with `lpn`. |
| `data[].hold_detail` | string or null | no | VIRTUAL: reason + scope of the matching hold, e.g. |
| `data[].hold_status` | string or null | no | VIRTUAL: `'On hold'` when an active hold matches this row's lot / loc / lpn, else `''` (empty → the grid renders no chip). |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].lpn` | string or null | no | Display (migration 178): `container.code` (LPN) for `container_id`; `None` for loose stock. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].owner_name` | string or null | no | Display (migration 178): `owners.company` for `owner_id` (vs the raw `#id`). |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_allocated` | number (double) | yes |  |
| `data[].qty_expected` | number (double) | yes | Computed: Σ open-ASN remaining (`qty_expected − qty_received`) for this sku+owner. |
| `data[].qty_on_hold` | number (double) | yes | Computed: `qty` when an active hold matches this row's lot / loc / lpn, else `0`. |
| `data[].qty_picked` | number (double) | yes |  |
| `data[].serial_tracked` | boolean | no | Whether this row's SKU is configured for end-to-end serial capture. |
| `data[].sku_code` | string | yes |  |
| `data[].sku_descr` | string or null | no | Display (migration 178): `sku.descr` (item name) for `(sku_code, owner_id)`. |
| `data[].uom` | string | yes |  |

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
  "method": "search_inventory_balances",
  "params": {
    "data": {}
  }
}'
```

## Module: marking

### confirm_aggregation

Marking: confirm regulator aggregation acknowledgement.

| | |
|---|---|
| Context / module | integration / marking |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `confirm_aggregation` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "confirm_aggregation",
  "params": {
    "params": {}
  }
}'
```

### confirm_inbound

Marking: confirm inbound regulator acknowledgement.

| | |
|---|---|
| Context / module | integration / marking |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `confirm_inbound` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "confirm_inbound",
  "params": {
    "params": {}
  }
}'
```

### confirm_kz_inbound

(The code comment for this item is not in English.

| | |
|---|---|
| Context / module | integration / marking |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `confirm_kz_inbound` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "confirm_kz_inbound",
  "params": {
    "params": {}
  }
}'
```

### confirm_outbound

Marking: confirm outbound regulator acknowledgement.

| | |
|---|---|
| Context / module | integration / marking |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `confirm_outbound` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "confirm_outbound",
  "params": {
    "params": {}
  }
}'
```

### confirm_pharma_inbound

(The code comment for this item is not in English.

| | |
|---|---|
| Context / module | integration / marking |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `confirm_pharma_inbound` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "confirm_pharma_inbound",
  "params": {
    "params": {}
  }
}'
```

### get_box_sgtins

Marking: get box SGTINs.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_box_sgtins` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_box_sgtins",
  "params": {
    "params": {}
  }
}'
```

### get_expected_sgtins

Marking: get expected SGTINs.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_expected_sgtins` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_expected_sgtins",
  "params": {
    "params": {}
  }
}'
```

### get_kz_inbound_codes

(The code comment for this item is not in English.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_kz_inbound_codes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_kz_inbound_codes",
  "params": {
    "params": {}
  }
}'
```

### get_pharma_sgtins

Marking: get pharma SGTINs.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_pharma_sgtins` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_pharma_sgtins",
  "params": {
    "params": {}
  }
}'
```

### get_shipment_sgtins

Marking: get shipment SGTINs.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_shipment_sgtins` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_shipment_sgtins",
  "params": {
    "params": {}
  }
}'
```

### get_withdrawal_codes

Marking: get withdrawal codes.

| | |
|---|---|
| Context / module | integration / marking |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_withdrawal_codes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `params` | object (map) | yes | Marking flow inputs differ per operation and evolve with regulator documents. |

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
  "method": "get_withdrawal_codes",
  "params": {
    "params": {}
  }
}'
```

## Module: entity_attribute

### count_attribute_def

Count attribute_def — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].entity_type` | string filter | no | Filter on `entity_type`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
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
  "method": "count_attribute_def",
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

### count_attribute_value

Count attribute_value — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].attribute_def_id` | integer filter | no | Filter on `attribute_def_id`. |
| `filters[].entity_type` | string filter | no | Filter on `entity_type`. |
| `filters[].entity_id` | integer filter | no | Filter on `entity_id`. |
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
  "method": "count_attribute_value",
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

### create_attribute_def

Create a new attribute_def — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (AttributeDefForCreate) | yes |  |
| `data.active` | boolean or null | no |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date or null | no | `From<AttrDataType> for sea_query::Value` binds the label as text, and Postgres has no implicit text → `attr_data_type` cast (42804), so the value is cast in the INSERT itself — as every other enum column written through `Fields` is (`sku`, `user`, `task`, …). |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) or null | no |  |
| `data.entity_type` | string | yes |  |
| `data.is_required` | boolean or null | no |  |
| `data.label` | string | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": AttributeDef }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | yes |  |
| `data.entity_type` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_required` | boolean | yes |  |
| `data.label` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |

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
      "data_type": "Text",
      "display_order": 1,
      "entity_type": "<entity_type>",
      "id": 1,
      "is_required": false,
      "label": "<label>",
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
  "method": "create_attribute_def",
  "params": {
    "data": {
      "code": "<code>",
      "entity_type": "<entity_type>",
      "label": "<label>"
    }
  }
}'
```

### create_attribute_value

Create a new attribute_value — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (AttributeValueForCreate) | yes |  |
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Required, and deliberately not defaulted: a caller that does not know whose row it is writing does not know enough to write it. |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": AttributeValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Which KIND of entity `entity_id` names — `'sku'`, `'location'`, … `attribute_value` is a generic EAV table and `entity_id` alone does not identify anything: SKU ids and location ids are independent sequences, so `entity_id = 7` is both SKU 7 and location 7. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_def_id": 1,
      "entity_id": 1,
      "entity_type": "<entity_type>",
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
  "method": "create_attribute_value",
  "params": {
    "data": {
      "attribute_def_id": 1,
      "entity_id": 1,
      "entity_type": "<entity_type>"
    }
  }
}'
```

### delete_attribute_def

Delete a attribute_def by ID — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AttributeDef }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | yes |  |
| `data.entity_type` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_required` | boolean | yes |  |
| `data.label` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |

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
      "data_type": "Text",
      "display_order": 1,
      "entity_type": "<entity_type>",
      "id": 1,
      "is_required": false,
      "label": "<label>",
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
  "method": "delete_attribute_def",
  "params": {
    "id": 1
  }
}'
```

### delete_attribute_value

Delete a attribute_value by ID — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AttributeValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Which KIND of entity `entity_id` names — `'sku'`, `'location'`, … `attribute_value` is a generic EAV table and `entity_id` alone does not identify anything: SKU ids and location ids are independent sequences, so `entity_id = 7` is both SKU 7 and location 7. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_def_id": 1,
      "entity_id": 1,
      "entity_type": "<entity_type>",
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
  "method": "delete_attribute_value",
  "params": {
    "id": 1
  }
}'
```

### get_attribute_def

Get a attribute_def by ID — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AttributeDef }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | yes |  |
| `data.entity_type` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_required` | boolean | yes |  |
| `data.label` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |

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
      "data_type": "Text",
      "display_order": 1,
      "entity_type": "<entity_type>",
      "id": 1,
      "is_required": false,
      "label": "<label>",
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
  "method": "get_attribute_def",
  "params": {
    "id": 1
  }
}'
```

### get_attribute_value

Get a attribute_value by ID — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AttributeValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Which KIND of entity `entity_id` names — `'sku'`, `'location'`, … `attribute_value` is a generic EAV table and `entity_id` alone does not identify anything: SKU ids and location ids are independent sequences, so `entity_id = 7` is both SKU 7 and location 7. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_def_id": 1,
      "entity_id": 1,
      "entity_type": "<entity_type>",
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
  "method": "get_attribute_value",
  "params": {
    "id": 1
  }
}'
```

### get_attribute_value_enriched

Get enriched attribute_value by id (with attribute_def fields).

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_attribute_value_enriched` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": AttributeValueEnriched }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Carried through the form load so the edit form round-trips it: the bio's `entity_type` field is what its `rpc_filter` scopes on, and a record that came back without it would be saved back without it. |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "attribute_def_id": 1,
      "code": "<code>",
      "data_type": "Text",
      "entity_id": 1,
      "entity_type": "<entity_type>",
      "id": 1,
      "label": "<label>"
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
  "method": "get_attribute_value_enriched",
  "params": {
    "id": 1
  }
}'
```

### get_entity_attribute_row

Get single entity attribute row by def_id.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_entity_attribute_row` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `def_id` | integer (int64) | yes |  |
| `entity_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": EntityAttributeRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.def_id` | integer (int64) | yes |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | yes |  |
| `data.is_required` | boolean | yes |  |
| `data.label` | string | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_id` | integer (int64) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "code": "<code>",
      "data_type": "Text",
      "def_id": 1,
      "display_order": 1,
      "is_required": false,
      "label": "<label>"
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
  "method": "get_entity_attribute_row",
  "params": {
    "def_id": 1,
    "entity_id": 1
  }
}'
```

### get_entity_attributes

Get all attribute definitions with values for a specific entity.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_entity_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `entity_id` | integer (int64) | yes |  |
| `entity_type` | string | yes |  |
| `owner_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": [EntityAttributeRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data[].def_id` | integer (int64) | yes |  |
| `data[].default_value` | string or null | no |  |
| `data[].display_order` | integer (int32) | yes |  |
| `data[].is_required` | boolean | yes |  |
| `data[].label` | string | yes |  |
| `data[].value_bool` | boolean or null | no |  |
| `data[].value_date` | string or null | no |  |
| `data[].value_float` | number (double) or null | no |  |
| `data[].value_id` | integer (int64) or null | no |  |
| `data[].value_int` | integer (int64) or null | no |  |
| `data[].value_text` | string or null | no |  |

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
  "method": "get_entity_attributes",
  "params": {
    "entity_id": 1,
    "entity_type": "<entity_type>"
  }
}'
```

### list_attribute_def

List attribute_def — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].entity_type` | string filter | no | Filter on `entity_type`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [AttributeDef] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].active` | boolean | yes |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data[].default_value` | string or null | no |  |
| `data[].display_order` | integer (int32) | yes |  |
| `data[].entity_type` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_required` | boolean | yes |  |
| `data[].label` | string | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) or null | no |  |

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
  "method": "list_attribute_def",
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

### list_attribute_value

List attribute_value — CRUD.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].attribute_def_id` | integer filter | no | Filter on `attribute_def_id`. |
| `filters[].entity_type` | string filter | no | Filter on `entity_type`. |
| `filters[].entity_id` | integer filter | no | Filter on `entity_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [AttributeValue] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].attribute_def_id` | integer (int64) | yes |  |
| `data[].entity_id` | integer (int64) | yes |  |
| `data[].entity_type` | string | yes | Which KIND of entity `entity_id` names — `'sku'`, `'location'`, … `attribute_value` is a generic EAV table and `entity_id` alone does not identify anything: SKU ids and location ids are independent sequences, so `entity_id = 7` is both SKU 7 and location 7. |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].value_bool` | boolean or null | no |  |
| `data[].value_date` | string or null | no |  |
| `data[].value_float` | number (double) or null | no |  |
| `data[].value_int` | integer (int64) or null | no |  |
| `data[].value_text` | string or null | no |  |

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
  "method": "list_attribute_value",
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

### save_entity_attributes

Bulk upsert attribute values for an entity.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `save_entity_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SaveEntityAttributesParams) | yes | Params for save_entity_attributes |
| `data.entity_id` | integer (int64) | yes |  |
| `data.values` | array of object (AttributeValueInput) | yes |  |
| `data.values[].attribute_def_id` | integer (int64) | yes |  |
| `data.values[].value_bool` | boolean or null | no |  |
| `data.values[].value_date` | string or null | no |  |
| `data.values[].value_float` | number (double) or null | no |  |
| `data.values[].value_int` | integer (int64) or null | no |  |
| `data.values[].value_text` | string or null | no |  |

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
  "method": "save_entity_attributes",
  "params": {
    "data": {
      "entity_id": 1,
      "values": [
        {
          "attribute_def_id": 1
        }
      ]
    }
  }
}'
```

### update_attribute_def

Update an attribute definition with strict nullable-field semantics.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_attribute_def` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (AttributeDefUpdateApi) | yes |  |
| `data.active` | boolean | no |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | no |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | no |  |
| `data.is_required` | boolean | no |  |
| `data.label` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": AttributeDef }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.data_type` | one of: Text \| Integer \| Decimal \| Boolean \| Date | yes |  |
| `data.default_value` | string or null | no |  |
| `data.display_order` | integer (int32) | yes |  |
| `data.entity_type` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_required` | boolean | yes |  |
| `data.label` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) or null | no |  |

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
      "data_type": "Text",
      "display_order": 1,
      "entity_type": "<entity_type>",
      "id": 1,
      "is_required": false,
      "label": "<label>",
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
  "method": "update_attribute_def",
  "params": {
    "id": 1,
    "data": {
      "active": false,
      "data_type": "Text"
    }
  }
}'
```

### update_attribute_value

Update an attribute value with explicit keep, clear and set semantics.

| | |
|---|---|
| Context / module | integration / entity_attribute |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_attribute_value` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (AttributeValueUpdateApi) | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": AttributeValue }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_def_id` | integer (int64) | yes |  |
| `data.entity_id` | integer (int64) | yes |  |
| `data.entity_type` | string | yes | Which KIND of entity `entity_id` names — `'sku'`, `'location'`, … `attribute_value` is a generic EAV table and `entity_id` alone does not identify anything: SKU ids and location ids are independent sequences, so `entity_id = 7` is both SKU 7 and location 7. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.value_bool` | boolean or null | no |  |
| `data.value_date` | string or null | no |  |
| `data.value_float` | number (double) or null | no |  |
| `data.value_int` | integer (int64) or null | no |  |
| `data.value_text` | string or null | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_def_id": 1,
      "entity_id": 1,
      "entity_type": "<entity_type>",
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
  "method": "update_attribute_value",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: event_registry

### count_event_registry

Count event_registry — CRUD.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_event_registry` |
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
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
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
  "method": "count_event_registry",
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

### create_event_registry

Create a new event_registry — CRUD.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_event_registry` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (EventRegistryForCreate) | yes |  |
| `data.category` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.is_builtin` | boolean or null | no |  |
| `data.name` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": EventRegistry }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_builtin` | boolean | yes |  |
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
      "category": "<category>",
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_builtin": false,
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
  "method": "create_event_registry",
  "params": {
    "data": {
      "code": "<code>",
      "name": "<name>"
    }
  }
}'
```

### delete_event_registry

Delete a event_registry by ID — CRUD.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_event_registry` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EventRegistry }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_builtin` | boolean | yes |  |
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
      "category": "<category>",
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_builtin": false,
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
  "method": "delete_event_registry",
  "params": {
    "id": 1
  }
}'
```

### get_event_registry

Get a event_registry by ID — CRUD.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_event_registry` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": EventRegistry }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_builtin` | boolean | yes |  |
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
      "category": "<category>",
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_builtin": false,
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
  "method": "get_event_registry",
  "params": {
    "id": 1
  }
}'
```

### list_event_registry

List event_registry — CRUD.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_event_registry` |
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
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [EventRegistry] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].category` | string | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].is_builtin` | boolean | yes |  |
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
  "method": "list_event_registry",
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

### update_event_registry

Update mutable event-catalog metadata; code/builtin identity is immutable.

| | |
|---|---|
| Context / module | integration / event_registry |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_event_registry` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (EventRegistryUpdateApi) | yes | Event code and builtin ownership are stable catalog identity. |
| `data.category` | string | no |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean | no |  |
| `data.name` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": EventRegistry }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_builtin` | boolean | yes |  |
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
      "category": "<category>",
      "code": "<code>",
      "id": 1,
      "is_active": false,
      "is_builtin": false,
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
  "method": "update_event_registry",
  "params": {
    "id": 1,
    "data": {
      "category": "<category>",
      "description": "<description>"
    }
  }
}'
```

## Module: integration_event

### count_integration_event

Count integration_event — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_integration_event` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_code` | string filter | no | Filter on `event_code`. |
| `filters[].entity_name` | string filter | no | Filter on `entity_name`. |
| `filters[].event_status` | string filter | no | Filter on `event_status`. |
| `filters[].internal_status` | string filter | no | Filter on `internal_status`. |
| `filters[].warehouse` | string filter | no | Filter on `warehouse`. |
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
  "method": "count_integration_event",
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

### count_integration_subscriber

Count integration_subscriber — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_integration_subscriber` |
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
| `filters[].delivery` | string filter | no | Filter on `delivery`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
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
  "method": "count_integration_subscriber",
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

### create_integration_subscriber

Create a validated integration event subscriber.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | stateless_command |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_integration_subscriber` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (IntegrationSubscriberForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.delivery` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | no |  |
| `data.max_retries` | integer (int32) or null | no |  |
| `data.name` | string | yes |  |
| `data.retry_delay_sec` | integer (int32) or null | no |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_headers` | any | no |  |
| `data.webhook_url` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": IntegrationSubscriber }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.delivery` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_retries` | integer (int32) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.retry_delay_sec` | integer (int32) | yes |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_url` | string or null | no |  |

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
  "method": "create_integration_subscriber",
  "params": {
    "data": {
      "code": "<code>",
      "delivery": "<delivery>",
      "name": "<name>"
    }
  }
}'
```

### delete_integration_subscriber

Delete a integration_subscriber by ID — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_integration_subscriber` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": IntegrationSubscriber }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.delivery` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_retries` | integer (int32) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.retry_delay_sec` | integer (int32) | yes |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_url` | string or null | no |  |

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
  "method": "delete_integration_subscriber",
  "params": {
    "id": 1
  }
}'
```

### get_integration_event

Get a integration_event by ID — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_integration_event` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": IntegrationEvent }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.entity_name` | string | yes |  |
| `data.event_category` | string | yes |  |
| `data.event_code` | string | yes |  |
| `data.event_status` | string | yes |  |
| `data.failure_count` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.internal_result` | any | no | Per D-22. Results of internal processing (Decision Tables, Rules, Lua). |
| `data.internal_status` | string | yes |  |
| `data.key1` | string | yes |  |
| `data.key2` | string | yes | Per D-22. Secondary identifier (e.g. line_number). |
| `data.key3` | string | yes | Per D-22. Tertiary identifier. |
| `data.last_error` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.payload` | any | no | Per D-22. Full typed event payload (JSON Schema described in event_registry). |
| `data.tenant_id` | integer (int64) or null | no |  |
| `data.warehouse` | string or null | no |  |

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
  "method": "get_integration_event",
  "params": {
    "id": 1
  }
}'
```

### get_integration_subscriber

Get a integration_subscriber by ID — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_integration_subscriber` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": IntegrationSubscriber }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.delivery` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_retries` | integer (int32) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.retry_delay_sec` | integer (int32) | yes |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_url` | string or null | no |  |

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
  "method": "get_integration_subscriber",
  "params": {
    "id": 1
  }
}'
```

### list_integration_event

List integration_event — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_integration_event` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_code` | string filter | no | Filter on `event_code`. |
| `filters[].entity_name` | string filter | no | Filter on `entity_name`. |
| `filters[].event_status` | string filter | no | Filter on `event_status`. |
| `filters[].internal_status` | string filter | no | Filter on `internal_status`. |
| `filters[].warehouse` | string filter | no | Filter on `warehouse`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [IntegrationEvent] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].entity_name` | string | yes |  |
| `data[].event_category` | string | yes |  |
| `data[].event_code` | string | yes |  |
| `data[].event_status` | string | yes |  |
| `data[].failure_count` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].internal_result` | any | no | Per D-22. Results of internal processing (Decision Tables, Rules, Lua). |
| `data[].internal_status` | string | yes |  |
| `data[].key1` | string | yes |  |
| `data[].key2` | string | yes | Per D-22. Secondary identifier (e.g. line_number). |
| `data[].key3` | string | yes | Per D-22. Tertiary identifier. |
| `data[].last_error` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].payload` | any | no | Per D-22. Full typed event payload (JSON Schema described in event_registry). |
| `data[].tenant_id` | integer (int64) or null | no |  |
| `data[].warehouse` | string or null | no |  |

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
  "method": "list_integration_event",
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

### list_integration_subscriber

List integration_subscriber — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_integration_subscriber` |
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
| `filters[].delivery` | string filter | no | Filter on `delivery`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [IntegrationSubscriber] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].delivery` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].event_filter` | any | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].max_retries` | integer (int32) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].retry_delay_sec` | integer (int32) | yes |  |
| `data[].warehouse_filter` | any | no |  |
| `data[].webhook_url` | string or null | no |  |

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
  "method": "list_integration_subscriber",
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

### update_integration_subscriber

Update integration subscriber configuration with explicit webhook clearing.

| | |
|---|---|
| Context / module | integration / integration_event |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_integration_subscriber` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (IntegrationSubscriberUpdateApi) | yes | Subscriber code is stable binding identity. |
| `data.delivery` | string | no |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | no |  |
| `data.is_active` | boolean | no |  |
| `data.max_retries` | integer (int32) | no |  |
| `data.name` | string | no |  |
| `data.retry_delay_sec` | integer (int32) | no |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_headers` | any | no |  |
| `data.webhook_url` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": IntegrationSubscriber }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.delivery` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.event_filter` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.max_retries` | integer (int32) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.retry_delay_sec` | integer (int32) | yes |  |
| `data.warehouse_filter` | any | no |  |
| `data.webhook_url` | string or null | no |  |

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
  "method": "update_integration_subscriber",
  "params": {
    "id": 1,
    "data": {
      "delivery": "<delivery>",
      "description": "<description>"
    }
  }
}'
```

## Module: integration_event_delivery

### count_integration_event_delivery

Count integration_event_delivery — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event_delivery |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_integration_event_delivery` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_id` | integer filter | no | Filter on `event_id`. |
| `filters[].subscriber_id` | integer filter | no | Filter on `subscriber_id`. |
| `filters[].transmit_status` | string filter | no | Filter on `transmit_status`. |
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
  "method": "count_integration_event_delivery",
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

### get_integration_event_delivery

Get a integration_event_delivery by ID — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event_delivery |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_integration_event_delivery` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": IntegrationEventDelivery }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attempts` | integer (int32) | yes |  |
| `data.event_id` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_attempt` | string or null | no |  |
| `data.last_error` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.next_attempt` | string or null | no |  |
| `data.response_code` | integer (int32) or null | no |  |
| `data.subscriber_id` | integer (int64) | yes |  |
| `data.transmit_batch` | string or null | no |  |
| `data.transmit_status` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attempts": 1,
      "event_id": 1,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "subscriber_id": 1,
      "transmit_status": "<transmit_status>"
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
  "method": "get_integration_event_delivery",
  "params": {
    "id": 1
  }
}'
```

### list_integration_event_delivery

List integration_event_delivery — CRUD.

| | |
|---|---|
| Context / module | integration / integration_event_delivery |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_integration_event_delivery` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].event_id` | integer filter | no | Filter on `event_id`. |
| `filters[].subscriber_id` | integer filter | no | Filter on `subscriber_id`. |
| `filters[].transmit_status` | string filter | no | Filter on `transmit_status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [IntegrationEventDelivery] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].attempts` | integer (int32) | yes |  |
| `data[].event_id` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].last_attempt` | string or null | no |  |
| `data[].last_error` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].next_attempt` | string or null | no |  |
| `data[].response_code` | integer (int32) or null | no |  |
| `data[].subscriber_id` | integer (int64) | yes |  |
| `data[].transmit_batch` | string or null | no |  |
| `data[].transmit_status` | string | yes |  |

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
  "method": "list_integration_event_delivery",
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
