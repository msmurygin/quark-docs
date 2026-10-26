# Inventory Balances

The sidebar group `Inventory Balances` holds seven screens. Together they answer four questions:

- **What stock do we have, and where?** `Balances`.
- **What stock is blocked?** `Holds`.
- **How do we correct the stock?** `Inventory Adjustments`, `Adjustment Reasons`, `Inventory Counts`.
- **What happened to the stock?** `Transactions`. A fifth question, "which free space is promised to a pallet that has not arrived?", is answered by `Pending Move-In`.

Every screen works on the active warehouse. The group is not available in Enterprise mode.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Inventory Balances`.
3. Click the screen you want.

The group is the menu item `inventory_balances_group`.

## The seven screens

| Sidebar item | Menu code | Opens form | What it is | Page |
|---|---|---|---|---|
| `Balances` | `inventory_balance_list_menu` | `inventory_balances` | Seven tabs of stock: by location, container, SKU, lot, serial, open serial captures, held stock. Click a row of `By Location` to move stock. | [Balances screen](01-balances-screen-overview.md) |
| `Holds` | `inventory_hold_list_menu` | `inventory_hold_list` | The holds that are on now, and the `New Hold` form. | [Holds list](20-holds-list.md) |
| `Inventory Adjustments` | `inventory_adjustment_list_menu` | `inventory_adjustment_list_form` | Documents that set the stock of chosen places to a target quantity. | [Adjustments list](22-adjustments-list.md) |
| `Inventory Counts` | `inventory_count_list_menu` | `inventory_count_list_form` | Counts of locations: a supervisor starts them, counters count them, a supervisor decides the differences. | [Counts list](26-counts-list.md) |
| `Adjustment Reasons` | `inventory_adjust_reason_list_menu` | `inventory_adjust_reason_list_form` | The reasons an adjustment can use, and what each one allows. | [Adjustment reasons](31-adjustment-reasons.md) |
| `Transactions` | `txn_log_menu` | `txn_log_list_form` | The stock ledger: every change of stock, one row each. | [Transactions](32-transactions.md) |
| `Pending Move-In` | `pending_move_in_menu` | `pending_move_in_list_form` | Space that putaway has promised to a pallet on its way. | [Pending Move-In](33-pending-move-in.md) |

The mapping of a menu item to its form is stored as a main-viewport event on the menu item (table `ui_event`, tab codes `tab_inventory_balance_list`, `tab_inventory_hold_list`, `tab_inventory_adjustment_list`, `tab_inventory_count_list`, `tab_inventory_adjust_reason_list`, `tab_txn_log_list`, `tab_pending_move_in`).
The sidebar order is: `Balances`, `Holds`, `Inventory Adjustments`, `Inventory Counts`, `Adjustment Reasons`, `Transactions`, `Pending Move-In`.

## How the parts fit together

| Part | What it does to stock | Where you meet it |
|---|---|---|
| Receiving, putaway, picking, move | Change the quantity in a balance row and write a ledger row. | Other sections. Their rows appear in `Transactions`. |
| **Adjustment** | `Post` sets the quantity of each line to its target, all lines or none. Writes one ledger row of type `Adjust` per changed line. | [Posting an adjustment](48-posting-an-adjustment.md) |
| **Count** | Never changes stock itself. It records what the counter saw. An accepted difference becomes an adjustment that is validated and posted at once. | [Accepting a variance](54-accepting-a-variance.md) |
| **Hold** | Blocks stock without changing its quantity. A hold can take the stock out of the available quantity (ATP), and can set the status of a location. | [Placing a hold](41-placing-a-hold.md) |
| **Pending Move-In** | Reserves space in a location for a pallet that is not there yet. Changes no balance. | [Releasing a reservation](59-releasing-a-reservation.md) |

## Who can use it

| Role | Read the lists | Move stock, place holds, adjust, count |
|---|---|---|
| `ADMIN` | Yes | Yes |
| `MANAGER` | Yes | Yes |
| `SUPERVISOR` | Adjustments, counts, reasons, balances, holds, transactions and pending move-in: yes. | Move stock, adjustments, counts and releasing a pending move-in reservation: yes. Creating or releasing holds: no. Approving an adjustment: no. |
| `OPERATOR` | Balances, holds, transactions, pending move-in: yes. Adjustments, counts, reasons: no. | Move stock: yes. Counting on the RF terminal: yes. The rest: no. |
| `VIEWER` | Yes (read only) | No |

These are the defaults that a new database gets. An administrator can change them in `Users & Roles > Permission Matrix`. The full table, button by button, is on [Who can do what](91-who-can-do-what.md).

## RF terminal

The RF menu `Inventory` (screen `INVM`) has three entries that work on the same data:

- **Stock inquiry** (`INVINQ01` to `INVINQ03`): finds stock by filters.
- **Move stock** (`INVMOV01` to `INVMOV04`): moves a position. Partial moves of serial-tracked stock scan the serials on `INVMOV_SN`.
- **Count location** (`CNTA`, `CNT00`, `CNT01`, `CNT02`, `CNT03`, `CNT_DONE`): the counter's side of an inventory count.

Adjustments and holds have no RF screen.

## Not on this screen

The **cycle-count policies** (`inventory_count_policy_list_form`, which schedule counts) are not in this sidebar group. They are not described in this section.
The **hold reason codes** are maintained under `Code Lists` (menu item `hold_code_menu`). They are not described in this section either, but [Placing a hold](41-placing-a-hold.md) says how a code changes what a hold does.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [Who can do what](91-who-can-do-what.md)
- [Statuses and transitions](90-statuses-and-transitions.md)
- [Operator guide: Inventory inquiry](../../operator/07-inventory-inquiry.md) (RF)
- [Operator guide: Moving stock](../../operator/06-move.md) (RF)
- [Operator guide: Putaway](../../operator/05-putaway.md) (RF)
- [Operator guide: Inventory count](../../operator/08-inventory-count.md) (RF)
- API: `list_inventory_balance`, `list_inventory_hold_detail`, `inventory_adjustment_list`, `inventory_count_list`, `list_transaction_log`, `list_inventory_pending_move_in_ui`
- RF terminal: `Inventory` (`INVM`)
