# Changing a hold note or release schedule

Use this page to change the free text (`Comments`) or optional `Auto-release` instant of a hold that is on. The reason code and target never change.

## Before you start

- You are `ADMIN` or `MANAGER`. `update_inventory_hold` is open only to them by default.
- The hold is on. A released hold is not in the list.

## Steps

1. Open `Management & Control > Inventory > Holds`.
2. Click the hold in the list. The [hold form](21-hold-form.md) opens. `Reason code`, `Lot`, `Location` and `Container (LPN)` are grey.
3. Change `Comments`, set `Auto-release`, or clear the date to remove the schedule.
4. Click `Save`.

## What changes

Only `comments` and `auto_release_date` of the row of `inventory_hold`. An empty note clears the text; an empty date clears the schedule. A call without either field is refused: `inventory hold update requires comments or auto_release_date`.

The update uses the model's normal audit and integration-event path. It cannot set `is_hold_on`, release actors, or lifecycle timestamps.

## Related pages

- [Hold form](21-hold-form.md)
- [Placing a hold](41-placing-a-hold.md)
- API: `update_inventory_hold`, `get_inventory_hold`
- RF terminal: none.
