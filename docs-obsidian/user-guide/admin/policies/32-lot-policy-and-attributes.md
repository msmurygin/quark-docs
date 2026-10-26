# Lot policy and lot attributes: settings reference

A lot policy says what the warehouse records about each lot, and how strictly.
It covers four dates, a list of your own attributes (such as colour), when a
new lot number is made, and what the picker sees and checks at the shelf.

How to read a card: **Screen** is the label and menu path. **Column** is the
table and type. **Affects** gives `file:line` of the code that reads the
value. Paths are under `crates/libs` unless noted.

## Where to open it

Main menu: **Policy** > **Lot Policy**. Opening a policy shows one editor
(a "Component" form) with blocks **General**, **Date attributes** and
**Custom attributes**, and the buttons **Save** and **Refresh**. One Save
writes the policy and every attribute together. The policy has a version
number. A stale save is refused (optimistic lock,
`wms-lib-core/src/model/policies/lot_policy/aggregate.rs:337-400`).
Source of labels: `wms-lib-sql/sql/wms-meta-ui/migrations/041_lot_policy_is_one_component.sql:103-127`
and `112_lot_policy_pick_metadata.sql`.

Tables: `lot_policy` (one row per policy) and `lot_policy_attribute` (your own
attributes, many per policy). The four dates are columns of `lot_policy`, not
rows of the attribute table.

## Which lot policy a SKU uses

- **Only the SKU decides.** `sku.lot_policy_id` is the single selector.
- Screen: SKU > open a SKU > tab **Policies** > **Lot Policy**. Required.
- Column: `sku.lot_policy_id`, bigint, **not null**, default **1**, foreign key
  to `lot_policy` (restrict). Baseline `001_baseline.sql:2149`.
- Seed: policy 1 is `STD`. Policy 1000 is `NOLOT` ("No-tracking policy").
- `owner_config.default_lot_policy_id` ("Lot Policy" on the owner configuration)
  exists, but **no code reads it**. Search: `grep -rn default_lot_policy_id
  crates --include=*.rs` finds only the model and the owner RPCs. Stored only.
  It has no effect today. The fallback cannot work anyway, because the SKU
  column is never empty.
- `NOLOT` is a policy with no dates and no attributes. A SKU on `NOLOT` is not
  free of lots. Every receive still resolves a lot number (`deposit.rs:710-780`;
  the code treats every SKU as having a policy, because the column is not
  null).
- When you change the SKU's policy, old lots keep the dates and attributes
  they already have. New receipts follow the new policy.

## Part 1: Policy header (table `lot_policy`)

### Code

- **Screen**: General > **Code**. Set when the policy is created.
- **Column**: `lot_policy.code`, varchar(10), unique, not null.
- **Default**: none. Seed: `STD`, `NOLOT`.
- **Meaning**: The short name.
- **Affects**: Create refuses an empty code ("lot policy code cannot be empty",
  `aggregate.rs:247`). The code is also read as a putaway criterion value
  (`LotPolicyBmc::list_codes_by_ids`, `lot_policy.rs`).
- **Example**: `COLOR`, `PHARMA`.
- **Interactions**: A duplicate is refused.
- **When empty**: Refused.
- **If you change it**: Not changed by save.

### Description

- **Screen**: General > **Description**.
- **Column**: `lot_policy.descr`, varchar(50), null allowed.
- **Default**: null. Seed: `Standard Lot Policy`, `No-tracking policy`.
- **Meaning**: A note.
- **Affects**: Display only. Stored only. It has no effect today.
- **When empty**: Allowed.
- **If you change it**: No effect.

### Version

- **Screen**: not shown (the editor keeps it).
- **Column**: `lot_policy.version`, int, not null, above 0 (wms-app migration 021).
- **Default**: 1.
- **Meaning**: Counter for the whole policy (root and attributes).
- **Affects**: Optimistic lock on save (`aggregate.rs:337-400`).
- **If you change it**: Not editable.

