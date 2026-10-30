---
title: "Administrator Guide - Pick Short Reasons"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Pick Short Reasons

A pick is "short" when the operator finds less stock than the pick asks for. The operator types a **reason code**. The code selects a **pick short reason**. The reason says what the system does next with the stock, the location and the orders.

This page lists every field of a reason and of its actions, the three seeded reasons, and exactly what each action does.

Paths in the "Affects" lines are relative to `crates/libs/` unless they start with another crate name.

## 1. Where and who

- Menu path: `Sidebar > Warehouse Configuration > Reason Codes > Pick Short Reasons`.
- Roles that change reasons: `Admin`, `Manager`. `Supervisor` can only read. `Operator` cannot read the list, but the RF short command works for them.
- A reason has revisions with the status `Draft`, `Published`, `Retired`. Only one revision of a code can be `Published`. Only a `Published` revision is used on the floor. A short that names a code with no published revision is refused.
- The reason is **not** a code list value. It is its own record so that actions have typed meaning. Table `pick_short_reason` (header) and `pick_short_reason_action` (one row per action).
- Reasons are frozen into each short: the published revision and its enabled actions are copied into the event that starts the clean-up. Changing a reason later does not change a short that already happened.

## 2. How the operator uses it (RF)

1. On the pick card the operator presses the short key. Screen `PICK10` (`Short Pick`) asks `Found qty`.
2. If serials are required the operator scans them (`PICK07`).
3. Screen `PICK10R` (`Short Reason`) asks `Reason` and `Note`. `Reason` is **typed** (upper-cased by the screen, at most 50 characters on the screen, a code is at most 20). It is not a pick list. The operator must know the codes. The status line says `Enter a published short-reason code`.
4. Screen `PICK10C` (`Confirm Short`): `F4` commits. In a cart the same steps are `PKA26` (`Short`) and `PKA26C` (`Confirm Short`).

The quantity found must be **less than** what the pick still needs. To pick everything the operator uses the normal commit.

Example: the pick asks 100. The operator enters 40, reason `SHORT`. Pick 40 are taken, 60 are the shortage.

## 3. Reason header fields

Menu: `Sidebar > Warehouse Configuration > Reason Codes > Pick Short Reasons`, list columns `Code`, `Revision`, `Status`, `Description`, `Partial`, `Zero`. Buttons `New Revision`, `Refresh`; on the card `Save`, `Publish`, `Retire`.

### `Code` (`code`)

- UI label: `Code` (required). Column `varchar(20)`; the database wants upper case and not empty (`chk_pick_short_reason_code`). The service upper-cases and trims it.
- Default: none. Seed: `SHORT`, `LPN_NOT_FOUND`, `WRONG_LOCATION`.
- What it does: the word the operator types. All revisions of one reason share the code.
- Message when empty: `Enter a reason code first` (screen) or `Pick short reason code cannot be empty` (service).
- Open work: not applicable.

### `Revision` (`revision_no`)

- UI label: `Revision`, read-only. `integer`. The system gives `max + 1` for the code. Seed 1.
- **`New Revision` starts from the published actions.** When the code you type has a published revision, the new draft gets a copy of its actions; `Description`, `Partial` and `Zero` are what you type. A code with nothing published starts with no actions: add at least `ReleaseCurrentRemainder` before you can publish. Through the API, actions sent with the new draft are used instead of the copy (`CreatePickShortReasonDraft`, `PickShortReasonBmc::published_actions`).

### `Status` (`status`)

- UI label: `Status`, read-only. Enum `pick_short_reason_status`: `Draft`, `Published`, `Retired`. Default `Draft`.
- One `Published` revision per code (unique index `uq_pick_short_reason_one_published`).
- Publishing a revision retires the previous published revision of the same code in the same step.

### `Description` (`description`)

- UI label: `Description` (required). `varchar(120)`.
- Message when empty: `Enter a description first`. Stored only otherwise; shown in lists.

### `Allow Partial` (`allow_partial`)

