---
title: "Putaway Settings Reference - Policy, Steps and Conditions"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Putaway policy, steps and conditions

This file lists every setting of a putaway policy.
It covers the policy header, every step field, and every condition (criterion).
Read `00-putaway-overview.md` first. It explains the order in which the system works.

Zone settings are in `02-putaway-zone-settings.md`.
Location settings are in `03-location-settings.md`.

## How to read this file

- Menu path to the screen: `Sidebar > Warehouse Configuration > Policies > Putaway Policy`. Open a policy row to get the step editor.
- Paths to code start at `crates/libs/` unless they start with `crates/services/`.
- `BASELINE` means `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql`.
- A line like `step.rs:184` means `wms-inventory/src/putaway/step.rs`, line 184.
- "Stored only. It has no effect today." means: I searched all crates and no code reads the field.
- Units: the database stores weight in grams, length in millimetres and volume in cubic millimetres.
  The screens may show other units (for example kg). This is set per warehouse (`enterprise.warehouse`).
- Roles: `Admin`, `Manager` and `Supervisor` can create, edit and delete policies and steps.
  `Operator` and `Viewer` can read them. The dry run is for `Admin`, `Manager` and `Supervisor` only.

## Contents

1. Policy header (2 settings)
2. Step fields (17 settings, plus 3 system fields)
3. Conditions (16 properties, plus the rule, the values and the attribute code)
4. Messages you can see
5. The "never runs" mark
6. The dry run

---

## 1. Policy header

Screen: `Sidebar > Warehouse Configuration > Policies > Putaway Policy`. The list has the columns `Code` and `Description`.
The header form is `putaway_policy_normal_form` (fields `ID`, `Code`, `Description`).
The table is `putaway_policy` (`BASELINE:3990`).

### 1.1 Code

| Item | Value |
|---|---|
| UI label | `Code` (required). Menu: `Sidebar > Warehouse Configuration > Policies > Putaway Policy`. |
| Column | `putaway_policy.code` |
| Type and values | Text, up to 10 characters. Must be unique in the warehouse (`putaway_policy_code_key`, `BASELINE:11351`). |
| Default | No default. Seed: one policy, `STD` (id 1), with no steps (`BASELINE:8608`). |
| What it does | It is the name of the policy. The code is the only key people use. |
| Affects | The policy list. The SKU form (`Putaway Policy`, tab Policies) and the owner form (`Putaway Policy`) pick a policy by code. |
| Example | `PAL-FIFO` (8 characters). `PALLET-FIFO-2` is refused: 13 characters. |
| Interacts with | A policy can be chosen on a SKU and as an owner default. The SKU wins (see `00-putaway-overview.md`). |
| When empty | A new policy needs a code. Empty or spaces only is refused: `putaway policy code cannot be empty`. |
| If you change it | You cannot change it. The code is read-only after creation. The public update command has no `code` field. |

### 1.2 Description

| Item | Value |
|---|---|
| UI label | `Description`. |
| Column | `putaway_policy.description` |
| Type and values | Text, up to 60 characters. Can be empty (NULL). |
| Default | NULL. Seed: NULL for `STD`. |
| What it does | A free note about what the policy is for. |
| Affects | The policy list only. No engine code reads it. Stored for people. |
| Example | `Pallets, FIFO, no lot mixing`. |
| Interacts with | Nothing. |
| When empty | Allowed. An empty description is saved as NULL. |
| If you change it | The change is saved at once. It uses the policy `version` check (see below). Nothing else changes. |

### 1.3 System fields of the header

| Field | Column | Meaning |
|---|---|---|
| `ID` | `putaway_policy.id` | Row number. Read-only. |
| (hidden) `Version` | `putaway_policy.version`, default 1 | Lock number. The update command needs the version you read. If someone saved first, you get a version conflict (return code 40) and must reload. A reorder of steps also moves this number. |
| (hidden) | `add_who`, `add_when`, `mod_who`, `mod_when` | Audit stamps. |

### 1.4 What happens when you delete a policy

- Deleting a policy deletes all its steps and all their conditions in one transaction.
- It is refused while any SKU or any owner default points at it.
- Message (exact form): `Cannot delete: still in use by 2 items (SKU-A, SKU-B) and 1 owner (ACME) as their default. Point them somewhere else first.`
  The message names up to 3 codes. It counts up to 50 (`50+ items`).
- Code: `wms-inventory/src/putaway/pipeline/delete_policy.rs:97-117`.
- Pallets that already have a reservation keep it. The reservation does not point at the policy.

### 1.5 The links to a policy (settings on other screens)

| Setting | Screen | Column | Rule |
|---|---|---|---|
| `Putaway Policy` | SKU, tab Policies | `sku.putaway_policy_id` | Wins over the owner default. Empty = use the owner default. |
| `Putaway Policy` | Owner, WH Settings (`owner_wh_policies_form`) | `owner_config.default_putaway_policy_id` | Used when the SKU has none. Empty = no default. |

The rule is `COALESCE(sku.putaway_policy_id, owner_config.default_putaway_policy_id)`.
A pallet with SKUs from different policies is refused (see section 4.1).

---

## 2. Step fields

A step is one rule of the policy. The system tries the steps in order of `sequence`.
The first step that finds a location wins.
The editor shows a step as three bands: `Destination`, `Conditions`, `Placement`.
The table is `putaway_policy_detail` (`BASELINE:4009`).

A new step is live at once. It is added at the end. Message: `A new step is live at once and is tried after every rule above it.`
A new step takes the column defaults: `Suitable`, `Zone from the SKU`, no guard, no conditions.
That step already works as a very wide rule.

### 2.0 System fields of a step

| Field | Column | Type and default | Meaning |
|---|---|---|---|
| Step number | `step_num` | Text, up to 5 characters. Unique in the policy. | Label shown as `Step N (S)`: N is the position, S is this number. The system gives it when you add the step. It is the spelling of the `sequence` (10, 20, 30...). You cannot change it. Sending one is refused: `Putaway step {id}: a step's number is assigned when the step is added and never ...`. |
| Order | `sequence` | Whole number, default 0. Unique in the policy. | The order of work. A new step gets the highest `sequence` + 10. Only the drag-and-drop reorder changes it. The steps are read by `sequence`, never by `step_num` (`step_num` '10' sorts before '2'). |
| (hidden) Version | `version` | Whole number, default 1. | Each step has its own lock number. Save and delete need the version you read. Two people can edit two different steps at the same time. |

### 2.1 Mode

| Item | Value |
|---|---|
| UI label | `Mode`. Band `Destination`. |
| Column | `putaway_policy_detail.mode` (enum `putaway_mode`) |
| Type and values | `Suitable` or `Consolidate`. |
| Default | Schema default `Suitable`. No steps are seeded in production. Dev seed uses `Suitable` (`dev_only/install-db/900-dev-seed.sql:1026`). |
| What it does | `Suitable`: any location that passes all checks. `Consolidate`: only a location that already holds (or has a reservation for) at least one product of the pallet. A product is one pair owner + SKU. The lot does not count here. |
| Affects | `PutawayCtx.consolidate` and the rule `ConsolidateRule`. It is the 2nd check on each candidate. |
| Example | Pallet of SKU W1. Location A-01-0 holds 5 cartons of W1. Location A-01-1 is empty. A `Consolidate` step offers A-01-0 and refuses A-01-1 with code `not_consolidatable` and the detail `location holds nothing (no stock, no inbound reservation) — a Consolidate step requires the sku to already be there`. |
| Interacts with | `Must be empty` cannot be used with `Consolidate` (see 2.9). The mixing rules still apply on top: `Consolidate` plus `Mixed SKU = Not allowed` means "the same SKU only, and it must already be there". A location with a reservation for the same product counts as holding it. |
| When empty | Not possible. The column is NOT NULL. |
| If you change it | Takes effect on the next suggestion. Existing reservations and stock do not change. |

Values:

| Value | Meaning |
|---|---|
| `Suitable` | UI text `Any location with room`. |
| `Consolidate` | UI text `A location already holding this item`. |

Note: a pallet that stands in a location can match itself under `Consolidate`.
The engine does not skip the source location. Moving to the same place costs nothing.

### 2.2 Scope (where to look)

