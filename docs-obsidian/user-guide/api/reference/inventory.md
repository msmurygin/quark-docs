# Inventory methods

Stock: moves, put-away and put-away policies, holds, serial numbers, adjustments, counts, the transaction log, lot lookup and barcode scan reading.

This page documents 161 methods of the `inventory` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **putaway_policy**: [create_putaway_policy](#create_putaway_policy), [get_putaway_policy](#get_putaway_policy), [list_putaway_policy](#list_putaway_policy), [update_putaway_policy](#update_putaway_policy), [delete_putaway_policy](#delete_putaway_policy), [delete_many_putaway_policy](#delete_many_putaway_policy), [count_putaway_policy](#count_putaway_policy), [get_putaway_policy_detail](#get_putaway_policy_detail), [list_putaway_policy_detail](#list_putaway_policy_detail), [count_putaway_policy_detail](#count_putaway_policy_detail), [get_putaway_step_criterion](#get_putaway_step_criterion), [list_putaway_step_criterion](#list_putaway_step_criterion), [count_putaway_step_criterion](#count_putaway_step_criterion), [putaway_pipeline_view](#putaway_pipeline_view), [putaway_criterion_vocabulary](#putaway_criterion_vocabulary), [putaway_dry_run](#putaway_dry_run), [putaway_steps_save](#putaway_steps_save), [putaway_step_add](#putaway_step_add), [putaway_step_delete](#putaway_step_delete), [putaway_steps_reorder](#putaway_steps_reorder)
- **inventory_hold_code**: [create_inventory_hold_code](#create_inventory_hold_code), [get_inventory_hold_code](#get_inventory_hold_code), [list_inventory_hold_code](#list_inventory_hold_code), [update_inventory_hold_code](#update_inventory_hold_code), [delete_inventory_hold_code](#delete_inventory_hold_code), [delete_many_inventory_hold_code](#delete_many_inventory_hold_code), [count_inventory_hold_code](#count_inventory_hold_code)
- **move_command**: [move_execute](#move_execute), [generate_lpn](#generate_lpn), [print_lpn_label](#print_lpn_label), [move_source_holds](#move_source_holds)
- **putaway**: [putaway_suggest_location](#putaway_suggest_location), [putaway_explain_location](#putaway_explain_location), [putaway_release_reservation](#putaway_release_reservation), [list_inventory_pending_move_in](#list_inventory_pending_move_in), [count_inventory_pending_move_in](#count_inventory_pending_move_in)
- **hold**: [list_active_holds_by_lpn](#list_active_holds_by_lpn), [create_inventory_hold](#create_inventory_hold), [create_inventory_hold_row](#create_inventory_hold_row), [release_inventory_hold](#release_inventory_hold)
- **serial_commands**: [serial_reserve](#serial_reserve), [serial_pick](#serial_pick), [serial_ship](#serial_ship), [serial_return](#serial_return), [serial_dispose](#serial_dispose), [serial_move](#serial_move), [remove_captured_serial](#remove_captured_serial), [capture_serial](#capture_serial), [cancel_episode](#cancel_episode), [force_close_episode](#force_close_episode), [list_open_episodes_for_receipt](#list_open_episodes_for_receipt), [list_open_episodes_for_operator](#list_open_episodes_for_operator), [list_force_close_candidates](#list_force_close_candidates)
- **transaction_log**: [list_transaction_log](#list_transaction_log), [get_transaction_log](#get_transaction_log), [count_transaction_log](#count_transaction_log)
- **sku_pick_location**: [get_sku_pick_location](#get_sku_pick_location), [list_sku_pick_location](#list_sku_pick_location), [count_sku_pick_location](#count_sku_pick_location), [create_sku_pick_location](#create_sku_pick_location), [update_sku_pick_location](#update_sku_pick_location), [delete_sku_pick_location](#delete_sku_pick_location)
- **replenishment**: [replenishment_take_next](#replenishment_take_next), [replenishment_confirm](#replenishment_confirm), [replenishment_plan](#replenishment_plan), [replenishment_cancel](#replenishment_cancel), [replenishment_get](#replenishment_get), [replenishment_list](#replenishment_list), [replenishment_count](#replenishment_count)
- **sku_serial_config**: [create_sku_serial_config](#create_sku_serial_config), [get_sku_serial_config](#get_sku_serial_config), [get_sku_serial_config_by_sku](#get_sku_serial_config_by_sku), [list_sku_serial_config](#list_sku_serial_config), [update_sku_serial_config](#update_sku_serial_config), [count_sku_serial_config](#count_sku_serial_config)
- **inventory_balance_serial**: [get_inventory_balance_serial](#get_inventory_balance_serial), [list_inventory_balance_serial](#list_inventory_balance_serial), [count_inventory_balance_serial](#count_inventory_balance_serial)
- **handling_unit**: [handling_unit_register](#handling_unit_register), [list_handling_unit](#list_handling_unit)
- **inventory_adjustment**: [inventory_adjustment_create](#inventory_adjustment_create), [inventory_adjustment_add_lines](#inventory_adjustment_add_lines), [inventory_adjustment_add_line](#inventory_adjustment_add_line), [inventory_adjustment_generate_lines](#inventory_adjustment_generate_lines), [inventory_adjustment_update_line](#inventory_adjustment_update_line), [inventory_adjustment_remove_line](#inventory_adjustment_remove_line), [inventory_adjustment_validate](#inventory_adjustment_validate), [inventory_adjustment_post](#inventory_adjustment_post), [inventory_adjustment_reverse](#inventory_adjustment_reverse), [inventory_adjustment_delete](#inventory_adjustment_delete), [create_inventory_adjustment](#create_inventory_adjustment), [update_inventory_adjustment](#update_inventory_adjustment), [create_inventory_adjustment_line](#create_inventory_adjustment_line), [update_inventory_adjustment_line](#update_inventory_adjustment_line), [inventory_adjustment_approve](#inventory_adjustment_approve), [inventory_adjust_reason_set_count](#inventory_adjust_reason_set_count), [inventory_adjustment_get](#inventory_adjustment_get), [inventory_adjustment_list](#inventory_adjustment_list), [inventory_adjustment_list_lines](#inventory_adjustment_list_lines), [inventory_adjustment_card_get](#inventory_adjustment_card_get), [inventory_adjustment_line_preview_list](#inventory_adjustment_line_preview_list), [get_inventory_adjustment_line](#get_inventory_adjustment_line), [inventory_adjust_reason_list](#inventory_adjust_reason_list)
- **inventory_count**: [inventory_count_task_take_next](#inventory_count_task_take_next), [inventory_count_task_at_location](#inventory_count_task_at_location), [inventory_count_task_leave](#inventory_count_task_leave), [inventory_count_observe](#inventory_count_observe), [inventory_count_void_observation](#inventory_count_void_observation), [inventory_count_confirm_empty](#inventory_count_confirm_empty), [inventory_count_complete](#inventory_count_complete), [location_confirm_empty](#location_confirm_empty), [location_report_unexpected](#location_report_unexpected), [inventory_count_create](#inventory_count_create), [inventory_count_add_locations](#inventory_count_add_locations), [inventory_count_remove_location](#inventory_count_remove_location), [inventory_count_accept](#inventory_count_accept), [inventory_count_recount](#inventory_count_recount), [inventory_count_cancel](#inventory_count_cancel), [inventory_count_delete](#inventory_count_delete), [create_inventory_count](#create_inventory_count), [inventory_count_policy_create](#inventory_count_policy_create), [inventory_count_policy_save](#inventory_count_policy_save), [inventory_count_policy_run](#inventory_count_policy_run), [inventory_count_policy_delete](#inventory_count_policy_delete), [create_inventory_count_policy](#create_inventory_count_policy), [update_inventory_count_policy](#update_inventory_count_policy), [update_inventory_count_tolerance](#update_inventory_count_tolerance), [inventory_count_task_get](#inventory_count_task_get), [inventory_count_get](#inventory_count_get), [inventory_count_list](#inventory_count_list), [inventory_count_list_tasks](#inventory_count_list_tasks), [inventory_count_card_get](#inventory_count_card_get), [inventory_count_location_results](#inventory_count_location_results), [inventory_count_location_serials](#inventory_count_location_serials), [inventory_count_task_card_get](#inventory_count_task_card_get), [inventory_count_policy_get](#inventory_count_policy_get), [inventory_count_policy_list](#inventory_count_policy_list), [inventory_count_tolerance_get](#inventory_count_tolerance_get), [inventory_count_tolerance_list](#inventory_count_tolerance_list), [location_checks](#location_checks)
- **lot_transfer**: [lot_transfer_create](#lot_transfer_create), [lot_transfer_update_header](#lot_transfer_update_header), [lot_transfer_add_line](#lot_transfer_add_line), [lot_transfer_update_line](#lot_transfer_update_line), [lot_transfer_set_line_attributes](#lot_transfer_set_line_attributes), [lot_transfer_remove_line](#lot_transfer_remove_line), [lot_transfer_post](#lot_transfer_post), [lot_transfer_delete](#lot_transfer_delete), [create_lot_transfer](#create_lot_transfer), [update_lot_transfer](#update_lot_transfer), [create_lot_transfer_line](#create_lot_transfer_line), [update_lot_transfer_line](#update_lot_transfer_line), [lot_transfer_list](#lot_transfer_list), [lot_transfer_card_get](#lot_transfer_card_get), [lot_transfer_line_list](#lot_transfer_line_list), [get_lot_transfer_line](#get_lot_transfer_line), [lot_transfer_line_attribute_list](#lot_transfer_line_attribute_list)
- **lot_by_attributes**: [lot_create_by_attributes](#lot_create_by_attributes), [lot_attribute_template](#lot_attribute_template), [lot_search_by_attributes](#lot_search_by_attributes)
- **barcode_scan**: [barcode_scan_parse](#barcode_scan_parse)

## Module: putaway_policy

### count_putaway_policy

Count putaway_policy — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_putaway_policy` |
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
  "method": "count_putaway_policy",
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

### count_putaway_policy_detail

Count putaway_policy_detail — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_putaway_policy_detail` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putaway_policy_id` | integer filter | no | Filter on `putaway_policy_id`. |
| `filters[].step_num` | string filter | no | Filter on `step_num`. |
| `filters[].sequence` | integer filter | no | Filter on `sequence`. |
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
  "method": "count_putaway_policy_detail",
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

### count_putaway_step_criterion

Count putaway_step_criterion — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_putaway_step_criterion` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putaway_policy_detail_id` | integer filter | no | Filter on `putaway_policy_detail_id`. |
| `filters[].subject` | string filter | no | Filter on `subject`. |
| `filters[].property` | string filter | no | Filter on `property`. |
| `filters[].rule` | string filter | no | Filter on `rule`. |
| `filters[].attribute_code` | string filter | no | Filter on `attribute_code`. |
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
  "method": "count_putaway_step_criterion",
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

### create_putaway_policy

Create a putaway policy whose steps are owned by the putaway pipeline.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_putaway_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PutawayPolicyForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no | Optional on create: a policy is identified by its code, and demanding a description to write one down would be a field invented by the form rather than by the warehouse. |

**Result**

The `result` member of the response is: `{ "data": PutawayPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no | What the policy is FOR, in the operator's words. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "create_putaway_policy",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### delete_many_putaway_policy

Delete unreferenced putaway policies and their owned steps and criteria.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_putaway_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

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
  "method": "delete_many_putaway_policy",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_putaway_policy

Delete an unreferenced putaway policy and all of its owned steps and criteria.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_putaway_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no | What the policy is FOR, in the operator's words. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "delete_putaway_policy",
  "params": {
    "id": 1
  }
}'
```

### get_putaway_policy

Get a putaway_policy by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putaway_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no | What the policy is FOR, in the operator's words. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "get_putaway_policy",
  "params": {
    "id": 1
  }
}'
```

### get_putaway_policy_detail

Get a putaway_policy_detail by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putaway_policy_detail` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayPolicyDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_mixed_lot` | boolean or null | no |  |
| `data.allow_mixed_sku` | boolean or null | no | Whether the suggested location may already hold other SKUs / other lots, and whether it must be empty. |
| `data.fit_by_cube` | boolean | yes | Which PHYSICAL checks this step applies (migration 231). |
| `data.fit_by_pallet_dims` | boolean | yes |  |
| `data.fit_by_quantity` | boolean | yes | What the location already holds, plus what is arriving, against `location.max_qty_capacity` — how a pick face is sized: it holds so many EACHes and then it is full. |
| `data.fit_by_stack_limit` | boolean | yes | Refuse a location whose pallet POSITIONS are taken — `location.footprint × location.stack_limit`, the count Infor calls Fit by Stack Limit. |
| `data.fit_by_weight` | boolean | yes |  |
| `data.from_location` | string or null | no |  |
| `data.from_zone` | string or null | no |  |
| `data.guard` | one of: None \| FromZone \| FromLocation | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.mode` | one of: Suitable \| Consolidate | yes |  |
| `data.ordering` | one of: Route \| NearestToSlot | yes |  |
| `data.putaway_policy_id` | integer (int64) | yes |  |
| `data.require_empty` | boolean or null | no |  |
| `data.respect_temperature` | boolean | yes | Reject a location whose temperature range does not cover the SKU's. |
| `data.scope` | one of: ZoneFromStep \| ZoneFromSku \| LocationFromStep \| LocationFromSku \| AssignedSlot | yes |  |
| `data.sequence` | integer (int32) | yes | Execution order within the policy. |
| `data.step_num` | string | yes | User-facing step label. |
| `data.to_location` | string or null | no |  |
| `data.to_zone` | string or null | no |  |
| `data.version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "get_putaway_policy_detail",
  "params": {
    "id": 1
  }
}'
```

### get_putaway_step_criterion

Get a putaway_step_criterion by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_putaway_step_criterion` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PutawayStepCriterion }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_code` | string or null | no | Which attribute the criterion narrows on (COLOR, SIZE) — set for exactly the three attribute properties (`LotAttribute`, `SkuAttribute`, `LocationAttribute`) and NULL for every other. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.property` | one of: LocationType \| LocationStatus \| LocationCategory \| LocationProcessingType \| LocationFlag \| LocationAbc \| MixSku \| MixLot \| SkuAbc \| SkuGroup \| SkuClass \| PutawayClass \| … (+5) | yes |  |
| `data.putaway_policy_detail_id` | integer (int64) | yes |  |
| `data.rule` | one of: Include \| Exclude | yes |  |
| `data.subject` | one of: Product \| Location | yes |  |
| `data.values` | array of string | yes | The `text[]` column (migration 209): one column serves every property kind (an enum's SQL label, `'true'`/`'false'`, or a one-element array for a scalar) because the resolver — not the storage — knows the type. |

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
      "property": "LocationType",
      "putaway_policy_detail_id": 1,
      "rule": "Include",
      "subject": "Product",
      "values": [
        "<values>"
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
  "method": "get_putaway_step_criterion",
  "params": {
    "id": 1
  }
}'
```

### list_putaway_policy

List putaway_policy — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_putaway_policy` |
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
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PutawayPolicy] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no | What the policy is FOR, in the operator's words. |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "list_putaway_policy",
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

### list_putaway_policy_detail

List putaway_policy_detail — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_putaway_policy_detail` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putaway_policy_id` | integer filter | no | Filter on `putaway_policy_id`. |
| `filters[].step_num` | string filter | no | Filter on `step_num`. |
| `filters[].sequence` | integer filter | no | Filter on `sequence`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PutawayPolicyDetail] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_mixed_lot` | boolean or null | no |  |
| `data[].allow_mixed_sku` | boolean or null | no | Whether the suggested location may already hold other SKUs / other lots, and whether it must be empty. |
| `data[].fit_by_cube` | boolean | yes | Which PHYSICAL checks this step applies (migration 231). |
| `data[].fit_by_pallet_dims` | boolean | yes |  |
| `data[].fit_by_quantity` | boolean | yes | What the location already holds, plus what is arriving, against `location.max_qty_capacity` — how a pick face is sized: it holds so many EACHes and then it is full. |
| `data[].fit_by_stack_limit` | boolean | yes | Refuse a location whose pallet POSITIONS are taken — `location.footprint × location.stack_limit`, the count Infor calls Fit by Stack Limit. |
| `data[].fit_by_weight` | boolean | yes |  |
| `data[].from_location` | string or null | no |  |
| `data[].from_zone` | string or null | no |  |
| `data[].guard` | one of: None \| FromZone \| FromLocation | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].mode` | one of: Suitable \| Consolidate | yes |  |
| `data[].ordering` | one of: Route \| NearestToSlot | yes |  |
| `data[].putaway_policy_id` | integer (int64) | yes |  |
| `data[].require_empty` | boolean or null | no |  |
| `data[].respect_temperature` | boolean | yes | Reject a location whose temperature range does not cover the SKU's. |
| `data[].scope` | one of: ZoneFromStep \| ZoneFromSku \| LocationFromStep \| LocationFromSku \| AssignedSlot | yes |  |
| `data[].sequence` | integer (int32) | yes | Execution order within the policy. |
| `data[].step_num` | string | yes | User-facing step label. |
| `data[].to_location` | string or null | no |  |
| `data[].to_zone` | string or null | no |  |
| `data[].version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "list_putaway_policy_detail",
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

### list_putaway_step_criterion

List putaway_step_criterion — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_putaway_step_criterion` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].putaway_policy_detail_id` | integer filter | no | Filter on `putaway_policy_detail_id`. |
| `filters[].subject` | string filter | no | Filter on `subject`. |
| `filters[].property` | string filter | no | Filter on `property`. |
| `filters[].rule` | string filter | no | Filter on `rule`. |
| `filters[].attribute_code` | string filter | no | Filter on `attribute_code`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PutawayStepCriterion] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].attribute_code` | string or null | no | Which attribute the criterion narrows on (COLOR, SIZE) — set for exactly the three attribute properties (`LotAttribute`, `SkuAttribute`, `LocationAttribute`) and NULL for every other. |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].property` | one of: LocationType \| LocationStatus \| LocationCategory \| LocationProcessingType \| LocationFlag \| LocationAbc \| MixSku \| MixLot \| SkuAbc \| SkuGroup \| SkuClass \| PutawayClass \| … (+5) | yes |  |
| `data[].putaway_policy_detail_id` | integer (int64) | yes |  |
| `data[].rule` | one of: Include \| Exclude | yes |  |
| `data[].subject` | one of: Product \| Location | yes |  |
| `data[].values` | array of string | yes | The `text[]` column (migration 209): one column serves every property kind (an enum's SQL label, `'true'`/`'false'`, or a one-element array for a scalar) because the resolver — not the storage — knows the type. |

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
  "method": "list_putaway_step_criterion",
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

### putaway_criterion_vocabulary

The values a putaway criterion may take: its properties, their attributes, and the values of one.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `putaway_criterion_vocabulary` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `attribute_code` | string or null | no |  |
| `property` | string or null | no | A `CriterionProperty` label, as the engine spells it. |

**Result**

The `result` member of the response is: `{ "data": VocabularyAnswer }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.items` | array of object (VocabularyItem) | yes |  |
| `data.items[].code` | string | yes | What lands in the row and what the engine compares — exactly, and case-sensitively. |
| `data.items[].display` | string | yes | What a human reads. |
| `data.items[].reason` | string or null | no | Why this item is grouped where it is — the family, at the property stage, which is what the picker draws its headings from (the same shape the allocation screen's unit picker groups by class). |
| `data.stage` | string | yes | `"property"` \\| `"attribute"` \\| `"value"`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "items": [
        {
          "code": "<code>",
          "display": "<display>"
        }
      ],
      "stage": "<stage>"
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
  "method": "putaway_criterion_vocabulary",
  "params": {}
}'
```

### putaway_dry_run

What the putaway engine would do with one LPN under one policy, in words: the pallet, which step wins and where it would go, and every step of the pipeline with why it did or did not answer — including the ones the engine never reached.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `putaway_dry_run` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `lpn` | string | yes |  |
| `policy_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PutawayDryRun }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.chosen` | string or null | no | The location the engine would take, when a step matched. |
| `data.lpn` | string | yes | Echoed back, trimmed — the panel keeps its own field, and a report that did not name its subject cannot be read beside a second one. |
| `data.pallet` | object (DryRunPallet) or null | no | What the LPN carries. |
| `data.pallet.container_id` | integer (int64) | yes | What the engine was actually asked about — `container.id`, which is what `explain_location` takes. |
| `data.pallet.lines` | array of object (DryRunPalletLine) | yes |  |
| `data.pallet.location` | string | yes | Where the pallet is standing now. |
| `data.pallet.note` | string or null | no | Anything that needs saying about the LIST rather than about the pallet — today, the two ways `lines` can hold fewer rows than the LPN's stock did: it was cut at `PALLET_LINES_CAP`, or rows under this LPN sit on a different container and are not on this pallet. |
| `data.refusal` | string or null | no | Why there is no walk to report, worded. |
| `data.steps` | array of object (DryRunStep) | yes | EVERY step of the policy, in `sequence` order. |
| `data.steps[].candidates` | array of object (DryRunCandidate) | yes | Only for the step that MATCHED. |
| `data.steps[].candidates_seen` | integer (int64) | yes |  |
| `data.steps[].explanation` | string | yes | The outcome in words, including the pipeline position, so one line of the report reads on its own. |
| `data.steps[].outcome` | one of: Matched \| Evaluated \| Skipped \| NotReached | yes | How one step of the pipeline answered. |
| `data.steps[].searched_location` | string or null | no | The single location this step searched, when its scope named one. |
| `data.steps[].step_num` | string | yes | The step's own `step_num`, exactly as the policy stores it — the panel matches its cards on this. |
| `data.steps[].zone` | string or null | no | The zone this step searched. |
| `data.verdict` | string | yes | One sentence: which step won, or that none did. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "lpn": "<lpn>",
      "steps": [
        {
          "candidates": [
            {
              "location": null,
              "outcome": null,
              "predicate": null
            }
          ],
          "candidates_seen": 1,
          "explanation": "<explanation>",
          "outcome": "Matched",
          "step_num": "<step_num>"
        }
      ],
      "verdict": "<verdict>"
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
  "method": "putaway_dry_run",
  "params": {
    "lpn": "<lpn>",
    "policy_id": 1
  }
}'
```

### putaway_pipeline_view

Read one putaway policy's step pipeline with its criteria, its readback, its refusals and its never-runs marks.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `putaway_pipeline_view` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `drafts` | array of object (StepDraft) or null | no |  |
| `drafts[].criteria` | array of object (CriterionRow) or null | no | The conditions the operator is holding for this step, or `None` when they have not touched them. |
| `drafts[].criteria[].attribute_code` | string or null | no | Set for exactly the three EAV properties, NULL for the other thirteen (`CriterionProperty::needs_attribute_code`). |
| `drafts[].criteria[].id` | integer (int64) or null | no |  |
| `drafts[].criteria[].property` | one of: LocationType \| LocationStatus \| LocationCategory \| LocationProcessingType \| LocationFlag \| LocationAbc \| MixSku \| MixLot \| SkuAbc \| SkuGroup \| SkuClass \| PutawayClass \| … (+5) | yes |  |
| `drafts[].criteria[].rule` | one of: Include \| Exclude | yes | The negation: `Include` or `Exclude`. |
| `drafts[].criteria[].values` | array of string | yes |  |
| `drafts[].fields` | any | yes | Raw JSON, for the same reason the save's `fields` is: serde folds `{"allow_mixed_sku": null}` and `{}` into the same `None`, and "this step has no opinion" must not read as "leave it alone" in a preview any more than it may in a write. |
| `drafts[].step_id` | integer (int64) | yes |  |
| `id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PutawayPipelineView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.next_step_num` | string | yes | What the system will call the next step the operator adds. |
| `data.policy_code` | string | yes |  |
| `data.policy_id` | integer (int64) | yes |  |
| `data.policy_version` | integer (int32) | yes | The policy's own optimistic lock — what a reorder must echo back. |
| `data.steps` | array of object (PutawayPipelineStep) | yes | Every step of the policy in execution order (`sequence`, never `step_num` — that is `varchar(5)` and sorts '10' before '2'). |
| `data.steps[].clauses` | array of object (Clause) | yes | The running sentence, in the pieces the card's three bands need (`narrate_step`'s own topics, not this file's). |
| `data.steps[].criteria` | array of object (CriterionRow) | yes | The step's conditions, in the order `list_for_step` returns them — the `property` enum's own declaration order. |
| `data.steps[].fields` | object (PutawayStepFields) | yes | The seventeen card fields, under their own column names. |
| `data.steps[].id` | integer (int64) | yes |  |
| `data.steps[].never_runs_after` | string or null | no | The `step_num` of the earlier step that leaves this one nothing to place, when there is one. |
| `data.steps[].refusals` | array of object (Clause) | yes | Why this step, AS THE OPERATOR IS HOLDING IT, cannot be saved. |
| `data.steps[].sequence` | integer (int32) | yes |  |
| `data.steps[].step_num` | string | yes |  |
| `data.steps[].version` | integer (int32) | yes | This step's own optimistic lock — per step, never per policy, because two supervisors editing two different steps must not collide. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "next_step_num": "<next_step_num>",
      "policy_code": "<policy_code>",
      "policy_id": 1,
      "policy_version": 1,
      "steps": [
        {
          "clauses": [
            {
              "runs": null,
              "text": null,
              "topic": null
            }
          ],
          "criteria": [
            {
              "property": null,
              "rule": null,
              "values": null
            }
          ],
          "fields": {
            "fit_by_cube": false,
            "fit_by_pallet_dims": false,
            "fit_by_quantity": false,
            "fit_by_stack_limit": false,
            "fit_by_weight": false,
            "guard": null,
            "mode": null,
            "ordering": null,
            "respect_temperature": false,
            "scope": null
          },
          "id": 1,
          "refusals": [
            {
              "runs": null,
              "text": null,
              "topic": null
            }
          ],
          "sequence": 1,
          "step_num": "<step_num>",
          "version": 1
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
  "method": "putaway_pipeline_view",
  "params": {
    "id": 1
  }
}'
```

### putaway_step_add

Add an empty step at the end of one putaway policy's pipeline; the system numbers it.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_step_add` |
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
| `data` | object (AddPutawayStep) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.policy_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": AddPutawayStepResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.step_id` | integer (int64) | yes |  |
| `data.step_num` | string | yes | What the system called it — the label the operator now reads on the card, which is why the caller gets it back rather than guessing. |

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
      "step_id": 1,
      "step_num": "<step_num>"
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
  "method": "putaway_step_add",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "policy_id": 1
    }
  }
}'
```

### putaway_step_delete

Delete one putaway step, against the version it was read at; its conditions go with it.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_step_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `putaway_policy_detail`: send `expected_version` for row `step_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeletePutawayStep) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.step_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DeletePutawayStepResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.step_id` | integer (int64) | yes |  |

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
      "step_id": 1
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
  "method": "putaway_step_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "step_id": 1
    }
  }
}'
```

### putaway_steps_reorder

Reorder one putaway policy's steps, against the policy's version.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_steps_reorder` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `putaway_policy`: send `expected_policy_version` for row `policy_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_policy_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (ReorderPutawaySteps) | yes |  |
| `data.expected_policy_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.policy_id` | integer (int64) | yes |  |
| `data.step_ids` | array of integer (int64) | yes | Every step of the policy, in the order the screen now shows them. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReorderPutawayStepsResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.new_policy_version` | integer (int32) | yes |  |

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
      "new_policy_version": 1
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
  "method": "putaway_steps_reorder",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "expected_policy_version": 1,
      "policy_id": 1,
      "step_ids": [
        1
      ]
    }
  }
}'
```

### putaway_steps_save

Write every edited putaway step of one policy, each against its own version, with its conditions.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_steps_save` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `putaway_policy_detail`: send `steps[].expected_version` for row `steps[].step_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `steps[].expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SavePutawaySteps) | yes |  |
| `data.idempotency_key` | string (uuid) | no | Resolved at the RPC boundary from `params.meta` when the wire did not put it here — see `IdempotencyKey::unset` for why the default is a sentinel and never a fresh random key. |
| `data.policy_id` | integer (int64) | yes |  |
| `data.steps` | array of object (PutawayStepEdit) | yes |  |
| `data.steps[].criteria` | array of object (CriterionRow) or null | no | The conditions this step should END UP with, or `None` to leave them alone. |
| `data.steps[].expected_version` | integer (int32) | yes |  |
| `data.steps[].fields` | any | yes |  |
| `data.steps[].step_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": SavePutawayStepsResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.versions` | array of object (StepVersion) | yes |  |
| `data.versions[].step_id` | integer (int64) | yes |  |
| `data.versions[].version` | integer (int32) | yes |  |

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
      "versions": [
        {
          "step_id": 1,
          "version": 1
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
  "method": "putaway_steps_save",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "policy_id": 1,
      "steps": [
        {
          "expected_version": 1,
          "fields": {},
          "step_id": 1
        }
      ]
    }
  }
}'
```

### update_putaway_policy

Update a putaway policy header without overwriting a newer edit.

| | |
|---|---|
| Context / module | inventory / putaway_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_putaway_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `putaway_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (PutawayPolicyHeaderUpdate) | yes | Editable putaway-policy header fields. |
| `data.data.description` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PutawayPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no | What the policy is FOR, in the operator's words. |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.version` | integer (int32) | yes | Optimistic lock (migration 349). |

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
  "method": "update_putaway_policy",
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

## Module: inventory_hold_code

### count_inventory_hold_code

Count inventory_hold_code — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
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
  "method": "count_inventory_hold_code",
  "params": {
    "filters": [
      {
        "code": "<code>"
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### create_inventory_hold_code

Create a new inventory_hold_code — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (InventoryHoldCodeForCreate) | yes |  |
| `data.active` | boolean | yes |  |
| `data.block_inbound_flow` | boolean | yes |  |
| `data.block_outbound_flow` | boolean | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | yes |  |
| `data.overridable` | boolean | yes |  |
| `data.rank` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": InventoryHoldCode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.block_inbound_flow` | boolean | yes | Does this hold forbid PUTTING stock into the place it covers? |
| `data.block_outbound_flow` | boolean | yes | Does this hold forbid TAKING stock out of the place it covers? |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.overridable` | boolean | yes |  |
| `data.rank` | integer (int64) | yes | Intended as the dropdown sort order (low rank on top, migration 142). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "block_inbound_flow": false,
      "block_outbound_flow": false,
      "code": "<code>",
      "enforce": false,
      "id": 1,
      "overridable": false,
      "rank": 1
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
  "method": "create_inventory_hold_code",
  "params": {
    "data": {
      "active": false,
      "block_inbound_flow": false,
      "block_outbound_flow": false,
      "code": "<code>",
      "enforce": false,
      "overridable": false,
      "rank": 1
    }
  }
}'
```

### delete_inventory_hold_code

Delete a inventory_hold_code by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryHoldCode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.block_inbound_flow` | boolean | yes | Does this hold forbid PUTTING stock into the place it covers? |
| `data.block_outbound_flow` | boolean | yes | Does this hold forbid TAKING stock out of the place it covers? |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.overridable` | boolean | yes |  |
| `data.rank` | integer (int64) | yes | Intended as the dropdown sort order (low rank on top, migration 142). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "block_inbound_flow": false,
      "block_outbound_flow": false,
      "code": "<code>",
      "enforce": false,
      "id": 1,
      "overridable": false,
      "rank": 1
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
  "method": "delete_inventory_hold_code",
  "params": {
    "id": 1
  }
}'
```

### delete_many_inventory_hold_code

Delete multiple inventory_hold_code by IDs — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_inventory_hold_code` |
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
  "method": "delete_many_inventory_hold_code",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_inventory_hold_code

Get a inventory_hold_code by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryHoldCode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.block_inbound_flow` | boolean | yes | Does this hold forbid PUTTING stock into the place it covers? |
| `data.block_outbound_flow` | boolean | yes | Does this hold forbid TAKING stock out of the place it covers? |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.overridable` | boolean | yes |  |
| `data.rank` | integer (int64) | yes | Intended as the dropdown sort order (low rank on top, migration 142). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "block_inbound_flow": false,
      "block_outbound_flow": false,
      "code": "<code>",
      "enforce": false,
      "id": 1,
      "overridable": false,
      "rank": 1
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
  "method": "get_inventory_hold_code",
  "params": {
    "id": 1
  }
}'
```

### list_inventory_hold_code

List inventory_hold_code — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].active` | boolean filter | no | Filter on `active`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryHoldCode] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].active` | boolean | yes |  |
| `data[].block_inbound_flow` | boolean | yes | Does this hold forbid PUTTING stock into the place it covers? |
| `data[].block_outbound_flow` | boolean | yes | Does this hold forbid TAKING stock out of the place it covers? |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].enforce` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].overridable` | boolean | yes |  |
| `data[].rank` | integer (int64) | yes | Intended as the dropdown sort order (low rank on top, migration 142). |

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
  "method": "list_inventory_hold_code",
  "params": {
    "filters": [
      {
        "code": "<code>"
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### update_inventory_hold_code

Update hold-code behavior without changing its stable code.

| | |
|---|---|
| Context / module | inventory / inventory_hold_code |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_inventory_hold_code` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (InventoryHoldCodeUpdateApi) | yes |  |
| `data.active` | boolean | no |  |
| `data.block_inbound_flow` | boolean | no |  |
| `data.block_outbound_flow` | boolean | no |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | no |  |
| `data.overridable` | boolean | no |  |
| `data.rank` | integer (int64) | no |  |

**Result**

The `result` member of the response is: `{ "data": InventoryHoldCode }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.active` | boolean | yes |  |
| `data.block_inbound_flow` | boolean | yes | Does this hold forbid PUTTING stock into the place it covers? |
| `data.block_outbound_flow` | boolean | yes | Does this hold forbid TAKING stock out of the place it covers? |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.enforce` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.overridable` | boolean | yes |  |
| `data.rank` | integer (int64) | yes | Intended as the dropdown sort order (low rank on top, migration 142). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "active": false,
      "block_inbound_flow": false,
      "block_outbound_flow": false,
      "code": "<code>",
      "enforce": false,
      "id": 1,
      "overridable": false,
      "rank": 1
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
  "method": "update_inventory_hold_code",
  "params": {
    "id": 1,
    "data": {
      "active": false,
      "block_inbound_flow": false
    }
  }
}'
```

## Module: move_command

### generate_lpn

Generate a fresh LPN container code (LPN + zero-padded sequence) for the Hard-Move New-LPN preview.

| | |
|---|---|
| Context / module | inventory / move_command |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `generate_lpn` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not required |

**Notes**

- The catalog says this method needs no idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (GenerateLpn) | yes | Owner whose next LPN to generate. |
| `data.owner_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": GenerateLpnResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.code` | string | yes |  |

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
      "code": "<code>"
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
  "method": "generate_lpn",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "owner_id": 1
    }
  }
}'
```

### move_execute

Generic Move primitive — validates and executes inventory movement (Putaway, Pick, MoveToQc, MoveToDamage, MoveToRtv, ReleaseFromQc, etc.) with full pipeline.

| | |
|---|---|
| Context / module | inventory / move_command |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `move_execute` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (MoveCommand) | yes |  |
| `data.already_printed_lpn` | string or null | no | F2(b): the LPN the operator already printed by hand for this move (the New-LPN "Print" button fires before submit so the label can be applied to the pallet). |
| `data.ctx` | object (MoveContext) | yes | Input contract for `MoveCommand`. |
| `data.ctx.dest_container_id` | integer (int64) or null | no |  |
| `data.ctx.dest_loc` | string or null | no |  |
| `data.ctx.dest_lpn` | string or null | no |  |
| `data.ctx.dest_lpn_auto` | boolean | no | When `true` and no `dest_lpn`/`dest_container_id` is given, the primitive GENERATES a fresh LPN (`ContainerService::generate_container_code`) and lands the stock in that NEW container at `dest_loc`, instead of landing loose. |
| `data.ctx.idempotency_key` | string (uuid) | no | The move's idempotency key. |
| `data.ctx.lot` | string or null | no |  |
| `data.ctx.override_grant_id` | string (uuid) or null | no | The server-minted grant authorizing this move's overrides (`supervisor_override_grant`, F6). |
| `data.ctx.owner_id` | integer (int64) or null | no |  |
| `data.ctx.pending_move_in_id` | integer (int64) or null | no | The reservation (`inventory_pending_move_in.id`) the putaway engine took when it chose this location. |
| `data.ctx.qty` | number (double) or null | no | `None` = full move; `Some(n)` = partial. |
| `data.ctx.reason_code` | string or null | no | Free-form audit hint, ≤80 chars (mirrors `transaction_log.reason_code` VARCHAR(80) constraint per migration 144). |
| `data.ctx.recursive` | boolean | yes | Subtree move (existing `MoveContainer.recursive` flag): when `true`, child containers move with the root. |
| `data.ctx.serial_numbers` | array of string or null | no | Operator-scanned unit serials for a serial-tracked PARTIAL move — the specific units to move, from the RF terminal. |
| `data.ctx.sku_code` | string or null | no |  |
| `data.ctx.source_container_id` | integer (int64) or null | no |  |
| `data.ctx.source_loc` | string or null | no |  |
| `data.ctx.source_lpn` | string or null | no |  |
| `data.ctx.source_type` | one of: putaway \| putaway_correction \| post_pick \| load_shipment \| pick_reversal \| replenishment \| let_down \| manual \| repack \| consolidation \| decant \| move_to_qc \| … (+9) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": MoveResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.ask_location_empty` | boolean | no | Count spec Appendix L (ZERO_CONFIRMATION): the move took the last stock out of `source_location`, and the moved stock's owner asks (`owner_config.confirm_empty_on_move`) — the RF asks the operator whether that location is empty (`location_confirm_empty`, sour… |
| `data.created_lpn` | string or null | no | The LPN of a container this move CREATED (New-LPN: manual or auto), so the caller can auto-print its label. |
| `data.fragments_processed` | integer (uint32) | yes |  |
| `data.holds_added` | array of integer (int64) | yes | `inventory_hold.id` rows INSERTed by §4.3 hold cascade. |
| `data.holds_released` | array of integer (int64) | yes | `inventory_hold.id` rows UPDATEd to `is_hold_on=false`. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.move_log_id` | integer (int64) or null | no | The move's first `transaction_log` row: the operation an answer names. |
| `data.source_location` | string | no | The location the stock left. |
| `data.total_qty_moved` | number (double) | yes |  |
| `data.warnings` | array of object | yes | Non-fatal warnings (e.g. |

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
      "fragments_processed": 1,
      "holds_added": [
        1
      ],
      "holds_released": [
        1
      ],
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f",
      "total_qty_moved": 1,
      "warnings": [
        {
          "hold_code": null,
          "hold_id": 1,
          "kind": "hold_on_source_lpn_acknowledged"
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
  "method": "move_execute",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "ctx": {
        "recursive": false,
        "source_type": "putaway"
      }
    }
  }
}'
```

