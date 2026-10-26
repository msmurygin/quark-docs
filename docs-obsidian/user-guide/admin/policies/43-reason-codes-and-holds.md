---
title: "Policy Reference - Reason Codes, Holds and Handling Unit Types"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Reason Codes, Holds and Handling Unit Types

This page lists the code lists and tables whose values **change what the system
does**: hold codes and their two directions, adjustment reasons, shortage reasons,
quantity-adjust reasons, damage severities, reasons, actions and dispositions,
return conditions, pick-short reasons and handling unit types.

Read the legend in [00-README.md](./00-README.md) first.
Paths are relative to `crates/libs/` unless they start with `crates/`.

## 1. Code lists in general

| Item | Value |
|---|---|
| Menu path | `Sidebar > Code > Code List` |
| Tables | `code_list` (one row per list), `code_list_value` (one row per value) |
| Value columns | `code` (up to 30), `description` (up to 200, English default), `active`, `editable`, `display_order`, `metadata` (JSON) |
| `editable` on the list | A list with `editable = false` is a fixed vocabulary. Do not add values: the code does not know them. |
| Translations | The description is the English default. Other languages come from the translation catalogue. |
| Retiring a value | Set `active = false`. Every check on this page tests "active value of the list", so a retired value is refused. |

Lists on this page: `shortage_reason`, `qty_adjust_reason`, `damage_reason`,
`inv_adjust_reason` (adjustment reasons), `damage_severity`, `damage_action`,
`target_disposition`, `ALLOW_ERROR`, `RECQTYVAL`.

---

## 2. Hold codes

### 2.1 What a hold is

A **hold** is a row in `inventory_hold` that marks an LPN, a lot or a location as
held. It names a **hold code**. The code decides what the hold forbids.

| Item | Value |
|---|---|
| Table of codes | `inventory_hold_code` |
| Menu path (codes) | `Sidebar > Code > Hold Codes` |
| Menu path (holds) | `Sidebar > Inventory Balances > Holds` |
| Roles that edit codes | `Admin`, `Manager` (create, update, delete). Everyone reads. |
| Scopes of a hold | one LPN, one lot, or one location |
| Default code when none is given | `QcQuarantine` (`wms-inventory/src/service/hold.rs:355-370`) |
| Default release | none: the release date is set 36 500 days ahead unless `auto_release_at` is given |
| Refusal for an in-transit location | `location <loc> holds only open pick pallets: it takes no location hold (hold the pallet by its LPN)` |

### 2.2 Fields of a hold code

Screen labels: `Code`, `Description`, `Rank`, `Enforce`, `Overridable`, `Blocks putting`,
`Blocks taking`, `Active`.

#### `code`
- **Column and type**: `inventory_hold_code.code`, varchar(30), unique.
- **Meaning**: the name of the hold kind. The words `Damaged`, `Destroy`, `QcQuarantine`, `QcRequired`, `CustomerReturn`, `NewItem` are also written by program code (auto holds, damage, returns).
- **Affects**: an unknown code in a hold fails safe: **it blocks** (`wms-inventory/src/movement/hold_policy.rs:152-172`).
- **When you change it**: do not rename or delete a code that holds, SKUs or program code use. Deleting leaves existing holds with an unknown code, which then block everything.

#### `description`
- **Type**: varchar(100). Seeded (see 2.3).
- **Affects**: shown to the supervisor in the override question for a move (`describe()` in `hold_policy.rs:110-114`). Blank means the bare code is shown.

#### `rank`
- **Type**: bigint, required. **Stored only. It has no effect today.** Nothing reads it (comment at `wms-lib-core/src/model/policies/inventory_hold_code.rs:50-61`). The form still requires a number.

#### `enforce` - `Enforce`
- **Type**: boolean, default `true`.
- **Meaning**: does this code forbid anything **in moves and receives**? `false` = informational only.
- **Affects**: `decide()` in `hold_policy.rs:152-172`: `enforce = false` gives `Allow` in both directions. Also decides whether a location hold turns the location status to `Hold` (`service/hold.rs:439-490`).
- **Does not affect**: availability for orders. See 2.4, note A.

