# RF Terminal Operator Guide

This guide is for warehouse operators who use the RF terminal.
It describes the screens exactly as they appear on the terminal.
Screen texts come from the screen definitions in `crates/libs/wms-lib-sql/sql/rf-screens/`.
Error texts come from the server code.

## What you will do

Use this page to find the right guide, learn the RF keys, and look up a term.

## Guides

| # | Guide | Use it when you want to |
|---|-------|-------------------------|
| 01 | [Login and warehouse](01-login-and-warehouse.md) | Sign in and choose a warehouse |
| 02 | [Receiving against an ASN](02-receiving-against-asn.md) | Receive goods that have an ASN, and capture serial numbers |
| 03 | [Blind receiving and returns](03-blind-receiving-and-returns.md) | Receive without an ASN, receive by case, or receive a customer return |
| 04 | [Damage and receipt close](04-damage-and-receipt-close.md) | Receive damaged goods, correct a quantity, close a receipt |
| 05 | [Putaway](05-putaway.md) | Move a received pallet to its storage location |
| 06 | [Move](06-move.md) | Move stock from one location to another |
| 07 | [Stock inquiry](07-inventory-inquiry.md) | Look up stock |
| 08 | [Inventory count](08-inventory-count.md) | Count a location, or only an item in it |
| 09 | [Picking](09-picking.md) | Pick orders (discrete pick, pick by area, carriers) |
| 10 | [Packing, verify and repack](10-packing-verify.md) | Check and close boxes at a pack station, or repack a pallet into cartons |
| 11 | [Troubleshooting and messages](11-troubleshooting-and-messages.md) | Understand a message |

## Processes that are not available yet

The screen definitions contain **no** RF screens for these processes:

- Stage, load and ship.
- Replenishment.

Do not look for them on the terminal. Ask your supervisor how to do this work.

> The workflows listed in this guide describe the documented operator tasks. Your RF menu follows the configuration of your installation; further workflow guides will be added as the documentation expands.

## How to read these guides

Every process guide has the same parts:

1. What you will do
2. Before you start
3. Steps
4. What you should see
5. If something goes wrong
6. Related guides

In the steps, text in **bold** is exactly what the terminal shows.
Text in `code format` is a key to press or a value to type or scan.
A line that starts with `![...]` is a screen picture. Some screens still have no picture yet; the list is in [MISSING-SCREENSHOTS](../assets/MISSING-SCREENSHOTS.md).

Some messages contain a value from your system, such as a number or a code.
In this guide the value is written in braces, for example `{location}`.
Your terminal shows the real value.

Most messages are built by the server and the terminal shows them as they are. A few are worded by the terminal itself, for example **Invalid username or password**, **Session expired. Please sign in again.** and **No permission: {screen}**. When the terminal knows the screen title, it shows that title; otherwise it shows **No permission**. Internal server command names are kept in the support log, not shown to the operator. The wording can change after a software update.

## The main menu

After you sign in, the terminal shows **Main Menu** (header **WMS RF Terminal**).
The status line says **Select function — Esc to change warehouse**.

| Key | Item | Guide |
|-----|------|-------|
| `1` | **Receiving** | 02, 03, 04 |
| `2` | **Inventory** | 05, 06, 07, 08 |
| `3` | **Picking** | 09 |
| `4` | **Packing** | 10 |

The submenus are listed below.

**Receiving** (menu title **Receiving**, header **Receiving Menu**):

| Key | Item |
|-----|------|
| `1` | **Receive Against ASN** |
| `2` | **Receive Case-Level** |
| `3` | **Receive Blind** |
| `4` | **Receive Return** |
| `5` | **Close Receipt** |
| `6` | **Receive Damaged** |
| `7` | **Resume Serial Capture** |
| `8` | **Force-Close Episode (supervisor)** |

**Inventory** (menu title **Inventory**, header **Inventory Menu**):

| Key | Item |
|-----|------|
| `1` | **Stock Inquiry** |
| `2` | **Move Stock** |
| `3` | **Putaway** |
| `4` | **Count Location** |

**Picking** (menu title **Picking**, header **Picking Menu**):

