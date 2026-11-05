# Webhooks and events

The WMS tells other systems about business changes through **integration events**.

## The short version

- When a business action commits, the WMS records an **integration event** in
  the same transaction. A rolled-back action leaves no event.
- A background delivery worker sends new events to **subscribers**.
- A subscriber has a delivery method: `webhook` (the server sends an HTTP POST), `poll` (you read the events yourself), or `internal` (handled inside the WMS).
- You read events, deliveries and subscribers with normal JSON-RPC methods.

```text
    business command  --(same transaction)-->  integration event
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

An event has these fields (read them with `list_integration_event` and `get_integration_event`):

| Field | Type | Meaning |
|---|---|---|
| `id` | integer | Event id. Events are handled in id order. |
| `event_code` | text | The kind of event, for example `process.receipt.closed`. |
| `event_category` | text | `business` for most events. |
| `entity_name` | text | The kind of thing it is about, for example `receipt`. |
| `key1`, `key2`, `key3` | text | Identifiers. For a receipt, `key1` is the receipt number. For a receipt line, `key1` is the receipt number and `key2` the line number. |
| `payload` | object or null | The details of the event (different for each code). |
| `warehouse` | text or null | The warehouse identifier carried by the event, such as `wh1`. |
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

The following event codes are available for the current WMS workflows.

| Area | Codes |
|---|---|
| Receipt | `process.receipt.opened`, `.line_received`, `.line_short`, `.line_over`, `.line_damaged`, `.qty_adjusted`, `.damaged_reported`, `.discrepancy_reported`, `.put_on_hold`, `.released_from_hold`, `.ready_for_putaway`, `.override_applied`, `.closed`, `.cancelled`, `.pallet_replaced`, `.case_level_loaded`, `.case_received`, `.case_cancelled` |
| Order | `process.order.created`, `.released`, `.cancelled`, `.closed`, `.line_allocated`, `.line_allocation_released`, `.line_allocation_short`, `.line_cancelled`, `.line_qty_adjusted`, `.allocation_contention_deferred` |
| Pick | `process.pick.discrepancy_remediation_requested` |
| Inventory | `process.inventory.moved`, `.deposited`, `.adjusted`, `.count_requested` |
| Container | `process.container.created`, `.moved`, `.repacked`, `.restructured`, `.disposed` |
| Serial | `process.serial.received`, `.reserved`, `.picked`, `.moved`, `.held`, `.shipped`, `.returned`, `.disposed`, `.damaged`, `.flagged_anomaly` |

To see the codes your server knows, call `list_event_registry` (the catalog of events, with name, description and category).

In `list_event_registry`, `is_active` says whether an event can be published. These catalog entries are inactive, so integrations must not wait for them: `process.inventory.hold_applied`, `.hold_released`, `process.lot.created`, `process.lot.expired`, `process.pick.completed`, `process.pick.created`, `process.putaway.completed`, `process.putaway.location_assigned`, `process.receipt.reversal`, `process.shipment.created`, `process.shipment.dispatched`. Whether an active event occurs still depends on the warehouse workflow. Use `list_integration_event` on your system to confirm what is arriving.

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

Methods: `get_integration_event`, `list_integration_event`, `count_integration_event`. The default roles are ADMIN, MANAGER, OPERATOR and VIEWER. See the [Integration method reference](reference/integration.md).

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
| `description` | An optional explanation of the subscriber. |
| `delivery` | `webhook` or `poll`. `internal` is reserved for Quark-managed subscribers. |
| `webhook_url` | The URL to POST to. In an update you can clear it with an explicit `null`. |
| `webhook_headers` | Extra string-valued HTTP headers. This field is write-only because it may contain a secret. |
| `event_filter` | Event-code patterns such as `process.*`. |
| `warehouse_filter` | Optional warehouse identifiers. |
| `max_retries` | How many delivery attempts before the delivery is marked `failed`. Default: 3. |
| `retry_delay_sec` | The base delay between attempts. Default: 60. |
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

The JSON-RPC API accepts `event_filter`, `warehouse_filter` and `webhook_headers`. The WMS subscriber card does not show all three fields, so configure the hidden routing fields through `create_integration_subscriber` or `update_integration_subscriber`, or ask the deployment administrator to apply them. A new subscriber without an explicit event filter receives all event codes and starts active; configure its filter and authentication header before enabling production delivery.

The built-in Integration Platform subscriber starts inactive. In the Integration Platform, create a tenant-scoped event key under **Config > WMS Events**. Set the subscriber destination to the displayed event endpoint, add the key as `X-Event-Key`, keep the event filter at `process.*`, and test the route before activation.

How the filters work in the delivery worker:

- `event_filter.event_codes` is a list. An item can be `*` (all), `prefix.*` (the codes under the prefix: `process.order.*` takes `process.order.created`, never `process.order_x.created` or `process.order` itself), or an exact code.
- `warehouse_filter.warehouses` is a list of warehouse identifiers. An empty or missing list means all warehouses.

## Delivery

### Webhook request

For a `webhook` subscriber the worker sends:

```http
POST <webhook_url>
Content-Type: application/json
<any extra headers from webhook_headers>

