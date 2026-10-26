# Webhooks and events

The WMS tells other systems about business changes through **integration events**. This page explains what exists in the code today and what does not.

## The short version

- When a business action commits, the server writes an **integration event** row in the same database transaction. This is an **outbox**. A rolled-back action leaves no event.
- A background **delivery worker** inside `app-server` reads new events and sends them to **subscribers**.
- A subscriber has a delivery method: `webhook` (the server sends an HTTP POST), `poll` (you read the events yourself), or `internal` (handled inside the WMS).
- You read events, deliveries and subscribers with normal JSON-RPC methods. There is no separate "events" REST route in `app-server`.

```text
business command  --(same transaction)-->  enterprise.integration_event   (outbox)
                                                   |
                         delivery worker (polls every 5 s)
                                                   |
           +---------------------+-----------------+---------------------+
           | webhook subscriber  | poll subscriber | internal subscriber |
           | HTTP POST           | stays "pending" | handled in the WMS  |
           +---------------------+-----------------+---------------------+
```

## Events

### Event shape

An event row has these fields (read them with `list_integration_event` and `get_integration_event`):

| Field | Type | Meaning |
|---|---|---|
| `id` | integer | Event id. Events are handled in id order. |
| `event_code` | text | The kind of event, for example `process.receipt.closed`. |
| `event_category` | text | `business` for most events. |
| `entity_name` | text | The kind of thing it is about, for example `receipt`. |
| `key1`, `key2`, `key3` | text | Identifiers. For a receipt, `key1` is the receipt number. For a receipt line, `key1` is the receipt number and `key2` the line number. |
| `payload` | object or null | The details of the event (different for each code). |
| `warehouse` | text or null | The warehouse schema name, such as `wh1`. |
| `tenant_id` | integer or null | The tenant. |
| `event_status` | text | `new`, `partial`, `sent`, `failed` or `skipped`. See below. |
| `internal_status` | text | `new`, `processing`, `done`, `error` or `skipped`. For processing inside the WMS. |
| `internal_result` | object or null | The result of internal processing. |
| `failure_count`, `last_error` | integer, text | Failure bookkeeping. |
| `add_when` | time | When it was written. |

Events are written only by the WMS. The API has **no method to create, edit or delete** an event. Your calls can only read them.

| `event_status` | Meaning |
|---|---|
| `new` | Not delivered yet. |
| `partial` | Delivered to some subscribers. Others are still pending. |
| `sent` | Delivered to every matching subscriber. |
| `failed` | At least one delivery failed for good (retries used up) and none is still pending. |
| `skipped` | No active subscriber matched. |

### Event codes

These codes appear in the Rust code (as literals) and are seeded in the database migrations. Each code has a payload type in `crates/libs/wms-lib-core/src/model/integration/event_payloads/` or in the domain that publishes it.

| Area | Codes |
|---|---|
| Receipt | `process.receipt.opened`, `.line_received`, `.line_short`, `.line_over`, `.line_damaged`, `.qty_adjusted`, `.damaged_reported`, `.discrepancy_reported`, `.put_on_hold`, `.released_from_hold`, `.ready_for_putaway`, `.override_applied`, `.closed`, `.cancelled`, `.pallet_replaced`, `.case_level_loaded`, `.case_received`, `.case_cancelled` |
| Order | `process.order.created`, `.released`, `.cancelled`, `.closed`, `.line_allocated`, `.line_allocation_released`, `.line_allocation_short`, `.line_cancelled`, `.line_qty_adjusted`, `.allocation_contention_deferred` |
| Pick | `process.pick.discrepancy_remediation_requested` |
| Inventory | `process.inventory.moved`, `.deposited`, `.adjusted`, `.count_requested` |
| Container | `process.container.created`, `.moved`, `.repacked`, `.restructured`, `.disposed` |
| Serial | `process.serial.received`, `.reserved`, `.picked`, `.moved`, `.held`, `.shipped`, `.returned`, `.disposed`, `.damaged`, `.flagged_anomaly` |

To see the codes your server knows, call `list_event_registry` (the catalog of events, with name, description and category).

The table lists the codes that the Rust code can publish. In `list_event_registry`, `is_active` says whether the code is published: an active code is sent, an inactive one is not. These codes are in the catalog but **inactive, because no Rust code publishes them**: `process.inventory.hold_applied`, `.hold_released`, `process.lot.created`, `process.lot.expired`, `process.pick.completed`, `process.pick.created`, `process.putaway.completed`, `process.putaway.location_assigned`, `process.receipt.reversal`, `process.shipment.created`, `process.shipment.dispatched`. Do not wait for them. (`process.receipt.reversal` was active and `process.inventory.adjusted` / `.moved` inactive until enterprise 019, F-18; a test now keeps the catalog and the code in step.) Whether a listed code is published in a given flow depends on that flow. Use `list_integration_event` on your system to see what really arrives.