| Key | Item |
|-----|------|
| `1` | **Discrete Pick** |
| `2` | **Pick by Area** |
| `3` | **Deliver Carrier** |
| `4` | **Force-Close Episode (supervisor)** |

> The key numbers follow the order of the items in the screen definition. If your terminal shows the items with other numbers, use the numbers on the terminal.

## RF keys

These keys work the same way on all screens.

### Keys on every screen

| Key | What it does |
|-----|--------------|
| `Esc` | Goes back one screen. On some screens it asks you to confirm first. |
| `F1` | Goes to **Main Menu**, unless the screen gives `F1` another job. |
| `Ctrl+C` or `Ctrl+Q` | Closes the RF session. |
| `F2` to `F8` | Do the job named in the footer. The footer shows the label, for example **Close** or **Short**. |

If a footer key is greyed out, it is not available now.
If a screen does not use `F5` and `F6`, they turn the page back and forward.

### Menus

| Key | What it does |
|-----|--------------|
| `1` to `8` | Opens the item with that number on the current page. |
| `9` | Shows the next page (**More**). |
| `0` | Shows the previous page (**Back**). |
| `PgDn` / `PgUp` | Same as `9` and `0`. |

### Forms (screens with fields)

| Key | What it does |
|-----|--------------|
| `Enter` or `Tab` | Goes to the next field. On the last field, it sends the form. |
| `Down` | Goes to the next field. It never sends the form. |
| `Up` or `Shift+Tab` | Goes to the previous field. |
| `Left` / `Right` | Changes the value of a choice field (for example **UOM**). |
| A letter | On a choice field, selects the value that starts with that letter. |
| `Space`, `Y`, `N` | On a yes/no field (for example **Vendor fault?**), `Space` switches the value. `Y` sets yes. `N` sets no. |
| `Backspace` | Deletes the last character. |
| `F2` | On a field with a list, opens the list. The footer shows **lookup**. |

Some fields send the form as soon as they are full or as soon as you scan.
These fields are called auto-submit fields. A scan ends with `Enter`, so a scan sends the field.

Some fields **remember your last value**. When you open the screen again, the field starts with the value you last sent from it in this sign-in session. The second line of a receipt then goes to the place where the first line went. The terminal shows the value before you type. Type over it to change it. The memory lives only in the terminal: it is not saved on disk, and a new sign-in starts empty. A send that the server refuses remembers nothing, and a field sent empty is forgotten. Today the field **To Loc** (**Loc** on case-level receiving) does this on the receiving line screens of **Receive Against ASN**, **Receive Blind**, **Receive Return** and **Receive Case-Level**.

An empty input field on the main flows shows a short grey **hint** of what to scan or type, for example `Scan or type SKU` or `Scan staging location`. The hint is not a value: it disappears when you type, and an empty field stays empty. A hint longer than the field is cut with `…`. Choice fields, yes/no fields, read-only lines and the lot attribute fields show no hint (`placeholder`, `clients/rf-go/internal/screen/types.go`; seeded by `rf-screens` revisions of the login, receiving, putaway, move, inquiry, picking and counting screens).

Some lines show a **colour**. The colour is a meaning, not a decoration: green means fine, yellow means look at it, red means an error, blue is a hint. For example, on **Receipt Summary** the line **Status** is green when the receipt is `Full` and yellow when it is `Over`, and the line **Serials** is yellow while serials are missing and green when all are collected.

### Lists

Some screens show a list.

| Key | What it does |
|-----|--------------|
| `Up` / `Down` | Moves the cursor. |
| `Enter` | Chooses the highlighted row. |
| `Esc` | Closes the list or goes back. |

If the list is empty, the status line tells you. Press `Esc`.

### Questions with Y and N

Some screens ask a question, for example **Exit** or **Keep scanning**.

| Key | What it does |
|-----|--------------|
| `Y` | Says yes. |
| `N` | Says no. |
| `Esc` | Cancels the question. The status line shows **Cancelled**. |

### Choice screens (routers)

Some screens show numbered choices, for example **Count — Finish**.
Press the key shown for the choice. `Esc` goes back.

## Scanning rules