#### `overridable` - `Overridable`
- **Type**: boolean, default `false`.
- **Meaning**: may a person confirm and go on? Only used when the code enforces and applies to the direction.
- **Affects**: moves (code 80/83/84 pairs) and the receive rule for held locations (code 76). Not used for availability.

#### `block_inbound_flow` - `Blocks putting`
- **Type**: boolean, not null, default `true` (`wms-app/migrations/011_a_hold_says_what_it_forbids.sql:54-56`).
- **Meaning**: the hold forbids **putting** stock into the place it covers.

#### `block_outbound_flow` - `Blocks taking`
- **Type**: boolean, not null, default `true`.
- **Meaning**: the hold forbids **taking** stock out of the place it covers.

#### `active` - `Active`
- **Type**: boolean, default `true`.
- **Meaning**: `false` switches the code off everywhere. In moves it means "enforce = false" (`policy_row`, `hold_policy.rs:196-213`). In availability an inactive code is skipped.

**How the flags combine** for a move or a receive (`HoldPolicy::decide`):

| `enforce` and `active` | Applies to this direction? | `overridable` | Result |
|---|---|---|---|
| no | any | any | Allow |
| yes | no | any | Allow |
| yes | yes | yes | **Warn**: ask a confirmation |
| yes | yes | no | **Block**: refuse for good |
| code not in the table | | | Block |

### 2.3 Seeded hold codes (16)

From `wms-app/migrations/001_baseline.sql:8227-8243`, migration 011 and
`20261025110000_no_hold_codes_do_not_block_outbound.sql`. `Put` is `Blocks
putting`, `Take` is `Blocks taking`.

| Code | Description | Enforce | Overridable | Put | Take | Used by program code |
|---|---|---|---|---|---|---|
| `None` | No hold | no | no | yes | **no** | SKU field meaning "no hold" |
| `Ok` | Released / no active hold | no | no | yes | **no** | same |
| `PIHold` | Physical inventory / cycle count hold | yes | yes | yes | yes | count freeze |
| `QcRequired` | Auto-applied: SKU requires QC at receive | yes | yes | yes | yes | SKU `receipt_hold_code` |
| `NewItem` | First-receive supervisor review | yes | yes | yes | yes | SKU `receipt_hold_code`: applied on the first receive of the SKU only |
| `NotHold` | Explicit no-hold choice (admin verified) | no | no | yes | **no** | SKU field meaning "no hold" |
| `QcQuarantine` | In QC zone, awaiting inspection decision | yes | yes | yes | yes | shelf-life and temperature warning bands; default of a manual hold |
| `Customs` | Customs clearance pending | yes | yes | yes | yes | SKU `receipt_hold_code` |
| `CustomerReturn` | Customer return inspection pending | yes | yes | yes | yes | return `NeedsRefurb` (the hold on the LPN and the code on the line) |
| `Expired` | Past expiration date | yes | yes | yes | yes | none |
| `Damaged` | Physical damage detected | yes | **no** | **no** | yes | damage action `Hold`; location status `Damage` |
| `Rtv` | Awaiting return to vendor | yes | no | yes | yes | none |
| `Destroy` | Awaiting destruction | yes | no | yes | yes | discard staging location |
| `Lost` | Inventory missing per cycle count | yes | no | yes | yes | none |
| `Other` | Catch-all (prefer specific code) | yes | yes | yes | yes | none |
| `LocBlocked` | Administrative location block (hard, non-overridable) | yes | no | yes | yes | dev seed puts it on held locations |

`Damaged` is the only code that was changed by migration 011: it no longer stops
**putting**, so the damage bay can receive the damaged return it exists for. It
still stops **taking** (damaged goods cannot ship).

The seed also lists the `rank` values 0, 1, 15, 17, 18, 19, 20, 30, 40, 50, 60, 70,
80, 90, 100, 110. They sort the list only.

### 2.4 What each direction blocks