| Item | Value |
|---|---|
| UI label | Five options in band `Destination` (no single label). |
| Column | `putaway_policy_detail.scope` (enum `putaway_scope`) |
| Type and values | `ZoneFromSku`, `ZoneFromStep`, `LocationFromStep`, `LocationFromSku`, `AssignedSlot`. |
| Default | `ZoneFromSku`. |
| What it does | It says which zone, or which single location, the step searches. |
| Affects | `step::resolve_search_space`, called at `putaway/mod.rs:956`. |
| Example | `Zone named on this step` = BULK. Every candidate is a location of zone BULK. |
| Interacts with | Needs an anchor for two values (Zone or Location below). Database CHECK `chk_putaway_step_scope_params` (`BASELINE:4039`). |
| When empty | Not possible. NOT NULL. |
| If you change it | Next suggestion only. An anchor left from an old scope stays in the row and is ignored (inert). |

Values:

| Value | UI text | Meaning | Works today? |
|---|---|---|---|
| `ZoneFromSku` | `Zone from the SKU` | Search the zone in `sku.putawayzone` of the **first line** of the pallet. | Yes. If the SKU has no zone, the step is skipped (`skipped:no-zone`). |
| `ZoneFromStep` | `Zone named on this step` | Search the zone named in `Zone` (`to_zone`). | Yes. |
| `LocationFromStep` | `Location named on this step` | Search only the location named in `Location` (`to_location`). | Yes. |
| `LocationFromSku` | `Location from the SKU` | Search only `sku.putaway_loc` of the first line. | Yes. If the SKU has no location, the step is skipped (`skipped:no-location`). Most SKUs have none. |
| `AssignedSlot` | `Pick location of the SKU` | Search the SKU's pick locations (SKU card, tab `Pick Locations`), in route order. | Yes. See below. |

`AssignedSlot` — into the SKU's pick location:

- The candidates are the SKU's pick locations, in route order (`aisle`, `bay`, `level`, `code`). Each one goes through the same checks as any candidate: blocked locations, the step's conditions, mixing, cube and weight, the reservation. The first that passes is reserved.
- **The pick location's `Max` is always checked**, with no switch: what of this SKU the location holds and is promised, plus the pallet, may not exceed `Max` (in the unit of the pick location). Cube and weight are checked as well; the stricter limit wins. A pallet that does not fit is not split — the next pick location, then the next step, is tried. The trace counts it as `slot_max_qty`.
- To choose a kind of pick location, add the condition `Location type`: for example `Location type is Case` for the case pick location.
- A pallet of several SKUs skips the step (`skipped:mixed-pallet`): it has no one pick location.
- A SKU with no pick location skips the step (`skipped:no-slot`).
- Typical use, with the condition `Pallet fullness` (section 3): step 1 `AssignedSlot` + `Pallet fullness is Partial` (a part pallet goes straight to picking), step 2 a zone step (the rest goes to storage).

Known gap: for a mixed pallet, `ZoneFromSku` and `LocationFromSku` use the first line only.
If two SKUs name two zones, the second SKU goes to the first SKU's zone.
The dry run and the trace record this (`zone_downgrade`, `location_downgrade`).

### 2.3 Zone (anchor of `Zone named on this step`)

| Item | Value |
|---|---|
| UI label | `Zone` (placeholder `Choose a zone…`). |
| Column | `putaway_policy_detail.to_zone` |
| Type and values | Text, up to 20 characters. Must be an existing zone code (FK `fk_putaway_step_to_zone`, RESTRICT). NULL allowed. |
| Default | NULL. |
| What it does | The zone to search when the scope is `ZoneFromStep`. |
| Affects | `step.rs:529`. Also `zone_suits_temperature` when `Temperature` is on. |
| Example | `BULK`. |
| Interacts with | Only read when the scope is `ZoneFromStep`. For other scopes the value is ignored. |
| When empty | With `ZoneFromStep`, save is refused: `zone not chosen` (database: `Putaway step (policy P, sequence S) has scope 'ZoneFromStep' but no `to_zone` — that scope needs its parameter`). |
| If you change it | Next suggestion only. You cannot delete a zone that a step names (RESTRICT). |

### 2.4 Location (anchor of `Location named on this step`)

| Item | Value |
|---|---|
| UI label | `Location` (placeholder `Choose a location…`). |
| Column | `putaway_policy_detail.to_location` |
| Type and values | Text, up to 20 characters. Existing location code (FK `fk_putaway_step_to_location`, RESTRICT). NULL allowed. |
| Default | NULL. |
| What it does | The single location to search when the scope is `LocationFromStep`. |
| Affects | `step.rs:545`, `candidates.rs:594` (`single_location`). |
| Example | `A-01-0`. |
| Interacts with | The location must still pass the status, flag and type gates (see 3.x and file `03-location-settings.md`). A location that is on hold gives zero candidates. |
| When empty | With `LocationFromStep` save is refused: `location not chosen`. |
| If you change it | Next suggestion only. |

### 2.5 Guard

| Item | Value |
|---|---|
| UI label | `Guard` (hint: `hard limit on how far stock may travel`). |
| Column | `putaway_policy_detail.guard` (enum `putaway_guard`) |
| Type and values | `None`, `FromZone`, `FromLocation`. |
| Default | `None`. |
| What it does | It says for which pallets the step applies at all, based on **where the pallet stands now**. If the guard does not match, the step is skipped. It is not a failure. |
| Affects | `step::guard_allows` at `putaway/mod.rs:936`. Trace status `skipped:guard`. |
| Example | Guard `Stay in the source zone` with source zone `QC`. A pallet standing in `QC-01` uses the step. A pallet standing in `DOCK` skips it. |
| Interacts with | Needs an anchor for two values (CHECK `chk_putaway_step_guard_params`, `BASELINE:4036`). The guard column compares only the current location or its zone. A NULL anchor never matches (it is treated as "applies to nothing", not "applies to all"). |
| When empty | Not possible. NOT NULL. |
| If you change it | Next suggestion only. |

Values:

| Value | UI text | Meaning |
|---|---|---|
| `None` | `No guard` (`Always`) | The step applies to any pallet. |
| `FromZone` | `Stay in the source zone` | The step applies only if the zone of the pallet's current location equals `from_zone`. |
| `FromLocation` | `Stay in the source location` | The step applies only if the pallet's current location equals `from_location`. |

The words in the screen ("Stay in...") say "stay". The code does not keep the stock in that zone.
It only decides if the step runs. Do not read it as a travel limit on the destination.

### 2.6 Source zone and source location (anchors of the guard)

| Item | Value |
|---|---|
| UI label | `Zone` and `Location` (shown under the guard option). |
| Column | `putaway_policy_detail.from_zone`, `putaway_policy_detail.from_location` |
| Type and values | Text, up to 20 characters. Existing zone or location code (FK RESTRICT). NULL allowed. |
| Default | NULL. |
| What it does | The value the pallet's current zone or location is compared with. |
| Affects | `step.rs:385-386`. |
| Example | `from_zone = RECV`: the step runs only for pallets standing in zone RECV. |
| Interacts with | Only read when the guard is `FromZone` (zone) or `FromLocation` (location). |
| When empty | With the guard `FromZone`: `source zone not chosen`. With `FromLocation`: `source location not chosen`. |
| If you change it | Next suggestion only. |

### 2.7 Ordering

| Item | Value |
|---|---|
| UI label | `Ordering` (hint: `which eligible location is offered first`). |
| Column | `putaway_policy_detail.ordering` (enum `putaway_ordering`) |
| Type and values | `Route` or `NearestToSlot`. |
| Default | `Route`. |
| What it does | It sets the order in which candidate locations are tried. The first one that passes all checks is taken. |
| Affects | `candidates::order_for`, SQL `ORDER BY` in `wms-lib-core/src/model/location.rs:418-423`. |
| Example | Locations A-01-0, A-01-1, A-02-0. Route order tries A-01-0 first, then A-01-1, then A-02-0. |
| Interacts with | A zone is not walked to the end. The system looks at at most 5 batches of 20 locations = **100 candidates** per step. After that the step gives up and the next step runs. |
| When empty | Not possible. NOT NULL. |
| If you change it | Next suggestion only. |

Values:

