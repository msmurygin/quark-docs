---
title: "Administrator Guide - Inventory Count Policy and Count Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-14
---

# Inventory Count Policy and Count Settings

This page lists every setting that decides **when a location is counted, how it is counted, and what happens to the difference**.

Paths in the "Affects" lines are relative to `crates/libs/` unless they start with another crate name.

## 1. How counting works in one page

- A **count** has one **task per location**. Each task is one location, one attempt.
- The count never changes stock. It records what is there. An accepted difference becomes an **inventory adjustment**, and the adjustment changes the stock.
- A location in a count is **frozen** (the location flag `CycleCountActive`) when the freeze is `Hard`. Movement, allocation, putaway and pick dispatch respect the freeze.
- Every task is also a **Task Manager task of type `Count`**. An operator needs a `Count` right in a work area (`22-work-areas-equipment-and-permissions.md`, section 6) to take it.
- Count types: `Full`, `Cycle`, `Selective`, `Event`. By hand you can start only `Selective`. A `Cycle` count comes from a policy. An `Event` count comes from an event (section 3). Any other try: `a Cycle count is made by its policy or event, not started by hand`.
- Status of a task: `Open` (being counted), `Variance` (counted, a difference waits for a decision), `Closed` (matched, or the difference was adjusted), `Recounted` (replaced by a new attempt), `Cancelled`.
- Status of a count: `Open`, `Closed`, `Cancelled`.

The RF path: `Inventory` menu, `Count Location`. Screens: `Count — Work Area` (scan the work area, or press Enter for the whole warehouse), `Count — Next Location`, `Count — Go To Location` ("Go to the location and scan it"), `Count — Finish` (`1 = Done, 2 = Empty, 3 = Leave`), `Counted`. A supervisor decides differences on the web: `Sidebar > Inventory Balances > Inventory Counts` (buttons `Accept Variance`, `Recount`, `Cancel Count`). `Accept Variance` asks why the count differs (section 6b).

## 2. Count triggers (what starts a count)

| # | Trigger | Switch | Where you set it | Source value on the count | Count type |
|---|---|---|---|---|---|
| 1 | A cycle policy finds locations due | the policy | `Sidebar > Policy > Cycle Count Policies` (section 4) | `Schedule` + the policy id | `Cycle` |
| 2 | A supervisor starts a count | none | `Sidebar > Inventory Balances > Inventory Counts > New` (section 5) | `User` | `Selective` |
| 3 | A short pick, when the reason has the action `CreateInventoryCount` | the reason | `Sidebar > Policy > Pick Short Reasons` (`23-pick-short-reasons.md`) | `ShortPick:<reason code>` | `Event` |
| 4 | A full pick empties its source location | `On an Emptied Location` = `Count` | `Sidebar > Policy > Picking Policies` (`21-picking-policy-settings.md`, section 6) | `PickToZero` | `Event` |
| 4a | The picker answers "is it empty?" against the stock (said not empty where nothing is, or empty where stock is) | `On an Emptied Location` = `Confirm` | the same | `ZeroConfirmation` | `Event` |
| 5 | A posted adjustment whose reason says "count after posting" | `Count After Posting` | `Sidebar > Inventory Balances > Adjustment Reasons` (section 6) | `Adjustment` | `Event` |
| 6 | A directed putaway landed through an acknowledged deviation | `COUNT_ON_PUTAWAY_DEVIATION` | `Sidebar > System Settings` (section 7) | `PutawayDeviation` | `Event` |
| 7 | An order is cancelled while one of its picks had its source confirmed (location, item, LPN or lot scanned) | `COUNT_ON_PICK_CANCELLED` | `Sidebar > System Settings` (section 7a) | `PickCancelled` | `Event` |
| 8 | An operator reports stock the system does not show (RF `Report Unexpected Stock`, or `F6` on an empty Stock Inquiry) | none — always | — | `UnexpectedInventory` | `Event` |

How the event triggers work (3 to 8): the transaction that causes them writes the event `process.inventory.count_requested` into the outbox. It does not start the count. A background subscriber starts the count after the first transaction has committed (`wms-inventory/src/service/inventory_count/request_location.rs`). So a rolled-back pick, adjustment or putaway asks for nothing.

Rules of an event count (`request_location.rs:96-135`):

