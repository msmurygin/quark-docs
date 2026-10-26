# Serial number configuration: settings reference

Serial tracking is set per SKU in one row of `sku_serial_config`. This page
lists every column, what reads it, and what the system does with serial
numbers at each step. The long design spec is in
`docs-obsidian/serial-numbers/SPEC_serial_numbers_full_cycle.md`. That spec
is a target. This page records what the code does today. Where they differ,
the code wins.

How to read a card: **Screen** is the label and path. **Column** is the
database column. **Affects** gives `file:line`. Paths are under `crates/libs`
unless noted.

## Where to set it

Main menu **SKU** > open a SKU > tab **Serial Tracking** (form
`sku_serial_config_form`). The row is 1:1 with the SKU. It is removed with the
SKU (cascade). It is saved together with the SKU by the "save all" action
(`create_sku_full`, `update_sku_full`). The row can also be changed through
the RPCs `create_sku_serial_config`, `update_sku_serial_config`,
`get_sku_serial_config_by_sku` (roles Admin and Manager for writes)
(`app-server/src/web/rpcs/sku_serial_config_rpc.rs:24-29`).

On the screen, the master switch **Continuous Serial Tracking** gates the
other fields. When it is off, the dependent fields are disabled (form gate on
form 200, `wms-meta-ui/migrations/001_baseline.sql:5438`). In the database the
other columns keep whatever they hold.

If a SKU has **no** `sku_serial_config` row, it is not tracked. All code
treats a missing row as "not tracked" (`SerialPolicy::requires_serials`,
`wms-serial/src/service/serial_policy.rs:225-231`;
`SkuSerialConfigBmc::serial_tracked_skus`, `wms-lib-core/src/model/sku_serial_config.rs:403-424`).
The question "is this SKU tracked" is asked for a SKU code **and its owner**, because a SKU code is unique per owner
and not for the whole warehouse. Two owners may share a code and only one of them track it by serial: the other
owner's stock is not treated as serial-tracked. Fixed in P-03 (commit `1c8a9a4ed`); before, the match was by code only.

Seed data: the base install has no `sku_serial_config` rows. The dev seed
makes two SKUs tracked: SKU id 1 (`PerUnit`) and SKU id 5 (`PerCase`), both
with `profile_mode = Flexible`, deferred capture on
(`wms-lib-sql/sql/dev_only/install-db/900-dev-seed.sql:691-700`).

## Part 1: Settings

### Continuous Serial Tracking

- **Screen**: Serial Tracking > **Continuous Serial Tracking**.
- **Column**: `sku_serial_config.continuous_serial_tracking`, boolean, not
  null, default `false`.
- **Meaning**: The master switch. Is every unit of this SKU tracked by serial?
- **Affects**: Receiving checks serials only when it is on
  (`wms-inbound/.../validation/validation_serial.rs:56-60`). It also drives:
  receipt completion (`wms-inbound/src/repo/completion.rs:276`,
  `completion_compute.rs:147`), deferred capture
  (`receive/deferred_serial_capture.rs:116`), the pick serial rule
  (`wms-outbound/src/picking/commands/commit.rs:409-420`, RF pick screens
  `queries/work.rs:144`, `queries/assignment.rs:513`), the pack-station block
  (`packing/queries/contents.rs:81`), the stock adjustment refusal
  (`wms-inventory/src/stock_adjust/service.rs:307-322`), and the movement
  guard (`movement/serial_episode_policy.rs:15-22`).
- **Example**: Receive 10 EA of a tracked SKU with no serials and no deferred
  capture: refused with code 65 `SerialRequired` "SKU ... requires serial per
  unit".
- **Interactions**: "If false, the other fields are ignored" (column comment).
  That is true for the receiving check. The stock adjustment refusal and the
  pack block also read this flag alone.
- **When empty**: Not possible. No row means off.
- **If you change it**: Turning it on does not create serials for existing
  stock. Stock already on hand has no serial rows, so a tracked SKU with old
  stock must be given serials by a count or an adjustment plan outside this
  setting. Turning it off stops all future serial checks. Serial rows already
  stored stay in `inventory_balances_serial`.

