# SKU-level settings: policy selectors, tracking and physical data

The `sku` table holds one row per SKU and owner. Several of its columns pick a
policy, override a rule or switch a tracking mode. This page lists every one
of them: the screen label, the column, the default, who reads it and what
happens when you change it.

Serial tracking is a separate row. See
[33-serial-configuration.md](33-serial-configuration.md). Cartonization is in
[31-cartonization-policy-settings.md](31-cartonization-policy-settings.md).
Lot policy is in [32-lot-policy-and-attributes.md](32-lot-policy-and-attributes.md).
Replenishment is in [35-replenishment-status.md](35-replenishment-status.md).

How to read a card: **Screen** is the label and menu path ("API only" lists
the RPC). **Column** gives the type and range. **Affects** names the code that
reads it (`file:line`). Paths are under `crates/libs` unless noted.

## Where the SKU is edited

Main menu **SKU**. Open a SKU. Tabs:

| Tab label | Form | What is on it |
|---|---|---|
| **Basic** | `sku_basic_form` | Owner, SKU Code, External ID, Pack, ABC Class, Class, SKU Group, Description, Active, Pick Instruction |
| **Weight** | `sku_weight_form` | Gross Weight, Net Weight, Tare Weight, Cube, Stack limit, Positions required |
| **Policies** | `sku_policies_form` | Allocation, Replenishment, Putaway, Cartonization, Receipt and Lot policies; Putaway Location, Putaway Zone, Putaway Class |
| **Shelf Life** | `sku_shelf_life_form` | Min. shelf life at shipping (days), Min Shelf Life on Pick, Min Shelf Life on Receive, Rotation, Rotate By, Expire Days |
| **Temperature & Aging** | `sku_temperature_form` | Requires Temperature Capture, Min and Max Temperature, Warning Temp Min and Max, Max Age on Receive (days) |
| **Serial Tracking** | `sku_serial_config_form` | See page 33 |
| **Attributes**, **Audit**, **Barcodes** | other | Free attributes, audit trail, barcode list |

Labels come from `wms-lib-sql/sql/wms-meta-ui/migrations/001_baseline.sql`
(form detail rows, forms 14, 15, 16, 17, 182, 200) and `082_pick_instruction_fields.sql`.

Many columns have **no screen field**. They are set only through the API:
`create_sku`, `update_sku` (roles Admin, Manager, Operator),
`create_sku_full`, `update_sku_full` (Admin, Manager). They are marked "API only"
below.

Units: weights are stored in the warehouse weight unit and lengths in the
warehouse length unit. The default is grams (`G`) and millimetres (`MM`),
and volumes in cubic millimetres. The screens convert to the display unit
(wms-meta-ui migration 004; `wms-enterprise` migration 001:333-334). The units
are frozen once the warehouse exists.

## Master map: which columns have an effect

| Column | Screen label | Read by a process? |
|---|---|---|
| `code`, `owner_id`, `descr`, `pack_id` | SKU Code, Owner, Description, Pack | Yes (identity) |
| `active` | Active | Yes, only when an outbound order line is added |
| `external_id` | External ID | **No. Stored only.** |
| `gross_wgt`, `cube` | Gross Weight, Cube | Yes (capacity checks) |
| `net_wgt`, `tare_weight` | Net Weight, Tare Weight | **No. Stored only.** |
| `stack_limit`, `positions_required` | Stack limit, Positions required | Yes (putaway) |
| `abc`, `class`, `sku_group`, `putaway_class`, `rotation` | ABC Class, Class, SKU Group, Putaway Class, Rotation | Yes (putaway criteria; `rotation` also allocation) |
| `allocation_policy_id` | Allocation Policy | Yes |
| `putaway_policy_id` | Putaway Policy | Yes |
| `cartonization_policy_id` | Cartonization Policy | Yes |
| `receipt_policy_id` | Receipt Policy | Yes |
| `lot_policy_id` | Lot Policy | Yes |
| `replenishment_policy_id` | Replenishment Policy | **No. Stored only.** |
| `barcode_format_id` | API only | **No. Stored only.** |
| `putaway_loc`, `putawayzone` | Putaway Location, Putaway Zone | Yes (steps "from SKU") |
| `receipt_qc_loc`, `return_location`, `pack_location` | API only | **No. Stored only.** |
| `rotate_by` | Rotate By | Yes (allocation) |
| `shelf_life` | Min. shelf life at shipping (days) | Yes (reservation and shipping; also shown) |
| `min_shelf_life_on_pick` | Min Shelf Life on Pick | Yes |
| `min_shelf_life_on_rec` | Min Shelf Life on Receive | Yes |
| `expire_days`, `deliver_by_days`, `best_by_days` | Expire Days (the others API only) | Yes (receiving works the missing dates out) |
| `max_age_on_rec` | Max Age on Receive (days) | Yes |
| `receipt_hold_code` | API only | Yes |
| `lot_hold_code` | none | **No. Stored only** (column exists; not in the Rust model) |
| `allow_multi_lot_on_lpn`, `force_separate_lpn_per_lot` | API only | Yes |
| `on_rec_copy_receipt_number` | API only | Yes |
| `requires_temperature_capture`, `min_temperature`, `max_temperature` | on the Temperature tab | Yes |
| `warning_temperature_min`, `warning_temperature_max` | on the Temperature tab | Yes |
| `default_uom` | API only | Yes |
| `pick_instruction` | Pick Instruction | Yes |

