---
title: Location Settings
description: Create warehouse locations and configure routing, capacity, mixing and layout behavior.
sidebar_position: 4
last_update:
  date: 2026-11-05
---

# Location settings

A location is a scannable warehouse place: a rack position, pick face, station, staging area or another operational destination. Its settings decide which workflows may use it and what stock may land there.

Open **Sidebar > Warehouse Configuration > Topology > Locations**.

## Before you start

- Create the required putaway zones.
- Decide the location naming and walking sequence.
- Confirm the warehouse weight, volume and length units.
- Choose the correct location type for the intended workflow.
- Confirm your role has permission to maintain locations. Bulk generation is available to **Admin** and **Manager** roles by default.

Location codes are permanent. To rename a location, create the replacement, update the affected setup and stop using the old location after all stock and work have been cleared.

## Create one location

1. Click **New**.
2. Enter a unique **Code** that operators can scan reliably.
3. Select **Type** and **Putaway Zone**.
4. Complete the routing and stock-mixing settings.
5. Add dimensions, capacity and position data where the workflow uses them.
6. Click **Save**.
7. Reopen the location and confirm the saved values.

## Settings that control workflow

### Type

**Type** restricts which processes may use the location. Choose it for the real purpose of the place, not only for how it looks on the warehouse map.

Common storage types include:

- **PICK - Case**, **PICK - Piece**, **PICK - Pallets, storage**, **Sort station**, **Speed Line** and **Other** for eligible storage or processing destinations.
- **Pick-to**, **Staging**, **Door**, **Pack station**, **Consolidation station** and **Control station** for outbound hand-offs.
- **Quality control**, **Damage**, **Return to vendor**, **Customer returns**, **Lost** and **Destruction** for exception flows.
- **In transit (open pick pallets)** for the system-managed in-transit place. Do not create a second one or maintain it as an ordinary storage location.

A workflow can apply a narrower list than the general type permits. If a move is rejected, confirm both the source process and the destination type.

### Putaway Zone

**Putaway Zone** groups the location for putaway search, zone capacity, allocation filters, work areas, counts and the 3D warehouse view.

Changing the zone changes future decisions and moves the location's current occupancy into the new zone totals. It does not move the physical stock or repair active work automatically. Test the next putaway and allocation decision after a live change.

### Flag and Status

**Flag** is a temporary operational marker. A location whose flag is not **None** is excluded from normal putaway and new automatic work. A cycle count manages its own count flag; do not clear that flag manually while the count is open.

A flag does not by itself block a manual move. Holds control whether inbound or outbound movement is blocked or requires acknowledgement.

**Status** is read-only and is derived from active location holds:

- **Ok** — no enforcing hold applies.
- **Hold** — an enforcing hold applies.
- **Damage** — an active enforcing hold with the code **Damaged** applies.

Use [Hold and Release Stock](../13-inventory-control/04-hold-and-release-stock.md) to change the operational hold state.

### Processing Type, Category and ABC

- **Processing Type** classifies the handling level: pallet, case or piece. Putaway policies can use it as a condition.
- **Category** describes the storage equipment, such as shelving, pallet flow or selective shelving. Putaway and allocation rules can filter by it.
- **ABC** identifies the location speed class. Putaway and allocation rules can pair it with product classification.

These fields classify a location; they do not create work on their own.

### Level, Aisle and Bay

**Level**, **Aisle** and **Bay** describe the physical order of storage positions. Putaway ordering uses aisle, then bay, then level and code. **Aisle** sorts as text, so use fixed-width values such as `A02` and `A10`; **Bay** and **Level** sort numerically.

### Route Sequence

**Route Sequence** controls walking order for allocation, task claiming and pick routes. It is sorted as text, so use fixed-width values such as `0010`, `0020` and `0100`.

Putaway ordering does not use **Route Sequence**. Existing work is not rewritten when it changes, although later claiming and routing may use the new order.

## Stock and container rules

### Mix SKU

When **Mix SKU** is off, different SKUs for the same owner cannot share the location. Stock belonging to different owners is evaluated separately. Putaway destination selection also considers active inbound reservations, so it avoids directing incompatible stock to the same place.

Turning the setting off does not separate stock already mixed there. It prevents later incompatible landings.

### Mix Lot

When **Mix Lot** is off, different lots cannot share the location. This is the broad location-level rule and is stricter than an attribute rule that permits mixing.

Putaway destination selection considers stock already present and active inbound reservations. The landing check validates the actual destination again.

### Lot Commingle Rules

Use **Lot Commingle Rules** when mixing depends on one tracked lot attribute rather than the entire lot identity.

1. Open the location.
2. In **Lot Commingle Rules**, click **New**.
3. Select an **Attribute Code** used by the applicable lot policy.
4. Set **Allow Mix**.
5. Save the rule.

