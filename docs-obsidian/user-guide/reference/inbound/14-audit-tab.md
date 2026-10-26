# Audit tab

The `Audit` tab lists every change of a field of the receipt header.
The form is `receipt_audit_list` ("Audit"). The data table is `receipt_audit`.
It is a read only list. The check boxes are off and no toolbar is shown.

## Columns

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. |
| `Field` | `field_name` | Text | The name of the changed column, for example `status` or `door`. |
| `Old Value` | `old_value` | Text | The value before. Empty when the field was empty. |
| `New Value` | `new_value` | Text | The value after. |
| `Changed By` | `changed_by` | Whole number | Shown as the user name. |
| `Changed At` | `changed_at` | Date and time | Can be filtered by date. |

The list shows only the rows of the receipt that is open (relationship `receipt_to_receipt_audit`, field `receipt_id`).

## What is recorded

- Every create or update of the receipt row writes one audit row for each field that changed. This includes the status, the completion, the version, the summaries and the dates.
  Source: `crates/libs/wms-lib-core/src/model/base/audit.rs:109-165` and `crates/libs/wms-lib-core/src/model/receipt/receipt.rs:604-611`.
- Cancelling a planned box adds a row with the field name `case_cancelled`. The new value holds the box label and your reason (`crates/libs/wms-inbound/src/service/receipt/case_level/commands/cancel_planned_case.rs`).
- Changes to **lines** are not recorded here.

## What switches it on

The system setting `ENABLE_RECEIPT_AUDIT` must be on. The seed value is `1`, which is on (`crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql`, table `system_settings`).
When the setting is off or the row is missing, no row is written.
Old rows are removed by a clean-up task (`crates/services/app-server/src/services/cleanup_tasks.rs`).

The audit never stops a business action. A failed audit write is only logged (`audit.rs`, module comment).

## Messages

None.

Audit rows are kept for 365 days. The clean-up task runs once every 24 hours and removes the rows whose `changed_at` is older than that. The 365 days is a constant of the program (`RECEIPT_AUDIT_RETENTION_DAYS`, `RECEIPT_AUDIT_INTERVAL`, `crates/services/app-server/src/services/cleanup_tasks.rs:120-121`); no system setting changes it.

## Related pages

- [Summary tab](13-summary-tab.md)
- [Expected Boxes tab](16-expected-boxes-tab.md)
- API: `list_receipt_audit`, `get_receipt_audit`