- It counts **one location**.
- If a live task (`Open` or `Variance`) already counts the location, the request **joins** it. Nothing new is made.
- Mode `Blind`, freeze `Hard`, recount by another counter, 2 recounts per location. A pick short asks for a `Soft` count instead, but only when the short blocked the location (the reason has `BlockSourceLocation`); without that block its count stays `Hard` (`23-pick-short-reasons.md`, section 8).
- Task Manager priority 10. Planned counts have the default 50. Smaller is sooner.
- A location the count rules refuse (see sections 3 and 5) is an answer, not a failure. The event is done and is not retried. Examples: `COUNT_LOCATION_NEVER_COUNTED`, `COUNT_LOCATION_NOT_COUNTABLE`.

## 3. Rules that are not settings

These are fixed in code. There is nothing to switch.

1. **What a difference is.** Any difference larger than 0.000000001 per line is a difference (`classify` at the end of `reconcile_moving`). A count with no difference closes by itself and unfreezes the location. A small difference can be **accepted on its own** when the tolerances allow it (section 6a). Without tolerances every difference waits for a supervisor.
2. **A line is one identity**: owner, SKU, pack, unit of measure, lot and container. Moving stock between two pallets at one location shows as two differences.
3. **Result types** per identity: `Match`, `QtyVariance` (both sides have stock, quantities differ), `ExpectedButMissing` (the system had stock, the counter saw none), `UnexpectedFound` (the counter saw stock the system did not have).
4. **Zero is not counted.** The counter cannot enter a quantity of 0. "Nothing here" is the button `2 = Empty` (`confirm empty`). A location with no entries and no empty confirmation cannot be finished: `nothing was counted in A-01-01: record what is there, or confirm that it is empty`.
5. **Never counted types:** `InTransit` (open pick pallets) and `Lost` (lost stock). A policy or a count that names them is refused: `location type InTransit is never counted`, `never counted (lost stock or open pick pallets): INTRANSIT`.
6. **Who decides a difference:** `Accept Variance`, `Recount` and `Cancel Count` are for the roles `Admin`, `Manager`, `Supervisor` (`app-server/src/web/rpcs/inventory_count_rpc.rs`, the role list at the top). Counting itself (take, observe, complete, empty, leave) is also open to `Operator`. Reading counts and policies: `Admin`, `Manager`, `Supervisor`, `Viewer`.
7. **Approval.** Accepting a difference makes an adjustment with the reason `COUNT_VARIANCE` and posts it in the same step. That reason needs no approval and no comment (section 6). If someone changed it to need approval, the accept is refused: `the COUNT_VARIANCE reason asks for approval, which a count cannot give; adjust this variance by hand`.
8. **The accept can fail on reservations.** If the counted quantity is below what is reserved or picked at that balance: `balance 4412: the target is below what is reserved (allocated 5, picked 0)`. Nothing is written. Release the reservation or recount.
9. **The accept can fail on moved stock** (Hard freeze): `the stock changed since it was counted (counted against 40, holds 38 now): count it again`. The task stays in `Variance`. Press `Recount`.
10. Fixed Task Manager priority of an event count: 10.

## 4. Cycle count policy

Menu path: `Sidebar > Policy > Cycle Count Policies`. Table `inventory_count_policy` (wms-app 058, 073). A policy says which locations, or which SKUs, are counted how often. A daily run turns what is due into one ordinary count. The field `Basis` decides which: `Locations` (the policy narrows by zone, type, ABC and aisle of the locations) or `Items` (it narrows by the ABC class and group of the SKUs, and counts each SKU wherever it lies).

- Roles that change: `Admin`, `Manager`, `Supervisor`. Read: `Admin`, `Manager`, `Supervisor`, `Viewer`.
- Buttons: list `New`, `Refresh`; card `Save`, `Run Now`, `Delete`, `Back`.
- Seed: none. No policy exists at the start and no dev seed makes one.
- A save that is stale: `version conflict on inventory_count_policy 7` (code 40, the number is the policy id). Reload.

### `Code` (`code`)

- UI label: `Code`. Read-only: the system gives a number with the prefix `CC` and 4 digits when you press `New` (counter key `inventory_count_policy`, wms-meta-ui 098).
- Column: `varchar(30)`, unique, not null. The service refuses an empty code (`a policy needs a code`) and one over 30 characters (`the code is at most 30 characters`).
- Duplicate: `another policy is already called CC0007`.
- To verify the exact form of the generated code: press `New` on `Cycle Count Policies` and read the `Code` field. The code reads `CC` plus a counter (counter key `inventory_count_policy`, size 4).
- What it does: the name. It is written in the comment of every count the policy makes.

### `Description` (`description`)

- UI label: `Description`. `varchar(200)`, null allowed. Message: `the description is at most 200 characters`. Stored only (shown in lists and comments).

### `Active` (`is_active`)