| Value | UI text | What the code does |
|---|---|---|
| `Route` | `Pick route` (code list text: `Walking order (aisle, bay, level)`) | Sorts by `aisle`, then `bay`, then `level`, then `code`. It does **not** use `Route Sequence`. `aisle` is text, so aisle `A10` sorts before `A2`. `bay` and `level` are numbers (level 0, the floor, first). |
| `NearestToSlot` | `Nearest to the pick location` | Sorts the zone's locations by straight-line distance (`x`, `y`, `z` coordinates) to the SKU's first pick location in route order, then by `code`. Only for a zone scope (`Zone from the SKU`, `Zone named on this step`); on any other scope Save is refused: `ordering by nearness to the pick location works only when the step searches a zone`. The step is skipped when the pallet carries several SKUs (`skipped:mixed-pallet`), when the SKU has no pick location (`skipped:no-slot`), and when that pick location has coordinates `0, 0, 0` — never measured (`skipped:slot-not-measured`). It never falls back to route order. |

Note: the caption `Pick route` may look like it uses the location setting `Route Sequence`. It does not.
`Route Sequence` is used by allocation, pick routes and task claim order. See `03-location-settings.md`.

### 2.8 Location occupancy (one choice, three columns)

| Item | Value |
|---|---|
| UI label | `Location occupancy` (hint: `what the location may already hold`). Three options: `Any occupancy`, `Must be empty`, `Allow mixing, with rules`. |
| Columns | `allow_mixed_sku`, `allow_mixed_lot`, `require_empty` (all boolean, nullable) |
| Type and values | The screen writes the three columns from one choice. See the table below. |
| Default | Column defaults: `allow_mixed_sku = true`, `allow_mixed_lot = true`, `require_empty = false` (`BASELINE:4026-4028`). This means "no opinion". |
| What it does | It adds a step rule about what may already be in the location, on top of the location's own flags. |
| Affects | `MixCheck::from_toggles` at `putaway/mod.rs:920`. Check `MixIntentRule` is the 1st check on each candidate. |
| Example | See the three options below. |
| Interacts with | See 2.9, 2.10, 2.11 and the location flags `Mix SKU` and `Mix Lot` in `03-location-settings.md`. A step can only **narrow**. It can never allow a mix the location forbids. |
| When empty | NULL, TRUE and "not set" all mean "no opinion" (`MixCheck::None`). The old NULL state was filled by migration 290. |
| If you change it | Next suggestion only. Stock and reservations do not change. |

What each option writes:

| Option | `require_empty` | `allow_mixed_sku` | `allow_mixed_lot` | Engine rule (`MixCheck`) |
|---|---|---|---|---|
| `Any occupancy` | NULL | NULL | NULL | `None`: no step rule. Only the location flags and lot rules decide. |
| `Must be empty` | true | NULL | NULL | `RequireEmpty` |
| `Allow mixing, with rules` | NULL | as chosen | as chosen | `None`, `SameSku` or `SameSkuLot` |

Note: `Allow mixing, with rules` with both rows at `Any` writes the same three NULLs as `Any occupancy`.
After you reopen the step it reads back as `Any occupancy`.

### 2.9 Must be empty (`require_empty`)

| Item | Value |
|---|---|
| UI label | `Must be empty` (hint: `mixing rules do not apply and are not shown`). |
| Column | `putaway_policy_detail.require_empty` |
| Type and values | true, false or NULL. Only `true` has a meaning. |
| Default | false (schema). |
| What it does | The location must hold no stock and no container, and no other pallet may have an active reservation for it. |
| Affects | `MixIntentRule::require_empty`. Uses `LocBmc::is_location_occupied`: stock with `qty`, `qty_allocated` or `qty_picked` above zero, or any container not disposed, makes the location occupied. An empty pallet still occupies. |
| Example | Location C-01-0 holds an empty pallet LPN. It is **not** empty. Code `mix_intent`, detail `step requires an empty location; occupied=true, inbound_reservations=0`. |
| Interacts with | Cannot be combined with `Mixed SKU = Not allowed` or `Mixed lot = Not allowed` (database CHECK `chk_putaway_step_require_empty_no_mixing`). Cannot be combined with `Mode = Consolidate`. The pallet's own reservation does not count against the location. |
| When empty | See 2.8. |
| If you change it | Next suggestion only. |

Refusals:
- Save: `a location that must be empty has no mixing rules`.
- Save (mode): `consolidating needs a location that already holds the stock, never an empty one`.
- The editor hides `Must be empty` on a `Consolidate` step and says: `Consolidate places onto a location that already holds this SKU, so it can never be an empty one.`
- Engine (old rows): `step sets mode=Consolidate together with require_empty=true: Consolidate requires the location to already hold one of the pallet's (owner, sku) identities ... so this step can never place a pallet.`
- Rows saved before 2026-09-12 may still have this pair. The engine then refuses the whole policy when it loads it.

### 2.10 Mixed SKU (`allow_mixed_sku`)

| Item | Value |
|---|---|
| UI label | `Mixed SKU` with the choices `Any`, `Allowed`, `Not allowed`. Shown only under `Allow mixing, with rules`. |
| Column | `putaway_policy_detail.allow_mixed_sku` |
| Type and values | NULL (`Any`), true (`Allowed`), false (`Not allowed`). |
| Default | true. |
| What it does | Only `false` has an effect. `Not allowed` means: after the pallet lands, the location may hold only one product (owner + SKU). |
| Affects | `MixIntentRule::same_key`. |
| Example | Location S-01 holds SKU A. Pallet has SKU B. Result: refused with code `mix_intent_sku` and the detail `step allows no mixing beyond the same sku; location plus pallet would span 2 identities: owner 1/sku A, owner 1/sku B`. |
| Interacts with | The "committed" stock of a location = present stock plus the contents of every pallet with an **active reservation** for it. A pallet with two SKUs fails at **every** location, even an empty one (the pallet alone makes 2 identities). Same SKU code under another owner counts as a different product. |
| When empty | `Any`/NULL/true: no step rule. |
| If you change it | Next suggestion only. Existing stock stays as it is, even if it is mixed. |

### 2.11 Mixed lot (`allow_mixed_lot`)

| Item | Value |
|---|---|
| UI label | `Mixed lot` with the choices `Any`, `Allowed`, `Not allowed`. Shown only after `Mixed SKU` is decided. |
| Column | `putaway_policy_detail.allow_mixed_lot` |
| Type and values | NULL, true, false. |
| Default | true. |
| What it does | `Not allowed` (and `Mixed SKU = Not allowed`) means one SKU and one lot per location. |
| Affects | `MixIntentRule::same_key` with the lot compared. Code `mix_intent_sku_lot`. |
| Example | Location holds SKU A lot L1. Pallet has SKU A lot L2. Refused with `step allows no mixing beyond the same sku and lot; location plus pallet would span 2 identities: owner 1/sku A/lot L1, owner 1/sku A/lot L2`. |
| Interacts with | `Not allowed` is only valid when `Mixed SKU` is also `Not allowed` (CHECK `chk_putaway_step_mixing_executable`, `BASELINE:4037`). The engine cannot express "one lot across several SKUs". With `Mixed SKU = Not allowed` and `Mixed lot = Allowed`, the rule is "one SKU, lots may differ". |
| When empty | NULL/true: lots may differ. |
| If you change it | Next suggestion only. |

Refusals:
- Save: `one lot per location needs one SKU per location`.
- Screen hints: `decide Mixed SKU first — mixed lot has no meaning until then`; `one lot never spans several SKUs — with mixed SKUs allowed, lots cannot be kept apart`.
- Engine (old rows): `step sets allow_mixed_lot=Some(false) with allow_mixed_sku=...: it asks for ONE LOT per location while permitting SEVERAL SKUs, and the engine has no such rule ...`.

Offered choices:

| `Mixed SKU` | `Mixed lot` choices |
|---|---|
| `Any` | none (greyed) |
| `Allowed` | `Any`, `Allowed` |
| `Not allowed` | `Any`, `Allowed`, `Not allowed` |

### 2.12 Temperature (`respect_temperature`)