### move_source_holds

The holds on a move's source, sorted by what can be done about them: `overridable` codes a supervisor can lift for this move, `blocking` codes nobody can (the move is refused whoever asks).

| | |
|---|---|
| Context / module | inventory / move_command |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `move_source_holds` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (MoveSourceHoldsParams) | yes | Which position to ask about: the same two facts `move_execute` resolves its source holds from. |
| `data.container_id` | integer (int64) or null | no | The container the stock is in; `None` for loose stock. |
| `data.location` | string | yes | The source location code. |

**Result**

The `result` member of the response is: `{ "data": OutboundHoldSplit }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.blocking` | array of string | yes | Codes nobody can lift: the move is refused whoever asks (`decide` says `Block`, an unknown code included). |
| `data.overridable` | array of string | yes | Codes a supervisor can lift for this move (`decide` says `Warn`). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "blocking": [
        "<blocking>"
      ],
      "overridable": [
        "<overridable>"
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "move_source_holds",
  "params": {
    "data": {
      "location": "<location>"
    }
  }
}'
```

### print_lpn_label

Print the LPN-ID label (ZPL) for a container to the operator's resolved printer.

| | |
|---|---|
| Context / module | inventory / move_command |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `print_lpn_label` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not required |

**Notes**

- The catalog says this method needs no idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (PrintLpnLabel) | yes | Input for the New-LPN block's "Print" button: the container code whose LPN-ID label to send to the operator's printer as ZPL. |
| `data.lpn` | string | yes |  |
| `data.owner_id` | integer (int64) | no | Owner context for printer resolution. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": PrintLpnLabelResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.message` | string | yes |  |
| `data.printer` | string or null | no |  |
| `data.sent` | boolean | yes |  |

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
      "message": "<message>",
      "sent": false
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
  "method": "print_lpn_label",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "lpn": "<lpn>"
    }
  }
}'
```

## Module: putaway

### count_inventory_pending_move_in

Count inventory_pending_move_in — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_pending_move_in` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].cube` | number filter | no | Filter on `cube`. |
| `filters[].weight` | number filter | no | Filter on `weight`. |
| `filters[].source` | string filter | no | Filter on `source`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].expires_at` | value (date, time or other) filter | no | Filter on `expires_at`. |
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
  "method": "count_inventory_pending_move_in",
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

### list_inventory_pending_move_in

List inventory_pending_move_in — CRUD.

| | |
|---|---|
| Context / module | inventory / putaway |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_pending_move_in` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].cube` | number filter | no | Filter on `cube`. |
| `filters[].weight` | number filter | no | Filter on `weight`. |
| `filters[].source` | string filter | no | Filter on `source`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].expires_at` | value (date, time or other) filter | no | Filter on `expires_at`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryPendingMoveIn] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].container_id` | integer (int64) | yes | The pallet whose space this is. |
| `data[].cube` | number (double) | yes | Cube and weight are 0 by default and 0 is a legitimate footprint, not a placeholder: `sku.cube` is NOT NULL DEFAULT 0, so an item whose dimensions were never captured genuinely promises nothing. |
| `data[].expires_at` | string | yes | TTL resolution order: `owner_config.putaway_reservation_ttl_min` → `system_settings.PUTAWAY_RESERVATION_TTL_MIN` → its `default_value`. |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes | `location.code` — the location being held. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].share_of` | integer (int64) or null | no | The number of the main record, when this row keeps a neighbouring cell for an oversize item. |
| `data[].source` | one of: Putaway \| Replenishment \| Move | yes |  |
| `data[].status` | one of: Active \| Consumed \| Cancelled \| Expired | yes |  |
| `data[].weight` | number (double) | yes |  |

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
  "method": "list_inventory_pending_move_in",
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

### putaway_explain_location

Ask the putaway engine which location it would choose for a received LPN, without reserving anything.

| | |
|---|---|
| Context / module | inventory / putaway |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `putaway_explain_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ExplainLocation) | yes | Ask the engine the same question `SuggestLocation` asks, without `idempotency_key` — a query carries none (`.claude/rules/api-versioning-and-idempotency.md`). |
| `data.container_id` | integer (int64) | yes | Same field, same meaning as `SuggestLocation::container_id`. |
| `data.exclude_locations` | array of string | no |  |
| `data.trace_detail` | one of: Summary \| Full | no | How much of the scan to keep. |

**Result**