### Lot creation (`lot_creation`)

- **Screen**: General > **Lot creation**. Values: **Reuse matching lot**,
  **One lot per receipt**, **One lot per receive event**.
- **Column**: `lot_policy.lot_creation`, enum `lot_creation_policy`
  (`Existing`, `PerReceipt`, `PerReceiveEvent`), not null.
- **Default**: `Existing`. Seed `Existing` for both seed policies.
- **Meaning**: When is a new lot number made?
- **Affects**: `deposit.rs:741-780` (receiving). Also `transfer/create_new_lot_by_attrs.rs:73`
  (the "create lot by attributes" command) and
  `transfer/attribute_template.rs:50` (whether the search asks for the
  receipt number).
- **Example**: Two arrivals of 100 shirts, colour red, same receipt.
  - `Existing`: both go to one lot (same attributes match).
  - `PerReceipt`: one lot for the whole receipt; a second receipt makes a
    second lot.
  - `PerReceiveEvent`: every physical arrival makes its own lot, so stock from
    the two arrivals never merges.
- **Interactions**: Lot numbers come from the warehouse `lot` counter,
  10 characters at most (`deposit.rs:696-701`).
- **When empty**: Not possible.
- **If you change it**: Old lots stay as they are. Only new receives follow the
  new mode. Under `Existing`, finding several lots with the same attributes is
  an error ("found several lots with the same attributes"); `PerReceipt` and
  `PerReceiveEvent` avoid it by design.

#### Value `Existing` ("Reuse matching lot")

Search for a lot of this SKU and owner with the same attributes. Use it. Make
a new lot only if none matches (`deposit.rs:745-755`).

#### Value `PerReceipt` ("One lot per receipt")

Ask the receipt's own receive history for the lot of this SKU. Use it. If the
receipt has none, make one (`deposit.rs:757-775`).

#### Value `PerReceiveEvent` ("One lot per receive event")

Always make a new lot. Never search (`deposit.rs:776-784`).

## Part 2: The four dates (columns of `lot_policy`)

There are four dates. For each date the policy has the same five settings.
The table gives the exact column and screen label for every date.

| Setting | Manufactured date | Expiration date | Delivery-by date | Best-by date |
|---|---|---|---|---|
| Show (screen "Show") | `show_manufactured_date` | `show_expiration_date` | `show_delivery_by_date` | `show_best_by_date` |
| Required ("Required") | `required_manufactured_date` | `required_expiration_date` | `required_delivery_by_date` | `required_best_by_date` |
| Label ("Label") | `label_manufactured_date` | `label_expiration_date` | `label_delivery_by_date` | `label_best_by_date` |
| Show on pick ("Show on pick") | `show_on_pick_manufactured_date` | `show_on_pick_expiration_date` | `show_on_pick_delivery_by_date` | `show_on_pick_best_by_date` |
| Verification ("Verification") | `verification_manufactured_date` | `verification_expiration_date` | `verification_delivery_by_date` | `verification_best_by_date` |

The row labels of the dates on the screen are **Manufactured date**,
**Expiration date**, **Delivery-by date** and **Best-by date**. The block
title is **Date attributes**, with column heads **Date**, **Show**,
**Required**, **Label**, **Show on pick**, **Verification**.

Dates are stored and shown as `YYYY-MM-DD`. When an operator types a date,
these formats are accepted: ISO 8601, `YYYY-MM-DD`, `DD.MM.YYYY`, `DD/MM/YYYY`,
`MM/DD/YYYY` (`wms_lib_utils::time::parse_lenient_date`, used at
`lot_attribute_validation.rs:217-244`). The date rules at receiving (below) and
the shelf-life warning band read the same formats, through one function
`parse_captured_date` (`validation_internal_helpers.rs:89`). Before the fix P-04
(commit `d13642b77`) they read only `YYYY-MM-DD`, and an expired lot typed
`01.01.2020` passed unchecked.

### Show