### Serial Scope (`serial_scope`)

- **Screen**: Serial Tracking > **Serial Scope**. The drop-down text is:
  `PerUnit (1/EA) | PerCase (1/UOM) | PerInnerPack | PerPallet`.
- **Column**: `sku_serial_config.serial_scope`, varchar(20), not null,
  default `PerUnit`. Check allows only `PerUnit`, `PerCase`, `PerPallet`,
  `PerInnerPack`.
- **Meaning**: What object carries one serial number.
- **Affects**: `SerialPolicy::expected_serial_count`
  (`serial_policy.rs:611-657`) computes how many serials a receive or a pick
  must supply. Used at receiving (`validation_serial.rs:100-113`) and at pick
  commit (`commit.rs:409-430`).
- **Example**: Receive 10 CS where 1 CS = 100 EA and 1 PL = 1,000 EA.
  - `PerUnit`: 10 x 100 = 1,000 serials.
  - `PerCase`: 10 serials (one per submitted unit of measure).
  - `PerPallet`: 10 x 100 / 1,000 = 1 serial.
  - `PerInnerPack`: 10 x 100 / (EA per `IP`) serials.
- **Interactions**: `PerPallet` looks for the pack item with UOM exactly `PL`.
  `PerInnerPack` looks for UOM exactly `IP`. If there is no pack, or no such
  item, or its base quantity is 0, the code falls back to the `PerUnit` count
  and writes a warning in the log (`serial_policy.rs:626-648`). It truncates the
  result to a whole number.
- **When empty**: Not possible.
- **If you change it**: Applies to the next receive or pick. Serials already
  captured are not changed.

### Profile mode (`profile_mode`)

- **Screen**: API only. No screen field. `update_sku_serial_config` (field
  `profile_mode`).
- **Column**: `sku_serial_config.profile_mode`, varchar(20), not null, default
  `NotTracked`. Check allows `Strict`, `Flexible`, `NotTracked`.
- **Meaning**: ADR-090. What may happen to a pallet whose serial capture is
  not finished.
- **Affects**: Only one value matters. `permits_unfinished_lpn_relocation`
  returns true only when tracking is on **and** mode is `Flexible` **and**
  deferred capture is on (`wms-inventory/src/movement/serial_episode_policy.rs:15-22`).
  Used at `serial_episode_policy.rs:159-170`. `Strict` and `NotTracked` act
  the same: an open capture blocks the move.
- **Example**: A pallet with an open capture episode may be moved as a whole
  LPN to another location only if the SKU is tracked, `Flexible`, and allows
  deferred capture. A split, a merge or a recursive move is always blocked.
- **Interactions**: Needs Continuous Serial Tracking on and Allow deferred
  capture on.
- **When empty**: Not possible.
- **If you change it**: Applies to the next move. Migration 026 set existing
  tracked SKUs to `Flexible` and new rows to `NotTracked`.

#### Values `Strict`, `NotTracked`

An open capture blocks any move of its pallet. Same effect.

#### Value `Flexible`

An unchanged full LPN may be relocated while capture is open. The open
episode moves with it (`serial_episode_policy.rs:~190-230`, `rebase`).

### Allow deferred capture (`allow_deferred_capture`)

- **Screen**: Serial Tracking > **Allow deferred capture**.
- **Column**: `sku_serial_config.allow_deferred_capture`, boolean, not null,
  default `false`.
- **Meaning**: May the receiver finish a receive without scanning serials and
  scan them later?
- **Affects**: `validation_serial.rs:70` (no inline serials -> allowed, the
  response asks for capture afterwards), `serial_policy.rs:235-241`, and the
  move guard above.
- **Example**: Receive 1,000 units with no serials. On: the receive passes, a
  capture episode opens, the operator scans on screen RCSN01 later. Off:
  refused with code 65.
