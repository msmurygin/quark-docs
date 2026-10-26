# Inbound methods

Receiving: ASNs and receipts, receipt lines, damage, case-level receiving, receipt policies and lot policies.

This page documents 119 methods of the `inbound` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **lot_policy**: [get_lot_policy](#get_lot_policy), [list_lot_policy](#list_lot_policy), [delete_lot_policy](#delete_lot_policy), [delete_many_lot_policy](#delete_many_lot_policy), [count_lot_policy](#count_lot_policy), [get_lot_policy_attribute](#get_lot_policy_attribute), [list_lot_policy_attribute](#list_lot_policy_attribute), [count_lot_policy_attribute](#count_lot_policy_attribute), [lot_policy_config_view](#lot_policy_config_view), [lot_policy_config_template](#lot_policy_config_template), [get_lot_policy_attribute_form](#get_lot_policy_attribute_form), [lot_policy_config_create](#lot_policy_config_create), [lot_policy_config_save](#lot_policy_config_save), [create_lot_policy_form](#create_lot_policy_form), [update_lot_policy_form](#update_lot_policy_form), [create_lot_policy_attribute_form](#create_lot_policy_attribute_form), [update_lot_policy_attribute_form](#update_lot_policy_attribute_form), [delete_lot_policy_attribute_form](#delete_lot_policy_attribute_form), [delete_many_lot_policy_attribute_form](#delete_many_lot_policy_attribute_form)
- **receipt_policy**: [create_receipt_policy](#create_receipt_policy), [get_receipt_policy](#get_receipt_policy), [list_receipt_policy](#list_receipt_policy), [update_receipt_policy](#update_receipt_policy), [delete_receipt_policy](#delete_receipt_policy), [delete_many_receipt_policy](#delete_many_receipt_policy), [count_receipt_policy](#count_receipt_policy)
- **receipt**: [create_receipt](#create_receipt), [get_receipt](#get_receipt), [list_receipt](#list_receipt), [update_receipt](#update_receipt), [delete_receipt](#delete_receipt), [delete_many_receipt](#delete_many_receipt), [count_receipt](#count_receipt), [find_receipt_by_number](#find_receipt_by_number), [find_receipt_by_rma](#find_receipt_by_rma), [find_receipt_line_by_sku](#find_receipt_line_by_sku), [validate_lpn_unused](#validate_lpn_unused), [find_printer_for_context](#find_printer_for_context), [get_receipt_summary](#get_receipt_summary), [get_receipt_full](#get_receipt_full), [get_sku_envelope](#get_sku_envelope), [assign_lpn](#assign_lpn), [get_owner_damage_policy](#get_owner_damage_policy), [list_my_open_receipts](#list_my_open_receipts), [get_receipt_hold_history](#get_receipt_hold_history), [get_receipt_detail_history](#get_receipt_detail_history), [get_close_blockers](#get_close_blockers), [get_cancel_blockers](#get_cancel_blockers), [lookup_asn](#lookup_asn), [search_asns](#search_asns), [get_asn_by_number](#get_asn_by_number), [list_open_blind_receipts](#list_open_blind_receipts), [list_damage_severity_codes](#list_damage_severity_codes), [list_damage_action_codes](#list_damage_action_codes), [list_shortage_reasons](#list_shortage_reasons), [search_open_lpns](#search_open_lpns), [list_qty_adjust_reasons](#list_qty_adjust_reasons), [list_open_customer_returns](#list_open_customer_returns), [pre_validate_adjust_qty](#pre_validate_adjust_qty), [pre_validate_close](#pre_validate_close), [pre_validate_cancel](#pre_validate_cancel), [pre_validate_put_on_hold](#pre_validate_put_on_hold), [pre_validate_report_damage](#pre_validate_report_damage), [pre_validate_receive_against_asn](#pre_validate_receive_against_asn), [pre_validate_receive_blind_line](#pre_validate_receive_blind_line), [pre_validate_receive_return](#pre_validate_receive_return)
- **receipt_commands**: [receipt_receive_against_asn](#receipt_receive_against_asn), [receipt_cancel](#receipt_cancel), [receipt_put_on_hold](#receipt_put_on_hold), [receipt_release_from_hold](#receipt_release_from_hold), [receipt_report_damage](#receipt_report_damage), [receipt_write_off_damage](#receipt_write_off_damage), [receipt_move_damage_to_rtv](#receipt_move_damage_to_rtv), [receipt_set_damage_disposition](#receipt_set_damage_disposition), [receipt_receive_blind](#receipt_receive_blind), [receipt_receive_blind_line](#receipt_receive_blind_line), [receipt_receive_return](#receipt_receive_return), [receipt_receive_return_line](#receipt_receive_return_line), [receipt_close](#receipt_close), [receipt_adjust_received_qty](#receipt_adjust_received_qty), [receipt_kpi_aggregate](#receipt_kpi_aggregate)
- **receipt_audit**: [get_receipt_audit](#get_receipt_audit), [list_receipt_audit](#list_receipt_audit)
- **receipt_detail**: [create_receipt_detail](#create_receipt_detail), [get_receipt_detail](#get_receipt_detail), [list_receipt_detail](#list_receipt_detail), [list_receipt_detail_lines](#list_receipt_detail_lines), [get_receipt_detail_line](#get_receipt_detail_line), [get_receipt_receive_context](#get_receipt_receive_context), [update_receipt_detail](#update_receipt_detail), [delete_receipt_detail](#delete_receipt_detail), [delete_many_receipt_detail](#delete_many_receipt_detail), [count_receipt_detail](#count_receipt_detail)
- **receipt_expected_lot_attributes**: [create_receipt_detail_lot_attributes](#create_receipt_detail_lot_attributes), [get_receipt_detail_lot_attributes](#get_receipt_detail_lot_attributes), [list_receipt_detail_lot_attributes](#list_receipt_detail_lot_attributes), [update_receipt_detail_lot_attributes](#update_receipt_detail_lot_attributes), [delete_receipt_detail_lot_attributes](#delete_receipt_detail_lot_attributes), [count_receipt_detail_lot_attributes](#count_receipt_detail_lot_attributes)
- **receipt_detail_damage**: [get_receipt_detail_damage](#get_receipt_detail_damage), [list_receipt_detail_damage](#list_receipt_detail_damage), [count_receipt_detail_damage](#count_receipt_detail_damage), [receipt_damage_vocabulary](#receipt_damage_vocabulary), [receipt_damage_destination](#receipt_damage_destination), [receipt_damage_context](#receipt_damage_context)
- **receipt_damage_photo**: [receipt_damage_photo_upload_url](#receipt_damage_photo_upload_url), [receipt_damage_photo_view_urls](#receipt_damage_photo_view_urls)
- **case_level**: [find_planned_case](#find_planned_case), [get_case_envelope](#get_case_envelope), [validate_pallet_unique](#validate_pallet_unique), [list_receipt_cases](#list_receipt_cases), [find_unreceived_cases](#find_unreceived_cases), [pre_validate_receive_case_level](#pre_validate_receive_case_level), [get_case_level_asn_by_number](#get_case_level_asn_by_number), [lookup_case_level_asn](#lookup_case_level_asn)
- **case_level_commands**: [receipt_create_case_level_asn](#receipt_create_case_level_asn), [receipt_receive_case_level_line](#receipt_receive_case_level_line), [receipt_replace_pallet](#receipt_replace_pallet), [receipt_cancel_planned_case](#receipt_cancel_planned_case)

## Module: lot_policy

### count_lot_policy

Count lot_policy — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_lot_policy` |
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
| `filters[].lot_creation` | string filter | no | Filter on `lot_creation`. |
| `filters[].show_manufactured_date` | boolean filter | no | Filter on `show_manufactured_date`. |
| `filters[].show_expiration_date` | boolean filter | no | Filter on `show_expiration_date`. |
| `filters[].show_delivery_by_date` | boolean filter | no | Filter on `show_delivery_by_date`. |
| `filters[].show_best_by_date` | boolean filter | no | Filter on `show_best_by_date`. |
| `filters[].required_manufactured_date` | boolean filter | no | Filter on `required_manufactured_date`. |
| `filters[].required_expiration_date` | boolean filter | no | Filter on `required_expiration_date`. |
| `filters[].required_delivery_by_date` | boolean filter | no | Filter on `required_delivery_by_date`. |
| `filters[].required_best_by_date` | boolean filter | no | Filter on `required_best_by_date`. |
| `filters[].label_manufactured_date` | string filter | no | Filter on `label_manufactured_date`. |
| `filters[].label_expiration_date` | string filter | no | Filter on `label_expiration_date`. |
| `filters[].label_delivery_by_date` | string filter | no | Filter on `label_delivery_by_date`. |
| `filters[].label_best_by_date` | string filter | no | Filter on `label_best_by_date`. |
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
  "method": "count_lot_policy",
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

### count_lot_policy_attribute

Count lot_policy_attribute — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_lot_policy_attribute` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot_policy_id` | integer filter | no | Filter on `lot_policy_id`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].show` | boolean filter | no | Filter on `show`. |
| `filters[].required` | boolean filter | no | Filter on `required`. |
| `filters[].label` | string filter | no | Filter on `label`. |
| `filters[].override_allowed` | boolean filter | no | Filter on `override_allowed`. |
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
  "method": "count_lot_policy_attribute",
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

### create_lot_policy_attribute_form

Add one custom attribute through the metadata form.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_lot_policy_attribute_form` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LotPolicyAttributesForCreate) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes |  |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAttributeFormView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.version` | integer (int32) | yes | Version of the aggregate root read with this attribute. |

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
  "method": "create_lot_policy_attribute_form",
  "params": {
    "data": {
      "attrib_code": "<attrib_code>",
      "lot_policy_id": 1,
      "override_allowed": false,
      "physical_verification": "NotVerifiable",
      "required": false,
      "show": false,
      "show_on_pick": false
    }
  }
}'
```

### create_lot_policy_form

Create a lot policy from the metadata form.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_lot_policy_form` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LotPolicyForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.label_best_by_date` | string or null | no |  |
| `data.label_delivery_by_date` | string or null | no |  |
| `data.label_expiration_date` | string or null | no |  |
| `data.label_manufactured_date` | string or null | no |  |
| `data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent or null | no |  |
| `data.required_best_by_date` | boolean or null | no |  |
| `data.required_delivery_by_date` | boolean or null | no |  |
| `data.required_expiration_date` | boolean or null | no |  |
| `data.required_manufactured_date` | boolean or null | no |  |
| `data.show_best_by_date` | boolean or null | no |  |
| `data.show_delivery_by_date` | boolean or null | no |  |
| `data.show_expiration_date` | boolean or null | no |  |
| `data.show_manufactured_date` | boolean or null | no |  |
| `data.show_on_pick_best_by_date` | boolean or null | no |  |
| `data.show_on_pick_delivery_by_date` | boolean or null | no |  |
| `data.show_on_pick_expiration_date` | boolean or null | no |  |
| `data.show_on_pick_manufactured_date` | boolean or null | no |  |
| `data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label_best_by_date` | string or null | no |  |
| `data.label_delivery_by_date` | string or null | no |  |
| `data.label_expiration_date` | string or null | no |  |
| `data.label_manufactured_date` | string or null | no |  |
| `data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.required_best_by_date` | boolean | yes |  |
| `data.required_delivery_by_date` | boolean | yes |  |
| `data.required_expiration_date` | boolean | yes |  |
| `data.required_manufactured_date` | boolean | yes |  |
| `data.show_best_by_date` | boolean | yes |  |
| `data.show_delivery_by_date` | boolean | yes |  |
| `data.show_expiration_date` | boolean | yes |  |
| `data.show_manufactured_date` | boolean | yes |  |
| `data.show_on_pick_best_by_date` | boolean | yes |  |
| `data.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.show_on_pick_expiration_date` | boolean | yes |  |
| `data.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
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
  "method": "create_lot_policy_form",
  "params": {
    "data": {
      "code": "<code>"
    }
  }
}'
```

### delete_lot_policy

Delete an unreferenced lot policy and all of its owned attributes.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_lot_policy` |
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

The `result` member of the response is: `{ "data": LotPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label_best_by_date` | string or null | no |  |
| `data.label_delivery_by_date` | string or null | no |  |
| `data.label_expiration_date` | string or null | no |  |
| `data.label_manufactured_date` | string or null | no |  |
| `data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.required_best_by_date` | boolean | yes |  |
| `data.required_delivery_by_date` | boolean | yes |  |
| `data.required_expiration_date` | boolean | yes |  |
| `data.required_manufactured_date` | boolean | yes |  |
| `data.show_best_by_date` | boolean | yes |  |
| `data.show_delivery_by_date` | boolean | yes |  |
| `data.show_expiration_date` | boolean | yes |  |
| `data.show_manufactured_date` | boolean | yes |  |
| `data.show_on_pick_best_by_date` | boolean | yes |  |
| `data.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.show_on_pick_expiration_date` | boolean | yes |  |
| `data.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
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
  "method": "delete_lot_policy",
  "params": {
    "id": 1
  }
}'
```

### delete_lot_policy_attribute_form

Delete one custom attribute through the metadata form.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_lot_policy_attribute_form` |
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

The `result` member of the response is: `{ "data": LotPolicyAttribute }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "lot_policy_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "override_allowed": false,
      "physical_verification": "NotVerifiable",
      "required": false,
      "show": false,
      "show_on_pick": false
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
  "method": "delete_lot_policy_attribute_form",
  "params": {
    "id": 1
  }
}'
```

### delete_many_lot_policy

Delete unreferenced lot policies and all of their owned attributes.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_lot_policy` |
| Roles that have it by default | ADMIN, MANAGER |
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
  "method": "delete_many_lot_policy",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_many_lot_policy_attribute_form

Delete selected custom attributes through the metadata list.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_lot_policy_attribute_form` |
| Roles that have it by default | ADMIN, MANAGER |
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
  "method": "delete_many_lot_policy_attribute_form",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_lot_policy

Get a lot_policy by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_lot_policy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label_best_by_date` | string or null | no |  |
| `data.label_delivery_by_date` | string or null | no |  |
| `data.label_expiration_date` | string or null | no |  |
| `data.label_manufactured_date` | string or null | no |  |
| `data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.required_best_by_date` | boolean | yes |  |
| `data.required_delivery_by_date` | boolean | yes |  |
| `data.required_expiration_date` | boolean | yes |  |
| `data.required_manufactured_date` | boolean | yes |  |
| `data.show_best_by_date` | boolean | yes |  |
| `data.show_delivery_by_date` | boolean | yes |  |
| `data.show_expiration_date` | boolean | yes |  |
| `data.show_manufactured_date` | boolean | yes |  |
| `data.show_on_pick_best_by_date` | boolean | yes |  |
| `data.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.show_on_pick_expiration_date` | boolean | yes |  |
| `data.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
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
  "method": "get_lot_policy",
  "params": {
    "id": 1
  }
}'
```

### get_lot_policy_attribute

Get a lot_policy_attribute by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_lot_policy_attribute` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAttribute }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attrib_code": "<attrib_code>",
      "id": 1,
      "lot_policy_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "override_allowed": false,
      "physical_verification": "NotVerifiable",
      "required": false,
      "show": false,
      "show_on_pick": false
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
  "method": "get_lot_policy_attribute",
  "params": {
    "id": 1
  }
}'
```

### get_lot_policy_attribute_form

Get one lot-policy attribute with its aggregate version.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_lot_policy_attribute_form` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAttributeFormView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.version` | integer (int32) | yes | Version of the aggregate root read with this attribute. |

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
  "method": "get_lot_policy_attribute_form",
  "params": {
    "id": 1
  }
}'
```

### list_lot_policy

List lot_policy — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_lot_policy` |
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
| `filters[].lot_creation` | string filter | no | Filter on `lot_creation`. |
| `filters[].show_manufactured_date` | boolean filter | no | Filter on `show_manufactured_date`. |
| `filters[].show_expiration_date` | boolean filter | no | Filter on `show_expiration_date`. |
| `filters[].show_delivery_by_date` | boolean filter | no | Filter on `show_delivery_by_date`. |
| `filters[].show_best_by_date` | boolean filter | no | Filter on `show_best_by_date`. |
| `filters[].required_manufactured_date` | boolean filter | no | Filter on `required_manufactured_date`. |
| `filters[].required_expiration_date` | boolean filter | no | Filter on `required_expiration_date`. |
| `filters[].required_delivery_by_date` | boolean filter | no | Filter on `required_delivery_by_date`. |
| `filters[].required_best_by_date` | boolean filter | no | Filter on `required_best_by_date`. |
| `filters[].label_manufactured_date` | string filter | no | Filter on `label_manufactured_date`. |
| `filters[].label_expiration_date` | string filter | no | Filter on `label_expiration_date`. |
| `filters[].label_delivery_by_date` | string filter | no | Filter on `label_delivery_by_date`. |
| `filters[].label_best_by_date` | string filter | no | Filter on `label_best_by_date`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LotPolicy] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].descr` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].label_best_by_date` | string or null | no |  |
| `data[].label_delivery_by_date` | string or null | no |  |
| `data[].label_expiration_date` | string or null | no |  |
| `data[].label_manufactured_date` | string or null | no |  |
| `data[].lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].required_best_by_date` | boolean | yes |  |
| `data[].required_delivery_by_date` | boolean | yes |  |
| `data[].required_expiration_date` | boolean | yes |  |
| `data[].required_manufactured_date` | boolean | yes |  |
| `data[].show_best_by_date` | boolean | yes |  |
| `data[].show_delivery_by_date` | boolean | yes |  |
| `data[].show_expiration_date` | boolean | yes |  |
| `data[].show_manufactured_date` | boolean | yes |  |
| `data[].show_on_pick_best_by_date` | boolean | yes |  |
| `data[].show_on_pick_delivery_by_date` | boolean | yes |  |
| `data[].show_on_pick_expiration_date` | boolean | yes |  |
| `data[].show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data[].verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data[].verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data[].verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data[].verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
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
  "method": "list_lot_policy",
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

### list_lot_policy_attribute

List lot_policy_attribute — CRUD.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_lot_policy_attribute` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].lot_policy_id` | integer filter | no | Filter on `lot_policy_id`. |
| `filters[].attrib_code` | string filter | no | Filter on `attrib_code`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].show` | boolean filter | no | Filter on `show`. |
| `filters[].required` | boolean filter | no | Filter on `required`. |
| `filters[].label` | string filter | no | Filter on `label`. |
| `filters[].override_allowed` | boolean filter | no | Filter on `override_allowed`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LotPolicyAttribute] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].attrib_code` | string | yes |  |
| `data[].descr` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].label` | string or null | no |  |
| `data[].lot_policy_id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data[].physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data[].required` | boolean | yes |  |
| `data[].show` | boolean | yes |  |
| `data[].show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |

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
  "method": "list_lot_policy_attribute",
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

### lot_policy_config_create

Create a complete lot-policy configuration atomically.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_policy_config_create` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LotPolicyAggregateForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.data` | object (LotPolicyAggregateDraft) | yes |  |
| `data.data.attributes` | array of object (LotPolicyAttributeDraft) | yes |  |
| `data.data.policy` | object (LotPolicyRootDraft) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAggregateView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.attributes` | array of object (LotPolicyAttribute) | yes |  |
| `data.attributes[].add_when` | string | yes |  |
| `data.attributes[].add_who` | integer (int64) | yes |  |
| `data.attributes[].attrib_code` | string | yes |  |
| `data.attributes[].descr` | string or null | no |  |
| `data.attributes[].id` | integer (int64) | yes |  |
| `data.attributes[].label` | string or null | no |  |
| `data.attributes[].lot_policy_id` | integer (int64) | yes |  |
| `data.attributes[].mod_when` | string | yes |  |
| `data.attributes[].mod_who` | integer (int64) | yes |  |
| `data.attributes[].override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.attributes[].physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.attributes[].required` | boolean | yes |  |
| `data.attributes[].show` | boolean | yes |  |
| `data.attributes[].show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy` | object (LotPolicy) | yes |  |
| `data.policy.add_when` | string | yes |  |
| `data.policy.add_who` | integer (int64) | yes |  |
| `data.policy.code` | string | yes |  |
| `data.policy.descr` | string or null | no |  |
| `data.policy.id` | integer (int64) | yes |  |
| `data.policy.label_best_by_date` | string or null | no |  |
| `data.policy.label_delivery_by_date` | string or null | no |  |
| `data.policy.label_expiration_date` | string or null | no |  |
| `data.policy.label_manufactured_date` | string or null | no |  |
| `data.policy.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.policy.mod_when` | string | yes |  |
| `data.policy.mod_who` | integer (int64) | yes |  |
| `data.policy.required_best_by_date` | boolean | yes |  |
| `data.policy.required_delivery_by_date` | boolean | yes |  |
| `data.policy.required_expiration_date` | boolean | yes |  |
| `data.policy.required_manufactured_date` | boolean | yes |  |
| `data.policy.show_best_by_date` | boolean | yes |  |
| `data.policy.show_delivery_by_date` | boolean | yes |  |
| `data.policy.show_expiration_date` | boolean | yes |  |
| `data.policy.show_manufactured_date` | boolean | yes |  |
| `data.policy.show_on_pick_best_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_expiration_date` | boolean | yes |  |
| `data.policy.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
| `data.policy.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "attributes": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attrib_code": "<attrib_code>",
          "id": 1,
          "lot_policy_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "override_allowed": false,
          "physical_verification": "NotVerifiable",
          "required": false,
          "show": false,
          "show_on_pick": false
        }
      ],
      "policy": {
        "add_when": "<add_when>",
        "add_who": 1,
        "code": "<code>",
        "id": 1,
        "lot_creation": "Existing",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "required_best_by_date": false,
        "required_delivery_by_date": false,
        "required_expiration_date": false,
        "required_manufactured_date": false,
        "show_best_by_date": false,
        "show_delivery_by_date": false,
        "show_expiration_date": false,
        "show_manufactured_date": false,
        "show_on_pick_best_by_date": false,
        "show_on_pick_delivery_by_date": false,
        "show_on_pick_expiration_date": false,
        "show_on_pick_manufactured_date": false,
        "verification_best_by_date": "NotVerifiable",
        "verification_delivery_by_date": "NotVerifiable",
        "verification_expiration_date": "NotVerifiable",
        "verification_manufactured_date": "NotVerifiable",
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
  "method": "lot_policy_config_create",
  "params": {
    "data": {
      "code": "<code>",
      "data": {
        "attributes": [
          {
            "attrib_code": "<attrib_code>",
            "override_allowed": false,
            "required": false,
            "show": false
          }
        ],
        "policy": {
          "lot_creation": "Existing",
          "required_best_by_date": false,
          "required_delivery_by_date": false,
          "required_expiration_date": false,
          "required_manufactured_date": false,
          "show_best_by_date": false,
          "show_delivery_by_date": false,
          "show_expiration_date": false,
          "show_manufactured_date": false
        }
      }
    }
  }
}'
```

### lot_policy_config_save

Save a complete lot-policy configuration without overwriting a newer edit.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `lot_policy_config_save` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `lot_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (LotPolicyAggregateDraft) | yes |  |
| `data.data.attributes` | array of object (LotPolicyAttributeDraft) | yes |  |
| `data.data.policy` | object (LotPolicyRootDraft) | yes |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAggregateView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.attributes` | array of object (LotPolicyAttribute) | yes |  |
| `data.attributes[].add_when` | string | yes |  |
| `data.attributes[].add_who` | integer (int64) | yes |  |
| `data.attributes[].attrib_code` | string | yes |  |
| `data.attributes[].descr` | string or null | no |  |
| `data.attributes[].id` | integer (int64) | yes |  |
| `data.attributes[].label` | string or null | no |  |
| `data.attributes[].lot_policy_id` | integer (int64) | yes |  |
| `data.attributes[].mod_when` | string | yes |  |
| `data.attributes[].mod_who` | integer (int64) | yes |  |
| `data.attributes[].override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.attributes[].physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.attributes[].required` | boolean | yes |  |
| `data.attributes[].show` | boolean | yes |  |
| `data.attributes[].show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy` | object (LotPolicy) | yes |  |
| `data.policy.add_when` | string | yes |  |
| `data.policy.add_who` | integer (int64) | yes |  |
| `data.policy.code` | string | yes |  |
| `data.policy.descr` | string or null | no |  |
| `data.policy.id` | integer (int64) | yes |  |
| `data.policy.label_best_by_date` | string or null | no |  |
| `data.policy.label_delivery_by_date` | string or null | no |  |
| `data.policy.label_expiration_date` | string or null | no |  |
| `data.policy.label_manufactured_date` | string or null | no |  |
| `data.policy.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.policy.mod_when` | string | yes |  |
| `data.policy.mod_who` | integer (int64) | yes |  |
| `data.policy.required_best_by_date` | boolean | yes |  |
| `data.policy.required_delivery_by_date` | boolean | yes |  |
| `data.policy.required_expiration_date` | boolean | yes |  |
| `data.policy.required_manufactured_date` | boolean | yes |  |
| `data.policy.show_best_by_date` | boolean | yes |  |
| `data.policy.show_delivery_by_date` | boolean | yes |  |
| `data.policy.show_expiration_date` | boolean | yes |  |
| `data.policy.show_manufactured_date` | boolean | yes |  |
| `data.policy.show_on_pick_best_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_expiration_date` | boolean | yes |  |
| `data.policy.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
| `data.policy.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "attributes": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attrib_code": "<attrib_code>",
          "id": 1,
          "lot_policy_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "override_allowed": false,
          "physical_verification": "NotVerifiable",
          "required": false,
          "show": false,
          "show_on_pick": false
        }
      ],
      "policy": {
        "add_when": "<add_when>",
        "add_who": 1,
        "code": "<code>",
        "id": 1,
        "lot_creation": "Existing",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "required_best_by_date": false,
        "required_delivery_by_date": false,
        "required_expiration_date": false,
        "required_manufactured_date": false,
        "show_best_by_date": false,
        "show_delivery_by_date": false,
        "show_expiration_date": false,
        "show_manufactured_date": false,
        "show_on_pick_best_by_date": false,
        "show_on_pick_delivery_by_date": false,
        "show_on_pick_expiration_date": false,
        "show_on_pick_manufactured_date": false,
        "verification_best_by_date": "NotVerifiable",
        "verification_delivery_by_date": "NotVerifiable",
        "verification_expiration_date": "NotVerifiable",
        "verification_manufactured_date": "NotVerifiable",
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
  "method": "lot_policy_config_save",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "data": {
        "attributes": [
          {
            "attrib_code": "<attrib_code>",
            "override_allowed": false,
            "required": false,
            "show": false
          }
        ],
        "policy": {
          "lot_creation": "Existing",
          "required_best_by_date": false,
          "required_delivery_by_date": false,
          "required_expiration_date": false,
          "required_manufactured_date": false,
          "show_best_by_date": false,
          "show_delivery_by_date": false,
          "show_expiration_date": false,
          "show_manufactured_date": false
        }
      },
      "id": 1
    }
  }
}'
```

### lot_policy_config_template

The draft a new lot policy starts from.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_policy_config_template` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes | Nothing: a new-lot policy template depends on no argument. |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAggregateDraft }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.attributes` | array of object (LotPolicyAttributeDraft) | yes |  |
| `data.attributes[].attrib_code` | string | yes |  |
| `data.attributes[].descr` | string or null | no |  |
| `data.attributes[].id` | integer (int64) or null | no | Existing row identity. |
| `data.attributes[].label` | string or null | no |  |
| `data.attributes[].override_allowed` | boolean | yes |  |
| `data.attributes[].physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | no |  |
| `data.attributes[].required` | boolean | yes |  |
| `data.attributes[].show` | boolean | yes |  |
| `data.attributes[].show_on_pick` | boolean | no | Optional on the wire, like the root's pick fields. |
| `data.policy` | object (LotPolicyRootDraft) | yes |  |
| `data.policy.descr` | string or null | no |  |
| `data.policy.label_best_by_date` | string or null | no |  |
| `data.policy.label_delivery_by_date` | string or null | no |  |
| `data.policy.label_expiration_date` | string or null | no |  |
| `data.policy.label_manufactured_date` | string or null | no |  |
| `data.policy.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes |  |
| `data.policy.required_best_by_date` | boolean | yes |  |
| `data.policy.required_delivery_by_date` | boolean | yes |  |
| `data.policy.required_expiration_date` | boolean | yes |  |
| `data.policy.required_manufactured_date` | boolean | yes |  |
| `data.policy.show_best_by_date` | boolean | yes |  |
| `data.policy.show_delivery_by_date` | boolean | yes |  |
| `data.policy.show_expiration_date` | boolean | yes |  |
| `data.policy.show_manufactured_date` | boolean | yes |  |
| `data.policy.show_on_pick_best_by_date` | boolean | no |  |
| `data.policy.show_on_pick_delivery_by_date` | boolean | no |  |
| `data.policy.show_on_pick_expiration_date` | boolean | no |  |
| `data.policy.show_on_pick_manufactured_date` | boolean | no |  |
| `data.policy.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | no |  |
| `data.policy.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | no |  |
| `data.policy.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | no |  |
| `data.policy.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | no |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "attributes": [
        {
          "attrib_code": "<attrib_code>",
          "override_allowed": false,
          "required": false,
          "show": false
        }
      ],
      "policy": {
        "lot_creation": "Existing",
        "required_best_by_date": false,
        "required_delivery_by_date": false,
        "required_expiration_date": false,
        "required_manufactured_date": false,
        "show_best_by_date": false,
        "show_delivery_by_date": false,
        "show_expiration_date": false,
        "show_manufactured_date": false
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "lot_policy_config_template",
  "params": {
    "data": {}
  }
}'
```