- **Column type**: boolean, not null.
- **Default**: `false` for all four. Seed: `false`.
- **Meaning**: Ask for this date when receiving.
- **Affects**: `shown_attributes` makes a prompt for each shown date, after
  the custom attributes (`lot_attribute_validation.rs:121-200`). The prompt
  list drives the receive dialog and the RF capture screens
  (`wms-inbound/.../lot_attribute_prompt.rs:100-110`). A date with Show off
  gets no prompt. If a value is sent anyway and it parses, it is still saved
  (`parse_date_from_map`, `lot_attribute_validation.rs:217-244`).
- **Example**: Expiration date Show on: the receiver is asked for it.
- **Interactions**: Required needs Show. Show on pick needs Show.
- **When empty**: n/a.
- **If you change it**: New receives only.

### Required

- **Column type**: boolean, not null. **Default**: `false`.
- **Meaning**: Receiving cannot finish without this date.
- **Affects**: `parse_date_from_map` (`lot_attribute_validation.rs:217-244`).
  Required and missing: error "<name> is required, but was not provided".
  Required and present but unreadable: a system error "Could not parse date for
  <name>". Optional and unreadable: ignored, the date is left empty and the
  receive goes on. The raw text stays in the lot's user attributes.
- **Database rule**: `lot_policy_required_dates_are_shown` forbids Required
  without Show (wms-app migration 021). The editor says "<name> cannot be
  required while it is hidden" (`aggregate.rs:166`).
- **Example**: Expiration required: a receive without it is refused.
- **Expiration, derivable or not**: this check is about what was typed.
  Expiration required with no expiration typed is refused here, even when the
  SKU could work one out from the manufactured date and `expire_days` (see
  Date rules at receiving). To let such a lot in on the manufactured date
  alone, leave Required off and give the SKU an `expire_days`.
- **If you change it**: New receives only. Lots already received are not
  touched.

### Label

- **Column type**: varchar(20), null allowed. **Default**: null.
- **Meaning**: The caption for the date in receive prompts and on the pick
  card.
- **Affects**: `lot_attribute_validation.rs:155-190` (prompt),
  `picking/confirmation/lot_display.rs:168` (pick card).
- **Example**: Label "Use by" for the expiration date.
- **When empty**: The date is named in the reader's language from the system
  texts ("Expiration date" etc.). The English description inside the policy is
  not used.
- **If you change it**: Display only.

### Show on pick

- **Column type**: boolean, not null. **Default**: `false`.
- **Meaning**: Show the lot's date on the picker's card.
- **Affects**: `picking/confirmation/lot_display.rs:58-95` builds the card; if
  no shown item is marked, the card shows nothing.
  `picking/confirmation/source_facts.rs:225-245` collects the shown items for
  the confirmation plan.
- **Database rules**: `chk_lot_policy_pick_dates_need_receipt`: needs Show.
  The editor says "<name> cannot be shown on pick while it is not captured on
  receipt" (`aggregate.rs:226`).
- **Example**: Expiration date Show on pick: card says "Use by 2027-03-01".
- **If you change it**: Applies to the next card shown.

### Verification

- **Column type**: enum `lot_physical_verification` (`NotVerifiable`,
  `Visual`, `Barcode`, `VisualOrBarcode`), not null. **Default**: `NotVerifiable`.
- **Meaning**: How the picker proves the date on the goods.
- **Affects**: `domain/pick_confirmation/plan.rs:141-155` (see the value table
  below).