| Item | Value |
|---|---|
| UI label | `Temperature` (hint: `a rule about the zone, not about the load`). The switch reads `The zone's temperature range must cover the SKU's`. |
| Column | `putaway_policy_detail.respect_temperature` |
| Type and values | true or false. |
| Default | false. |
| What it does | When on, the step is skipped if the zone it searches does not suit the temperature of every line on the pallet. |
| Affects | `step::zone_suits_temperature` at `putaway/mod.rs:1014` (zone scope) and `:1197` (location scope). Trace status `skipped:temperature`. |
| Example | Zone COLD: min 2, max 8. SKU: min 0, max 4. They overlap (2..4), so the step runs. SKU: min 10, max 20: no overlap, so the step is skipped. |
| Interacts with | Reads the **zone** columns `min_temperature` and `max_temperature` (`02-putaway-zone-settings.md`) and the SKU columns `min_temperature` and `max_temperature`. An empty bound means "no limit" on that side, for both the zone and the SKU. If all lines fit, the step runs; one bad line skips it. A line whose SKU did not load counts as fitting. |
| When empty | Not possible (NOT NULL). |
| If you change it | Next suggestion only. |

Important: the test is **overlap**, not "cover". The check is `zone_min <= sku_max && sku_min <= zone_max`.
The screen label says "must cover" and the readback sentence says
`The location's temperature range must cover the SKU's.`
Both words are stronger than the code and both say "location" where the code reads the zone.
The dry run says "suit", which is correct.

### 2.13 Fit checks (five switches)

The `Fit checks` row has five switches (hint: `refuse a candidate that cannot physically take it`).
Each switch is one column. They are independent. The code reads all five together.
The checks run on each candidate as the 3rd check, rule `CapacityRule`.

Common rules for all five:
- A limit of `0` or NULL means "no limit set". The check is **not run**, and the location is still offered.
  The system counts it in the trace as `checks not run` with the key `<limit>:no_limit`.
  So an empty capacity does not block putaway, and does not protect the location either.
- The system counts stock already there **plus** space promised by active reservations (not yet arrived).
  The pallet's own reservation is not counted twice.
- If the pallet already stands in the candidate location, the check is skipped.
- Oversize goods and held sections are refused before these switches, whatever you set (see 2.14).
- Important: a cube or weight **limit** set on the location or the zone is always enforced, whatever the
  switches say. The move itself (`move_execute`) checks location and zone cube and weight, and the zone case
  count, on every move, so putaway checks them too and
  never offers a location the move would refuse (P-18). The `Cube` and `Weight` switches only decide whether
  a cube or weight check that **could not be made** (no limit set, or the pallet has no known weight) is
  reported in the trace.
  `Pallet dimensions`, `Stacking limit` and `Quantity` are switched on and off as before, and are not checked
  by the move at all.

#### 2.13.1 Cube (`fit_by_cube`)

| Item | Value |
|---|---|
| UI label | `Cube`. |
| Column | `putaway_policy_detail.fit_by_cube` |
| Type and values | true or false. |
| Default | true. |
| What it does | Adds the pallet's volume to what is in the location and compares with `location.max_cube_capacity`. If the pallet goes to another zone, it also checks `putawayzone.max_cube`. |
| Affects | `space.rs:749-776` (location) and `:835-840` (zone). Refusal code `capacity`, detail `loc_cube: limit L, attempted A` or `zone_cube: ...`. |
| Example | Location limit 4,500,000,000 mm³ (4.5 m³). Held 3,000,000,000 + promised 0. Pallet 1,800,000,000. Attempted 4,800,000,000 is above the limit. Refused: `loc_cube: limit 4500000000, attempted 4800000000`. |
| Interacts with | The pallet volume is the sum of `sku.cube × quantity` over its lines. A SKU with cube 0 adds 0. Then the check cannot refuse a new pallet. The zone check runs only if the destination zone differs from the zone where the pallet stands. |
| When empty | A limit set on the location or zone is enforced even with the switch off. Limit 0 = no limit; with the switch on it is reported as `loc_cube:no_limit`, with it off it is not reported. |
| If you change it | Next suggestion only. |

#### 2.13.2 Weight (`fit_by_weight`)

| Item | Value |
|---|---|
| UI label | `Weight`. |
| Column | `putaway_policy_detail.fit_by_weight` |
| Type and values | true or false. |
| Default | true. |
| What it does | Compares pallet weight + weight in the location + promised weight with `location.max_weight_capacity` (and `putawayzone.max_weight` for another zone). |
| Affects | `space.rs:749-768`, `:829-834`. Detail `loc_weight: limit L, attempted A`. |
| Example | Location A-02-3 limit 400,000 g (400 kg). Pallet 720,000 g. Refused: `loc_weight: limit 400000, attempted 720000`. |
| Interacts with | The weight uses one formula for all code (`StockWeights`). If the pallet has **no** known weight, the check is not run. The trace key is `loc_weight:no_stock_weight`. Fix it on the item or pack, not on the location. |
| When empty | A limit set on the location or zone is enforced even with the switch off. The switch only decides whether `no_limit` / `no_stock_weight` is reported. |
| If you change it | Next suggestion only. |

#### 2.13.3 Pallet dimensions (`fit_by_pallet_dims`)

| Item | Value |
|---|---|
| UI label | `Pallet dimensions`. |
| Column | `putaway_policy_detail.fit_by_pallet_dims` |
| Type and values | true or false. |
| Default | false. |
| What it does | Checks that the pallet's footprint (length × width of the wooden base) fits the location's length × width, **in either direction**. Also checks the pallet's height against the location height. |
| Affects | `space.rs:684-692`, `check_pallet_dims`. Details: `loc_footprint: location 1200 × 800, pallet 1300 × 1100 (checked both orientations)` and `loc_height: location 1500, pallet 1800`. |
| Example | Location 2500 × 1200 mm, height 1500. Pallet base 1200 × 800, height 1650 (base 150 + 3 layers × 500). Footprint fits. Height 1650 is above 1500: refused. |
| Interacts with | Pallet size comes from the pack: `pallet_wood_length`, `pallet_wood_width`, `pallet_wood_height`, `pallet_hi` and the height of the stacked unit. If the pack does not describe the pallet, the check is not run: `loc_footprint:no_product_dims` or `loc_height:no_product_dims`. If the location has no length/width/height (0), the trace says `no_location_dims`. A pallet exactly as tall as the location fits (`>` not `>=`). |
| When empty | See above. |
| If you change it | Next suggestion only. Switching it on changes which locations an unchanged policy chooses. |

#### 2.13.4 Stacking limit (`fit_by_stack_limit`)

| Item | Value |
|---|---|
| UI label | `Stacking limit`. |
| Column | `putaway_policy_detail.fit_by_stack_limit` |
| Type and values | true or false. |
| Default | false. |
| What it does | Counts pallet positions. The capacity is `location.footprint × stack limit`. The pallets standing plus the pallets promised plus this one must not exceed it. |
| Affects | `space.rs:704-727`. Details: `loc_positions: limit L, attempted A` (the rack limit decides) or `item_positions: ...` (the item's own `Stack limit` is lower than the rack's). |
| Example | Location footprint 2, stack limit 3: 6 positions. 5 pallets standing or promised. This one is the 6th: fits. The next one: `loc_positions: limit 6, attempted 7`. |
| Interacts with | Stack limit = the lower of the rack (`location.stack_limit`) and the item (`sku.stack_limit`), when each is above 0. An item may lower the rack's limit, never raise it. Location `Pallet positions on floor` = 0 gives limit 0, reported as `loc_positions:no_limit`. |
| When empty | Switch off = not checked. |
| If you change it | Next suggestion only. The move does not check this limit. |

#### 2.13.5 Quantity (`fit_by_quantity`)

| Item | Value |
|---|---|
| UI label | `Quantity`. |
| Column | `putaway_policy_detail.fit_by_quantity` |
| Type and values | true or false. |
| Default | false. |
| What it does | Compares the quantity already in the location plus the quantity arriving with `location.max_qty_capacity`. This is how a pick face is sized. |
| Affects | `space.rs:732-742`. Detail `loc_qty: limit L, attempted A`. |
| Example | Pick face limit 500 pieces. Holds 380. Pallet brings 150. Attempted 530. Refused: `loc_qty: limit 500, attempted 530`. |
| Interacts with | The quantity is a plain sum of all balance lines in stored units. The location limit is `Max quantity` on the Dimensions tab. 0 = not configured: reported, not refused. |
| When empty | Switch off = not checked. |
| If you change it | Next suggestion only. The move does not check this limit. |

