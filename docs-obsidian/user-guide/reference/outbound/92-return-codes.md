# Return codes

A refused order command carries a **return code**. The web screens show the message. The API shows the code too.
This page lists the codes that the order commands use. The order commands are `shipment_order_*`, `pick_detail_delete` and the line commands.

The codes are shared with the receiving commands. The other codes of [Inbound return codes](../inbound/92-return-codes.md) do not occur here.

| Code | Class | Name | Meaning | Where you meet it |
|---|---|---|---|---|
| 40 | Retry | Version conflict | The order or the line changed after you read it. The answer carries the current version and status (`current_state`). | `Release`, `Allocate`, `Unallocate` repair their screen copy and ask you to press again (`Order data was updated (now {status}) — the form has been refreshed, please retry`). `Save`, `Cancel Qty` and the line commands show the error. |
| 41 | Retry | Lock timeout, or contention | Another operation holds the order (`order is locked by another operation (waited {ms}ms)`), or reserved stock was locked by another transaction (`allocation still has {qty} units deferred by inventory lock contention`). | Any command. Try again in a moment. |
| 42 | Hard fail | Idempotency conflict | A request key was used again with a different request. | API callers. The web screens make a fresh key for each press. |
| 44 | Retry | Idempotency in progress | The first run of the same key is still working. | API callers. Send the same request again with the same key. |
| 70 | Hard fail | Invalid transition | The status does not allow this action. Message form: `cannot {action} an order in status {status}`. | `Release` (`release`, `release again`), `Cancel` (`cancel`), `Unallocate` (`cancel_allocation`), `Delete Selected` (`delete a reservation from`), `Allocate` (`allocate`), close (`close`). |
| 0 | Hard fail | Business refusal | Any other rule. The message says which. | Everywhere. See the [Messages catalogue](93-messages-catalogue.md). |

Facts about all of them:

- None of them can be overridden by a supervisor. The answer always says `is_overridable: false`. There is no override for releasing an invalid order.
- Code 40 is the only one that carries data to repair the screen.

## Related pages

- [Messages catalogue](93-messages-catalogue.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- API: all order commands.
- RF terminal: not applicable.