The `result` member of the response is: `{ "data": ExplainLocationResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.location` | string or null | no |  |
| `data.reason` | string or null | no | Set exactly when `location` is `None`. |
| `data.trace` | any | yes | `PutawayTrace`, as JSON — same shape `SuggestLocationResult::trace` carries. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "trace": {}
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
  "method": "putaway_explain_location",
  "params": {
    "data": {
      "container_id": 1
    }
  }
}'
```

### putaway_release_reservation

Release a pending putaway reservation, freeing the location before its TTL expires.

| | |
|---|---|
| Context / module | inventory / putaway |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_release_reservation` |
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
| `data` | object (ReleaseReservationParams) | yes |  |
| `data.pending_move_in_id` | integer (int64) | yes | `inventory_pending_move_in.id` — the row the supervisor selected on the Pending Move-In screen. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReleaseReservationResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.released` | boolean | yes | `false` when the reservation was already consumed, cancelled or expired. |

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
      "released": false
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
  "method": "putaway_release_reservation",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "pending_move_in_id": 1
    }
  }
}'
```

### putaway_suggest_location

Suggest and reserve the location a received LPN should be put away into.

| | |
|---|---|
| Context / module | inventory / putaway |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `putaway_suggest_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (SuggestLocation) | yes | Ask the engine for a location for one received LPN, and reserve it. |
| `data.container_id` | integer (int64) | yes | The pallet to put away. |
| `data.exclude_locations` | array of string | no | Locations the operator has already refused. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.trace_detail` | one of: Summary \| Full | no | `Full` records every candidate and every predicate verdict. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": SuggestLocationResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.expires_at` | string or null | no | RFC3339. When it lapses the reservation stops holding space; the operator has to ask again. **A replayed value may already be in the past.** The idempotency TTL is days and a reservation's is minutes, so a late retry on the same key replays a `pending_move_in… |
| `data.location` | string or null | no |  |
| `data.pending_move_in_id` | integer (int64) or null | no | Hand this to `move_execute` as `pending_move_in_id` to run the suggestion as a DIRECTED move: the executor then treats a soft rule broken on this location as an acknowledgeable deviation rather than a refusal, and retires the reservation when the pallet lands. |
| `data.reason` | string or null | no | Set exactly when `location` is `None`. |
| `data.trace` | any | yes | `PutawayTrace`, as JSON. |

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
      "trace": {}
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
  "method": "putaway_suggest_location",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "container_id": 1
    }
  }
}'
```

## Module: hold

### create_inventory_hold

Create an inventory hold scoped to a lot, location, or container (LPN).

| | |
|---|---|
| Context / module | inventory / hold |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_hold` |
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
| `data` | object (HoldRequestData) | yes | The business fields needed to place a hold. |
| `data.auto_release_date` | string (date-time) or null | no | Optional release instant. |
| `data.code` | string | yes | Hold reason code (`inventory_hold.code`), e.g. |
| `data.comments` | string or null | no | Optional free-text note. |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no | Hold scope: set EXACTLY ONE of lot / loc / lpn — that field's value is the thing being frozen. |
| `data.lpn` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CreateHoldResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.hold_id` | integer (int64) | yes |  |

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
      "hold_id": 1
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
  "method": "create_inventory_hold",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "code": "<code>"
    }
  }
}'
```

### create_inventory_hold_row

Create an inventory hold from the Holds form (CRUD shape; system fields filled by HoldService).

| | |
|---|---|
| Context / module | inventory / hold |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_hold_row` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (HoldRequestData) | yes | The business fields needed to place a hold. |
| `data.auto_release_date` | string (date-time) or null | no | Optional release instant. |
| `data.code` | string | yes | Hold reason code (`inventory_hold.code`), e.g. |
| `data.comments` | string or null | no | Optional free-text note. |
| `data.loc` | string or null | no |  |
| `data.lot` | string or null | no | Hold scope: set EXACTLY ONE of lot / loc / lpn — that field's value is the thing being frozen. |
| `data.lpn` | string or null | no |  |

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
  "method": "create_inventory_hold_row",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### list_active_holds_by_lpn

List active inventory holds attached to an LPN; optional `code` filter narrows by hold-type.

| | |
|---|---|
| Context / module | inventory / hold |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_active_holds_by_lpn` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListActiveHoldsByLpnParams) | yes |  |
| `data.code` | string or null | no | Optional filter by hold-type identifier (`inventory_hold.code`, e.g. |
| `data.lpn` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryHoldRowDto] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].comments` | string or null | no |  |
| `data[].date_on` | string | yes | ISO-8601 / RFC-3339 string (serde-default for `time::OffsetDateTime`). |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_hold_on` | boolean | yes |  |
| `data[].loc` | string or null | no |  |
| `data[].lot` | string or null | no |  |
| `data[].lpn` | string or null | no |  |

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
  "method": "list_active_holds_by_lpn",
  "params": {
    "data": {
      "lpn": "<lpn>"
    }
  }
}'
```

### release_inventory_hold

Release an inventory hold by id.

| | |
|---|---|
| Context / module | inventory / hold |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `release_inventory_hold` |
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
| `data` | object (ReleaseHoldCommand) | yes |  |
| `data.hold_id` | integer (int64) | yes |  |
| `data.reason` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReleaseHoldResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.released` | boolean | yes |  |

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
      "released": false
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
  "method": "release_inventory_hold",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "hold_id": 1
    }
  }
}'
```

## Module: serial_commands

### cancel_episode

Operator-explicit episode cancellation.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `cancel_episode` |
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
| `data` | object (CancelEpisode) | yes |  |
| `data.episode_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason` | string or null | no | Free-text reason persisted to `serial_capture_episode.closed_reason`. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CancelEpisodeResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.captured_qty_at_cancel` | integer (int32) | yes | `captured_qty` at the moment of cancel — UI surfaces "discarded N scanned serials" so the operator sees what was lost. |
| `data.episode_id` | integer (int64) | yes |  |
| `data.status` | one of: Open \| InProgress \| AwaitingConfirmation \| Committed \| Cancelled \| Abandoned | yes |  |

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
      "captured_qty_at_cancel": 1,
      "episode_id": 1,
      "status": "Open"
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
  "method": "cancel_episode",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "episode_id": 1
    }
  }
}'
```

### capture_serial

Capture one serial during a receipt-line collection loop.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `capture_serial` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (CaptureSerial) | yes |  |
| `data.business_operation` | one of: Receive \| Putaway \| Move \| Pick \| Pack \| Ship \| Return \| Adjust \| Inventory | no | Polymorphic discriminator (spec §7.4 / §16.8). |
| `data.business_ref_id` | integer (int64) | yes | Polymorphic reference to the business document the episode is anchored to: * Receive → `receipt_detail.id` * Move → `move.id` * Pick → `pick_task.id` (line via `business_ref_line`) * Pack → `shipping_carton.id` * Ship → `shipment.id` * Return → `receipt.id` (… |
| `data.business_ref_line` | integer (int64) or null | no | Optional line-level discriminator within the document (e.g. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.serial_number` | string | yes | The serial barcode the operator just scanned. |
| `data.to_location` | string or null | no | Receive-context location. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CaptureSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.already_captured` | boolean | yes | `true` when `serial_number` was already in this episode — the insert was a no-op and the counter did NOT increment. |
| `data.episode_id` | integer (int64) | yes |  |
| `data.episode_status` | one of: Open \| InProgress \| AwaitingConfirmation \| Committed \| Cancelled \| Abandoned | yes |  |
| `data.serials_collected_qty` | integer (int32) | yes | How many serials have been captured in this episode so far. |
| `data.serials_to_collect_qty` | integer (int32) | yes | How many serials this episode aims to collect — derived from the business document (receipt_detail.qty_expected for Receive). |

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
      "already_captured": false,
      "episode_id": 1,
      "episode_status": "Open",
      "serials_collected_qty": 1,
      "serials_to_collect_qty": 1
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
  "method": "capture_serial",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "business_ref_id": 1,
      "serial_number": "<serial_number>"
    }
  }
}'
```

### force_close_episode

Supervisor force-close of an episode that's stuck or abandoned.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `force_close_episode` |
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
| `data` | object (ForceCloseEpisode) | yes |  |
| `data.episode_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason` | string | yes | Free-text reason, persisted to `serial_capture_episode.closed_reason` as `"supervisor_force_close:{reason}"`. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ForceCloseEpisodeResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.captured_qty_at_close` | integer (int32) | yes | `captured_qty` at the moment of force-close. |
| `data.episode_id` | integer (int64) | yes |  |
| `data.original_operator_id` | integer (int64) | yes | Original operator who owned the episode. |
| `data.status` | one of: Open \| InProgress \| AwaitingConfirmation \| Committed \| Cancelled \| Abandoned | yes |  |

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
      "captured_qty_at_close": 1,
      "episode_id": 1,
      "original_operator_id": 1,
      "status": "Open"
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
  "method": "force_close_episode",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "episode_id": 1,
      "reason": "<reason>"
    }
  }
}'
```

### list_force_close_candidates

List every unresolved Receive or Pick serial-capture episode in the warehouse — Open / InProgress / AwaitingConfirmation / Abandoned.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_force_close_candidates` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": [EpisodeForceCloseRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].business_operation` | string | yes | `Receive` or `Pick`. |
| `data[].captured_qty` | integer (int32) | yes |  |
| `data[].document_number` | string | yes | The document the episode works on: the receipt number for Receive, the shipment order number for Pick. |
| `data[].episode_id` | integer (int64) | yes |  |
| `data[].expected_qty` | integer (int32) | yes |  |
| `data[].location` | string or null | no | Where the scanned units are. |
| `data[].opened_at` | string | yes |  |
| `data[].operator_id` | integer (int64) | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_company` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_detail_id` | integer (int64) or null | no | Receive only. |
| `data[].receipt_id` | integer (int64) or null | no | Receive only. |
| `data[].receipt_number` | string or null | no | Receive only. |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].task_id` | integer (int64) or null | no | Pick only: the task the episode belongs to. |

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
  "method": "list_force_close_candidates",
  "params": {}
}'
```

### list_open_episodes_for_operator

List the calling operator's own still-open serial-capture episodes (Open / InProgress / AwaitingConfirmation).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_open_episodes_for_operator` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

This method takes no parameters. Send `"params": {}` or leave `params` out. (Checked in the handler: it receives only the request context.)


**Result**

The `result` member of the response is: `{ "data": [OperatorOpenEpisodeRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].captured_qty` | integer (int32) | yes |  |
| `data[].episode_id` | integer (int64) | yes |  |
| `data[].expected_qty` | integer (int32) | yes |  |
| `data[].opened_at` | string | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_company` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_detail_id` | integer (int64) | yes |  |
| `data[].receipt_id` | integer (int64) | yes |  |
| `data[].receipt_number` | string | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |

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
  "method": "list_open_episodes_for_operator",
  "params": {}
}'
```

### list_open_episodes_for_receipt

List Open / InProgress / AwaitingConfirmation serial-capture episodes attached to any detail of a receipt.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_open_episodes_for_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListOpenEpisodesForReceiptInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [OpenEpisodeRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].captured_qty` | integer (int32) | yes |  |
| `data[].episode_id` | integer (int64) | yes |  |
| `data[].expected_qty` | integer (int32) | yes |  |
| `data[].location` | string or null | no | Where the capture's goods are — the scan page sends it back as `to_location`. |
| `data[].receipt_detail_id` | integer (int64) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |

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
  "method": "list_open_episodes_for_receipt",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### remove_captured_serial

Drop one wrongly-captured serial from an open episode.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `remove_captured_serial` |
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
| `data` | object (RemoveCapturedSerial) | yes |  |
| `data.episode_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.serial_number` | string | yes | Serial to drop. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": RemoveCapturedSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.episode_id` | integer (int64) | yes |  |
| `data.serials_collected_qty` | integer (int32) | yes |  |

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
      "episode_id": 1,
      "serials_collected_qty": 1
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
  "method": "remove_captured_serial",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "episode_id": 1,
      "serial_number": "<serial_number>"
    }
  }
}'
```

### serial_dispose

Dispose a damaged or returned serial (terminal).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_dispose` |
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
| `data` | object (DisposeSerial) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason` | string | yes |  |
| `data.serial_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DisposeSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_dispose",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "reason": "<reason>",
      "serial_id": 1
    }
  }
}'
```

### serial_move

Move an Active or Held serial to a new location/container.

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_move` |
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
| `data` | object (MoveSerial) | yes | The bare serial move. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.new_container_id` | integer (int64) or null | no |  |
| `data.new_location` | string | yes |  |
| `data.serial_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": MoveSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_move",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "new_location": "<new_location>",
      "serial_id": 1
    }
  }
}'
```

### serial_pick

Pick a reserved serial onto a pick task (Reserved → Picked).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_pick` |
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
| `data` | object (PickSerial) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.pick_task_id` | integer (int64) | yes |  |
| `data.picked_to_container` | integer (int64) or null | no |  |
| `data.serial_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": PickSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_pick",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "pick_task_id": 1,
      "serial_id": 1
    }
  }
}'
```

### serial_reserve

Reserve a serial for an allocation (Active → Reserved).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_reserve` |
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
| `data` | object (ReserveSerial) | yes |  |
| `data.allocation_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.serial_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReserveSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_reserve",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "allocation_id": 1,
      "serial_id": 1
    }
  }
}'
```

### serial_return

Return a previously shipped serial via RMA receipt (Shipped → Returned).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_return` |
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
| `data` | object (ReturnSerial) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.new_container_id` | integer (int64) or null | no |  |
| `data.new_location` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.return_via` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReturnSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_return",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "new_location": "<new_location>",
      "owner_id": 1,
      "return_via": 1,
      "serial_number": "<serial_number>"
    }
  }
}'
```

### serial_ship

Ship a picked serial to a customer (Picked → Shipped, clears location).

| | |
|---|---|
| Context / module | inventory / serial_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `serial_ship` |
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
| `data` | object (ShipSerial) | yes |  |
| `data.customer_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.serial_id` | integer (int64) | yes |  |
| `data.shipment_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ShipSerialResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.serial_id` | integer (int64) | yes |  |
| `data.serial_number` | string | yes |  |

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
      "serial_id": 1,
      "serial_number": "<serial_number>"
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
  "method": "serial_ship",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "customer_id": 1,
      "serial_id": 1,
      "shipment_id": 1
    }
  }
}'
```

## Module: transaction_log

### count_transaction_log

Count transaction_log — CRUD.

| | |
|---|---|
| Context / module | inventory / transaction_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_transaction_log` |
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
| `filters[].transaction_type` | string filter | no | Filter on `transaction_type`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].from_loc` | string filter | no | Filter on `from_loc`. |
| `filters[].to_loc` | string filter | no | Filter on `to_loc`. |
| `filters[].from_lpn` | string filter | no | Filter on `from_lpn`. |
| `filters[].to_lpn` | string filter | no | Filter on `to_lpn`. |
| `filters[].source_code` | string filter | no | Filter on `source_code`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
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
  "method": "count_transaction_log",
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

### get_transaction_log

Get a transaction_log by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / transaction_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_transaction_log` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": TransactionLog }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.best_by_date` | string or null | no |  |
| `data.code` | string | yes |  |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.from_loc` | string | yes |  |
| `data.from_lpn` | string | yes |  |
| `data.hold_code` | one of: None \| Ok \| PIHold \| QcRequired \| NewItem \| NotHold \| QcQuarantine \| Customs \| CustomerReturn \| Expired \| Damaged \| Rtv \| … (+4) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) or null | no | Correlates rows from the same MoveCommand (one UUID, multiple fragments). |
| `data.lot` | string or null | no |  |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.qty_after` | number (double) or null | no |  |
| `data.qty_before` | number (double) or null | no | Balance quantity before / after this row (wms-app 052) — written by inventory adjustments; NULL for other operations. |
| `data.reason_code` | string or null | no | Free-form audit hint (≤80 chars). |
| `data.sku_code` | string | yes |  |
| `data.source_code` | string or null | no |  |
| `data.source_type` | string or null | no | Snake-case discriminator (`MoveSourceType::as_code()`) — populated by Move-primitive writes since migration 144. |
| `data.status` | string | yes |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string | yes |  |
| `data.transaction_type` | one of: Deposit \| Pick \| Ship \| Withdraw \| Move \| Transfer \| Adjust \| None | yes |  |
| `data.uom` | string or null | no |  |

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
  "method": "get_transaction_log",
  "params": {
    "id": 1
  }
}'
```

### list_transaction_log

List transaction_log — CRUD.

| | |
|---|---|
| Context / module | inventory / transaction_log |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_transaction_log` |
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
| `filters[].transaction_type` | string filter | no | Filter on `transaction_type`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].from_loc` | string filter | no | Filter on `from_loc`. |
| `filters[].to_loc` | string filter | no | Filter on `to_loc`. |
| `filters[].from_lpn` | string filter | no | Filter on `from_lpn`. |
| `filters[].to_lpn` | string filter | no | Filter on `to_lpn`. |
| `filters[].source_code` | string filter | no | Filter on `source_code`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].qty` | number filter | no | Filter on `qty`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [TransactionLog] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].code` | string | yes |  |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].effective_date` | string | yes |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].from_loc` | string | yes |  |
| `data[].from_lpn` | string | yes |  |
| `data[].hold_code` | one of: None \| Ok \| PIHold \| QcRequired \| NewItem \| NotHold \| QcQuarantine \| Customs \| CustomerReturn \| Expired \| Damaged \| Rtv \| … (+4) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].idempotency_key` | string (uuid) or null | no | Correlates rows from the same MoveCommand (one UUID, multiple fragments). |
| `data[].lot` | string or null | no |  |
| `data[].manufactured_date` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) or null | no |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_after` | number (double) or null | no |  |
| `data[].qty_before` | number (double) or null | no | Balance quantity before / after this row (wms-app 052) — written by inventory adjustments; NULL for other operations. |
| `data[].reason_code` | string or null | no | Free-form audit hint (≤80 chars). |
| `data[].sku_code` | string | yes |  |
| `data[].source_code` | string or null | no |  |
| `data[].source_type` | string or null | no | Snake-case discriminator (`MoveSourceType::as_code()`) — populated by Move-primitive writes since migration 144. |
| `data[].status` | string | yes |  |
| `data[].to_loc` | string | yes |  |
| `data[].to_lpn` | string | yes |  |
| `data[].transaction_type` | one of: Deposit \| Pick \| Ship \| Withdraw \| Move \| Transfer \| Adjust \| None | yes |  |
| `data[].uom` | string or null | no |  |

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
  "method": "list_transaction_log",
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

## Module: sku_pick_location

### count_sku_pick_location

Count the pick locations of SKUs.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_id` | integer filter | no | Filter on `sku_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].pick_type` | string filter | no | Filter on `pick_type`. |
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
  "method": "count_sku_pick_location",
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

### create_sku_pick_location

Assign a pick location to a SKU: a Pick, SpeedPick or Case location, in a unit of the SKU's pack.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SkuPickLocationForCreate) | yes |  |
| `data.location` | string | yes |  |
| `data.max_qty` | number (double) | yes |  |
| `data.min_qty` | number (double) | yes |  |
| `data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": SkuPickLocationView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.max_qty` | number (double) | yes |  |
| `data.min_qty` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_sku_pick_location",
  "params": {
    "data": {
      "location": "<location>",
      "max_qty": 1,
      "min_qty": 1,
      "pick_type": "Each",
      "sku_id": 1,
      "uom": "<uom>"
    }
  }
}'
```

### delete_sku_pick_location

Unassign a pick location from a SKU; refused while the location holds the SKU.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuPickLocation }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.max_qty` | number (double) | yes |  |
| `data.min_qty` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
      "location": "<location>",
      "max_qty": 1,
      "min_qty": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "pick_type": "Each",
      "sku_id": 1,
      "uom": "<uom>",
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
  "method": "delete_sku_pick_location",
  "params": {
    "id": 1
  }
}'
```

### get_sku_pick_location

Get one pick location of a SKU.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuPickLocationView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.max_qty` | number (double) | yes |  |
| `data.min_qty` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "get_sku_pick_location",
  "params": {
    "id": 1
  }
}'
```

### list_sku_pick_location

List the pick locations of SKUs, with the SKU's owner and the location's zone and route.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].sku_id` | integer filter | no | Filter on `sku_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].pick_type` | string filter | no | Filter on `pick_type`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SkuPickLocationView] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].max_qty` | number (double) | yes |  |
| `data[].min_qty` | number (double) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data[].putawayzone` | string or null | no |  |
| `data[].route_sequence` | string or null | no |  |
| `data[].sku_code` | string | yes |  |
| `data[].sku_id` | integer (int64) | yes |  |
| `data[].uom` | string | yes |  |
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
  "method": "list_sku_pick_location",
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

### update_sku_pick_location

Edit a pick location of a SKU on the version read.

| | |
|---|---|
| Context / module | inventory / sku_pick_location |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_sku_pick_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `sku_pick_location`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (SkuPickLocationForUpdate) | yes | The editable fields; `sku_id` is the row's identity and never changes. |
| `data.data.location` | string or null | no |  |
| `data.data.max_qty` | number (double) or null | no |  |
| `data.data.min_qty` | number (double) or null | no |  |
| `data.data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet or null | no |  |
| `data.data.uom` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": SkuPickLocationView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.max_qty` | number (double) | yes |  |
| `data.min_qty` | number (double) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pick_type` | one of: Each \| InnerPack \| Case \| Pallet | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.route_sequence` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "update_sku_pick_location",
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

## Module: replenishment

### replenishment_cancel

Call an open replenishment off on the version read; its task leaves the pool.

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `replenishment_cancel` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `replenishment`: send `expected_version` for row `replenishment_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (CancelReplenishment) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.replenishment_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Replenishment }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.from_location` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.qty_moved` | number (double) | yes |  |
| `data.short_reason` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Open \| Done \| Shorted \| Cancelled | yes |  |
| `data.to_location` | string | yes |  |
| `data.uom` | string | yes |  |
| `data.uom_qty` | number (double) | yes |  |
| `data.urgency` | integer (int16) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "replenishment_cancel",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "replenishment_id": 1
    }
  }
}'
```

### replenishment_confirm

