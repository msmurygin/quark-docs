---
title: "Administrator Guide - Start Here"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-27
---

# Administrator Guide - Start Here

This guide is for the **customer administrator**.
That is the person who sets up a new warehouse tenant and keeps it running.

This guide describes the administrator workflows and controls available in the
current product. Follow the linked screen references for field-level details.

## How to read this guide

Each procedure uses the same layout:

1. **What you will do**
2. **Before you start**: permissions and data you need.
3. **Steps**: numbered, one action per step.
4. **Field reference**: a table of fields.
5. **What you should see**
6. **If something goes wrong**: message, meaning, fix.
7. **What this affects later**

Screenshots in this guide are captured from the current product, reviewed in English and published only after the labels and layout have been checked.

Terms:

- **Tenant**: one customer installation. It has one set of users and roles.
- **Warehouse**: one site of a tenant. Each warehouse has its own database schema (for example `wh1`).
- **Enterprise mode**: a view that is not tied to one warehouse. It holds Users & Roles, Translations and integration screens.
- **Menu path**: the click path in the left sidebar. This guide writes it as `Sidebar > Group > Item`.

## Who this is for

You are an administrator if you hold the **ADMIN** role in at least one warehouse.
Enterprise mode opens only for the ADMIN role.
Most master-data screens also work for the **MANAGER** role. See [Users, Roles and Permissions](02-users-roles-permissions.md).

## Order of setup

Do the steps in this order. Each step needs the data from the step before.

| Step | Guide | Result |
|---|---|---|
| 1 | [First Login and Navigation](01-first-login-and-navigation.md) | You can sign in and find every screen. |
| 2 | [Users, Roles and Permissions](02-users-roles-permissions.md) | Users exist. Each user has a warehouse and a role. |
| 3 | [Warehouse Structure](03-warehouse-structure.md) | Zones, locations (including Stage, Door, Pack, Pick-to) and work areas exist. |
| 4 | [Owners, SKUs, Units and Packs](04-owners-sku-uom-pack-hierarchy.md) | Owners, pack hierarchies and SKUs exist. Lot and serial rules are set. |
| 5 | [Inbound Setup](05-inbound-setup.md) | Receipts can be received. Putaway policy sends stock to locations. |
| 6 | [Outbound Setup](06-outbound-setup.md) | Orders can be allocated, picked, packed, loaded and shipped; pick locations can be replenished. |
| 7 | [Printing and Labels](07-printing-and-labels.md) | Labels and printers work. |
| 8 | [Reports and Dashboards](08-reports-and-dashboards.md) | Reports and the dashboard work. |
| 9 | [Integrations and API](09-integrations-and-api.md) | ERP and other systems can connect. |
| 10 | [Go-Live Checklist](10-checklist-go-live.md) | Final check before real work starts. |
| 11 | [FAQ](11-faq.md) | Answers to common questions. |
| 12 | [Build a Custom Report](12-build-custom-reports.md) | Create a report with parameters, read-only SQL datasets and a Typst template. |

## Important facts to know before you start

1. **Create warehouses from Enterprise mode.** Open `Enterprise > Warehouses`, click **Add warehouse**, fill the code, name, schema and storage units, then click **Create warehouse**. Wait for **Ready** before assigning users or activating the warehouse. See [Warehouse Structure](03-warehouse-structure.md#1-create-and-activate-a-warehouse).
2. **User status `Locked` and `Disabled` block every way in.**
   Such a user cannot sign in, open sessions end on the next request, and the user's API keys are refused. `Active` and `Invited` are let in.
3. **Loading and Goods Issue are separate decisions.** A `Loaded` Load has not deducted stock. Shipment is an explicit, irreversible Goods Issue. See [Dispatch, loading and Goods Issue](06-outbound-setup.md#10-dispatch-loading-and-goods-issue).
4. **Manual waves have a web screen; wave policies do not.** Use `Management & Control > Orders & Waves > Waves` for manual composition and release. Rule-based wave-policy configuration remains API-only.
5. **Packing is done on the RF terminal**, not in the web UI. The web UI only prepares the data (pack-station locations and work areas).

## Feature status used in this guide

| Feature | Status | How it is used |
|---|---|---|
| Receiving, putaway, damage, holds | Available | Web setup and RF operator flows. |
| Allocation, order release, picking, cartonization | Available | Web screens, policies and RF picking. |
| Packing and repack | Available on RF | Use the Packing terminal menu at a pack station. |
| Shipping confirmation | Available | Use **Ship order** for one complete order, or whole-Load Goods Issue after loading. |
| Dispatch, load planning and loading | Available | Web screens for dispatches, load plans, transport resources and loads; RF loading flow. |
| Replenishment by pick-location min/max | Available | A pick location at or below **Min** receives work up to **Max**. Operators use `Inventory > Replenish`; the zone must allow replenishment. See [Replenishment](06-outbound-setup.md#11-replenishment-of-pick-locations-minmax). |
| Replenishment policy | Available | Controls urgency thresholds and whether an empty pick location is urgent. |
| Manual wave planning | Available | `Management & Control > Orders & Waves > Waves` provides reviewed add, remove, station and release actions with per-order results. |
| Wave policy | API only | Policy preview and build-now methods can create draft waves by rule. |

Replenishment quantity still comes from each pick location's **Min** and **Max**. The SKU's replenishment policy sets task urgency; it does not replace the min/max trigger. See [Replenishment](06-outbound-setup.md#11-replenishment-of-pick-locations-minmax).
