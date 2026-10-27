---
title: "Policy Reference - Receipt Policy Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Receipt Policy Settings

This page lists every setting of the **receipt policy**. It also lists the
receiving rules that other tables control: shortage reasons, closing with a
discrepancy, damage handling, returns, blind receipts and supervisor rights.

Read the legend in [00-README.md](./00-README.md) first. It explains how each
entry is built.

Paths in this page are relative to `crates/libs/` unless they start with
`crates/`. `inbound/` means `wms-inbound/src/service/receipt/`.

## 1. What the receipt policy is

A receipt policy is one row in the table `receipt_policy`. It tells the server
how strict to be when an operator receives goods.

- The policy has a short **code** (up to 10 characters) and a description.
- One policy can serve many SKUs.
- The server reads the policy **every time** an operator receives a line. It
  does not copy the policy onto the receipt. If you change the policy, the very
  next receive uses the new values.

### 1.1 Which policy is used

The server picks the policy for one SKU like this
(`wms-inbound/src/service/receipt/validation/validation_service.rs:37-62`):

1. `sku.receipt_policy_id`.
2. If that is empty: `owner_config.default_receipt_policy_id` of the SKU's owner.
3. If both are empty, the receive is refused with this message:

   `Receipt Validation Policy for sku <SKU> not found: sku.receipt_policy_id is NULL and owner_config.default_receipt_policy_id is also NULL (owner_id=<id>)`

**Important.** In the database `sku.receipt_policy_id` is `NOT NULL DEFAULT 1`
(`wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:2148`). No later migration
changes that. So step 1 always finds a value. Step 2 (the owner default) is never
reached today. A new SKU that you do not configure gets policy id 1 (`STD`), not
its owner's default. See [41-owner-settings-and-policy-resolution.md](./41-owner-settings-and-policy-resolution.md).

### 1.2 Where to edit it

| Item | Value |
|---|---|
| Menu path | `Sidebar > Policy > Receipt Policy` |
| Screen | A list, then a tabbed form with three tabs: `General`, `Qty validation against ASN (RF)`, `Qty validation against PO (RF)` |
| Save | One Save button for the three tabs. It sends one versioned update. |
| Roles that can change it | `Admin`, `Manager` (create, update, delete). `Operator` and `Viewer` can only read. (`services/app-server/src/web/rpcs/receipt_policy_rpc.rs:7-15`) |
| API methods | `create_receipt_policy`, `update_receipt_policy`, `delete_receipt_policy`, `delete_many_receipt_policy`, `get_receipt_policy`, `list_receipt_policy`, `count_receipt_policy` |

Rules for saving:

- `update_receipt_policy` is a *stateful command*. You must send the `version`
  you read (`expected_version`). If somebody saved first, the save is refused
  with an optimistic-lock conflict. Reload and try again.
- The `code` cannot be changed after the policy is created.
- The server checks the **final merged policy**, not only the fields you sent.
- Percent fields accept whole numbers from 0 to 100. Empty means "not set".
  Messages: `qty_validation must be one of None, Sku or Lot`,
  `<field> must be between 0 and 100`, `receipt policy code cannot be empty`
  (`wms-lib-core/src/model/policies/receipt_policy.rs:215-268`).
  The database repeats these rules as CHECK constraints
  (`wms-app/migrations/020_receipt_policy_is_a_versioned_configuration.sql`).
- You cannot delete a policy that a SKU uses. The database refuses it
  (`fk_sku_receipt_policy_id`, `ON DELETE RESTRICT`, `001_baseline.sql:18133-18137`).
  If an owner points to the policy, the owner's default is set to empty
  (`ON DELETE SET NULL`, `001_baseline.sql:17265-17269`).

### 1.3 The three-value switch: Allow, Warning, HardError

Many settings use the type `allow_error`. The screen label of the values is
`Allow`, `Warning` and `Hard Error` (code list `ALLOW_ERROR`).

| Value | What the server does when the rule is broken |
|---|---|
| `Allow` | The rule is switched off. Nothing happens. |
| `Warning` | The server refuses once and asks. The operator can confirm and continue ("overridable"). |
| `HardError` | The server refuses. Nobody can override it. |

Who may confirm a `Warning`? It depends on the *code* of the refusal, not on the
setting. See section 5 (Supervisor rights).

## 2. How a receive is judged

Every receive command that puts goods in the warehouse runs the same rule list in
the same order: receive against ASN, blind receive, blind line, return, return
line (`inbound/validation/validation_pipeline.rs:24-37`, `:201`). The first rule
that refuses stops the receive. Nothing is saved when a rule refuses.

| # | Rule | Code | Reads these settings | Section |
|---|---|---|---|---|
| 0 | SKU not on the ASN (before the pipeline, ASN receive only) | 24 | `no_sku_on_asn` | 4.5 |
| 1 | Receipt without LPN | 25 | `receipt_without_lpn` | 4.3 |
| 2 | Supplier lot used with different attributes | 33 | none (always on) | 6.1 |
| 3 | Strict lot-attribute match | 34 | line flag `lot_attr_check_mode` | 6.1 |
| 4 | Destination location on hold | 76 | hold code table | 6.2 |
| 5 | Temperature | 50, 51 | SKU fields | 6.3 |
| 6 | Quantity is a pack multiple | 30 | `qty_pack_multiple_check` | 4.8 |
| 7 | Excess and shortage | 27, 28 | `qty_validation`, `excess_*`, `shortage_*` | 4.10 to 4.17 |
| 8 | Dates | 45, 46, 47, 48 | `date_deviation_check` | 4.9 |
| 9 | Shortage reason | 43 | code list `shortage_reason` | 6.4 |
| 10 | Serial numbers | 65, 66, 67 | SKU serial config | 6.5 |
| 11 | Lot attributes against the plan | 35, 36 | lot policy | 6.1 |
| 12 | Auto holds (the rule itself never refuses; the hold step refuses the receive when a hold cannot be placed) | none | SKU hold code, owner shelf-life multiplier | 6.2 |

