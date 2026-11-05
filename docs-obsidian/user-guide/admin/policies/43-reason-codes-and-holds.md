---
title: "Reason Codes, Holds and Handling Unit Types"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-11-05
---

# Reason Codes, Holds and Handling Unit Types

Reason codes explain why warehouse stock was blocked, adjusted, received short
or reported damaged. The code selected by an operator can also decide whether a
process is allowed, requires confirmation or must stop.

This guide covers the reference data that administrators maintain and the
operational effect of its main settings.

## Before you start

- Use clear English codes and descriptions that operators and supervisors can
  understand without a separate key.
- Agree who may create codes, who may apply them and who may release them.
- Test every new blocking code in receiving, movement, allocation and picking
  before using it on live stock.
- Do not delete or rename a code that is already in use. Retire it only after
  the warehouse has a replacement process.

## Code lists

Open `Sidebar > Warehouse Configuration > Settings & Reference Data > Code
List` to review the lists available to the warehouse.

Each value has a **Code**, **Description**, **Active** state and display order.
Some lists are editable; others are fixed because the warehouse process accepts
only the supplied values.

Turning **Active** off prevents the value from being selected for new work. It
does not rewrite documents or history that already use the code.

## Hold codes

A hold blocks or warns about work involving an LPN, lot or location. Hold-code
settings decide whether stock may be put into the held place, taken from it, or
used by outbound planning.

- Configure codes at `Sidebar > Warehouse Configuration > Reason Codes > Hold
  Codes`.
- Apply and release holds at `Sidebar > Management & Control > Inventory >
  Holds`.
- **Admin** and **Manager** maintain hold codes.
- A hold may cover one LPN, one lot or one location.

For the operator workflow, see [Hold and release stock](../13-inventory-control/04-hold-and-release-stock.md).

### Hold-code fields

| Field | Meaning |
|---|---|
| **Code** | Stable name recorded on the hold. Do not rename a code already in use. |
| **Description** | Plain-language explanation shown to warehouse users. |
| **Rank** | Required reference value. It does not set display order or blocking priority. |
| **Enforce** | Controls whether interactive receiving and movement checks warn or block in the selected directions. Automatic availability and outbound checks use **Active** and **Blocks taking** instead. |
| **Overridable** | When on, an authorised workflow may ask for confirmation instead of stopping. It does not make held stock available to automatic allocation. |
| **Blocks putting** | Prevents receiving or moving stock into the held place. |
| **Blocks taking** | Prevents taking, allocating or picking stock from the held place. |
| **Active** | When off, the code cannot be used as an active blocking rule for new work. Release existing holds separately. |

### Interactive receiving and movement checks

| Active and Enforce | Applies to the direction | Overridable | Result |
|---|---|---|---|
| Off | Any | Any | The interactive receiving or movement check continues. |
| On | No | Any | The operation continues in that direction. |
| On | Yes | On | The interactive workflow may show a warning that requires confirmation. |
| On | Yes | Off | The operation is blocked. |

Automatic availability, allocation, final pick-source and handling-unit checks
have no operator warning to confirm. They use **Active** and **Blocks taking**,
not **Enforce** or **Overridable**. An active hold with **Blocks taking** on
therefore removes the covered stock from available outbound quantity even when
**Enforce** is off or **Overridable** is on.

A location hold can also make the location unavailable for candidate selection.
Do not rely on **Blocks taking** alone to keep an enforcing held location in the
pick or putaway pool.

### Reference hold codes

The warehouse reference data includes these codes. Review their flags before
go-live; customer processes may require additional approved codes.

