---
title: "Allocation Overview"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Allocation Overview

Allocation reserves stock for order lines. This page explains what allocation decides, in which order it thinks, and what stock it may use. Page 11 lists every setting of the allocation policy. Page 12 and 13 cover waves.

**Source of truth.** This page follows the code, not the older design notes. Where a design note and the code disagree, the code wins. Paths below start at `crates/libs/` unless they say otherwise. `file:line` means "read this line to check".

## 1. What allocation decides

For each open order line, allocation answers four questions.

| Question | Answer comes from |
|---|---|
| Which rules apply to this line? | The allocation policy frozen on the line (page 11). |
| Which stock may we touch? | The eligibility filters in section 5. These are fixed. You cannot switch them off. |
| In which order do we take it? | The steps of the policy, then the sort ranks of each step, then the SKU rotation. |
| How much do we take from each place? | A greedy pass: take as much as is available from the first place, then the next, until the need is covered. |

The result is one **pick** (a `pick_detail` row) for each place taken. A pick says: this lot, this location, this LPN, this quantity, this unit of measure. The pick also remembers which policy version and which step created it.

Allocation does **not** decide:

- who picks the goods or when (that is the task and picking area);
- which order is more important when two orders want the same stock (see section 7);
- whether a short line may ship later (there is no backorder object, see section 6).

## 2. What starts allocation

| Trigger | Where the operator sees it | Code |
|---|---|---|
| Button `Allocate` on the shipment order | Toast `Order {number} allocated {n}, short {m}` | `web-ui-server/src/extensions/customization/shipment_order/allocate_action.rs:157-160` |
| Button `Release` on the shipment order | Toast `Order {number} released; allocated {n}, short {m}` or `Order {number} released; allocation failed: {reason}` | `wms-outbound/src/service/order/release.rs:354-380`, `release_action.rs:129-142` |
| Release of a wave (the worker releases one order at a time) | Wave member status, see page 12 | `wms-outbound/src/waves/worker.rs:141-150` |
| Automatic top-up after a lock collision or a short pick | Nothing on screen. A background job runs it. | `app-server/src/services/integration_delivery.rs:546-559` |
| API `shipment_order_allocate` (dry run: `shipment_order_allocate_preview`) | JSON result | `app-server/src/web/rpcs/shipment_order_commands_rpc.rs:187-247` |

Nothing allocates by itself when new stock arrives. If a line is short, somebody must press `Allocate` or `Release` again, or an automatic top-up must run (see section 8).

Both order buttons append `; deferred {d} (busy stock, try again)` when the allocator found stock but another transaction held its row lock. Deferred stock is reported separately from `short`.

The unallocate button (`Unallocate`, API `shipment_order_cancel_allocation`) is the reverse. It deletes the picks whose task is still `Created` and gives the stock back. Picks whose task is already `Assigned` or later are kept.

Roles: Allocate = Admin, Manager, Supervisor, Operator. Release = Admin, Manager, Supervisor. Preview, Unallocate = Admin, Manager.

## 3. Order of evaluation

This is the exact order, line by line. A "line" is one shipment order line. Lines are handled in `line_no` order.

1. **Gate on the order.** An order that is terminal (`Closed`, `Cancelled`) or `Picked` is refused with `cannot allocate an order in status {status}`.
2. **Need.** `need = qty_ordered - qty_cancelled - qty_allocated`. If the need is zero or less, the line is skipped without a message.
3. **Policy.** Load the policy that the line froze when it was created. Checks, with the exact refusal text, are in the table in section 4.
4. **SKU facts.** Read `rotation`, `rotate_by`, `min_shelf_life_on_pick`, `shelf_life` and `expire_days` of the SKU, and whether the lot policy requires an expiration.
5. **Split by unit.** Take the pack of the line. Keep only the pack rungs that are active and have `base_qty > 0` **and** are named by an active step of the policy. Split the need over these rungs, biggest rung first, whole units only. The base rung (`base_qty = 1`) takes the rest, even a fraction.
6. **Walk the steps in `sequence` order**. For each step:
   1. `need for this step = the share of its unit + whatever the earlier steps could not cover`. If this is zero, the step is skipped (verdict `NoQuantityForUom`).
   2. Read the candidate stock for this step (section 5).
   3. Subtract what earlier steps of this same plan already claimed from the same balance row. This stops one plan from using the same stock twice.
   4. Filter by `LPN quantity`, then by `Quantity fit`.
   5. Sort by the sort ranks.
   6. Take greedily until the step need is covered.
   7. What is left over is carried to the next step.
