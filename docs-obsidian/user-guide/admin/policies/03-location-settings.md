---
title: "Putaway Settings Reference - Location"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Location settings read by putaway, move and allocation

This file lists every column of a location and of the location lot mixing rule.
For each one it says which process reads it.

Read `00-putaway-overview.md` first. Zone settings are in `02-putaway-zone-settings.md`.
Policy and step settings are in `01-putaway-policy-steps-and-criteria.md`.

## How to read this file

- Screen: `Sidebar > Warehouse Configuration > Topology > Locations`. List form `location_list_form` (columns `Type`, `ABC`, `Code`, `Putaway Zone`, `Level`, `Status`).
  Open a row. The card has five tabs: `General`, `Dimensions`, `Position`, `Attributes`, `Checks` (section 4a, read only).
  A list `Lot Commingle Rules` sits below the card (section 4).
- Buttons on the list: `New`, `Delete`, `Refresh`, `Generate` (bulk wizard `Location Generator`).
- Roles: `Admin`, `Manager` and `Operator` create, change and delete a location.
  `Viewer` reads. `Generate` is for `Admin` and `Manager`. Lot mixing rules are for `Admin` and `Manager`.
- Table: `location` (`BASELINE:2956`). `BASELINE` is `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql`.
- Paths to code start at `crates/libs/` unless they start with `crates/services/`.
  `location.rs` means `wms-lib-core/src/model/location.rs`.
- "Stored only. It has no effect today." means: no code in any crate reads the value (checked by searching all crates, SQL, the 3D page and the Go RF client).
- Units: weight in grams, length in millimetres, volume in cubic millimetres. The screen converts them to the warehouse display unit
  (for example kg and m³) for the "physical" fields. Counts and coordinates are not converted.
- Limits: `0` means "no limit set". It is **not** a block, and it is not zero capacity.
- A location is identified by `code`. The code cannot be changed after creation.
- There is **no** separate "put sequence" or "pick sequence" column. The only sequence column is `Route Sequence` (section 2.11).

## Seed values

A new warehouse has these locations (`BASELINE:8350-8480`, `064_discrete_pick_drop_and_in_transit_part_2.sql:19`):

| Code | Type | Zone | Notes |
|---|---|---|---|
| `UNKNOWN`, `DOCK` | `Other` | `DOCK` | No limits. |
| `PICKTO` | `Pickto` (set by migration 064; baseline says `Other`) | `DOCK` | Default picking drop. |
| `STAGE` | `Stage` | `DOCK` | Default inbound and outbound place of every zone. |
| `LOST` | `Lost` | `DOCK` | Default missing place of every zone. |
| `QC` | `QC` | `DOCK` | |
| `RETURN` | `Returns` | `DOCK` | |
| `RTV` | `Rtv` | `DOCK` | |
| `DAMAGE` | `Damage`, status `Damage` | `RACK` | The damage bay. |
| `INTRANSIT` | `InTransit` | `DOCK` | Exactly one in the warehouse. Kept by the system. |
| 96 rack locations such as `A-01-0` | `Case` (16 are `Pick`) | `RACK` | Processing type `Pallet` (or `Case`), category `SelectiveShelving`, 2500 x 1200 x 1500 mm, max cube 4,500,000,000 mm³, max weight 1,000,000 / 800,000 / 600,000 / 400,000 g for levels 0 to 3, ABC `B`, footprint 0, stack limit 0, max quantity 0, no section, no check digit. |

Do not delete or rename the system locations. Zones point at `STAGE`, `PICKTO` and `LOST` (RESTRICT keys).

## 1. Fixed gate: who can be a putaway candidate

The putaway search reads only locations that pass all of these, whatever the policy says:

1. `Putaway Zone` equals the zone being searched.
2. `Status` is `Ok`.
3. `Flag` is `None`.
4. `Discard LPN` is not on.
5. `Type` is one of `Case`, `Pick`, `SpeedPick`, `Pnd`, `Sort`, `Other`.

Then the step's own conditions narrow the list, and each remaining location is checked one by one
(`00-putaway-overview.md`, section 3).

## 2. Fields of the card

### 2.1 Code

| Item | Value |
|---|---|
| UI label | `Code` (required). Tab `General`. |
| Column | `location.code` |
| Type and values | Text, up to 20 characters. Primary key. Unique (`location_pkey`, `BASELINE:11061`). |
| Default | No default. |
| What it does | The name of the place. It is what operators scan and type. |
| Affects | Every process. Zones, steps, SKUs, owners and tasks point at it by code (see the delete rules below). |
| Example | `A-01-02`. |
| Interacts with | The generator builds the code from a pattern (section 5). |
| When empty | Not allowed. |
| If you change it | You cannot. The update API has no `code` field. Create a new location instead. |