- **Interactions**: Needs tracking on. The older column
  `allow_receive_capture` is separate and is not read (see below).
- **When empty**: Not possible.
- **If you change it**: Applies to new receives. Open episodes continue.

### Allow ASN pre-advised (`allow_asn_pre_advised`)

- **Screen**: Serial Tracking > **Allow ASN Pre-advised**.
- **Column**: `sku_serial_config.allow_asn_pre_advised`, boolean, not null,
  default `false`.
- **Meaning**: Treat serials listed on the ASN (vendor pre-advised) as the only
  allowed ones.
- **Affects**: `serial_policy.rs:246-252`; the check at
  `wms-serial/src/service/serial/commands/capture_serial.rs:344-370`.
  When on, and the receipt line has at least one advised serial, every scanned
  serial must be on the list, or the scan is refused with code 95
  `SerialAsnNotAdvised`. Not overridable.
- **Example**: ASN lists SN-1 to SN-100. Scan SN-500: refused.
- **Interactions**: With no advised serials on the line, nothing is
  constrained. Only the deferred-capture scan loop applies the check.
- **When empty**: Not possible.
- **If you change it**: Next scan.

### Serial Parse Mode (`serial_parse_mode`)

- **Screen**: Serial Tracking > **Parse Mode**. Values: `None`, `Fixed`,
  `Bounded`.
- **Column**: `sku_serial_config.serial_parse_mode`, enum `serial_parse_mode`,
  not null, default `None`.
- **Meaning**: How the serial is cut out of the scanned barcode.
- **Affects**: `extract_serial_from_scan` (`serial_policy.rs:290-326`).
- **Interactions**: `Fixed` needs Parse Start Position and Serial Length.
  `Bounded` needs Parse Start After and Serial Length. Missing parts give an
  error `serial_parse_mode=<mode> requires <field> on sku_serial_config`
  (`serial_policy.rs:98-103`).
- **When empty**: Not possible.
- **If you change it**: Next scan.

#### Value `None`

The scan is the serial.

#### Value `Fixed`

Cut `Serial Length` characters starting at `Parse Start Position`
(counted from 1).

#### Value `Bounded`

Skip `Parse Start After` characters (counted from 0), then take `Serial
Length` characters.

### Parse Start Position (`serial_parse_start_position`)

- **Screen**: **Parse Start Position**.
- **Column**: int, null allowed, no default.
- **Meaning**: First character of the serial, counted from 1. Used by `Fixed`.
- **Affects**: `serial_policy.rs:298-312`.
- **Example**: Scan `ABC-SN12345-X`, position 5, length 7 -> `SN12345`.
- **When empty**: With mode `Fixed`: error. Otherwise ignored.
- **If you change it**: Next scan.

### Parse Start After (`serial_parse_start_after`)

- **Screen**: **Parse Start After**.
- **Column**: int, null allowed, no default.
- **Meaning**: Characters to skip, counted from 0. Used by `Bounded`.
- **Affects**: `serial_policy.rs:313-324`.
- **Example**: Same scan, start after 4, length 7 -> `SN12345`.
- **When empty**: With mode `Bounded`: error. Otherwise ignored.

### Parse Frequency (`serial_parse_frequency`)

- **Screen**: **Parse Frequency**.
- **Column**: int, null allowed.
- **Affects**: Stored only. It has no effect today. Search:
  `grep -rn serial_parse_frequency crates --include=*.rs` finds only the model,
  RPC and meta-ui files.

### Serial Length (`serial_length`)

- **Screen**: **Serial Length**.
- **Column**: int, null allowed.
- **Meaning**: The number of characters in one serial.
- **Affects**: Cut length for `Fixed` and `Bounded`. Also checked on every
  serial: if set, the serial must have exactly this many characters
  (Unicode characters, not bytes). `validate_serial_format`
  (`serial_policy.rs:561-585`), used by the deferred capture loop. The inline
  receive check (`validation_serial.rs:115-135`) checks the mask only, not the
  length.
