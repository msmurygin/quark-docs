# Move stock document

The `Move stock` document moves one balance to another location, to another container, or both. It opens when you click a row of the [By Location tab](10-by-location-tab.md).
The form is `balance_move_doc` (kind Normal, style `movedoc`). The page is drawn by program code, not by the generic form engine: `crates/services/web-ui-server/src/components/layout/move_form.rs`. The metadata holds only the two pick lists `dest_loc` and `dest_lpn`.

The document fills the main area. The breadcrumb reads `Balances / By Location / {location} · {container or loose} · {SKU}`. The back arrow and the button `Cancel` both leave without moving.

## What the document has

| Part | What it shows |
|---|---|
| **Position** (read only) | `SKU` with its description, `Lot` (a dash when empty), `Owner` (the name), `Status` (`Active`, or the hold text; `ATP` beside it), `Tracking` (only for serial-tracked stock: `Serial-tracked`, and `{n} / {qty} captured →` opens a list of the serials), `Available`. |
| **Move**: source and destination, side by side | `Location`, `Container / LPN`, quantity. The left side is read only. The right side is what you fill in. |
| **Reason and rule** | The box `Reason`, a reminder of the rule, and a place where the result message appears. |
| **History** (bottom) | The recent ledger rows of the source location, read from `/api/move/{form}/history`. It says `History unavailable.` when it cannot be read. |

## Fields you fill in

| Label | Field | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Location` (destination) | `dest_loc` | Pick list of locations (form `location_list_form`) | Conditional | A location code. Empty means "the same location". | Where the stock goes. |
| `LPN` mode | `dest_lpn_mode` | Three buttons | Yes | `Keep` (default), `New LPN`, `Existing`. | What happens to the container. See below. |
| `LPN` | `dest_lpn` | Text or pick list | Conditional | `Keep`: not used. `New LPN`: the code shown, made by the system. `Existing`: a container from the pick list (form `inventory_balance_container_list`). | The destination container. |
| `Move quantity` | `to_qty` | Number | No | Starts at the move-available quantity shown on the document. | How much to move. Allocated and picked units are excluded; held units remain available through supervisor override. |
| `Reason` | `reason_code` | Text, up to 80 characters | No | Free text. Example in the box: `e.g. consolidate to forward pick`. | Written to the ledger row as `reason_code`. |

The three container modes:

| Mode | Meaning | What `dest_loc` must be |
|---|---|---|
| `Keep` | The container travels with the stock and keeps its code. For loose stock it is simply moved. | A location different from the source. |
| `New LPN` | The stock is repacked into a **new** container at the destination. The code is made by `generate_lpn` when you open the mode, and shown. `regenerate` makes another one. The eye button previews the label as a picture. The printer button sends the label to the printer. | Any location, also the same one. |
| `Existing` | The stock is merged into a container that stands somewhere already. The system takes the location of that container. | Not used. |

A new code is made each time you press `regenerate`. After a label was printed for a code, `regenerate` asks for confirmation, because the printed label would no longer match.

## Rules the screen checks first

The checks run in this order. The first one that fails stops the move and shows its message.

| Order | Rule | Message |
|---|---|---|
| 1 | `Move quantity` is not above 0. | `Quantity must be greater than zero` |
| 2 | `Move quantity` is more than the move-available quantity. | `Quantity {requested} exceeds available {available}` |
| 3 | Mode `Existing` and no container chosen. | `Pick the destination LPN to merge into` |
| 4 | Mode `New LPN` and no code. | `New LPN not generated — click regenerate, or pick another mode` |
| 5 | Mode `Keep` and the destination is empty or equal to the source location. | `Nothing to move — change the cell and/or the LPN` |

The document uses one value for `Available`, the initial move quantity, `max`
and the client-side limit: **Qty − Allocated − Picked**. Allocated and picked
units are excluded because this screen cannot release their commitments. Holds
do not lower this move limit because the supervisor-override flow described
below can authorise them. The separate ATP value still reflects the hold.
The caption shows the exact `qty − alloc − picked` arithmetic.

If the document was left open and the server forgot the position, the message is `Move session expired — reopen the position`.

## What the server does

The button `Move` runs the web action `balance_move`, which calls the API method `move_execute` once. The call carries an idempotency key made when the document opened. Pressing `Move` again replays the same answer instead of moving twice.

- **Source**: a row with a container is moved as that container (`source_container_id`). A loose row is found by location, SKU, lot and owner.
- **Quantity**: when the whole row is move-available, that value sends no quantity (a full move). If some units are allocated, the allowed maximum is lower and is sent as a partial move. The primitive supports partial moves.
- **Recursive**: always on. The move takes the child containers with the container.
- **Source type**: `manual`.

On success the screen shows `Moved {n} fragment(s)`, then `, {n} hold(s) released` and `, {n} hold(s) added` when holds moved with the stock, refreshes the lists and returns to the [Balances screen](01-balances-screen-overview.md).

### When the stock is under a hold

The primitive may refuse with a reason that a supervisor can accept (an "override"). The screen then does one of two things.

- If **you** may authorise overrides (`SUPERVISOR` and up), the screen asks the server for an authorisation grant on your own authority and repeats the move. You see nothing.
- If you may not, the screen shows `Supervisor authorization required to move held stock ({n} hold(s))` and opens the supervisor sign-in window. A supervisor signs in there. The move is repeated with the grant. What you typed stays on the document.

A refusal that cannot be overridden shows `Move failed: {message}`. The message is the one of the server. Typical ones, from `crates/libs/wms-inventory/src/movement/types.rs:445-505`:

| Message begins | Meaning |
|---|---|
| `source not found` | The position is gone (already moved). |
| `destination not found` / `destination {code} is inactive` | The destination location does not exist or is switched off. |
| `source location blocked` / `destination location blocked` | A hold or a flag of the location forbids it. |
| `insufficient qty: requested {r}, available {a}` | A partial move wants more than there is. |
| `full move refused: only {a} of {r} is available — the rest is reserved` | Some of the stock is allocated or picked. |
| `container move refused: container {id} still holds reserved stock` | The same, for a container move. |
| `the stock at destination {location} changed while the move was being prepared; repeat the move` | Someone else changed the destination at the same moment. Repeat the move. |

## What it affects

- Changes the `location` and the container of the balance rows, and the location of the container. Writes ledger rows of type `Move` (see [Transactions](32-transactions.md)).
- May add or release holds that follow the stock (the counts in the message).
- Sends the event `process.inventory.moved`.

## Who can use it

`ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`. The web action `balance_move` and the API right `move_execute` are both granted to `OPERATOR` and `SUPERVISOR` by the database baseline, although the method's own default list is `ADMIN` and `MANAGER` only. See [Who can do what](91-who-can-do-what.md). `VIEWER` cannot move.

## Related pages

- [By Location tab](10-by-location-tab.md)
- [Moving stock](40-moving-stock.md)
- [Transactions](32-transactions.md)
- [Operator guide: Moving stock](../../operator/06-move.md) (RF)
- API: `move_execute` (stateless command), `generate_lpn`, `print_lpn_label`, `supervisor_override_grant`
- RF terminal: `Inventory > Move stock` (`INVMOV01` to `INVMOV04`, `INVMOV_SN`, `INVMOV_OVR`, `INVMOV_DONE`)