### Read events

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0", "id": 1, "method": "list_integration_event",
    "params": {
      "filters": [ { "event_code": "process.receipt.closed" } ],
      "list_options": { "limit": 20, "order_bys": "!id" }
    }
  }'
```

Methods: `get_integration_event`, `list_integration_event`, `count_integration_event`. The default roles are ADMIN, MANAGER, OPERATOR and VIEWER. See [reference/integration.md](reference/integration.md).

## Subscribers

A subscriber is a place that wants events. Manage subscribers with:

| Method | Default roles |
|---|---|
| `create_integration_subscriber` | ADMIN, MANAGER |
| `update_integration_subscriber` | ADMIN, MANAGER |
| `delete_integration_subscriber` | ADMIN, MANAGER |
| `get_integration_subscriber`, `list_integration_subscriber`, `count_integration_subscriber` | ADMIN, MANAGER, OPERATOR, VIEWER |

Fields you can set through the API:

| Field | Meaning |
|---|---|
| `code` | A stable name. Required when you create. You cannot change it later. |
| `name` | A label. |
| `delivery` | `webhook`, `poll` or `internal`. |
| `webhook_url` | The URL to POST to. In an update you can clear it with an explicit `null`. |
| `max_retries` | How many delivery attempts before the delivery is marked `failed`. Database default: 3. |
| `retry_delay_sec` | The base delay between attempts. Database default: 60. |
| `is_active` | Only active subscribers receive events (update only). |

Example:

```bash
curl -s -X POST "$BASE_URL/api/rpc" \
  -H "Authorization: Bearer $WMS_API_KEY" -H "X-Warehouse-Id: $WAREHOUSE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0", "id": 1, "method": "create_integration_subscriber",
    "params": { "data": {
      "code": "erp_sync",
      "name": "ERP sync",
      "delivery": "webhook",
      "webhook_url": "https://erp.example.com/wms/events",
      "max_retries": 5,
      "retry_delay_sec": 30
    } }
  }'
```

The table has more columns that the API does **not** expose: `event_filter` (which events), `warehouse_filter` (which warehouses) and `webhook_headers` (extra headers, such as an `Authorization` header). A new subscriber gets the database default for `event_filter`, which is every event (`{"event_codes": ["*"]}`), and is active (`is_active` defaults to true). To narrow or to set headers, an administrator must change those columns in the database.

No JSON-RPC method and no web UI form edits `event_filter`, `warehouse_filter` or `webhook_headers`. The create and update structs do not have these fields, and the UI metadata does not mention them. Only SQL changes them. The database seed has one subscriber, `ipaas` (inactive, `event_filter` = `{"event_codes": ["process.*"]}`, URL `http://localhost:8085/api/v1/events/emit`). Before activating that local subscriber for tenant 1000, add `1000@localhost:8085` to `DELIVERY_WEBHOOK_PRIVATE_ALLOWLIST`.

How the filters work in the delivery worker:

- `event_filter.event_codes` is a list. An item can be `*` (all), `prefix.*` (the codes under the prefix: `process.order.*` takes `process.order.created`, never `process.order_x.created` or `process.order` itself), or an exact code.
- `warehouse_filter.warehouses` is a list of warehouse schema names. An empty or missing list means all warehouses.

## Delivery

### Webhook request

For a `webhook` subscriber the worker sends:

```http
POST <webhook_url>
Content-Type: application/json
<any extra headers from webhook_headers>

{
  "event_name": "process.receipt.closed",
  "entity_name": "receipt",
  "key1": "RC000123",
  "warehouse": "wh1",
  "tenant_id": 1000,
  "payload": { "...": "the event payload" }
}
```

- The body has no event id and no timestamp. `event_name` is the `event_code`.
- The worker does **not** sign the request. There is no HMAC header. Protect your endpoint with a secret header set in `webhook_headers`, with network rules, or both.
- A response with a 2xx status is a success. Any other status, or a network error, is a failure. The worker keeps up to 500 characters of the response text.
- The HTTP client has a total time-out of 30 seconds for each request. A slower answer is a failure.
- The worker accepts only `http` and `https` URLs and does not follow redirects. Give the final URL in `webhook_url`.
- DNS is resolved before every request. If any returned address is loopback, private, link-local (including `169.254.169.254`), multicast, unspecified, or in a blocked special-purpose range, the delivery fails with `blocked webhook destination`. The request connects only to the address set that passed this check.
- Delivery connects directly and ignores process-level HTTP proxy variables, because proxy-side DNS resolution cannot be pinned by the worker.
- For an on-premises receiver on a private network, set `DELIVERY_WEBHOOK_PRIVATE_ALLOWLIST` to a comma-separated list such as `1000@erp.internal:8443,2000@10.20.30.40:8080`. Each entry is limited to that event tenant and exact authority. Use `system@host:port` only for a deliberately shared endpoint. The exception does not enable redirects or other URL schemes.

