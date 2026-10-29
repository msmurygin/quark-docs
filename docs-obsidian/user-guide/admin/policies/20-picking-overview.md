---
title: "Administrator Guide - Picking Overview"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Picking Overview

This page explains what picking decides, in which order the system applies your settings, and how a pick task is built, handed out and finished. Two worked examples follow: a discrete pick and a cart (carrier) pick.

The settings themselves are in four sibling pages:

| Page | What it lists |
|---|---|
| `21-picking-policy-settings.md` | Every field of a picking policy. |
| `22-work-areas-equipment-and-permissions.md` | Work areas, pack stations, equipment, operator rights, task manager rules. |
| `23-pick-short-reasons.md` | Short reasons and their actions. |
| `24-inventory-count-policy.md` | Counts, cycle count policy, count triggers. |

Paths in "Affects" lines are relative to `crates/libs/`.

## 1. What picking decides

Picking answers these questions. Each question has an owner (the setting that answers it).

| Question | Answered by | Page |
|---|---|---|
| Which stock is reserved for a pick? | Allocation policy (not on these pages). | `06-outbound-setup.md` |
| Which box does the pick go into? | Cartonization policy (not on these pages). | `06-outbound-setup.md` |
| Is a task made for the pick? | The order is released, and the cartonization result is "ready". | section 3 |
| Who may take the task? | Operator rights (`Task Permissions`), `Pick Execution`, work area zones. | `22` |
| Which task comes first? | Order priority, then `Route Sequence` of the location. | `22`, section 8 |
| Can this machine lift it? | Equipment `Max Weight` and `Weight Reduction per Level`, zone exclusions. | `22` |
| One order onto a pallet, or several boxes on a cart? | The picking policy of the area for the operator's equipment. | `21` |
| What must the operator prove at the shelf? | The five `Confirmation` fields. | `21`, section 7 |
| Where do the goods go? | The pick pallet, or the box on the cart position. | `21` |
| Where does the trip end? | `Completion`, the owner's delivery location, the pack station. | `21`, `22` |
| What if the stock is not there? | The short reason the operator types. | `23` |
| Is the location counted afterwards? | Count triggers. | `24` |
| How long does the operator keep the task? | `TASK_LEASE_TTL_MIN`. | `22`, section 7 |

## 2. The order in which the system applies the rules

When an operator asks for work, the system walks this list (`wms-outbound/src/picking/commands/dispatch_next.rs`, `wms-tasks/src/service/candidate.rs`). It stops at the first step that answers.

1. **Queue.** One request per operator at a time.
2. **A live cart assignment** of the operator is continued.
3. **A dissolved assignment whose carrier still carries goods and was never delivered** is delivered first (`deliver your carrier with picked goods first`).
4. **Operator checks.** The operator must be active.
5. **Entry.** The old entry `Discrete Pick` (`PICK01`, `Get Pick Work`) names no area, so it works as `DISCRETE` across all areas the operator may pick in. The entry `Pick by Area` names an area (and equipment) and reads the policy of (area, equipment). A discrete pallet opened for work taken through `Pick by Area` is frozen to that policy when the pick stands in a zone of the area (section 1.2 of file 21).
6. **Policy lookup.** Equipment row of the area, else the area default, else `DISCRETE`.
7. **Carrier or not.** If the policy says `Carrier Required`, only an already held task is handed out; otherwise the RF is asked to scan a carrier. Else the single-task dispatch runs in the named area.
8. **Held task first.** The operator's own oldest open task is returned before the pool is looked at.
9. **Rights.** Reachable zones = zones of areas where the operator has a right for the task type, minus the zones their equipment excludes. None: `you have no right to take Pick tasks in any work area — ask a supervisor`.
10. **Pool.** Tasks in `Created` status, not escalated, not in cooldown, from a reachable zone, liftable.
11. **Order.** Priority, then location `Route Sequence`, then oldest.
12. **Source rules.** `Pick Execution` on, pick `Released`, order released and open, location `Ok` and unflagged, no inventory hold, cartonization ready. A task that fails is skipped in this search only.
13. **Assign.** The first task that passes becomes `Assigned` with a lease.

When the operator then works the task, the system applies these rules in order:

1. **Instructions.** If the SKU or the order line has a pick instruction, the operator must read it (`PICKINS`, `Pick Instructions`).
2. **Where the goods go.** A discrete pick: the operator opens a pick pallet (`PICK03`, `Open Pallet`). A cart pick: the box of the position.
3. **Proof at the source.** The plan from the five `Confirmation` fields (`PICK04` to `PICK06`, `PICK14`, `PICK15`; cart `PKA21` to `PKA23`, `PKA21L`, `PKA21A`).
4. **Commit.** The system re-checks the stock, the lot expiry (it must be later than the warehouse day plus `Min Shelf Life on Pick` of the SKU) and holds under the location lock. Then it moves the goods.
5. **Count.** If `Count an Emptied Location` is on and the location is empty, a count is requested.
6. **End of trip.** Discrete: close the pallet at its frozen destination (`PICK13`, `Close Pallet`, key F2). Cart: deliver the cart per `Completion`.

