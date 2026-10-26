# Putaway: what the policy and step settings change

Each diagram below answers one question: "if I change this setting, which decision of the putaway engine changes, and what does the operator or the dry run show?"
Only settings that code reads are drawn. Settings that nothing reads are listed at the end of this page under "Stored only. It has no effect today."
Master data (SKU, pack, lot, zone, location) is on [23-putaway-influence-master-data.md](23-putaway-influence-master-data.md).

## Diagram 1. Which steps run for this pallet?

**What this shows:** the settings that choose the policy, the order of its steps, and whether a step applies to this pallet.

```mermaid
flowchart LR
    A1["sku.putaway_policy_id"] --> P{"Policy of the pallet"}
    A2["owner_config.default_putaway_policy_id"] --> P
    P -- "none found" --> E1["Error: no putaway policy"]
    P -- "two found" --> E2["Error: LPN spans SKUs with<br/>different putaway policies"]
    B1["step.sequence"] --> O{"Order of the steps"}
    P --> O
    C1["step.guard with from_zone<br/>or from_location"] --> G{"Does the step apply<br/>where the pallet stands?"}
    O --> G
    G -- no --> K1["skipped:guard"]
    D1["Product and Lot conditions<br/>of the step"] --> Q{"Does every line pass<br/>every condition?"}
    G -- yes --> Q
    Q -- no --> K2["skipped:product:Property"]
```

| Setting | Decision it changes | What you see |
|---|---|---|
| `sku.putaway_policy_id` | Policy of the pallet. Wins over the owner default. | Error text `no putaway policy on the SKU or the owner default` or `LPN spans SKUs with different putaway policies: ...` |
| `owner_config.default_putaway_policy_id` | Policy for SKUs that have none. | Same errors. |
| `step.sequence` | Order of the steps. The first step that finds a location wins. Steps are read by `sequence`, never by `step_num`. | Which location is suggested. |
| `step.guard` (`None`, `FromZone`, `FromLocation`) and `from_zone`, `from_location` | The step applies only if the pallet's current zone, or current location, equals the anchor. A guard with an empty anchor matches nothing. | Trace status `skipped:guard`. |
| Conditions of family `Product` and `Lot` (7 properties, table below) | The step applies only if every line of the pallet passes every condition. One failing line skips the whole step. | Trace status `skipped:product:<Property>` |

The seven pallet conditions and what each one reads:

| Property | Reads | A blank value |
|---|---|---|
| `SkuAbc` | `sku.abc` | passes |
| `SkuGroup` | `sku.sku_group` | passes |
| `SkuClass` | `sku.class` | passes |
| `PutawayClass` | `sku.putaway_class` | passes |
| `Rotation` | `sku.rotation` | passes |
| `LotAttribute` (needs a code) | `lot_attributes` for the line's lot and the code | refuses |
| `SkuAttribute` (needs a code) | `attribute_value` of the SKU for the code | refuses |

### Where it comes from

| Item | Source |
|---|---|
| Policy of a SKU, then the owner default | `crates/libs/wms-lib-core/src/model/sku.rs:867-885` |
| One policy per pallet, both errors | `crates/libs/wms-inventory/src/putaway/policy.rs:20-60`, `:92-155` |
| Steps read ordered by `sequence` | `crates/libs/wms-inventory/src/putaway/mod.rs:825-827` |
| Guard rule | `crates/libs/wms-inventory/src/putaway/step.rs:382-388` |
| Pallet conditions and the blank-value rule | `crates/libs/wms-inventory/src/putaway/product.rs:343-372`, `:411-495` |
| Which property belongs to the pallet side | `crates/libs/wms-lib-core/src/model/policies/putaway_step_criterion.rs:248` |
| Step status strings | `crates/libs/wms-inventory/src/putaway/mod.rs:937`, `:951`, `:973` |

## Diagram 2. Where does the step look?

**What this shows:** how the scope, the zone or location on the step, the SKU preference and the temperature switch pick the search space.

```mermaid
flowchart LR
    A["step.scope"] --> D{"Zone or location<br/>to search"}
    B["step.to_zone or step.to_location"] --> D
    C["sku.putawayzone or sku.putaway_loc<br/>of the first line"] --> D
    D -- "nothing found" --> K1["skipped:no-zone or<br/>skipped:no-location"]
    D -- found --> T{"step.respect_temperature on?"}
    F["step.respect_temperature"] --> T
    T -- yes --> T2{"Zone range overlaps the<br/>SKU range for every line?"}
    G["putawayzone.min_temperature<br/>putawayzone.max_temperature"] --> T2
    H["sku.min_temperature<br/>sku.max_temperature"] --> T2
    T2 -- no --> K2["skipped:temperature"]
    T -- no --> N["Candidates are read"]
    T2 -- yes --> N
```