- UI label: `Allow Partial` (list: `Partial`). Checkbox, required. `boolean`, default true.
- What it does: may the operator use this reason when some stock was found (quantity above 0).
- Affects: `wms-outbound/src/picking/commands/short.rs:538-562` (`validate_actual`).
- Refusal text: `invalid Pick commit: selected short reason does not allow partial Pick`.
- Example: `LPN_NOT_FOUND` has it off. The pallet is there or it is not. Entering 40 with that reason is refused.
- Open work: a new revision applies to the next short.

### `Allow Zero` (`allow_zero`)

- UI label: `Allow Zero` (list: `Zero`). Checkbox, required. `boolean`, default true.
- What it does: may the operator use this reason when nothing was found (quantity 0).
- Refusal text: `invalid Pick commit: selected short reason does not allow zero Pick`.
- A zero short needs no pallet or box, proves no source, and takes no goods.

### `Version` (`version`), `Published At`, `Retired At`

- `Version`: `integer`, default 1; protects against two editors. Message: `The reason changed in another session — refresh and try again`.
- `Published At`, `Retired At`: set by `Publish` and `Retire`. Stored only. No code reads them for a decision.

### Rules that apply to every short, whatever the reason

These are in `short.rs` and do not depend on settings.

| Rule | Refusal text |
|---|---|
| Found quantity must be a number from 0 up to, but not including, the quantity still to pick | `invalid Pick commit: short actual quantity must be finite, non-negative and below the remaining quantity` |
| The note has at most 200 characters (the RF field stops at 200 too) | `invalid Pick commit: short note exceeds 200 characters` |
| The reason code has a published revision | `system error: published Pick short reason 'XYZ' does not exist` |
| The published reason passes the action rules of section 5 | `invalid Pick commit: action RelocateResidualToMissing has incompatible configuration: ...` |
| The picker read the pick instructions (only when stock is found) | `Pick task 812 has instructions the picker has not acknowledged` |
| The source is proven (only when stock is found; see `21-picking-policy-settings.md`, section 7) | for example `confirm the source first: location, item` |
| The version of the task is the one the RF read | `version conflict on task 812 (current version 9)` |
| The task is held by the caller and its lease is alive | `task 812 is not assigned to you (currently: Some(1002))`, `task 812 lease has expired; claim the work again` |
| The pick is still `Released` and the order active | `invalid Pick commit: Pick 55 is no longer executable` |
| A discrete short with stock found needs the operator's open pallet | `there is no open pallet for this order — scan a pallet label` |
| A cart pick with stock found needs the position's box; it takes no pallet | `scan the position's box`; `a carrier pick goes into the position's box, not into a DROPID` |
| A box scanned for a pick that is not on a cart | `this pick is not on a carrier — scan a DROPID` |
| A second identical request gives the stored answer | no message; `already_committed` is set |
| A second short with a different outcome | `invalid Pick commit: Pick was already shorted with a different outcome` |

## 4. Action fields

An action is one thing the system may do. A reason has at most one row for each action type (primary key `(reason_revision_id, action)`). The editor message for a repeat is `That action is already configured`.

Columns of `pick_short_reason_action`:

### `Action` (`action`)

- UI label: `Action` (required, dropdown showing the raw enum names).
- Enum `pick_short_action_type`. Values and what they do:

| Value | What the system does | Runs? |
|---|---|---|
| `ReleaseCurrentRemainder` | Gives back the reservation of the part of THIS pick that was not found. Always needed (publish refuses without an enabled one). | Yes, in the short itself (inventory `execute_reserved_short`). |
| `BlockSourceLocation` | Sets the location flag `CycleCountActive` on the source location. Allocation skips it. Dispatch gives no new work from it (`LOCATION_BLOCKED`). Whole location, whatever the `Scope`. | Yes, in the short. |
| `ReleaseRelatedReservations` | Releases the reservations of other picks at the location (inside the `Scope`) that nobody is working on. | Yes, in the background phase. |
| `RelocateResidualToMissing` | Moves the free, unreserved stock left at the location to the `Lost` location of the zone (or to a fixed location). | Yes, in the background phase. |
| `CreateInventoryCount` | Starts a count of the location (or joins the live one). | Yes, in the background phase, after the move. |
| `ReallocateReleasedDemand` | Runs allocation again for the orders that lost reservations. | Yes, in the background phase, last. |
| `HoldInventory` | Would put an inventory hold. | **No. Stored only. It has no effect today.** No code executes it. |
| `HoldContainer` | Would hold the container. | **No. Stored only. It has no effect today.** |
| `RequestSupervisorReview` | Would ask a supervisor to review. | **No. Stored only. It has no effect today.** |