## 3. How a pick task is built

1. An order is allocated. Allocation reserves stock and writes pick lines (picks) with status `Allocated`.
2. Cartonization plans the boxes. A pick gets an outcome: `Planned` (it goes into a planned carton), `ShipAsIs` (the factory package), `Bypassed` (no box planned), `Pending` or `Blocked`.
3. The order is **released** (`Release` on the order). Release runs allocation again and then creates tasks (`wms-outbound/src/service/order/allocate.rs:420-436`). Only picks that are ready to execute get a task. A pick whose cartonization is `Pending` or `Blocked` gets none. If the order is not released, allocating makes no task.
4. For each such pick the system makes one task of type `Pick` (`wms-outbound/src/picking/infrastructure/tasks.rs`):
   - source: the pick (`pick_detail`);
   - `from_location`: the pick location; it decides the zone and so the work area;
   - `to_location`: the `Picking To Location` of the zone of the pick location (zone field);
   - owner, SKU, lot, unit, quantity, container;
   - weight: calculated from the pack weights of the SKU (unknown stays empty);
   - priority: the priority of the order;
   - status `Created`, no operator.
   The pick becomes `Released` and carries the task id.
5. The task has a snapshot of the pick. If the pick changes (another quantity, location or container) the task no longer matches and is refused at dispatch: `TASK_SNAPSHOT_MISMATCH`.
6. A change of order priority is copied to the tasks that are still in the pool. Held tasks keep the priority the operator saw.

## 4. How a task is assigned

See section 2, steps 8 to 13, and `22-work-areas-equipment-and-permissions.md`, section 8. The result: status `Assigned`, the operator's id, a lease of `TASK_LEASE_TTL_MIN` minutes (seed 15). Every scan and every commit renews the lease. A lease that ran out returns the task to the pool within about a minute (the reaper runs every 60 seconds).

For a cart the assignment takes **all tasks of its cartons in one step** or none. Two operators who start at once cannot get the same carton: the second is told `the selection changed while it was being taken: press again`.

## 5. How a task is executed

### 5.1 Discrete (pallet)

1. `PICK01` `Get Pick Work`: the operator enters the current location (optional) and presses Enter. Answer: the task, or `No eligible Pick work`.
2. `PICK02` `Pick Work`: location, item, quantity, lot display (the attributes marked "show on pick" in the SKU Lot Policy), instructions.
3. `PICK03` `Open Pallet`: the operator scans a pallet label that starts with `DRP`. The pallet stands in the system location `INTRANSIT`. An operator has at most one open pallet. A pallet that holds goods must be closed first: `an open pallet must be closed first (F2): DRP1, order SO-1`.
4. Proof steps as the plan asks.
5. `PICK09` `Confirm Pick`. The goods go onto the pallet. The first deposit freezes the destination of the pallet: the owner's `Delivery location (picker carrier)`, else the `to_location` of the task. Its location type must be in `Pallet Drop Cell Types`.
6. The pick card for the next pick of the **same order and the same destination** puts goods onto the same pallet. A pick of another order or another destination: the dispatch answers with the open pallet to close first (`drop_to_close`).
7. `PICK13` `Close Pallet` (F2): scan the pallet and exactly its frozen destination. The whole pallet moves out of `INTRANSIT`. Wrong place: `the pallet is closed only into the location it goes to — scan that location: the pallet goes to STAGE-1`.
8. Another operator's pallet can be closed only with the right `pick_drop.close_foreign` or a supervisor's permission.

### 5.2 Cart (carrier)

