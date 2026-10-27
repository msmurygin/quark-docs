---
title: "Policy Reference - Owner Settings and Policy Resolution"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-27
---

# Owner Settings and Policy Resolution

This page has two parts.

- **Part A** shows, for every policy, where the server looks it up and in which
  order. Read this first when a SKU or an order "uses the wrong policy".
- **Part B** lists every field of the owner configuration (`owner_config`).

Read the legend in [00-README.md](./00-README.md) first.
Paths are relative to `crates/libs/` unless they start with `crates/`.

---

# Part A. Which policy is looked up from where

## A.1 The main table

"SKU" means the row in `sku` (screen `SKU`, tab `Policies`). "Owner" means the row in
`owner_config` (screen `Owners`, tab `WH Settings`, inner tab `Policies`).
The order is left to right. The first level that has a value wins.

| Policy | 1st level | 2nd level | 3rd level or result when nothing is found | Read in code |
|---|---|---|---|---|
| **Receipt policy** | `sku.receipt_policy_id` | `owner_config.default_receipt_policy_id` | Refuse the receive: `Receipt Validation Policy for sku <SKU> not found: …` | `wms-inbound/src/service/receipt/validation/validation_service.rs:37-62` |
| **Putaway policy** | `sku.putaway_policy_id` | `owner_config.default_putaway_policy_id` | No policy: the putaway engine reports `no putaway policy on the SKU or the owner default` | `wms-lib-core/src/model/sku.rs:869-883`, `wms-inventory/src/putaway/policy.rs:144` |
| **Allocation policy** (looked up when an order line is **created or changed**, then frozen on the line) | `sku.allocation_policy_id` | `owner_config.default_allocation_policy_id` | Refuse the order line: `sku '<sku>' (owner <id>) has no allocation policy — neither the sku nor its owner's default names one; assign one before allocating` | `wms-lib-core/src/model/sku.rs:952-962`, `wms-outbound/src/allocation/policy.rs:118-126`, `:164-195` (new line), `:200-228` (frozen), `service/order/create.rs:177`, `service/order_line/upsert.rs:108` |
| **Cartonization policy** | `sku.cartonization_policy_id` | `owner_config.default_cartonization_policy_id` | The pick is left out of the carton plan (reason `NoPolicy`); it ships without a planned carton | `wms-lib-core/src/model/sku.rs:910-920`, `wms-outbound/src/cartonization/read_from_db.rs:199`, `reservation.rs:154-160` |
| **Lot policy** (details: [32](./32-lot-policy-and-attributes.md), SKU columns: [34](./34-sku-level-settings.md)) | `sku.lot_policy_id` | none. `owner_config.default_lot_policy_id` is **not read**. | If the SKU has no lot policy the SKU is "not lot tracked"; reading its lot rules fails with `Lot policy is not defined for sku/owner <sku>/<owner>` | `wms-inventory/src/deposit/deposit.rs:721`, `wms-inventory/src/inventory_service.rs:1714` |
| **Replenishment policy** | `sku.replenishment_policy_id` | none. `owner_config.default_replenishment_policy_id` is **not read**. | The min/max planner reads the SKU policy's urgency thresholds. The SKU column is required and defaults to policy id 1. | `wms-inventory/src/service/replenishment/plan.rs`, `wms-app 137` |
| **Picking policy** | `work_area_picking_policy` row for (work area, equipment profile) | `work_area.picking_policy_code` | Policy `DISCRETE`. A code with no published revision is an error: `picking policy <code> has no published revision` | `wms-lib-core/src/model/outbound/picking_policy.rs:597-650` |
| **Wave policy** | chosen by the user when previewing or building a wave; the scheduler runs the policies that carry a schedule | none | no policy: no automatic waves | `wms-outbound/src/waves/policy.rs`, `scheduler.rs` |
| **Count policy** | chosen when a count policy is run (or by its schedule) | none | none | `wms-inventory/src/service/inventory_count_policy/` |
| **Serial rules** | `sku_serial_config` of the SKU | none (no owner level) | the SKU is not serial tracked | `wms-lib-core/src/model/sku_serial_config.rs` |

Owner and SKU lookups use one SQL statement of the form
`COALESCE(sku.<x>, owner_config.<x>)` over a `LEFT JOIN` to `owner_config`. A
missing `owner_config` row therefore behaves like an owner with empty defaults,
and the SKU's own policy is still used.