### 2.14 Checks you cannot switch off

These run on every candidate whatever the step says:
- Oversize goods (`sku.positions_required` above 1) need a whole free **section** of positions.
  Refusal codes: `section_none` (location is in no section), `section_not_free`, `section_too_small`.
  Detail: `needs N adjacent positions of one free section`.
- A location held for another pallet's oversize goods: code `section_promised`, detail
  `held for goods spanning this section`.
- The zone case count (`putawayzone.max_cases_count`) when the pallet goes to another zone.
- The location landing rules (the 4th check): see `03-location-settings.md`.

### 2.15 What the readback sentence says

The step card shows a sentence, for example:
`Takes locations of type Case or Pick, class A, ... in zone BULK. One SKU per location. Checks volume and weight. Candidates in warehouse route order.`
Two gaps:
- The sentence names only `volume`, `weight` and `pallet dimensions`.
  `Stacking limit` and `Quantity` are never named.
  If only those two are on, the sentence still says `Checks nothing physical — the pallet's size and weight are not compared with the location's capacity.`
- The temperature sentence says "location" and "cover" (see 2.12).

---

## 3. Conditions (criteria)

A condition narrows a step. Table `putaway_step_criterion` (`BASELINE:4130`).
In the editor, band `Conditions`, button `Add condition` (a three-question picker: `Choose a property`, `Choose an attribute`, `Choose values`; button `Save condition`).
The band shows `N of 16 properties used`.

### 3.1 Two kinds of condition

| Kind | Family heading | Subject (column) | What it decides |
|---|---|---|---|
| About the **pallet** | `Product` and `Lot` | `Product` | Does the step apply to this pallet at all? If any line of the pallet fails any condition, the **whole step is skipped** (trace `skipped:product:<Property>`). |
| About the **location** | `Location` | `Location` | Which locations of the search space are candidates? Other locations are never looked at. |

The subject follows from the property. You do not choose it.

### 3.2 The columns every condition has

| Field | Column | Type and values | Rules |
|---|---|---|---|
| Rule | `rule` (enum `putaway_criterion_rule`) | `Include` (UI `is`), `Exclude` (UI `is not`) | One rule per property per step. You cannot have `is` and `is not` on one property in one step. |
| Values | `values` (text array) | At least one value (CHECK `chk_step_criterion_values_nonempty`). Values are joined by `or`. | Compare exact and case-sensitive. For `is`: the value must be one of the list. For `is not`: the value must not be in the list. |
| Attribute code | `attribute_code` (text, up to 50) | Required for the 3 attribute properties. Must be empty for all other properties (CHECK `chk_step_criterion_attribute_code`). | One condition per property **and attribute code**. `COLOR` and `SIZE` are two conditions. |
| Subject | `subject` | `Product` or `Location` | Set by the system. |

Uniqueness: `uq_step_criterion_property` on (step, subject, property, attribute code) (`BASELINE:14371`).
Defaults: no condition exists by default. No condition is seeded.

For all conditions:
- A step with no conditions says: `No conditions. Every location in scope is eligible — this step matches almost everything, so it belongs near the end of the pipeline.`
- When you save, the values are checked. Closed lists (enums) accept only their own labels (see each property).
  Free-text values (group, class, attributes) are never checked against existing data, because a policy is often written before the items exist.
- Changing a property without sending new values is refused (see 4.4).
- Deleting a step deletes its conditions (FK CASCADE).
- Changing a condition affects the next suggestion only.

### 3.3 Summary of the 16 properties

| # | UI label | Code | Family | Reads | Values |
|---|---|---|---|---|---|
| 1 | Location type | `LocationType` | Location | `location.loc_type` | enum `loc_type` (18 values; only 6 can be used) |
| 2 | Location status | `LocationStatus` | Location | `location.status` | `Ok`, `Hold`, `Damage` (narrow-only) |
| 3 | Location category | `LocationCategory` | Location | `location.loc_category` | 17 values |
| 4 | Processing type | `LocationProcessingType` | Location | `location.loc_processing_type` | `None`, `Pallet`, `Case`, `Piece` |
| 5 | Location flag | `LocationFlag` | Location | `location.loc_flag` | 5 values (narrow-only) |
| 6 | Location ABC | `LocationAbc` | Location | `location.abc` | `A`, `B`, `C` |
| 7 | Mixed SKU | `MixSku` | Location | `location.mix_sku` | `true`, `false` |
| 8 | Mixed lot | `MixLot` | Location | `location.mix_lot` | `true`, `false` |
| 9 | SKU ABC | `SkuAbc` | Product | `sku.abc` | `A`, `B`, `C` |
| 10 | SKU group | `SkuGroup` | Product | `sku.sku_group` | free text |
| 11 | SKU class | `SkuClass` | Product | `sku.class` | free text |
| 12 | Putaway class | `PutawayClass` | Product | `sku.putaway_class` | `None`, `NoMix` |
| 13 | Rotation | `Rotation` | Product | `sku.rotation` | `Fifo`, `Lifo`, `Fefo` |
| 14 | Lot attribute | `LotAttribute` | Lot | `lot_attributes.attribute_value` | free text, needs a code |
| 15 | SKU attribute | `SkuAttribute` | Product | `attribute_value.value_text` for `entity_type = 'sku'` | free text, needs a code |
| 16 | Location attribute | `LocationAttribute` | Location | `attribute_value.value_text` for `entity_type = 'location'` | free text, needs a code |
| 17 | Pallet fullness | `PalletFullness` | Product | computed from the pallet and its pack | `Full`, `Partial` |

Code: `candidates.rs:400-543` (location side), `product.rs:207-278` (product side), `step.rs:325-362` (gate).

A property whose stored subject is the wrong one (for example `Product` + `LocationType`) is refused when the policy loads:
`step uses criterion=Product/LocationType, which this build cannot execute`.
`SkuAttribute` or `LocationAttribute` without a code: `step's Product/SkuAttribute criterion carries no attribute_code: ...`.

### 3.4 Location conditions

Each narrows the candidate list in SQL, so a refused location is never evaluated.
The trace of a failed step (full detail) shows how many locations each property removed (`criteria_removed`).

All location candidates must also pass the fixed gate, whatever the conditions say:
`status = 'Ok'`, `loc_flag = 'None'`, `discard_lpn` not true, and the type in the allowed set.

#### 3.4.1 Location type

| Item | Value |
|---|---|
| UI label | `Location type`. |
| Column read | `location.loc_type`. |
| Type and values | Labels of enum `loc_type`: `None`, `Other`, `Case`, `Pick`, `Pnd`, `Door`, `Pickto`, `Sort`, `SpeedPick`, `QC`, `Damage`, `Rtv`, `Destroy`, `Returns`, `Stage`, `Lost`, `InTransit`, `Pack`. Other spellings are refused when saved. |
| Default | No condition. Without one, the step uses the **authorized set**: `Case`, `Pick`, `SpeedPick`, `Pnd`, `Sort`, `Other`. |
| What it does | Narrows the types. A step may **narrow** the authorized set. It can never widen it. Types outside the set are dropped silently from `is`. |
| Affects | `candidates.rs:107-177` and `:400-445`. SQL `l.loc_type = ANY(...)`. |
| Example | `Location type is Pick or Case`: only pick faces and case locations. `is Door`: refused (see below). |
| Interacts with | The move validates the same set, so a suggestion is never refused for its type (`DestinationNotAuthorizedForSourceType`). |
| When empty | No condition = the six authorized types. |
| If you change it | Next suggestion only. |

Refusals (when the policy loads, so the whole policy is refused):
- `is` with only unauthorized types: `Putaway step restricts locations to [Door], and a putaway may not land in any of them. Authorized types are [Case, Pick, SpeedPick, Pnd, Sort, Other].`
- `is not` that covers all six: `Putaway step excludes locations [Case, Pick, SpeedPick, Pnd, Sort, Other], and a putaway may not land anywhere else. Authorized types are [Case, Pick, SpeedPick, Pnd, Sort, Other].`
- A value that is not a type: `Putaway step criterion 12 (Location/LocationType Include) names value 'Mezzanine', which does not exist: <detail>. The criterion is refused rather than ignored — ignoring it would widen the search past what the policy author wrote.`
  The same shape is used for every property below. It is prefixed by `step <num> of policy <id>: `.
