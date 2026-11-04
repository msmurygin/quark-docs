---
slug: /operator/consolidation/
sidebar_position: 10.5
---

# Consolidate packed boxes onto outbound pallets

## What you will do

At a consolidation station, place packed boxes onto an outbound pallet, remove
a box while the pallet is still open, and close the pallet when it is ready for
staging. A supervisor can reopen a closed pallet only while no later shipping
step has taken it.

## Before you start

- The work area has a **Consolidation Station** location.
- Packing has sent the boxes to that station.
- By default, each box belongs to an order with a Dispatch and delivery stop.
- The pallet label identifies a usable outbound pallet.
- Use **Reopen Pallet (Supervisor)** only with an authorised supervisor account.

## Build a pallet

1. From **Main Menu**, open **Consolidation** (`CONM`).
2. Select **Build Pallet**.
3. On **Consolidation Station** (`CON01`), scan **Station**.
4. On **Build Pallet** (`CON02`), scan **Box**, then **Pallet**.
5. Continue scanning one box at a time. The last pallet is offered again for
   the next box.

For a routed box, the first box fixes the pallet's owner, Dispatch and stop.
Later routed boxes may come from different orders only when they have the same
owner, Dispatch and stop.

The `CONSOLIDATION_UNROUTED_BOXES` system setting controls boxes whose orders
do not have a Dispatch yet:

- **Refuse** is the default. The box waits until its order has a route.
- **OneOrder** allows the first unrouted box to open a pallet for its own order.
  Every later unrouted box on that pallet must have the same owner and order.

Do not mix a routed pallet with an unrouted order pallet.

When the `CONSOLIDATION_AUTO_CLOSE` system setting is **On**, the pallet closes
after the scan that puts every expected box on it, or when its gross-weight
limit is reached. The terminal says why it closed. With the setting **Off**,
close it manually.

## Take a box off an open pallet

1. Open **Consolidation > Take Box Off**.
2. On **Take Box Off** (`CON04`), scan **Box**.
3. Confirm that the message names the pallet and the number of boxes left.

The box remains at the consolidation station and waits to be placed again. A
box cannot be removed from a closed pallet.

## Close a pallet manually

1. Open **Consolidation > Close Pallet**.
2. On **Close Pallet** (`CON03`), scan **Pallet**.
3. Review **Pallet**, **Order** and **Boxes** on `CON05`.
4. Scan the same pallet again under **Scan pallet**.

If a box was added or removed after the review screen opened, the terminal says
**Pallet changed - scan it again**. Return to `CON03`, scan the pallet again and
review the current box count before closing it.

## Reopen a pallet — supervisor

1. Open **Consolidation > Reopen Pallet (Supervisor)**.
2. On **Reopen Pallet** (`CONR01`), scan the closed pallet.
3. Review **Pallet**, **Order** and **Boxes** on `CONR02`.
4. Scan the same pallet again under **Scan pallet**.

The pallet becomes open and can accept or release boxes again. It cannot be
reopened after it has been staged or committed to a load plan.

## What you should see

- A repeated scan of a box already on the same pallet does not add it twice.
- An open pallet shows its current box count.
- A closed pallet accepts no more boxes.
- The closed pallet is ready for the staging process.

## RF screen map

| Screen | Title | Used for |
|---|---|---|
| `CONM` | **Consolidation** | Choose the consolidation action. |
| `CON01` | **Consolidation Station** | Scan the station before building a pallet. |
| `CON02` | **Build Pallet** | Scan a box and its outbound pallet. |
| `CON04` | **Take Box Off** | Remove a box from an open pallet. |
| `CON03` | **Close Pallet** | Scan the pallet to review it. |
| `CON05` | **Close Pallet** | Review and scan the same pallet again. |
| `CONR01` | **Reopen Pallet** | Scan a closed pallet as a supervisor. |
| `CONR02` | **Reopen Pallet** | Review and scan the same pallet again. |

## If something goes wrong

| Message or situation | Meaning | What to do |
|---|---|---|
| **location {station} is not a consolidation station** | The scanned location has another type. | Scan the configured Consolidation Station. |
| **box {code} does not wait for consolidation at {station}** | The box is at another step or station. | Check the box route and physical location before scanning again. |
| **box {code} has no route yet: its order is on no dispatch** | The order is not assigned to a Dispatch and the unrouted-box setting is **Refuse**. | Ask the shipping planner to assign the order, or ask an administrator whether the warehouse should allow **OneOrder**. |
| The pallet belongs to another owner, Dispatch or stop | This box cannot travel on that pallet. | Use a pallet for the same owner, Dispatch and stop. |
| **pallet {pallet} is closed: it takes no more boxes** | The pallet was already closed. | Use another open pallet, or ask a supervisor to reopen it if no later step has taken it. |
| **box {code} is already on pallet {pallet}** | The box is on a different pallet. | Remove it from the open pallet first, then place it on the correct pallet. |
| **pallet {pallet} has no boxes on it** | An empty pallet cannot be closed. | Add at least one eligible box. |
| **pallet {pallet} is already taken further (staged or planned for loading): it cannot be reopened** | Staging or load planning has committed the pallet. | Resolve it in the downstream shipping process; do not reopen it. |

## Related guides

- [Packing, verify and repack](10-packing-verify.md)
- [Staging outbound units](15-staging.md)
- [Loading and shipment](16-loading-and-shipment.md)
- [Consolidation Stations board](../admin/06a-consolidation-board.md)