The operator brought a replenishment: the stock moves into the pick location and the task closes (short with a reason).

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `replenishment_confirm` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (ConfirmReplenishment) | yes |  |
| `data.from_location` | string | yes | The location scanned at the source. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.replenishment_id` | integer (int64) | yes |  |
| `data.short_reason` | string or null | no | Why less than planned was brought; required then. |
| `data.to_location` | string | yes | The pick location scanned on arrival. |
| `data.uom_qty` | number (double) | yes | Units of the replenishment's unit brought. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Replenishment }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.from_location` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.qty_moved` | number (double) | yes |  |
| `data.short_reason` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Open \| Done \| Shorted \| Cancelled | yes |  |
| `data.to_location` | string | yes |  |
| `data.uom` | string | yes |  |
| `data.uom_qty` | number (double) | yes |  |
| `data.urgency` | integer (int16) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "replenishment_confirm",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "from_location": "<from_location>",
      "replenishment_id": 1,
      "to_location": "<to_location>",
      "uom_qty": 1
    }
  }
}'
```

### replenishment_count

Count replenishments.

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `replenishment_count` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].to_location` | string filter | no | Filter on `to_location`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
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
  "method": "replenishment_count",
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

### replenishment_get

Get one replenishment.

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `replenishment_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": Replenishment }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.from_location` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.qty_moved` | number (double) | yes |  |
| `data.short_reason` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Open \| Done \| Shorted \| Cancelled | yes |  |
| `data.to_location` | string | yes |  |
| `data.uom` | string | yes |  |
| `data.uom_qty` | number (double) | yes |  |
| `data.urgency` | integer (int16) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "replenishment_get",
  "params": {
    "id": 1
  }
}'
```

### replenishment_list

List replenishments, filtered like any list (by status, pick location, SKU).

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `replenishment_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].to_location` | string filter | no | Filter on `to_location`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Replenishment] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].from_location` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].qty_moved` | number (double) | yes |  |
| `data[].short_reason` | string or null | no |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | one of: Open \| Done \| Shorted \| Cancelled | yes |  |
| `data[].to_location` | string | yes |  |
| `data[].uom` | string | yes |  |
| `data[].uom_qty` | number (double) | yes |  |
| `data[].urgency` | integer (int16) | yes |  |
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
  "method": "replenishment_list",
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

### replenishment_plan

Replenish now: every pick location at or below its minimum gets what it lacks from storage, as Replenish tasks.

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `replenishment_plan` |
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
| `data` | object (PlanReplenishment) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": PlanOutcome }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.created` | array of integer (int64) | yes | The replenishments created, in the order they were planned. |
| `data.without_source` | array of string | yes | Pick locations due but with nothing to take anywhere. |

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
      "created": [
        1
      ],
      "without_source": [
        "<without_source>"
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
  "method": "replenishment_plan",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {}
  }
}'
```

### replenishment_take_next

Give the operator their next replenishment: the one in hand first, else one from the pool of their areas.

| | |
|---|---|
| Context / module | inventory / replenishment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `replenishment_take_next` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (TakeNextReplenishment) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.work_area_code` | string or null | no | The work area scanned; blank or absent — the whole warehouse. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": Replenishment }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.from_location` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.qty_moved` | number (double) | yes |  |
| `data.short_reason` | string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Open \| Done \| Shorted \| Cancelled | yes |  |
| `data.to_location` | string | yes |  |
| `data.uom` | string | yes |  |
| `data.uom_qty` | number (double) | yes |  |
| `data.urgency` | integer (int16) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "replenishment_take_next",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {}
  }
}'
```

## Module: sku_serial_config

### count_sku_serial_config

Count sku_serial_config — CRUD.

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_sku_serial_config` |
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
| `filters[].continuous_serial_tracking` | boolean filter | no | Filter on `continuous_serial_tracking`. |
| `filters[].profile_mode` | string filter | no | Filter on `profile_mode`. |
| `filters[].allow_deferred_capture` | boolean filter | no | Filter on `allow_deferred_capture`. |
| `filters[].pick_episode_reassignment_mode` | string filter | no | Filter on `pick_episode_reassignment_mode`. |
| `filters[].serial_parse_mode` | string filter | no | Filter on `serial_parse_mode`. |
| `filters[].serial_length` | integer filter | no | Filter on `serial_length`. |
| `filters[].serial_format` | string filter | no | Filter on `serial_format`. |
| `filters[].allow_asn_pre_advised` | boolean filter | no | Filter on `allow_asn_pre_advised`. |
| `filters[].require_unique_global` | boolean filter | no | Filter on `require_unique_global`. |
| `filters[].industry_profile` | string filter | no | Filter on `industry_profile`. |
| `filters[].anomaly_max_per_lpn` | integer filter | no | Filter on `anomaly_max_per_lpn`. |
| `filters[].anomaly_vendor_surge_factor` | number filter | no | Filter on `anomaly_vendor_surge_factor`. |
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
  "method": "count_sku_serial_config",
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

### create_sku_serial_config

Create the optional serial-tracking configuration owned by one SKU.

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_sku_serial_config` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SkuSerialConfigForCreate) | yes |  |
| `data.allow_asn_pre_advised` | boolean or null | no |  |
| `data.allow_deferred_capture` | boolean or null | no |  |
| `data.allow_receive_capture` | boolean or null | no |  |
| `data.anomaly_block_severity` | boolean or null | no |  |
| `data.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.check_digit_algorithm` | string or null | no |  |
| `data.continuous_serial_tracking` | boolean or null | no |  |
| `data.industry_profile` | string or null | no |  |
| `data.multi_serial_delimiter` | string or null | no |  |
| `data.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.pick_episode_reassignment_mode` | string or null | no |  |
| `data.profile_mode` | string or null | no |  |
| `data.require_unique_global` | boolean or null | no |  |
| `data.serial_auto_increment` | boolean or null | no |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_length` | integer (int32) or null | no |  |
| `data.serial_mask_format` | string or null | no |  |
| `data.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_parse_mode` | one of: None \| Fixed \| Bounded or null | no |  |
| `data.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_scope` | string or null | no |  |
| `data.serials_per_barcode` | integer (int32) or null | no |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.warranty_period_days` | integer (int32) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuSerialConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_asn_pre_advised` | boolean | yes |  |
| `data.allow_deferred_capture` | boolean | yes | Explicit permission to receive inventory before serial capture is complete. |
| `data.allow_receive_capture` | boolean | yes |  |
| `data.anomaly_block_severity` | boolean or null | no |  |
| `data.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.check_digit_algorithm` | string or null | no |  |
| `data.continuous_serial_tracking` | boolean | yes | Master flag. |
| `data.id` | integer (int64) | yes |  |
| `data.industry_profile` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.multi_serial_delimiter` | string or null | no |  |
| `data.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.pick_episode_reassignment_mode` | string | yes | Behaviour when a different operator resumes a Pick with an unfinished serial episode. |
| `data.profile_mode` | string | yes | Movement/capture coupling policy (ADR-090). |
| `data.require_unique_global` | boolean | yes |  |
| `data.serial_auto_increment` | boolean | yes |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_length` | integer (int32) or null | no |  |
| `data.serial_mask_format` | string or null | no |  |
| `data.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_parse_mode` | one of: None \| Fixed \| Bounded | yes | Per Decisions Log D-32. |
| `data.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_scope` | string | yes | Migration 153 — serial granularity. |
| `data.serials_per_barcode` | integer (int32) | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.warranty_period_days` | integer (int32) or null | no |  |

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
  "method": "create_sku_serial_config",
  "params": {
    "data": {
      "sku_id": 1
    }
  }
}'
```

### get_sku_serial_config

Get a sku_serial_config by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku_serial_config` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": SkuSerialConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_asn_pre_advised` | boolean | yes |  |
| `data.allow_deferred_capture` | boolean | yes | Explicit permission to receive inventory before serial capture is complete. |
| `data.allow_receive_capture` | boolean | yes |  |
| `data.anomaly_block_severity` | boolean or null | no |  |
| `data.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.check_digit_algorithm` | string or null | no |  |
| `data.continuous_serial_tracking` | boolean | yes | Master flag. |
| `data.id` | integer (int64) | yes |  |
| `data.industry_profile` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.multi_serial_delimiter` | string or null | no |  |
| `data.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.pick_episode_reassignment_mode` | string | yes | Behaviour when a different operator resumes a Pick with an unfinished serial episode. |
| `data.profile_mode` | string | yes | Movement/capture coupling policy (ADR-090). |
| `data.require_unique_global` | boolean | yes |  |
| `data.serial_auto_increment` | boolean | yes |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_length` | integer (int32) or null | no |  |
| `data.serial_mask_format` | string or null | no |  |
| `data.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_parse_mode` | one of: None \| Fixed \| Bounded | yes | Per Decisions Log D-32. |
| `data.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_scope` | string | yes | Migration 153 — serial granularity. |
| `data.serials_per_barcode` | integer (int32) | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.warranty_period_days` | integer (int32) or null | no |  |

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
  "method": "get_sku_serial_config",
  "params": {
    "id": 1
  }
}'
```

### get_sku_serial_config_by_sku

Get SKU serial config by SKU ID (1:1 relationship).

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_sku_serial_config_by_sku` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": object (SkuSerialConfig) or null }`

Type of `data`: object (SkuSerialConfig) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "allow_asn_pre_advised": false,
      "allow_deferred_capture": false,
      "allow_receive_capture": false,
      "continuous_serial_tracking": false,
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "pick_episode_reassignment_mode": "<pick_episode_reassignment_mode>",
      "profile_mode": "<profile_mode>",
      "require_unique_global": false,
      "serial_auto_increment": false,
      "serial_parse_mode": "None",
      "serial_scope": "<serial_scope>",
      "serials_per_barcode": 1,
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
  "method": "get_sku_serial_config_by_sku",
  "params": {
    "id": 1
  }
}'
```

### list_sku_serial_config

List sku_serial_config — CRUD.

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_sku_serial_config` |
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
| `filters[].continuous_serial_tracking` | boolean filter | no | Filter on `continuous_serial_tracking`. |
| `filters[].profile_mode` | string filter | no | Filter on `profile_mode`. |
| `filters[].allow_deferred_capture` | boolean filter | no | Filter on `allow_deferred_capture`. |
| `filters[].pick_episode_reassignment_mode` | string filter | no | Filter on `pick_episode_reassignment_mode`. |
| `filters[].serial_parse_mode` | string filter | no | Filter on `serial_parse_mode`. |
| `filters[].serial_length` | integer filter | no | Filter on `serial_length`. |
| `filters[].serial_format` | string filter | no | Filter on `serial_format`. |
| `filters[].allow_asn_pre_advised` | boolean filter | no | Filter on `allow_asn_pre_advised`. |
| `filters[].require_unique_global` | boolean filter | no | Filter on `require_unique_global`. |
| `filters[].industry_profile` | string filter | no | Filter on `industry_profile`. |
| `filters[].anomaly_max_per_lpn` | integer filter | no | Filter on `anomaly_max_per_lpn`. |
| `filters[].anomaly_vendor_surge_factor` | number filter | no | Filter on `anomaly_vendor_surge_factor`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [SkuSerialConfig] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].allow_asn_pre_advised` | boolean | yes |  |
| `data[].allow_deferred_capture` | boolean | yes | Explicit permission to receive inventory before serial capture is complete. |
| `data[].allow_receive_capture` | boolean | yes |  |
| `data[].anomaly_block_severity` | boolean or null | no |  |
| `data[].anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data[].anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data[].anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data[].check_digit_algorithm` | string or null | no |  |
| `data[].continuous_serial_tracking` | boolean | yes | Master flag. |
| `data[].id` | integer (int64) | yes |  |
| `data[].industry_profile` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].multi_serial_delimiter` | string or null | no |  |
| `data[].multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data[].pick_episode_reassignment_mode` | string | yes | Behaviour when a different operator resumes a Pick with an unfinished serial episode. |
| `data[].profile_mode` | string | yes | Movement/capture coupling policy (ADR-090). |
| `data[].require_unique_global` | boolean | yes |  |
| `data[].serial_auto_increment` | boolean | yes |  |
| `data[].serial_format` | string or null | no |  |
| `data[].serial_increment_length` | integer (int32) or null | no |  |
| `data[].serial_increment_source_position` | integer (int32) or null | no |  |
| `data[].serial_length` | integer (int32) or null | no |  |
| `data[].serial_mask_format` | string or null | no |  |
| `data[].serial_parse_frequency` | integer (int32) or null | no |  |
| `data[].serial_parse_mode` | one of: None \| Fixed \| Bounded | yes | Per Decisions Log D-32. |
| `data[].serial_parse_start_after` | integer (int32) or null | no |  |
| `data[].serial_parse_start_position` | integer (int32) or null | no |  |
| `data[].serial_scope` | string | yes | Migration 153 — serial granularity. |
| `data[].serials_per_barcode` | integer (int32) | yes |  |
| `data[].sku_id` | integer (int64) | yes |  |
| `data[].warranty_period_days` | integer (int32) or null | no |  |

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
  "method": "list_sku_serial_config",
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

### update_sku_serial_config

Update serial-tracking settings without changing their SKU identity.

| | |
|---|---|
| Context / module | inventory / sku_serial_config |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_sku_serial_config` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (SkuSerialConfigUpdateApi) | yes |  |
| `data.allow_asn_pre_advised` | boolean | no |  |
| `data.allow_deferred_capture` | boolean | no |  |
| `data.allow_receive_capture` | boolean | no |  |
| `data.anomaly_block_severity` | boolean or null | no |  |
| `data.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.check_digit_algorithm` | string or null | no |  |
| `data.continuous_serial_tracking` | boolean | no |  |
| `data.industry_profile` | string or null | no |  |
| `data.multi_serial_delimiter` | string or null | no |  |
| `data.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.pick_episode_reassignment_mode` | one of: Block \| CancelAndRestart \| Handover | no |  |
| `data.profile_mode` | one of: Strict \| Flexible \| NotTracked | no | Operational policy for stock whose serial capture is not complete yet. |
| `data.require_unique_global` | boolean | no |  |
| `data.serial_auto_increment` | boolean | no |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_length` | integer (int32) or null | no |  |
| `data.serial_mask_format` | string or null | no |  |
| `data.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_parse_mode` | one of: None \| Fixed \| Bounded | no | Per Decisions Log D-32. |
| `data.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_scope` | one of: PerUnit \| PerCase \| PerPallet \| PerInnerPack | no | Supported serial granularity at the public API boundary. |
| `data.serials_per_barcode` | integer (int32) | no |  |
| `data.warranty_period_days` | integer (int32) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": SkuSerialConfig }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.allow_asn_pre_advised` | boolean | yes |  |
| `data.allow_deferred_capture` | boolean | yes | Explicit permission to receive inventory before serial capture is complete. |
| `data.allow_receive_capture` | boolean | yes |  |
| `data.anomaly_block_severity` | boolean or null | no |  |
| `data.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| `data.check_digit_algorithm` | string or null | no |  |
| `data.continuous_serial_tracking` | boolean | yes | Master flag. |
| `data.id` | integer (int64) | yes |  |
| `data.industry_profile` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.multi_serial_delimiter` | string or null | no |  |
| `data.multi_serial_fixed_length` | integer (int32) or null | no |  |
| `data.pick_episode_reassignment_mode` | string | yes | Behaviour when a different operator resumes a Pick with an unfinished serial episode. |
| `data.profile_mode` | string | yes | Movement/capture coupling policy (ADR-090). |
| `data.require_unique_global` | boolean | yes |  |
| `data.serial_auto_increment` | boolean | yes |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_increment_length` | integer (int32) or null | no |  |
| `data.serial_increment_source_position` | integer (int32) or null | no |  |
| `data.serial_length` | integer (int32) or null | no |  |
| `data.serial_mask_format` | string or null | no |  |
| `data.serial_parse_frequency` | integer (int32) or null | no |  |
| `data.serial_parse_mode` | one of: None \| Fixed \| Bounded | yes | Per Decisions Log D-32. |
| `data.serial_parse_start_after` | integer (int32) or null | no |  |
| `data.serial_parse_start_position` | integer (int32) or null | no |  |
| `data.serial_scope` | string | yes | Migration 153 — serial granularity. |
| `data.serials_per_barcode` | integer (int32) | yes |  |
| `data.sku_id` | integer (int64) | yes |  |
| `data.warranty_period_days` | integer (int32) or null | no |  |

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
  "method": "update_sku_serial_config",
  "params": {
    "id": 1,
    "data": {
      "allow_asn_pre_advised": false,
      "allow_deferred_capture": false
    }
  }
}'
```

## Module: inventory_balance_serial

### count_inventory_balance_serial