- At save: `'Mezzanine' is not a value a 'LocationType' criterion can match — every comparison the engine makes is exact and case-sensitive. 'LocationType' offers: 'None', 'Other', ...`.

#### 3.4.2 Location status

| Item | Value |
|---|---|
| UI label | `Location status`. |
| Column read | `location.status`. |
| Type and values | `Ok`, `Hold`, `Damage`. |
| Default | No condition. The fixed gate already requires `Ok`. |
| What it does | **Narrow-only.** Every candidate already has status `Ok`. So the only useful forms are `is Ok` (redundant) and `is not Hold` (vacuous). |
| Affects | `candidates.rs:300-354` (`resolve_gated`). |
| Example | `is Ok`: accepted, adds no filter. |
| Interacts with | You cannot use it to reach a location on hold. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

Refusals (policy load): `is` with anything but only `Ok`:
`Putaway step criterion 7 (Location/LocationStatus Include) asks for [Hold], and a putaway may only ever land on a location whose LocationStatus is 'Ok' — the candidate query enforces that unconditionally, regardless of this criterion. Include 'Ok', or drop the criterion.`
`is not Ok`: `... excludes 'Ok', and a putaway may only ever land on a location whose LocationStatus is 'Ok' — the step can therefore match no location at all.`

#### 3.4.3 Location category

| Item | Value |
|---|---|
| UI label | `Location category`. |
| Column read | `location.loc_category`. |
| Type and values | `None`, `NoPalletization`, `Asrs`, `CantileverRack`, `CartonFlow`, `DenseStorage`, `DoubleDeepRack`, `DriveInRack`, `DriveThroughRack`, `HorizontalCarousel`, `Other`, `PalletFlowRack`, `PalletCarousel`, `PushBackRack`, `SelectiveShelving`, `ShelvingStorage`, `WorkCenter`. |
| Default | No condition. |
| What it does | Keeps only (or drops) locations of these storage equipment types. |
| Affects | `candidates.rs:467-469`. |
| Example | `Location category is ShelvingStorage` for small parts. |
| Interacts with | Seed locations use `SelectiveShelving`. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.4.4 Processing type

| Item | Value |
|---|---|
| UI label | `Processing type`. |
| Column read | `location.loc_processing_type`. |
| Type and values | `None`, `Pallet`, `Case`, `Piece`. |
| Default | No condition. |
| What it does | Keeps locations handled by pallet, case or piece. |
| Affects | `candidates.rs:470-472`. |
| Example | `Processing type is Pallet`. |
| Interacts with | Nothing else reads this location field except this condition and the location generator. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.4.5 Location flag

| Item | Value |
|---|---|
| UI label | `Location flag`. |
| Column read | `location.loc_flag`. |
| Type and values | `None`, `CycleCountActive`, `SanitationActive`, `MaintenanceActive`, `ReceivingHoldoff`. |
| Default | No condition. The fixed gate requires `None`. |
| What it does | **Narrow-only**, same as the status. `is None` is redundant. Any other `is` is refused. |
| Affects | `candidates.rs:464-466`. |
| Example | `is None`: accepted, no effect. |
| Interacts with | A flagged location is never a candidate. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

Refusal text has the same shape as for the status: `... may only ever land on a location whose LocationFlag is 'None' ...`.

#### 3.4.6 Location ABC

| Item | Value |
|---|---|
| UI label | `Location ABC`. |
| Column read | `location.abc` (default `B`). |
| Type and values | `A`, `B`, `C` (enum `abc_speed_type`). |
| Default | No condition. |
| What it does | Keeps fast (A), medium (B) or slow (C) locations. |
| Affects | `candidates.rs:473-475`. |
| Example | `Location ABC is A or B`. |
| Interacts with | Pairs with `SKU ABC` to put fast items in fast locations. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.4.7 Mixed SKU (location flag)

| Item | Value |
|---|---|
| UI label | `Mixed SKU`, in family `Location`. Do not confuse it with the step switch `Mixed SKU` (2.10). |
| Column read | `location.mix_sku`. |
| Type and values | `true`, `false`. |
| Default | No condition. |
| What it does | Keeps locations whose flag `Mix SKU` is on (`true`) or off (`false`). |
| Affects | `candidates.rs:476-478`. |
| Example | `Mixed SKU is false`: only single-SKU locations. |
| Interacts with | The landing rule enforces the flag anyway (`03-location-settings.md`). This condition just avoids wasting candidates. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

Difference: the **location flag** looks at the location's setting. The **step switch** looks at what is in the location now.

#### 3.4.8 Mixed lot (location flag)

Same as 3.4.7 for `location.mix_lot`.

#### 3.4.9 Location attribute

| Item | Value |
|---|---|
| UI label | `Location attribute` (also needs an attribute from `Choose an attribute`). |
| Column read | `attribute_value.value_text` of the location, for attribute definitions with `entity_type = 'location'`, type Text, active. |
| Type and values | Free text values. The attribute code comes from `Sidebar > Warehouse Configuration > Product Data > Attributes` definitions. |
| Default | No condition. |
| What it does | Keeps locations whose attribute value is (or is not) in the list. |
| Affects | `candidates.rs:507-511`, SQL `EXISTS`. |
| Example | `Location attribute HAZMAT is not FLAMMABLE`. |
| Interacts with | A location with **no value** for the code: `is` removes it; `is not` keeps it. Only Text definitions are offered. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

### 3.5 Product and lot conditions

These are checked once per step, before any location is read.
The rule is **any line fails = the step is skipped**. The pallet is one unit.

How a missing value is read:
- The five SKU-column properties (`SKU ABC`, `SKU group`, `SKU class`, `Putaway class`, `Rotation`):
  an empty SKU field **does not refuse**. A blank field is treated as "no opinion", so the step is not skipped.
  A line whose SKU did not load also does not refuse.
- The two attribute properties (`Lot attribute`, `SKU attribute`): a missing value **refuses**.
  The step asked a question. "Nothing recorded" is the answer "no".

#### 3.5.1 SKU ABC

| Item | Value |
|---|---|
| UI label | `SKU ABC` (SKU form: `ABC Class`). |
| Column read | `sku.abc` (schema default `B`). |
| Type and values | `A`, `B`, `C`. |
| Default | No condition. |
| What it does | The step applies only to pallets whose SKUs have these classes. |
| Affects | `product.rs:344-346`. Trace `skipped:product:SkuAbc`. |
| Example | Step 10 `SKU ABC is A` to zone FAST. A pallet with SKU class C skips step 10. |
| Interacts with | `sku.abc` is NULL for no SKU created by default (the default is B). |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.5.2 SKU group

| Item | Value |
|---|---|
| UI label | `SKU group` (SKU form: `SKU Group`). |
| Column read | `sku.sku_group` (text, up to 10). |
| Type and values | Free text. Case-sensitive. The picker offers the distinct groups now used by SKUs. |
| Default | No condition. |
| What it does | The step applies only to SKUs of these groups. |
| Affects | `product.rs:347-349`. |
| Example | `SKU group is FROZEN`. A SKU with group `frozen` does **not** match (case-sensitive). |
| Interacts with | A group no SKU uses yet is accepted. |
| When empty | A SKU with no group does not refuse. |
| If you change it | Next suggestion only. |

#### 3.5.3 SKU class

| Item | Value |
|---|---|
| UI label | `SKU class` (SKU form: `Class`). |
| Column read | `sku.class` (text, up to 20). |
| Type and values | Free text, case-sensitive. |
| Default | No condition. |
| What it does | Same as `SKU group`, for the `Class` field. |
| Affects | `product.rs:350-352`. |
| Example | `SKU class is HAZ`. |
| Interacts with | None. |
| When empty | A SKU with no class does not refuse. |
| If you change it | Next suggestion only. |

#### 3.5.4 Putaway class

