# Dates tab

The `Dates` tab holds eight dates of the receipt.
The form is `receipt_dates_form`. The data table is `receipt`.
All fields are date and time pickers. Every field is optional.

## Fields

| Label | Column | Type | Required | Default | What it does |
|---|---|---|---|---|---|
| `Receipt Date` | `receipt_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Effective Date` | `effective_date` | Date and time | No | Empty | Stored only. It has no effect today. See the warning below. |
| `Close Date` | `close_date` | Date and time | No | Empty | Set by the system when the receipt is closed. Nothing else reads it. See the warning below. |
| `Arrival Date` | `arrival_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Actual Ship Date` | `actual_ship_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Scheduled Ship Date` | `scheduled_ship_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Promised Ship Date` | `promised_ship_date` | Date and time | No | Empty | Stored only. It has no effect today. |
| `Planned Ship Date` | `planned_ship_date` | Date and time | No | Empty | Stored only. It has no effect today. |

How "stored only" was checked: a search of the Rust code, the SQL migrations, the RF screens and the web components found no reader of these columns other than the code that writes them.
The writers are the patch type in `crates/libs/wms-inbound/src/service/receipt/planning/contracts.rs:146-153` and the update method in `crates/services/app-server/src/web/rpcs/receipt_rpc/header_commands.rs:92-98`.

The list `Receipts` shows `Receipt Date`, `Effective Date` and `Arrival Date` as columns and can filter by them.
That is the only use.

## Values and format

- The dates are shown and typed in the date format of your user (`Date Format` on the user card).
- The value is stored with its time zone (`timestamp with time zone`).
- The server reads the date as an exact moment (RFC 3339). A date without a time is not accepted by the API.

## Which fields can be saved

| Field | Save on a new receipt | Save on a saved receipt |
|---|---|---|
| `Receipt Date`, `Arrival Date`, the four ship dates | Yes | Yes, while the receipt is not `Closed` or `Cancelled` |
| `Effective Date`, `Close Date` | Yes | **No.** The server refuses the whole save. |

When you change `Effective Date` or `Close Date` of a saved receipt and press `Save`, the request carries a field the server does not accept.
The server answers with an "unknown field" error and nothing is saved, including your other changes.
Source: `ReceiptUpdateApi` has `deny_unknown_fields` and does not list these two fields (`header_commands.rs:68-99`). The fields are not marked read only in the metadata (`bio_fields` of the bio `receipt`).

> Not confirmed by code: the exact text the screen shows for this refusal. To verify: open a saved receipt, change `Effective Date` on the `Dates` tab, press `Save`.

## Messages

| When | Message |
|---|---|
| The receipt is `Closed` or `Cancelled` | `receipt {id} is {status} - cannot edit receipt reference in its current lifecycle state` |
| You changed `Effective Date` or `Close Date` | An "unknown field" refusal (see above). |

## Related pages

- [Header tab](10-header-tab.md)
- [Editing a receipt](31-editing-a-receipt.md)
- [Messages catalogue](93-messages-catalogue.md)
- API: `update_receipt`