The "dry run" used by the RF screens runs the same list in the same order, but
collects every refusal instead of stopping at the first
(`validation_pipeline.rs:405-560`). A unit test keeps the two lists equal
(lists at `validation_pipeline.rs:27-52`, test `dry_run_runs_every_live_rule_in_order` at `:668`).

Rule 4 (held location) runs **before** the quantity rule on purpose. The operator
should not confirm a shortage for a shelf that is closed anyway
(`validation_pipeline.rs:284-288`).

## 3. Field list at a glance

| Group | Columns | Used today |
|---|---|---|
| Identity | `id`, `code`, `descr`, `version`, audit columns | yes |
| Document gates | `receipt_without_po`, `receipt_without_asn`, `receipt_without_lpn`, `no_sku_on_po`, `no_sku_on_asn`, `asn_po_qty_discrepancy` | only `receipt_without_lpn` and `no_sku_on_asn` |
| Checks | `qty_pack_multiple_check`, `date_deviation_check` | both |
| ASN quantity | `qty_validation`, `excess_message`, `excess_override`, `excess_override_percent`, `excess_error`, `excess_error_percent`, `shortage_message`, `shortage_override`, `shortage_override_percent` | all except the two `*_message` flags |
| PO quantity | `po_qty_validation`, `po_excess_message`, `po_excess_override`, `po_excess_override_percent`, `po_excess_error`, `po_excess_error_percent`, `po_shortage_message`, `po_shortage_override`, `po_shortage_override_percent` | none |

Total: 34 columns. 26 are settings. 8 are identity and bookkeeping (`id`, `code`,
`descr`, `version`, `add_who`, `add_when`, `mod_who`, `mod_when`).

Of the 26 settings, **11 are used** by the server today: `receipt_without_lpn`,
`no_sku_on_asn`, `qty_pack_multiple_check`, `date_deviation_check`, `qty_validation`,
`excess_override`, `excess_override_percent`, `excess_error`, `excess_error_percent`,
`shortage_override`, `shortage_override_percent`. **15 are stored only**:
`receipt_without_po`, `receipt_without_asn`, `no_sku_on_po`, `asn_po_qty_discrepancy`,
`excess_message`, `shortage_message` and all 9 `po_*` columns.

## 4. Field reference

The seed row is created by the baseline migration
(`wms-app/migrations/001_baseline.sql:8683-8685`): id 1, code `STD`, description
`Std Receipt Policy`, every `allow_error` = `Allow`, both `*_qty_validation` =
`None`, every flag `false`, every percent empty.

The **dev seed** changes the `STD` row on a development database only
(`wms-lib-sql/sql/dev_only/install-db/900-dev-seed.sql:772-778`):
`qty_validation = 'Sku'`, `shortage_override = true`, `shortage_override_percent = 5`.

### 4.1 Identity and bookkeeping

#### `id`
- **UI**: the `General` tab has a field `ID`. A render action named `_code_readonly_hide_id` is bound to the form (migration `wms-meta-ui 040` checks this binding), so the screen hides the id and keeps the code read-only on an existing policy.
- **Column and type**: `receipt_policy.id`, bigint, generated, starts at 1000.
- **Default**: generated. Seed: `1`.
- **Meaning**: the number SKUs and owners point to.
- **Affects**: `sku.receipt_policy_id`, `owner_config.default_receipt_policy_id`.
- **When you change it**: you cannot.

#### `code`
- **UI**: `General` tab, field `Code` (required).
- **Column and type**: `code`, varchar(10), unique, required.
- **Default**: none. Seed: `STD`.
- **Meaning**: the short name shown in the pickers `Receipt Policy` on the SKU and
  owner screens.
- **Affects**: display only. The server never reads the code to decide anything.
- **Interactions**: unique. A duplicate gives a database unique-key error.
- **When you change it**: it cannot be changed after creation (the update API
  rejects the field).

#### `descr`
- **UI**: `General` tab, `Description`.
- **Column and type**: `descr`, varchar(50), may be empty.
- **Default**: empty. Seed: `Std Receipt Policy`.
- **Meaning**: free text. Display only.

#### `version`
- **UI**: hidden. It travels with the form so that Save can prove what it read
  (`wms-meta-ui/migrations/040_receipt_policy_form_carries_its_version.sql`).
- **Column and type**: `version`, integer, `> 0`, starts at 1, +1 on every save.
- **Meaning**: optimistic lock. Two admins cannot overwrite each other.
- **Message on conflict**: an optimistic-lock error that carries the current
  `{ "version": N }` (`receipt_policy_rpc.rs:198-206`). Reload the screen.

#### `add_who`, `add_when`, `mod_who`, `mod_when`
- Audit columns. Set by the server. No effect on receiving.

### 4.2 `receipt_without_po`
- **UI**: `General` tab, `Receipt Without PO`. Dropdown `Allow / Hard Error / Warning`.
- **Column and type**: `receipt_without_po`, `allow_error`, not null.
- **Default**: schema `Allow`. Seed `Allow`.
- **Meaning**: it was meant to control receiving goods that have no purchase order.
- **Affects**: **Stored only. It has no effect today.** No code reads it. Checked
  with a search for `receipt_without_po` over all `*.rs` files in `crates/`. The
  only hits are the data structure, the update API and tests.
- **When you change it**: nothing changes on any document.

### 4.3 `receipt_without_lpn`
- **UI**: `General` tab, `Receipt Without LPN`. Dropdown `Allow / Hard Error / Warning`.
  (The name says "ID" in old documents. It means the LPN, the container id.)
- **Column and type**: `receipt_without_lpn`, `allow_error`, not null.
- **Default**: schema `Allow`. Seed `Allow`.
- **Meaning**: what happens when the operator receives goods and gives **no LPN**
  (a loose receive).
- **Affects**: rule 1 of the pipeline, for ASN receive, blind receive and returns
  (`inbound/validation/validation_pipeline.rs:88-112`, called at `:229`). The web
  Receive dialog also reads it to show whether an LPN is needed
  (`inbound/receive_context.rs:212`).
  An empty string counts as "no LPN".