| Process | Direction asked | What is read | Result | Code location |
|---|---|---|---|---|
| **Receive** into a location (ASN, blind, return) | putting | holds on the destination location, per `decide(code, Inbound)` | Warn: `Location <loc> is on hold (<code>). Receive here anyway?` (code 76, operator can confirm). Block: `Location <loc> is blocked (<code>) — receive somewhere else.` (code 76, final). A hard code wins over a soft one on the same location. | `wms-inbound/.../validation/rules/held_location.rs:64-175` |
| Receive into the damage bay or a discard staging location | putting | same, but the `Damaged` hold (damage bay) or `Destroy` hold (discard staging) is skipped | allowed | `rules/rule.rs:30-47` |
| **Move**: destination location | putting | location holds on the destination | Warn: an acknowledgement pair (code 84). Block: `destination location blocked: active hold code=<code> (id=<n>)` | `wms-inventory/src/movement/validation.rs:605-640` |
| **Move**: source location | taking | location holds on the source | Warn: pair (code 83). Block: `source location blocked: active hold code=<code> (id=<n>)` | `validation.rs:548-585` |
| **Move**: source LPN or lot | taking | LPN/lot holds on the stock (only when `MOVE_HOLD_POLICY = warn`) | Warn: pair (code 80). Block: `hold #<id> ("<code>") blocks this move (policy: not overridable)` | `validation.rs:346-400` |
| **Availability** (stock inquiry, allocation candidates) | taking | holds on the lot, location or LPN of the balance, via the view `inventory_balance_atp` | the balance is **not available** (ATP 0). No question, no override. | `wms-app/migrations/011_…sql:93-115` |
| **Allocation**: reserve under lock | taking | `InventoryHoldBmc::covers_position` | the balance counts as 0 available, so the reserve step does not take from it | `wms-outbound/src/allocation/reserve.rs:168-180`, `wms-lib-core/src/model/inventory/inventory_hold.rs:223-232`, `:399` |
| **Pick dispatch** (task becomes work) | taking | `covers_position` and location status | the pick is not eligible: `INVENTORY_HOLD` or `LOCATION_BLOCKED` | `wms-outbound/src/picking/infrastructure/dispatch.rs:160-175` |
| **Pick source confirmation** | taking | `covers_position` | `the goods at the source are on hold` | `wms-outbound/src/picking/confirmation/at_commit.rs:139-145` |
| **Box or carrier** for a pick assignment | taking | `blocks_outbound_for_lpn` | `the box is on hold`, `the carrier is on hold`, `the new box is on hold — take another box` | `wms-outbound/src/picking/target/bind.rs:249`, `carrier/select.rs:112` |
| **Putaway** candidate locations | both (status) | `location.status` must be `Ok` | a location with an enforcing hold is not suggested | `wms-inventory/src/putaway/candidates.rs:1289` |

**Notes**

- **A. Availability ignores `enforce` and `overridable`.** The view and
  `covers_position` use only `active` and `Blocks taking`, because allocation
  has no operator who can acknowledge an overridable warning. The reserved
  informational codes `None`, `Ok` and `NotHold` have `Blocks taking = no`, so
  a hold row carrying one of them leaves ATP unchanged. For a custom code,
  clear `Blocks taking` when it must remain visible without reducing outbound
  availability.
- **B. Location holds and the location status.** A location hold that enforces in
  **either** direction sets `location.status` to `Hold` (or `Damage` for the code
  `Damaged`) (`service/hold.rs:439-520`). Pick dispatch and putaway read that status.
  So for a location hold, "Blocks taking = no" does not make the stock pickable:
  the status is still `Hold`. The two direction flags are exact for **LPN and lot**
  holds, for the availability view and for moves.
- **C. Moves that ignore holds.** "Progressive" move types (release from QC, move
  to QC, move to damage and similar) skip the LPN/lot hold check whatever
  `MOVE_HOLD_POLICY` says (`validation.rs:332-345`).

### 2.5 Holds that program code places

