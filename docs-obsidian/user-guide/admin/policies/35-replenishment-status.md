# Replenishment: what exists today

**Short answer: there is no replenishment engine.** No process looks at pick
face levels, no process decides that a pick face needs stock, no process
creates a replenishment task, and no policy says how to do it. A few fields and
names exist. They are placeholders. This page lists them all so you do not
look for a switch that is not there.

The code says the same. The database comment on the policy table reads:
"Reserved identity placeholder. No executable replenishment strategy exists
yet.".
The meta-ui migration 048 is titled "replenishment is an honest placeholder".
The dashboard code says: "`replenishment_policy` is a placeholder, nothing
defines one".

How to read a card: **Screen** is the label and path. **Column** gives the type
and range. **Affects** states what reads it. Paths are under `crates/libs`
unless noted.

## What you can do today

- Create, list and delete a replenishment policy that has only a code.
- Select such a policy on a SKU or as an owner default. Nothing happens.
- Move stock from a bulk location into a pick location with an ordinary
  **Move**. The system does not suggest it or schedule it.
- Choose the move label `replenishment` through the API (see below). It only
  labels the transaction and applies a destination check.

## What you cannot do

- Set a minimum or maximum level for a pick face.
- Set a trigger (threshold, time, wave, demand).
- Get replenishment tasks on the RF.
- Generate let-down moves.
- Order the sources of replenishment.

## Part 1: The policy table

### Replenishment Policy (`replenishment_policy`)

- **Screen**: Main menu **Policy** > **Replenishment Policy**. The list form
  `replenishment_policy_list_form` has create, list and delete. The edit form
  has one field: the code. Existing rows have no edit door because the code
  is the only field and it cannot change.
- **Columns**: `id` bigint, `code` varchar(10) not null (unique), plus audit
  columns. Nothing else.
- **Default**: no default. Seed: one row, `STD`, id 1 (baseline:8696-8698).
- **Meaning**: An identity only. It names nothing executable.
- **Affects**: Nothing reads it to make a decision. Search: `grep -rn
  "replenishment_policy" crates --include=*.rs` outside the model, the RPC and
  the SKU and owner field lists returns only comments.
  Stored only. It has no effect today.
- **Example**: Create `FAST`. Nothing changes in any process.
- **Interactions**: Delete is refused while a SKU points at it (foreign key
  restrict). Owner config references are cleared on delete (set null).
- **When empty**: n/a.
- **If you change it**: Nothing happens to stock or orders.
- **RPCs**: `create_replenishment_policy` (Admin, Manager),
  `get_replenishment_policy`, `list_replenishment_policy`,
  `count_replenishment_policy` (Admin, Manager, Operator, Viewer), delete and
  delete-many (Admin, Manager).

### Replenishment policy detail (`replenishment_policy_detail`)

- **Screen**: None. The screens and writes were removed (meta-ui migration 048).
- **Columns**: `id`, `replenishment_policy_id` (cascade on delete),
  `step_num` varchar(5), audit columns.
- **Meaning**: A "retired compatibility read model". `step_num` alone is not an
  executable step (table comment, wms-app migration 024).
- **Affects**: Read-only RPCs only: `get_replenishment_policy_detail`,
  `list_replenishment_policy_detail`, `count_replenishment_policy_detail`.
  No writer exists. Stored only. It has no
  effect today.
- **If you change it**: Cannot be changed through the API.

## Part 2: Fields that point at a policy

### SKU: Replenishment Policy

- **Screen**: SKU > Policies > **Replenishment Policy** (picker, required on
  screen).
- **Column**: `sku.replenishment_policy_id`, bigint, **not null, default 1**,
  foreign key to `replenishment_policy`, delete restricted
  (`001_baseline.sql:2145`).
- **Affects**: Stored only. It has no effect today. Search: `grep -rn
  "replenishment_policy_id" crates --include=*.rs` returns the model, the SKU
  and owner RPCs, test fixtures and nothing that decides anything.
- **Example**: Set `FAST` on SKU A. Nothing changes.
- **Interactions**: The owner default cannot take over, because this column
  is never empty.
- **When empty**: Not possible.
- **If you change it**: Nothing.

### Owner default: Replenishment Policy

- **Screen**: Owner configuration > **Replenishment Policy** (picker).
- **Column**: `owner_config.default_replenishment_policy_id`, bigint, null
  allowed, foreign key, delete sets null.
- **Affects**: Stored only. It has no effect today.
- **When empty**: n/a.
- **If you change it**: Nothing.

## Part 3: Zone and pack fields

### Putaway zone: Replenishment Allowed

- **Screen**: Warehouse Configuration > Topology > Putaway Zones > open a zone > **Replenishment Allowed**
  (checkbox, form `putawayzone_edit_form`).
- **Column**: `putawayzone.replenishment_allowed`, boolean, not null, default
  `false` (`001_baseline.sql:4182`).