| Setting | Decision it changes | What you see |
|---|---|---|
| `step.scope = ZoneFromStep` with `step.to_zone` | Search that zone. | Candidates come from that zone. |
| `step.scope = ZoneFromSku` | Search `sku.putawayzone` of the first line of the pallet. With two SKUs the second SKU follows the first SKU's zone. | `skipped:no-zone` when the first SKU has no zone. |
| `step.scope = LocationFromStep` with `step.to_location` | Search only that location. It still passes the fixed gate and the `Location` conditions. | `skipped:no-location` if empty; zero candidates if the location is on hold or flagged. |
| `step.scope = LocationFromSku` | Search only `sku.putaway_loc` of the first line. | `skipped:no-location` when the SKU has none. |
| `step.scope = AssignedSlot` | Not implemented. | The whole policy is refused: `step uses scope=AssignedSlot, which this build cannot execute`. |
| `step.respect_temperature` | Skip the step if the zone does not suit the pallet. For a named location the zone is the location's zone. | `skipped:temperature` |
| `putawayzone.min_temperature`, `max_temperature`; `sku.min_temperature`, `max_temperature` | Ranges overlap when `zone_min <= sku_max` and `sku_min <= zone_max`. An empty bound is open. A line whose SKU did not load counts as fitting. Read only when the switch is on. | Same status. |

### Where it comes from

| Item | Source |
|---|---|
| Scope to search space | `crates/libs/wms-inventory/src/putaway/step.rs:517-565` |
| `sku.putawayzone` and `sku.putaway_loc` | `crates/libs/wms-lib-core/src/model/sku.rs:979-1030` |
| Statuses `skipped:no-zone`, `skipped:no-location` | `crates/libs/wms-inventory/src/putaway/mod.rs:967-980` |
| Refusal of `AssignedSlot` | `crates/libs/wms-inventory/src/putaway/step.rs:184-260` |
| Temperature overlap test | `crates/libs/wms-inventory/src/putaway/step.rs:438-475` |
| Temperature for a zone scope, for a location scope | `crates/libs/wms-inventory/src/putaway/mod.rs:1014-1035`, `:1197-1225` |
| Different zones for two SKUs are recorded in the trace | `crates/libs/wms-inventory/src/putaway/mod.rs:999-1001`, `:1177-1180`, `crates/libs/wms-inventory/src/putaway/trace.rs` |

## Diagram 3. Which locations are candidates, and in what order?

**What this shows:** the fixed gate, the `Location` conditions and the order that decide which locations are looked at, and how many.

```mermaid
flowchart LR
    A["location.status = Ok<br/>location.loc_flag = None<br/>location.discard_lpn not on"] --> F{"Fixed gate in SQL"}
    B["location.loc_type in Case, Pick, SpeedPick,<br/>Pnd, Sort, Other"] --> F
    C["Location conditions: type, category,<br/>processing type, ABC, Mixed SKU,<br/>Mixed lot, attribute"] --> F
    F --> L["Candidate list"]
    D["step.ordering = Route"] --> O{"Order of the list"}
    E["location.aisle, bay, level, code"] --> O
    L --> O
    O --> R["Up to 100 candidates:<br/>5 batches of 20"]
    R --> Z["0 candidates:<br/>ran over 0 candidates"]
```

| Setting | Decision it changes | What you see |
|---|---|---|
| `location.status`, `location.loc_flag`, `location.discard_lpn` | A location that is not `Ok`, not flag `None`, or has `Discard LPN` on is never a candidate. | It is not counted anywhere. |
| `location.loc_type` | Only the six types are allowed. A `Location type` condition can narrow the list, never widen it. | If the condition leaves no allowed type, the whole policy is refused. |
| Condition `Location type`, `Location category`, `Processing type`, `Location ABC`, `Mixed SKU`, `Mixed lot`, `Location attribute` | Remove locations before any check runs. | Fewer candidates. The full trace counts how many each property removed. |
| Condition `Location status`, `Location flag` | Accepted only in forms that cannot remove an allowed location (`is Ok`, `is not Hold`; `is None`, `is not CycleCountActive`). They add no new filter. Any other form refuses the whole policy. | Policy error. |
| `step.ordering = Route` | Order by `aisle`, then `bay`, then `level`, then `code`. `aisle` is text, so `A10` sorts before `A2`. It does not use `Route Sequence`. | The first location in this order that passes the checks wins. |
| `step.ordering = NearestToSlot` | Not implemented. | The whole policy is refused. |

### Where it comes from

