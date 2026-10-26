# Cartonization policy: settings reference

This page lists every setting that controls cartonization, with its screen
label, database column, range, default, effect, example and side effects.
Read [30-cartonization-overview.md](30-cartonization-overview.md) first for
the big picture.

## How to read a card

Each setting has the same lines:

- **Screen**: the exact English label and where to find it. "API only" means
  no screen shows it. The RPC name is then given.
- **Column**: table.column, type, allowed range.
- **Default**: the value in the schema, and the value in the seed data.
- **Meaning**: what it is, in plain words.
- **Affects**: what process or screen reads it, with `file:line`.
- **Example**: a numeric example.
- **Interactions**: which setting wins when two disagree.
- **When empty**: what happens with no value.
- **If you change it**: what happens to existing orders and stock.

"Stored only. It has no effect today." means: I searched the code and no
process reads the value to make a decision. The search is named in the card.

All paths below are under `crates/libs` unless they start with `ui/` or
`crates/services`.

## Where to open the editor

Main menu: **Policy** > **Cartonization Policy**. The list shows all
policies. Open one to see a single editor (a "Component" form, tag
`wms-cartonization-policy`) with four blocks:

1. **General**
2. **Solver settings**
3. **Exception handling**
4. **Cartons in solver order**

One toolbar has **Refresh** and **Save**. One Save writes the header and all
cartons together, in one transaction. Source: `wms-lib-sql/sql/wms-meta-ui/migrations/045_cartonization_policy_is_one_component.sql`
(labels at lines 100-140), `ui/wms-component/components/cartonization-policy/CartonizationPolicy.tsx`.

The policy has a version number. Save sends the version you loaded. If
someone else saved first, the save is refused with an optimistic-lock error
and you must reload (`wms-lib-core/src/model/policies/cartonization_aggregate.rs:406-420`).
`cartonization_policy_save` is a stateful command. `cartonization_policy_create`
and the delete commands are stateless
(`crates/services/app-server/src/web/rpcs/cartonization_policy_rpc.rs`).

## Part 1: Policy header (table `cartonization_policy`)

### Code

- **Screen**: Cartonization Policy > General > **Code**. Read-only after the
  policy exists.
- **Column**: `cartonization_policy.code`, varchar(10), unique, not null.
- **Default**: no default. Seed: `STD` (id 1).
- **Meaning**: The short name of the policy. It shows in lists and in the SKU
  and owner pickers.
- **Affects**: Create refuses an empty code (`cartonization_aggregate.rs:274-279`).
  The code is copied into the plan's policy snapshot (`snapshot.rs:34`) but no
  rule branches on it. The code cannot be changed by save
  (`code: None`, `cartonization_aggregate.rs:~490`).
- **Example**: `STD`, `FRAGILE`. Ten characters at most.
- **Interactions**: Must be unique across policies.
- **When empty**: Create is refused: "cartonization policy code cannot be empty".
- **If you change it**: You cannot change it. Create a new policy instead.

### Name

- **Screen**: General > **Name**.
- **Column**: `cartonization_policy.name`, varchar(50), null allowed.
- **Default**: null. Seed: `Standard parcel` (wms-app migration 004).
- **Meaning**: A friendly name for people.
- **Affects**: Display only. Searched: `grep "\.name" cartonization/` shows no
  engine read. Stored only. It has no effect today.
- **Example**: "Parcel boxes".
- **Interactions**: none.
- **When empty**: Allowed. Save sends "clear name" (`cartonization_aggregate.rs:~484`).
- **If you change it**: No effect on orders.

### Description

- **Screen**: General > **Description**.
- **Column**: `cartonization_policy.descr`, varchar(255), not null.
- **Default**: empty string. Seed: `Packs an order into standard parcel boxes.`
- **Meaning**: A note for people.
- **Affects**: Display only. Stored only. It has no effect today.
- **Example**: "Small electronics, max 20 per box".
- **Interactions**: none.
- **When empty**: Empty string is stored.
- **If you change it**: No effect on orders.

### Active

- **Screen**: General > **Active** (checkbox).
- **Column**: `cartonization_policy.active`, boolean, not null.
- **Default**: schema `false` for new rows (wms-app migration 022). The seed
  row `STD` is `true` (added by migration 002, whose default was true).
