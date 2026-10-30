# By Serial tab

The `By Serial` tab is the register of serial numbers. It shows **one row for each serial number** the warehouse knows, with its status and where it is.
The form is `inventory_balance_serial_list`. The data object is `inventory_balance_serial`, over the table `inventory_balances_serial`. The list is read by `list_inventory_balance_serial`.

The list is read only. The tab has no button to change a serial: serials change only through the receiving, move, pick and ship commands.
The same list form is the `Serials` tab of a receipt line. See [Line serials tab](../inbound/24-line-serials-tab.md).

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `Receipt` | `received_via` | Whole number, shown as text | None | No | Yes | The number of the receipt on which the serial was received. When the receipt has an external number, that number is shown. |
| `ID` | `id` | Whole number | Number | No | No | The id of the serial row. |
| `Serial #` | `serial_number` | Text, up to 80 characters | Text | Yes | Yes | The serial number. |
| `SKU` | `sku_code` | Text, up to 50 characters | Text | Yes | Yes | The SKU code. |
| `Lot` | `lot` | Text, up to 10 characters | Text | No | Yes | The lot. |
| `Container` | `container_id` | Whole number, shown as a container code | Number | No | Yes | The container that holds the unit. Empty for a loose unit. Drawn with a glyph for the container type. |
| `Location` | `location` | Text, up to 20 characters | Text | No | Yes | The location of the unit. |
| `Status` | `status` | Text | Text | No | Yes | The status of the serial. See below. |
| `Received` | `received_at` | Date and time | Date | No | Yes | When the serial was received. |

## Serial statuses

The column `status` holds one of these values (database type `serial_status`):

| Status | Meaning |
|---|---|
| `Active` | In stock. The state of a received serial. |
| `Reserved` | Promised to an order. |
| `Picked` | Picked for an order. |
| `Packed` | Packed into a carton. |
| `Shipped` | Left the warehouse. |
| `Returned` | Came back from a customer. |
| `Damaged` | Reported damaged. |
| `Held` | Under a hold. |
| `Disposed` | Written off. Final. |

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [Open Episodes tab](15-open-episodes-tab.md)
- [Line serials tab](../inbound/24-line-serials-tab.md)
- [Capturing serial numbers](../inbound/37-capturing-serial-numbers.md)
- API: `list_inventory_balance_serial`, `get_inventory_balance_serial`, `count_inventory_balance_serial`
- RF terminal: `Receiving` screens `RCSN01` (serial capture). Move screen `INVMOV_SN` scans serials for a partial move.
