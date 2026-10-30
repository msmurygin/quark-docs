---
title: "Putaway Settings Reference - Putaway Zone"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Putaway zone settings

A putaway zone groups locations. Putaway searches one zone at a time.
Capacity limits and a temperature range can be set on a zone.
A zone can also hold lot mixing rules.

This file lists every column of the zone and of the zone lot mixing rule.
Read `00-putaway-overview.md` first for the order of work.

Related files: policy and steps in `01-putaway-policy-steps-and-criteria.md`; locations in `03-location-settings.md`.

## How to read this file

- Screen: `Sidebar > Warehouse Configuration > Topology > Putaway Zones`. List form `putawayzone_list_form`.
  Open a row. The card has three tabs: `General`, `Capacity`, `Printer Settings`.
  Below the tabs there is a list of lot mixing rules (see section 3).
- Roles: `Admin` and `Manager` create, change and delete zones and zone rules.
  `Operator` and `Viewer` can read.
- Table: `putawayzone` (`BASELINE:4174`). `BASELINE` is `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql`.
- Paths to code start at `crates/libs/` unless they start with `crates/services/`.
- "Stored only. It has no effect today." means: no code in any crate reads the value.
- Units: stored as grams, millimetres and cubic millimetres. The screen converts to the warehouse display unit
  for the fields marked "physical" (weight and volume). Counts and temperatures are not converted.
- All limits: `0` means "no limit". A limit of `0` is not a block.
  Putaway reports the check as not run (`..:no_limit`) and still offers the location.

## Seed values

Two zones come with a new warehouse (`BASELINE:8627`):

| Code | Description | Inbound / Outbound / Picking / Missing | Color | Limits |
|---|---|---|---|---|
| `DOCK` | Dock | `STAGE` / `STAGE` / `PICKTO` / `LOST` | `#4A90D9` | all 0, no temperature |
| `RACK` | Rack | `STAGE` / `STAGE` / `PICKTO` / `LOST` | `#D97B4A` | all 0, no temperature |

Zone `DOCK` is also the default zone of a new location (`location.putawayzone` default `'DOCK'`). Do not delete it.

## 1. Fields on the card

### 1.1 Code

| Item | Value |
|---|---|
| UI label | `Code` (required). Tab `General`. |
| Column | `putawayzone.code` |
| Type and values | Text, up to 20 characters. Primary key. Unique. |
| Default | No default. |
| What it does | The name of the zone. All other tables point at it. |
| Affects | Locations (`location.putawayzone`), SKU preferred zone (`sku.putawayzone`), putaway steps (`to_zone`, `from_zone`), allocation policy steps, work areas (which zones an operator group serves), equipment profile zone exclusions, cycle count scope. FKs: `BASELINE:16751, 16891, 17073, 17479, 17507, 18109, 18249`. |
| Example | `COLD`, `BULK`, `PICK`. |
| Interacts with | Cannot be renamed. The update command fixes `code` to "not changed". |
| When empty | A zone needs a code. |
| If you change it | You cannot. To rename: create the new zone, set `Putaway Zone` on the locations and SKUs, change the steps, then delete the old zone. |

Delete rules: the delete is refused while any location, SKU, putaway step, allocation step, work area or equipment exclusion points at the zone.
Zone lot rules go with the zone (CASCADE).
The error is a database foreign-key error that names the constraint, for example `fk_location_putawayzone`.

### 1.2 Description

| Item | Value |
|---|---|
| UI label | `Description`. Tab `General`. |
| Column | `putawayzone.description` |
| Type and values | Text, up to 60 characters. NOT NULL. |
| Default | Empty text (`''`). Seeds: `Dock`, `Rack`. |
| What it does | A readable name. |
| Affects | The zone list column `Description`. The 3D warehouse legend (it shows the description, or the code when empty: `public/assets/js/warehouse-3d.js:121-125, 1903`). The zone pick list in the step editor (`zones` source, `crates/libs/wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql:6357`: `COALESCE(description, code)`). |
| Example | `Cold store 2-8 C`. |
| Interacts with | Because the column is never NULL, the step editor's zone list shows an empty name for a zone with an empty description. The 3D page does fall back to the code. Fill in the description. |
| When empty | See above. |
| If you change it | Display only. |

### 1.3 Inbound Location