### Delivery rows

For each event and matching subscriber, the worker keeps one **delivery** row. Read them with `list_integration_event_delivery`, `get_integration_event_delivery` and `count_integration_event_delivery`.

| `transmit_status` | Meaning |
|---|---|
| `pending` | Waiting for the first or the next attempt. |
| `processing` | The worker has claimed it. A claim lasts 60 seconds. If the worker dies, another poll takes the row after the claim runs out. |
| `sent` | A 2xx answer arrived. |
| `failed` | Attempts reached `max_retries`. |
| `skipped` | The subscriber was inactive or filtered out. |

Other delivery fields: `attempts`, `last_attempt`, `next_attempt`, `response_code`, `last_error`.

### Order, retries and duplicates

- The worker reads up to 100 events with status `new` or `partial` in each poll, in id order. It polls every 5 seconds by default (`DELIVERY_WORKER_POLL_SEC`).
- A failed attempt is retried after `retry_delay_sec × 2^(attempts so far)` seconds. With `retry_delay_sec = 15`: 15 s, 30 s, 60 s, and so on. The exponent stops growing at 20.
- After `max_retries` attempts the delivery is `failed`. The code has no automatic restart and no replay method for a failed delivery.
- Delivery is **at least once**. If the worker sends a request and dies before it records the result, it can send it again. Your receiver must tolerate duplicates. The values (`event_name`, `entity_name`, `key1`) are not a unique id. The body has no `key2`.
- Order is by event id within one poll, but a retry of an old event can arrive after newer events. Do not rely on strict order.

The webhook body and its headers carry no event id. To de-duplicate, build a key from `event_name`, `key1` and the `payload` fields that identify the change. You can also read `list_integration_event` to get the event `id`, but you cannot match a received body to that id with certainty.

### `poll` subscribers

A `poll` subscriber gets a delivery row that stays `pending`. The worker does nothing else for it.

There is no API to mark a poll delivery as read. The delivery methods are read-only (`list_`, `get_`, `count_`). The comment in the SQL mentions `GET /api/integration/events?subscriber=X&status=pending`, but that route does not exist in `app-server`. Read events with `list_integration_event` and keep your own position (the last `id` you handled).

A poll delivery does not hold back the event. If an event has only poll subscribers, its `event_status` becomes `sent` while the poll delivery row stays `pending`.

### `internal` subscribers

Two internal subscribers are handled inside the WMS:

| Subscriber code | What it does |
|---|---|
| `quark_outbound_execution` | Retries allocation after `process.order.allocation_contention_deferred` or `process.order.line_allocation_short`, and starts pick-short remediation after `process.pick.discrepancy_remediation_requested`. |
| `quark_inventory_count` | Starts a count for a location after `process.inventory.count_requested`. |

A result is stored in the event's `internal_result`.

## The integration platform (separate service)

`crates/services/integration-platform` is a different program with its own REST API (flows, connectors, schedules, API keys) and its own login by header `X-Api-Key`. It can receive webhooks at `/webhooks/{path}` and take events at `POST /api/v1/events/emit`. It is not part of the WMS JSON-RPC API and this guide does not document it.

The wiring is a normal `webhook` subscriber. Its `webhook_url` is `<platform>/api/v1/events/emit`. The platform needs an `X-Api-Key` header, which maps the call to a tenant. The body of the WMS webhook fits the platform's emit body, and the platform ignores `tenant_id` from the body. So the subscriber's `webhook_headers` must hold `{"X-Api-Key": "<platform key>"}`. Only SQL can set `webhook_headers` (see above). Which flow then runs is set in the platform, by `event_name`. This part is not in the WMS code.

## Other push mechanisms

- **Live updates (SSE)** for the web UI are described in ADR-086. They belong to the web UI, not to the JSON-RPC API, and the ADR says the feature ships switched off.
- **Metrics:** `GET /metrics` on `app-server` returns JSON counters: `poll_cycles`, `poll_errors`, `events_polled`, `events_delivered`, `events_skipped`, `deliveries_sent`, `deliveries_failed`, `webhook_calls`, `webhook_latency_sum_ms`, and some authentication counters.
- There is no WebSocket API, and no outbound message queue (the `queue` delivery value is only a comment in the SQL).