### lot_policy_config_view

Read a lot policy and all of its custom attributes as one configuration.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lot_policy_config_view` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAggregateView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.attributes` | array of object (LotPolicyAttribute) | yes |  |
| `data.attributes[].add_when` | string | yes |  |
| `data.attributes[].add_who` | integer (int64) | yes |  |
| `data.attributes[].attrib_code` | string | yes |  |
| `data.attributes[].descr` | string or null | no |  |
| `data.attributes[].id` | integer (int64) | yes |  |
| `data.attributes[].label` | string or null | no |  |
| `data.attributes[].lot_policy_id` | integer (int64) | yes |  |
| `data.attributes[].mod_when` | string | yes |  |
| `data.attributes[].mod_who` | integer (int64) | yes |  |
| `data.attributes[].override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.attributes[].physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.attributes[].required` | boolean | yes |  |
| `data.attributes[].show` | boolean | yes |  |
| `data.attributes[].show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy` | object (LotPolicy) | yes |  |
| `data.policy.add_when` | string | yes |  |
| `data.policy.add_who` | integer (int64) | yes |  |
| `data.policy.code` | string | yes |  |
| `data.policy.descr` | string or null | no |  |
| `data.policy.id` | integer (int64) | yes |  |
| `data.policy.label_best_by_date` | string or null | no |  |
| `data.policy.label_delivery_by_date` | string or null | no |  |
| `data.policy.label_expiration_date` | string or null | no |  |
| `data.policy.label_manufactured_date` | string or null | no |  |
| `data.policy.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.policy.mod_when` | string | yes |  |
| `data.policy.mod_who` | integer (int64) | yes |  |
| `data.policy.required_best_by_date` | boolean | yes |  |
| `data.policy.required_delivery_by_date` | boolean | yes |  |
| `data.policy.required_expiration_date` | boolean | yes |  |
| `data.policy.required_manufactured_date` | boolean | yes |  |
| `data.policy.show_best_by_date` | boolean | yes |  |
| `data.policy.show_delivery_by_date` | boolean | yes |  |
| `data.policy.show_expiration_date` | boolean | yes |  |
| `data.policy.show_manufactured_date` | boolean | yes |  |
| `data.policy.show_on_pick_best_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.policy.show_on_pick_expiration_date` | boolean | yes |  |
| `data.policy.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.policy.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.policy.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
| `data.policy.version` | integer (int32) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "attributes": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "attrib_code": "<attrib_code>",
          "id": 1,
          "lot_policy_id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "override_allowed": false,
          "physical_verification": "NotVerifiable",
          "required": false,
          "show": false,
          "show_on_pick": false
        }
      ],
      "policy": {
        "add_when": "<add_when>",
        "add_who": 1,
        "code": "<code>",
        "id": 1,
        "lot_creation": "Existing",
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "required_best_by_date": false,
        "required_delivery_by_date": false,
        "required_expiration_date": false,
        "required_manufactured_date": false,
        "show_best_by_date": false,
        "show_delivery_by_date": false,
        "show_expiration_date": false,
        "show_manufactured_date": false,
        "show_on_pick_best_by_date": false,
        "show_on_pick_delivery_by_date": false,
        "show_on_pick_expiration_date": false,
        "show_on_pick_manufactured_date": false,
        "verification_best_by_date": "NotVerifiable",
        "verification_delivery_by_date": "NotVerifiable",
        "verification_expiration_date": "NotVerifiable",
        "verification_manufactured_date": "NotVerifiable",
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
  "method": "lot_policy_config_view",
  "params": {
    "id": 1
  }
}'
```

### update_lot_policy_attribute_form

Update one custom lot-policy attribute through the metadata form.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_lot_policy_attribute_form` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `lot_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (LotPolicyAttributesForUpdate) | yes |  |
| `data.data.attrib_code` | string or null | no |  |
| `data.data.descr` | string or null | no |  |
| `data.data.label` | string or null | no |  |
| `data.data.override_allowed` | boolean or null | no |  |
| `data.data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.data.required` | boolean or null | no |  |
| `data.data.show` | boolean or null | no |  |
| `data.data.show_on_pick` | boolean or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicyAttributeFormView }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attrib_code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label` | string or null | no |  |
| `data.lot_policy_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.override_allowed` | boolean | yes | Phase 1 (migration 083). |
| `data.physical_verification` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the value on the goods. |
| `data.required` | boolean | yes |  |
| `data.show` | boolean | yes |  |
| `data.show_on_pick` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.version` | integer (int32) | yes | Version of the aggregate root read with this attribute. |

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
  "method": "update_lot_policy_attribute_form",
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

### update_lot_policy_form

Update lot-policy settings from the metadata form.

| | |
|---|---|
| Context / module | inbound / lot_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_lot_policy_form` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `lot_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (LotPolicyForUpdate) | yes |  |
| `data.data.descr` | string or null | no |  |
| `data.data.label_best_by_date` | string or null | no |  |
| `data.data.label_delivery_by_date` | string or null | no |  |
| `data.data.label_expiration_date` | string or null | no |  |
| `data.data.label_manufactured_date` | string or null | no |  |
| `data.data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent or null | no |  |
| `data.data.required_best_by_date` | boolean or null | no |  |
| `data.data.required_delivery_by_date` | boolean or null | no |  |
| `data.data.required_expiration_date` | boolean or null | no |  |
| `data.data.required_manufactured_date` | boolean or null | no |  |
| `data.data.show_best_by_date` | boolean or null | no |  |
| `data.data.show_delivery_by_date` | boolean or null | no |  |
| `data.data.show_expiration_date` | boolean or null | no |  |
| `data.data.show_manufactured_date` | boolean or null | no |  |
| `data.data.show_on_pick_best_by_date` | boolean or null | no |  |
| `data.data.show_on_pick_delivery_by_date` | boolean or null | no |  |
| `data.data.show_on_pick_expiration_date` | boolean or null | no |  |
| `data.data.show_on_pick_manufactured_date` | boolean or null | no |  |
| `data.data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LotPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.descr` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.label_best_by_date` | string or null | no |  |
| `data.label_delivery_by_date` | string or null | no |  |
| `data.label_expiration_date` | string or null | no |  |
| `data.label_manufactured_date` | string or null | no |  |
| `data.lot_creation` | one of: Existing \| PerReceipt \| PerReceiveEvent | yes | WHEN a new lot is created (migration 351). |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.required_best_by_date` | boolean | yes |  |
| `data.required_delivery_by_date` | boolean | yes |  |
| `data.required_expiration_date` | boolean | yes |  |
| `data.required_manufactured_date` | boolean | yes |  |
| `data.show_best_by_date` | boolean | yes |  |
| `data.show_delivery_by_date` | boolean | yes |  |
| `data.show_expiration_date` | boolean | yes |  |
| `data.show_manufactured_date` | boolean | yes |  |
| `data.show_on_pick_best_by_date` | boolean | yes |  |
| `data.show_on_pick_delivery_by_date` | boolean | yes |  |
| `data.show_on_pick_expiration_date` | boolean | yes |  |
| `data.show_on_pick_manufactured_date` | boolean | yes | Shown on the pick card (spec 2026-10-04 §8). |
| `data.verification_best_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_delivery_by_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_expiration_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes |  |
| `data.verification_manufactured_date` | one of: NotVerifiable \| Visual \| Barcode \| VisualOrBarcode | yes | How the operator can check the date on the goods. |
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
  "method": "update_lot_policy_form",
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

## Module: receipt_policy

### count_receipt_policy

Count receipt_policy — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].version` | integer filter | no | Filter on `version`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].receipt_without_po` | string filter | no | Filter on `receipt_without_po`. |
| `filters[].receipt_without_asn` | string filter | no | Filter on `receipt_without_asn`. |
| `filters[].receipt_without_lpn` | string filter | no | Filter on `receipt_without_lpn`. |
| `filters[].no_sku_on_po` | string filter | no | Filter on `no_sku_on_po`. |
| `filters[].no_sku_on_asn` | string filter | no | Filter on `no_sku_on_asn`. |
| `filters[].qty_validation` | string filter | no | Filter on `qty_validation`. |
| `filters[].excess_message` | boolean filter | no | Filter on `excess_message`. |
| `filters[].excess_override` | boolean filter | no | Filter on `excess_override`. |
| `filters[].excess_override_percent` | integer filter | no | Filter on `excess_override_percent`. |
| `filters[].excess_error` | boolean filter | no | Filter on `excess_error`. |
| `filters[].excess_error_percent` | integer filter | no | Filter on `excess_error_percent`. |
| `filters[].shortage_message` | boolean filter | no | Filter on `shortage_message`. |
| `filters[].shortage_override` | boolean filter | no | Filter on `shortage_override`. |
| `filters[].shortage_override_percent` | integer filter | no | Filter on `shortage_override_percent`. |
| `filters[].po_qty_validation` | string filter | no | Filter on `po_qty_validation`. |
| `filters[].po_excess_message` | boolean filter | no | Filter on `po_excess_message`. |
| `filters[].po_excess_override` | boolean filter | no | Filter on `po_excess_override`. |
| `filters[].po_excess_override_percent` | integer filter | no | Filter on `po_excess_override_percent`. |
| `filters[].po_excess_error` | boolean filter | no | Filter on `po_excess_error`. |
| `filters[].po_excess_error_percent` | integer filter | no | Filter on `po_excess_error_percent`. |
| `filters[].po_shortage_message` | boolean filter | no | Filter on `po_shortage_message`. |
| `filters[].po_shortage_override` | boolean filter | no | Filter on `po_shortage_override`. |
| `filters[].po_shortage_override_percent` | integer filter | no | Filter on `po_shortage_override_percent`. |
| `filters[].asn_po_qty_discrepancy` | string filter | no | Filter on `asn_po_qty_discrepancy`. |
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
  "method": "count_receipt_policy",
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

### create_receipt_policy

Create a complete receipt-policy configuration.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- There is no version check.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReceiptPolicyForCreate) | yes |  |
| `data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data.code` | string | yes |  |
| `data.date_deviation_check` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.descr` | string or null | no |  |
| `data.excess_error` | boolean or null | no |  |
| `data.excess_error_percent` | integer (int32) or null | no |  |
| `data.excess_message` | boolean or null | no |  |
| `data.excess_override` | boolean or null | no |  |
| `data.excess_override_percent` | integer (int32) or null | no |  |
| `data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.po_excess_error` | boolean or null | no |  |
| `data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.po_excess_message` | boolean or null | no |  |
| `data.po_excess_override` | boolean or null | no |  |
| `data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.po_qty_validation` | string or null | no |  |
| `data.po_shortage_message` | boolean or null | no |  |
| `data.po_shortage_override` | boolean or null | no |  |
| `data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning or null | no |  |
| `data.qty_validation` | string or null | no |  |
| `data.receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.shortage_message` | boolean or null | no |  |
| `data.shortage_override` | boolean or null | no |  |
| `data.shortage_override_percent` | integer (int32) or null | no |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data.code` | string | yes |  |
| `data.date_deviation_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.descr` | string or null | no |  |
| `data.excess_error` | boolean | yes |  |
| `data.excess_error_percent` | integer (int32) or null | no |  |
| `data.excess_message` | boolean | yes |  |
| `data.excess_override` | boolean | yes |  |
| `data.excess_override_percent` | integer (int32) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.po_excess_error` | boolean | yes |  |
| `data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.po_excess_message` | boolean | yes |  |
| `data.po_excess_override` | boolean | yes |  |
| `data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.po_qty_validation` | string | yes |  |
| `data.po_shortage_message` | boolean | yes |  |
| `data.po_shortage_override` | boolean | yes |  |
| `data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.qty_validation` | string | yes |  |
| `data.receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.shortage_message` | boolean | yes |  |
| `data.shortage_override` | boolean | yes |  |
| `data.shortage_override_percent` | integer (int32) or null | no |  |
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
  "method": "create_receipt_policy",
  "params": {
    "data": {
      "asn_po_qty_discrepancy": "Allow",
      "code": "<code>",
      "no_sku_on_asn": "Allow",
      "no_sku_on_po": "Allow",
      "receipt_without_asn": "Allow",
      "receipt_without_lpn": "Allow",
      "receipt_without_po": "Allow"
    }
  }
}'
```

### delete_many_receipt_policy

Delete unreferenced receipt-policy configurations.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER |
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
  "method": "delete_many_receipt_policy",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_receipt_policy

Delete an unreferenced receipt-policy configuration.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_receipt_policy` |
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

