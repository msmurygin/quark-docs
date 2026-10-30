# Receiving a line

Use this page to receive goods against a line of a receipt in the web UI.
It creates stock in the location you choose, and moves the line and the receipt forward.

## Before you start

- The receipt is `Open` or `InProgress`. The line is `Open` or `In progress`. The button `Receive` is grey for a receipt on hold, closed or cancelled.
- You hold the goods and know the quantity, the unit and the location.
- You can call `receipt_receive_against_asn`. By default `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR` can. Without the right the window opens read only with the text `You can read this line but not receive against it.`
- Optional: the owner has a default receiving location (`Owners > WH Settings`). It is filled in for you.

## Steps

1. Open the receipt.
2. In the lines list tick **one** line.
3. Click `Receive`. The window `Receive line` opens. The title bar shows the line, for example `Line 00001`.
4. Read the top strip. It shows how much of the line is received, how much is open and what this entry adds.
5. In `Quantity` type the quantity you hold. Use the unit strip to choose the unit (for example `EA` or `CS`). The quantity must be more than 0.
6. In `Destination` pick the `Location`.
7. Choose `LPN handling`:
   - `Generate`: a new pallet code is made when you save. This is the default, unless the line announces a pallet.
   - `Existing`: type part of a pallet code in the search box and pick an open pallet. The mode starts with the announced pallet when the line has one.
   - `Loose`: the goods are received with no pallet. The mode is shown but cannot be chosen when the owner policy forbids receiving without an LPN.
