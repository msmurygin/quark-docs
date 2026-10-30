---
title: "Administrator Guide - Picking Policy Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-29
---

# Picking Policy Settings

This page lists every field of a picking policy. For each field it says what the field does, which RF screen or message changes, and what happens to work that is already open.

Read `20-picking-overview.md` first if you do not know how a pick task is built and handed out.

Paths in the "Affects" lines are relative to `crates/libs/` unless they start with another crate name.

## 1. What a picking policy is

A picking policy is a set of rules for one way of picking. It has revisions. Each revision has a status: `Draft`, `Published` or `Retired`. Only a `Draft` can be edited.

- Menu path: `Sidebar > Warehouse Configuration > Policies > Picking Policies`.
- Who can change it: roles `Admin` and `Manager`.
- Who can read it: `Admin`, `Manager`, `Supervisor`, `Operator`, `Viewer` (same file, line 23).
- Seed: one policy, code `DISCRETE`, revision 1, `Published`, description `One order, one root container: today's picking`.
- The list columns are `Code`, `Revision`, `Status`, `Description`, `Grouping`, `Deposit`.
- The card has seven bands: `Grouping`, `Carrier`, `Target Binding`, `Confirmation`, `Deposit`, `Completion`, `Order Control`.

### 1.1 Two shapes

The field `Unit` (`grouping_unit`) picks the shape. The shape fixes most other fields.