| Item | Value |
|---|---|
| UI label | `Inbound Location` (list column: `Inbound Loc`). Tab `General`. Pick list of locations. |
| Column | `putawayzone.inbound_loc` |
| Type and values | Location code. NOT NULL. FK to `location(code)`, RESTRICT (`fk_putawayzone_inbound_loc`). |
| Default | `STAGE`. Seeds: `STAGE`. |
| What it does | Meant as the waiting place for goods coming into the zone. |
| Affects | Stored only. It has no effect today. The value is only checked when you save: the location must exist, otherwise `Location XYZ not found`. I searched all crates, SQL views and the Go RF client. Nothing reads it. |
| Example | `STAGE`. |
| Interacts with | You cannot delete the location while a zone names it (RESTRICT). |
| When empty | On create, an empty value is replaced by `STAGE`. |
| If you change it | Nothing else changes. |

### 1.4 Outbound Location

| Item | Value |
|---|---|
| UI label | `Outbound Location` (list column: `Outbound Loc`). Tab `General`. |
| Column | `putawayzone.outbound_loc` |
| Type and values | Location code. NOT NULL. FK RESTRICT (`fk_putawayzone_outbound_loc`). |
| Default | `STAGE`. |
| What it does | Meant as the waiting place for goods leaving the zone. |
| Affects | Stored only. It has no effect today (same search as 1.3). |
| Example | `STAGE`. |
| Interacts with | Same as 1.3. |
| When empty | Replaced by `STAGE` on create. |
| If you change it | Nothing else changes. |

### 1.5 Picking To Location

| Item | Value |
|---|---|
| UI label | `Picking To Location`. Tab `General`. |
| Column | `putawayzone.picking_toloc` |
| Type and values | Location code. NOT NULL. FK RESTRICT (`fk_putawayzone_picking_toloc`). |
| Default | `PICKTO`. |
| What it does | The place picked goods are taken to. It is the "to location" of a pick task when the task is made. |
| Affects | Task generation: each pick task gets `to_location` = the `picking_toloc` of the zone of the pick's source location. Also the delivery place of a pick that has lost its task. |
| Example | Zone `PICK` picks go to `PICKTO`. Zone `COLD` picks go to `COLD-OUT`. |
| Interacts with | The owner's `Pick drop location` (`owners.picking_toloc`) comes first for closing a pick pallet. The zone value is used only when the owner has none. The owner's location must be of type `Pickto`, `Stage` or `Door`. This zone field has no type rule. |
| When empty | Replaced by `PICKTO` on create. |
| If you change it | Applies to tasks made **after** the change. Existing tasks keep their `to_location`. |

### 1.6 Missing To Location

| Item | Value |
|---|---|
| UI label | `Missing To Location`. Tab `General`. |
| Column | `putawayzone.missing_toloc` |
| Type and values | Location code. NOT NULL. FK RESTRICT (`fk_putawayzone_missing_toloc`). |
| Default | `LOST`. |
| What it does | Where the rest of the stock goes when a short pick says "relocate the rest to the missing location". |
| Affects | `wms-outbound/src/picking/remediation.rs:431` (`PutawayZoneBmc::missing_toloc_for_location`), used only by the short-reason action with target mode `ZoneMissingToLoc`. |
| Example | A pick of 10 finds 6. The short reason moves the 6 left to the zone's `LOST`. |
| Interacts with | A short reason can use a fixed location instead. Then this field is not read. If the source location has no zone row, the error is `source location X has no zone missing location`. |
| When empty | Replaced by `LOST` on create. |
| If you change it | Applies to shorts that happen **after** the change. |

### 1.7 RF Pick Strategy

| Item | Value |
|---|---|
| UI label | `RF Pick Strategy`. Tab `General`. |
| Column | `putawayzone.rf_pick_strategy` |
| Type and values | Text, up to 10 characters. NULL allowed. |
| Default | NULL. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. I searched all crates, the Go RF client and SQL. Only the zone model and the API carry it. |
| Example | `FIFO`. It changes nothing. |
| Interacts with | Nothing. |
| When empty | Allowed. Clearing it sets NULL. |
| If you change it | Nothing else changes. |

### 1.8 Replenishment Allowed

| Item | Value |
|---|---|
| UI label | `Replenishment Allowed` (checkbox). Tab `General`. |
| Column | `putawayzone.replenishment_allowed` |
| Type and values | true or false. NOT NULL. |
| Default | false. Seeds: false. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. The form only enables the field `Replenishment Threshold` when this box is ticked. No engine reads it. |
| Example | Ticked. Nothing happens. |
| Interacts with | Pairs with 1.9 in the form. Replenishment is a placeholder in the product (`wms-meta-ui` migration 048). |
| When empty | Not possible. NOT NULL. |
| If you change it | Nothing else changes. |

### 1.9 Replenishment Threshold

