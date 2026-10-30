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

Do not confuse these fields with similar rules that work elsewhere:

- The temperature check at receiving uses the temperature you scan and the limits of the SKU (`min_temperature`, `max_temperature`), not the field on this tab.
- The QC rule at receiving uses the settings of the SKU. The code comment says the `qc_required` of the SKU is not wired yet.
- The quantity check against a purchase order is part of the receipt policy tab `Qty validation against PO (RF)`.

## Screen rules

These rules only change what you can type.

| Rule | Effect |
|---|---|
| `Qty Received` is more than 0 | `PO` and `PO Detail` are read only. |
| The receipt is `Closed` or `Cancelled` (status of the line) | `Temperature`, `QC Required`, `QC Status` are read only. |
| The SKU does not need temperature capture | `Temperature` is grey, with the hint `Not applicable for this SKU`. |
| `QC Required` is not ticked | `QC Status` is grey, with the hint `Enable QC Required first`. |
| `PO` is empty | `PO Detail` is grey, with the hint `Select a PO first`. |

## Messages

| When | Message |
|---|---|
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state` |

## Related pages

- [Line detail tab](21-line-detail-tab.md)
- [Administrator guide: Receipt policy](../../admin/policies/40-receipt-policy-settings.md)
- API: `update_receipt_detail`
