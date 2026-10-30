# Subscribers

A **subscriber** is an outside system (or an in-house job) that receives events. The `Subscribers` screen lists them and sets how each one is reached: by webhook, by polling, or in-house.
The delivery worker of the app server reads new events from the [Event monitor](21-event-monitor.md) and delivers each one to every matching active subscriber.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Integrations > Subscribers`.

The menu item is `ent_integration_subscriber_menu`. It opens the list `ent_integration_subscriber_list_form`. The card is `ent_integration_subscriber_normal_form`. The data object is `integration_subscriber` (table `enterprise.integration_subscriber`).

## The list

| Label | Column | Type | Filter | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | The row id. |
| `Code` | `code` | Text | Text | The code of the subscriber. |
| `Name` | `name` | Text | Text | The name. |
| `Delivery` | `delivery` | Text | Text | How events are delivered. |
| `Webhook URL` | `webhook_url` | Text | Text | The address for a webhook. |
| `Active` | `is_active` | Yes/No | none | Whether the subscriber receives events. |

All columns are read only.

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `New` | Nothing | Opens an empty card in place of the list. | [Adding a subscriber](42-adding-a-subscriber.md) |
| `Delete` | One or more ticked rows | Deletes the ticked rows, one by one (`generic_delete_selected`). The message is `{n} Subscriber record(s) deleted`. | [Adding a subscriber](42-adding-a-subscriber.md) |
| `Refresh` | Nothing | Reads the list again. | |

Click a row to open its card.

## The card

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Code` | `code` | Text, up to 50 characters | Yes | Any text. | The key of the subscriber. **It cannot be changed after the first save.** |
| `Name` | `name` | Text, up to 200 characters | Yes | Any text. | A readable name. Stored only. It has no effect today. |
| `Delivery` | `delivery` | Drop-down, up to 20 characters | Yes | `poll` (Poll), `webhook` (Webhook), `queue` (Queue). The database default is `poll`. | How the event reaches the subscriber. See the next table. |
| `Webhook URL` | `webhook_url` | Text, up to 500 characters | No | Any text. | The address the worker posts to when `Delivery` is `webhook`. |
| `Max Retries` | `max_retries` | Whole number | No | 3 by default. | The number of times a delivery is tried, **counting the first try**. |
| `Retry Delay (s)` | `retry_delay_sec` | Whole number | No | 60 by default. | The base wait, in seconds, before the next try. |
| `Active` | `is_active` | Check box | No | On by default. | An inactive subscriber receives nothing. |

Buttons: `Save` saves and goes back (`generic_save`). `Delete` deletes the subscriber and goes back (`generic_delete`).
A new subscriber is always saved with `Active` on: the create call has no `is_active` field. Switch it off after the first save if you need to.

The columns `description`, `webhook_headers`, `event_filter` and `warehouse_filter` have no field on the card. The JSON-RPC create and update methods accept these fields, and read responses deliberately omit `webhook_headers` because it may hold a secret.
**A subscriber made on this screen has the filter `{"event_codes": ["*"]}`: it receives every event of every warehouse.** Use the JSON-RPC method or ask the deployment administrator to narrow it before production activation.

### What each `Delivery` value does

The rules are in the delivery worker.

| Value | What the worker does |
|---|---|
| `webhook` | Sends an HTTP POST to an HTTP(S) `Webhook URL` with `Content-Type: application/json`, optional configured headers and this body: `source_event_id`, `event_name`, `entity_name`, `key1`, `warehouse`, `tenant_id`, `payload`. Redirects are refused. DNS answers are pinned and private/special addresses fail with `blocked webhook destination` unless the exact `TENANT_ID@host:port` (or an explicit `system@host:port`) is in `DELIVERY_WEBHOOK_PRIVATE_ALLOWLIST`. The answer must be HTTP 2xx within 30 seconds. With no URL, the delivery fails with `No webhook URL configured`. A failure keeps the text `HTTP {code}: {first 500 characters of the answer}`, or the network error. |
| `poll` | The worker only creates the delivery row. It stays `pending`. Nothing is sent. |
| `queue` | Not handled. The delivery is marked `failed` with the error `unknown delivery method queue`. |
| `internal` | Not in the drop-down. Used by two built-in subscribers that run work inside the system. See below. |

### Retries

A delivery is claimed only while its attempts are fewer than `Max Retries`. After a failed try:

- The attempts count goes up by one.
- If attempts have reached `Max Retries`, the delivery becomes `failed` and is not tried again.
- Otherwise it goes back to `pending`, and the next try waits `Retry Delay × 2^n` seconds, where `n` is the number of tries already made before this one (so the waits are 1, 2, 4, ... times the delay). The exponent stops growing at 20. A delay of 0 is treated as 1 second.

With `Max Retries` at 0, no try is ever made: the delivery stays `pending` and the event stays `partial`.
A try that started but did not finish keeps a lease of 60 seconds; after that another worker pass may take it again (`DELIVERY_LEASE_SEC`).

### Which events a subscriber gets

The worker matches the event code against the `event_filter` of each **active** subscriber (`match_subscribers`):

| Pattern in the filter | Matches |
|---|---|
| `*` | Every event. |
| `prefix.*` | Every code below `prefix.`. For example, `process.*` matches `process.order.created`, but not `processfoo.x` or `process` itself. |
| An exact code | That code. |

If a `warehouse_filter` lists warehouses, only events of those warehouses match. An empty or missing filter matches all.
An event that matches no subscriber becomes `skipped`. If no subscriber is active at all, every waiting event becomes `skipped`.

### Built-in subscribers

Two subscribers with `Delivery` `internal` are made by migrations. They run work inside the system and are not web hooks.

| Code | What it does | Events it takes |
|---|---|---|
| `quark_outbound_execution` | Retries order allocation and handles pick discrepancies. | `process.order.allocation_contention_deferred`, `process.order.line_allocation_short`, and the pick discrepancy event. |
| `quark_inventory_count` | Starts counts requested by an event. | `process.inventory.count_requested` (`INVENTORY_COUNT_REQUESTED`). |

## Rules

| Rule | What it means |
|---|---|
| Keep `Code` unique and stable. | Treat it as the subscriber's permanent integration identifier, even if another row could be saved with the same value. |
| After the first save, `Name`, `Delivery`, `Webhook URL`, `Max Retries`, `Retry Delay` and `Active` can change. | You can also clear an existing webhook URL. |
| Deleting a subscriber removes its delivery history. | Export any history needed for an audit before deleting the subscriber. |

The delivery worker accepts only final HTTP(S) URLs, refuses redirects and blocks private or special-purpose destinations unless the deployment explicitly allows the exact tenant and address.

## Who can use it

`create_integration_subscriber`, `update_integration_subscriber` and `delete_integration_subscriber` are open to the default roles `ADMIN` and `MANAGER`.
The read methods are open to `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`.
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Adding a subscriber](42-adding-a-subscriber.md)
- [Delivery log](23-delivery-log.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
- Administrator guide: [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `create_integration_subscriber`, `update_integration_subscriber`, `delete_integration_subscriber`, `list_integration_subscriber`. RF terminal: none.
