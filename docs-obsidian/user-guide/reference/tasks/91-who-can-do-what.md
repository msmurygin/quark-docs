# Who can do what

This page shows which default role may use each Task Manager button, and which web action and API method stand behind it.
It describes the **defaults** that a new database gets. An administrator can change every cell in `Permission Matrix`. A change made there wins over this page.

Three gates apply to a screen:

1. **The menu item and the form.** A role needs the `menu_item` right to see the sidebar item, and the `form` right to open the form.
2. **The web action.** The server checks that the role may run the action behind the button.
3. **The API method.** The action calls an API method that has its own list of roles.

A button works only when all gates are open.

## Roles

`ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER`. `ADMIN` and `MANAGER` get everything on this page by default.

## Gate 1: seeing the screens

| Role | Menu items | Forms |
|---|---|---|
| `ADMIN`, `MANAGER` | Yes | Read and write |
| `OPERATOR` | Yes | Read and write |
| `VIEWER` | Yes | Read |
| `SUPERVISOR` | No | None |

## Gates 2 and 3: buttons

`Yes` means the default role has the right. `No` means it has not.
The `SUPERVISOR` column assumes an administrator has already granted that role the screens (gate 1).

| Screen and button | Web action | API method | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|---|
| Open any list (read) | `generic_rpc_query`, `query_list_form` | See the next table | see next table | see next table | see next table |
| Every `Refresh` | `generic_refresh` | none | Yes | Yes | Yes |
| Task Board: `Return to Pool` | `generic_rpc_command` | `task_force_release` | Action: yes. Method: **no** | No | No |
| Task Board: `Reassign` | `generic_rpc_command` | `task_reassign` | Action: yes. Method: **no** | No | No |
| Task Board: `Delete Task` | `task_delete_confirm` | `task_delete_many` | Action: yes. Method: **no** | Action: no | No |
| Pick Assignments: `Dissolve` | `generic_rpc_command` | `pick_assignment_dissolve_supervised` | Yes | Action: yes. Method: **no** | No |
| Pick Target Exceptions: `Retry` | `generic_rpc_command` | `cartonization_exception_retry` | Yes | Action: yes. Method: **no** | No |
| Operators: `Sync` | `operator_sync` | `sync_operators` | No | No | No |
| Operator card: `Save` | `generic_validate`, `generic_save` | `update_operator` | Action: yes. Method: **no** | Action: yes. Method: **no** | No |
| Task Permissions: `New`, `Save` | `generic_new`, `generic_validate`, `generic_save` | `create_operator_task_permission`, `update_operator_task_permission` | Action: yes. Method: **no** | Action: yes. Method: **no** | No |
| Task Permissions: `Delete` | `generic_delete`, `generic_delete_selected` | `delete_operator_task_permission`, `delete_many_operator_task_permission` | Action: yes. Method: **no** | Action: yes. Method: **no** | No |

`ADMIN` and `MANAGER` can use every button above.

### Read methods behind the lists

| List | API method | `ADMIN` | `MANAGER` | `SUPERVISOR` | `OPERATOR` | `VIEWER` |
|---|---|---|---|---|---|---|
| Task Board | The screen reads the view `task_board` directly. No API method. | n/a | n/a | n/a | n/a | n/a |
| Skip History | The screen reads the view `task_skip_board` directly. No API method. | n/a | n/a | n/a | n/a | n/a |
| Pick Assignments and card | `pick_assignment_list`, `pick_assignment_board_get`, `pick_assignment_position_list` | Yes | Yes | Yes | No | No |
| Pick Target Exceptions | `cartonization_exception_list` | Yes | Yes | Yes | No | No |
| Operators | `list_operator`, `get_operator` | Yes | Yes | No | Yes | Yes |
| Task Permissions | `list_operator_task_permission`, `get_operator_task_permission` | Yes | Yes | No | Yes | Yes |

## How the cells were found

| Cell | Source |
|---|---|
| Web actions open to `SUPERVISOR` and `OPERATOR` | `OPERATIONAL_ACTION_ALLOWLIST` in `crates/libs/wms-lib-auth/src/authorization/seeder.rs:35-132`. It holds `generic_save`, `generic_new`, `generic_delete`, `generic_delete_selected`, `generic_validate`, `generic_refresh`, `generic_rpc_query` and `generic_rpc_command`. |
| `task_delete_confirm` open to `SUPERVISOR` only | `SUPERVISOR_ACTION_ALLOWLIST`, `seeder.rs:154-173`. |
| `operator_sync` open to `ADMIN` and `MANAGER` only | The function `default_server_action_grant`, `seeder.rs:190-202`. `operator_sync` is in no list. |
| `VIEWER` web actions | `VIEWER_READ_SERVER_ACTIONS`, `seeder.rs:176-184`: refresh and query actions only. |
| API method lists | The `declare_rpc_module!` blocks of `crates/services/app-server/src/web/rpcs/task_commands_rpc.rs` (roles `Admin`, `Manager`), `operator_rpc.rs` and `pick_assignment_rpc.rs`. |

## Inconsistencies seen

- The code comments in `task_commands_rpc.rs`, `seeder.rs` and `release.rs` speak of a "supervisor band" for `task_reassign`, `task_force_release` and `task_delete`. The role list in code is `Admin, Manager` only. `SUPERVISOR` has no default right to these methods. See findings file `docs-obsidian/plans/reference-findings-tasks.md`.
- For the three task buttons, `SUPERVISOR` holds the web action and lacks the method. The button opens and the command is refused.
- `OPERATOR` holds the web action `generic_rpc_command` and `generic_save`, but the methods behind the buttons on `Pick Assignments`, `Pick Target Exceptions`, `Operators` and `Task Permissions` refuse it.

## Related pages

- [Task Manager](00-task-manager-overview.md)
- [Return codes](92-return-codes.md)
- Administrator guide: `Permission Matrix`
- API: the right of each method is on its page in the Tasks API reference and the Outbound API reference.