Count inventory_balance_serial — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_balance_serial |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_inventory_balance_serial` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].serial_number` | string filter | no | Filter on `serial_number`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].received_via` | integer filter | no | Filter on `received_via`. |
| `filters[].has_planned_line` | boolean filter | no | Filter on `has_planned_line`. |
| `filters[].received_at` | value (date, time or other) filter | no | Filter on `received_at`. |
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
  "method": "count_inventory_balance_serial",
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

### get_inventory_balance_serial

Get a inventory_balance_serial by ID — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_balance_serial |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_inventory_balance_serial` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryBalanceSerial }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.anomaly_flags` | any | no |  |
| `data.capture_method` | one of: Asn \| Receive \| Manufacturer \| Manual | yes |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.customer_id` | integer (int64) or null | no |  |
| `data.damage_id` | integer (int64) or null | no |  |
| `data.disposal_reason` | string or null | no |  |
| `data.disposed_at` | string or null | no |  |
| `data.has_planned_line` | boolean | yes |  |
| `data.hold_id` | integer (int64) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.last_moved_at` | string or null | no |  |
| `data.last_moved_by` | integer (int64) or null | no |  |
| `data.location` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.picked_via` | integer (int64) or null | no |  |
| `data.previous_status` | one of: Active \| Reserved \| Picked \| Shipped \| Returned \| Damaged \| Disposed \| Held \| Packed \| Missing or null | no |  |
| `data.received_at` | string | yes |  |
| `data.received_by` | integer (int64) | yes |  |
| `data.received_via` | integer (int64) or null | no | `receipt_detail.id` of the line that captured it; `None` for a serial a count registered (`registered_via_count`). |
| `data.registered_via_adjustment` | integer (int64) or null | no | The adjustment that registered one (adjustment spec Appendix D). |
| `data.registered_via_count` | integer (int64) or null | no | The count task that registered a serial no receipt brought (count spec Appendix K). |
| `data.reserved_for` | integer (int64) or null | no |  |
| `data.return_via` | integer (int64) or null | no |  |
| `data.returned_at` | string or null | no |  |
| `data.serial_format` | string or null | no |  |
| `data.serial_number` | string | yes |  |
| `data.shipped_at` | string or null | no |  |
| `data.shipped_via` | integer (int64) or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Active \| Reserved \| Picked \| Shipped \| Returned \| Damaged \| Disposed \| Held \| Packed \| Missing | yes |  |

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
  "method": "get_inventory_balance_serial",
  "params": {
    "id": 1
  }
}'
```

### list_inventory_balance_serial

List inventory_balance_serial — CRUD.

| | |
|---|---|
| Context / module | inventory / inventory_balance_serial |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_inventory_balance_serial` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].serial_number` | string filter | no | Filter on `serial_number`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].lot` | string filter | no | Filter on `lot`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].received_via` | integer filter | no | Filter on `received_via`. |
| `filters[].has_planned_line` | boolean filter | no | Filter on `has_planned_line`. |
| `filters[].received_at` | value (date, time or other) filter | no | Filter on `received_at`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryBalanceSerial] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].anomaly_flags` | any | no |  |
| `data[].capture_method` | one of: Asn \| Receive \| Manufacturer \| Manual | yes |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].customer_id` | integer (int64) or null | no |  |
| `data[].damage_id` | integer (int64) or null | no |  |
| `data[].disposal_reason` | string or null | no |  |
| `data[].disposed_at` | string or null | no |  |
| `data[].has_planned_line` | boolean | yes |  |
| `data[].hold_id` | integer (int64) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].last_moved_at` | string or null | no |  |
| `data[].last_moved_by` | integer (int64) or null | no |  |
| `data[].location` | string or null | no |  |
| `data[].lot` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].picked_via` | integer (int64) or null | no |  |
| `data[].previous_status` | one of: Active \| Reserved \| Picked \| Shipped \| Returned \| Damaged \| Disposed \| Held \| Packed \| Missing or null | no |  |
| `data[].received_at` | string | yes |  |
| `data[].received_by` | integer (int64) | yes |  |
| `data[].received_via` | integer (int64) or null | no | `receipt_detail.id` of the line that captured it; `None` for a serial a count registered (`registered_via_count`). |
| `data[].registered_via_adjustment` | integer (int64) or null | no | The adjustment that registered one (adjustment spec Appendix D). |
| `data[].registered_via_count` | integer (int64) or null | no | The count task that registered a serial no receipt brought (count spec Appendix K). |
| `data[].reserved_for` | integer (int64) or null | no |  |
| `data[].return_via` | integer (int64) or null | no |  |
| `data[].returned_at` | string or null | no |  |
| `data[].serial_format` | string or null | no |  |
| `data[].serial_number` | string | yes |  |
| `data[].shipped_at` | string or null | no |  |
| `data[].shipped_via` | integer (int64) or null | no |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | one of: Active \| Reserved \| Picked \| Shipped \| Returned \| Damaged \| Disposed \| Held \| Packed \| Missing | yes |  |

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
  "method": "list_inventory_balance_serial",
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

## Module: handling_unit

### handling_unit_register

Register N handling units of one type at a location and print their labels once.

| | |
|---|---|
| Context / module | inventory / handling_unit |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `handling_unit_register` |
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
| `data` | object (RegisterHandlingUnits) | yes |  |
| `data.asset_owner_kind` | one of: ThisWarehouse \| Owner | yes | Whose property the new units are. |
| `data.count` | integer (uint32) | yes |  |
| `data.handling_unit_type_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.location` | string | yes |  |
| `data.owner_id` | integer (int64) or null | no | Required with `Owner`, refused with `ThisWarehouse`. |
| `data.print` | boolean | no |  |
| `data.printer_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": RegisterHandlingUnitsResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.containers` | array of object (RegisteredHandlingUnit) | yes |  |
| `data.containers[].code` | string | yes |  |
| `data.containers[].container_id` | integer (int64) | yes |  |
| `data.handling_unit_type_id` | integer (int64) | yes |  |

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
      "containers": [
        {
          "code": "<code>",
          "container_id": 1
        }
      ],
      "handling_unit_type_id": 1
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
  "method": "handling_unit_register",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "asset_owner_kind": "ThisWarehouse",
      "count": 1,
      "handling_unit_type_id": 1,
      "location": "<location>"
    }
  }
}'
```

### list_handling_unit

List registered handling units, filtered like any list (by type, status, location).

| | |
|---|---|
| Context / module | inventory / handling_unit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_handling_unit` |
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
| `filters[].sscc` | string filter | no | Filter on `sscc`. |
| `filters[].container_type` | string filter | no | Filter on `container_type`. |
| `filters[].parent_id` | integer filter | no | Filter on `parent_id`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].current_loc` | string filter | no | Filter on `current_loc`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].origin` | string filter | no | Filter on `origin`. |
| `filters[].origin_context_id` | integer filter | no | Filter on `origin_context_id`. |
| `filters[].is_reusable` | boolean filter | no | Filter on `is_reusable`. |
| `filters[].disposable` | boolean filter | no | Filter on `disposable`. |
| `filters[].handling_unit_type_id` | integer filter | no | Filter on `handling_unit_type_id`. |
| `filters[].asset_warehouse_id` | integer filter | no | Filter on `asset_warehouse_id`. |
| `filters[].asset_owner_id` | integer filter | no | Filter on `asset_owner_id`. |
| `filters[].usage_policy_override` | string filter | no | Filter on `usage_policy_override`. |
| `filters[].planned_at_receipt_id` | integer filter | no | Filter on `planned_at_receipt_id`. |
| `filters[].cartonization_policy_detail_id` | integer filter | no | Filter on `cartonization_policy_detail_id`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [Container] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].asset_owner_id` | integer (int64) or null | no | The asset owner is a customer of the warehouse (`owners`). |
| `data[].asset_warehouse_id` | integer (int64) or null | no | The asset owner is the enterprise warehouse. |
| `data[].cartonization_policy_detail_id` | integer (int64) or null | no | The cartonization policy row that this box was made from. |
| `data[].code` | string | yes |  |
| `data[].container_type` | one of: Pallet \| Case \| Tote \| Generic \| Carton | yes |  |
| `data[].current_loc` | string or null | no |  |
| `data[].disposable` | boolean | yes |  |
| `data[].handling_unit_type_id` | integer (int64) or null | no | The packaging type, if the container is an instance of one (`enterprise.handling_unit_type`). |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_reusable` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].origin` | one of: Receipt \| Manual \| Production \| System \| InterFacilityTransfer \| Cartonization | yes |  |
| `data[].origin_context_id` | integer (int64) or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) or null | no |  |
| `data[].parent_id` | integer (int64) or null | no |  |
| `data[].planned_at_receipt_id` | integer (int64) or null | no | ADR-046 — non-NULL when this container was minted by `CreateCaseLevelAsn` ahead of physical arrival (planned case or planned pallet); NULL for the dominant post-receive creation path. |
| `data[].sscc` | string or null | no |  |
| `data[].status` | one of: Active \| Empty \| Disposed \| InTransit \| Planned | yes |  |
| `data[].usage_policy_override` | one of: OwnOnly \| WarehouseShared or null | no | An exception to the type's `default_usage_policy` for this instance. |

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
  "method": "list_handling_unit",
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

## Module: inventory_adjustment

### create_inventory_adjustment

Create a Draft inventory adjustment from its header form (reason, comment).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_adjustment` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (HeaderFormNew) | yes | What the header form sends on create. |
| `data.adjustment_number` | string or null | no | What the new form showed: `generic_new` drew it from the counter. |
| `data.comment` | string or null | no |  |
| `data.reason_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": InventoryAdjustmentCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.adjustment_number` | string | yes |  |
| `data.approved_at` | string or null | no |  |
| `data.approved_by` | integer (int64) or null | no |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lines_editable` | boolean | yes | Whether lines may be added, changed or removed now — not posted, and not a reversal, whose lines are the original's set back. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.needs_approval` | boolean | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now (validated, and approved when a reason asks) — the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.reason_code` | string | yes |  |
| `data.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.reversal_of_number` | string or null | no | The document this one reverses, by number (the audit link, §18). |
| `data.reversed_by_number` | string or null | no | The document that reverses this one, by number. |
| `data.reversible` | boolean | yes | Whether Reverse would be accepted now — the same rule the command applies, so the screen greys the button exactly when the server would refuse it. |
| `data.source_id` | integer (int64) or null | no |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.validatable` | boolean | yes | Whether Validate would be accepted now — a Draft or a Validated document; an approved one keeps its approval. |
| `data.validated_at` | string or null | no |  |
| `data.validated_by` | integer (int64) or null | no |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_inventory_adjustment",
  "params": {
    "data": {
      "reason_code": "<reason_code>"
    }
  }
}'
```

### create_inventory_adjustment_line

Add a line from the line form: owner, SKU, lot, location, container picked or typed.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_adjustment_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LineFormNew) | yes | What the line form sends on create. |
| `data.comment` | string or null | no |  |
| `data.container_code` | string or null | no |  |
| `data.inventory_adjustment_id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.lot` | string | yes |  |
| `data.owner_code` | string | yes |  |
| `data.reason_code` | string or null | no |  |
| `data.serials_in` | string or null | no |  |
| `data.serials_out` | string or null | no | Serials to write off and to add, one a line. |
| `data.sku_code` | string | yes |  |
| `data.target_qty` | number (double) or null | no | Required, except on a line that names serials: its target follows from them (Appendix D). |

**Result**

The `result` member of the response is: `{ "data": AdjustmentLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.container_code` | string or null | no |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.error_code` | string or null | no |  |
| `data.error_message` | string or null | no |  |
| `data.error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_adjustment_id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.reason_code` | string or null | no |  |
| `data.serials_in` | string or null | no |  |
| `data.serials_out` | string or null | no | The serials the line writes off and adds, one a line (Appendix D). |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.target_qty` | number (double) | yes |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_inventory_adjustment_line",
  "params": {
    "data": {
      "inventory_adjustment_id": 1,
      "location": "<location>",
      "lot": "<lot>",
      "owner_code": "<owner_code>",
      "sku_code": "<sku_code>"
    }
  }
}'
```

### get_inventory_adjustment_line

Get one adjustment line as its form shows it (owner and container by code).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_inventory_adjustment_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": AdjustmentLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.container_code` | string or null | no |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.error_code` | string or null | no |  |
| `data.error_message` | string or null | no |  |
| `data.error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_adjustment_id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.reason_code` | string or null | no |  |
| `data.serials_in` | string or null | no |  |
| `data.serials_out` | string or null | no | The serials the line writes off and adds, one a line (Appendix D). |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.target_qty` | number (double) | yes |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "get_inventory_adjustment_line",
  "params": {
    "id": 1
  }
}'
```

### inventory_adjust_reason_list

List the inventory adjustment reasons with their policy, retired ones too (or the one an id names).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjust_reason_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

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

The `result` member of the response is: `{ "data": [AdjustReasonRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].active` | boolean | yes |  |
| `data[].allow_negative` | boolean | yes |  |
| `data[].allow_positive` | boolean | yes |  |
| `data[].code` | string | yes |  |
| `data[].count_after_post` | boolean | yes |  |
| `data[].description` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].requires_approval` | boolean | yes |  |
| `data[].requires_comment` | boolean | yes |  |

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
  "method": "inventory_adjust_reason_list",
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

### inventory_adjust_reason_set_count

Set whether posting an adjustment with this reason counts the locations it changed.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjust_reason_set_count` |
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
| `data` | object (SetReasonCountAfterPost) | yes |  |
| `data.count_after_post` | boolean | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.reason_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReasonCountAfterPostSet }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_after_post` | boolean | yes |  |
| `data.reason_code` | string | yes |  |

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
      "count_after_post": false,
      "reason_code": "<reason_code>"
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
  "method": "inventory_adjust_reason_set_count",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "count_after_post": false,
      "reason_code": "<reason_code>"
    }
  }
}'
```

### inventory_adjustment_add_line

Add one line from flat fields (container by code; pack and unit default to the SKU's).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_add_line` |
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
| `data` | object (AddInventoryAdjustmentLine) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.container_code` | string or null | no | The container's code (LPN); empty = loose stock. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.location` | string | yes |  |
| `data.lot` | string | yes |  |
| `data.owner_code` | string | yes | The owner by its code — picked from the list or typed. |
| `data.pack_id` | integer (int64) or null | no | Empty = the SKU's pack. |
| `data.reason_code` | string or null | no |  |
| `data.serials_in` | string or null | no |  |
| `data.serials_out` | string or null | no | A serial-tracked SKU's serials to write off and to add, as typed or scanned: one a line (Appendix D). |
| `data.sku_code` | string | yes |  |
| `data.target_qty` | number (double) | yes |  |
| `data.uom` | string or null | no | Empty = the SKU's default unit. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_add_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1,
      "location": "<location>",
      "lot": "<lot>",
      "owner_code": "<owner_code>",
      "sku_code": "<sku_code>",
      "target_qty": 1
    }
  }
}'
```

### inventory_adjustment_add_lines

Add lines (identity + target quantity) to an unposted adjustment.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_add_lines` |
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
| `data` | object (AddInventoryAdjustmentLines) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.lines` | array of object (NewAdjustmentLine) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no | `None` = the document's reason. |
| `data.lines[].serials_in` | array of string | no |  |
| `data.lines[].serials_out` | array of string | no | A serial-tracked SKU's serials to write off and to add (Appendix D); then the server works out the target. |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | no | EXISTING unless the line is stock the system does not have (§6, A.1). |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].uom` | string | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_add_lines",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1,
      "lines": [
        {
          "location": "<location>",
          "lot": "<lot>",
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "target_qty": 1,
          "uom": "<uom>"
        }
      ]
    }
  }
}'
```

### inventory_adjustment_approve

Approve a validated adjustment whose reason requires approval.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_approve` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |
| Version check | entity `inventory_adjustment`: send `expected_version` for row `adjustment_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (ApproveInventoryAdjustment) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_approve",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### inventory_adjustment_card_get

Get one inventory adjustment's header, flat, with whether it needs approval.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_card_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryAdjustmentCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.adjustment_number` | string | yes |  |
| `data.approved_at` | string or null | no |  |
| `data.approved_by` | integer (int64) or null | no |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lines_editable` | boolean | yes | Whether lines may be added, changed or removed now — not posted, and not a reversal, whose lines are the original's set back. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.needs_approval` | boolean | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now (validated, and approved when a reason asks) — the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.reason_code` | string | yes |  |
| `data.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.reversal_of_number` | string or null | no | The document this one reverses, by number (the audit link, §18). |
| `data.reversed_by_number` | string or null | no | The document that reverses this one, by number. |
| `data.reversible` | boolean | yes | Whether Reverse would be accepted now — the same rule the command applies, so the screen greys the button exactly when the server would refuse it. |
| `data.source_id` | integer (int64) or null | no |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.validatable` | boolean | yes | Whether Validate would be accepted now — a Draft or a Validated document; an approved one keeps its approval. |
| `data.validated_at` | string or null | no |  |
| `data.validated_by` | integer (int64) or null | no |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_adjustment_card_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_adjustment_create

Create a Draft inventory adjustment, optionally with its lines.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_create` |
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
| `data` | object (CreateInventoryAdjustment) | yes |  |
| `data.adjustment_number` | string or null | no | The number the new form already showed (its counter ran at New, as for receipts and orders); `None` = take the next one now. |
| `data.comment` | string or null | no |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.lines` | array of object (NewAdjustmentLine) | no |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no | `None` = the document's reason. |
| `data.lines[].serials_in` | array of string | no |  |
| `data.lines[].serials_out` | array of string | no | A serial-tracked SKU's serials to write off and to add (Appendix D); then the server works out the target. |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | no | EXISTING unless the line is stock the system does not have (§6, A.1). |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].uom` | string | yes |  |
| `data.reason_code` | string | yes |  |
| `data.source_type` | string or null | no | `Manual` (default) or `Import`. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_create",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "reason_code": "<reason_code>"
    }
  }
}'
```

### inventory_adjustment_delete

Delete an adjustment that was never posted, with its lines.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_adjustment`: send `expected_version` for row `adjustment_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeleteInventoryAdjustment) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DeletedInventoryAdjustment }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.adjustment_number` | string | yes |  |
| `data.id` | integer (int64) | yes |  |

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
      "adjustment_number": "<adjustment_number>",
      "id": 1
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
  "method": "inventory_adjustment_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### inventory_adjustment_generate_lines

Add a line, target = current quantity, for every stock row a filter names.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_generate_lines` |
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
| `data` | object (GenerateInventoryAdjustmentLines) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.location` | string or null | no |  |
| `data.lot` | string or null | no |  |
| `data.owner_code` | string or null | no | The owner by its code. |
| `data.sku_code` | string or null | no |  |
| `data.zone` | string or null | no | The location's put-away zone. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_generate_lines",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### inventory_adjustment_get

Get one inventory adjustment with its lines.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryAdjustmentView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_adjustment_line_preview_list

List adjustment lines with the live current/effect forecast or the posted effect.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_line_preview_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].inventory_adjustment_id` | integer filter | no | Filter on `inventory_adjustment_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].owner_code` | string filter | no | Filter on `owner_code`. |
| `filters[].container_code` | string filter | no | Filter on `container_code`. |
| `filters[].qty_before` | number filter | no | Filter on `qty_before`. |
| `filters[].qty_delta` | number filter | no | Filter on `qty_delta`. |
| `filters[].qty_after` | number filter | no | Filter on `qty_after`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [AdjustmentLinePreview] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].comment` | string or null | no |  |
| `data[].container_code` | string or null | no |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].current_qty` | number (double) or null | no | Live: the identity's quantity now (0 when it has no row). |
| `data[].effect_qty` | number (double) or null | no | Live: TARGET − CURRENT. |
| `data[].error_code` | string or null | no |  |
| `data[].error_message` | string or null | no |  |
| `data[].forecast_code` | string or null | no | Live: why POST would refuse this line now; `None` if it would not. |
| `data[].forecast_message` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data[].line_no` | integer (int32) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].owner_code` | string or null | no | The owner and the container by code, as the operator names them. |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].qty_after` | number (double) or null | no |  |
| `data[].qty_before` | number (double) or null | no | Posted: what the ledger recorded (NoChange: before = after = target). |
| `data[].qty_delta` | number (double) or null | no |  |
| `data[].reason_code` | string or null | no |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data[].target_qty` | number (double) | yes |  |
| `data[].transaction_log_code` | string or null | no |  |
| `data[].uom` | string | yes |  |
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
  "method": "inventory_adjustment_line_preview_list",
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

### inventory_adjustment_list

List inventory adjustments, filtered like any list (by status, reason, number).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].adjustment_number` | string filter | no | Filter on `adjustment_number`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].source_type` | string filter | no | Filter on `source_type`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryAdjustment] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].adjustment_number` | string | yes |  |
| `data[].approved_at` | string or null | no |  |
| `data[].approved_by` | integer (int64) or null | no |  |
| `data[].comment` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].posted_at` | string or null | no |  |
| `data[].posted_by` | integer (int64) or null | no |  |
| `data[].reason_code` | string | yes |  |
| `data[].reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data[].source_id` | integer (int64) or null | no |  |
| `data[].source_type` | string | yes |  |
| `data[].status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data[].validated_at` | string or null | no |  |
| `data[].validated_by` | integer (int64) or null | no |  |
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
  "method": "inventory_adjustment_list",
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

### inventory_adjustment_list_lines

List adjustment lines, filtered like any list (by adjustment, status, SKU).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_list_lines` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].inventory_adjustment_id` | integer filter | no | Filter on `inventory_adjustment_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryAdjustmentDetail] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].comment` | string or null | no |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].error_code` | string or null | no |  |
| `data[].error_message` | string or null | no |  |
| `data[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data[].line_no` | integer (int32) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].reason_code` | string or null | no |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data[].target_qty` | number (double) | yes |  |
| `data[].transaction_log_code` | string or null | no |  |
| `data[].uom` | string | yes |  |
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
  "method": "inventory_adjustment_list_lines",
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

### inventory_adjustment_post

Post the adjustment: set every line's stock to its target, all or nothing.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_post` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_adjustment`: send `expected_version` for row `adjustment_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (PostInventoryAdjustment) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.override_grant_id` | string (uuid) or null | no | A shift lead's grant (`supervisor_override_grant`) authorising this posting into a location an open Hard count is counting (owner's decision 2026-10-21 §6). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_post",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### inventory_adjustment_remove_line

Remove one line from an unposted adjustment.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_remove_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_adjustment_detail`: send `expected_version` for row `line_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (RemoveInventoryAdjustmentLine) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.line_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_remove_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "line_id": 1
    }
  }
}'
```

### inventory_adjustment_reverse

Make a Draft that sets a posted adjustment's stock back (target = ledger before).

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_reverse` |
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
| `data` | object (ReverseInventoryAdjustment) | yes |  |
| `data.adjustment_id` | integer (int64) | yes | The posted document to reverse. |
| `data.comment` | string or null | no | Why it is reversed. |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_reverse",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### inventory_adjustment_update_line

Change one line's target quantity, reason or comment.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_update_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_adjustment_detail`: send `expected_version` for row `line_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (UpdateInventoryAdjustmentLine) | yes |  |
| `data.comment` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.line_id` | integer (int64) | yes |  |
| `data.reason_code` | string or null | no | `None` = the document's reason. |
| `data.serials_in` | array of string or null | no |  |
| `data.serials_out` | array of string or null | no | A serial line's serials named again (Appendix D); `None` keeps the ones it names. |
| `data.target_qty` | number (double) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_update_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "line_id": 1,
      "target_qty": 1
    }
  }
}'
```

### inventory_adjustment_validate

Judge every line without changing stock; Validated when all pass.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_adjustment_validate` |
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
| `data` | object (ValidateInventoryAdjustment) | yes |  |
| `data.adjustment_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryAdjustmentView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.has_invalid_lines` | boolean | yes | Whether any line was judged Invalid — a validation that refused. |
| `data.header` | object (InventoryAdjustment) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.adjustment_number` | string | yes |  |
| `data.header.approved_at` | string or null | no |  |
| `data.header.approved_by` | integer (int64) or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.reason_code` | string | yes |  |
| `data.header.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.header.validated_at` | string or null | no |  |
| `data.header.validated_by` | integer (int64) or null | no |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (InventoryAdjustmentDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].comment` | string or null | no |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].error_code` | string or null | no |  |
| `data.lines[].error_message` | string or null | no |  |
| `data.lines[].error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.lines[].expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].inventory_adjustment_id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot` | string | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].reason_code` | string or null | no |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.lines[].target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.lines[].target_qty` | number (double) | yes |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| … | | | 4 more fields. See `openrpc.json`. |

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
      "has_invalid_lines": false,
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "adjustment_number": "<adjustment_number>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "reason_code": "<reason_code>",
        "source_type": "<source_type>",
        "status": "Draft",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_adjustment_id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot": "<lot>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "target_mode": "Existing",
          "target_qty": 1,
          "uom": "<uom>",
          "version": 1
        }
      ],
      "needs_approval": false,
      "summary": "<summary>"
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
  "method": "inventory_adjustment_validate",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "adjustment_id": 1
    }
  }
}'
```

### update_inventory_adjustment

