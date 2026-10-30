# Placing a hold

Use this page to block or mark stock: a lot that waits for a quality check, a location that is damaged, a pallet that must not be picked.

## Before you start

- You are `ADMIN` or `MANAGER`. The API method `create_inventory_hold_row` is open only to them by default.
- You know the **one** thing to hold: a lot, a location or a container.
- You know the reason code. Look at the table below to see what the code does.

## Steps

1. Open `Management & Control > Inventory > Holds`.
2. Click `New Hold`. The [hold form](21-hold-form.md) opens.
3. Pick the `Reason code`.
4. Fill **exactly one** of `Lot`, `Location` and `Container (LPN)`. Use the pick list next to the field.
5. If you want to, type `Comments`.
6. Click `Save`. The screen goes back to the list.

## What the screen says

| Result | Message |
|---|---|
| Reason code empty | `hold reason code must not be empty` |
| Reason code unknown | `unknown hold reason code '{code}' — not in inventory_hold_code` |
| Nothing chosen | `a hold needs a target — set a lot, a location, or a container` |
| Two or three chosen | `set exactly one of lot / location / container, not several` |
| Location of pick pallets | `location {loc} holds only open pick pallets: it takes no location hold (hold the pallet by its LPN)` |

## What a reason code does

The codes are rows of the table `inventory_hold_code`. Each row has these settings:

| Setting | Meaning |
|---|---|
| `enforce` | The hold is a real stop for **moves** and for the **status of a location**. Off means those two ignore the hold. The ATP view does **not** read this setting (see below). |
| `overridable` | A supervisor may accept the stop and go on (for example, move the stock out anyway). |
| `block_inbound_flow` | You may not **put** stock into a held location (receiving, the destination of a move). Default on. |
| `block_outbound_flow` | You may not **take** stock out (available quantity, allocation, the source of a move). Default on. |
| `active` | Off switches the code off: it blocks nothing. |

The codes a new database has:

| Code | Meaning in the table | `enforce` | `overridable` | Blocks putting in |
|---|---|---|---|---|
| `None` | No hold | No | No | |
| `Ok` | Released, no active hold | No | No | |
| `NotHold` | Explicit no-hold choice | No | No | |
| `PIHold` | Physical inventory / cycle count | Yes | Yes | Yes |
| `QcRequired` | SKU requires QC at receive | Yes | Yes | Yes |
| `NewItem` | First-receive supervisor review | Yes | Yes | Yes |
| `QcQuarantine` | In the QC zone, waiting for inspection | Yes | Yes | Yes |
| `Customs` | Customs clearance pending | Yes | Yes | Yes |
| `CustomerReturn` | Customer return inspection pending | Yes | Yes | Yes |
| `Expired` | Past the expiry date | Yes | Yes | Yes |
| `Other` | Catch-all | Yes | Yes | Yes |
| `Damaged` | Physical damage | Yes | No | **No.** Damaged stock may be put in (the damage location), but not taken out. |
| `Rtv` | Waiting to go back to the vendor | Yes | No | Yes |
| `Destroy` | Waiting for destruction | Yes | No | Yes |
| `Lost` | Missing per cycle count | Yes | No | Yes |
| `LocBlocked` | Administrative location block | Yes | No | Yes |

Every code has `block_outbound_flow` on. The ATP view reads only `active` and `block_outbound_flow`, so a hold with `None`, `Ok` or `NotHold` also lowers ATP to 0, although a move and the status of a location ignore it. The codes are kept under `Code Lists` (`hold_code_menu`).

## What changes

| What | Change |
|---|---|
| `inventory_hold` | A new row with `is_hold_on` on, `status` `Ok`, the date and the user, and a release date about 100 years away. |
| ATP | Rows covered by the hold get ATP 0 when the code is active and has `block_outbound_flow` on. See [ATP](01-balances-screen-overview.md#atp-available-to-promise). |
| Location status | A hold on a location sets the status of the location again: `Damage` if an enforcing `Damaged` hold is on, else `Hold` if any enforcing hold is on, else `Ok`. A hold with `enforce` off does not change it. |
| Moves | A move from or into a held place is refused unless a supervisor accepts it, when the code is `overridable`. |
| Lists | The hold appears in [Holds](20-holds-list.md) and [On Hold](16-on-hold-tab.md). |

A hold is fixed to a **code**: a hold on a lot holds every SKU and owner that uses that lot code.

## How a hold ends

There is no button on the web screens.

- The API method `release_inventory_hold` releases a hold by its id. It writes `release: {reason}` (default `manual release`) to the comments. A hold that is already off is left as it is.
- A move of a held container may release and add holds (the hold cascade).
- The write-off of damaged goods in receiving releases the damage hold.
- A hold whose release date has passed is released by the 5-minute sweeper. No hold gets a near date today. See [Holds list](20-holds-list.md).

When the last enforcing hold of a location is released, the status of the location goes back to `Ok`.

## What can go wrong

| Problem | What it means |
|---|---|
| The code is accepted but nothing is blocked | The code is switched off (`active` off): ATP and moves ignore it. The save accepts a switched-off code (`InventoryHoldCodeBmc::exists_by_code` does not look at `active`). |
| The code is `None`, `Ok` or `NotHold` | A move and the location status ignore the hold (`enforce` off), but ATP drops to 0. |
| A hold on a lot, location or container that does not exist | The save does not check that the target exists. The hold is stored and covers nothing. For a container the code only looks the container up to lock it, and goes on when it finds none. The pick lists offer only real codes, but the API accepts any text. |

## Related pages

- [Hold form](21-hold-form.md)
- [Holds list](20-holds-list.md)
- [Changing the note of a hold](42-changing-the-note-of-a-hold.md)
- API: `create_inventory_hold_row` (used by the form), `create_inventory_hold` (stateless command), `release_inventory_hold` (stateless command), `list_active_holds_by_lpn`
- RF terminal: none.