- **Example**: Length 9: `SN12345` (7) is refused in the capture loop with
  "length mismatch: expected 9 chars, got 7" (code 66).
- **When empty**: No length check and no cut length.
- **If you change it**: Next scan. Stored serials are not rechecked.

### Serial Mask Format (`serial_mask_format`)

- **Screen**: **Serial Mask Format**.
- **Column**: varchar(200), null allowed.
- **Meaning**: A regular expression the serial must match.
- **Affects**: Inline receive check (`validation_serial.rs:115-135`, code 66,
  not overridable) and the capture loop (`serial_policy.rs:578-590`). An
  invalid regular expression is a system error, not an operator error
  (`validation_serial.rs:118-130`, `serial_policy.rs:140-146`). The pattern is
  not anchored for you: use `^` and `$`.
- **Example**: `^SN[0-9]{5}$`. `SN12345` passes. `SN123` fails.
- **When empty**: Empty or null: no check.
- **If you change it**: Next scan.

### Serials per barcode (`serials_per_barcode`)

- **Screen**: **Serials per Barcode**. Required.
- **Column**: int, not null, default 1.
- **Meaning**: How many serials one barcode holds.
- **Affects**: `extract_serials_from_scan` (`serial_policy.rs:358-440`). Values
  of 1 or less (the code uses `max(1)`) follow the parse mode. Above 1,
  auto-increment (if on) or a multi-serial split is used. The split must give
  exactly this number of serials, or the scan is refused.
- **Example**: 3 with delimiter `|`: `SN-001|SN-002|SN-003` gives three serials.
- **When empty**: Not possible.
- **If you change it**: Next scan.

### Delimiter (`multi_serial_delimiter`)

- **Screen**: **Delimiter**.
- **Column**: varchar(20), null allowed.
- **Meaning**: The text between serials in a multi-serial barcode.
- **Affects**: `serial_policy.rs:384-398`. If set (not empty), it is tried
  before Fixed Length.
- **When empty**: Falls to Fixed Length.

### Fixed Length (`multi_serial_fixed_length`)

- **Screen**: **Fixed Length**.
- **Column**: int, null allowed.
- **Meaning**: The width of each serial in a barcode with no separators.
- **Affects**: `serial_policy.rs:400-425`. The scan length must equal fixed
  length x serials per barcode.
- **Example**: Length 8, per barcode 3: the scan must have 24 characters; it
  is cut into 3 pieces of 8.
- **When empty**: If per barcode is above 1 and neither delimiter nor fixed
  length is set, the scan is refused with a configuration message
  (`MissingConfig`, `serial_policy.rs:426-431`).

### Auto-Increment (`serial_auto_increment`)

- **Screen**: **Auto-Increment**.
- **Column**: boolean, not null, default `false`.
- **Meaning**: The barcode holds only the first serial; generate the rest by
  counting up.
- **Affects**: `serial_policy.rs:375-382`, `generate_auto_incremented`
  (`:448-520`). Works **only when Serials per barcode is above 1**. At 1 it is
  ignored. It wins over the delimiter and the fixed length.
- **Example**: Starter `SN-0001`, source position 4, length 4, 3 per barcode:
  `SN-0001`, `SN-0002`, `SN-0003`. Numbers keep their zero padding.
- **Interactions**: Needs Increment Source Position and Increment Length.
- **When empty**: Not possible.

### Increment Source Pos. (`serial_increment_source_position`)

- **Screen**: **Increment Source Pos.**
- **Column**: int, null allowed.
- **Meaning**: Where the counting number starts in the starter, from 1.
- **Affects**: `serial_policy.rs:456-460`. Missing: configuration error. The
  window must be all digits ("window ... is not a valid integer").

### Increment Length (`serial_increment_length`)

- **Screen**: **Increment Length**.
- **Column**: int, null allowed.
- **Meaning**: The number of digits in the counting window.
- **Affects**: `serial_policy.rs:460-470`. Must be above 0. If the last number
  would be wider than the window (starter 9998 + 5 serials needs 10002, which
  is 5 digits in a 4-digit window), the scan is refused with an overflow
  message.

