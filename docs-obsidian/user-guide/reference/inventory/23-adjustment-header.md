# Adjustment header

The header is the top part of the adjustment document. It holds the reason, the comment and the status, and it has the buttons that move the document forward: `Validate`, `Approve`, `Post`, `Reverse`.
The document is the shell `inventory_adjustment_shell_form`: the header form `inventory_adjustment_normal_form` (30 percent of the height) and the [lines list](24-adjustment-lines-list.md) (70 percent). The data object is `inventory_adjustment_doc`. The header is loaded by `inventory_adjustment_card_get`.

You get here by pressing `New` or by clicking a row of the [Adjustments list](22-adjustments-list.md).

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Number` | `adjustment_number` | Text, up to 20 characters. Unique. | Yes (set for you) | A new document gets `ADJ` and 7 digits from the counter. Always read only. | The key of the document. |
| `Status` | `status` | Text | Yes | `Draft` (new), `Validated`, `Approved`, `Posted`. Always read only. | Where the document is in its life. |
| `Reason` | `reason_code` | Drop-down | Yes | A value of the code list `inv_adjust_reason` (code list id 1031). A retired value is refused at `Save`. The value `REVERSAL` is refused for a hand-made document. | Says why the stock changes, and what the document may do. See [Adjustment reasons](31-adjustment-reasons.md). |
| `Version` | `version` | Whole number | Yes | Starts at 1. Read only. | The version counter. |
| `Comment` | `comment` | Text, up to 500 characters | Sometimes | Any text. Required when the reason of the header asks for a comment. | A free note. |
| `Source` | `source_type` | Text | Yes | `Manual` for a document made here. Read only. | Where the document came from. |
| `Needs Approval` | `needs_approval` | Check box, read only | | Set by the system. | On when any reason used by the document (the header's or a line's) asks for approval. |
| `Validated At` | `validated_at` | Date and time, read only | | Empty until validated. | When it was validated. |
| `Approved At` | `approved_at` | Date and time, read only | | Empty until approved. | When it was approved. |
| `Posted At` | `posted_at` | Date and time, read only | | Empty until posted. | When it was posted. |
| `Reversal Of` | `reversal_of_number` | Text, read only | | Empty unless this document is a reversal. | The number of the document this one reverses. |
| `Reversed By` | `reversed_by_number` | Text, read only | | Empty unless this document was reversed. | The number of the document that reverses this one. |

`Reason` and `Comment` can be edited only while the status is `Draft`, `Validated` or `Approved` (`generic_field_gate`). `Number`, `Status`, `Version` and the others never.

Sources: the form in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/088_inventory_adjustment_screens.sql` and `089_inventory_adjustment_ordinary_forms.sql`; the document service in `crates/libs/wms-inventory/src/service/inventory_adjustment/`.

## Toolbar buttons

| Button | Enabled when | What it does | Task page |
|---|---|---|---|
| `Save` | Status is `Draft`, `Validated` or `Approved` | Creates the document (first time) or saves `Reason` and `Comment`. Saving the same effective values leaves the current status and validation evidence unchanged. | [Creating an adjustment](43-creating-an-adjustment.md) |
| `Validate` | Status is `Draft`, `Validated` or `Approved` | Judges every line without changing stock. | [Validating an adjustment](46-validating-an-adjustment.md) |
| `Approve` | Status is `Validated` | Approves the document. | [Approving an adjustment](47-approving-an-adjustment.md) |
| `Post` | The document is postable: `Validated` and no reason needs approval, or `Approved` | Sets the stock of every line to its target. | [Posting an adjustment](48-posting-an-adjustment.md) |
| `Reverse` | The document is posted and has not been reversed | Makes a new draft that sets the stock back. | [Reversing an adjustment](49-reversing-an-adjustment.md) |
| `Delete` | Status is `Draft`, `Validated` or `Approved`, and the document is saved | Deletes the document and its lines. | [Deleting an adjustment](50-deleting-an-adjustment.md) |

The grey texts are: `Validate`: `A posted adjustment cannot be validated again`. `Approve`: `Only a validated adjustment is approved`. `Post`: `Validate the adjustment, and approve it when its reason asks`. `Reverse`: `Only a posted adjustment is reversed, and only once`. `Delete`: `A posted adjustment is not deleted: reverse it` (a new, unsaved document: `Save the adjustment first`). `Save`: `A posted adjustment cannot be changed`.

## Rules of the header

- Saving a new document needs a usable `Reason`: it must be on the list and active. Messages: `reason {reason} is not on the adjustment reason list`, `reason {reason} is retired`.
- When the header's reason asks for a comment, `Comment` must not be empty at `Save`: `reason {reason} requires a comment`. This is checked at `Save`, not only at `Validate`.
- A hand-made document cannot use the reason `REVERSAL`: `a reversal is made from the posted adjustment it reverses, not by hand`. A reversal keeps its reason and no other document takes it: `a reversal keeps its reason, and no other adjustment takes it`.
- The number may be at most 20 characters: `an adjustment number is at most 20 characters`.
- **Changing `Reason` or `Comment` on a document that is `Validated` or `Approved` puts it back to `Draft`** and clears the verdicts of all lines. Saving the same effective values is a no-op: status, version, validation, approval and line verdicts stay as they were. (`crates/libs/wms-inventory/src/service/inventory_adjustment/update_header.rs`; adding, changing or removing a line is always a content change.)
- `Approve`, `Post` and `Delete` send the version of the header. A stale version is refused with return code 40.

## Messages after a button

| Button | Success | Failure |
|---|---|---|
| `Validate` | `{summary}`: `Adjustment {number} is Validated`, or `Adjustment {number} is not validated: line {n} — {reason}; ...` (the first 3 refused lines, then `and {n} more`) | `The adjustment was not validated: {error}` |
| `Approve` | `Adjustment {number} approved` | `The adjustment was not approved: {error}` |
| `Post` | `Adjustment {number} posted` | `The adjustment was not posted: {error}` |
| `Reverse` | `Reversal {number} made: open it, say why on its header, validate and post it` | `The adjustment was not reversed: {error}` |
| `Delete` | `Adjustment {number} deleted` | `The adjustment was not deleted: {error}` |

If the id or the version is not known: `Reopen the adjustment: its id is unknown`, `Reopen the adjustment: its version is unknown`.

## What it affects

- `Post` changes stock and writes the ledger. See [Posting an adjustment](48-posting-an-adjustment.md).
- `Post` sends the event `process.inventory.adjusted` (one per document). For each location whose reason asks for a count it also sends `process.inventory.count_requested`. See [Posting an adjustment](48-posting-an-adjustment.md).

## Who can use it

`ADMIN`, `MANAGER` and `SUPERVISOR` for everything except `Approve`; `Approve` is `ADMIN` and `MANAGER` only. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adjustments list](22-adjustments-list.md)
- [Adjustment lines](24-adjustment-lines-list.md)
- [Adjustment statuses and transitions](90-statuses-and-transitions.md)
- [Return codes](92-return-codes.md)
- API: `inventory_adjustment_card_get`, `create_inventory_adjustment`, `update_inventory_adjustment` (stateful, version of `inventory_adjustment`), `inventory_adjustment_validate` (stateless), `inventory_adjustment_approve` (stateful), `inventory_adjustment_post` (stateful), `inventory_adjustment_reverse` (stateless), `inventory_adjustment_delete` (stateful)
- RF terminal: none.
