# Receipt statuses and transitions

This page lists the statuses of a receipt, what moves it from one to the next, and the values of `Completion`.
The rules live in `crates/libs/wms-inbound/src/service/receipt/state_machine.rs`.

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

Closing a closed receipt, cancelling a cancelled receipt and holding a held one are handled as follows: close and cancel repeat with no change and no error; hold is refused (`aggregate.rs:144-145,206-207`).

Source of the table: `state_machine.rs:134-138` and `crates/libs/wms-inbound/src/domain/receipt/aggregate.rs:281-299`.
The state machine table says `InProgress` for a release. The aggregate decides, and sends an untouched receipt back to `Open`. The table in the code records this in its comment (`state_machine.rs:107-118`).

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

Source: `state_machine.rs:63-86` for the operations; `planning/contracts.rs:60,327-342` for the line and header edits.
Blind receive is allowed only in `Open` (`state_machine.rs`, list for `Open`). `Cancel` also needs every line `Pending`.

> Not confirmed by code: that the edit of header and line data is open in `OnHold`. The code refuses only `Closed` and `Cancelled` for header edits (page [Header tab](10-header-tab.md)). To verify: hold a receipt and change `Door`.

## Completion values

`Completion` says how much of the plan has arrived. The system calculates it. Nobody types it.

| Value in code | Label | Meaning |
|---|---|---|
| `Pending` | `Nothing received` | Nothing arrived. |
| `Partial` | `Partially received` | Some arrived, less than expected. |
| `Full` | `Fully received` | Arrived equals expected. |
| `Over` | `Over receipt` | More arrived than expected. |

How a line is classified (`crates/libs/wms-inbound/src/repo/completion_compute.rs:39-49`): arrived quantity (received, rejected and damaged together) of 0 or less is `Pending`; equal to expected is `Full`; less is `Partial`; more is `Over`.
How the header is derived (`completion_compute.rs:56-83`): all lines `Pending` gives `Pending`; else any `Over` gives `Over`; else all `Full` gives `Full`; else `Partial`. A receipt with no lines is `Pending`.

Completion changes what you can do:

- `Cancel Receipt` needs `Pending` on the receipt and on every line.
- `Close Receipt` needs a supervisor when there is a discrepancy. See [Closing a receipt](42-closing-a-receipt.md).

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Summary tab](13-summary-tab.md)
- [Who can do what](91-who-can-do-what.md)
- [Return codes](92-return-codes.md)
- API: `get_receipt`, `get_close_blockers`, `get_cancel_blockers`