- **Messages**:
  - `Warning`: `This receive has no LPN` (code 25, the operator can confirm; no supervisor right is needed, see section 5).
  - `HardError`: `Receipt without LPN is not allowed by owner policy` (code 25, final).
- **Example**: policy `Warning`. The operator scans a case and leaves "To LPN"
  empty. The server answers code 25. The operator confirms (sends code 25 in
  `acknowledged_overrides`). The goods are received loose.
- **Interactions**: independent of the owner flag `allow_system_generated_lpn`
  (which has no effect, see file 41). If the operator gives no LPN, no
  LPN-scoped auto hold is possible: holds go to the location instead (section 6.2).
- **When empty**: not possible (not null).
- **When you change it**: only future receives change. Stock already received
  loose stays as it is.

### 4.4 `receipt_without_asn`
- **UI**: `General` tab, `Receipt Without ASN`.
- **Column and type**: `receipt_without_asn`, `allow_error`, not null. Default `Allow`.
- **Affects**: **Stored only. It has no effect today.** Same search as 4.2. A blind
  receive is not checked against it. The code `22` (`ReceiptWithoutAsnDoc`) exists
  in the code table but nothing raises it.

### 4.5 `no_sku_on_asn`
- **UI**: `General` tab, `No SKU on ASN`.
- **Column and type**: `no_sku_on_asn`, `allow_error`, not null. Default `Allow`.
- **Meaning**: what happens when the operator receives a SKU that is **not on the
  ASN** (not on any line of this receipt).
- **Affects**:
  - ASN receive (`inbound/receive/receive_against_asn.rs:253-266`). The server
    looks for a line in 4 steps (the "cascade"). If no line matches, the policy is
    asked **before** the server creates a new line with expected quantity 0. A
    refusal therefore leaves no line behind.
  - Case-level receive of an unplanned case whose SKU is also not on the ASN
    (`inbound/case_level/commands/receive_case_level_line.rs:1115-1124`). There only
    `HardError` refuses. `Warning` behaves like `Allow` (no question is asked).
  - Blind receive does not use it (there is no ASN).
- **Messages (ASN receive)**:
  - `Warning`: `This SKU is not on the receipt. Receive it anyway?` (code 24, the operator can confirm).
  - `HardError`: `This SKU is not on the receipt, and owner policy does not allow receiving what the document does not carry.` (code 24, final).
  - Case-level `HardError`: `unplanned case '<case>': SKU '<sku>' is not on receipt <id> and receipt_policy.no_sku_on_asn=HardError — scan rejected`.
- **Example**: ASN has SKU A only. The operator scans SKU B. Policy `HardError`: the
  receive is refused with code 24 and no line for B is created.
- **Interactions**: `Allow` only switches off code 24. If `qty_validation` is not
  `None`, the new line expects 0, so **any quantity is an excess**. The server then
  asks code 27 (see 4.11). Because the new line is created in the same command, no
  supervisor grant can name it in advance: a supervisor must confirm at the
  receiver's own terminal (`inbound/shared/override_grant.rs`, `GrantTarget::NewLine`).
  The integration test `wms-inventory/tests/no_sku_on_asn_integration.rs` shows this.
- **When you change it**: affects only the next scan.

### 4.6 `no_sku_on_po`
- **UI**: `General` tab, `No SKU on PO`.
- **Column and type**: `no_sku_on_po`, `allow_error`, not null. Default `Allow`.
- **Affects**: **Stored only. It has no effect today.**

### 4.7 `asn_po_qty_discrepancy`
- **UI**: `General` tab, `ASN/PO Qty Discrepancy`.
- **Column and type**: `asn_po_qty_discrepancy`, `allow_error`, not null. Default `Allow`.
- **Affects**: **Stored only. It has no effect today.** The system has no
  purchase-order document to compare with.

### 4.8 `qty_pack_multiple_check`
- **UI**: `General` tab, `Qty Pack Multiple Check`.
- **Column and type**: `qty_pack_multiple_check`, `allow_error`, not null.
- **Default**: schema `Allow`. Seed `Allow`.
- **Meaning**: the received quantity must be a whole multiple of the SKU's
  **largest pack tier**. The largest tier is the biggest `base_qty` that is above 1
  in the SKU's pack (for example a pallet of 480, or a case of 12).
- **Affects**: rule 6 (`inbound/validation/rules/qty_pack_multiple.rs:44-62`,
  `:100-128`). The rule is skipped when the setting is `Allow`, when the SKU has no
  pack, when the pack is missing, or when the pack has no tier above 1.
- **Message**: `qty <qty> is not a multiple of pack <pack_qty>` (code 30).
  `Warning`: the operator can confirm. `HardError`: final.
- **Example**: pack tiers 1, 12, 480. Largest tier 480. Policy `HardError`. The
  operator receives 500. `500 % 480 != 0`, so the receive is refused. 960 passes.
- **Interactions**: the rule compares the quantity as the command carries it
  (`ReceiveAgainstAsn.qty`). The comparison does not convert units first.
  See the "To verify" note in section 9.
- **Confirm**: under `Warning` the operator confirms code 30 themselves; no
  supervisor is needed. The code catalogue lists it with the other
  policy-switched checks (class `SupervisorOverride`, overridable, no
  capability), the same as the date checks.
- **When you change it**: only future receives.

### 4.9 `date_deviation_check`
- **UI**: `General` tab, `Date Deviation Check`.
- **Column and type**: `date_deviation_check`, `allow_error`, not null.
- **Default**: schema `Allow`. Seed `Allow`.
- **Meaning**: one switch for the date checks. The dates come from the lot
  attributes the operator captured. Every format the receive stores is read: `YYYY-MM-DD`, `DD.MM.YYYY`, `DD/MM/YYYY`, `MM/DD/YYYY` and ISO date-time (`parse_captured_date`). A date that cannot be read at all is ignored by the rule. A date that was not typed is first worked out from the manufactured date (expiration = manufactured + SKU `expire_days`, and so on), and the checks judge the dates after that ([lot policy and attributes](32-lot-policy-and-attributes.md)).
