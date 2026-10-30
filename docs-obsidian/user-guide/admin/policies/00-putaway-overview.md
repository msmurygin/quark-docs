---
title: "Putaway Settings Reference - Overview"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Putaway: what it decides and in what order

This file explains how putaway works. The other three files list every setting:

- `01-putaway-policy-steps-and-criteria.md` - the policy, its steps and its conditions.
- `02-putaway-zone-settings.md` - the putaway zone and its lot mixing rules.
- `03-location-settings.md` - the location and its lot mixing rules.

## 1. What putaway decides

Putaway answers one question: **"Where should this pallet go?"**

- The input is one container (a pallet or a tote) that stands in some location and holds stock.
- The output is one location, and a reservation on it. Or no location, with a reason.
- Putaway never moves stock itself. The operator (or the RF screen) then runs a move to the suggested location.
- The engine moves a whole container. It does not split a pallet.

The engine is called by the RF screen `PUTW03` and by the API method `putaway_suggest_location`.
The step editor uses a "dry run" that asks the same question and then throws the answer away.

## 2. The order the system works in

Each number is a gate. A pallet must pass it to reach the next one.
The code is `wms-inventory/src/putaway/mod.rs`, function `run_steps` (line 793).

1. **The request is checked.** The container must exist, stand in a location and hold stock.
   Messages: `container N not found`, `container N has no current location to put away from`, `container N holds no stock to put away`.
2. **The pallet is read once**: its lines (owner, SKU, lot, quantity), total cube, total weight,
   number of stock-bearing containers, the largest `Positions required`, the lowest item `Stack limit`, and the pallet size from the pack.
3. **One policy is chosen**. Each SKU uses its own `Putaway Policy`, or the owner default if it has none.
   All SKUs on the pallet must give the same policy. If not: `LPN spans SKUs with different putaway policies: ...`.
   If no policy is found: `no putaway policy on the SKU or the owner default`.
4. **The whole policy is checked**. If one step cannot run, the **whole policy is refused**.
   The engine does not skip a bad step, because that would run a different policy than the one written.
   Examples: a step with `Assigned slot` or `Nearest to the assigned slot`; `Must be empty` with `Consolidate`; a condition with a value that does not exist.
5. **Two timers are read:** the reservation time (`PUTAWAY_RESERVATION_TTL_MIN`, default 15 minutes) and the lock wait (5 seconds).
6. **The steps are tried in order of `sequence`.** For each step:
   1. **Guard.** Is the pallet standing where the step wants? If not, `skipped:guard`.
   2. **Pallet conditions** (`Product` and `Lot` family). If any line of the pallet fails any condition, `skipped:product:<Property>`.
   3. **Search space.** The zone or location comes from the step or from the SKU. If none, `skipped:no-zone` or `skipped:no-location`.
   4. **Temperature** (only if the step switch is on). If the zone does not suit, `skipped:temperature`.
   5. **Candidates.** The system reads locations of the search space that pass the fixed gate
      (status `Ok`, flag `None`, not `Discard LPN`, an allowed type) and the step's `Location` conditions, in the step's order.
      It reads **20 at a time, at most 5 times: 100 candidates per step**.
   6. **Four checks on each candidate, in this order**:
      1. `mix_intent` - the step's occupancy rule (`Must be empty`, one SKU, one SKU and lot).
      2. `consolidate` - only for `Consolidate` steps.
      3. `capacity` - oversize sections, then the fit switches (cube, weight, pallet size, stack limit, quantity), then the zone case limit.
      4. `landing` - the location's own `Mix SKU` and `Mix Lot` flags, the lot attribute rules, and the container rules. This is the same function the move uses.
   7. **The first candidate that passes all four wins the step.** There is no score. Order decides.
   8. **Reserve.** The system locks that location (waits up to 5 seconds), asks all four checks **again**
      (another operator may have won), then writes the reservation. A pallet has at most one live reservation.
7. **If no step gives a location**, the answer is "no location". The reason is `no_eligible_location`, or `pallet_already_reserved`
   if another request holds the pallet's reservation right now.

After the answer:

8. **The reservation** is visible under `Sidebar > Management & Control > Inventory > Pending Move-In`. Other searches count its cube, weight and pallet position
   as taken. It lasts `Putaway Reservation TTL (min)` of the owner, else `PUTAWAY_RESERVATION_TTL_MIN` (15). A sweeper runs every 5 minutes and frees expired ones.
