# Reporting methods

Reports, labels, templates and printers.

This page documents 51 methods of the `reporting` context. It is generated from the OpenRPC catalog. Do not edit it by hand.

How to read a method entry: see [reference/index.md](index.md). Every call is `POST /api/rpc` with a JSON-RPC 2.0 body. See [03-request-and-response-format.md](../03-request-and-response-format.md).

## Modules

- **report_definition**: [create_report_definition](#create_report_definition), [get_report_definition](#get_report_definition), [list_report_definition](#list_report_definition), [update_report_definition](#update_report_definition), [delete_report_definition](#delete_report_definition), [delete_many_report_definition](#delete_many_report_definition), [count_report_definition](#count_report_definition), [generate_report_data](#generate_report_data), [print_report](#print_report), [test_dataset](#test_dataset), [list_report_album](#list_report_album), [get_report_album](#get_report_album), [set_report_favorite](#set_report_favorite)
- **report_template**: [create_report_template](#create_report_template), [get_report_template](#get_report_template), [list_report_template](#list_report_template), [update_report_template](#update_report_template), [delete_report_template](#delete_report_template), [delete_many_report_template](#delete_many_report_template), [count_report_template](#count_report_template)
- **label_definition**: [create_label_definition](#create_label_definition), [get_label_definition](#get_label_definition), [list_label_definition](#list_label_definition), [update_label_definition](#update_label_definition), [delete_label_definition](#delete_label_definition), [delete_many_label_definition](#delete_many_label_definition), [count_label_definition](#count_label_definition), [generate_label_data](#generate_label_data), [print_label](#print_label), [send_label_to_printer](#send_label_to_printer)
- **label_template**: [create_label_template](#create_label_template), [get_label_template](#get_label_template), [list_label_template](#list_label_template), [update_label_template](#update_label_template), [delete_label_template](#delete_label_template), [delete_many_label_template](#delete_many_label_template), [count_label_template](#count_label_template)
- **printer_configuration**: [create_printer_configuration](#create_printer_configuration), [get_printer_configuration](#get_printer_configuration), [list_printer_configuration](#list_printer_configuration), [update_printer_configuration](#update_printer_configuration), [delete_printer_configuration](#delete_printer_configuration), [delete_many_printer_configuration](#delete_many_printer_configuration), [count_printer_configuration](#count_printer_configuration)
- **printer_assignments**: [create_printer_assignment](#create_printer_assignment), [get_printer_assignment](#get_printer_assignment), [list_printer_assignment](#list_printer_assignment), [update_printer_assignment](#update_printer_assignment), [delete_printer_assignment](#delete_printer_assignment), [delete_many_printer_assignment](#delete_many_printer_assignment), [count_printer_assignment](#count_printer_assignment)

## Module: report_definition

### count_report_definition

Count report_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_report_definition` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].module_id` | integer filter | no | Filter on `module_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].tier` | string filter | no | Filter on `tier`. |
| `filters[].template_kind` | string filter | no | Filter on `template_kind`. |
| `filters[].template_id` | integer filter | no | Filter on `template_id`. |
| `filters[].created_via` | string filter | no | Filter on `created_via`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
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
  "method": "count_report_definition",
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

### create_report_definition

Create a new report_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_report_definition` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReportDefinitionForCreate) | yes | The wire shape of "create a report", which still carries a `name`: the report wizard asks its author for one, and that author has no idea labels exist. |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | no |  |
| `data.created_via` | string or null | no |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.name` | string | yes | What the author called the report. |
| `data.parameters` | any | no |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |
| `data.version_status` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": ReportDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.created_via` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.label_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.parameters` | any | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |
| `data.version_status` | string | yes |  |

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
  "method": "create_report_definition",
  "params": {
    "data": {
      "category": "<category>",
      "code": "<code>",
      "name": "<name>",
      "tier": "<tier>"
    }
  }
}'
```

### delete_many_report_definition

Delete multiple report_definition by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_report_definition` |
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
  "method": "delete_many_report_definition",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_report_definition

Delete a report_definition by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_report_definition` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReportDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.created_via` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.label_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.parameters` | any | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |
| `data.version_status` | string | yes |  |

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
  "method": "delete_report_definition",
  "params": {
    "id": 1
  }
}'
```

### generate_report_data

Generate report render data.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `generate_report_data` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GenerateReportParams) | yes | Parameters for report generation. |
| `data.params` | object (map) | no |  |
| `data.report_definition_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ReportRenderData }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.data` | any | yes |  |
| `data.options` | object (ReportRenderOptions) | yes |  |
| `data.options.orientation` | string | yes |  |
| `data.options.paper` | string | yes |  |
| `data.output_format` | string | yes |  |
| `data.template_kind` | string | yes |  |
| `data.template_source` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "data": {},
      "options": {
        "orientation": "<orientation>",
        "paper": "<paper>"
      },
      "output_format": "<output_format>",
      "template_kind": "<template_kind>",
      "template_source": "<template_source>"
    }
  }
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
  "method": "generate_report_data",
  "params": {
    "data": {
      "report_definition_id": 1
    }
  }
}'
```

### get_report_album

Get one report for the album/wizard.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `get_report_album` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReportAlbumRow }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_favorite` | boolean | yes |  |
| `data.last_run_at` | string or null | no |  |
| `data.name` | string | yes | The report's name in the locale the album was asked for, already resolved: a translation if there is one, the English `default_text` otherwise. |
| `data.origin` | string | yes | `industry` for seeded/migrated definitions, `custom` for ones built here. |
| `data.parameters` | any | yes |  |
| `data.regulation` | string or null | no |  |
| `data.runs_12m` | integer (int64) | yes |  |
| `data.runs_monthly` | any | yes | Exactly `SPARKLINE_MONTHS` integers, oldest month first. |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "category": "<category>",
      "code": "<code>",
      "id": 1,
      "is_favorite": false,
      "name": "<name>",
      "origin": "<origin>",
      "parameters": {},
      "runs_12m": 1,
      "runs_monthly": {},
      "tier": "<tier>"
    }
  }
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
  "method": "get_report_album",
  "params": {
    "id": 1
  }
}'
```

### get_report_definition

Get a report_definition by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_report_definition` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReportDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.created_via` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.label_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.parameters` | any | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |
| `data.version_status` | string | yes |  |

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
  "method": "get_report_definition",
  "params": {
    "id": 1
  }
}'
```

### list_report_album

List reports for the album screen.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `list_report_album` |
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

The `result` member of the response is: `{ "data": [ReportAlbumRow] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].category` | string | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_favorite` | boolean | yes |  |
| `data[].last_run_at` | string or null | no |  |
| `data[].name` | string | yes | The report's name in the locale the album was asked for, already resolved: a translation if there is one, the English `default_text` otherwise. |
| `data[].origin` | string | yes | `industry` for seeded/migrated definitions, `custom` for ones built here. |
| `data[].parameters` | any | yes |  |
| `data[].regulation` | string or null | no |  |
| `data[].runs_12m` | integer (int64) | yes |  |
| `data[].runs_monthly` | any | yes | Exactly `SPARKLINE_MONTHS` integers, oldest month first. |
| `data[].template_kind` | string or null | no |  |
| `data[].tier` | string | yes |  |

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
  "method": "list_report_album",
  "params": {
    "list_options": {
      "limit": 10,
      "offset": 0
    }
  }
}'
```

### list_report_definition

List report_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_report_definition` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].module_id` | integer filter | no | Filter on `module_id`. |
| `filters[].code` | string filter | no | Filter on `code`. |
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].tier` | string filter | no | Filter on `tier`. |
| `filters[].template_kind` | string filter | no | Filter on `template_kind`. |
| `filters[].template_id` | integer filter | no | Filter on `template_id`. |
| `filters[].created_via` | string filter | no | Filter on `created_via`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReportDefinition] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].category` | string | yes |  |
| `data[].code` | string | yes |  |
| `data[].config_json` | any | yes |  |
| `data[].created_via` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].label_id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].module_id` | integer (int64) or null | no |  |
| `data[].parameters` | any | yes |  |
| `data[].template_id` | integer (int64) or null | no |  |
| `data[].template_kind` | string or null | no |  |
| `data[].tier` | string | yes |  |
| `data[].version_status` | string | yes |  |

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
  "method": "list_report_definition",
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

