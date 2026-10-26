# Damage Records tab

The `Damage Records` tab lists damage that was reported on the lines of receipts.
The form is `receipt_damage_list_form` ("Damage Records"). The data table is `receipt_detail_damage`.
It is a read only list. You create rows with the button `Report Damage` on the line card. See [Reporting damage](39-reporting-damage.md).

## Columns

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | The id of the damage record. |
| `Line` | `receipt_detail_id` | Whole number | The **id** of the receipt line, not the line number. |
| `Qty` | `damaged_qty` | Number | The damaged quantity. |
| `Severity` | `severity` | Badge | `Cosmetic`, `Minor`, `Major` or `Total`. |
| `Reason` | `reason_code` | Text | The code of the reason, for example `Crushed`. |
| `Description` | `reason_description` | Text | The text you wrote. |
| `Reported At` | `reported_at` | Date and time | |
| `Reported By` | `reported_by` | Whole number | The id of the user. It is not translated to a name. |

The other columns of the table are not shown: the photos (`photo_attachment_ids`), the disposition and its data, `move_failed`, `version`, `vendor_responsibility` and `applied_action`.

## Which rows are shown

The metadata names no link between this list and the receipt. The list form has no parent filter and no relationship (the bio `receipt_detail_damage` has no row in `bio_relationships`).
The code that builds a child list reads an empty parent filter as "all rows" (`crates/services/web-ui-server/src/extensions/bio/form_context.rs:1070-1079`).
The tab may therefore show the damage of **every** receipt of the warehouse, not only the open one.

> Not confirmed by code: that the tab shows damage of other receipts. To verify: report damage on a line of receipt A, open receipt B, open its `Damage Records` tab. If the row of receipt A is listed, the tab is not filtered.

## What the damage records affect

- Every record made by `Report Damage` starts with **no disposition** (the command does not write one: `crates/libs/wms-inbound/src/service/receipt/damage/report_damage.rs`, the call to `ReceiptDetailDamageBmc::create`).
  A record with no disposition blocks `Close Receipt` with code 77: `Receipt {number} has {n} damage record(s) awaiting final disposition` (`crates/libs/wms-inbound/src/service/receipt/lifecycle/close_receipt.rs:174-181`). This holds for every severity, also `Cosmetic`.
- The dispositions are set only through the API: `receipt_set_damage_disposition` (`Repurpose`, `Destroyed`), `receipt_write_off_damage` and `receipt_move_damage_to_rtv`. The web screens have no button for them. By default only `ADMIN` and `MANAGER` may call them.
  See [Closing a receipt](42-closing-a-receipt.md).
- The count of records with no disposition is read by `crates/libs/wms-inbound/src/queries/receipt/blockers.rs:30-47`.

## Messages

None on this tab.

## Related pages

- [Reporting damage](39-reporting-damage.md)
- [Closing a receipt](42-closing-a-receipt.md)
- [Return codes](92-return-codes.md)
- API: `list_receipt_detail_damage`, `receipt_set_damage_disposition`