7. **Short.** What the last step could not cover (plus any part of the need that no pack rung could take) is the shortfall.
8. **Reserve.** The plan is sorted by balance id. Each draw is reserved under locks: line first, then the LPN, then the balance row. The available quantity and the holds are checked again under the lock.
9. **One retry.** If a draw lost a race (less stock than planned, or the row vanished), the line is planned once more without those rows, and the missing quantity is tried again. A row that is locked by another transaction is **not** retried here. It is counted as "deferred", not as short.
10. **Event and result.** One event `process.order.line_allocated` per line that had anything to do.
11. **After all lines:** the carton plan is built (cartonization), and, only if the order is already released, a task is created for every reserved pick that has no task yet. Statuses of lines and order are recalculated.

## 4. Policy checks and refusal texts

These are the messages a user can see on the order screen or in the API when the policy is wrong. `{...}` is replaced by the real value.

| Situation | Message | Code |
|---|---|---|
| Neither the SKU nor the owner names a policy | `sku '{sku}' (owner {owner_id}) has no allocation policy — neither the sku nor its owner's default names one; assign one before allocating` | `allocation/policy.rs:121-125` |
| New line, policy is not active | `allocation policy '{code}' is inactive — sku '{sku}' cannot allocate against a disabled policy; activate '{code}' or point the sku/owner at a different one` | `policy.rs:129-135` |
| Policy has no active step | `allocation policy '{code}' has no active steps — sku '{sku}' cannot be allocated until the policy is configured; an empty policy is a configuration error, not a shortage` | `policy.rs:137-145` |
| Any active step cannot be run by this build | `allocation policy '{code}' has unsupported active step(s) and cannot execute safely — sku '{sku}' cannot be allocated until the policy is fixed: step '{rule_num}' (detail id {id}): step uses {axis}={value}, which this build cannot execute` | `policy.rs:238-257` |
| A step has a quantity fit but no `LpnQuantity` sort | `step names qty_fit_rule={rule} but no sort_1..sort_4 names LpnQuantity — a quantity-fit rule with no rank to apply it in is a step configuration error, not a stock shortage` | `allocation/step.rs:82-87` |
| New line, no step uses a unit that the pack has | `allocation policy '{code}' has no executable step for sku '{sku}' pack hierarchy` | `policy.rs:185-194` |
| Pack has no active rung with `base_qty > 0` | `sku '{sku}' pack '{pack}' (pack_id {id}) has no active UOM rungs — the pack's pack_item table is either empty or every row has base_qty <= 0; a master-data gap, not a shortage. Add at least one active pack_item row for this pack before allocating.` | `trace.rs:735-745` |
| Policy names no unit the pack has (at allocation time) | `sku '{sku}' pack '{pack}' (pack_id {id}) — allocation policy '{code}' has no active step naming a uom this pack's own ladder actually carries (pack offers [...], policy's steps name [...]); this policy could never plan a single unit of this pack. Add a step naming one of the pack's uoms, or point the sku/policy at a pack whose ladder matches.` | `trace.rs:747-761` |
| Line has no frozen policy | `order line {id} has no frozen allocation policy` (or `... version`) | `trace.rs:299-312` |
| The policy version changed after the line froze it | `allocation policy '{code}' version mismatch for sku '{sku}': line froze version {a}, current version is {b}` | `policy.rs:210-215` |
| `rotate_by` has a value outside the list | `sku '{sku}' has rotate_by = '{value}', not a value the ROTATEBY code list defines (Lot/Mandate/ExpDate/BestBy/DelivBy)` | `trace.rs:923-927` |
| Order is `Closed`, `Cancelled` or `Picked` | `cannot allocate an order in status {status}` | `allocate.rs:310-315` |
| Stock was locked by someone else (retry job only) | `allocation still has {qty} units deferred by inventory lock contention` | `wms-outbound/src/error.rs:50` |