"Stored only" claims come from a search of the Rust code, SQL and UI for the
column name. Fixture structs in tests are not readers.

## Part 1: Policy selectors

Four of them use the same ladder: the SKU's own policy wins, else the owner's
default (`owner_config.default_*_policy_id`), else none.

| Policy | SKU column | Owner default column | Reader |
|---|---|---|---|
| Allocation | `allocation_policy_id` (nullable) | `default_allocation_policy_id` | `SkuBmc::resolve_allocation_policy`, `sku.rs:950-970` |
| Putaway | `putaway_policy_id` (nullable) | `default_putaway_policy_id` | `SkuBmc::resolve_putaway_policy`, `sku.rs:867-900` |
| Cartonization | `cartonization_policy_id` (nullable) | `default_cartonization_policy_id` | `SkuBmc::resolve_cartonization_policy`, `sku.rs:908-923` |
| Receipt | `receipt_policy_id` (**not null, default 1**) | `default_receipt_policy_id` | `ReceiptValidationService::new`, `wms-inbound/.../validation_service.rs:43-60` |
| Lot | `lot_policy_id` (**not null, default 1**) | `default_lot_policy_id` (no reader) | `deposit.rs:710` |
| Replenishment | `replenishment_policy_id` (**not null, default 1**) | `default_replenishment_policy_id` (no reader) | none |

Important: for Receipt, Lot and Replenishment the SKU column is `NOT NULL DEFAULT 1`. The first step of the
ladder is therefore never empty, and the owner default never gets a turn.
For Allocation, Putaway and Cartonization the default was removed in later
migrations (009 for cartonization) and the owner default works.

On the SKU screen all six policy pickers are marked **required**
(baseline form rows, `is_required = true`; for Putaway it is not required).
A SKU created on the screen therefore always names its own policies. An
approved import may leave nullable policy fields empty, so review imported
SKUs before releasing warehouse work.

### Allocation Policy

- **Screen**: SKU > Policies > **Allocation Policy** (picker). Required on screen.
- **Column**: `sku.allocation_policy_id`, bigint, null allowed, foreign key to
  `allocation_policy`, delete restricted. Default null.
- **Meaning**: The reservation rules used for this SKU.
- **Affects**: `resolve_allocation_policy`, used when an order
  is reserved. Details are in the allocation policy guide.
- **Interactions**: Wins over `owner_config.default_allocation_policy_id`
  ("Allocation Policy" on the owner configuration).
- **When empty**: The owner default. If that is also empty, the order line has
  no policy.
- **If you change it**: New reservations only. Order lines freeze the policy
  they were reserved with (wms-app migration 029).

### Putaway Policy

- **Screen**: SKU > Policies > **Putaway Policy** (picker, not required).
- **Column**: `sku.putaway_policy_id`, bigint, null allowed. Default null.
- **Affects**: `resolve_putaway_policy`. A pallet carrying one
  configured SKU beside an unconfigured one does not report a conflicting
  policy nobody wrote.
- **Interactions**: Wins over `owner_config.default_putaway_policy_id`.
- **When empty**: The owner default, else no putaway policy.
- **If you change it**: Next putaway suggestion.

