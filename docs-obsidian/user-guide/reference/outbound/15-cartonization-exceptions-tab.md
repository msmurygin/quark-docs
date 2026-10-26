# Cartonization exceptions tab

The `Cartonization exceptions` tab is the sixth tab of the [order screen](01-order-screen-overview.md).
It lists the pick lines that the cartonization plan **could not place in a box**, and why.
It tells the shift lead what to fix. The tab only reads. It has no button.
The form is `shipment_order_cartonization_exc_form`. The data comes from the database view `cartonization_exception_by_order` (data object `cartonization_exception`).

The plan shown is the same as on the [Cartons tab](14-cartons-tab.md): the newest plan that has not been replaced, `Stale` included.

## Columns

Every column is read only. The list starts sorted by `Reason`, ascending.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. The row key. |
| `Line #` | `line_no` | Whole number | The order line. |
| `Reason` | `reason` | Text, shown as a cell | Why the line was not placed. See below. |
| `SKU` | `sku_code` | Text | The item. |
| `UOM` | `uom` | Text | The unit of the pick. |
| `Qty` | `qty` | Decimal | The quantity that was not placed. |
| `Action` | `action` | Text, shown as a cell | What the policy decided for this reason. See below. |
| `Detail` | `detail` | Text | A free text from the calculation. |
| `Outcome` | `cartonization_outcome` | Text, shown as a cell | The same cell as the `Carton` column of the [Picks tab](12-picks-tab.md). |

Source: form `shipment_order_cartonization_exc_form` in `001_baseline.sql`, and `wms-meta-ui` migrations 015 and 022. The view is in `wms-app` migrations 013, 014 and 015.

> Not confirmed by code: what text the `Detail` column holds for each reason. The column is copied from the calculation result without any change on the screen. To verify: run an order with a SKU that has no dimensions and read the `Detail` cell.

## Reason

The cell shows the name, the stored code in small type, and the place where the problem is cured.

| Stored code | Name | Cured | Meaning |
|---|---|---|---|
| `NoDimensions` | `No dimensions` | `fix on the pack card` | The pack level has no length, width or height, so the calculation cannot place it. |
| `NoWeight` | `No weight` | `fix on the pack card` | The weight is unknown and the box has a weight limit, so the limit cannot be checked. |
| `NoCartonCandidates` | `No candidate cartons` | `fix in the policy` | The policy has no active box left to choose from. |
| `NoCartonFits` | `Nothing fits` | `fix in the policy` | The item does not fit into any active box, in any allowed turn. Cured by a **bigger box**, not by the splitting setting. |
| `WeightExceeded` | `Overweight` | `fix in the policy` | The contents are heavier than the gross limit of every box they fit in. |
| `SplitPrevented` | `Splitting not allowed` | `fix in the policy` | The whole line does not fit into one box, though it would fit split across several. Cured by a **setting**, not by a bigger box. |

An unknown code is shown as the bare code.
Source: `crates/services/web-ui-server/src/extensions/customization/shipment_order/cell_renderers.rs` (functions `cartonization_reason_words` and `render_cartonization_reason`) and the message keys in `wms-meta-ui` migration 015.

## Action

The action is the decision the policy made **at the time of the calculation**. It is not a link to the policy as it is today.

| Stored value | The cell says | Effect on the line |
|---|---|---|
| `Stop` | `Stop this line` | The line waits until someone fixes the data. The `Outcome` is `BLOCKED`. |
| `ShipAsIs` | `Let it ship as is` | The order ships, and the item goes outside any box. The `Outcome` is `SHIP AS IS`. |

Under the words the cell shows `decided at {date and time}`. The policy can be edited after the calculation. Without the time, a policy that now says "ship as is" next to a row that says "stop" would look like a lie. The time turns the difference into an explanation.
Source: `wms-meta-ui` migration 022, `wms-app` migration 015.

## Related pages

- [Cartons tab](14-cartons-tab.md)
- [Picks tab](12-picks-tab.md)
- Administrator guide: the cartonization policy is set in the menu `Policy > Cartonization Policy`. The pack card is in the menu `Packs`.
- API: none for the tab. It reads the view straight from the warehouse database.
- RF terminal: none for this tab.
