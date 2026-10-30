# Adjustment reasons

Every [adjustment](22-adjustments-list.md) has a **reason**, and every line may have its own. A reason says what the adjustment may do: add stock, remove stock, whether it needs a comment, whether it needs approval, and whether the locations it changed are counted after posting.
The `Adjustment Reasons` screen shows the list of reasons and lets you change **one** of these settings: counting after posting.

The form is `inventory_adjust_reason_list_form`. The data object is `inventory_adjust_reason`, over the code list `inv_adjust_reason` (code list id 1031). The list is read by `inventory_adjust_reason_list`.

## How to open it

1. Sign in and select a warehouse.
2. In the left sidebar open `Warehouse Configuration`, then `Reason Codes`.
3. Click `Adjustment Reasons`.

The sidebar item is `inventory_adjust_reason_list_menu` (tab `tab_inventory_adjust_reason_list`).

## Columns

Every column is read only. Retired reasons are listed too.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `ID` | `id` | Whole number | Hidden. The id of the value in the code list. |
| `Code` | `code` | Text | The code, for example `LOST`. |
| `Reason` | `description` | Text | The name, translated through the code list. |
| `Active` | `active` | Yes or no | Whether the reason can be chosen now. A retired reason is refused when it is chosen, validated or posted. |
| `Adds Stock` | `allow_positive` | Yes or no | The reason may raise a quantity. |
| `Removes Stock` | `allow_negative` | Yes or no | The reason may lower a quantity. |
| `Comment Required` | `requires_comment` | Yes or no | The line or the document must carry a comment. |
| `Approval Required` | `requires_approval` | Yes or no | The document must be approved before it can be posted. |
| `Count After Posting` | `count_after_post` | Yes or no | After the post, each location whose stock this reason changed is counted. |

The values come from the `metadata` of each value of the code list: `allow_positive`, `allow_negative`, `requires_comment`, `requires_approval`, `count_after_post`. A key that is missing reads as the strictest answer: no direction allowed, comment required, approval required, no count.

## The reasons a new database has

| Code | Name | Adds stock | Removes stock | Comment required | Approval required |
|---|---|---|---|---|---|
| `DAMAGE` | Damage | No | Yes | No | No |
| `FOUND` | Found stock | Yes | No | No | No |
| `LOST` | Lost stock | No | Yes | No | No |
| `COUNT_VARIANCE` | Count variance | Yes | Yes | No | No |
| `ERP_RECONCILIATION` | ERP reconciliation | Yes | Yes | No | Yes |
| `DATA_FIX` | Data fix | Yes | Yes | Yes | Yes |
| `QUALITY` | Quality | No | Yes | No | No |
| `EXPIRY` | Expiry | No | Yes | No | No |
| `CUSTOMER_REQUEST` | Customer request | Yes | Yes | Yes | No |
| `OTHER` | Other | Yes | Yes | Yes | Yes |
| `REVERSAL` | Reversal of a posted adjustment | Yes | Yes | Yes | No |

`COUNT_VARIANCE` is the reason of the adjustment that a count makes when a supervisor accepts a variance. `REVERSAL` is used only by `Reverse`; it cannot be chosen by hand.
The settings other than `Count After Posting` have **no screen of their own**. The code list and its values are marked as not editable (`editable` is false in `053_the_inventory_adjustment_document.sql`).

## What each setting does

- **Adds / Removes**: checked at `Validate` and again at `Post`, on the real change of the line. A line whose change is 0 passes any reason. Messages: `reason {code} does not allow adding stock (+{n})`, `reason {code} does not allow removing stock ({n})`.
- **Comment required**: `Save` of the header, and `Validate`, need a comment on the header or on the line. Message: `reason {code} requires a comment`.
- **Approval required**: if any reason used by the document (the header's or a line's) asks for it, the document is `Needs Approval` and `Post` is refused until `Approve`. Message: `the adjustment's reason requires approval before posting`.
- **Count after posting**: when the post changes a line, the location of that line is counted (event `process.inventory.count_requested`, source `Adjustment`). The location is named once, in code order. An adjustment that a count made asks for nothing.

## Toolbar buttons

| Button | Needs | What it does |
|---|---|---|
| `Count After Posting` | One ticked reason | Turns `Count After Posting` on for that reason. |
| `Do Not Count` | One ticked reason | Turns it off. |
| `Refresh` | Nothing | Reads the list again. |

The grey text of the first two is `Tick a reason`. The value is **set**, not toggled: pressing `Count After Posting` twice leaves it on.

| Result | Message |
|---|---|
| Turned on | `Reason {code}: a posted adjustment counts the locations it changed` |
| Turned off | `Reason {code}: a posted adjustment counts nothing` |
| No row | `Tick one reason` |
| The list changed | `The list has moved on — tick the reason again and retry` |
| Refused | `Reason {code} was not changed: {error}` |

The server refuses a code that is not on the list: `reason {code} is not on the adjustment reason list`.

See [Setting count after posting](58-setting-count-after-posting.md).

## Who can use it

Reading: `ADMIN`, `MANAGER`, `SUPERVISOR`, `VIEWER`. The two buttons: `ADMIN`, `MANAGER`. See [Who can do what](91-who-can-do-what.md).

## Related pages

- [Adjustment header](23-adjustment-header.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- [Setting count after posting](58-setting-count-after-posting.md)
- API: `inventory_adjust_reason_list`, `inventory_adjust_reason_set_count` (stateless command)
- RF terminal: none.
