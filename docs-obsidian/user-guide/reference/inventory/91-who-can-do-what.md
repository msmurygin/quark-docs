# Who can do what

This page shows which default role may use each button of the `Inventory` screens, and which web action and API right stand behind it.
It describes the **defaults** that a new database gets. An administrator can change every cell in `Permission Matrix`. A change made there wins over this page.

Two gates apply to a button:

1. **The web action.** The server checks that the role may run the action behind the button. A refusal reads `Forbidden("{action}")`.
2. **The API right.** The action calls an API method. The method has its own list of roles.

A button works only when both gates are open. `ADMIN` and `MANAGER` pass every gate on this page.

## The web actions on these screens

| Web action | Used by | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|
| `generic_rpc_query`, `generic_rpc_form_load`, `generic_refresh`, `query_list_form` | Every list, every form load, `Refresh` | Yes | Yes | Yes |
| `generic_new`, `generic_save`, `generic_validate` | `New`, `Save`, `Add Line`, `Add Locations`, `New Hold` | Yes | Yes | No |
| `generic_rpc_command` | `Validate`, `Approve`, `Post`, `Reverse`, `Delete`, `From Stock`, the count buttons, `Count After Posting`, `Do Not Count` | Yes | Yes | No |
| `balance_move` | `Move` on the Move stock document | Yes (baseline grant) | Yes (baseline grant) | No |
| `putaway_release_reservation` | `Release` on `Pending Move-In` | Yes (baseline grant) | No | No |

Source: `crates/libs/wms-lib-auth/src/authorization/seeder.rs:35-200`; the baseline grants in `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:19903,20015,20020`.
Because `generic_rpc_command` is open to `OPERATOR` and `SUPERVISOR`, what stops them on the buttons below is the **API right**, not the web action.

## Screens and buttons

`Yes` means both gates are open by default.

| What | API method | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|
| Open the Balances tabs (lists) | `list_inventory_balance`, `_by_container`, `_by_sku`, `_by_lot`, `_on_hold`, `list_inventory_balance_serial` | Yes (baseline grants) | Yes | Yes |
| The tab counts | `count_inventory_balance...`, `count_inventory_balance_serial` | Yes | Yes | Yes |
| `Open Episodes` | `list_serial_capture_episode_open` | Yes | Yes | Yes |
| Summary strip | `list_inventory_balance_kpi` | Yes | Yes | Yes |
| `Move` | `move_execute` (and `generate_lpn`, `print_lpn_label` for a new LPN) | Yes (baseline grant) | Yes (baseline grant) | No |
| Open the Holds list | `list_inventory_hold_detail` | Yes | Yes | Yes |
| `New Hold`, `Save` a hold | `create_inventory_hold_row` | No | No | No |
| `Save` the note of a hold | `update_inventory_hold` | No | No | No |
| Release a hold | `release_inventory_hold` (API only, no button) | No | No | No |
| Open Adjustments, Counts, Reasons | `inventory_adjustment_list`, `inventory_count_list`, `inventory_adjust_reason_list` and their card methods | Yes | No | Yes |
| `New`, `Save`, `Add Line`, `From Stock`, `Validate`, `Post`, `Reverse`, `Delete` (adjustments) | `create_inventory_adjustment`, `create_inventory_adjustment_line`, `inventory_adjustment_generate_lines`, `inventory_adjustment_validate`, `inventory_adjustment_post`, `inventory_adjustment_reverse`, `inventory_adjustment_delete`, `inventory_adjustment_remove_line`, `update_...` | Yes | No | No |
| `Approve` | `inventory_adjustment_approve` | **No** | No | No |
| `Count After Posting`, `Do Not Count` | `inventory_adjust_reason_set_count` | No | No | No |
| `New`, `Save`, `Add Locations`, `Remove Location`, `Accept Variance`, `Recount`, `Cancel Count`, `Delete` (counts) | `create_inventory_count`, `inventory_count_add_locations`, `inventory_count_remove_location`, `inventory_count_accept`, `inventory_count_recount`, `inventory_count_cancel`, `inventory_count_delete` | Yes | No | No |
| Count on the RF terminal | `inventory_count_task_take_next`, `_at_location`, `_leave`, `inventory_count_observe`, `_void_observation`, `_confirm_empty`, `inventory_count_complete` | Yes | Yes | No |
| Open Transactions (list) | `list_transaction_log` | Yes (baseline grant) | Yes | Yes |
| Open a transaction (detail) | `get_transaction_log` | Yes | Yes | Yes |
| Open Pending Move-In | `list_inventory_pending_move_in_ui` | Yes | Yes | Yes |
| `Release` a reservation | `putaway_release_reservation` | Yes | No (web action) | No |

Source of the API cells: the `declare_rpc_module!` lists in `crates/services/app-server/src/web/rpcs/inventory_rpc.rs`, `inventory_balance_serial_rpc.rs`, `hold_rpc.rs`, `inventory_adjustment_rpc.rs`, `inventory_count_rpc.rs`, `transaction_log_rpc.rs`, `move_command_rpc.rs`, `putaway_rpc.rs`; and the baseline grants of `OPERATOR` and `SUPERVISOR` in `001_baseline.sql:19866-20020`.

## How the cells were found

| Cell | Source |
|---|---|
| `ADMIN`, `MANAGER` | The server action policy gives them every action (`default_server_action_grant`). The API lists name both of them for every method here. |
| Adjustments and counts: `SUPERVISOR` yes, `OPERATOR` no | The module comments: drafting and posting adjustments and the decisions of a count are the supervisor's (`inventory_adjustment_rpc.rs:1-6`, `inventory_count_rpc.rs:1-14`). |
| `Approve`: `ADMIN`, `MANAGER` only | `inventory_adjustment_rpc.rs:44-45`: approval is its own grant. |
| Baseline grants | The baseline file gives `OPERATOR` and `SUPERVISOR` rows for `move_execute`, `putaway_release_reservation` and a list of read methods. A method without a baseline row takes its default from the `declare_rpc_module!` list. |

## Inconsistencies seen

- `move_execute` is listed for `ADMIN` and `MANAGER` only in its module (`move_command_rpc.rs:26`), yet the baseline grants it to `OPERATOR` and `SUPERVISOR`, and the web action `balance_move` is granted to them too. In practice `OPERATOR` can move stock on the web.
- `OPERATOR` and `SUPERVISOR` hold the web action `generic_save`, but `create_inventory_hold_row` is for `ADMIN` and `MANAGER` only, so `New Hold` is refused by the API.
- `Count After Posting` is a button of a screen that `SUPERVISOR` reads, but only `ADMIN` and `MANAGER` may press it.

Refusal text can vary with the permission that blocks the action. Test custom roles in a non-production warehouse before assigning them to operators.

## Related pages

- [Inventory overview](00-inventory-overview.md)
- [Adjustment header](23-adjustment-header.md)
- [Count header](27-count-header.md)
- [Administrator guide: Users, roles and permissions](../../admin/02-users-roles-permissions.md)
- API: the right of each method is on its page in the API reference.