- **Database rule**: anything other than `NotVerifiable` needs Show on pick
  (`chk_lot_policy_verified_dates_are_shown`; message "<name> cannot be
  verified on pick while it is not shown on pick", `aggregate.rs:231`).
- **If you change it**: Applies to confirmations started afterwards.

Screen captions of the four values: **Not verifiable**, **Visual**,
**Barcode**, **Visual or barcode** (column head **Verification**).

How the values act at the pick (`plan.rs:141-155, 221-229`). Only attributes
that are shown on pick, that the reserved lot has a value for, and that pass
this table are asked:

| Value | Asked at pick? | How |
|---|---|---|
| `NotVerifiable` | Never. | The card may show it. Nothing is asked. |
| `Visual` | Only when the picking policy's lot-attribute capture is "scan or manual" (typing allowed). | Scan or type. |
| `Barcode` | Yes, always. | Scan only. |
| `VisualOrBarcode` | Yes, always. | Scan or type; scan only when capture is "scan only". |

When the Picking policy's loose-lot confirmation is "confirm lot
attributes" and no attribute is askable, the pick is refused as "not
physically identifiable" (`NoVerifiableAttributes`, `plan.rs:~255`).

## Part 3: Custom attributes (table `lot_policy_attribute`)

Screen: **Custom attributes** block, button **Add attribute**, remove button
**Remove attribute**. Same Show, Required, Label, Show on pick and
Verification settings as the dates, plus the extras below. Each attribute is
one row. The save keeps row identity: you can change, add and remove rows, and
all of it commits with the root.

A row cannot be deleted while any lot holds a value for it
(`fk_lot_attributes_lot_policy_attribute_id`, restrict, baseline `001_baseline.sql:17101`).
Switch Show off instead.

### Attribute code (`attrib_code`)

- **Screen**: Custom attributes > **Attribute code**.
- **Column**: `lot_policy_attribute.attrib_code`, varchar(20), not null.
- **Default**: none. Seed: `COLOR`.
- **Meaning**: The key of the attribute.
- **Affects**: Save refuses empty or duplicate codes inside one policy
  (`aggregate.rs:184-203`). The code is the key for `location_lot_commingle`
  and `putawayzone_lot_commingle` rules.
- **Example**: `COLOR`, `SIZE`, `BATCHNO`.
- **Interactions**: Date names (`manufactured_date`, `expiration_date`,
  `delivery_by_date`, `best_by_date`) are reserved for the four dates
  (`lot_attribute_validation.rs:96-101`). Do not use them as codes.
- **When empty**: Refused.
- **If you change it**: Values stored under the old row keep their link
  (by row id).

### Description (attribute)

- **Screen**: A cell in the attribute row.
- **Column**: `lot_policy_attribute.descr`, varchar(50), null allowed.
- **Default**: null. Seed: `Colour of the T-SHIRT`.
- **Meaning**: A text for people. Also a fallback caption.
- **Affects**: `LotPrompt.descr` in the lot template
  (`transfer/attribute_template.rs:57-66`) and receive prompts. Not a
  decision.
- **When empty**: Allowed.
- **If you change it**: Display only.

### Show (attribute)

- **Column**: `lot_policy_attribute.show`, boolean, not null, default `false`.
  Seed COLOR: `true`.
- **Meaning**: Ask for it when receiving.
- **Affects**: Only attributes with Show are asked and only they are checked
  (`lot_attribute_validation.rs:135, 254`). A hidden attribute is ignored: a
  value sent for it is dropped.
- **If you change it**: New receives only.

### Required (attribute)

- **Column**: `lot_policy_attribute.required`, boolean, not null, default
  `false`. Seed COLOR: `true`.
- **Meaning**: Receiving cannot finish without a value.
- **Affects**: `validate_required_lot_attributes` (`lot_attribute_validation.rs:248-275`):
  missing gives "Attribute '<code>' is required but was not provided".
- **Database rule**: `lot_policy_attribute_required_is_shown` (needs Show).
- **Example**: COLOR required: receiving blue shirts without a colour fails.
- **If you change it**: New receives only. Old lots with no value stay valid.

### Label (attribute)

- **Column**: `lot_policy_attribute.label`, varchar(20), null allowed.
  Seed COLOR: `Color:`.
- **Meaning**: The caption on prompts and on the pick card.
- **Affects**: `lot_display.rs:168` (the card shows the label, then the code if
  no label).
- **When empty**: The code is the caption.

### Override allowed

- **Screen**: Custom attributes > **Override allowed**.
- **Column**: `lot_policy_attribute.override_allowed`, boolean, not null,
  default `false`. Seed: `false`.
- **Meaning**: May a supervisor accept a captured value that differs from
  what the ASN said?
- **Affects**: Only when the receipt line has `lot_attr_check_mode =
  Advisory`. A different value gives code 36 "LotAttributeMismatch" and it is
  overridable only if this flag is on (`validation_lot_attrs.rs:50-100`). A
  missing value gives code 35 and is never overridable. `Disabled` (the
  default) skips the check. `Strict` is a hard-reject path handled elsewhere
  (`validation_external_lot.rs`).
- **Example**: ASN says COLOR=RED, operator scans BLUE. Flag on: a supervisor
  can override. Flag off: refused.
- **If you change it**: Next check only.

### Show on pick (attribute) and Verification (attribute)

- **Columns**: `lot_policy_attribute.show_on_pick` (boolean, default `false`)
  and `lot_policy_attribute.physical_verification` (enum
  `lot_physical_verification`, default `NotVerifiable`).
- **Screen**: **Show on pick** and **Verification** in the row.
- **Meaning, effects, values**: exactly as for the dates (Part 2).
- **Database rules**: `chk_lot_policy_attribute_pick_needs_receipt` and
  `chk_lot_policy_attribute_verified_is_shown`.
- **Pick compare**: the picker's value and the lot's value are trimmed and
  upper-cased before comparing (`plan.rs:~100-120`, `normalize_value`), so
  `red` and `RED` match.

Limits to remember: `lot_attributes.attribute_value` is varchar(20) and
`lot_attributes.lot` is varchar(10) (baseline `001_baseline.sql:3101-3110`).
A value longer than 20 characters cannot be stored.

## Part 4: Where the policy is enforced

| Process | What is read | Code |
|---|---|---|
| Receiving (against ASN, blind, return, case level) | `lot_creation`; required dates and attributes; Show decides what is asked. | `deposit/deposit.rs:710-790`, `lot_attribute_validation.rs:33-70` |
| Create lot by attributes (own command) | Same validation; mode `Existing` looks for a lot first. | `transfer/create_new_lot_by_attrs.rs:40-95` |
| Receive prompts | Shown attributes and dates, labels, expected values from the ASN. | `wms-inbound/.../lot_attribute_prompt.rs` |
| Date checks at receive | Dates, worked out where missing, against the SKU's day counts and the receipt policy (see below). | `validation/rules/date_deviations.rs`, `lot_dating::judge_receipt` |
| Putaway and Move landing | Attribute commingle rules (Part 5). | `inventory_service.rs:1433-1580` |
| Allocation | Rotation date; the lot's expiration against today + the larger of the SKU's minimum shelf life on pick and its shelf life; a dated lot where an expiration is required. | `find_allocation_candidates`, `allocation/trace.rs`, `allocation/select.rs` |
| Pick card and source confirmation | Show on pick, labels, verification. | `picking/confirmation/lot_display.rs`, `domain/pick_confirmation/plan.rs` |
| Pick card, commit and short | Expiration against today + SKU minimum shelf life on pick. | `picking/confirmation/shelf_life.rs`, `at_commit.rs` |
| Packing, carton close | Expiration of every lot in the carton against today + SKU shelf life (refusal `LOT_NOT_FIT_TO_SHIP`). | `domain/packing_carton` (`judge_lots_fit_to_ship`) |
| Storage view | Dates, their sources, days left, and whether each lot is fit to pick, ship and reserve. | `inventory_balance_dating` |

### Date rules at receiving (receipt policy and SKU fields)

These rules read the lot's dates and the SKU's fields. A date the operator
did not type is first worked out from the manufactured date: expiration =
manufactured + `sku.expire_days`, best-by = manufactured + `sku.best_by_days`,
delivery-by = manufactured + `sku.deliver_by_days` (only when the day count is
above zero; what was typed always wins and is stored as `Explicit`, a worked
out date as `Derived`). The rules judge the dates as they stand after that.

They are switched by the receipt policy's `date_deviation_check` (values
`Allow`, `Warning`, `Error`). `Allow` skips all of them. `Warning` makes a
failure overridable. `Error` is a hard refusal. "Today" is the warehouse day
(`WAREHOUSE_TIMEZONE`), and a date is fit only when it is LATER than today + N:
a lot expiring today is expired, a lot expiring on today + N is not fit.