## A.2 Why the owner default does not always work

The owner level only works when the SKU column can be empty.

| SKU column | Can be empty in the database? | Effect on the owner default |
|---|---|---|
| `putaway_policy_id` | yes (nullable, no default) | owner default works |
| `allocation_policy_id` | yes | owner default works |
| `cartonization_policy_id` | yes (`wms-app/migrations/009_…sql` dropped `NOT NULL` and the default, and reset every value 1 to empty) | owner default works |
| `receipt_policy_id` | **no**: `NOT NULL DEFAULT 1` (`wms-app/migrations/001_baseline.sql:2148`) | owner default **never used**. A new SKU gets policy id 1. |
| `lot_policy_id` | **no**: `NOT NULL DEFAULT 1` (`001_baseline.sql:2149`) | owner default is not read at all |
| `replenishment_policy_id` | **no**: `NOT NULL DEFAULT 1` (`001_baseline.sql:2145`) | owner default is not read at all |

Also, the SKU screen marks `Receipt Policy`, `Allocation Policy`,
`Replenishment Policy`, `Lot Policy` and `Cartonization Policy` as required fields
(`wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql:7370-7371`, `:7390`,
`:7665-7666`). Only `Putaway Policy` is optional (`:7767`). The SKU update API
can clear `putaway_policy_id` and `allocation_policy_id`
(`services/app-server/src/web/rpcs/sku_rpc.rs`, "clear" list) but cannot clear the
others. In the web UI, treat every field marked as required as mandatory; only
`Putaway Policy` is optional on this screen.

## A.3 Other lookups with a fallback order

| Setting or value | Order | Final result | Read in code |
|---|---|---|---|
| Hold time of a putaway location reservation | `owner_config.putaway_reservation_ttl_min` → system setting `PUTAWAY_RESERVATION_TTL_MIN` (`config_value`, or `default_value` if `config_value` is empty) → constant **15** minutes. A `config_value` that is not whole digits (for example `15 min`) is **not** replaced by `default_value`; it falls straight to the constant 15. | minutes | `wms-lib-core/src/model/inventory/pending_move_in.rs:732-748`, `wms-inventory/src/putaway/reserve.rs:22`, `:346-351` |
| Unit of display in the 3D view | `owner_config.dimension_uom`, `weight_uom`, `cube_uom` → the warehouse display units | display only | `crates/services/web-ui-server/src/routes/warehouse_3d_handler.rs:236-262` |
| Printer for a label | explicit printer in the command → printer assignment of scope `Zone` (location of the print) → `User` → `Owner` → `Warehouse` (lowest `priority` number wins inside a scope) | printer id; none = no label | `wms-lib-core/src/model/printer_assignments.rs:170-222` |
| Label renderer address | system setting `LABEL_RENDERER_URL` **only if its value differs from its own default** → environment variable `RENDERER_URL` → `http://localhost:8086` | URL | `wms-lib-core/src/renderer_url.rs:159-175` |
| Receipt granularity (`Aggregate`, `Pallet`, `Case`) | ASN payload → operator choice → `owner_config.default_inventory_tracking_granularity` → `Aggregate` | granularity | `wms-inbound/src/service/receipt/case_level/commands/create_case_level_asn.rs:173-181` |
| Policy for an unplanned case (`unplanned_case_on_asn`) | ASN payload → operator choice → `owner_config.default_unplanned_case_on_asn` → if the receipt is case-level and all are empty, **refuse to create the ASN**: `case-level receipt cannot be created without explicit unplanned_case_on_asn policy: ASN payload didn't specify, operator didn't choose, and owner_config.default_unplanned_case_on_asn is also NULL` | allow_error value, frozen on the receipt | `create_case_level_asn.rs:196-210` |
| RTV destination | `dest_loc` in the command → `owner_config.default_rtv_loc` → `owner_config.default_returns_loc` → error `no RTV destination configured: pass dest_loc or set owner_config.default_rtv_loc / default_returns_loc` | location | `wms-inbound/src/service/receipt/damage/move_damage_to_rtv.rs:148-156` |
| Discard destination for a returned item | `owner_config.default_discard_loc` → none: the item is written off and no stock is created | location or write-off | `wms-inbound/src/service/receipt/receive/return_line_finalizer.rs:145-148` |
| Location opened in the web Receive dialog | `owner_config.default_receiving_loc` → empty (the operator picks) | location | `wms-inbound/src/service/receipt/receive_context.rs:168-172` |
| Shelf-life warning multiplier | `owner_config.shelf_life_warning_multiplier_pct` → constant **200** if the owner has no `owner_config` row | percent | `wms-inbound/src/service/receipt/validation/validation_holds.rs:70-76` |
| Damage action by severity | `owner_config.damage_*_action` → built-in: Cosmetic/Minor `None`, Major `Hold`, Total `Reject` if the owner has no row | action | `wms-inbound/src/service/receipt/damage/report_damage.rs:966-996` |
| Auto-print of the LPN label after a receive | `owner_config.auto_print_lpn_on_receive` → off if no row | on/off | `wms-inbound/src/service/receipt/shared/auto_print.rs:50-56` |
| Mixed SKUs on one LPN | `owner_config.allow_mixed_lpn` → `false` if no row or empty | allow/refuse (code 55) | `wms-inventory/src/inventory_service.rs:1143-1151`, `wms-lib-core/src/model/owners/owner_config.rs` (`DEFAULT_ALLOW_MIXED_LPN`) |

