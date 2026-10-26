# Pre-advised serials tab

The tab `Pre-Advised Serials` is the fifth tab of the [line card](21-line-detail-tab.md).
It lists the serial numbers that the supplier announced for the line in advance.
The form is `receipt_detail_advised_serials_form`. The data table is `receipt_detail_advised_serial`.

## Columns

The list is read only and has no toolbar.

| Label | Column | Type | Notes |
|---|---|---|---|
| `ID` | `id` | Whole number | |
| `Serial Number` | `serial_number` | Text, 1 to 80 characters | Unique within the line. |
| `Created At` | `add_when` | Date and time | |

## How rows get here

No screen, no API method and no import writes these rows today.
The only code that creates them is the data layer itself (`crates/libs/wms-lib-core/src/model/receipt/receipt_detail_advised_serial.rs`), which is used by tests.
On a normal installation the tab is empty.

## What it affects

The list is read when a serial number is captured on a line.
When **both** of these are true, a scanned serial must be on the list:

1. The SKU allows pre-advised serials (`allow_asn_pre_advised` in the serial settings of the SKU).
2. The line has at least one row in this list.

A serial that is not on the list is refused with code 95 (`SerialAsnNotAdvised`):
`Serial {serial} is not on the ASN pre-advised list for receipt line {id}. Scan only serials vendor pre-advised, or open a discrepancy report.`
The refusal cannot be overridden.
A line with an empty list accepts any serial.
Source: `crates/libs/wms-serial/src/service/serial/commands/capture_serial.rs:332-370`.

## Messages

| When | Message |
|---|---|
| A scanned serial is not on the list | `Serial {serial} is not on the ASN pre-advised list for receipt line {id}. Scan only serials vendor pre-advised, or open a discrepancy report.` |

## Related pages

- [Capturing serial numbers](37-capturing-serial-numbers.md)
- [Line serials tab](24-line-serials-tab.md)
- [Return codes](92-return-codes.md)