- **Affects**: rule 8 (`inbound/validation/rules/date_deviations.rs`). The
  first failing check stops the rule. "Today" is the warehouse day
  (`WAREHOUSE_TIMEZONE`), and a date is fit only when it is LATER than
  today + N.

| Code | Check | Uses |
|---|---|---|
| 45 | `expiration_date` is not later than today + `min_shelf_life_on_rec` days (not later than today: expired) | SKU `Min Shelf Life on Receive` (empty = 0) |
| 46 | `manufactured_date` is older than today - `max_age_on_rec` days | SKU `max_age_on_rec` (empty = no check) |
| 47 | `delivery_by_date` is not later than today | none |
| 48 | `best_by_date` is not later than today | none |
| 49 | the lot must carry an expiration and none was typed or can be worked out | lot policy `required_expiration_date`, SKU `expire_days` |

- **Messages** (the date prints as the server formats it):
  `expiration <date> is expired: not later than today <today>`,
  `expiration <date> is not later than today <today> + min_shelf_life <n>d`,
  `manufactured <date> older than max_age_on_rec <n>d`,
  `delivery_by_date <date> passed`, `best_by_date <date> passed`,
  `expiration date is required and cannot be worked out: capture it or the manufactured date`.
  `Warning`: the operator can confirm. `HardError`: final.
- **Example**: today 2026-10-10 (the warehouse day), SKU minimum 90 days. The
  limit is 2027-01-08. A lot that expires on 2027-01-08 is refused, because it
  is not later than the limit. A lot that expires on 2027-01-09 passes.
- **When empty (no date captured)**: that check is skipped, unless the lot
  must carry an expiration (49).
- **When you change it**: only future receives.

### 4.10 `qty_validation` (ASN quantity check)
- **UI**: tab `Qty validation against ASN (RF)`, `Execute Qty validation`.
  Dropdown `None / Sku / Lot` (code list `RECQTYVAL`).
- **Column and type**: `qty_validation`, varchar(20), allowed `None`, `Sku`, `Lot`.
- **Default**: schema `None`. Seed `None`. Dev seed `Sku`.
- **Meaning**: switches the excess and shortage checks on, and says what to sum.
  - `None`: no excess or shortage check at all, for ASN receives and for
    case-level receives (see 4.18).
  - `Sku`: the server adds up **all lines of this SKU** on the receipt.
  - `Lot`: the server adds up the lines with the same **supplier lot**
    (`external_lot`) as the scan. If the scan has no supplier lot, or no line
    carries that lot, it works like `Sku`
    (`inbound/validation/validation_qty.rs:234-296`).
- **Affects**: rule 7. Blind receives and returns never run the check, because
  they have no plan to compare with (`skip_qty_rollup_check = true`).
  The web Receive dialog shows the allowed limits only when this is not `None`
  (`inbound/receive_context.rs:97-125`).
- **Interactions**: the nine `excess_*` and `shortage_*` fields do nothing while
  this is `None`. The screen greys them out (`web-ui-server/src/extensions/generic/qty_validation_render.rs:41-60`).
- **If the stored value is not one of the three**: the server treats it as `None`
  (`validation_qty.rs:244-245`). The database CHECK stops such a value anyway.
- **When you change it**: from `None` to `Sku` mid-receipt: the next scan is judged
  against everything already received on the receipt. Earlier scans are not
  re-checked.

### 4.11 `excess_override`, `excess_override_percent`, `excess_error`, `excess_error_percent`
These four work together. They decide when receiving **more than expected** needs
a confirmation (soft limit) or is refused (hard limit).

| Column | UI label | Type | Default |
|---|---|---|---|
| `excess_override` | `Excess Override` | boolean | `false` |
| `excess_override_percent` | `Excess Override %` | integer 0 to 100, may be empty | empty |
| `excess_error` | `Excess Error` | boolean | `false` |
| `excess_error_percent` | `Excess Error %` | integer 0 to 100, may be empty | empty |

- **Meaning**:
  - Over% = `((received so far + this scan) - expected) * 100 / expected`.
  - `excess_error` on: Over% **above** `excess_error_percent` is refused for good
    (hard limit).
  - `excess_override` on: Over% **above** `excess_override_percent` needs a
    confirmation (soft limit).
  - The hard limit is judged first. Exactly on the limit is allowed (the test is
    "strictly above").
  - An empty percent counts as 0. So `excess_error` on with an empty percent means
    "any excess is refused".
  - If both flags are off, **any excess is accepted**.
- **Affects**: `inbound/validation/validation_qty.rs:118-170` (limits and verdict),
  `:353-405` (messages). Code 27.
- **Messages** (`<owner>` is `<owner code> (<company>)`, for example `OWNER001 (Acme Distribution)`):
  - Soft: `Owner <owner> is set to disallow Receipts for Received Qty > Expected Qty by over <override %>%. Receive Anyway?`
  - Hard: `Owner <owner> is set to disallow Receipts for Received Qty > Expected Qty by over <error %>%`
  - Nothing expected (expected total is 0), soft: `Owner <owner> is set to disallow Receipts for Received Qty > Expected Qty. Receive Anyway?`
  - Nothing expected, hard (`excess_error` on): `Owner <owner> is set to disallow Receipts for Received Qty > Expected Qty`
- **Nothing expected**: if the SKU's expected total is 0 or less, **any** quantity is
  an excess. The percents are ignored. The result is "confirm" unless
  `excess_error` is on, then "refused" (`validation_qty.rs:121-135`). This happens
  even when `excess_override` is off.
- **Example**: expected 100, received 0. `excess_override` on at 5, `excess_error`
  on at 20.
  - Scan 104: Over 4%. Accepted.
  - Scan 105: Over 5%. Accepted (not strictly above).
  - Scan 106: Over 6%. Code 27, the operator can confirm.
  - Scan 121: Over 21%. Code 27, final.
