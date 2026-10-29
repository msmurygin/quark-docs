# Closing a receipt

Use this page when receiving is finished. Closing seals the document. It cannot be undone.

## Before you start

- Select **one** receipt. The receipt is `Open`, `InProgress` or `OnHold`. The button `Close Receipt` is grey for other statuses.
- You have the web action `receipt_close` and the API right `receipt_close`. By default only `ADMIN` and `MANAGER` have them. See [Who can do what](91-who-can-do-what.md).
- Every serial-capture session on the receipt is finished or cancelled.
- Every damage record has a final disposition. See [Reporting damage](39-reporting-damage.md).
- If the receipt has a discrepancy, a supervisor must agree. See "Discrepancy" below.

## Steps

1. Open `Management & Control > Receiving > Receipts`.
2. Tick one receipt.
3. Click `Close Receipt`. The window `Close Receipt` opens. It says `Closing a receipt is final. Any shortage or excess is recorded in the close summary.`
4. Click `Close Receipt` in the window. Click `Not Now` to leave without closing.
5. If the window now says `A supervisor must authorise this. Ask one to enter their username and password.`, the fields `Supervisor username` and `Supervisor password` appear. A supervisor types them on your screen. Click `Close Receipt` again.

The window has no other fields. The screen sends the version of the receipt that you saw when you ticked it (`crates/services/web-ui-server/src/extensions/customization/receipt/lifecycle_action.rs:433-438`).

## Discrepancy

The receipt has a discrepancy when:

- the completion is `Partial`, or
- the completion is `Over` or `Pending` and the lines expected some quantity.

A receipt with no plan (blind receiving, returns) that is `Over`, and a receipt that is `Full`, close with no question.
Source: `crates/libs/wms-inbound/src/repo/completion_compute.rs:236-245`.

For a discrepancy two things must be true:

1. The system setting `ALLOW_CLOSE_WITH_DISCREPANCY` is on. It is on in a new database (value `1`, `wms-app` migration `001_baseline.sql`). When it is off the close is refused for everyone (code 71, not overridable).
2. Someone with the right agrees. Either the user who presses the button holds the right `receipt.override_close_discrepancy` (by default only `SUPERVISOR`), or a supervisor types a username and a password in the window. The supervisor's password is used once and is not stored.

Source: `crates/libs/wms-inbound/src/service/receipt/lifecycle/close_receipt.rs:195-262`.

## What the screen says

| Result | Message |
|---|---|
| Closed | `Receipt closed` |
| A supervisor is needed | The window shows the supervisor fields and the text of the refusal. |
| Refused | The message of the refusal, see below. |

After success the window closes and the list is read again.

## What changes

| What | Change |
|---|---|
| Receipt | `status` becomes `Closed`. `completion` is calculated again. `close_date` is set. `close_summary` is written. The version goes up. |
| Lines | Every line that is not `Cancelled` becomes `Closed`. |
| Events | `process.receipt.closed` and `process.receipt.ready_for_putaway`. |
| Stock | Nothing changes. Stock was made when you received. |

The summary also records who agreed to a discrepancy. See [Summary tab](13-summary-tab.md).
Closing a receipt that is already `Closed` does nothing and gives no error (`crates/libs/wms-inbound/src/domain/receipt/aggregate.rs:206-207`).

## What can go wrong

| Code | Message | Meaning | Fix |
|---|---|---|---|
| 71 | `Receipt {number} is Partial — supervisor override required to close` (also `Over`, `Pending`) | There is a discrepancy. | Ask a supervisor to enter their username and password. |
| 71 | `You don't have permission to close receipt {number} with a discrepancy. Ask a supervisor.` | You tried to agree to a discrepancy without the right. | Ask a supervisor. |
| 71 | `Cannot close receipt {number}: completion is {completion} and ALLOW_CLOSE_WITH_DISCREPANCY is off` | The setting forbids it. | Receive the missing goods, or ask an administrator to change the setting. |
| 73 | `Receipt {number} has {n} unresolved serial-capture episode(s): {list}. {hint}` | A serial capture is not finished. | Finish or cancel it. See [Capturing serial numbers](37-capturing-serial-numbers.md). |
| 77 | `Receipt {number} has {n} damage record(s) awaiting final disposition` | A damage record has no disposition. | Set the disposition on the [Damage Records tab](15-damage-records-tab.md). |
| 40 | A version conflict. | The receipt changed after you ticked it. | Refresh the list and try again. |
| 70 | `Receipt {number} is Cancelled — it cannot be closed.` | The receipt is finished. | None possible. |
| 70 | `Receipt {number} is {status} — it cannot be closed.` | The status does not allow it. | None possible. |

Code 73 and code 77 cannot be overridden, not even by a supervisor.
The messages with `{number}` use the receipt number in this window. The messages of [putting on hold](40-putting-a-receipt-on-hold.md) use the internal id.
Sources: `close_receipt.rs:131-176`, `crates/services/web-ui-server/src/extensions/customization/receipt/error_message.rs:105-135`.

> Not confirmed by code: the exact text the window shows for a version conflict (code 40). To verify: open the list in two browsers, change the receipt in one (put on hold), then press `Close Receipt` in the other.

## Related pages

- [Cancelling a receipt](43-cancelling-a-receipt.md)
- [Summary tab](13-summary-tab.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- [Return codes](92-return-codes.md)
- API: `receipt_close`. It is a stateful command. The version of the receipt goes in `data`.
- RF terminal: none.