| Rule | Test | Message code |
|---|---|---|
| Expired / expiration too soon | expiration date is not later than today + `sku.min_shelf_life_on_rec` days (a missing value is 0) | `DateExpirationTooSoon` |
| Manufactured too old | manufactured date is more than `sku.max_age_on_rec` days ago (only if max age is set) | `DateManufacturedTooOld` |
| Delivery-by passed | delivery-by date is not later than today | `DateDeliveryByPassed` |
| Best-by passed | best-by date is not later than today | `DateBestByPassed` |
| Expiration missing | the lot policy requires an expiration, or `sku.expire_days` is above zero, and there is neither a typed expiration nor a manufactured date to work one out from | `DateExpirationMissing` |

Numbers: min shelf life on receive 90, expiration 2027-01-10, today
2026-10-10 -> threshold 2027-01-08 -> accepted. Expiration 2027-01-08 ->
refused (it is exactly today + 90).

Auto-hold (not a refusal): if the expiration is inside a warning band, a
`QcQuarantine` hold is put on the pallet. The band is `min_shelf_life_on_rec`
x `owner_config.shelf_life_warning_multiplier_pct` percent (default 200,
screen "Shelf-Life Warning Multiplier (%)"). 100 percent makes the band equal
to the minimum, so it collapses (`validation_internal_helpers.rs:156-185`,
`validation_holds.rs:70-80`).