(Verified: a search of non-test code for the three last values finds only their definition.)

### `Enabled` (`enabled`)

- UI label: `Enabled`. Checkbox. `boolean`, default true.
- What it does: a disabled action is dropped when the reason is read at run time. It is not copied into the short event and is not executed. The publish rules also ignore it.

### `Scope` (`scope`)

- UI label: `Scope`. Dropdown. Enum `pick_short_action_scope`: `CurrentPick`, `SameSourceStock`, `CurrentSkuAtLocation`, `EntireLocation`. Null allowed.
- Seeds: `CurrentPick` for `ReleaseCurrentRemainder`; `EntireLocation` for block, release, relocate and reallocate; `CurrentSkuAtLocation` for the count.
- What it does, per action:
  - `ReleaseRelatedReservations`: selects the picks to release. `EntireLocation`: every live pick at the location. `CurrentSkuAtLocation`: same owner and SKU. `SameSourceStock`: same owner, SKU, lot and source container. `CurrentPick` or empty: **no pick is released** (the current pick is already settled).
  - `RelocateResidualToMissing`: **only `EntireLocation` works**. Publish refuses any other value: `action RelocateResidualToMissing has incompatible configuration: residual relocation covers the entire location`. The run-time clean-up still refuses a narrower scope, so a row written around publish would fail there. Fixed in P-06 (commit `52e3757a8`). See section 11, item 1.
  - `CreateInventoryCount`: publish demands `CurrentSkuAtLocation` or `EntireLocation`. At run time the count is always of the whole location. The value is not read after publish. Stored only.
  - Other actions: the value is not read.
- Rule: the scope of `ReleaseRelatedReservations` must be as wide as the scope of `RelocateResidualToMissing` (order: `CurrentPick` < `SameSourceStock` < `CurrentSkuAtLocation` < `EntireLocation`).

### `Required` (`required`)

- UI label: `Required`. Checkbox, required. `boolean`, default false.
- What it does: should make the whole clean-up fail if this action cannot run. In practice it has no effect: the only code that reads it is the count step, and publish refuses `required` on `CreateInventoryCount` (`inventory counting is not implemented and cannot be required`). Seeds carry `true` on four actions; it changes nothing.
- Stored only. It has no effect today.

### `Target Mode` (`target_mode`) and `Fixed Location` (`fixed_location`)

- Labels: `Target Mode`, `Fixed Location` (the second shows only when the first is `FixedLocation`).
- Enum `pick_short_target_mode`: `ZoneMissingToLoc`, `FixedLocation`. `fixed_location` is `varchar(20)`, foreign key to `location`. The database check `chk_pick_short_fixed_target` wants a location exactly when the mode is `FixedLocation`.
- Used only by `RelocateResidualToMissing`.
  - `ZoneMissingToLoc`: the field `Missing To Location` of the putaway zone of the source location (`PutawayZoneBmc::missing_toloc_for_location`). Default `LOST`. If the zone has none: `source location <code> has no zone missing location`.
  - `FixedLocation`: the named location. Publish message if it is empty: `action RelocateResidualToMissing has incompatible configuration: FixedLocation requires a location code`.
- A relocate row without a mode: `... residual relocation requires a target mode`.
- Example: zone `RACK` has `Missing To Location` = `LOST-A`. The residual of `A-01-01` goes to `LOST-A`.

### `Trigger After` (`trigger_after`)

- UI label: `Trigger After`. Enum `pick_short_trigger_after`: `AfterReservationRelease`, `AfterResidualRelocation`, `AfterCountCompletion`.
- Publish rules: `AfterCountCompletion` is refused (`nothing may wait for the unimplemented counting capability`). `AfterResidualRelocation` needs an enabled `RelocateResidualToMissing`.
- At run time it is not read. The order of the steps is fixed in code (section 6). Stored only after publish validation. It has no effect on the order.

