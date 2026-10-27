# Quickstart

In this guide you log in, make your first calls with `curl`, and create an API key. It takes about ten minutes.

You need:

- a running `app-server` (local development uses `http://localhost:8081`),
- `curl`,
- a user name and password issued by your Quark administrator.

The examples use placeholders. Do not paste production credentials into a script or commit them to source control. Field values such as ids and names will differ on your system.

## Step 1. Set your variables

```bash
export BASE_URL="http://localhost:8081"
```

## Step 2. Log in

```bash
curl -s -i -c cookies.txt -X POST "$BASE_URL/api/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "<your-user-name>", "pwd": "<your-password>"}'
```

The server answers:

```text
HTTP/1.1 200 OK
set-cookie: auth-token=<token>; HttpOnly; Path=/
content-type: application/json

{"result":{"success":true}}
```

- `-c cookies.txt` saves the cookie in a file. The cookie is named `auth-token`.
- Use `-b cookies.txt` on the next calls to send it back.
- The token lasts for `SERVICE_TOKEN_DURATION_SEC` seconds (1800 in the development config). Every call you make with the cookie renews it.

If the user name or password is wrong, you get HTTP 403 and this body. The body is the same for an unknown user and for a wrong password, on purpose.

```json
{
  "id": null,
  "error": {
    "message": "LOGIN_FAIL",
    "data": { "req_uuid": "0b6c0c3e-9d0b-4b43-8d1a-5b5f0f7d1c11", "detail": null }
  }
}
```

After 10 failed logins in 60 seconds for the same user name, the server refuses further tries with the same `LOGIN_FAIL` answer until the window passes. See [06-rate-limits-and-limits.md](06-rate-limits-and-limits.md).

## Step 3. Ask who you are

`me` needs a login but no warehouse and no special permission.

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "me", "params": {}}'
```

Expected shape (values will differ):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "data": {
      "id": 1000,
      "username": "your.user",
      "typ": "User",
      "locale": "en",
      "timezone": "Europe/Sofia",
      "date_format": "dd.MM.yyyy HH:mm:ss",
      "mode": "dark",
      "status": "Active",
      "api_access": true,
      "rf_login": true
    }
  }
}
```

The real answer has more fields. See [reference/enterprise.md](reference/enterprise.md#me).

## Step 4. Find your warehouses

Most methods work inside one warehouse. Ask which warehouses you may use.

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 2, "method": "list_user_warehouses", "params": {"data": {}}}'
```

Expected shape:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "data": [
      {
        "user_warehouse_id": 1,
        "warehouse_id": 1000,
        "warehouse_code": "WH1",
        "warehouse_name": "Main Warehouse",
        "schema_name": "wh1",
        "role_id": 1000,
        "role_code": "ADMIN",
        "is_default": true
      }
    ]
  }
}
```

Use `warehouse_id` as the value of the `X-Warehouse-Id` header.

```bash
export WAREHOUSE_ID=1000
```

If you leave the header out, the server uses your default warehouse (the one with `is_default` set). If you have no default, or more than one, the call fails with `WAREHOUSE_REQUIRED`.

## Step 5. Read data

`list_owner` lists owners. It has no required parameters. `list_options` limits the answer.

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "list_owner",
    "params": { "list_options": { "limit": 5, "offset": 0 } }
  }'
```

Expected shape:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "data": [
      { "id": 1000, "code": "OWNER1", "company": "Example Co", "owner_type": "Own" }
    ]
  }
}
```

The real rows have more fields. To find one row by a field, add `filters`:

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "list_owner",
    "params": { "filters": [ { "code": "OWNER1" } ] }
  }'
```

## Step 6. Run a command

A command changes data. `generate_lpn` makes the next pallet code for an owner. Use an `owner_id` from step 5.

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 5,
    "method": "generate_lpn",
    "params": { "data": { "owner_id": 1000 } }
  }'
```

Expected shape:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "meta": { "idempotency_replayed": false },
    "data": { "code": "LPN0000001" }
  }
}
```

Note the difference from step 5. A command answers with `meta` and `data`. `meta.idempotency_replayed` tells you if the answer is a stored copy of an earlier call.

Most commands need an idempotency key, so you can repeat them safely. `generate_lpn` does not. For a command that does, see [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md) and [08-workflows-by-example.md](08-workflows-by-example.md).

## Step 7. Make an API key

Scripts and other programs should use an API key, not a cookie. Only an ADMIN can make one (the default roles of `generate_user_api_key` are ADMIN).

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 6,
    "method": "generate_user_api_key",
    "params": {
      "data": {
        "user_id": 1000,
        "name": "quickstart key",
        "expires_at": "2027-01-01T00:00:00Z"
      }
    }
  }'
```

Expected shape:

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "result": {
    "data": {
      "id": 1,
      "plaintext_key": "wms_live_sk_<32 random characters>",
      "key_prefix": "wms_live_sk_abcd1234",
      "expires_at": "2027-01-01T00:00:00Z"
    }
  }
}
```

**Copy `plaintext_key` now.** The server stores only a hash. It never shows the key again.

The key belongs to the user in `user_id`. Calls with the key run with that user's role. The user must have `api_access` set to true.

```bash
export WMS_API_KEY="wms_live_sk_..."
```

## Step 8. Call with the API key

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 7, "method": "me", "params": {}}'
```

The answer is the same as in step 3. You no longer need the cookie.

## Step 9. Read a failure

First, leave out a required field. `generate_lpn` needs `data.owner_id`:

```bash
curl -s -i -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 8, "method": "generate_lpn", "params": {"data": {}}}'
```

Expected: HTTP 400 and this shape. The text in `detail` comes from the JSON parser and may differ.

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

Second, call a method your role may not call (or a method that does not exist). The permission check runs before the method lookup. A user with no permission row for the name gets HTTP 403:

```json
{
  "id": null,
  "error": {
    "message": "RBAC_FORBIDDEN",
    "data": { "req_uuid": "1c0e8c1a-77f4-47f8-8a52-2d1c5c7f3b90", "detail": "no_such_method" }
  }
}
```

`id` is `null` here because the server refused the call before it ran the method. Only a superuser (`typ` of `Admin` or `Sys`) skips the permission check. For a superuser, an unknown method gives HTTP 400 and `RPC_REQUEST_METHOD_UNKNOWN`.

Error answers are not standard JSON-RPC. There is no `jsonrpc` key and no numeric `code`. Read `error.message` and `error.data.detail`. Save `error.data.req_uuid`: it is the id to give to support, because it is in the server log. See [05-errors.md](05-errors.md).

## Where to go next

- How login, keys and permissions work: [02-authentication.md](02-authentication.md).
- The request and response shape in detail: [03-request-and-response-format.md](03-request-and-response-format.md).
- Safe repeats and version checks: [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md).
- Full call sequences: [08-workflows-by-example.md](08-workflows-by-example.md).