| When | Code | Scope | Condition | Failure |
|---|---|---|---|---|
| Receive: SKU field `receipt_hold_code` | the code on the SKU (not `None`, `Ok`, `NotHold` or empty). `NewItem` only for the first receive of the SKU. | LPN, else location | always | logged, receive continues |
| Receive: shelf-life band | `QcQuarantine` | LPN, else location | owner multiplier (file 41, B.8) | same |
| Receive: temperature band | `QcQuarantine` | LPN, else location | SKU warning bounds | same |
| Damage report with action `Hold` | `Damaged` | LPN of the line | owner damage action | no hold if the line has no LPN |
| Return `NeedsRefurb` | `CustomerReturn` | LPN | an LPN was given | same |

SKU field `lot_hold_code`: **Stored only. It has no effect today.** Nothing reads it.

### 2.6 When you change a hold code

- Existing holds keep their code. The next check reads the new flags at once.
- Switching `Active` off or `Enforce` off frees moves immediately. It does **not**
  free availability (note A): to make stock available again, release the hold.
- Setting `Overridable` on a code that is hard today turns refusals into questions.

---

## 3. Adjustment reasons (`inv_adjust_reason`)

### 3.1 Where

| Item | Value |
|---|---|
| Menu path | `Sidebar > Inventory Balances > Adjustment Reasons` (next to `Adjustments`) |
| List | code list id 1031, `editable = false` |
| Columns on screen | `Reason`, `Active`, `Adds Stock`, `Removes Stock`, `Comment Required`, `Approval Required`, `Count After Posting` |
| What you can change | only `Count After Posting`, with the buttons `Count After Posting` and `Do Not Count` (tick one reason first). Roles `Admin`, `Manager`. Message when nothing is ticked: `Tick one reason`. |
| The other four flags | stored in the value's `metadata` JSON. There is no screen. Change them in the database only. |
| Strict default | a reason with missing metadata is read as: adds no, removes no, comment required, approval required. It refuses everything. |
| Refusal when the code is not on the list | `reason <code> is not on the adjustment reason list` |

### 3.2 The flags

| Flag | Meaning | Refusal (stored on the line as the error) |
|---|---|---|
| `allow_positive` (`Adds Stock`) | the line may raise stock (target above current) | `reason <R> does not allow adding stock (+<n>)` (`REASON_FORBIDS_INCREASE`) |
| `allow_negative` (`Removes Stock`) | the line may lower stock | `reason <R> does not allow removing stock (<n>)` (`REASON_FORBIDS_DECREASE`) |
| `requires_comment` (`Comment Required`) | the line or the document needs a non-blank comment | `reason <R> requires a comment` (`REASON_REQUIRES_COMMENT`) |
| `requires_approval` (`Approval Required`) | the document must be approved before it can be posted | `the adjustment's reason requires approval before posting` |
| `count_after_post` (`Count After Posting`) | after posting, count every location whose stock this reason changed | none |

Other refusals: `reason <R> is not on the adjustment reason list` (`REASON_UNKNOWN`),
`reason <R> is retired` (`REASON_INACTIVE`).

Source: `wms-inventory/src/domain/inventory_adjustment/aggregate.rs:94-230`,
`service/inventory_adjustment/mod.rs:255-290`, `reason_settings.rs`.

Details:
- The document needs approval if **any** reason on it (the header reason or any line
  reason) has `requires_approval`. A reason the list no longer knows counts as "needs approval".
- Approve is allowed to roles `Admin` and `Manager`. `Supervisor` can create, validate and post a document that needs no approval, but cannot approve.
- A line whose change is smaller than the tolerance passes every reason.
- A document made by a count (source `InventoryCount`) asks for no extra count; that is how a count ends.

### 3.3 Seeded reasons (11)

From `wms-app/migrations/053_the_inventory_adjustment_document.sql:99-118` and `054_…sql`.
`Add` = `Adds Stock`, `Rem` = `Removes Stock`, `Com` = `Comment Required`, `Appr` = `Approval Required`.

