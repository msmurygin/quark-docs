# Releasing a reservation

Use this page when a pallet will not arrive at the location that putaway reserved for it, and you do not want to wait for the reservation to run out.

## Before you start

- You are `ADMIN`, `MANAGER` or `SUPERVISOR`. `OPERATOR` has the API right but not the web action, so the button is refused for `OPERATOR`.
- You looked at the row: `LPN`, `Location`, `Status`, `Expires`. Only `Active` reservations are released.

## Steps

1. Open `Inventory Balances > Pending Move-In`.
2. Tick one or more reservations. Use the quick filters `LPN`, `Location` or `Status` to find them.
3. Click `Release`.

## What the screen says

| Result | Message |
|---|---|
| Released | `{n} reservation(s) released` |
| Some were not active | `{n} reservation(s) released, {m} already consumed, cancelled or expired` |
| A call failed | `Release failed: {error}` (the rows released before it stay released) |

If you tick a row that is already `Consumed`, `Cancelled` or `Expired`, the answer says "already ..." and nothing happens to it. That is normal. The sweeper may have reached it first.

## What changes

| What | Change |
|---|---|
| Reservation | `Cancelled`, and `mod_who` is stamped. The neighbours of an oversized load (rows that hold a position for it) are released with it. |
| Location | The held cube and weight are free at once. The next suggestion may offer the location. |
| Balances | Nothing. |

The method does not need the version of the row: "release this reservation" does not depend on what the screen showed.

## Related pages

- [Pending Move-In](33-pending-move-in.md)
- [Who can do what](91-who-can-do-what.md)
- API: `putaway_release_reservation` (stateless command). Needs an idempotency key; the screen makes a new one for each row.
- RF terminal: `Inventory > Putaway` (`PUTW03` with `Esc` also releases the reservation of the pallet).