## A.4 What each stage of the flow resolves

| Stage | Policy that decides | Lookup |
|---|---|---|
| Receive | receipt policy | SKU → owner (A.1) |
| Lot capture at receive | lot policy | SKU only |
| Putaway | putaway policy | SKU → owner; one policy per LPN |
| Order line created | allocation policy | SKU → owner, **at that moment**. The policy id and version are frozen on the line. |
| Allocation | the policy frozen on the line | each allocation run loads exactly that version (`wms-outbound/src/allocation/trace.rs:296-313`); each pick records policy id and version (`allocate.rs:536-537`) |
| Wave | wave policy | chosen by user or schedule |
| Picking | picking policy | work area (+ equipment) → work area default → `DISCRETE` |
| Cartonization | cartonization policy | SKU → owner; none = no carton plan |
| Packing | the carton plan and the pack station | not an owner or SKU lookup |

## A.5 What happens when you change a default

| You change | Existing documents and stock |
|---|---|
| A SKU's policy id | Nothing is rewritten. Receive, putaway and cartonization read the new one on the next command. **Allocation:** only order lines created or changed afterwards use it; lines that already froze a policy keep it. |
| An owner default | Same. It only matters for SKUs whose own column is empty. |
| A policy's content (steps, flags) | Read live by receive. For allocation, a line froze the policy **version**: if the policy version changes later, allocation of that line is refused with `allocation policy '<code>' version mismatch for sku '<sku>': line froze version <a>, current version is <b>` (`allocation/policy.rs:209-215`); see file 11. See the policy's own page: [01](./01-putaway-policy-steps-and-criteria.md), [11](./11-allocation-policy-steps-and-criteria.md), [31](./31-cartonization-policy-settings.md). |
| Deleting a policy | Refused if a SKU uses it, and refused if an owner uses it as a default (every `owner_config` policy link is `ON DELETE RESTRICT`, wms-app 108). The answer is `Cannot delete: record is in use`. Change the owner's default first, then delete the policy. (Before P-23 the receipt, allocation, cartonization, lot and replenishment defaults were emptied silently.) |

---

# Part B. Owner configuration (`owner_config`)

## B.1 Where and who

| Item | Value |
|---|---|
| Menu path | `Sidebar > Owners`, open an owner, tab `WH Settings` |
| Outer tabs of an owner | `General`, `WH Settings`, `Addresses`, `Bank Accounts` |
| Inner tabs of `WH Settings` | `LPN Config`, `Policies`, `Locations`, `Units of Measure`, `Receiving` |
| Rows | at most one `owner_config` row per owner (unique on `owner_id`). It is optional. |
| Create / update | the first Save creates the row (`create_owner_config`). Later saves use `update_owner_config`. Roles `Admin` and `Manager`. Read: also `Operator`, `Viewer`. |
| Delete | there is no delete. The row is removed only with its owner. |
| API-only fields | `default_rtv_loc`, `default_discard_loc`, `write_off_gl_account_hint`, `rtv_gl_account_hint`, `default_inventory_tracking_granularity`, `default_unplanned_case_on_asn` have no field on any tab. |
| Database-only columns | `auto_generate_lpn_format`, `default_container_origin` exist in the table but are not in the Rust model, the SELECT, or any API. |