| Code | Description | Add | Rem | Com | Appr | Count after post |
|---|---|---|---|---|---|---|
| `DAMAGE` | Damage | no | yes | no | no | no |
| `FOUND` | Found stock | yes | no | no | no | no |
| `LOST` | Lost stock | no | yes | no | no | no |
| `COUNT_VARIANCE` | Count variance | yes | yes | no | no | no |
| `ERP_RECONCILIATION` | ERP reconciliation | yes | yes | no | **yes** | no |
| `DATA_FIX` | Data fix | yes | yes | **yes** | **yes** | no |
| `QUALITY` | Quality | no | yes | no | no | no |
| `EXPIRY` | Expiry | no | yes | no | no | no |
| `CUSTOMER_REQUEST` | Customer request | yes | yes | **yes** | no | no |
| `OTHER` | Other | yes | yes | **yes** | **yes** | no |
| `REVERSAL` | Reversal of a posted adjustment | yes | yes | **yes** | no | no |

`REVERSAL` is used by the reverse command only. A posted adjustment can be reversed
once (`the adjustment is already reversed by <number>`; `only a posted adjustment can be reversed`).

**Example**: reason `FOUND`, a line with current 10, target 8. The change is -2.
Refusal: `reason FOUND does not allow removing stock (-2)`. The document stays Draft.

**When you change a flag**: it applies to documents validated or posted afterwards.
A document already `Posted` is not touched.

---

## 4. Shortage reasons (`shortage_reason`)

| Item | Value |
|---|---|
| List | code list `shortage_reason`, id 1004, `editable = true` (add or retire values) |
| Used by | `receipt_receive_against_asn` when code 28 applies (file 40, section 6.4) |
| Check | the reason must be an **active** value of the list. The comparison is exact and case sensitive. Spaces around it are cut. |
| Messages | none given: `Receiving less than expected — say why (shortage reason)`. Not on the list: `'<reason>' is not a shortage reason — pick one from the list`. Both are code 43, final. |
| Client query | `list_shortage_reasons` |
| Behaviour | The reason has **no other effect**. It is stored on the override event (`ReceiptOverrideApplied`) next to the shortage, and the ERP claim and shortage reports group by it. |

Seeded values (English default from migration `wms-app 018`):

| Code | Description |
|---|---|
| `SupplierShort` | Supplier shipped short |
| `InTransitLoss` | Lost in transit |
| `CountError` | Count error |
| `DamageInTransit` | Damaged in transit |
| `Other` | Other |

When you add a value, give it a short code (up to 30 characters, no spaces) and an
English description. Retiring a value does not change old events.

## 5. Quantity-adjust reasons (`qty_adjust_reason`)

| Item | Value |
|---|---|
| List | code list `qty_adjust_reason`, id 1003, `editable = true` |
| Used by | `receipt_adjust_received_qty` (correct the received quantity of a line) |
| Check | an active value of the list. Message: `reason_code '<x>' is not a valid qty_adjust_reason`. |
| Behaviour | the reason is stored with the correction. It changes nothing else. |
| Query | `list_qty_adjust_reasons` |

| Code | Description |
|---|---|
| `Mistake` | Keying mistake |
| `OverScan` | Extra scan |
| `Damaged` | Damaged while handling |
| `SupplierAdj` | Supplier adjustment |
| `Other` | Other |

This list is **not** the inventory adjustment reason list in section 3.

---

## 6. Damage

### 6.1 Severity (`damage_severity`, fixed list)

| Code | Description | Screen colour | Which owner action applies | Built-in default if the owner has no row |
|---|---|---|---|---|
| `Cosmetic` | Cosmetic damage | info | `damage_minor_action` | `None` |
| `Minor` | Minor damage | success | `damage_minor_action` | `None` |
| `Major` | Major damage | warning | `damage_major_action` | `Hold` |
| `Total` | Total loss | danger | `damage_total_action` | `Reject` |

The action columns are on the owner (file 41, B.8). The effect of each action is in
file 40, section 8.1.

### 6.2 Reasons (`damage_reason`, `editable = true`)

A report needs an **active** reason: `reason_code '<x>' is not a valid damage_reason`.
The tag `metadata.severity` only decides under which severity the **picker** offers
the reason (`inbound/damage/vocabulary.rs`). The server does **not** check that the
reason matches the severity. A reason with no tag is offered under every severity.