8. Optional: type `Supplier lot number` as printed on the box.
9. If the SKU has lot attributes, fill each attribute. A required attribute is listed under `Still needs` until you fill it. Attributes that the line expects are filled in, and locked when the line is strict.
10. Read the sentence under `What will be recorded`. It says what the receive will write.
11. Click `Receive {quantity} {unit}`. Or click `Receive & next` to receive and clear the quantity for another entry.
12. If the window asks a question, answer it (see [Questions the window asks](#questions-the-window-asks)).
13. If the SKU needs serial numbers, scan one serial for each unit in the panel `Serial numbers` (see [Capturing serial numbers](37-capturing-serial-numbers.md)).
14. Click `Cancel` to close the window.

The buttons at the bottom are `Reset` (throws away what you typed and reads the line again), `Cancel`, `Receive & next` and `Receive`.
`Receive` and `Receive & next` stay grey until quantity, location and, for `Existing`, the pallet and all required attributes are filled, the quantity is not a fraction of a pack, and the quantity is not above the limit the owner accepts.

## The window in detail

| Part | Label | What it does |
|---|---|---|
| Top strip | `Line {n}`, `Received {a} of {b}`, `This entry {n}`, `Open {n}` | Shows the state of the line. The values come from the API method `get_receipt_receive_context`. |
| Quantity | `Quantity`, `Unit` | The quantity and its unit. The units are the pack units of the SKU. The window shows `= {n} {unit}` for the base unit, and `From the SKU's pack configuration`. |
| Quantity hints | `open {n} {unit}`, `Closes the line`, `{n} {unit} left open after this` | Tell what the entry does to the open quantity. |
| Whole units | `{unit} comes whole — a fraction of it cannot be received` | A pack unit larger than the base unit cannot be received in fractions. The button stays grey. |
| Tolerance notices | `{n} {unit} over the open quantity — within tolerance`, `{n} {unit} over the open quantity — beyond tolerance` | Show where the entry stands against the limits of the receipt policy. |
| Refusal | `This entry is {n} {unit} over what the owner accepts. Reduce the quantity, or a supervisor must authorize it.` | The entry is above the hard limit. The button stays grey. |
| `Destination` | `Location`, `Choose a location…` | The list shows every location as `type · zone · status`. A location with a hold status is shown and can be chosen. The server decides. |
| `LPN handling` | `Generate`, `Existing`, `Loose` | See step 7. Hints: `A new LPN is created when the receive is saved.`, `Units are received with no licence plate — they can then only be moved by location.`, `The owner does not allow receiving without an LPN.` |
| Pallet search | `Search an open plate…`, `plates found`, `no open plate matches`, `holds a lot that may not share a plate` | Finds open pallets by part of the code (`search_open_lpns`). |
| `Supplier lot number` | with the hint `As printed on the box. Ours is assigned when the units land.` | The lot number of the supplier. The warehouse lot is assigned by the lot policy of the SKU. |
| Lot attributes | `lot controlled`, `shelf life {n} days`, `Required for {name} — inventory cannot be created without it` | One field for each attribute of the lot policy. |
| `What will be recorded` | `Receiving {n} {unit}`, `into {location}`, `onto {pallet}`, `on a newly generated LPN`, `loose, with no LPN` | Says what the receive will write. When something is missing it says `Receiving no quantity`, `into no location` or `onto no LPN`. |
| Over-receipt notice | `This entry over-receives the line by {n} {unit}. It is inside tolerance, so it saves — the variance is logged against {receipt number}.` | The entry is above the plan but inside the soft limit. |
| Short strip | `Still needs` followed by the missing fields | Names the fields that keep the button grey. |
| Messages in the window | `This dialog opens on a receipt line. Go back and choose one.`, `Loading…`, `Received.` | Empty state, waiting, success toast. |

## Questions the window asks

The server can refuse a receive and ask a question. The window shows the server's words and a panel.

| Panel | Buttons | When |
|---|---|---|
| Confirm | `Acknowledge and continue`, `Cancel` | The refusal can be overridden and your role may do it. |
| Supervisor | `Supervisor username`, `Supervisor password`, `Authorise`, `Cancel` | The refusal can be overridden but your role may not. A supervisor types name and password on your screen. |
| Supply | `Shortage reason`, `Supply and continue`, `Cancel` | The receive is short and the server needs a reason from the list `shortage_reason`. |

Examples of questions: more than expected by the soft limit (code 27), less than expected (code 28, needs a reason), SKU not on the receipt (code 24), receiving without an LPN (code 25), a location on hold (code 76).
The supervisor needs the rights `receipt.override_qty_excess` or `receipt.override_qty_shortage`. By default only `SUPERVISOR` has them. The password is used for one grant and is not stored.

## What changes

| What | Change |
|---|---|
| Line (`receipt_detail`) | `qty_received` grows by the quantity, converted to the base unit. `status` becomes `InProgress`. `to_loc`, `to_lot` and `to_container_id` are written. `completion` is recalculated. `version` goes up. |
| Receipt (`receipt`) | `Open` becomes `InProgress` at the first receive. `completion` is recalculated. `version` goes up. |
| Stock | A balance is added in the location, in the lot and on the pallet you chose. A transaction log row is written. A new pallet code is made for `Generate`. |
| Lot | Found or made by the lot policy of the SKU. |
| Holds | Inventory holds are applied when a rule asks for it, for example the receipt hold code of the SKU. They are returned in the result as `holds_applied`. |
| Serials | When the SKU needs serials, a capture episode is opened. The receipt cannot be closed while it is open. |
| Events | The line received event, and an over or short event when the line is above or below the plan. |
| A line that does not exist | When the scan matches no line, a new line is made with `qty_expected` 0 (see below). |

### Which line gets the goods

The window sends the receipt, the SKU and the quantity. The server picks the target line from the SKU, the lot attributes, the pallet and the supplier lot.
When no line matches, the policy `No SKU on ASN` decides: `Allow` makes a new line, `Warning` asks a question (code 24), `HardError` refuses.
A new line has `qty_expected` 0, so its goods count as `Over receipt`.

## What can go wrong

The checks run in this order: pallet rule (25), supplier lot (33), strict lot attributes (34), held location (76), temperature (50, 51), pack multiple (30), quantity (27, 28, 29), dates (45 to 49), shortage reason (43), serials (65 to 67), expected lot attributes (35 to 37), inventory holds.

| Message | Code | Meaning | Fix |
|---|---|---|---|
| `qty must be > 0, got {qty}` | | The quantity is 0 or negative. | Type a quantity above 0. |
| `invalid state for operation: status=OnHold, op=ReceiveAgainstAsn` (also `Closed`, `Cancelled`) | 70 | The receipt is on hold, closed or cancelled. The `Receive` button is grey in these states, so you meet this only when the status changed after you opened the screen. | Release the hold, or stop. |
| `Receipt without LPN is not allowed by owner policy` | 25 | `Loose` while the policy is `HardError`. | Choose `Generate` or `Existing`. |
| `This receive has no LPN` | 25 | `Loose` while the policy is `Warning`. | Confirm, or choose a pallet. |
| `This SKU is not on the receipt. Receive it anyway?` | 24 | No line matches and the policy is `Warning`. | Confirm, or stop. |
| `This SKU is not on the receipt, and owner policy does not allow receiving what the document does not carry.` | 24 | The policy is `HardError`. | Do not receive it. |
| `qty {qty} is not a multiple of pack {pack}` | 30 | The policy `Qty Pack Multiple Check` refuses the quantity. | Check the count and the unit. |
| `Owner {code} ({company}) is set to disallow Receipts for Received Qty > Expected Qty by over {n}%. Receive Anyway?` | 27 | Above the soft limit. | Confirm or have a supervisor authorise. |
| `Owner {code} ({company}) is set to disallow Receipts for Received Qty > Expected Qty by over {n}%` | 27 | Above the hard limit. | Receive less. |
| `Owner {code} ({company}) reports shortage > {n}% (got {x}% short). Receive Anyway?` | 28 | Less than expected, above the shortage limit, on the last open line of the SKU. | Give a shortage reason and confirm. |
| `Receiving less than expected — say why (shortage reason)` | 43 | A reason is needed. | Choose a reason in the window. |
| `'{reason}' is not a shortage reason — pick one from the list` | 43 | The reason is not in the list. | Choose from the list. |
| `Location {code} is on hold ({hold}). Receive here anyway?` | 76 | A location hold that can be overridden. | Confirm, or choose another location. |
| `Location {code} is blocked ({hold}) — receive somewhere else.` | 76 | A hard location hold. | Choose another location. |
| `SKU {code} requires temperature capture`, `temperature {t} below min {m}`, `temperature {t} above max {m}` | 51, 50 | The SKU needs a temperature. The web window has no temperature field. | Receive on the RF terminal. |
| `expiration {date} is expired: not later than today {today}`, `expiration {date} is not later than today {today} + min_shelf_life {n}d`, `manufactured {date} older than max_age_on_rec {n}d`, `delivery_by_date {date} passed`, `best_by_date {date} passed` | 45 to 48 | The policy `Date Deviation Check` refuses the dates. | Check the dates. |
| `expiration date is required and cannot be worked out: capture it or the manufactured date` | 49 | The lot must carry an expiration (lot policy, or the SKU's `expire_days`), and none was typed or can be worked out from a manufactured date. | Capture the expiration or the manufactured date. |
| `SKU {code} requires serial per unit` | 65 | The SKU needs serials. | Scan serials. |
| `lot attr {code}: expected {a}, got {b}` | 36 | Advisory check: the value differs. | Correct the value, or have a supervisor allow it. |
| `lot_attribute '{code}' must equal '{a}' on receipt_detail id={id} (strict-match flag set), got '{b}'` | 34 | Strict check. | Correct the value. |
| `receipt was modified concurrently, please retry` | 40 | Someone changed the receipt at the same time. | Press `Receive` again. |
| `receipt is locked, please retry (timeout {ms}ms)` | 41 | Someone else holds the receipt. | Wait and try again. |
| `You can read this line but not receive against it.` | | Your role may not receive. | Ask an administrator. |

The web window cannot enter a temperature, a damage report or serial numbers before the receive.
Serial numbers are scanned after the receive. Damage is reported on the line card.

## Related pages

- [Receipt lines list](20-receipt-lines-list.md)
- [Capturing serial numbers](37-capturing-serial-numbers.md)
- [Adjusting received quantity](38-adjusting-received-quantity.md)
- [Reporting damage](39-reporting-damage.md)
- [Return codes](92-return-codes.md), [Messages catalogue](93-messages-catalogue.md)
- [Administrator guide: Receipt policy](../../admin/policies/40-receipt-policy-settings.md)
- API: `receipt_receive_against_asn` (stateless command, needs `meta.idempotency_key`), `get_receipt_receive_context`
- RF terminal: `Receiving > Receive Against ASN`, screens `RCASN01`, `RCASN01SUM`, `RCASN01SKU`, `RCASN01LINE`, `RCASN01RSN`. See [Receiving against an ASN](../../operator/02-receiving-against-asn.md).