| Code | Typical use | Putting | Taking | Overridable |
|---|---|---:|---:|---:|
| `None` | No hold | Does not enforce | Does not block | No |
| `Ok` | Released or no active hold | Does not enforce | Does not block | No |
| `PIHold` | Physical inventory or cycle count | Block | Block | Yes |
| `QcRequired` | SKU requires quality review at receipt | Block | Block | Yes |
| `NewItem` | First-receive supervisor review | Block | Block | Yes |
| `NotHold` | Explicit no-hold choice | Does not enforce | Does not block | No |
| `QcQuarantine` | Waiting for a quality decision | Block | Block | Yes |
| `Customs` | Waiting for customs clearance | Block | Block | Yes |
| `CustomerReturn` | Returned stock waiting for inspection | Block | Block | Yes |
| `Expired` | Past expiration date | Block | Block | Yes |
| `Damaged` | Physical damage detected | Allow | Block | No |
| `Rtv` | Waiting for return to vendor | Block | Block | No |
| `Destroy` | Waiting for destruction | Block | Block | No |
| `Lost` | Stock missing after a count | Block | Block | No |
| `Other` | Approved catch-all when no specific code fits | Block | Block | Yes |
| `LocBlocked` | Administrative location block | Block | Block | No |

`Damaged` allows putting so damaged stock can be moved into the damage area. It
still blocks taking so the stock cannot be selected for shipment.

### What holds affect

| Process | What the hold can do |
|---|---|
| Receiving | A hold on the destination location may warn or refuse the receipt, depending on **Blocks putting** and **Overridable**. |
| Stock movement | A hold on the source can block taking; a hold on the destination can block putting. An overridable code may require confirmation. |
| Availability and allocation | An active hold with **Blocks taking** on removes covered stock from available outbound quantity. |
| Picking | Held stock is not offered as new work. A final source check prevents held goods from being picked. |
| Putaway | An enforcing location hold can remove the location from destination candidates. |
| Handling units | A held box, pallet or carrier cannot be selected for outbound work that takes stock from it. |

### Change a hold code safely

1. Find active holds that use the code.
2. Review the effect on putting, taking, allocation and location availability.
3. Change one flag at a time and test the affected workflows.
4. Release holds through the normal hold workflow when stock should become
   available again.
5. Keep the code inactive rather than deleting it when historical records use
   it.

Changing a code affects the next warehouse check. Existing holds keep the same
code until they are released.

## Inventory adjustment reasons

Open `Sidebar > Warehouse Configuration > Reason Codes > Adjustment Reasons`.

Adjustment reasons control whether a document may add stock, remove stock,
requires a comment, requires approval and requests a count after posting.

| Reason | Adds stock | Removes stock | Comment | Approval |
|---|---:|---:|---:|---:|
| `DAMAGE` | No | Yes | No | No |
| `FOUND` | Yes | No | No | No |
| `LOST` | No | Yes | No | No |
| `COUNT_VARIANCE` | Yes | Yes | No | No |
| `ERP_RECONCILIATION` | Yes | Yes | No | Yes |
| `DATA_FIX` | Yes | Yes | Yes | Yes |
| `QUALITY` | No | Yes | No | No |
| `EXPIRY` | No | Yes | No | No |
| `CUSTOMER_REQUEST` | Yes | Yes | Yes | No |
| `OTHER` | Yes | Yes | Yes | Yes |
| `REVERSAL` | Yes | Yes | Yes | No |

Select one reason and use **Count After Posting** or **Do Not Count** to control
whether affected locations receive count work after posting. **Admin** and
**Manager** can approve adjustments whose reason requires approval.

See [Adjust stock](../13-inventory-control/01-adjust-stock.md) for the complete
document workflow.

## Receiving and damage reasons

Receiving uses several separate reason families. Do not substitute one for
another.

| Reason family | Used for | Reference values |
|---|---|---|
| Shortage reason | Receiving less than the expected ASN quantity. | `SupplierShort`, `InTransitLoss`, `CountError`, `DamageInTransit`, `Other` |
| Quantity-adjust reason | Correcting a previously received quantity. | `Mistake`, `OverScan`, `Damaged`, `SupplierAdj`, `Other` |
| Damage severity | Classifying the extent of damage. | `Cosmetic`, `Minor`, `Major`, `Total` |
| Damage reason | Explaining the physical problem. | Examples include `ScratchedPack`, `Torn`, `Crushed`, `Wet`, `TempBreach`, `Contamination`, `Spoilage` and `Other`. |
| Damage action | Applying the owner's immediate response. | `None`, `Hold`, `Reject` |

Only active values are offered for new receiving work. Editable lists may be
maintained by the warehouse; fixed lists cannot. Retiring an editable value does
not change previously recorded receipts or damage reports.

