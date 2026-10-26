# Approving an adjustment

Use this page when a validated adjustment must be approved before it can be posted.

## When approval is needed

The document is `Needs Approval` when any reason that it uses asks for approval: the header's reason, or the reason of any line. The default reasons that ask for it are `ERP_RECONCILIATION`, `DATA_FIX` and `OTHER`. See [Adjustment reasons](31-adjustment-reasons.md).
`Post` is refused for such a document until it is `Approved`: `the adjustment's reason requires approval before posting`.

## Before you start

- You are `ADMIN` or `MANAGER`. `inventory_adjustment_approve` is open only to them. `SUPERVISOR` can draft, validate and post, but cannot approve.
- The status is `Validated`.
- Read the lines first. The version you approve is the version you see: if anyone changed the document after you opened it, the approval is refused.

## Steps

1. Open the adjustment.
2. Check the lines: `Current`, `Target`, `Effect`.
3. Click `Approve`.

## What the screen says

| Result | Message |
|---|---|
| Approved | `Adjustment {number} approved` |
| Not validated | `The adjustment was not approved: the adjustment is not validated` |
| Already approved | `The adjustment was not approved: the adjustment is not validated` |
| Posted | `The adjustment was not approved: a posted adjustment cannot be changed` |
| Document changed meanwhile | `The adjustment was not approved: version conflict on inventory_adjustment {id}` (return code 40) |

## What changes

| What | Change |
|---|---|
| Document | Status `Approved`. `approved_by` and `approved_at` are set. The version goes up. |
| Stock | Nothing. |

Any later change of the document (a line, the reason, the comment) or a new `Validate` clears the approval and puts the document back to `Draft` or `Validated`.

The code does not compare the approver with the person who made the document. The button is enabled for every `Validated` document, also when no reason asks for approval.

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- [Who can do what](91-who-can-do-what.md)
- API: `inventory_adjustment_approve` (stateful command; version of `inventory_adjustment`)
- RF terminal: none.