How update works (`services/app-server/src/web/rpcs/owner_config_rpc.rs:46-98`):
a field you do not send stays unchanged; a field you send as `null` is cleared (for
the fields in the "clear" list); `putaway_reservation_ttl_min` follows the same
rule. The three unit fields are checked: an unknown unit, or a unit of the wrong
kind, is refused by `validate_uom_of_class` (weight must be a weight unit, dimension a
length unit, cube a volume unit).

If an owner has **no** `owner_config` row, every column behaves as its schema
default (section B.9) and every lookup in A.3 uses its built-in fallback.

## B.2 The seed

Two rows are seeded (`wms-app/migrations/001_baseline.sql:8537-8541`) for owners
`OWNER001` (id 1, "Acme Distribution") and `OWNER002` (id 2, "Global Goods Inc"):

| Column | Seed value |
|---|---|
| `allow_system_generated_lpn` | `true` |
| `allow_commingled_lpn`, `allow_duplicate_lpn`, `allow_mixed_lpn` | `false` |
| `default_sku_rotation` | `Fifo` |
| `track_inventory_by` | `Lot` |
| `default_allocation_policy_id` | `1` |
| `weight_uom`, `dimension_uom`, `cube_uom` | `KG`, `CM`, `M3` |
| `auto_print_lpn_on_receive` | `false` |
| `shelf_life_warning_multiplier_pct` | `200` |
| `damage_minor_action`, `damage_major_action`, `damage_total_action` | `None`, `Hold`, `Reject` |
| `hide_expected_qty_from_operator` | `false` |
| `default_container_origin` | `Manual` |
| `default_receiving_loc` | `STAGE` |
| everything else | empty |

The other seeded owners (suppliers, carriers, customers) have no `owner_config` row.

The **dev seed** sets `default_putaway_policy_id` to the policy `STD` for every owner
config row that has none (`wms-lib-sql/sql/dev_only/install-db/900-dev-seed.sql:1043-1046`).
A production database does not get this.

## B.3 Tab `General` (owner master data)

Table `owners`. No field here changes a policy. The owner `code` and `company` appear
in quantity messages as `<code> (<company>)`
(`validation_internal_helpers.rs:64-70`).

| UI label | Column | Type | Note |
|---|---|---|---|
| `Code` (required) | `code` | text 30 | unique |
| `Type` (required) | `owner_type` | enum `Sup, Cus, Trn, Rec, Con, Own, Man, Dst, Vnd, Brk` | decides in which owner list the row shows |
| `Status` | `status` | text 10, default `Active` | **Stored only.** No process checks it (search over inbound, outbound, inventory, core). |
| `Company` (required) | `company` | text 45 | shown in messages |
| `Description` | `description` | text 50 | display |
| `VAT` | `vat` | text 18 | display |
| `Credit Limit` | `credit_limit` | number | **Stored only.** |
| `Currency` | `currency_code` | text 3 | **Stored only.** |
| `Locale` | `locale` | text 10 | used for the snapshot capture (`web-ui-server/src/services/snapshot/capture.rs:249`) |
| `Timezone` | `timezone` | text 50 | **Stored only.** |
| `Parent Owner` | `parent_id` | owner id | **Stored only.** |

The tabs `Addresses` (fields `ISO Code`, `Contact`, `Phone`, `Email`, `Address Type`
(required), `Company`, `Address 1`, `Address 2`, `City`, `State`, `ZIP`, `Country`,
`Default`) and `Bank Accounts` (`Bank Name`, `Description`, `BIC/SWIFT`,
`Account/IBAN`, `Correspondent Acct`, `Default`, `Active`, `Currency`) are master data.
They hold no policy.

## B.4 Inner tab `LPN Config`

These eight fields were meant to drive LPN numbering and LPN content rules. Only
`Mixed LPN` is used.