The `result` member of the response is: `{ "data": ReceiptPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data.code` | string | yes |  |
| `data.date_deviation_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.descr` | string or null | no |  |
| `data.excess_error` | boolean | yes |  |
| `data.excess_error_percent` | integer (int32) or null | no |  |
| `data.excess_message` | boolean | yes |  |
| `data.excess_override` | boolean | yes |  |
| `data.excess_override_percent` | integer (int32) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.po_excess_error` | boolean | yes |  |
| `data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.po_excess_message` | boolean | yes |  |
| `data.po_excess_override` | boolean | yes |  |
| `data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.po_qty_validation` | string | yes |  |
| `data.po_shortage_message` | boolean | yes |  |
| `data.po_shortage_override` | boolean | yes |  |
| `data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.qty_validation` | string | yes |  |
| `data.receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.shortage_message` | boolean | yes |  |
| `data.shortage_override` | boolean | yes |  |
| `data.shortage_override_percent` | integer (int32) or null | no |  |
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
  "method": "delete_receipt_policy",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_policy

Get a receipt_policy by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data.code` | string | yes |  |
| `data.date_deviation_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.descr` | string or null | no |  |
| `data.excess_error` | boolean | yes |  |
| `data.excess_error_percent` | integer (int32) or null | no |  |
| `data.excess_message` | boolean | yes |  |
| `data.excess_override` | boolean | yes |  |
| `data.excess_override_percent` | integer (int32) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.po_excess_error` | boolean | yes |  |
| `data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.po_excess_message` | boolean | yes |  |
| `data.po_excess_override` | boolean | yes |  |
| `data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.po_qty_validation` | string | yes |  |
| `data.po_shortage_message` | boolean | yes |  |
| `data.po_shortage_override` | boolean | yes |  |
| `data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.qty_validation` | string | yes |  |
| `data.receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.shortage_message` | boolean | yes |  |
| `data.shortage_override` | boolean | yes |  |
| `data.shortage_override_percent` | integer (int32) or null | no |  |
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
  "method": "get_receipt_policy",
  "params": {
    "id": 1
  }
}'
```

### list_receipt_policy

List receipt_policy — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].version` | integer filter | no | Filter on `version`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].descr` | string filter | no | Filter on `descr`. |
| `filters[].receipt_without_po` | string filter | no | Filter on `receipt_without_po`. |
| `filters[].receipt_without_asn` | string filter | no | Filter on `receipt_without_asn`. |
| `filters[].receipt_without_lpn` | string filter | no | Filter on `receipt_without_lpn`. |
| `filters[].no_sku_on_po` | string filter | no | Filter on `no_sku_on_po`. |
| `filters[].no_sku_on_asn` | string filter | no | Filter on `no_sku_on_asn`. |
| `filters[].qty_validation` | string filter | no | Filter on `qty_validation`. |
| `filters[].excess_message` | boolean filter | no | Filter on `excess_message`. |
| `filters[].excess_override` | boolean filter | no | Filter on `excess_override`. |
| `filters[].excess_override_percent` | integer filter | no | Filter on `excess_override_percent`. |
| `filters[].excess_error` | boolean filter | no | Filter on `excess_error`. |
| `filters[].excess_error_percent` | integer filter | no | Filter on `excess_error_percent`. |
| `filters[].shortage_message` | boolean filter | no | Filter on `shortage_message`. |
| `filters[].shortage_override` | boolean filter | no | Filter on `shortage_override`. |
| `filters[].shortage_override_percent` | integer filter | no | Filter on `shortage_override_percent`. |
| `filters[].po_qty_validation` | string filter | no | Filter on `po_qty_validation`. |
| `filters[].po_excess_message` | boolean filter | no | Filter on `po_excess_message`. |
| `filters[].po_excess_override` | boolean filter | no | Filter on `po_excess_override`. |
| `filters[].po_excess_override_percent` | integer filter | no | Filter on `po_excess_override_percent`. |
| `filters[].po_excess_error` | boolean filter | no | Filter on `po_excess_error`. |
| `filters[].po_excess_error_percent` | integer filter | no | Filter on `po_excess_error_percent`. |
| `filters[].po_shortage_message` | boolean filter | no | Filter on `po_shortage_message`. |
| `filters[].po_shortage_override` | boolean filter | no | Filter on `po_shortage_override`. |
| `filters[].po_shortage_override_percent` | integer filter | no | Filter on `po_shortage_override_percent`. |
| `filters[].asn_po_qty_discrepancy` | string filter | no | Filter on `asn_po_qty_discrepancy`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptPolicy] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].code` | string | yes |  |
| `data[].date_deviation_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].descr` | string or null | no |  |
| `data[].excess_error` | boolean | yes |  |
| `data[].excess_error_percent` | integer (int32) or null | no |  |
| `data[].excess_message` | boolean | yes |  |
| `data[].excess_override` | boolean | yes |  |
| `data[].excess_override_percent` | integer (int32) or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].po_excess_error` | boolean | yes |  |
| `data[].po_excess_error_percent` | integer (int32) or null | no |  |
| `data[].po_excess_message` | boolean | yes |  |
| `data[].po_excess_override` | boolean | yes |  |
| `data[].po_excess_override_percent` | integer (int32) or null | no |  |
| `data[].po_qty_validation` | string | yes |  |
| `data[].po_shortage_message` | boolean | yes |  |
| `data[].po_shortage_override` | boolean | yes |  |
| `data[].po_shortage_override_percent` | integer (int32) or null | no |  |
| `data[].qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].qty_validation` | string | yes |  |
| `data[].receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data[].shortage_message` | boolean | yes |  |
| `data[].shortage_override` | boolean | yes |  |
| `data[].shortage_override_percent` | integer (int32) or null | no |  |
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
  "method": "list_receipt_policy",
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

### update_receipt_policy

Update a receipt policy without overwriting a newer configuration.

| | |
|---|---|
| Context / module | inbound / receipt_policy |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_receipt_policy` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |
| Version check | entity `receipt_policy`: send `expected_version` for row `id` |

**Notes**

- The catalog does not say whether this method needs an idempotency key.
- Send the current version of the row in `expected_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope supplied by the platform. |
| `data` | object | yes | Versioned update payload. |
| `data.data` | object (ReceiptPolicyConfigUpdate) | yes | Partial edit of the receipt-policy configuration. |
| `data.data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.date_deviation_check` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.descr` | string or null | no |  |
| `data.data.excess_error` | boolean | no |  |
| `data.data.excess_error_percent` | integer (int32) or null | no |  |
| `data.data.excess_message` | boolean | no |  |
| `data.data.excess_override` | boolean | no |  |
| `data.data.excess_override_percent` | integer (int32) or null | no |  |
| `data.data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.no_sku_on_po` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.po_excess_error` | boolean | no |  |
| `data.data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.data.po_excess_message` | boolean | no |  |
| `data.data.po_excess_override` | boolean | no |  |
| `data.data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.data.po_qty_validation` | string | no |  |
| `data.data.po_shortage_message` | boolean | no |  |
| `data.data.po_shortage_override` | boolean | no |  |
| `data.data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.qty_validation` | string | no |  |
| `data.data.receipt_without_asn` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.receipt_without_po` | one of: Allow \| HardError \| Warning | no |  |
| `data.data.shortage_message` | boolean | no |  |
| `data.data.shortage_override` | boolean | no |  |
| `data.data.shortage_override_percent` | integer (int32) or null | no |  |
| `data.expected_version` | integer (int32) | yes |  |
| `data.id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptPolicy }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.asn_po_qty_discrepancy` | one of: Allow \| HardError \| Warning | yes |  |
| `data.code` | string | yes |  |
| `data.date_deviation_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.descr` | string or null | no |  |
| `data.excess_error` | boolean | yes |  |
| `data.excess_error_percent` | integer (int32) or null | no |  |
| `data.excess_message` | boolean | yes |  |
| `data.excess_override` | boolean | yes |  |
| `data.excess_override_percent` | integer (int32) or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.no_sku_on_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.no_sku_on_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.po_excess_error` | boolean | yes |  |
| `data.po_excess_error_percent` | integer (int32) or null | no |  |
| `data.po_excess_message` | boolean | yes |  |
| `data.po_excess_override` | boolean | yes |  |
| `data.po_excess_override_percent` | integer (int32) or null | no |  |
| `data.po_qty_validation` | string | yes |  |
| `data.po_shortage_message` | boolean | yes |  |
| `data.po_shortage_override` | boolean | yes |  |
| `data.po_shortage_override_percent` | integer (int32) or null | no |  |
| `data.qty_pack_multiple_check` | one of: Allow \| HardError \| Warning | yes |  |
| `data.qty_validation` | string | yes |  |
| `data.receipt_without_asn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_lpn` | one of: Allow \| HardError \| Warning | yes |  |
| `data.receipt_without_po` | one of: Allow \| HardError \| Warning | yes |  |
| `data.shortage_message` | boolean | yes |  |
| `data.shortage_override` | boolean | yes |  |
| `data.shortage_override_percent` | integer (int32) or null | no |  |
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
  "method": "update_receipt_policy",
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

## Module: receipt

### assign_lpn

Mint N fresh LPN codes from the warehouse container_code sequence (FOR-UPDATE-locked, no collisions).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `assign_lpn` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (AssignLpnInput) | yes |  |
| `data.format_id` | integer (int64) or null | no | Catalog spec mentions a numeric `format_id`. |
| `data.qty` | integer (int64) or null | no | How many LPN codes to mint in this batch. |
| `data.sku_id` | integer (int64) or null | no | Informational only — recorded in event payloads / audit when this becomes a tracked allocation. |

**Result**

The `result` member of the response is: `{ "data": AssignLpnResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.lpns` | array of string | yes | Newly minted LPN codes, in the order they were drawn from the sequence. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "lpns": [
        "<lpns>"
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
  "method": "assign_lpn",
  "params": {
    "data": {}
  }
}'
```

### count_receipt

Count receipt — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_number` | string filter | no | Filter on `receipt_number`. |
| `filters[].external_receipt_number` | string filter | no | Filter on `external_receipt_number`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].po_id` | integer filter | no | Filter on `po_id`. |
| `filters[].carrier_id` | integer filter | no | Filter on `carrier_id`. |
| `filters[].vehicle_plate` | string filter | no | Filter on `vehicle_plate`. |
| `filters[].inventory_tracking_granularity` | string filter | no | Filter on `inventory_tracking_granularity`. |
| `filters[].unplanned_case_on_asn` | string filter | no | Filter on `unplanned_case_on_asn`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].receipt_type` | string filter | no | Filter on `receipt_type`. |
| `filters[].door` | string filter | no | Filter on `door`. |
| `filters[].temperature` | number filter | no | Filter on `temperature`. |
| `filters[].supplier_id` | integer filter | no | Filter on `supplier_id`. |
| `filters[].driver_name` | string filter | no | Filter on `driver_name`. |
| `filters[].trailer_plate` | string filter | no | Filter on `trailer_plate`. |
| `filters[].trailer_type` | string filter | no | Filter on `trailer_type`. |
| `filters[].total_weight` | number filter | no | Filter on `total_weight`. |
| `filters[].total_volume` | number filter | no | Filter on `total_volume`. |
| `filters[].rma` | string filter | no | Filter on `rma`. |
| `filters[].expected_receipt_date` | value (date, time or other) filter | no | Filter on `expected_receipt_date`. |
| `filters[].receipt_date` | value (date, time or other) filter | no | Filter on `receipt_date`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].close_date` | value (date, time or other) filter | no | Filter on `close_date`. |
| `filters[].arrival_date` | value (date, time or other) filter | no | Filter on `arrival_date`. |
| `filters[].actual_ship_date` | value (date, time or other) filter | no | Filter on `actual_ship_date`. |
| `filters[].scheduled_ship_date` | value (date, time or other) filter | no | Filter on `scheduled_ship_date`. |
| `filters[].promised_ship_date` | value (date, time or other) filter | no | Filter on `promised_ship_date`. |
| `filters[].planned_ship_date` | value (date, time or other) filter | no | Filter on `planned_ship_date`. |
| `filters[].vehicle_date` | value (date, time or other) filter | no | Filter on `vehicle_date`. |
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
  "method": "count_receipt",
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

### create_receipt

Create a new receipt — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReceiptForCreate) | yes |  |
| `data.actual_ship_date` | string or null | no |  |
| `data.arrival_date` | string or null | no |  |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no | ADR-046 D-69b — set by `CreateCaseLevelAsn` from the cascade (ASN payload \\|\\| operator UI \\|\\| owner_config default \\|\\| `Aggregate`). |
| `data.owner_id` | integer (int64) | yes |  |
| `data.planned_ship_date` | string or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string or null | no |  |
| `data.receipt_date` | string or null | no |  |
| `data.receipt_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer or null | no |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string or null | no |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled or null | no |  |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — set by `CreateCaseLevelAsn` from the cascade when granularity != Aggregate. |
| `data.vehicle_date` | string or null | no |  |
| `data.vehicle_plate` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": General Receipt model }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.actual_ship_date` | string or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.arrival_date` | string or null | no |  |
| `data.cancel_summary` | any | no | Per Decisions Log D-19. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.close_summary` | any | no | Per Decisions Log D-18. |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.planned_ship_date` | string or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string or null | no |  |
| `data.receipt_date` | string or null | no |  |
| `data.receipt_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string or null | no |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data.vehicle_date` | string or null | no |  |
| `data.vehicle_plate` | string or null | no |  |
| `data.version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "create_receipt",
  "params": {
    "data": {
      "owner_id": 1,
      "receipt_number": "<receipt_number>"
    }
  }
}'
```

### delete_many_receipt

Delete receipts atomically; refuses the batch when any line has received quantity.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_receipt` |
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
  "method": "delete_many_receipt",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_receipt

Delete a receipt atomically; refuses when any line has received quantity.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": General Receipt model }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.actual_ship_date` | string or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.arrival_date` | string or null | no |  |
| `data.cancel_summary` | any | no | Per Decisions Log D-19. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.close_summary` | any | no | Per Decisions Log D-18. |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.planned_ship_date` | string or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string or null | no |  |
| `data.receipt_date` | string or null | no |  |
| `data.receipt_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string or null | no |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data.vehicle_date` | string or null | no |  |
| `data.vehicle_plate` | string or null | no |  |
| `data.version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "delete_receipt",
  "params": {
    "id": 1
  }
}'
```

### find_printer_for_context

Resolve a printer for (user, owner, warehouse) via the User→Owner→Warehouse priority chain.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_printer_for_context` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindPrinterForContextInput) | yes |  |
| `data.owner_id` | integer (int64) or null | no | Optional. When `None` the Owner-scope tier is skipped. |
| `data.user_id` | integer (int64) | yes |  |
| `data.warehouse_id` | integer (int64) | yes | Warehouse the assignment is being looked up in. |

**Result**

The `result` member of the response is: `{ "data": FindPrinterForContextResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.matched_scope` | string or null | no | Which scope tier resolved — for the UI to surface "you're using the warehouse-default printer" type messages. |
| `data.printer_id` | integer (int64) or null | no | The chosen printer_id, or None when no assignment matches at any scope level. |

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
  "method": "find_printer_for_context",
  "params": {
    "data": {
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}'
```

### find_receipt_by_number

Find receipt by receipt_number; optional kind filter.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_receipt_by_number` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindReceiptByNumberInput) | yes |  |
| `data.kind` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer or null | no | Optional filter by `receipt_type`. |
| `data.number` | string | yes | `receipt.receipt_number` — UNIQUE per warehouse, used by RF / UI scan-and-go flows. |

**Result**

The `result` member of the response is: `{ "data": object (General Receipt model) or null }`

Type of `data`: object (General Receipt model) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "completion": "Pending",
      "id": 1,
      "inventory_tracking_granularity": "Aggregate",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1,
      "receipt_number": "<receipt_number>",
      "receipt_type": "Normal",
      "status": "Open",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "find_receipt_by_number",
  "params": {
    "data": {
      "number": "<number>"
    }
  }
}'
```

### find_receipt_by_rma

Find Customer Return by RMA reference (receipt.rma OR external_receipt_number, scoped to receipt_type=CustomerReturn).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_receipt_by_rma` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindReceiptByRmaInput) | yes |  |
| `data.rma_number` | string | yes | RMA reference as the operator scans / types it. |

**Result**

The `result` member of the response is: `{ "data": object (General Receipt model) or null }`

Type of `data`: object (General Receipt model) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "completion": "Pending",
      "id": 1,
      "inventory_tracking_granularity": "Aggregate",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1,
      "receipt_number": "<receipt_number>",
      "receipt_type": "Normal",
      "status": "Open",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "find_receipt_by_rma",
  "params": {
    "data": {
      "rma_number": "<rma_number>"
    }
  }
}'
```

### find_receipt_line_by_sku

Find receipt_detail by (receipt_id, sku_code) — single row; null if absent.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_receipt_line_by_sku` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindReceiptLineBySkuInput) | yes |  |
| `data.owner_id` | integer (int64) or null | no | Optional. If `None` the BMC matches any owner — reasonable default for single-tenant warehouses or when caller knows the receipt already disambiguates owner. RF flows that scan inside an owner-scoped receipt header should pass it explicitly. |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": object (ReceiptDetail) or null }`

Type of `data`: object (ReceiptDetail) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "completion": "Pending",
      "effective_date": "<effective_date>",
      "id": 1,
      "lot_attr_check_mode": "Disabled",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "owner_id": 1,
      "receipt_id": 1,
      "receipt_line_number": "<receipt_line_number>",
      "receipt_type": "Normal",
      "sku": "<sku>",
      "status": "Open",
      "target_disposition": "Stock",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "find_receipt_line_by_sku",
  "params": {
    "data": {
      "receipt_id": 1,
      "sku_code": "<sku_code>"
    }
  }
}'
```

### get_asn_by_number

Exact-match resolver for a scanned ASN — single receipt or DocumentNotFound; used by RCASN01 autoSubmit.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_asn_by_number` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetAsnByNumberInput) | yes |  |
| `data.receipt_number` | string | yes | Exact receipt_number (e.g. |

**Result**

The `result` member of the response is: `{ "data": AsnDetails }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.completion` | string | yes |  |
| `data.expected_receipt_date` | string (date-time) or null | no | RFC 3339 in UTC; RF shows it in the viewer's own zone. |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | string | yes | `receipt.inventory_tracking_granularity` (`Aggregate` \\| `Pallet` \\| `Case`). |
| `data.open_episode` | object (OpenEpisodeBrief) or null | no | First Open / InProgress / AwaitingConfirmation serial-capture episode attached to any detail of this receipt, if any. |
| `data.open_episode.captured_qty` | integer (int32) | yes |  |
| `data.open_episode.episode_id` | integer (int64) | yes |  |
| `data.open_episode.expected_qty` | integer (int32) | yes |  |
| `data.open_episode.receipt_detail_id` | integer (int64) | yes |  |
| `data.open_episode.sku_code` | string | yes |  |
| `data.owner_code` | string | yes |  |
| `data.owner_company` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty_expected_total` | number (double) | yes |  |
| `data.qty_received_total` | number (double) | yes |  |
| `data.receipt_number` | string | yes |  |
| `data.status` | string | yes |  |
| `data.version` | integer (int32) | yes | OCC version (per CLAUDE.md classifier rules) — receipt is a stateful entity, downstream commands (`receipt_close` / `receipt_cancel` / `receipt_adjust_received_qty`) carry this on submit. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "completion": "<completion>",
      "id": 1,
      "inventory_tracking_granularity": "<inventory_tracking_granularity>",
      "owner_code": "<owner_code>",
      "owner_company": "<owner_company>",
      "owner_id": 1,
      "qty_expected_total": 1,
      "qty_received_total": 1,
      "receipt_number": "<receipt_number>",
      "status": "<status>",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_asn_by_number",
  "params": {
    "data": {
      "receipt_number": "<receipt_number>"
    }
  }
}'
```

### get_cancel_blockers

Reasons CancelReceipt would refuse (D-19): terminal status, non-Pending completion, received qty present.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_cancel_blockers` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetCancelBlockersInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [CancelBlocker] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes | Stable code: `"already_terminal"`, `"completion_not_pending"`, `"received_qty_present"`. |
| `data[].message` | string | yes |  |

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
  "method": "get_cancel_blockers",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_close_blockers

Reasons CloseReceipt would refuse: terminal status, unresolved serial capture, qty mismatch, pending damage.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_close_blockers` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetCloseBlockersInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [CloseBlocker] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes | Stable code: `"already_terminal"`, `"open_serial_episode"`, `"qty_mismatch"`, `"pending_damage"`. |
| `data[].count` | integer (int64) or null | no | Optional count when the blocker is plural (for example, three unresolved episodes). |
| `data[].message` | string | yes |  |

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
  "method": "get_close_blockers",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_owner_damage_policy

Damage routing policy for an owner (None/Hold/Reject per severity).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_owner_damage_policy` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetOwnerDamagePolicyInput) | yes |  |
| `data.owner_id` | integer (int64) | yes | `owners.id` of the SKU's owner. |

**Result**

The `result` member of the response is: `{ "data": object (OwnerDamagePolicy) or null }`

Type of `data`: object (OwnerDamagePolicy) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "damage_major_action": "None",
      "damage_minor_action": "None",
      "damage_total_action": "None",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_owner_damage_policy",
  "params": {
    "data": {
      "owner_id": 1
    }
  }
}'
```

### get_receipt

Get a receipt by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": General Receipt model }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.actual_ship_date` | string or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.arrival_date` | string or null | no |  |
| `data.cancel_summary` | any | no | Per Decisions Log D-19. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.close_summary` | any | no | Per Decisions Log D-18. |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.planned_ship_date` | string or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string or null | no |  |
| `data.receipt_date` | string or null | no |  |
| `data.receipt_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string or null | no |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data.vehicle_date` | string or null | no |  |
| `data.vehicle_plate` | string or null | no |  |
| `data.version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "get_receipt",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_detail_history

Per-line history: header audit + matching transaction_log entries (no detail-audit table; this is the closest available).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_detail_history` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetReceiptDetailHistoryInput) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptDetailHistoryEvent] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].actor_user_id` | integer (int64) or null | no |  |
| `data[].at` | string (date-time) | yes | RFC 3339 in UTC. |
| `data[].event_id` | integer (int64) | yes |  |
| `data[].event_kind` | string | yes | `"audit"` (header-level field change) or `"txn"` (inventory move). |
| `data[].label` | string | yes | For `audit`: the field that changed (e.g. |
| `data[].new_value` | string or null | no |  |
| `data[].old_value` | string or null | no |  |

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
  "method": "get_receipt_detail_history",
  "params": {
    "data": {
      "receipt_detail_id": 1
    }
  }
}'
```

