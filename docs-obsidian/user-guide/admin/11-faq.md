---
title: "Administrator Guide - FAQ"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-27
---

# FAQ

Every answer points to the chapter with the full steps.

## Users and access

**How do I stop a person who has left?**
Set the user `Status` to `Locked` or `Disabled` and save. The person cannot sign in on the web or on a handheld, a session that is open ends on the next request, and the API keys of the user are refused. An API key that was accepted a moment ago can work for up to 30 seconds more (cache). See `02-users-roles-permissions.md`.

**How do I reset a password?**
Open `Enterprise > Users & Roles > Users`, open the user, fill `Password` on the tab `General`, click `Save`. An empty `Password` keeps the old one.

**Why can the user not open Enterprise mode?**
Only users with the `ADMIN` role in at least one warehouse can.

**A button gives `Forbidden(...)`. What do I do?**
Open `Permission Matrix`. Find the server action or API method named in the message. Give the role the `execute` right. See `02-users-roles-permissions.md`, section 5.

**A new role cannot do anything. Why?**
A custom role starts with no server-action rights. Grant them in the matrix.

**A supervisor is refused after an upgrade. Why?**
The seeder uses `ON CONFLICT DO NOTHING`, so a long-lived database may miss new default rights. An administrator needs the right `admin.rbac.reseed` and the reseed procedure in `docs-obsidian/runbooks/rbac-cutover.md`.

**Can I change the code of a role?**
No. The role code is stable identity. Change `Name` or `Description`.

## Warehouse and master data

**How do I add a second warehouse?**
There is no screen. The installer must create the schema, run the migrations and insert the row. See `03-warehouse-structure.md`, section 1.

**What does location status `Hold` mean? Can I set it?**
It is calculated from active holds. Place or release a hold instead. See `05-inbound-setup.md`, section 4.

**Why can I not create more than 10,000 locations at once?**
`MAX_GENERATED_LOCATIONS` is 10,000. Run the wizard in blocks. See `03-warehouse-structure.md`, section 4.

**How do I add a value to a code list (a unit, a damage reason, a hold word)?**
1. Open `Sidebar > Warehouse Configuration > Settings & Reference Data > Code List`.
2. Open the list. Only lists with `Editable` on can change (16 lists in the warehouse database).
3. In `Code List Values`, click `New Value`.
4. Fill `Code`, `Display Order`, `Description`, `Active`. Click `Save`.
Then check that the screens that use the list show the value.

**How do I change a system setting?**
Open `Sidebar > Warehouse Configuration > Settings & Reference Data > System Settings`. Change the `Value`. Click `Save`. Only rows with `Editable` on can change. The list edits only the value.

**How do I translate a label?**
Enterprise mode: `Translations`. Two tabs: labels and messages. Open an item. In `Translations`, fill `Translation` for the `Language`. The English text is the base text. Only `ADMIN` can open this screen.

## Inbound

**Why does putaway suggest no location?**
The putaway policy has no steps, or no step finds a location. See `05-inbound-setup.md`, section 5.

**Why can I not close a receipt?**
Typical causes: code 71 (needs a supervisor), code 73 (open serial capture), code 77 (damage without disposition). See `05-inbound-setup.md`, section 1.

**What is the difference between a hold on a receipt and a hold on stock?**
A receipt hold holds every open line. A stock hold (`Holds`) is placed on a lot, a location or a container.

## Outbound

**Why can I not edit an allocation policy?**
A published or retired policy is fixed. Click `Duplicate`. See `06-outbound-setup.md`, section 3.

**Why does an order not get a carton plan?**
The SKU has no size or weight in its pack, or no cartonization policy fits. Read the tab `Cartonization exceptions`.

**Why does a picker get "you have no right to take Pick tasks"?**
No `Task Permissions` row for the operator and the work area. See `03-warehouse-structure.md`, section 6.

**Can I ship from the system?**
Yes. Use `Ship order` for one fully picked order, or plan a Dispatch and Load for a reviewed multi-order departure. Loading is not shipment: the separate Goods Issue confirmation deducts stock irreversibly. See `06-outbound-setup.md`, section 10.

**Can I set up replenishment?**
Yes. Configure each SKU's pick location `Min`, `Max` and `Unit`, allow replenishment on the pick zone, grant the `Replenish` task right, and review its replenishment-policy urgency. See `06-outbound-setup.md`, section 11.

**Can I plan waves in the web UI?**
Yes. Use `Management & Control > Orders & Waves > Waves` for manual composition, station assignment, release and retry. Wave-policy rules remain API-only. See `06-outbound-setup.md`, section 4.

## Printing and reports

**Nothing prints.**
Check in this order: a printer configuration, a `Warehouse` printer assignment, `LABEL_RENDERER_URL`, the printer network. See `07-printing-and-labels.md`.

**The Reports page shows a banner.**
See the table in `08-reports-and-dashboards.md`, section 1.

## General

**What does a version conflict message mean?**
`Someone changed this record after you opened it. Look at the current version and make your change again.` Refresh the record and repeat.

**Where do I see who changed what?**
`Enterprise > Audit` for permissions. Each document has its own `Audit` tab (receipts, SKUs).

**Where are the server logs?**
Files `logs/wms-server.log.YYYY-MM-DD` on the server (project note).

**Where do I find the field meanings of a screen that this guide does not cover?**
Use `Enterprise > Platform Tools > RPC Documentation` for API fields. For screens, each form is defined in the meta-ui database.
