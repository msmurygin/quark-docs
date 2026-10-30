# Summary tab

The `Summary` tab shows the result values of the receipt.
The form is `receipt_summary_form` ("Receipt Summary"). The data table is `receipt`.
Every field is read only. The system writes all of them. `Close Summary` and `Cancel Summary` are JSON in the database. The screen and the Receipts list show them as compact JSON text. Before the fix F-05 (commit `49bbbf5f1`) the Receipts list answered HTTP 503 as soon as one receipt was closed or cancelled.

## Fields

| Label | Column | Type | Required | Default | What it shows |
|---|---|---|---|---|---|
| `Completion` | `completion` | Drop-down (read only) | No | `Pending` | How much of the plan has arrived: `Nothing received`, `Partially received`, `Fully received`, `Over receipt`. See [Completion values](90-receipt-statuses-and-transitions.md#completion-values). |
| `Version` | `version` | Whole number (read only) | No | `1` | The change counter of the header. It goes up with every status change and every receive. |
| `Close Summary` | `close_summary` | Text area (read only), stored as JSON | No | Empty | A snapshot made when the receipt is closed. |
| `Cancel Summary` | `cancel_summary` | Text area (read only), stored as JSON | No | Empty | A snapshot made when the receipt is cancelled. |

## What the fields affect

### Version

- `Cancel Receipt` and `Close Receipt` send the version that was in the list row when you selected the receipt.
  When another user changed the receipt in the meantime, the command is refused with the message `receipt was modified concurrently, please retry` (code 40). See [Messages catalogue](93-messages-catalogue.md).
- Saving the header does **not** check the version.

### Close Summary

The summary is written by `Close Receipt`. It holds:

| Key | Meaning |
|---|---|
| `closed_at` | The moment of closing, as a Unix time in seconds. |
| `receipt_number` | The number of the receipt. |
| `owner_id` | The id of the owner. |
| `completion` | The completion at closing. |
| `lines` | One entry per line: `id`, `line_number`, `sku`, `qty_expected`, `qty_received`, `qty_rejected`, `qty_damaged`, `completion`, `status`. For SKUs with serial tracking it also holds `serial_captured` and `serial_expected`. |
| `discrepancy_override` | Only when a supervisor allowed a closing with a discrepancy: `return_code` (71), `authorized_by` (user id), `override_grant_id`. |

### Cancel Summary

The summary is written by `Cancel Receipt`. It holds `cancelled_at` (Unix time), `cancel_reason`, `user_id` and `details_count`.

## Messages

None. The tab cannot be edited.

## Related pages

- [Closing a receipt](42-closing-a-receipt.md)
- [Cancelling a receipt](43-cancelling-a-receipt.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- API: `get_receipt`, `get_receipt_summary`