Delete rules: a location is refused for delete while stock, a reservation, a pick, a task, a receipt line, a zone special location,
a putaway step or a SKU preferred location points at it.
Message: `Cannot delete location — referenced by 1 other record(s)`. The number is the count of locations you tried to delete, not the count of references.
Lot rules of the location go with it (CASCADE).
The owner defaults `QC location` and `Returns location` are set to empty (`fk_owner_config_qc_loc`, `fk_owner_config_returns_loc`: SET NULL).
The system location `INTRANSIT` cannot be changed or deleted:
`location INTRANSIT is the warehouse's one location of open pick pallets, kept by the system: it is not deleted`.

### 2.2 Type

| Item | Value |
|---|---|
| UI label | `Type` (required in the form; list column `Type`). Tab `General`. |
| Column | `location.loc_type` (enum `loc_type`) |
| Type and values | 18 values, in the next table. They come from the code list `LOCTYPE`. |
| Default | Column default `None`. The form requires you to choose. **`None` is not a storage type.** Putaway and manual moves never land in it. |
| What it does | It decides which movements may land here. |
| Affects | Putaway candidate gate (section 1). Move destination check `validate_destination_authorization`. Allocation. Counts. Owner pick drop location (trigger), work area pack station (trigger). |
| Example | A pick face: `Pick`. A pallet rack bay: `Case` or `Pnd`. |
| Interacts with | A step can narrow the type (`Location type` condition) but never widen it past the six allowed types. Only one `InTransit` location may exist (`uq_location_one_in_transit`). |
| When empty | Not possible (NOT NULL, default `None`). |
| If you change it | Next suggestion and next move only. Stock already in the location stays. A location that holds stock and becomes `QC` or `Damage` keeps it. |

What each value allows. "Yes" means the type is in the list of allowed destination types for that kind of move.

| Type | UI text | Putaway / correction | Manual / repack | Replenishment | Pick move | Move to QC | Damage | RTV | Release from QC |
|---|---|---|---|---|---|---|---|---|---|
| `None` | `0 - None` | no | no | no | no | no | no | no | no |
| `Other` | `Other` | yes | yes | no | yes | no | no | no | yes |
| `Case` | `PICK - Case` | yes | yes | no | no | no | no | no | yes |
| `Pick` | `PICK - Piece` | yes | yes | yes | no | no | no | no | yes |
| `Pnd` | `PICK - Pallets, storage` | yes | yes | no | yes | no | no | no | yes |
| `Door` | `Door` | no | no | no | no | no | no | no | no |
| `Pickto` | `Pick-to` | no | no | yes | yes | no | no | no | no |
| `Sort` | `Sort station` | yes | yes | no | yes | no | no | no | no |
| `SpeedPick` | `Speed Line` | yes | yes | yes | no | no | no | no | yes |
| `QC` | `Quality control` | no | no | no | no | yes | no | no | no |
| `Damage` | `Damage` | no | no | no | no | no | yes | no | no |
| `Rtv` | `Return to vendor` | no | no | no | no | no | no | yes | no |
| `Destroy` | `Destruction` | no | no | no | no | no | no | no | no |
| `Returns` | `Customer returns` | no | no | no | no | no | no | no | no |
| `Stage` | `Staging` | no | no | no | no | no | no | no | no |
| `Lost` | `Lost` | no | no | no | no | no | no | no | no |
| `InTransit` | `In transit (open pick pallets)` | refused | refused | refused | refused | refused | refused | refused | refused |
| `Pack` | `Pack station` | no | no | no | no | no | no | no | no |

Other facts about types:
- "no" in a column means the move is refused with `destination loc_type X not authorized for source_type Y` (a supervisor can override this refusal).
  Other flows place stock in `Door`, `Stage`, `Destroy`, `Returns`, `Lost`, `Pack` by their own rules (for example short-pick remediation to the `Lost` place, pick drop to `Pickto`, `Stage` or `Door`, post-pick routing to `Pack`).
- `InTransit`: no move takes stock out of it or puts stock into it: `location X holds only open pick pallets: nothing moves into it`.
- Allocation never picks stock from `InTransit` or `Pack`. `Lost` is **not** excluded there. This is a known open point in the code comment. Stock booked to `Lost` can still be allocated.
- Counts never include `Lost` or `InTransit`.
- The owner `Pick drop location` must be `Pickto`, `Stage` or `Door` (trigger `owners_picking_toloc_is_a_drop_location`, migration 055).
- A work area pack station must be a `Pack` location (trigger `work_area_pack_station_is_a_pack_location`, migration 079).