| Item | Value |
|---|---|
| UI label | `Replenishment Threshold`. Tab `General`. |
| Column | `putawayzone.replenishment_threshold` |
| Type and values | Whole number, 0 or more (CHECK `putawayzone_replenishment_threshold_check`). NOT NULL. |
| Default | 0. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. |
| Example | 20. Nothing happens. |
| Interacts with | Enabled in the form only while 1.8 is ticked. A negative number is refused by the database. |
| When empty | Not possible. NOT NULL. |
| If you change it | Nothing else changes. |

### 1.10 Color

| Item | Value |
|---|---|
| UI label | `Color`. Tab `General`. Plain text input. |
| Column | `putawayzone.color` |
| Type and values | Text, up to 7 characters. NOT NULL. Use a hex color such as `#D97B4A`. |
| Default | `#888888`. Seeds: `DOCK` `#4A90D9`, `RACK` `#D97B4A`. |
| What it does | The color of the zone on the 3D warehouse page and in its legend. |
| Affects | `Sidebar > Warehouse Configuration > Topology > 3D Warehouse`, where each location is drawn in its zone color, and the `Color` column of the zone list. |
| Example | `#2E8B57`. |
| Interacts with | The form does not check the format. A text that is not a color is passed to the 3D library and does not draw as expected. |
| When empty | Not possible. NOT NULL. A blank in the update is not accepted as a clear. |
| If you change it | Display only. |

## 2. Capacity tab and printer tab

### 2.1 Max Cube

| Item | Value |
|---|---|
| UI label | `Max Cube`. Tab `Capacity`. Physical: volume. |
| Column | `putawayzone.max_cube` |
| Type and values | Decimal, 0 or more. NOT NULL. Stored in cubic millimetres. |
| Default | 0 = no limit. |
| What it does | The total volume of all stock in all locations of the zone, plus volume promised by active reservations, may not exceed this. |
| Affects | Putaway: `ZoneCapacity` and the zone block of `fits`. Enforced whatever the step's `Cube` switch says (the move enforces it too). Refusal `capacity` with the detail `zone_cube: limit L, attempted A`. The move itself: `validate_destination_capacity`, error `capacity exceeded (zone_cube): limit=L, attempted=A`. |
| Example | Zone limit 100 m³ = 100,000,000,000 mm³. Stock + promised = 98.5 m³. A pallet of 1.8 m³ arrives from another zone. 100.3 m³ is above 100: refused. |
| Interacts with | **Only when the pallet comes from another zone.** A move inside one zone adds nothing to the zone, so the zone limit is skipped. The volume of a pallet is `sum of SKU cube x quantity`. A SKU with cube 0 adds 0. |
| When empty | 0 = no limit. The step reports `zone_cube:no_limit` and still offers the location. |
| If you change it | Next suggestion and next move only. Stock already in the zone stays even if it is now over the limit. Only new arrivals are refused. |

### 2.2 Max Weight

| Item | Value |
|---|---|
| UI label | `Max Weight`. Tab `Capacity`. Physical: weight. |
| Column | `putawayzone.max_weight` |
| Type and values | Decimal, 0 or more. NOT NULL. Stored in grams. |
| Default | 0 = no limit. |
| What it does | Same as 2.1 for weight. |
| Affects | `space.rs:829-834`. Detail `zone_weight: limit L, attempted A`. The move: `capacity exceeded (zone_weight)`. Enforced whatever the step's `Weight` switch says. |
| Example | Limit 20,000 kg = 20,000,000 g. In zone 19,400,000 g. Pallet 720,000 g. Attempted 20,120,000 g. Refused. |
| Interacts with | Same as 2.1. If the pallet has no known weight, the check is not run (`zone_weight:no_stock_weight`). |
| When empty | 0 = no limit. |
| If you change it | Same as 2.1. |

### 2.3 Max Cases Count

| Item | Value |
|---|---|
| UI label | `Max Cases Count`. Tab `Capacity`. A count, not converted. |
| Column | `putawayzone.max_cases_count` |
| Type and values | Decimal, 0 or more. NOT NULL. |
| Default | 0 = no limit. |
| What it does | A limit on how many containers (pallets and cases) that hold stock may stand in the zone. |
| Affects | Putaway: `space.rs:813-821` (always on, no switch turns it off). Detail `zone_cases_count: limit L, attempted A`. The move: `validation.rs:990-1000`. |
| Example | Limit 50. 49 stock-bearing containers stand in the zone. A pallet whose stock is on 3 cases arrives: 49 + 3 = 52. Refused: `zone_cases_count: limit 50, attempted 52`. |
| Interacts with | The count is the number of **different containers that have a stock row** in the zone, including child cases. Promised pallets are **not** counted here. The pallet adds one per stock-bearing container in its subtree. Skipped when the pallet is already in this zone. Loose stock adds none. |
| When empty | 0 = no limit. |
| If you change it | Next suggestion and move only. |

