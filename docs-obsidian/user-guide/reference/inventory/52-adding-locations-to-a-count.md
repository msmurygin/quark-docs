# Adding locations to a count

Use this page to put locations into an open count: single locations, or whole zones (a full inventory).

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`.
- The count is saved and its status is `Open`.
- The locations are not being counted by another count.

## Steps

1. Open the count (click it in the list).
2. In the bottom list click `Add Locations`. The [Add Locations window](29-add-locations-dialog.md) opens.
3. To add single locations, tick them in the pick list `Locations`, or type their codes separated by commas.
4. To add zones, tick them in `Zones`. Every location of the zone that can be counted now is added.
5. Click `Add`. The window closes and the list shows the new rows.

## What the screen says

| Result | Message |
|---|---|
| Added | `{n} location(s) added to count {number}` and, if some were left out, `; {m} passed over (busy or already in the count): {codes}` |
| Nothing chosen | `Nothing was added: choose the locations or the zones to add` |
| Another count has a location | `Nothing was added: already being counted: {codes}` |
| Cannot be frozen | `Nothing was added: cannot be frozen for a count (unknown, blocked or under another operation): {codes}` |
| Never counted | `Nothing was added: never counted (lost stock or open pick pallets): {codes}` |
| Whole zone busy | `Nothing was added: nothing can be counted in zone(s) {zones}: every location is blocked or already being counted` |
| All already in | `Nothing was added: already in this count: {codes}` |
| Count not open | `Nothing was added: the count is {status}, not open` |

## What changes

| What | Change |
|---|---|
| Counting rows | One for each added location: status `Open`, attempt 1. |
| Location | A `Hard` count freezes the location with the flag `CycleCountActive`. Movement, allocation, putaway and picking then leave it alone. A `Soft` count freezes nothing. |
| Snapshot | The stock of the location is read and stored. It is what the counter is judged against. For a count of the item only, only the item's stock is stored. |
| Task Manager | One task of type `Count` for each location. It appears on the task board and is given to a counter. An `Event` count's tasks go first. |
| Count | The version goes up. |

## Related pages

- [Add Locations window](29-add-locations-dialog.md)
- [Count locations](28-count-locations-list.md)
- [Removing a location from a count](53-removing-a-location-from-a-count.md)
- API: `inventory_count_add_locations` (stateless command)
- RF terminal: `Inventory > Count location` gives the counter the next location (`CNT00`).