- Scan a code into the active field. The scanner sends `Enter` at the end.
- Most codes are changed to upper case for you.
- Some fields (`SKU` on receiving screens, `LPN` on **Stock Inquiry** and **Move — Find Stock**) can read a label with several data fields. See [Guide 11](11-troubleshooting-and-messages.md#scanning-a-label-with-several-fields).

## Roles

- Operators can do the floor work in these guides.
- A **supervisor** is needed for: **Force-Close Episode (supervisor)**, a **Supervisor Override** screen, and **Supervisor Confirmation** screens.
- Which user may use which function is set by your administrator.

The code gives each role default permissions when a system is set up. An administrator can change them later, and a change is kept. So your system may differ from the defaults. For the Operator role the defaults are:

- Allowed: receive against an ASN, blind receive, return receive, case-level receive, move cases to another pallet, adjust a received quantity, close a receipt (a close with a difference still needs a supervisor), pick, pack, count, stock inquiry.
- Move stock and putaway: a fresh database gives the Operator role these two. Systems that were set up another way may give them to managers only. See guides 05 and 06.
- Not allowed: cancel a planned case (supervisor), force-close a serial capture (supervisor), and the supervisor-only picking and counting commands.

If you see **No permission: {screen}** or **No permission**, tell your supervisor which screen you were using and what you tried to do.

## Glossary

Each term is explained once here. The terms are written as they appear on the screens.

| Term | Meaning |
|------|---------|
| **ASN** | Advance shipping notice. A document that says what goods will arrive. A receipt is created from it. The field label is **ASN #**. |
| **Receipt** | The document that records what you received. It has lines. Statuses seen on screens: **Closed**. |
| **Owner** | The company that owns the goods. |
| **SKU** | The code of an item. A barcode of the item (GTIN) also works. |
| **Pack** | The packaging scheme of an SKU. |
| **UOM** | Unit of measure. The choices are `EA` (each), `IP`, `CS` (case) and `PL` (pallet). |
| **LPN** | License plate number. The label code of a pallet or container. **loose** means stock that is not in an LPN. |
| **Lot** | A batch of the same goods. A lot can have attributes, such as colour or dates. |
| **Location** | A place in the warehouse. Examples seen on screens: `STAGE`, `DAMAGE`, `RETURNS`. |
| **Serial** | The unique number of one unit. A **Serial-tracked** SKU needs one serial per unit. |
| **Episode** | A serial capture that is open. It stays open until you scan all serials or a supervisor force-closes it. |
| **RMA** | Return merchandise authorization. The reference of a customer return. The field label is **RMA #**. |
| **Condition** | Your visual assessment of a returned item: **Resaleable**, **Needs refurb**, **Damaged**, **Discard**. |
| **Severity** | How bad the damage is: **Cosmetic**, **Minor**, **Major**, **Total**. |
| **Hold** | A block on stock. Held stock cannot be used until the hold is lifted. The screens show **HOLD**. |
| **ATP** | Available to promise. The quantity that is free to use. |
| **Alloc** | Allocated. Quantity reserved for orders. |
| **Putaway** | Moving received goods to a storage location. |
| **Supervisor override** | A supervisor signs in on your terminal to allow an action that is normally refused. |
| **Pick** | One request to take goods from a location. |
| **DROPID** / **Pallet** | The pallet label for picked goods. A pallet label starts with `DRP`. |
| **Short** | You found less than the required quantity. You must give a reason code. |
| **Reject** | You refuse a pick and give a reason. |
| **Work area** | A zone where you pick or count. |
| **Equipment** | What you use to move goods, such as a cart. **On foot** means no equipment. |
| **Carrier** | A cart or tray with numbered places. Boxes sit on its places. |
| **Position** / **Place** | A numbered spot on a carrier that holds one box. |
| **Box** | A carton on a carrier or at a pack station. |
| **Assignment** | The work you hold for one carrier, with its route. |
| **Route** | The list of stops (locations) for a carrier. |
| **Dissolve** | Cancel an assignment. Boxes go back to the registry and tasks go back to the pool. |
| **Count** | A stock count of one location. |
| **Pack station** | The place where boxes are checked, weighed and closed. |

## Related guides

Start with [01 Login and warehouse](01-login-and-warehouse.md).
