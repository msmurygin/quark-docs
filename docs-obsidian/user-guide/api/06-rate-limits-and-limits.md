# Rate limits and limits

Use these limits when sizing requests and designing retries. A reverse proxy,
API gateway or load balancer can apply stricter limits for your installation;
ask the deployment administrator for the production values.

## Rate limiting

Quark does not publish a fixed application quota per user or API key. The
deployment gateway can still return HTTP 429 or 503 under load. Clients should:

- use a finite request time-out;
- back off after HTTP 429 or 503;
- honor `Retry-After` when the gateway supplies it;
- repeat commands with the same idempotency key.

The Integration Platform has separate limits for its outgoing connectors. See
[Webhooks and events](07-webhooks-and-events.md).

## Login attempts

Password login and a supervisor override that checks a password share the same
throttle.

| Setting | Value |
|---|---|
| Failures allowed | 10 |
| Window | 60 seconds. Each attempt restarts the window. |
| What happens at the limit | HTTP 403 and `LOGIN_FAIL`, the same response as an incorrect password. |
| Reset | A successful login clears the count for that user. |

This is a temporary throttle, not an account lock. Several running API
instances can maintain separate counters.

## List size

| Setting | Value |
|---|---|
| Default `list_options.limit` | 1000 rows |
| Maximum `list_options.limit` | 5000 rows |
| Above the maximum | The call is refused rather than truncated. |

These values apply to the standard `list_*` methods. A method can document a
smaller limit; for example, `wave_list` defaults to 50. Use `limit` and
`offset` instead of requesting every row at once.

## Request size

A JSON request body larger than 2 MB (2,097,152 bytes) is refused with HTTP
413 before the method runs. On `/api/rpc`, the response uses
`RPC_REQUEST_INVALID`. Keep requests small and use the approved import workflow
for large files.

## Idempotency

| Setting | Value |
|---|---|
| Stored answer kept for | 7 days by default |
| A repeated call waits for the first call | Up to 6 seconds; then return code 44 |
| An unfinished claim can be taken over after | 300 seconds |

The answer-retention period is controlled by the `IDEMPOTENCY_TTL_DAYS` system
setting. See [Command types and concurrency](04-command-types-and-concurrency.md).

## Sessions, grants and reservations

| Item | Default behavior |
|---|---|
| Session cookie | Deployment-defined; authenticated activity renews it |
| API-key validation cache | Up to 30 seconds |
| Role and permission cache | Up to 60 seconds across running instances |
| Supervisor override grant | 300 seconds and one use |
| Putaway location reservation | 15 minutes |
| Task lease | 15 minutes |

Your deployment can change several of these values. Do not hard-code them into
a client workflow.

## Command waits

| Item | Default |
|---|---|
| Order lock wait | 5 seconds; then return code 41 |
| Receipt lock wait | 5 seconds; then return code 41 |

Retry a lock refusal only as described in
[Command types and concurrency](04-command-types-and-concurrency.md), using the
same idempotency key.

## Integration delivery

| Item | Default |
|---|---|
| Delivery-worker poll interval | 5 seconds |
| Events considered in one poll | 100 |
| Delivery claim | 60 seconds |

See [Webhooks and events](07-webhooks-and-events.md) for retry and duplicate
delivery behavior.

## Method-specific limits

Business methods can impose stricter limits. For example, wave strategies
validate their order, line and run limits. Read the method description and
schema in the [method reference](reference/index.md); do not assume that the
general transport limits are the only validation.