### get_receipt_full

Receipt envelope: header + lines + last audit row in one roundtrip.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_full` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetReceiptFullInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": General Receipt model }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.actual_ship_date` | string or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.arrival_date` | string or null | no |  |
| `data.cancel_summary` | any | no | Per Decisions Log D-19. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.close_summary` | any | no | Per Decisions Log D-18. |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data.last_audit_event` | object (ReceiptAudit) or null | no | Most recent audit row for the receipt; None when nothing audited yet. |
| `data.last_audit_event.changed_at` | string | yes |  |
| `data.last_audit_event.changed_by` | integer (int64) | yes |  |
| `data.last_audit_event.field_name` | string | yes |  |
| `data.last_audit_event.id` | integer (int64) | yes |  |
| `data.last_audit_event.new_value` | string or null | no |  |
| `data.last_audit_event.old_value` | string or null | no |  |
| `data.last_audit_event.receipt_id` | integer (int64) | yes |  |
| `data.lines` | array of object (ReceiptDetail) | yes | All receipt_detail rows for this receipt, sorted by line_number. |
| `data.lines[].add_when` | string | yes |  |
| `data.lines[].add_who` | integer (int64) | yes |  |
| `data.lines[].barcode` | string or null | no |  |
| `data.lines[].best_by_date` | string or null | no |  |
| `data.lines[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.lines[].container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.lines[].delivery_by_date` | string or null | no |  |
| `data.lines[].effective_date` | string | yes |  |
| `data.lines[].expiration_date` | string or null | no |  |
| `data.lines[].external_lot` | string or null | no |  |
| `data.lines[].external_receipt_line_number` | string or null | no |  |
| `data.lines[].external_receipt_number` | string or null | no |  |
| `data.lines[].hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.lines[].id` | integer (int64) | yes |  |
| `data.lines[].lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.lines[].manufactured_date` | string or null | no |  |
| `data.lines[].mod_when` | string | yes |  |
| `data.lines[].mod_who` | integer (int64) | yes |  |
| `data.lines[].owner_id` | integer (int64) | yes |  |
| `data.lines[].pack_id` | integer (int64) or null | no |  |
| … | | | 46 more fields. See `openrpc.json`. |

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
  "method": "get_receipt_full",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_receipt_hold_history

Receipt OnHold history (place/release events) sourced from receipt_audit status field.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_hold_history` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetReceiptHoldHistoryInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptHoldEvent] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].audit_id` | integer (int64) | yes |  |
| `data[].changed_at` | string (date-time) | yes | RFC 3339 in UTC. |
| `data[].changed_by` | integer (int64) | yes |  |
| `data[].direction` | string | yes | `"placed"` when transitioning *into* OnHold, `"released"` when transitioning *out of* OnHold. |
| `data[].new_value` | string or null | no |  |
| `data[].old_value` | string or null | no |  |

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
  "method": "get_receipt_hold_history",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_receipt_summary

Receipt summary for close confirmation: per-line ordered/received/short/over/damaged + totals + can_close hint.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_summary` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetReceiptSummaryInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptSummary }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_close` | boolean | yes | True when no exceptions exist AND status is not already terminal. |
| `data.completion` | string or null | no |  |
| `data.exception_lines` | integer (int64) | yes | Count of detail lines that have any of: short&gt;0, over&gt;0, damaged&gt;0, rejected&gt;0. |
| `data.lines` | array of object (ReceiptSummaryLine) | yes | Per-line breakdown. |
| `data.lines[].damaged` | number (double) | yes |  |
| `data.lines[].ordered` | number (double) | yes |  |
| `data.lines[].over` | number (double) | yes | max(0, received - ordered). |
| `data.lines[].receipt_detail_id` | integer (int64) | yes |  |
| `data.lines[].receipt_line_number` | string | yes |  |
| `data.lines[].received` | number (double) | yes |  |
| `data.lines[].rejected` | number (double) | yes |  |
| `data.lines[].short` | number (double) | yes | max(0, ordered - received). |
| `data.lines[].sku` | string | yes |  |
| `data.lines[].status` | string | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_number` | string | yes |  |
| `data.status` | string | yes |  |
| `data.total_damaged` | number (double) | yes | Sum of `lines[].damaged`. |
| `data.total_ordered` | number (double) | yes | Sum of `lines[].ordered`. |
| `data.total_received` | number (double) | yes | Sum of `lines[].received`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_close": false,
      "exception_lines": 1,
      "lines": [
        {
          "damaged": 1,
          "ordered": 1,
          "over": 1,
          "receipt_detail_id": 1,
          "receipt_line_number": "<receipt_line_number>",
          "received": 1,
          "rejected": 1,
          "short": 1,
          "sku": "<sku>",
          "status": "<status>"
        }
      ],
      "receipt_id": 1,
      "receipt_number": "<receipt_number>",
      "status": "<status>",
      "total_damaged": 1,
      "total_ordered": 1,
      "total_received": 1
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
  "method": "get_receipt_summary",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_sku_envelope

SKU envelope: sku + serial_config + barcodes for receive-flow round-trip elimination.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_sku_envelope` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetSkuEnvelopeInput) | yes |  |
| `data.owner_code` | string or null | no | Business owner code (e.g. |
| `data.owner_id` | integer (int64) or null | no | Numeric owner id. |
| `data.receipt_id` | integer (int64) or null | no | Optional receipt context. |
| `data.sku_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": SkuEnvelope }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.barcodes` | array of object (SkuBarcode) | yes | All active barcodes for this SKU. |
| `data.barcodes[].add_when` | string | yes |  |
| `data.barcodes[].add_who` | integer (int64) | yes |  |
| `data.barcodes[].barcode` | string | yes |  |
| `data.barcodes[].barcode_type` | one of: None \| Upc \| Mni \| Rtlin \| Epcid \| Crn \| Gtin or null | no |  |
| `data.barcodes[].default_uom` | string | yes |  |
| `data.barcodes[].id` | integer (int64) | yes |  |
| `data.barcodes[].mod_when` | string | yes |  |
| `data.barcodes[].mod_who` | integer (int64) | yes |  |
| `data.barcodes[].owner_id` | integer (int64) | yes |  |
| `data.barcodes[].pack_id` | integer (int64) | yes |  |
| `data.barcodes[].sku_code` | string | yes |  |
| `data.barcodes[].sku_id` | integer (int64) | yes |  |
| `data.barcodes[].user_notes1` | string or null | no |  |
| `data.barcodes[].user_notes2` | string or null | no |  |
| `data.barcodes[].vendor_id` | integer (int64) or null | no |  |
| `data.expected_lpn` | string or null | no | The LPN RF prefills To LPN with: the supplier's expected LPN, when every open line of this SKU on the receipt that offers one offers the same one — a line offers its expected LPN unless it was already received into ANOTHER LPN. |
| `data.lot_policy_attributes` | array of object (LotAttributePrompt) | yes | Lot-attribute prompt for this SKU (`show=true` attrs only). |
| `data.lot_policy_attributes[].attrib_code` | string | yes |  |
| `data.lot_policy_attributes[].descr` | string or null | no |  |
| `data.lot_policy_attributes[].is_date` | boolean | yes | `true` → this slot is a DATE, not free text: one of the four date columns `lot_policy` carries (`DATE_ATTRIBUTE_CODES`), folded in as a synthetic slot so RF and the web prompt for it alongside the custom attributes. |
| `data.lot_policy_attributes[].label` | string or null | no |  |
| `data.lot_policy_attributes[].readonly` | boolean | yes | `true` → operator may not edit. |
| `data.lot_policy_attributes[].required` | boolean | yes |  |
| `data.lot_policy_attributes[].value` | string or null | no | ASN-expected value for this attribute on the scanned line, when the line carries one. |
| `data.owner_id` | integer (int64) | yes | Resolved owner id. |
| `data.pack` | object (Pack) or null | no | Default Pack tied to `sku.pack_id`. |
| `data.pack.add_when` | string | yes |  |
| `data.pack.add_who` | integer (int64) | yes |  |
| `data.pack.code` | string | yes |  |
| `data.pack.descr` | string | yes |  |
| `data.pack.id` | integer (int64) | yes |  |
| `data.pack.items` | array of object (PackItem) | yes |  |
| `data.pack.mod_when` | string | yes |  |
| `data.pack.mod_who` | integer (int64) | yes |  |
| `data.serial_config` | object (SkuSerialConfig) or null | no | Per-SKU serial-tracking configuration. |
| `data.serial_config.add_when` | string | yes |  |
| `data.serial_config.add_who` | integer (int64) | yes |  |
| `data.serial_config.allow_asn_pre_advised` | boolean | yes |  |
| `data.serial_config.allow_deferred_capture` | boolean | yes | Explicit permission to receive inventory before serial capture is complete. |
| `data.serial_config.allow_receive_capture` | boolean | yes |  |
| `data.serial_config.anomaly_block_severity` | boolean or null | no |  |
| `data.serial_config.anomaly_max_per_lpn` | integer (int32) or null | no |  |
| `data.serial_config.anomaly_velocity_threshold_min` | integer (int32) or null | no |  |
| `data.serial_config.anomaly_vendor_surge_factor` | number (double) or null | no |  |
| … | | | 79 more fields. See `openrpc.json`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "barcodes": [
        {
          "add_when": "<add_when>",
          "add_who": 1,
          "barcode": "<barcode>",
          "default_uom": "<default_uom>",
          "id": 1,
          "mod_when": "<mod_when>",
          "mod_who": 1,
          "owner_id": 1,
          "pack_id": 1,
          "sku_code": "<sku_code>",
          "sku_id": 1
        }
      ],
      "lot_policy_attributes": [
        {
          "attrib_code": "<attrib_code>",
          "is_date": false,
          "readonly": false,
          "required": false
        }
      ],
      "owner_id": 1,
      "sku": {
        "add_when": "<add_when>",
        "add_who": 1,
        "code": "<code>",
        "descr": "<descr>",
        "id": 1,
        "mod_when": "<mod_when>",
        "mod_who": 1,
        "owner_id": 1,
        "pack_id": 1,
        "requires_temperature_capture": false
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_sku_envelope",
  "params": {
    "data": {
      "sku_code": "<sku_code>"
    }
  }
}'
```

### list_damage_action_codes

Active damage action codes (None/Hold/Reject) — code_list_id 1005.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_damage_action_codes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes |  |

**Result**

The `result` member of the response is: `{ "data": [CodeListEntry] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
| `data[].display_order` | integer (int16) | yes |  |

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
  "method": "list_damage_action_codes",
  "params": {
    "data": {}
  }
}'
```

### list_damage_severity_codes

Active damage severity codes (Minor/Major/Total) — code_list_id 1006.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_damage_severity_codes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes |  |

**Result**

The `result` member of the response is: `{ "data": [CodeListEntry] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
| `data[].display_order` | integer (int16) | yes |  |

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
  "method": "list_damage_severity_codes",
  "params": {
    "data": {}
  }
}'
```

### list_my_open_receipts

List non-terminal receipts created by a user (RF 'my open' landing list).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_my_open_receipts` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListMyOpenReceiptsInput) | yes |  |
| `data.limit` | integer (int64) or null | no | Cap on rows returned. |
| `data.user_id` | integer (int64) | yes | Receipts created by this user (`receipt.add_who`). |
| `data.warehouse_id` | integer (int64) | yes | Warehouse scope is already implicit in `Ctx.wh_schema` — the row list is restricted to that schema's `receipt` table. |

**Result**

The `result` member of the response is: `{ "data": [General Receipt model] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].actual_ship_date` | string or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].arrival_date` | string or null | no |  |
| `data[].cancel_summary` | any | no | Per Decisions Log D-19. |
| `data[].carrier_id` | integer (int64) or null | no |  |
| `data[].close_date` | string or null | no |  |
| `data[].close_summary` | any | no | Per Decisions Log D-18. |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].door` | string or null | no |  |
| `data[].driver_name` | string or null | no |  |
| `data[].effective_date` | string or null | no |  |
| `data[].expected_receipt_date` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].planned_ship_date` | string or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].promised_ship_date` | string or null | no |  |
| `data[].receipt_date` | string or null | no |  |
| `data[].receipt_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].rma` | string or null | no |  |
| `data[].scheduled_ship_date` | string or null | no |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].supplier_id` | integer (int64) or null | no |  |
| `data[].temperature` | number (double) or null | no |  |
| `data[].total_volume` | number (double) or null | no |  |
| `data[].total_weight` | number (double) or null | no |  |
| `data[].trailer_plate` | string or null | no |  |
| `data[].trailer_type` | string or null | no |  |
| `data[].unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data[].vehicle_date` | string or null | no |  |
| `data[].vehicle_plate` | string or null | no |  |
| `data[].version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "list_my_open_receipts",
  "params": {
    "data": {
      "user_id": 1,
      "warehouse_id": 1
    }
  }
}'
```

### list_open_blind_receipts

List open NoAsn receipts for the Receive Blind landing screen.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_open_blind_receipts` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListOpenBlindReceiptsInput) | yes |  |
| `data.owner_id` | integer (int64) or null | no | Optional owner filter — when present, restricts to that owner's blind receipts. |
| `data.warehouse_id` | integer (int64) | yes | Compatibility field used by existing RF payloads. |

**Result**

The `result` member of the response is: `{ "data": [General Receipt model] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].actual_ship_date` | string or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].arrival_date` | string or null | no |  |
| `data[].cancel_summary` | any | no | Per Decisions Log D-19. |
| `data[].carrier_id` | integer (int64) or null | no |  |
| `data[].close_date` | string or null | no |  |
| `data[].close_summary` | any | no | Per Decisions Log D-18. |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].door` | string or null | no |  |
| `data[].driver_name` | string or null | no |  |
| `data[].effective_date` | string or null | no |  |
| `data[].expected_receipt_date` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].planned_ship_date` | string or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].promised_ship_date` | string or null | no |  |
| `data[].receipt_date` | string or null | no |  |
| `data[].receipt_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].rma` | string or null | no |  |
| `data[].scheduled_ship_date` | string or null | no |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].supplier_id` | integer (int64) or null | no |  |
| `data[].temperature` | number (double) or null | no |  |
| `data[].total_volume` | number (double) or null | no |  |
| `data[].total_weight` | number (double) or null | no |  |
| `data[].trailer_plate` | string or null | no |  |
| `data[].trailer_type` | string or null | no |  |
| `data[].unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data[].vehicle_date` | string or null | no |  |
| `data[].vehicle_plate` | string or null | no |  |
| `data[].version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "list_open_blind_receipts",
  "params": {
    "data": {
      "warehouse_id": 1
    }
  }
}'
```

### list_open_customer_returns

List open Customer Returns (CustomerReturn type, NOT Closed/Cancelled) for the RCRTN01 F2 picker.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_open_customer_returns` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListOpenCustomerReturnsInput) | yes |  |
| `data.owner_id` | integer (int64) or null | no | Optional owner filter — when present, restricts to that owner's open customer returns. |
| `data.q` | string or null | no | Substring match against `receipt.rma` (case-insensitive). |

**Result**

The `result` member of the response is: `{ "data": [General Receipt model] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].actual_ship_date` | string or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].arrival_date` | string or null | no |  |
| `data[].cancel_summary` | any | no | Per Decisions Log D-19. |
| `data[].carrier_id` | integer (int64) or null | no |  |
| `data[].close_date` | string or null | no |  |
| `data[].close_summary` | any | no | Per Decisions Log D-18. |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].door` | string or null | no |  |
| `data[].driver_name` | string or null | no |  |
| `data[].effective_date` | string or null | no |  |
| `data[].expected_receipt_date` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].planned_ship_date` | string or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].promised_ship_date` | string or null | no |  |
| `data[].receipt_date` | string or null | no |  |
| `data[].receipt_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].rma` | string or null | no |  |
| `data[].scheduled_ship_date` | string or null | no |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].supplier_id` | integer (int64) or null | no |  |
| `data[].temperature` | number (double) or null | no |  |
| `data[].total_volume` | number (double) or null | no |  |
| `data[].total_weight` | number (double) or null | no |  |
| `data[].trailer_plate` | string or null | no |  |
| `data[].trailer_type` | string or null | no |  |
| `data[].unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data[].vehicle_date` | string or null | no |  |
| `data[].vehicle_plate` | string or null | no |  |
| `data[].version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "list_open_customer_returns",
  "params": {
    "data": {}
  }
}'
```

### list_qty_adjust_reasons

Reasons for adjusting a received qty — code list `qty_adjust_reason`.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_qty_adjust_reasons` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes |  |

**Result**

The `result` member of the response is: `{ "data": [ActiveCodeListValue] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
| `data[].display_order` | integer (int16) | yes |  |

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
  "method": "list_qty_adjust_reasons",
  "params": {
    "data": {}
  }
}'
```

### list_receipt

List receipt — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_number` | string filter | no | Filter on `receipt_number`. |
| `filters[].external_receipt_number` | string filter | no | Filter on `external_receipt_number`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].po_id` | integer filter | no | Filter on `po_id`. |
| `filters[].carrier_id` | integer filter | no | Filter on `carrier_id`. |
| `filters[].vehicle_plate` | string filter | no | Filter on `vehicle_plate`. |
| `filters[].inventory_tracking_granularity` | string filter | no | Filter on `inventory_tracking_granularity`. |
| `filters[].unplanned_case_on_asn` | string filter | no | Filter on `unplanned_case_on_asn`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].receipt_type` | string filter | no | Filter on `receipt_type`. |
| `filters[].door` | string filter | no | Filter on `door`. |
| `filters[].temperature` | number filter | no | Filter on `temperature`. |
| `filters[].supplier_id` | integer filter | no | Filter on `supplier_id`. |
| `filters[].driver_name` | string filter | no | Filter on `driver_name`. |
| `filters[].trailer_plate` | string filter | no | Filter on `trailer_plate`. |
| `filters[].trailer_type` | string filter | no | Filter on `trailer_type`. |
| `filters[].total_weight` | number filter | no | Filter on `total_weight`. |
| `filters[].total_volume` | number filter | no | Filter on `total_volume`. |
| `filters[].rma` | string filter | no | Filter on `rma`. |
| `filters[].expected_receipt_date` | value (date, time or other) filter | no | Filter on `expected_receipt_date`. |
| `filters[].receipt_date` | value (date, time or other) filter | no | Filter on `receipt_date`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].close_date` | value (date, time or other) filter | no | Filter on `close_date`. |
| `filters[].arrival_date` | value (date, time or other) filter | no | Filter on `arrival_date`. |
| `filters[].actual_ship_date` | value (date, time or other) filter | no | Filter on `actual_ship_date`. |
| `filters[].scheduled_ship_date` | value (date, time or other) filter | no | Filter on `scheduled_ship_date`. |
| `filters[].promised_ship_date` | value (date, time or other) filter | no | Filter on `promised_ship_date`. |
| `filters[].planned_ship_date` | value (date, time or other) filter | no | Filter on `planned_ship_date`. |
| `filters[].vehicle_date` | value (date, time or other) filter | no | Filter on `vehicle_date`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [General Receipt model] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].actual_ship_date` | string or null | no |  |
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].arrival_date` | string or null | no |  |
| `data[].cancel_summary` | any | no | Per Decisions Log D-19. |
| `data[].carrier_id` | integer (int64) or null | no |  |
| `data[].close_date` | string or null | no |  |
| `data[].close_summary` | any | no | Per Decisions Log D-18. |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].door` | string or null | no |  |
| `data[].driver_name` | string or null | no |  |
| `data[].effective_date` | string or null | no |  |
| `data[].expected_receipt_date` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].planned_ship_date` | string or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].promised_ship_date` | string or null | no |  |
| `data[].receipt_date` | string or null | no |  |
| `data[].receipt_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].rma` | string or null | no |  |
| `data[].scheduled_ship_date` | string or null | no |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].supplier_id` | integer (int64) or null | no |  |
| `data[].temperature` | number (double) or null | no |  |
| `data[].total_volume` | number (double) or null | no |  |
| `data[].total_weight` | number (double) or null | no |  |
| `data[].trailer_plate` | string or null | no |  |
| `data[].trailer_type` | string or null | no |  |
| `data[].unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data[].vehicle_date` | string or null | no |  |
| `data[].vehicle_plate` | string or null | no |  |
| `data[].version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "list_receipt",
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

### list_shortage_reasons

Shortage reasons for a short ASN receive — code list `shortage_reason`.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_shortage_reasons` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object | yes |  |

