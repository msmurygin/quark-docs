# Messages catalogue

This page lists the messages that the `Inventory Balances` screens show, grouped by the page that explains them.
A part in `{braces}` is replaced by a value. The page linked in the heading says when the message appears and what to do.

Messages made by the server (domain refusals) are shown as the server wrote them. Some begin with a lower-case letter. That is how they are written in the code.
Buttons that run a command show their own text first and add the server's text as `{error}`, for example `The adjustment was not posted: {error}`.

## [Move stock document](17-move-stock-document.md) and [Moving stock](40-moving-stock.md)

- `Quantity must be greater than zero`
- `Quantity {requested} exceeds available {available}`
- `Pick the destination LPN to merge into`
- `New LPN not generated — click regenerate, or pick another mode`
- `Nothing to move — change the cell and/or the LPN`
- `Move session expired — reopen the position`
- `Position not found.`
- `Moved {n} fragment(s)` with `, {n} hold(s) released` and `, {n} hold(s) added`
- `Supervisor authorization required to move held stock ({n} hold(s))`
- `The override could not be issued — try again.`
- `Move failed: {message}`
- `History unavailable.`
- `Preview unavailable — label renderer unreachable.`

## [Holds](20-holds-list.md), [Hold form](21-hold-form.md), [Placing a hold](41-placing-a-hold.md)

- `hold reason code must not be empty`
- `unknown hold reason code '{code}' — not in inventory_hold_code`
- `a hold needs a target — set a lot, a location, or a container`
- `set exactly one of lot / location / container, not several`
- `location {loc} holds only open pick pallets: it takes no location hold (hold the pallet by its LPN)`
- `hold was not created`
- `inventory hold update requires the comments field`

## [Adjustments list](22-adjustments-list.md)

- `Tick one adjustment to delete`
- `Tick the adjustment again: its version is unknown`
- `The list has moved on — tick the adjustment again and retry`
- `Adjustment {number} deleted`
- `Adjustment {number} was not deleted: {error}`
- `A posted adjustment is not deleted: reverse it` (grey text)

## [Adjustment header](23-adjustment-header.md) and the task pages [43](43-creating-an-adjustment.md) to [50](50-deleting-an-adjustment.md)

- `Reopen the adjustment: its id is unknown`
- `Reopen the adjustment: its version is unknown`
- `Save the adjustment first`
- `Adjustment {number} is {status}` or `Adjustment {number} is not validated: line {n} — {reason}; ... and {k} more`
- `Adjustment {number} approved`
- `Adjustment {number} posted`
- `Reversal {number} made: open it, say why on its header, validate and post it`
- `Adjustment {number} deleted`
- `The adjustment was not validated: {error}`, `... was not approved: ...`, `... was not posted: ...`, `... was not reversed: ...`, `... was not deleted: ...`
- `reason {reason} is not on the adjustment reason list`
- `reason {reason} is retired`
- `reason {reason} requires a comment`
- `reason {reason} does not allow adding stock (+{n})`
- `reason {reason} does not allow removing stock ({n})`
- `a reversal is made from the posted adjustment it reverses, not by hand`
- `a reversal keeps its reason, and no other adjustment takes it`
- `source type {type} is not one a client may create`
- `an adjustment number is at most 20 characters`
- `a posted adjustment cannot be changed`
- `the adjustment is not validated`
- `the adjustment's reason requires approval before posting`
- `the adjustment has no lines`
- `only a posted adjustment can be reversed`
- `the adjustment is already reversed by {number}`
- `the adjustment changed no stock: there is nothing to reverse`
- `line {n}: its ledger row {code} records no quantity before; it cannot be reversed`
- `version conflict on inventory_adjustment {id}`
- `{n} adjustment line(s) cannot be posted`
- `the stock changed while the adjustment was being posted; post it again`
- `inventory_adjustment id={id} not found`

## [Adjustment lines](24-adjustment-lines-list.md) and [Adjustment line card](25-adjustment-line-card.md)

- `Tick one line to delete`
- `Tick the line again: its version is unknown`
- `The lines have moved on — tick the line again and retry`
- `Line {n} deleted`, `Line deleted`
- `Line {n} was not deleted: {error}`, `The line was not deleted: {error}`
- `Save the line first`
- `Reopen the line: its version is unknown`
- `Open the adjustment first`
- `Lines added from stock`
- `No lines were added: {error}`
- `line {n}: SKU, unit, lot and location are all required`
- `no owner {code}`
- `owner {code} has no SKU {sku}`
- `SKU {sku} has no default unit; name the unit`
- `no container {code}`
- `target quantity {n} is not a non-negative number`
- `line {n}: the same stock is already on this adjustment`
- `name at least one of owner, SKU, lot, location or zone`
- `the filter names more than 1000 stock rows; narrow it`
- `no lines to add`