- **Who may confirm**: code 27 needs the capability `receipt.override_qty_excess`
  (SUPERVISOR). See section 5.
- **Interactions**: if the soft percent is not lower than the hard percent, nobody
  can confirm: the hard limit wins first. The web dialog shows this as "no approval
  possible" (`receive_context.rs:107-116`).
- **When you change it**: only future scans. Quantities already received are not
  re-checked and no document changes.

### 4.12 `excess_message`
- **UI**: tab ASN, `Excess Message` (checkbox).
- **Column and type**: `excess_message`, boolean, default `false`.
- **Affects**: **Stored only. It has no effect today.** The server never reads it.
  It is only enabled or disabled on the screen. The quick-dev test that flips it
  (`services/app-server/examples/app_server_quick_dev.rs:6343-6400`) gets the same
  result with it on or off.

### 4.13 `shortage_override`, `shortage_override_percent`
| Column | UI label | Type | Default |
|---|---|---|---|
| `shortage_override` | `Shortage Override` | boolean | `false` |
| `shortage_override_percent` | `Shortage Override %` | integer 0 to 100, may be empty | empty |

- **Meaning**: when the goods received are **short** of the plan by more than this
  percent, the server asks for a confirmation and for a **shortage reason**.
  - Short% = `(expected - (received so far + this scan)) * 100 / expected`.
  - Judged only if short% is **strictly above** `shortage_override_percent`
    (empty counts as 0) and `shortage_override` is on.
  - There is **no hard shortage limit**. A shortage can always be confirmed.
- **When the server judges a shortage at all**: only when this scan **closes the
  last open line** of the SKU. A line is "open" when it is not closed or cancelled
  and its received quantity is below its expected quantity. If another line of the
  same SKU is still open, the total being low is "work still to come", not a
  shortage (`validation_qty.rs:63-80`). Excess has no such rule.
- **Affects**: code 28 (`validation_qty.rs:407-445`). The same function decides
  whether a shortage reason is asked for (section 6.4).
- **Message**: `Owner <owner> reports shortage > <override %>% (got <short %, 2 decimals>% short). Receive Anyway?`
  The refusal also carries `shortage_required: true` and the name of the reason
  list, so the screen can ask for the reason.
- **Example**: expected 100, one open line, `shortage_override_percent` 5.
  - Scan 96: short 4%. Accepted. No reason asked.
  - Scan 90: short 10%. Code 28. The operator confirms and picks a reason, for
    example `SupplierShort`.
- **Who may confirm**: capability `receipt.override_qty_shortage` (SUPERVISOR).
- **When you change it**: only future scans.

### 4.14 `shortage_message`
- **UI**: tab ASN, `Shortage Message`. Column `shortage_message`, boolean, default `false`.
- **Affects**: **Stored only. It has no effect today.**

### 4.15 `po_qty_validation`
- **UI**: tab `Qty validation against PO (RF)`, `Execute Qty validation`
  (`None / Sku / Lot`).
- **Column and type**: `po_qty_validation`, varchar(20), allowed `None`, `Sku`, `Lot`.
  Default `None`. The database accepts only these values.
- **Affects**: **Stored only. It has no effect today.** The code `29`
  (`PoQtyExcess`) exists but nothing raises it.

### 4.16 The other eight PO fields
All eight are **stored only; they have no effect today**. They have the same
meaning as the ASN fields, but for a purchase order the system does not have.
Nothing reads them (search over `*.rs`: only the data structure, the update API and
tests).

| Column | UI label (tab PO) | Type | Default |
|---|---|---|---|
| `po_excess_message` | `Excess Message` | boolean | `false` |
| `po_excess_override` | `Excess Override` | boolean | `false` |
| `po_excess_override_percent` | `Excess Override %` | integer 0 to 100 or empty | empty |
| `po_excess_error` | `Excess Error` | boolean | `false` |
| `po_excess_error_percent` | `Excess Error %` | integer 0 to 100 or empty | empty |
| `po_shortage_message` | `Shortage Message` | boolean | `false` |
| `po_shortage_override` | `Shortage Override` | boolean | `false` |
| `po_shortage_override_percent` | `Shortage Override %` | integer 0 to 100 or empty | empty |

### 4.17 Summary of the quantity decision
Use this table for planning. "Expected" is the SKU total on the receipt (or the
supplier-lot total under `Lot`).

| `qty_validation` | `excess_error` | `excess_override` | Excess result |
|---|---|---|---|
| `None` | any | any | Accepted |
| `Sku`/`Lot` | off | off | Accepted (unless expected is 0, then confirm) |
| `Sku`/`Lot` | off | on | Confirm above the soft %, otherwise accepted |
| `Sku`/`Lot` | on | off | Refused above the hard %, otherwise accepted |
| `Sku`/`Lot` | on | on | Refused above the hard %, confirm above the soft %, otherwise accepted |

### 4.18 Case-level receiving uses the same fields in a different way
When goods are received case by case (receipt granularity `Pallet` or `Case`),
each case is compared with its planned quantity
(`inbound/validation/rules/case_qty.rs:38-87`, called from
`inbound/case_level/commands/receive_case_level_line.rs:616`).

- It uses `excess_error`, `excess_error_percent`, `excess_override`,
  `excess_override_percent`, `shortage_override`, `shortage_override_percent`.
- It runs only while `qty_validation` is `Sku` or `Lot`. With `None` there is no
  case-level excess or shortage check, the same as for ASN receives.
- It is skipped when the planned case quantity is 0 or the numbers are equal.
- The percent tests are "strictly above".
- The owner is printed as code and company, as in ASN receives.
- Messages:
  - `Owner <code> (<company>) disallows case-level excess > <error %>% (got <x.x>% excess on this case)` (code 27, final)
  - `Owner <code> (<company>) flags case-level excess > <override %>% (got <x.x>%). Receive Anyway?` (code 27, confirm)
  - `Owner <code> (<company>) flags case-level shortage > <override %>% (got <x.x>% short). Receive Anyway?` (code 28, confirm)