#### `allow_mixed_lpn` - `Mixed LPN`
- **Column and type**: boolean, schema default `false`. Seed `false`.
- **Meaning**: may one LPN carry **more than one SKU** of this owner?
- **Affects**: every landing of stock on an LPN: receive, move, putaway
  (`wms-inventory/src/inventory_service.rs:1118-1170`). Refusal code 55:
  `<lpn> already holds SKU <list>; the owner does not allow another SKU (<sku>) on the same LPN`.
- **Example**: LPN `P1` holds SKU A. The operator receives SKU B onto `P1`. Off: refused. On: allowed.
- **Interactions**: the SKU flag `allow_multi_lot_on_lpn` (several lots of the same
  SKU on one LPN, code 56) is separate. Location flags `mix_sku`/`mix_lot` are
  separate (refusal text `Location <loc> does not allow SKU mixing …`).
- **When empty**: treated as `false`.
- **When you change it**: not retroactive. LPNs that already hold two SKUs stay as they are.

#### `allow_commingled_lpn` - `Commingled LPN`
- **Column and type**: boolean, default `false`. Seed `false`.
- **Meaning**: may one LPN carry goods of more than one **owner**?
- **Affects**: **Stored only. It has no effect today.** Code 57
  (`CommingledContainerNotAllowed`) is declared and a checker exists
  (`wms-inventory/src/service/container/operations.rs:551-566`) but it never reads the
  flag and nothing calls it.

#### `allow_duplicate_lpn` - `Duplicate LPN`
- **Column and type**: boolean, default `false`. **Stored only.** No reader.

#### `allow_system_generated_lpn` - `System Generated LPN`
- **Column and type**: boolean, schema default `false`. Seed `true`. **Stored only.**
  LPN generation does not read it (`wms-inventory/src/service/container/operations.rs:448`
  says the owner format is still to come).

#### `lpn_length`, `lpn_start_number`, `next_lpn_number`, `lpn_rollback_number` - `LPN Length`, `LPN Start #`, `Next LPN #`, `LPN Rollback #`
- **Column and type**: integer / bigint, empty by default. **Stored only.** No code
  reads any of the four. LPN numbers come from the system counter, not from these.

## B.5 Inner tab `Policies`

#### `default_receipt_policy_id` - `Receipt Policy`
- **Column and type**: bigint → `receipt_policy.id`, `ON DELETE RESTRICT` (wms-app 108). Empty by default.
- **Meaning**: the receipt policy for this owner's SKUs that have no policy of their own.
- **Affects**: see A.1 and A.2. **Today it is never reached** because `sku.receipt_policy_id`
  is never empty.
- **When you change it**: no effect on current behaviour.

#### `default_putaway_policy_id` - `Putaway Policy`
- **Column and type**: bigint → `putaway_policy.id`, `ON DELETE RESTRICT`. Empty by default. The dev seed fills it with `STD`.
- **Meaning**: the putaway policy for this owner's SKUs with no putaway policy of their own.
- **Affects**: putaway suggestion (A.1). If all SKUs on an LPN resolve to nothing: `no putaway policy on the SKU or the owner default`. If two SKUs resolve to different policies: `LPN spans SKUs with different putaway policies: <sku> (owner <id>, policy <id>), …`. A SKU that resolves to nothing is ignored when the others agree (`wms-inventory/src/putaway/policy.rs:96-125`).
- **When you change it**: affects the next suggestion. Reservations already made stay.

#### `default_allocation_policy_id` - `Allocation Policy`
- **Column and type**: bigint → `allocation_policy.id`, `ON DELETE RESTRICT` (wms-app 108). Seed `1` (both owners).
- **Meaning**: allocation policy for SKUs with none of their own.
- **Affects**: the policy chosen when an order line is created or changed (A.1). Extra refusals after the lookup: `allocation policy '<code>' is inactive — sku '<sku>' cannot allocate against a disabled policy; activate '<code>' or point the sku/owner at a different one`, and `allocation policy '<code>' has no active steps — …` (`wms-outbound/src/allocation/policy.rs:128-150`).
- **When you change it**: only order lines created or changed afterwards pick it up. Lines that already froze a policy keep it, and so do the picks already made.

#### `default_cartonization_policy_id` - `Cartonization Policy`
- **Column and type**: bigint → `cartonization_policy.id`, `ON DELETE RESTRICT` (wms-app 108). Empty by default.
- **Affects**: carton planning (A.1). Empty everywhere: the pick has no planned carton.

