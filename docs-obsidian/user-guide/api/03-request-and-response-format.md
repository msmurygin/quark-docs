# Request and response format

All business calls use one URL and one shape: JSON-RPC 2.0 over `POST /api/rpc`.

## The request

```http
POST /api/rpc HTTP/1.1
Content-Type: application/json
Authorization: Bearer wms_live_sk_...     (or a session cookie)
X-Warehouse-Id: 1000
X-Correlation-Id: 6f3d2a7e-0f44-4a43-bb51-0a9c3c8a5d11     (optional)

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "receipt_close",
  "params": {
    "meta": { "idempotency_key": "7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f" },
    "data": { "receipt_id": 42, "expected_receipt_version": 7 }
  }
}
```

### Body members

| Member | Required | Meaning |
|---|---|---|
| `jsonrpc` | yes | Must be the string `"2.0"`. Missing or other value: HTTP 400, `RPC_REQUEST_INVALID`. |
| `id` | yes | Any JSON value. The server returns it in the answer. A request without `id` is refused. The server does not support JSON-RPC notifications. |
| `method` | yes | The method name, for example `list_sku`. |
| `params` | depends | A JSON **object** (by-name). The keys depend on the method. The catalog declares every method as `paramStructure: by-name`. |

The server reads one request object per call. Batch requests (a JSON array of requests) are not supported by the code.

A batch array gets HTTP 400 with `RPC_REQUEST_INVALID`. The message says `VersionMissing`, because the array has no `jsonrpc` member. The call is refused before the method runs. Send one request per call.

### Headers

| Header | Needed | Meaning |
|---|---|---|
| `Content-Type: application/json` | yes | |
| `Authorization: Bearer wms_live_sk_...` | one of the three credentials | API key. See [02-authentication.md](02-authentication.md). |
| Cookie `auth-token` | one of the three credentials | Session cookie from `POST /api/login`. |
| `X-Warehouse-Id` | for warehouse methods | The warehouse to work in. |
| `X-Data-Scope: enterprise` | rarely | Enterprise scope instead of a warehouse. |
| `X-Correlation-Id` | no | A UUID. If it is valid, the server keeps it. If it is missing or not a UUID, the server makes a new one. The server returns it in the response header `X-Correlation-Id`. Use it to follow one business action across calls. |
| `X-Verbose-Errors: true` | no | Adds a debug text to error answers that have no detail. Meant for the integration platform. Do not rely on its text. |

### Two special rules about the body

**Empty strings become `null`.** Before the server reads the body, it replaces every string that is empty or only spaces with `null`, at any depth. `"to_lpn": ""`, `"to_lpn": null` and no `to_lpn` mean the same thing. Do not use an empty string as a real value.

**Names are case-sensitive and exact.** The server does not rename fields. Use the names in the reference.

## The shapes of `params`

The keys of `params` are the "parameters". The reference lists them for every method. These shapes cover almost all methods.

| Shape | Used by | Example |
|---|---|---|
| No parameters | `me` and a few reads | `{}` |
| `{ "id": 5 }` | `get_<entity>`, `delete_<entity>` | `{"id": 5}` |
| `{ "ids": [5, 6] }` | `delete_many_<entity>` | `{"ids": [5, 6]}` |
| `{ "data": { ... } }` | `create_<entity>`, many queries | `{"data": {"code": "A1"}}` |
| `{ "id": 5, "data": { ... } }` | `update_<entity>` | `{"id": 5, "data": {"descr": "New"}}` |
| `{ "filters": [...], "list_options": {...} }` | `list_<entity>`, `count_<entity>` | see below |
| `{ "meta": {...}, "data": {...} }` | Most commands | see below |

`<entity>` is the entity name, such as `sku`, `owner` or `receipt`.

### `meta` and `data`

A command splits its parameters in two:

- `data` holds the **business fields**: what you want to do.
- `meta` holds the **control fields**: how the server should treat the call.

| `meta` field | Type | Meaning |
|---|---|---|
| `idempotency_key` | UUID string | Makes a repeat of the call safe. See [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md). |
| `expected_version` | integer | A generic version slot. Most stateful commands use a named field in `data` instead (for example `expected_receipt_version`). The reference shows which one each method uses. |
| `acknowledged_overrides` | array | Override codes that the operator accepted. A receipt uses plain numbers (`[27, 71]`). A move uses pairs (`[{"code": 85, "subject": "capacity"}]`). |

Rules the server follows (from `CommandParams` in `wms-lib-rpc-core`):

- All three `meta` fields are optional on the wire. Each method decides which it needs.
- The server copies the `meta` fields into `data` when `data` has no such key. So a command whose `data` struct lists `idempotency_key` as required is satisfied by `meta.idempotency_key`. **Put the key in `meta`.**
- The older flat form still works: you may put `idempotency_key`, `expected_version` and `acknowledged_overrides` directly in `data` and omit `meta`.
- Unknown keys in `meta` are ignored. For example `meta.trace_id` and `meta.tenant_id` (shown in ADR-058) are not read.
- The `meta` is not part of the idempotency hash. Only `data` is. So a retry with a refreshed version still counts as the same call.

Some commands (29 of the 193 methods that declare a command type) have no `meta` parameter. They are mostly the generic `create_*` and `delete_*` of reference data. They take `data` or `id` directly.

### Lists, filters and paging

`list_<entity>` and `count_<entity>` take the same two optional keys. You may leave `params` out completely.

