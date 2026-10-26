# Moving and cancelling expected boxes

Use this page on a case-level receipt, when a planned box is on a different pallet than the plan says, or will not arrive.
The two buttons are on the [Expected Boxes tab](16-expected-boxes-tab.md).

## Before you start

- The receipt has planned boxes. They are made by the API method `receipt_create_case_level_asn`. The web screens do not create them.
- You have the web action for the button and the API right. By default `Move Boxes` is for `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR`. `Cancel Box` is for `ADMIN`, `MANAGER` and `SUPERVISOR` (`crates/services/app-server/src/web/rpcs/case_level_commands_rpc.rs:20-25`).

## Moving boxes to another pallet

1. Open the receipt and the tab `Expected Boxes`.
2. Tick the **pallet** row. The button `Move Boxes` is grey otherwise ("Tick the pallet the boxes are on").
3. Click `Move Boxes`. The window `Move Boxes` opens.
4. In `To Pallet` type the code of the new pallet. Required. The hint says `A new code creates the pallet.`
5. Optional: in `Box` type one box label. The hint says `Leave empty to move every box on the ticked pallet.`
6. Click `Move`. Click `Back` to leave.

| Result | Message |
|---|---|
| Moved | `Moved {n} box(es) off {pallet}` |
| `To Pallet` is empty | `Enter the pallet the boxes go to` |
| No pallet ticked | `Tick exactly one pallet` |
| The list changed | `The box list has moved on — tick the pallet again and retry` |
| Refused | `Boxes on {pallet} were not moved: {error}` |

Reasons for a refusal (`crates/libs/wms-inbound/src/service/receipt/case_level/commands/replace_pallet.rs:106-231`):

| `{error}` | Fix |
|---|---|
| `old pallet '{code}' not found on receipt {id}` | Tick a pallet of this receipt. |
| `old_pallet_lpn and new_pallet_lpn are the same ('{code}') — nothing to do` | Type another pallet. |
| `new pallet lpn '{code}' already exists on receipt {id} — refusing to merge cross-receipt structural data; pick a different code or fix the source` | Use a code that is free or belongs to this receipt. |
| `ReplacePallet: requested {n} cases, only {m} matched on old pallet '{code}'. Likely cause: a label is misspelled, on a different pallet, or already moved.` | Check the label in `Box`. Nothing is moved when this happens. |

## Cancelling a planned box

1. Tick the **box** row (type `Case`). The button `Cancel Box` is grey otherwise ("Tick one box").
2. Click `Cancel Box`. The window `Cancel Planned Box` opens.
3. Type a `Reason`. Required. The hint says `Why the box will not arrive. Recorded in the receipt audit.`
4. Click `Cancel Box`. Click `Keep Box` to leave.

| Result | Message |
|---|---|
| Cancelled | `Box {code} cancelled` |
| `Reason` is empty | `Say why the box will not arrive` |
| No box ticked | `Tick exactly one box` |
| The list changed | `The box list has moved on — tick the box again and retry` |
| Refused | `Box {code} was not cancelled: {error}` |

Reasons for a refusal (`cancel_planned_case.rs:77-140`):

| `{error}` | Fix |
|---|---|
| `case '{label}' not found on receipt {id}` | Tick a box of this receipt. |
| `case '{label}' is {status} — only Planned cases can be cancelled` | The box was received or is already cancelled. |
| `receipt_detail_case {id} flipped by a concurrent operation; retry` | Someone received it at the same moment. Refresh and look again. |

## What changes

| What | Change |
|---|---|
| Move | The parent of each box is the new pallet. A new code creates a planned pallet. A receipt event is written. |
| Cancel | The plan row of the box is marked cancelled. The box row keeps its status `Planned`. A row is added to the [Audit tab](14-audit-tab.md) (`field_name` `case_cancelled`) with your reason. |

The window text and the buttons are in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/084_web_receipt_adjust_and_box_exceptions.sql`.

Both actions are refused while the receipt is `OnHold`, `Closed` or `Cancelled`. Release the hold before changing the expected-box plan.

## Related pages

- [Expected Boxes tab](16-expected-boxes-tab.md)
- [Audit tab](14-audit-tab.md)
- API: `receipt_replace_pallet`, `receipt_cancel_planned_case`. Both are stateless commands.
- RF terminal: `RCCASE_REPAL` (move) and `RCCASE_CANCEL` (cancel a case).
