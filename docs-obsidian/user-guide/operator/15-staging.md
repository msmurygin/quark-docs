# Staging outbound units

## What you will do

Move a picked pallet or container to the Stage location selected for its delivery stop. The system first records where the unit should go; an operator then confirms the physical move.

## Before you start

- Picking or packing for the unit is complete.
- The order belongs to a planned Dispatch and a valid delivery stop.
- The root pallet or container has been assigned to that Dispatch.
- A supervisor is available when the unit has no Stage choice yet.

The preferred Stage selected when the order is added to a Dispatch is a route preference. A newly completed physical unit can still show **Stage Choice Required** and need the supervisor step below.

## Choose the Stage — supervisor

Use these steps only when the operator sees **Stage Choice Required**.

1. Sign in with a supervisor account.
2. Open **Stage**.
3. Select **Choose Stage (Supervisor)**.
4. Scan the root pallet or container.
5. Review its Dispatch, stop and current location.
6. Scan or enter the Stage location.
7. Confirm the choice.

The terminal says that the Stage was chosen and that stock was not moved. This is expected: the choice is a routing decision, not a physical stock movement.

## Confirm the physical move — operator

1. Open **Stage**.
2. Select **Confirm Stage**.
3. Scan the root pallet or container.
4. Review **From** and **Go to**. Move the unit to the location shown under **Go to**.
5. Scan the destination Stage location.
6. Confirm when the terminal asks for confirmation.

The terminal confirms that the unit is staged. The Dispatch now shows the unit at the Stage location.

## What you should see

- The same root LPN remains with the unit throughout staging.
- The chosen Stage belongs to the unit's Dispatch stop.
- Choosing a Stage does not change physical inventory.
- Confirming the destination scan moves the unit from its previous location to Stage.
- A staged unit becomes eligible for a reviewed Load Plan when it is not held and its required packing is complete.

## If something goes wrong

| Message or situation | What to do |
|---|---|
| The unit requires transport intent on a planned Dispatch with a valid stop | Ask the planner to add the order to a planned Dispatch and assign this root LPN to the correct stop. Then scan it again. |
| **Stage Choice Required** | Ask a supervisor to use **Choose Stage (Supervisor)**. Scan the unit again after the choice is saved. |
| **No permission: Choose Stage (Supervisor)** | Return to the operator flow. A supervisor must make this choice. |
| The proposed Stage is not where the unit should go | Do not move it. Ask the supervisor to review the Dispatch stop and Stage assignment. |
| The destination scan does not match **Go to** | Move to and scan the location shown on the terminal; do not confirm another location. |
| The unit is held | Leave it in its current controlled location and follow the site's hold-resolution process. |

## Related guides

- [Picking](09-picking.md)
- [Packing, verify and repack](10-packing-verify.md)
- [Loading and shipment](16-loading-and-shipment.md)
- [Dispatch, loading and Goods Issue](../admin/06-outbound-setup.md#10-dispatch-loading-and-goods-issue)
