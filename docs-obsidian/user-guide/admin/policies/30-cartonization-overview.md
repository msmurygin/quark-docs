# Cartonization: how it works

This page explains what cartonization does, what data it reads, and what
happens when it cannot finish. The next page,
[31-cartonization-policy-settings.md](31-cartonization-policy-settings.md),
lists every setting one by one.

All facts here come from the code. File and line numbers are in brackets.
Line numbers can drift. Search for the function name if a line is off.

## What cartonization does

Cartonization decides which shipping box each picked item goes into.

It runs once an order is reserved. It runs again when the order is released
and the reservation changed. It runs inside the reserve/release command
(`ensure_plan_reporting`, `wms-outbound/src/cartonization/ensure.rs:455`,
called from `wms-outbound/src/service/order/allocate.rs:398`). There is no
separate RPC for it. You cannot start it by hand.

A failure in cartonization never cancels the reservation. The order stays
reserved. The command result carries an error text instead
(`ensure.rs:443-455`), and the Allocate and Release toasts say it ("cartons
not planned, the picks wait for a repeat Release: …"). The whole attempt runs
in a database savepoint. If it fails, no half plan is kept
(`wms-outbound/src/cartonization/README.md`). The new picks stay `Pending` and
get no task. This is by design (spec v2.5 §55): a whole-calculation failure is
a setup or system error, so no pick goes out as if it needed no carton. Fix
the setup and release the order again.

The result is a written plan:

- one plan per order (status `Planned`, `PlannedWithExceptions`, `Stale`,
  `Superseded`),
- the cartons of the plan (each is a real container with a code like
  `CTN123`, `write.rs:~410`),
- where each unit sits inside its carton (position and orientation),
- a list of units it could not place, with a reason.

Pickers then pick into the planned carton. Packing later checks the box.

## The steps, in order

1. **Read the reservation.** Only picks in status `Allocated` or `Released`
   are read (`read_from_db.rs:~105`).
2. **Find each pick's pack level.** The level is the pack item of the SKU
   whose UOM equals the pick's UOM (`read_from_db.rs:255-270`). A pick of
   `3 CS` becomes 3 units of the `CS` level. Quantity is rounded to whole
   units (`read_from_db.rs:228`). Dimensions are read in the warehouse's
   length unit and turned into whole millimetres, rounded to the nearest
   (`length_scale.rs`); a length unit that does not convert to millimetres
   stops the calculation with that reason. So does a cartonization policy
   that is switched off (spec v2.5 §55): it is a setup error, the
   calculation is refused naming the policy and the SKU, and it does not fall
   back to the owner default. A pick that was already picked is not affected.
3. **Skip picks that need no solver.** A pick skips the solver when
   (`reservation.rs:123-170`):
   - the SKU has no pack item for that UOM (`LevelIsUnknown`), or
   - the level is a factory package (`pack_item.ship_as_is`), or
   - the level is not cartonized (`pack_item.cartonize` is false), or
   - no cartonization policy resolves for the SKU (`NoPolicy`).

   These picks get outcome `Bypassed` (or `ShipAsIs` for a factory package).
   They go to the normal destination. This is normal, not an error.
4. **Resolve the policy.** SKU policy first. If empty, the owner default.
   (`SkuBmc::resolve_cartonization_policy`, `wms-lib-core/src/model/sku.rs:908-923`).
5. **Group and number the units.** Identical units are merged into groups.
   Groups are sorted by a fixed key, so the same input gives the same plan
   (`input.rs:1-100`).
6. **Split into blocks.** This is where `split_rule` acts
   (`plan.rs:221-246`). With `Allow`, one unit is one block. With `Prevent`,
   all units of one pick are one block. A block goes whole into one carton or
   stays unplaced.
7. **Solve.** Blocks are sorted by volume, biggest first
   (`pack.rs:206-225`). Each block goes into an open carton if it fits
   (`pack.rs:~320`). If none fits, a new carton opens. The solver tries the
   active cartons in `sequence` order and takes the first one that fits
   (`pack.rs:360-390`).
8. **Shrink.** After packing, each new carton is re-tried in every smaller
   active carton, smallest first. The first smaller carton that holds
   everything wins (`pack.rs:815-900`).
9. **Check the answer.** An independent validator re-checks geometry, weight
   and limits before anything is written (`validate.rs`). The solver is not
   trusted.
10. **Write.** Plan, cartons, placements and unplaced rows are saved.
    Picks that cross two cartons are split into two pick rows
    (`write.rs:~180`).

## How a unit is placed (Extreme Points)

The solver puts units into a carton at free corner points. For each unit it
tries the allowed orientations. It scores each place by (`pack.rs:~735`):

1. smallest growth of the box that wraps all items,
2. lowest bottom face (items sit low),
3. nearest to the carton origin corner,
4. lowest orientation index.

A unit fits when its three sizes fit inside the carton's inner size and do
not overlap another unit.

Orientations come from the pack level's `rotation_rule`
(`wms-lib-core/src/model/pack/rotation.rs`):

| Value | Meaning | Distinct size triples |
|---|---|---|
| `All90` | any of 6 turns | up to 6 (fewer for cubes or equal sides) |
| `None` | natural position only | 1 |
| `UprightOnly` | "this side up"; turn only around the vertical axis | 2 |

## What the solver needs from master data

| Input | Where you set it | Used for |
|---|---|---|
| Unit length, width, height | Pack level (`pack_item.length/width/height`) | Fit test. Zero in any of the three means "unknown" and the unit is unplaced as `NoDimensions` (`pack.rs:400-405`). |
| Unit weight | Pack level `pack_item.weight` | Weight limit test. Zero or less means "unknown" (`read_from_db.rs:265`). |
| Rotation rule | Pack level `pack_item.rotation_rule` | Allowed orientations. |
| Cartonize flag | Pack level `pack_item.cartonize` | Whether the level goes to the solver at all. |
| Factory package flag | Pack level `pack_item.ship_as_is` | Skips the solver; ships in its own box. |
| Policy header | Cartonization policy | Split rule, budget, objective. |
| Candidate cartons | Policy cartons (detail rows) | Inner size, tare, gross limit, unit limit, order. |

**Units.** Dimensions and weights are stored in the warehouse's storage
units. The defaults are millimetres (`MM`) and grams (`G`)
(`wms-lib-sql/sql/wms-enterprise/migrations/001_baseline.sql:333-334`). They
are frozen once the warehouse exists (same file, lines 145-155). The solver
reads sizes as whole numbers: it drops any fraction (`item.length as Mm`,
`read_from_db.rs:261`, with `Mm = i64`, `extreme_points.rs:16`). In a warehouse
that stores lengths in metres, a size of 0.4 becomes 0 and reads as "no
dimensions". Keep storage units small.

## Why a unit ends up unplaced

There are six reasons. They are tested in this order (`pack.rs:574-640`):

| Order | Reason (screen label) | When it happens | Where to fix it |
|---|---|---|---|
| 0 | `NoDimensions` ("No dimensions") | A unit has length, width or height of 0. Tested before any packing. | Pack card (`fix on the pack card`). |
| 1 | `NoCartonCandidates` ("No candidate cartons") | The policy has no active carton. | Policy. |
| 2 | `SplitPrevented` ("Splitting not allowed") | The block has more than one unit, every unit fits alone, but the whole block does not fit in one carton. Needs `Prevent`. | Policy: set Pick splitting to `Allow`. |
| 3 | `NoWeight` ("No weight") | The block fits by size, but a unit has unknown weight and the carton has a gross limit. | Pack card. |
| 3 | `WeightExceeded` ("Overweight") | The block fits by size, but tare plus contents is above the gross limit of every such carton. | Policy limit or pack card. |
| 4 | `NoCartonFits` ("Nothing fits") | Default answer. No active carton is big enough in any allowed orientation, or the unit limit blocks it. | Add a bigger carton. |

Note: the unit-count limit (`max_units`) is not a weight reason. A block
blocked only by `max_units` is reported as `NoCartonFits`
(`pack.rs:438-460`).

Each unplaced row also stores a short detail text with numbers, in mm and g,
for example `item 310x100x100 mm; largest active carton BOX-L inner 600x400x400 mm`
(`pack.rs:470-540`). The text is not translated. It is cut at 255 characters.

## What happens to an unplaced unit

1. A row is written to `cartonization_unplaced` with the reason, the detail
   text and an `action` (`write.rs:576-625`).
2. The `action` is always `Stop`. The policy's six exception columns are read,
   then ignored (`write.rs:556-572`). See the settings page for the proof.
3. The plan status becomes `PlannedWithExceptions` (`write.rs:142`).
4. The pick gets outcome `Blocked` when it has no placement at all
   (`write.rs:619`, `block_if_unplaced_without_placement`).
5. A `Blocked` or `Pending` pick creates no task. Pickers never see it
   (`handoff.rs:60-66`). A `Planned` pick needs its carton id. A `Bypassed`
   pick uses the normal destination.
6. The order screen shows the outcome. Labels: `BLOCKED` (hint: "this line is
   stopped until someone fixes the data"), `pending`, `not cartonized`,
   `SHIP AS IS`
   (`wms-meta-ui/migrations/015_the_order_screen_shows_the_cartonization.sql:55-80`).

To recover: fix the data (pack card or policy), then reserve or release the
order again. The plan input holds sizes, weights, rotation rule and the whole
policy. When any of them changes, the input fingerprint changes and the plan
is recalculated (`ensure.rs:194`, `snapshot.rs:66-98`). When nothing changed,
nothing is recalculated and the old result stays.

## The solver budget

The solver counts one step for every concrete check of
`(unit, carton, point, orientation)` (`pack.rs:~690`, `budget.rs:58`). The
limit is:

`clamp(iterations_per_unit_sq x units^2, min_iterations, max_iterations_cap)`

(`budget.rs:32-47`). Units is the number of physical units in the policy's
part of the order. The budget is about work, not time. The same input always
gives the same result.

If the budget runs out, there is no partial plan. The command returns
`cartonization solver budget exceeded after N of LIMIT iterations`
(`error.rs:55-56`). The order stays reserved. Raise the maximum or reduce the
candidate list. The used count, the limit and the time in ms are stored on the
plan.

## Plans after release

Before release, a changed reservation gets a full new plan. The old plan
becomes `Superseded`.

After release, some boxes are already named to pickers. The engine then plans
only the new work, around the boxes that stand (mode `RepairRemaining`,
`ensure.rs:120-215`, `standing.rs`). Rules:

- A carton that holds a picked unit is frozen. It keeps what it has and takes
  nothing new.
- A carton with nothing picked and still takeable by a picker may take new
  units if there is room.
- A unit that was already picked stays as written. If today's master data
  describes it differently, that is reported as a "master data divergence" in
  the command result and in the log. It does not stop the order.
- If an unpicked unit left the reservation for any reason other than picking,
  or its size or rotation changed, the plan is marked `Stale`
  (`ensure.rs:~140`). `Stale` does not stop work. The warehouse keeps
  working by the plan. It only tells the planner that the plan no longer
  matches the data.

## Box-full exception at the floor (`CARTON_FULL`)

Sometimes a real box is full before the plan says so. The picker reports it
on the RF screen (command `pick_assignment_position_close`,
`pick_assignment_rpc.rs:46`).

The picker must give one reason (stored in `carton_full_reason`,
`wms-app/migrations/059_*.sql:~50`):

| Code | Plain meaning |
|---|---|
| `MASTER_DATA_DIMENSIONS` | The master data size is wrong. |
| `PROTECTIVE_PACKAGING` | Padding or wrap took the room. |
| `ORIENTATION_NOT_FEASIBLE` | The item cannot be turned the way the plan wanted. |
| `PRODUCT_OR_CARTON_DEFORMED` | The goods or the box are deformed. |
| `SOLVER_LAYOUT_NOT_FEASIBLE` | The layout did not work in real life. |
| `OTHER` | Anything else; add a comment. |

What the system does (`picking/target/close.rs`):

1. The position closes as `Closed (CartonFull)`. The full box stays on the
   cart until delivery.
2. A row is written to `pick_target_execution_exception`.
3. For a planned carton, the engine re-cartonizes the unpicked rest into new
   whole cartons. This is a child plan in a savepoint (`repair.rs`). The
   full carton is frozen as written. Every other standing carton takes
   nothing new during this repair.
4. The first new cartons become open positions on free places of the same
   cart. The rest leave the assignment and go back to the pool.

Exception status values: `Resolving`, `Resolved`, `RecoveryRequired`,
`Cancelled`. A fifth value, `Reported`, is reserved for a two-phase variant
and nothing writes it today, so you will not see it.

If the repair fails, the exception becomes `RecoveryRequired`. Failure
codes (`repair.rs:43-50`):

| Code | Meaning |
|---|---|
| `CARTON_REPLAN_UNPLACED` | A unit could not be placed in the repair. |
| `SOLVER_BUDGET_EXCEEDED` | The budget ran out. |
| `CARTON_REPLAN_NOT_REPAIRABLE` | The plan cannot be repaired. |
| `CARTON_REPLAN_INVALID` | The validator refused the repair. |
| `CARTON_REPLAN_NOTHING_LEFT` | None of the picks is a live reservation any more. The exception becomes `Cancelled`. |

While in `RecoveryRequired`, the picks stay members of the closed position.
The route and the delivery refuse them with `CARTON_REPLAN_REQUIRED`.

Two ways out:

- **Hand-over** by the picker (`pick_assignment_position_hand_over`). The
  picks leave the assignment, become `Blocked`, and their tasks go back to
  the pool.
- **Retry** by a supervisor (`cartonization_exception_retry`, roles Admin,
  Manager, Supervisor). Picks still on a cart are handed over first. Then
  the same exception is repaired again. Success gives `Resolved`.

Screen: Task Manager, "Pick Target Exceptions" (Russian: «Исключения отбора
по таре»). Tick one `PlannedCarton` row in `RecoveryRequired` and press
**Retry**. The button is grey on any other row
(`wms-meta-ui/migrations/101_carton_execution_exceptions.sql:227-262`). The
read RPC is `cartonization_exception_list`.

Retry is a stateless command. Fix the data first (pack card, policy), then
press Retry. The retry computes the same answer if nothing changed.

## Orphan cartons

Every carton the plan opens records where it came from (`origin =
Cartonization`, plan id, policy carton id). A planned carton that is empty,
not attached to anything, and whose plan is superseded and not referenced by
any live plan (including `Stale`) is an orphan. Cleanup deletes it through
Inventory's `DisposeContainer` command. Cartonization never deletes a
container itself (`cleanup.rs`, README).

## Packing: what the policy drives at the pack station

Cartonization sets the planned box and its tare weight. Packing then checks
the real box. Packing is a separate feature (`wms-outbound/src/packing`).
These are its weight and serial rules:

| Topic | What the code does |
|---|---|
| Weight policy | Fixed to `Record` ("MVP weight policy is `Record`": the weight is kept, never enforced). `domain/packing_carton/aggregate.rs:12-14`. Not a setting. |
| Measured weight | Required to close a box. Missing: `PACK_WEIGHT_REQUIRED`. Zero, negative or not a number: `PACK_WEIGHT_INVALID` (`aggregate.rs:196-203`). |
| Tolerance | There is none. No percent or gram band exists anywhere in the packing code. A heavy or light box still closes. |
| Expected weight | Sum of (unit weight x quantity) for what is really in the box, plus the container tare (`container.tare_weight`). `aggregate.rs:117-130`. The unit weight is the base pack item weight if above 0, else the SKU Gross Weight, else unknown (`wms-lib-core/src/model/pack/weight.rs:185-215`, read at `queries/contents.rs:88-107`). |
| Tare source | Copied from the policy carton `tare_weight` when the planned container is created (`write.rs:424`, `ContainerBmc::create_cartonization_carton`). A change to the policy tare later does not change containers that exist. |
| Verdict | `Recorded` when an expected weight exists. `NotComparable` when any item has no weight or any live level of its active pack is marked Catch Weight. The contents query reads both facts through `StockWeights` (`queries/contents.rs`). Nothing else. `packing_weight_verdict` enum, `wms-app/migrations/074_packing_schema.sql:54`. |
| Plan weight | `packing_carton.plan_expected_weight` stores what the plan expected. It is shown on the station (`queries/work.rs:77`). Nothing compares it to the measured weight. |
| Serial restriction | A box with serial-tracked stock cannot be opened or closed. Error `SERIAL_PACKING_NOT_SUPPORTED` (`commands/work_open.rs:135`, `aggregate.rs:144`). "Serial-tracked" means `sku_serial_config.continuous_serial_tracking = true` (`sku_serial_config.rs:394-405`). |
| One order per box | Stock of another order: `MULTI_ORDER_CARTON_NOT_SUPPORTED`. |
| Stock of no order | `PACK_UNEXPECTED_ITEM`. |
| Short or extra | `PACK_SOURCE_SHORT` (less than picked) or `PACK_UNEXPECTED_ITEM` (more). |

See [33-serial-configuration.md](33-serial-configuration.md) for the serial
side and [31-cartonization-policy-settings.md](31-cartonization-policy-settings.md)
for the box fields.

## Who can change what

| Action | RPC | Roles |
|---|---|---|
| Read a policy with cartons | `cartonization_policy_view`, `cartonization_policy_template` | Admin, Manager, Operator, Viewer |
| Create a policy | `cartonization_policy_create` | Admin, Manager |
| Save a policy | `cartonization_policy_save` | Admin, Manager |
| Delete an unreferenced policy | `delete_cartonization_policy`, `delete_many_cartonization_policy` | Admin, Manager |
| Close a position as box-full | `pick_assignment_position_close` | Admin, Manager, Supervisor, Operator |
| Retry a failed repair | `cartonization_exception_retry` | Admin, Manager, Supervisor |
| List box-full exceptions | `cartonization_exception_list` | Admin, Manager, Supervisor |

(`app-server/src/web/rpcs/cartonization_policy_rpc.rs:7-17`,
`pick_assignment_rpc.rs:39-52`.)

A policy cannot be deleted while a SKU, an owner default or a written plan
points to it. Its cartons are deleted with it (`ON DELETE CASCADE`,
`wms-app/migrations/023_*.sql`).
