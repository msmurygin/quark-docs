# 11 Troubleshooting and messages

## What you will do

Understand the messages the terminal shows, and know what to do.

## Before you start

- Read the status line at the bottom of the screen. It shows the last message.
- A message with a value in braces, such as `{location}`, shows a real value on your terminal.
- Most messages come from the server. Their text can change after an update.

## Steps

1. Read the message on the status line, or under the field.
2. Find the message in the tables below.
3. Do the action in the table.
4. If the action does not help, tell your supervisor. Say the screen title and the message.

## How the terminal shows a problem

| What you see | What it means |
|--------------|---------------|
| A message on the status line, and the screen stays | The server refused the action. Fix the data and press `Enter` again. |
| A field marked as wrong | A required field is empty, or the value does not fit. Fix the field. |
| The terminal does not react to keys | The terminal waits for the server. Wait a few seconds. |
| **Cancelled** | You pressed `Esc` or `N` on a question. Nothing was done. |
| A new screen **Supervisor Override** or **Supervisor Confirmation** | A supervisor must approve. |

## Supervisor approval

Some actions need a supervisor. The terminal opens a screen with **Supervisor** and **Password** fields.

1. Read the reason on the screen.
2. Give the terminal to the supervisor.
3. The supervisor types the user name and password. The password shows as `*`.
4. The supervisor presses `Enter`.
5. The terminal returns to the previous screen. Repeat your action.

The screens are:

| Screen | Where | Reason shown |
|--------|-------|--------------|
| **Supervisor Override** (`RCCLOSE_OVR`) | Receipt close | **Received differs from expected — a supervisor must authorize the close** |
| **Supervisor Override** (`INVMOV_OVR`) | Move | **Held or restricted stock — a supervisor must authorize** |
| **Supervisor Override** (`PUTW_OVR`) | Putaway | **The location breaks a putaway rule — a supervisor must authorize** |
| **Supervisor Confirmation** (`PICK13_OVR`) | Close pallet | **This pallet belongs to another operator - a supervisor must confirm the close** |
| **Supervisor Confirmation** (`PKA_OVR`) | Dissolve | **Goods are already on the carrier - a supervisor must confirm the dissolve** |

If the supervisor approval does not work, you may see a message that the grant cannot be used. The supervisor must approve again.

## Messages that can appear on any screen

| Message | What it means | What to do |
|---------|---------------|------------|
| **No permission: {screen} ({function})** | Your user may not use this function. | Tell your supervisor. |
| **receipt was modified concurrently, please retry** | Someone changed the same record at the same time. | Send the form again. Some screens try again by themselves. |
| **receipt is locked, please retry (timeout {ms}ms)** | Someone else is using the record. | Wait a moment. Send again. |
| **order is locked by another operation (waited {ms}ms)** | Same, for an order. | Wait. Send again. |
| **idempotency key conflict — generate new UUID for retry** | The terminal sent a request again with changed data. | Start the action again from the first screen. |
| **version conflict on {thing}** | Someone changed the record you work on. | Open the record again. |
| **Cancelled** | You said no to a question. | Nothing was done. |

If the terminal cannot reach the server, the status line turns red. It shows the technical error text of the failed call, for example `jrpc transport: ...` followed by the network reason (such as "connection refused"). The terminal waits at most 10 seconds for an answer. You stay on the same screen. The error is also written to the terminal log. Wait a moment and send again. If it repeats, tell your supervisor.

If your session has ended, the status line says **Session expired. Please sign in again.** Sign in again.

## Scanning a label with several fields

Some labels hold several data fields, such as an item code (GTIN) and a serial number.

- On the **SKU** field of the receiving scan screens, a scan of such a label fills **SKU** and, when it has one, the serial field.
- On the **LPN** field of **Stock Inquiry** and **Move — Find Stock**, a scan fills the **LPN**.
- The terminal reads such a scan on `Enter` or `Tab`. A label is recognised when it starts with `]` or contains a group separator.
- A value that you type by hand is not read this way.
- If the server cannot read the label, its message shows under the field. Scan again, or type the value.

The server reads the label with the barcode formats stored in the system. With the standard GS1 formats the fields fill like this:

| Data in the label | Fills |
|-------------------|-------|
| Item code (GTIN, AI 01 or 02) | **SKU** (on the receiving screens) |
| Serial number (AI 21) | The serial field (receiving screens only) |
| Pallet code (SSCC, AI 00) | **LPN** (on **Stock Inquiry** and **Move — Find Stock**) |
| Supplier batch (AI 10), expiry and other dates (AI 11 to 17) | The lot field with the same name on the line screen, if the screen has it |

Your administrator can change the stored formats. After a change, the same label can fill other fields.

## Messages by process

The tables in each guide list the messages for that process:

| Process | Guide |
|---------|-------|
| Sign in and warehouse | [01](01-login-and-warehouse.md) |
| Receiving against an ASN, serial capture | [02](02-receiving-against-asn.md) |
| Blind, case-level and return receiving | [03](03-blind-receiving-and-returns.md) |
| Damage, receipt close, force-close | [04](04-damage-and-receipt-close.md) |
| Putaway | [05](05-putaway.md) |
| Move | [06](06-move.md) |
| Stock inquiry | [07](07-inventory-inquiry.md) |
| Inventory count | [08](08-inventory-count.md) |
| Picking | [09](09-picking.md) |
| Packing | [10](10-packing-verify.md) |

## Common situations

| Situation | What to do |
|-----------|------------|
| You pressed a wrong key and left a screen | Open the same menu item again. Some screens remember what you entered. |
| You must stop in the middle of serial capture | Press `Esc`, answer `Y` (**Exit**). Later use **Resume Serial Capture**. |
| A list is empty | Read the status line. Press `Esc`. Change the filter. |
| You do not see a function you need | Ask your supervisor for the right user or role. |
| You need stage, load, ship or replenishment | These processes have no RF screens yet. Ask your supervisor. |
| You use the browser version (WebRF) | The screens and keys are the same. The footer shows the keys as buttons. |

On a phone, the keys of the footer are buttons, for example **Esc Back**. A tap on a button sends the same key as the keyboard. The tap does not close the on-screen keyboard. A button that is not allowed on the screen is grey. Menu rows and list rows can be tapped too. With a hardware keyboard or a scanner, the keys `F1` to `F12`, `Enter`, `Esc`, `Tab`, the arrow keys and `Page Up` / `Page Down` work as in the terminal. `Left` and `Right` work only on a field where you choose a value from a short list. `Ctrl` + `]` types the group separator of a scanned label; the field shows it as ␝.

## What the supervisor sees

Failed actions are written to the server log. Supervisors and support can find them with the time and your user name.

The server writes one line for every call, with the command name, the user, the warehouse, the duration and the outcome. By default these lines go to the file `logs/app-server.log.YYYY-MM-DD` in the folder where the server runs (one file per day, JSON lines). The terminal program has its own file, `rf-terminal.YYYY-MM-DD.log`, in its log folder (default `logs`). Ask support for the exact folders of your installation.

## Related guides

- [00 README](00-README.md)
