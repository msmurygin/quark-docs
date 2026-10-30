# Delivery log

The `Deliveries` screen has one row for each pair of an event and a subscriber: "event 812 to subscriber 3".
It shows how many times the worker tried, what the answer was, and the last error.
It is a read-only list.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Integrations > Deliveries`.

The menu item is `ent_event_delivery_menu`. It opens the list `ent_event_delivery_list_form`. The card is `ent_event_delivery_normal_form`. The data object is `integration_event_delivery` (table `enterprise.integration_event_delivery`).

## How a row is made

When the delivery worker finds a new event and one or more active subscribers match it, it makes one row for each pair, with the status `pending`. The pair is unique (`integration_event_delivery_event_id_subscriber_id_key`).
The worker then tries the delivery, according to the `Delivery` setting of the [subscriber](22-subscribers.md), and updates the row.
See [Event and delivery statuses](93-event-and-delivery-statuses.md) for the values and the moves between them.

## The list

| Label | Column | Type | Filter | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | The delivery id. |
| `Event ID` | `event_id` | Whole number | Number | The event, as shown in the [Event monitor](21-event-monitor.md). |
| `Subscriber` | `subscriber_id` | Whole number | Number | The id of the subscriber, not its code. |
| `Status` | `transmit_status` | Text, up to 10 characters | Text | `pending`, `processing`, `sent` or `failed`. |
| `Attempts` | `attempts` | Whole number | Number | How many tries have finished. |
| `Last Error` | `last_error` | Text | Text | The error of the last failed try. Cleared after a success. |
| `HTTP Code` | `response_code` | Whole number | Number | The HTTP status of the last webhook answer. Empty for in-house deliveries and for network errors. |

All columns are read only. The only button is `Refresh`. Click a row to open the card.

The card shows the same fields, all read only, with no buttons:
`Event ID`, `Subscriber`, `Status`, `Attempts`, `Last Error`, `Response Code`.

The columns `transmit_batch`, `last_attempt`, `next_attempt` and `response_body` are stored but not shown on this screen. `transmit_batch` and `response_body` have no writer in the code, so they stay empty.
`last_error` for an HTTP failure holds `HTTP {code}: ` and the first 500 characters of the answer body.

## What it affects

- Nothing by itself. The screen only reads.

## Who can use it

`list_integration_event_delivery`, `get_integration_event_delivery` and `count_integration_event_delivery` are open to the default roles `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`. There is no method to change a delivery or to retry a failed one.
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Finding out why an event was not delivered](43-finding-why-an-event-was-not-delivered.md)
- [Subscribers](22-subscribers.md)
- [Event monitor](21-event-monitor.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
- API: `list_integration_event_delivery`, `get_integration_event_delivery`, `count_integration_event_delivery`. RF terminal: none.
