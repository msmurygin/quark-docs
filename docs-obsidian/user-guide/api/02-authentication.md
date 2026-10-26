# Authentication and permissions

Every call to `POST /api/rpc` must say **who you are** (authentication) and **where you work** (warehouse scope). Then the server checks **what you may do** (permission).

```text
credential  ->  user  ->  warehouse (header)  ->  role  ->  permission for the method
```

## Ways to prove who you are

The server looks at the request in this order. The first match wins.

| Order | Header | Credential | Use it for |
|---|---|---|---|
| 1 | `Authorization: Bearer wms_live_sk_...` | Managed API key | Scripts, integrations, other servers |
| 2 | `X-Service-Auth: <token>` | Signed service token | Calls between WMS services only |
| 3 | Cookie `auth-token` | Session cookie | People using a browser or a login script |

If none of them is valid, you get HTTP 401 and `NO_AUTH`.

### Session cookie

1. `POST /api/login` with `{"username": "...", "pwd": "..."}`.
2. The server sets the cookie `auth-token` (`HttpOnly`, path `/`).
3. Send the cookie on every later call.

Facts from the code:

- The token is signed with `SERVICE_TOKEN_KEY`. It lasts `SERVICE_TOKEN_DURATION_SEC` seconds (1800 in the development config).
- Each authenticated request with a cookie sets a fresh cookie. The session slides while you are active.
- The token is tied to the user's `token_salt`. When the salt changes, old tokens stop working.
- If the server finds a bad cookie (wrong format, unknown user, bad signature), it removes the cookie from your browser.
- `POST /api/logoff` with `{"logoff": true}` removes the cookie. The answer is `{"result":{"logged_off":true}}`.
- A user with `rf_login = false` cannot log in from a handheld client. A client that sends the header `X-Rf-Client: rf-go` or `X-Rf-Client: rf-web` is treated as a handheld client. The refusal looks exactly like a wrong password.
- A login that fails, or is throttled, gets HTTP 403 and `LOGIN_FAIL`. See [05-errors.md](05-errors.md).

The `status` column of a user (`Active`, `Invited`, `Locked`, `Disabled`) decides whether the user may be authenticated (`UserStatus::may_sign_in`, `wms-lib-auth/src/user_status.rs`). `Active` and `Invited` are let in. `Locked` and `Disabled` are refused on every door:

- Password login (web, RF, supervisor override): checked after the password matched. The answer is the same as for a wrong password: HTTP 403 `LOGIN_FAIL`.
- A cookie that was issued before the lock: refused on the next request with HTTP 401 `NO_AUTH`, and the cookie is removed.
- A service token for the user: refused the same way.
- An API key of the user: refused with the same generic failure as a revoked key. The key is not revoked and works again when the status goes back to `Active`. The key check is cached, so a key that was accepted a moment ago can work for up to `WMS_API_KEY_TTL_SECS` seconds (default 30).

### API key

An API key is a long secret that starts with `wms_live_sk_`. It belongs to one user.

How to make a key (ADMIN by default):

```bash
curl -s -b cookies.txt -X POST "$BASE_URL/api/rpc" \
  -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0", "id": 1, "method": "generate_user_api_key",
    "params": { "data": { "user_id": 1000, "name": "nightly import", "expires_at": "2027-01-01T00:00:00Z" } }
  }'
```

| Field | Meaning |
|---|---|
| `data.user_id` | The user the key acts as. Required. |
| `data.name` | A label for people. Required. |
| `data.expires_at` | Optional. An RFC 3339 time. After it, the key stops working. |

The answer holds `plaintext_key`, `key_prefix`, `id` and `expires_at`. The plaintext key is shown **once**. The server keeps only an Argon2 hash and the 20-character prefix.

To use a key, send it as a bearer token:

```bash
-H "Authorization: Bearer wms_live_sk_..."
```

To stop a key, call `revoke_user_api_key` with `{"data": {"id": <key id>, "user_id": <key owner user id>}}`. A retry is a successful no-op and keeps the original revoke time. To see keys, call `list_user_api_key` (the list never holds the secret).

Facts from the code:

- A key works only if it is known, not revoked, not expired, and its user has `api_access = true`. All four failures give the same answer (`NO_AUTH`). The server hides which one it was.
- The server remembers a key check for `WMS_API_KEY_TTL_SECS` seconds (30 by default). After you revoke a key or switch off `api_access`, the key can still work for up to that long on a server that has already checked it.
- A key does not carry its own permissions. It acts with the role of its user in the warehouse you select.
- Making and revoking a key is written to the audit log. The plaintext key and the hash are not.
- Administrative HTTP routes, such as `POST /api/admin/rbac/reseed`, accept **only** an API key. A cookie gets `ADMIN_BEARER_REQUIRED`.

The `api_access` column of a new user is `true` by default. So every new user can use an API key from the start. To stop this for one user, set `data.api_access` to `false` with `update_user`, and check with `get_user`.

### Service token

`X-Service-Auth` is used when `web-ui-server` calls `app-server` for a signed-in person. It is signed with `SERVICE_INTERNAL_AUTH_KEY`. It names a service and one user. It cannot be used to act as another user. Outside callers should not use it.

## Choose the warehouse

Most business methods read and write data that belongs to one warehouse. Say which one with a header:

```text
X-Warehouse-Id: 1000
```

| What you send | What happens |
|---|---|
| `X-Warehouse-Id: <id>` and you may use that warehouse | The call runs in that warehouse. |
| `X-Warehouse-Id: <id>` and you may not (or it is not active) | HTTP 403, `WAREHOUSE_NOT_AVAILABLE`. |
| The header is not a positive whole number | HTTP 400, `WAREHOUSE_SELECTOR_INVALID`. |
| No header, and you have exactly one default warehouse | The call runs in your default warehouse. |
| No header, and no default (or more than one) | HTTP 400, `WAREHOUSE_REQUIRED`. |
| The old header `X-Warehouse-Schema` | HTTP 400, `WAREHOUSE_SELECTOR_INVALID`. This header was removed. |

Your warehouses and your role in each one come from `list_user_warehouses`. An administrator changes them with `create_user_warehouse` and `update_user_warehouse`.

`X-Data-Scope: enterprise` asks for the enterprise scope instead of a warehouse. Do not send it together with `X-Warehouse-Id` (HTTP 400, `WAREHOUSE_SELECTOR_CONFLICT`). The scope needs an enterprise role (HTTP 403, `ENTERPRISE_SCOPE_NOT_AVAILABLE` without one). `X-Data-Scope: warehouse` is the same as leaving it out. Any other value gives `WAREHOUSE_SELECTOR_INVALID`.

In the enterprise scope the database search path holds only the shared `enterprise` schema. So only methods that use enterprise tables work there (the "Enterprise" group in the reference: users, roles, API keys, and so on). A method that reads warehouse tables (receipts, stock, orders) fails in this scope. Use `X-Warehouse-Id` for warehouse data. A call with a warehouse header can also use the enterprise tables.

Two methods work before you have a default warehouse: `me` and `list_user_warehouses`.

## Tenant

One `app-server` process serves **one tenant**. The tenant id is part of the server's own configuration (set when the tenant manager provisions the process). It is never read from a request header or from `params`.

- Do not send a tenant id. There is no request field for it.
- The `tenant_id` shown in ADR-058 examples (`meta.tenant_id`) is not read by the code. Unknown keys in `meta` are ignored.
- To work in another tenant, call that tenant's server.

When the tenant manager provisions a tenant on Kubernetes, the tenant's server gets the address `https://<tenant_name>.<base_domain>`. The base domain is a setting of the tenant manager. For other kinds of deployment, ask your administrator for the base URL.

## Permissions (RBAC)

### How a call is checked

For each call to `POST /api/rpc` the server does this:

1. It finds your role in the selected warehouse (`enterprise.user_warehouse`). No role means HTTP 403, `RBAC_NO_ROLE`.
2. If your user `typ` is `Admin` or `Sys`, the check passes. These are superusers.
3. Otherwise it looks for a row in `enterprise.role_permission` with your role, resource type `api` and resource code equal to the **method name**. No row means no access (deny by default). A row gives access when `can_execute` is true.
4. If access is denied, you get HTTP 403, `RBAC_FORBIDDEN`. The body names the method. The denial is written to the audit log.
5. If the permission lookup itself fails (database error), you get HTTP 503, `SERVICE_ERROR`. The server fails closed.

The server keeps role and permission lookups in memory for 60 seconds (`WMS_RBAC_API_TTL_SECS`). The server copy that handles your change clears its memory at once. Other server copies learn about the change through the `enterprise.rbac_cache_epoch` table (a shared poller, see `docs-obsidian/architecture/rbac-cache-invalidation.md`). If that poller is slow, a copy can use the old answer until its 60 seconds end.