### 2.3 Flag

| Item | Value |
|---|---|
| UI label | `Flag`. Tab `General`. |
| Column | `location.loc_flag` (enum `loc_flag`) |
| Type and values | `None`, `CycleCountActive`, `SanitationActive`, `MaintenanceActive`, `ReceivingHoldoff`. Code list `LOCFLAG`. |
| Default | `None`. |
| What it does | A temporary operational block. It takes the location out of automatic work while it is set. |
| Affects | Putaway candidate gate (flag must be `None`). Allocation. Pick dispatch: a flagged location blocks a pick, except `CycleCountActive` when the caller allows a pick under a running count (`cycle_count_block_tolerated`). Count start: a count freezes `Ok` locations with flag `None` and sets `CycleCountActive`; it lifts only that value afterwards. |
| Example | Set `MaintenanceActive` while a beam is repaired. Putaway and allocation skip the bay. |
| Interacts with | **A flag does not block a move.** Owner decision 2026-07-26. An operator can still move stock in or out. Only `Status` (holds) blocks moves. Do not trust the column comment `Move primitive U4/U5 require loc_flag=None` (`BASELINE` comment on `location.loc_flag`). It is out of date. |
| When empty | Not possible. NOT NULL. |
| If you change it | Next suggestion, allocation and pick dispatch only. A cycle count sets and clears `CycleCountActive` itself. Do not clear it by hand during a count. |

Values: `None` nothing is wrong; `CycleCountActive` a count is running (set by the count or by a short pick); `SanitationActive`, `MaintenanceActive`, `ReceivingHoldoff` set by hand. The last three have no other special code. They block exactly like any non-`None` flag.

### 2.4 Status

| Item | Value |
|---|---|
| UI label | `Status` (list column and card). **Read-only.** Tab `General`. |
| Column | `location.status` (enum `loc_status`) |
| Type and values | `Ok`, `Hold`, `Damage`. |
| Default | `Ok`. |
| What it does | It shows whether the location is on hold. It is **derived** from the active holds on the location. You cannot set it. The server ignores a value you send. |
| Affects | Putaway gate (must be `Ok`). Allocation (`l.status = 'Ok'`). Pick dispatch (`LocationBlocked`). Count freeze. The receive path reads it to derive a disposition. The move itself reads the covering **holds**, not this column. |
| Example | Place a hold with code `Damaged` on `B-04-1`. The status becomes `Damage`. Release the hold: back to `Ok`. |
| Interacts with | The rule: any active hold with code `Damaged` gives `Damage`. Else any other active hold whose code **enforces** gives `Hold`. Holds whose code only informs (not enforcing) do nothing. No holds: `Ok`. |
| When empty | Not possible. |
| If you change it | Place or release a hold (`Sidebar > Management & Control > Inventory > Holds`, hold codes under `Sidebar > Warehouse Configuration > Reason Codes > Hold Codes`). |

What a hold does to moves:
- A hold on the destination whose code blocks inbound flow stops the landing: `destination location blocked: active hold code=LocBlocked (id=12)`.
  A hold whose code only warns asks the operator to acknowledge it.
- A hold on the source whose code blocks outbound flow stops the move: `source location blocked: active hold code=... (id=...)`.
- The catalog says per code whether it blocks inbound, outbound or both. The `Damaged` code blocks outbound only, so a damage bay can receive damaged stock.
- Section holds for oversize goods use the code `LocBlocked`.

### 2.5 Processing Type

| Item | Value |
|---|---|
| UI label | `Processing Type`. Tab `General`. |
| Column | `location.loc_processing_type` (enum `loc_proc_type`) |
| Type and values | `None`, `Pallet`, `Case`, `Piece`. |
| Default | `None`. |
| What it does | Says in what handling unit stock is processed here. |
| Affects | Only the putaway condition `Processing type`. Nothing else reads it. |
| Example | `Pallet` for rack bays. A step: `Processing type is Pallet`. |
| Interacts with | Nothing else. |
| When empty | Not possible. |
| If you change it | Next suggestion only. |

### 2.6 Category

| Item | Value |
|---|---|
| UI label | `Category`. Tab `General`. |
| Column | `location.loc_category` (enum `loc_category`) |
| Type and values | `None`, `NoPalletization`, `Asrs`, `CantileverRack`, `CartonFlow`, `DenseStorage`, `DoubleDeepRack`, `DriveInRack`, `DriveThroughRack`, `HorizontalCarousel`, `Other`, `PalletFlowRack`, `PalletCarousel`, `PushBackRack`, `SelectiveShelving`, `ShelvingStorage`, `WorkCenter`. |
| Default | `None`. Seeds: `SelectiveShelving` for the rack locations. |
| What it does | A label for the kind of storage equipment. It has no behaviour of its own. |
| Affects | Putaway condition `Location category`. Allocation step filter `location category`. |
| Example | Small parts: `ShelvingStorage`. |
| Interacts with | Nothing else. |
| When empty | Not possible. |
| If you change it | Next suggestion and next allocation only. |