### 2.4 Min Temperature and Max Temperature

| Item | Value |
|---|---|
| UI label | `Min Temperature`, `Max Temperature`. Tab `Capacity`. |
| Column | `putawayzone.min_temperature`, `putawayzone.max_temperature` |
| Type and values | Decimal, can be negative. NULL allowed. CHECK: min must not be above max (`chk_putawayzone_temperature_order`). Use the same unit as the SKU fields (`Min Temperature (°C)` on the SKU form). |
| Default | NULL (no limit). Seeds: NULL. |
| What it does | The temperature range this zone holds. |
| Affects | Putaway only, and only for steps with `Temperature` on: `step::zone_suits_temperature`. A step whose zone does not suit is skipped (`skipped:temperature`). |
| Example | `COLD`: min 2, max 8. SKU A: 0 to 4: overlaps (2 to 4), step runs. SKU B: 10 to 20: no overlap, step skipped. A pallet with both A and B: the step is skipped (all lines must fit). |
| Interacts with | The test is **overlap**, not containment. An empty bound is unlimited on that side, for the zone and the SKU. A SKU with no range always fits. Receiving and moves do not check temperature. |
| When empty | NULL = no constraint. Clear the field to set NULL. |
| If you change it | Next suggestion only. Stock is not moved. |

### 2.5 Default Label Printer and Default Report Printer

| Item | Value |
|---|---|
| UI label | `Default Label Printer`, `Default Report Printer`. Tab `Printer Settings`. |
| Column | `putawayzone.default_label_printer`, `putawayzone.default_report_printer` |
| Type and values | Text, up to 45 characters. NULL allowed. |
| Default | NULL. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. Label printing picks a printer from the table `printer_assignments`. Its "Zone" tier uses `scope_id` = the zone **id**, not these text fields. The comment there names the old rule "DefaultLabelPrinter of the zone", but the code does not read the column. |
| Example | `P01`. Printing ignores it. |
| Interacts with | To send a zone's labels to a printer, create a printer assignment with scope `Zone` for this zone (API `printer_assignments_rpc`). The order is Zone, then User, then Owner, then Warehouse. |
| When empty | Allowed. Clearing sets NULL. |
| If you change it | Nothing else changes. |

To verify (the screen for printer assignments): I found no sidebar entry for printer assignments in the menu metadata.
Steps: sign in as `Admin`, open the sidebar and look for a printers or assignments item;
if none, call the API method `list_printer_assignments` and check whether rows with `scope_type = Zone` exist.

### 2.6 Auto Print Addr Label and Auto Print Carton Label

| Item | Value |
|---|---|
| UI label | `Auto Print Addr Label`, `Auto Print Carton Label` (checkboxes). Tab `Printer Settings`. |
| Column | `putawayzone.auto_print_addr_label`, `putawayzone.auto_print_carton_label` |
| Type and values | true or false. NOT NULL. |
| Default | false. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. The only automatic label print on receiving is controlled by the owner setting `auto_print_lpn_on_receive`. Packing prints use packing code. No code reads the zone flags. |
| Example | Ticked. No label prints. |
| Interacts with | Nothing. |
| When empty | Not possible. NOT NULL. |
| If you change it | Nothing else changes. |

## 3. Zone lot mixing rules

Screen: the list `Lot Commingle Rules` under the zone card (list columns `Attribute`, `Allow Mix`, `Putawayzone Code`; buttons `New`, `Delete`, `Refresh`).
Edit form: `Putaway Zone Code` (read-only), `Attribute Code` (picker, required), `Allow Mix`.
Table: `putawayzone_lot_commingle` (`BASELINE:4236`). Unique per (zone, attribute) (`BASELINE:11439`).
Roles: `Admin`, `Manager`.

A rule answers one question: "may lots with different values of this attribute stand together on one pallet that lands in this zone?".

### 3.1 Putaway Zone Code (rule)

| Item | Value |
|---|---|
| UI label | `Putaway Zone Code` (list header `Putawayzone Code`). |
| Column | `putawayzone_lot_commingle.putawayzone_code` |
| Type and values | Zone code. FK to the zone, CASCADE (deleting the zone deletes its rules). |
| Default | Taken from the open zone. |
| What it does | Which zone the rule belongs to. |
| Affects | Rules are read per destination location's zone. |
| Example | `FOOD`. |
| Interacts with | A location rule for the same attribute wins over the zone rule (3.3). |
| When empty | Not allowed. Unknown zone: `Putaway Zone 'X' not found`. |
| If you change it | The form blocks it. |