### `Order Scope` (`order_scope`)

- UI label: `Order Scope`. Enum `pick_short_order_scope`: `CurrentOrder`, `OrdersWithReleasedReservations`, `CurrentAndAffectedOrders`.
- Used only by `ReallocateReleasedDemand`:
  - `CurrentOrder`: only the order of the shorted pick.
  - `OrdersWithReleasedReservations`: only orders that lost a reservation in the release step.
  - `CurrentAndAffectedOrders` (or empty): both.
- Example: SHORT on order `SO-1`. The release step freed a pick of `SO-2`. With `CurrentAndAffectedOrders` both orders are allocated again.

### `Supervisor Review` (`supervisor_review`)

- UI label: `Supervisor Review`. Checkbox, required. `boolean`, default false.
- No code reads it. No review step exists. Seeds have it on for `ReallocateReleasedDemand`.
- Stored only after publish. It has no effect today.

## 5. Rules checked when you publish

`Publish` runs the same rules the floor uses. Messages:

| Message | Cause |
|---|---|
| `Pick short reason 'CODE' must release the current remainder` | No enabled `ReleaseCurrentRemainder`. |
| `action RelocateResidualToMissing has incompatible configuration: residual relocation requires a source-location block` | Relocate without `BlockSourceLocation`. |
| `... residual relocation requires related-reservation release` | Relocate without `ReleaseRelatedReservations`. |
| `action ReleaseRelatedReservations has incompatible configuration: reservation-release scope must cover relocation scope` | Release narrower than relocate. |
| `... residual relocation requires a target mode` | No `Target Mode`. |
| `... residual relocation covers the entire location` | Relocate with a `Scope` other than `EntireLocation`. |
| `action CreateInventoryCount has incompatible configuration: inventory counting is not implemented and cannot be required` | `Required` on the count (the text is out of date; the count runs). |
| `... count scope must be current SKU at location or entire location` | Wrong count scope. |
| `... nothing may wait for the unimplemented counting capability` | `AfterCountCompletion`. |
| `... AfterResidualRelocation requires the relocation action` | `AfterResidualRelocation` without relocate. |
| `... FixedLocation requires a location code` | No location. |
| `action ReallocateReleasedDemand has incompatible configuration: reallocation requires related-reservation release` | Reallocate without release. |
| `Pick short reason 'CODE' is not an editable draft` | Publishing a non-draft. |

Other messages of the editor: `Published and retired reason revisions are immutable`, `Pick short reason 'CODE' revision N is immutable in status Published`, `Pick short action ReleaseCurrentRemainder is configured more than once`, `Save the reason before adding actions`, `Choose an action first`, `Action saved`, `Action deleted`, `Reason published`, `Reason retired`, `Draft created`, `Draft saved`.

Retire has no guard. If you retire the only published revision of `SHORT`, every short with `SHORT` is refused until you publish another one.

## 6. What runs after a short, in order

### 6.1 In the short itself

1. The found quantity moves to the pallet (discrete) or the box (cart). A zero short moves nothing.
2. The part not found is released from this pick's reservation (`ReleaseCurrentRemainder`).
3. The pick becomes `Shorted`; the line and order statuses are recalculated.
4. If `BlockSourceLocation` is enabled, the location gets the flag `CycleCountActive`. This stops new picks from it and allocation from drawing on it. A pick of another operator that is already in work can still be finished there.
5. The task becomes `Shorted` with the reason code and the note.
6. The event `process.pick.discrepancy_remediation_requested` is written with a copy of the reason and its enabled actions.

Nothing in 1 to 6 happens if any rule fails: the whole short rolls back.

### 6.2 In the background

The event is delivered to the internal subscriber `quark_outbound_execution`. It has 3 attempts, with a wait of 15 seconds that doubles. After the third failure the delivery is `failed`; the metric `failed_event_delivery` of the view `pick_cutover_gate` counts it. Each step is repeat-safe.