### 2.7 ABC

| Item | Value |
|---|---|
| UI label | `ABC`. Tab `General`. |
| Column | `location.abc` (enum `abc_speed_type`) |
| Type and values | `A`, `B`, `C`. |
| Default | `B`. |
| What it does | Speed class of the place. A is fast. |
| Affects | Putaway condition `Location ABC`. Allocation step filter `location ABC`. |
| Example | A pick face near the door: `A`. |
| Interacts with | Pair it with the SKU `ABC Class` and the putaway condition `SKU ABC`. |
| When empty | Not possible. Default `B`. |
| If you change it | Next suggestion and next allocation only. |

### 2.8 Level

| Item | Value |
|---|---|
| UI label | `Level`. Tab `General`. |
| Column | `location.level` |
| Type and values | Whole number. Default 0. 0 is the floor. |
| Default | 0. Seeds: 0 to 3. |
| What it does | The shelf level. |
| Affects | Putaway order: the third sort key (after aisle and bay). 3D page (filter and color by level). The generator sets it from the level range. |
| Example | A-01 level 0 comes before A-01 level 1. |
| Interacts with | With `Aisle` and `Bay` (section 3). If aisle and bay are empty, the order is by level, then code. |
| When empty | Not possible. |
| If you change it | Next suggestion only. |

### 2.9 Putaway Zone

| Item | Value |
|---|---|
| UI label | `Putaway Zone` (picker). Tab `General`. |
| Column | `location.putawayzone` |
| Type and values | Zone code. NOT NULL. FK `fk_location_putawayzone` (RESTRICT). |
| Default | `DOCK`. The zone `DOCK` must exist. |
| What it does | Puts the location in a zone. Putaway searches by zone. Zone limits are summed over its locations. |
| Affects | Putaway search and zone capacity (`02-putaway-zone-settings.md`). Allocation step filter by zone. Work areas, count scope, printing (zone tier). 3D color. |
| Example | `A-01-0` in `BULK`. |
| Interacts with | The special locations `STAGE`, `PICKTO`, `LOST` are in `DOCK` and count in its totals. |
| When empty | Not possible. |
| If you change it | The stock of the location moves to the new zone's totals at once (zone totals are computed live). Nothing is blocked if the new zone is now over its limit. Reservations stay on the location. |

### 2.10 Check Digit

| Item | Value |
|---|---|
| UI label | `Check Digit`. Tab `General`. The field is read-only on the screen (`loc_normal_render`, extra read-only field). |
| Column | `location.check_digit` |
| Type and values | Text, up to 3 characters. NULL allowed. |
| Default | NULL. Seeds: NULL. |
| What it does | A control character for a printed location label. |
| Affects | It is written once, when a location is created — with `New` or by the `Generate` wizard — and the system setting `CHECK_DIGIT_ENABLED` is on. Nothing reads it afterwards. Stored only. It has no effect today. |
| Example | `A-01-0` gives `G`. |
| Interacts with | `CHECK_DIGIT_ENABLED` (system setting, seed `true`, `BASELINE:9947`). Any text that means "on" works (`1`, `yes`, `on`, `true`). A location created by API with its own value keeps it. |
| When empty | Allowed. |
| If you change it | Nothing else changes. |

To verify (that scanning does not check it): on a test stand, set `check_digit` of a location to `ZZZ` through the API method `update_loc`,
then move a pallet to that location by scanning only its code. If the move is accepted, nothing checks the digit.

### 2.11 Route Sequence

| Item | Value |
|---|---|
| UI label | `Route Sequence`. Tab `General`. |
| Column | `location.route_sequence` |
| Type and values | Text, up to 10 characters. NOT NULL. |
| Default | Empty text for `New`. The `Generate` wizard numbers its locations `0001`, `0002`, … in the order it makes them (section 5). Seeds: the rack locations use `A-04` style values; system locations use their code. |
| What it does | The walking order of the warehouse for **picking**. Locations are ordered by this text. |
| Affects | Allocation: candidates are ordered by `route_sequence`, then code, as plain text. Task claim: `ORDER BY priority, NULLIF(route_sequence,'')` blank last. Pick route: blank last, then location code. Pick targets use the first route value. **Putaway does not read it.** |
| Example | `0010`, `0020`, `0100`. Use fixed width with leading zeros. |
| Interacts with | The sort is by text. `A-10` comes before `A-2`. In allocation an empty value sorts **first**. In task claim and pick routes an empty value sorts **last**. |
| When empty | Empty is allowed. See above for the two behaviours. |
| If you change it | The value is read live. It acts on the next allocation, the next task claim and the next pick route. Tasks that exist are not rewritten, but they are claimed in the new order. |