- UI label: `Active`. Checkbox. `boolean`, not null, default true.
- What it does: the scheduler runs only active policies. `Run Now` runs only an active, saved policy: `Only an active, saved policy runs` (button reason) and `policy CC0007 is not active: activate it to run it` (service).
- Open work: counts already made go on. Making a policy inactive does not cancel them.

### `Basis` (`basis`)

- UI label: `Basis`. Dropdown. Enum `inventory_count_policy_basis`: `Locations` (default), `Items` (`Items — SKUs, wherever they lie`). Helper text: `Locations: the locations matching the zone, type, ABC and aisle below. Items: the SKUs of the class and group beside, counted wherever they lie.`
- What it does: decides what the run looks for (`InventoryCountPolicyBasis`, `wms-lib-core/src/model/inventory/inventory_count_policy.rs`; `service/inventory_count_policy/run.rs`). A policy names the properties of its own basis only. Mixing them is refused: `a policy counts locations or items, not both: name the properties of its basis only` (code `COUNT_POLICY_MIXED_SCOPE`). The database check `chk_inventory_count_policy_scope` repeats the rule (wms-app 092).
- Open work: none. New policies start with `Locations`.

### `SKU ABC` (`sku_abc`) and `SKU group` (`sku_group`)

- UI labels: `SKU ABC` (dropdown `A`, `B`, `C`) and `SKU group` (text). Columns: `sku_abc` (enum `abc_speed_type`), `sku_group varchar(10)`. Used only when `Basis` is `Items`.
- Helper texts: `Items: the SKUs of this ABC class. A SKU with no class set is B.` and `Items: the SKUs of this group.` A SKU group longer than 10 characters is refused (`COUNT_INVALID_INPUT`).
- **At least one must be set** for an `Items` policy. Refusal: `a policy over items narrows by the SKUs' ABC class or group: one over every SKU is a full inventory` (code `COUNT_POLICY_WITHOUT_ITEM_SCOPE`). When both are set, a SKU must match both.
- Example: `Basis` = `Items`, `SKU ABC` = `A`, `Every (days)` = 30, `Locations per Run` = 20. Every run counts up to 20 SKUs of class A that have not been counted for 30 days.
- A SKU is **due** when it is active, matches the class and group, holds stock (quantity above 0) in a location that a count may count, is named by no open count, and has not been counted within `Every (days)` (`InventoryCountPolicyBmc::due_skus`). "Counted" means that a **closed count by item named the SKU code** and did not narrow by lot or LPN. A count of a whole location does not count the SKU. The due SKUs are sorted: never counted first, then the longest uncounted, then by code; the first `Locations per Run` are taken. One code across owners is one item.
- The list of policies shows `Basis` and `SKU ABC` as columns.

### `Zone` (`putawayzone`), `Location Type` (`loc_type`), `ABC` (`abc`), `Aisle` (`aisle`)

- Used only when `Basis` is `Locations`. UI labels: `Zone` (popup picker, free entry allowed), `Location Type` (dropdown), `ABC` (dropdown), `Aisle` (text).
- Columns: `putawayzone varchar(20)`, `loc_type` (enum `loc_type`), `abc` (enum `abc_speed_type`: `A`, `B`, `C`), `aisle varchar(10)`. All null allowed. Messages for length: `the putaway zone is at most 20 characters`, `the aisle is at most 10 characters`.
- The dropdown for `Location Type` offers only `Case`, `Pick`, `SpeedPick`, `Other`, `Pnd`, `Pickto`, `Sort`. The API accepts any type except `InTransit` and `Lost`.
- What they do: the **scope**. A location is in scope when it matches **every** property that is set (AND). Helper text: `Count only locations matching every property set here — at least one.`
- **At least one must be set** on a `Locations` policy. A policy over every location would be a full inventory. Refusal: `a policy narrows by at least one location property (zone, type, ABC, aisle): one over every location is a full inventory` (code `COUNT_POLICY_WITHOUT_SCOPE`; database check `chk_inventory_count_policy_scope`).
- Affects: `wms-lib-core/src/model/inventory/inventory_count_policy.rs` (`due_locations`).
- Example: `Zone` = `RACK`, `ABC` = `A`. Only locations of zone `RACK` with the ABC class `A` are considered.
- Open work: none. The scope is read at each run.

### `Every (days)` (`frequency_days`)

- UI label: `Every (days)` (required). `integer`, not null. Check 1 to 3650 (`chk_inventory_count_policy_frequency`).
- Message: `a location is counted every 1 to 3650 days, not 0`.
- What it does: a location counted within this many days is not due. The last count is the newest task of that location with a count time that is not `Cancelled` (a task waiting in `Variance` counts as counted).
- Helper text: `A location counted within this many days is not due.`
- Example: `Every (days)` = 14. Location `A-01-01` was counted 10 days ago: not due. 15 days ago: due.
- Never counted locations are due first.