Save an adjustment's header form: reason and comment, on the version read.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_inventory_adjustment` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `inventory_adjustment`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (HeaderFormChange) | yes | What the header form sends on save: only what changed. |
| `data.data.comment` | string or null | no |  |
| `data.data.reason_code` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": InventoryAdjustmentCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.adjustment_number` | string | yes |  |
| `data.approved_at` | string or null | no |  |
| `data.approved_by` | integer (int64) or null | no |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.lines_editable` | boolean | yes | Whether lines may be added, changed or removed now — not posted, and not a reversal, whose lines are the original's set back. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.needs_approval` | boolean | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now (validated, and approved when a reason asks) — the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.reason_code` | string | yes |  |
| `data.reversal_of_adjustment_id` | integer (int64) or null | no |  |
| `data.reversal_of_number` | string or null | no | The document this one reverses, by number (the audit link, §18). |
| `data.reversed_by_number` | string or null | no | The document that reverses this one, by number. |
| `data.reversible` | boolean | yes | Whether Reverse would be accepted now — the same rule the command applies, so the screen greys the button exactly when the server would refuse it. |
| `data.source_id` | integer (int64) or null | no |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Draft \| Validated \| Approved \| Posted | yes |  |
| `data.validatable` | boolean | yes | Whether Validate would be accepted now — a Draft or a Validated document; an approved one keeps its approval. |
| `data.validated_at` | string or null | no |  |
| `data.validated_by` | integer (int64) or null | no |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "update_inventory_adjustment",
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

### update_inventory_adjustment_line

Save a line form: target, reason, comment, on the line's version read.

| | |
|---|---|
| Context / module | inventory / inventory_adjustment |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_inventory_adjustment_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `inventory_adjustment_detail`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (LineFormChange) | yes | What the line form sends on save: only what changed. |
| `data.data.comment` | string or null | no |  |
| `data.data.reason_code` | string or null | no |  |
| `data.data.serials_in` | string or null | no |  |
| `data.data.serials_out` | string or null | no |  |
| `data.data.target_qty` | number (double) or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": AdjustmentLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.container_code` | string or null | no |  |
| `data.container_id` | integer (int64) or null | no |  |
| `data.error_code` | string or null | no |  |
| `data.error_message` | string or null | no |  |
| `data.error_spoken` | any | no | The same refusal as `{template, args}` (wms-app 107), said in the reader's language when the line is read. |
| `data.expected_qty` | number (double) or null | no | What the identity held when the stock was observed — set only by an inventory count (wms-app 056). |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_adjustment_id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.reason_code` | string or null | no |  |
| `data.serials_in` | string or null | no |  |
| `data.serials_out` | string or null | no | The serials the line writes off and adds, one a line (Appendix D). |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Valid \| Invalid \| Posted \| NoChange | yes |  |
| `data.target_mode` | one of: Existing \| CreateIfMissing | yes |  |
| `data.target_qty` | number (double) | yes |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "update_inventory_adjustment_line",
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

## Module: inventory_count

### create_inventory_count

Open a count from its header form: kind, mode, recounts, a comment — no location yet.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_count` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (CountFormNew) | yes | What the header form sends on save: the count's choices. |
| `data.comment` | string or null | no |  |
| `data.count_mode` | one of: Blind \| Informed or null | no | `Blind` (default) or `Informed`. |
| `data.count_number` | string or null | no | What the new form showed: `generic_new` drew it from the counter. |
| `data.count_type` | one of: Full \| Cycle \| Selective \| Event or null | no | `Selective` (default) or `Full`. |
| `data.freeze_mode` | one of: Hard \| Soft or null | no | `Hard` (default) or `Soft` (count spec Appendix F). |
| `data.item_lots` | string or null | no |  |
| `data.item_lpns` | string or null | no |  |
| `data.item_skus` | string or null | no | (The code comment for this item is not in English. |
| `data.max_recounts` | integer (int16) or null | no | How many times one location may be recounted; empty = the default. |
| `data.scope_mode` | one of: LocationFull \| IdentitySubset or null | no | (The code comment for this item is not in English. |

**Result**

The `result` member of the response is: `{ "data": InventoryCountCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.cancelled_at` | string or null | no |  |
| `data.closed_at` | string or null | no |  |
| `data.comment` | string or null | no |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.item_lots` | string | yes |  |
| `data.item_lpns` | string | yes |  |
| `data.item_skus` | string | yes | The count's item, as the header form names it: codes, comma-separated (empty = not named). |
| `data.locations` | string | yes | The counted locations, sorted, comma-separated. |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks_closed` | integer (int32) | yes |  |
| `data.tasks_open` | integer (int32) | yes |  |
| `data.tasks_variance` | integer (int32) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_inventory_count",
  "params": {
    "data": {}
  }
}'
```

### create_inventory_count_policy

Create a cycle-count policy from its form.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_inventory_count_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (CountPolicyForm) | yes |  |
| `data.abc` | string or null | no | `A`, `B` or `C`. |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items or null | no | `Locations` (default) or `Items` (count spec Appendix H). |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed or null | no | `Blind` (default) or `Informed`. |
| `data.daily_limit` | integer (int32) or null | no | At most this many locations a run. |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft or null | no | `Hard` (default) or `Soft` (count spec Appendix F). |
| `data.frequency_days` | integer (int32) or null | no | Count a location every this many days. |
| `data.is_active` | boolean or null | no | Default `true`. |
| `data.loc_type` | string or null | no | A location type as `location.loc_type` spells it (`Case`, `Pick`, …). |
| `data.max_recounts` | integer (int16) or null | no | Recounts per location in the counts it makes (default 2). |
| `data.putawayzone` | string or null | no | Scope — at least one of the four. |
| `data.sku_abc` | string or null | no | `Items`: the SKUs' ABC class, `A`, `B` or `C`. |
| `data.sku_group` | string or null | no | `Items`: the SKUs' group. |
| `data.trust_empty_confirmation` | boolean or null | no | A location confirmed empty in passing counts as checked (count spec Appendix L.6). |

**Result**

The `result` member of the response is: `{ "data": InventoryCountPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_inventory_count_policy",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### inventory_count_accept

Accept a location's variance with its cause: post an adjustment to what was counted.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_accept` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count_task`: send `expected_version` for row `task_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (AcceptCountVariance) | yes |  |
| `data.cause_code` | string or null | no | Why the count differs: a code of the list `count_variance_cause` (ADR-093 D2, required from a person). |
| `data.comment` | string or null | no | What the supervisor adds to the cause. |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_accept",
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

### inventory_count_add_locations

Add locations to an open count — by code, or every countable one of zones: freeze and snapshot them.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_add_locations` |
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
| `data` | object (AddCountLocations) | yes |  |
| `data.count_id` | integer (int64) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.locations` | array of string | no | Location codes; an entry may name several, separated by commas, semicolons or white space — what a picker of several values sends. |
| `data.zones` | array of string | no | Putaway zones, written the same way: every countable location of each. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountLocationsAdded }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.added` | array of string | yes | The locations now counted, sorted. |
| `data.count_id` | integer (int64) | yes |  |
| `data.count_number` | string | yes |  |
| `data.message` | string | yes | The outcome, in words. |
| `data.skipped` | array of string | yes | Locations of the zones left out (blocked, under another operation or counted elsewhere) and those this count already held, sorted. |

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
      "added": [
        "<added>"
      ],
      "count_id": 1,
      "count_number": "<count_number>",
      "message": "<message>",
      "skipped": [
        "<skipped>"
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
  "method": "inventory_count_add_locations",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "count_id": 1
    }
  }
}'
```

### inventory_count_cancel

Cancel a count: its live locations thaw, nothing is adjusted.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_cancel` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count`: send `expected_version` for row `count_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (CancelInventoryCount) | yes |  |
| `data.count_id` | integer (int64) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (InventoryCount) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.cancelled_at` | string or null | no |  |
| `data.header.closed_at` | string or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.count_mode` | one of: Blind \| Informed | yes |  |
| `data.header.count_number` | string | yes |  |
| `data.header.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.header.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.item_containers` | array of integer (int64) | yes |  |
| `data.header.item_lots` | array of string | yes |  |
| `data.header.item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data.header.max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.recount_by_other_counter` | boolean | yes |  |
| `data.header.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks` | array of object (InventoryCountTask) | yes |  |
| `data.tasks[].add_when` | string | yes |  |
| `data.tasks[].add_who` | integer (int64) | yes |  |
| `data.tasks[].adjustment_id` | integer (int64) or null | no |  |
| `data.tasks[].attempt_no` | integer (int32) | yes |  |
| `data.tasks[].auto_accepted` | boolean | no |  |
| `data.tasks[].counted_at` | string or null | no |  |
| `data.tasks[].counted_by` | integer (int64) or null | no |  |
| `data.tasks[].decided_at` | string or null | no |  |
| `data.tasks[].decided_by` | integer (int64) or null | no |  |
| `data.tasks[].empty_confirmed` | boolean | yes |  |
| `data.tasks[].id` | integer (int64) | yes |  |
| `data.tasks[].inventory_count_id` | integer (int64) | yes |  |
| `data.tasks[].location` | string | yes |  |
| `data.tasks[].mod_when` | string | yes |  |
| `data.tasks[].mod_who` | integer (int64) | yes |  |
| `data.tasks[].recount_of_task_id` | integer (int64) or null | no |  |
| `data.tasks[].snapshot_at` | string | yes |  |
| `data.tasks[].status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data.tasks[].variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data.tasks[].variance_comment` | string or null | no |  |
| … | | | 1 more fields. See `openrpc.json`. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "count_mode": "Blind",
        "count_number": "<count_number>",
        "count_type": "Full",
        "freeze_mode": "Hard",
        "id": 1,
        "item_containers": [
          1
        ],
        "item_lots": [
          "<item_lots>"
        ],
        "item_skus": [
          "<item_skus>"
        ],
        "max_recounts": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "recount_by_other_counter": false,
        "scope_mode": "LocationFull",
        "source_type": "<source_type>",
        "status": "Open",
        "version": 1
      },
      "summary": "<summary>",
      "tasks": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attempt_no": 1,
          "empty_confirmed": false,
          "id": 1,
          "inventory_count_id": 1,
          "location": "<location>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "snapshot_at": "<snapshot_at>",
          "status": "Open",
          "version": 1
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
  "method": "inventory_count_cancel",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "count_id": 1
    }
  }
}'
```

### inventory_count_card_get

Get one inventory count flat, with its locations and where its tasks stand.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_card_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryCountCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.cancelled_at` | string or null | no |  |
| `data.closed_at` | string or null | no |  |
| `data.comment` | string or null | no |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.item_lots` | string | yes |  |
| `data.item_lpns` | string | yes |  |
| `data.item_skus` | string | yes | The count's item, as the header form names it: codes, comma-separated (empty = not named). |
| `data.locations` | string | yes | The counted locations, sorted, comma-separated. |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks_closed` | integer (int32) | yes |  |
| `data.tasks_open` | integer (int32) | yes |  |
| `data.tasks_variance` | integer (int32) | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_card_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_complete

Finish counting a location: compare with its snapshot; close it or leave a variance.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_complete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (CompleteCountTask) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_complete",
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

### inventory_count_confirm_empty

Confirm the location being counted holds nothing.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_confirm_empty` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (ConfirmCountLocationEmpty) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_confirm_empty",
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

### inventory_count_create

Start a selective count of locations: freeze them and snapshot their stock.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_create` |
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
| `data` | object (CreateInventoryCount) | yes |  |
| `data.comment` | string or null | no |  |
| `data.count_mode` | one of: Blind \| Informed or null | no | `Blind` (default): the counter does not see the system quantity. |
| `data.count_number` | string or null | no | The number the new form already showed (its counter ran at New, as for adjustments); `None` = take the next one now. |
| `data.freeze_mode` | one of: Hard \| Soft or null | no | `Hard` (default): the locations are frozen while they are counted. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.locations` | array of string | yes | The locations to count, by code. |
| `data.max_recounts` | integer (int16) or null | no | How many times one location may be recounted (default 2, at most `MAX_RECOUNTS_CEILING`; 0 = never). |
| `data.recount_by_other_counter` | boolean or null | no | A recount must be counted by somebody else (default `true`). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (InventoryCount) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.cancelled_at` | string or null | no |  |
| `data.header.closed_at` | string or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.count_mode` | one of: Blind \| Informed | yes |  |
| `data.header.count_number` | string | yes |  |
| `data.header.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.header.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.item_containers` | array of integer (int64) | yes |  |
| `data.header.item_lots` | array of string | yes |  |
| `data.header.item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data.header.max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.recount_by_other_counter` | boolean | yes |  |
| `data.header.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks` | array of object (InventoryCountTask) | yes |  |
| `data.tasks[].add_when` | string | yes |  |
| `data.tasks[].add_who` | integer (int64) | yes |  |
| `data.tasks[].adjustment_id` | integer (int64) or null | no |  |
| `data.tasks[].attempt_no` | integer (int32) | yes |  |
| `data.tasks[].auto_accepted` | boolean | no |  |
| `data.tasks[].counted_at` | string or null | no |  |
| `data.tasks[].counted_by` | integer (int64) or null | no |  |
| `data.tasks[].decided_at` | string or null | no |  |
| `data.tasks[].decided_by` | integer (int64) or null | no |  |
| `data.tasks[].empty_confirmed` | boolean | yes |  |
| `data.tasks[].id` | integer (int64) | yes |  |
| `data.tasks[].inventory_count_id` | integer (int64) | yes |  |
| `data.tasks[].location` | string | yes |  |
| `data.tasks[].mod_when` | string | yes |  |
| `data.tasks[].mod_who` | integer (int64) | yes |  |
| `data.tasks[].recount_of_task_id` | integer (int64) or null | no |  |
| `data.tasks[].snapshot_at` | string | yes |  |
| `data.tasks[].status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data.tasks[].variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data.tasks[].variance_comment` | string or null | no |  |
| … | | | 1 more fields. See `openrpc.json`. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "count_mode": "Blind",
        "count_number": "<count_number>",
        "count_type": "Full",
        "freeze_mode": "Hard",
        "id": 1,
        "item_containers": [
          1
        ],
        "item_lots": [
          "<item_lots>"
        ],
        "item_skus": [
          "<item_skus>"
        ],
        "max_recounts": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "recount_by_other_counter": false,
        "scope_mode": "LocationFull",
        "source_type": "<source_type>",
        "status": "Open",
        "version": 1
      },
      "summary": "<summary>",
      "tasks": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attempt_no": 1,
          "empty_confirmed": false,
          "id": 1,
          "inventory_count_id": 1,
          "location": "<location>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "snapshot_at": "<snapshot_at>",
          "status": "Open",
          "version": 1
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
  "method": "inventory_count_create",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "locations": [
        "<locations>"
      ]
    }
  }
}'
```

### inventory_count_delete

Delete a count nothing was counted in; its locations thaw.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count`: send `expected_version` for row `count_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeleteInventoryCount) | yes |  |
| `data.count_id` | integer (int64) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCount }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.cancelled_at` | string or null | no |  |
| `data.closed_at` | string or null | no |  |
| `data.comment` | string or null | no |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.item_containers` | array of integer (int64) | yes |  |
| `data.item_lots` | array of string | yes |  |
| `data.item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data.max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.recount_by_other_counter` | boolean | yes |  |
| `data.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.source_id` | integer (int64) or null | no |  |
| `data.source_type` | string | yes |  |
| `data.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "count_id": 1
    }
  }
}'
```

### inventory_count_get

Get one inventory count with its tasks.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryCountView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (InventoryCount) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.cancelled_at` | string or null | no |  |
| `data.header.closed_at` | string or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.count_mode` | one of: Blind \| Informed | yes |  |
| `data.header.count_number` | string | yes |  |
| `data.header.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.header.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.item_containers` | array of integer (int64) | yes |  |
| `data.header.item_lots` | array of string | yes |  |
| `data.header.item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data.header.max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.recount_by_other_counter` | boolean | yes |  |
| `data.header.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks` | array of object (InventoryCountTask) | yes |  |
| `data.tasks[].add_when` | string | yes |  |
| `data.tasks[].add_who` | integer (int64) | yes |  |
| `data.tasks[].adjustment_id` | integer (int64) or null | no |  |
| `data.tasks[].attempt_no` | integer (int32) | yes |  |
| `data.tasks[].auto_accepted` | boolean | no |  |
| `data.tasks[].counted_at` | string or null | no |  |
| `data.tasks[].counted_by` | integer (int64) or null | no |  |
| `data.tasks[].decided_at` | string or null | no |  |
| `data.tasks[].decided_by` | integer (int64) or null | no |  |
| `data.tasks[].empty_confirmed` | boolean | yes |  |
| `data.tasks[].id` | integer (int64) | yes |  |
| `data.tasks[].inventory_count_id` | integer (int64) | yes |  |
| `data.tasks[].location` | string | yes |  |
| `data.tasks[].mod_when` | string | yes |  |
| `data.tasks[].mod_who` | integer (int64) | yes |  |
| `data.tasks[].recount_of_task_id` | integer (int64) or null | no |  |
| `data.tasks[].snapshot_at` | string | yes |  |
| `data.tasks[].status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data.tasks[].variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data.tasks[].variance_comment` | string or null | no |  |
| … | | | 1 more fields. See `openrpc.json`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "count_mode": "Blind",
        "count_number": "<count_number>",
        "count_type": "Full",
        "freeze_mode": "Hard",
        "id": 1,
        "item_containers": [
          1
        ],
        "item_lots": [
          "<item_lots>"
        ],
        "item_skus": [
          "<item_skus>"
        ],
        "max_recounts": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "recount_by_other_counter": false,
        "scope_mode": "LocationFull",
        "source_type": "<source_type>",
        "status": "Open",
        "version": 1
      },
      "summary": "<summary>",
      "tasks": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attempt_no": 1,
          "empty_confirmed": false,
          "id": 1,
          "inventory_count_id": 1,
          "location": "<location>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "snapshot_at": "<snapshot_at>",
          "status": "Open",
          "version": 1
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
  "method": "inventory_count_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_list

List inventory counts, filtered like any list (by status, number).

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].count_number` | string filter | no | Filter on `count_number`. |
| `filters[].source_type` | string filter | no | Filter on `source_type`. |
| `filters[].source_id` | integer filter | no | Filter on `source_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryCount] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].cancelled_at` | string or null | no |  |
| `data[].closed_at` | string or null | no |  |
| `data[].comment` | string or null | no |  |
| `data[].count_mode` | one of: Blind \| Informed | yes |  |
| `data[].count_number` | string | yes |  |
| `data[].count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data[].freeze_mode` | one of: Hard \| Soft | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].item_containers` | array of integer (int64) | yes |  |
| `data[].item_lots` | array of string | yes |  |
| `data[].item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data[].max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].recount_by_other_counter` | boolean | yes |  |
| `data[].scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data[].source_id` | integer (int64) or null | no |  |
| `data[].source_type` | string | yes |  |
| `data[].status` | one of: Open \| Closed \| Cancelled | yes |  |
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
  "method": "inventory_count_list",
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

### inventory_count_list_tasks

List count tasks with what each count found (by count, location, status).

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_list_tasks` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].inventory_count_id` | integer filter | no | Filter on `inventory_count_id`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CountTaskRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].adjustment_id` | integer (int64) or null | no |  |
| `data[].attempt_no` | integer (int32) | yes |  |
| `data[].auto_accepted` | boolean | no |  |
| `data[].counted_at` | string or null | no |  |
| `data[].counted_by` | integer (int64) or null | no |  |
| `data[].decided_at` | string or null | no |  |
| `data[].decided_by` | integer (int64) or null | no |  |
| `data[].differences` | integer (int32) | yes | Identities that did not match; 0 until the task is counted. |
| `data[].empty_confirmed` | boolean | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_count_id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].recount_allowed` | boolean | yes | Whether the count's `max_recounts` still lets this location be counted again. |
| `data[].recount_of_task_id` | integer (int64) or null | no |  |
| `data[].snapshot_at` | string | yes |  |
| `data[].status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data[].variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data[].variance_comment` | string or null | no |  |
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
  "method": "inventory_count_list_tasks",
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

### inventory_count_location_results

Every result line of a counted location — all attempts: lot and its attributes, LPN, expected, counted, difference, adjustment.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_location_results` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].location_of_task_id` | integer filter | no | Filter on `location_of_task_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CountResultLine] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].adjustment_id` | integer (int64) or null | no |  |
| `data[].adjustment_number` | string or null | no |  |
| `data[].attempt_no` | integer (int32) | yes |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].difference` | number (double) | yes |  |
| `data[].expected_qty` | number (double) | yes |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot` | string | yes |  |
| `data[].lot_attributes` | string or null | no | `CODE value, …` — the lot policy's attributes of the lot. |
| `data[].lpn` | string or null | no |  |
| `data[].manufactured_date` | string or null | no |  |
| `data[].movement_qty` | number (double) | yes | The part of `expected_qty` stock movements made (a `Soft` count). |
| `data[].observed_qty` | number (double) | yes |  |
| `data[].owner_code` | string or null | no |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].result_type` | string | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].task_id` | integer (int64) | yes |  |
| `data[].task_status` | string | yes |  |
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
  "method": "inventory_count_location_results",
  "params": {
    "filters": [
      {
        "location_of_task_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### inventory_count_location_serials

Every serial a count of the location judged — all attempts: serial, SKU, lot, LPN, outcome (Found, Missing, Relocated, Registered), where the system held it.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_location_serials` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].location_of_task_id` | integer filter | no | Filter on `location_of_task_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [CountSerialLine] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].attempt_no` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot` | string | yes |  |
| `data[].lpn` | string or null | no |  |
| `data[].outcome` | string | yes | `Found` / `Missing` / `Relocated` / `Registered`. |
| `data[].seen_location` | string or null | no | Where the system held it when the count judged it. |
| `data[].seen_lpn` | string or null | no |  |
| `data[].seen_status` | string or null | no |  |
| `data[].serial_number` | string | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].task_id` | integer (int64) | yes |  |

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
  "method": "inventory_count_location_serials",
  "params": {
    "filters": [
      {
        "location_of_task_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### inventory_count_observe

Record stock found in the location being counted (SKU, lot, quantity).

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_observe` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (RecordCountObservation) | yes | What the counter scanned. |
| `data.container_code` | string or null | no |  |
| `data.container_id` | integer (int64) or null | no | The container by id or by code (LPN); both empty = loose stock. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.lot` | string | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) or null | no | The owner by id or by code; empty = the only owner of the SKU code. |
| `data.pack_id` | integer (int64) or null | no | Empty = the SKU's pack. |
| `data.qty` | number (double) | yes |  |
| `data.serials` | array of string | no | The serials scanned — required for a serial-tracked SKU (then `qty` is their number), refused for any other. |
| `data.sku_code` | string | yes |  |
| `data.task_id` | integer (int64) | yes |  |
| `data.uom` | string or null | no | Empty = the SKU's default unit. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_observe",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "lot": "<lot>",
      "qty": 1,
      "sku_code": "<sku_code>",
      "task_id": 1
    }
  }
}'
```

### inventory_count_policy_create

