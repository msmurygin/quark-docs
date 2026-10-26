# Line physical and PO tab

The tab `Physical & PO` is the third tab of the [line card](21-line-detail-tab.md).
The form is `receipt_detail_physical_form`. The data table is `receipt_detail`.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Temperature` | `temperature` | Number | No | Empty by default. | Stored only. It has no effect today. |
| `PO` | `po_id` | Whole number | No | Empty by default. | Stored only. It has no effect today. |
| `PO Detail` | `po_detail_id` | Whole number | No | Empty by default. | Stored only. It has no effect today. |
| `QC Required` | `qc_required` | Check box | No | Empty (not set). | Stored only. It has no effect today. |
| `QC Status` | `qc_status` | Text, up to 10 characters | No | Empty. | Stored only. It has no effect today. |

How "stored only" was checked: each column was searched in all Rust code, SQL migrations and RF screens. Only the line plan patch (`crates/libs/wms-inbound/src/service/receipt/planning/contracts.rs:261-281`), the web update call and the screen rules below name them.

Do not confuse these fields with similar rules that work elsewhere:

- The temperature check at receiving uses the temperature you scan and the limits of the SKU (`min_temperature`, `max_temperature`), not the field on this tab (`crates/libs/wms-inbound/src/service/receipt/validation/rules/temperature.rs`).
- The QC rule at receiving uses the settings of the SKU. The code comment says the `qc_required` of the SKU is not wired yet (`validation_internal_helpers.rs:108-110`).
- The quantity check against a purchase order is part of the receipt policy tab `Qty validation against PO (RF)`.

## Screen rules

These rules only change what you can type (`crates/services/web-ui-server/src/extensions/customization/receipt/detail_render_action.rs`).

| Rule | Effect |
|---|---|
| `Qty Received` is more than 0 | `PO` and `PO Detail` are read only. |
| The receipt is `Closed` or `Cancelled` (status of the line) | `Temperature`, `QC Required`, `QC Status` are read only. |
| The SKU does not need temperature capture | `Temperature` is grey, with the hint `Not applicable for this SKU`. |
| `QC Required` is not ticked | `QC Status` is grey, with the hint `Enable QC Required first`. |
| `PO` is empty | `PO Detail` is grey, with the hint `Select a PO first`. |

> Not confirmed by code: that the rules about the status of the line work on this tab, because the field `status` is on the Detail tab. To verify: open a line of a closed receipt, open this tab and try to type in `QC Status`.

## Messages

| When | Message |
|---|---|
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state` |

## Related pages

- [Line detail tab](21-line-detail-tab.md)
- [Administrator guide: Receipt policy](../../admin/policies/40-receipt-policy-settings.md)
- API: `update_receipt_detail`