### `Locations per Run` (`daily_limit`)

- UI label: `Locations per Run` (required). `integer`, not null. Check 1 to 10000.
- Message: `a run counts 1 to 10000 locations, not 0`.
- What it does: the most locations in one run (one count). On an `Items` policy it is the most **SKUs** in one run. The due locations are sorted: never counted first, then the longest uncounted, then by code. The first N are taken.
- Example: 120 locations are due and the limit is 50. Today's count has 50. Tomorrow's run takes the next ones, because the first 50 are now counted.

### `Mode` (`count_mode`)

- UI label: `Mode` (required). Dropdown. Enum `inventory_count_mode`:
  - `Blind` (`Blind — the counter does not see the system quantity`). Default.
  - `Informed` (`Informed — the counter sees it`).
- What it does: with `Blind` the system hides the expected quantities from the counter while the task is `Open` (`service/inventory_count/mod.rs`). With `Informed` the task answer carries `system_stock` on the **first** attempt while the task is counted: the location's stock now, line by line (SKU, lot, LPN, quantity), a soft count's changes since the snapshot included, and for a count by item only the item. A recount is blind whatever the mode. The RF screen `CNT02` shows it in the line `System` (inventory count spec section 8; `rf-screens/114_uc_inv_count_informed.sql`).
- Interaction: the counts the policy makes copy it. A manual count has its own `Mode`.
- Open work: only counts made after the change.

### `Freeze` (`freeze_mode`)

- UI label: `Freeze`. Dropdown. Enum `inventory_count_freeze`: `Hard` (`Hard — the locations are frozen while they are counted`), `Soft` (`Soft — stock keeps moving; what moved after the snapshot is expected`). Default `Hard`. Helper text: `For the counts this policy makes.`
- What `Hard` does: the location is frozen from the start until the task closes. Nobody can move, allocate or pick there. The expected quantity is the snapshot taken at the start.
- What `Soft` does: nothing is frozen. The expected quantity is the snapshot **plus** the stock changes committed after the snapshot and before the count was completed (the location journal `location_stock_effect`). A pick made after the snapshot is not a difference. On accept, the lines are `target = holds now + (counted − expected)`.
- A `Soft` count starts only at a location a frozen one could freeze: the location must be `Ok` and have no other flag. `COUNT_LOCATION_NOT_COUNTABLE` otherwise.
- Refusal for soft: `more stock left A-01-01 after it was counted than the count found there: recount it`.
- The journal rows are kept 30 days, except for locations a live count task still covers.
- Example: snapshot 100. Pick 30 later. Counter finds 70. `Hard` would never allow the pick. `Soft` expects 100 − 30 = 70: match.
- Open work: only counts made after the change.

### `Trust Empty Confirmations` (`trust_empty_confirmation`)

- UI label: `Trust Empty Confirmations`. Checkbox. `boolean`, not null, default `false` (wms-app 112). Count spec Appendix L.6.
- What it does: a location a picker confirmed empty after a pick (`On an Emptied Location` = `Confirm` on the picking policy, answer `1 = Yes` while the stock held nothing — `location_evidence`, kind `ConfirmedEmpty`) counts as checked at that moment. The location is due `Every (days)` after the **later** of its last count and its last confirmation. A count after the confirmation is newer, so it wins.
- Only a `Locations` policy reads it. On an `Items` policy the server stores `false`.
- Affects: `InventoryCountPolicyBmc::due_locations`.
- Example: `Every (days)` = 30. `A-01-01` was counted 40 days ago, and a picker confirmed it empty 3 days ago. Off: due today. On: due in 27 days.
- Not trusted: an answer that contradicted the stock (`DeniedEmpty`, `EmptyAgainstStock`) — that one asked for a count instead.

### `Recounts per Location` (`max_recounts`)

- UI label: `Recounts per Location`. `smallint`, not null, default 2. Check 0 to 9 (`chk_inventory_count_policy_max_recounts`).
- Message: `recounts per location are 0 to 9, not 10`.
- What it does: how many times a location with a difference may be counted again. Attempt 1 is the count; each recount is one more attempt. With 2: attempt 1 blind, attempt 2 by another counter, attempt 3 the last. 0 means no recount. After the limit: `A-01-01 has been recounted 2 time(s), the most this count allows: accept the variance or cancel the count`.
- Affects: `domain/inventory_count/aggregate.rs` (`ensure_recount_allowed`).
- Open work: counts already made keep the limit they were made with.

