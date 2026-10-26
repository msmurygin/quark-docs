# Hold form

The hold form places a new hold, and shows an existing one. It opens when you press `New Hold` on the [Holds list](20-holds-list.md), or when you click a row of that list.
The form is `hold_form` (module `wms_menu`). The data object is `inventory_hold_form`, over the table `inventory_hold`.

The title of the page is `Hold`. The only toolbar button is `Save`.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Reason code` | `code` | Pick list of hold codes, text up to 30 characters | Yes | A code from the table `inventory_hold_code` (opened from the list `hold_code_list_form`). Free typing is not allowed. Empty at first. Hint: `Why the inventory is held`. | Says why the stock is held, and so what the hold does. See [Placing a hold](41-placing-a-hold.md). |
| `Lot` | `lot` | Pick list of lots (form `inventory_balance_lot_list`), text up to 10 characters | No | A lot code. Hint: `Fill exactly ONE of Lot / Location / Container`. | Fixes the hold to a lot. |
| `Location` | `loc` | Pick list of locations (form `location_list_form`), text up to 20 characters | No | A location code. | Fixes the hold to a location. |
| `Container (LPN)` | `lpn` | Pick list of containers (form `inventory_balance_container_list`), text up to 50 characters | No | A container code. | Fixes the hold to a container. |
| `Auto-release` | `auto_release_date` | Date and time | No | A local warehouse date and time, or empty. | Schedules the hold to end automatically. The browser sends the selected instant in UTC. Empty means the hold stays on until a release command. |
| `Comments` | `comments` | Long text | No | Any text. | A note. |

Sources: the form `hold_form` in `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql`; the column types in `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:1992-2011` (the location column was widened to 20 by migration 089).

The fields the form does **not** show are filled by the server when the hold is placed:

| Column | Value |
|---|---|
| `is_hold_on` | `true` |
| `status` | `Ok` (the hold status type; it is not the reason code) |
| `date_on` | Now. |
| `who_on` | The user who saved. |
| `hours_to_hold`, `date_off`, `who_off` | Empty. |

## Rules

Saving a new hold calls `create_inventory_hold_row`, which checks, in this order (`crates/services/app-server/src/web/rpcs/hold_rpc.rs:139-190`):

1. The reason code is not empty.
2. The reason code exists in `inventory_hold_code`.
3. Exactly one of `Lot`, `Location`, `Container (LPN)` is filled. Blank text counts as empty.
4. A hold on a location is refused for the location of open pick pallets (`INTRANSIT`).
5. The hold is saved in a transaction of its own. For a location, the status of the location is worked out again in the same transaction.

The screen also checks that `Reason code` is not empty before it sends anything (`generic_validate`, required field `code`).

After the first save `Reason code`, `Lot`, `Location` and `Container (LPN)` are read only (`_code_readonly_hide_id`). `Comments` and `Auto-release` remain editable. Saving an existing hold calls `update_inventory_hold`, which accepts only those two operator-owned fields. Clearing `Auto-release` removes the schedule.

## Messages

| When | Message |
|---|---|
| Reason code empty | `hold reason code must not be empty` |
| Reason code unknown | `unknown hold reason code '{code}' — not in inventory_hold_code` |
| Nothing filled | `a hold needs a target — set a lot, a location, or a container` |
| More than one filled | `set exactly one of lot / location / container, not several` |
| Location of pick pallets | `location {loc} holds only open pick pallets: it takes no location hold (hold the pallet by its LPN)` |
| Nothing saved | `hold was not created` |
| Saving an existing hold without changing `Comments` or `Auto-release` | `inventory hold update requires comments or auto_release_date` |

> Not confirmed by code: how the window words an error from the server, and the text of the check on an empty `Reason code`. To verify: press `Save` with an empty form, and again with `Lot` and `Location` both filled, and read the message.

The date-time picker displays the warehouse user's timezone and posts an RFC 3339 UTC instant. This avoids shifting the scheduled moment when the browser and server use different timezones.

## What it affects

- Adds a row to `inventory_hold`. The hold shows in the [Holds list](20-holds-list.md) and the [On Hold tab](16-on-hold-tab.md).
- A hold with a blocking code lowers ATP of the covered balance rows to 0.
- A hold on a location may change the status of the location (`Ok`, `Hold`, `Damage`).

## Who can use it

`ADMIN` and `MANAGER`. The web action `generic_save` is open to more roles, but the API method `create_inventory_hold_row` is not. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Holds list](20-holds-list.md)
- [Placing a hold](41-placing-a-hold.md)
- [Changing the note of a hold](42-changing-the-note-of-a-hold.md)
- API: `create_inventory_hold_row` (used by the form), `update_inventory_hold`, `get_inventory_hold`. The same placing is available as `create_inventory_hold` (stateless command) and `release_inventory_hold` (stateless command).
- RF terminal: none.