### print_report

Generate report PDF.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `print_report` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GenerateReportParams) | yes | Parameters for report generation. |
| `data.params` | object (map) | no |  |
| `data.report_definition_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "data": ReportPdfResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.bytes` | array of integer (uint8) | yes |  |
| `data.content_type` | string | yes |  |
| `data.filename` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "bytes": [
        1
      ],
      "content_type": "<content_type>",
      "filename": "<filename>"
    }
  }
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
  "method": "print_report",
  "params": {
    "data": {
      "report_definition_id": 1
    }
  }
}'
```

### set_report_favorite

Star or unstar a report for the calling user.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | stateless_command |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `set_report_favorite` |
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
| `data` | object (SetFavoriteData) | yes | Wire shape for `set_report_favorite`. |
| `data.favorite` | boolean | yes | The end state the caller wants, not a flip. |
| `data.report_definition_id` | integer (int64) | yes |  |

**Result**

The `result` member of the response is: `{ "meta": { "idempotency_replayed": boolean }, "data": SetFavoriteResult }`

`meta.idempotency_replayed` is `true` when the answer is a stored copy of an earlier call with the same key.

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.favorite` | boolean | yes |  |

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
      "favorite": false
    }
  }
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
  "method": "set_report_favorite",
  "params": {
    "meta": {
      "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f"
    },
    "data": {
      "favorite": false,
      "report_definition_id": 1
    }
  }
}'
```

### test_dataset

Test dataset SQL query.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `test_dataset` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (TestDatasetParams) | yes | Parameters for testing a single dataset SQL query. |
| `data.limit` | integer (int64) | no |  |
| `data.param_values` | array of string | no | Values for `$1, $2, ...`. |
| `data.sql` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": TestDatasetResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.row_count` | integer (uint) | yes |  |
| `data.rows` | array of any | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "row_count": 1,
      "rows": [
        {}
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
  "method": "test_dataset",
  "params": {
    "data": {
      "sql": "<sql>"
    }
  }
}'
```

### update_report_definition

Update a report definition; identity/provenance are immutable and nullable links are explicit.

| | |
|---|---|
| Context / module | reporting / report_definition |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_report_definition` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (ReportDefinitionUpdateApi) | yes |  |
| `data.category` | string | no |  |
| `data.config_json` | any | no |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean | no |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.name` | string | no |  |
| `data.parameters` | any | no |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | no |  |
| `data.version_status` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": ReportDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.created_via` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.label_id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.module_id` | integer (int64) or null | no |  |
| `data.parameters` | any | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.template_kind` | string or null | no |  |
| `data.tier` | string | yes |  |
| `data.version_status` | string | yes |  |

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
  "method": "update_report_definition",
  "params": {
    "id": 1,
    "data": {
      "category": "<category>",
      "config_json": {}
    }
  }
}'
```

## Module: report_template

### count_report_template

Count report_template — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_report_template` |
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
| `filters[].kind` | string filter | no | Filter on `kind`. |
| `filters[].source` | string filter | no | Filter on `source`. |
| `filters[].paper` | string filter | no | Filter on `paper`. |
| `filters[].orientation` | string filter | no | Filter on `orientation`. |
| `filters[].locale_default` | string filter | no | Filter on `locale_default`. |
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
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
  "method": "count_report_template",
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

