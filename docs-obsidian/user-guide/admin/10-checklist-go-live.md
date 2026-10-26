---
title: "Administrator Guide - Go-Live Checklist"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Go-Live Checklist for a New Tenant

## 1. What you will do

Check that a new tenant has the minimum data to run the full path:
**receive -> putaway -> pick -> pack**.

## 2. Before you start

- The installer finished the platform part (section 3).
- You can sign in as an administrator.
- You read `00-README.md`, so you know what is not available.

## 3. Platform part (done by the installer)

| # | Item | Check | Source |
|---|---|---|---|
| P1 | The databases are migrated (enterprise, app, meta-ui). | `app-server check-dependencies` prints `app-server dependencies are valid`. | `app-server/src/cli.rs` |
| P2 | The configuration is valid. | `app-server check-config` prints `app-server configuration is valid`. | same |
| P3 | At least one warehouse exists: a schema plus a row in `enterprise.warehouse`. | A user can see the warehouse after sign-in. | `03-warehouse-structure.md`, section 1 |
| P4 | The RBAC seeder ran. | The `Permission Matrix` shows rows for all six roles. | `wms-lib-auth/src/authorization/seeder.rs` |
| P5 | The first administrator exists. | You can sign in. | Section 6, finding F1. |
| P6 | `REPORTS_SERVICE_URL` and `REPORTS_JWT_SECRET` (32 bytes or more) are set for the web UI. | `Sidebar > Reports` shows the catalogue. | `08-reports-and-dashboards.md` |
| P7 | `LABEL_RENDERER_URL` points to the renderer. | A test label renders. | `07-printing-and-labels.md` |
| P8 | The public WMS address uses HTTPS and the services run in production cookie mode. | App-server has `SERVICE_ENV=production`; web-ui-server has `UI_SERVICE_ENV=production`. A successful login returns `auth-token` and `wms-session-id` with `Secure; SameSite=Lax`. | `../reference/administration/92-sign-in-passwords-and-sessions.md` |

## 4. Data checklist

Legend: **Seeded** = the migration creates it. **Create** = you must create it. **N/A** = not available.

### 4.1 People

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 1 | Administrator, manager, supervisor, operators. | Create | `Enterprise > Users & Roles > Users` | `02-users-roles-permissions.md`, section 3. |
| 2 | Warehouse and role for each user. | Create | tab `Warehouses & Roles` | One `Default` per user. |
| 3 | Operators for the floor: `RF device login` on. | Create | user card | Operators come only from users with this switch on. |
| 4 | Role rights reviewed. | Review | `Permission Matrix` | `OPERATOR` can edit locations, SKUs and pack items by default. |
| 5 | A supervisor user for overrides. | Create | `SUPERVISOR` role | Close with discrepancy needs it. |

### 4.2 Structure

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 6 | Putaway zones. | Seeded: `DOCK`, `RACK` | `Topology > Putaway Zones` | Replace or add your own. New locations default to zone `DOCK`. |
| 7 | Special locations. | Seeded: `STAGE`, `PICKTO`, `LOST`, `QC`, `DAMAGE`, `RTV`, `RETURN`, `INTRANSIT`, `UNKNOWN`, `DOCK` | `Topology > Locations` | Do not delete `STAGE`, `PICKTO`, `LOST`, `DAMAGE`, `INTRANSIT`: zones and code refer to them by name. |
| 8 | Storage locations. | Seeded demo: 96 locations `A-01-0` to `D-06-3` (types `Case`, `Pick`) | `Topology > Locations` | Replace with your real map: use `Generate`. |
| 9 | A `Door` location (dock door). | Create | `Locations` | No `Door` location is seeded. Needed only if you choose `Door` as a drop type. |
| 10 | A `Pack` location for each pack station. | Create | `Locations` | No `Pack` location is seeded. |
| 11 | Work area with zones and a pack station. | Create | `Topology > Work Areas` | None is seeded. |
| 12 | Equipment profiles (if lifts are used). | Create | `Topology > Equipment Profiles` | None is seeded. |
| 13 | Operator task rights. | Create | `Task Manager > Operators` | One row per operator, task type and area. Without it: "you have no right to take Pick tasks ...". |

### 4.3 Master data

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 14 | Owners, suppliers, carriers, customers. | Seeded demo: `OWNER001/002`, `SUPP001-003`, `CARR001/002`, `CUST001/002` | `Owners` | Replace the demo names. |
| 15 | Owner `WH Settings`. | Seeded for the owners that have a row | owner card | Set the default putaway policy. |
| 16 | Units of measure. | Seeded: 32 | `Code > Code List` (`UOM`) | `Not available` as a screen for classes and factors. |
| 17 | Pack hierarchy. | Seeded: `STD` (PL > CS > IP > EA) | `Packs` | Create your own packs. |
| 18 | SKUs with weight, cube and pack. | Seeded demo: `NOLOT` | `SKU` | Weight and cube are needed for cartonization. |
| 19 | SKU barcodes. | Create | SKU barcode list | RF scanning needs them. |
| 20 | Lot policy. | Seeded: `STD`, `NOLOT` | `Policy > Lot Policy` | Set dates and attributes you need. |
| 21 | Serial config for serial SKUs. | Create | SKU tab `Serial Tracking` | Only when needed. |
| 22 | Custom attributes. | Optional | `Attributes` | |

