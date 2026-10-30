# Receipt statuses and transitions

This page lists the statuses of a receipt, what moves it from one to the next, and the values of `Completion`.

## Statuses

| Status | Label in the list | Meaning |
|---|---|---|
| `Open` | `Open` | The receipt exists. Nothing is received yet. |
| `InProgress` | `In progress` | At least one receive was made. |
| `OnHold` | `On hold` | Work is stopped. |
| `Closed` | `Closed` | Receiving is finished. Final. |
| `Cancelled` | `Cancelled` | The receipt was dropped. Final. |

Lines use the same five statuses (the `Status` field of the [line card](21-line-detail-tab.md)).

## Transitions

| From | Action | To | Page |
|---|---|---|---|
| `Open` | First receive | `InProgress` | [Receiving a line](36-receiving-a-line.md) |
| `Open`, `InProgress` | `Put on Hold` | `OnHold` | [Putting a receipt on hold](40-putting-a-receipt-on-hold.md) |
| `OnHold` | `Release Hold` | `Open` if `Completion` is `Pending`, else `InProgress` | [Releasing a receipt from hold](41-releasing-a-receipt-from-hold.md) |
| `Open`, `InProgress`, `OnHold` | `Close Receipt` | `Closed` | [Closing a receipt](42-closing-a-receipt.md) |
| `Open`, `InProgress`, `OnHold` | `Cancel Receipt` | `Cancelled` | [Cancelling a receipt](43-cancelling-a-receipt.md) |
| `Closed`, `Cancelled` | Nothing | Nothing | |

Closing a closed receipt, cancelling a cancelled receipt and holding a held one are handled as follows: close and cancel repeat with no change and no error; hold is refused.

## What each status allows

| Operation | `Open` | `InProgress` | `OnHold` | `Closed` | `Cancelled` |
|---|---|---|---|---|---|
| Receive, blind receive, return | Yes | Yes | No | No | No |
| Adjust received quantity | Yes | Yes | No | No | No |
| Report damage | Yes | Yes | No | No | No |
| Put on hold | Yes | Yes | No | No | No |
| Release from hold | No | No | Yes | No | No |
| Close | Yes | Yes | Yes | No change | No |
| Cancel | Yes | Yes | Yes | No | No change |
| Add or delete a line | Yes | Yes | No | No | No |
| Edit header and line data | Yes | Yes | Yes | No | No |

## Completion values

`Completion` says how much of the plan has arrived. The system calculates it. Nobody types it.

| Value in code | Label | Meaning |
|---|---|---|
| `Pending` | `Nothing received` | Nothing arrived. |
| `Partial` | `Partially received` | Some arrived, less than expected. |
| `Full` | `Fully received` | Arrived equals expected. |
| `Over` | `Over receipt` | More arrived than expected. |

How a line is classified: arrived quantity (received, rejected and damaged together) of 0 or less is `Pending`; equal to expected is `Full`; less is `Partial`; more is `Over`.
How the header is derived: all lines `Pending` gives `Pending`; else any `Over` gives `Over`; else all `Full` gives `Full`; else `Partial`. A receipt with no lines is `Pending`.

Completion changes what you can do:

- `Cancel Receipt` needs `Pending` on the receipt and on every line.
- `Close Receipt` needs a supervisor when there is a discrepancy. See [Closing a receipt](42-closing-a-receipt.md).

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Summary tab](13-summary-tab.md)
- [Who can do what](91-who-can-do-what.md)
- [Return codes](92-return-codes.md)
- API: `get_receipt`, `get_close_blockers`, `get_cancel_blockers`