| Code | Description | Offered under | Order |
|---|---|---|---|
| `ScratchedPack` | Scratched packaging | Cosmetic | 10 |
| `FadedLabel` | Faded label | Cosmetic | 20 |
| `DustDirt` | Dust or dirt | Cosmetic | 30 |
| `BentCorner` | Bent corner | Cosmetic | 40 |
| `Torn` | Torn packaging | Minor | 30 |
| `TransitDamage` | Damaged in transit | Minor | 60 |
| `DentedPack` | Dented packaging | Minor | 110 |
| `LooseSeal` | Loose seal | Minor | 120 |
| `Crushed` | Crushed | Major | 10 |
| `Wet` | Wet | Major | 20 |
| `TempBreach` | Temperature breach | Major | 50 |
| `BrokenSeal` | Broken seal | Major | 210 |
| `InternalDamage` | Contents damaged | Major | 220 |
| `Contamination` | Contamination | Total | 40 |
| `Destroyed` | Destroyed | Total | 310 |
| `Spoilage` | Spoiled or expired | Total | 320 |
| `Theft` | Missing or stolen | Total | 330 |
| `Other` | Other | every severity | 99 |

### 6.3 Owner damage action (`damage_action`, fixed list)

| Code | Screen text | Effect today |
|---|---|---|
| `None` | No action | the damage is recorded only |
| `Hold` | Place inventory hold | hold `Damaged` on the LPN of the line |
| `Reject` | Reject damaged units | the quantity is added to the line's `qty_damaged`; completion is recomputed |
| `WriteOff`, `RTV`, `Repurpose`, `Destroy` | not on the list | **refused** as an owner's action from every writer (API, screen, SQL): the database rule `chk_owner_damage_action_is_none_hold_or_reject` (wms-app 110). Their automatic run at a damage report is not built (AUD-E5). Set them on a damage record with the disposition commands (6.4). |

### 6.4 Final disposition of a damage record

Commands (file 40, section 8.1): `receipt_write_off_damage`, `receipt_move_damage_to_rtv`,
`receipt_set_damage_disposition` with kind `Repurpose` or `Destroyed`. A disposition
can be set once per damage row. A receipt cannot close while a damage row has no
disposition (code 77).

### 6.5 Receipt line `target_disposition` (`target_disposition`, fixed list)

| Code | Screen text | Written when |
|---|---|---|
| `Stock` | Put away to stock | default; `Resaleable` return |
| `CrossDock` | Cross-dock | never written by program code |
| `Hold` | Hold for inspection | the destination location status is `Damage`; return `NeedsRefurb`, `Damaged`, `Discard` |

**Stored only. It is an audit mark.** No process reads it back to decide anything
(search over `*.rs`: only the writers).

---

## 7. Returns

### 7.1 Return condition (command field `condition`)

Enum `ReturnCondition` in the command, not a code list.

| Value | Location | Quantity bucket | Hold | See |
|---|---|---|---|---|
| `Resaleable` | typed `To location` | received | none | file 40, 8.2 |
| `NeedsRefurb` | typed `To location` | received | `CustomerReturn` on the LPN (if any) | same |
| `Damaged` | the location named `DAMAGE` | damaged | the `Damaged` mark; the bay's own permanent hold keeps the stock | same |
| `Discard` | owner `default_discard_loc`, else no deposit | rejected | `Destroy` mark | same |

### 7.2 Return reason (`return_reason_code`)

A required text in the commands `receipt_receive_return` and `receipt_receive_return_line`.
The return line stores it, trimmed, as `receipt_detail.return_reason` (it can still be
edited with `receipt_detail` updates). There is no code list for it: any text is accepted.

---

## 8. Handling unit types

### 8.1 Where

| Item | Value |
|---|---|
| Menu path | **Enterprise mode** only: `Sidebar > Configuration > Handling Unit Types`. A warehouse sees `Handling Unit Registry` (types read-only, plus the list of registered units). |
| Table | `enterprise.handling_unit_type`, shared by every warehouse of the tenant |
| Roles | create and update: `Admin`, `Manager`. Read: all roles. There is no delete. |
| Instance | A registered unit is a `container` row. Register with the modal `Register Handling Units`: `Location` (required), `Owned By` (`This warehouse` or `Client`), `Client`, `Print Labels`. At most 500 units at once. |
| Refusals at registration | `the handling-unit type is out of service`, `count <n> is outside 1..=500` |
| Code of a unit | `<Code Prefix><number>`, prefix default `HU` |
| Label | the template `handling_unit_label`, printed once at registration if `Print Labels` is ticked |