### 4.4 Inbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 23 | Receipt policy. | Seeded: `STD` (allows everything, no quantity check) | `Policy > Receipt Policy` | Make a stricter one if needed. |
| 24 | Hold codes. | Seeded: 16 | `Code > Hold Codes` | |
| 25 | Damage actions per owner. | Seeded: Minor `None`, Major `Hold`, Total `Reject` | owner `WH Settings > Receiving` | |
| 26 | **Putaway policy with steps.** | Seeded policy `STD` has **no steps** | `Policy > Putaway Policy` | **You must add at least one step**, then set it as the owner default. |
| 27 | Settings: `PUTAWAY_RESERVATION_TTL_MIN`, `ALLOW_CLOSE_WITH_DISCREPANCY`, `MOVE_HOLD_POLICY`. | Seeded | `System Settings` | |

### 4.5 Outbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 28 | Order type. | Seeded: `SO` | n/a | No screen or API creates more. |
| 29 | Allocation policy. | Seeded: `STD` (published, one `Firm` step) | `Policy > Allocation Policy` | Duplicate it to change it. |
| 30 | Cartonization policy. | Seeded: `STD` with `BOX-S`, `BOX-M`, `BOX-L` | `Policy > Cartonization Policy` | Match the boxes to your real boxes. |
| 31 | Picking policy. | Seeded: `DISCRETE` (published) | `Policy > Picking Policies` | |
| 32 | Pick short reasons. | Seeded: `SHORT`, `LPN_NOT_FOUND`, `WRONG_LOCATION` | `Policy > Pick Short Reasons` | |
| 33 | Replenishment policy. | Seeded `STD` placeholder | | **N/A**: Not available in the current version. The SKU form still needs one. |
| 34 | Wave policy. | None | API only | Optional. |

### 4.6 Printing

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 35 | Label definitions and templates. | Seeded: 6 | API | `lpn_id_label`, `handling_unit_label`, `shipping_label` are used by code. |
| 36 | A printer configuration. | None | API | Needed to print. |
| 37 | A `Warehouse` printer assignment. | None | API / form not in menu | Without it: no label prints. |

### 4.7 Integration and reports

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 38 | Internal subscribers on. | Seeded on | `Enterprise > Integration > Subscribers` | Keep `quark_outbound_execution` and `quark_inventory_count` active. |
| 39 | IPaaS subscriber. | Seeded **off** | Subscribers | Turn on after IPaaS runs. |
| 40 | Report catalogue loaded. | Install step | report service | 16 reports. |
| 41 | Dashboard rail. | Seeded row with empty rail | `Control Center > Board Settings` | Pick six metrics. |

### 4.8 Not available

Shipping confirmation, loading, replenishment: Not available in the current version. The packing action `Repack` is available on the RF terminal.
Plan your process so that the goods leave after `Picked` or after packing, outside the product.

## 5. Dry-run test (receive -> putaway -> pick -> pack)

### Steps

1. Create a receipt: `Sidebar > Inbound > Receipts > New`. Add one line for a test SKU.
2. Receive on the RF terminal (or the web `Receive` window).
3. Check that stock appears in `Inventory Balances > Balances`.
4. Run putaway on the RF terminal. Check that a location is suggested. If not: `A policy with an empty pipeline suggests nothing.` Add steps.
5. Create an order: `Sidebar > Outbound > Orders > New`. Add a line.
6. Click `Allocate`. Check the tab `Picks`. Check the tab `Cartons`.
7. Click `Release`. Check `Task Manager > Task Board`.
8. Pick on the RF terminal with an operator who has task rights.
9. Pack at the pack station on the RF terminal. Check that the shipping label prints.

### What you should see

- Balances move from the receiving location to storage, then to a pick-to location, then into a carton.
- The order status reaches `Picked`.

### If something goes wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| No putaway suggestion. | Policy has no steps. | Section 4.4, item 26. |
| Allocation reserves nothing. | No stock, or the policy steps do not match, or stock is held. | Check stock, steps and holds. |
| Cartonization exceptions on the order. | SKU has no weight or size. | Fill weight and cube. |
| "you have no right to take Pick tasks". | No task permission. | Item 13. |
| No label. | No printer assignment or renderer. | Items 36 and 37. |

## 6. Findings about missing or unverified seeds

| # | Finding | Evidence |
|---|---|---|
| F1 | Fixed (F-01, commit `29c0cd6d7`). `app-server bootstrap-admin` now creates the user through `UserBmc::create` and gives it the `ADMIN` role in the first warehouse. Before the fix the insert failed on every installation. | `wms-lib-core/src/model/initial_admin.rs`. |
| F2 | There is no way in the web UI or API to create a warehouse. | `warehouse_rpc.rs` has two read methods. |
| F3 | The `wms-app` baseline carries demo data (owners, 96 locations, one SKU, one pack). It lands in every new warehouse schema. | `wms-app/migrations/001_baseline.sql` (`INSERT INTO owners`, `location`, `sku`). |
| F4 | The seeded putaway policy has no steps. | `putaway_policy_detail` has 0 rows after migration. |
| F5 | No `Door`, `Pack`, work area, equipment profile, printer, wave policy or handling unit type is seeded. | Row counts after migration. |
| F6 | The order type list cannot grow. | Only `get/list/count_order_type` exist. |
| F7 | Fixed (F-03, commit `5cb291af1`). `Locked` and `Disabled` users cannot sign in, lose open sessions and cannot use API keys. | `wms-lib-auth/src/user_status.rs`, `wms-lib-web/src/middleware/mw_auth.rs`. |
| F8 | Printer assignment form is not reachable from the menu. | No menu item or tab opens `printer_assignments_list_form`. |
| F9 | The sign-in message says 8 characters, the rule says 6. | `http_params.rs`. |