### create_report_template

Create a new report_template — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_report_template` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (ReportTemplateForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.kind` | string | yes |  |
| `data.locale_default` | string or null | no |  |
| `data.name` | string | yes |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | yes |  |
| `data.version_status` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": ReportTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.kind` | string | yes |  |
| `data.locale_default` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "kind": "<kind>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "source": "<source>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "create_report_template",
  "params": {
    "data": {
      "code": "<code>",
      "kind": "<kind>",
      "name": "<name>",
      "source": "<source>"
    }
  }
}'
```

### delete_many_report_template

Delete multiple report_template by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_report_template` |
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
  "method": "delete_many_report_template",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_report_template

Delete a report_template by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_report_template` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReportTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.kind` | string | yes |  |
| `data.locale_default` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "kind": "<kind>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "source": "<source>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "delete_report_template",
  "params": {
    "id": 1
  }
}'
```

### get_report_template

Get a report_template by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_report_template` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": ReportTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.kind` | string | yes |  |
| `data.locale_default` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "kind": "<kind>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "source": "<source>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "get_report_template",
  "params": {
    "id": 1
  }
}'
```

### list_report_template

List report_template — CRUD.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_report_template` |
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
| `filters[].kind` | string filter | no | Filter on `kind`. |
| `filters[].source` | string filter | no | Filter on `source`. |
| `filters[].paper` | string filter | no | Filter on `paper`. |
| `filters[].orientation` | string filter | no | Filter on `orientation`. |
| `filters[].locale_default` | string filter | no | Filter on `locale_default`. |
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [ReportTemplate] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].kind` | string | yes |  |
| `data[].locale_default` | string or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].orientation` | string or null | no |  |
| `data[].paper` | string or null | no |  |
| `data[].source` | string | yes |  |
| `data[].version_status` | string | yes |  |

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
  "method": "list_report_template",
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