### 2.12 Mix SKU

| Item | Value |
|---|---|
| UI label | `Mix SKU` (checkbox). Tab `General`. |
| Column | `location.mix_sku` |
| Type and values | true or false. |
| Default | true. |
| What it does | Off: only one product can stand in the location. |
| Affects | The landing check on every receive, move and putaway. Also a batch with two SKUs landing together (`:943-985`). Putaway refusal code `mix_sku`, text `Location L does not allow SKU mixing (incoming sku B, existing ["A"])`. Putaway condition `Mixed SKU` (location side). |
| Example | Location `S-01` holds SKU A (qty 20). A pallet of SKU B is refused. |
| Interacts with | The system looks at stock with `qty`, `qty_allocated` or `qty_picked` above 0 in that location. The same SKU code under another owner counts as another product. The check at landing looks at landed stock only, and a refusal there is final. Putaway suggestions also count the pallets **on their way** (active reservations): a location with `Mix SKU` off is not suggested to a pallet whose SKU differs from the stock there or from a pallet already directed there (rule `location_mix`, refusal `mix_sku`), even when the step has no mixing rule (P-18). The step rule `Mixed SKU = Not allowed` can still narrow further. It cannot allow what the location forbids. |
| When empty | NULL is read as true. The column is NOT NULL, so it does not occur. |
| If you change it | Next landing only. Stock already mixed stays. New landings of any of those SKUs are then refused. |

### 2.13 Mix Lot

| Item | Value |
|---|---|
| UI label | `Mix Lot` (checkbox). Tab `General`. |
| Column | `location.mix_lot` |
| Type and values | true or false. |
| Default | true. |
| What it does | Off: only one lot can stand in the location. |
| Affects | `inventory_service.rs:1054-1091`. Code `mix_lot`, text `Location L does not allow lot mixing (incoming lot Some("L2"), existing ["L1"])`. Putaway condition `Mixed lot`. Also: when this flag is off, the attribute rules of section 4 are skipped. |
| Example | Location holds lot L1. A pallet of lot L2 is refused. |
| Interacts with | At landing: counts stock with `qty` above 0 only; a pallet with no lot passes when the location holds exactly one lot. Putaway suggestions also count the lots on their way (rule `location_mix`, refusal `mix_lot`), so a second lot is not directed to a location with `Mix Lot` off (P-18). |
| When empty | NULL is read as true. |
| If you change it | Next landing only. |

### 2.14 Discard LPN

| Item | Value |
|---|---|
| UI label | `Discard LPN` (checkbox). Tab `General`. Also known as LOSE ID. |
| Column | `location.discard_lpn` |
| Type and values | true or false. |
| Default | false. |
| What it does | Stock that lands here loses its container (LPN) and stands loose. |
| Affects | Receiving and moves drop the LPN. Putaway **never** offers such a location (gate, section 1). Allocation: a "whole pallet" rule skips loose stock. |
| Example | A piece-pick shelf: on. Receiving a pallet to it puts pieces loose. |
| Interacts with | The comment in `predicate.rs:197-218` says putaway does not exclude such locations. That is out of date. The candidate SQL excludes them. |
| When empty | Not possible. |
| If you change it | Next landing only. |

### 2.15 Section

| Item | Value |
|---|---|
| UI label | `Section`. Tab `General`. |
| Column | `location.section` |
| Type and values | Text, up to 30 characters. NULL allowed. A blank means NULL. |
| Default | NULL = the location is its own section. |
| What it does | Groups positions with no beam between them, so one oversize object can stand across them. |
| Affects | Only for SKUs with `Positions required` above 1. Putaway looks for a whole free section. The section size: widths **add**, depth and height take the **minimum**. After landing, the other positions are held with `LocBlocked`. 3D page shows the lock. |
| Example | Section `N1` has 3 positions of width 1200, length 1000, height 1500 each. A sofa 3200 x 900 x 1400 fits (width 3600). One of the 3 positions has a pallet in it: the section is not free. |
| Interacts with | The size test uses the pallet base and height described on the pack, not the step switch. If the pack describes nothing, only the number of free positions is tested. Refusals: `section_none`, `section_not_free`, `section_too_small`. |
| When empty | Each location is alone. An oversize SKU is refused everywhere with `section_none`. |
| If you change it | Next suggestion only. Clear it by emptying the field. |

