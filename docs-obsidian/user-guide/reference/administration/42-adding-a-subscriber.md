# Adding a subscriber

Use this page to connect an outside system to the event stream, to change how it is reached, or to stop it.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- You know how the outside system wants the events. The screen offers `webhook`, `poll` and `queue`. **Only `webhook` sends anything.** `poll` keeps the delivery waiting and sends nothing. `queue` is not handled and every delivery for it fails. See [Subscribers](22-subscribers.md).
- For a webhook: the full HTTP(S) address and an agreement with the receiving system on what it does with the message and what it answers. It must answer with an HTTP 2xx code within 30 seconds. Private-network receivers must be listed as an exact `TENANT_ID@host:port` in `DELIVERY_WEBHOOK_PRIVATE_ALLOWLIST`; use `system@host:port` only for an endpoint intentionally shared by all tenants.
- Know that a new subscriber receives **every** event of every warehouse. The screen cannot narrow it.
- The app server validates and resolves the address when it delivers an event. It refuses redirects and blocks private or special-purpose destinations unless the exact authority is configured as described above.

## Steps

1. Switch to **Enterprise**.
2. Open `Integration > Subscribers`.
3. Click `New`. An empty card opens.
4. Fill `Code` (it cannot be changed later) and `Name`.
5. Pick `Delivery`: `webhook`.
6. Type the `Webhook URL`.
7. Set `Max Retries` (the number of tries including the first, 3 by default) and `Retry Delay (s)` (60 by default).
8. Click `Save`. You go back to the list. The subscriber is active.
9. To switch it off later, open it, untick `Active` and click `Save`.

To remove a subscriber: tick it in the list and click `Delete`, or open it and click `Delete`. Its delivery rows are deleted with it.

## What the receiver gets

For each event, one HTTP POST with `Content-Type: application/json` and this body:

| Key | What it holds |
|---|---|
| `event_name` | The event code, for example `process.receipt.closed`. |
| `entity_name` | The kind of record, for example `receipt`. |
| `key1` | The first key of the record, for example the receipt number. |
| `warehouse` | The storage name of the warehouse, for example `wh1`. |
| `tenant_id` | The tenant, or empty. |
| `payload` | The details of the event, as JSON. |

The screen has no field for extra headers (for example a token). The column exists in the table but only a database change can set it.

## What changes

| What | Change |
|---|---|
| Table `enterprise.integration_subscriber` | A row is added, changed or deleted. |
| Delivery | On its next pass (every 5 seconds by default) the worker starts to make delivery rows for the new events. Events written **before** the subscriber existed are not sent to it if they are already handled. |
| Audit | The subscriber is not audited. |

## What can go wrong

| Problem | Meaning | Fix |
|---|---|---|
| The [Delivery log](23-delivery-log.md) shows `failed` with `No webhook URL configured` | `Delivery` is `webhook` but the URL is empty. | Type the URL. |
| `failed` with `HTTP 500: ...` | The receiver answered with an error. | Fix the receiver. A failed delivery is not tried again once the attempts are used up. |
| `failed` with `unknown delivery method queue` | `queue` is not handled. | Use `webhook`. |
| Deliveries stay `pending` | `Delivery` is `poll`, or the retry wait has not passed, or `Max Retries` is 0. | See [Subscribers](22-subscribers.md). |
| Two rows have the same code | The database does not stop it when the tenant is empty. | Delete one. |
| Events arrive twice at the receiver | A try may be repeated after a timeout. The receiver should accept the same event twice. | Make the receiver safe against repeats. |

## Related pages

- [Subscribers](22-subscribers.md)
- [Delivery log](23-delivery-log.md)
- [Finding out why an event was not delivered](43-finding-why-an-event-was-not-delivered.md)
- Administrator guide: [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `create_integration_subscriber`, `update_integration_subscriber`, `delete_integration_subscriber`. RF terminal: none.
