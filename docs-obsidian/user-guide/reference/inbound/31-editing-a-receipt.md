# Editing a receipt

Use this page to change the reference data of a saved receipt: carrier, supplier, PO, door, dates, shipping data.

## Before you start

- You can edit while the receipt is `Open`, `InProgress` or `OnHold`. A `Closed` or `Cancelled` receipt is read only.
- You need the right to update receipts (`update_receipt`). By default `ADMIN`, `MANAGER` and `OPERATOR` have it.

## Steps

1. On the list `Receipts`, click the receipt.
2. Change the fields on the tabs `Header`, `Dates` or `Shipping`.
3. Click `Save`.

## What you cannot change

| Field | Why |
|---|---|
| `Receipt Number`, `Owner` | They identify the receipt. Read only after the first save. |
| `Status`, `Completion` | The commands set them. |
| `Receipt Type` | Read only, except for `Sscc` and `CaseLevel` receipts in status `Open`. |
| `Effective Date`, `Close Date` | The server does not accept them on update. See [Dates tab](11-dates-tab.md). |

## What changes

- The table `receipt` is updated with the fields you changed. Fields you did not touch are not sent.
- `version` of the receipt is **not** changed by a header save, and the save does not check the version. Two people can overwrite each other's header changes.
- One audit row is written for each changed field.
- Lines, stock and status do not change.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `receipt {id} is {status} — cannot edit receipt reference in its current lifecycle state` | The receipt is `Closed` or `Cancelled`. | Nothing can be edited. |
| An "unknown field" refusal | You changed `Effective Date` or `Close Date`. | Undo the change in these two fields. |
| `owners {id} not found` | A carrier or supplier of the wrong type. | Pick the right owner. |

## Related pages

- [Header tab](10-header-tab.md)
- [Dates tab](11-dates-tab.md)
- [Shipping tab](12-shipping-tab.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- API: `update_receipt`
- RF terminal: none.