**Result**

The `result` member of the response is: `{ "data": [ActiveCodeListValue] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].description` | string | yes |  |
| `data[].display_order` | integer (int16) | yes |  |

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
  "method": "list_shortage_reasons",
  "params": {
    "data": {}
  }
}'
```

### lookup_asn

Search non-terminal ASN headers by number / external_number; predefined filters for the receive-against-ASN UI.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lookup_asn` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LookupAsnInput) | yes |  |
| `data.page` | integer (int64) or null | no | 1-indexed page number. |
| `data.page_size` | integer (int64) or null | no | Page size. Default 50, capped at 200. |
| `data.q` | string or null | no | Optional substring on `receipt_number` or `external_receipt_number`. |

**Result**

The `result` member of the response is: `{ "data": [AsnHeader] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].completion` | string | yes |  |
| `data[].expected_receipt_date` | string (date-time) or null | no | RFC 3339 in UTC; RF shows it in the viewer's own zone. |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_company` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_number` | string | yes |  |
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
  "method": "lookup_asn",
  "params": {
    "data": {}
  }
}'
```

### pre_validate_adjust_qty

Dry-run AdjustQty: terminal-status / negative-qty / picked-qty mismatch checks.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_adjust_qty` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateAdjustQtyInput) | yes |  |
| `data.new_qty_received` | number (double) | yes | New `qty_received` the operator wants to set on the line. |
| `data.receipt_detail_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_adjust_qty",
  "params": {
    "data": {
      "new_qty_received": 1,
      "receipt_detail_id": 1
    }
  }
}'
```

### pre_validate_cancel

Dry-run CancelReceipt — derived from get_cancel_blockers (D-19 rules).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_cancel` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateCancelInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_cancel",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### pre_validate_close

Dry-run CloseReceipt — wraps get_close_blockers with the D-21 allow_discrepancy override.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_close` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateCloseInput) | yes |  |
| `data.allow_discrepancy` | boolean or null | no | Defaults to false. |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_close",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### pre_validate_put_on_hold

Dry-run PutOnHold — refuses on terminal status; surfaces 'already on hold' as a noop hint.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_put_on_hold` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidatePutOnHoldInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_put_on_hold",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### pre_validate_receive_against_asn

Dry-run ReceiveAgainstAsn: receipt status / qty &gt; 0 / temperature / pack-multiple / dates / serials / lot attrs vs expected / hold conditions.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_receive_against_asn` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateReceiveAgainstAsnInput) | yes |  |
| `data.external_lot` | string or null | no | Optional supplier-side lot ID (cascade tier 4). |
| `data.lot_attributes` | object (map) | no |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes | Required — the receipt the operator is working against. |
| `data.serial_numbers` | array of string or null | no |  |
| `data.shortage_reason` | string or null | no |  |
| `data.sku_code` | string | yes | The operator's scan: a SKU code or one of its barcodes (any GTIN width). |
| `data.temperature` | number (double) or null | no |  |
| `data.to_lpn` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_receive_against_asn",
  "params": {
    "data": {
      "qty": 1,
      "receipt_id": 1,
      "sku_code": "<sku_code>"
    }
  }
}'
```

### pre_validate_receive_blind_line

Dry-run ReceiveBlindLine: receipt status / qty / SKU + owner / pipeline (no expected lot attrs comparison).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_receive_blind_line` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateReceiveBlindLineInput) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_id` | integer (int64) or null | no | Optional override; falls back to receipt.owner_id when omitted. |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.serial_numbers` | array of string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.temperature` | number (double) or null | no |  |
| `data.to_lpn` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_receive_blind_line",
  "params": {
    "data": {
      "qty": 1,
      "receipt_id": 1,
      "sku_code": "<sku_code>"
    }
  }
}'
```

### pre_validate_receive_return

Dry-run ReceiveReturn: qty / SKU lookup / pipeline (Resaleable+NeedsRefurb only) — Damaged/Discard skip pipeline.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_receive_return` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateReceiveReturnInput) | yes |  |
| `data.condition` | string | yes | One of `Resaleable \\| NeedsRefurb \\| Damaged \\| Discard`. |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.sku_code` | string | yes |  |
| `data.temperature` | number (double) or null | no |  |
| `data.to_lpn` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_receive_return",
  "params": {
    "data": {
      "condition": "<condition>",
      "owner_id": 1,
      "qty": 1,
      "sku_code": "<sku_code>"
    }
  }
}'
```

### pre_validate_report_damage

Dry-run ReportDamage: terminal-status / non-positive qty / damage exceeds unallocated received qty.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_report_damage` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateReportDamageInput) | yes |  |
| `data.qty_damaged` | number (double) | yes | Damaged qty the operator wants to record. |
| `data.receipt_detail_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_report_damage",
  "params": {
    "data": {
      "qty_damaged": 1,
      "receipt_detail_id": 1
    }
  }
}'
```

### search_asns

Substring search of non-terminal ASN headers (alias for lookup_asn; used by RCASN01 F2 picker).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `search_asns` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LookupAsnInput) | yes |  |
| `data.page` | integer (int64) or null | no | 1-indexed page number. |
| `data.page_size` | integer (int64) or null | no | Page size. Default 50, capped at 200. |
| `data.q` | string or null | no | Optional substring on `receipt_number` or `external_receipt_number`. |

**Result**

The `result` member of the response is: `{ "data": [AsnHeader] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].completion` | string | yes |  |
| `data[].expected_receipt_date` | string (date-time) or null | no | RFC 3339 in UTC; RF shows it in the viewer's own zone. |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_company` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_number` | string | yes |  |
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
  "method": "search_asns",
  "params": {
    "data": {}
  }
}'
```

### search_open_lpns

Plates a receive may be sent to, by code substring — the Receive dialog's LPN picker.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `search_open_lpns` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SearchOpenLpnsInput) | yes |  |
| `data.limit` | integer (int64) or null | no | Page size. Default 30, capped at 100 — the picker is a window, not a report. |
| `data.q` | string or null | no | Optional substring on the plate's code. |

**Result**

The `result` member of the response is: `{ "data": [OpenLpn] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].code` | string | yes |  |
| `data[].display` | string or null | no | The plate in one line; `None` when it has nothing to say about itself. |
| `data[].residents_refuse_another_lot` | boolean | yes | The plate already holds stock whose SKU is configured to refuse a second lot on one plate. |

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
  "method": "search_open_lpns",
  "params": {
    "data": {}
  }
}'
```

### update_receipt

Update the reference data on a receipt — refused once it is Closed or Cancelled.

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_receipt` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (ReceiptUpdateApi) | yes | What a client may change on a receipt header: reference, party and planning data, and nothing the receipt is judged by. |
| `data.actual_ship_date` | string (date-time) or null | no |  |
| `data.arrival_date` | string (date-time) or null | no |  |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.expected_receipt_date` | string (date-time) or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.planned_ship_date` | string (date-time) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string (date-time) or null | no |  |
| `data.receipt_date` | string (date-time) or null | no |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | no |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string (date-time) or null | no |  |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.vehicle_date` | string (date-time) or null | no |  |
| `data.vehicle_plate` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": General Receipt model }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.actual_ship_date` | string or null | no |  |
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.arrival_date` | string or null | no |  |
| `data.cancel_summary` | any | no | Per Decisions Log D-19. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.close_date` | string or null | no |  |
| `data.close_summary` | any | no | Per Decisions Log D-18. |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.door` | string or null | no |  |
| `data.driver_name` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_receipt_date` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case | yes | ADR-046 D-69b — frozen at creation. |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.planned_ship_date` | string or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.promised_ship_date` | string or null | no |  |
| `data.receipt_date` | string or null | no |  |
| `data.receipt_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.rma` | string or null | no |  |
| `data.scheduled_ship_date` | string or null | no |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.total_volume` | number (double) or null | no |  |
| `data.total_weight` | number (double) or null | no |  |
| `data.trailer_plate` | string or null | no |  |
| `data.trailer_type` | string or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | ADR-046 OQ-03 — what to do when scan hits a case not on ASN. |
| `data.vehicle_date` | string or null | no |  |
| `data.vehicle_plate` | string or null | no |  |
| `data.version` | integer (int32) | yes | Per Decisions Log D-07. |

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
  "method": "update_receipt",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

### validate_lpn_unused

Check if an LPN code is free to assign (no live inventory under that container).

| | |
|---|---|
| Context / module | inbound / receipt |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `validate_lpn_unused` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ValidateLpnUnusedInput) | yes |  |
| `data.lpn_code` | string | yes | `container.code` to check — what an operator scans / types as an LPN. |

**Result**

The `result` member of the response is: `{ "data": ValidateLpnUnusedResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.container_id` | integer (int64) or null | no | The matching container.id when one exists with this code, regardless of usage state. |
| `data.is_unused` | boolean | yes | True when the LPN code is safe to assign to a fresh receipt. |
| `data.reason` | string or null | no | Human-readable reason when `is_unused = false`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "is_unused": false
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
  "method": "validate_lpn_unused",
  "params": {
    "data": {
      "lpn_code": "<lpn_code>"
    }
  }
}'
```

## Module: receipt_commands

### receipt_adjust_received_qty

Adjust a previously received qty (delta + reason).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_adjust_received_qty` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
| Idempotency key | required |
| Version check | entity `receipt_detail`: send `expected_line_version` for row `receipt_detail_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_line_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.
- This method can ask for a supervisor override. Send the codes the operator accepted in `acknowledged_overrides`. See 04-command-types-and-concurrency.md and 05-errors.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (AdjustReceivedQty) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.delta_qty` | number (double) | yes |  |
| `data.expected_line_version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason_code` | string | yes |  |
| `data.reason_description` | string or null | no |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": AdjustReceivedQtyResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.new_header_version` | integer (int32) | yes | Post-bump header version. |
| `data.new_line_version` | integer (int32) | yes | Post-bump line version (Slice #2). |
| `data.new_qty_received` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.transaction_log_id` | integer (int64) | yes | Id of the corrective transaction_log row. |

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
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "new_header_version": 1,
      "new_line_version": 1,
      "new_qty_received": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "transaction_log_id": 1
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
  "method": "receipt_adjust_received_qty",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "delta_qty": 1,
      "expected_line_version": 1,
      "reason_code": "<reason_code>",
      "receipt_detail_id": 1,
      "receipt_id": 1
    }
  }
}'
```

### receipt_cancel

Cancel a receipt (D-19, completion=Pending only).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_cancel` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |
| Version check | entity `receipt`: send `expected_receipt_version` for row `receipt_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_receipt_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.
- This method can ask for a supervisor override. Send the codes the operator accepted in `acknowledged_overrides`. See 04-command-types-and-concurrency.md and 05-errors.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (CancelReceipt) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.cancel_reason` | string | yes |  |
| `data.expected_receipt_version` | integer (int32) | yes | Receipt-header OCC version (per the `expected_<entity>_version` naming convention shared with `AdjustReceivedQty::expected_line_version` and `SetDamageDisposition::expected_damage_version`). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CancelReceiptResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.cancel_summary` | any | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "cancel_summary": {},
      "new_version": 1,
      "receipt_id": 1
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
  "method": "receipt_cancel",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "cancel_reason": "<cancel_reason>",
      "expected_receipt_version": 1,
      "receipt_id": 1
    }
  }
}'
```

### receipt_close

Close a receipt with optional discrepancy override (D-21).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_close` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |
| Idempotency key | required |
| Version check | entity `receipt`: send `expected_receipt_version` for row `receipt_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_receipt_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.
- This method can ask for a supervisor override. Send the codes the operator accepted in `acknowledged_overrides`. See 04-command-types-and-concurrency.md and 05-errors.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (CloseReceipt) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.expected_receipt_version` | integer (int32) | yes | Receipt-header OCC version (per the `expected_<entity>_version` naming convention shared with `AdjustReceivedQty::expected_line_version` and `SetDamageDisposition::expected_damage_version`). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.override_grant_id` | string (uuid) or null | no | A supervisor's grant (`supervisor_override_grant`) authorising the discrepancy (code 71) on THIS receipt, for a receiver who does not hold `receipt.override_close_discrepancy`. |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CloseReceiptResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.close_summary` | any | yes |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.new_version` | integer (int32) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |

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
      "close_summary": {},
      "completion": "Pending",
      "new_version": 1,
      "receipt_id": 1,
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
  "method": "receipt_close",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "expected_receipt_version": 1,
      "receipt_id": 1
    }
  }
}'
```

### receipt_kpi_aggregate

Aggregate receipt KPI metrics from integration_event (Spec 5.5.4).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_kpi_aggregate` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReceiptKpiQuery) | yes |  |
| `data.since` | string or null | no | Inclusive lower-bound (UTC ISO 8601). |
| `data.until` | string or null | no | Exclusive upper-bound. |
| `data.warehouse` | string or null | no | Optional warehouse filter (matches `enterprise.integration_event.warehouse`). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiptKpiResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.avg_completion_pct` | number (double) or null | no | Avg completion ratio across receipts that have been closed in window. |
| `data.dock_to_stock_avg_seconds` | number (double) or null | no | Average dock-to-stock duration in seconds (D-34 ready_for_putaway events). |
| `data.dock_to_stock_count` | integer (int64) | yes | Number of receipts that completed the dock-to-stock cycle in window. |
| `data.line_damaged_count` | integer (int64) | yes |  |
| `data.line_over_count` | integer (int64) | yes |  |
| `data.line_received_count` | integer (int64) | yes | Total `process.receipt.line_received` events in window. |
| `data.line_short_count` | integer (int64) | yes | Over/Short/Damaged counts. |
| `data.lines_per_hour_per_user` | array of object (UserThroughput) | yes | Per-user throughput. |
| `data.lines_per_hour_per_user[].hours_span` | number (double) | yes |  |
| `data.lines_per_hour_per_user[].line_count` | integer (int64) | yes |  |
| `data.lines_per_hour_per_user[].lines_per_hour` | number (double) | yes |  |
| `data.lines_per_hour_per_user[].user_id` | integer (int64) | yes |  |
| `data.osd_rate_pct` | number (double) | yes | (short + over + damaged) / line_received × 100. |
| `data.since` | string | yes |  |
| `data.until` | string | yes |  |
| `data.warehouse` | string or null | no |  |

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
      "dock_to_stock_count": 1,
      "line_damaged_count": 1,
      "line_over_count": 1,
      "line_received_count": 1,
      "line_short_count": 1,
      "lines_per_hour_per_user": [
        {
          "hours_span": 1,
          "line_count": 1,
          "lines_per_hour": 1,
          "user_id": 1
        }
      ],
      "osd_rate_pct": 1,
      "since": "<since>",
      "until": "<until>"
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
  "method": "receipt_kpi_aggregate",
  "params": {
    "data": {}
  }
}'
```

### receipt_move_damage_to_rtv

Move a damaged LPN to RTV staging — triggers MoveCommand(MoveToRtv), sets disposition='RTV', publishes damage.disposition_decided + damage.rtv_initiated (T-062).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_move_damage_to_rtv` |
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
| `data` | object (MoveDamageToRtv) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no | Forwarded to the inner Move primitive's hold-aware validator (§3.2.3) — supervisor overrides cascade through. |
| `data.claim_amount_hint` | number (double) or null | no | Optional operator/supervisor estimate of vendor claim amount; passed as `claim_amount_hint` in the outbox event for the ERP-side claim. |
| `data.currency` | string or null | no |  |
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.dest_loc` | string or null | no | Optional explicit destination override. |
| `data.gl_account_hint` | string or null | no | Optional GL account override; when None, falls back to `OwnerConfig.rtv_gl_account_hint`. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason_code` | string | yes | Free-form reason code (e.g. |
| `data.reason_description` | string or null | no |  |
| `data.vendor_id` | integer (int64) or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": MoveDamageToRtvResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.disposition` | string | yes |  |
| `data.from_loc` | string or null | no |  |
| `data.qty_moved` | number (double) | yes |  |
| `data.to_loc` | string | yes |  |

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
      "damage_record_id": 1,
      "disposition": "<disposition>",
      "qty_moved": 1,
      "to_loc": "<to_loc>"
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
  "method": "receipt_move_damage_to_rtv",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "damage_record_id": 1,
      "reason_code": "<reason_code>"
    }
  }
}'
```

### receipt_put_on_hold

Put a receipt on hold (cascades to non-terminal details).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_put_on_hold` |
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
| `data` | object (PutOnHold) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.comments` | string or null | no |  |
| `data.hold_reason_code` | string | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": PutOnHoldResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.details_held` | integer (uint64) | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "details_held": 1,
      "new_version": 1,
      "receipt_id": 1
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
  "method": "receipt_put_on_hold",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "hold_reason_code": "<hold_reason_code>",
      "receipt_id": 1
    }
  }
}'
```

### receipt_receive_against_asn

Receive against an existing ASN line (D-22).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_against_asn` |
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
| `data` | object (ReceiveAgainstAsn) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.damage_info` | object (DamageInfo) or null | no | UC-RCV-09 — ASN F4 damage hot-key sub-flow. |
| `data.damage_info.reason_code` | string | yes |  |
| `data.damage_info.reason_description` | string or null | no |  |
| `data.damage_info.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.damage_info.vendor_responsibility` | boolean | no |  |
| `data.external_lot` | string or null | no | Supplier-side lot ID scanned by the operator (cascade tier 4). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.override_grant_id` | string (uuid) or null | no | A supervisor's grant (`supervisor_override_grant`) authorising a capability-gated override on the LINE this receive books onto — a shortage (28) or an excess (27) — for an operator who does not hold the capability. |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.printer_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.serial_numbers` | array of string or null | no |  |
| `data.shortage_reason` | string or null | no |  |
| `data.sku_code` | string | yes | SKU code from the operator's scan — the cascade keys on it. |
| `data.target_container` | one of: None or object or null | no | Phase 4 — preferred container intent. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string or null | no | Legacy LPN-string input (Phase 1-3). |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — operator-entered native UOM. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveAgainstAsnResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.collect_serials` | boolean | yes | Backend-driven gate for the `RCSN01` serial-capture loop (ADR-062, G-12). |
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.holds_applied` | array of object (HoldInfo) | yes | D-28 — auto-holds applied to LPN during this receive. |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.line_number` | string | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.open_episode` | object (OpenEpisodeState) or null | no | The capture episode this receive opened or folded into, with what it now holds in total. |
| `data.open_episode.captured_qty` | integer (int32) | yes | Serials already captured against this episode. |
| `data.open_episode.episode_id` | integer (int64) | yes |  |
| `data.open_episode.expected_qty` | integer (int32) | yes | Serials the episode expects in total — the sum across every receive that folded into it, not this call's share. |
| `data.owner_id` | integer (int64) | yes | Owner that owns the just-received line. |
| `data.qty_received` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.serials_to_collect_qty` | integer (uint32) | yes | How many serials the operator must collect to satisfy the just- received line. |
| `data.sku_code` | string | yes | SKU code of the just-received line (matches `receipt_detail.sku`). |
| `data.sku_id` | integer (int64) | yes | SKU primary key. |

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
      "collect_serials": false,
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "holds_applied": [
        {
          "code": "<code>",
          "reason": "<reason>",
          "scope": {
            "kind": null,
            "value": null
          }
        }
      ],
      "line_number": "<line_number>",
      "new_version": 1,
      "owner_id": 1,
      "qty_received": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "serials_to_collect_qty": 1,
      "sku_code": "<sku_code>",
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
  "method": "receipt_receive_against_asn",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "qty": 1,
      "receipt_id": 1,
      "sku_code": "<sku_code>",
      "to_loc": "<to_loc>"
    }
  }
}'
```

