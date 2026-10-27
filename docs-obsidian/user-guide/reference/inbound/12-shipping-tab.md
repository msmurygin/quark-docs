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

How "stored only" was checked: each column was searched in the Rust code, the SQL migrations, the RF screens and the web components.
The only places that name them are the patch type (`crates/libs/wms-inbound/src/service/receipt/planning/contracts.rs:136-153`) and the update method (`crates/services/app-server/src/web/rpcs/receipt_rpc/header_commands.rs:74-98`).

## Units

`Total Weight` and `Total Volume` are physical values.
You type and read them in the display units of the warehouse. The database keeps them in the storage units of the warehouse (grams and cubic millimetres by default).
The screen converts both ways (`crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/004_the_physical_columns_say_what_they_measure.sql`).
The unit is fixed when the warehouse is created.

`Temperature` is not converted. Type the number as you want to read it.

The temperature of the receiving **line** is a different field. It is on the tab [Physical & PO](23-line-physical-and-po-tab.md). The temperature check at receiving uses the temperature you scan, not this field.

## Messages

| When | Message |
|---|---|
| A text is longer than its limit | The value is rejected. Shorten it and save again. |
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} - cannot edit receipt reference in its current lifecycle state` |

> Not confirmed by code: the text shown for a value that is too long. To verify: type 19 characters into `Vehicle Plate` and press `Save`.

## Related pages

- [Header tab](10-header-tab.md)
- [Dates tab](11-dates-tab.md)
- [Editing a receipt](31-editing-a-receipt.md)
- API: `update_receipt`
