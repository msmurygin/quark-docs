# Screen reference

This part of the guide describes the web screens one by one.
It answers the question "what does this field, this button, this message do?".

The other parts of the guide are written around a job ("receive goods", "set up a warehouse").
This part is written around the **screen**.
Use it when you have a screen open and want the exact facts about it.

> This reference grows with the product. The table below lists the areas currently documented.

## What is written here

| Section | Screens it covers | Start page |
|---|---|---|
| **Inbound** | The receipts list (`Management & Control > Receiving > Receipts`), the receipt screen with its header tabs and its lines, the line card with its tabs, and every dialog and button on them. | [Receipts list](inbound/00-receipts-overview.md) |
| **Outbound** | The orders list (`Management & Control > Orders & Waves > Orders`), the order screen with its six tabs (header, ship to, picks, tasks, cartons, cartonization exceptions), the lines list and the line card, and every dialog and button on them (release, allocate, unallocate, delete picks, cancel quantity, cancel). | [Orders list](outbound/00-orders-overview.md) |
| **Administration** | The Enterprise sidebar: `Users & Roles`, `Permission Matrix`, `Audit`, `Shared Handling Unit Types`, `Translations`, `Integrations` and `Platform Tools`. Also sign-in, passwords and sessions. | [Enterprise sidebar](administration/00-administration-overview.md) |
| **Task Manager** | `Management & Control > Execution Control` for Task Board and Pick Assignments, `Management & Control > Exceptions` for Pick Target Exceptions and Skip History, and `Warehouse Configuration > Operator Permissions > Operators`, with every dialog and button on them. | [Task Manager](tasks/00-task-manager-overview.md) |
| **Inventory** | `Management & Control > Inventory`: `Balances` (seven tabs and the Move stock document), `Holds`, `Adjustments`, `Counts`, `Lot Transfers`, `Replenishment` and `Pending Move-In`; `Management & Control > History > Transactions`; and `Warehouse Configuration > Reason Codes > Adjustment Reasons`. | [Inventory](inventory/00-inventory-overview.md) |

Only things that exist in the product are described.
A feature that has no screen is not mentioned.

## How a section is organised

Every section follows the same order.

1. **Screen overview.** What the screen is, how to open it, what each button does, who may use it.
2. **One page per tab or sub-form.** Every tab has a field table.
3. **Task pages.** Short pages that start with a verb: "Creating...", "Receiving...", "Closing...". They have numbered steps.
4. **Reference pages.** Statuses and transitions, who can do what, return codes, a catalogue of messages.

The page numbers in the file names only set the order.
They are not shown in the sidebar.

## How to read a page

### Field tables

A field table has these columns.

| Column | Meaning |
|---|---|
| **Label** | The text on the screen, in English. |
| **Column** | The database column behind the field. The table name is on the page. |
| **Type** | The kind of value. For text it also gives the length limit that the database enforces. |
| **Required** | `Yes` when the screen refuses to save without it, or the database refuses a missing value. |
| **Allowed values / default** | What you can enter, and what the field holds when you do not enter anything. |
| **What it does** | What the program does with the value. |

Each page also has a **What it affects** note for fields that matter.
A source reference looks like `crates/.../file.rs:123`. It points to the line of code that reads the value.

### "Stored only"

When a field has the note **Stored only. It has no effect today.** it means this:
the value is saved and shown, but no rule, check, report or screen reads it to decide anything.
This was checked by searching the code.
Keep the field for your own information, but do not expect the system to act on it.

### Not confirmed by code

Some facts cannot be proven by reading the code alone.
They are marked like this:

> Not confirmed by code: what is unclear. To verify: exact steps.

Follow the steps on a test warehouse before you rely on the fact.

### Related pages

Every page ends with a list of related pages.
It always names the API method behind a button and, where one exists, the RF terminal screen that does the same work.

## Where the facts come from

- The screens are defined in the metadata database (`wms-meta-ui` migrations): menus, forms, tabs, fields, labels, toolbar buttons.
- Column types and defaults come from the warehouse database migrations (`wms-app`).
- Rules and messages come from the receiving code (`wms-inbound`) and from the web server's receipt actions.
- Who can press a button comes from the default permission lists in the code. An administrator can change them in `Permission Matrix`.

## Related guides

- [Administrator guide: Inbound setup](../admin/05-inbound-setup.md)
- [Administrator guide: Receipt policy](../admin/policies/40-receipt-policy-settings.md)
- [Operator guide: Receiving against an ASN](../operator/02-receiving-against-asn.md) (RF terminal)
