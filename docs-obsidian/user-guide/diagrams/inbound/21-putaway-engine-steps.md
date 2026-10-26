# Putaway pipeline: the decisions in order

The putaway engine answers one question: where does this pallet go? It never moves stock.
It picks a location and reserves it. These diagrams show every gate in the order the code runs it.
Each diagram answers one question.

## Diagram 1. What happens to one request

**What this shows:** the gates a request passes before any step runs, and the two ways it ends.

```mermaid
flowchart TD
    A["putaway_suggest_location"] --> B{"Container found, standing<br/>in a location, holds stock?"}
    B -- no --> X1["Error: container not found, no current<br/>location, or holds no stock"]
    B -- yes --> C["Read the pallet once: lines, cube,<br/>weight, size, stack limit"]
    C --> D{"All SKUs give one policy?"}
    D -- "no policy" --> X2["Error: no putaway policy on the SKU<br/>or the owner default"]
    D -- "two policies" --> X3["Error: LPN spans SKUs with<br/>different putaway policies"]
    D -- yes --> E{"Every step and condition can run?"}
    E -- no --> X4["Error: the whole policy is refused"]
    E -- yes --> F["Try the steps in order of sequence"]
    F --> G{"A step found a location?"}
    G -- yes --> H["Reserve it: inventory_pending_move_in Active"]
    G -- no --> I["No location: reason no_eligible_location<br/>or pallet_already_reserved"]
```

Reading notes:

- A policy error is an error, not "no location". The operator sees the error text.
- The check "every step can run" happens for all steps before the first step runs. One bad step refuses the whole policy. Examples: scope `AssignedSlot`, ordering `NearestToSlot`, `Must be empty` together with `Consolidate`, a condition value that does not exist, a `Location type` condition that leaves no authorized type.
- The pallet is the container and everything inside it. Lines are grouped by owner, SKU and lot. Only stock above zero counts.
- The policy is `COALESCE(sku.putaway_policy_id, owner_config.default_putaway_policy_id)` for each SKU. A SKU with neither is not counted. The pallet needs exactly one distinct policy.

### Where it comes from

| Gate | Source |
|---|---|
| Container, location, stock checks and messages | `crates/libs/wms-inventory/src/putaway/mod.rs:1320-1360`, `:120-162` |
| Pallet read: lines, cube, weight, stack limit, positions required, zone and location preferences, pack size | `crates/libs/wms-inventory/src/putaway/mod.rs:1360-1550` |
| One policy per pallet | `crates/libs/wms-inventory/src/putaway/policy.rs:92-155` |
| SKU policy, then owner default | `crates/libs/wms-lib-core/src/model/sku.rs:867-885` |
| Whole-policy check before any step | `crates/libs/wms-inventory/src/putaway/mod.rs:856-885`, `crates/libs/wms-inventory/src/putaway/step.rs:184-260` |
| Step loop | `crates/libs/wms-inventory/src/putaway/mod.rs:908-1290` |
| Reasons `no_eligible_location`, `pallet_already_reserved` | `crates/libs/wms-inventory/src/putaway/command.rs:56-61`, `:149-161` |

## Diagram 2. What happens inside one step

**What this shows:** the gates of a single step and the status the trace records when a step is skipped.

```mermaid
flowchart TD
    S["Step N"] --> G1{"Guard matches where<br/>the pallet stands?"}
    G1 -- no --> K1["skipped:guard"]
    G1 -- yes --> G2{"Pallet conditions hold<br/>for every line?"}
    G2 -- no --> K2["skipped:product:Property"]
    G2 -- yes --> G3{"Scope gives a zone<br/>or a location?"}
    G3 -- no --> K3["skipped:no-zone or<br/>skipped:no-location"]
    G3 -- yes --> G4{"Temperature switch on and<br/>the zone does not suit?"}
    G4 -- yes --> K4["skipped:temperature"]
    G4 -- no --> C1["Read up to 100 candidates:<br/>5 batches of 20"]
    C1 --> C2["4 checks on each candidate"]
    C2 --> C3{"A candidate passes all 4?"}
    C3 -- yes --> R["Lock the location, check again, reserve"]
    C3 -- no --> N["Status evaluated: go to the next step"]
```

Reading notes:

- If the scope is a named location (from the step or from the SKU), the "batch" is that one location. It still passes the fixed gate and the `Location` conditions.
- The step stops at the first candidate that passes. There is no score.
- A step that read 5 full batches and found nothing is marked as stopped at its scan budget (`batch_cap_reached`). The next step runs.
- `ZoneFromSku` and `LocationFromSku` use the first line of the pallet only.
- With `Temperature` on, the test is an overlap of the zone range and the SKU range, for every line. An empty bound means no limit on that side.

### Where it comes from