- **Meaning**: Says the policy is ready for use.
- **Affects**: Only the save rule: an active policy needs at least one active
  carton, or save is refused ("an active cartonization policy needs at least
  one active carton", `cartonization_aggregate.rs:257-261`). **The engine
  does not read this flag when it plans an order.** `plan_reservation_over`
  loads the policy by id and uses it whatever its `active` value is
  (`plan.rs:124-130`); policy resolution does not check it either
  (`wms-lib-core/src/model/sku.rs:908-923`). Only the cartons' own `active`
  flag is used (`plan.rs:193`).
- **Example**: A policy named by a SKU but set inactive still plans orders for
  that SKU.
- **Interactions**: To stop a policy from planning, remove it from the SKUs and
  the owner default. Switching it off does not stop it.
- **When empty**: Not applicable (boolean).
- **If you change it**: No change to existing plans. New plans ignore the flag.

### Pick splitting (`split_rule`)

- **Screen**: General > **Pick splitting**. Values: **Allow**, **Prevent**.
- **Column**: `cartonization_policy.split_rule`, enum `pick_split_rule`
  (`Allow`, `Prevent`), not null.
- **Default**: schema `Prevent`. Seed `Prevent`.
- **Meaning**: May one pick line be spread over more than one carton?
- **Affects**: `blocks_of` (`plan.rs:221-246`). `Allow`: each unit is a
  block. `Prevent`: all units of one pick are one block, and a block goes
  whole into one carton or stays unplaced. The validator checks the same rule
  (`validate.rs:139,156`). When a pick line crosses cartons the pick row is
  split into several pick rows (`write.rs:~180`).
- **Example**: BOX-S holds 20 units (`max_units = 20`) and is the only active
  carton. A pick of 30 small items:
  - `Prevent`: the 30 units are one block, it does not fit one carton, so the
    result is `SplitPrevented` and the pick is `Blocked`.
  - `Allow`: 20 units go into carton 1, 10 into carton 2. The pick row is
    split in two.
- **Interactions**: `Allow` can never give the reason "Splitting not allowed".
  The reason "Nothing fits" is cured by a bigger carton, not by this setting.
- **When empty**: Not possible (not null).
- **If you change it**: Existing plans stay. The next reserve or release
  recalculates the plan if the input fingerprint changed, and the policy is
  part of the fingerprint (`ensure.rs:194`, `snapshot.rs:100-130`).

#### Value `Allow`

Each unit is placed alone. A pick can end up in several cartons.

#### Value `Prevent`

All units of a pick stay together in one carton. If they do not fit, the
pick is stopped.

### Solver (`solver`)

- **Screen**: Solver settings > **Solver**. Only value: **3D bin packing**
  (stored as `BinPacking3d`; caption from wms-meta-ui migration 075:77).
- **Column**: `cartonization_policy.solver`, enum `cartonization_solver`
  (`BinPacking3d`), not null.
- **Default**: `BinPacking3d`. Seed same.
- **Meaning**: Names the packing method.
- **Affects**: Copied into the plan snapshot (`ensure.rs:424`). Nothing
  branches on it, because there is only one value. Stored only. It has no
  effect today.
- **Example**: n/a (one choice).
- **Interactions**: none.
- **When empty**: Not possible.
- **If you change it**: Nothing to change.

### Algorithm (`algorithm`)

- **Screen**: Solver settings > **Algorithm**. Only value: **Extreme points**
  (stored as `ExtremePoints`).
- **Column**: `cartonization_policy.algorithm`, enum `cartonization_algorithm`
  (`ExtremePoints`), not null.
- **Default**: `ExtremePoints`. Seed same.
- **Meaning**: Names the placement method.
- **Affects**: Copied to the snapshot (`ensure.rs:425`). No branch. Stored
  only. It has no effect today.
- **Example**: n/a.
- **Interactions**: none.
- **When empty**: Not possible.
- **If you change it**: Nothing to change.

### Iterations per unit² (`iterations_per_unit_sq`)

- **Screen**: Solver settings > **Iterations per unit²**. Integer, minimum 1
  on the screen.
- **Column**: `cartonization_policy.iterations_per_unit_sq`, int, not null,
  must be greater than 0 (check `cartonization_policy_solver_limits_valid`,
  wms-app migration 022; save refuses 0 or less: "iterations_per_unit_sq must
  be positive", `cartonization_aggregate.rs:177-181`).
- **Default**: 30. Seed 30.
- **Meaning**: The work budget grows with the square of the number of units.
  This is the multiplier.
- **Affects**: `SolverBudget::for_units` (`budget.rs:32-47`), called from
  `plan.rs:147`.
- **Example**: 12 units: 30 x 12 x 12 = 4,320. That is below the minimum
  50,000, so the limit is 50,000. 100 units: 30 x 10,000 = 300,000, inside
  the range, so the limit is 300,000. 400 units: 30 x 160,000 = 4,800,000,
  above the cap, so the limit is 2,000,000.
- **Interactions**: The result is clamped by Minimum iterations and Maximum
  iterations.
- **When empty**: Not allowed.
- **If you change it**: Applies to the next calculation only. A budget error
  rolls back the whole attempt; the order stays reserved but has no plan.

### Minimum iterations (`min_iterations`)

- **Screen**: Solver settings > **Minimum iterations**. Integer, minimum 1.
- **Column**: `cartonization_policy.min_iterations`, int, not null, greater than 0.
- **Default**: 50,000. Seed 50,000.
- **Meaning**: The lowest budget, even for tiny orders.
- **Affects**: `budget.rs:38-46` (lower clamp).
- **Example**: 3 units: 30 x 9 = 270, raised to 50,000. About 41 units are
  needed before the formula (30 x 41² = 50,430) exceeds the minimum.
- **Interactions**: Must not be above Maximum iterations (save refuses:
  "max_iterations_cap cannot be less than min_iterations",
  `cartonization_aggregate.rs:182-188`).
- **When empty**: Not allowed.
- **If you change it**: Applies to the next calculation only.

### Maximum iterations (`max_iterations_cap`)

- **Screen**: Solver settings > **Maximum iterations**. Integer, minimum 1.
- **Column**: `cartonization_policy.max_iterations_cap`, int, not null,
  at least `min_iterations`.
- **Default**: 2,000,000. Seed 2,000,000.
- **Meaning**: The highest budget. A huge order cannot run forever.
- **Affects**: `budget.rs:39,46` (upper clamp). If the work reaches this
  number, the command returns the budget-exceeded error and no plan is saved
  (`error.rs:55-56`).
- **Example**: 400 units want 4,800,000 steps; the cap gives 2,000,000. If the
  solver needs more than that, the order has no plan. About 259 units are
  needed before the cap applies (30 x 259² = 2,012,430).
- **Interactions**: Cartons in the list multiply the work, because every unit
  is tried against every active carton. A short list needs a lower cap.
- **When empty**: Not allowed.
- **If you change it**: Applies to the next calculation only.

### Maximum candidates (`max_candidates`)

- **Screen**: Solver settings > **Maximum candidates**. Integer, minimum 1.
- **Column**: `cartonization_policy.max_candidates`, int, not null, greater than 0.
- **Default**: 2,000. Seed 2,000.
- **Meaning**: Intended as a cap on candidate placements.
- **Affects**: Validated on save (`cartonization_aggregate.rs:190`) and copied
  to the snapshot (`ensure.rs:430`, `snapshot.rs:120`). **The solver never
  reads it.** Search: `grep -rn max_candidates crates --include=*.rs` returns
  only the model, validation, snapshot and test files. Stored only. It has
  no effect today. It still changes the plan fingerprint, so editing it makes
  the next reserve or release write a new plan with the same boxes.
- **Example**: Set 10 or 10,000: no change in packing.
- **Interactions**: none.
- **When empty**: Not allowed.
- **If you change it**: Only the fingerprint changes (see above).

### Objective (`objective`)

- **Screen**: Solver settings > **Objective**. Values: **Minimum cartons**,
  **Minimum unused volume**, **Fewest pick splits**, **Balanced weight** (the
  last three are greyed out with a reason and are refused on save).
- **Column**: `cartonization_policy.objective`, enum
  `cartonization_objective`, not null. A database check allows only
  `MinCartons` (`cartonization_policy_objective_is_executable`, wms-app
  migration 022).
- **Default**: `MinCartons`. Seed `MinCartons`.
- **Meaning**: The goal of the packing.
- **Affects**: Save refuses any value except `MinCartons`
  (`cartonization_policy.rs:629-636`, `cartonization_aggregate.rs:164-166`):
  "the goal ... is not yet implemented by the engine: only MinCartons is
  counted" (the message text is Russian in the source). The solver has no
  other goal. It always opens as few cartons as the greedy pass and the
  shrink pass can reach.
- **Example**: n/a.
- **Interactions**: none.
- **When empty**: Not possible.
- **If you change it**: You cannot save another value.

#### Value `MinCartons` ("Minimum cartons")

The only working goal. Fewest cartons, then the smallest box that fits
(shrink pass, `pack.rs:815-900`).

#### Values `MinUnusedVolume`, `MinPickSplits`, `BalanceWeight`

Listed so the screen is honest. Save refuses them. Stored only. They have no
effect today.

### Exception handling: the six actions

The block "Exception handling" has six drop-downs. Each says what to do for
one reason that the solver cannot place something. Each drop-down offers
**Stop** and **Ship as is**.

**Truth about all six.** The code reads the six values and then throws them
away. Every unplaced row gets action `Stop`, always
(`write.rs:556-572`, function `action_for`, which ends with the literal
`"Stop"`). Save refuses `ShipAsIs` ("ShipAsIs is reserved for an explicit
factory pack level; solver exceptions must Stop",
`cartonization_policy.rs:638-648`, `cartonization_aggregate.rs:167-175`).
The drop-down still lists "Ship as is", greyed with a reason. Only `Stop`
can be saved.

A factory package that ships without a box is set on the pack level
(`pack_item.ship_as_is`), not here.

Because the six columns have the same behaviour, the cards below share the
same facts for Affects/When empty/If you change it:

- **Affects**: `write.rs:556-572`. Value is read into `_configured` and not
  used. The value `Stop` is written to `cartonization_unplaced.action`. The
  pick becomes `Blocked` (`write.rs:619`).
- **When empty**: Not possible (not null).
- **If you change it**: Nothing changes in behaviour. A saved policy with the
  old value `ShipAsIs` (from before migration 032) is still readable, is
  treated as `Stop`, and is listed in the view
  `cartonization_policy_legacy_ship_as_is` for clean-up (wms-app migration 032).
  Save of that policy is refused until you set every action to `Stop`.

| Setting | Screen label | Column | Reason it answers | Default |
|---|---|---|---|---|
| No dimensions | Exception handling > **No dimensions** | `on_no_dimensions` | A unit has a zero length, width or height (`pack.rs:400-405`). | `Stop` |
| No weight | **No weight** | `on_no_weight` | Weight unknown while the carton has a gross limit (`pack.rs:438-470`). | `Stop` |
| No carton candidates | **No carton candidates** | `on_no_carton_candidates` | The policy has no active carton (`pack.rs:574-582`). | `Stop` |
| No carton fits | **No carton fits** | `on_no_carton_fits` | No active carton fits the unit (`pack.rs:629`). | `Stop` |
| Weight exceeded | **Weight exceeded** | `on_weight_exceeded` | Contents are heavier than every carton's gross limit (`pack.rs:621-625`). | `Stop` |
| Split prevented | **Split prevented** | `on_split_prevented` | A block does not fit one carton but would if split (`pack.rs:584-612`). | `Stop` |

All six: column type `cartonization_exception_action`
(`ShipAsIs`, `Stop`), not null; seed `Stop`.

Numeric example for **No weight**: SKU A has `pack_item.weight = 0`. BOX-S has
`max_gross_weight = 5000`. A unit of A cannot be checked against 5,000 g, so
the unit is unplaced as `NoWeight`. If every active carton had
`max_gross_weight = 0` (no limit), the weight would not matter and the unit
would be placed.

#### Value `Stop`

Stop the line. The pick waits for a person to fix the data.

#### Value `ShipAsIs`

Old value kept for reading only. It cannot be saved. The runtime treats it as
`Stop`.

### Version (`version`)

- **Screen**: Not shown as a field. The editor holds it internally.
- **Column**: `cartonization_policy.version`, int, not null, greater than 0
  (wms-app migration 022).
- **Default**: 1. Seed 1.
- **Meaning**: A counter for the whole policy (header and cartons). It rises
  on every save.
- **Affects**: Optimistic lock on save (`cartonization_aggregate.rs:410-420`).
  `aggregate_view` reads header and cartons again until they match the same
  version (`cartonization_aggregate.rs:333-378`), so the solver never sees a
  half-saved policy.
- **Example**: Two supervisors open version 3. The first saves (becomes 4).
  The second save is refused.
- **Interactions**: none.
- **When empty**: Not possible.
- **If you change it**: Not editable.

## Part 2: Cartons (table `cartonization_policy_detail`)

Each row is one real, physical box type. There is no separate box catalog.
Block title on screen: **Cartons in solver order**. Buttons: **Add carton**,
move up, move down, remove. The array order on screen becomes the
`sequence`: 10, 20, 30 and so on on every save (`cartonization_aggregate.rs:526-530`).

A new row on the screen starts inactive, with all numbers 0
(`ui/wms-component/components/cartonization-policy/draft.ts:174-187`).
Remove deletes the row on save (`cartonization_aggregate.rs:508-514`).

**Units**: lengths in the warehouse length unit (default `MM`), weights in the
warehouse weight unit (default `G`). Inner sizes, not outer sizes.

### Carton code (`step_num`)

- **Screen**: Cartons > **Carton code**. Read-only after the row is saved.
- **Column**: `cartonization_policy_detail.step_num`, varchar(20), not null,
  unique inside the policy (`uq_carton_policy_step`).
- **Default**: none. Seed: `BOX-S`, `BOX-M`, `BOX-L`.
- **Meaning**: The name of the box type.
- **Affects**: Stored in the plan carton snapshot (`step_num_snapshot`,
  `write.rs:~440`) and in details like `largest active carton BOX-L`
  (`pack.rs:470-540`). Save refuses an empty code, a duplicate, or a code
  longer than 20 characters (`cartonization_aggregate.rs:210-225`). Save
  refuses a rename ("carton code ... is immutable", `:~470`).
- **Example**: `BOX-M`.
- **Interactions**: none.
- **When empty**: Refused.
- **If you change it**: You cannot. Add a new carton and remove the old one.

### Description

- **Screen**: Cartons > **Description** (the cell in the row).
- **Column**: `cartonization_policy_detail.descr`, varchar(255), not null.
- **Default**: empty. Seed: `Small parcel box`, `Medium parcel box`,
  `Large parcel box`.
- **Meaning**: A note.
- **Affects**: Display only. Stored only. It has no effect today.
- **Example**: "Blue 30 cm mailer".
- **Interactions**: none.
- **When empty**: Allowed.
- **If you change it**: No effect.

### Sequence (order in the list)

- **Screen**: Not a field. Use **Move carton up** and **Move carton down**.
- **Column**: `cartonization_policy_detail.sequence`, int, not null.
- **Default**: 0 (schema). Seed: 10, 20, 30.
- **Meaning**: The order in which the solver tries cartons. Ties go to the
  lower id.
- **Affects**: `ordered` (`pack.rs:390-394`) sorts by `(sequence, id)`. When a
  block does not fit any open carton, the solver opens the **first** carton in
  this order that fits (`pack.rs:360-385`). The later shrink pass tries smaller
  volumes first, whatever the order (`pack.rs:844-860`).
- **Example**: List order BOX-L, BOX-S. A tiny item opens BOX-L first. The
  shrink pass then moves it into BOX-S if it fits, so the final box is still
  the smallest that holds the contents. Order still matters when the shrink
  pass cannot move (for example, because of unit or weight limits in the
  smaller box).
- **Interactions**: Overrides nothing. Equal values are not an error.
- **When empty**: Not applicable.
- **If you change it**: New plans use the new order. Existing plans keep
  their cartons.

### Active (carton)

- **Screen**: Cartons > **Active** (checkbox in the row).
- **Column**: `cartonization_policy_detail.active`, boolean, not null.
- **Default**: schema `true`; a new screen row starts `false`. Seed `true`.
- **Meaning**: May the solver use this box type?
- **Affects**: Only active cartons become candidates (`plan.rs:190-208`).
  An active carton must have all three inner sizes above 0, and when
  `max_gross_weight` is above 0 it needs `0 < tare_weight < max_gross_weight`
  (`cartonization_policy.rs:598-621`, check constraints
  `cartonization_active_carton_has_dimensions` and
  `cartonization_carton_weights_are_executable`, wms-app migration 022).
  An inactive row is a draft and is not validated.
- **Example**: Switch BOX-L off: no new plan uses BOX-L. Orders already
  planned in BOX-L keep it.
- **Interactions**: If you switch off all cartons, a still-active policy
  cannot be saved. If the policy is already inactive, an order that resolves
  to it still plans, finds no candidates, and every unit is unplaced as
  `NoCartonCandidates`.
- **When empty**: Not applicable.
- **If you change it**: Next plan only.

### Inner length, Inner width, Inner height

- **Screen**: Cartons > **Inner length**, **Inner width**, **Inner height**
  (number cells, step 0.001, minimum 0).
- **Column**: `inner_length`, `inner_width`, `inner_height`,
  double precision, not null, 0 or more, finite (`chk_cpd_dims`).
- **Default**: 0. Seed: BOX-S 300 x 200 x 150; BOX-M 500 x 300 x 250;
  BOX-L 600 x 400 x 400 (mm).
- **Meaning**: The space inside the box. The solver packs inside it.
- **Affects**: `plan.rs:196-203` rounds each to a whole number. A unit fits
  when its three sizes fit in some allowed orientation.
- **Example**: BOX-S 300 x 200 x 150. A unit 280 x 180 x 140 fits upright.
  A unit 310 x 100 x 100 does not fit BOX-S in any orientation (310 is more
  than the longest side, 300). BOX-M takes it.
- **Interactions**: A tare type, if named, must be able to hold this size
  (see Tare type).
- **When empty**: 0 means "unknown". An active carton with a 0 side cannot be
  saved. Inactive is fine.
- **If you change it**: New plans only. A carton already picked into is
  frozen as written; if today's master data differs, it is reported as a
  divergence, not refused.

### Tare weight

- **Screen**: Cartons > **Tare weight**.
- **Column**: `tare_weight`, double precision, not null, 0 or more, finite.
- **Default**: 0. Seed: BOX-S 200; BOX-M 400; BOX-L 700 (g).
- **Meaning**: Weight of the empty box.
- **Affects**: Added to the content weight when the gross limit is tested
  (`pack.rs:140-146, 723-740`). Copied to the container as its own
  `tare_weight` when the planned carton is created (`write.rs:424`). Packing
  uses that container tare for the expected weight
  (`domain/packing_carton/aggregate.rs:117`).
- **Example**: BOX-S: tare 200 g, limit 5,000 g, units 450 g each. 10 units:
  200 + 4,500 = 4,700, fine. The 11th unit would make 5,150, which is
  over the limit, so it goes to another carton.
- **Interactions**: With `max_gross_weight` above 0, tare must be above 0 and
  below the limit (save refuses: "carton has a gross weight limit: give the
  empty box weight" and "tare cannot equal the whole gross limit", both
  Russian in source). With `max_gross_weight = 0` the tare may be 0.
- **When empty**: 0 means "not counted". Allowed only with no gross limit.
- **If you change it**: New containers get the new tare. Containers already
  created keep their old tare.

### Maximum gross weight

- **Screen**: Cartons > **Maximum gross weight**.
- **Column**: `max_gross_weight`, double precision, not null, 0 or more.
- **Default**: 0. Seed: BOX-S 5,000; BOX-M 15,000; BOX-L 25,000 (g).
- **Meaning**: The most the whole box may weigh, tare included. 0 means no
  limit.
- **Affects**: `room_by_weight` (`pack.rs:723-740`). When above 0 every unit
  must have a known weight, or it cannot go in (reason `NoWeight`). The
  validator re-checks it (`validate.rs:371`). The reason `WeightExceeded` is
  chosen in `blocked_by_weight` (`pack.rs:438-470`).
- **Example**: Limit 5,000 g, tare 200 g: content up to 4,800 g.
- **Interactions**: A tare type's own limit must be at least this limit, or
  save is refused (`fits_carton`, `handling_unit/fit.rs:35-50`).
- **When empty**: 0 = no limit and weight is not checked.
- **If you change it**: New plans only.

### Maximum units

- **Screen**: Cartons > **Maximum units**. Whole numbers.
- **Column**: `max_units`, int, not null, 0 or more.
- **Default**: 0. Seed: BOX-S 20; BOX-M 50; BOX-L 0.
- **Meaning**: The most units one box may hold. 0 means no limit.
- **Affects**: `room_by_count` (`pack.rs:714-716`). A block that is blocked
  only by this limit is reported as "Nothing fits", not as a weight reason.
- **Example**: BOX-S 20: unit 21 goes to the next box.
- **Interactions**: Counts physical units of any pack level.
- **When empty**: 0 = no limit.
- **If you change it**: New plans only.

### Tare type (`handling_unit_type_id`)

- **Screen**: Cartons > **Tare type**. A drop-down. The first option is
  **Any box that fits** (stored as no value).
- **Column**: `cartonization_policy_detail.handling_unit_type_id`, bigint,
  null allowed. Points to `enterprise.handling_unit_type.id`. No foreign key;
  the service checks it.
- **Default**: null.
- **Meaning**: Which real box type (a handling-unit type) this carton row
  stands for.
- **Affects**: On save, a named type must exist, be active, hold goods, and
  be big enough: inner size and gross limit at least the carton's
  (`cartonization_aggregate.rs:81-117`). At the floor, when the picker scans
  a real box for this planned position, the box must have this type, or the
  bind is refused (`picking/target/bind.rs:92-96`, "type not planned"). If no
  type is named, the real box only has to be big enough
  (`bind.rs:100-106`).
- **Example**: Carton row BOX-M names type `EVA_TOTE`. A scanned box of type
  `CARTON_B` is refused.
- **Interactions**: An inactive carton row is only checked for a dangling id.
- **When empty**: Any real box big enough may be used.
- **If you change it**: Applies at the next bind. Boxes already bound are not
  re-checked by this setting.

## Part 3: Which policy an order uses

Order of lookup, per SKU and owner (`sku.rs:908-923`, read at
`read_from_db.rs:199`):

1. `sku.cartonization_policy_id`
2. else `owner_config.default_cartonization_policy_id`
3. else no policy: the pick is `Bypassed` (normal destination, no carton).

### SKU: Cartonization Policy

- **Screen**: SKU > open a SKU > tab **Policies** > **Cartonization Policy**
  (a picker). Required on the screen.
- **Column**: `sku.cartonization_policy_id`, bigint, null allowed, foreign key
  to `cartonization_policy`, delete restricted.
- **Default**: null. (Until migration 009 the column defaulted to 1; the
  default was dropped and rows with 1 were cleared so the owner default can
  work.) Seed SKUs: null unless set.
- **Meaning**: This SKU's own policy.
- **Affects**: Step 1 of the lookup above.
- **Example**: SKU GLASS names policy `FRAGILE`. Other SKUs use the owner
  default `STD`. One order with both gets two parts that never share a box.
- **Interactions**: Wins over the owner default. Picks with different
  policies are solved separately and never share a carton (`reservation.rs`
  partitions by policy id).
- **When empty**: The owner default is used.
- **If you change it**: Existing plans stay. Next reserve or release
  recalculates because the policy part changed.

### Owner: Cartonization Policy (default)

- **Screen**: Owners > open an owner > owner configuration >
  **Cartonization Policy** (picker).
- **Column**: `owner_config.default_cartonization_policy_id`, bigint, null
  allowed, foreign key, delete sets null.
- **Default**: null. Migration 009 set existing owners with null to 1 (`STD`).
- **Meaning**: The policy for the owner's SKUs that name none.
- **Affects**: Step 2 of the lookup.
- **Example**: Owner default `STD`; 500 SKUs have no policy of their own. All
  use `STD`.
- **Interactions**: Loses to the SKU policy.
- **When empty**: With the SKU also empty, no policy: `Bypassed`.
- **If you change it**: Next plan only.

## Part 4: Pack level fields the solver reads (table `pack_item`)

These live on the pack, not on the policy. They are listed here because the
policy cannot work without them. Screen: **Packs** > open a pack > pack
items. See also [34-sku-level-settings.md](34-sku-level-settings.md).

### Cartonize

- **Screen**: Packs > pack item > **Cartonize** (checkbox on the basic form).
- **Column**: `pack_item.cartonize`, boolean, not null.
- **Default**: `false`.
- **Meaning**: Does this level go into a shipping box?
- **Affects**: `reservation.rs:151`. False: the pick is `Bypassed`, outcome
  "not cartonized", a normal state ("Normal - nothing to fix").
- **Example**: `EA` level true; `PL` level false.
- **Interactions**: Cannot be true together with Factory package
  (`ck_pack_item_cartonization_mode`, wms-app migration 032). Factory package
  is tested first (`reservation.rs:136`).
- **When empty**: Not applicable.
- **If you change it**: Next plan only.

### Factory package (`ship_as_is`)

- **Screen**: API only. `create_pack_with_items`, `update_pack_with_items`,
  `update_pack_item` (`app-server/src/web/rpcs/pack_rpc.rs`). No screen field.
- **Column**: `pack_item.ship_as_is`, boolean, not null.
- **Default**: `false`.
- **Meaning**: This level is a factory-sealed package. It ships without an
  outbound box.
- **Affects**: `reservation.rs:136`. The pick gets outcome `ShipAsIs` with a
  frozen proof of the pack revision (`write.rs:225-245`, check
  `ck_pick_factory_package_proof`).
- **Example**: A 6-pack of drink cartons sold whole.
- **Interactions**: Excludes `cartonize`.
- **When empty**: Not applicable.
- **If you change it**: Next plan only.

### Rotation rule (`rotation_rule`)

- **Screen**: API only (same RPCs as above). No screen field.
- **Column**: `pack_item.rotation_rule`, enum `rotation_rule`
  (`All90`, `None`, `UprightOnly`), not null.
- **Default**: `All90`.
- **Meaning**: Which ways the unit may be turned in the box.
- **Affects**: `read_from_db.rs:261-270`; `best_placement` tries each
  distinct orientation (`pack.rs:670-700`).
- **Example**: A 300 x 100 x 50 unit with `None` must go in as 300 x 100 x 50.
  With `All90` it may stand on its end.
- **Interactions**: Fewer orientations means more "Nothing fits".
- **When empty**: Not applicable.
- **If you change it**: Next plan only. A unit already picked keeps its
  written orientation.

### Length, Width, Height, Weight (pack level)

- **Screen**: Packs > pack item > dimensions form: **Length**, **Width**,
  **Height**, **Weight**.
- **Column**: `pack_item.length`, `width`, `height`, `weight`, double
  precision, not null, default 0.
- **Meaning**: Outer size and gross weight of ONE unit of this level.
- **Affects**: `read_from_db.rs:261-265`. Any size of 0 gives
  `NoDimensions`. Weight 0 or less is "unknown".
- **Example**: `EA` 120 x 80 x 40 mm, 450 g.
- **When empty**: 0 means unknown.
- **If you change it**: Next plan only.

## Part 5: What the screens call plan states

Shown on the order screen (tabs Picks, Cartons, Exceptions):

| Outcome stored | Screen text | Meaning |
|---|---|---|
| `Planned` | the carton code | Pick has a carton. |
| `Bypassed` | `not cartonized` | Normal destination; level not cartonized or no policy. |
| `ShipAsIs` | `SHIP AS IS` | Factory package. |
| `Blocked` | `BLOCKED` | Stopped until data is fixed. |
| `Pending` | `pending` | Not calculated yet. |

Plan status: `Planned`, `PlannedWithExceptions`, `Stale`, `Superseded`.
Source: `wms-meta-ui/migrations/015_*.sql`, `wms-app/migrations/007_*.sql`,
`008_*.sql`.

Exceptions tab texts: "No dimensions", "No weight", "No candidate cartons",
"Nothing fits", "Overweight", "Splitting not allowed", and the fix hints
"fix on the pack card" / "fix in the policy". The action line shows "Stop this
line" or, for old rows, "Let it ship as is".

## Part 6: Packing settings that follow from the policy

These are not stored as settings. They are fixed rules, listed so you do not
look for a switch.

### Weight policy "Record"

- **Screen**: none. Not a setting.
- **Column**: none. The verdict is stored in `packing_carton.weight_verdict`,
  enum `packing_weight_verdict` (`Recorded`, `NotComparable`).
- **Meaning**: The measured weight is kept, never enforced
  (`domain/packing_carton/aggregate.rs:12-14`).
- **Affects**: `judge_close` (`aggregate.rs:138-215`).
- **Example**: Expected 4,700 g, measured 6,100 g: the box still closes with
  verdict `Recorded`. Nothing warns.
- **When empty**: A missing measured weight refuses the close
  (`PACK_WEIGHT_REQUIRED`).
- **If you change it**: Cannot be changed from the screen. To enforce weight,
  the code must change.

### Weight tolerance

- **Screen**: none.
- **Column**: none.
- **Meaning**: No tolerance exists. Stored only is wrong here: there is no
  field at all. Search: `grep -rni tolerance crates/libs/wms-outbound/src/packing`
  and `.../domain/packing_*` return nothing.
- **Affects**: nothing.
- **Example**: n/a.
- **If you change it**: n/a.

### Tare used by packing

- **Screen**: none for packing. The source is Cartons > **Tare weight**.
- **Column**: `container.tare_weight`.
- **Meaning**: Copied from the policy carton when the planned container is
  created. Expected weight at the station = what is inside + this tare.
- **Affects**: `write.rs:424`, `aggregate.rs:117-130`.
- **Example**: Content 4,500 g + tare 200 g = expected 4,700 g.
- **If you change it**: Only containers created after the change.

### Serial restriction

- **Screen**: none for packing. The source is the SKU Serial Tracking tab
  (see [33-serial-configuration.md](33-serial-configuration.md)).
- **Column**: reads `sku_serial_config.continuous_serial_tracking`.
- **Meaning**: A box that holds a serial-tracked SKU cannot be opened or
  closed at the pack station (`SERIAL_PACKING_NOT_SUPPORTED`).
- **Affects**: `commands/work_open.rs:135`, `queries/contents.rs:87`,
  `domain/packing_carton/aggregate.rs:144`.
- **Example**: SKU A has tracking on. Its picked box cannot go through Verify.
- **If you change it**: Turning tracking off lifts the block on the next open.

## Known gaps in this area

1. The six exception drop-downs, `max_candidates`, `solver`, `algorithm`,
   `name`, `descr` and the policy `active` flag do not change packing.
   The screen shows all of them as if they did.
2. The order-screen hint for outcome `SHIP AS IS` still says "an exception the
   policy allowed". Today only a factory pack level gives that outcome.
   (`wms-meta-ui/migrations/015_*.sql:62-67`.)
3. The three non-working objectives remain in the drop-down on purpose.
4. To check the unread settings yourself: change the value on a test policy,
   reserve the same order again, and compare the plan fingerprint
   (`cartonization_plan.input_hash`) and the carton list. Only the
   fingerprint moves for `max_candidates`, `solver`, `algorithm`.
