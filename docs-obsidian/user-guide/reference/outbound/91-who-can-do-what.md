# Who can do what

This page shows which default role may use each button of the order screens, and which web action and API right stand behind it.
It describes the **defaults** that a new database gets. An administrator can change every cell in `Permission Matrix`. A change made there wins over this page.

Two gates apply to a button:

1. **The web action.** The server checks that the role may run the action behind the button. A refusal reads `Forbidden("{action}")`.
2. **The API right.** The action calls an API method. The method has its own list of roles. A refusal comes from the method.

A button works only when both gates are open.

## Roles

`ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER`. `ADMIN` and `MANAGER` may use everything on this page.

## Screens and buttons

| What | Web action | API method | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|---|
| Open the list and the order (read) | the list forms | `list_shipment_order`, `get_shipment_order`, `get_shipment_order_full`, `list_shipment_order_line`, `get_order_type`, `list_order_type` | Yes | Yes | Yes |
| `New` | `generic_new` | `get_next_key` (the number) | Yes | Yes | No |
| `Save` (order) | `shipment_order_save` | `shipment_order_create`, `shipment_order_update` | Yes | Yes | No |
| `New` line, `Save` line | `shipment_order_line_save` | `shipment_order_line_upsert` | Yes | Yes | No |
| `Delete` line | `shipment_order_line_delete` | `shipment_order_line_remove` | Yes | Yes | No |
| Lines grid `Save`, `Discard changes` | `shipment_order_lines_grid_save`, `shipment_order_lines_grid_discard` | `shipment_order_line_upsert`, `shipment_order_line_adjust_qty` | Yes | Open lines: yes. Launched or reserved lines: no. | No |
| `Release` (dry run first) | `shipment_order_release` | `shipment_order_validate`, `shipment_order_release` | Yes | No | No |
| `Allocate` | `shipment_order_allocate` | `shipment_order_allocate` | Yes | Yes | No |
| `Unallocate` | `shipment_order_unallocate` | `shipment_order_cancel_allocation` | Yes | No | No |
| `Delete Selected` (picks) | `pick_detail_delete_selected` | `pick_detail_delete` | Yes | No | No |
| `Cancel Qty` | `shipment_order_line_cancel_qty` | `shipment_order_line_cancel_qty` | Yes | No | No |
| `Cancel` (order) | `generic_rpc_command` | `shipment_order_cancel` | Yes | No | No |
| `Return to Pool` | `generic_rpc_command` | `task_force_release` | Yes | No | No |
| `Reassign` | `generic_rpc_command` | `task_reassign` | Yes | No | No |
| `Delete Task` | `task_delete_confirm` | `task_delete_many` | Yes | No | No |
| Close (no button) | none | `shipment_order_close` | API only | No | No |
| Preview allocation (no button) | none | `shipment_order_allocate_preview` | API only | API only | No |

How the cells were found:

- **Web actions.** `crates/libs/wms-lib-auth/src/authorization/seeder.rs:34-200` (the lists of actions that `OPERATOR` and `SUPERVISOR` get). `ADMIN` and `MANAGER` get every action. `VIEWER` gets only the read actions (list refresh and queries).
- **API rights.** The seed block of `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql` (search `shipment_order_release` in the `enterprise.role_permission` insert). It gives the rows for `ADMIN`, `MANAGER`, `SUPERVISOR` and `OPERATOR`.

Remarks:

- `OPERATOR` has no right to release, cancel, unallocate, delete picks, cancel a quantity or change the quantity of a launched or reserved line. The rule: building a draft is data entry; committing stock or giving it back is a supervisor decision.
- The `Ordered` cell and box are offered to every role on purpose. An operator who types a number into a launched line is refused by the command with the sentence `Permission denied: changing the ordered quantity of a launched or reserved line is a supervisor action — ask a supervisor to make this change`. The screen does not hide the field per role.
- `generic_rpc_command` is open to `OPERATOR` and `SUPERVISOR`. It only carries the request. The right that decides is the API right of the command behind it.
- `Release` does not need a second right for the stock reservation it makes. The right to release covers it.
- The reads for `VIEWER` come from the default roles of the read methods. The baseline seed block has no `VIEWER` rows for the order methods.


> Not confirmed by code: the pick lists on the header and the line (owners, customers, order types, SKUs) need their own read rights. They are not listed above. To verify: sign in as an `OPERATOR`, press `New`, and open each pick list.

## The default roles of the methods in the code

The code that declares the methods also lists default roles for each method (`crates/services/app-server/src/web/rpcs/shipment_order_commands_rpc.rs:46-58`). That list is **narrower** than the seed block for some methods:

| Method | Code default roles | Baseline seed also grants |
|---|---|---|
| `shipment_order_create`, `shipment_order_update`, `shipment_order_line_upsert`, `shipment_order_line_remove` | `ADMIN`, `MANAGER` | `SUPERVISOR`, `OPERATOR` |
| `shipment_order_validate` | `ADMIN`, `MANAGER` | `SUPERVISOR`, `OPERATOR` |
| `shipment_order_close`, `shipment_order_cancel_allocation`, `pick_detail_delete`, `shipment_order_line_adjust_qty` | `ADMIN`, `MANAGER` | `SUPERVISOR` |

The RBAC seeder at start-up only adds rows that are missing and never removes a row (`crates/services/app-server/src/app.rs:337-345`, the last argument `false`). So on a database built from the baseline the seed block wins, and this page is right. A **forced** reseed from the administrator API overwrites the rows that the system wrote with the code defaults (`seeder.rs`, `run_seeder_with_force`). After such a reseed the narrower code defaults apply.

## Related pages

- [Order screen](01-order-screen-overview.md)
- [Order statuses and transitions](90-order-statuses-and-transitions.md)
- Administrator guide: roles are changed in `Permission Matrix`.
- API: the methods in the table. All commands need `meta.idempotency_key`. The stateful ones also need the version in `data`.
- RF terminal: not applicable.