### update_report_template

Update a report template without changing its stable code.

| | |
|---|---|
| Context / module | reporting / report_template |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_report_template` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (ReportTemplateUpdateApi) | yes |  |
| `data.kind` | string | no |  |
| `data.locale_default` | string or null | no |  |
| `data.name` | string | no |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | no |  |
| `data.version_status` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": ReportTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.kind` | string | yes |  |
| `data.locale_default` | string or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.orientation` | string or null | no |  |
| `data.paper` | string or null | no |  |
| `data.source` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "kind": "<kind>",
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "source": "<source>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "update_report_template",
  "params": {
    "id": 1,
    "data": {
      "kind": "<kind>",
      "locale_default": "<locale_default>"
    }
  }
}'
```

## Module: label_definition

### count_label_definition

Count label_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_label_definition` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].width_mm` | number filter | no | Filter on `width_mm`. |
| `filters[].height_mm` | number filter | no | Filter on `height_mm`. |
| `filters[].dpi` | integer filter | no | Filter on `dpi`. |
| `filters[].template_id` | integer filter | no | Filter on `template_id`. |
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
  "method": "count_label_definition",
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

### create_label_definition

Create a new label_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_label_definition` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LabelDefinitionForCreate) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) or null | no |  |
| `data.height_mm` | number (double) | yes |  |
| `data.is_active` | boolean or null | no |  |
| `data.name` | string | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | yes |  |

**Result**

The `result` member of the response is: `{ "data": LabelDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) | yes |  |
| `data.height_mm` | number (double) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | yes |  |

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
      "dpi": 1,
      "height_mm": 1,
      "id": 1,
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "width_mm": 1
    }
  }
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
  "method": "create_label_definition",
  "params": {
    "data": {
      "category": "<category>",
      "code": "<code>",
      "height_mm": 1,
      "name": "<name>",
      "width_mm": 1
    }
  }
}'
```

### delete_label_definition

Delete a label_definition by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_label_definition` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LabelDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) | yes |  |
| `data.height_mm` | number (double) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | yes |  |

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
      "dpi": 1,
      "height_mm": 1,
      "id": 1,
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "width_mm": 1
    }
  }
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
  "method": "delete_label_definition",
  "params": {
    "id": 1
  }
}'
```

### delete_many_label_definition

Delete multiple label_definition by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_label_definition` |
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
  "method": "delete_many_label_definition",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### generate_label_data