### `Last Run` (`last_run_on`)

- UI label: `Last Run`. Read-only. `date`, null.
- What it does: the scheduler runs a policy at most once a day. A run (also `Run Now`) writes the day. A run does not change `version`.
- Affects: `domain/inventory_count_policy/aggregate.rs` (`runs_on`). The day is the **warehouse day**: the date in the warehouse's time zone, the system setting `WAREHOUSE_TIMEZONE` of that warehouse (an IANA name such as `Europe/Sofia`, seed `UTC`; `SystemSettingsBmc::warehouse_today`). The IANA zone supplies its daylight-saving rules, so the boundary stays local midnight when the UTC offset changes. A blank value uses `Default Value`; a missing row uses UTC; an unknown name is refused (see `42-system-settings.md`).
- Example: the policy ran today and found nothing due. It will not run again before the warehouse's midnight. `Run Now` still works.

### `Version` (`version`)

- UI label: hidden on the card. `integer`, default 1. Moves on save. Protects from two editors.

### Scheduler and `Run Now`

- The scheduler loop runs when the service starts and then every hour (`COUNT_POLICY_INTERVAL` in `cleanup_tasks.rs`). A new or re-activated policy runs within one hour. Several servers do not run one policy twice a day: a run locks the policy and skips it if it already ran on the warehouse day.
- Each policy runs in its own transaction. If one fails (for example somebody froze a location between the read and the freeze), its day is not written and it tries again next hour.
- `Run Now` runs one policy. It does not ask whether the policy already ran today. The message is `Count CNT-000012 started for 50 location(s) due under policy CC0007` or `Nothing is due under policy CC0007`. A failure is `The policy did not run: {error}`.
- A run makes one count: type `Cycle`, source `Schedule`, source id the policy id, the policy's mode, freeze and recount limit, recount by another counter on, comment `Cycle count by policy CC0007 (every 14 days)`. For an `Items` policy the count is a **count by item** (`Scope` = `Only the item`): its `SKUs` are the due SKUs, and its locations are the countable locations that hold them. Locations that another count already holds are left out. The message is `Count CNT-000012 started for 5 item(s) due under policy CC0007, in 8 location(s)`. If nothing can be taken, no count and no number are made: `Nothing is due under policy CC0007`.
- A location is due when it is `Ok`, has no operation flag (`loc_flag` = `None`), is not of a never-counted type, has no live count task, is in scope, and was not counted within `Every (days)`.
- Delete: button `Delete`, message `Policy CC0007 deleted`. The counts it made stay.
- Existing counts and tasks are never changed by editing or deleting a policy.

## 5. Settings of one count (manual or from API)

On `Sidebar > Inventory Balances > Inventory Counts`. Table `inventory_count`. The card shows `Number`, `Status`, `Mode`, `Freeze`, `Locations`, `Comment`, `Recounts per Location`, and read-only `Type`, `Source`, counters and dates. After the count starts, you do not edit what you typed.

| Field | Column | Values and default | What it does |
|---|---|---|---|
| `Locations` | tasks | codes separated by commas, semicolons or spaces | The locations. Helper: `Location codes, separated by commas or spaces. Saving freezes them for the count.` |
| `Scope` | `scope_mode` | `Whole location` = `LocationFull` (default), `Only the item` = `IdentitySubset` | What a counter counts in a location. `Only the item` needs an item. |
| `SKUs`, `Lots`, `LPNs` | `item_skus`, `item_lots`, `item_containers` | lists | The item of a **count by item**. An identity is in the item when it matches every list that is named. Every location that holds the item is added when the count is saved; busy ones are left out. Allowed on a `Selective` or a `Cycle` count only: `only a selective or a cycle count is counted by item`. If nothing countable holds the item: `COUNT_SCOPE_EMPTY`. A counter's entry for anything else is refused (`COUNT_OUTSIDE_ITEMS`). See the reference page `reference/inventory/27-count-header.md`. |
| `Mode` | `count_mode` | `Blind` (default), `Informed` | As in section 4. |
| `Freeze` | `freeze_mode` | `Hard` (default), `Soft` | As in section 4. |
| `Recounts per Location` | `max_recounts smallint` | 0 to 9, default 2 | Message `recounts per location are 0 to 9, not 12`. |
| `Comment` | `comment varchar(500)` | text | `a comment is at most 500 characters`. |
| (API only) `recount_by_other_counter` | `boolean` | default true | A recount is counted by somebody other than the counter of the attempt before it. Refusal: `a recount of A-01-01 is counted by somebody other than the first counter`. The web card always uses true; the policy always uses true. |
| `Number` | `count_number varchar(20)` | system number; `a count number is at most 20 characters` | |