### receipt_receive_blind

Open a fully blind receipt + first line.

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_blind` |
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
| `data` | object (ReceiveBlind) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.damage_info` | object (DamageInfo) or null | no | UC-RCV-09 — when the operator marks this receive line as damaged (RCDMG_RECV01 flow), the RF client sends a nested DamageInfo payload. |
| `data.damage_info.reason_code` | string | yes |  |
| `data.damage_info.reason_description` | string or null | no |  |
| `data.damage_info.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.damage_info.vendor_responsibility` | boolean | no |  |
| `data.external_lot` | string or null | no | Supplier-side lot ID scanned by the operator. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.printer_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_number` | string or null | no |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes | Legacy wire field. |
| `data.serial_numbers` | array of string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.target_container` | one of: None or object or null | no | Phase 4 — preferred container intent. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string or null | no | Legacy LPN-string input. |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — operator-entered native UOM (e.g. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveBlindResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.collect_serials` | boolean | yes | Mirror of `ReceiveAgainstAsnResult.collect_serials` (G-12). |
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.holds_applied` | array of object (HoldInfo) | yes | D-28 — auto-holds applied during this receive. |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.line_number` | string | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.open_episode` | object (OpenEpisodeState) or null | no | The capture episode this receive opened or folded into. |
| `data.open_episode.captured_qty` | integer (int32) | yes | Serials already captured against this episode. |
| `data.open_episode.episode_id` | integer (int64) | yes |  |
| `data.open_episode.expected_qty` | integer (int32) | yes | Serials the episode expects in total — the sum across every receive that folded into it, not this call's share. |
| `data.qty_received` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_number` | string | yes |  |
| `data.serials_to_collect_qty` | integer (uint32) | yes | Number of serials the operator must collect to satisfy this line. |

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
      "collect_serials": false,
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "holds_applied": [
        {
          "code": "<code>",
          "reason": "<reason>",
          "scope": {
            "kind": null,
            "value": null
          }
        }
      ],
      "line_number": "<line_number>",
      "new_version": 1,
      "qty_received": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "receipt_number": "<receipt_number>",
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
  "method": "receipt_receive_blind",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "owner_id": 1,
      "qty": 1,
      "receipt_type": "Normal",
      "sku_code": "<sku_code>",
      "to_loc": "<to_loc>"
    }
  }
}'
```

### receipt_receive_blind_line

Receive a blind SKU line on an existing receipt.

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_blind_line` |
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
| `data` | object (ReceiveBlindLine) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.damage_info` | object (DamageInfo) or null | no | UC-RCV-09 — see ReceiveBlind.damage_info doc. |
| `data.damage_info.reason_code` | string | yes |  |
| `data.damage_info.reason_description` | string or null | no |  |
| `data.damage_info.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.damage_info.vendor_responsibility` | boolean | no |  |
| `data.external_lot` | string or null | no | Supplier-side lot ID scanned by the operator. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_id` | integer (int64) or null | no |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.printer_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.serial_numbers` | array of string or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.target_container` | one of: None or object or null | no | Phase 4 — preferred container intent. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string or null | no | Legacy LPN-string input. |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered (defaults to sku.default_uom). |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveBlindLineResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.collect_serials` | boolean | yes | Mirror of `ReceiveAgainstAsnResult.collect_serials` — true when the just-added line needs the RCSN01 deferred-capture loop next. |
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.holds_applied` | array of object (HoldInfo) | yes |  |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.line_number` | string | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.open_episode` | object (OpenEpisodeState) or null | no | The capture episode this receive opened or folded into. |
| `data.open_episode.captured_qty` | integer (int32) | yes | Serials already captured against this episode. |
| `data.open_episode.episode_id` | integer (int64) | yes |  |
| `data.open_episode.expected_qty` | integer (int32) | yes | Serials the episode expects in total — the sum across every receive that folded into it, not this call's share. |
| `data.qty_received` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.serials_to_collect_qty` | integer (uint32) | yes | Number of serials the operator must collect; `floor(qty)` for serial-tracked SKUs (always integer-unit), zero otherwise. |

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
      "collect_serials": false,
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "holds_applied": [
        {
          "code": "<code>",
          "reason": "<reason>",
          "scope": {
            "kind": null,
            "value": null
          }
        }
      ],
      "line_number": "<line_number>",
      "new_version": 1,
      "qty_received": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
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
  "method": "receipt_receive_blind_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "qty": 1,
      "receipt_id": 1,
      "sku_code": "<sku_code>",
      "to_loc": "<to_loc>"
    }
  }
}'
```

### receipt_receive_return

Receive a customer return (RMA flow).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_return` |
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
| `data` | object (ReceiveReturn) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.condition` | one of: Resaleable \| NeedsRefurb \| Damaged \| Discard | yes |  |
| `data.damage_info` | object (DamageInfo) or null | no | UC-RCV-09 + UC-RCV-03 — when condition=Damaged operator may also capture severity/reason/description/vendor_responsibility via this nested payload. |
| `data.damage_info.reason_code` | string | yes |  |
| `data.damage_info.reason_description` | string or null | no |  |
| `data.damage_info.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.damage_info.vendor_responsibility` | boolean | no |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.original_order_id` | integer (int64) or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.printer_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.return_reason_code` | string | yes |  |
| `data.rma` | string | yes |  |
| `data.sku_code` | string | yes |  |
| `data.target_container` | one of: None or object or null | no | Phase 4 — preferred container intent. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string or null | no | Legacy LPN-string input. |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at return. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveReturnResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.deposited` | boolean | yes | Echoed for post_commit auto-print decision (whether deposit happened). |
| `data.holds_applied` | array of object (HoldInfo) | yes | D-28 — auto-holds applied during this receive (Resaleable / NeedsRefurb only). |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.line_number` | string | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.qty_damaged` | number (double) | yes |  |
| `data.qty_received` | number (double) | yes |  |
| `data.qty_rejected` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_number` | string | yes |  |

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
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "deposited": false,
      "holds_applied": [
        {
          "code": "<code>",
          "reason": "<reason>",
          "scope": {
            "kind": null,
            "value": null
          }
        }
      ],
      "line_number": "<line_number>",
      "new_version": 1,
      "qty_damaged": 1,
      "qty_received": 1,
      "qty_rejected": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "receipt_number": "<receipt_number>"
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
  "method": "receipt_receive_return",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "condition": "Resaleable",
      "owner_id": 1,
      "qty": 1,
      "return_reason_code": "<return_reason_code>",
      "rma": "<rma>",
      "sku_code": "<sku_code>",
      "to_loc": "<to_loc>"
    }
  }
}'
```

### receipt_receive_return_line

Receive an additional line on an existing Customer Return (multi-line F3).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_return_line` |
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
| `data` | object (ReceiveReturnLine) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.condition` | one of: Resaleable \| NeedsRefurb \| Damaged \| Discard | yes |  |
| `data.damage_info` | object (DamageInfo) or null | no | UC-RCV-09 + UC-RCV-03 — see ReceiveReturn.damage_info doc. |
| `data.damage_info.reason_code` | string | yes |  |
| `data.damage_info.reason_description` | string or null | no |  |
| `data.damage_info.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.damage_info.vendor_responsibility` | boolean | no |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no |  |
| `data.owner_id` | integer (int64) or null | no | Owner_id is **optional** here — when None, falls back to the locked receipt's owner_id. |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.printer_id` | integer (int64) or null | no |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.return_reason_code` | string | yes |  |
| `data.rma` | string | yes |  |
| `data.sku_code` | string | yes |  |
| `data.target_container` | one of: None or object or null | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string | yes |  |
| `data.to_lpn` | string or null | no | Legacy LPN-string input. |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at return. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveReturnLineResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.completion_detail` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.completion_header` | one of: Pending \| Partial \| Full \| Over | yes | Receipt completion (qty fulfilment). |
| `data.deposited` | boolean | yes | Echoed for post_commit auto-print decision (whether deposit happened). |
| `data.holds_applied` | array of object (HoldInfo) | yes |  |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.line_number` | string | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.qty_damaged` | number (double) | yes |  |
| `data.qty_received` | number (double) | yes |  |
| `data.qty_rejected` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "completion_detail": "Pending",
      "completion_header": "Pending",
      "deposited": false,
      "holds_applied": [
        {
          "code": "<code>",
          "reason": "<reason>",
          "scope": {
            "kind": null,
            "value": null
          }
        }
      ],
      "line_number": "<line_number>",
      "new_version": 1,
      "qty_damaged": 1,
      "qty_received": 1,
      "qty_rejected": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1
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
  "method": "receipt_receive_return_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "condition": "Resaleable",
      "qty": 1,
      "receipt_id": 1,
      "return_reason_code": "<return_reason_code>",
      "rma": "<rma>",
      "sku_code": "<sku_code>",
      "to_loc": "<to_loc>"
    }
  }
}'
```

### receipt_release_from_hold

Release a receipt from hold.

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_release_from_hold` |
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
| `data` | object (ReleaseFromHold) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.release_comments` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReleaseFromHoldResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.details_released` | integer (uint64) | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "details_released": 1,
      "new_version": 1,
      "receipt_id": 1
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
  "method": "receipt_release_from_hold",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### receipt_report_damage

Report damage on a receipt detail (D-26).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_report_damage` |
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
| `data` | object (ReportDamage) | yes |  |
| `data.acknowledged_overrides` | array of integer (int16) | no |  |
| `data.damaged_qty` | number (double) | yes |  |
| `data.dest_loc` | string or null | no | Optional destination location for an auto-triggered Move primitive (Move Spec §0 D-9, Kanban M-115). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.photo_attachment_ids` | array of string or null | no | Object keys of photos the operator already uploaded with the signed links (`receipt_damage_photo_upload_url`). |
| `data.reason_code` | string | yes |  |
| `data.reason_description` | string or null | no |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.vendor_responsibility` | boolean | no | Operator's assessment: true = vendor responsible (drives ERP vendor-claim event downstream); false (default) = warehouse-eaten / undecided. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReportDamageResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.action_taken` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Per Decisions Log D-26 + T-062 (migration 148). |
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.holds_applied` | array of object (HoldInfo) | no | Holds applied as a side-effect of severity-mapped action (e.g. |
| `data.holds_applied[].code` | string | yes |  |
| `data.holds_applied[].reason` | string | yes |  |
| `data.holds_applied[].scope` | object | yes |  |
| `data.new_qty_damaged` | number (double) | yes |  |
| `data.new_version` | integer (int32) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "action_taken": "None",
      "damage_record_id": 1,
      "new_qty_damaged": 1,
      "new_version": 1,
      "receipt_id": 1
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
  "method": "receipt_report_damage",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "damaged_qty": 1,
      "reason_code": "<reason_code>",
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "severity": "Minor"
    }
  }
}'
```

### receipt_set_damage_disposition