Owner receiving settings choose the immediate action for minor, major and total
damage. An **Admin** or **Manager** can later record the final disposition
through the supported API workflow. **Write Off** removes the damaged quantity
from physical inventory and releases its `Damaged` hold. **Return to Vendor**
moves stock to the return location. **Repurpose** and **Destroyed** record the
decision; they do not move or transform stock. The current receiving screen
does not provide final-disposition buttons.

See [Inbound Setup](../05-inbound-setup.md) for receiving, return and damage
workflows.

## Pick short reasons

Pick short reasons are versioned policies, not ordinary code-list values. Only a
published revision is available to the RF picking workflow.

The General Distribution reference configuration includes `SHORT`,
`LPN_NOT_FOUND` and `WRONG_LOCATION`. Warehouse Bootstrap does not create them;
the reviewed profile configuration must be explicitly applied after profile
selection.

See [Pick Short Reasons](23-pick-short-reasons.md) for partial and zero rules,
follow-up actions, publishing and operational checks.

## Handling unit types

Handling unit types describe reusable physical units such as boxes, totes,
pallets and multi-position picking carts.

- In enterprise mode, open `Sidebar > Shared Handling Unit Types` to maintain
  types.
- In a warehouse, open **Handling Unit Registry** to register individual units.
- **Admin** and **Manager** maintain shared types. **Admin**, **Manager** and
  **Supervisor** may register individual units.

### Important type fields

| Field | Meaning |
|---|---|
| **Code** and **Name** | Stable identity shown in setup and operations. |
| **Active** | When off, new units of the type cannot be registered or assigned to new picking work. |
| **Holds Inventory** | The unit can contain stock. At least one of **Holds Inventory** or **Holds Containers** must be on. |
| **Holds Containers** | The unit acts as a carrier for other units. |
| **Positions** | Number of box positions on a carrier. A carrier needs at least one position. |
| **Default Usage Policy** | Controls whether a unit is limited to its owning client or may be shared by the warehouse. |
| **Inner Length**, **Inner Width**, **Inner Height** | Used to check whether a planned carton fits. Zero means the dimension is unknown and is not checked. |
| **Max Gross Weight** | Maximum planned gross weight. Zero means no type-level check. |
| **Code Prefix** | Prefix used when the registry generates individual unit codes. |
| **Returnable**, **Shippable**, **Inspect on Return** | Classification fields for the handling-unit design. Confirm the supported customer workflow before relying on them for operational decisions. |

### Register units

1. Open **Handling Unit Registry** and tick exactly one handling unit type.
2. Select **Register** to open **Register Handling Units**.
3. Enter **Count** and the starting **Location**.
4. Set **Owned By** to **This warehouse** or **Client**. Select **Client** when
   required.
5. Select **Print Labels** when a configured printer should print the generated
   labels.
6. Confirm that the units appear with the expected code prefix, owner, type and
   location.

Register no more than 500 units in one operation. A type that is not active
cannot be used for new registration.

### Picking checks

Before a box or carrier is assigned, the system checks that it is registered,
active, empty, not held, not already attached elsewhere and suitable for the
planned owner and carton. A carrier must have positions; a box must be able to
hold inventory and fit the planned carton.

Changing a type does not change stock already inside registered units. Test type
changes against open picking work before applying them broadly.

## Go-live checks

- Every active hold code has a clear owner and release procedure.
- Putting and taking flags were tested separately.
- Overridable codes show the expected warning in interactive workflows.
- Held stock is excluded from allocation and new pick work where required.
- Adjustment reasons match the allowed quantity direction and approval rules.
- Receiving and damage reason lists contain only approved active choices.
- Pick short reasons are published and known to operators.
- Handling unit types match the physical units, ownership rules, dimensions,
  weight limits and carrier positions used on the floor.

## Related guides

- [Hold and release stock](../13-inventory-control/04-hold-and-release-stock.md)
- [Adjust stock](../13-inventory-control/01-adjust-stock.md)
- [Pick Short Reasons](23-pick-short-reasons.md)
- [Owners, SKU, UOM and Pack Hierarchy](../04-owners-sku-uom-pack-hierarchy.md)
- [Inbound Setup](../05-inbound-setup.md)