Other refusals when you start or edit a count:

| Message | Cause |
|---|---|
| `a count needs at least one location` | The list is empty. |
| `cannot be frozen for a count (unknown, blocked or under another operation): A-01-01` | The location does not exist, is not `Ok`, or has another flag. |
| `already being counted: A-01-01` | A live task counts it (`COUNT_LOCATION_BUSY`). |
| `nothing can be counted in ZONE-X: every location is blocked or already being counted` | Add by zone found nothing. |
| `already in this count: A-01-01` | Added twice. |
| `A-01-01 has been counted: it stays in the count — accept, recount or cancel` | Remove of a counted location. |
| `count CNT-000012 has been counted: it is cancelled, not deleted` | Delete of a count with counted tasks. |
| `the count is Closed, not open` | A command on a closed count. |
| `the count of A-01-01 is Closed: it is not being counted` | Observation after the task closed. |
| `A-01-01 is not given to you: take your next location` | The counter does not hold the task. |
| `A-01-01 is being counted by anna` | Another counter holds it. |
| `nothing to count` / `nothing to count in area PICK-A` | The pool is empty for the counter. |
| `no work area ZZ` | Unknown area scanned. |
| `quantity 0 is not a positive number` | A zero observation. |
| `SKU X1 does not exist for this owner`, `SKU X1 belongs to several owners: name the owner`, `no owner O1`, `no container C1`, `lot L9 is not a lot of X1: F2 on Lot finds a lot by its attributes`, `SKU X1 has no default unit: name the unit` | The counter's entry does not resolve. |

## 6. Adjustment reasons (what the difference becomes)

Menu path: `Sidebar > Inventory Balances > Adjustment Reasons`. This is the list of reasons of inventory adjustments (code list `inv_adjust_reason`, id 1031). The list columns are `Code`, `Reason`, `Active`, `Adds Stock`, `Removes Stock`, `Comment Required`, `Approval Required`, `Count After Posting`.

An accepted count difference uses the reason **`COUNT_VARIANCE`** (`service/inventory_count/accept.rs`). The adjustment has source `InventoryCount`. Each line: `target quantity` = what was counted, `expected quantity` = the snapshot. The adjustment is validated and posted in the same step. A count never asks the adjustment for approval.

Seeded reasons (wms-app 053, 054):

| Code | Reason | Adds stock | Removes stock | Comment required | Approval required |
|---|---|---|---|---|---|
| `DAMAGE` | Damage | no | yes | no | no |
| `FOUND` | Found stock | yes | no | no | no |
| `LOST` | Lost stock | no | yes | no | no |
| `COUNT_VARIANCE` | Count variance | yes | yes | no | no |
| `ERP_RECONCILIATION` | ERP reconciliation | yes | yes | no | **yes** |
| `DATA_FIX` | Data fix | yes | yes | yes | **yes** |
| `QUALITY` | Quality | no | yes | no | no |
| `EXPIRY` | Expiry | no | yes | no | no |
| `CUSTOMER_REQUEST` | Customer request | yes | yes | yes | no |
| `OTHER` | Other | yes | yes | yes | **yes** |
| `REVERSAL` | Reversal of a posted adjustment | yes | yes | yes | no |

These flags are values of the code list value `metadata`. The code list is not editable by hand (`editable` = false). A missing key reads as the strict answer: no direction allowed, comment and approval required.

Refusals of a line: `reason X is not on the adjustment reason list`, `reason X is retired`, `reason LOST does not allow adding stock (+5)`, `reason FOUND does not allow removing stock (-3)`, `reason OTHER requires a comment`.

### `Count After Posting` (`count_after_post`)

- UI label: `Count After Posting`. Buttons `Count After Posting`, `Do Not Count`, `Refresh`. Tick one reason first (`Tick one reason`).
- Roles: `Admin`, `Manager` (`inventory_adjust_reason_set_count`, `inventory_adjustment_rpc.rs:44`).
- Store: key `count_after_post` in the `metadata` of the code list value. Absent means off. **No reason has it on at the start.**
- What it does: after an adjustment with this reason is posted, each location whose stock it changed is counted (trigger 5). One request per location, each once.
- An adjustment that a count made (source `InventoryCount`) never asks for a count. That is how a count ends.
- Messages: `Reason OTHER: a posted adjustment counts the locations it changed`, `Reason OTHER: a posted adjustment counts nothing`, `Reason OTHER was not changed: {error}`, `The list has moved on — tick the reason again and retry`.
- Example: `DATA_FIX` has it on. A manager posts an adjustment for `A-01-01` and `A-01-02`. Two Event counts start, one per location, after the post commits.
- Open work: only adjustments posted after the change.