## 5. Supervisor rights and override grants

Some refusals can be confirmed. Who may confirm depends on the code, not on the
policy value.

| Code | Meaning | Who confirms | Right needed |
|---|---|---|---|
| 27 | Excess over the soft limit | a person holding the right | `receipt.override_qty_excess` |
| 28 | Shortage over the limit | a person holding the right | `receipt.override_qty_shortage` |
| 71 | Close a receipt with a discrepancy | a person holding the right | `receipt.override_close_discrepancy` |
| 24, 25, 36, 45, 46, 47, 48, 50, 76 | Other confirmable refusals | the operator, by sending the code in `acknowledged_overrides` | none |
| 22, 29 | Declared in the code table but never raised | nobody | none |
| 30 | Pack multiple | operator, but only when the policy is `Warning` (see 4.8) | none |
| all others | hard refusals | nobody | not overridable |

Source: `wms-shared/src/validation_codes.rs:537-600` (table `supervisor_gate`).

- The three rights are stored as `api` permissions of the role `SUPERVISOR`
  (role id 1004). `Admin` and `Manager` do **not** hold them. This is the
  two-person rule: the receiver cannot approve their own discrepancy
  (`wms-app/migrations/001_baseline.sql:19989-19991`). A superuser (user type
  superuser) passes every capability check
  (`inbound/shared/capabilities.rs`).
- **Two ways to confirm a gated code**:
  1. *At the same terminal.* A person who holds the right sends the code in
     `acknowledged_overrides`.
  2. *With a grant.* The supervisor signs in on the receiver's screen, or the
     receiver's session calls `supervisor_override_grant` with the pairs the refusal
     reported. The server returns a `grant_id`. The receiver sends it as
     `override_grant_id` on the same command.
- A grant:
  - is single use and bound to the operator who asked;
  - lives 300 seconds by default. The system setting `OVERRIDE_GRANT_TTL_SECONDS`
    changes this (a value of 0 or less is ignored). See [42-system-settings.md](./42-system-settings.md);
  - is bound to what it decides. A close (71) names the receipt:
    `receipt:<receipt_id>`. A shortage or excess (27/28) names one line:
    `receipt:<receipt_id>/line:<receipt_detail_id>`. A grant for line 7 is refused
    on line 8;
  - cannot be used for a line the command creates itself (a SKU not on the ASN);
  - is checked for its authority per pair. `Admin` and `Manager` can mint move
    grants but **cannot** authorise receipt pairs.
  (`inbound/shared/override_grant.rs:1-60`, `services/app-server/src/web/rpcs/override_grant_rpc.rs`)
- If the caller sends a gated code but lacks the right, and no grant covers it, the
  refusal is final (not overridable) and says: `<original text up to the question>. A supervisor must authorise this.`
  (`validation_outcome.rs:293-312`). For close it says:
  `You don't have permission to close receipt <number> with a discrepancy. Ask a supervisor.`
- When a grant is used, the audit event names the **supervisor** as the person who
  authorised, not the receiver (`validation_outcome.rs:119`, `:368-410`). The event is
  `ReceiptOverrideApplied` and carries the code, the message, the grant id and, for
  code 28, the shortage reason.

## 6. Rules that are not in the receipt policy table

### 6.1 Lot rules
These rules are in the pipeline but are set by the **lot policy** and by the receipt
line, not by the receipt policy. See [32-lot-policy-and-attributes.md](./32-lot-policy-and-attributes.md).

| Code | Rule | Message |
|---|---|---|
| 33 | The same supplier lot cannot be reused for a different batch of the same owner | `external_lot '<lot>' already exists for owner <id> with different lot_attributes (existing: …, incoming: …) — cannot reuse the same external_lot for a different batch` (final) |
| 34 | The line is flagged "strict" (`lot_attr_check_mode = Strict`): scanned attributes must equal the planned ones | `lot_attribute '<name>' must equal '<value>' on receipt_detail id=<id> (strict-match flag set), got '<x>'` or `…, but operator did not scan it` (final) |
| 35 | A planned attribute was not scanned | `lot attr <name> required (expected=<v>) but not provided` (final) |
| 36 | A scanned attribute differs from the plan | `lot attr <name>: expected <v>, got <x>` (confirmable only if the lot policy attribute has `override_allowed`) |

### 6.2 Holds placed or checked during a receive
- **Held destination** (code 76, rule 4). The server looks at the holds on the
  destination location. It asks the hold code table with the **inbound** question
  (see [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md)). Messages:
  - confirmable: `Location <loc> is on hold (<code>). Receive here anyway?`
  - final: `Location <loc> is blocked (<code>) — receive somewhere else.`
  The operator's own confirmation is enough. The damage bay is allowed to take the
  `Damaged` hold, and a discard staging location may carry the `Destroy` hold
  (`rules/rule.rs:30-47`).
- **Auto holds** (never refuse, rule 12). The server collects holds to place after
  the goods are deposited (`inbound/validation/validation_holds.rs:49-89`):
  1. The SKU field `receipt_hold_code` (screen label under the SKU). Empty,
     `None`, `Ok` or `NotHold` mean "no hold". Any other code is applied. The code
     `NewItem` is applied only for the **first receive ever** of that SKU
     (`validation_internal_helpers.rs:113-150`).
  2. Shelf-life warning band: if the lot's expiration date (typed, or worked out from `expire_days`) is not later than
     today + `min_shelf_life_on_rec` × `shelf_life_warning_multiplier_pct` / 100,
     the hold `QcQuarantine` is placed. The multiplier is the owner setting
     `Shelf-Life Warning Multiplier (%)` (default 200). With 100 the band equals the
     minimum shelf life. The band needs `min_shelf_life_on_rec` to be set
     (`validation_internal_helpers.rs:156-188`).
  3. Temperature warning band: if the captured temperature is outside the SKU's
     `warning_temperature_min` to `warning_temperature_max`, the hold `QcQuarantine`
     is placed. Both bounds must be set.
  - The hold goes on the **LPN** if there is one, otherwise on the **location**.
    A location hold freezes the whole shelf. Without an LPN and without a location,
    no hold is evaluated (`validation_internal_helpers.rs:43-52`).
  - A hold the rules require is **not optional**. The holds are placed inside the
    receive transaction. If the hold service refuses one (for example a location
    that takes no location hold), the whole line is rolled back and nothing is
    received. The refusal is `the <code> hold on <scope> could not be placed, so
    the goods are not received: <reason>`. It is final (not confirmable) and its
    `context` carries `hold_code` and `scope` (`lpn:`, `loc:` or `lot:`).
    `holds_applied` in the result is therefore always what was really placed.
    The same is true for the holds placed by a return that needs refurbishing and by
    a damage report with the action `Hold`
    (`ReceiptError::HoldNotPlaced`, `wms-inbound/src/error.rs`;
    `wms-inbound/src/service/receipt/lifecycle/auto_holds.rs`). Fixed in F-44
    (commit `81bc152f1`).

