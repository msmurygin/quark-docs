# By Lot tab

The `By Lot` tab shows **one row for each lot** of a SKU and owner, with the stock of all locations added together, and the dates of the lot.
The form is `inventory_balance_lot_list`. The data object is `inventory_balance_lot`, over the view `inventory_balance_dating` (which carries the columns of the older view `inventory_balance_by_lot` and the lot's dating). The list is read by `list_inventory_balance_by_lot`.

The list is read only. A click on a row does nothing.

The same list form is also used as the pick list for a lot: the field `Lot` of the [hold form](21-hold-form.md), of the [adjustment line card](25-adjustment-line-card.md) and of the [count header](27-count-header.md) opens it.

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | No | The smallest balance id of the group. A row key. |
| `Lot` | `lot` | Text | Text | Yes | Yes | The lot. |
| `SKU` | `sku_code` | Text | Text | Yes | Yes | The SKU code. |
| `Mfg` | `manufactured_date` | Date (listed as text) | Text | No | Yes | The manufacturing date of the lot. |
| `Expiry` | `expiration_date` | Date (listed as text) | Text | No | Yes | The expiry date of the lot. |
| `Days left` | `days_left` | Whole number | Number | No | Yes | Expiry date minus today, today being the warehouse day. Zero or negative once the lot has expired. Empty when the lot has no expiry date. |
| `Expired` | `expired` | Yes/No | None | No | Yes | Yes when the expiry date is today or earlier. A lot with no expiry date is not expired. |
| `Qty` | `qty` | Decimal | Number | No | Yes | The sum of `qty`. |
| `Alloc` | `qty_allocated` | Decimal | Number | No | Yes | The sum of `qty_allocated`. |
| `ATP` | `atp` | Decimal | Number | No | Yes | The sum of `atp`. See [ATP](01-balances-screen-overview.md#atp-available-to-promise). |
| `Locs` | `locs` | Whole number | Number | No | Yes | In how many different locations the lot has stock. |
| `Status` | `status` | Text | Text | No | Yes | `On hold` when any row of the lot is under a hold that blocks taking stock out. Otherwise `Active`. |
| `Owner` | `owner_id` | Whole number | Number | Yes | No | Shown as the owner code. Hidden at first. |

Source: view `inventory_balance_dating` (the wms-app migration `lot_dating`). Its `id`, `qty`, `locs`, `status`, `qty_allocated` and `atp` are computed as `inventory_balance_by_lot` computes them, and a test holds the two together. The dates come from the table `inventory_balances_lot`; the view also knows where each date came from (typed or worked out), which the API returns (`expiration_date_source` and the like) and the list does not show.

## What each column affects

### Status

- `On hold` here uses the **blocking** rule (`sum(qty_on_hold) > 0`). The tabs `By Location` and `On Hold` use the wider rule "any hold that is on". The same lot can therefore be `Active` here and `On hold` there.
- A hold is placed on a lot by its **code only** (`inventory_hold.lot`). Two SKUs or two owners that use the same lot code are both held.

### Days left

- It is a number of days. The code does not colour or limit anything with it. It counts from the warehouse day (`WAREHOUSE_TIMEZONE`), the same day receiving, allocation, picking and shipping judge on.

> Not confirmed by code: whether the cell colours a lot that is near its expiry. To verify: open the tab with a lot that expires in less than 10 days.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [By SKU tab](12-by-sku-tab.md)
- [Placing a hold](41-placing-a-hold.md)
- API: `list_inventory_balance_by_lot`, `count_inventory_balance_by_lot`
- RF terminal: none.
