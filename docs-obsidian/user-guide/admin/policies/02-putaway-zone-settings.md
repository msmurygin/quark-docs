---
title: Putaway Zone Settings
description: Configure destination, capacity, temperature and lot-mixing rules for a warehouse zone.
sidebar_position: 3
last_update:
  date: 2026-11-05
---

# Putaway zone settings

A putaway zone groups locations that follow the same storage rules. Configure the zone before you add it to a putaway policy.

This page covers settings used by current warehouse workflows. Printer routing is configured separately in [Printing and Labels](../07-printing-and-labels.md).

## Before you start

- Create the destination locations first.
- Decide which products may share a location or zone.
- Confirm the warehouse units used for weight and volume. Zone temperatures are entered in degrees Celsius.
- By default, an **Admin** or **Manager** can maintain zones. Custom permissions may change access.

Open **Sidebar > Warehouse Configuration > Topology > Putaway Zones**.

## Create a zone

1. Click **New**.
2. Enter a unique **Code** and a clear **Description**.
3. Complete the operational settings that apply to the zone.
4. Click **Save**.
5. Open the zone again and review the saved values before using it in a policy.

## General settings

| Setting | What it controls |
| :--- | :--- |
| **Picking To Location** | The fallback destination recorded when the system creates picking work from locations in this zone. At assignment, an order-specific destination takes precedence, followed by the owner's **Picking To Location**, then the task's recorded fallback. Changing the zone does not rewrite that stored fallback. |
| **Missing To Location** | The destination used when a pick-short reason is configured to move missing stock to the zone's missing location. A reason configured for a fixed destination uses that destination instead. |
| **Replenishment Allowed** | Whether replenishment planning may create work for locations in this zone. The change applies to a later planning run; it does not rewrite existing work. Location minimum, maximum and unit settings must also be configured. |
| **Color** | The color used for the zone in the 3D warehouse view. It does not change warehouse processing. |

Use active locations that match the intended workflow for **Picking To Location** and **Missing To Location**. After changing either setting, create a small test order and confirm the new work receives the expected destination.

## Capacity settings

Capacity limits help the putaway policy choose a destination and protect the zone when stock is moved there.

| Setting | Rule |
| :--- | :--- |
| **Max Cube** | Maximum occupied volume for the zone. `0` means no zone-level volume limit. |
| **Max Weight** | Maximum weight for the zone. `0` means no zone-level weight limit. |
| **Max Cases Count** | Maximum number of stock-bearing containers in the zone. `0` means no case-count limit. |

During putaway destination selection, weight and volume include stock already in the zone and active inbound reservations. The case count includes only containers already holding stock.

When the move is executed, the system checks physical occupancy again. This execution check does not add reservations. A move within the same zone skips the zone-level weight, volume and case-count checks; location-level limits still apply.

Enter weight and volume in the units configured for the warehouse. The form converts these physical values between warehouse display units and storage units. Use the same displayed units when comparing a zone limit with a product, pack or location limit.

Location limits still apply. A destination must pass both its own capacity rules and the zone rules.

## Temperature range

Set **Min Temperature** and **Max Temperature** when a putaway policy step enables the **Temperature** check.

- A blank lower or upper bound leaves that side of the range open.
- A product is eligible when its allowed temperature range overlaps the zone range.
- The setting selects storage destinations; it is not temperature monitoring or environmental control.
- Receiving and manual moves do not automatically apply this putaway-policy step.

## Lot-mixing rules

Lot-mixing rules decide whether stock with different values for a tracked lot attribute may share the destination LPN at a location in the zone.

1. Open the zone.
2. In the lot-mixing section, click **New**.
3. Select an **Attribute Code** used by the applicable lot policy.
4. Set **Allow Mix**:
   - **On** permits different values for that attribute on the destination LPN.
   - **Off** requires values on the destination LPN to match.
5. Save the rule.

Create no more than one rule for the same attribute in a zone.

The more specific rule wins:

1. A location rule for the same attribute overrides the zone rule.
2. Otherwise, the zone rule applies.
3. A location that does not allow mixed lots remains stricter than an attribute rule that permits mixing.

Changing a rule affects future landing decisions. It does not reorganize stock already stored in the zone.

## How a putaway policy uses the zone

A putaway policy evaluates its steps in order. Each step defines its own search space, such as one zone, one location or assigned slots, then applies that step's configured checks and ordering. The system reserves the first passing candidate; only when the step finds none does it continue to a later step.

Keep zone purpose narrow and visible in the description, for example ambient reserve, chilled pick face or returns review. This makes policy order and troubleshooting easier to understand.

## Change a live zone safely

1. Check active putaway, picking and replenishment work that references the zone.
2. Change one rule at a time.
3. Save and create a small representative transaction.
4. Confirm the destination and any generated work.
5. Monitor the next replenishment or putaway planning run.

Existing tasks retain the values recorded when they were created. A master-data change normally affects later decisions.

## Troubleshooting

| Symptom | What to check |
| :--- | :--- |
| No location is selected in the zone | Confirm the policy searches this zone, the locations are active, and the policy steps leave at least one eligible location. |
| Putaway finds no destination because of capacity | Check location and zone limits, existing stock and active inbound reservations used during destination selection. |
| A move is rejected for capacity | Check the destination's physical occupancy and its location and zone limits. Reservations are not added by the execution check. |
| Replenishment is not created | Confirm **Replenishment Allowed** is on and the destination location has valid minimum, maximum and unit settings. |
| The wrong pick destination appears | Check the order-specific destination, the owner's **Picking To Location**, the task's stored zone fallback and when assignment started. |
| Different lot values cannot share a destination | Check the location's lot-mixing setting first, then the location and zone attribute rules. |
| A temperature step finds no zone | Confirm the product and zone ranges overlap and both zone bounds are valid. |

## Related guides

- [Putaway Policy Steps and Criteria](./01-putaway-policy-steps-and-criteria.md)
- [Location Settings](./03-location-settings.md)
- [Replenishment Status](./35-replenishment-status.md)
- [Pick Short Reasons](./23-pick-short-reasons.md)