| Step | Action | Detail |
|---|---|---|
| a | Locks | The source location and the `Lost` destination, in one call. |
| b | `ReleaseRelatedReservations` | Of the live picks the `Scope` selects, only those nobody works on are released: the task is `Created` with nothing done, or there is no task, and nothing is picked. A pick whose task is claimed or in progress is **kept**: pick, task and reservation stay. Its operator finishes at the blocked location (commit what he finds, or short). |
| c | `RelocateResidualToMissing` | Moves the free residual to `Lost` or the fixed location. The part reserved for kept picks stays. |
| d | `CreateInventoryCount` (after the above has committed) | Starts a count of the whole location. See section 8. |
| e | `ReallocateReleasedDemand` | For each order the `Order Scope` names, allocation runs again. The blocked location is skipped, so stock is drawn elsewhere. |

If a step fails, the worker repeats. Steps already done replay without doing twice.

## 7. The three seeded reasons

Seeds: `wms-lib-sql/sql/wms-app/migrations/036_pick_short_reason.sql` (`SHORT`) and `071_count_on_scan_and_putaway_exceptions.sql` (the other two). All are revision 1, `Published`.

| Code | Description | `Allow Partial` | `Allow Zero` |
|---|---|---|---|
| `SHORT` | `Physical stock is below the system quantity` | on | on |
| `LPN_NOT_FOUND` | `The pallet the pick names is not in the location` | **off** | on |
| `WRONG_LOCATION` | `The stock the pick names is not where the system says` | on | on |

All three have the same six actions:

| Action | Enabled | Scope | Required | Other fields |
|---|---|---|---|---|
| `ReleaseCurrentRemainder` | yes | `CurrentPick` | yes | |
| `BlockSourceLocation` | yes | `EntireLocation` | yes | |
| `ReleaseRelatedReservations` | yes | `EntireLocation` | yes | |
| `RelocateResidualToMissing` | yes | `EntireLocation` | yes | `Target Mode` `ZoneMissingToLoc`; `Trigger After` `AfterReservationRelease` |
| `ReallocateReleasedDemand` | yes | `EntireLocation` | yes | `Trigger After` `AfterResidualRelocation`; `Order Scope` `CurrentAndAffectedOrders`; `Supervisor Review` yes |
| `CreateInventoryCount` | yes | `CurrentSkuAtLocation` | **no** | `Trigger After` `AfterResidualRelocation` |

What each code causes:

| Effect | `SHORT` | `LPN_NOT_FOUND` | `WRONG_LOCATION` |
|---|---|---|---|
| Replenishment | None (there is no replenishment in this version). | None. | None. |
| Cycle-count trigger | Yes: an Event count of the location, source `ShortPick:SHORT`. | Yes: source `ShortPick:LPN_NOT_FOUND`. | Yes: source `ShortPick:WRONG_LOCATION`. |
| Hold | No inventory hold. The location is **blocked** by the flag `CycleCountActive`. The count lifts it. | Same. | Same. |
| Re-allocation | Yes, for the current order and the orders that lost a reservation. | Same. | Same. |
| Free residual stock | Moved to the zone `Lost` location. | Same. | Same. |
| Partial quantity allowed | Yes. | **No.** | Yes. |
| Zero allowed | Yes. | Yes. | Yes. |

The meaning of the reason codes is the operator's story, not a different treatment:

- `SHORT`: stock is there but less than the system says.
- `LPN_NOT_FOUND`: the reserved pallet is not in the location. A pallet is there or not, so no partial quantity.
- `WRONG_LOCATION`: the stock is somewhere else. The system does not move it back. It blocks, counts and re-reserves. A scan of a wrong pallet is refused and rolled back without a record. The operator who cannot take the stock reports it with one of these reasons.

## 8. The count a short asks for