## 3. Dimensions tab and Position tab

### 3.1 Cube (own volume)

| Item | Value |
|---|---|
| UI label | `Cube`. Tab `Dimensions`. Physical: volume. |
| Column | `location.cube` |
| Type and values | Decimal, 0 or more. Default 0. |
| What it does | Nothing today. |
| Affects | Stored only. It has no effect today. The capacity checks read `Max Cube Capacity`, not this field. |
| Example | 3,600,000,000. No check uses it. |
| Interacts with | None. |
| When empty | 0. |
| If you change it | Nothing else changes. |

### 3.2 Length, Width, Height

| Item | Value |
|---|---|
| UI label | `Length`, `Width`, `Height`. Tab `Dimensions`. Physical: length. |
| Column | `location.length`, `location.width`, `location.height` |
| Type and values | Decimal, 0 or more. Default 0. Millimetres. |
| What it does | The size of the place. |
| Affects | Putaway step switch `Pallet dimensions`: the pallet base must fit length x width (both ways round) and the pallet height must be at most the height. Section size for oversize goods. 3D drawing (defaults 2 x 1 x 1.5 m when 0). |
| Example | 2500 x 1200 x 1500. Pallet base 1200 x 800, height 1650: footprint fits, height does not. Refused: `loc_height: location 1500, pallet 1650`. |
| Interacts with | A value of 0 means "not measured". With `Pallet dimensions` on, the trace says `loc_footprint:no_location_dims`, and the location is still offered. |
| When empty | 0. |
| If you change it | Next suggestion only. |

### 3.3 Max Cube Capacity

| Item | Value |
|---|---|
| UI label | `Max Cube Capacity`. Tab `Dimensions`. Physical: volume. |
| Column | `location.max_cube_capacity` |
| Type and values | Decimal, 0 or more (CHECK `chk_location_cube_capacity`). Default 0. |
| What it does | The volume the stock in the location may not exceed. |
| Affects | Putaway switch `Cube`. The move itself always checks it: `capacity exceeded (loc_cube): limit=L, attempted=A`. |
| Example | Limit 4,500,000,000 mm³. Held 3,000,000,000. Pallet 1,800,000,000. Attempted 4,800,000,000. Refused. |
| Interacts with | Volume of stock is `sum of SKU cube x quantity`. A SKU with cube 0 adds 0. Counts stock and active reservations. Skipped if the pallet is already in the location. |
| When empty | 0 = no limit. Reported as `loc_cube:no_limit`. |
| If you change it | Next suggestion and move only. Stock above the new limit stays. |

### 3.4 Max Weight Capacity

| Item | Value |
|---|---|
| UI label | `Max Weight Capacity`. Tab `Dimensions`. Physical: weight. |
| Column | `location.max_weight_capacity` |
| Type and values | Decimal, 0 or more (CHECK `chk_location_weight_capacity`). Default 0. Grams. |
| What it does | The weight the stock may not exceed. |
| Affects | Putaway switch `Weight`. The move always checks it: `capacity exceeded (loc_weight)`. |
| Example | Level 3 bay: 400,000 g (400 kg). Pallet 720,000 g. Refused: `loc_weight: limit 400000, attempted 720000`. |
| Interacts with | If no weight is known for the pallet, the check is not run (`loc_weight:no_stock_weight`). |
| When empty | 0 = no limit. Reported as `loc_weight:no_limit`. |
| If you change it | Next suggestion and move only. |

### 3.5 Pallet positions on floor

| Item | Value |
|---|---|
| UI label | `Pallet positions on floor`. Tab `Dimensions`. |
| Column | `location.footprint` |
| Type and values | Whole number (smallint), 0 or more. Default 0. |
| What it does | How many pallets stand on the floor of this place. |
| Affects | Putaway switch `Stacking limit`: capacity = this x the stack limit. |
| Example | 2 floor positions x stack limit 3 = 6 pallets. |
| Interacts with | With `Stack limit`. If either is 0, the limit is 0, reported as `loc_positions:no_limit`. The move does not check it. |
| When empty | 0 = not configured. |
| If you change it | Next suggestion only. |

### 3.6 Stack limit

