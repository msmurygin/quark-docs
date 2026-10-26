# Adding expected lot attributes

Use this page to record the lot attribute values the supplier promised for a line, for example the colour.

## Before you start

- The line is saved. The receipt is `Open` or `InProgress`.
- The SKU of the line has a lot policy with at least one attribute that is shown. Otherwise `New` is grey with the text `Lot policy '{code}' defines no attributes`.
- You have the web action `receipt_exp_lot_attr_new` (by default `ADMIN` and `MANAGER`) and the API right `create_receipt_detail_lot_attributes` (`ADMIN`, `MANAGER`, `OPERATOR`).

## Steps

1. Open the receipt and click the line.
2. Open the tab `Expected Lot Attributes`.
3. Click `New`.
4. In `Attribute` pick the attribute.
5. In `Value` type the value (1 to 20 characters).
6. Click `Save`. The screen goes back to the list.

To change a value, click its row, change `Value` and press `Save`. To remove values, tick the rows and press `Delete`.

## What changes

- One row is added to `receipt_expected_lot_attributes` for the line.
- The receive window shows the value as the start value of the lot field.
- With the line check mode `Strict` or `Advisory` the value is compared with what is scanned. In the web screens the check mode of a line is always `Disabled`.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Lot policy attribute id is required` / `Attribute value is required` | A field is empty. | Fill both fields. |
| `expected lot attribute value must not exceed 20 characters` | The value is too long. | Shorten it. |
| `lot policy attribute {a} is not available for receipt_detail {d}` | The attribute is not shown in the lot policy of the SKU. | Pick another attribute, or change the lot policy. |
| `Parent receipt_detail has no PK — save the detail first` | The line is not saved. | Save the line, then add the value. |
| `receipt {id} is {status} — cannot add expected lot attribute in its current lifecycle state` | The receipt is `OnHold`, `Closed` or `Cancelled`. | Release the hold. |

## Related pages

- [Expected lot attributes tab](26-line-expected-lot-attributes-tab.md)
- [Receiving a line](36-receiving-a-line.md)
- [Administrator guide: Lot policy](../../admin/policies/32-lot-policy-and-attributes.md)
- API: `create_receipt_detail_lot_attributes`
- RF terminal: the lot fields of `RCASN01LINE` show the expected values.
