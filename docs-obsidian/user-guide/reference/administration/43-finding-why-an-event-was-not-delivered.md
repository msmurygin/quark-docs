# Finding out why an event was not delivered

Use this page when an outside system says it did not get an event, or got it late.
You will use the [Event monitor](21-event-monitor.md) first, then the [Delivery log](23-delivery-log.md).

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- You know what the event was about: the kind of record (for example a receipt) and its number, or about when it happened.

## Steps

1. Switch to **Enterprise** and open `Integration > Event Monitor`.
2. Filter by `Entity` (for example `receipt`) and `Key` (the receipt number). Find the event.
3. **No row at all?** The event was never written. Go to "The event does not exist" below.
4. Read `Status` and follow the table.

| `Status` of the event | What it means | Next step |
|---|---|---|
| `new` | The delivery worker has not handled it yet. It takes up to 100 events every few seconds (5 by default). | Wait a minute and press `Refresh`. If it stays `new`, the delivery worker may not be running: ask whoever runs the app server. |
| `skipped` | No active subscriber matched the event. | Open [Subscribers](22-subscribers.md). Is the subscriber `Active`? A subscriber made on the screen matches every event. A built-in subscriber matches only its own events. |
| `partial` | At least one delivery is still waiting. | Open the Delivery log (step 5). |
| `failed` | At least one delivery used up its tries. | Open the Delivery log (step 5). |
| `sent` | All handled deliveries were sent. A `poll` subscriber is not counted. | If the receiver says it got nothing, check whether the subscriber is a `poll` one: nothing is sent to it. |

5. Open `Integration > Delivery Log`. Filter `Event ID` with the id you saw. There is one row for each subscriber.
6. Read the row:

| `Status` | `Attempts` | `HTTP Code` | `Last Error` | Cause |
|---|---|---|---|---|
| `pending` | 0 | empty | empty | Not tried yet, or `Max Retries` is 0, or the subscriber is `poll`. |
| `pending` | 1 or more | any | text | A try failed. The next try waits `Retry Delay × 2^n` seconds. |
| `processing` | any | empty | empty | A try is running, or a worker stopped during it. After 60 seconds it can be taken again. |
| `failed` | equals `Max Retries` | `500`, `404`, ... | `HTTP {code}: ...` | The receiver answered with an error. Fix the receiver. |
| `failed` | equals `Max Retries` | empty | a network error text | The receiver could not be reached, or did not answer in 30 seconds. |
| `failed` | 0 | empty | `No webhook URL configured` | The subscriber has no URL. |
| `failed` | 0 | empty | `unknown delivery method {value}` | The subscriber's `Delivery` is `queue` or another value the worker does not know. |
| `failed` | 0 or more | empty | `no internal handler registered for subscriber {code}` | An `internal` subscriber with a code the system does not handle. |
| `sent` | 1 or more | 200 to 299 | empty | Delivered. The receiver accepted it. |

A `failed` delivery is not tried again. No retry button or API method for it was found in the code.

## The event does not exist

The event may not have been written:

1. **It is a record-change event** (`bio.{table}.{operation}`). It is written only if the [Event registry](20-event-registry.md) holds an active row with that exact code. Open the registry and check `Active`.
2. **It is a business event** (`process.*`). The business command writes it in the same transaction as the change. If the command was refused or rolled back, there is no event. Check the business screen.
3. **It was written under another warehouse.** The `Warehouse` column shows the storage name. Check you are looking for the right one.

The registry check does not apply to `process.*` events: switching them off in the registry does not stop them.

## Related pages

- [Event monitor](21-event-monitor.md)
- [Delivery log](23-delivery-log.md)
- [Subscribers](22-subscribers.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
- API: `list_integration_event`, `list_integration_event_delivery`. RF terminal: none.