## Line refusals (column `Validation`, `Would Refuse`)

See [Validating an adjustment](46-validating-an-adjustment.md#line-refusals).

- `the identity has more than one balance row ({ids})`
- `the stock this line was about is no longer there`
- `balance {id}: the target is below what is reserved (allocated {a}, picked {p})`
- `the stock changed since it was counted (counted against {e}, holds {c} now): count it again`
- `the same identity is named by another line of the document`
- `serial-tracked SKU {sku}: adjustment does not support serials yet`
- `lot {lot} does not exist for this owner and SKU`
- `the location refuses this stock: {message}`
- `location {location} holds only open pick pallets: it is not adjusted`
- `container {c} stands at {l}: no stock is created in it elsewhere`
- `container {c} is held by picking and stands at {l}: no stock is created in it elsewhere`

## [Adjustment reasons](31-adjustment-reasons.md)

- `Tick a reason` (grey text), `Tick one reason`
- `The list has moved on — tick the reason again and retry`
- `Reason {code}: a posted adjustment counts the locations it changed`
- `Reason {code}: a posted adjustment counts nothing`
- `Reason {code} was not changed: {error}`

## [Counts list](26-counts-list.md)

- `Tick one count to delete`, `Tick the count again: its version is unknown`
- `The list has moved on — tick the count again and retry`
- `Count {number} deleted`
- `Count {number} was not deleted: {error}`
- `count {number} has been counted: it is cancelled, not deleted`

## [Count header](27-count-header.md), [Creating a count](51-creating-a-count.md), [Cancelling a count](56-cancelling-a-count.md)

- `Count {number} cancelled: its locations are released`
- `The count was not cancelled: {error}`
- `Reopen the count: its id is unknown`, `Reopen the count: its version is unknown`
- `a {kind} count is made by its policy or event, not started by hand`
- `only a selective or a cycle count is counted by item`
- `a count of the item only needs the item: name SKUs, lots or LPNs`
- `nothing can be counted in {scope}: every location is blocked or already being counted`
- `recounts per location are 0 to 9, not {n}`
- `a comment is at most 500 characters`
- `a count number is at most 20 characters`
- `the count is {status}, not open`

## [Count locations](28-count-locations-list.md), [Add Locations window](29-add-locations-dialog.md), [Counted location card](30-counted-location-card.md)

- `Tick one location`, `Tick the location again: its version is unknown`
- `The locations have moved on — tick the location again and retry`
- `{location} is no longer counted: it is released`
- `{location} stays in the count: {error}`
- `Location {location}: the variance is adjusted`
- `The variance of {location} was not accepted: {error}`, `The variance was not accepted: {error}`
- `Location {location} goes to be counted again`
- `{location} was not sent to recount: {error}`, `The location was not sent to recount: {error}`
- `Reopen the location: its task is unknown`, `Reopen the location: its version is unknown`
- `Save the count first`
- `Nothing was added: {error}`
- `{n} location(s) added to count {number}` with `; {m} passed over (busy or already in the count): {codes}`
- `choose the locations or the zones to add`
- `already in this count: {codes}`
- `already being counted: {codes}`
- `cannot be frozen for a count (unknown, blocked or under another operation): {codes}`
- `never counted (lost stock or open pick pallets): {codes}`
- `the count of {location} is {status}: it is not being counted`
- `the count of {location} is {status}: there is no variance to decide`
- `{location} has been counted: it stays in the count — accept, recount or cancel`
- `{location} has been recounted {n} time(s), the most this count allows: accept the variance or cancel the count`
- `a recount of {location} is counted by somebody other than the first counter`
- `more stock left {location} after it was counted than the count found there: recount it`
- `the variance cannot be adjusted: {n} adjustment line(s) cannot be posted`
- `the COUNT_VARIANCE reason asks for approval, which a count cannot give; adjust this variance by hand`
- `version conflict on inventory_count_task {id}`, `version conflict on inventory_count {id}`

## [Pending Move-In](33-pending-move-in.md)

- `Select a reservation to release` (grey text)
- `{n} reservation(s) released` with `, {m} already consumed, cancelled or expired`
- `Release failed: {error}`

## Related pages

- [Return codes](92-return-codes.md)
- [Inbound: Messages catalogue](../inbound/93-messages-catalogue.md)
- [Who can do what](91-who-can-do-what.md)
