---
title: "Administrator Guide - Go-Live Checklist"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-11-12
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

Before configuring the warehouse, create it through the path shown on the
Enterprise home. A subscription-backed installation opens **Change capacity**
on the **Limits** card, then uses **Add a warehouse** on the capacity page. An
installation without that link uses `Warehouses > Add warehouse`. Wait for **Preparation status** to become
**Ready**, then activate the warehouse and assign its users. See [Warehouse
Structure](03-warehouse-structure.md#1-create-and-activate-a-warehouse).

Legend: **Included** = supplied by the standard installation or warehouse
bootstrap. **Create** = you must create or assign it for the customer.
**Review** = check the supplied configuration and approve it for the site.
**Optional** = configure it only when the process needs it. **Install step** =
load it through the approved installation procedure. **Demo only** = sample
data that is not part of a new customer warehouse. **N/A** = not available.

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
| 6 | Putaway zones. | Included: `DOCK` | `Warehouse Configuration > Topology > Putaway Zones` | Create the customer's storage zones. `RACK` is not included automatically. |
| 7 | Special locations. | Included: `DAMAGE`, `DOCK`, `INTRANSIT`, `LOST`, `PICKTO`, `QC`, `RETURN`, `RTV`, `STAGE`, `UNKNOWN` | `Warehouse Configuration > Topology > Locations` | Review these locations before activation. Warehouse Bootstrap creates `INTRANSIT` with type **In transit (open pick pallets)** only during the warehouse's first initialization. It does not add a missing location later. Exactly one location of this type must exist. |
| 8 | Storage locations. | Create | `Warehouse Configuration > Topology > Locations` | Generate or import the approved warehouse map. The sample `A-01-0` to `D-06-3` map is demo data only. |
| 9 | A `Door` location (dock door). | Included: `DOCK` | `Locations` | Create additional doors when the physical warehouse needs them. |
| 10 | A `Pack` location for each pack station. | Create | `Locations` | Bootstrap does not create pack stations. |
| 11 | Work area with zones and a pack station. | Create | `Warehouse Configuration > Work Areas & Equipment > Work Areas` | Create each operational area and connect it to its zones and stations. |
| 12 | Equipment profiles (if lifts are used). | Create | `Warehouse Configuration > Work Areas & Equipment > Equipment Profiles` | Create the profiles used by the site's equipment. |
| 13 | Operator task rights. | Create | `Warehouse Configuration > Operator Permissions > Operators` | One row per operator, task type and area. Without it: "you have no right to take Pick tasks ...". |

### 3.3 Master data

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 14 | Owners, suppliers, carriers, customers. | Create | `Owners` | `OWNER001`, `SUPP001`, `CARR001` and `CUST001` are demo examples, not customer records. |
| 15 | Owner `WH Settings`. | Create | owner card | Set the policies and receiving rules for each owner. |
| 16 | Units of measure. | Included: 32 | `Warehouse Configuration > Settings & Reference Data > Code List` (`UOM`) | Review the supplied codes and use the ones approved for the customer. |
| 17 | Pack hierarchy. | Create | `Packs` | Create the real pallet, case, inner-pack and each-level relationships. `STD` is demo data. |
| 18 | SKUs with weight, cube and pack. | Create | `SKU` | `NOLOT` is demo data, not a customer SKU. Weight and cube are needed for cartonization. |
| 19 | SKU barcodes. | Create | SKU barcode list | RF scanning needs them. |
| 20 | Lot policy. | Create | `Warehouse Configuration > Policies > Lot Policy` | Create the policies required by the customer's lot, date and attribute rules. `STD` and `NOLOT` are not included automatically. |
| 21 | Serial config for serial SKUs. | Create | SKU tab `Serial Tracking` | Only when needed. |
| 22 | Custom attributes. | Optional | Define fields in `Product Data > Attributes`, then fill `Custom fields` on SKU and location cards. | Use active SKU or location definitions when putaway or allocation policies depend on them. |

### 3.4 Inbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 23 | Receipt policy. | Create | `Warehouse Configuration > Policies > Receipt Policy` | Create, save and assign the checks required by the customer. `STD` is demo data. |
| 24 | Hold codes. | Included: 16 | `Warehouse Configuration > Reason Codes > Hold Codes` | Review which codes block inbound work, outbound work or both. |
| 25 | Damage actions per owner. | Review | owner `WH Settings > Receiving` | New owners default to `None` for minor damage, `Hold` for major damage and `Reject` for total damage. Review and change these actions for the customer's process. |
| 26 | **Putaway policy with steps.** | Create | `Warehouse Configuration > Policies > Putaway Policy` | Add at least one step, publish the policy and set it as the owner default. |
| 27 | Settings: `PUTAWAY_RESERVATION_TTL_MIN`, `ALLOW_CLOSE_WITH_DISCREPANCY`, `MOVE_HOLD_POLICY`. | Included | `System Settings` | Review the values before activation. |

### 3.5 Outbound

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 28 | Order type. | Create | Approved onboarding or API workflow | Create the active order type required by the outbound process. `SO` is not included automatically. |
| 29 | Allocation policy. | Create | `Warehouse Configuration > Policies > Allocation Policy` | Create at least one effective step and publish the policy. `STD` is demo data. |
| 30 | Cartonization policy. | Create | `Warehouse Configuration > Policies > Cartonization Policy` | Create the policy and real carton types. `STD`, `BOX-S`, `BOX-M` and `BOX-L` are demo conventions, not included customer data. |
| 31 | Picking policy. | Create | `Warehouse Configuration > Policies > Picking Policies` | Create and publish the policy used by each work area and equipment profile. `DISCRETE` is not included customer data. |
| 32 | Pick short reasons. | The General Distribution reference configuration includes `SHORT`, `LPN_NOT_FOUND` and `WRONG_LOCATION`, but Bootstrap does not create them. After selecting the profile, explicitly apply its reviewed configuration and confirm these reasons are published. Otherwise create and publish the codes approved for the warehouse. | `Warehouse Configuration > Reason Codes > Pick Short Reasons` | |
| 33 | Replenishment policy. | Create | `Warehouse Configuration > Policies > Replenishment Policy` | Set the urgency rules. Set `Min Qty`, `Max Qty` and UOM on each pick location to control the replenishment quantity. `STD` is demo data. |
| 34 | Waves and wave strategies. | Create | `Management & Control > Orders & Waves` | If the site uses waves, create and configure an active strategy. Preview it without confirming the run, then verify its filters, limits, station, schedule and release mode. |

### 3.6 Printing

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 35 | Label definitions and templates. | Install step | approved label setup workflow | Create the required label definitions and templates. Demo labels are not installed in a customer warehouse. |
| 36 | A printer configuration. | Create | approved printer setup workflow | Needed to print. |
| 37 | A `Warehouse` printer assignment. | Create | approved printer setup workflow | Assign the printer to the warehouse; without the assignment, no label prints. |

### 3.7 Integration and reports

| # | Item | Status | Where | Notes |
|---|---|---|---|---|
| 38 | Internal subscribers on. | Included and active | `Enterprise > Integrations > Subscribers` | Keep `quark_outbound_execution` and `quark_inventory_count` active. |
| 39 | IPaaS subscriber. | Included and inactive | Subscribers | Turn on after IPaaS runs. |
| 40 | Report catalogue loaded. | Install step | report service | The standard catalogue contains 20 report definitions. |
| 41 | Dashboard rail. | Create | `Warehouse Configuration > Dashboards > Board Settings` | Select the metrics the operation will monitor. Demo board settings are not customer configuration. |

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
| The terminal says that the warehouse has no location of type `InTransit`. | The warehouse was initialized without the system location used by open pick pallets. | In **Locations**, first confirm that no **In transit (open pick pallets)** location exists. If it is absent, create `INTRANSIT` with that type and putaway zone `DOCK`, then confirm that its displayed status is **Ok**. If the type already exists under another code, do not create a second one; have an administrator or support restore the canonical `INTRANSIT` location before picking. |
| No label. | No printer assignment or renderer. | Items 36 and 37. |
| `Ship order` is refused. | Picking or packing is incomplete, the physical content changed, or the order belongs to a Load. | Finish the required work, refresh, or ship through the Load. |