#### `default_lot_policy_id` - `Lot Policy`
- **Column and type**: bigint → `lot_policy.id`, `ON DELETE RESTRICT` (wms-app 108). Empty by default.
- **Affects**: **Stored only. It has no effect today.** The lot policy comes from `sku.lot_policy_id` only.

#### `default_replenishment_policy_id` - `Replenishment Policy`
- **Column and type**: bigint → `replenishment_policy.id`, `ON DELETE RESTRICT` (wms-app 108). Empty by default.
- **Affects**: **Stored only. It has no effect today.**

#### `default_sku_rotation` - `SKU Rotation`
- **Column and type**: enum `sku_rotation` `Fifo`, `Lifo`, `Fefo`; schema default `Fifo`. Seed `Fifo`.
- **Affects**: **Stored only. It has no effect today.** A SKU has its own `Rotation` field (`sku.rotation`). No code copies the owner value into it.

#### `track_inventory_by` - `Track By`
- **Column and type**: text 20, schema default `Lot`. The list `TRACK_BY` offers `None`, `Lot`, `Serial`, `Batch`.
- **Affects**: **Stored only. It has no effect today.** (The comment in `receipt_detail_case.rs:44` only names the convention.)

#### `auto_close_po` - `Auto Close PO`, `auto_close_asn` - `Auto Close ASN`, `roll_receipt` - `Roll Receipt`
- **Column and type**: boolean, default `false`. **Stored only.** No process closes
  or rolls a receipt automatically. Receipts close only by the `receipt_close` command.

#### `putaway_reservation_ttl_min` - `Putaway Reservation TTL (min)`
- **Column and type**: integer, must be **greater than 0**, empty allowed. Helper text on the screen: `Blank = use the warehouse default`.
- **Meaning**: how many minutes a directed-putaway reservation of a location is held for this owner's stock before the sweeper frees it.
- **Affects**: `wms-lib-core/src/model/inventory/pending_move_in.rs:732-748`; order in A.3.
- **Refusal**: `Putaway Reservation TTL must be a whole number of minutes greater than 0. Leave it blank to use the warehouse default (system setting PUTAWAY_RESERVATION_TTL_MIN) — 0 is not "no TTL", it is a reservation that expires before it exists.`
- **Example**: owner has 30, system setting 15: the owner's pallets are held 30 minutes. Blank: 15.
- **When you change it**: new reservations only. Reservations that already exist keep their expiry time.

#### `confirm_empty_on_move` - `Confirm Empty After Move`
- **Column and type**: boolean, default `false` (wms-app 116; on the screen since wms-meta-ui 156).
- **Meaning**: a manual move (RF **Move Stock**, `move_execute` with source type `manual`) of this owner's stock that leaves its source location holding nothing asks the operator whether the location is empty (count spec Appendix L, slice 3). A container moved by LPN asks too. Putaway, QC, damage and the other system moves never ask.
- **Affects**: `wms-inventory/src/movement/emptied_source.rs`; the move answers `ask_location_empty`, the RF opens INVMOVZ, and the answer goes to `location_confirm_empty` with source `Move`. An answer the stock contradicts orders a count of the location.
- **Example**: owner A asks, owner B does not. The last pallet of A leaves B-02-03: the operator is asked. The last pallet of B leaves B-02-04: nothing is asked.
- **When you change it**: the next move.

## B.6 Inner tab `Locations`

All five are plain text codes of locations. Only the first four have UI. A code is
not checked against the location table when you save.

#### `default_receiving_loc` - `Receiving Location`
- **Column and type**: **text** (no length limit), empty by default. Seed `STAGE`.
- **Meaning**: the location the web Receive dialog opens with.
- **Affects**: `receive_context.rs:168-172` (empty text counts as empty). The operator can change it. If the code is not a real location, the receive fails later with the location error.
- **When you change it**: the next dialog.

#### `default_returns_loc` - `Returns Location`
- **Column and type**: varchar(20), empty by default.
- **Affects**: **Only as the second fallback for the RTV destination** (A.3). It is **not** used to place customer returns: a return is deposited at the `To location` the operator types (or at `DAMAGE` / the discard location). Name is misleading.