## 6a. Count tolerances (what is accepted on its own)

Menu path: `Sidebar > Policy > Count Tolerances` (right after `Cycle Count Policies`). Table `inventory_count_tolerance` (wms-app 096). There is one row per SKU ABC class: `A`, `B`, `C`. You cannot add or delete a class. A SKU without a class counts as `B`.

- Roles: `Admin`, `Manager` change a tolerance (`update_inventory_count_tolerance`). `Admin`, `Manager`, `Supervisor`, `Viewer` read them.
- The card is saved with its version. If someone else saved first, the save is refused. Refresh and repeat.
- At the start all three rows are empty: nothing is accepted on its own, and nothing needs a manager.

| Field | Meaning | Example |
|---|---|---|
| `Accept up to (units)` (`auto_qty`) | A line is within tolerance when its difference is at most this many units. | 2 |
| `Accept up to (%)` (`auto_pct`) | … and at most this percent of what was expected. Expected 0: the percent is never met. | 5 |
| `Accept up to (value)` (`auto_value`) | … and the difference × the SKU's `cost` attribute is at most this sum. A SKU without a cost skips this rule. | 50 |
| `Manager above (value)` (`approval_value`) | A difference worth more than this is accepted only by a user with the right `inventory_count.accept_large_variance` (by default `ADMIN` and `MANAGER`, not `SUPERVISOR`). | 1000 |

When it applies:

- A task is within tolerance when **every** line with a difference meets **every** rule its class sets, and its class sets at least one of `Accept up to (units)` and `Accept up to (%)`. A class with neither never accepts on its own.
- The task's total value must also stay within `Manager above (value)` of its classes. Accepting on its own never skips the manager.
- It happens when the counter finishes the location, on any attempt. The adjustment is the same one a supervisor would make. The RF screen `Counted` says `Within tolerance - adjusted, released`. The cause is `Within tolerance` (section 6b), and the decision is in the counter's name.
- If a tolerance changed between the count and the accept, or the adjustment is refused (moved stock, reservations), the task stays in `Variance` for a supervisor.
- A supervisor above their limit gets `COUNT_VARIANCE_ABOVE_LIMIT` with the sum and the limit. A manager accepts it.

## 6b. Variance causes (why the count differs)

Every accepted difference records **why** the count differed. The causes feed the board panel `Variance causes` and the report `Count Variance Causes` (`08-reports-and-dashboards.md`).

The cause list is the code list `count_variance_cause` (id 1042, wms-app 132). Its seeded causes:

| Code | Cause | Who sets it |
|---|---|---|
| `PICK_ERROR` | Pick error | supervisor |
| `PUTAWAY_ERROR` | Putaway error | supervisor |
| `MIX_UP` | Mix-up with another item | supervisor |
| `RECEIVING_ERROR` | Receiving error | supervisor |
| `DAMAGE` | Damage | supervisor |
| `THEFT_LOSS` | Theft or loss | supervisor |
| `COUNT_ERROR` | Count error | supervisor |
| `UNKNOWN` | Not established | supervisor, when nobody knows |
| `WITHIN_TOLERANCE` | Within tolerance | only the system (section 6a). It is not offered in the window. |

On Russian screens the causes have Russian names.

Add your own cause:

1. Open `Sidebar > Code > Code List`. Find `count_variance_cause`.
2. In `Code List Values`, click `New Value`.
3. Fill `Code`, `Display Order`, `Description`, `Active`. Click `Save`. The window offers the cause from the next accept, in `Display Order`.

- The seeded causes cannot be renamed or deleted. You can switch one off (`Active` off). A switched-off cause is no longer offered. Accepts already made keep it.
- Your own cause appears under its description everywhere: in the window, on the board, in the report.

Accept a difference with a cause:

1. Open `Sidebar > Inventory Balances > Inventory Counts`. Open a count.
2. Tick a location in `Variance`, or open its card.
3. Click `Accept Variance`. The window `Accept Variance` opens.
4. Pick `Cause` (required). Type `Comment` if it helps (up to 200 characters).
5. Click `Accept`. `Cancel` closes the window and changes nothing.

From the list, the list stays and refreshes. From the card, you go back to the list.

After the accept, the list and the card show `Cause` and `Cause Comment`. The adjustment comment ends with the cause code, for example `— cause MIX_UP`.