```json
{
  "filters": [ { "status": "Open", "owner_id": { "$in": [1000, 1001] } } ],
  "list_options": { "limit": 50, "offset": 0, "order_bys": "!id" }
}
```

**`filters`** is a list of filter objects (one object is also accepted). The keys of a filter object are column names of the entity. The reference lists the valid keys for each `list_*` and `count_*` method, under `filters[].<column>`. In one filter object, all conditions must be true (AND). Several objects in the list are combined as alternatives (OR).

This is how the `modql` library (version 0.4.1) builds the SQL: each object is one group joined with AND, and the groups are joined with OR. The OpenRPC schema only says "array of object", so the rule is not in the reference.

A value of a filter can be:

- a plain value: `"status": "Open"` means equals;
- an object of operators: `"qty": {"$gt": 5, "$lte": 100}`. All operators in the object must hold.

| Operator | Types | Meaning |
|---|---|---|
| `$eq`, `$not` | all | Equals. Not equals. |
| `$in`, `$notIn` | all | In a list. Not in a list. |
| `$lt`, `$lte`, `$gt`, `$gte` | numbers, strings | Compare. |
| `$null` | numbers, strings | `true`: the value is null. |
| `$contains`, `$notContains` | strings | Contains the text (case-sensitive). |
| `$containsCi`, `$notContainsCi` | strings | Contains the text (ignore case). |
| `$startsWith`, `$endsWith` (and `Ci`, `not...` forms) | strings | Starts or ends with the text. |
| `$containsAny`, `$containsAll`, `$startsWithAny`, `$endsWithAny` (and `not...` forms) | strings | Match a list of texts. |
| `$empty` | strings | `true`: the value is empty. |
| `$ilike` | strings | SQL `ILIKE` pattern. |

These operators come from the `modql` library (version 0.4.1) used by the server. Which operators a column accepts depends on its type.

**`list_options`**:

| Field | Type | Default | Meaning |
|---|---|---|---|
| `limit` | integer | 1000 | Rows to return. The maximum is 5000. A larger value is refused (see [06-rate-limits-and-limits.md](06-rate-limits-and-limits.md)). |
| `offset` | integer | 0 | Rows to skip. |
| `order_bys` | string or array of strings | none | Column names. Put `!` in front for descending: `"!id"`, or `["status", "!id"]`. |

The catalog schema of `list_options` lists only `limit` and `offset`. The server also reads `order_bys` (it is a field of the `modql` `ListOptions` type that the handler uses).

There is **no total count** in a list answer and **no cursor**. Page with `limit` and `offset`. To get the total, call `count_<entity>` with the same `filters`.

Order your list when you page. Without `order_bys`, the database order is not guaranteed.

## The response

### Success

HTTP 200 and:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}
```

The `result` has one of three shapes. The reference says which one each method uses.

| Shape | Used by | Example |
|---|---|---|
| `{ "data": <value> }` | Queries and reference-data CRUD | `{"data": {"id": 5, "code": "A1"}}` |
| `{ "meta": { "idempotency_replayed": <bool> }, "data": <value> }` | Commands that take `meta` | `{"meta": {"idempotency_replayed": false}, "data": {"new_version": 8}}` |
| The value itself | The 4 `*_project` methods only | `[{"id": 1}]` |

What `data` holds for the standard CRUD methods:

| Method | `data` |
|---|---|
| `create_<entity>`, `update_<entity>`, `get_<entity>`, `delete_<entity>` | The row (for delete, the row that was deleted). |
| `list_<entity>` | An array of rows. |
| `count_<entity>` | An integer. |
| `delete_many_<entity>` | An integer: the number of rows deleted. |

`meta.idempotency_replayed` is `true` when the server found the same idempotency key with the same data and gave you the stored answer. Nothing ran a second time.

### Types on the wire

| Type | Format |
|---|---|
| Ids and counters | JSON numbers (`int64` in the schema). |
| Quantities, weights | JSON numbers with decimals (`double`). |
| Time | RFC 3339 text in UTC, for example `2026-01-01T00:00:00Z`. |
| UUID | Text such as `7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f`. |
| Enums | Text. The reference shows the allowed values as `one of: A \| B`. |
| Missing value | `null`. |

The reference lists each type exactly, taken from the Rust types.

### Failure

HTTP 400, 401, 403, 500 or 503, and a body that is **not** standard JSON-RPC:

```json
{
  "id": 8,
  "error": {
    "message": "RPC_PARAMS_INVALID",
    "data": {
      "req_uuid": "6f3d2a7e-0f44-4a43-bb51-0a9c3c8a5d11",
      "detail": "missing field `owner_id`"
    }
  }
}
```

There is no `jsonrpc` key and no numeric `code`. The error name is in `error.message`. See [05-errors.md](05-errors.md).

## Special method: `rpc.discover`

`rpc.discover` is answered before the login check. It returns the OpenRPC document in `result`.

```bash
curl -s -X POST "$BASE_URL/api/rpc" -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"rpc.discover"}'
```

`GET /api/rpc` returns the same document in the same wrapper (`{"jsonrpc":"2.0","id":1,"result":{...}}`).

The document is built when the server starts. Only the methods that the server routes appear in it.

## Calls that stay in one transaction

Each command runs in one database transaction on the server. If the command fails, nothing is saved. There is no way to join several calls into one transaction. Design a multi-step flow so each step is safe to repeat. See [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md).
