# Posting an adjustment

Use this page to make the stock equal to the targets of the document. `Post` is the only step that changes stock. It is **all or nothing**: if one line is refused, no line is posted.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The status is `Validated` (and no reason asks for approval) or `Approved`. The button `Post` is grey otherwise.
- You have read the lines. The version you post is the version you see.

## Steps

1. Open the adjustment.
2. Check the columns `Current`, `Target`, `Effect` and `Would Refuse`. A line with text in `Would Refuse` will be refused now.
3. Click `Post`.

## What the server does

`inventory_adjustment_post` works in one transaction, in this order:

1. Locks the header, then checks the version (return code 40 on a stale one), then locks the lines.
2. Checks the status: `Validated` without an approval need, or `Approved`.
3. For every line: finds the balance row of the identity, and sets its quantity to the target. Lines that create stock make a new balance row. A line already at its target is `NoChange` and writes nothing.
4. Checks the **direction** of every changed line against its reason, on the change really made.
5. If any line is refused, nothing is written and the answer names all refused lines.
6. Writes one ledger row of type `Adjust` for each changed line, with `qty_before` and `qty_after`, the adjustment number as `Source`, the reason as `reason_code`, and the approver as `authorized_by`.
7. Marks the lines `Posted` or `NoChange` and the document `Posted`.
8. Writes the events (below).

The balances are locked in one statement, ordered by id, so two documents do not wait on each other.

## What the screen says

| Result | Message |
|---|---|
| Posted | `Adjustment {number} posted` |
| Error | `The adjustment was not posted: {error}` |

The error text for the cases:

| Case | Message | Return code |
|---|---|---|
| Not validated | `the adjustment is not validated` | 70 |
| Needs approval | `the adjustment's reason requires approval before posting` | 70 |
| Posted already | `a posted adjustment cannot be changed` | 70 |
| Lines refused | `{n} adjustment line(s) cannot be posted`. The lines are in the answer with their codes. The codes are the ones in [Validating an adjustment](46-validating-an-adjustment.md). | 0 |
| Stock appeared while locking | `the stock changed while the adjustment was being posted; post it again` | 41 |
| Document changed since you opened it | `version conflict on inventory_adjustment {id}` | 40 |
| Same key, other request | An idempotency conflict | 42 |

## What changes

| What | Change |
|---|---|
| Balances | Each changed line sets the quantity of its balance row to the target. |
| Ledger | One row of type `Adjust` for each changed line, quantity = the signed change. See [Transactions](32-transactions.md). |
| Lines | `Posted` (with the ledger code) or `NoChange`. |
| Document | `Posted`, `posted_by`, `posted_at`. The version goes up. A posted document never changes again. |
| Events | `process.inventory.adjusted`, one for the document, with the changed lines and the approver. For each location named by a changed line whose reason says `Count After Posting` (not for a document made by a count): `process.inventory.count_requested` with source `Adjustment`. |

An adjustment never touches allocated or picked stock: a target below `qty_allocated + qty_picked` is refused (`BELOW_RESERVED_QTY`).

## Undoing a post

A posted document cannot be edited or deleted. Use [Reversing an adjustment](49-reversing-an-adjustment.md).

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Validating an adjustment](46-validating-an-adjustment.md)
- [Adjustment reasons](31-adjustment-reasons.md)
- [Return codes](92-return-codes.md)
- API: `inventory_adjustment_post` (stateful command; version of `inventory_adjustment`)
- RF terminal: none.