Set damage disposition marker (Repurpose \| Destroyed) — no physical effect, just records the decision + publishes damage.disposition_decided (T-062).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateful_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_set_damage_disposition` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | required |
| Version check | entity `receipt_detail_damage`: send `expected_damage_version` for row `damage_record_id` |

**Notes**

- Send `meta.idempotency_key`. If you send the same call again with the same key and the same data, you get the first answer back and nothing runs twice.
- Send the current version of the row in `expected_damage_version`. If the row changed in between, the call fails with return code 40 and tells you the current state.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `meta` | object | no | Control-plane envelope (idempotency_key, expected_version, acknowledged_overrides — bare integer codes for receipt, or {code, subject} override pairs for move). |
| `meta.acknowledged_overrides` | array of integer or object | no |  |
| `meta.expected_version` | integer (int64) | no |  |
| `meta.idempotency_key` | string (uuid) | no |  |
| `data` | object (SetDamageDisposition) | yes |  |
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.disposition` | one of: Repurpose \| Destroyed | yes | Lightweight disposition kinds — explicit enum so callers can't accidentally pass arbitrary strings into the `disposition` column. |
| `data.expected_damage_version` | integer (int32) | yes | Per-row OCC version (Slice #3, migration 157). |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason_code` | string | yes |  |
| `data.reason_description` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": SetDamageDispositionResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.disposition` | string | yes |  |
| `data.new_damage_version` | integer (int32) | yes | Post-bump damage_record version (Slice #3). |

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
      "damage_record_id": 1,
      "disposition": "<disposition>",
      "new_damage_version": 1
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
  "method": "receipt_set_damage_disposition",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "damage_record_id": 1,
      "disposition": "Repurpose",
      "expected_damage_version": 1,
      "reason_code": "<reason_code>"
    }
  }
}'
```

### receipt_write_off_damage

Write off a damage record — decrements inventory, releases Damaged hold, sets disposition='WrittenOff', publishes damage.disposition_decided + damage.written_off (T-062).

| | |
|---|---|
| Context / module | inbound / receipt_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_write_off_damage` |
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
| `data` | object (WriteOffDamage) | yes |  |
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.gl_account_hint` | string or null | no | Optional GL account override; when None, falls back to `OwnerConfig.write_off_gl_account_hint` for the receipt's owner. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason_code` | string | yes | Free-form reason code (e.g. |
| `data.reason_description` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": WriteOffDamageResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.damage_record_id` | integer (int64) | yes |  |
| `data.disposition` | string | yes |  |
| `data.holds_released` | integer (uint) | yes | Number of Damaged-code holds released as part of write-off. |
| `data.transaction_log_id` | integer (int64) | yes | transaction_log row id created by the inventory decrement. |
| `data.written_off_qty` | number (double) | yes |  |

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
      "damage_record_id": 1,
      "disposition": "<disposition>",
      "holds_released": 1,
      "transaction_log_id": 1,
      "written_off_qty": 1
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
  "method": "receipt_write_off_damage",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "damage_record_id": 1,
      "reason_code": "<reason_code>"
    }
  }
}'
```

## Module: receipt_audit

### get_receipt_audit

Get a receipt_audit by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_audit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_audit` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptAudit }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.changed_at` | string | yes |  |
| `data.changed_by` | integer (int64) | yes |  |
| `data.field_name` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.new_value` | string or null | no |  |
| `data.old_value` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "receipt_id": 1
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
  "method": "get_receipt_audit",
  "params": {
    "id": 1
  }
}'
```

### list_receipt_audit

List receipt_audit — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_audit |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt_audit` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].field_name` | string filter | no | Filter on `field_name`. |
| `filters[].changed_by` | integer filter | no | Filter on `changed_by`. |
| `filters[].changed_at` | value (date, time or other) filter | no | Filter on `changed_at`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptAudit] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].changed_at` | string | yes |  |
| `data[].changed_by` | integer (int64) | yes |  |
| `data[].field_name` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].new_value` | string or null | no |  |
| `data[].old_value` | string or null | no |  |
| `data[].receipt_id` | integer (int64) | yes |  |

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
  "method": "list_receipt_audit",
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

## Module: receipt_detail

### count_receipt_detail

Count receipt_detail — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_receipt_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].receipt_line_number` | string filter | no | Filter on `receipt_line_number`. |
| `filters[].external_receipt_number` | string filter | no | Filter on `external_receipt_number`. |
| `filters[].external_receipt_line_number` | string filter | no | Filter on `external_receipt_line_number`. |
| `filters[].external_lot` | string filter | no | Filter on `external_lot`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].po_id` | integer filter | no | Filter on `po_id`. |
| `filters[].po_detail_id` | integer filter | no | Filter on `po_detail_id`. |
| `filters[].sku` | string filter | no | Filter on `sku`. |
| `filters[].barcode` | string filter | no | Filter on `barcode`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].receipt_type` | string filter | no | Filter on `receipt_type`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_adjusted` | number filter | no | Filter on `qty_adjusted`. |
| `filters[].qty_received` | number filter | no | Filter on `qty_received`. |
| `filters[].qty_rejected` | number filter | no | Filter on `qty_rejected`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].to_loc` | string filter | no | Filter on `to_loc`. |
| `filters[].to_lot` | string filter | no | Filter on `to_lot`. |
| `filters[].to_container_id` | integer filter | no | Filter on `to_container_id`. |
| `filters[].manufactured_date` | value (date, time or other) filter | no | Filter on `manufactured_date`. |
| `filters[].expiration_date` | value (date, time or other) filter | no | Filter on `expiration_date`. |
| `filters[].delivery_by_date` | value (date, time or other) filter | no | Filter on `delivery_by_date`. |
| `filters[].best_by_date` | value (date, time or other) filter | no | Filter on `best_by_date`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].return_type` | string filter | no | Filter on `return_type`. |
| `filters[].return_reason` | string filter | no | Filter on `return_reason`. |
| `filters[].rma` | string filter | no | Filter on `rma`. |
| `filters[].temperature` | number filter | no | Filter on `temperature`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `filters[].lot_attr_check_mode` | string filter | no | Filter on `lot_attr_check_mode`. |
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
  "method": "count_receipt_detail",
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

### create_receipt_detail

Add a receipt line atomically while the parent receipt accepts planning changes.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_receipt_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReceiptLinePlanForCreate) | yes | What `create_receipt_detail` receives: the planned line, and optionally the LPN the supplier announced it on (EDI 856 SSCC). |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over or null | no | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no |  |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string or null | no |  |
| `data.expected_lpn` | string or null | no | The supplier's LPN for this line, by code. |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Receive-time hold code mirroring `inv_hold_code` enum values. |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict or null | no | Per-line lot-attribute policy. |
| `data.manufactured_date` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26. |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold or null | no | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no |  |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM. |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.id` | integer (int64) | yes |  |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at receive time (e.g. |
| `data.version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |

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
  "method": "create_receipt_detail",
  "params": {
    "data": {
      "owner_id": 1,
      "receipt_id": 1,
      "receipt_line_number": "<receipt_line_number>",
      "receipt_type": "Normal",
      "sku": "<sku>",
      "status": "Open"
    }
  }
}'
```

### delete_many_receipt_detail

Delete receipt lines atomically after locking and validating every affected parent.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_many_receipt_detail` |
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
  "method": "delete_many_receipt_detail",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_receipt_detail

Delete a receipt line — refused once the receipt is Closed, Cancelled or OnHold.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_receipt_detail` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.id` | integer (int64) | yes |  |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at receive time (e.g. |
| `data.version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |

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
  "method": "delete_receipt_detail",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_detail

Get a receipt_detail by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.id` | integer (int64) | yes |  |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at receive time (e.g. |
| `data.version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |

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
  "method": "get_receipt_detail",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_detail_line

Get one receipt line with its open-serial-capture flag and LPN codes — the line card's read.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_detail_line` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptLine }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.id` | integer (int64) | yes |  |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.lpn` | string or null | no | Code of the EXPECTED LPN (`container_id`) — the one the supplier announced. |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.serial_capture_open` | boolean | yes | A serial capture is open on this line — it can be picked up again. |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.to_lpn` | string or null | no | Code of the ACTUAL LPN (`to_container_id`) — the one the goods were received into. |
| `data.uom` | string or null | no |  |
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
  "method": "get_receipt_detail_line",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_receive_context

One receipt line as the Receive dialog shows it: pack units, lot prompts, offered LPN, over-receipt limits.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_receive_context` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiveContext }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.base_uom` | string | yes |  |
| `data.default_location` | string or null | no | The location the receiving window opens with: `owner_config.default_receiving_loc` of the line owner (migration 350). |
| `data.expected_lpn` | string or null | no |  |
| `data.limits` | object (ReceiveLimits) | yes | The over-receipt thresholds in THIS LINE's terms, in base units over the line's open quantity. |
| `data.limits.approval_possible` | boolean | yes | Between the two, a supervisor's approval (code 27) can clear it. |
| `data.limits.block_over_base` | number (double) or null | no | Beyond this, the owner refuses outright — no approval clears it. |
| `data.limits.hard_percent` | number (double) or null | no |  |
| `data.limits.soft_percent` | number (double) or null | no | The policy's percents, for the words ("within the +5% tolerance"). |
| `data.limits.warn_over_base` | number (double) or null | no | Up to this much over, the receive saves (amber when over at all). |
| `data.line_number` | string | yes |  |
| `data.lot_prompts` | array of object (LotAttributePrompt) | yes | Exactly what RF prompts for (`build_prompts`), for THIS line. |
| `data.lot_prompts[].attrib_code` | string | yes |  |
| `data.lot_prompts[].descr` | string or null | no |  |
| `data.lot_prompts[].is_date` | boolean | yes | `true` → this slot is a DATE, not free text: one of the four date columns `lot_policy` carries (`DATE_ATTRIBUTE_CODES`), folded in as a synthetic slot so RF and the web prompt for it alongside the custom attributes. |
| `data.lot_prompts[].label` | string or null | no |  |
| `data.lot_prompts[].readonly` | boolean | yes | `true` → operator may not edit. |
| `data.lot_prompts[].required` | boolean | yes |  |
| `data.lot_prompts[].value` | string or null | no | ASN-expected value for this attribute on the scanned line, when the line carries one. |
| `data.owner_id` | integer (int64) | yes |  |
| `data.packs` | array of object (PackUnit) | yes | Smallest first. |
| `data.packs[].factor` | number (double) | yes |  |
| `data.packs[].uom` | string | yes |  |
| `data.qty_expected` | number (double) | yes |  |
| `data.qty_received` | number (double) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_no` | string | yes |  |
| `data.shelf_life` | object (ShelfLife) | yes |  |
| `data.shelf_life.days` | integer (int32) or null | no |  |
| `data.shelf_life.min_on_receipt` | integer (int32) or null | no |  |
| `data.sku_code` | string | yes |  |
| `data.sku_descr` | string | yes |  |
| `data.to_lpn` | string or null | no | What To LPN opens with — `offered`. |
| `data.without_lpn` | one of: Allow \| HardError \| Warning | yes |  |

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
  "method": "get_receipt_receive_context",
  "params": {
    "id": 1
  }
}'
```

### list_receipt_detail

List receipt_detail — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt_detail` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].receipt_line_number` | string filter | no | Filter on `receipt_line_number`. |
| `filters[].external_receipt_number` | string filter | no | Filter on `external_receipt_number`. |
| `filters[].external_receipt_line_number` | string filter | no | Filter on `external_receipt_line_number`. |
| `filters[].external_lot` | string filter | no | Filter on `external_lot`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].po_id` | integer filter | no | Filter on `po_id`. |
| `filters[].po_detail_id` | integer filter | no | Filter on `po_detail_id`. |
| `filters[].sku` | string filter | no | Filter on `sku`. |
| `filters[].barcode` | string filter | no | Filter on `barcode`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].receipt_type` | string filter | no | Filter on `receipt_type`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_adjusted` | number filter | no | Filter on `qty_adjusted`. |
| `filters[].qty_received` | number filter | no | Filter on `qty_received`. |
| `filters[].qty_rejected` | number filter | no | Filter on `qty_rejected`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].to_loc` | string filter | no | Filter on `to_loc`. |
| `filters[].to_lot` | string filter | no | Filter on `to_lot`. |
| `filters[].to_container_id` | integer filter | no | Filter on `to_container_id`. |
| `filters[].manufactured_date` | value (date, time or other) filter | no | Filter on `manufactured_date`. |
| `filters[].expiration_date` | value (date, time or other) filter | no | Filter on `expiration_date`. |
| `filters[].delivery_by_date` | value (date, time or other) filter | no | Filter on `delivery_by_date`. |
| `filters[].best_by_date` | value (date, time or other) filter | no | Filter on `best_by_date`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].return_type` | string filter | no | Filter on `return_type`. |
| `filters[].return_reason` | string filter | no | Filter on `return_reason`. |
| `filters[].rma` | string filter | no | Filter on `rma`. |
| `filters[].temperature` | number filter | no | Filter on `temperature`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `filters[].lot_attr_check_mode` | string filter | no | Filter on `lot_attr_check_mode`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptDetail] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].barcode` | string or null | no |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].effective_date` | string | yes |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].external_lot` | string or null | no |  |
| `data[].external_receipt_line_number` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data[].manufactured_date` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) or null | no |  |
| `data[].po_detail_id` | integer (int64) or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].qty_adjusted` | number (double) or null | no |  |
| `data[].qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data[].qty_expected` | number (double) or null | no |  |
| `data[].qty_received` | number (double) or null | no |  |
| `data[].qty_rejected` | number (double) or null | no |  |
| `data[].reason_code` | string or null | no |  |
| `data[].receipt_id` | integer (int64) | yes |  |
| `data[].receipt_line_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].return_reason` | string or null | no |  |
| `data[].return_type` | string or null | no |  |
| `data[].rma` | string or null | no |  |
| `data[].sku` | string | yes |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data[].temperature` | number (double) or null | no |  |
| `data[].to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data[].to_loc` | string or null | no |  |
| `data[].to_lot` | string or null | no |  |
| `data[].uom` | string or null | no |  |
| `data[].uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at receive time (e.g. |
| `data[].version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |

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
  "method": "list_receipt_detail",
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

### list_receipt_detail_lines

List receipt lines with their open-serial-capture flag — the receipt screen's read.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt_detail_lines` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].receipt_line_number` | string filter | no | Filter on `receipt_line_number`. |
| `filters[].external_receipt_number` | string filter | no | Filter on `external_receipt_number`. |
| `filters[].external_receipt_line_number` | string filter | no | Filter on `external_receipt_line_number`. |
| `filters[].external_lot` | string filter | no | Filter on `external_lot`. |
| `filters[].owner_id` | integer filter | no | Filter on `owner_id`. |
| `filters[].po_id` | integer filter | no | Filter on `po_id`. |
| `filters[].po_detail_id` | integer filter | no | Filter on `po_detail_id`. |
| `filters[].sku` | string filter | no | Filter on `sku`. |
| `filters[].barcode` | string filter | no | Filter on `barcode`. |
| `filters[].container_id` | integer filter | no | Filter on `container_id`. |
| `filters[].status` | string filter | no | Filter on `status`. |
| `filters[].receipt_type` | string filter | no | Filter on `receipt_type`. |
| `filters[].qty_expected` | number filter | no | Filter on `qty_expected`. |
| `filters[].qty_adjusted` | number filter | no | Filter on `qty_adjusted`. |
| `filters[].qty_received` | number filter | no | Filter on `qty_received`. |
| `filters[].qty_rejected` | number filter | no | Filter on `qty_rejected`. |
| `filters[].uom` | string filter | no | Filter on `uom`. |
| `filters[].pack_id` | integer filter | no | Filter on `pack_id`. |
| `filters[].to_loc` | string filter | no | Filter on `to_loc`. |
| `filters[].to_lot` | string filter | no | Filter on `to_lot`. |
| `filters[].to_container_id` | integer filter | no | Filter on `to_container_id`. |
| `filters[].manufactured_date` | value (date, time or other) filter | no | Filter on `manufactured_date`. |
| `filters[].expiration_date` | value (date, time or other) filter | no | Filter on `expiration_date`. |
| `filters[].delivery_by_date` | value (date, time or other) filter | no | Filter on `delivery_by_date`. |
| `filters[].best_by_date` | value (date, time or other) filter | no | Filter on `best_by_date`. |
| `filters[].effective_date` | value (date, time or other) filter | no | Filter on `effective_date`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].return_type` | string filter | no | Filter on `return_type`. |
| `filters[].return_reason` | string filter | no | Filter on `return_reason`. |
| `filters[].rma` | string filter | no | Filter on `rma`. |
| `filters[].temperature` | number filter | no | Filter on `temperature`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `filters[].lot_attr_check_mode` | string filter | no | Filter on `lot_attr_check_mode`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptLine] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].barcode` | string or null | no |  |
| `data[].best_by_date` | string or null | no |  |
| `data[].completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data[].container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data[].delivery_by_date` | string or null | no |  |
| `data[].effective_date` | string | yes |  |
| `data[].expiration_date` | string or null | no |  |
| `data[].external_lot` | string or null | no |  |
| `data[].external_receipt_line_number` | string or null | no |  |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data[].lpn` | string or null | no | Code of the EXPECTED LPN (`container_id`) — the one the supplier announced. |
| `data[].manufactured_date` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].pack_id` | integer (int64) or null | no |  |
| `data[].po_detail_id` | integer (int64) or null | no |  |
| `data[].po_id` | integer (int64) or null | no |  |
| `data[].qty_adjusted` | number (double) or null | no |  |
| `data[].qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data[].qty_expected` | number (double) or null | no |  |
| `data[].qty_received` | number (double) or null | no |  |
| `data[].qty_rejected` | number (double) or null | no |  |
| `data[].reason_code` | string or null | no |  |
| `data[].receipt_id` | integer (int64) | yes |  |
| `data[].receipt_line_number` | string | yes |  |
| `data[].receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data[].return_reason` | string or null | no |  |
| `data[].return_type` | string or null | no |  |
| `data[].rma` | string or null | no |  |
| `data[].serial_capture_open` | boolean | yes | A serial capture is open on this line — it can be picked up again. |
| `data[].sku` | string | yes |  |
| `data[].status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data[].target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data[].temperature` | number (double) or null | no |  |
| `data[].to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data[].to_loc` | string or null | no |  |
| `data[].to_lot` | string or null | no |  |
| `data[].to_lpn` | string or null | no | Code of the ACTUAL LPN (`to_container_id`) — the one the goods were received into. |
| `data[].uom` | string or null | no |  |
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
  "method": "list_receipt_detail_lines",
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

### update_receipt_detail

Update the reference data on a receipt line — refused once the receipt is Closed or Cancelled.

| | |
|---|---|
| Context / module | inbound / receipt_detail |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_receipt_detail` |
| Roles that have it by default | ADMIN |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (ReceiptDetailUpdateApi) | yes | What a client may change on a receipt line: reference and planning data, and nothing the receipt is judged by. |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.delivery_by_date` | string or null | no |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.manufactured_date` | string or null | no | RF and web clients historically send different documented date dialects. |
| `data.pack_id` | integer (int64) | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_expected` | number (double) | no |  |
| `data.reason_code` | string or null | no |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | no |  |
| `data.temperature` | number (double) or null | no |  |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetail }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.barcode` | string or null | no |  |
| `data.best_by_date` | string or null | no |  |
| `data.completion` | one of: Pending \| Partial \| Full \| Over | yes | Per Decisions Log D-05. |
| `data.container_id` | integer (int64) or null | no | The EXPECTED LPN — the container the supplier announced the goods on. |
| `data.delivery_by_date` | string or null | no |  |
| `data.effective_date` | string | yes |  |
| `data.expiration_date` | string or null | no |  |
| `data.external_lot` | string or null | no |  |
| `data.external_receipt_line_number` | string or null | no |  |
| `data.external_receipt_number` | string or null | no |  |
| `data.hold_code` | string or null | no | Hold code at receive time — VARCHAR mirroring `inv_hold_code` enum values (e.g. |
| `data.id` | integer (int64) | yes |  |
| `data.lot_attr_check_mode` | one of: Disabled \| Advisory \| Strict | yes | Per-line lot-attributes validation policy. |
| `data.manufactured_date` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.pack_id` | integer (int64) or null | no |  |
| `data.po_detail_id` | integer (int64) or null | no |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.qty_adjusted` | number (double) or null | no |  |
| `data.qty_damaged` | number (double) or null | no | Per Decisions Log D-26 (ReportDamage Reject action) and D-05 (completion algorithm). |
| `data.qty_expected` | number (double) or null | no |  |
| `data.qty_received` | number (double) or null | no |  |
| `data.qty_rejected` | number (double) or null | no |  |
| `data.reason_code` | string or null | no |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_line_number` | string | yes |  |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.return_reason` | string or null | no |  |
| `data.return_type` | string or null | no |  |
| `data.rma` | string or null | no |  |
| `data.sku` | string | yes |  |
| `data.status` | one of: Open \| InProgress \| OnHold \| Closed \| Cancelled | yes | Receipt lifecycle status — 5 clean values. |
| `data.target_disposition` | one of: Stock \| CrossDock \| Hold | yes | Per Decisions Log D-36. |
| `data.temperature` | number (double) or null | no |  |
| `data.to_container_id` | integer (int64) or null | no | The ACTUAL LPN — the container receive put the goods into (the supplier's, or one the operator minted). |
| `data.to_loc` | string or null | no |  |
| `data.to_lot` | string or null | no |  |
| `data.uom` | string or null | no |  |
| `data.uom_received` | string or null | no | ADR-045 §1 — native UOM as entered by the operator at receive time (e.g. |
| `data.version` | integer (int32) | yes | Per-line OCC version (Slice #2, migration 156). |

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
  "method": "update_receipt_detail",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: receipt_expected_lot_attributes

### count_receipt_detail_lot_attributes

Count receipt_detail_lot_attributes — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_detail_id` | integer filter | no | Filter on `receipt_detail_id`. |
| `filters[].lot_policy_attribute_id` | integer filter | no | Filter on `lot_policy_attribute_id`. |
| `filters[].attribute_value` | string filter | no | Filter on `attribute_value`. |
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
  "method": "count_receipt_detail_lot_attributes",
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

### create_receipt_detail_lot_attributes

Add an expected lot attribute while the parent receipt accepts planning changes.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `create_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReceiptExpectedLotAttributeCreateApi) | yes | The supplier promise attached to one receipt line. |
| `data.attribute_value` | string | yes |  |
| `data.lot_policy_attribute_id` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetailLotAttributes }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_value` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_attribute_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_value": "<attribute_value>",
      "id": 1,
      "lot_policy_attribute_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "receipt_detail_id": 1
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
  "method": "create_receipt_detail_lot_attributes",
  "params": {
    "data": {
      "attribute_value": "<attribute_value>",
      "lot_policy_attribute_id": 1,
      "receipt_detail_id": 1
    }
  }
}'
```

### delete_receipt_detail_lot_attributes

Delete an expected lot attribute while the parent receipt accepts planning changes.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `delete_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetailLotAttributes }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_value` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_attribute_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_value": "<attribute_value>",
      "id": 1,
      "lot_policy_attribute_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "receipt_detail_id": 1
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
  "method": "delete_receipt_detail_lot_attributes",
  "params": {
    "id": 1
  }
}'
```

### get_receipt_detail_lot_attributes

Get a receipt_detail_lot_attributes by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetailLotAttributes }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_value` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_attribute_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_value": "<attribute_value>",
      "id": 1,
      "lot_policy_attribute_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "receipt_detail_id": 1
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
  "method": "get_receipt_detail_lot_attributes",
  "params": {
    "id": 1
  }
}'
```

### list_receipt_detail_lot_attributes

List receipt_detail_lot_attributes — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_detail_id` | integer filter | no | Filter on `receipt_detail_id`. |
| `filters[].lot_policy_attribute_id` | integer filter | no | Filter on `lot_policy_attribute_id`. |
| `filters[].attribute_value` | string filter | no | Filter on `attribute_value`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptDetailLotAttributes] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].attribute_value` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].lot_policy_attribute_id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].receipt_detail_id` | integer (int64) | yes |  |

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
  "method": "list_receipt_detail_lot_attributes",
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

### update_receipt_detail_lot_attributes

Update an expected lot value without moving the row to another attribute.

| | |
|---|---|
| Context / module | inbound / receipt_expected_lot_attributes |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `update_receipt_detail_lot_attributes` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (ReceiptExpectedLotAttributeUpdateApi) | yes | The selected lot-policy attribute is row identity. |
| `data.attribute_value` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetailLotAttributes }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.attribute_value` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.lot_policy_attribute_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "add_when": "<add_when>",
      "add_who": 1,
      "attribute_value": "<attribute_value>",
      "id": 1,
      "lot_policy_attribute_id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "receipt_detail_id": 1
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
  "method": "update_receipt_detail_lot_attributes",
  "params": {
    "id": 1,
    "data": {}
  }
}'
```

## Module: receipt_detail_damage

### count_receipt_detail_damage

Count receipt_detail_damage — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `count_receipt_detail_damage` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].receipt_detail_id` | integer filter | no | Filter on `receipt_detail_id`. |
| `filters[].severity` | string filter | no | Filter on `severity`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].reported_by` | integer filter | no | Filter on `reported_by`. |
| `filters[].reported_at` | value (date, time or other) filter | no | Filter on `reported_at`. |
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
  "method": "count_receipt_detail_damage",
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

### get_receipt_detail_damage

Get a receipt_detail_damage by ID — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_receipt_detail_damage` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReceiptDetailDamage }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.applied_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Migration 239 — the owner action that ACTUALLY ran when this row was written (`ReportDamage::handle_damage_action`). |
| `data.damaged_qty` | number (double) | yes |  |
| `data.disposition` | string or null | no | Final disposition decision. |
| `data.disposition_decided_at` | string or null | no |  |
| `data.disposition_decided_by` | integer (int64) or null | no |  |
| `data.disposition_reason` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.move_failed` | boolean | yes | TRUE if auto-move to QC/Damage/RTV loc failed. |
| `data.photo_attachment_ids` | any | no | Phase 2+ attachments (see Spec 04 photo attachments). |
| `data.reason_code` | string | yes |  |
| `data.reason_description` | string or null | no |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.reported_at` | string | yes |  |
| `data.reported_by` | integer (int64) | yes |  |
| `data.severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data.vendor_responsibility` | boolean | yes | Migration 161 — operator's assessment at receive: true = vendor is responsible for the damage (drives vendor-claim event in ERP); false (default) = warehouse-eaten / undecided. |
| `data.version` | integer (int32) | yes | Per-row OCC version (Slice #3, migration 157). |

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
  "method": "get_receipt_detail_damage",
  "params": {
    "id": 1
  }
}'
```

### list_receipt_detail_damage

List receipt_detail_damage — CRUD.

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt_detail_damage` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].receipt_id` | integer filter | no | Filter on `receipt_id`. |
| `filters[].receipt_detail_id` | integer filter | no | Filter on `receipt_detail_id`. |
| `filters[].severity` | string filter | no | Filter on `severity`. |
| `filters[].reason_code` | string filter | no | Filter on `reason_code`. |
| `filters[].reported_by` | integer filter | no | Filter on `reported_by`. |
| `filters[].reported_at` | value (date, time or other) filter | no | Filter on `reported_at`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptDetailDamage] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].applied_action` | one of: None \| Hold \| Reject \| WriteOff \| RTV \| Repurpose \| Destroy | yes | Migration 239 — the owner action that ACTUALLY ran when this row was written (`ReportDamage::handle_damage_action`). |
| `data[].damaged_qty` | number (double) | yes |  |
| `data[].disposition` | string or null | no | Final disposition decision. |
| `data[].disposition_decided_at` | string or null | no |  |
| `data[].disposition_decided_by` | integer (int64) or null | no |  |
| `data[].disposition_reason` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].move_failed` | boolean | yes | TRUE if auto-move to QC/Damage/RTV loc failed. |
| `data[].photo_attachment_ids` | any | no | Phase 2+ attachments (see Spec 04 photo attachments). |
| `data[].reason_code` | string | yes |  |
| `data[].reason_description` | string or null | no |  |
| `data[].receipt_detail_id` | integer (int64) | yes |  |
| `data[].receipt_id` | integer (int64) | yes |  |
| `data[].reported_at` | string | yes |  |
| `data[].reported_by` | integer (int64) | yes |  |
| `data[].severity` | one of: Minor \| Major \| Total \| Cosmetic | yes | Per migration 084 + D-26. |
| `data[].vendor_responsibility` | boolean | yes | Migration 161 — operator's assessment at receive: true = vendor is responsible for the damage (drives vendor-claim event in ERP); false (default) = warehouse-eaten / undecided. |
| `data[].version` | integer (int32) | yes | Per-row OCC version (Slice #3, migration 157). |

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
  "method": "list_receipt_detail_damage",
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

### receipt_damage_context

What a damage report on one receipt line is about: the line number, the SKU and its description, the receipt number, the line's unit, how much physically ARRIVED on the line (not qty_received — a return booked as Damaged records its whole arrival in qty_damaged), how much has already been reported damaged, and how much may still be reported.

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_damage_context` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `receipt_detail_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": object (DamageContext) or null }`

Type of `data`: object (DamageContext) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "already_damaged": 1,
      "arrived": 1,
      "available": 1,
      "line_number": "<line_number>",
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "receipt_no": "<receipt_no>",
      "sku_code": "<sku_code>",
      "sku_descr": "<sku_descr>",
      "uom": "<uom>"
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
  "method": "receipt_damage_context",
  "params": {
    "receipt_detail_id": 1
  }
}'
```

### receipt_damage_destination

Where a damage report of this severity sends the goods: whether the destination field is shown at all (only Major → QC and Total → Damage move anything), and the location code to put in it.

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_damage_destination` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `current` | string or null | no | What the destination field holds RIGHT NOW. |
| `severity` | string or null | no | The severity the operator has picked, if any. |

**Result**

The `result` member of the response is: `{ "data": DamageDestination }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.prefill` | string or null | no | The code to WRITE into the field. |
| `data.show` | boolean | yes | Draw the field at all. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "show": false
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
  "method": "receipt_damage_destination",
  "params": {}
}'
```

### receipt_damage_vocabulary

What a damage report may say: with no severity, the four severities the `damage_severity` column accepts; with one, the `damage_reason` values tagged for it plus the untagged ones (`Other`).

| | |
|---|---|
| Context / module | inbound / receipt_detail_damage |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_damage_vocabulary` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `severity` | string or null | no | A `DamageSeverity` spelling. |

