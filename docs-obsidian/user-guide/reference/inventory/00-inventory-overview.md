# Inventory screens

The sidebar group `Management & Control > Inventory` holds the stock-control screens. Together they answer four questions:

- **What stock do we have, and where?** `Balances`.
- **What stock is blocked?** `Holds`.
- **How do we correct the stock?** `Adjustments` and `Counts`.
- **What happened to the stock?** `Management & Control > History > Transactions`. A fifth question, "which free space is promised to a pallet that has not arrived?", is answered by `Pending Move-In`.

Every screen works on the active warehouse. The group is not available in Enterprise mode.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Management & Control`.
3. Open `Inventory`, then click the screen you want.

## Inventory and related screens

| Sidebar path | What it is | Page |
|---|---|---|
| `Management & Control > Inventory > Balances` | Seven tabs of stock: by location, container, SKU, lot, serial, open serial captures and held stock. Click a row of `By Location` to move stock. | [Balances screen](01-balances-screen-overview.md) |
| `Management & Control > Inventory > Holds` | The holds that are active now, and the `New Hold` form. | [Holds list](20-holds-list.md) |
| `Management & Control > Inventory > Adjustments` | Documents that set the stock of chosen places to a target quantity. | [Adjustments list](22-adjustments-list.md) |
| `Management & Control > Inventory > Counts` | Counts of locations: a supervisor starts them, counters count them, and a supervisor decides the differences. | [Counts list](26-counts-list.md) |
| `Management & Control > Inventory > Lot Transfers` | The workspace for transferring stock between lots. | — |
| `Management & Control > Inventory > Replenishment` | The replenishment work list for pick locations. | [Replenishment status](../../admin/policies/35-replenishment-status.md) |
| `Management & Control > Inventory > Pending Move-In` | Space that putaway has promised to a pallet on its way. | [Pending Move-In](33-pending-move-in.md) |
| `Warehouse Configuration > Reason Codes > Adjustment Reasons` | The reasons an adjustment can use, and what each one allows. | [Adjustment reasons](31-adjustment-reasons.md) |
| `Management & Control > History > Transactions` | The stock ledger: every change of stock, one row each. | [Transactions](32-transactions.md) |

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

These are the defaults that a new database gets. An administrator can change them in `Permission Matrix`. The full table, button by button, is on [Who can do what](91-who-can-do-what.md).

## RF terminal

The RF menu `Inventory` (screen `INVM`) has three entries that work on the same data:

- **Stock inquiry** (`INVINQ01` to `INVINQ03`): finds stock by filters.
- **Move stock** (`INVMOV01` to `INVMOV04`): moves a position. Partial moves of serial-tracked stock scan the serials on `INVMOV_SN`.
- **Count location** (`CNTA`, `CNT00`, `CNT01`, `CNT02`, `CNT03`, `CNT_DONE`): the counter's side of an inventory count.

Adjustments and holds have no RF screen.

## Not on this screen

The **cycle-count policies** (`inventory_count_policy_list_form`, which schedule counts) are not in this sidebar group. They are not described in this section.
The **hold reason codes** are maintained under `Warehouse Configuration > Reason Codes > Hold Codes`. They are not described in this section, but [Placing a hold](41-placing-a-hold.md) says how a code changes what a hold does.

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
