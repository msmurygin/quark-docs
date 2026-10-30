---
title: "Administrator Guide - Go-Live Checklist"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-27
---

# Go-Live Checklist for a New Tenant

## 1. What you will do

Check that a new tenant has the minimum data to run the full path:
**receive -> putaway -> pick -> pack**.

## 2. Before you start

- You can sign in as an Enterprise administrator.
- You know the permanent storage units for weight, length and volume.
- You have the customer's approved warehouse map and master-data files.
- You know which inbound, picking, packing and shipping paths the site will use.

## 3. Configuration and data checklist

Legend: **Included** = present in the initial setup. **Create** = you must create it. **N/A** = not available.

### 3.1 People

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 1 | Administrator, manager, supervisor, operators. | Create | `Enterprise > Users & Roles > Users` | See [Create a user](02-users-roles-permissions.md#3-create-a-user). |
| 2 | Warehouse and role for each user. | Create | tab `Warehouses & Roles` | One `Default` per user. |
| 3 | Operators for the floor: `RF device login` on. | Create | user card | Operators come only from users with this switch on. |
| 4 | Role rights reviewed. | Review | `Permission Matrix` | Give each role only the screens and actions it needs. Test with a separate operator account. |
| 5 | A supervisor user for overrides. | Create | `SUPERVISOR` role | Close with discrepancy needs it. |

### 3.2 Structure

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 6 | Putaway zones. | Seeded: `DOCK`, `RACK` | `Warehouse Configuration > Topology > Putaway Zones` | Replace or add your own. New locations default to zone `DOCK`. |
| 7 | Special locations. | Seeded: `STAGE`, `PICKTO`, `LOST`, `QC`, `DAMAGE`, `RTV`, `RETURN`, `INTRANSIT`, `UNKNOWN`, `DOCK` | `Warehouse Configuration > Topology > Locations` | Do not delete `STAGE`, `PICKTO`, `LOST`, `DAMAGE`, `INTRANSIT`: zones and code refer to them by name. |
| 8 | Storage locations. | Seeded demo: 96 locations `A-01-0` to `D-06-3` (types `Case`, `Pick`) | `Warehouse Configuration > Topology > Locations` | Replace with your real map: use `Generate`. |
| 9 | A `Door` location (dock door). | Create | `Locations` | No `Door` location is seeded. Needed only if you choose `Door` as a drop type. |
| 10 | A `Pack` location for each pack station. | Create | `Locations` | No `Pack` location is seeded. |
| 11 | Work area with zones and a pack station. | Create | `Warehouse Configuration > Work Areas & Equipment > Work Areas` | None is seeded. |
| 12 | Equipment profiles (if lifts are used). | Create | `Warehouse Configuration > Work Areas & Equipment > Equipment Profiles` | None is seeded. |
| 13 | Operator task rights. | Create | `Warehouse Configuration > Operator Permissions > Operators` | One row per operator, task type and area. Without it: "you have no right to take Pick tasks ...". |

### 3.3 Master data

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 14 | Owners, suppliers, carriers, customers. | Seeded demo: `OWNER001/002`, `SUPP001-003`, `CARR001/002`, `CUST001/002` | `Owners` | Replace the demo names. |
| 15 | Owner `WH Settings`. | Seeded for the owners that have a row | owner card | Set the default putaway policy. |
| 16 | Units of measure. | Seeded: 32 | `Warehouse Configuration > Settings & Reference Data > Code List` (`UOM`) | `Not available` as a screen for classes and factors. |
| 17 | Pack hierarchy. | Seeded: `STD` (PL > CS > IP > EA) | `Packs` | Create your own packs. |
| 18 | SKUs with weight, cube and pack. | Seeded demo: `NOLOT` | `SKU` | Weight and cube are needed for cartonization. |
| 19 | SKU barcodes. | Create | SKU barcode list | RF scanning needs them. |
| 20 | Lot policy. | Seeded: `STD`, `NOLOT` | `Warehouse Configuration > Policies > Lot Policy` | Set dates and attributes you need. |
| 21 | Serial config for serial SKUs. | Create | SKU tab `Serial Tracking` | Only when needed. |
| 22 | Custom attributes. | Optional | `Attributes` | |

### 3.4 Inbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 23 | Receipt policy. | Seeded: `STD` (allows everything, no quantity check) | `Warehouse Configuration > Policies > Receipt Policy` | Make a stricter one if needed. |
| 24 | Hold codes. | Seeded: 16 | `Warehouse Configuration > Reason Codes > Hold Codes` | |
| 25 | Damage actions per owner. | Seeded: Minor `None`, Major `Hold`, Total `Reject` | owner `WH Settings > Receiving` | |
| 26 | **Putaway policy with steps.** | Seeded policy `STD` has **no steps** | `Warehouse Configuration > Policies > Putaway Policy` | **You must add at least one step**, then set it as the owner default. |
| 27 | Settings: `PUTAWAY_RESERVATION_TTL_MIN`, `ALLOW_CLOSE_WITH_DISCREPANCY`, `MOVE_HOLD_POLICY`. | Seeded | `System Settings` | |

### 3.5 Outbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 28 | Order type. | Seeded: `SO` | n/a | No screen or API creates more. |
| 29 | Allocation policy. | Seeded: `STD` (published, one `Firm` step) | `Warehouse Configuration > Policies > Allocation Policy` | Duplicate it to change it. |
| 30 | Cartonization policy. | Seeded: `STD` with `BOX-S`, `BOX-M`, `BOX-L` | `Warehouse Configuration > Policies > Cartonization Policy` | Match the boxes to your real boxes. |
| 31 | Picking policy. | Seeded: `DISCRETE` (published) | `Warehouse Configuration > Policies > Picking Policies` | |
| 32 | Pick short reasons. | Seeded: `SHORT`, `LPN_NOT_FOUND`, `WRONG_LOCATION` | `Warehouse Configuration > Reason Codes > Pick Short Reasons` | |
| 33 | Replenishment policy. | Seeded `STD` | `Replenishment Policy` | Verify urgency thresholds and `Empty location is urgent`. |
| 34 | Manual wave. | None | `Management & Control > Orders & Waves > Waves` | Optional; use for grouped release. Wave-policy rules remain API-only. |

### 3.6 Printing

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 35 | Label definitions and templates. | Seeded: 6 | API | `lpn_id_label`, `handling_unit_label`, `shipping_label` are used by code. |
| 36 | A printer configuration. | None | API | Needed to print. |
| 37 | A `Warehouse` printer assignment. | None | API / form not in menu | Without it: no label prints. |

### 3.7 Integration and reports

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 38 | Internal subscribers on. | Seeded on | `Enterprise > Integrations > Subscribers` | Keep `quark_outbound_execution` and `quark_inventory_count` active. |
| 39 | IPaaS subscriber. | Seeded **off** | Subscribers | Turn on after IPaaS runs. |
| 40 | Report catalogue loaded. | Install step | report service | 16 reports. |
| 41 | Dashboard rail. | Seeded row with empty rail | `Warehouse Configuration > Dashboards > Board Settings` | Pick six metrics. |

### 3.8 Load the customer's data

Load production data only after the warehouse structure and policies are approved.

1. Load owners, suppliers, carriers and customers through the UI or an approved integration.
2. Load the real location map, including zones, types, capacities and route sequence.
3. Load packs, SKUs, barcodes, lot and serial settings, weights and dimensions.
4. Load opening stock through a controlled receipt or an approved inventory adjustment. Do not write balances directly.
5. Compare record counts and a sample of values with the customer's source files.
6. Scan representative barcodes on the RF terminal before loading the full catalogue.
7. Keep the import result and rejected-row list with the go-live record. Correct rejected data and rerun only those rows.

See [Owners, SKU, units and packs](04-owners-sku-uom-pack-hierarchy.md), [Warehouse structure](03-warehouse-structure.md), [Inbound setup](05-inbound-setup.md), and [Integrations and API](09-integrations-and-api.md).

### 3.9 Outbound departure and replenishment

Before go-live, verify one complete departure in the path you will operate: direct `Ship order`, or `Dispatches` -> `Load Plans` -> `Loads` / RF `Loading` -> Goods Issue. Confirm that operators understand that `Loaded` is not `Shipped` and that shipment deducts stock irreversibly. Also run `Replenish Now` for a pick location at or below `Min`, then complete its RF replenishment task. See [Outbound setup](06-outbound-setup.md#10-dispatch-loading-and-goods-issue), sections 10 and 11.

## 4. Dry-run test (receive -> putaway -> pick -> pack -> ship)

### Steps

1. Create a receipt: `Sidebar > Management & Control > Receiving > Receipts > New`. Add one line for a test SKU.
2. Receive on the RF terminal (or the web `Receive` window).
3. Check that stock appears in `Management & Control > Inventory > Balances`.
4. Run putaway on the RF terminal. Check that a location is suggested. If not: `A policy with an empty pipeline suggests nothing.` Add steps.
5. Create an order: `Sidebar > Management & Control > Orders & Waves > Orders > New`. Add a line.
6. Click `Allocate`. Check the tab `Picks`. Check the tab `Cartons`.
7. Click `Release`. Check `Management & Control > Execution Control > Task Board`.
8. Pick on the RF terminal with an operator who has task rights.
9. Pack at the pack station on the RF terminal. Check that the shipping label prints.
10. For this one-order dry run, open the order, click `Ship order`, review the departure, and click `Confirm — ship and deduct stock`.
11. Check the order's `Fulfilment — base quantities` and `Shipments — base quantities` tabs and verify that the picked stock is no longer in warehouse balances.

### What you should see

- Balances move from the receiving location to storage, then to a pick-to location and into a carton; Goods Issue removes the shipped stock from warehouse balances.
- The order reaches `Picked`, then closes after the complete-order Goods Issue. The `Shipments — base quantities` tab shows its immutable receipt.

### If something goes wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| No putaway suggestion. | Policy has no steps. | Section 3.4, item 26. |
| Allocation reserves nothing. | No stock, or the policy steps do not match, or stock is held. | Check stock, steps and holds. |
| Cartonization exceptions on the order. | SKU has no weight or size. | Fill weight and cube. |
| "you have no right to take Pick tasks". | No task permission. | Item 13. |
| No label. | No printer assignment or renderer. | Items 36 and 37. |
| `Ship order` is refused. | Picking or packing is incomplete, the physical content changed, or the order belongs to a Load. | Finish the required work, refresh, or ship through the Load. |