### Cartonization Policy

See [31-cartonization-policy-settings.md](31-cartonization-policy-settings.md),
"SKU: Cartonization Policy". Column `sku.cartonization_policy_id`, nullable,
default null. Empty falls to the owner default, then to "no carton".

### Receipt Policy

- **Screen**: SKU > Policies > **Receipt Policy** (required).
- **Column**: `sku.receipt_policy_id`, bigint, not null, default 1, foreign key.
- **Meaning**: The receiving validation rules (quantity tolerance, date check
  mode, and so on).
- **Affects**: `validation_service.rs:43-60`.
- **Interactions**: The owner default is coded as the fallback, but the SKU
  column can never be null, so the fallback is unreachable.
- **When empty**: Not possible in the database.
- **If you change it**: Next receive.

### Lot Policy

See [32-lot-policy-and-attributes.md](32-lot-policy-and-attributes.md).
Column `sku.lot_policy_id`, not null, default 1. `NOLOT` (id 1000) asks for no
dates and no attributes.

### Replenishment Policy

See [35-replenishment-status.md](35-replenishment-status.md). Column
`sku.replenishment_policy_id`, not null, default 1. Stored only. It has no
effect today.

## Part 2: Identity and status

### Active

- **Screen**: Basic > **Active** (checkbox, required).
- **Column**: `sku.active`, boolean, not null, default `true`.
- **Meaning**: Can this SKU be sold?
- **Affects**: Only when an outbound order line is added: an inactive SKU gives
  "sku '<code>' is inactive". Receiving, putaway, counting and picking do not
  check it.
- **Example**: Switch off SKU A. A new order line for A is refused. Stock of A
  can still be received and moved.
- **When empty**: Read as inactive by the order code.
- **If you change it**: Existing orders and stock are not touched.

### Pick Instruction

- **Screen**: Basic > **Pick Instruction** (multi-line).
- **Column**: `sku.pick_instruction`, text, null allowed. Added by wms-app
  migration 044.
- **Meaning**: A standing note shown on every pick of this SKU.
- **Affects**: Shown on RF screen `PICKINS`. The picker must acknowledge it
  before the pick commits.
- **Example**: "Wear gloves. Fragile glass."
- **When empty**: Nothing is shown.
- **If you change it**: Next pick shown.

### External ID

- **Screen**: Basic > **External ID**.
- **Column**: `sku.external_id`, varchar(100), null allowed.
- **Affects**: Stored only. It has no effect today. Search:
  `grep -rn "external_id" crates/libs/wms-sku crates/libs/wms-lib-core/src/model/sku.rs`
  finds only the field declarations.

### ABC Class

- **Screen**: Basic > **ABC Class** (drop-down fed from code list 6, shown as
  "A - description").
- **Column**: `sku.abc`, enum `abc_speed_type` (`A`, `B`, `C`), null allowed;
  database default `B`.
- **Meaning**: Movement speed class.
- **Affects**: Only as a putaway step criterion "SKU ABC". A step may demand that the
  SKU's class equals a given value.
- **Example**: A step "ABC = A" sends fast movers only to the front zone.
- **When empty**: A step that names a value does not match a SKU without one.
- **If you change it**: Next putaway suggestion.

### Class and SKU Group

- **Screen**: Basic > **Class**, **SKU Group**.
- **Column**: `sku.class` (varchar(20)), `sku.sku_group` (varchar(10)), both
  free text, null allowed.
- **Affects**: Only as putaway criteria "SKU class" and "SKU group". The criterion editor offers the values found in
  your data.
- **When empty**: Does not match a criterion that names a value.

### Putaway Class

- **Screen**: Policies > **Putaway Class** (text box).
- **Column**: `sku.putaway_class`, enum `putaway_class` (`None`, `NoMix`),
  null allowed, database default `None`.
- **Meaning**: A product marking used by putaway rules.
- **Affects**: Only as the criterion "Putaway class".
  It does not itself forbid mixing; a step must test it.
- **Value `None`**: no marking. **Value `NoMix`**: marks products that a step
  can keep away from mixed locations.
- **If you change it**: Next putaway suggestion.

## Part 3: Physical data

### Gross Weight

