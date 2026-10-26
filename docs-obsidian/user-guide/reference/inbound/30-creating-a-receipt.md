# Creating a receipt

Use this page to make a new receiving document in the web UI.
You make the header first. You add the lines after the first save.

## Before you start

- You need the right to create receipts. By default `ADMIN`, `MANAGER` and `OPERATOR` have it. See [Who can do what](91-who-can-do-what.md).
- The owner exists and is of type **Own**. See [Administrator guide: Owners](../../admin/04-owners-sku-uom-pack-hierarchy.md).
- If you will fill `Carrier` or `Supplier`, those owners exist with the types **Carrier** and **Supplier**.

## Steps

1. Open `Inbound > Receipts`.
2. Click `New`.
   The receipt screen opens with a new receipt. `Receipt Number` is already filled (10 digits, for example `0000000021`), `Status` is `Open`, `Receipt Type` is `Normal`.
   `Owner` is filled when the warehouse has a default owner.
3. If `Owner` is empty, click the owner field and pick an owner.
4. Fill the other fields you know on the tabs [Header](10-header-tab.md), [Dates](11-dates-tab.md) and [Shipping](12-shipping-tab.md).
5. Click `Save`.

The lines list becomes active after the first save. Continue with [Adding a line](33-adding-a-line.md).

## What changes

| What | Change |
|---|---|
| Table `receipt` | One new row. `status` is `Open`, `completion` is `Pending`, `version` is `1`. |
| Table `receipt_audit` | One row for each field that has a value (see [Audit tab](14-audit-tab.md)). |
| Counter `receipt_number` | The next number is taken when you press `New`. A number is not given back if you leave without saving. |
| Inventory | Nothing changes. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Receipt number is required` | `Receipt Number` is empty. | Type a number up to 10 characters. |
| `Owner id is required` | `Owner` is empty. | Pick an owner. |
| `Duplicate entry on receipt (constraint ...)` | A receipt with this number exists. | Use another number. |
| `owners {id} not found` | The owner is not of type Own, or the carrier is not a Carrier, or the supplier is not a Supplier. | Pick an owner of the right type. |

A key from the counter service is used for the number. If the number service does not answer, the new receipt does not open.

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Header tab](10-header-tab.md)
- [Adding a line](33-adding-a-line.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `create_receipt`. The number comes from `get_next_key`.
- RF terminal: none. The RF terminal receives against an existing receipt (`RCASN01`).