**Result**

The `result` member of the response is: `{ "data": DamageVocabularyAnswer }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.items` | array of object (DamageVocabularyItem) | yes |  |
| `data.items[].code` | string | yes | What lands in the row and what the server compares — exactly, and case-sensitively. |
| `data.items[].display` | string | yes | What a human reads. |
| `data.stage` | string | yes | `SEVERITY_STAGE` \\| `REASON_STAGE`. |

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
  "method": "receipt_damage_vocabulary",
  "params": {}
}'
```

## Module: receipt_damage_photo

### receipt_damage_photo_upload_url

Ask for a presigned PUT link to upload one damage photo, for a receipt line.

| | |
|---|---|
| Context / module | inbound / receipt_damage_photo |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_damage_photo_upload_url` |
| Roles that have it by default | ADMIN, MANAGER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `byte_size` | integer (uint64) | yes | The size of the file in bytes. |
| `content_type` | string | yes | The `Content-Type` of the file. |
| `damage_record_id` | integer (int64) or null | no | The damage record, if it already exists (a photo is added to a saved damage record). |
| `receipt_detail_id` | integer (int64) | yes |  |
| `receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": DamagePhotoUploadUrlResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.content_type` | string | yes | The `Content-Type` that was signed. |
| `data.expires_in_secs` | integer (uint64) | yes | How many seconds the link is valid. |
| `data.max_bytes` | integer (uint64) | yes | The limit for one file, in bytes. |
| `data.max_photos_per_record` | integer (uint) | yes | How many photos one damage record holds. |
| `data.object_key` | string | yes | The object key. |
| `data.upload_url` | string | yes | A signed link for `PUT`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "content_type": "<content_type>",
      "expires_in_secs": 1,
      "max_bytes": 1,
      "max_photos_per_record": 1,
      "object_key": "<object_key>",
      "upload_url": "<upload_url>"
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
  "method": "receipt_damage_photo_upload_url",
  "params": {
    "byte_size": 1,
    "content_type": "<content_type>",
    "receipt_detail_id": 1,
    "receipt_id": 1
  }
}'
```

### receipt_damage_photo_view_urls

Presigned GET links for the photos already stored on one damage record.

| | |
|---|---|
| Context / module | inbound / receipt_damage_photo |
| Category | query |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `receipt_damage_photo_view_urls` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |
| Idempotency key | not stated in the catalog |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `damage_record_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": DamagePhotoViewUrlsResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.photos` | array of object (DamagePhotoViewLink) | yes | In the order the keys are stored on the record. |
| `data.photos[].expires_in_secs` | integer (uint64) | yes |  |
| `data.photos[].object_key` | string | yes |  |
| `data.photos[].view_url` | string | yes | A signed link for `GET`. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "photos": [
        {
          "expires_in_secs": 1,
          "object_key": "<object_key>",
          "view_url": "<view_url>"
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
  "method": "receipt_damage_photo_view_urls",
  "params": {
    "damage_record_id": 1
  }
}'
```

## Module: case_level

### find_planned_case

Find a planned case row by label within a case-level receipt.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_planned_case` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindPlannedCaseInput) | yes |  |
| `data.case_label` | string | yes | Operator-scanned case label (= `container.code` of the case container). |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": object (PlannedCaseDetail) or null }`

Type of `data`: object (PlannedCaseDetail) or null

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "container_id": 1,
      "expected_qty": 1,
      "owner_id": 1,
      "receipt_detail_case_id": 1,
      "receipt_detail_id": 1,
      "sku_code": "<sku_code>",
      "status": "<status>",
      "was_unplanned": false
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
  "method": "find_planned_case",
  "params": {
    "data": {
      "case_label": "<case_label>",
      "receipt_id": 1
    }
  }
}'
```

### find_unreceived_cases

Cases still in Planned status — what's expected but not yet received.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `find_unreceived_cases` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (FindUnreceivedCasesInput) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": [ReceiptCaseRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].case_label` | string | yes |  |
| `data[].container_id` | integer (int64) | yes |  |
| `data[].expected_qty` | number (double) | yes |  |
| `data[].pallet_lpn` | string or null | no |  |
| `data[].receipt_detail_case_id` | integer (int64) | yes |  |
| `data[].receipt_detail_id` | integer (int64) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].was_unplanned` | boolean | yes |  |

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
  "method": "find_unreceived_cases",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### get_case_envelope

Case envelope: resolve a scanned case label to its SKU + lot_policy_attributes for the RCCASE02LINE dynamic lot-attribute prompt.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_case_envelope` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetCaseEnvelopeInput) | yes |  |
| `data.case_label` | string | yes | Operator-scanned case label (= `container.code` of the case container), resolved within this receipt per D-69e SameReceipt. |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": CaseEnvelope }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.case_label` | string | yes |  |
| `data.container_id` | integer (int64) | yes |  |
| `data.expected_qty` | number (double) | yes |  |
| `data.lot_policy_attributes` | array of object (LotAttributePrompt) | yes | Lot-attribute prompt for the case's SKU (ADR-050): each shown attribute pre-filled with the line's ASN-expected value (`value`) and locked (`readonly`) when the line is strict-match. |
| `data.lot_policy_attributes[].attrib_code` | string | yes |  |
| `data.lot_policy_attributes[].descr` | string or null | no |  |
| `data.lot_policy_attributes[].is_date` | boolean | yes | `true` → this slot is a DATE, not free text: one of the four date columns `lot_policy` carries (`DATE_ATTRIBUTE_CODES`), folded in as a synthetic slot so RF and the web prompt for it alongside the custom attributes. |
| `data.lot_policy_attributes[].label` | string or null | no |  |
| `data.lot_policy_attributes[].readonly` | boolean | yes | `true` → operator may not edit. |
| `data.lot_policy_attributes[].required` | boolean | yes |  |
| `data.lot_policy_attributes[].value` | string or null | no | ASN-expected value for this attribute on the scanned line, when the line carries one. |
| `data.owner_id` | integer (int64) | yes | Owner resolved from the parent `receipt_detail.owner_id` — RF copies it forward; the LINE call needs it on the wire. |
| `data.receipt_detail_case_id` | integer (int64) | yes |  |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.sku_code` | string | yes | Parent SKU (from `receipt_detail.sku`) the scanned case belongs to. |
| `data.status` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "case_label": "<case_label>",
      "container_id": 1,
      "expected_qty": 1,
      "lot_policy_attributes": [
        {
          "attrib_code": "<attrib_code>",
          "is_date": false,
          "readonly": false,
          "required": false
        }
      ],
      "owner_id": 1,
      "receipt_detail_case_id": 1,
      "receipt_detail_id": 1,
      "sku_code": "<sku_code>",
      "status": "<status>"
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
  "method": "get_case_envelope",
  "params": {
    "data": {
      "case_label": "<case_label>",
      "receipt_id": 1
    }
  }
}'
```

### get_case_level_asn_by_number

Case-level entry-screen lookup: same shape as get_asn_by_number, errors out when receipt is Aggregate-granularity.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_case_level_asn_by_number` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GetAsnByNumberInput) | yes |  |
| `data.receipt_number` | string | yes | Exact receipt_number (e.g. |

**Result**

The `result` member of the response is: `{ "data": AsnDetails }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.completion` | string | yes |  |
| `data.expected_receipt_date` | string (date-time) or null | no | RFC 3339 in UTC; RF shows it in the viewer's own zone. |
| `data.external_receipt_number` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.inventory_tracking_granularity` | string | yes | `receipt.inventory_tracking_granularity` (`Aggregate` \\| `Pallet` \\| `Case`). |
| `data.open_episode` | object (OpenEpisodeBrief) or null | no | First Open / InProgress / AwaitingConfirmation serial-capture episode attached to any detail of this receipt, if any. |
| `data.open_episode.captured_qty` | integer (int32) | yes |  |
| `data.open_episode.episode_id` | integer (int64) | yes |  |
| `data.open_episode.expected_qty` | integer (int32) | yes |  |
| `data.open_episode.receipt_detail_id` | integer (int64) | yes |  |
| `data.open_episode.sku_code` | string | yes |  |
| `data.owner_code` | string | yes |  |
| `data.owner_company` | string | yes |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.qty_expected_total` | number (double) | yes |  |
| `data.qty_received_total` | number (double) | yes |  |
| `data.receipt_number` | string | yes |  |
| `data.status` | string | yes |  |
| `data.version` | integer (int32) | yes | OCC version (per CLAUDE.md classifier rules) — receipt is a stateful entity, downstream commands (`receipt_close` / `receipt_cancel` / `receipt_adjust_received_qty`) carry this on submit. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "completion": "<completion>",
      "id": 1,
      "inventory_tracking_granularity": "<inventory_tracking_granularity>",
      "owner_code": "<owner_code>",
      "owner_company": "<owner_company>",
      "owner_id": 1,
      "qty_expected_total": 1,
      "qty_received_total": 1,
      "receipt_number": "<receipt_number>",
      "status": "<status>",
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

**Example**

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "get_case_level_asn_by_number",
  "params": {
    "data": {
      "receipt_number": "<receipt_number>"
    }
  }
}'
```

### list_receipt_cases

List cases on a receipt with optional status / pallet filter.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_receipt_cases` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ListReceiptCasesInput) | yes |  |
| `data.pallet_lpn_filter` | string or null | no | Optional pallet LPN filter — narrows the listing to cases under a specific pallet. |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.status_filter` | string or null | no | Optional status filter. |

**Result**

The `result` member of the response is: `{ "data": [ReceiptCaseRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].case_label` | string | yes |  |
| `data[].container_id` | integer (int64) | yes |  |
| `data[].expected_qty` | number (double) | yes |  |
| `data[].pallet_lpn` | string or null | no |  |
| `data[].receipt_detail_case_id` | integer (int64) | yes |  |
| `data[].receipt_detail_id` | integer (int64) | yes |  |
| `data[].sku_code` | string | yes |  |
| `data[].status` | string | yes |  |
| `data[].was_unplanned` | boolean | yes |  |

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
  "method": "list_receipt_cases",
  "params": {
    "data": {
      "receipt_id": 1
    }
  }
}'
```

### lookup_case_level_asn

lookup_asn restricted to case-level inventory tracking: Pallet or Case (RCCASE01 picker).

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `lookup_case_level_asn` |
| Roles that have it by default | ADMIN, MANAGER, SUPERVISOR, OPERATOR |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LookupAsnInput) | yes |  |
| `data.page` | integer (int64) or null | no | 1-indexed page number. |
| `data.page_size` | integer (int64) or null | no | Page size. Default 50, capped at 200. |
| `data.q` | string or null | no | Optional substring on `receipt_number` or `external_receipt_number`. |

**Result**

The `result` member of the response is: `{ "data": [AsnHeader] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].completion` | string | yes |  |
| `data[].expected_receipt_date` | string (date-time) or null | no | RFC 3339 in UTC; RF shows it in the viewer's own zone. |
| `data[].external_receipt_number` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].owner_code` | string | yes |  |
| `data[].owner_company` | string | yes |  |
| `data[].owner_id` | integer (int64) | yes |  |
| `data[].receipt_number` | string | yes |  |
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
  "method": "lookup_case_level_asn",
  "params": {
    "data": {}
  }
}'
```

### pre_validate_receive_case_level

Dry-run ReceiveCaseLevelLine: receipt status / case status / unplanned-policy / SKU presence.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `pre_validate_receive_case_level` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PreValidateReceiveCaseLevelInput) | yes |  |
| `data.case_label` | string | yes |  |
| `data.qty` | number (double) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.sku_code` | string or null | no | Optional — required only when the unplanned-case path may need to auto-create a parent receipt_detail (scenario 3 in the command's body). |

**Result**

The `result` member of the response is: `{ "data": PreValidateResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.can_proceed` | boolean | yes |  |
| `data.reasons` | array of string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "can_proceed": false,
      "reasons": [
        "<reasons>"
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
  "method": "pre_validate_receive_case_level",
  "params": {
    "data": {
      "case_label": "<case_label>",
      "qty": 1,
      "receipt_id": 1
    }
  }
}'
```

### validate_pallet_unique

Check if a pallet LPN is unique enough to assign on a given receipt.

| | |
|---|---|
| Context / module | inbound / case_level |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `validate_pallet_unique` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ValidatePalletUniqueInput) | yes |  |
| `data.pallet_lpn` | string | yes | LPN code the operator is about to assign (in CreateCaseLevelAsn, ReplacePallet's new_pallet_lpn, or any other pallet-create flow). |
| `data.receipt_id` | integer (int64) or null | no | Optional: receipt the operator is working in. |

**Result**

The `result` member of the response is: `{ "data": ValidatePalletUniqueResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.conflicting_receipt_id` | integer (int64) or null | no | `Some(_)` when the existing pallet's `planned_at_receipt_id` differs from the input — this is the cross-receipt collision the caller wants to know about. |
| `data.existing_container_id` | integer (int64) or null | no | `Some(_)` when an existing pallet was found. |
| `data.is_unique` | boolean | yes | True when the lpn is free to use on the current receipt: - no pallet container exists with this code anywhere, OR - the only existing pallet is on the SAME `receipt_id` (caller can reuse it as a destination for ReplacePallet). |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "is_unique": false
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
  "method": "validate_pallet_unique",
  "params": {
    "data": {
      "pallet_lpn": "<pallet_lpn>"
    }
  }
}'
```

## Module: case_level_commands

### receipt_cancel_planned_case

Cancel a planned case before it is received (D-69e SameReceipt).

| | |
|---|---|
| Context / module | inbound / case_level_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_cancel_planned_case` |
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
| `data` | object (CancelPlannedCase) | yes |  |
| `data.case_label` | string | yes |  |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.reason` | string | yes | Required free-text justification. |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CancelPlannedCaseResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.container_id` | integer (int64) | yes |  |
| `data.receipt_detail_case_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "container_id": 1,
      "receipt_detail_case_id": 1,
      "receipt_id": 1
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
  "method": "receipt_cancel_planned_case",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "case_label": "<case_label>",
      "reason": "<reason>",
      "receipt_id": 1
    }
  }
}'
```

### receipt_create_case_level_asn

Load a case-level ASN (D-69, ADR-046).

| | |
|---|---|
| Context / module | inbound / case_level_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_create_case_level_asn` |
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
| `data` | object (CreateCaseLevelAsn) | yes | ERP-supplied ASN payload that gets converted into a planned receipt with per-case manifest. |
| `data.carrier_id` | integer (int64) or null | no |  |
| `data.expected_receipt_date_rfc3339` | string or null | no | Expected arrival date as RFC3339 string (e.g. |
| `data.external_receipt_number` | string or null | no | External reference (`receipt.external_receipt_number`) — typically the ERP's own ASN number / PO number. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.inventory_tracking_granularity` | one of: Aggregate \| Pallet \| Case or null | no | Cascade input #1 for granularity. |
| `data.lines` | array of object (AsnLine) | yes |  |
| `data.lines[].external_lot` | string or null | no |  |
| `data.lines[].lot_attributes` | object (map) | no | 12-attribute lot snapshot at the SKU-line level. |
| `data.lines[].pack_id` | integer (int64) or null | no |  |
| `data.lines[].pallets` | array of object (AsnPallet) | no | One entry per physical pallet. |
| `data.lines[].sku_code` | string | yes |  |
| `data.lines[].uom` | string or null | no |  |
| `data.owner_id` | integer (int64) | yes |  |
| `data.po_id` | integer (int64) or null | no |  |
| `data.receipt_number` | string or null | no | When None, GenKey mints the next `receipt_number` from the warehouse counter. |
| `data.receipt_type` | one of: Normal \| CustomerReturn \| Sscc \| CaseLevel \| NoAsn \| InterFacilityTransfer | yes |  |
| `data.supplier_id` | integer (int64) or null | no |  |
| `data.unplanned_case_on_asn` | one of: Allow \| HardError \| Warning or null | no | Cascade input #2 — same path. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": CreateCaseLevelAsnResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.case_count` | integer (uint) | yes |  |
| `data.effective_granularity` | one of: Aggregate \| Pallet \| Case | yes | Effective granularity after cascade resolution — useful for the caller to confirm the receipt landed in the mode they expected. |
| `data.effective_unplanned_policy` | one of: Allow \| HardError \| Warning or null | no | Effective unplanned policy. |
| `data.line_count` | integer (uint) | yes |  |
| `data.pallet_count` | integer (uint) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.receipt_number` | string | yes |  |

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
      "case_count": 1,
      "effective_granularity": "Aggregate",
      "line_count": 1,
      "pallet_count": 1,
      "receipt_id": 1,
      "receipt_number": "<receipt_number>"
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
  "method": "receipt_create_case_level_asn",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "lines": [
        {
          "sku_code": "<sku_code>"
        }
      ],
      "owner_id": 1,
      "receipt_type": "Normal"
    }
  }
}'
```

### receipt_receive_case_level_line

Commit one case-level scan (planned or unplanned).

| | |
|---|---|
| Context / module | inbound / case_level_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_receive_case_level_line` |
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
| `data` | object (ReceiveCaseLevelLine) | yes | Operator scan against an already-loaded case-level receipt. |
| `data.acknowledged_overrides` | array of integer (int16) | no | Override codes the operator already acknowledged via a prior `showConfirm` prompt — mirrors the same mechanism `receive_against_asn` uses. |
| `data.case_label` | string | yes | The case label the operator scanned. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.lot_attributes` | object (map) | no | Operator-supplied lot attributes (COLOR, SIZE, etc.) from the RCCASE02 `_dyn_lot_attrs` capture. |
| `data.override_grant_id` | string (uuid) or null | no | A supervisor's grant (`supervisor_override_grant`) authorising a capability-gated override of a planned case's count — a per-case shortage (28) or excess (27) — for an operator who does not hold the capability. |
| `data.qty` | number (double) | yes | Physically-counted qty. |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.sku_code` | string or null | no | Optional SKU code. |
| `data.to_loc` | string or null | no | Physical landing location for the scanned case (the dock/door or the put-away staging zone, whichever the warehouse uses for at-receive-time storage). |
| `data.uom_received` | string or null | no | Unit the operator used to enter `qty`. |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReceiveCaseLevelLineResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.container_id` | integer (int64) | yes | `container.id` of the case container — useful for follow-up label-print or move operations. |
| `data.line_complete` | boolean | yes | True when the just-scanned case rolled the line up to `qty_received >= qty_expected`. |
| `data.line_qty_received` | number (double) | yes | Receipt-detail line `qty_received` after this scan rolled forward — lets the RF UI show "23 of 50 received" without an extra round-trip. |
| `data.receipt_detail_case_id` | integer (int64) | yes | Primary key of the `receipt_detail_case` row that flipped to Received (or was synthesised, in sub-chunks 2-3). |
| `data.receipt_detail_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |
| `data.was_unplanned` | boolean | yes | True when the row was synthesised under the `unplanned_case_on_asn = Allow \\| Warning` path. |

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
      "container_id": 1,
      "line_complete": false,
      "line_qty_received": 1,
      "receipt_detail_case_id": 1,
      "receipt_detail_id": 1,
      "receipt_id": 1,
      "was_unplanned": false
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
  "method": "receipt_receive_case_level_line",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "case_label": "<case_label>",
      "qty": 1,
      "receipt_id": 1
    }
  }
}'
```

### receipt_replace_pallet

Regroup all/some Planned cases onto another pallet; received stock requires an inventory move (D-69d).

| | |
|---|---|
| Context / module | inbound / case_level_commands |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `receipt_replace_pallet` |
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
| `data` | object (ReplacePallet) | yes |  |
| `data.case_labels` | array of string or null | no | `None` = move every case currently on the old pallet. |
| `data.idempotency_key` | string (uuid) | yes |  |
| `data.new_pallet_lpn` | string | yes | LPN code of the destination pallet. |
| `data.old_pallet_lpn` | string | yes | LPN code of the pallet the cases are leaving. |
| `data.receipt_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": ReplacePalletResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.moved_case_count` | integer (int64) | yes |  |
| `data.new_pallet_container_id` | integer (int64) | yes |  |
| `data.new_pallet_was_created` | boolean | yes | True when the new pallet was minted by this command (lpn didn't exist beforehand). |
| `data.old_pallet_container_id` | integer (int64) | yes |  |
| `data.receipt_id` | integer (int64) | yes |  |

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
      "moved_case_count": 1,
      "new_pallet_container_id": 1,
      "new_pallet_was_created": false,
      "old_pallet_container_id": 1,
      "receipt_id": 1
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
  "method": "receipt_replace_pallet",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "new_pallet_lpn": "<new_pallet_lpn>",
      "old_pallet_lpn": "<old_pallet_lpn>",
      "receipt_id": 1
    }
  }
}'
```