- **Screen**: Weight > **Gross Weight** (required on screen).
- **Column**: `sku.gross_wgt`, double, not null, default 0, grams by default.
- **Meaning**: Fallback weight of ONE base unit.
- **Affects**: The one stock-weight formula:
  the weight of one unit is the weight of the **base pack item** if it is above
  0; else `sku.gross_wgt`; else unknown. That weight feeds capacity checks of
  a move, the weight of a pallet in putaway, location and zone fill, and the
  expected weight at the pack station. Cartonization does not use it; it
  uses `pack_item.weight` of the pick's level.
- **Example**: 25 units of a SKU with no base pack weight and gross weight 1.1 kg
  (1,100 g): 27,500 g.
- **Interactions**: Base pack item weight wins over this field.
- **When empty**: 0 means "weight unknown". An unknown weight passes any
  capacity check.
- **If you change it**: Applies to the next capacity check or putaway. Stored
  location fill values are recalculated from stock when read.

### Cube

- **Screen**: Weight > **Cube** (required on screen).
- **Column**: `sku.cube`, double, not null, default 0 (cubic millimetres by
  default).
- **Meaning**: Volume of ONE base unit.
- **Affects**: `putaway/mod.rs:1480` (pallet cube = cube x quantity), move
  capacity, location and zone fill.
- **Example**: Cube 1,000,000 mm³ x 50 units = 50,000,000 mm³ against a
  location's cube capacity.
- **When empty**: 0 means unknown.
- **If you change it**: Next capacity check.

### Net Weight and Tare Weight

- **Screen**: Weight > **Net Weight**, **Tare Weight** (both required on
  screen).
- **Column**: `sku.net_wgt`, `sku.tare_weight`, double, not null, default 0.
- **Affects**: Stored only. They have no effect today. Search:
  `grep -rn "net_wgt\|sku.tare_weight" crates --include=*.rs` outside
  fixtures and the SKU RPC returns nothing. (The packing tare is
  `container.tare_weight`, a different field.)

### Stack limit

- **Screen**: Weight > **Stack limit**.
- **Column**: `sku.stack_limit`, smallint, not null, default 0, at least 0.
- **Meaning**: How many pallets high this item may be stacked.
- **Affects**: Putaway.
  The engine takes the minimum of the SKU limits above 0 and the location's
  own limit. An item can lower a rack's limit, never raise it.
- **Example**: SKU 2, rack 4: limit 2.
- **When empty**: 0 = no opinion.
- **If you change it**: Next putaway suggestion.

### Positions required

- **Screen**: Weight > **Positions required**.
- **Column**: `sku.positions_required`, smallint, not null, default 1, at
  least 1.
- **Meaning**: How many adjacent positions of one section the item takes.
- **Affects**: Putaway. The whole section must be free. A mixed pallet needs the
  maximum of its items.
- **Example**: 3: three free neighbouring positions are needed.
- **If you change it**: Next putaway suggestion.

## Part 4: Putaway preferences

### Putaway Zone and Putaway Location

- **Screen**: Policies > **Putaway Zone**, **Putaway Location** (pickers).
- **Column**: `sku.putawayzone` (varchar(20), foreign key to `putawayzone.code`)
  and `sku.putaway_loc` (varchar(20), foreign key to `location.code`), null
  allowed.
- **Meaning**: The SKU's preferred zone and location.
- **Affects**: Only putaway steps whose scope is "Zone from SKU" or "Location
  from SKU". Without such a
  step they do nothing. The first line of the pallet decides.
- **When empty**: The step "does not apply" and the next step runs.
- **If you change it**: Next putaway suggestion.

### Receipt QC Location, Return Location, Pack Location

- **Screen**: API only (`create_sku`, `update_sku`).
- **Column**: `sku.receipt_qc_loc` (foreign key to `location.code`),
  `sku.return_location`, `sku.pack_location` (varchar(20), no foreign key).
- **Affects**: Stored only. They have no effect today. Search: `grep -rn
  "receipt_qc_loc\|return_location\|pack_location" crates clients ui` finds
  only the SKU model, the SKU RPC, test fixtures and (for pack location) the
  unrelated `work_area` field.

## Part 5: Rotation and shelf life

### How the dating settings work together

Seven columns of the SKU talk about dates. Five of them are counts of days.
One rule ties them together, and it is the same at every control point.

