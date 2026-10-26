# Capturing serial numbers

Use this page when a SKU needs one serial number for each unit received.
A capture is opened by the receive. The receipt cannot be closed until every serial is scanned.

## Before you start

- The SKU has serial tracking (`Serial Tracking` tab of the SKU). See [Administrator guide: Serial configuration](../../admin/policies/33-serial-configuration.md).
- You received a quantity of the line (see [Receiving a line](36-receiving-a-line.md)).
- You can run `capture_serial`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` can. The web actions `receipt_capture_serial` and `receipt_resume_serials` are allowed for `OPERATOR` and `SUPERVISOR` by default.

## Steps: scan in the receive window

1. Receive the quantity. The panel `Serial numbers` opens in the same window.
2. Scan or type one serial number. The panel shows `{n} of {m} collected`.
3. Repeat for each unit. A serial you scanned twice shows `Serial {serial} was already scanned`. The count does not move.
4. When all are scanned the window shows `All serial numbers collected.`

## Steps: resume a capture later

Use this when you closed the window before all serials were scanned.

1. Open the receipt and tick the line. The button `Resume scan` is active only for a line with an unfinished scan.
2. Click `Resume scan`. The page `Serials` opens.
3. In `Serial number` scan or type a serial. Press `Add`, or press Enter (a scanner sends Enter).
4. Repeat. The field `Captured` shows the progress, for example `3 of 10`.
5. When the last serial is accepted the page shows `All {n} serials captured` and returns to the lines list.
6. To stop, click `Back`. The capture stays open.

The page remembers the line and the location of the capture. The location is the one you received into.

## What changes

- Each accepted serial is a row in stock (`inventory_balances_serial`), linked to the line (`received_via`), the location and the lot. It appears on the tab [Serials](24-line-serials-tab.md).
- When all serials are in, the capture episode becomes `Committed` and the line can be completed.
- While an episode is open or abandoned, `Close Receipt` is refused (code 73).
- The completion of a line with fewer serials than units is shown as `Partial`, even if the quantity is full, and closing then needs a supervisor.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Scan a serial number` | The field is empty. | Scan a serial. |
| `No unfinished serial scan on this line` | The line has no open capture. | Refresh the list. |
| `The unfinished serial scan on this line has no location — it cannot be resumed` | The capture has no location. | Finish the capture on the RF terminal. |
| `Select exactly one receipt line` | No line, or several, ticked. | Tick one line. |
| `The scan page lost its line — go back and press Resume scan` | The page lost its session data. | Click `Back`, then `Resume scan`. |
| `Already captured — scan the next one` | The serial is already in this capture. | Scan the next serial. |
| `Serial {serial} is not on the ASN pre-advised list for receipt line {id}. Scan only serials vendor pre-advised, or open a discrepancy report.` | Code 95. See [Pre-advised serials tab](25-line-pre-advised-serials-tab.md). | Scan another serial. |
| The text of a refused serial (format, serial in another place) | The server's own words are shown. | Read the message. |

Other refusals come from the serial service. Their codes are 80 to 95. See [Return codes](92-return-codes.md).

## Related pages

- [Line serials tab](24-line-serials-tab.md)
- [Receiving a line](36-receiving-a-line.md)
- [Closing a receipt](42-closing-a-receipt.md)
- API: `capture_serial`, `list_open_episodes_for_receipt`
- RF terminal: `RCSN01` (Serial Capture) and the menu entry `Resume Serial Capture`. See [Receiving against an ASN](../../operator/02-receiving-against-asn.md).