Create a cycle-count policy: which locations, how often, how many a run.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_create` |
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
| `data` | object (CreateCountPolicy) | yes |  |
| `data.abc` | string or null | no | `A`, `B` or `C`. |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items or null | no | `Locations` (default) or `Items` (count spec Appendix H). |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed or null | no | `Blind` (default) or `Informed`. |
| `data.daily_limit` | integer (int32) or null | no | At most this many locations a run. |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft or null | no | `Hard` (default) or `Soft` (count spec Appendix F). |
| `data.frequency_days` | integer (int32) or null | no | Count a location every this many days. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.is_active` | boolean or null | no | Default `true`. |
| `data.loc_type` | string or null | no | A location type as `location.loc_type` spells it (`Case`, `Pick`, …). |
| `data.max_recounts` | integer (int16) or null | no | Recounts per location in the counts it makes (default 2). |
| `data.putawayzone` | string or null | no | Scope — at least one of the four. |
| `data.sku_abc` | string or null | no | `Items`: the SKUs' ABC class, `A`, `B` or `C`. |
| `data.sku_group` | string or null | no | `Items`: the SKUs' group. |
| `data.trust_empty_confirmation` | boolean or null | no | A location confirmed empty in passing counts as checked (count spec Appendix L.6). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountPolicy }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_policy_create",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "code": "<code>"
    }
  }
}'
```

### inventory_count_policy_delete

Delete a cycle-count policy, on the version read; the counts it made stay.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count_policy`: send `expected_version` for row `policy_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeleteCountPolicy) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.policy_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountPolicy }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_policy_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "policy_id": 1
    }
  }
}'
```

### inventory_count_policy_get

Get one cycle-count policy, flat, as its card loads it.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CountPolicyCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.saved` | boolean | yes | Always `true` on a read: only a saved policy can be read. |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_policy_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_policy_list

List cycle-count policies (by code, active).

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [InventoryCountPolicy] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].abc` | one of: A \| B \| C or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].aisle` | string or null | no |  |
| `data[].basis` | one of: Locations \| Items | yes |  |
| `data[].code` | string | yes |  |
| `data[].count_mode` | one of: Blind \| Informed | yes |  |
| `data[].daily_limit` | integer (int32) | yes |  |
| `data[].description` | string or null | no |  |
| `data[].freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data[].frequency_days` | integer (int32) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].last_run_on` | string or null | no |  |
| `data[].loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data[].max_recounts` | integer (int16) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].putawayzone` | string or null | no |  |
| `data[].sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data[].sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data[].trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
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
  "method": "inventory_count_policy_list",
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

### inventory_count_policy_run

Run a cycle-count policy now: start a count of the locations it finds due.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_run` |
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
| `data` | object (RunCountPolicy) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.policy_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": PolicyRun }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count` | object (InventoryCountView) or null | no | The count it started; `None` when nothing was due (or the scheduler found the policy already run today). |
| `data.count.header` | object (InventoryCount) | yes |  |
| `data.count.summary` | string | yes | Where the count stands, in words. |
| `data.count.tasks` | array of object (InventoryCountTask) | yes |  |
| `data.message` | string | yes | What happened, in words. |
| `data.policy` | object (InventoryCountPolicy) | yes |  |
| `data.policy.abc` | one of: A \| B \| C or null | no |  |
| `data.policy.add_when` | string | yes |  |
| `data.policy.add_who` | integer (int64) | yes |  |
| `data.policy.aisle` | string or null | no |  |
| `data.policy.basis` | one of: Locations \| Items | yes |  |
| `data.policy.code` | string | yes |  |
| `data.policy.count_mode` | one of: Blind \| Informed | yes |  |
| `data.policy.daily_limit` | integer (int32) | yes |  |
| `data.policy.description` | string or null | no |  |
| `data.policy.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.policy.frequency_days` | integer (int32) | yes |  |
| `data.policy.id` | integer (int64) | yes |  |
| `data.policy.is_active` | boolean | yes |  |
| `data.policy.last_run_on` | string or null | no |  |
| `data.policy.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.policy.max_recounts` | integer (int16) | yes |  |
| `data.policy.mod_when` | string | yes |  |
| `data.policy.mod_who` | integer (int64) | yes |  |
| `data.policy.putawayzone` | string or null | no |  |
| `data.policy.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.policy.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.policy.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.policy.version` | integer (int32) | yes |  |

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
      "message": "<message>",
      "policy": {
        "add_when": "<add_when>",
        "add_who": 1,
        "basis": "Locations",
        "code": "<code>",
        "count_mode": "Blind",
        "daily_limit": 1,
        "freeze_mode": "Hard",
        "frequency_days": 1,
        "id": 1,
        "is_active": false,
        "max_recounts": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "trust_empty_confirmation": false,
        "version": 1
      }
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
  "method": "inventory_count_policy_run",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "policy_id": 1
    }
  }
}'
```

### inventory_count_policy_save

Change a cycle-count policy, on the version read.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_policy_save` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count_policy`: send `expected_version` for row `policy_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SaveCountPolicy) | yes |  |
| `data.abc` | string or null | no | `A`, `B` or `C`. |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items or null | no | `Locations` (default) or `Items` (count spec Appendix H). |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed or null | no | `Blind` (default) or `Informed`. |
| `data.daily_limit` | integer (int32) or null | no | At most this many locations a run. |
| `data.description` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.freeze_mode` | one of: Hard \| Soft or null | no | `Hard` (default) or `Soft` (count spec Appendix F). |
| `data.frequency_days` | integer (int32) or null | no | Count a location every this many days. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.is_active` | boolean or null | no | Default `true`. |
| `data.loc_type` | string or null | no | A location type as `location.loc_type` spells it (`Case`, `Pick`, …). |
| `data.max_recounts` | integer (int16) or null | no | Recounts per location in the counts it makes (default 2). |
| `data.policy_id` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no | Scope — at least one of the four. |
| `data.sku_abc` | string or null | no | `Items`: the SKUs' ABC class, `A`, `B` or `C`. |
| `data.sku_group` | string or null | no | `Items`: the SKUs' group. |
| `data.trust_empty_confirmation` | boolean or null | no | A location confirmed empty in passing counts as checked (count spec Appendix L.6). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountPolicy }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_policy_save",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "code": "<code>",
      "policy_id": 1
    }
  }
}'
```

### inventory_count_recount

Have a location with a variance counted again, as a new attempt.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_recount` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count_task`: send `expected_version` for row `task_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (RecountCountTask) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_recount",
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

### inventory_count_remove_location

Take a location nobody counted off a count; it thaws.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_remove_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `inventory_count_task`: send `expected_version` for row `task_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (RemoveCountLocation) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": InventoryCountView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (InventoryCount) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.cancelled_at` | string or null | no |  |
| `data.header.closed_at` | string or null | no |  |
| `data.header.comment` | string or null | no |  |
| `data.header.count_mode` | one of: Blind \| Informed | yes |  |
| `data.header.count_number` | string | yes |  |
| `data.header.count_type` | one of: Full \| Cycle \| Selective \| Event | yes |  |
| `data.header.freeze_mode` | one of: Hard \| Soft | yes |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.item_containers` | array of integer (int64) | yes |  |
| `data.header.item_lots` | array of string | yes |  |
| `data.header.item_skus` | array of string | yes | The count's item (Appendix G): an empty list is "not named". |
| `data.header.max_recounts` | integer (int16) | yes | How many times one location may be recounted (attempts = 1 + this). |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.recount_by_other_counter` | boolean | yes |  |
| `data.header.scope_mode` | one of: LocationFull \| IdentitySubset | yes |  |
| `data.header.source_id` | integer (int64) or null | no |  |
| `data.header.source_type` | string | yes |  |
| `data.header.status` | one of: Open \| Closed \| Cancelled | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the count stands, in words. |
| `data.tasks` | array of object (InventoryCountTask) | yes |  |
| `data.tasks[].add_when` | string | yes |  |
| `data.tasks[].add_who` | integer (int64) | yes |  |
| `data.tasks[].adjustment_id` | integer (int64) or null | no |  |
| `data.tasks[].attempt_no` | integer (int32) | yes |  |
| `data.tasks[].auto_accepted` | boolean | no |  |
| `data.tasks[].counted_at` | string or null | no |  |
| `data.tasks[].counted_by` | integer (int64) or null | no |  |
| `data.tasks[].decided_at` | string or null | no |  |
| `data.tasks[].decided_by` | integer (int64) or null | no |  |
| `data.tasks[].empty_confirmed` | boolean | yes |  |
| `data.tasks[].id` | integer (int64) | yes |  |
| `data.tasks[].inventory_count_id` | integer (int64) | yes |  |
| `data.tasks[].location` | string | yes |  |
| `data.tasks[].mod_when` | string | yes |  |
| `data.tasks[].mod_who` | integer (int64) | yes |  |
| `data.tasks[].recount_of_task_id` | integer (int64) or null | no |  |
| `data.tasks[].snapshot_at` | string | yes |  |
| `data.tasks[].status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data.tasks[].variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data.tasks[].variance_comment` | string or null | no |  |
| … | | | 1 more fields. See `openrpc.json`. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "count_mode": "Blind",
        "count_number": "<count_number>",
        "count_type": "Full",
        "freeze_mode": "Hard",
        "id": 1,
        "item_containers": [
          1
        ],
        "item_lots": [
          "<item_lots>"
        ],
        "item_skus": [
          "<item_skus>"
        ],
        "max_recounts": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "recount_by_other_counter": false,
        "scope_mode": "LocationFull",
        "source_type": "<source_type>",
        "status": "Open",
        "version": 1
      },
      "summary": "<summary>",
      "tasks": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attempt_no": 1,
          "empty_confirmed": false,
          "id": 1,
          "inventory_count_id": 1,
          "location": "<location>",
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "snapshot_at": "<snapshot_at>",
          "status": "Open",
          "version": 1
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
  "method": "inventory_count_remove_location",
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

### inventory_count_task_at_location

The counter is at the location given to them: scanning it starts (or resumes) its count.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_task_at_location` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (ConfirmCountLocation) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.location` | string | yes | The location scanned. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_task_at_location",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "location": "<location>"
    }
  }
}'
```

### inventory_count_task_card_get

Get one count task flat: location, attempt, status, how many lines differ, whether a recount is allowed.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_task_card_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CountTaskRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.adjustment_id` | integer (int64) or null | no |  |
| `data.attempt_no` | integer (int32) | yes |  |
| `data.auto_accepted` | boolean | no |  |
| `data.counted_at` | string or null | no |  |
| `data.counted_by` | integer (int64) or null | no |  |
| `data.decided_at` | string or null | no |  |
| `data.decided_by` | integer (int64) or null | no |  |
| `data.differences` | integer (int32) | yes | Identities that did not match; 0 until the task is counted. |
| `data.empty_confirmed` | boolean | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_count_id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.recount_allowed` | boolean | yes | Whether the count's `max_recounts` still lets this location be counted again. |
| `data.recount_of_task_id` | integer (int64) or null | no |  |
| `data.snapshot_at` | string | yes |  |
| `data.status` | one of: Open \| Variance \| Closed \| Recounted \| Cancelled | yes |  |
| `data.variance_cause` | string or null | no | ADR-093 (wms-app 132): why the accepted variance happened — a code of the `count_variance_cause` list — with what the supervisor added, and whether the accept was the system's own within tolerance. |
| `data.variance_comment` | string or null | no |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "inventory_count_task_card_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_task_get

One location's count; a blind count hides the system quantity until counted.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_task_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": CountTaskView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_task_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_task_leave

Leave the location being counted for later: it goes back to the pool.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_task_leave` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (LeaveCountLocation) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountLocationLeft }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.location` | string | yes |  |
| `data.message` | string | yes |  |
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
      "location": "<location>",
      "message": "<message>",
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
  "method": "inventory_count_task_leave",
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

### inventory_count_task_take_next

Give the counter their next location to count: in the work area named, or across the areas they may count in.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_task_take_next` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (TakeNextCountLocation) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.work_area_code` | string or null | no | The work area scanned; blank or absent — the whole warehouse. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_task_take_next",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {}
  }
}'
```

### inventory_count_tolerance_get

Count variance tolerances: one class's, as its card loads it.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_tolerance_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": InventoryCountTolerance }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C | yes | Loc/Sku Abc - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`) because `CandidateFilter::loc_abc` (phase 2a) holds a `PropRule<AbcRotationSpeed>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.approval_value` | number (double) or null | no | A task's variance worth more than this is accepted only with `inventory_count.accept_large_variance`. |
| `data.auto_pct` | number (double) or null | no | …and by at most this percent of what was expected… |
| `data.auto_qty` | number (double) or null | no | Accepted on its own when the line differs by at most this many units… |
| `data.auto_value` | number (double) or null | no | …and its value is at most this. |
| `data.id` | integer (int64) | yes |  |
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
      "abc": "A",
      "id": 1,
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
  "method": "inventory_count_tolerance_get",
  "params": {
    "id": 1
  }
}'
```

### inventory_count_tolerance_list

Count variance tolerances: every SKU ABC class's, A to C.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `inventory_count_tolerance_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

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

The `result` member of the response is: `{ "data": [InventoryCountTolerance] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].abc` | one of: A \| B \| C | yes | Loc/Sku Abc - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`) because `CandidateFilter::loc_abc` (phase 2a) holds a `PropRule<AbcRotationSpeed>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data[].approval_value` | number (double) or null | no | A task's variance worth more than this is accepted only with `inventory_count.accept_large_variance`. |
| `data[].auto_pct` | number (double) or null | no | …and by at most this percent of what was expected… |
| `data[].auto_qty` | number (double) or null | no | Accepted on its own when the line differs by at most this many units… |
| `data[].auto_value` | number (double) or null | no | …and its value is at most this. |
| `data[].id` | integer (int64) | yes |  |
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
  "method": "inventory_count_tolerance_list",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### inventory_count_void_observation

Take back one recorded entry of the location being counted.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `inventory_count_void_observation` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (VoidCountObservation) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.observation_id` | integer (int64) | yes |  |
| `data.task_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CountTaskView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.count_number` | string | yes |  |
| `data.count_only` | string or null | no | What the counter counts here, in words, when it is not the whole location — a count of the item (Appendix G): "SKU A; lot L1". |
| `data.expected` | array of object (InventoryCountSnapshot) or null | no | The stock the location is counted against — `None` while a blind count is being counted (spec §8, AC-03). |
| `data.expected[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.expected[].expected_qty` | number (double) | yes |  |
| `data.expected[].id` | integer (int64) | yes |  |
| `data.expected[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.expected[].lot` | string | yes |  |
| `data.expected[].owner_id` | integer (int64) | yes |  |
| `data.expected[].pack_id` | integer (int64) | yes |  |
| `data.expected[].sku_code` | string | yes |  |
| `data.expected[].uom` | string | yes |  |
| `data.observations` | array of object (InventoryCountObservation) | yes | What the counter recorded, voided rows included (history, spec §29). |
| `data.observations[].add_when` | string | yes |  |
| `data.observations[].add_who` | integer (int64) | yes |  |
| `data.observations[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.observations[].id` | integer (int64) | yes |  |
| `data.observations[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.observations[].lot` | string | yes |  |
| `data.observations[].observed_qty` | number (double) | yes |  |
| `data.observations[].owner_id` | integer (int64) | yes |  |
| `data.observations[].pack_id` | integer (int64) | yes |  |
| `data.observations[].sku_code` | string | yes |  |
| `data.observations[].uom` | string | yes |  |
| `data.observations[].voided_at` | string or null | no |  |
| `data.observations[].voided_by` | integer (int64) or null | no |  |
| `data.results` | array of object (InventoryCountResult) | yes | What completing the task found; empty until it is counted. |
| `data.results[].container_id` | integer (int64) or null | no | `None` = loose stock. |
| `data.results[].expected_qty` | number (double) | yes |  |
| `data.results[].id` | integer (int64) | yes |  |
| `data.results[].inventory_count_task_id` | integer (int64) | yes |  |
| `data.results[].lot` | string | yes |  |
| `data.results[].movement_qty` | number (double) | yes | The part of `expected_qty` the stock deltas between the snapshot and the completion made (a `Soft` count); 0 otherwise. |
| `data.results[].observed_qty` | number (double) | yes |  |
| `data.results[].owner_id` | integer (int64) | yes |  |
| `data.results[].pack_id` | integer (int64) | yes |  |
| `data.results[].result_type` | one of: Match \| QtyVariance \| ExpectedButMissing \| UnexpectedFound \| SerialMismatch | yes |  |
| `data.results[].sku_code` | string | yes |  |
| `data.results[].uom` | string | yes |  |
| `data.stock_moved_under_count` | boolean | yes | A shift lead let an operation move stock under this count while it was frozen (owner's decision 2026-10-21 §6, `inventory_count_disturbance`). |
| `data.system_stock` | array of object (SystemStockLine) or null | no | What the system holds here now, for the counter of an `Informed` count's first attempt while it is counted (count spec §8); `None` otherwise. |
| `data.system_stock[].lot` | string | yes |  |
| `data.system_stock[].lpn` | string or null | no | The container's code; `None` = loose stock. |
| `data.system_stock[].qty` | number (double) | yes |  |
| … | | | 23 more fields. See `openrpc.json`. |

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
      "count_mode": "Blind",
      "count_number": "<count_number>",
      "observations": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "results": [
        {
          "expected_qty": 1,
          "id": 1,
          "inventory_count_task_id": 1,
          "lot": "<lot>",
          "movement_qty": 1,
          "observed_qty": 1,
          "owner_id": 1,
          "pack_id": 1,
          "result_type": "Match",
          "sku_code": "<sku_code>",
          "uom": "<uom>"
        }
      ],
      "stock_moved_under_count": false,
      "task": {
        "add_when": "<add_when>",
        "add_who": 1,
        "attempt_no": 1,
        "empty_confirmed": false,
        "id": 1,
        "inventory_count_id": 1,
        "location": "<location>",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "snapshot_at": "<snapshot_at>",
        "status": "Open",
        "version": 1
      }
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
  "method": "inventory_count_void_observation",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "observation_id": 1,
      "task_id": 1
    }
  }
}'
```

### location_checks

Every check of a location, the latest first: its counts and every answer to "is it empty?" — when, who, what it came to, which operation asked.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `location_checks` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].location` | string filter | no | Filter on `location`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LocationCheck] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].check_kind` | string | yes | `Count`, or what the answer was against the stock: `ConfirmedEmpty` / `DeniedEmpty` / `EmptyAgainstStock`; or `UnexpectedStock`, an operator's report (Appendix M). |
| `data[].checked_at` | string | yes |  |
| `data[].id` | string | yes | `C<task id>` for a count, `E<evidence id>` for an answer: one key across both. |
| `data[].location` | string | yes |  |
| `data[].operator` | string or null | no | The operator's login, or `#<id>` for one the warehouse no longer has. |
| `data[].outcome` | string or null | no | A count: its task's status (`Closed`, `Variance`, `Recounted` …). |
| `data[].source` | string | yes | Which operation: the count's number and attempt (`INV-12 / 2`), the one that asked (`PickCommit #701`), or a report with what it named (`Report: LPN L-7 / SKU SKU002`). |
| `data[].system_qty` | number (double) or null | no | An answer: what the location held when it came (`SUM(qty)`). |

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
  "method": "location_checks",
  "params": {
    "filters": [
      {
        "location": "<location>"
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### location_confirm_empty

Answer whether a location is empty, where an operation asked: kept as evidence; an answer the stock contradicts asks for a count.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `location_confirm_empty` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (ConfirmLocationEmpty) | yes |  |
| `data.empty` | boolean | yes | `true` — the operator sees nothing there; `false` — stock is left. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.location` | string | yes |  |
| `data.source_id` | integer (int64) or null | no | The operation that asked: the pick for `PickCommit`, the move's first `transaction_log` row for `Move`. |
| `data.source_type` | one of: PickCommit \| Move \| Report | yes | Where the question was asked. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LocationEmptyAnswer }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_requested` | boolean | yes | The answer and the stock disagree: the location will be counted. |
| `data.evidence_id` | integer (int64) or null | no | The evidence kept; `None` when the answer said nothing worth keeping ("not empty" where the stock holds something). |
| `data.kind` | one of: ConfirmedEmpty \| DeniedEmpty \| EmptyAgainstStock \| UnexpectedStock or null | no |  |
| `data.location` | string | yes |  |

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
      "count_requested": false,
      "location": "<location>"
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
  "method": "location_confirm_empty",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "empty": false,
      "location": "<location>",
      "source_type": "PickCommit"
    }
  }
}'
```

### location_report_unexpected

Report stock the system does not show at a location: kept as evidence, and the location is counted.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `location_report_unexpected` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (ReportUnexpectedStock) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.location` | string | yes |  |
| `data.lpn` | string or null | no | The LPN the operator sees there, as scanned. |
| `data.note` | string or null | no | Anything else they want to say. |
| `data.sku` | string or null | no | The SKU the operator sees there. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": UnexpectedStockReport }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.count_requested` | boolean | yes | Always true: a report always asks for the location to be counted. |
| `data.evidence_id` | integer (int64) | yes |  |
| `data.location` | string | yes |  |
| `data.system_qty` | number (double) | yes | What the stock held at the location when the report came. |

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
      "count_requested": false,
      "evidence_id": 1,
      "location": "<location>",
      "system_qty": 1
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
  "method": "location_report_unexpected",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "location": "<location>"
    }
  }
}'
```

### update_inventory_count_policy

Save a cycle-count policy's form, on the version read.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_inventory_count_policy` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `inventory_count_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (CountPolicyChange) | yes | What a saved form changed — `generic_save` sends only the fields the person touched. |
| `data.data.abc` | string or null | no |  |
| `data.data.aisle` | string or null | no |  |
| `data.data.basis` | one of: Locations \| Items or null | no |  |
| `data.data.code` | string or null | no |  |
| `data.data.count_mode` | one of: Blind \| Informed or null | no |  |
| `data.data.daily_limit` | integer (int32) or null | no |  |
| `data.data.description` | string or null | no |  |
| `data.data.freeze_mode` | one of: Hard \| Soft or null | no |  |
| `data.data.frequency_days` | integer (int32) or null | no |  |
| `data.data.is_active` | boolean or null | no |  |
| `data.data.loc_type` | string or null | no |  |
| `data.data.max_recounts` | integer (int16) or null | no |  |
| `data.data.putawayzone` | string or null | no |  |
| `data.data.sku_abc` | string or null | no |  |
| `data.data.sku_group` | string or null | no |  |
| `data.data.trust_empty_confirmation` | boolean or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": InventoryCountPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.aisle` | string or null | no |  |
| `data.basis` | one of: Locations \| Items | yes |  |
| `data.code` | string | yes |  |
| `data.count_mode` | one of: Blind \| Informed | yes |  |
| `data.daily_limit` | integer (int32) | yes |  |
| `data.description` | string or null | no |  |
| `data.freeze_mode` | one of: Hard \| Soft | yes | `Hard` freezes the locations the policy's counts count; `Soft` lets stock move (count spec Appendix F). |
| `data.frequency_days` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.last_run_on` | string or null | no |  |
| `data.loc_type` | one of: None \| Other \| Case \| Pick \| Pnd \| Door \| Pickto \| Sort \| SpeedPick \| QC \| Damage \| Rtv \| … (+7) or null | no |  |
| `data.max_recounts` | integer (int16) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.putawayzone` | string or null | no |  |
| `data.sku_abc` | one of: A \| B \| C or null | no | `Items`: the SKUs of this ABC class (`sku.abc`). |
| `data.sku_group` | string or null | no | `Items`: the SKUs of this group (`sku.sku_group`). |
| `data.trust_empty_confirmation` | boolean | yes | A location confirmed empty in passing counts as checked then (count spec Appendix L.6). |
| `data.version` | integer (int32) | yes |  |

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
  "method": "update_inventory_count_policy",
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