| Item | Value |
|---|---|
| UI label | `Putaway class` (SKU form: `Putaway Class`). |
| Column read | `sku.putaway_class` (default `None`). |
| Type and values | `None`, `NoMix`. |
| Default | No condition. |
| What it does | The step applies only to SKUs with this class. |
| Affects | `product.rs:353-355`. |
| Example | `Putaway class is NoMix` with `Mixed SKU = Not allowed` sends no-mix SKUs to single-SKU locations. |
| Interacts with | `NoMix` on the SKU does nothing by itself. No code stops mixing because of it. A `Putaway class` condition is the only reader. Add the condition and the mixing switch yourself. |
| When empty | A SKU with an empty class does not refuse. |
| If you change it | Next suggestion only. |

#### 3.5.5 Rotation

| Item | Value |
|---|---|
| UI label | `Rotation`. |
| Column read | `sku.rotation` (default `Fifo`). |
| Type and values | `Fifo`, `Lifo`, `Fefo`. |
| Default | No condition. |
| What it does | The step applies only to SKUs with this rotation. |
| Affects | `product.rs:356-358`. |
| Example | `Rotation is Fefo` to send expiry-driven goods to a front-loaded zone. |
| Interacts with | Rotation also drives allocation. Putaway only reads it in this condition. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.5.5a Pallet fullness

| Item | Value |
|---|---|
| UI label | `Pallet fullness`. |
| Column read | None — computed for each pallet: its quantity against the base quantity of the top level of its pack hierarchy (the same "full pallet" allocation uses). |
| Type and values | `Full` — at least a full pallet (more than a full pallet is also `Full`); `Partial` — less, or several SKUs on the pallet. |
| Default | No condition. |
| What it does | The step applies only to pallets of this fullness. |
| When it cannot be measured | The pack has no level above its base unit: the step is skipped (`skipped:product:PalletFullness`), as for a lot attribute with no value. |
| Example | `Pallet fullness is Partial` on an `AssignedSlot` step: part pallets go straight to the pick location. |
| If you change it | Next suggestion only. |

#### 3.5.6 Lot attribute

| Item | Value |
|---|---|
| UI label | `Lot attribute` (family `Lot`). Needs an attribute from `Choose an attribute`. |
| Column read | `lot_attributes.attribute_value` for (lot, attribute code). The codes offered are from the lot policies (`lot_policy_attribute.attrib_code`). |
| Type and values | Free text, case-sensitive. The picker offers values recorded on lots now. |
| Default | No condition. |
| What it does | The step applies only to pallets whose lots have these attribute values. |
| Affects | `product.rs:359-363` and `:442-457`. |
| Example | `Lot attribute ALLERGEN is YES`. A pallet whose lot has no `ALLERGEN` value skips the step. |
| Interacts with | A lot is found by lot code alone (not by owner). A lot with no recorded value refuses. One condition per code. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

#### 3.5.7 SKU attribute

| Item | Value |
|---|---|
| UI label | `SKU attribute`. Needs a code. |
| Column read | `attribute_value.value_text` for the SKU, definitions with `entity_type = 'sku'` (Text, active). Defined under `Sidebar > Warehouse Configuration > Product Data > Attributes`. |
| Type and values | Free text. |
| Default | No condition. |
| What it does | The step applies only to SKUs whose attribute has these values. |
| Affects | `product.rs:364-368` and `:477-495`. |
| Example | `SKU attribute COLOR is RED or BLUE`. |
| Interacts with | The lot attribute `COLOR` and the SKU attribute `COLOR` are two different things. A SKU with no value refuses. |
| When empty | No condition. |
| If you change it | Next suggestion only. |

---

## 4. Messages you can see

### 4.1 Policy and pallet errors (the whole request fails)

These are returned when the system cannot ask the question. They are not "no location".

| Message | Meaning and fix |
|---|---|
| `container N not found` | The pallet id is wrong. |
| `container N holds no stock to put away` | Empty pallet. |
| `container N has no current location to put away from` | The pallet has no position. Move it to a location first. |
| `no putaway policy on the SKU or the owner default` | Set `Putaway Policy` on the SKU or the owner (1.5). |
| `LPN spans SKUs with different putaway policies: SKU-A (owner 1, policy 10), SKU-B (owner 1, policy 20)` | Split the pallet or use one policy. A SKU with no policy is not counted. |
| `step uses scope=AssignedSlot, which this build cannot execute` | Change the scope (2.2). |
| `step uses ordering=NearestToSlot, which this build cannot execute` | Change the ordering (2.7). |
| `step sets allow_mixed_lot=... with allow_mixed_sku=...` | See 2.11. |
| `step sets require_empty=true together with allow_mixed_sku=... / allow_mixed_lot=...` | See 2.9. |
| `step sets mode=Consolidate together with require_empty=true ...` | See 2.9. |
| `step <num> of policy <id>: <message>` | A condition names a value that does not exist (3.4.1). |
| `suggest_location requires an open transaction ...` | Programming error. Report to support. |

### 4.2 Why a location is refused (rejection codes)

In the dry run and the trace, a step shows `Refused by: <code> on <count>, ...`.
The code is the engine's own text. These are all the codes.

