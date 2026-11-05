---
title: "Putaway Policy Steps and Conditions"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-11-05
---

# Putaway policy steps and conditions

A putaway policy tells Quark where to look for a pallet's destination and which
locations are acceptable. Quark evaluates the saved steps from top to bottom.
The first step that can reserve an eligible location wins.

Use this page with the [putaway overview](00-putaway-overview.md), the
[zone settings](02-putaway-zone-settings.md) and the
[location settings](03-location-settings.md).

## Before you start

- Open **Sidebar > Warehouse Configuration > Policies > Putaway Policy**.
- Prepare the destination zones and locations before you build the policy.
- Make sure each SKU has a putaway policy or its owner has a default.
- Complete SKU, pack and location dimensions before enabling capacity checks.
- Use an LPN with realistic stock for the dry run.

By default, administrators, managers and supervisors can maintain policies and
use the dry run. Operators and viewers can read them. Custom role permissions
can change this access.

## Create the policy

1. Open **Putaway Policy** and create a row.
2. Enter a unique **Code** of up to 10 characters.
3. Add an optional **Description** that explains the intended stock or area.
4. Save the policy.
5. Open it and add the steps described below.

The code becomes read-only after creation. A policy that is still assigned to a
SKU or used as an owner's default cannot be deleted. Point those records to a
different policy first. Existing destination reservations remain valid after a
policy is changed or deleted.

## How a step works

Each step answers four questions:

1. **Does this step apply to the pallet?** The guard and product conditions
   decide.
2. **Where should Quark search?** The destination scope and its zone or location
   decide.
3. **Which candidate should be tried first?** Ordering controls the sequence.
4. **Can the pallet land there?** Occupancy, temperature, capacity, location
   settings, holds and active reservations decide.

Drag steps into the required order. Quark numbers new steps in increments so
they can be reordered later. A step changed by another administrator must be
reloaded before you save over it.

## Destination fields

| Field | Choices | Effect |
|---|---|---|
| **Mode** | **Suitable**, **Consolidate** | **Consolidate** considers only locations already holding or expecting the same owner and SKU. |
| **Destination** | **Zone from the SKU**, **Zone named on this step**, **Location named on this step**, **Location from the SKU**, **Assigned slot** | Chooses the search area. A named zone or location must also be selected on the step. |
| **Guard** | **No guard**, **Stay in the source zone**, **Stay in the source location** | Limits when the step applies according to the pallet's current position. A guard skips the step; it does not force the destination to remain there. |
| **Ordering** | **Pick route**, **Nearest to the assigned slot** | Chooses which eligible location is tried first. Nearest ordering is for a zone search and needs a measured assigned slot for the SKU. |

### Destination choices

- **Zone from the SKU** searches the putaway zone selected on the SKU.
- **Zone named on this step** searches the zone selected in **Zone**.
- **Location named on this step** checks only the selected **Location**.
- **Location from the SKU** checks the putaway location selected on the SKU.
- **Assigned slot** checks the SKU's assigned pick locations in
  route order. The location's maximum quantity is always enforced. A pallet is
  not split between locations.

All candidates still have to pass location status, location type, holds,
mixing and capacity rules. A destination choice never bypasses those checks.

### Mode and occupancy interactions

**Consolidate** cannot be combined with **Must be empty**. Consolidation needs
a location that already contains, or has an active reservation for, the same
owner and SKU.

The pallet's current location can be suggested if it is otherwise eligible. If
the business process requires the pallet to move elsewhere, narrow the search
area or add a guard and conditions that express that rule.

## Location occupancy

Choose one of these options on the step:

| Choice | Result |
|---|---|
| **Any occupancy** | The step adds no extra mixing rule. The location, lot and LPN rules still apply. |
| **Must be empty** | The location must have no stock, no container and no active reservation for another pallet. An empty LPN still occupies the location. |
| **Allow mixing, with rules** | Use **Mixed SKU** and **Mixed lot** to narrow what may share the location. |

For **Mixed SKU**, **Not allowed** means the destination may contain only one
owner-and-SKU combination after the pallet arrives. The same SKU owned by two
owners counts as two products.

For **Mixed lot**, **Not allowed** means one SKU and one lot per location. You
must also set **Mixed SKU** to **Not allowed**. A step can make a location more
restrictive, but it cannot permit mixing that the location or lot rules forbid.

Changes affect the next destination suggestion. They do not rearrange stock
that is already stored.

## Temperature and capacity

Enable only the checks supported by your master data.

| Check | What Quark compares |
|---|---|
| **Temperature** | The destination zone range and every SKU temperature range on the pallet. The ranges must overlap. |
| **Cube** | The pallet cube plus committed stock against the location and zone limits. |
| **Weight** | The pallet weight plus committed stock against the location and zone limits. |
| **Pallet dimensions** | Pallet footprint and height against the location dimensions; both pallet orientations are considered. |
| **Stacking limit** | The number of pallet positions against the location limit and the item's lower limit, when present. |
| **Quantity** | The resulting quantity against the location maximum. |

