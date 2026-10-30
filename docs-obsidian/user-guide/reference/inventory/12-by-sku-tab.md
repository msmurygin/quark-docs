# By SKU tab

The `By SKU` tab shows **one row for each SKU of each owner**, with the stock of all locations added together.
The form is `inventory_balance_sku_list`. The data object is `inventory_balance_sku`, over the view `inventory_balance_by_sku`. The list is read by `list_inventory_balance_by_sku`.

The list is read only. A click on a row does nothing.

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | No | The smallest balance id of the group. It is only a row key. |
| `SKU` | `sku_code` | Text | Text | Yes | Yes | The SKU code. |
| `Description` | `descr` | Text | Text | No | Yes | The description of the SKU. |
| `Locs` | `locs` | Whole number | Number | No | Yes | In how many different locations the SKU has stock. |
| `Qty` | `qty` | Decimal | Number | No | Yes | The sum of `qty`. |
| `Alloc` | `qty_allocated` | Decimal | Number | No | Yes | The sum of `qty_allocated`. |
| `On Hold` | `qty_on_hold` | Decimal | Number | No | Yes | The sum of `qty` of the rows under a hold that blocks taking stock out. |
| `ATP` | `atp` | Decimal | Number | No | Yes | The sum of `atp`. See [ATP](01-balances-screen-overview.md#atp-available-to-promise). |
| `Expected` | `qty_expected` | Decimal | Number | No | Yes | What is still expected on open receipt lines of this SKU and owner. |
| `Owner` | `owner_id` | Whole number | Number | Yes | No | Shown as the owner code. Hidden at first; the quick filter works. |

## What each column affects

### Expected

- It is `max(qty_expected)` of the balance rows of the group. For each row `qty_expected` is the sum, over the receipt lines of the same SKU and owner whose status is `Open` or `InProgress`, of `max(qty_expected − qty_received, 0)` (`011_a_hold_says_what_it_forbids.sql:77-93`).
- A SKU with only expected stock and no balance row is not on this list, because the list starts from the balance rows.

### On Hold

- It counts a row's whole `qty` once a blocking hold applies to it. A partly held row does not exist: holds work on a lot, a location or a container as a whole.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [By Lot tab](13-by-lot-tab.md)
- API: `list_inventory_balance_by_sku`, `count_inventory_balance_by_sku`
- RF terminal: `Inventory > Stock inquiry` (`INVINQ01` to `INVINQ03`).