| Item | Source |
|---|---|
| Fixed gate SQL | `crates/libs/wms-lib-core/src/model/location.rs:2097-2183` |
| Allowed destination types of a putaway | `crates/libs/wms-inventory/src/movement/validation.rs:135-148` |
| Narrowing the type list; refusal texts | `crates/libs/wms-inventory/src/putaway/candidates.rs:140-175`, `:300-345`, `:400-440` |
| Property to column in SQL | `crates/libs/wms-lib-core/src/model/location.rs:1685-1925` |
| Order `aisle, bay, level, code` | `crates/libs/wms-lib-core/src/model/location.rs:418-423` |
| `NearestToSlot` refused | `crates/libs/wms-inventory/src/putaway/candidates.rs:48-58` |
| 20 per batch, 5 batches | `crates/libs/wms-inventory/src/putaway/candidates.rs:28-32` |

## Diagram 4. May this candidate be used? (occupancy and consolidate)

**What this shows:** how the step's mode and occupancy switches compare the pallet with what stands in the location, and the codes they refuse with.

```mermaid
flowchart LR
    S["Stock at the location<br/>plus live reservations"] --> C{"Consolidate rule"}
    S --> M{"Occupancy rule"}
    A["step.mode"] --> C
    C -- "none of the pallet's SKUs there" --> K1["not_consolidatable"]
    B1["step.require_empty"] --> M
    B2["step.allow_mixed_sku"] --> M
    B3["step.allow_mixed_lot"] --> M
    M -- "occupied or promised" --> K2["mix_intent"]
    M -- "more than one SKU" --> K3["mix_intent_sku"]
    M -- "more than one SKU and lot" --> K4["mix_intent_sku_lot"]
```

| Setting | Decision it changes | What you see |
|---|---|---|
| `step.mode = Consolidate` | Only a location that already holds, or has a live reservation for, one of the pallet's owner and SKU pairs. The lot does not count. | `not_consolidatable` |
| `step.require_empty = true` | The location must hold no stock and no container, and no other pallet may hold a live reservation for it. This overrides the two mixing switches. | `mix_intent` |
| `step.allow_mixed_sku = false` | After the pallet lands the location may hold one owner and SKU pair. | `mix_intent_sku` |
| `step.allow_mixed_sku = false` with `step.allow_mixed_lot = false` | One owner, SKU and lot. | `mix_intent_sku_lot` |
| `allow_mixed_lot = false` alone | The policy is refused when it is loaded. | Error text `step sets allow_mixed_lot=...` |
| `Consolidate` with `require_empty = true` | The policy is refused when it is loaded. | Error text `step sets mode=Consolidate together with require_empty=true...` |

The three columns are written by one screen choice: `Any occupancy`, `Must be empty`, or `Allow mixing, with rules`.
A pallet with two SKUs fails `mix_intent_sku` at every location, even an empty one, because the pallet alone makes two identities.

### Where it comes from

| Item | Source |
|---|---|
| Three columns to one rule | `crates/libs/wms-inventory/src/putaway/predicate.rs:118-142` |
| Occupancy rule, `same_key`, `require_empty` | `crates/libs/wms-inventory/src/putaway/predicate.rs:449-651` |
| Consolidate rule | `crates/libs/wms-inventory/src/putaway/predicate.rs:764-850` |
| Combinations refused at load | `crates/libs/wms-inventory/src/putaway/step.rs:184-260` |
| Stock plus live reservations at a location | `crates/libs/wms-lib-core/src/model/inventory/inventory_balances.rs` (`committed_keys_at_location`) |
| Trace statuses and tallies | `crates/libs/wms-inventory/src/putaway/trace.rs` |

## Stored only. It has no effect today.

I searched the engine (`crates/libs/wms-inventory/src/putaway/**`) and the move (`crates/libs/wms-inventory/src/movement/**`) for these fields. Nothing reads them to decide a location.

| Field | Note |
|---|---|
| `putaway_policy.description` | Text for people. |
| `putaway_policy.code` | Name only; the engine uses the id. |
| `putaway_policy_detail.step_num` | Label shown as `Step N (S)` and in messages. The engine orders by `sequence`. |
| `putaway_policy_detail.to_zone` and `to_location` when the scope is not `ZoneFromStep` or `LocationFromStep` | Ignored for other scopes. |
| `putaway_policy_detail.from_zone` and `from_location` when the guard is `None` | Ignored. |
| `sku.putaway_class = NoMix` | Does nothing by itself. It matters only if a step has a `Putaway class` condition. |
| Step scope `AssignedSlot` and ordering `NearestToSlot` | Can be stored through the API, but the engine refuses the policy that holds them. |

## Not confirmed by code

- Which of the conditions an administrator can set from the step editor and which only through the API. This page draws what the engine reads. To verify: open the step editor and compare the list.

## Related pages

- [Putaway pipeline, step by step](21-putaway-engine-steps.md)
- [What each setting changes (master data)](23-putaway-influence-master-data.md)
- [Policy reference: steps and conditions](../../admin/policies/01-putaway-policy-steps-and-criteria.md)
- [Policy reference: putaway overview](../../admin/policies/00-putaway-overview.md)