### Serial Format (`serial_format`)

- **Screen**: **Serial Format**. Hint in the column comment: SSCC |
  GTIN_SERIAL | EPC_GS1 | CUSTOM.
- **Column**: varchar(20), null allowed.
- **Affects**: Stored only. It has no effect today. Search: `grep -rn "cfg.serial_format\|config.serial_format"`
  returns nothing. (A different field of the same name exists on the serial
  row itself, `inventory_balances_serial.serial_format`; that is a record of
  how a serial was captured, not this setting.)

### Check Digit Algorithm (`check_digit_algorithm`)

- **Screen**: **Check Digit Algorithm**.
- **Column**: varchar(20), null allowed.
- **Affects**: Stored only. It has no effect today. The code `SerialCheckDigitFailed`
  (87) is defined and listed, but nothing raises it. The barcode parser has its
  own `check_digit_algorithm`, which belongs to the barcode **format**
  (`wms-inventory/src/barcode_parser.rs:923-935`), not to this column.

### Require globally unique (`require_unique_global`)

- **Screen**: **Require Globally Unique**.
- **Column**: boolean, not null, default `false`.
- **Meaning on the screen**: One serial is unique across the world, not only in
  (SKU, owner).
- **Affects**: Nothing reads it. Stored only. It has no effect today.
  Uniqueness is always the database rule `uq_serial_per_owner`: one row per
  (`serial_number`, `owner_id`) (baseline `001_baseline.sql:12905-12909`). The
  table `enterprise.serial_global_index` from the spec does not exist in the SQL or
  code (search: `grep -rn serial_global_index crates` finds nothing outside
  docs).
- **Example**: Serial `ABC1` for owner A and for owner B: both allowed whatever
  this flag says. Serial `ABC1` twice for owner A (even for two different
  SKUs of owner A): refused.
- **If you change it**: No change in behaviour.

### Allow receive capture (`allow_receive_capture`)

- **Screen**: **Allow Receive Capture**.
- **Column**: boolean, not null, default `false`.
- **Affects**: Stored only. It has no effect today. It was the old name for
  deferred capture. Migration 026 copied it into `allow_deferred_capture` for
  existing rows; no code reads it any more (`grep -rn allow_receive_capture
  crates --include=*.rs` shows only the model, RPCs and the dev seed). Use
  **Allow deferred capture** instead.

### Warranty Period (days) (`warranty_period_days`)

- **Screen**: **Warranty Period (days)**.
- **Column**: int, null allowed.
- **Affects**: Stored only. It has no effect today.

### Industry Profile (`industry_profile`)

- **Screen**: **Industry Profile**. Drop-down values `general`, `pharma`,
  `electronics`, `food` (and `aerospace` per the column comment). Russian
  captions explain each (meta-ui migration 037:107-110).
- **Column**: varchar(20), null allowed.
- **Affects**: Stored only. It has no effect today. The column comment itself
  calls it a "soft hint".

### Pick episode reassignment (`pick_episode_reassignment_mode`)

- **Screen**: **Pick Episode Reassignment**. Options: **Block movement**,
  **Hand over open episode**, **Cancel and restart capture**
  (`wms-meta-ui/migrations/073_pick_execution_admin_ui.sql:196-212`,
  `079_*.sql`).
- **Column**: varchar(32), not null, default `Block`. Check allows `Block`,
  `Handover`, `CancelAndRestart` (wms-app migrations 037, 040).
- **Meaning**: What happens to a pick's open serial capture when the pick is
  given to another operator.
- **Affects**: `wms-outbound/src/picking/infrastructure/holder_change.rs:87-183`.
  A missing config row is read as `Block`.