- **Today** is the warehouse day: the date in the warehouse's time zone (the
  `WAREHOUSE_TIMEZONE` setting; blank or missing reads as UTC). One SQL
  function, `warehouse_today()`, computes it. The Rust code reads it through
  `SystemSettingsBmc::warehouse_today`.
- **The boundary.** A date is fit only when it is **later than today + N**. A lot
  that expires today is expired. A lot that expires exactly on today + N is not
  fit. A missing or negative N counts as 0.
- **The rules** live in one place, `domain/lot_dating` of `wms-inventory`
  (`derive`, `judge`, `judge_receipt`). Receiving, allocation, picking and
  packing call it. The storage view `inventory_balance_dating` says the same
  in SQL, and a parity test holds the two together.

| Control point | N | Where |
|---|---|---|
| Receive | `min_shelf_life_on_rec`; also `max_age_on_rec` on the manufactured date; best-by and delivery-by must be later than today | `lot_dating::judge_receipt`, called from `date_deviations.rs` |
| Reserve (allocation) | the larger of `min_shelf_life_on_pick` and `shelf_life` | `find_allocation_candidates` |
| Pick (card, commit, short) | `min_shelf_life_on_pick` | `picking/confirmation/shelf_life.rs` |
| Ship (carton close) | `shelf_life` | `domain/packing_carton` (`judge_lots_fit_to_ship`) |

**Expiration is worked out once, at receiving.** A date the operator typed
stays as typed and is stored as `Explicit`. A missing one is worked out from
the manufactured date: expiration = manufactured + `expire_days`, best-by =
manufactured + `best_by_days`, delivery-by = manufactured + `deliver_by_days`.
It is worked out only when the day count is above zero, and it is stored as
`Derived`. The lot keeps the date and its source from then on. Later changes of
the SKU's day counts do not recompute lots already received. (When this
feature was introduced, lots that already had a manufactured date and no date
of their own were filled in once the same way.)

**A lot with no expiration** has nothing to judge, so it passes every check,
with one exception. Where an expiration is **required**, a lot without one is
not reserved, and the receipt is refused with code 49 (`DateExpirationMissing`;
the receipt policy's `Allow` skips the check and `Warning` makes it
overridable, as for the other date checks).
An expiration is required when the lot policy asks for it
(`required_expiration_date`) or the SKU has `expire_days` above zero. Picking
and shipping do not refuse such a lot: it is already on the shelf or reserved,
and there is no date to judge.

**Nothing is held on expiry.** A lot that runs out of days stays as it is in
the stock and gets no hold. It is simply never reserved, a pick of it is
refused, and a carton with it does not close. The only hold tied to dates is
the receiving warning band (see `min_shelf_life_on_rec` below).

**The storage view.** `inventory_balance_dating` has one row per lot, owner and
SKU that has a balance row (an emptied lot too; the dashboard count asks for
stock itself). It carries the three dates and their sources, `days_left`,
`expired`, `fit_to_pick`, `fit_to_ship`, `fit_to_reserve` and
`missing_expiration`. The dashboard count "lots expiring" reads it. The
Lot register on the balances screen reads this view too: it carries the
register's own columns (quantity, locations, status, allocated, available)
computed as the older view `inventory_balance_by_lot` computes them, and the
register adds the column **Expired**. Its **Days left** now counts from the
warehouse day. A lot with no stock is listed, as before. The older
view stays for its other readers.

### Rotation

- **Screen**: Shelf Life > **Rotation** (required). Values from the enum:
  `Fifo`, `Lifo`, `Fefo`.
- **Column**: `sku.rotation`, enum `sku_rotation`, not null, default `Fifo`.
- **Meaning**: Which stock is picked first.
- **Affects**: Allocation sort.
  Also a putaway criterion "Rotation".
- **Value `Fifo`**: oldest first, by the date that **Rotate By** names.
  **`Lifo`**: newest first. **`Fefo`**: earliest expiry first; it ignores
  Rotate By and always uses the expiration date.
- **Example**: Fefo, lots expiring 2027-01-10 and 2027-03-01: the first is
  picked first. A lot with no expiration date sorts last, under every rule.
- **If you change it**: Next reservation. Stock already reserved is not
  re-sorted.

### Rotate By

- **Screen**: Shelf Life > **Rotate By** (required). Drop-down from the
  `ROTATEBY` code list.
