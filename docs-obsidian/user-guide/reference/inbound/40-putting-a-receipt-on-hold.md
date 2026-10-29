# Putting a receipt on hold

Use this page to stop work on a receipt, for example while the goods wait for inspection.
You can hold several receipts at once.

## Before you start

- Each receipt is `Open` or `InProgress`. A receipt that is already on hold, closed or cancelled is refused.
- You have the web action `receipt_put_on_hold` and the API right `receipt_put_on_hold`. By default only `ADMIN` and `MANAGER` have them. See [Who can do what](91-who-can-do-what.md).
- The hold reason exists in the list `Warehouse Configuration > Reason Codes > Hold Codes`. The window offers only codes that are **active** and **enforce**. See [Administrator guide: Reason codes and holds](../../admin/policies/43-reason-codes-and-holds.md).

## Steps

1. Open `Management & Control > Receiving > Receipts`.
2. Tick one or more receipts.
3. Click `Put on Hold`. The window `Put Receipt on Hold` opens. It says `Holding a receipt also holds every line on it that is not already closed or cancelled.`
4. In `Hold reason` pick a reason. Each choice reads `{code} — {description}`.
5. Optional: type a `Comments` text. The hint says `Optional. Travels with the hold event.`
6. Click `Put on Hold`. Click `Cancel` to close the window without holding.

The seeded reasons that are active and enforce are: `PIHold`, `QcRequired`, `NewItem`, `QcQuarantine`, `Customs`, `CustomerReturn`, `Expired`, `Damaged`, `Rtv`, `Destroy`, `Lost`, `Other`, `LocBlocked` (`crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql`, table `inventory_hold_code`). The list follows the order of the field `Rank`.

## What the screen says

| Result | Message |
|---|---|
| One receipt held | `Receipt put on hold` |
| Several receipts held | `{n} receipts put on hold` |
| Some refused | `{held} put on hold, {failed} could not be — {first refusal}` |
| Nothing held | The window stays open with your reason. The message is the first refusal. |
| No receipt ticked | `Select the receipts to put on hold first` |
| No reason chosen | `Choose a hold reason` |

After success the list is read again and the window closes.
Each receipt is held on its own. A refusal of one does not stop the others.

## What changes

| What | Change |
|---|---|
| Receipt | `status` becomes `OnHold`. The version goes up. |
| Lines | Every line that is not `Closed` or `Cancelled` gets the status `OnHold`. |
| Events | `process.receipt.on_hold` with the reason, the comment, the number of lines held, the user and the time. |
| Stock | **Nothing changes.** No inventory hold is made. The hold is a status of the document. |

While a receipt is on hold:

- You cannot receive, including case-level box scans, adjust quantities or report damage (the buttons `Receive`, `Adjust Qty` and the report are refused).
- You cannot add or remove lines, move expected boxes to another pallet, or cancel an expected box. You can still edit header and line data.
- You can release the hold, cancel the receipt or close it.

Source: `crates/libs/wms-inbound/src/service/receipt/lifecycle/put_on_hold.rs`, `crates/services/web-ui-server/src/extensions/customization/receipt/lifecycle_action.rs:174-262`.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Receipt {id} is OnHold — it cannot be put on hold.` | The receipt is already on hold. | None needed. |
| `Receipt {id} is Closed — it cannot be put on hold.` (also `Cancelled`) | The receipt is finished. | None possible. |
| `Receipt {id} changed since you selected it — it is now {status}. Refresh the list and try again.` | The receipt changed after you selected it. | Refresh the list. |
| `hold_reason_code '{code}' not found in inventory_hold_code` | The reason does not exist. | Pick a reason from the list. |
| `Receipt {id} could not be put on hold: {error}` | A network or server problem. | Try again. |

The number in these messages is the **internal id** of the receipt, not the receipt number. For example `Receipt 3 is OnHold` means the receipt with id 3 (`lifecycle_action.rs:200-243`).

## Related pages

- [Releasing a receipt from hold](41-releasing-a-receipt-from-hold.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- [Receipts list](00-receipts-overview.md)
- API: `receipt_put_on_hold`. It is a stateless command. It needs `meta.idempotency_key`.
- RF terminal: none.
