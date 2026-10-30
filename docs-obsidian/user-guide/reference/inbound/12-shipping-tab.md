# Shipping tab

The `Shipping` tab holds data about the truck that brings the goods.
The form is `receipt_shipping_form`. The data table is `receipt`.
Every field is optional. Nothing on this tab has an effect on receiving.

## Fields

| Label | Column | Type | Required | Default | What it does |
|---|---|---|---|---|---|
| `Vehicle Plate` | `vehicle_plate` | Text, up to 18 characters | No | Empty | Stored only. It has no effect today. |
| `Vehicle Date` | `vehicle_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Driver Name` | `driver_name` | Text, up to 25 characters | No | Empty | Stored only. It has no effect today. |
| `Trailer Plate` | `trailer_plate` | Text, up to 20 characters | No | Empty | Stored only. It has no effect today. |
| `Trailer Type` | `trailer_type` | Text, up to 10 characters | No | Empty | Stored only. It has no effect today. |
| `Temperature` | `temperature` | Number | No | Empty | Stored only. It has no effect today. |
| `Total Weight` | `total_weight` | Number | No | Empty | Stored only. It has no effect today. |
| `Total Volume` | `total_volume` | Number | No | Empty | Stored only. It has no effect today. |

## Units

`Total Weight` and `Total Volume` are physical values.
You type and read them in the display units of the warehouse. The database keeps them in the storage units of the warehouse (grams and cubic millimetres by default).
The screen converts both ways.
The unit is fixed when the warehouse is created.

`Temperature` is not converted. Type the number as you want to read it.

The temperature of the receiving **line** is a different field. It is on the tab [Physical & PO](23-line-physical-and-po-tab.md). The temperature check at receiving uses the temperature you scan, not this field.

## Messages

| When | Message |
|---|---|
| A text is longer than its limit | The value is rejected. Shorten it and save again. |
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} - cannot edit receipt reference in its current lifecycle state` |

## Related pages

- [Header tab](10-header-tab.md)
- [Dates tab](11-dates-tab.md)
- [Editing a receipt](31-editing-a-receipt.md)
- API: `update_receipt`
