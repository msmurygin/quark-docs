# Messages catalogue

This page lists the messages that the receiving screens show, grouped by the page that explains them.
A part in `{braces}` is replaced by a value. The page linked in the heading says when the message appears and what to do.

Messages are reproduced exactly as they appear in the application. A message may begin with a lower-case letter.

## [Header tab](10-header-tab.md)

- `Receipt number is required`
- `Owner id is required`
- `Duplicate entry on receipt (constraint ...)`
- `owners {id} not found`

## [Dates tab](11-dates-tab.md)

- `receipt {id} is {status} - cannot edit receipt reference in its current lifecycle state`

## [Shipping tab](12-shipping-tab.md)

- `receipt {id} is {status} - cannot edit receipt reference in its current lifecycle state`

## [Receipt lines list](20-receipt-lines-list.md)

- `receipt {id} is {status} - cannot delete receipt line in its current lifecycle state`
- `No unfinished serial scan on this line`
- `The unfinished serial scan on this line has no location - it cannot be resumed`
- `Select exactly one receipt line`

## [Line detail tab](21-line-detail-tab.md)

- `Owner id is required`
- `Sku is required`
- `Pack id is required`
- `Uom is required`
- `Specify either qty_expected (ASN promise) or qty_received (physical receive) — both cannot be empty.`
- `SKU {code} not found for owner {id}`
- `Code {code} not found`
- `receipt {id} is {status} — cannot add receipt line in its current lifecycle state`
- `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state`

## [Line destination and dates tab](22-line-destination-and-dates-tab.md)

- `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state`

## [Line physical and PO tab](23-line-physical-and-po-tab.md)

- `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state`

## [Pre-advised serials tab](25-line-pre-advised-serials-tab.md)

- `Serial {serial} is not on the ASN pre-advised list for receipt line {id}. Scan only serials vendor pre-advised, or open a discrepancy report.`

## [Expected lot attributes tab](26-line-expected-lot-attributes-tab.md)

- `Lot policy attribute id is required`
- `Attribute value is required`
- `expected lot attribute value must not be empty`
- `expected lot attribute value must not exceed 20 characters`
- `lot policy attribute {a} is not available for receipt_detail {d}`
- `Duplicate entry on receipt_expected_lot_attributes (constraint ...)`
- `receipt {id} is {status} — cannot add expected lot attribute in its current lifecycle state`
- `Parent receipt_detail has no PK — save the detail first`

## [Creating a receipt](30-creating-a-receipt.md)

- `Receipt number is required`
- `Owner id is required`
- `Duplicate entry on receipt (constraint ...)`
- `owners {id} not found`

## [Editing a receipt](31-editing-a-receipt.md)

- `receipt {id} is {status} — cannot edit receipt reference in its current lifecycle state`
- `owners {id} not found`

## [Deleting receipts](32-deleting-receipts.md)

- `Cannot delete {number} — {qty} units have been received on its lines. Adjust qty to 0 or close the receipt instead.`
- `Cannot delete {number} — box {code} {held_by}. Close the receipt instead.`
- `receipt {id} not found`

## [Adding a line](33-adding-a-line.md)

- `Owner id is required`
- `Sku is required`
- `Specify either qty_expected (ASN promise) or qty_received (physical receive) — both cannot be empty.`
- `SKU {code} not found for owner {id}`
- `receipt {id} is {status} — cannot add receipt line in its current lifecycle state`
- `a planned line starts with nothing done — status cannot be set when planning (got InProgress)`

## [Editing and deleting lines](34-editing-and-deleting-lines.md)

- `receipt {id} is {status} — cannot edit receipt line in its current lifecycle state`
- `receipt {id} is {status} — cannot delete receipt line in its current lifecycle state`
- `receipt_detail id={id} not found`

## [Adding expected lot attributes](35-adding-expected-lot-attributes.md)

- `Lot policy attribute id is required`
- `Attribute value is required`
- `expected lot attribute value must not exceed 20 characters`
- `lot policy attribute {a} is not available for receipt_detail {d}`
- `Parent receipt_detail has no PK — save the detail first`
- `receipt {id} is {status} — cannot add expected lot attribute in its current lifecycle state`

## [Receiving a line](36-receiving-a-line.md)

- `qty must be > 0, got {qty}`
- `invalid state for operation: status=OnHold, op=ReceiveAgainstAsn`
- `Receipt without LPN is not allowed by owner policy`
- `This receive has no LPN`
- `This SKU is not on the receipt. Receive it anyway?`
- `This SKU is not on the receipt, and owner policy does not allow receiving what the document does not carry.`
- `qty {qty} is not a multiple of pack {pack}`
- `Owner {code} ({company}) is set to disallow Receipts for Received Qty > Expected Qty by over {n}%. Receive Anyway?`
- `Owner {code} ({company}) is set to disallow Receipts for Received Qty > Expected Qty by over {n}%`
- `Owner {code} ({company}) reports shortage > {n}% (got {x}% short). Receive Anyway?`
- `Receiving less than expected — say why (shortage reason)`
- `'{reason}' is not a shortage reason — pick one from the list`
- `Location {code} is on hold ({hold}). Receive here anyway?`
- `Location {code} is blocked ({hold}) — receive somewhere else.`
- `SKU {code} requires temperature capture`
- `temperature {t} below min {m}`
- `temperature {t} above max {m}`
- `expiration {date} is expired: not later than today {today}`
- `expiration {date} is not later than today {today} + min_shelf_life {n}d`
- `expiration date is required and cannot be worked out: capture it or the manufactured date`
- `manufactured {date} older than max_age_on_rec {n}d`
- `delivery_by_date {date} passed`
- `best_by_date {date} passed`
- `SKU {code} requires serial per unit`
- `lot attr {code}: expected {a}, got {b}`
- `lot_attribute '{code}' must equal '{a}' on receipt_detail id={id} (strict-match flag set), got '{b}'`
- `receipt was modified concurrently, please retry`
- `receipt is locked, please retry (timeout {ms}ms)`
- `You can read this line but not receive against it.`

