# Releasing a receipt from hold

Use this page to take receipts off hold so that work can go on.
There is no window. The button acts at once on every ticked receipt.

## Before you start

- Each ticked receipt is on hold. A receipt that is not on hold is refused (see below).
- You have the web action `receipt_release_hold` and the API right `receipt_release_from_hold`. By default only `ADMIN` and `MANAGER` have them. See [Who can do what](91-who-can-do-what.md).

## Steps

1. Open `Management & Control > Receiving > Receipts`.
2. Tick one or more receipts with the status `On hold`.
3. Click `Release Hold`.

## What the screen says

| Result | Message |
|---|---|
| One receipt released | `Released from hold` |
| Several released | `Released {n} receipts from hold` |
| Some refused | `{released} released, {failed} could not be — {first refusal}` |
| No receipt ticked | `Select the receipts to release first` |

The list is read again after every press, also when some receipts were refused.
Each receipt is released on its own.

## What changes

| What | Change |
|---|---|
| Receipt, nothing received yet (`completion` is `Pending`) | `status` becomes `Open`. |
| Receipt, something received | `status` becomes `InProgress`. |
| Lines | Lines with the status `OnHold` become `InProgress`. Other lines are not changed. |
| Events | `process.receipt.released` with the comment, the user and the time. |
| Version | The version of the receipt goes up. |

The line status `InProgress` is set even when the receipt returns to `Open`.
A released receipt with nothing received therefore has lines in status `In progress`.

Source: `crates/libs/wms-inbound/src/domain/receipt/aggregate.rs:281-299`, `crates/libs/wms-inbound/src/service/receipt/lifecycle/release_from_hold.rs:92-120`.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Receipt {id} is Open — it cannot be released.` | The receipt is not on hold. The command refuses it with code 70. | Tick only receipts that are on hold. |
| `Receipt {id} is InProgress — it cannot be released.` | Same. | Same. |
| `Receipt {id} is Closed — it cannot be released.` (also `Cancelled`) | The receipt is finished. | None possible. |

The button `Release Hold` is active for any ticked receipt. It does not check the status.
The code comments say that releasing a receipt that is not on hold does nothing. The code does not do that: the state machine refuses the call first (`crates/libs/wms-inbound/src/service/receipt/shared/receipt_locking.rs:95` and the `Open` row of `allowed_operations`, `state_machine.rs:71-94`).
The number in the message is the internal id, not the receipt number.

## Related pages

- [Putting a receipt on hold](40-putting-a-receipt-on-hold.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- API: `receipt_release_from_hold`. It is a stateless command. It needs `meta.idempotency_key`.
- RF terminal: none.