Database rules: `positions` needs `holds_containers` and must be at least 1; at least
one of `holds_inventory`, `holds_containers` must be on; sizes and weights are not
negative; `code_prefix` is 1 to 10 characters `A-Z` and `0-9`
(`wms-enterprise/migrations/012_handling_unit_type.sql`).

### 8.2 Fields

| UI label | Column | Type, default | Effect |
|---|---|---|---|
| `Code` | `code` | text 30, unique | name only |
| `Name` | `name` | text 200 | name only |
| `Active` | `active` | boolean, `true` | **Off**: cannot register new units (`the handling-unit type is out of service`); the unit cannot be bound as a pick box (`the box's type is switched off`) or used as a carrier (`the carrier's type is switched off`); a carton in a cartonization policy that names this tare type is reported as `carton <code>: tare type <type> is switched off` |
| (no field) | `tracking` | enum, `ByInstance` (the only value) | none; cannot be changed after creation |
| `Holds Inventory` | `holds_inventory` | boolean, `true` | **Off** (with Holds Containers off is forbidden): a box of this type cannot take goods: `boxes of this type do not hold goods`; a cartonization carton naming it: `carton <code>: tare type <type> holds no goods` |
| `Holds Containers` | `holds_containers` | boolean, `false` | **On**: the type is a carrier (cart) that holds boxes, not a box. Boxes: refused (`boxes of this type do not hold goods`). Carrier: required (`this is not a carrier with positions` if off) |
| `Positions` | `positions` | smallint, empty | number of box positions of a carrier. A carrier with empty positions is refused: `this is not a carrier with positions` |
| `Shippable` | `shippable` | boolean, `false` | **Stored only. No effect today.** |
| `Returnable` | `returnable` | boolean, `true` | At registration, the unit is marked reusable (`true`) or disposable (`false`). **No process reads those marks today.** |
| `Inspect on Return` | `return_inspection` | boolean, `false` | **Stored only. No effect today.** |
| `Default Usage Policy` | `default_usage_policy` | `OwnOnly` or `WarehouseShared`, empty | see below |
| `Inner Length`, `Inner Width`, `Inner Height` | `inner_length`, `inner_width`, `inner_height` | double, `0` | Used in the fit rule: the box must be big enough for the planned carton. `0` = unknown = no check. Sorted sizes are compared, so the carton can be turned. Refusal: `the box is too small for the planned carton`. |
| `Max Gross Weight` | `max_gross_weight` | double, `0` | Fit rule: the type's limit must not be below the carton's limit. `0` = unknown = no check. |
| `Tare Weight` | `tare_weight` | double, `0` | **Stored only.** The tare weight used in packing is the container's own `tare_weight` column, which registration does not fill from the type (search over `*.rs`). |
| `Code Prefix` | `code_prefix` | text, empty | prefix of unit codes; empty = `HU` |

**Usage policy.** For one unit, the effective policy is: the unit's own
`usage_policy_override`, else the type's `default_usage_policy`, else by the owner of
the asset: asset of the warehouse = `WarehouseShared`, asset of a client = `OwnOnly`
(`wms-inventory/src/domain/handling_unit/aggregate.rs:60-70`).
- `WarehouseShared`: the unit may hold any owner's goods.
- `OwnOnly`: only the goods of the client who owns it. Message: `this box may not hold this owner's goods`.

**Bind rules for a pick box** (`wms-outbound/src/picking/target/bind.rs:112-200`), in
this order: not the carrier itself (`this is the carrier itself`); has a handling unit
type (`this is not a registered box`); not on hold (`the box is on hold`); not already
on a carrier (`the box is already on this carrier`, `the box is already on another carrier`);
empty (`the box is not empty`); type active (`the box's type is switched off`); type
holds goods (`boxes of this type do not hold goods`); planned type and size fit
(`this box is not of the planned type — take a box of type …`, `the box is too small for the planned carton`);
usage policy allows the owner (`this box may not hold this owner's goods`).

