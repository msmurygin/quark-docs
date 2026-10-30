# Cartons tab

The `Cartons` tab is the fifth tab of the [order screen](01-order-screen-overview.md).
It shows the **boxes the cartonization plan says to use** for this order. Cartonization is the calculation that decides which pick goes into which box.
The tab only reads. It has no button. Nobody starts or edits the plan by hand: the plan is calculated when stock is reserved (`wms-meta-ui` migration 015, header comment).
The form is `shipment_order_cartons_form`. The data comes from the database view `cartonization_carton_by_order` (data object `cartonization_carton`).

## Which plan is shown

The view shows the **newest plan that has not been replaced**. A plan with the status `Stale` is shown too.
A `Stale` plan is not an error. The floor keeps working by it: the boxes stand, the tasks are out. See the status words below.

## Columns

Every column is read only.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. The row key. |
| `#` | `sequence` | Whole number | The number of the box in the plan. |
| `Carton code` | `carton_code` | Text | The code of the box (a container code, for example `LPN0000123`). This is what the operator looks for. |
| `Carton type` | `carton_type` | Text, up to 20 characters | The type of box the policy chose (for example `BOX-M`). It is a copy made when the plan was calculated. |
| `Policy` | `policy_code` | Text | The cartonization policy that made this box. |
| `Status` | `plan_status` | Chip | The state of the plan. See below. |
| `Planned gross weight` | `planned_weight` | Decimal | Box plus contents. Empty is shown as `? unknown`. |
| `Planned volume` | `planned_cube` | Decimal | The volume of the contents only. No empty space, no box wall. |
| `Pick lines` | `pick_lines` | Whole number | How many different pick lines are in the box. A box with eight equal mugs counts as one line. |

The weight and the volume are shown in the display unit of the warehouse (the columns are marked as weight and volume).

### Planned gross weight

The weight is **empty when the weight of any item inside is unknown**. It is never shown as zero and never as the sum of the known parts. A zero would look like a real number, and it would be too low by exactly the unknown part.
The empty cell reads `? unknown`, and its hover text says: `The weight of at least one item inside is unknown, so the gross weight cannot be stated.`

### Status chips

| Stored value | The chip says | Meaning |
|---|---|---|
| `Planned` | `Planned` | The plan was calculated and every marked pick line got a box. |
| `PlannedWithExceptions` | `With exceptions` | The plan was calculated and some lines were left without a box. The [Cartonization exceptions tab](15-cartonization-exceptions-tab.md) lists them. |
| `Stale` | `Stale` | The order was released and the data changed afterwards, so the plan no longer matches. The floor keeps working by this plan. The fix helps the next order. |

A fourth stored value, `Superseded`, is never shown: it marks a plan that a newer plan replaced.

## Related pages

- [Picks tab](12-picks-tab.md): the `Carton` cell of each pick links here.
- [Cartonization exceptions tab](15-cartonization-exceptions-tab.md)
- [Allocating an order](36-allocating-an-order.md): the plan is calculated when stock is reserved.
- Administrator guide: the cartonization policy is set in the menu `Warehouse Configuration > Policies > Cartonization Policy`.
- API: none for the tab. It reads the view straight from the warehouse database.
- RF terminal: the box is used in [Operator guide: Packing and verify](../../operator/10-packing-verify.md).