A location rule overrides the zone rule for the same attribute. Without a location rule, the zone rule applies. These rules compare attribute values on the destination LPN; **Mix Lot** off remains the stricter location-wide rule.

### Discard LPN

When **Discard LPN** is on, stock landing at the location becomes loose stock instead of keeping the incoming LPN. Normal putaway does not offer a discard-LPN location as a destination.

Use this only for a workflow that intentionally stores loose stock. Changing it affects later landings, not stock already present.

### Section

**Section** groups adjacent positions that can hold one oversize item across several places. Putaway can use the combined width and the shared depth and height to find a free section. After landing, the other positions are held so another item is not placed there.

Leave **Section** blank when the location is an independent position.

## Dimensions and capacity

Enter physical values in the warehouse's configured units. The location form converts supported length, weight and volume fields between stored values and warehouse display units.

| Setting | What it controls |
| :--- | :--- |
| **Length**, **Width**, **Height** | The physical fit check for a pallet or oversize section. A zero value means the dimension is not measured. |
| **Max Cube Capacity** | Maximum stock volume for the location. `0` means no limit. |
| **Max Weight Capacity** | Maximum stock weight for the location. `0` means no limit. |
| **Pallet positions on floor** | Number of floor positions used with **Stack limit**. |
| **Stack limit** | Maximum number of pallet tiers used with **Pallet positions on floor**. A product can impose a lower tier limit. |
| **Max quantity** | Quantity limit used by the putaway quantity check. It is a plain total across stock in the location. |

Putaway destination selection includes active reservations in weight, volume and mixing checks. Execution validates the physical destination again. A lower limit does not move existing stock out of the location; it can prevent the next landing.

## Position and 3D layout

**X Coord**, **Y Coord** and **Z Coord** place the location in the 3D warehouse view. They also help rank alternative locations during a redirect. Normal pick-route order still comes from **Route Sequence**.

Use a consistent coordinate scale across the warehouse. If every coordinate is zero, the map and distance-based redirect cannot distinguish nearby positions reliably.

## Checks tab

The read-only **Checks** tab shows recent operational evidence for the location, including completed counts, empty-location confirmations and reports of unexpected stock.

Use it to answer:

- when the location was last checked;
- who performed the check;
- whether the observed state agreed with system stock;
- whether a count was requested after a mismatch.

The tab is history, not a way to change stock. Start the relevant count, move or correction workflow to resolve a mismatch.

## Generate locations in bulk

Use **Generate** to create a regular range of locations.

1. Click **Generate**.
2. Define the aisle, level and location ranges and review the generated code pattern.
3. Set classification values such as type, zone, category, processing type, ABC and mixing rules.
4. Enter shared dimensions and capacity values.
5. Preview the result.
6. Create the locations only after the preview is correct.

The generator creates at most 10,000 locations in one run. It also assigns **Aisle**, **Level** and a zero-padded **Route Sequence**. It does not fill every advanced field; review section, stacking, quantity, bay and coordinate settings afterwards where they matter.

Generation is all-or-nothing. If a generated code already exists or another row is invalid, correct the request and run it again.

## Change a live location safely

1. Check stock, open tasks, reservations, counts and holds for the location.
2. Change one operational rule at a time.
3. Save and create a small representative transaction.
4. Confirm the next putaway, allocation, move or pick decision as applicable.
5. Keep the old location available until dependent work has been completed or redirected.

Do not delete a location that is still referenced by stock, work or warehouse setup. Clear those dependencies through their normal workflows first.

## Troubleshooting

| Symptom | What to check |
| :--- | :--- |
| Putaway does not offer the location | Confirm **Status** is **Ok**, **Flag** is **None**, **Discard LPN** is off, the type is eligible and the policy step searches the location or its zone. |
| A move is rejected | Confirm the destination type, active holds, location capacity and stock-mixing rules. |
| Pick order is unexpected | Check **Route Sequence** and use fixed-width values. |
| An item does not fit | Check dimensions, section membership, floor positions and stack limits on both the location and product. |
| Different products or lots cannot land together | Check **Mix SKU**, **Mix Lot**, then location and zone lot-attribute rules. |
| A generated range fails | Check the preview for duplicate codes, range size, required type and field lengths. |
| The 3D position looks wrong | Check coordinates, dimensions and the zone color. |

## Related guides

- [Putaway Overview](./00-putaway-overview.md)
- [Putaway Policy Steps and Criteria](./01-putaway-policy-steps-and-criteria.md)
- [Putaway Zone Settings](./02-putaway-zone-settings.md)
- [Reason Codes and Holds](./43-reason-codes-and-holds.md)
