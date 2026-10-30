# Event monitor

The `Events` screen shows the **event log**: every event the system has written, with its delivery state.
It is a read-only list. You use it to check that an event was written and what became of it.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Integrations > Events`.

The menu item is `ent_integration_event_menu`. It opens the list `ent_integration_event_list_form`. The card is `ent_integration_event_normal_form`. The data object is `integration_event` (table `enterprise.integration_event`).

## How events get here

Events are written by the system, never by hand. Two sources write them:

| Source | Event code | When |
|---|---|---|
| Business commands | `process.*`, for example `process.receipt.closed` | In the same database transaction as the business change. If the change is rolled back, the event is rolled back with it. |
| Generic record saves | `bio.{table}.{operation}`, for example `bio.receipt.after_insert` | After a record is created, changed or deleted, only if the [Event registry](20-event-registry.md) has an active row with that code. |

A background job in the app server (the **delivery worker**) reads new events and hands them to the [Subscribers](22-subscribers.md).
It wakes every `DELIVERY_WORKER_POLL_SEC` seconds and takes up to 100 events that are `new` or `partial`, oldest first.

## The list

| Label | Column | Type | Filter | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | The event id. |
| `Event Code` | `event_code` | Text, up to 100 characters | Text | The event type. |
| `Entity` | `entity_name` | Text, up to 100 characters | Text | The kind of record, for example `receipt`. |
| `Key` | `key1` | Text, up to 100 characters | Text | The first key of the record, for example the receipt number. The columns `key2` and `key3` are stored but not shown. |
| `Status` | `event_status` | Text, up to 10 characters | Text | Where the event is in delivery: `new`, `partial`, `sent`, `failed` or `skipped`. See [Event and delivery statuses](93-event-and-delivery-statuses.md). |
| `Failures` | `failure_count` | Whole number | Number | See the note below. |
| `Warehouse` | `warehouse` | Text, up to 20 characters | Text | The storage name (schema) of the warehouse that wrote the event, for example `wh1`. Empty for events with no warehouse. |

All columns are read only. The only button is `Refresh` (`btn_refresh`).
Click a row to open the card.

### The card

All fields are read only. There are no buttons.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `Event Code` | `event_code` | Text | As in the list. |
| `Entity` | `entity_name` | Text | As in the list. |
| `Status` | `event_status` | Text | As in the list. |
| `Internal` | `internal_status` | Text, up to 10 characters | The state of in-house handling: `new` at first, `done` after an internal subscriber has handled the event (`IntegrationEventBmc::record_internal_result`). It stays `new` for events no internal subscriber handles, and when the internal handler failed. |
| `Failures` | `failure_count` | Whole number | See the note below. |
| `Last Error` | `last_error` | Text | See the note below. |
| `Warehouse` | `warehouse` | Text | As in the list. |

The payload of the event (`payload`) and the result of internal handling (`internal_result`) are stored but not shown on this screen.

> **`Failures` and `Last Error` stay empty.** The columns `failure_count` and `last_error` of the event row have no writer in the code: the delivery worker writes its counts and errors to the **delivery** row, not to the event row. To see attempts and errors, use the [Delivery log](23-delivery-log.md).

## What it affects

- Nothing by itself. The screen only reads.
- Terminal events are kept for 30 days for investigation. The clean-up job then deletes `sent`, `failed` and `skipped` rows. It preserves `new` and `partial` events that may still require delivery work.

## Who can use it

`list_integration_event`, `get_integration_event` and `count_integration_event` are open to the default roles `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`. There is no method to create, change or delete an event through the API.
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Event registry](20-event-registry.md)
- [Subscribers](22-subscribers.md)
- [Delivery log](23-delivery-log.md)
- [Finding out why an event was not delivered](43-finding-why-an-event-was-not-delivered.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
- API: `list_integration_event`, `get_integration_event`, `count_integration_event`. RF terminal: none.