Generate label render data.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `generate_label_data` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GenerateLabelParams) | yes |  |
| `data.data` | object (map) | yes |  |
| `data.label_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": LabelRenderData }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.config` | any | yes |  |
| `data.data` | object (map) | yes |  |
| `data.label_name` | string | yes |  |
| `data.output_format` | string | yes |  |
| `data.renderer_url` | string | yes | The label renderer URL for this deployment. |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "config": {},
      "data": {},
      "label_name": "<label_name>",
      "output_format": "<output_format>",
      "renderer_url": "<renderer_url>"
    }
  }
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
  "method": "generate_label_data",
  "params": {
    "data": {
      "data": {},
      "label_code": "<label_code>"
    }
  }
}'
```

### get_label_definition

Get a label_definition by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_label_definition` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LabelDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) | yes |  |
| `data.height_mm` | number (double) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | yes |  |

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
      "dpi": 1,
      "height_mm": 1,
      "id": 1,
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "width_mm": 1
    }
  }
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
  "method": "get_label_definition",
  "params": {
    "id": 1
  }
}'
```

### list_label_definition

List label_definition — CRUD.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_label_definition` |
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
| `filters[].description` | string filter | no | Filter on `description`. |
| `filters[].category` | string filter | no | Filter on `category`. |
| `filters[].width_mm` | number filter | no | Filter on `width_mm`. |
| `filters[].height_mm` | number filter | no | Filter on `height_mm`. |
| `filters[].dpi` | integer filter | no | Filter on `dpi`. |
| `filters[].template_id` | integer filter | no | Filter on `template_id`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LabelDefinition] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].category` | string | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].dpi` | integer (int32) | yes |  |
| `data[].height_mm` | number (double) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].template_id` | integer (int64) or null | no |  |
| `data[].width_mm` | number (double) | yes |  |

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
  "method": "list_label_definition",
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

### print_label

Generate label ZPL for printing.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (read_model) |
| Permission | RBAC resource type `api`, resource code `print_label` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (GenerateLabelParams) | yes |  |
| `data.data` | object (map) | yes |  |
| `data.label_code` | string | yes |  |

**Result**

The `result` member of the response is: `{ "data": LabelPrintResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.label_name` | string | yes |  |
| `data.zpl_bytes` | array of integer (uint8) | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "label_name": "<label_name>",
      "zpl_bytes": [
        1
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
  "method": "print_label",
  "params": {
    "data": {
      "data": {},
      "label_code": "<label_code>"
    }
  }
}'
```

### send_label_to_printer

Print label directly to Zebra printer.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | not declared |
| Operation | execute (domain_command) |
| Permission | RBAC resource type `api`, resource code `send_label_to_printer` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (SendLabelParams) | yes | Parameters for sending a label directly to a printer. |
| `data.data` | object (map) | yes |  |
| `data.label_code` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_port` | integer (uint16) | no |  |

**Result**

The `result` member of the response is: `{ "data": LabelSendResult }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.bytes_sent` | integer (uint) | yes |  |
| `data.label_name` | string | yes |  |

Example response. It shows the shape only. The required fields have placeholder values:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "bytes_sent": 1,
      "label_name": "<label_name>"
    }
  }
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
  "method": "send_label_to_printer",
  "params": {
    "data": {
      "data": {},
      "label_code": "<label_code>",
      "printer_host": "<printer_host>"
    }
  }
}'
```

### update_label_definition

Update a label definition; stable code is immutable and nullable links are explicit.

| | |
|---|---|
| Context / module | reporting / label_definition |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_label_definition` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (LabelDefinitionUpdateApi) | yes |  |
| `data.category` | string | no |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) | no |  |
| `data.height_mm` | number (double) | no |  |
| `data.is_active` | boolean | no |  |
| `data.name` | string | no |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | no |  |

**Result**

The `result` member of the response is: `{ "data": LabelDefinition }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.category` | string | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.dpi` | integer (int32) | yes |  |
| `data.height_mm` | number (double) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.template_id` | integer (int64) or null | no |  |
| `data.width_mm` | number (double) | yes |  |

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
      "dpi": 1,
      "height_mm": 1,
      "id": 1,
      "is_active": false,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "width_mm": 1
    }
  }
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
  "method": "update_label_definition",
  "params": {
    "id": 1,
    "data": {
      "category": "<category>",
      "description": "<description>"
    }
  }
}'
```

## Module: label_template

### count_label_template

Count label_template — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_label_template` |
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
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
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
  "method": "count_label_template",
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

### create_label_template

Create a new label_template — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_label_template` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (LabelTemplateForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | no |  |
| `data.name` | string | yes |  |
| `data.version_status` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": LabelTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "config_json": {},
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "create_label_template",
  "params": {
    "data": {
      "code": "<code>",
      "name": "<name>"
    }
  }
}'
```

### delete_label_template

Delete a label_template by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_label_template` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LabelTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "config_json": {},
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "delete_label_template",
  "params": {
    "id": 1
  }
}'
```

### delete_many_label_template

Delete multiple label_template by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_label_template` |
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
  "method": "delete_many_label_template",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### get_label_template