- **Example**: Operator A has scanned 3 of 10 serials. A supervisor reassigns the
  task to B.
  - `Block`: refused, code `SERIAL_EPISODE_OPEN`.
  - `Handover`: the episode and its 3 scans move to B.
  - `CancelAndRestart`: the episode is cancelled (scans kept for audit); B
    starts again.
- **Interactions**: An `Abandoned` episode refuses in every mode
  (`SERIAL_EPISODE_ABANDONED`); a supervisor must close it first. Returning a
  task to the pool, or a lease that expires, proceeds in `Handover` and
  `CancelAndRestart`.
- **When empty**: Not possible.
- **If you change it**: Applies to the next reassignment.

### Anomaly: Max Serials per LPN (`anomaly_max_per_lpn`)

- **Screen**: **Max Serials per LPN**.
- **Column**: int, null allowed, default 1000.
- **Meaning**: Warn if one LPN would hold more serials than this.
- **Affects**: `SerialService::register_at_receive` (`serial_service.rs:244-285`,
  reader `:606-616`). The check runs when a receive targets an LPN:
  existing active serials on the container + new ones must be at most the
  limit. Refused with code 91 `SerialMassAnomaly`, **overridable**.
- **Example**: Limit 1,000. LPN holds 990. Receive 20 more: 1,010 > 1,000, refused
  (override possible).
- **When empty**: Null means no limit (no default cap is applied). Loose
  receives (no LPN) skip the rule.
- **If you change it**: Next receive.

### Anomaly: Velocity Threshold (min) (`anomaly_velocity_threshold_min`)

- **Screen**: **Velocity Threshold (min)**.
- **Column**: int, null allowed, default 30.
- **Meaning**: Warn if a serial ships sooner than this many minutes after it
  was received.
- **Affects**: `serial_ship` (`commands/ship_serial.rs`) runs `check_velocity`
  (`serial_service.rs`; default `DEFAULT_VELOCITY_THRESHOLD_MIN = 30`). When
  the serial ships sooner after receipt than this, the ship still goes
  through, and the serial gets a history row `AnomalyFlagged` with reason
  `SerialVelocityAnomaly`, and the event `process.serial.flagged_anomaly`
  (`anomaly_code` 90) is published.
- **Example**: threshold 30. A serial received at 10:00 and shipped at 10:12 is
  flagged; one shipped at 11:00 is not.

### Anomaly: Vendor Surge Factor (`anomaly_vendor_surge_factor`)

- **Screen**: **Vendor Surge Factor**.
- **Column**: double, null allowed, default 3.0.
- **Meaning**: Flag a supplier if today's serial count for one SKU is more
  than this many times its 30-day daily average.
- **Affects**: A background job, once every 24 hours, reads it
  (`app-server/src/services/cleanup_tasks.rs:1160-1260`, SQL at `:1247-1252`
  with `COALESCE(..., 3.0)`). It only writes a WARN to the server log
  ("ANOMALY 93 (SerialPatternAnomaly)"). It blocks nothing.
- **Example**: Average 100 a day, factor 3.0: today 301 or more is flagged.
- **When empty**: 3.0 is used.

### Anomaly: Block on Severity (`anomaly_block_severity`)

- **Screen**: **Block on Severity**.
- **Column**: boolean, null allowed, default `false`.
- **Meaning on the screen**: True = guards block by default.
- **Affects**: Stored only. It has no effect today. Each guard has a fixed
  severity in code (`AnomalySeverity::Block|Warn|Flag`, `serial_service.rs:36-44`).

## Part 2: What the system does with serials

### Serial states

Status enum `serial_status` (`wms-lib-core/src/model/inventory/inventory_balances_serial.rs:100-250`):

| State | Meaning |
|---|---|
| `Active` | In stock and free. |
| `Reserved` | Reserved for an order. |
| `Picked` | Picked. |
| `Shipped` | Left the warehouse. May still be returned. |
| `Returned` | Came back after shipping. |
| `Damaged` | Marked damaged. |
| `Disposed` | Destroyed. The only terminal state. Cannot be received again. |
| `Held` | On hold. Remembers its previous state. |
| `Packed` | Exists only so old rows decode. Nothing writes it. |