9. **The move** is run with the reservation id. It is a "directed" move. The move checks again, **always**, these rules: destination type, holds on source and destination,
   location and zone cube and weight, zone case count, `Mix SKU`, `Mix Lot` and the lot attribute rules. It does **not** check the step's occupancy rules, `Stack limit`, `Max quantity` or pallet size.
   If the operator picks another place, a broken soft rule becomes a deviation that must be acknowledged (code 85).
   If the system setting `COUNT_ON_PUTAWAY_DEVIATION` is `1`, the destination is queued for a count.

## 3. How a step is judged (short form)

```
step applies?  = guard matches
                 AND every pallet condition holds for every line
                 AND a search space exists
                 AND (temperature switch off OR zone suits every line)
candidate ok?  = in the search space
                 AND status Ok AND flag None AND not Discard LPN AND allowed type
                 AND every Location condition holds
                 AND occupancy rule  AND consolidate rule
                 AND capacity (all switches that are on)  AND landing rules
step result    = first candidate in order that is ok
policy result  = result of the first step that has one
```

Everything inside a step is **AND**. The only **OR** is between the values of one condition ("type is Case **or** Pick")
and between steps ("try step 10, else step 20").

## 4. How steps and conditions combine

- **Steps are alternatives, in order.** Put narrow steps first and wide steps last. A step with no conditions takes almost everything.
  The editor warns: `No conditions. Every location in scope is eligible — this step matches almost everything, so it belongs near the end of the pipeline.`
- **A later step cannot widen an earlier one.** If step 10 would always take what step 20 takes, step 20 shows `never runs` / `closed by step N (S)`.
- **Conditions are of two kinds.**
  - `Product` and `Lot` conditions ask: "is this step about this pallet at all?" One failing line skips the whole step.
  - `Location` conditions ask: "which locations are candidates?" They cut the candidate list before any check.
- **One condition per property per step.** You cannot write `is` and `is not` on the same property in one step. Use two steps.
- **`is` and `is not`** are exact and case-sensitive. A list of values is OR.
- **Missing data:**
  - A blank SKU field (ABC, group, class, putaway class) does not fail a pallet condition.
  - A missing attribute value (lot attribute, SKU attribute) **fails** it. On the location side, `is` removes a location with no value and `is not` keeps it.
- **Narrow-only fields.** `Location status` and `Location flag` conditions can only repeat the fixed gate. A location on hold can never be reached by a condition.
- **A step can only narrow what the location already forbids.** The location flags `Mix SKU`, `Mix Lot`, the type list and the capacity limits always apply.
  The step's rules apply **in addition**. When both speak, the stricter one wins, because both must pass.
- **Switches are independent.** Each of the five `Fit checks` is its own yes/no. Turning one off does not turn another on.
- **A limit of 0 is not a block.** An unset limit is "not checked", reported in the trace (`<limit>:no_limit`), and the location is still offered.

## 5. How a location is refused (the reasons)

Every refusal has a short code. The dry run and the trace show the code and a count. The full list with exact texts is in
`01-putaway-policy-steps-and-criteria.md`, section 4.2. In short:

| Group | Codes | The cause is in |
|---|---|---|
| Occupancy rule of the step | `mix_intent`, `mix_intent_sku`, `mix_intent_sku_lot` | the step (`Location occupancy`) and what stands or is promised in the location |
| Consolidate | `not_consolidatable` | the step `Mode` |
| Size and limits | `capacity` (with `loc_cube`, `loc_weight`, `loc_qty`, `loc_positions`, `item_positions`, `loc_footprint`, `loc_height`, `zone_cube`, `zone_weight`, `zone_cases_count`) | location limits, zone limits, SKU and pack data |
| Oversize | `section_none`, `section_not_free`, `section_too_small`, `section_promised` | location `Section`, SKU `Positions required` |
| Location flags and rules | `mix_sku`, `mix_lot`, `mix_attribute`, `lpn_multi_lot` | location flags, lot mixing rules, SKU lot rules |
| Race | `under_lock:<code>`, `lock_timeout`, `location_gone`, `pallet_already_reserved` | another operator at the same moment |

A location that fails the **fixed gate** (hold, flag, wrong type) is never a candidate, so it does not appear in any count.
To see how many locations a condition removed, run the dry run: it prints `Removed from the zone by this step's own conditions, before the scan: ...`.