Important behaviour: a **configuration fault stops the whole order**. If line 2 has a bad policy, line 1 is also not reserved, because the error ends the command and the transaction rolls back. For **Release** it is different: the order still launches. The allocation part runs in a savepoint, fails alone, and the toast says `allocation failed: ...`.

A **shortage** never stops anything. It only makes the number `short` larger.

## 5. Which inventory is eligible

Allocation reads the view `inventory_balance_atp` joined with the location and the lot. A balance row is a candidate only if **all** of these are true. You cannot change them. The steps can only narrow the list further.

| # | Rule | Where it comes from |
|---|---|---|
| 1 | Same owner and same SKU as the line. | `inventory_balance_atp.rs:454` |
| 2 | Available quantity (`atp`) is greater than `0.000001`. | `:455`, `:323` |
| 3 | Same pack as the line (`pack_id`). A balance with another pack is never used. | `:456` |
| 4 | Location `status = 'Ok'` and `loc_flag = 'None'`. Locations with status `Hold` or `Damage`, or with a flag such as `CycleCountActive`, `SanitationActive`, `MaintenanceActive`, `ReceivingHoldoff`, are skipped. | `:457` |
| 5 | Location type is not `InTransit` and not `Pack`. | `:458`, `:343` |
| 6 | The step's own filters: zone, location type, category, ABC class (empty means "any"). | `:459-462` |
| 7 | Shelf life: the expiration date is LATER than `today + max(min_shelf_life_on_pick, shelf_life, 0)` days; a lot with no expiration date passes unless an expiration is required (lot policy, or `expire_days` above zero). Today is the **warehouse** day (`WAREHOUSE_TIMEZONE`, UTC when blank). | `:463-464`, `trace.rs`, `lot_dating::threshold` |

**Available quantity** is `qty - qty_allocated - qty_picked - (qty if a blocking hold covers the row)`, never below zero (`011_a_hold_says_what_it_forbids.sql:95-115`). Read it as follows.

- A **hold** matches a balance row when the hold names the row's lot, **or** its location, **or** its LPN code (`011_...sql:95-115`). A hold has no quantity and no SKU. If it matches, the **whole row** counts as held. Holds on a lot block that lot in every location.
- A hold counts only if its hold code is `active` and has `block_outbound_flow = true`. A code that is missing from the code list blocks too (safe default). The flag `enforce` of the hold code is **not** read by allocation.
- Example: code `Damaged` was changed so that it forbids taking goods out, but not putting them in (`011_...sql:66-70`).
- The hold is checked again at the moment of reserving, with a fresh read.

**Pick zones and reserve zones.** The engine has no setting "pick zone" or "reserve zone". The only tools are the step fields `Location type`, `Putaway zone`, `Location category` and `Location ABC`. The usual way is two steps:

1. Step 10: `Location type = Pick` (take from pick faces first).
2. Step 20: no location type (take from anything else).

Because a later step only gets what the earlier step could not cover, pick faces are emptied first.

**Recommended safeguard.** Set `Location type` explicitly on every allocation step and use holds for stock that must not be reserved. This keeps hold-stage locations such as `QC`, `Returns` and `Lost` outside normal allocation rules.

Other stock facts the engine uses:

| Fact | Used for |
|---|---|
| `inventory_balances_lot.add_when` (when the lot row was created) | Rotation `Lot`. It is **not** the lot code. |
| `inventory_balances_lot.manufactured_date`, `expiration_date`, `best_by_date`, `delivery_by_date` | Rotation by that date. An empty date sorts last. |
| `location.route_sequence`, then `location.code` (text sort) | Sort rank `Location`. |
| `container_id` of the balance (the LPN) | `LPN quantity = EqPackPallet` needs an LPN. Loose stock never counts as a whole pallet. |
| `pack_item.is_active`, `pack_item.base_qty` | The unit ladder. |

## 6. Partial allocation and backorder

- **Partial allocation is always on.** There is no setting that forbids it. Allocation takes what exists. The line moves to `PartiallyAllocated`, the order too. The toast shows `short` greater than 0.
- **No stock at all** is also not an error: `allocated 0, short {need}`.
- **Backorder.** There is no separate backorder record. The open quantity stays on the line, and the next `Allocate` or `Release` tries again.
- **Release with a shortage.** The order is released. Its status is `PartiallyReleased` until every live pick has a task. `Release` can be pressed again on `PartiallyReleased`; it tops up the stock and hands out the missing tasks.
- **Order status path.** Line: `NotAllocated` -> `PartiallyAllocated` -> `Allocated` -> ... Order: `New` -> `PartiallyAllocated` -> `Allocated` -> `PartiallyReleased` -> `Released`. The statuses are calculated from the line numbers, nobody sets them by hand.

## 7. Two orders competing for the same stock

There is **no rule that gives one order priority** in allocation. The first command that locks the stock wins. The order priority field is not read by allocation.

Details:

- The two commands lock balance rows with "skip if locked". The second command does not wait. A locked row becomes **deferred** quantity, not shortage.
- Deferred quantity raises the event `process.order.allocation_contention_deferred`. A background job then runs `RetryOrderAllocation` for that order. It tries up to 3 times, first after 15 seconds, then 30, then 60. If after the last try quantity is still locked, the job gives up and the event stays failed.
- In a wave, the orders are released one at a time in the order of the wave member id. The order added first gets its stock first.

## 8. Automatic top-up

The internal subscriber `quark_outbound_execution` listens to two events and runs `RetryOrderAllocation`:

| Event | When it is raised | Effect |
|---|---|---|
| `process.order.allocation_contention_deferred` | A reserve found the row locked | Try again later (3 tries, 15 s, 30 s, 60 s) |
| `process.order.line_allocation_short` | A pick was confirmed short | Allocate again for the same order, with the same frozen policy. The stock that was short is likely skipped, because the balance no longer shows it |

Pick-discrepancy remediation can also call the same retry.

## 9. Worked examples

All examples use the seeded policy `STD`: one step, unit `EA`, sort rank 1 `LotRotation`, rank 2 `Location`. All stock is in locations that pass the filters in section 5. SKU rotation is `Fifo` and `Rotate By` is `Lot`, unless the example says otherwise. Today is 10 October 2026.

### 9.1 FIFO against FEFO

Line: 60 EA. Stock:

| Lot | Lot created | Expires | Location | Available |
|---|---|---|---|---|
| L-A | 1 Oct | 30 Dec | P-01 | 40 |
| L-B | 5 Oct | 15 Nov | P-02 | 40 |

| SKU `Rotation` | SKU `Rotate By` | Order used | Picks created |
|---|---|---|---|
| `Fifo` | `Lot` | L-A, then L-B | 40 from L-A/P-01, 20 from L-B/P-02 |
| `Lifo` | `Lot` | L-B, then L-A | 40 from L-B/P-02, 20 from L-A/P-01 |
| `Fefo` | any value | by expiration date: L-B (15 Nov), then L-A (30 Dec) | 40 from L-B/P-02, 20 from L-A/P-01 |
| `Fifo` | `ExpDate` | by expiration date, oldest first | same as `Fefo` |

