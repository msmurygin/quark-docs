# Header tab

The `Header` tab is the first tab of the [order screen](01-order-screen-overview.md).
It holds the identity of the order and the fields that steer it.
The form is `shipment_order_header_form`. The data table is `shipment_order`.

## Fields

The fields are laid out in three columns.

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Order #` | `order_number` | Text, up to 10 characters. Unique. | Yes (the database refuses an empty value). Always read only on the screen. | A new order gets the next number of the counter `shipment_order`, 10 digits, for example `0000001234`. | The key of the document. |
| `Status` | `status` | Drop-down value `order_status` | Yes | `New`, `PartiallyAllocated`, `Allocated`, `PartiallyReleased`, `Released`, `PartiallyPicked`, `Picked`, `Closed`, `Cancelled`. A new order is `New`. Always read only. | Where the order is in its life. See [Order statuses](90-order-statuses-and-transitions.md). |
| `Type` | `order_type_id` | Pick list of order types | Yes. `Save` says `Fill in Type first`. | An active order type. The list shows `Name`, `ID`, `Code` (form `shipment_order_type_list`). | The kind of order. Read only after the order is launched. |
| `Owner` | `owner_id` | Pick list of owners | Yes. `Save` says `Fill in Owner first`. | An owner of type **Own** (form `owner_own_list_form`). | The owner of the goods. Every line takes this owner. |
| `Priority` | `priority` | Whole number | No | 1 to 99 (database rule `chk_shipment_order_priority`). The database default is 50. | Smaller is more urgent. It sets the priority of the pick tasks. |
| `Requested Ship` | `requested_ship_date` | Date | No | Empty by default. | The date the customer wants the goods to leave. |
| `Notes` | `notes` | Text | No | Empty by default. | A free note. |

> Not confirmed by code: that an empty `Priority` on a new order becomes 50. The database column has the default 50 and the create command sends no value when the field is empty, but the insert code was not read to the end. To verify: create an order with an empty `Priority`, save, and read the `Priority` column in the orders list.

Source: form `shipment_order_header_form` in `001_baseline.sql`; table `shipment_order` in `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql` (search `CREATE TABLE IF NOT EXISTS shipment_order (`).

## What each field affects

### Order #

- The number is taken from the counter when you press `New`, before you type anything. If you leave the screen without saving, that number is lost. Gaps in the numbers are normal (`crates/libs/wms-outbound/src/service/order/create.rs:183-217`, `crates/services/web-ui-server/src/extensions/customization/shipment_order/save_action.rs:77`).
- It must be unique (`UNIQUE (order_number)`). A number made up by hand is refused.

### Status

- Read only. Only the commands move it, and the program works it out again from the lines. You cannot type it.

### Type

- Frozen when the order is launched, and for ever after (`crates/libs/wms-outbound/src/service/shared/mutability.rs:36-67`). The screen greys the field too.
- The command takes the **code** of the type, not its id. `Save` reads the code before it calls the command (`save_action.rs:116-142`).
- An inactive type is refused: `order type '{code}' is inactive`. A missing one: `order type '{code}' not found` (`crates/libs/wms-outbound/src/service/shared/lookups.rs:38-44`).
- The order type has two flags, `requires_release` and `allows_partial_ship`. They are not on this screen. Nothing in the Rust, SQL, Go or script code reads them. They are stored only.

### Owner

- Chosen once. After the first save the field is not read only on the screen, but `Save` does not send it. A change of owner is ignored and `Save` answers `Nothing changed` when it is the only change (`save_action.rs:204-212`).
- `Validate` and `Release` refuse a line whose owner differs from the owner of the order: `line owner {x} differs from order owner {y}` (`crates/libs/wms-outbound/src/service/order/validate.rs`).

### Priority

- Smaller is more urgent. It is given to the pick tasks when they are made (`crates/libs/wms-outbound/src/service/order/allocate.rs:424-436`).
- When you change it on a saved order, the tasks of the order get the new priority at once (`crates/libs/wms-outbound/src/service/order/update.rs:133-137`).
- The RF terminal ranks the next pick by order priority, then by `Requested Ship` (`crates/libs/wms-outbound/src/picking/grouping/planned_target.rs:105-114`).
- Editable until the order is `Closed` or `Cancelled`.

### Requested Ship

- Used as a tie-break when the RF terminal ranks the next pick (see above), and as a group key of the wave policy (`crates/libs/wms-outbound/src/waves/policy.rs:437`).
- `Release` shows a warning, not an error, when the date is in the past: `requested ship date {date} is in the past` (`validate.rs:145-153`). The warning is appended to the successful release message (`release_action.rs`).
- Editable until the order is `Closed` or `Cancelled`.

### Notes

Stored only. It has no effect today.
No rule, report or screen reads it to decide anything. The integration flow templates write a note such as `Imported from Wildberries` when they make an order.
Editable until the order is `Closed` or `Cancelled`.

## Fields that are in the table but not on this tab

| Column | Type | What it is |
|---|---|---|
| `external_id` | Text, up to 100 characters | The number of the order in another system. With `source` it must be unique (`uq_shipment_order_external`). The command `shipment_order_update` accepts it, but no field on the web screens shows it. |
| `source` | `Ui` or `Api` | Where the order came from. A web order is `Ui`. |
| `order_date` | Date and time | When the order was made. Shown in the list as `Ordered`. |
| `version` | Whole number | Goes up at each change of the header. The screen sends it back with every command to detect a stale screen. |
| `released_at` | Date and time | Set by the first release. See [Order statuses](90-order-statuses-and-transitions.md). |
| `cancelled_at`, `cancel_reason` | Date and time, text up to 200 | Set by cancel. The reason is on the [Ship To tab](11-ship-to-tab.md). |
| `closed_at`, `close_summary` | Date and time, JSON | Set by the API close. |
| `ship_to_snapshot` | JSON | The address of the customer, frozen at release. The shipping label reads it (`crates/libs/wms-outbound/src/packing/post_commit/print_label.rs:186-229`). |

## Related pages

- [Creating an order](30-creating-an-order.md)
- [Editing an order](31-editing-an-order.md)
- [Ship To tab](11-ship-to-tab.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- API: `shipment_order_create`, `shipment_order_update`, `get_shipment_order`, `get_shipment_order_full`
- RF terminal: none for the header.