## 6. Where the settings live

| What | Screen / menu | Column or key | Described in |
|---|---|---|---|
| Policy header | `Sidebar > Warehouse Configuration > Policies > Putaway Policy` | `putaway_policy.code`, `description` | file 01, section 1 |
| Step fields | step editor (open a policy) | `putaway_policy_detail.*` | file 01, section 2 |
| Conditions | step editor, band `Conditions` | `putaway_step_criterion.*` | file 01, section 3 |
| Policy on a SKU | SKU, tab Policies: `Putaway Policy` | `sku.putaway_policy_id` | file 01, 1.5 |
| Policy default of an owner | Owner, WH Settings: `Putaway Policy` | `owner_config.default_putaway_policy_id` | file 01, 1.5 |
| Preferred zone and location of a SKU | SKU, tab Policies: `Putaway Zone`, `Putaway Location` | `sku.putawayzone`, `sku.putaway_loc` | file 01, 2.2 |
| Zone | `Sidebar > Warehouse Configuration > Topology > Putaway Zones` | `putawayzone.*` | file 02 |
| Zone lot mixing rules | zone card, list `Lot Commingle Rules` | `putawayzone_lot_commingle.*` | file 02, section 3 |
| Location | `Sidebar > Warehouse Configuration > Topology > Locations` | `location.*` | file 03 |
| Location lot mixing rules | location card, list `Lot Commingle Rules` | `location_lot_commingle.*` | file 03, section 4 |
| Timers | `Sidebar > Warehouse Configuration > Settings & Reference Data > System Settings`; owner WH Settings | `PUTAWAY_RESERVATION_TTL_MIN`, `PUTAWAY_LOCK_TIMEOUT_MS`, `COUNT_ON_PUTAWAY_DEVIATION`, `owner_config.putaway_reservation_ttl_min` | file 01, 4.5 |

Master data on the SKU that putaway reads (the SKU form, not documented here in full):

| SKU field (UI label) | Column | Putaway reads it for |
|---|---|---|
| `Putaway Policy` | `sku.putaway_policy_id` | choosing the policy |
| `Putaway Zone` | `sku.putawayzone` | `Zone from the SKU` |
| `Putaway Location` | `sku.putaway_loc` | `Location from the SKU` |
| `Putaway Class` | `sku.putaway_class` | the condition `Putaway class` only |
| `ABC Class`, `SKU Group`, `Class`, `Rotation` | `sku.abc`, `sku_group`, `class`, `rotation` | the matching pallet conditions |
| `Positions required` | `sku.positions_required` | oversize goods: needs a whole free section |
| `Stack limit` | `sku.stack_limit` | the `Stacking limit` switch (lower of item and rack) |
| `Min Temperature (°C)`, `Max Temperature (°C)` | `sku.min_temperature`, `max_temperature` | the `Temperature` switch |
| cube, gross weight, pack pallet data | `sku.cube`, `sku.gross_wgt`, `pack_item.pallet_*` | the fit switches |

## 7. Worked examples

The numbers use the stored units: grams, millimetres, cubic millimetres.
The screens may show kg and m³. 1 kg = 1,000 g. 1 m³ = 1,000,000,000 mm³.

### 7.1 Pallet warehouse with FIFO

**Goal.** Pallets of one SKU and one lot per bay. Top up a bay before opening a new one. Never mix lots, so FIFO picking stays clean.

Zones: `RECV` (receiving dock), `BULK` (pallet racks).
SKU `WIDGET`: `Putaway Policy` = `PAL-FIFO`, `Putaway Zone` = `BULK`, `Rotation` = `Fifo`, cube 50,000,000 mm³ per carton, gross weight 12,000 g per carton.

Locations in `BULK` (all):

| Setting | Value |
|---|---|
| `Type` / `Processing Type` / `Category` | `Pnd` / `Pallet` / `SelectiveShelving` |
| `Max Cube Capacity` | 4,500,000,000 mm³ (4.5 m³) |
| `Max Weight Capacity` | level 0: 1,000,000 g; level 3: 400,000 g |
| `Pallet positions on floor` / `Stack limit` | 2 / 1 (two pallets per bay) |
| `Aisle`, `Bay`, `Level` | `A`, 1..N, 0..3 (so the order is bay by bay, floor first) |
| `Mix SKU`, `Mix Lot` | on, on (the steps decide) |