Allocated 60, short 0. A lot with an empty date for the chosen column always goes **last**, also under `Lifo`.

If the lot dates tie, the next sort rank decides. In `STD` the second rank is `Location`: the location with the smaller `route_sequence` comes first. `route_sequence` is compared as text, so `10` comes before `2`.

### 9.2 Minimum shelf life

Same stock. The SKU has `Min Shelf Life on Pick = 30`. The cut-off date is 10 Oct + 30 days = 9 Nov 2026; a lot must expire after it. Lot L-B (expires 15 Nov) still passes. If L-B expired on 25 Oct, or on 9 Nov, it would be dropped from the candidates. (`Shelf Life` counts the same way, and the larger of the two applies.) Then only L-A (40) is left: allocated 40, short 20.

With the value `0` (the default) the cut-off is today. An already expired lot is never reserved.

### 9.3 Partial stock

Line: 100 EA. Only 70 EA are available in total. Result: allocated 70, short 30. Toast: `Order {number} allocated 70, short 30`. The line is `PartiallyAllocated`. Later 50 EA arrive. Press `Allocate`: need = 100 - 70 = 30. Result: allocated 30, short 0. The earlier 70 stay as they are.

### 9.4 Two orders, one pile of stock

Order A needs 60 EA, order B needs 60 EA. One position holds 100 EA.

- If A runs first: A gets 60, short 0. B gets 40, short 20.
- If both commands run at the same moment, one locks the row and the other sees it locked. The second one reports 60 "deferred", short 0, and the retry job starts. After the first transaction ends, the retry reserves what remains (40) and the line stays short by 20.
- In a wave with A (priority 10) and B (priority 20) the policy builder puts A first, so A is released first.

### 9.5 Unit split over pallet, case and each

Pack: `PL` = 1000 EA, `CS` = 100 EA, `EA` = 1. Policy: step 10 unit `PL` with `LPN quantity = EqPackPallet`; step 20 unit `CS`; step 30 unit `EA`. Line: 2340 EA.

1. Split: `PL` 2 (2000), `CS` 3 (300), `EA` 40 (40).
2. Step 10 needs 2000. Only one LPN holds exactly 1000, so it takes 1000. Left over: 1000.
3. Step 20 needs 300 + 1000 = 1300. The case locations hold 800. It takes 800. Left over: 500.
4. Step 30 needs 40 + 500 = 540. Loose EA stock is 600. It takes 540.
5. Total 1000 + 800 + 540 = 2340. Short 0. Picks: 1 in `PL`, picks in `CS`, picks in `EA`.

If the EA stock was only 300, step 30 would take 300 and the line would be short by 240.

### 9.6 Same unit in two steps

Step 10: unit `EA`, zone `FAST`. Step 20: unit `EA`, no zone. Line: 100 EA. The `EA` share (100) goes to step 10 only. Step 20 gets only what step 10 could not cover. If zone `FAST` holds 70, step 10 takes 70 and step 20 needs 30. The editor marks a later step as `closed by step N` when an earlier step with the same unit leaves it nothing (page 11, section on `closed by`).

## 10. Settings that do not exist

The code has no column or switch for these. If you need them, they are not available in this version.

| You may expect | What the code does |
|---|---|
| "Ship complete" or "do not allow partial allocation" | Not available. Partial allocation is always on. |
| Over-allocation (reserve more than exists) | Header flag `allow_overallocation` exists, but a policy with it on cannot be published (page 11). |
| Strict lot rotation | Header flag `strict_lot_rotation` exists, but a policy with it on cannot be published. |
| Allocation priority between orders or customers | Not available. |
| Soft allocation (stock may be taken away later) | `Allocation type = Soft` is refused. |
| Automatic allocation when stock arrives | Not available. |
| Reserve by customer-specific lot attributes | Not available. |