### Dates after receiving: reserve, pick, ship

The same boundary as at receiving applies at every later point: a lot is fit
only when its expiration is later than today + N, today being the warehouse
day. N depends on the point, and the SKU holds it (page 34, Part 5):

| Point | N | A lot that fails |
|---|---|---|
| Allocation (reserve) | the larger of `min_shelf_life_on_pick` and `shelf_life` | is not reserved |
| Pick card, commit, short | `min_shelf_life_on_pick` | blocks the card and the commit (`SOURCE_EXPIRED`); the short is allowed only with the reason `EXPIRED` |
| Packing, carton close | `shelf_life` | stops the carton from closing (`LOT_NOT_FIT_TO_SHIP`) |

A lot without an expiration has nothing to judge and passes every point. The
one exception is a lot that should have one: where the lot policy requires an
expiration, or the SKU has `expire_days` above zero, allocation does not
reserve a lot with no expiration. Picking and shipping still take such a lot
if it was reserved already. With the minimums at 0 or empty, only lots that
expire today or earlier are refused.

Nothing puts a hold on a lot because it expired, and changing a SKU's day
counts does not recompute the dates of lots already received.

## Part 5: Commingle (mixing) rules for lots

"Commingle" means mixing. All of these are checked when stock lands in a
location or on an LPN (putaway, move, receive). Defaults are permissive,
except where noted.

### Location: Mix lots

- **Screen**: Locations > open a location > **Mix Lot**.
- **Column**: `location.mix_lot`, boolean. In code `DEFAULT_LOC_MIX_LOT = true`
  (`wms-lib-core/src/model/location.rs:39`).
- **Meaning**: May more than one lot sit in this location?
- **Affects**: `check_lot_mixing` (`inventory_service.rs:1054`). If false, a
  conflicting lot is refused (`LotMixingNotAllowed`). Also
  `validate_multi_attributes` returns "no conflict" at once when the location
  does not allow mixing, so the attribute rules below are skipped
  (`inventory_service.rs:1450-1453`).