Allowed moves (`can_transition_to`, `:142-165`): Active -> Reserved, Damaged,
Held. Reserved -> Active, Picked, Held. Picked -> Shipped, Damaged, Held.
Shipped -> Returned. Returned -> Active, Damaged, Disposed, Held. Damaged ->
Disposed. Held -> Active, Reserved, Picked. A return to Active needs a quality
check done by the calling command, not by this table.

### Capture points (where serials are asked for)

| Point | What happens | Code |
|---|---|---|
| Receive against ASN, blind, return | Serials may come inline. Count must match the scope. Mask checked. Duplicates refused. | `validation_serial.rs:44-165`, `serial_service.rs:244` |
| Deferred capture after receive | An episode opens. The operator scans one barcode per call. | `commands/capture_serial.rs`, `receive/deferred_serial_capture.rs` |
| Pick | The picker must complete a Pick serial episode before commit. Quantity needed follows the scope. Without it the commit is refused ("requires a completed Pick serial episode"). | `picking/commands/commit.rs:409-440`, `picking/commands/capture_serial.rs:110` |
| Move | An open capture on the pallet blocks the move unless the SKU is `Flexible` and the move is a whole-LPN relocation. | `movement/serial_episode_policy.rs` |
| Reserve, Ship, Return, Dispose, Move of serials | Lifecycle commands (roles Admin, Manager). | `wms-serial/src/service/serial/commands/*`, `serial_commands_rpc.rs:29-35` |
| Pack | Not supported. A box with tracked stock cannot be verified. | `packing/commands/work_open.rs:135` |
| Stock adjustment | Not supported. A tracked SKU is refused (`SerialTrackedNotSupported`). | `stock_adjust/service.rs:313-322` |

Episode statuses: `Open`, `InProgress`, `AwaitingConfirmation`, `Committed`,
`Cancelled`, `Abandoned`. Business operations an episode can be for:
`Receive`, `Putaway`, `Move`, `Pick`, `Pack`, `Ship`, `Return`, `Adjust`,
`Inventory` (`wms-lib-core/src/model/serial_capture/episode.rs:62-125`). In
practice code opens episodes for Receive and Pick.

### Uniqueness

One serial number is unique per owner: `uq_serial_per_owner`
(`serial_number`, `owner_id`). At receive, `any_active_with_serials` refuses a
batch containing a serial that is already received for the owner (code 67
`SerialDuplicate`, `validation_serial.rs:143-165`). A serial whose row is
`Disposed` cannot be registered again (code 92, not overridable,
`serial_service.rs:632-660`).

### Anomaly rules, in plain terms

| Rule and code | Status today |
|---|---|
| 88 Return without ship | Enforced when returning (`commands/return_serial.rs:75`). |
| 89 Same serial at two locations | A background scan every 6 hours logs it (`cleanup_tasks.rs`). Nothing else checks it. |
| 90 Velocity | Checked at `serial_ship`. A warning, not a block: history row `AnomalyFlagged` and event `process.serial.flagged_anomaly`. |
| 91 Mass pattern per LPN | Enforced at receive; uses Max Serials per LPN; overridable. |
| 92 Reuse after disposed | Enforced at receive; hard block. |
| 93 Vendor surge | Background scan every 24 hours; log only. |
| 94 Lot mismatch | Not checked. |
| 95 Not on ASN list | Enforced in the capture loop when Allow ASN pre-advised is on. |

The setting Block on Severity does not change any of these.

## What happens to existing stock when you change a setting

- Serials already in `inventory_balances_serial` are never rewritten by a
  settings change.
- Changing scope, mask or length changes what the next scan must look like.
  Old serials are not rechecked.
- Turning tracking on for a SKU that already has stock gives that stock no
  serials. A pick of that stock will then ask for a completed serial episode
  and for serials that were never captured (`commit.rs:409-440`). Plan the
  capture of serials for the stock on hand first.