### update_inventory_count_tolerance

Count variance tolerances: save a class's card, on the version read.

| | |
|---|---|
| Context / module | inventory / inventory_count |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_inventory_count_tolerance` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `inventory_count_tolerance`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (ToleranceChange) | yes | What a saved card changed — `generic_save` sends only the fields the person touched. |
| `data.data.approval_value` | number (double) or null | no |  |
| `data.data.auto_pct` | number (double) or null | no |  |
| `data.data.auto_qty` | number (double) or null | no |  |
| `data.data.auto_value` | number (double) or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": InventoryCountTolerance }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.abc` | one of: A \| B \| C | yes | Loc/Sku Abc - dependent type, code_list_value `PartialEq`/`Eq` are unconditional (not `cfg(test)`) because `CandidateFilter::loc_abc` (phase 2a) holds a `PropRule<AbcRotationSpeed>`, and `CandidateFilter` derives `PartialEq, Eq` outside test code too. |
| `data.approval_value` | number (double) or null | no | A task's variance worth more than this is accepted only with `inventory_count.accept_large_variance`. |
| `data.auto_pct` | number (double) or null | no | …and by at most this percent of what was expected… |
| `data.auto_qty` | number (double) or null | no | Accepted on its own when the line differs by at most this many units… |
| `data.auto_value` | number (double) or null | no | …and its value is at most this. |
| `data.id` | integer (int64) | yes |  |
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
      "abc": "A",
      "id": 1,
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
  "method": "update_inventory_count_tolerance",
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

## Module: lot_transfer

### create_lot_transfer

Create a Draft lot transfer from its header form (number as New drew it, comment).

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_lot_transfer` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (HeaderFormNew) | yes | What the header form sends on create. |
| `data.comment` | string or null | no |  |
| `data.transfer_number` | string or null | no | What the new form showed: `generic_new` drew it from the counter. |

**Result**

The `result` member of the response is: `{ "data": LotTransferCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_count` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now — a Draft with at least one line, the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.status` | one of: Draft \| Posted | yes |  |
| `data.transfer_number` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
      "line_count": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "postable": false,
      "status": "Draft",
      "transfer_number": "<transfer_number>",
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
  "method": "create_lot_transfer",
  "params": {
    "data": {}
  }
}'
```

### create_lot_transfer_line

Add a line from the line form: the document and the stock row picked, a quantity, serials.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_lot_transfer_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LineFormNew) | yes | What the line form sends on create. |
| `data.balance_id` | integer (int64) | yes |  |
| `data.lot_transfer_id` | integer (int64) | yes |  |
| `data.qty` | number (double) or null | no | Empty = everything that is free of the row. |
| `data.serials` | string or null | no | A serial-tracked stock's serials, one a line. |

**Result**

The `result` member of the response is: `{ "data": LotTransferLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.available` | number (double) | yes | What is free of the line's stock right now — the line may ask for up to it; 0 when the stock row is gone. |
| `data.container_id` | integer (int64) or null | no |  |
| `data.editable` | boolean | yes | Whether the line's quantity and serials may still change — the line is `Pending`, i.e. |
| `data.from_lot` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lot_transfer_id` | integer (int64) | yes |  |
| `data.lpn` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.serials` | string or null | no | The serials the line names, one a line. |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Posted | yes |  |
| `data.to_lot` | string or null | no |  |
| `data.to_lot_created` | boolean or null | no |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "create_lot_transfer_line",
  "params": {
    "data": {
      "balance_id": 1,
      "lot_transfer_id": 1
    }
  }
}'
```

### get_lot_transfer_line

Get one lot transfer line as its form shows it (owner and container by code, quantity free now, serials).

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_lot_transfer_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotTransferLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.available` | number (double) | yes | What is free of the line's stock right now — the line may ask for up to it; 0 when the stock row is gone. |
| `data.container_id` | integer (int64) or null | no |  |
| `data.editable` | boolean | yes | Whether the line's quantity and serials may still change — the line is `Pending`, i.e. |
| `data.from_lot` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lot_transfer_id` | integer (int64) | yes |  |
| `data.lpn` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.serials` | string or null | no | The serials the line names, one a line. |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Posted | yes |  |
| `data.to_lot` | string or null | no |  |
| `data.to_lot_created` | boolean or null | no |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "get_lot_transfer_line",
  "params": {
    "id": 1
  }
}'
```

### lot_transfer_add_line

Add a line for a stock row (default: everything free of it), with its serials if tracked.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_add_line` |
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
| `data` | object (AddLotTransferLine) | yes |  |
| `data.balance_id` | integer (int64) | yes | The stock row, as the balances screen shows it. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.qty` | number (double) or null | no | `None` = everything that is free of the row. |
| `data.serials` | array of string or null | no | A serial-tracked stock's serials, when a part of it is taken. |
| `data.transfer_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_add_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "balance_id": 1,
      "transfer_id": 1
    }
  }
}'
```

### lot_transfer_card_get

Get one lot transfer's header, flat, with its line count and whether Post is accepted.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_card_get` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotTransferCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_count` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now — a Draft with at least one line, the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.status` | one of: Draft \| Posted | yes |  |
| `data.transfer_number` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
      "line_count": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "postable": false,
      "status": "Draft",
      "transfer_number": "<transfer_number>",
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
  "method": "lot_transfer_card_get",
  "params": {
    "id": 1
  }
}'
```

### lot_transfer_create

Create a Draft lot transfer (its number is drawn unless one is given).

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_create` |
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
| `data` | object (CreateLotTransfer) | yes |  |
| `data.comment` | string or null | no |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.transfer_number` | string or null | no | The number the new form already showed (its counter ran at New, as for receipts and orders); `None` = take the next one now. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_create",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {}
  }
}'
```

### lot_transfer_delete

Delete a lot transfer that was never posted, with its lines.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_delete` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer`: send `expected_version` for row `transfer_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (DeleteLotTransfer) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.transfer_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": DeletedLotTransfer }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.transfer_id` | integer (int64) | yes |  |
| `data.transfer_number` | string | yes |  |

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
      "transfer_id": 1,
      "transfer_number": "<transfer_number>"
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
  "method": "lot_transfer_delete",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "transfer_id": 1
    }
  }
}'
```

### lot_transfer_line_attribute_list

List the lot attributes lines give their stock, filtered by line, with the grid key and line version.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_line_attribute_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].detail_id` | integer filter | no | Filter on `detail_id`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LotTransferAttributeRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].attribute_code` | string | yes |  |
| `data[].detail_id` | integer (int64) | yes |  |
| `data[].from_value` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].label` | string or null | no |  |
| `data[].line_status` | one of: Pending \| Posted | yes |  |
| `data[].line_version` | integer (int32) | yes |  |
| `data[].lot_policy_attribute_id` | integer (int64) or null | no | `None` for the four dates (they are lot_policy columns, not rows). |
| `data[].pk` | string | yes |  |
| `data[].required` | boolean | yes |  |
| `data[].sort_order` | integer (int32) | yes |  |
| `data[].to_value` | string or null | no |  |

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
  "method": "lot_transfer_line_attribute_list",
  "params": {
    "filters": [
      {
        "detail_id": 1
      }
    ],
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### lot_transfer_line_list

List lot transfer lines with the owner, container and SKU names, filtered and sorted like any list (by document, LPN, owner).

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_line_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot_transfer_id` | integer filter | no | Filter on `lot_transfer_id`. |
| `filters[].sku_code` | string filter | no | Filter on `sku_code`. |
| `filters[].location` | string filter | no | Filter on `location`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].owner_code` | string filter | no | Filter on `owner_code`. |
| `filters[].lpn` | string filter | no | Filter on `lpn`. |
| `filters[].sku_descr` | string filter | no | Filter on `sku_descr`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LotTransferLineRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].container_id` | integer (int64) or null | no |  |
| `data[].from_lot` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].line_no` | integer (int32) | yes |  |
| `data[].location` | string | yes |  |
| `data[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data[].lot_transfer_id` | integer (int64) | yes |  |
| `data[].lpn` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_code` | string or null | no |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) | yes |  |
| `data[].qty` | number (double) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].sku_descr` | string or null | no |  |
| `data[].status` | one of: Pending \| Posted | yes |  |
| `data[].to_lot` | string or null | no |  |
| `data[].to_lot_created` | boolean or null | no |  |
| `data[].transaction_log_code` | string or null | no |  |
| `data[].uom` | string | yes |  |
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
  "method": "lot_transfer_line_list",
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

### lot_transfer_list

List lot transfers with the poster's name, filtered and sorted like any list (by status, number, poster).

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_list` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].transfer_number` | string filter | no | Filter on `transfer_number`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].posted_by_name` | string filter | no | Filter on `posted_by_name`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LotTransferListRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].comment` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].posted_at` | string or null | no |  |
| `data[].posted_by` | integer (int64) or null | no |  |
| `data[].posted_by_name` | string or null | no | The poster's full name, else their login; `None` for a Draft. |
| `data[].status` | one of: Draft \| Posted | yes |  |
| `data[].transfer_number` | string | yes |  |
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
  "method": "lot_transfer_list",
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

### lot_transfer_post

Post the transfer: move every line's stock into its new lot, all or nothing.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_post` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer`: send `expected_version` for row `transfer_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (PostLotTransfer) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.override_grant_id` | string (uuid) or null | no | (The code comment for this item is not in English. |
| `data.transfer_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_post",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "transfer_id": 1
    }
  }
}'
```

### lot_transfer_remove_line

Remove one line from a Draft lot transfer, on the line version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_remove_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer_detail`: send `expected_version` for row `line_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (RemoveLotTransferLine) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.line_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_remove_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "line_id": 1
    }
  }
}'
```

### lot_transfer_set_line_attributes

Set the lot attributes a line's stock is given, on the line version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_set_line_attributes` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer_detail`: send `expected_version` for row `line_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SetLotTransferLineAttributes) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.line_id` | integer (int64) | yes |  |
| `data.values` | object (map) | yes | Attribute code to its new "to" value; blank or `None` clears it. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LineAttributesSet }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.line_id` | integer (int64) | yes |  |
| `data.new_version` | integer (int32) | yes |  |

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
      "line_id": 1,
      "new_version": 1
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
  "method": "lot_transfer_set_line_attributes",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "line_id": 1,
      "values": {}
    }
  }
}'
```

### lot_transfer_update_header

Change a Draft lot transfer's comment, on the header version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_update_header` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer`: send `expected_version` for row `transfer_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (UpdateLotTransferHeader) | yes |  |
| `data.comment` | string or null | no | `None` = unchanged; blank text clears it. |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.transfer_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_update_header",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "transfer_id": 1
    }
  }
}'
```

### lot_transfer_update_line

Change one line's quantity (and serials), on the line version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_transfer_update_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | required |
| Version check | entity `lot_transfer_detail`: send `expected_version` for row `line_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (UpdateLotTransferLine) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.line_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.serials` | array of string or null | no | A serial-tracked stock's serials, named again as a whole; `None` keeps the ones the line names, an empty list names none. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": LotTransferView }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.header` | object (LotTransfer) | yes |  |
| `data.header.add_when` | string | yes |  |
| `data.header.add_who` | integer (int64) | yes |  |
| `data.header.comment` | string or null | no |  |
| `data.header.id` | integer (int64) | yes |  |
| `data.header.mod_when` | string | yes |  |
| `data.header.mod_who` | integer (int64) | yes |  |
| `data.header.posted_at` | string or null | no |  |
| `data.header.posted_by` | integer (int64) or null | no |  |
| `data.header.status` | one of: Draft \| Posted | yes |  |
| `data.header.transfer_number` | string | yes |  |
| `data.header.version` | integer (int32) | yes |  |
| `data.lines` | array of object (LotTransferDetail) | yes |  |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].container_id` | integer (int64) or null | no |  |
| `data.lines[].from_lot` | string | yes |  |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].line_no` | integer (int32) | yes |  |
| `data.lines[].location` | string | yes |  |
| `data.lines[].lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lines[].lot_transfer_id` | integer (int64) | yes |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) | yes |  |
| `data.lines[].qty` | number (double) | yes |  |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].status` | one of: Pending \| Posted | yes |  |
| `data.lines[].to_lot` | string or null | no |  |
| `data.lines[].to_lot_created` | boolean or null | no |  |
| `data.lines[].transaction_log_code` | string or null | no |  |
| `data.lines[].uom` | string | yes |  |
| `data.lines[].version` | integer (int32) | yes |  |
| `data.summary` | string | yes | Where the document stands, in words — what the screen says after a command. |

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
      "header": {
        "add_when": "<add_when>",
        "add_who": 1,
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "status": "Draft",
        "transfer_number": "<transfer_number>",
        "version": 1
      },
      "lines": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "from_lot": "<from_lot>",
          "id": 1,
          "line_no": 1,
          "location": "<location>",
          "lot_policy_id": 1,
          "lot_transfer_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "qty": 1,
          "sku_code": "<sku_code>",
          "status": "Pending",
          "uom": "<uom>",
          "version": 1
        }
      ],
      "summary": "<summary>"
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
  "method": "lot_transfer_update_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "line_id": 1,
      "qty": 1
    }
  }
}'
```

### update_lot_transfer

Save a lot transfer's header form: the comment, on the version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_lot_transfer` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `lot_transfer`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (HeaderFormChange) | yes | What the header form sends on save: only what changed. |
| `data.data.comment` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotTransferCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.comment` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_count` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.postable` | boolean | yes | Whether Post would be accepted now — a Draft with at least one line, the command's own rule, so Post greys exactly when the server would refuse it. |
| `data.posted_at` | string or null | no |  |
| `data.posted_by` | integer (int64) or null | no |  |
| `data.status` | one of: Draft \| Posted | yes |  |
| `data.transfer_number` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
      "line_count": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "postable": false,
      "status": "Draft",
      "transfer_number": "<transfer_number>",
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
  "method": "update_lot_transfer",
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

### update_lot_transfer_line

Save a line form: quantity and serials, on the line's version read.

| | |
|---|---|
| Context / module | inventory / lot_transfer |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_lot_transfer_line` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR |
| Idempotency key | not stated in the catalog |
| Version check | entity `lot_transfer_detail`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (LineFormChange) | yes | What the line form sends on save: only what changed. |
| `data.data.qty` | number (double) or null | no |  |
| `data.data.serials` | string or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotTransferLineCard }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.available` | number (double) | yes | What is free of the line's stock right now — the line may ask for up to it; 0 when the stock row is gone. |
| `data.container_id` | integer (int64) or null | no |  |
| `data.editable` | boolean | yes | Whether the line's quantity and serials may still change — the line is `Pending`, i.e. |
| `data.from_lot` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.line_no` | integer (int32) | yes |  |
| `data.location` | string | yes |  |
| `data.lot_policy_id` | integer (int64) | yes | The SKU's lot policy when the line was added; POST refuses the line when the policy is another one now. |
| `data.lot_transfer_id` | integer (int64) | yes |  |
| `data.lpn` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_code` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.serials` | string or null | no | The serials the line names, one a line. |
| `data.sku_code` | string | yes |  |
| `data.status` | one of: Pending \| Posted | yes |  |
| `data.to_lot` | string or null | no |  |
| `data.to_lot_created` | boolean or null | no |  |
| `data.transaction_log_code` | string or null | no |  |
| `data.uom` | string | yes |  |
| `data.version` | integer (int32) | yes |  |

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
  "method": "update_lot_transfer_line",
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

## Module: lot_by_attributes

### lot_attribute_template

What a SKU's lot policy asks for: prompts to search a lot by and to create one with.

| | |
|---|---|
| Context / module | inventory / lot_by_attributes |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_attribute_template` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LotSkuInput) | yes | A SKU, and its owner when the code is several owners'. |
| `data.owner_code` | string or null | no |  |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotAttributeTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.ask_receipt` | boolean | yes | Whether the search asks the receipt number on the label: only under a «one lot per receipt» / «one lot per receive event» policy, where lots of the same attributes are many by design and the receipt is what tells them apart. |
| `data.create_prompts` | array of object (LotPrompt) | yes |  |
| `data.create_prompts[].attrib_code` | string | yes |  |
| `data.create_prompts[].descr` | string or null | no |  |
| `data.create_prompts[].label` | string or null | no |  |
| `data.create_prompts[].required` | boolean | yes |  |
| `data.create_prompts[].show` | boolean | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.search_prompts` | array of object (LotPrompt) | yes |  |
| `data.search_prompts[].attrib_code` | string | yes |  |
| `data.search_prompts[].descr` | string or null | no |  |
| `data.search_prompts[].label` | string or null | no |  |
| `data.search_prompts[].required` | boolean | yes |  |
| `data.search_prompts[].show` | boolean | yes |  |
| `data.sku_code` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "ask_receipt": false,
      "create_prompts": [
        {
          "attrib_code": "<attrib_code>",
          "required": false,
          "show": false
        }
      ],
      "owner_id": 1,
      "search_prompts": [
        {
          "attrib_code": "<attrib_code>",
          "required": false,
          "show": false
        }
      ],
      "sku_code": "<sku_code>"
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
  "method": "lot_attribute_template",
  "params": {
    "data": {
      "sku_code": "<sku_code>"
    }
  }
}'
```

### lot_create_by_attributes

A lot of these attributes, made as the SKU's lot policy says: the matching one or a new one (reuse), always a new one (per receipt, per receive event).

| | |
|---|---|
| Context / module | inventory / lot_by_attributes |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_create_by_attributes` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
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
| `data` | object (CreateLotByAttributes) | yes | `create_new_lot_by_attrs` as a command: stateless (the person creates the lot whatever he saw before — it is what is in his hand), keyed for replay. |
| `data.idempotency_key` | string (uuid) | no |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_code` | string or null | no |  |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": NewLot }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.created` | boolean | yes | `false` when, under a «reuse matching lot» policy, a lot with exactly these attributes already existed — it is returned instead of a second. |
| `data.lot` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |

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
      "created": false,
      "lot": "<lot>",
      "owner_id": 1,
      "sku_code": "<sku_code>"
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
  "method": "lot_create_by_attributes",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "sku_code": "<sku_code>"
    }
  }
}'
```

### lot_search_by_attributes

A SKU's lots matching the attributes and the receipt given, each with its receipts (no quantities); creates nothing.

| | |
|---|---|
| Context / module | inventory / lot_by_attributes |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_search_by_attributes` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LotSearchInput) | yes | A SKU and what a person could read off the goods: the lot's attributes, and the receipt number its label carries. |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_code` | string or null | no |  |
| `data.receipt_number` | string or null | no |  |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": [LotFound] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].attributes` | object (map) | yes |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].label` | string | yes | One line for a picker: the number, the receipt and its day, then each attribute the lot has. |
| `data[].lot` | string | yes |  |
| `data[].manufactured_date` | string or null | no |  |
| `data[].other_receipts` | integer (int64) | yes | How many other receipts brought it. |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt` | string or null | no | The receipt the lot came in on — the one searched by, else its latest: what tells apart lots of the same attributes under a «lot per receipt» / «lot per receive event» policy (and the only thing that does for a SKU without any). |
| `data[].received_on` | string or null | no | The day `receipt` brought it. |
| `data[].sku_code` | string | yes |  |

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
  "method": "lot_search_by_attributes",
  "params": {
    "data": {
      "sku_code": "<sku_code>"
    }
  }
}'
```

## Module: barcode_scan

### barcode_scan_parse

Read one scan with the auto-detected barcode formats: the format that claimed it and its normalized values (GTIN, LPN, serial, internal lot, location, lot attributes).

| | |
|---|---|
| Context / module | inventory / barcode_scan |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `barcode_scan_parse` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ScanToRead) | yes | The scan as the terminal holds it: AIM symbology prefix and GS separators included. |
| `data.raw` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": ScanReading }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.format` | string or null | no | The claiming format's name; `None` for a scan no format claims. |
| `data.plain` | string or null | no | A scan no format claims: its code, trimmed and without the AIM symbology identifier a scanner may send for every label (`]E0` + EAN-13 is the EAN-13). |
| `data.values` | array of object (ScanValue) | yes |  |
| `data.values[].element` | string | yes | `lpn`, `gtin`, `internal_lot`, `serial`, `location`, or a lot attribute's code. |
| `data.values[].value` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "values": [
        {
          "element": "<element>",
          "value": "<value>"
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "barcode_scan_parse",
  "params": {
    "data": {
      "raw": "<raw>"
    }
  }
}'
```