- **When empty**: Treated as true.

### Location: attribute rule (`location_lot_commingle`)

- **Screen**: Locations > location > lot commingle list. Fields **Attribute Code**
  and **Allow Mix**.
- **Columns**: `location_lot_commingle.location_code` (varchar(20)),
  `attrib_code` (varchar(20)), `allow_mix` (boolean, default `true`).
- **Meaning**: For this location and this custom attribute, may lots with
  different values be mixed on one LPN?
- **Affects**: `check_location_attribute_overrides` (`inventory_service.rs:1495-1580`).
  A location row wins outright over the zone row, even `allow_mix = true`
  (an exception to a zone ban). `allow_mix = false`: if the landing LPN already
  holds stock of another lot whose value for this attribute differs, the move
  is refused (`AttributeMixingNotAllowed`, with the rule source named).
- **Example**: Rule COLOR / allow_mix false at A-01. LPN P1 holds RED lot L1.
  Landing a BLUE lot L2 on P1 is refused. Landing it on an empty LPN is fine.
- **Interactions**: Only custom attributes are checked. The four dates cannot
  be commingle attributes. A loose landing (no LPN) is never refused by this
  rule. A lot that has no value for the attribute never conflicts.
- **When empty**: No rule means mixing is allowed.

### Zone: attribute rule (`putawayzone_lot_commingle`)

- **Screen**: Topology > Putaway Zones > zone > lot commingle list. Fields
  **Attribute Code** and **Allow Mix**.
- **Columns**: `putawayzone_lot_commingle.putawayzone_code`, `attrib_code`,
  `allow_mix` (default `true`).
- **Affects**: Used only if the location has no row for that attribute
  (`inventory_service.rs:1530-1550`).

### SKU: Allow multi-lot on LPN

- **Screen**: API only (`create_sku`, `update_sku`, `create_sku_full`,
  `update_sku_full`); no SKU tab shows it.
- **Column**: `sku.allow_multi_lot_on_lpn`, boolean, default `false`. The code
  default is also `false` (`DEFAULT_ALLOW_MULTI_LOT_LPN`, `sku.rs:22`).
- **Meaning**: May a second lot of this SKU join it on one LPN?
- **Affects**: `validate_lpn_restrictions` (`inventory_service.rs:1195-1260`).
  The SKUs already on the pallet answer for their own lots. If they say no
  and another lot is there, the move is refused with code 56.
- **Interactions**: Only the same SKU's flag counts. A neighbour SKU that
  forbids several lots of itself does not block a different SKU's lots.
- **When empty**: Treated as `false`: one lot per LPN.

### SKU: Force separate LPN per lot

- **Screen**: API only.
- **Column**: `sku.force_separate_lpn_per_lot`, boolean, not null, default
  `false` (`DEFAULT_FORCE_SEPARATE_LPN_PER_LOT`).
- **Meaning**: This SKU demands its own LPN for every lot.
- **Affects**: Same function, the arriving-goods side
  (`inventory_service.rs:1239`). Combined with the resident flag by OR.
- **Interactions**: If this is true and Allow multi-lot is true, this wins
  (the safe side).
- **When empty**: `false`.

### Owner: Mixed LPN

- **Screen**: Owner configuration > **Mixed LPN**.
- **Column**: `owner_config.allow_mixed_lpn`, boolean, default `false`.
- **Meaning**: May one LPN hold two SKUs of this owner?
- **Affects**: `check_lpn_sku_mixing` (`inventory_service.rs:1107-1160`), code 55.
- **When empty**: `false`.

## What happens to stock when you change a lot policy

- Lots that already exist keep every date and attribute value they have.
- Turning Required on does not make old lots invalid.
- You cannot delete an attribute row while any lot uses it.
- New receives, new creates and new landings follow the new rules.
- A pick card, a confirmation plan and a commingle check always read the policy
  as it is now.