A missing limit or measurement means that particular comparison cannot prove
the pallet does not fit. The dry-run trace identifies checks that were offered
without a usable limit or measurement. Treat that as a master-data task rather
than as proof that the location has unlimited capacity.

Quark also enforces checks that are not switches on the step, including active
holds, usable location status, LPN rules, location mixing rules and reservations
made for other pallets.

## Conditions

A condition narrows when a step applies or which locations it may consider.
Conditions on one step are combined with **and**. Multiple selected values
inside one condition use **is one of** or **is not one of** according to the
selected operator.

### Location conditions

| Condition | Typical use |
|---|---|
| **Location type** | Send pallets only to storage, case-pick or another allowed type. |
| **Location status** | Putaway candidates are fixed at **Status = Ok**. This condition cannot widen that gate; a conflicting condition is refused. |
| **Location category** | Separate operational categories such as reserve or forward pick. |
| **Processing type** | Select locations prepared for the required handling process. |
| **Location flag** | Putaway candidates are fixed at **Flag = None**. This condition cannot widen that gate; a conflicting condition is refused. |
| **Location ABC** | Match the location's ABC class. |
| **Mixed SKU** | Match the location's own SKU-mixing setting. |
| **Mixed lot** | Match the location's own lot-mixing setting. |
| **Location attribute** | Match a configured text attribute and value. |

### Product and lot conditions

| Condition | Typical use |
|---|---|
| **SKU ABC** | Route fast or slow movers to different areas. |
| **SKU group** | Route a customer-defined SKU group. Values are case-sensitive. |
| **SKU class** | Route a customer-defined product class. Values are case-sensitive. |
| **Putaway class** | Apply a step to the configured putaway class. The class alone does not add mixing rules. |
| **Rotation** | Separate FIFO, LIFO or FEFO products. |
| **Pallet fullness** | Send full pallets to storage and partial pallets to pick locations. |
| **Lot attribute** | Match a lot attribute such as an allergen or quality grade. |
| **SKU attribute** | Match a text attribute defined for the SKU. |

If any line on the pallet fails a product or lot condition, Quark skips the
step. Missing SKU class, group or rotation data does not by itself reject the
step. A missing value for an attribute condition does: the condition asked for
a recorded value and none was available.

Create at most one condition for the same property and attribute on one step.
When you change the property, review its values; values that belong to the old
property are not valid for the new one.

## Evaluation and reservations

For each applicable step, Quark checks candidates in the selected order. A
zone step evaluates up to 100 candidates. If none passes, evaluation continues
with the next step. When a location passes, Quark records the pallet's promise
to that location. Future suggestions count the promised pallet occupancy,
positions, cube, weight and mixing. Another pallet may still use the same bulk
location when the remaining limits and mixing rules allow it.

The default reservation time is controlled by **PUTAWAY_RESERVATION_TTL_MIN**
in **System Settings**. **Putaway Reservation TTL (min)** on the owner can
override it for that owner's stock. Expired reservations are released
automatically.

If another request is changing the same pallet or location, Quark may ask the
operator to try again. Reload the current state before changing the policy in
response; a concurrent reservation is not evidence that the policy is wrong.

## Test with Dry run

The **Dry run** panel evaluates the saved policy against a real LPN without
reserving or moving stock.

1. Save every policy change you want to test.
2. Open **Dry run**.
3. Enter the **LPN / container**.
4. Select **Evaluate**.
5. Confirm that the LPN resolves to this policy.
6. Review the winning step and candidate location, or the steps that were
   skipped or exhausted.
7. Correct policy or master data, save and evaluate again.

The result explains whether a guard or condition skipped the step, whether no
zone or location was available, which checks refused candidates and which
measurements were missing. Because the dry run uses current stock and active
reservations, repeat it when those conditions change.

## Troubleshooting

| Symptom | Check |
|---|---|
| No putaway policy | Assign a policy to every SKU on the LPN, or configure the owner's default. |
| SKUs on one LPN resolve to different policies | Split the LPN or align the SKU and owner policy assignments. |
| Step is skipped | Review its guard, product conditions, destination zone or location, and temperature range. |
| No candidate is accepted | Review holds, location status and type, occupancy, mixing, capacity and active reservations. |
| **Nearest to the assigned slot** finds nothing | Confirm the SKU has one measured assigned slot and the step searches a zone. |
| **Assigned slot** finds nothing | Confirm the SKU has an assigned pick location with enough remaining maximum quantity. |
| Save reports a stale version | Another administrator saved first. Reload, compare and apply the change again. |
| Delete is refused | Remove the policy from SKUs and owner defaults before deleting it. |

## Related guides

- [Putaway overview](00-putaway-overview.md)
- [Putaway zone settings](02-putaway-zone-settings.md)
- [Location settings](03-location-settings.md)
- [Owner settings and policy selection](41-owner-settings-and-policy-resolution.md)
- [SKU-level settings](34-sku-level-settings.md)
