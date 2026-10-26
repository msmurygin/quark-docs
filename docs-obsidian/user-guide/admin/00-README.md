---
title: "Administrator Guide - Start Here"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Administrator Guide - Start Here

This guide is for the **customer administrator**.
That is the person who sets up a new warehouse tenant and keeps it running.

Every statement in this guide comes from the product metadata, the database
migrations or the code. Where the code does not prove a statement, the guide
says so in a block that starts with `> Not confirmed by code:`.

## How to read this guide

Each procedure uses the same layout:

1. **What you will do**
2. **Before you start**: permissions and data you need.
3. **Steps**: numbered, one action per step.
4. **Field reference**: a table of fields.
5. **What you should see**
6. **If something goes wrong**: message, meaning, fix.
7. **What this affects later**

Many screens have a real screenshot. Screens without one keep a placeholder line (see [MISSING-SCREENSHOTS](../assets/MISSING-SCREENSHOTS.md)) like this:

`![form_code - Title](../assets/screens/form-code.png)`

Terms:

- **Tenant**: one customer installation. It has one set of users and roles.
- **Warehouse**: one site of a tenant. Each warehouse has its own database schema (for example `wh1`).
- **Enterprise mode**: a view that is not tied to one warehouse. It holds Users & Roles, Translations and integration screens.
- **Menu path**: the click path in the left sidebar. This guide writes it as `Sidebar > Group > Item`.

## Who this is for

You are an administrator if you hold the **ADMIN** role in at least one warehouse.
Enterprise mode opens only for the ADMIN role
(`ENTERPRISE_ROLE_CODE = "ADMIN"` in `web-ui-server/src/domain/warehouse.rs`).
Most master-data screens also work for the **MANAGER** role (see `02-users-roles-permissions.md`).

## Order of setup

Do the steps in this order. Each step needs the data from the step before.

| Step | Guide | Result |
|---|---|---|
| 1 | `01-first-login-and-navigation.md` | You can sign in and find every screen. |
| 2 | `02-users-roles-permissions.md` | Users exist. Each user has a warehouse and a role. |
| 3 | `03-warehouse-structure.md` | Zones, locations (including Stage, Door, Pack, Pick-to) and work areas exist. |
| 4 | `04-owners-sku-uom-pack-hierarchy.md` | Owners, pack hierarchies and SKUs exist. Lot and serial rules are set. |
| 5 | `05-inbound-setup.md` | Receipts can be received. Putaway policy sends stock to locations. |
| 6 | `06-outbound-setup.md` | Orders can be allocated, picked and packed. |
| 7 | `07-printing-and-labels.md` | Labels and printers work. |
| 8 | `08-reports-and-dashboards.md` | Reports and the dashboard work. |
| 9 | `09-integrations-and-api.md` | ERP and other systems can connect (only what exists). |
| 10 | `10-checklist-go-live.md` | Final check before real work starts. |
| 11 | `11-faq.md` | Answers to common questions. |

## Important facts to know before you start

1. **There is no screen to create a warehouse.**
   The enterprise menu has entries named `Warehouses` and `Owners`, but they open no form.
   Warehouses are created outside the web UI (see `10-checklist-go-live.md`).
2. **User status `Locked` and `Disabled` block every way in.**
   Such a user cannot sign in, open sessions end on the next request, and the user's API keys are refused (`UserStatus::may_sign_in` in `wms-lib-auth/src/user_status.rs`). `Active` and `Invited` are let in.
3. **Shipping and loading are not available.** They are marked `Not available in the current version` where they appear. Replenishment works by min/max of the pick locations (below); the replenishment *policy* is still only a code.
4. **Wave policies have no web screen.** They exist only through the API (`06-outbound-setup.md`).
5. **Packing is done on the RF terminal**, not in the web UI. The web UI only prepares the data (pack-station locations and work areas).

## Feature status used in this guide

| Feature | Status | Evidence |
|---|---|---|
| Receiving, putaway, damage, holds | Available | Screens and RPCs exist. |
| Allocation, order release, picking, cartonization | Available | Screens and policies exist. |
| Packing (Verify action at a pack station) | Available on RF only | `wms-outbound/src/packing/README.md` |
| Packing "Repack" action | Available on RF only | `wms-outbound/src/packing/README.md` ("Repack"); RF screens `PACK10` to `PACK14` (`rf-screens/108_uc_pack_repack.sql`). |
| Shipping confirmation | Not available in the current version | `wms-outbound/src/shipping/README.md`: "reserved; no compiled Rust module yet". |
| Loading and trailers | Not available in the current version | `wms-outbound/src/loading/README.md`: same text. |
| Replenishment by min/max of pick locations | Available | Every 5 minutes, and by «Replenish Now» on `Replenishment` (meta-ui 173): a pick location at or below its `Min` gets Replenish tasks up to `Max`, done on the RF terminal (`Inventory > Replenish`). Switched on per putaway zone (`Replenishment Allowed`). See `06-outbound-setup.md` section 11. |
| Replenishment policy | Placeholder | meta-ui migration 048: the screen keeps only a policy code; replenishment does not read it. |
| Wave planning | API only | `wms-outbound/src/waves/README.md`; no wave form in meta-ui. |

Nothing reads the replenishment policy — replenishment works from the pick locations' `Min`/`Max` alone. The code only stores it: on the SKU (`replenishment_policy_id`, required, default `1`) and as an owner default. The table is marked "Reserved identity placeholder" (wms-app migration 024). See `04-owners-sku-uom-pack-hierarchy.md`.