Policy `PAL-FIFO`:

| Step | Mode | Scope | Occupancy | Fit checks | Why |
|---|---|---|---|---|---|
| 10 | `Consolidate` | `Zone from the SKU` | `Allow mixing, with rules`: `Mixed SKU = Not allowed`, `Mixed lot = Not allowed` | Cube, Weight, Stacking limit | Top up a bay that already holds this SKU and lot. |
| 20 | `Suitable` | `Zone from the SKU` | `Must be empty` | Cube, Weight, Stacking limit | Open a new bay. |
| 30 | `Suitable` | `Zone named on this step` = `BULK` | `Must be empty` | Cube, Weight | Same as 20 for SKUs that have no zone (step 20 would be `skipped:no-zone`). |

Walk 1. Pallet P1: 60 cartons of `WIDGET`, lot `L-0426`. Cube 3,000,000,000 mm³. Weight 720,000 g. It stands in `RECV`.
Bay `A-01-0` holds one pallet of `WIDGET` lot `L-0426` (cube 1,000,000,000; weight 240,000).

- Step 10 reads `BULK` in order `A-01-0`, `A-01-1`, ...
- `A-01-0`: occupancy - the location plus the pallet is one identity (`WIDGET/L-0426`), pass. Consolidate - the bay holds `WIDGET`, pass.
  Capacity - weight 240,000 + 720,000 = 960,000 is not above 1,000,000. Cube 4,000,000,000 is not above 4,500,000,000. Positions: 1 standing + this one = 2, limit 2 x 1 = 2. Pass.
  Landing - location flags allow it. **Step 10 wins. P1 is reserved for A-01-0 for 15 minutes.**

Walk 2. Pallet P2: 60 cartons of `WIDGET`, lot `L-0500`.
- Step 10, `A-01-0`: the bay now holds `L-0426` and has a reservation for P1 (same lot). With P2 the identities are `WIDGET/L-0426` and `WIDGET/L-0500`. Refused: `mix_intent_sku_lot`
  (`step allows no mixing beyond the same sku and lot; location plus pallet would span 2 identities: owner 1/sku WIDGET/lot L-0426, owner 1/sku WIDGET/lot L-0500`).
- All other bays are empty: `not_consolidatable` (`location holds nothing (no stock, no inbound reservation) — a Consolidate step requires the sku to already be there`).
- Step 10 ends. Step 20 reads `BULK` again. `A-01-0` is not empty: `mix_intent` (`step requires an empty location; occupied=true, inbound_reservations=0`).
  `A-01-1` (level 1, limit 800,000 g) is empty. Weight 720,000 is not above 800,000. **Step 20 wins: A-01-1.**

Walk 3. A heavy pallet of 720,000 g reaches level 3 (`A-01-3`, limit 400,000 g): refused `capacity` with the detail `loc_weight: limit 400000, attempted 720000`. The engine tries the next bay.

What to watch: if `Max Weight Capacity` is 0 on a bay, the weight check does not run. The dry run shows `Offered without checking: loc_weight:no_limit on 12`.

### 7.2 Small parts on shelving

**Goal.** Totes of small parts go to pick shelves. Fill a shelf that already holds the SKU. Shelves have a volume limit and a piece limit.

Zones: `SHELF` (pick shelves), `OVERFLOW` (pallet bays for the rest).
SKU `SCREW-M6`: `Putaway Policy` = `SHELF-STD`, `Putaway Zone` = `SHELF`, cube 2,000 mm³ per piece, weight 5 g per piece.

Locations in `SHELF`:

| Setting | Value |
|---|---|
| `Type` / `Processing Type` / `Category` | `Pick` / `Piece` / `ShelvingStorage` |
| `Max Cube Capacity` | 60,000,000 mm³ (60 litres) |
| `Max quantity` | 500 |
| `Max Weight Capacity` | 0 (not set) |
| `Mix SKU`, `Mix Lot` | on, on |

Policy `SHELF-STD`:

| Step | Mode | Scope | Occupancy | Fit checks | Conditions |
|---|---|---|---|---|---|
| 10 | `Consolidate` | `Zone from the SKU` | `Any occupancy` | Cube, Quantity | `Location type is Pick` |
| 20 | `Suitable` | `Zone from the SKU` | `Any occupancy` | Cube, Quantity | `Location type is Pick` |
| 30 | `Suitable` | `Zone named on this step` = `OVERFLOW` | `Must be empty` | Cube, Weight | `Location type is Case` |