- **Column**: `sku.rotate_by`, varchar(20), not null, default `Lot`.
- **Values**: `Lot` ("Lot number": the lot row's creation time, not its code),
  `Mandate` (manufactured date), `ExpDate` (expiration date), `BestBy`
  (best-by date), `DelivBy` (delivery-by date).
- **Affects**: `allocation/trace.rs:904-930`. Any other text stops the
  reservation with "has rotate_by = '...', not a value the ROTATEBY code list
  defines".
- **When empty**: Not possible.
- **If you change it**: Next reservation.

### Min. shelf life at shipping (days) (`shelf_life`)

- **Screen**: Shelf Life > **Min. shelf life at shipping (days)**.
- **Column**: `sku.shelf_life`, int, null allowed.
- **Meaning**: The **minimum days of life a lot must still have when it is
  shipped**. It is not how long the product lasts, and it never works out an
  expiration (`expire_days` does that).
- **Affects**: Two checks. Shipping: a carton does not close while a lot in
  it expires on or before today + `shelf_life` (refusal `LOT_NOT_FIT_TO_SHIP`;
  an expired lot is refused with any value). Reservation: allocation takes
  only lots that expire after today + the larger of `shelf_life` and
  `min_shelf_life_on_pick`, so goods that could not ship in time are not
  reserved. It is also shown in the Receive dialog.
- **Example**: 20 on 2026-10-10: a lot expiring 2026-10-30 is not fit to ship;
  one expiring 2026-10-31 is.
- **When empty**: Read as 0: only a lot that expires today or earlier is
  refused.
- **If you change it**: Next reservation and next carton close. Reservations
  already made are not undone; the carton close judges them.

### Min Shelf Life on Pick (`min_shelf_life_on_pick`)

- **Screen**: Shelf Life > **Min Shelf Life on Pick**.
- **Column**: `sku.min_shelf_life_on_pick`, int, null allowed, default 0.
- **Meaning**: Days of life a lot must still have to be offered for a pick.
- **Affects**: Three places, all with the boundary "expires after today +
  days". Allocation reserves only lots past the larger of this and
  `shelf_life`. The pick card, the pick commit and the short judge the reserved
  lot again on the pick day, because a lot crosses the line as days pass. When the lot
  is expired or below the minimum, the short is allowed only with the reason
  `EXPIRED`, and `EXPIRED` is allowed only for such a lot. A lot with no
  expiration date is picked.
- **Example**: 30 on 2026-10-10: a lot expiring 2026-11-09 is not reserved or
  picked; one expiring 2026-11-10 is.
- **When empty**: Read as 0: only lots that expire today or earlier are
  excluded.
- **If you change it**: Next reservation and next commit. A reservation already
  made is re-judged at commit.

### Min Shelf Life on Receive (`min_shelf_life_on_rec`)

- **Screen**: Shelf Life > **Min Shelf Life on Receive**.
- **Column**: `sku.min_shelf_life_on_rec`, int, null allowed, default 0.
- **Meaning**: Days of life a lot must still have when it arrives.
- **Affects**: The expiration check `DateExpirationTooSoon`
  (`lot_dating::judge_receipt`, called from `check_date_deviations`), switched
  by the receipt policy's `date_deviation_check` (`Allow`, `Warning`, `Error`).
  The expiration it judges is the typed one or the one worked out from
  `expire_days`. An expiration that is not later than today + this value is
  refused; an expired lot is refused the same way. Also the width of the QC
  warning band (see page 32; `evaluate_date_warning_band`). It is also shown
  in the Receive dialog.
- **Example**: 90 days, expiration in 60 days, policy `Error`: the receive is
  refused. Expiration exactly 90 days away: refused too; 91 days passes.
- **When empty**: Read as 0.
- **If you change it**: Next receive.

### Max Age on Receive (days) (`max_age_on_rec`)

- **Screen**: Temperature & Aging > **Max Age on Receive (days)**. Hint: "Max
  days from manufactured_date to receive".
- **Column**: `sku.max_age_on_rec`, int, null allowed.
- **Affects**: `DateManufacturedTooOld` (`lot_dating::judge_receipt`), same
  receipt-policy switch.
- **Example**: 180: manufactured 200 days ago is refused (policy `Error`).
  Manufactured exactly 180 days ago passes.
- **When empty**: No check.

### Expire Days, Deliver By Days, Best By Days

- **Screen**: Shelf Life > **Expire Days**. The other two are API only.
- **Column**: `sku.expire_days`, `sku.deliver_by_days`, `sku.best_by_days`,
  int, null allowed, default 0.
- **Meaning**: Days from the manufactured date to the expiration, the
  delivery-by date and the best-by date.
- **Affects**: Receiving. When the operator did not type a date and the lot
  has a manufactured date, the date is the manufactured date plus the day
  count, and it is stored as `Derived`. A count of 0 or empty works out
  nothing. A typed date always wins and is stored as `Explicit`. The worked-out
  dates are then judged by the receiving checks like typed ones. A positive
  `expire_days` also makes an expiration required: a lot with neither a typed
  expiration nor a manufactured date is refused with code 49 (a hard
  refusal; the receipt policy's `Warning` makes it overridable and `Allow`
  skips it; such a lot is not reserved if it got in anyway). Only `expire_days` makes an expiration;
  `shelf_life` never does.
- **Example**: `expire_days` 365, manufactured 2026-01-01, no expiration
  typed: the lot's expiration is 2027-01-01, source `Derived`.
- **Interactions**: A lot policy that requires the expiration date still asks
  the operator to type it at capture, even when it could be worked out. The
  receive screen does not use the derivation to skip that question.
- **If you change it**: Next receive. Lots already received keep the dates
  they have.

## Part 6: Holds, temperature and lots on pallets

### Receipt Hold Code

- **Screen**: API only.
- **Column**: `sku.receipt_hold_code`, varchar(30), foreign key to
  `inventory_hold_code.code`, null allowed.
- **Meaning**: Every receipt of this SKU is put on this hold.
- **Affects**: `evaluate_sku_receipt_hold_code`.
  The values empty, `None`, `Ok`, `NotHold` mean no hold. `NewItem` applies only
  to the first-ever receive of the SKU. Any other code is applied as the hold
  on the pallet or location.
- **Example**: Code `QcQuarantine`: each pallet is held for inspection.
- **When empty**: No hold.
- **If you change it**: Next receive. Existing holds stay.

### Lot Hold Code

- **Screen**: none.
- **Column**: `sku.lot_hold_code`, varchar(30), foreign key to
  `inventory_hold_code.code`.
- **Affects**: Stored only. It has no effect today. The Rust `Sku` model does
  not even carry it; only the schema and a code-comment in
  `policies/inventory_hold_code.rs:18` mention it.

### Requires Temperature Capture and the temperature limits

- **Screen**: Temperature & Aging > **Requires Temperature Capture**,
  **Min Temperature (°C)**, **Max Temperature (°C)**, **Warning Temp Min (°C)**,
  **Warning Temp Max (°C)**.
- **Columns**: `requires_temperature_capture` (boolean, not null, default
  `false`), `min_temperature`, `max_temperature`, `warning_temperature_min`,
  `warning_temperature_max` (double, null allowed).
- **Affects**: `rules/temperature.rs:56-105`. Off: no check. On and no reading:
  `TemperatureRequired` (not overridable). Reading below min or above max:
  `TemperatureOutOfRange` (overridable). A null limit is not checked. The
  warning band is separate: a reading outside `[warning min, warning max]`
  puts a `QcQuarantine` hold on the pallet, but only if both warning limits are
  set and a reading was taken.
- **Example**: Min 2, max 8, warning 3 to 7. Reading 8.5 is refused
  (overridable). Reading 7.5 passes but triggers a hold.
- **If you change it**: Next receive.

### Allow multi-lot on LPN, Force separate LPN per lot

See [32-lot-policy-and-attributes.md](32-lot-policy-and-attributes.md), Part 5.
Both are API only, default `false`. Read at `inventory_service.rs:1195-1260`.

### Copy receipt number to lot (`on_rec_copy_receipt_number`)

- **Screen**: API only.
- **Column**: `sku.on_rec_copy_receipt_number`, boolean, not null, default
  `false`.
- **Meaning**: When a receive makes a new lot, store the receipt number on it.
- **Affects**: `deposit/deposit.rs:549`.
- **If you change it**: New lots only.

## Part 7: Units, barcodes and other

### Default UOM

- **Screen**: API only on the SKU. (A different field named "Default UOM"
  exists on the barcode edit form.)
- **Column**: `sku.default_uom`, varchar(30), null allowed.
- **Meaning**: The unit to use when none is given.
- **Affects**: Validated on create and update: it must be an active code in
  the `UOM` list, or the call fails.
  Used as the base unit in receiving
  and deposit. The code comment calls it a display hint
  for the base unit; the pack tiers decide quantities.
- **UOM class**: each unit code has a class in table `uom_class`: `Handling`,
  `Container`, `Weight`, `Length`, `Volume`, `Area`. `Weight`, `Length`, `Volume` and `Area` are
  "measured" (kilograms, metres): quantities are weights or cuts, not whole
  pieces. Allocation step cards warn when a rule can never match a measured
  unit.
- **Example**: `EA` for pieces, `KG` for loose goods.
- **When empty**: Receiving falls back to `EA`.
- **If you change it**: Applies to the next transaction. Stock already held
  keeps its stored unit.

### Barcode Format

- **Screen**: API only.
- **Column**: `sku.barcode_format_id`, bigint, null allowed, foreign key to
  `barcode_format`.
- **Affects**: Stored only. It has no effect today. Search: `grep -rn
  "\.barcode_format_id" crates --include=*.rs` shows only the barcode format
  tables' own details. The scanner does not look at this column.

### Pack

- **Screen**: Basic > **Pack** (picker, required).
- **Column**: `sku.pack_id`, bigint, not null, foreign key to `pack`.
- **Meaning**: The pack hierarchy of the SKU: EA, IP, CS, PL levels with their
  sizes and weights.
- **Affects**: Everything that converts units: receiving, serial scope counts
  (`PerPallet` uses the item with UOM `PL`), cartonization (size, weight,
  rotation of the pick's level), putaway, order lines. See the pack guide.
- **If you change it**: Pack revisions keep old lines readable; picks planned
  on the old pack keep their written plan.

## Part 8: Things people look for that are not SKU columns

- **Hazmat or dangerous goods.** The `sku` table has no such column. Keep it
  as a custom attribute: SKU > tab **Attributes** (tables `attribute_def` and
  `attribute_value`, entity type `sku`). A putaway step can then match on it
  with the criterion "SKU attribute". No other
  process reads these attributes.
- **A "lot tracked" or "expiry tracked" switch.** None exists. Lot behaviour
  comes from the Lot Policy (page 32). Expiry behaviour comes from the Lot
  Policy dates, the SKU's day counts (Expire Days, Best By Days, Deliver By
  Days), Min Shelf Life on Pick and on Receive, Max Age on Receive and Shelf
  Life (see Part 5). A SKU with Expire Days above zero needs an expiration on
  every lot.
- **Serial tracking switch.** It is on the Serial Tracking row, not on `sku`
  (page 33).
- **Catch weight and dual unit.** They are set on the pack item
  (`pack_item.is_catch_weight`, `is_dual_uom`), not on the SKU. The packing
  rule says a catch-weight item makes the verdict "not comparable". The packing contents query reads the
  flag from the SKU's active pack through `StockWeights`; one catch-weight
  level makes the package's nominal execution weight not comparable.
- **Track inventory by.** `owner_config.track_inventory_by` (default `Lot`) is
  an owner field. No decision reads it (`grep -rn track_inventory_by` finds only
  the owner model, the owner RPCs and an example). Stored only. It has no
  effect today.

## What happens to stock and orders when you change a SKU column

- Quantities on hand are never rewritten by a SKU change.
- Policy selectors act on the next transaction that resolves them. Written
  plans, frozen order-line policies and stored lots stay as they are.
- Changing `pack_id` or pack item sizes changes what cartonization sees; the
  plan fingerprint changes, so the next reserve or release recalculates.
- Turning on `active`, `requires_temperature_capture` or a hold code does not
  touch old receipts.

## Summary of settings that do nothing today

`external_id`, `net_wgt`, `tare_weight`, `replenishment_policy_id`,
`barcode_format_id`, `receipt_qc_loc`, `return_location`, `pack_location`,
`lot_hold_code`, and the
owner defaults `default_lot_policy_id`, `default_replenishment_policy_id`.
Each was searched in the Rust code, the SQL and the
UI; no process reads it to make a decision.
