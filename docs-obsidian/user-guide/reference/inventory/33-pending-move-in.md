# Pending Move-In

A **pending move-in** is space that putaway has promised to a pallet that is on its way. The space is reserved so that the next suggestion does not give it to another pallet. A reservation changes no balance.
The `Pending Move-In` screen lists the reservations and lets a supervisor release one that will never be used.
The form is `pending_move_in_list_form` (module `putaway_policy`). The data object is `inventory_pending_move_in_ui`, over the view of the same name. The list is read by `list_inventory_pending_move_in_ui`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Management & Control`, then `Inventory`.
3. Click `Pending Move-In`.

The sidebar item is `pending_move_in_menu` (tab `tab_pending_move_in`).

## Columns

All columns are read only. The list shows reservations of every status, newest expiry first (`Expires` is sorted from the latest).

| Label | Column | Type | Filter | Quick filter | What it shows |
|---|---|---|---|---|---|
| `LPN` | `lpn` | Text | Text | Yes | The code of the container the space is held for. |
| `Items` | `skus` | Text | Text | No | The SKUs now in that container (those with quantity above 0), separated by commas. |
| `Location` | `location` | Text, up to 20 characters | Text | Yes | The location where the space is held. |
| `Status` | `status` | Text | Set | Yes | `Active`, `Consumed`, `Cancelled` or `Expired`. See below. |
| `Held For` | `share_of` | Whole number | Number | No | Empty for an ordinary reservation and for the main one. For a reservation that holds a **neighbouring** position of an oversized load: the `Res #` of the main reservation. |
| `Expires` | `expires_at` | Date and time | Date | No | When an active reservation ends by itself. |
| `Cube` | `cube` | Decimal | Number | No | The volume held. |
| `Weight` | `weight` | Decimal | Number | No | The weight held. |
| `Res #` | `id` | Whole number | Number | No | The id of the reservation. |
| `Source` | `source` | Text | Set | No | What made the reservation: `Putaway`, `Replenishment` or `Move`. |

## Statuses

| Status | Meaning |
|---|---|
| `Active` | The space is held. It counts against the free space of the location. |
| `Consumed` | The pallet arrived and used the reservation. |
| `Cancelled` | Released by a person (`Release`). |
| `Expired` | The time ran out. |

Free space of a location is its capacity minus what is in it minus the cube and weight of its **active** reservations. A pallet is held at most once for one location while active (unique index `uq_inventory_pending_move_in_active_container_location`).

### Expires

The time is `now + the time to live`. The time to live is taken from the first of these that is set: the owner setting `putaway_reservation_ttl_min`, the system setting `PUTAWAY_RESERVATION_TTL_MIN`, its default value (column comment in `001_baseline.sql:2769`). A sweeper moves an active reservation whose time has passed to `Expired`. It is the only writer of `Expired`.

The setting `PUTAWAY_RESERVATION_TTL_MIN` is seeded with `Value` 15 and `Default Value` 15. So a new warehouse holds a reservation for 15 minutes unless the owner sets `putaway_reservation_ttl_min`. The sweeper runs every 5 minutes, so an expired reservation can show as `Active` for up to 5 minutes after its `Expires` time.

## Toolbar button

| Button | Needs | What it does |
|---|---|---|
| `Release` | One or more ticked rows (grey text `Select a reservation to release`) | Cancels the ticked reservations. |

`Release` is the web action `putaway_release_reservation`. It calls the API method of the same name **once for each ticked row**, with a new idempotency key each time.

- The method cancels the row **and** the neighbour rows that share its group (an oversized load holds one row for each position). The whole group is released together.
- Only `Active` rows are released. A row that is already `Consumed`, `Cancelled` or `Expired` is left as it is, and counts as "already gone". That is a normal answer, not an error.
- The location is offered again by the next putaway suggestion at once.

| Result | Message |
|---|---|
| Some released | `{n} reservation(s) released` and, if some were not active, `, {m} already consumed, cancelled or expired` |
| A call failed | `Release failed: {error}` (the rows released before it stay released) |
| No row ticked | A message that no row is selected |

See [Releasing a reservation](59-releasing-a-reservation.md).

## What it affects

- Changes `status` of the reservation to `Cancelled` and stamps `mod_who`. It changes no balance.
- Raises the free space of the location by the released cube and weight.

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`, `VIEWER`. `Release`: `ADMIN`, `MANAGER`, `SUPERVISOR`. `OPERATOR` has the API right but not the web action, so the button is refused for `OPERATOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Releasing a reservation](59-releasing-a-reservation.md)
- [Operator guide: Putaway](../../operator/05-putaway.md) (RF)
- [Move stock](17-move-stock-document.md) (a directed move consumes a reservation)
- API: `list_inventory_pending_move_in_ui`, `count_inventory_pending_move_in_ui`, `putaway_release_reservation` (stateless command)
- RF terminal: `Inventory > Putaway` (`PUTW01`, `PUTW02`, `PUTW03`, `PUTW_OVR`, `PUTW_DONE`) makes and consumes the reservations.