Get a label_template by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_label_template` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": LabelTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "config_json": {},
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "get_label_template",
  "params": {
    "id": 1
  }
}'
```

### list_label_template

List label_template — CRUD.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_label_template` |
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
| `filters[].version_status` | string filter | no | Filter on `version_status`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [LabelTemplate] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].config_json` | any | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].version_status` | string | yes |  |

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
  "method": "list_label_template",
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

### update_label_template

Update a label template without changing its stable code.

| | |
|---|---|
| Context / module | reporting / label_template |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_label_template` |
| Roles that have it by default | ADMIN, MANAGER |
| Version fields in the request | `data.version_status` |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (LabelTemplateUpdateApi) | yes |  |
| `data.config_json` | any | no |  |
| `data.name` | string | no |  |
| `data.version_status` | string | no |  |

**Result**

The `result` member of the response is: `{ "data": LabelTemplate }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.config_json` | any | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.version_status` | string | yes |  |

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
      "config_json": {},
      "id": 1,
      "mod_when": "<mod_when>",
      "mod_who": 1,
      "name": "<name>",
      "version_status": "<version_status>"
    }
  }
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
  "method": "update_label_template",
  "params": {
    "id": 1,
    "data": {
      "config_json": {},
      "name": "<name>"
    }
  }
}'
```

## Module: printer_configuration

### count_printer_configuration

Count printer_configuration — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_printer_configuration` |
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
| `filters[].printer_host` | string filter | no | Filter on `printer_host`. |
| `filters[].printer_port` | integer filter | no | Filter on `printer_port`. |
| `filters[].zone_code` | string filter | no | Filter on `zone_code`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].label_definition_id` | integer filter | no | Filter on `label_definition_id`. |
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
  "method": "count_printer_configuration",
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

### create_printer_configuration

Create a new printer_configuration — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_printer_configuration` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PrinterConfigurationForCreate) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean or null | no |  |
| `data.is_default` | boolean or null | no |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.name` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) or null | no |  |
| `data.zone_code` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PrinterConfiguration }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) | yes |  |
| `data.zone_code` | string or null | no |  |

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
  "method": "create_printer_configuration",
  "params": {
    "data": {
      "code": "<code>",
      "name": "<name>",
      "printer_host": "<printer_host>"
    }
  }
}'
```

### delete_many_printer_configuration

Delete multiple printer_configuration by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_printer_configuration` |
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
  "method": "delete_many_printer_configuration",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_printer_configuration

Delete a printer_configuration by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_printer_configuration` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PrinterConfiguration }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) | yes |  |
| `data.zone_code` | string or null | no |  |

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
  "method": "delete_printer_configuration",
  "params": {
    "id": 1
  }
}'
```

### get_printer_configuration

Get a printer_configuration by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_printer_configuration` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PrinterConfiguration }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) | yes |  |
| `data.zone_code` | string or null | no |  |

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
  "method": "get_printer_configuration",
  "params": {
    "id": 1
  }
}'
```

### list_printer_configuration

List printer_configuration — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_printer_configuration` |
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
| `filters[].printer_host` | string filter | no | Filter on `printer_host`. |
| `filters[].printer_port` | integer filter | no | Filter on `printer_port`. |
| `filters[].zone_code` | string filter | no | Filter on `zone_code`. |
| `filters[].is_default` | boolean filter | no | Filter on `is_default`. |
| `filters[].label_definition_id` | integer filter | no | Filter on `label_definition_id`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PrinterConfiguration] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].code` | string | yes |  |
| `data[].description` | string or null | no |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].is_default` | boolean | yes |  |
| `data[].label_definition_id` | integer (int64) or null | no |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].name` | string | yes |  |
| `data[].printer_host` | string | yes |  |
| `data[].printer_model` | string or null | no |  |
| `data[].printer_port` | integer (int32) | yes |  |
| `data[].zone_code` | string or null | no |  |

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
  "method": "list_printer_configuration",
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