### 6.3 Temperature (codes 50 and 51)
No receipt policy value is involved. It uses SKU fields (`inbound/validation/rules/temperature.rs:56-100`):
- SKU `requires_temperature_capture` off: skipped.
- On and no temperature given: `SKU <code> requires temperature capture` (code 51, final).
- Below `min_temperature`: `temperature <t> below min <min>` (code 50, confirmable).
- Above `max_temperature`: `temperature <t> above max <max>` (code 50, confirmable).

### 6.4 Shortage reason (code 43)
- When a shortage (code 28) applies to the scan, the receive must carry a
  `shortage_reason`. The reason must be an **active** value of the code list
  `shortage_reason` (`inbound/validation/rules/shortage_reason.rs:67-110`).
- Blind, return and case-level receives never ask for a reason.
- Messages (code 43, final, `context` names the field and the list):
  - none given: `Receiving less than expected — say why (shortage reason)`
  - not on the list: `'<reason>' is not a shortage reason — pick one from the list`
- The reason list is in [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md).

### 6.5 Serial numbers (codes 65, 66, 67)
Set by the SKU serial configuration, not by the policy. Messages:
`SKU <code> requires serial per unit`, `expected <n> serials (scope=<s>, qty=<q> <uom>), got <m>`,
`serial '<s>' does not match mask '<mask>'`, `one of <n> serials already received for owner <id>`.

### 6.6 Mixing on an LPN (codes 55, 56)
Set by owner and SKU flags (see file 41):
- Another SKU of the same owner already on the LPN, and owner `Mixed LPN` is off:
  `<lpn> already holds SKU <list>; the owner does not allow another SKU (<sku>) on the same LPN` (code 55).
- Another lot of the same SKU on the LPN while the SKU does not allow it (code 56).

## 7. Closing, cancelling and adjusting a receipt

### 7.1 Close with a discrepancy (system setting `ALLOW_CLOSE_WITH_DISCREPANCY`)
Checked in `inbound/lifecycle/close_receipt.rs:196-260`. The server first checks two
hard blockers that nobody can override:

| Blocker | Code | Message |
|---|---|---|
| An unresolved serial-capture episode | 73 | `Receipt <number> has <n> unresolved serial-capture episode(s): <list>. <hint>` |
| A damage record without a final disposition | 77 | `Receipt <number> has <n> damage record(s) awaiting final disposition` |

Then it asks: is this a *discrepancy*? (`repo/completion_compute.rs:236-245`)

| Receipt completion | Discrepancy? |
|---|---|
| `Full` | no |
| `Partial` | yes |
| `Over` | yes, **only if something was expected** (total expected > 0). A blind receipt is `Over` with expected 0, so it closes freely. |
| `Pending` (nothing received) | yes, **only if something was expected** |

If it is a discrepancy:

1. The system setting `ALLOW_CLOSE_WITH_DISCREPANCY` (seed `1`, default `false`) must
   be on. If it is off the close is refused for good:
   `Cannot close receipt <number>: completion is <Partial|Over|Pending> and ALLOW_CLOSE_WITH_DISCREPANCY is off` (code 71, final).
2. If it is on, the close needs code 71 confirmed by a person who holds
   `receipt.override_close_discrepancy`, or a grant for `receipt:<id>`.

The setting does not change receipts already closed.

### 7.2 Quantity correction (`receipt_adjust_received_qty`)
The reason must be an active value of the code list `qty_adjust_reason`.
Message: `reason_code '<x>' is not a valid qty_adjust_reason`. A correction that
would make the received quantity negative is refused:
`adjustment would make qty_received=<n> < 0`. The list is in file 43.

## 8. Damage, returns and blind receipts

### 8.1 Damage report
The report is a command `receipt_report_damage`. Rules
(`inbound/damage/report_damage.rs:150-340`):

1. `damaged_qty` must be above 0: `damaged_qty must be > 0, got <n>`.
2. `reason_code` must be an active value of the code list `damage_reason`:
   `reason_code '<x>' is not a valid damage_reason`.
3. The damaged quantity cannot exceed what arrived on the line minus what is
   already reported:
   `damaged_qty <n> exceeds what is available on this line: arrived <a>, already reported damaged <d>, available <v>`.
4. The **owner** decides what happens next, by severity
   (`owner_config.damage_*_action`, `report_damage.rs:966-996`):

| Severity | Owner setting (UI label) | Schema default | What the server does for each action |
|---|---|---|---|
| `Cosmetic` and `Minor` | `Damage Action: Minor` (`damage_minor_action`) | `None` | `None`: only the record. `Hold`: place hold `Damaged` on the LPN. `Reject`: add the quantity to `qty_damaged` and recompute completion. |
| `Major` | `Damage Action: Major` (`damage_major_action`) | `Hold` | same |
| `Total` | `Damage Action: Total` (`damage_total_action`) | `Reject` | same |

   If the owner has no `owner_config` row, the built-in defaults are the same:
   Cosmetic/Minor `None`, Major `Hold`, Total `Reject`.