| Gate | Source |
|---|---|
| Guard | `crates/libs/wms-inventory/src/putaway/step.rs:382-388`, `crates/libs/wms-inventory/src/putaway/mod.rs:936-940` |
| Pallet conditions (`Product` and `Lot` family) | `crates/libs/wms-inventory/src/putaway/product.rs:343-372`, `crates/libs/wms-inventory/src/putaway/mod.rs:945-954` |
| Scope to zone or location; first line of the pallet | `crates/libs/wms-inventory/src/putaway/step.rs:517-565`, `crates/libs/wms-inventory/src/putaway/mod.rs:956-980` |
| Temperature | `crates/libs/wms-inventory/src/putaway/step.rs:438-475`, `crates/libs/wms-inventory/src/putaway/mod.rs:1007-1032` |
| 20 per batch, 5 batches | `crates/libs/wms-inventory/src/putaway/candidates.rs:28-32`, `crates/libs/wms-inventory/src/putaway/mod.rs:1051-1117` |
| Named location: one candidate | `crates/libs/wms-inventory/src/putaway/candidates.rs:594-602`, `crates/libs/wms-inventory/src/putaway/mod.rs:1226-1284` |

## Diagram 3. The four checks on a candidate

**What this shows:** the order of the four checks, the codes each can refuse with, and the second pass under the lock.

```mermaid
flowchart TD
    L["Candidate: passed the fixed gate and<br/>the Location conditions"] --> M1{"1 Occupancy rule of the step"}
    M1 -- refused --> R1["mix_intent, mix_intent_sku,<br/>mix_intent_sku_lot"]
    M1 -- ok --> M2{"2 Consolidate rule"}
    M2 -- refused --> R2["not_consolidatable"]
    M2 -- ok --> M3{"3 Capacity"}
    M3 -- refused --> R3["section_none, section_not_free,<br/>section_too_small, section_promised,<br/>capacity"]
    M3 -- ok --> M4{"4 Landing rules"}
    M4 -- refused --> R4["mix_sku, mix_lot, mix_attribute,<br/>lpn_multi_lot, landing_config"]
    M4 -- ok --> W["The candidate wins the step"]
    W --> U{"Same 4 checks again<br/>under the location lock"}
    U -- refused --> R5["under_lock:code, location_gone,<br/>lock_timeout, pallet_already_reserved"]
    U -- ok --> OK["Reservation row inserted"]
```

Reading notes:

- The first refusal ends the checks for that candidate. The trace counts one code per candidate.
- The fixed gate is applied in SQL, so a location that fails it is never a candidate and never appears in a count: status `Ok`, flag `None`, `Discard LPN` not on, type in `Case`, `Pick`, `SpeedPick`, `Pnd`, `Sort`, `Other` (a step can only narrow this list).
- `Capacity` first refuses oversize goods that need a whole free section, then the fit switches of the step. Details are on [22-putaway-influence-step-settings.md](22-putaway-influence-step-settings.md).
- `Landing` is the same function that the move runs. Details are on [23-putaway-influence-master-data.md](23-putaway-influence-master-data.md).
- `pallet_already_reserved` stops the whole scan: another request holds this pallet's single live reservation.
- A pallet that already stands in the candidate location skips the fit switches of the capacity check. The section check and the other three checks still run.

### Where it comes from

| Check | Source |
|---|---|
| Order of the four checks | `crates/libs/wms-inventory/src/putaway/predicate.rs:1041-1048` |
| Occupancy rule (`MixCheck` from three step columns) | `crates/libs/wms-inventory/src/putaway/predicate.rs:129-142`, `:449-651` |
| Consolidate rule | `crates/libs/wms-inventory/src/putaway/predicate.rs:764-850` |
| Capacity rule | `crates/libs/wms-inventory/src/putaway/predicate.rs:282-447` |
| Landing rule and code mapping | `crates/libs/wms-inventory/src/putaway/predicate.rs:852-1017` |
| Second pass under the lock, codes `under_lock:*`, `location_gone`, `lock_timeout` | `crates/libs/wms-inventory/src/putaway/reserve.rs:118-240`, `crates/libs/wms-inventory/src/putaway/mod.rs:731-780` |
| Fixed gate in SQL | `crates/libs/wms-lib-core/src/model/location.rs:2097-2183` |
| Authorized types for putaway | `crates/libs/wms-inventory/src/movement/validation.rs:135-148` |
| Types narrowing | `crates/libs/wms-inventory/src/putaway/candidates.rs:140-175`, `:400-440` |

## Not confirmed by code

- Redirect ordering by distance (`suggest_nearby`) is called only from the move when a directed move is redirected. It is not a screen or an API method of its own. It is shown on [20-putaway-journey.md](20-putaway-journey.md).
- `LocationFromSku` needs `sku.putaway_loc`. Whether warehouses fill it is data, not code.

## Related pages

- [Putaway journey](20-putaway-journey.md)
- [What each setting changes (policy and step)](22-putaway-influence-step-settings.md)
- [What each setting changes (master data)](23-putaway-influence-master-data.md)
- [Reservation life cycle, timers and what the operator sees](24-putaway-reservation-and-refusals.md)
- [Policy reference: steps and conditions](../../admin/policies/01-putaway-policy-steps-and-criteria.md)
