# Rate limits and limits

This page lists the limits that the code enforces. It also says clearly which limits do **not** exist, so you do not plan around a protection that is not there.

## Rate limiting of the API

**Not enforced.** `app-server` has no request-rate limit on `POST /api/rpc`, per user, per API key or per IP address. There is no `429 Too Many Requests` answer, no `Retry-After` header and no quota header. The code has no rate-limiter layer (searched for `tower_governor`, `RateLimitLayer`, `governor` and similar).

The integration platform (a separate service, see [07-webhooks-and-events.md](07-webhooks-and-events.md)) has a rate limiter for its own outgoing connectors. It does not apply to `app-server`.

> Not confirmed by code: limits that a reverse proxy, API gateway or load balancer in front of `app-server` may add. The Kubernetes files in this repository (`k8s/`) set no rate limit and no body-size limit on the ingress, but your deployment may differ. To verify: send 200 fast calls (`for i in $(seq 200); do curl -s -o /dev/null -w "%{http_code}\n" -X POST "$BASE_URL/api/rpc" ...; done | sort | uniq -c`) and look for `429` or `503`. Or ask your administrator.

Design your client as if the server could be slow under load. Use time-outs and the idempotency key ([04-command-types-and-concurrency.md](04-command-types-and-concurrency.md)).

## Limits that exist

### Login attempts

`POST /api/login` and `supervisor_override_grant` (when it checks a user name and password) share one check.

| Setting | Value |
|---|---|
| Failures allowed | 10 |
| Window | 60 seconds. Each attempt, allowed or refused, restarts the window. |
| Counted by | The user name (lower-cased), and the client address when the caller knows it |
| What happens at the limit | The attempt is refused with the same `LOGIN_FAIL` answer as a wrong password (HTTP 403). The server does not tell you that you are throttled. |
| Reset | A successful login clears the count for that user. |

Facts from the code:

- The count lives in the memory of one server process. With several server copies, each has its own count.
- `POST /api/login` does not pass a client address to the check, so only the user-name count applies there. The override-grant door can pass one.
- This is a throttle, not a lock-out. The account is not disabled.

### List size

| Setting | Value |
|---|---|
| Default `list_options.limit` | 1000 rows |
| Maximum `list_options.limit` | 5000 rows |
| Above the maximum | The call is refused. It is not cut to 5000. As the code reads, the answer is HTTP 500 and `SERVICE_ERROR`. |

Applies to the generated `list_*` methods. A hand-written list method may set its own limit. For example `wave_list` has a default `limit` of 50. See the reference for each method.

There is no way to ask for "all rows". Page with `limit` and `offset`.

### Request size

The code sets no limit of its own. The web framework (Axum 0.8.9) applies its default: a JSON body larger than 2 MB (2,097,152 bytes) is refused with HTTP 413, before the method runs. On `/api/rpc` the answer is the usual error shape with `RPC_REQUEST_INVALID` (see 05-errors). Keep requests small, and send large files by other means.

### Idempotency

| Setting | Value | Where it comes from |
|---|---|---|
| Stored answer kept for | 7 days | System setting `IDEMPOTENCY_TTL_DAYS` (default 7) |
| A second call waits for a running first call | up to 6 seconds (30 polls of 200 ms) | Then it answers return code 44 |
| An unfinished claim counts as abandoned after | 300 seconds | A later call with the same key takes it over |

### Session and key lifetimes

| Item | Value | Where it comes from |
|---|---|---|
| Session cookie lifetime | `SERVICE_TOKEN_DURATION_SEC` seconds (1800 in the development config). Each call renews it. | `.cargo/config.toml` |
| API key check cache | 30 seconds | `WMS_API_KEY_TTL_SECS` |
| Role and permission cache | 60 seconds | `WMS_RBAC_API_TTL_SECS` |
| Supervisor override grant | 300 seconds by default. Used once. | System setting `OVERRIDE_GRANT_TTL_SECONDS` |
| Putaway location reservation | 15 minutes by default | `DEFAULT_TTL_MINUTES`, or a setting for the owner |
| Task lease | 15 minutes by default | `DEFAULT_LEASE_TTL_MIN` in `wms-tasks` |

### Waits inside a command

| Item | Value |
|---|---|
| Order lock wait | 5000 ms by default (`ORDER_LOCK_TIMEOUT_MS`, a system setting). Then return code 41. |
| Receipt lock wait | 5000 ms by default (`RECEIPT_LOCK_TIMEOUT_MS`, a system setting). Then return code 41. |

A value of 0 or less in a lock time-out setting is not used; the server waits 5000 ms (`SystemSettingsBmc::lock_timeout_ms`).
| Database connection wait | 10 seconds (`WMS_DB_POOL_ACQUIRE_SECS`) |
| Database pool size | 20 connections (`WMS_DB_POOL_MAX`) |

When many callers use the same server, the pool size and these waits are the real limit on how many calls run at once. A call that waits too long for a connection fails with a server error.

### Integration delivery

| Item | Value |
|---|---|
| Poll interval of the delivery worker | 5 seconds by default (`DELIVERY_WORKER_POLL_SEC`) |
| Events handled in one poll | 100 |
| Lease on a delivery being sent | 60 seconds |

See [07-webhooks-and-events.md](07-webhooks-and-events.md).

## Limits that do not exist

| You might expect | What the code does |
|---|---|
| A rate limit per API key | None. |
| A daily quota | None. |
| A limit on the number of API keys per user | None found. |
| A cap on `ids` in `delete_many_*` | None found. |
| A cap on the number of lines in a command | None found in the API layer. |
| A cap on the size of `filters` | None found. |

Some business rules do limit the input of one command. For example, a wave policy is refused unless `max_orders` is from 1 to 1000, `max_lines` is from 1 to 100000 and `max_waves_per_run` is from 1 to 20. This is why `wave_policy_build` is "bounded". The API layer has no general rule of this kind. Check the method's description in the reference for each method.