### update_printer_configuration

Update printer configuration with explicit nullable-field semantics.

| | |
|---|---|
| Context / module | reporting / printer_configuration |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_printer_configuration` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PrinterConfigurationUpdateApi) | yes |  |
| `data.description` | string or null | no |  |
| `data.is_active` | boolean | no |  |
| `data.is_default` | boolean | no |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.name` | string | no |  |
| `data.printer_host` | string | no |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) | no |  |
| `data.zone_code` | string or null | no |  |

**Result**

The `result` member of the response is: `{ "data": PrinterConfiguration }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.code` | string | yes |  |
| `data.description` | string or null | no |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.is_default` | boolean | yes |  |
| `data.label_definition_id` | integer (int64) or null | no |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.name` | string | yes |  |
| `data.printer_host` | string | yes |  |
| `data.printer_model` | string or null | no |  |
| `data.printer_port` | integer (int32) | yes |  |
| `data.zone_code` | string or null | no |  |

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
  "method": "update_printer_configuration",
  "params": {
    "id": 1,
    "data": {
      "description": "<description>",
      "is_active": false
    }
  }
}'
```

## Module: printer_assignments

### count_printer_assignment

Count printer_assignment — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `count_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].scope_type` | string filter | no | Filter on `scope_type`. |
| `filters[].scope_id` | integer filter | no | Filter on `scope_id`. |
| `filters[].printer_id` | integer filter | no | Filter on `printer_id`. |
| `filters[].priority` | integer filter | no | Filter on `priority`. |
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
  "method": "count_printer_assignment",
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

### create_printer_assignment

Create a new printer_assignment — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | not declared |
| Operation | create (reference_crud) |
| Permission | RBAC resource type `api`, resource code `create_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `data` | object (PrinterAssignmentForCreate) | yes |  |
| `data.is_active` | boolean or null | no |  |
| `data.printer_id` | integer (int64) | yes |  |
| `data.priority` | integer (int32) or null | no |  |
| `data.scope_id` | integer (int64) or null | no |  |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

**Result**

The `result` member of the response is: `{ "data": PrinterAssignment }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.printer_id` | integer (int64) | yes |  |
| `data.priority` | integer (int32) | yes |  |
| `data.scope_id` | integer (int64) or null | no | `user_id` \\| `zone_id` \\| `owner_id` \\| NULL for Warehouse default. |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

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
      "printer_id": 1,
      "priority": 1,
      "scope_type": "User"
    }
  }
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
  "method": "create_printer_assignment",
  "params": {
    "data": {
      "printer_id": 1,
      "scope_type": "User"
    }
  }
}'
```

### delete_many_printer_assignment

Delete multiple printer_assignment by IDs — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_many_printer_assignment` |
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
  "method": "delete_many_printer_assignment",
  "params": {
    "ids": [
      1
    ]
  }
}'
```

### delete_printer_assignment

Delete a printer_assignment by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | not declared |
| Operation | delete (reference_crud) |
| Permission | RBAC resource type `api`, resource code `delete_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PrinterAssignment }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.printer_id` | integer (int64) | yes |  |
| `data.priority` | integer (int32) | yes |  |
| `data.scope_id` | integer (int64) or null | no | `user_id` \\| `zone_id` \\| `owner_id` \\| NULL for Warehouse default. |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

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
      "printer_id": 1,
      "priority": 1,
      "scope_type": "User"
    }
  }
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
  "method": "delete_printer_assignment",
  "params": {
    "id": 1
  }
}'
```

### get_printer_assignment

Get a printer_assignment by ID — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `get_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |

**Result**

The `result` member of the response is: `{ "data": PrinterAssignment }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.printer_id` | integer (int64) | yes |  |
| `data.priority` | integer (int32) | yes |  |
| `data.scope_id` | integer (int64) or null | no | `user_id` \\| `zone_id` \\| `owner_id` \\| NULL for Warehouse default. |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

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
      "printer_id": 1,
      "priority": 1,
      "scope_type": "User"
    }
  }
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
  "method": "get_printer_assignment",
  "params": {
    "id": 1
  }
}'
```

