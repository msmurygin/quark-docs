# Cancelling a receipt

Use this page when the goods will not come and nothing was received. Cancelling is final.

## Before you start

- Select **one** receipt. The status is `Open`, `InProgress` or `OnHold`, and the completion is `Pending` (nothing received).
- **Every** line of the receipt has completion `Pending`. One received line stops the cancel (code 72).
- You have the web action `receipt_cancel` and the API right `receipt_cancel`. By default only `ADMIN` and `MANAGER` have them. See [Who can do what](91-who-can-do-what.md).

## Steps

1. Open `Inbound > Receipts`.
2. Tick one receipt.
3. Click `Cancel Receipt`. The window `Cancel Receipt` opens. It says `Cancelling a receipt is final and cascades to every line that is not already closed.`
4. Type a `Reason`. The hint says `Recorded in the cancel summary and sent to the ERP. Required.`
5. Click `Cancel Receipt` in the window. Click `Keep Receipt` to leave without cancelling.

The screen sends the version of the receipt that you saw. The button is a generic command (`generic_rpc_command`, method `receipt_cancel`; `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/062_receipt_and_task_use_rpc_command.sql:70-100`).

## What the screen says

| Result | Message |
|---|---|
| Cancelled | `Receipt cancelled` |
| `Reason` is empty | `Say why the receipt is being cancelled` |
| The list changed | `The receipt list has moved on — reselect the receipt and try again` |
| Refused | `Receipt {receipt number} could not be cancelled: {error}` |

After success the window closes and the list is read again.

## What changes

| What | Change |
|---|---|
| Receipt | `status` becomes `Cancelled`. `cancel_summary` is written. The version goes up. |
| Lines | Every line that is not `Closed` becomes `Cancelled`. |
| `cancel_summary` | `cancelled_at`, `cancel_reason`, `user_id`, `details_count`. See [Summary tab](13-summary-tab.md). |
| Events | `process.receipt.cancelled`, with the reason and the summary. |
| Stock | Nothing changes. |

Cancelling a receipt that is already `Cancelled` does nothing and gives no error (`crates/libs/wms-inbound/src/domain/receipt/aggregate.rs:145`).

## What can go wrong

| Code | Message in `{error}` | Meaning | Fix |
|---|---|---|---|
| 72 | `cannot cancel receipt {id}: detail line {n} has completion={completion}` | Goods were received on line `n`. | Close the receipt instead. Code 72 cannot be overridden. |
| 70 | `cannot cancel receipt id={id} in terminal state {status}` or the state-machine refusal | The receipt is `Closed`. | None possible. |
| 40 | version conflict | The receipt changed after you ticked it. | Refresh the list and try again. |

In the message `cannot cancel receipt {id}` the id is the internal id.
Source: `crates/libs/wms-inbound/src/service/receipt/lifecycle/cancel_receipt.rs:161-200`.

> Not confirmed by code: the exact wording of `{error}` as the window shows it. To verify: receive one unit on a receipt, set it to `Cancelled` through the API or try `Cancel Receipt` after an `Adjust Qty` on a test receipt, and read the message.

## Related pages

- [Closing a receipt](42-closing-a-receipt.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- [Return codes](92-return-codes.md)
- API: `receipt_cancel`. It is a stateful command.
- RF terminal: none.