The warehouse has five operational picking patterns, but the policy has only two base shapes: discrete and cart. A summary step is a cart option. Batch picking to a distribution station is selected by assigning a station to a wave. Paper picking records the same physical work from the web workplace. See the [picking overview](20-picking-overview.md#the-five-warehouse-work-patterns) for the complete mapping.

| Shape | `Unit` | What it is | Fixed fields |
|---|---|---|---|
| Discrete | `Order` | One operator picks one order onto a pick pallet (a DROPID). | `Max Targets` = 1, `Carrier Required` = No, `Target Binding` = Unbound, `Quantity` = Per pick, `Target` = Scan the container, `Deposit Mode` = Collect to root, `Completion` = Complete. |
| Cart (carrier) | `Planned target` | One operator pushes a cart with several boxes and picks several planned cartons in one trip. | `Carrier Required` = Yes, `Target Binding` = Before route, `Deposit Mode` = Direct to target. |

The rules are in `wms-outbound/src/domain/picking_policy/aggregate.rs:208` (discrete) and `:237` (cart). The database repeats them in `chk_picking_policy_order_shape` and `chk_picking_policy_planned_target_shape`.

### 1.2 Which policy is read where

This table is the most important thing on this page. Read it before you edit a policy.

| Field group | Discrete pick (pallet) | Cart pick (assignment) |
|---|---|---|
| The five `Confirmation` fields | The `Published` revision of code `DISCRETE`, read at the moment of each scan. | The copy frozen when the cart assignment started. |
| `Pallet Drop Cell Types`, `Pallet Drop Suggestion` | The revision frozen on the pallet when it was opened: the policy of the work area (for the shift's equipment) when the operator came in through `Pick by Area` and the pick location is in a zone of that area; otherwise `DISCRETE`. | Not read. |
| `Count an Emptied Location` | The revision frozen on the pallet, chosen as in the row above. | The copy frozen at start. |
| `Max Targets`, `Completion`, `Quantity`, `Target`, `Deposit Mode` | Not read. | Read at start and at delivery. |
| `Missing Container at Control` | The published policy of the work area that names the control station. The value is recorded when a missing container is reported. | The same station policy decides the rule, not a policy copy from an individual cart. |

Important consequence: **the five `Confirmation` fields of a discrete pick are read from `DISCRETE` only.** A policy with `Unit` = `Order` and a code other than `DISCRETE` never changes how a discrete pick proves its source. Its **pallet** fields (`Pallet Drop Cell Types`, `Pallet Drop Suggestion`) and `Count an Emptied Location` are read, but only for a pallet that is opened through `Pick by Area` for a pick that stands in a zone of the area. For every other pallet (the old entry `Discrete Pick`, or a task outside the area) the pallet is frozen to `DISCRETE`. Since picking slice R12 was amended (commit `1e19eb87b`), an area can therefore decide where its pallets may go (`Pack` among the drop types sends them to the pack station of the area) without changing the warehouse's `DISCRETE`. See section 10, item 1.

### 1.3 How a code gets used

For the RF entry `Pick by Area` the system looks for the policy in this order:

1. The row of the work area for the operator's equipment profile (`work_area_picking_policy`).
2. The area default (`work_area.picking_policy_code`).
3. `DISCRETE`.

The code must have a `Published` revision. If it has none, the lookup fails with `picking policy {code} has no published revision`. The service stops this from happening (see `22-work-areas-equipment-and-permissions.md`).

The old RF entry `Discrete Pick` (`PICK01`, title `Get Pick Work`) names no area, so it always works as `DISCRETE`. When a pallet is opened for work taken through `Pick by Area`, the terminal sends the area code (`pick_drop_open`, field `work_area_code`, `PICK03` revision 4). The pallet then opens under the policy of (area, equipment), else the area default, when the pick location is in a zone of the area (`WorkAreaBmc::covers_location`). If the pick stands outside the area, `DISCRETE` is used. An unknown area code is refused: `UNKNOWN_WORK_AREA`.

## 2. Lifecycle fields

### `Code` (`code`)

- UI label: `Code`. Read-only on the card. On the `New Draft` window it is an input.
- Column: `picking_policy.code`, `varchar(20)`. The service turns it to upper case and trims it. The database check needs `code = upper(btrim(code))` and not empty.
- Default: none. Seed: `DISCRETE`.
- What it does: names the policy. All revisions of one policy share the code. Areas point at the code, not at a revision.
- Affects: every lookup in section 1.3. The code `DISCRETE` is special: it is the fallback, and the only code whose confirmation fields a discrete pick reads.
- Example: you type `cart6` in `New Draft`. The system stores `CART6`.
- Interaction: a code longer than 20 characters is refused: `Policy code must not exceed 20 characters`. An empty code: `Policy code must not be empty`.
- When empty: refused as above. The window also says `Enter the policy code`.
- Open work: not applicable. A code cannot be changed after the first revision.

### `Revision` (`revision_no`)

- UI label: `Revision`. Read-only.
- Column: `integer`. The unique key is `(code, revision_no)`.
- Default: the system gives `max(revision_no) + 1` for the code. Seed: 1.
- What it does: counts the drafts of a code. It never goes back.
- Affects: nothing at run time. It is stored in each cart assignment snapshot and is shown on the verification plan (`policy_revision`).
- Open work: not applicable.

### `Status` (`status`)

- UI label: `Status`. Read-only.
- Column: enum `picking_policy_status`: `Draft`, `Published`, `Retired`. Default `Draft`.
- What it does: `Draft` can be edited. `Published` is live. `Retired` is history.
- Rules (database check `chk_picking_policy_lifecycle`): a `Draft` has no publish date and no retire date. A `Published` revision has a publish date. A `Retired` revision has both.
- One code can have only one `Published` revision at a time (unique index `uq_picking_policy_one_published`).
- Buttons on the card: `Save` and `Publish` work only on a `Draft` (reason shown: `Only a draft can be saved or published`). `Retire` works only on a `Published` revision (reason: `Only a published revision can be retired`).
- Open work: see section 7.

### `Description` (`description`)

- UI label: `Description`. Input, required on the card.
- Column: `varchar(120)`, not null.
- What it does: free text. Shown in the list and in the area picker (`<code> — <description>`).
- Messages: `Policy description must not exceed 120 characters`. The card says `Describe the policy` if it is empty.
- Open work: none. It is not part of the frozen copy.

### `Version` (`version`)

- UI label: `Version`. Read-only.
- Column: `integer`, default 1. Goes up by 1 on each save, publish or retire.
- What it does: protects against two people editing one draft. The card sends it as `expected_version`.
- Message when it is old: `The policy changed since it was read (version {version}); refresh the screen`. Press `Refresh` on the card. It drops what you typed and reloads the revision.

### `Published At` (`published_at`) and `Retired At` (`retired_at`)

- Labels: `Published At`, `Retired At` (bio fields; not on the card, shown by API).
- Columns: `timestamptz`, null until the event. Set by `Publish` and `Retire`.
- Stored only. It has no effect today (no code reads them for a decision).

## 3. Grouping and carrier fields

### `Unit` (`grouping_unit`)

- UI label: `Unit` (band `Grouping`). Dropdown.
- Column: enum `picking_grouping_unit`.
- Values: `Order` (shown as `Order — one order per task`), `PlannedTarget` (shown as `Planned target — several targets per task`).
- Default: none in schema. Seed `DISCRETE`: `Order`. A new code starts from the built-in discrete values.
- What it does: picks the shape (section 1.1). `PlannedTarget` turns on cart picking. A cart start also needs `Carrier Required` = Yes.
- Affects: `wms-outbound/src/picking/commands/start.rs:193-197`. If the policy is not `PlannedTarget`, or has no carrier, `pick_assignment_start` refuses with `the work area does not pick onto a carrier`.
- Example: area `PICK-A` works by `CART6` (`Unit` = `PlannedTarget`). The operator chooses `Pick by Area` and the area code. The RF shows `Scan Carrier` (screen `PKA01`).
- Interaction: with `Order` the system refuses any other value in the fixed fields: `With grouping by order the section '{field}' cannot be changed: the grouping itself defines it`. `{field}` is the technical name, for example `max_targets`.
- Open work: carts that are already built keep the copy they started with.

### `Max Targets` (`max_targets`)

- UI label: `Max Targets`. Dropdown, numbers 1 to 99.
- Column: `smallint`, not null. Database check 1 to 99 (`chk_picking_policy_max_targets`).
- Default: none. Seed 1.
- What it does: the most planned cartons one cart takes in one trip. The real number is the smaller of this value and the `Positions` of the cart type.
- Affects: `start.rs:229` (how many targets are chosen); `dispatch_next.rs:297` (the RF `Scan Carrier` answer carries it); `picking/target/close.rs:335` (free places after a box is closed full).
- Example: `Max Targets` = 6 and the cart type `CART4` has 4 positions. The cart takes 4 cartons. With `Max Targets` = 3 it takes 3.
- Interaction: the cart type decides when it is lower. Order grouping needs 1.
- Message: `Targets per pass must be between 1 and 99, got {value}`.
- Open work: an open assignment keeps its own number of positions.

### `Carrier Required` (`carrier_required`)

- UI label: `Carrier Required`. Dropdown `Yes` / `No` (code list `YES_NO`).
- Column: `boolean`, not null.
- Default: none. Seed `false`.
- What it does: says that the operator must push a cart (a carrier). Then the RF does not hand out a single task. It asks to scan a carrier.
- Affects: `dispatch_next.rs:272` (decides "scan carrier" or single task); `start.rs:193`.
- Example: `Carrier Required` = Yes for area `PICK-A` when the operator uses equipment `CART`. The operator holds no task. `Pick by Area` answers `Scan Carrier`. No task is claimed yet. If the operator already holds a single task from before, they get that task first.
- Interaction: `Unit` = `PlannedTarget` needs Yes: `Grouping by planned target requires a carrier container`. `Unit` = `Order` needs No.
- Open work: switching an area from cart to discrete does not touch a live assignment. The operator continues it.

#### Inputs from other screens that decide if a container is a carrier

These are not policy fields, but a cart start fails without them.

| Screen | Field | Needed value | If wrong |
|---|---|---|---|
| `Sidebar > Management & Control > Handling Units > Handling Unit Registry` (type card) | `Active` | on | `the carrier's type is switched off: <code>` |
| same | `Holds Containers` | on | `this is not a carrier with positions: <code>` |
| same | `Positions` | 1 or more | `this is not a carrier with positions: <code>` |
| the container itself | has a handling-unit type | yes | `this container is not a registered handling unit: <code>` |
| the container itself | empty, no parent, no live assignment, no outbound hold | yes | `the carrier is not empty: <code>`, `the carrier stands inside another container: <code>`, `the carrier is on another live pick assignment: <code>, assignment <PA code>`, `the carrier is on hold: <code>` |

An unknown scan: `no container has this code: <code>`.

### `Target Binding` (`target_binding`)

- UI label: `Target Binding`. Dropdown.
- Column: enum `picking_target_binding`. Values `Unbound` (`Unbound — no container, a root per order`), `BeforeRoute` (`Before route — every target bound first`).
- Default: none. Seed `Unbound`.
- What it does: it should say when a box is tied to a position. In practice the shape forces the value: `Unbound` for `Order`, `BeforeRoute` for `PlannedTarget`.
- Affects: only the shape check. No other code reads it. After the shape check, the value has no effect of its own.
- Messages: `With grouping by planned target the target is bound before the route`.
- Example: a cart always binds a box to each position first (screens `PKA02` `Prepare Carrier`), whatever you pick here.
- Open work: none.

## 4. Confirmation fields (cart only)

These two fields apply to a cart assignment. `Quantity` is read when the assignment starts and walks. `Target` is also checked when the policy is saved and published.

### `Quantity` (`qty_confirmation`)

- UI label: `Quantity` (band `Confirmation`). Dropdown.
- Column: enum `picking_qty_confirmation`. Values `PerPick` (`Per pick`), `Aggregated` (`Aggregated — location and item once per group`).
- Default: none. Seed `PerPick`.
- What it does: should say whether the operator confirms every pick or one group at a time.
- Affects: the route of the cart. Both values can be started. With `PerPick` every pick is its own stop. With `Aggregated`, consecutive stops of one source on the route become **one summary step**: the operator goes to the location once, proves the source once, and then puts each place's quantity into its own box. The rules that decide which stops join: same owner, same SKU, same location and same source LPN, none of them skipped, and the SKU is not serial-tracked (a serial pick is always its own stop). The internal lot must also match, unless `Loose Lot Source` is `NoConfirmation`. Different LPNs in one location never join. A group of one is a plain stop. See the operator guide `../../operator/09-picking.md`, section B3a.
- Each place still commits or shorts on its own, under its own task version and its own key. A short, reject, skip or full box of one place does not break the others.
- Before picking slice 5 `Aggregated` saved and published but cart start refused it with `this way of confirming is not supported yet: qty_confirmation = Aggregated`. That refusal is gone for `Aggregated` (picking slice 5, commit `504caf6e1`).
- Interaction: `Order` grouping needs `PerPick`.
- Open work: none.

### `Target` (`target_confirmation`)

- UI label: `Target` (band `Confirmation`). Dropdown.
- Column: enum `picking_target_confirmation`. Values `ScanContainer` (`Scan the container`), `PositionNumber` (`Position number`).
- Default: none. Seed `ScanContainer`.
- What it does: should say whether the operator scans the box or types the position number.
- Affects: `PickingPolicySections::validate_planned_target_shape`. **A cart policy must use `ScanContainer`.** `PositionNumber` is refused when the policy is saved as a draft and when it is published: `With grouping by planned target the target is confirmed by scanning the container`. The start-time guard stays for rows written around the check: it answers `this way of confirming is not supported yet: target_confirmation = PositionNumber` (`executable_sections`). Fixed in P-09 (commit `b5bf3c3bf`); before, such a policy published and then failed on the first cart an operator started.
- Open work: none.

## 5. Deposit and completion fields

### `Deposit Mode` (`deposit_mode`)

- UI label: `Deposit Mode` (band `Deposit`). Dropdown.
- Column: enum `picking_deposit_mode`. Values `CollectToRoot` (`Collect to root`), `DirectToTarget` (`Direct to target`).
- Default: none. Seed `CollectToRoot`.
- What it does: says where picked goods go. `CollectToRoot` is the pick pallet. `DirectToTarget` is the box on the cart position.
- Affects: `wms-outbound/src/domain/pick_assignment/route.rs:256-259`: a route command refuses any value except `DirectToTarget`. The shape forces `DirectToTarget` for carts, so the guard never fires in practice. Which deposit a pick uses is decided by whether the pick belongs to a live assignment, not by this field.
- Messages: `With grouping by planned target goods are put straight into the target`. Guard text: `this way of depositing is not supported yet: <value>`.
- Example: a cart pick goes to the box on its position (scan the position's box, screen `PKA28` `Into Box`). If you scan another box: `this is not the right box — put the goods into your position's box`.
- Open work: none.

### `Completion` (`completion`)

- UI label: `Completion` (band `Completion`). Dropdown.
- Column: enum `picking_completion`. Values `Complete` (`Complete`), `ConfirmAtLocation` (`Confirm at the drop location`).
- Default: none. Seed `Complete`.
- What it does: what ends a cart trip. `Complete`: the operator finishes the trip where the cart stands. The boxes come off the cart there. `ConfirmAtLocation`: the operator must go to the delivery location and scan it.
- Affects: `picking/commands/start.rs:205-218` (with `ConfirmAtLocation` the pack-station router is asked at start and the answer is frozen); `domain/pick_assignment/delivery.rs:207-229` (the check at delivery); `picking/completion/confirm_at_location.rs:100`.
- The delivery location comes from the order, not from the policy: the owner field `Delivery location (picker carrier)` (`picking_toloc`), else the `to_location` of the tasks when they all agree (zone field `Picking To Location`). A planned target with no delivery location is never put on a cart. The carrier delivery location is frozen at start. An edit of the owner field after start applies to the next start.
- Messages at delivery (`pick_assignment_complete`, screens `PKA30` / `PKA40` `Deliver Carrier`):
  - `scan the delivery location: STAGE-1` when the location is missing.
  - `this is not the delivery location of this carrier: STAGE-2 (STAGE-1)` (scanned, then expected in brackets).
  - `the carrier cannot be delivered to this location now: STAGE-1`.
  - `the route is not finished: PA00000012 (3)` (assignment code and the number of stops left).
  - `the delivery location is not known — call a supervisor: PA00000012`.
  - `this carrier was delivered already: PA00000012`.
  - `there is no carrier to deliver`.
- Example: `Completion` = `ConfirmAtLocation`, delivery location `STAGE-1`. The operator ends the route. The RF asks for the location. The operator scans `STAGE-2`. Refused. They scan `STAGE-1`. The boxes are moved there as separate roots and the cart is free.
- Interaction: with `ConfirmAtLocation` and a pack station on the area (`work_area.pack_station_location`), the delivery location is the station. With `Complete` the carrier is never routed to a station.
- Open work: an open assignment keeps its frozen value.

## 6. Pallet and emptied-location fields (completion band)

### `Pallet Drop Suggestion` (`pallet_drop_suggestion`)

- UI label: `Pallet Drop Suggestion`. Dropdown with one value.
- Column: enum `picking_pallet_drop_suggestion`. Only value: `OwnerThenTask` (shown as `Owner's drop location, else the order's task destination`).
- Default: `OwnerThenTask` (schema and seed).
- What it does: it should say where the suggested drop location of a closed pallet comes from. Today there is only one source.
- Stored only. It has no effect today. No code reads it; the destination chain is fixed in `picking/deposit/onto_pallet.rs:131` (`pick_destination`: owner field first, then the task `to_location`). (Search for `pallet_drop_suggestion` in non-test code finds only the policy model and its copies.)
- Open work: none.

### `Pallet Drop Cell Types` (`pallet_drop_types`)

- UI label: `Pallet Drop Cell Types`. Multi-select. (The word "cell" stays in the label. The rest of the product now says "location".)
- Column: `text[]`, not null. Allowed members: `Door`, `Pickto`, `Sort`, `Stage`, `Pack`, `Control`. At least 1 and at most 6, no repeats (database check `chk_picking_policy_pallet_drop_types`).
- Shown names: `Door`, `Pick-to`, `Sort station`, `Staging`, `Pack station`, `Control station`.
- Default: `{Pickto,Sort,Stage,Door}` (schema, so the seed `DISCRETE` has it). `Pack` and `Control` are added only if you choose them. The system saves the list in the order Door, Pickto, Sort, Stage, Pack, Control.
- What it does: the list of location types where a closed discrete pallet may stand. It is a fence, not a menu. A pallet closes only into the one location it goes to. That location is frozen at the first deposit. The first deposit is refused if the location type is not in this list.
- Affects: `onto_pallet.rs:91-96` (the check at first deposit), `:181-199` (reads the list from the revision frozen on the pallet); `picking/commands/drop_close.rs:181` (the check at close, `F2`).
- Example: list = `Stage`, `Door`. The owner field `Delivery location (picker carrier)` is `PICKTO` (type `Pickto`). The first pick of a pallet is refused: `a closed pallet may not stand in the location this pick goes to: PICKTO (Pickto)`. Add `Pickto` to the list, publish a new `DISCRETE` revision. Pallets opened after the publish accept it.
- Pack stations: if the list holds `Pack` and the location's area has exactly one pack station, the first deposit sends the pallet to the station and the router freezes it. Without `Pack` in the list a pallet is never routed to a station.
- Control stations: a closed pick pallet can go directly from picking to order control only when the list holds `Control` and the area names a control station. If it goes to packing first, the output cartons follow the area's downstream station settings; this pallet list is not checked again.
- Messages: `A closed pallet must be allowed into at least one location type`, `A closed pallet cannot be put into a location of type {loc_type}`, `Location type {loc_type} is listed twice`. At the RF: `a closed pallet cannot stand in a location of this type: <location> (<type>)` at `F2`; `this pick has no destination location — neither its owner nor its task names one: task <id>`.
- Interaction: shape does not fix it. Any grouping can set it. For carts it is stored but not read.
- Open work: a pallet keeps the revision it was opened under. Publishing a new `DISCRETE` revision does not change an open pallet.

### `Missing Container at Control` (`missing_container_at_control`)

- UI label: `Missing Container at Control` in the `Order Control` band. Dropdown; required on a draft.
- Default and safest value: `Only find it`. The order waits until the missing container is found and scanned at the control station.
- `Write off to Lost`: the supervisor may write off the goods in the missing container. Picking closes short and the order continues without it.
- `Release the order without it`: the supervisor may let the order continue without the container. The container remains recorded where it was last seen and that location is sent for a count. A container found later is scanned at control and ships on a later trip.
- `Request Count` is available under every value. It asks for a count but does not release the order by itself.
- The rule is recorded when the operator reports the container missing. A later policy revision does not change an exception that is already open.
- See [Order control after picking](../../operator/11-order-control-after-picking.md) for the operator and supervisor steps.

### `On an Emptied Location` (`pick_to_zero`)

- UI label: `On an Emptied Location`. Dropdown `Nothing` / `Count the location` / `Ask the operator whether it is empty` (values `Off` / `Count` / `Confirm`).
- Column: `pick_to_zero_mode`, not null, default `Off`. Before wms-app 111 this was the yes/no `count_on_pick_to_zero`; `Yes` became `Count`.
- What it does: decides what happens when a full pick takes the last stock out of its source location.
  - `Off`: nothing.
  - `Count`: the system asks for a count of that location. After the stock moves, if the location has no stock left, the commit writes the event `process.inventory.count_requested` (source `PickToZero`). A background subscriber then starts an Event count of that location (see `24-inventory-count-policy.md`). The commit does not start the count itself. A rolled-back commit asks for nothing.
  - `Confirm`: the commit's answer carries `ask_location_empty: true`, and the RF asks the picker `Location <code> empty? 1 = Yes, 2 = No` (screens `PICKZ` / `PKAZ`). The answer goes to `location_confirm_empty`. "Empty" while the stock holds nothing is kept as evidence (`location_evidence`, `ConfirmedEmpty`). "Not empty" while the stock holds nothing, or "empty" while the stock holds something, asks for a count (source `ZeroConfirmation`). `Esc` skips the question and records nothing.
- Affects: `picking/emptied_location.rs` (`on_emptied_location`), `wms-inventory` `service/location_evidence/confirm_empty.rs`. Count spec Appendices D and L.
- "Empty" means no stock quantity at the location. An empty container left standing there does not stop the count.
- Only a full pick (`pick_commit`) does this. A short does not use this field; its reason decides the count (see `23-pick-short-reasons.md`).
- Example: location `A-05-01` holds 12 units, all reserved to one pick of 12. The operator commits 12. `On an Emptied Location` = `Count`. A count of `A-05-01` is requested. With `Confirm` the operator is asked instead, and a count is requested only if they say the location is not empty. The operator who counts finds 0, or finds hidden stock.
- Interaction: the count is refused (and the refusal is stored as the answer, no retry) if the location type is never counted (`InTransit`, `Lost`) or the location is frozen by another operation. See `24-inventory-count-policy.md`, section 8.
- Open work: discrete picks use the revision frozen on the pallet (`DISCRETE`, or the area's policy as in section 1.2). Carts use their frozen copy.

## 7. Source confirmation fields

These five fields decide what the operator must prove at the source before stock moves. They build a "verification plan" for every pick. They work the same for discrete and cart picks. They do not depend on the shape.

The plan asks for these kinds of proof, in this order: location, item, LPN, lot (or lot attributes). The RF follows the plan step by step; the next step comes from the server (`verification.next`), not from a fixed sequence.

| Kind of proof | RF screen (discrete) | RF screen (cart) |
|---|---|---|
| Location | `PICK04` `Confirm Source` | `PKA21` `Confirm Location` |
| Item | `PICK05` `Confirm Item` | `PKA22` `Confirm Item` |
| Source LPN | `PICK06` `Confirm Source LPN` | `PKA23` `Confirm Source LPN` |
| Internal lot | `PICK14` `Confirm Lot` | `PKA21L` `Confirm Lot` |
| Lot attribute | `PICK15` `Confirm Lot Attribute` | `PKA21A` `Confirm Lot Attribute` |
| Quantity (audit only, never required) | `PICK08` `Confirm Quantity` | `PKA24` `Confirm Quantity` |

If the plan is not complete, `pick_commit` and any short with some quantity found are refused: `confirm the source first: location, item` (the list names the missing kinds). A short with quantity 0 proves nothing.

The plan is judged again at commit. Under the location lock the system re-reads the stock, the lot expiry and the holds. So a plan made at the first scan never lives longer than the stock it judged.

Serial numbers are not a policy field. A SKU with serial tracking sends the operator through the screen `Pick Serials` (`PICK07`, cart `PKA24S`) before the commit. The SKU setting `Pick Episode Reassignment` decides what happens to the scanned serials when the task changes hands (see `22-work-areas-equipment-and-permissions.md`, section 7).

### `Source Location` (`source_location_confirmation`)

- UI label: `Source Location`. Dropdown.
- Column: enum `picking_source_location_confirmation`. Values `DisplayOnly` (`Display only`), `Scan` (`Scan`).
- Default: `Scan` (schema, every revision).
- What it does: `Scan` makes the operator scan the source location. `DisplayOnly` only shows it.
- Affects: `plan.rs:168-170`. A location scan is also required, even with `DisplayOnly`, when the proof of the lot is "this location holds one lot". That happens with `Loose Lot Source` = `ExclusiveLocation`, and with `Automatic` on a loose source that holds one lot and has no checkable attribute.
- A location is read through the barcode formats (`ItemNumber` becomes a GTIN, and so on). A leading symbology identifier such as `]C0` is removed: `]C0A-01-01` means location `A-01-01`. A scan that a format claims but cannot read: `the barcode could not be read — scan again`.
- A typed location is accepted when it equals the expected one. It is stored with the capture method `Manual`. Only the lot label and the lot attributes refuse typing (see `Lot Attribute Capture`).
- A wrong location: `Pick Location confirmation does not match authoritative work`.
- Example: with `DisplayOnly` the operator sees `A-01-01` on `PICK02` and goes straight to the item step.
- Open work: see section 8.

### `Item` (`item_confirmation`)

- UI label: `Item`. Dropdown.
- Column: enum `picking_item_confirmation`. Values `DisplayOnly`, `Scan`.
- Default: `Scan`.
- What it does: `Scan` makes the operator scan the item (SKU or GTIN). `DisplayOnly` only shows it.
- Affects: `plan.rs:179`.
- Messages: wrong item `Pick Item confirmation does not match authoritative work`. A typed item is accepted when it equals the expected one (capture method `Manual`).
- Open work: see section 8.

### `Reserved LPN` (`reserved_lpn_confirmation`)

- UI label: `Reserved LPN`. Dropdown.
- Column: enum `picking_reserved_lpn_confirmation`. Values `DoNotConfirm` (`Do not confirm`), `ScanWhenPresent` (`Scan when present`).
- Default: `ScanWhenPresent`.
- What it does: `ScanWhenPresent` makes the operator scan the LPN (pallet or case label) the stock is reserved on, whenever the source has one. `DoNotConfirm` does not ask for it.
- Affects: `plan.rs:182-188`. The LPN is asked when the source stands in a container **and** (this field is `ScanWhenPresent` **or** `Loose Lot Source` is `Automatic`).
- Interaction (which wins): `Automatic` wins. With the default `Loose Lot Source` = `Automatic`, setting this field to `DoNotConfirm` does **not** remove the LPN scan for a source in a container. To remove it, also change `Loose Lot Source` to something other than `Automatic`.
- Messages: wrong LPN `this is not the reserved LPN: <scanned code>`.
- Example: stock on pallet `LPN0007` at `A-02-03`. Defaults. The operator must scan `LPN0007`. Another label: `this is not the reserved LPN: LPN0099`.
- Open work: see section 8.

### `Loose Lot Source` (`loose_lot_confirmation`)

- UI label: `Loose Lot Source`. Dropdown. Despite the name it also drives the lot proof for stock in a container.
- Column: enum `picking_loose_lot_confirmation`.
- Default: `Automatic`.
- What it does: how the system proves that the operator takes the reserved lot, not a neighbour lot. The values:

| Value | Shown as | What the operator must do | When the plan cannot be made |
|---|---|---|---|
| `NoConfirmation` | `No confirmation` | Nothing about the lot. | Never. |
| `Automatic` | `Automatic — the server picks the proof` | Depends on the source. Container with one lot: nothing more than the LPN scan. Several lots, but the lot attributes tell them apart: confirm the attributes. Loose with one lot and no checkable attribute: the location scan (even when `Source Location` is `DisplayOnly`). | No lot in scope; or several lots and the attributes do not tell them apart; or no checkable attributes. It never asks for a lot label scan, because nothing says a label was printed. |
| `ScanInternalLot` | `Scan the internal lot` | Scan the lot label (screen `PICK14` / `PKA21L`). | Never. |
| `ConfirmLotAttributes` | `Confirm lot attributes` | Confirm every checkable attribute (screen `PICK15` / `PKA21A`). | No checkable attribute with a reserved value. |
| `ExclusiveLocation` | `Exclusive location — one lot per location` | Scan the location. | The location allows mixed lots (`Loc.mix_lot` on), or it holds no lot, or it holds several lots. |

- Affects: `plan.rs:244` (`lot_proof`) and `plan.rs:271-300` (`automatic_lot_proof`).
- What is "checkable": a lot attribute that the SKU Lot Policy marks "show on pick", whose physical check is not `NotVerifiable`, and that has a reserved value. `Visual` attributes count only when `Lot Attribute Capture` = `ScanOrManual`.
- When the plan cannot be made the pick card shows: `the reserved lot cannot be told apart here — a short passes only with 0 found; call a supervisor`. A commit gets `the reserved lot cannot be told apart here — call a supervisor`. Only the pallet step, a short with 0 found, and a reject are open. Fix: change the setting, or give the lots a checkable attribute, or put one lot per location.
- Other messages: `this is not the reserved lot: <scanned>`, `these are not the reserved goods — check the attributes: <attribute codes>`, `several lots here look the same — scan the LPN or the lot label: <count>`.
- Example: location `B-01-01` is loose. It holds lot `L1` (reserved) and lot `L2`. Both have the same expiry date. `Automatic` has only the attribute `expiration_date`. It does not separate them. The pick is blocked with the message above. With `ScanInternalLot` the operator scans label `L1` and goes on.
- Open work: see section 8.

### `Lot Attribute Capture` (`lot_attribute_capture`)

- UI label: `Lot Attribute Capture`. Dropdown.
- Column: enum `picking_lot_attribute_capture`. Values `ScanOnly` (`Scan only`), `ScanOrManual` (`Scan or manual entry`).
- Default: `ScanOrManual`.
- What it does: `ScanOnly` allows only scans for lot proof. Attributes that can only be checked by eye (`Visual`) are not asked at all. `ScanOrManual` also allows typing, and asks `Visual` attributes. An attribute whose physical check is `Barcode` is always scan only.
- Affects: `plan.rs:136-150` and `:190-196`, `:222`.
- Message when someone types where only a scan is allowed: `scan it, typing is not allowed: <what>`.
- Example: attribute `color` is `Visual`. `ScanOrManual`: the operator types the colour at `PICK15`. `ScanOnly`: `color` is not asked.
- Open work: see section 8.

## 8. What happens to open work when you change a policy

| Change | Drafts | Discrete work in progress | Cart assignments in progress |
|---|---|---|---|
| Edit a `Draft` and `Save` | Nothing runs on a draft. | No effect. | No effect. |
| `Publish` a revision of `DISCRETE` | The old `Published` revision becomes `Retired` in the same step. | A pallet keeps the revision it opened under (drop types, emptied-location count). The next confirmation scan reads the new confirmation values. An episode that is already open keeps its frozen plan; the commit re-judges the stock. | Not affected. |
| `Publish` a revision of a cart code | Same. | Not affected. | A live assignment keeps the copy it started with (`pick_assignment.policy_snapshot`). New starts use the new revision. |
| `Retire` | Refused for `DISCRETE` and for a code used by an area. | No effect. | No effect. |
| `Assign Policy` on an area | See `22-work-areas-equipment-and-permissions.md`. | The next `Pick by Area` dispatch uses the new policy. | A live assignment is continued first. |

An episode is the stored proof of one source. It lives while the same operator holds the same task. It ends on reassign, return to pool, lease expiry or order cancel, and the next scan opens a new one.

## 9. Messages and refusals of the policy screens

### On the card (`New Draft`, `Save`, `Publish`, `Retire`)

| Success message | Failure message (prefix) |
|---|---|
| `Draft created: open it in the list to edit its sections` | `The draft was not created: {error}` |
| `Draft saved` | `The draft was not saved: {error}` |
| `Revision published` | `The revision was not published: {error}` |
| `Revision retired` | `The revision was not retired: {error}` |

`{error}` is one of the following:

| Text | Cause | Fix |
|---|---|---|
| `Only a draft can be changed, but the revision is in status Published` | You saved a revision that is not a draft. | Press `New Draft` and edit the new draft. |
| `Only a draft can be published, but the revision is in status {status}` | Publish of a non-draft. | Same. |
| `Only a published revision can be retired, but this one is in status {status}` | Retire of a non-published revision. | None. |
| `The fallback policy DISCRETE cannot be left without a published revision: publish a new revision instead of retiring this one` | Retire of `DISCRETE`. | Publish a new `DISCRETE` revision. |
| `Policy {code} is used by work areas [ids]: assign them another policy first` | Retire of a code an area uses (default or per equipment). | Change those areas first. The list holds work area ids, not codes. |
| `The fallback policy DISCRETE describes today's picking and does not change sections` | You changed a shape field of `DISCRETE`. | Only the pallet, count and confirmation fields of `DISCRETE` may change. |
| `The policy changed since it was read (version N); refresh the screen` | Old version. | `Refresh`. |
| `Policy picking_policy {id} not found` | The revision is gone. | Reload the list. |
| The rules of section 1.1 and the drop-type rules in section 6 | See the field. | |

### In the area assignment

`Policy {code} has no published revision: it cannot be assigned to a work area`, `Work area {id} not found`. See `22-work-areas-equipment-and-permissions.md`.

## 10. Unfinished or inconsistent points an administrator should know

1. A policy with `Unit` = `Order` and a code other than `DISCRETE` is read for the **pallet** fields only (section 1.2). Its confirmation fields are never read for a discrete pick: `confirmation/source_facts.rs` (`policy_of_pick`) resolves `DISCRETE` only. The pallet is opened under the area's policy by `picking/commands/drop_open.rs` (step c). There is no warning on the screen.
2. Fixed. `Target` = `PositionNumber` is now refused at save and publish (P-09, commit `b5bf3c3bf`). `Quantity` = `Aggregated` is built and runs as the summary step (section 4).
3. `Target Binding`, `Deposit Mode` and `Pallet Drop Suggestion` have no independent effect (sections 3, 5, 6).
4. `Create Draft` for a new code starts from the built-in discrete values, not from the current `DISCRETE` revision. For an existing code it copies the latest revision (any status).
5. The database default of `pallet_drop_types` is stored as `{Pickto,Sort,Stage,Door}`. The domain sorts it as Door, Pickto, Sort, Stage. This is cosmetic: it is sorted when read.
6. The README of picking says the reason action `CreateInventoryCount` is "unexecuted in MVP". That is out of date: the action runs (see `23-pick-short-reasons.md`).