- **Affects**: Stored only. It has no effect today. Search: `grep -rn
  replenishment_allowed crates clients ui --include=*.rs --include=*.go
  --include=*.ts` returns the zone model, the zone RPC and the form row.
- **Example**: Tick it for zone PICK1. No task is created. Putaway into PICK1
  is not affected.
- **If you change it**: Nothing.

### Putaway zone: Replenishment Threshold

- **Screen**: same form > **Replenishment Threshold** (whole number).
- **Column**: `putawayzone.replenishment_threshold`, integer, not null, default
  0, check `>= 0` (`001_baseline.sql:4183,4200`).
- **Affects**: Stored only. It has no effect today. No job compares stock to
  this number.
- **Example**: 20. Nothing happens when the zone has 5 units left.
- **If you change it**: Nothing.

### Pack item: Replenish

- **Screen**: Packs > open a pack > pack item > **Replenish** (checkbox, basic
  form).
- **Column**: `pack_item.replenish`, boolean, not null, default `false`
  (`001_baseline.sql:3623`).
- **Affects**: Stored only. It has no effect today. Copied between pack
  revisions and shown in the
  pack hierarchy view. No process reads it for a decision.
- **Example**: Tick `replenish` on the `CS` level. No case is moved on demand.
- **If you change it**: Nothing.

## Part 4: Names in code

### Move source type `Replenishment`

- **Screen**: None. Not offered on any RF screen or form. API only: the move
  command `move_execute` takes a context with `source_type` (JSON value
  `replenishment`).
- **What it is**: A label on a manual move. The source type is written to the
  transaction log (`transaction_log.source_type`). It supports the "category"
  `Replenishment` for reports.
- **What it checks**: The destination location type must be `Pick`,
  `SpeedPick` or `Pickto`. A partial
  quantity is not allowed: the whole stock record moves. No hold is added or removed. It is a supported "phase 1" type.
- **What it does not do**: It does not look at levels, policies, zones or
  thresholds. It does not create tasks. It does not decide anything.
- **To verify** (needs a running system): call `move_execute` with
  `source_type: "replenishment"` to a `Pick` location: it succeeds. Send the
  same to a storage location of another type: it fails with an allowed-types
  message.

### Move source type `LetDown`

- **Screen**: None. API value `let_down`.
- **What it does**: Nothing. The move is refused with `UnsupportedSourceType`. It is
  listed so the name is reserved.
- **To verify**: call `move_execute` with `source_type: "let_down"`. Expect the
  error `UnsupportedSourceType`.

### Pending move-in source `Replenishment`

- **Screen**: None.
- **What it is**: A value of the source list of `pending_move_in`: "Held by
  replenishment for the pick face it is topping up".
- **Affects**: Nothing writes it except tests. The only real writer of
  pending move-ins is putaway.

### Task type `Replenish`

- **Screen**: None. No form field lists task types with this value. The only
  form field that uses the word **Replenish** is the pack item checkbox in
  Part 3 (label id 1781, form `pack_item_basic_form`).
- **Column**: enum value `Replenish` in the task type enum.
- **What it does**: The generic task framework can hold a task of this type
  and treats it as not source-owned.
  Rights can be granted per work area for it.
- **Affects**: **Nothing creates a task of this type.** Search: `grep -rn
  "TaskType::Replenish" crates --include=*.rs` returns only the enum,
  the aggregate's `match` and a test. The RF has no screen for it.
- **If you grant it**: A work area right for `Replenish` gives access to tasks
  that cannot exist.

## Fields that are stored only (full list)

| Field | Where | Screen label |
|---|---|---|
| `replenishment_policy.code` | the policy | Code (Warehouse Configuration > Policies > Replenishment Policy) |
| `replenishment_policy_detail.*` | retired | none |
| `sku.replenishment_policy_id` | SKU | Replenishment Policy (SKU > Policies) |
| `owner_config.default_replenishment_policy_id` | owner config | Replenishment Policy |
| `putawayzone.replenishment_allowed` | zone | Replenishment Allowed |
| `putawayzone.replenishment_threshold` | zone | Replenishment Threshold |
| `pack_item.replenish` | pack level | Replenish |

Each of these has been searched in the Rust code, SQL, the Go RF client and
the UI source. None changes a decision.

Three names do something small but are not an engine: `MoveSourceType::Replenishment`
(a label and a destination-type check), `MoveSourceType::LetDown` (refused),
`PendingMoveInSource::Replenishment` and `TaskType::Replenish` (names with no
producer).

## What to do in a real warehouse today

1. Use cycle counts and reports to find low pick faces (this is a person's job).
2. Move stock with the normal **Move** command.
3. Keep policies and zone thresholds blank or consistent with your plan, but
   know they are not enforced.
4. When an engine is built, expect these fields to become real. Do not rely on
   what you type in them now.
