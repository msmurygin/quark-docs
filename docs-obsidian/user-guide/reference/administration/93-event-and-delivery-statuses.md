# Event and delivery statuses

Three status fields describe the life of an event: the **event status**, the **internal status** and the **delivery status** of each subscriber.
They are written only by the system. You cannot change them from a screen or from the API.
The values come from the delivery worker in `crates/services/app-server/src/services/integration_delivery.rs`.

## Event status

Field `Status` in the [Event monitor](21-event-monitor.md) (column `event_status`).

| Value | Meaning |
|---|---|
| `new` | The event was written. The worker has not handled it yet. This is the value the system writes. |
| `partial` | At least one non-polling delivery is still `pending` or `processing`. The worker looks at the event again on its next pass. |
| `sent` | Every delivery that the worker handles is `sent`. See the note on polling below. This is a final state. |
| `failed` | Nothing is pending and at least one delivery is `failed`. This is a final state. |
| `skipped` | No subscriber took the event: no subscriber is active, or none matches the event code and warehouse. This is a final state. |

Moves (done in one pass of the worker; it looks only at events that are `new` or `partial`, 100 at a time, oldest first):

| From | To | When |
|---|---|---|
| `new`, `partial` | `skipped` | No active subscriber exists, or no active subscriber matches. |
| `new`, `partial` | `partial` | After this pass some non-polling delivery is still waiting (for example a retry delay). |
| `new`, `partial` | `failed` | After this pass nothing waits and at least one delivery is `failed`. |
| `new`, `partial` | `sent` | After this pass nothing waits and nothing failed. |

A `partial` event is picked up again every pass until it becomes `sent` or `failed`.

**Polling subscribers do not count.** A delivery for a subscriber with `Delivery` `poll` is created `pending` and left alone. The worker leaves it out of the decision, so an event that only polling subscribers wait for becomes `sent` while its delivery row still reads `pending`.

The value `done` is not written by the delivery worker. The clean-up job keeps terminal events for 30 days, then deletes rows whose event status is `sent`, `failed` or `skipped`. It preserves `new` and `partial` events because they may still need delivery work. Internal status is independent of this retention decision.

## Internal status

Field `Internal` (column `internal_status`).

| Value | Meaning |
|---|---|
| `new` | The default. Nothing in-house has handled the event. |
| `done` | A built-in `internal` subscriber handled the event successfully and stored its result (`IntegrationEventBmc::record_internal_result`). |

A failed in-house handling leaves the value at `new` and shows up as a failed or retrying delivery.

## Delivery status

Field `Status` in the [Delivery log](23-delivery-log.md) (column `transmit_status`).

| Value | Meaning |
|---|---|
| `pending` | Created, or waiting for the next try after a failure, or a polling delivery that nobody has collected. |
| `processing` | A worker has taken the delivery and holds a 60-second lease. If the worker dies, the delivery can be taken again after the lease. |
| `sent` | The webhook answered 2xx, or the in-house handler succeeded. Final. |
| `failed` | The attempts reached `Max Retries`, or the `Delivery` value is not known to the worker (for example `queue`). Final. |

Moves:

| From | To | When |
|---|---|---|
| (new row) | `pending` | The worker matched the event to the subscriber. |
| `pending` | `processing` | A worker claims it: attempts are fewer than `Max Retries` and the wait time has passed. |
| `processing` | `sent` | Success. `Attempts` goes up by one, `Last Error` is cleared, `HTTP Code` is stored for a webhook. |
| `processing` | `pending` | Failure with attempts still fewer than `Max Retries`. `Attempts` goes up by one. The next try waits `Retry Delay × 2^n` seconds (see [Subscribers](22-subscribers.md)). |
| `processing` | `failed` | Failure and `Attempts` has reached `Max Retries`. |
| `pending` | `failed` | The subscriber's `Delivery` is not `webhook`, `internal` or `poll`. The error is `unknown delivery method {value}`. |

A `failed` delivery is not tried again. There is no button or API method to retry it.

## Related pages

- [Event monitor](21-event-monitor.md)
- [Delivery log](23-delivery-log.md)
- [Subscribers](22-subscribers.md)
- [Finding out why an event was not delivered](43-finding-why-an-event-was-not-delivered.md)
- API: `list_integration_event`, `list_integration_event_delivery`. RF terminal: none.