| Code | Check | Meaning | Exact detail text (if any) |
|---|---|---|---|
| `excluded` | request | You excluded this location (the operator refused it). | |
| `mix_intent` | occupancy | `Must be empty` and the location is not empty or has another pallet's reservation. | `step requires an empty location; occupied=true, inbound_reservations=1` |
| `mix_intent_sku` | occupancy | Location plus pallet would hold more than one SKU. | `step allows no mixing beyond the same sku; location plus pallet would span 2 identities: owner 1/sku A, owner 1/sku B` |
| `mix_intent_sku_lot` | occupancy | More than one SKU+lot. | `step allows no mixing beyond the same sku and lot; location plus pallet would span 2 identities: ...` |
| `not_consolidatable` | mode | `Consolidate` and the location holds none of the pallet's products. | `location holds nothing (no stock, no inbound reservation) — a Consolidate step requires the sku to already be there` or `step requires the location to already hold one of the pallet's (owner, sku) identities; location is committed to 1 other product(s): owner 1/sku B` |
| `capacity` | fit | A limit is exceeded. | `loc_cube: limit L, attempted A`, `loc_weight: ...`, `loc_qty: ...`, `loc_positions: ...`, `item_positions: ...`, `zone_cube: ...`, `zone_weight: ...`, `zone_cases_count: ...`, `loc_footprint: location 1200 × 800, pallet 1300 × 1100 (checked both orientations)`, `loc_height: location 1500, pallet 1800` |
| `section_none` | fit | Oversize goods and the location has no `Section`. | `needs 3 adjacent positions of one free section` |
| `section_not_free` | fit | Section too small or not wholly free. | same |
| `section_too_small` | fit | Section free but too small for the goods. | same |
| `section_promised` | fit | The location is held for another pallet's oversize goods. | `held for goods spanning this section` |
| `location_not_found` | fit | The location row vanished. | `location X not found` |
| `zone_not_found` | fit | The zone row is missing. | `zone X not found` |
| `mix_sku` | landing | The **location** has `Mix SKU` off and another SKU is there. | `Location L does not allow SKU mixing (incoming sku B, existing ["A"])` |
| `mix_lot` | landing | The location has `Mix Lot` off and another lot is there. | `Location L does not allow lot mixing (incoming lot Some("L2"), existing ["L1"])` |
| `mix_attribute` | landing | A location or zone `Lot Commingle` rule refuses. | `attribute ALLERGEN=YES mixing not allowed for lot L2 on lpn Some("LPN1") [Some("putawayzone_lot_commingle rule on zone FOOD")]` |
| `lpn_multi_lot` | landing | The pallet itself carries two lots of a SKU that does not allow that. Same answer at every location. | `LPN1 already holds lot L1 of A; another lot of the same SKU is not allowed on it` |
| `ambiguous_sku` | landing | A SKU could not be resolved. | `ambiguous SKU resolution (...)` |
| `landing_config` | landing | Bad data (location or SKU/owner missing). | |
| `landing_no_contents` | landing | Empty pallet. | `LPN X has no contents to put away` |
| `under_lock:<kind>` | race | The location passed, then failed when locked (another operator won). `<kind>` is one of the codes above. | |
| `location_gone` | race | The location changed or was deleted meanwhile. | |
| `lock_timeout` | race | Another transaction held the location for more than 5 seconds (see 4.5). | |
| `pallet_already_reserved` | race | Another request holds this pallet's reservation. The scan stops. | |

Codes that stop the whole request (database or system trouble, not a property of the location):
`landing_occupancy`, `section_lookup`, `mix_intent_system`, `consolidate_system`, `capacity_system`, `landing_system`.
The message is `<code> while evaluating <location> for step <num> of policy <id>: <detail>`.

Rare codes that the putaway path cannot reach today: `lpn_owner_conflict`, `lpn_mix_sku`.

### 4.3 Step status in the trace

| Status | Meaning |
|---|---|
| `skipped:guard` | The guard did not match where the pallet stands. |
| `skipped:product:<Property>` | A pallet condition failed (the property is named). |
| `skipped:no-zone` | The scope found no zone (`Zone from the SKU` and the SKU has none). |
| `skipped:no-location` | The scope found no location. |
| `skipped:temperature` | The zone does not suit the pallet's temperature. |
| `evaluated` | The step searched and took nothing. |
| `matched` | The step took a location. |

"Offered without checking": when a switch is on but the limit or the measure is missing the trace counts `<limit>:<reason>`.
Limits: `loc_cube`, `loc_weight`, `loc_qty`, `loc_footprint`, `loc_height`, `loc_positions`, `zone_cube`, `zone_weight`, `zone_cases_count`.
Reasons: `no_limit` (set up the location or zone), `no_product_dims` (item or pack master data), `no_location_dims` (location length/width/height), `no_stock_weight` (item weight).

The dry run sentence for a step that took nothing reads:
`step 02 (20) ran over 12 candidate(s) and took none of them. Refused by: capacity on 7, mix_sku on 5. Offered without checking: loc_cube:no_limit on 5 — the limit or the measurement is missing. It stopped at its scan budget rather than at the end of the zone, so there may be locations it never looked at.`

### 4.4 Messages when you save a step or a condition

Step save (shown as `cannot save — <reasons>`):
- `zone not chosen`, `location not chosen`, `source zone not chosen`, `source location not chosen`
- `one lot per location needs one SKU per location`
- `a location that must be empty has no mixing rules`
- `consolidating needs a location that already holds the stock, never an empty one`

Database wording (API callers):
- `Putaway step (policy P, sequence S) has scope 'X' but no `to_zone` — that scope needs its parameter`
- `Putaway step (policy P, sequence S) has guard 'X' but no `from_zone` — that guard needs its parameter`
- `Duplicate putaway step sequence (policy P sequence S) — steps of one policy need explicit, unique `sequence` values ...`

Condition save:
- `A 'LocationType' criterion narrows a column of its own, so it takes no attribute_code — but this one still carries 'COLOR', left over from an attribute property. Clear attribute_code, or pick the attribute property you meant.`
- `A 'SkuAttribute' criterion must name WHICH attribute it narrows on; attribute_code is empty.`
- `A 'LocationType' criterion with no values narrows the candidates to nothing, which reads in a trace exactly like an exhausted zone. Pick at least one value.`
- `This criterion's values were picked for LocationType and the change moves it to LocationStatus, without saying what the new values are. ... Send the values for LocationStatus as well.`
- `'Mezzanine' is not a value a 'LocationType' criterion can match — every comparison the engine makes is exact and case-sensitive. 'LocationType' offers: ...`

Whole save (all steps at once):
- `putaway step 1012: condition 55 does not belong to this step`
- `putaway step 1012: SkuAttribute 'COLOR' carries more than one condition in this set — a step may narrow each property once`
- `putaway policy 5: step(s) 1013 do not belong to this policy`
- Version conflict (code 40): someone saved first. The answer carries the current version. Reload and decide again. The whole save is refused if any step is stale.

Picker (`putaway_criterion_vocabulary`):
- `an attribute_code was sent without a property — the property is chosen first, and which attributes exist depends on it`
- `a 'LocationType' criterion narrows a column of its own, so it takes no attribute_code — this request still carries 'COLOR'. Clear it, or pick the attribute property you meant.`
- `'LotPolicy' is not a criterion property the putaway engine knows. It offers: LocationType, LocationStatus, ...`

### 4.5 Settings that tune the engine (system level)

| Setting | Where | Default | Effect |
|---|---|---|---|
| `PUTAWAY_RESERVATION_TTL_MIN` | `Sidebar > Warehouse Configuration > Settings & Reference Data > System Settings` (`system_settings`) | `15` (seed `BASELINE:9955`); code fallback 15 | Minutes a suggested location is held. After that a sweeper (every 5 minutes) frees it. |
| `Putaway Reservation TTL (min)` | Owner, WH Settings (`owner_config.putaway_reservation_ttl_min`) | blank = use the warehouse value | Overrides the system setting for that owner. Must be above 0. |
| `PUTAWAY_LOCK_TIMEOUT_MS` | `system_settings` | Seeded `5000` (wms-app 091). Code default 5000 ms (`DEFAULT_LOCK_TIMEOUT_MS`) | How long one reservation waits for a busy location. A value of 0 or less is ignored (0 would mean "wait forever"). |
| `COUNT_ON_PUTAWAY_DEVIATION` | `system_settings` (migration 071) | `0` | `1` = when an operator accepts a deviation (code 85) from the suggestion, the destination location is queued for a count. |

Reservation order: owner TTL, then `PUTAWAY_RESERVATION_TTL_MIN`, then its default, then 15.

---

## 5. The "never runs" mark

A step is marked `never runs` when an earlier step already takes everything it could take.
The mark reads `closed by step N (S)`.
The rule is on purpose cautious. It says "never runs" only when the settings prove it.
The earlier step must, on every point, be at least as wide:

| Point | Condition for "closed" |
|---|---|
| Guard | Earlier has no guard, or the same guard and anchor. |
| Pallet conditions | Each earlier pallet condition is implied by a later one (same property and attribute; `is` subset, `is not` superset). |
| Search space | Same scope, and the same zone/location for the two "named on this step" scopes. |
| Temperature | Later checks it whenever earlier does. |
| Ordering | Same value. |
| Location conditions | **Equal** sets (not subsets), because of the 100-candidate scan limit. |
| Mode | Not (`Consolidate` earlier and `Suitable` later). |
| Mixing | Later is at least as strict. |
| Fit checks | Later checks everything earlier checks. |

Steps with `AssignedSlot`, `NearestToSlot` or a missing anchor are never marked.

## 6. The dry run

Panel `Dry run` (heading), field `LPN / container`, button `Evaluate`.
Hint lines: `evaluates the whole policy, not just this step` and `evaluates the SAVED policy — an edit is previewed only after Save`.
It runs the real engine on a real pallet and then **rolls back**. Nothing is reserved.
Role: `Admin`, `Manager`, `Supervisor`.

Result columns: `Candidate location`, `Rule`, `Outcome`, `Detail`. Heading `On this pallet` lists the lines.
Messages:
- `Type an LPN to see what the engine would do with it.`
- `The engine would not evaluate this pallet: <reason>`
- `Nothing is on LPN X — the engine has no pallet to place.`
- `LPN X is loose stock rather than a container, and the putaway engine places containers — there is nothing here for it to put away.`
- `What is on LPN X resolves to policy 7, not policy 5 — a dry run over it would not exercise these steps. Try an LPN whose SKUs point at this policy.`
- `The engine reached no policy at all for LPN X, so there is nothing to compare policy 5's steps against.`
- Winner: `step 02 (20) wins — the engine would put this pallet into B-04-2.` (the label is `step <position> (<stored number>)`, `dry_run.rs:918-924`).
- No winner: `No step offers a location: every candidate in every step was refused.` or `another request already holds this pallet's reservation, so the scan stopped early`.
- Per step: `step 01 (10) is not about this pallet: its SkuAbc condition does not hold for what is on it.`, `step 01 (10) was skipped: its guard limits it to stock that came from somewhere else.`, `... was skipped: it resolved no zone to search.`, `... was skipped: it resolved no location to search.`, `... was skipped: its zone's temperature range does not suit every line on this pallet.`, `step 03 (30) was not reached — an earlier step matched first.`
- A reservation is not made. The error on a failed call: `The dry run could not be made. Try again, or refresh the screen.`