**Example**: type `TOTE`, `Holds Inventory` on, `Inner` 600 x 400 x 300, `Max Gross Weight` 30 000. A planned carton of 650 x 350 x 250 does not fit (sorted: 650 > 600), so `the box is too small for the planned carton`.

**When you change a type**: stock inside existing units is not touched. The next
bind, registration or cartonization check reads the new values. Do not turn off
`Holds Inventory` for a type whose units are bound to open assignments.

---

## 9. Pick short reasons (summary)

These are versioned reasons with typed actions, not a code list. Full rules are in
[23-pick-short-reasons.md](./23-pick-short-reasons.md).

| Item | Value |
|---|---|
| Menu path | `Sidebar > Policy > Pick Short Reasons` |
| Lifecycle | `Draft` → `Published` → `Retired`; one `Published` revision per code |
| Fields of a reason | `code` (upper case, up to 20), `description` (up to 120), `allow_partial` (default `true`), `allow_zero` (default `true`) |
| Actions (per reason) | `ReleaseCurrentRemainder`, `BlockSourceLocation`, `ReleaseRelatedReservations`, `RelocateResidualToMissing`, `ReallocateReleasedDemand`, `CreateInventoryCount`, `HoldInventory`, `HoldContainer`, `RequestSupervisorReview`, each with `enabled`, `scope`, `required`, `target_mode`, `fixed_location`, `trigger_after`, `order_scope`, `supervisor_review` |
| Seeded reasons | `SHORT` (physical stock below system quantity; partial and zero allowed), `LPN_NOT_FOUND` (pallet not in the location; **no partial quantity**), `WRONG_LOCATION` (stock not where the system says; partial allowed) |
| Seeded actions of each | `ReleaseCurrentRemainder` (current pick, required), `BlockSourceLocation` (entire location, required), `ReleaseRelatedReservations` (entire location, required), `RelocateResidualToMissing` (entire location, required, target zone-missing-to-location, after reservation release), `ReallocateReleasedDemand` (entire location, required, after residual relocation, current and affected orders, success when fully allocated, retry `BOUNDED_DEFAULT`, supervisor review on), `CreateInventoryCount` (current SKU at location, **not required**, after residual relocation) |

Sources: `wms-app/migrations/036_pick_short_reason.sql`, `071_count_on_scan_and_putaway_exceptions.sql`.

---

## 10. Findings

| # | Finding | Where |
|---|---|---|
| 1 | Availability (view `inventory_balance_atp`, `covers_position`) ignores `enforce` and `overridable`; moves obey them. A hold with a non-enforcing code (`None`, `Ok`, `NotHold`) still makes stock unavailable. | `011_…sql:93-115`, `inventory_hold.rs:223-232`, `hold_policy.rs:152-172` |
| 2 | For a location hold, the status `Hold` (read by pick dispatch and putaway) ignores direction. `Blocks taking = no` does not make stock pickable. | `service/hold.rs:439-520` |
| 3 | `rank`, `shippable`, `return_inspection`, `tare_weight`, `tracking`, `lot_hold_code`, `target_disposition` are stored only or unused (`return_reason_code` is now stored on the return line). | search over `*.rs` |
| 4 | Four owner damage actions (`WriteOff`, `RTV`, `Repurpose`, `Destroy`) exist in the database enum but not in the dropdown list and do nothing automatic. | `report_damage.rs:850-890` |
| 5 | The server does not check that a damage reason matches the chosen severity. | `report_damage.rs` (`validate_code_list_value`) |
| 6 | The adjustment reason flags (`allow_*`, `requires_*`) can only be changed in the database; the screen edits `count_after_post` only. | `reason_settings.rs`, `wms-meta-ui 111` |
| 7 | Fixed (F-44, commit `81bc152f1`). An auto hold that cannot be placed refuses the receive (`HoldNotPlaced`); the line is rolled back. | `inbound/lifecycle/auto_holds.rs`, `inbound/error.rs` |
