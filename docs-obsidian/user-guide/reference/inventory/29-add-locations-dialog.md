# Add Locations window

The `Add Locations` form puts locations into an open count. It opens in the bottom part of the count document when you press `Add Locations` in the [locations list](28-count-locations-list.md).
The form is `inventory_count_add_locations_form`. The data object is `inventory_count_location_pick`. The button `Add` calls `inventory_count_add_locations`.

## Fields

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Locations` | `locations` | Pick list of locations (form `location_list_form`), several values, or typed | One of the two | Location codes. Several may be ticked in the list or typed, separated by commas. Hint: `Tick several in the list, or type codes separated by commas. Each is frozen for the count at once.` | The locations to count. |
| `Zones` | `zones` | Pick list of put-away zones (form `putawayzone_list_form`), several values, or typed | One of the two | Zone codes. Hint: `Every location of the zone that can be counted now is added — a full inventory. Busy ones are named and left out.` | Every location of each zone that can be counted now. |

The fields `ID` and `Count` are hidden. `Count` holds the count the window belongs to.
Typed values may be separated by commas, semicolons or spaces.

## Button

| Button | What it does |
|---|---|
| `Add` | Adds the locations and zones. On success it shows the message, goes back to the locations list and reads the count again. |

## Rules

`inventory_count_add_locations` works under the lock of the count (`crates/libs/wms-inventory/src/service/inventory_count/add_locations.rs`):

1. At least one location or zone: `choose the locations or the zones to add`.
2. The count must be `Open`: `the count is {status}, not open`.
3. A location chosen by code must exist and must not be of a type no count counts. Message: `cannot be frozen for a count (unknown, blocked or under another operation): {codes}`, and `never counted (lost stock or open pick pallets): {codes}`. The types never counted are `Lost` and `InTransit`.
4. A location chosen by code that **this** count already holds is passed over. One that **another count** holds refuses the whole command: `already being counted: {codes}`.
5. For a zone, only the locations that can be counted now are added. Busy ones (blocked, under another operation, counted elsewhere) are left out and named. A zone with nothing countable and no other locations chosen is refused: `nothing can be counted in zone(s) {zones}: every location is blocked or already being counted`.
6. If everything chosen was already in the count: `already in this count: {codes}`.
7. Each location added gets a task, is frozen (`Hard`) and has its stock read. The snapshot is what the counter is judged against.
8. A location can be frozen only when its status is `Ok` and its flag is `None` (or already `CycleCountActive`). A location with the status `Hold` or `Damage`, or with the flag `SanitationActive`, `MaintenanceActive` or `ReceivingHoldoff`, refuses the command with `cannot be frozen for a count ...` (`crates/libs/wms-lib-core/src/model/location.rs:1259-1300`). A `Soft` count applies the same test but freezes nothing.

Message on success: `{n} location(s) added to count {number}`. If some were left out: `; {m} passed over (busy or already in the count): {codes}` (the first 10 codes, then `and {k} more`). Failure: `Nothing was added: {error}`. If the count is not saved: `Save the count first`.

## What it affects

- Creates one count task per location and one Task Manager task of type `Count`.
- Freezes the locations of a `Hard` count with the flag `CycleCountActive`.
- Moves the version of the count.

## Who can use it

`ADMIN`, `MANAGER`, `SUPERVISOR`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Count locations](28-count-locations-list.md)
- [Adding locations to a count](52-adding-locations-to-a-count.md)
- API: `inventory_count_add_locations` (stateless command)
- RF terminal: none; the counter gets the locations on `CNT00`.