`RBAC_ENFORCEMENT_MODE=log_only` is a rollout switch for the whole server. In that mode, denials are logged but not blocked. The default is to enforce.

### Methods that skip the check

These are read from `routes_rpc.rs`:

| Methods | Login | Permission check |
|---|---|---|
| `fetch_screen`, `fetch_reachable_from`, `list_screens`, `get_revision` | No | No |
| `me`, `list_user_warehouses` | Yes | No |
| `rpc.discover` | No | No |

### Roles

The built-in roles are `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER`. You can add custom roles. A custom role starts with **no** permissions.

The first time the server sees a method, it adds default permission rows for the built-in roles. Each method lists its default roles in the reference (`Roles that have it by default`) and in the OpenRPC key `x-quark-default-roles`. The seeding never overwrites an administrator's edit.

### Change permissions

| Task | Method |
|---|---|
| See the grid of roles and methods | `list_permission_matrix` |
| Save changes from the grid | `batch_upsert_permission_matrix` or `batch_update_role_permissions` |
| Work on single rows | `create_role_permission`, `update_role_permission`, `delete_role_permission` |
| Work on roles | `create_role`, `update_role`, `delete_role` |
| Give a user a role in a warehouse | `create_user_warehouse`, `update_user_warehouse` |

Only `ADMIN` may change the permission matrix or individual role-permission rows. `MANAGER` retains read-only access to the matrix.

A permission row has `role_id`, `resource_type`, `resource_code` and the bits `can_read`, `can_write`, `can_delete`, `can_execute`. For an API method, set `resource_type` to `api`, `resource_code` to the method name, and `can_execute` to `true`.

There is also an HTTP route that rebuilds the default rows from the method catalog: `POST /api/admin/rbac/reseed` (add `?force=true` to overwrite). It needs an **API key** (not a cookie) whose user holds the capability `admin.rbac.reseed`. Every use is written to the audit log.

### Supervisor overrides (two-person rule)

Some commands refuse an action that a supervisor may allow, such as receiving more than the plan. The refusal comes back with `is_overridable: true` and a list of `pairs` in `error.data.detail.context`. Then:

1. The operator asks a supervisor.
2. You call `supervisor_override_grant` with those `pairs`. If the caller cannot authorise every pair, send the supervisor's `username` and `password`. The server checks them with the same code as `/api/login`.
3. The answer gives a `grant_id`. It works once and expires after a few minutes.
4. Repeat the original command and pass the grant as `override_grant_id`.

Who may authorise a pair:

| Pair | Needs |
|---|---|
| A move pair | A role in `SUPERVISOR`, `MANAGER` or `ADMIN` |
| Receipt code 27 (excess) | Capability `receipt.override_qty_excess` |
| Receipt code 28 (shortage) | Capability `receipt.override_qty_shortage` |
| Receipt code 71 (close with a discrepancy) | Capability `receipt.override_close_discrepancy` |
| Pick pallet code 121 | Capability `pick_drop.close_foreign` |
| Pick code 120, packing code 122 | A role in `SUPERVISOR`, `MANAGER` or `ADMIN` |

The three `receipt.*` capabilities are given to `SUPERVISOR` only. `ADMIN` and `MANAGER` cannot authorise a receipt override. The person who receives cannot approve their own discrepancy. See [05-errors.md](05-errors.md) and [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md).

## Browser calls (CORS)

The server allows `GET` and `POST`, the headers `Content-Type`, `Authorization`, `Referer`, `X-Warehouse-Id` and `X-Data-Scope`, and credentials (cookies). It allows only the origins listed in `SERVICE_CORS_ALLOWED_ORIGINS`.

## Quick reference

| Problem | Answer |
|---|---|
| HTTP 401 `NO_AUTH` | The cookie or key is missing, expired or wrong. Log in again, or check the key. |
| HTTP 403 `LOGIN_FAIL` | Wrong login, throttled, or a handheld client for a user without `rf_login`. |
| HTTP 403 `RBAC_FORBIDDEN` | Your role has no `can_execute` on this method. Ask an administrator. |
| HTTP 403 `RBAC_NO_ROLE` | You have no role in this warehouse. |
| HTTP 400 `WAREHOUSE_REQUIRED` | Send `X-Warehouse-Id`, or set a default warehouse. |