### 3.2 Attribute Code (rule)

| Item | Value |
|---|---|
| UI label | `Attribute Code` (list header `Attribute`). |
| Column | `putawayzone_lot_commingle.attrib_code` |
| Type and values | Text, up to 20 characters. Must be the code of a **lot policy attribute** (`lot_policy_attribute.attrib_code`). |
| Default | No default. |
| What it does | The lot attribute the rule is about. |
| Affects | The rule is applied only to SKUs whose **lot policy** contains this attribute. For other SKUs it is ignored. |
| Example | `ALLERGEN`. |
| Interacts with | One rule per zone and attribute. A second one is refused as a duplicate key. |
| When empty | Not allowed. Unknown attribute: `Lot attribute 'X' not found`. |
| If you change it | Allowed in the API (the new code is checked). |

### 3.3 Allow Mix

| Item | Value |
|---|---|
| UI label | `Allow Mix` (checkbox). |
| Column | `putawayzone_lot_commingle.allow_mix` |
| Type and values | true or false. NOT NULL. |
| Default | true. |
| What it does | `false`: a pallet may not land in this zone if the lots on it have **different** values of the attribute. `true` or no rule: no restriction. |
| Affects | The 4th check of putaway, every move landing (`validate_stock_landing`) and receiving. Refusal code `mix_attribute`, text `attribute ALLERGEN=YES mixing not allowed for lot L2 on lpn Some("LPN1") [Some("putawayzone_lot_commingle rule on zone FOOD")]`. |
| Example | Zone `FOOD`, `ALLERGEN`, Allow Mix off. Pallet LPN1 has lot L1 (`ALLERGEN=NO`) and lot L2 (`ALLERGEN=YES`). LPN1 cannot land in any `FOOD` location. |
| Interacts with | See below. |
| When empty | No rule = mixing allowed. |
| If you change it | Next landing only. Stock already in the zone is not touched. |

How the rule is chosen:
1. For each attribute of the SKU's lot policy, the system looks for a **location** rule (`Lot Commingle` on the location card).
   If one exists for the attribute, it decides. This is also true when it says `Allow Mix = on`: that is a deliberate exception to a zone ban.
2. If there is none, it uses the **zone** rule of the location's zone.
3. If there is none, mixing is allowed.
4. If the location's `Mix Lot` flag is **off**, the attribute rules are skipped. The plain lot rule is stricter and already decides.

What "mixing" means here: the system counts stock rows **in the landing container** (the pallet) that belong to a **different lot** with a **different value** of the attribute.
It does not compare with stock already standing in the location.
A loose landing (no pallet) and a lot with no recorded value for the attribute pass.

To verify (pallets whose stock is on child cases): the count above matches `inventory_balances.container_id` to the landing LPN exactly.
Elsewhere the code says a real pallet keeps its stock on child cases. If so, the rule may not see those lots.
Steps: (1) Give SKU W1 a lot policy with attribute `ALLERGEN`. (2) Add zone rule `FOOD` / `ALLERGEN` / `Allow Mix` off.
(3) Receive a pallet LPN whose stock is on two child cases with lots L1 (`ALLERGEN=NO`) and L2 (`ALLERGEN=YES`).
(4) Run the `Dry run` on a policy whose step searches `FOOD`, with `TraceDetail` full.
(5) If `FOOD` locations show no `mix_attribute` refusal, the rule did not see the child cases.

## 4. How the zone is used by putaway (summary)

| Step | What happens | Zone setting read |
|---|---|---|
| Search space | `Zone named on this step` or `Zone from the SKU` picks the zone. | `Code` |
| Temperature | Only with the step switch `Temperature`. | `Min Temperature`, `Max Temperature` |
| Candidates | Locations of the zone, sorted by aisle, bay, level, code. | none |
| Fit (zone part) | Only if the pallet comes from another zone. | `Max Cube`, `Max Weight`, `Max Cases Count` |
| Landing | Location and zone lot rules. | lot mixing rules |

## 5. Count of zone settings

20 columns on the zone (plus the id and audit stamps) and 3 on the zone rule.
Of the 20, these are **stored only**: `Inbound Location`, `Outbound Location`, `RF Pick Strategy`, `Replenishment Allowed`,
`Replenishment Threshold`, `Default Label Printer`, `Default Report Printer`, `Auto Print Addr Label`, `Auto Print Carton Label`.