| Message | Meaning | Fix |
|---|---|---|
| `Choose the cause: «Not established» if nobody knows` | The window: no cause picked. | Pick a cause. If nobody knows, pick `Not established`. |
| `The variance of {location} was not accepted: {error}` | The server refused. `{error}` says why. | See the rows below and section 3, rules 7 to 9. |
| `say why the count differs: choose a cause ("Not established" if nobody knows)` | The server: no cause (`COUNT_CAUSE_REQUIRED`). Seen from the API. | Send `cause_code`. |
| `X is not a cause you can choose` | The cause is unknown, switched off, or the system's own (`COUNT_CAUSE_NOT_OFFERED`). | Refresh the page and pick again. |
| `this variance is worth X, more than the Y you may accept: a manager accepts it` | Above `Manager above (value)` (`COUNT_VARIANCE_ABOVE_LIMIT`, section 6a). | A manager accepts it. |

A recount does not record a cause. The cause belongs to the attempt that is accepted, the last one. A difference accepted before causes existed shows on the board as `no cause recorded`.

## 7. System setting `COUNT_ON_PUTAWAY_DEVIATION`

- Where: `Sidebar > System Settings`. Table `system_settings`, key `COUNT_ON_PUTAWAY_DEVIATION`, editable.
- Value: `0` or `1`. Seed `0` (and default `0`). Description: `Directed putaway with an acknowledged deviation (code 85): 0=nothing, 1=count the destination location`.
- What it does: when `1`, a directed putaway that the operator pushed through an acknowledged deviation (capacity, location type or mixing) asks for the destination location to be counted. Source `PutawayDeviation`. Anything other than `1` reads as off.
- Affects: `wms-inventory/src/movement/validation.rs:752-766`, `movement/service.rs:856-880`.
- Open work: only moves made after the change.

## 7a. System setting `COUNT_ON_PICK_CANCELLED`

- Where: `Sidebar > System Settings`. Table `system_settings`, key `COUNT_ON_PICK_CANCELLED`, editable (wms-app 119).
- Value: `0` or `1`. Seed `0` (and default `0`). Description: `Order cancelled while its pick's source was already confirmed: 0=nothing, 1=count the source location`.
- What it does: when `1`, cancelling an order (`shipment_order_cancel`) asks for a count of the source location of every pick it removes whose source an operator had already confirmed — the operator may have been at the shelf, units in hand. Source `PickCancelled`, the pick as the record; one count per location. A pick nobody had started, the operator's own reject (`F7`), reassignments and un-allocation never count: they leave the shelf as it was. Anything other than `1` reads as off.
- Affects: `wms-outbound/src/picking/cancelled_pick.rs`, called from `service/order/cancel.rs`.
- Open work: only orders cancelled after the change.

## 8. Count permissions in Task Manager

A count task is a `Count` task. The operator needs:

1. A row in the grid `Task Permissions` with `Task Type` = `Count` and a `Work Area`.
2. The zone of the location in that area, and not excluded by the operator's equipment profile.

Without them: `you have no right to take Count tasks in any work area — ask a supervisor`. The pool rules, the lease and the cooldown are the same as for picking (`22-work-areas-equipment-and-permissions.md`). The count does not use `Pick Execution`.

## 9. What happens to open counts when you change something

| Change | Effect |
|---|---|
| Edit or delete a policy | Counts already made are not touched. The next run uses the new values. |
| Make a policy inactive | Open counts go on. No new run. |
| Change `Count After Posting`, `Count an Emptied Location`, a short reason, `COUNT_ON_PUTAWAY_DEVIATION`, `COUNT_ON_PICK_CANCELLED` | Only later events. Events already written in the outbox still start their counts. |
| Remove a `Count` permission | The counter keeps the location they hold. |
| Cancel a count | The tasks are cancelled and the locations unfrozen. |
| Delete the task on the Task Board | The next hourly pass publishes work again for a location still being counted. |
| Change a count tolerance | Only counts finished later. A task already in `Variance` waits for a supervisor. |
| Switch off a variance cause, or add one | Only later accepts. Accepted differences keep their cause. |

## 10. Inconsistencies found

1. (Fixed, P-20: the day is the warehouse day, and the first pass is at start.)
2. (Fixed: count tolerances, section 6a.)
3. The `Location Type` dropdown of the policy card offers 7 types, while the service accepts every type except `InTransit` and `Lost`.
4. The publish message of short reasons says counting "is not implemented" (see `23-pick-short-reasons.md`).
5. The option `recount_by_other_counter` has no field on any web screen.