| Item | Value |
|---|---|
| UI label | `Stack limit`. Tab `Dimensions`. |
| Column | `location.stack_limit` |
| Type and values | Whole number (smallint), 0 or more. Default 0. |
| What it does | How many pallets may stack in a pile here. |
| Affects | Putaway switch `Stacking limit`. The lower of this and the SKU `Stack limit` is used; the refusal names which one (`loc_positions` or `item_positions`). |
| Example | Rack says 3. The item says 2. Limit is 2 per floor position. Detail `item_positions: limit 4, attempted 5` (footprint 2). |
| Interacts with | An item may lower the rack's limit, never raise it. If the rack has 0 and the item has a value, the item's value is used. |
| When empty | 0 = no opinion. |
| If you change it | Next suggestion only. |

### 3.7 Max quantity

| Item | Value |
|---|---|
| UI label | `Max quantity`. Tab `Dimensions`. A count, not converted. |
| Column | `location.max_qty_capacity` |
| Type and values | Decimal, 0 or more (CHECK `chk_location_max_qty_not_negative`). Default 0. |
| What it does | How much stock a pick face holds before it is full. |
| Affects | Putaway switch `Quantity`. The move does not check it. |
| Example | Limit 500 pieces. Holds 380. Arriving 150. Refused: `loc_qty: limit 500, attempted 530`. |
| Interacts with | Plain sum of quantities in stored units, across all SKUs in the location. |
| When empty | 0 = not configured. Reported as `loc_qty:no_limit`, not read as unlimited-by-choice. |
| If you change it | Next suggestion only. |

### 3.8 X Coord, Y Coord, Z Coord

| Item | Value |
|---|---|
| UI label | `X Coord`, `Y Coord`, `Z Coord`. Tab `Position`. |
| Column | `location.x_coord`, `y_coord`, `z_coord` |
| Type and values | Decimal, 0 or more. Default 0. Not in the warehouse length unit: the 3D page treats them as layout metres (`public/assets/js/warehouse-3d.js:171`). |
| What it does | Where the place is on the 3D map. |
| Affects | The 3D page. The **redirect**: when an operator cannot use the suggested location, the new suggestion is sorted by the straight-line distance from where the operator stands. A redirect over 30 units is logged as a last resort. Section member order. |
| Example | Operator at (10, 6, 0). Candidate A at (12, 6, 0) is 2 away and comes before B at (30, 6, 0). |
| Interacts with | The ordinary `Pick route` ordering does not use coordinates. |
| When empty | 0. All locations at 0 make a redirect no better than the code order. |
| If you change it | Next 3D draw and next redirect only. |

### 3.9 Aisle

| Item | Value |
|---|---|
| UI label | `Aisle`. Tab `Position`. |
| Column | `location.aisle` |
| Type and values | Text, up to 10 characters. NOT NULL. Default empty. |
| What it does | The aisle name. |
| Affects | Putaway order: the first sort key. 3D filters. |
| Example | `A`, `B`. |
| Interacts with | Text sort: `A10` comes before `A2`. Use fixed-width names such as `A02`, `A10`. The `Generate` wizard does **not** set aisle. Generated locations have an empty aisle, so putaway orders them by bay (0), then level, then code. |
| When empty | Empty text sorts first. |
| If you change it | Next suggestion only. |

### 3.10 Bay

| Item | Value |
|---|---|
| UI label | `Bay`. Tab `Position`. (The Russian label is the same word as `Section`.) |
| Column | `location.bay` |
| Type and values | Whole number, 0 or more (CHECK `chk_location_bay`). Default 0. |
| What it does | The bay number in the aisle. |
| Affects | Putaway order: the second sort key. 3D. |
| Example | Bay 2 comes before bay 10 (a number). |
| Interacts with | Same as 3.9. |
| When empty | 0. |
| If you change it | Next suggestion only. |

## 4. Location lot mixing rules

List `Lot Commingle Rules` under the location card. Edit form: `Location Code` (read-only), `Attribute Code` (picker, required), `Allow Mix`.
Table: `location_lot_commingle` (`BASELINE:3067`). One row per (location, attribute) (`BASELINE:11033`).
The meaning and the evaluation order are the same as for the zone rule. See `02-putaway-zone-settings.md`, section 3.

| Field | Column | Type and default | Notes |
|---|---|---|---|
| `Location Code` | `location_code` | Location code. FK, CASCADE. | Unknown location: `Location 'X' not found`. |
| `Attribute Code` | `attrib_code` | Text, up to 20. Must be a lot policy attribute code. | Unknown: `Lot attribute 'X' not found`. |
| `Allow Mix` | `allow_mix` | true or false, default true. | See below. |

What `Allow Mix` does here:
- It is the **first** rule looked up for the attribute. It overrides the zone rule, both ways.
  `Allow Mix` on a location inside a zone that forbids mixing is a deliberate exception.