#### `default_qc_loc` - `QC Location`
- **Column and type**: varchar(20). **Stored only.** No reader. (A SKU also has `receipt_qc_loc`; it is not read either.)

#### `pick_code` - `Pick Code`, `carton_group` - `Carton Group`
- **Column and type**: varchar(30). **Stored only.** No reader.

#### `default_rtv_loc` - API only
- **Column and type**: varchar(20). Used first for the RTV move (A.3), before `default_returns_loc`.

#### `default_discard_loc` - API only
- **Column and type**: varchar(20). Where `Discard` returns are deposited. Empty: the returned goods are written off and nothing is deposited. The location must carry a permanent hold, like the damage bay (column comment).

## B.7 Inner tab `Units of Measure`

#### `weight_uom` - `Weight UOM`, `dimension_uom` - `Dimension UOM`, `cube_uom` - `Cube UOM`
- **Column and type**: varchar(10). The dropdown lists units of the code list `UOM` of the right kind (weight, length, volume). Seed `KG`, `CM`, `M3`.
- **Meaning**: the units this owner wants to **see**.
- **Affects**: only the 3D warehouse view when it is opened for this owner
  (`warehouse_3d_handler.rs:236-262`). Stored numbers and capacity arithmetic do not change (the code comment says so).
- **Refusals**: an unknown unit, or the wrong kind, is refused on save.
- **Empty**: the warehouse's display unit is used.

## B.8 Inner tab `Receiving`

#### `auto_print_lpn_on_receive` - `Auto-Print LPN`
- **Column and type**: boolean, not null, default `false`. Seed `false`.
- **Meaning**: print an LPN label after a successful receive.
- **Affects**: after the receive commits (ASN, blind, blind line, return, return line) (`inbound/shared/auto_print.rs:50-100`). Best effort: a missing printer or a render error is logged and never fails the receive. The printer comes from the printer assignment order in A.3. The label is the template `lpn_id_label`.
- **When you change it**: only future receives.

#### `hide_expected_qty_from_operator` - `Hide Expected Qty (Blind)`
- **Column and type**: boolean, not null, default `false`.
- **Affects**: **Stored only. It has no effect today.** The decision log said RF would hide the expected quantity; no code reads the flag (search across the repository finds it only in the model, the API, the schema and the docs).

#### `shelf_life_warning_multiplier_pct` - `Shelf-Life Warning Multiplier (%)`
- **Column and type**: integer, not null, default **200**. Helper text on the screen: `200 = 2x min_shelf_life triggers warning`. No range check in the code or the database.
- **Meaning**: the "warning band" of the shelf life. A lot that passes the hard date check but expires inside the band gets an automatic QC hold.
- **Affects**: `validation_holds.rs:70-80`, `validation_internal_helpers.rs:156-188`. Band days = `SKU Min Shelf Life on Receive × percent / 100` (rounded down). If the lot's expiration date (typed, or worked out from the SKU's `expire_days`) is not later than today + band days (today is the warehouse day), the hold `QcQuarantine` is placed on the LPN (or the location).
- **Example**: SKU minimum 90 days, multiplier 200: band 180 days. Expiry in 150 days: passes the hard check, gets `QcQuarantine`. Multiplier 100: band 90 days: no hold.
- **Interactions**: needs the SKU `Min Shelf Life on Receive` to be set. Works together with the receipt policy `date_deviation_check`, which is the hard check.
- **When you change it**: only future receives. Holds already placed stay.

#### `damage_minor_action` - `Damage Action: Minor`, `damage_major_action` - `Damage Action: Major`, `damage_total_action` - `Damage Action: Total`
- **Column and type**: enum `damage_action` (`None, Hold, Reject, WriteOff, RTV, Repurpose, Destroy`), not null. Schema defaults `None`, `Hold`, `Reject`. The screen dropdown shows only the code list `damage_action`: `No action`, `Place inventory hold`, `Reject damaged units`.
- **Meaning**: what the server does when someone reports damage of that severity on this owner's goods. `Cosmetic` damage uses the `Minor` column.
- **Affects**: `report_damage.rs:966-996`. Full table in file 40, section 8.1. `WriteOff`, `RTV`, `Repurpose`, `Destroy` can be saved through the API but do nothing automatic today.
- **Example**: Major = `Hold`. A report of 3 damaged units, severity Major, puts the hold `Damaged` on the line's LPN. If the line has no LPN, no hold is placed.
- **When you change it**: damage rows written earlier record the action that was used then (`applied_action`), so the quantity ceiling stays correct.