Walk. Tote T1: 300 pieces of `SCREW-M6` (cube 600,000 mm³, weight 1,500 g). Shelf `S-01-01` holds 150 pieces (cube 300,000).
- Step 10, `S-01-01`: consolidate - it holds `SCREW-M6`, pass. Quantity: 150 + 300 = 450, limit 500, pass. Cube: 900,000, limit 60,000,000, pass. **Wins.**
- If the shelf held 380: 380 + 300 = 680. Refused: `capacity` with `loc_qty: limit 500, attempted 680`.
- Shelves with `Max quantity` = 0 are not refused. The dry run shows `loc_qty:no_limit`.

What to watch:
- **The `Quantity` check counts stock only.** It does not count pieces promised to another tote by a live reservation. Two totes asked one after the other
  can both be sent to a shelf that holds 380 and together exceed 500. Cube, weight and pallet positions do count reservations.
  The move does not check `Max quantity` either. Use a short reservation time on pick faces.
- `Max Weight Capacity` is 0, so even if `Weight` were on it would not run.
- Step 30 refuses nothing on weight if the pack has no weight: `loc_weight:no_stock_weight`.

### 7.3 Mixed lots and restrictions

**Goal.** Food with an allergen attribute. Allergen lots must not share a pallet with non-allergen lots. Allergen goods go to their own zone.

Zones: `FOOD`, `ALRG`.
Lot policy of the food SKUs has the attribute `ALLERGEN` (values `YES` or `NO`).
Rules:

| Rule | Setting |
|---|---|
| Zone rule | Zone `FOOD`, `Lot Commingle Rules`: `Attribute Code` = `ALLERGEN`, `Allow Mix` off |
| Location exception | Location `F-09-01`, `Lot Commingle Rules`: `ALLERGEN`, `Allow Mix` on |
| Location flags in `FOOD` | `Mix SKU` off (one product per bay), `Mix Lot` on |
| Location in `ALRG` | `ALRG-01`: `Mix SKU` off, `Mix Lot` on |

Policy `FOOD-STD`:

| Step | Scope | Conditions | Occupancy | Other |
|---|---|---|---|---|
| 10 | `Zone named on this step` = `ALRG` | `Lot attribute ALLERGEN is YES` | `Mixed SKU = Not allowed`, `Mixed lot = Allowed` | Fit: Cube, Weight |
| 20 | `Zone from the SKU` (`FOOD`) | `SKU class is AMBIENT` | `Mixed SKU = Not allowed`, `Mixed lot = Not allowed` | Fit: Cube, Weight; `Temperature` on |
| 30 | `Zone named on this step` = `FOOD` | none | `Must be empty` | Fit: Cube, Weight |

Walk 1. Pallet P1: SKU `PEANUT`, lot `F-100`, `ALLERGEN = YES`.
- Step 10: the pallet condition holds. The search space is `ALRG`. `ALRG-01` is empty. Occupancy: one identity, pass. No lot rule on `ALRG`, pass. **Wins: ALRG-01.**

Walk 2. Pallet P2: SKU `RICE`, lot `F-200`, `ALLERGEN = NO`. `F-01-0` holds `RICE` lot `F-150`.
- Step 10: the lot has `ALLERGEN = NO`, so the condition fails. Status `skipped:product:LotAttribute`.
- Step 20: the SKU class matches. `F-01-0`: occupancy - two identities. Refused `mix_intent_sku_lot`.
  `F-01-1` is empty. Landing: `Mix SKU` off is fine (nothing else there). The zone rule `ALLERGEN` does not refuse because the pallet has one lot. **Wins: F-01-1.**

Walk 3. Pallet P3: SKU `MIX1`, lot `F-300` (`ALLERGEN = YES`) and lot `F-301` (`ALLERGEN = NO`) on one pallet.
- Step 10: one line has `NO`, so the **whole step is skipped** (`skipped:product:LotAttribute`).
- Step 20: in `FOOD`, `LandingRule` asks the zone rule. `ALLERGEN` has two values on the pallet and `Allow Mix` is off, so every `FOOD` location is refused with `mix_attribute`
  (`attribute ALLERGEN=YES mixing not allowed for lot F-300 on lpn Some("LPN3") [Some("putawayzone_lot_commingle rule on zone FOOD")]`).
  **Except `F-09-01`**, which has its own rule `Allow Mix` on. The location rule wins over the zone rule.