- The step builds an Event count: type `Event`, mode `Blind`, freeze `Soft` when the short blocked the location (the reason has `BlockSourceLocation`) and `Hard` when it did not, recount by another counter on, `max_recounts` 2, Task Manager priority 10 (counted before planned counts, which have 50). Source `ShortPick:<CODE>`, source id the pick.
- Why `Soft` when the short blocked the location (ruling D11): the short's own block is what freezes the location, and a pick another operator already had in work is still finished there (section 6.1, step 4). That pick takes stock out of the location while it is being counted. A `Soft` count expects the snapshot plus what moved after it, so the finished pick is a known movement, not a missing quantity. With `Hard` it showed as a variance that could not be accepted, and the location stayed frozen until a recount.
- `Soft` takes the moment the counter completes as the moment he counted. A kept pick that commits after the counter has entered the stock but before he completes still shows as a variance (stock found). Recount it.
- Without `BlockSourceLocation` the count is `Hard`: nothing but the count freezes the location, and a `Soft` count would freeze nothing.
- If a live count already covers the location, the short joins it (`joined`).
- The location is already blocked by the short. The count clears that flag when it matches, when its variance is accepted, or when it is cancelled.
- A refusal does not fail the clean-up, because the count is not `Required`. The result is stored as `Refused` with the reason (for example `COUNT_LOCATION_BUSY`). The location then **stays blocked** until a supervisor counts it by hand.
- An operator needs a `Count` right in the area (`22-work-areas-equipment-and-permissions.md`, section 6) to take the count. See `24-inventory-count-policy.md`.

## 9. Examples with numbers

### Example 1: SHORT, one order

`A-01-01` holds 100 of SKU `S1` in lot `L1`, loose. Order `SO-1` reserved 100 (pick 55). The operator finds 40 and shorts with `SHORT`.

1. 40 go to the pallet. 60 of the reservation are released. Pick 55 is `Shorted`, picked 40.
2. `A-01-01` is blocked.
3. The system still shows 60 on hand there, free (no reservation). Step c moves 60 to `LOST` of the zone.
4. A count of `A-01-01` is requested (source `ShortPick:SHORT`).
5. Allocation runs again for `SO-1`. It needs 60 more. It draws from `A-02-01`. If there is not enough, what it found stays reserved and the order stays short; the clean-up still completes.

### Example 2: another operator is already in the location

Same location. Order `SO-2` has pick 56 for 30. Operator Anna holds its task and has scanned the location. Pick 56 is **kept**: not released, not moved. When Anna finds nothing and shorts with 0, her short repeats the clean-up and the 30 reserved go to `LOST`. If Anna has not started (task `Created`, nothing done), pick 56 is released and `SO-2` is allocated again from other stock.

### Example 3: LPN_NOT_FOUND

Pick asks pallet `LPN0007`. Not there. The operator enters found quantity 0, reason `LPN_NOT_FOUND`. All goes as in example 1 with found = 0. If the operator enters 20: `invalid Pick commit: selected short reason does not allow partial Pick`.

## 10. What happens to open work when you change a reason

| Change | Effect |
|---|---|
| Edit a draft | None. |
| Publish a new revision | Takes effect for the next short. Shorts already made keep their copy; their clean-up uses the old actions even if it repeats. |
| Retire the published revision | The next short with that code is refused until another revision is published. Clean-ups already queued still run (they carry their own copy). |
| Change `Allow Partial` / `Allow Zero` | Next short. |
| Change `Missing To Location` of a zone (`Putaway Zones`) | Next clean-up that moves residual. A clean-up already running uses the value it reads when it runs. |

## 11. Inconsistencies found

1. ~~A published reason can break every short that uses it.~~ Fixed (P-06, commit `52e3757a8`). Publish now refuses `RelocateResidualToMissing` with a `Scope` other than `EntireLocation`, so the clean-up can no longer meet one.
2. The editor helper text and the publish message still say counting "is not implemented", and `picking/README.md` says the count is "unexecuted in MVP". The count runs.
3. Fixed (P-07, commit `356109c80`). The RF `Note` field used to allow 500 characters while the server allows 200. `PICK10R` revision 2 and `PKA26` revision 2 stop at 200 (`rf-screens/113_rf_inputs_fit_the_server_limits.sql`).
4. `Required`, `Trigger After`, `Supervisor Review` and the actions `HoldInventory`, `HoldContainer`, `RequestSupervisorReview` look like settings but change nothing (section 4).
5. The existing guide `06-outbound-setup.md` lists `SUPERVISOR` as a writer of reasons. The code allows `Admin` and `Manager` only.
6. Fixed (P-21). `New Revision` copies the actions of the published revision.