#### `write_off_gl_account_hint` - API only
- **Column and type**: varchar(40), empty by default.
- **Affects**: copied into the `damage.written_off` event as a hint for the ERP (`wms-inbound/.../damage/write_off_damage.rs:245`). No other effect.

#### `rtv_gl_account_hint` - API only
- **Column and type**: varchar(40). Copied into the `damage.rtv_initiated` event (`move_damage_to_rtv.rs:209`).

#### `default_inventory_tracking_granularity` - API only
- **Column and type**: enum `Aggregate`, `Pallet`, `Case`; empty by default.
- **Affects**: the granularity of a new case-level ASN (A.3). Empty: `Aggregate`.
- **When you change it**: new ASNs only. The value is frozen on each receipt header.

#### `default_unplanned_case_on_asn` - API only
- **Column and type**: `allow_error`; empty by default.
- **Affects**: what happens when an operator scans a case that is not on the ASN (A.3, and file 40 section 4.5). Frozen on the receipt when the ASN is created. `HardError` refuses the scan; `Allow` and `Warning` both accept it (`Warning` asks nothing).

## B.9 Columns that exist only in the database

| Column | Schema default | Note |
|---|---|---|
| `auto_generate_lpn_format` | empty | Comment: `Format string for auto-generated LPN codes (e.g. "OWN-{date}-{seq}")`. Not in the Rust model, not read, not writable by API. |
| `default_container_origin` | `Manual` | Enum `container_origin`. Not in the Rust model, not read. |

## B.10 Count of settings

There are 42 owner settings (48 columns with `id`, `owner_id` and the four audit columns).

**22 are read by the server**: `allow_mixed_lpn`, `default_receipt_policy_id` (read, but
never reached, see A.2), `default_putaway_policy_id`, `default_allocation_policy_id`,
`default_cartonization_policy_id`, `putaway_reservation_ttl_min`, `default_returns_loc`,
`default_rtv_loc`, `default_discard_loc`, `default_receiving_loc`, `weight_uom`,
`dimension_uom`, `cube_uom`, `auto_print_lpn_on_receive`,
`shelf_life_warning_multiplier_pct`, `damage_minor_action`, `damage_major_action`,
`damage_total_action`, `write_off_gl_account_hint`, `rtv_gl_account_hint`,
`default_inventory_tracking_granularity`, `default_unplanned_case_on_asn`.

**20 are stored only**: `lpn_length`, `lpn_start_number`, `next_lpn_number`,
`lpn_rollback_number`, `allow_system_generated_lpn`, `allow_commingled_lpn`,
`allow_duplicate_lpn`, `default_sku_rotation`, `track_inventory_by`, `auto_close_po`,
`auto_close_asn`, `roll_receipt`, `default_lot_policy_id`,
`default_replenishment_policy_id`, `pick_code`, `carton_group`, `default_qc_loc`,
`hide_expected_qty_from_operator`, `auto_generate_lpn_format`,
`default_container_origin`.

## B.11 Findings

| # | Finding | Where |
|---|---|---|
| 1 | Owner default receipt policy cannot be reached because the SKU column is `NOT NULL DEFAULT 1`. | `001_baseline.sql:2148` |
| 2 | Owner defaults for lot and replenishment policy have no reader. | search over `*.rs` |
| 3 | `allow_commingled_lpn` is never read; the checker for code 57 has no caller. | `operations.rs:551-566` |
| 4 | `default_returns_loc` is not used for returns, only as RTV fallback. | `move_damage_to_rtv.rs:148-156` |
| 5 | The SKU form marks cartonization and allocation policy as required although the database and the lookup treat empty as "inherit". | `wms-meta-ui 001_baseline.sql:7370`, `:7390` |
| 6 | The `printer_assignments` column comment says the order is `User → Zone → Owner → Warehouse`; the code does `Zone → User → Owner → Warehouse`. | `001_baseline.sql:3892`, `printer_assignments.rs:170-184` |
| 7 | A `PUTAWAY_RESERVATION_TTL_MIN` value with letters skips `default_value` and falls to 15. | `pending_move_in.rs:736-741` |