- Off: a pallet whose lots have different values of the attribute cannot land in this location. Refusal code `mix_attribute`, source text `location_lot_commingle rule on location L`.
- It applies only to SKUs whose lot policy contains the attribute, and only when the location's `Mix Lot` flag is on.
- When empty or no row: the zone rule is used. If none, mixing is allowed.
- If you change it: next landing only.

## 4a. Checks tab

Read only. Every time somebody looked at the location, the latest first: its counts (not cancelled, once counted)
and every answer to "is this location empty?" an operator gave there in passing — after a pick that emptied it,
when the picking policy's `On an Emptied Location` is `Confirm`, or after a manual move that emptied it, when the
owner's `Confirm Empty After Move` is on —
and every report of stock the system does not show there (RF **Report Unexpected Stock**, Appendix M).
Query `location_checks`, list form `location_checks_list_form` (wms-meta-ui 151).

| Column | What it shows |
|---|---|
| `When` | When the count was completed, or when the answer was given. |
| `Check` | `Count`, or the answer read against the stock: `ConfirmedEmpty` (empty, the stock holds nothing), `DeniedEmpty` (not empty, the stock holds nothing), `EmptyAgainstStock` (empty, the stock holds something); or `UnexpectedStock` — an operator's report of stock the system does not show. |
| `Outcome` | A count: its task's status (`Closed`, `Variance`, `Recounted` …). An answer the stock contradicted: `CountRequested` — the location was asked to be counted. |
| `Held` | An answer: what the location held then (sum of its balances). |
| `Who` | The operator's login. |
| `Operation` | A count: its number and attempt (`CNT… / 2`). An answer: the operation that asked (`PickCommit #<pick>`, or `Move #<transaction_log row>`); a report, what it named (`Report: LPN … / SKU …`). |

A cycle-count policy with `Trust Empty Confirmations` takes the latest `ConfirmedEmpty` here for a check of the location.
The album report `Подтверждения пустоты` lists the answers of a period and the share the stock contradicted.

## 5. The Generate wizard

`Generate` makes many locations at once (limit 10,000 per run). It sets only what the steps ask:

| Step | Fields | Written to |
|---|---|---|
| `Code pattern` | `Aisle Start/End`, `Level Start/End`, `Location Start/End`, prefixes and suffixes | `code` (pattern `LOC_GEN_PATTERN`, default `<AISLE_PREFIX><AISLE>-<LEVEL>-<LOC>`, `BASELINE:9948`) and `level` |
| `Classification` | `Location Flag`, `Location Category`, `Processing Type`, `Status` (disabled), `ABC Rotation`, `Putaway Zone`, `Mix SKU`, `Mix Lot`, `Discard LPN`, `Location Type` (required) | the same columns |
| `Dimensions` | `Cube`, `Length`, `Width`, `Height`, `Max Cube Capacity`, `Max Weight Capacity` | the same columns |

Each generated location also gets, on its own:

- `Aisle` — the aisle part of its code, with the aisle prefix and suffix (`A01`, `A02`, …). At most 10 characters, or the run is refused.
- `Route Sequence` — its number in generation order, zero-padded to one width: `0001`, `0002`, … A number given in `route_sequence` (API) is the first one (`0500` gives `0500`, `0501`, …); anything that is not a number refuses the run.
- `Check Digit` — when `CHECK_DIGIT_ENABLED` is on, like `New` (2.10).

It never sets `Bay`, `Pallet positions on floor`, `Stack limit`, `Max quantity`, `Section`, or coordinates.
Set them afterwards, or the stacking and quantity checks report `no_limit`.
A run is all or nothing: if any generated code already exists, nothing is created and the error lists the existing codes (the first 20, then how many more).

## 6. System settings that touch locations

| Setting | Default | Effect |
|---|---|---|
| `CHECK_DIGIT_ENABLED` | `true` | A new location made with `New` or `Generate` gets a check digit (2.10). |
| `LOC_GEN_PATTERN` | `<AISLE_PREFIX><AISLE>-<LEVEL>-<LOC>` | Pattern of generated codes. |
| `PUTAWAY_RESERVATION_TTL_MIN` | `15` | Minutes a suggested location stays reserved. |
| `PUTAWAY_LOCK_TIMEOUT_MS` | seeded 5000 (wms-app 091) | How long putaway waits for a busy location. |

## 7. Count of location settings

27 columns on the location (plus the id and audit stamps) and 3 on the lot mixing rule.
Stored only (no effect today): `Cube` (own volume) and `Check Digit` (written once, never read).
Read only by one narrow feature: `Processing Type` (putaway condition), `Category` and `ABC` (putaway condition and allocation filter).
Not used by putaway: `Route Sequence` (used by allocation, tasks and pick routes).