### list_printer_assignment

List printer_assignment — CRUD.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | query (read operation; not declared in the catalog) |
| Operation | read (reference_crud) |
| Permission | RBAC resource type `api`, resource code `list_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER, OPERATOR, VIEWER |

**Notes**

- This method only reads. It changes nothing and needs no idempotency key.
- In `filters`, a plain value means equals. An object such as `{"$gt": 5}` uses an operator. See 03-request-and-response-format.md.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `filters` | array of object | no | Filter criteria |
| `filters[].id` | integer filter | no | Filter on `id`. |
| `filters[].scope_type` | string filter | no | Filter on `scope_type`. |
| `filters[].scope_id` | integer filter | no | Filter on `scope_id`. |
| `filters[].printer_id` | integer filter | no | Filter on `printer_id`. |
| `filters[].priority` | integer filter | no | Filter on `priority`. |
| `filters[].is_active` | boolean filter | no | Filter on `is_active`. |
| `filters[].add_who` | integer filter | no | Filter on `add_who`. |
| `filters[].add_when` | value (date, time or other) filter | no | Filter on `add_when`. |
| `filters[].mod_who` | integer filter | no | Filter on `mod_who`. |
| `filters[].mod_when` | value (date, time or other) filter | no | Filter on `mod_when`. |
| `list_options` | object | no | Pagination/sorting |
| `list_options.limit` | integer | no |  |
| `list_options.offset` | integer | no |  |

**Result**

The `result` member of the response is: `{ "data": [PrinterAssignment] }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data[].add_when` | string | yes |  |
| `data[].add_who` | integer (int64) | yes |  |
| `data[].id` | integer (int64) | yes |  |
| `data[].is_active` | boolean | yes |  |
| `data[].mod_when` | string | yes |  |
| `data[].mod_who` | integer (int64) | yes |  |
| `data[].printer_id` | integer (int64) | yes |  |
| `data[].priority` | integer (int32) | yes |  |
| `data[].scope_id` | integer (int64) or null | no | `user_id` \\| `zone_id` \\| `owner_id` \\| NULL for Warehouse default. |
| `data[].scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

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
  "method": "list_printer_assignment",
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

### update_printer_assignment

Update a printer-routing rule; a warehouse scope explicitly clears scope_id.

| | |
|---|---|
| Context / module | reporting / printer_assignments |
| Category | not declared |
| Operation | update (reference_crud) |
| Permission | RBAC resource type `api`, resource code `update_printer_assignment` |
| Roles that have it by default | ADMIN, MANAGER |

**Notes**

- The catalog gives no command type for this method. It does not say whether an idempotency key or a version is needed.

**Parameters** (the keys of `params`)

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer (int64) | yes | Record ID |
| `data` | object (PrinterAssignmentUpdateApi) | yes |  |
| `data.is_active` | boolean | no |  |
| `data.printer_id` | integer (int64) | no |  |
| `data.priority` | integer (int32) | no |  |
| `data.scope_id` | integer (int64) or null | no |  |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | no | Per migration 085. |

**Result**

The `result` member of the response is: `{ "data": PrinterAssignment }`

| Field | Type | Always present | Description |
|---|---|---|---|
| `data.add_when` | string | yes |  |
| `data.add_who` | integer (int64) | yes |  |
| `data.id` | integer (int64) | yes |  |
| `data.is_active` | boolean | yes |  |
| `data.mod_when` | string | yes |  |
| `data.mod_who` | integer (int64) | yes |  |
| `data.printer_id` | integer (int64) | yes |  |
| `data.priority` | integer (int32) | yes |  |
| `data.scope_id` | integer (int64) or null | no | `user_id` \\| `zone_id` \\| `owner_id` \\| NULL for Warehouse default. |
| `data.scope_type` | one of: User \| Zone \| Owner \| Warehouse | yes | Per migration 085. |

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
      "printer_id": 1,
      "priority": 1,
      "scope_type": "User"
    }
  }
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
  "method": "update_printer_assignment",
  "params": {
    "id": 1,
    "data": {
      "is_active": false,
      "printer_id": 1
    }
  }
}'
```