- Note: this rule reads stock rows that sit on the landing container itself. See the "To verify" block in `02-putaway-zone-settings.md`, section 3.3, for pallets whose stock sits on child cases.

Walk 4. A pallet with two different SKUs fails step 20 and step 30's occupancy at every location: step 20 asks "one SKU", and the pallet alone is two (`mix_intent_sku`). Step 30 (`Must be empty`) can still place it.

## 8. "No location" checklist

Open the policy and run `Dry run` on the LPN. Read the sentence for each step.

| You see | Do this |
|---|---|
| `The engine would not evaluate this pallet: no putaway policy ...` | Set `Putaway Policy` on the SKU or the owner. |
| `... spans SKUs with different putaway policies ...` | Put the pallet's SKUs on one policy. |
| `step uses scope=AssignedSlot ...` | Change that step. |
| `skipped:no-zone` on every step | Set `Putaway Zone` on the SKU, or add a step with `Zone named on this step`. |
| `skipped:product:<Property>` | The pallet fails that condition. Check the SKU field, or the lot attribute value. |
| `skipped:guard` | The pallet is not standing where the guard wants. |
| `skipped:temperature` | Fix the zone range, the SKU range, or switch `Temperature` off. |
| `ran over 0 candidate(s)` | The zone has no location that is `Ok`, flag `None`, not `Discard LPN` and of an allowed type. Check status (holds), flags and types. |
| `Refused by: capacity on N` | Read the `Detail` column. It names the limit. Raise it, set the item data, or use another zone. |
| `Refused by: mix_sku`, `mix_lot` | The location flags forbid the mix. Change the flag or choose another location. |
| `Refused by: mix_intent...` | The step rule is stricter than you meant. |
| `It stopped at its scan budget ...` | More than 100 candidates in the zone were tried. Narrow the step with conditions, or split the zone. |
| `Offered without checking: ...:no_limit` | A switch is on but the limit is 0. Fill the limit or switch it off. |

## 9. Known gaps and surprises (found while writing this guide)

These are real behaviours of the current code. File and line are given.

1. **The step editor offers two values that do not work.** `Assigned slot` and `Nearest to the assigned slot` are shown switched off (`not implemented yet`),
   but the API can still store them, and then the engine refuses the whole policy.
2. **`Pick route` does not use `Route Sequence`.** It orders by aisle, bay, level, code. Aisle is text.
3. **The step readback sentence ignores two fit switches** (`Stacking limit`, `Quantity`) and says "Checks nothing physical" when only those are on.
4. **The `Temperature` label says "cover" and "location".** The code tests overlap of the **zone** range with the SKU range. The dry run says "suit" and is right.
5. **Turning `Cube` or `Weight` off in a step does not stop the move from checking them**. Putaway may offer a place the move then refuses.
6. **`Quantity` ignores quantity promised by reservations.** Cube, weight and positions do not.
7. **Location `Mix SKU` and `Mix Lot` do not see reservations.** Only the step rule `Mixed SKU` / `Mixed lot` does.
8. **`Stored only` fields.** Zone: `Inbound Location`, `Outbound Location`, `RF Pick Strategy`, `Replenishment Allowed`, `Replenishment Threshold`, `Default Label Printer`,
   `Default Report Printer`, `Auto Print Addr Label`, `Auto Print Carton Label`. Location: `Cube`, `Check Digit`. SKU `Putaway Class = NoMix` does nothing unless a step has a `Putaway class` condition.
9. **Stale comments.** `predicate.rs:197-218` says putaway does not exclude `Discard LPN` locations, but the candidate SQL does.
   The column comment on `location.loc_flag` says moves need flag `None`, but moves ignore flags.
   `docs-obsidian/putaway_policy/README.md` says zone lot rules have no reader. They do.
10. **`Allocation` still allocates from `Lost` locations**.
11. **`Generate` does not set aisle or bay**, so putaway order for generated locations is by level then code (`03-location-settings.md`, section 5).
12. **Zone `Description` is never NULL,** so the step editor's zone list can show an empty name (`wms-meta-ui` baseline, `zones` source).
