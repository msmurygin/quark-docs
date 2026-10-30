# Who can do what

This page shows which default role may use each receiving button, and which API right and web action stands behind it.
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
| Open the list and the receipt (read) | the list forms | `list_receipt`, `get_receipt`, `list_receipt_detail`, ... | Yes | Yes | Yes |
| `New`, `Save` (header) | `generic_new`, `generic_save` | `create_receipt`, `update_receipt` | No | Yes | No |
| `Delete` receipt | `generic_delete`, `generic_delete_selected` | `delete_receipt`, `delete_many_receipt` | No | Yes | No |
| `New` line, `Save` line | `generic_new`, `generic_save` | `create_receipt_detail`, `update_receipt_detail` | No | Add: yes. Edit: no. | No |
| `Delete` line | `generic_delete_selected` | `delete_receipt_detail`, `delete_many_receipt_detail` | No | No | No |
| `Receive` | `receipt_receive` | `receipt_receive_against_asn` | Yes | Yes | No |
| `Resume scan`, serial scan | `receipt_resume_serials`, `receipt_capture_serial` | `capture_serial` | Yes | Yes | No |
| `Adjust Qty` | `generic_rpc_command` | `receipt_adjust_received_qty` | Yes | Yes | No |
| `Report damage` | The window `wms-report-damage` calls the API method. No server action of its own was found. | `receipt_report_damage` | No | No | No |
| `Put on Hold` | `receipt_put_on_hold` | `receipt_put_on_hold` | No | No | No |
| `Release Hold` | `receipt_release_hold` | `receipt_release_from_hold` | No | No | No |
| `Cancel Receipt` | `generic_rpc_command` | `receipt_cancel` | No | No | No |
| `Close Receipt` | `receipt_close` | `receipt_close` | No | No | No |
| `Move Boxes` | `generic_rpc_command` | `receipt_replace_pallet` | Yes | Yes | No |
| `Cancel Box` | `generic_rpc_command` | `receipt_cancel_planned_case` | Yes | No | No |

Where "No" is shown because of the web action, the API would allow the role. For example `receipt_close` is open to `OPERATOR` and `SUPERVISOR` in the API, because the RF terminal uses it. The web button `Close Receipt` is refused by the web action gate unless an administrator grants the action `receipt_close` to the role.

## How the cells were found

| Cell | Source |
|---|---|
| Web actions open to `SUPERVISOR` and `OPERATOR` | The allowlists in `crates/libs/wms-lib-auth/src/authorization/seeder.rs`. They hold `generic_*`, `receipt_receive`, `receipt_capture_serial`, `receipt_resume_serials` and `generic_rpc_command`. `receipt_put_on_hold`, `receipt_release_hold` and `receipt_close` are not in them. |
| API method lists | `declare_rpc_module!` blocks in `crates/services/app-server/src/web/rpcs/receipt_rpc.rs`, `receipt_detail_rpc.rs`, `receipt_commands_rpc.rs`, `case_level_commands_rpc.rs`, `serial_commands_rpc.rs`. |
| Extra grants of a new database | `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql` (roles 1002 `OPERATOR` and 1004 `SUPERVISOR`: `receipt_receive_against_asn`, `capture_serial`, `receipt_close`, `receipt_adjust_received_qty` for `OPERATOR`) and migrations `047`, `048`. |

`SUPERVISOR` also holds three overrides in the baseline: `receipt.override_close_discrepancy`, `receipt.override_qty_excess` and `receipt.override_qty_shortage`. They let a supervisor agree to a discrepancy at close, an excess receive, or a short receive. No other default role has them. See [Receiving a line](36-receiving-a-line.md) and [Closing a receipt](42-closing-a-receipt.md).

## Inconsistencies seen

- `OPERATOR` may add a line (`create_receipt_detail`) but may not save a change to it or delete it. Whether the web `Save` of a line is refused for `OPERATOR` was not run.
- `Cancel Receipt`, `Adjust Qty`, `Move Boxes` and `Cancel Box` all use the one web action `generic_rpc_command`. For these, the API method decides, and the refusal is the method's own message.
- `Close Receipt` is open to `OPERATOR` on the RF terminal and closed to `OPERATOR` on the web screen.

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Closing a receipt](42-closing-a-receipt.md)
- [Administrator guide: Inbound setup](../../admin/05-inbound-setup.md)
- API: the right of each method is on its page in Inbound API reference.