{
  "source_event_id": 12345,
  "event_name": "process.receipt.closed",
  "entity_name": "receipt",
  "key1": "RC000123",
  "warehouse": "wh1",
  "tenant_id": 1000,
  "payload": { "...": "the event payload" }
}
```

- `source_event_id` is the stable WMS outbox event id. The Integration Platform uses it with its WMS source scope to recognize a repeated delivery. `event_name` is the WMS `event_code`.
- The worker does **not** sign the request. There is no HMAC header. Protect your endpoint with a secret header set in `webhook_headers`, with network rules, or both.
- A response with a 2xx status is a success. Any other status, or a network error, is a failure. The worker keeps up to 500 characters of the response text.
- The HTTP client has a total time-out of 30 seconds for each request. A slower answer is a failure.
- The worker accepts only `http` and `https` URLs and does not follow redirects. Give the final URL in `webhook_url`.
- DNS is resolved before every request. If any returned address is loopback, private, link-local (including `169.254.169.254`), multicast, unspecified, or in a blocked special-purpose range, the delivery fails with `blocked webhook destination`. The request connects only to the address set that passed this check.
- Delivery connects directly and ignores process-level HTTP proxy variables, because proxy-side DNS resolution cannot be pinned by the worker.
- For an on-premises receiver on a private network, ask the deployment
  administrator to allow the exact tenant, host and port. This exception does
  not enable redirects or other URL schemes.

### Delivery records

For each event and matching subscriber, the worker keeps one **delivery** record. Read it with `list_integration_event_delivery`, `get_integration_event_delivery` and `count_integration_event_delivery`.

| `transmit_status` | Meaning |
|---|---|
| `pending` | Waiting for the first or the next attempt. |
| `processing` | The worker has claimed it. A claim lasts 60 seconds. If the worker stops, another poll takes the delivery after the claim runs out. |
| `sent` | A 2xx answer arrived. |
| `failed` | Attempts reached `max_retries`. |
| `skipped` | The subscriber was inactive or filtered out. |

Other delivery fields: `attempts`, `last_attempt`, `next_attempt`, `response_code`, `last_error`.

### Order, retries and duplicates

- The worker reads up to 100 events with status `new` or `partial` in each poll,
  in id order. The default poll interval is 5 seconds.
- A failed attempt is retried after `retry_delay_sec × 2^(attempts so far)` seconds. With `retry_delay_sec = 15`: 15 s, 30 s, 60 s, and so on. The exponent stops growing at 20.
- After `max_retries` attempts the delivery is `failed`. Failed deliveries are
  not restarted automatically.
- Delivery is **at least once**. If the worker sends a request and dies before it records the result, it can send it again. A receiver should deduplicate on the stable source identity and still tolerate a repeated request. The body has no `key2`.
- Order is by event id within one poll, but a retry of an old event can arrive after newer events. Do not rely on strict order.

For a custom receiver, use `source_event_id` together with the identity of the WMS source. Do not deduplicate only on `event_name` or `key1`: the same entity can legitimately produce the same event more than once.

### `poll` subscribers

A `poll` subscriber gets a delivery record that stays `pending`. The worker does nothing else for it.

There is no API to mark a poll delivery as read. The delivery methods are
read-only (`list_`, `get_`, `count_`). Read events with
`list_integration_event` and keep your own position, such as the last `id` you
handled.

A poll delivery does not hold back the event. If an event has only poll subscribers, its `event_status` becomes `sent` while the poll delivery stays `pending`.

### `internal` subscribers

Two internal subscribers are handled inside the WMS:

| Subscriber code | What it does |
|---|---|
| `quark_outbound_execution` | Retries allocation after `process.order.allocation_contention_deferred` or `process.order.line_allocation_short`, and starts pick-short remediation after `process.pick.discrepancy_remediation_requested`. |
| `quark_inventory_count` | Starts a count for a location after `process.inventory.count_requested`. |

A result is stored in the event's `internal_result`.

## The integration platform (separate service)

The Integration Platform is a separate service with its own tenant access and REST API. It can receive provider webhooks at `/webhooks/{path}` and authenticated business events at `POST /api/v1/events/emit`.

Connect WMS through a normal `webhook` subscriber whose destination is `<platform>/api/v1/events/emit`. Create a tenant-scoped event key in **Config > WMS Events** and send it in `X-Event-Key`. The event-only key can submit events but cannot open the platform or call ordinary APIs. The platform selects matching active flows by `event_name`, then by the flow's optional owner and warehouse targets. A blank flow target is a wildcard; a set target must equal the event's `owner_id` or `warehouse`. The event key, not a tenant number in the body, determines the tenant. Put new routing values at the top level: `owner_id` in an object payload is only a compatibility fallback, and payload values cannot override an explicit top-level target.

See [Triggers, schedules and webhooks](../integration-platform/04-triggers-schedules-and-webhooks.md) for the platform side and [Configuration, access and API](../integration-platform/06-configuration-access-and-api.md) for its access boundary.

## Other push mechanisms

The public JSON-RPC interface does not provide a WebSocket feed. Use webhook
delivery or event polling for customer integrations.
