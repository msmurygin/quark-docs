# Holds list

The `Holds` screen lists the **holds that are on now**. A hold blocks or marks stock without changing its quantity. A hold is fixed to one lot, one location or one container.
The form is `inventory_hold_list`. The data object is `inventory_hold`, over the view `inventory_hold_detail`. The list is read by `list_inventory_hold_detail`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Management & Control`, then `Inventory`.
3. Click `Holds`.

The sidebar item is `inventory_hold_list_menu` (tab `tab_inventory_hold_list`).

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | `New Hold` and `Release`. `Release` is enabled for one selected active hold when the role may run the command. |
| Grid | One row for each hold that is on. |
| Row click | Opens the [hold form](21-hold-form.md) for that hold (SelfSwap to `hold_form`). |

A hold is released by the list's `Release` action, by the hold cascade of a stock move, by the write-off of damaged goods in receiving, or by the auto-release sweeper. See [Placing a hold](41-placing-a-hold.md).

## Columns

All columns are read only. The list only has holds with `is_hold_on` true; a released hold disappears.

| Label | Column | Type | Filter | Quick filter | What it shows |
|---|---|---|---|---|---|
| `Hold #` | `id` | Whole number | Number | No | The id of the hold. |
| `Code` | `code` | Text | Text | Yes | The reason code, for example `QcQuarantine`. |
| `Scope` | `scope` | Text | Text | No | `Lot`, `Container` or `Location`: what the hold is fixed to. |
| `Target` | `target` | Text | Text | Yes | The code of the lot, container or location. |
| `Qty` | `qty` | Decimal | Number | No | The sum of `qty` of the balance rows the hold covers. See below. |
| `Started` | `date_on` | Date and time | Date | No | When the hold was placed. |
| `Auto-release` | `auto_release_date` | Date and time | Date | No | When the hold ends by itself. Empty means there is no schedule. |
| `By` | `who_on` | Whole number, shown as a user name | Number | No | Who placed the hold. |
| `Reason` | `comments` | Text | Text | No | The free text typed when the hold was placed. |

## What each column affects

### Scope and Target

- The view tests `lot` first, then `lpn`, then `loc`. A hold row has exactly one of them (`Placing a hold` enforces it for holds made by hand).

### Qty

- It adds up `inventory_balances.qty` for every balance row that matches the hold: the same lot code, or the same location, or the container with that code.
- A hold on a lot counts every SKU and every owner that uses the same lot code, because a hold names the lot code only.

### Auto-release

- Set or clear the schedule on the [hold form](21-hold-form.md). An empty schedule is stored as `NULL` and the list leaves the cell empty.
- The date-time picker interprets the entry in the warehouse user's timezone and sends the absolute UTC instant.
- A loop in the application server checks every 5 minutes. Once the instant is due, it uses the same idempotent domain release as the list action, records `date_off` and `who_off`, preserves audit/event hooks, and adds `release: auto-release (expired)` to the comments.

## Who can use it

Reading the list: `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR`, `VIEWER`. `New Hold`: `ADMIN` and `MANAGER` only. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Hold form](21-hold-form.md)
- [Placing a hold](41-placing-a-hold.md)
- [On Hold tab](16-on-hold-tab.md)
- API: `list_inventory_hold_detail`, `count_inventory_hold_detail`
- RF terminal: none.
