# Expected lot attributes tab

The tab `Expected Lot Attributes` is the last tab of the [line card](21-line-detail-tab.md).
It holds the lot attribute values that the supplier promised for the line, for example `COLOR = Red`.
The list form is `receipt_exp_lot_attr_list` ("Expected Lot Attributes"). The edit form is `receipt_exp_lot_attr_edit` ("Expected Lot Attribute"). The data table is `receipt_expected_lot_attributes`.

## The list

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. |
| `Attribute` | `lot_policy_attribute_id` | Whole number | Shown as the attribute code. |
| `Value` | `attribute_value` | Text | |

The list shows 20 rows per page. Rows can be ticked.

### List toolbar (`receipt_exp_lot_attr_list_toolbar`)

| Button | What it does |
|---|---|
| `New` | Opens the edit form for a new value. Grey with the text `Lot policy '{code}' defines no attributes` when the lot policy of the SKU has no attribute that is shown. |
| `Delete` | Deletes the ticked rows. |
| `Refresh` | Reads the list again. |

## The edit form

### Toolbar (`receipt_exp_lot_attr_edit_toolbar`)

| Button | What it does |
|---|---|
| `Back` | Returns to the list. |
| `Save` | Checks that both fields are filled, saves, and returns to the list. |
| `Delete` | Deletes the value and returns to the list. |

### Fields

| Label | Column | Type | Required | Allowed values | What it does |
|---|---|---|---|---|---|
| `Attribute` | `lot_policy_attribute_id` | Drop-down | Yes | The attributes of the lot policy of the SKU that are marked as shown. One value per attribute per line. | Names the attribute. |
| `Value` | `attribute_value` | Text | Yes | 1 to 20 characters. Not blank. | The promised value. |

## What it affects

- The values are the **expected** attributes of the line. The receive window shows them as the starting values of the lot fields (`crates/libs/wms-inbound/src/service/receipt/lot_attribute_prompt.rs`).
- The receive command decides which line receives a scan from the SKU, the lot attributes, the pallet and the supplier lot of the scan. The first step compares the scanned attributes with the expected attributes of lines whose check mode is `Strict` (`crates/libs/wms-inbound/src/service/receipt/cascade_lookup.rs`, decision record `docs-obsidian/decisions/047-receipt-detail-cascade-lookup.md`).
- The field `Lot Attr Check` of the line decides how a difference is judged. In the web screens that field is always `Disabled`, so the values are not checked there. See [Line detail tab](21-line-detail-tab.md).
  - `Advisory`: a difference is refused with code 36. A supervisor can allow it when the attribute is marked "override allowed".
  - `Strict`: a difference is refused with code 34 and nothing can allow it. The window shows the expected value and locks the field.

## Rules

- Values can be added, changed and deleted only while the receipt is `Open` or `InProgress` (`crates/libs/wms-inbound/src/service/receipt/planning/contracts.rs:327-342`).
- The attribute must belong to the lot policy of the SKU of the line and must be shown (`add_expected_lot_attribute.rs`).
- A line can have one value for each attribute (unique key `uq_receipt_expected_lot_attrs_detail_policy`).
- The line must be saved first.

## Messages

| When | Message |
|---|---|
| `Attribute` or `Value` is empty on `Save` | `Lot policy attribute id is required`, `Attribute value is required` |
| The value is blank | `expected lot attribute value must not be empty` |
| The value is longer than 20 characters | `expected lot attribute value must not exceed 20 characters` |
| The attribute is not in the lot policy of the SKU | `lot policy attribute {a} is not available for receipt_detail {d}` |
| The attribute already has a value on the line | `Duplicate entry on receipt_expected_lot_attributes (constraint ...)` |
| The receipt is `OnHold`, `Closed` or `Cancelled` | `receipt {id} is {status} — cannot add expected lot attribute in its current lifecycle state` |
| `New` on a line that is not saved | `Parent receipt_detail has no PK — save the detail first` |

Sources: `crates/libs/wms-inbound/src/service/receipt/planning/add_expected_lot_attribute.rs`, `crates/services/web-ui-server/src/extensions/customization/receipt/lot_attr_new_action.rs`, the bindings of the button `rela_save` (`001_baseline.sql`, `wms-meta-ui`).

> Not confirmed by code: the exact text for the duplicate key. To verify: add the same attribute twice to one line.

## Who can use it

The API methods are open to `ADMIN`, `MANAGER` and `OPERATOR`. The button `New` runs the web action `receipt_exp_lot_attr_new`, which is not in the default list for `OPERATOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adding expected lot attributes](35-adding-expected-lot-attributes.md)
- [Line detail tab](21-line-detail-tab.md)
- [Administrator guide: Lot policy](../../admin/policies/32-lot-policy-and-attributes.md)
- API: `create_receipt_detail_lot_attributes`, `list_receipt_detail_lot_attributes`, `update_receipt_detail_lot_attributes`, `delete_receipt_detail_lot_attributes`
