# Monitor consolidation stations

## What you will do

Use the web board to see what is waiting at each consolidation station, inspect
open and closed pallets, close an open pallet, or reopen a closed pallet before
it moves downstream.

## Before you start

- Create a location of type **Consolidation**.
- Set that location as **Consolidation Station** on each work area that sends
  packed boxes there.
- Operators build pallets on the RF terminal.
- Reopening requires an Admin, Manager or Supervisor role.

## Open the board

1. Open **Sidebar > Warehouse Configuration > Work Areas & Equipment >
   Consolidation Stations**.
2. Review **Station**, **Work Areas**, **Boxes Waiting**, **Open Pallets** and
   **Closed Pallets**.
3. Open a station row.

The station card has two read-only lists:

- **Pallets**: **Pallet**, **Status**, **Order**, **Dispatch**, **Stop**,
  **Destination**, **Boxes** and **Closed At**.
- **Boxes Waiting**: **Box**, **Order** and **On Pallet**.

Use **Refresh** when floor work has changed while the card is open.

## Close or reopen a pallet

1. Tick exactly one pallet in **Pallets**.
2. For an open pallet, click **Close Pallet**. For a closed pallet, click
   **Reopen**.
3. Check the confirmation message and refreshed list.

Unavailable buttons are disabled until one pallet with the required status is
selected. If the pallet changed after the row was loaded, tick it again and
retry after the list refreshes.

Reopening is refused after staging or a frozen load plan has taken the pallet.

## Configure automatic closing

In **System Settings**, find `CONSOLIDATION_AUTO_CLOSE` and set its value to
**On** when a pallet should close after the last expected box arrives or its
gross-weight limit is reached. Leave it **Off** when the operator must close
every pallet explicitly.

Automatic closing by weight needs enough item and handling-unit weight data to
calculate the pallet's gross weight. If a weight is unknown, that reason cannot
close the pallet; the all-boxes rule can still close it.

## What this affects later

A closed pallet can proceed to staging, load planning and loading. Reopening is
therefore limited to pallets that are still at consolidation and have no later
shipping commitment.

## Related guides

- [Consolidate packed boxes onto outbound pallets](/docs/operator/consolidation/)
- [Outbound Setup](06-outbound-setup.md)
- [Staging outbound units](../operator/15-staging.md)