5. The enum also has `WriteOff`, `RTV`, `Repurpose`, `Destroy`. **Choosing one of
   these has no automatic effect today.** The damage is recorded, a warning is
   logged, and the result says `None` (`report_damage.rs:850-890`). Run the explicit
   disposition command instead. Also, the screen dropdown uses the code list
   `damage_action`, which holds only `None`, `Hold`, `Reject`. The four extra values
   can be set only by API.
6. If the caller also gives `dest_loc`, a Major damage moves the LPN to quality
   control and a Total damage moves it to the damage location. A Minor damage never
   moves.

Final disposition commands: `receipt_set_damage_disposition` (kinds `Repurpose` and
`Destroyed`, versioned on the damage row), `receipt_write_off_damage`
(uses `write_off_gl_account_hint`), `receipt_move_damage_to_rtv` (uses
`default_rtv_loc`, then `default_returns_loc`, and `rtv_gl_account_hint`).
Error when no RTV place exists: `no RTV destination configured: pass dest_loc or set owner_config.default_rtv_loc / default_returns_loc`.
Settings are in file 41.

### 8.2 Returns (customer returns)
`receipt_receive_return` and its line version
(`inbound/receive/return_line_finalizer.rs`). The operator picks a **condition**.

| Condition | Where the goods go | Quantity bucket | Hold or disposition |
|---|---|---|---|
| `Resaleable` | the `To location` typed | received | disposition `Stock`, no hold |
| `NeedsRefurb` | the `To location` typed | received | disposition `Hold` (audit mark `QcRequired`). The server really places the hold `CustomerReturn` on the LPN, if there is an LPN. |
| `Damaged` | the location named `DAMAGE` (fixed text) | damaged | disposition `Hold`, hold `Damaged` |
| `Discard` | owner `default_discard_loc` if set, otherwise **nothing is deposited** (written off) | rejected | disposition `Hold`, audit mark `Destroy` |

- The normal validation pipeline runs for a return only when it deposits. A
  discard without a discard location skips all rules.
- The quantity check (excess/shortage) never runs for returns.
- `return_reason_code` is required in the command but **the server never reads or
  stores it**. See section 9.
- The return line is created with expected quantity 0, so a return receipt is `Over`
  and closes without a discrepancy.

### 8.3 Blind receipts
`receipt_receive_blind` and `receipt_receive_blind_line` create or extend a receipt
with no plan.
- The quantity rule is skipped. Lines have expected quantity 0.
- All the other rules still run: LPN (25), held location (76), pack multiple (30),
  dates, temperature, serials, lot attributes, auto holds.
- `receipt_without_asn`, `receipt_without_po` and `no_sku_on_asn` are not used.
- The owner flag `hide_expected_qty_from_operator` (`Hide Expected Qty (Blind)`) has
  no effect today (file 41).

## 9. Bugs, inconsistencies and items to verify
| # | Finding | Where |
|---|---|---|
| 1 | The owner default receipt policy is never used, because `sku.receipt_policy_id` is `NOT NULL DEFAULT 1`. The code comment claims it is the fallback. | `001_baseline.sql:2148`, `validation_service.rs:21-56` |
| 2 | Code 30 is "never overridable" in the code table but confirmable under `Warning`. | `validation_codes.rs:571`, `validation_service.rs:185`, `qty_pack_multiple.rs:119-125` |
| 3 | Nine PO fields, `receipt_without_po`, `receipt_without_asn`, `no_sku_on_po`, `asn_po_qty_discrepancy`, `excess_message`, `shortage_message` are stored only. Codes 22 and 29 are declared but never raised. | search over `*.rs` |
| 4 | `return_reason_code` is required on the return commands but never used. | `receive_return.rs:43`, `receive_return_line.rs:56` |
| 5 | Return `NeedsRefurb` writes the audit mark `QcRequired` on the line but places the hold `CustomerReturn`. | `shared/lookups.rs` (derive function), `return_line_finalizer.rs:646` |
| 6 | Four damage actions (`WriteOff`, `RTV`, `Repurpose`, `Destroy`) can be configured but do nothing. | `report_damage.rs:850-890` |
| 7 | The case-level quantity check ignores `qty_validation = None` and prints the owner as `OWNER-<id>`. | `receive_case_level_line.rs:612-616` |
| 8 | Fixed (F-44, commit `81bc152f1`). An auto hold that cannot be placed now refuses the receive; before, it was logged and the goods came in free. | `lifecycle/auto_holds.rs`, `error.rs` (`HoldNotPlaced`) |

**To verify (unit of the quantity).** The pack-multiple and excess rules use
`ReceiveAgainstAsn.qty` as given (`receive_against_asn.rs:378`). The expected
quantity on the line is stored in the base unit. If a client sends a quantity in
`uom_received` (for example cases) the rule may compare cases with units. Steps to
check: create a SKU with pack tiers 1 and 12, an ASN line expecting 12, policy
`qty_validation = Sku`, `excess_error = true`, `excess_error_percent = 0`. Call
`receipt_receive_against_asn` with `qty = 1`, `uom_received = "CS"`. If the call is
accepted, the rule compares in the operator unit; if it is refused as excess
(1 case = 12 units, not over 12), it converts first. The web Receive dialog sends
base units, so the web is not affected.

## 10. Recipes
| Goal | Set |
|---|---|
| Accept all goods, check nothing | seed `STD`: everything `Allow`, `qty_validation = None` |
| Confirm over 5%, refuse over 20%, ask a reason for a shortage over 5% | `qty_validation = Sku`; `excess_override` on 5; `excess_error` on 20; `shortage_override` on 5 |
| Never receive a SKU that is not on the ASN | `no_sku_on_asn = HardError` |
| Require an LPN | `receipt_without_lpn = HardError` |
| Receive in whole pallets only | `qty_pack_multiple_check = HardError` and a pack whose largest tier is the pallet |
| Refuse goods that expire too soon | `date_deviation_check = HardError` and SKU `Min Shelf Life on Receive` |