1. `Pick by Area` (`PKAA`), then the equipment (`PKAE`/`PKAEL`). The answer is `Scan Carrier` (`PKA01`) when the policy needs a carrier.
2. Scan the carrier. The system builds an assignment of up to `min(Max Targets, positions of the cart type)` whole planned targets. It claims all their tasks. The cart gets numbered positions. Status `Building`.
3. `PKA02` `Prepare Carrier`: for each position scan a box. The box must be an empty registered box, not on hold, of the planned type and big enough, and not on another cart. When the last position is bound the assignment is `Ready`.
4. The route: stops by location `Route Sequence` ascending. For each stop: `PKA20` `Next Pick`, the proof screens, then `PKA28` `Into Box` (scan the position's box). `PKA25` `Skip` sends a stop to the end of the route. `PKA26`/`PKA26C` shorts. `PKA27` rejects. `PKA50` `Box Full` and `PKA51` `Box Damaged` handle box exceptions. Status `Picking`.
5. When no stop is left the status is `Delivering`. `PKA30`/`PKA40` `Deliver Carrier`. With `Completion` = `Complete` the boxes come off where the cart stands. With `ConfirmAtLocation` the operator scans the delivery location.
6. A holder may dissolve the assignment before the first commit. After goods are picked only a supervisor may (`goods are already picked: only a supervisor may dissolve it`).

## 6. Worked example 1: a discrete pick

Setup:

- Zone `RACK` in area `PICK-A`. Zone field `Picking To Location` = `PICKTO`. Locations `A-01-01` (route `0100`) and `A-02-03` (route `0230`) are in `RACK`.
- Operator `picker-a` has a `Pick` right in `PICK-A` with `Pick Execution` on. No equipment.
- Policy `DISCRETE` is unchanged (defaults). Pallet list: Pick-to, Sort station, Staging, Door.
- The Lot Policy of both SKUs shows no attribute on the pick.
- Order `SO-1`, priority 50, owner with no delivery location set. Line 1: 12 of SKU `A` (lot `L1`, loose at `A-01-01`). Line 2: 5 of SKU `B` (on pallet `LPN007` at `A-02-03`).

Steps:

1. `SO-1` is allocated and released. Two tasks are made: task 701 (12 of `A`, from `A-01-01`, to `PICKTO`, priority 50) and task 702 (5 of `B`, from `A-02-03`, to `PICKTO`).
2. `picker-a` opens `Picking > Discrete Pick`, presses Enter. Pool order: both priority 50; route `0100` before `0230`. Task 701 is assigned (lease 15 minutes).
3. `PICK02` shows `A-01-01`, `A`, 12, lot `L1`.
4. `picker-a` scans a new pallet label `DRP0001` at `PICK03`. The pallet stands in `INTRANSIT`.
5. Proof (defaults): scan `A-01-01`; scan the item. `A` is loose in one lot: `Loose Lot Source` = `Automatic` finds one lot in the location and no checkable attribute, so the location scan is the proof (already asked). No LPN is asked (no container).
6. `PICK09` commits 12. The first deposit freezes the destination `PICKTO` (zone chain; type `Pickto` is in the list). The pallet now goes to `PICKTO`.
7. Task 702 is next. Same order, same destination `PICKTO`: goods go onto `DRP0001`. Proof: location `A-02-03`, item `B`, and **the LPN `LPN007`** (the source stands in a container, and both `Reserved LPN` = `Scan when present` and `Automatic` ask for it). Lot: one lot on the pallet, so `Automatic` is satisfied by the LPN.
8. At the end the RF shows the pallet to close. `picker-a` presses F2, scans `DRP0001` and `PICKTO`. The pallet moves to `PICKTO`. Order status `Picked`.

What changes if you change a setting:

- `Source Location` = `Display only`: step 5 loses the location scan.
- `Pallet Drop Cell Types` without `Pickto`: step 6 is refused: `a closed pallet may not stand in the location this pick goes to: PICKTO (Pickto)`.
- `Count an Emptied Location` = Yes and `A-01-01` held exactly 12: after step 6 a count of `A-01-01` is requested.
- Untick `Pick Execution` before step 2: `No eligible Pick work`.

## 7. Worked example 2: a cart (carrier) pick

Setup:

- Policy `CART4`: `Unit` = `PlannedTarget`, `Max Targets` = 4, `Carrier Required` = Yes, `Target Binding` = Before route, `Quantity` = Per pick, `Target` = Scan the container, `Deposit Mode` = Direct to target, `Completion` = Confirm at the drop location. Confirmation: defaults. Published.
- Area `PICK-A` has a row in `Policy by Equipment Kind`: equipment `CART` -> `CART4`. Area default `DISCRETE`.
- Handling unit type `CART4T`: `Holds Containers` on, `Positions` = 4, `Active`. Carrier `CART-1` of that type, empty, no parent.
- Operator `op2` has a `Pick` right in `PICK-A`, `Pick Execution` on.
- Owner `Delivery location (picker carrier)` = `STAGE-1` (type `Staging`).
- Five released orders have planned cartons whose picks are in `RACK`; all deliver to `STAGE-1`.

Steps:

1. `op2` opens `Pick by Area`, enters `PICK-A`, chooses equipment 2 (from the list) and picks `CART`. The system writes `CART` as the operator's equipment and reads (`PICK-A`, `CART`) = `CART4`. The policy needs a carrier and `op2` holds no task: the answer is `Scan Carrier` (`PKA01`) with `max_targets` 4. No task is claimed.
2. `op2` scans `CART-1`. Checks pass. The capacity is `min(4, 4)` = 4. Five cartons are candidates. The best four are chosen by order priority, requested ship date and the first location on the walk. All go to `STAGE-1`. A carton going elsewhere is passed over.
3. The system claims the tasks of the four cartons at once. A task that another operator took in the same moment makes the start answer `the selection changed while it was being taken: press again`.
4. Positions 1 to 4 are made. `op2` scans a box for each (`PKA02`). After the fourth, the assignment is `Ready`.
5. Route: the four cartons' picks are walked by `Route Sequence`. For each: location scan, item scan, (LPN if any), then `PKA28` scan of the position's box. A wrong box: `this is not the right box — put the goods into your position's box`.
6. The last pick is shorted: found 0 with `SHORT`. A short inside a cart works like a discrete short, but a zero short deposits nothing.
7. No stop left. `Delivering`. `op2` scans `STAGE-1`. Scanning `STAGE-2` gives `this is not the delivery location of this carrier: STAGE-2 (STAGE-1)`. With `STAGE-1`: the boxes with goods become separate roots at `STAGE-1`; empty boxes come off; `CART-1` is free (`Empty`).

What changes if you change a setting:

- `Quantity` = `Aggregated` (published): step 2 is accepted. If two of the four cartons take one item from one location, the route shows them as one summary step (operator guide, section B3a of the picking chapter).
- `Target` = `PositionNumber`: the policy cannot be saved or published.
- `Max Targets` = 3: three cartons.
- The cart type has 2 positions: two cartons, whatever `Max Targets` says.
- `Completion` = `Complete`: step 7 needs no location scan; the boxes are unloaded where the cart stands. A pack station on the area is not used.
- No `Delivery location (picker carrier)` on the owner and tasks without a common `to_location`: those cartons are never taken.
- Equipment `On foot` at step 1: the area default `DISCRETE` applies, and the operator picks discretely.

## 8. A short setup checklist for picking

1. Zones exist, each with `Picking To Location` (`Sidebar > Warehouse Configuration > Topology > Putaway Zones`).
2. A work area with its zones (`Sidebar > Warehouse Configuration > Work Areas & Equipment > Work Areas`).
3. Equipment profiles if you use carts or lift limits.
4. Operators synced. For each: `Task Permissions` row with `Task Type` = `Pick`, the area, and **`Pick Execution` ticked**.
5. Policy: use `DISCRETE` for pallet picking. For carts, make a policy with `Unit` = `PlannedTarget` and publish it. Assign it to the area or to the area and equipment.
6. Carrier types in `Handling Unit Registry` with `Positions`.
7. Short reasons: check that `SHORT`, `LPN_NOT_FOUND` and `WRONG_LOCATION` are published and tell operators the codes.
8. Count: decide whether you want `Count an Emptied Location`, a cycle policy, or the count action in short reasons.
9. Test with one order before you widen the rights. There is a built-in gate view `pick_cutover_gate`; every value in it must be zero before you widen the rollout.

## 9. What happens to open work, in one table

| You change | Open task in the pool | Task held by an operator | Cart assignment in progress | Open pallet |
|---|---|---|---|---|
| `DISCRETE` revision (confirmation fields) | Next scan reads the new values. | Same. An open proof keeps its plan; the commit re-checks the stock. | Not affected (frozen copy). | The pallet drop list and the emptied-location flag stay as at opening. |
| Cart policy revision | No effect. | No effect. | Frozen copy. | |
| Area policy assignment | Next dispatch. | Held task is continued. | Continued first. | |
| Permission, `Pick Execution`, zones, equipment | Next dispatch. | Held work continues. | Continues. | |
| Short reason | | The next short. | The next short. | |
| `TASK_*` settings | Next claim or renewal. | Next renewal. | Next renewal. | |

## 10. Things you may not expect

1. A policy with `Unit` = `Order` and a code other than `DISCRETE` is read for the pallet fields only, and only for a pallet opened through `Pick by Area` in the area's zones. Its confirmation fields are never read for a discrete pick (`21`, section 1.2).
2. `Max Concurrent Tasks` does not limit pickers (`22`, section 1).
3. `Target Binding`, `Deposit Mode`, `Pallet Drop Suggestion` have no effect of their own (`21`).
4. `Reserved LPN` = `Do not confirm` does not remove the LPN scan while `Loose Lot Source` = `Automatic` (`21`, section 7).
5. The RF shows only `No eligible Pick work` when nothing can be handed out. The reason codes are only in the API answer (`diagnostics`).
6. The operator types the short reason code; the screen offers no list (`23`, section 2).