## [Capturing serial numbers](37-capturing-serial-numbers.md)

- `Scan a serial number`
- `No unfinished serial scan on this line`
- `The unfinished serial scan on this line has no location — it cannot be resumed`
- `Select exactly one receipt line`
- `The scan page lost its line — go back and press Resume scan`
- `Already captured — scan the next one`
- `Serial {serial} is not on the ASN pre-advised list for receipt line {id}. Scan only serials vendor pre-advised, or open a discrepancy report.`

## [Adjusting received quantity](38-adjusting-received-quantity.md)

- `Tick exactly one line`
- `The line list has moved on — tick the line again and retry`
- `Enter the correct quantity as a number`
- `Choose why the quantity is being corrected`
- `delta_qty must be != 0`
- `adjustment would make qty_received={n} < 0`
- `receipt was modified concurrently, please retry`
- `Line {line number} was not adjusted: {error}`
- `invalid state for operation: status={status}, op=AdjustReceivedQty`

## [Reporting damage](39-reporting-damage.md)

- `You may not report damage on this receipt.`
- `This dialog opens on a receipt line, and none was selected.`
- `Say what happened — a written-off unit with no account of it is an audit row nobody can use.`
- `The warehouse has no location of the type this severity needs. The damage is recorded; the goods stay where they are.`
- `damaged_qty must be > 0, got {n}`
- `damaged_qty {n} exceeds what is available on this line: arrived {a}, already reported damaged {b}, available {c}`
- `reason_code '{code}' is not a valid damage_reason`
- `receipt id={id} is in terminal state {status} — cannot report damage`
- `invalid state for operation: status=OnHold, op=ReportDamage`
- `a damage photo must be {types} — "{type}" is not accepted`
- `a damage photo may be at most 10 MB; this one is {n} MB`
- `that file is empty — there is nothing to upload`
- `the photo store could not be reached — reporting the damage still works`

## [Putting a receipt on hold](40-putting-a-receipt-on-hold.md)

- `Receipt put on hold`
- `{n} receipts put on hold`
- `{held} put on hold, {failed} could not be — {first refusal}`
- `Select the receipts to put on hold first`
- `Choose a hold reason`
- `Receipt {id} is OnHold — it cannot be put on hold.`
- `Receipt {id} is Closed — it cannot be put on hold.`
- `Receipt {id} changed since you selected it — it is now {status}. Refresh the list and try again.`
- `hold_reason_code '{code}' not found in inventory_hold_code`
- `Receipt {id} could not be put on hold: {error}`

## [Releasing a receipt from hold](41-releasing-a-receipt-from-hold.md)

- `Released from hold`
- `Released {n} receipts from hold`
- `{released} released, {failed} could not be — {first refusal}`
- `Select the receipts to release first`
- `Receipt {id} is Open — it cannot be released.`
- `Receipt {id} is InProgress — it cannot be released.`
- `Receipt {id} is Closed — it cannot be released.`

## [Closing a receipt](42-closing-a-receipt.md)

- `Receipt closed`
- `Receipt {number} is Partial — supervisor override required to close` (also `Over`, `Pending`)
- `You don't have permission to close receipt {number} with a discrepancy. Ask a supervisor.`
- `Cannot close receipt {number}: completion is {completion} and ALLOW_CLOSE_WITH_DISCREPANCY is off`
- `Receipt {number} has {n} unresolved serial-capture episode(s): {list}. {hint}`
- `Receipt {number} has {n} damage record(s) awaiting final disposition`
- `Receipt {number} is Cancelled — it cannot be closed.`
- `Receipt {number} is {status} — it cannot be closed.`

## [Cancelling a receipt](43-cancelling-a-receipt.md)

- `Receipt cancelled`
- `Say why the receipt is being cancelled`
- `The receipt list has moved on — reselect the receipt and try again`
- `Receipt {receipt number} could not be cancelled: {error}`
- `cannot cancel receipt {id}: detail line {n} has completion={completion}`
- `cannot cancel receipt id={id} in terminal state {status}`

## [Moving and cancelling expected boxes](44-moving-and-cancelling-expected-boxes.md)

- `Moved {n} box(es) off {pallet}`
- `Enter the pallet the boxes go to`
- `Tick exactly one pallet`
- `The box list has moved on — tick the pallet again and retry`
- `Boxes on {pallet} were not moved: {error}`
- `Box {code} cancelled`
- `Say why the box will not arrive`
- `Tick exactly one box`
- `The box list has moved on — tick the box again and retry`
- `Box {code} was not cancelled: {error}`
- `Box {code} cancelled`
- `Say why the box will not arrive`
- `Tick exactly one box`
- `The box list has moved on — tick the box again and retry`
- `Box {code} was not cancelled: {error}`

## Related pages

- [Return codes](92-return-codes.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
- [Receipts list](00-receipts-overview.md)
- API: Inbound API reference
