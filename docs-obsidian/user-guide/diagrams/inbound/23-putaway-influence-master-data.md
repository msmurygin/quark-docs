# Putaway: what SKU, pack, lot, zone and location settings change

This page covers the master data that the "Capacity" and "Landing" checks of putaway read.
Each diagram answers one question: "if I change this field, which refusal does an operator or the dry run see?"
Policy and step settings are on [22-putaway-influence-step-settings.md](22-putaway-influence-step-settings.md).
Only fields that code reads are drawn. Fields that nothing reads are listed at the end under "Stored only. It has no effect today."

## Diagram 1. The capacity check, in order

**What this shows:** the order of the capacity gates on one candidate location, and the refusal code of each.

```mermaid
flowchart TD
    A["Capacity check on a candidate"] --> B{"Needs more than 1 position?<br/>sku.positions_required"}
    B -- yes --> C{"location.section is a whole free<br/>section, big enough?"}
    C -- no --> X1["section_none, section_not_free,<br/>section_too_small"]
    C -- yes --> D
    B -- no --> D{"Held for another pallet's<br/>spanning goods?"}
    D -- yes --> X2["section_promised"]
    D -- no --> E{"Pallet already stands here?"}
    E -- yes --> OK["Fits: the switches are skipped"]
    E -- no --> F["Step switches in this order:<br/>1 Pallet dimensions<br/>2 Stacking limit<br/>3 Quantity<br/>4 Weight, then Cube at the location<br/>5 Weight, Cube, cases of another zone"]
    F --> G{"A limit is exceeded?"}
    G -- yes --> X3["capacity with a detail:<br/>loc_footprint, loc_height, loc_positions,<br/>item_positions, loc_qty, loc_weight,<br/>loc_cube, zone_weight, zone_cube,<br/>zone_cases_count"]
    G -- no --> OK
```

Reading notes:

- The section test and the "held" test run whatever the step says. The five switches belong to the step (`fit_by_pallet_dims`, `fit_by_stack_limit`, `fit_by_quantity`, `fit_by_weight`, `fit_by_cube`).
- The zone part runs only when the destination zone differs from the zone where the pallet stands now.
- A limit of 0 (or empty) means "not set". The check is not run and the candidate is still offered. The trace reports it as `<limit>:no_limit`. It is not a refusal.
- Missing data also skips a check and is reported: `no_product_dims` (the pack does not describe the pallet), `no_location_dims` (the location has no length, width or height), `no_stock_weight` (no weight known for the stock).
- A free section means: every position has status `Ok`, flag `None`, no stock, no pallet standing in it and no live reservation of another pallet. Section width is the sum of the positions. Depth and height are the lowest value of the positions.

### Where it comes from

| Item | Source |
|---|---|
| Order of the switches and the zone part | `crates/libs/wms-inventory/src/putaway/space.rs:640-835` |
| Section test | `crates/libs/wms-inventory/src/putaway/space.rs:1052-1102`, `crates/libs/wms-lib-core/src/model/location.rs:2295-2365` |
| Capacity rule, `section_promised` | `crates/libs/wms-inventory/src/putaway/predicate.rs:282-447` |
| Limits of 0 are "not checked" | `crates/libs/wms-inventory/src/putaway/space.rs:1156-1195` |
| Switches of a step | `crates/libs/wms-inventory/src/putaway/space.rs:496-545` |

## Diagram 2. Physical fit: pallet size, stacking, quantity

**What this shows:** which fields feed the three physical switches.

```mermaid
flowchart LR
    SW1["step.fit_by_pallet_dims"] --> C1{"Pallet base and height<br/>fit the location?"}
    P1["pack_item.pallet_wood_length, width, height,<br/>pallet_hi, height of the tier"] --> C1
    L1["location.length, width, height"] --> C1
    C1 -- no --> R1["loc_footprint or loc_height"]
    SW2["step.fit_by_stack_limit"] --> C2{"Pallet positions<br/>within the limit?"}
    L2["location.footprint x location.stack_limit"] --> C2
    P2["sku.stack_limit: lowest above 0"] --> C2
    C2 -- no --> R2["loc_positions or item_positions"]
    SW3["step.fit_by_quantity"] --> C3{"Quantity within<br/>the limit?"}
    L3["location.max_qty_capacity"] --> C3
    C3 -- no --> R3["loc_qty"]
```

| Field | Decision it changes | What you see |
|---|---|---|
| `pack_item.pallet_wood_length`, `pallet_wood_width` (largest base on the SKU's packs) | Pallet base. It must fit the location length and width, in either direction. | `loc_footprint` |
| `pack_item.pallet_wood_height`, `pallet_hi` and the height of the child pack item | Pallet height = base height + `pallet_hi` x tier height. A pallet exactly as tall as the location fits. | `loc_height` |
| `location.length`, `width`, `height` (0 means unknown) | Location size for the test above. | `no_location_dims` in the trace when unknown |
| `location.footprint` ("Pallet positions on floor") and `location.stack_limit` | Limit = footprint x stack limit. Used = pallets standing plus pallets promised, then this one. | `loc_positions` |
| `sku.stack_limit` | If it is above 0 and lower than the location's stack limit, it wins. If the location has stack limit 0, the SKU value is used. | `item_positions` |
| `location.max_qty_capacity` | Limit for the quantity already there plus the quantity arriving. It does not count quantity promised by reservations. | `loc_qty` |

### Where it comes from

| Item | Source |
|---|---|
| Pallet size from packs | `crates/libs/wms-inventory/src/putaway/space.rs:287-340` |
| Location size, either direction, height test | `crates/libs/wms-inventory/src/putaway/space.rs:218-286`, `:875-918` |
| Stack limit choice | `crates/libs/wms-inventory/src/putaway/space.rs:704-727`, `:149-155` |
| Quantity check | `crates/libs/wms-inventory/src/putaway/space.rs:732-742` |
| What "used" contains | `crates/libs/wms-inventory/src/putaway/space.rs:920-1000` |

## Diagram 3. Weight, cube and zone limits

**What this shows:** which fields feed the weight and cube checks, and the extra zone totals when the pallet changes zone.

```mermaid
flowchart LR
    S1["sku.gross_wgt, active pack item weight,<br/>sku.cube x quantity"] --> W{"Weight at the location"}
    S1 --> V{"Cube at the location"}
    U["stock at the location<br/>plus live reservations"] --> W
    U --> V
    L1["location.max_weight_capacity"] --> W
    L2["location.max_cube_capacity"] --> V
    SW1["step.fit_by_weight"] --> W
    SW2["step.fit_by_cube"] --> V
    W -- over --> R1["loc_weight"]
    V -- over --> R2["loc_cube"]
    Z1["putawayzone.max_weight, max_cube"] --> ZC{"Zone totals<br/>only if the pallet changes zone"}
    Z2["putawayzone.max_cases_count<br/>no switch turns it off"] --> ZC
    ZC -- over --> R3["zone_weight, zone_cube,<br/>zone_cases_count"]
```

| Field | Decision it changes | What you see |
|---|---|---|
| `step.fit_by_weight`, `step.fit_by_cube` | Turn the weight and cube checks on or off, for the location and for the zone. | Without the switch the check does not run. |
| `location.max_weight_capacity`, `location.max_cube_capacity` | Limits. Attempted = stock there + promised + this pallet. | `loc_weight`, `loc_cube` |
| `sku.gross_wgt` and the weights of the active pack revision | Weight of the pallet. If it is unknown the weight check is not run. | `loc_weight:no_stock_weight` in the trace |
| `sku.cube` | Cube of the pallet is the sum of cube x quantity over the lines. A cube of 0 adds nothing. | `loc_cube` |
| `putawayzone.max_weight`, `putawayzone.max_cube` | Zone totals. Used only when the destination zone differs from the zone where the pallet stands, and only with the matching switch on. | `zone_weight`, `zone_cube` |
| `putawayzone.max_cases_count` | Number of stock-bearing containers in the pallet against the zone limit. Used only for a different zone. No switch turns it off. | `zone_cases_count` |

The move itself checks location and zone weight and cube, and the zone case count, whatever the step switches say (`crates/libs/wms-inventory/src/movement/validation.rs:920-1000`).
If a step switches `Cube` or `Weight` off, putaway can suggest a place that the move then refuses (the operator is asked for a supervisor, see [20-putaway-journey.md](20-putaway-journey.md)).

### Where it comes from

| Item | Source |
|---|---|
| Location weight and cube; zone part | `crates/libs/wms-inventory/src/putaway/space.rs:745-835` |
| Zone totals and limits | `crates/libs/wms-inventory/src/putaway/space.rs:1104-1150` |
| Pallet weight from SKU and pack | `crates/libs/wms-lib-core/src/model/pack/weight.rs:255-335` |
| Pallet cube, quantity, stack limit, positions required | `crates/libs/wms-inventory/src/putaway/mod.rs:1449-1480` |
| Number of stock-bearing containers | `crates/libs/wms-inventory/src/putaway/space.rs:56-82` |
| Move checks the same limits | `crates/libs/wms-inventory/src/movement/validation.rs:920-1000` |

## Diagram 4. The landing rules (mixing)

**What this shows:** the order in which the landing check looks at the location's flags, the lot rules and the pallet's own lots, and which field causes each refusal.

```mermaid
flowchart TD
    A["Landing check: same function as the move"] --> B{"location.mix_sku off and another<br/>SKU of the owner is there?"}
    B -- yes --> X1["mix_sku"]
    B -- no --> C{"location.mix_lot off and another<br/>lot is there?"}
    C -- yes --> X2["mix_lot"]
    C -- no --> D{"A lot rule with allow_mix off and<br/>another lot on the pallet differs?"}
    D -- yes --> X3["mix_attribute"]
    D -- no --> E{"Pallet carries two lots of a SKU<br/>that allows one lot per LPN?"}
    E -- yes --> X4["lpn_multi_lot"]
    E -- no --> OK["Landing is ok"]
```

| Field | Decision it changes | What you see |
|---|---|---|
| `location.mix_sku` (default on) | When off, the location may hold only the incoming SKU of that owner. It counts stock only, not reservations. | `mix_sku` |
| `location.mix_lot` (default on) | When off, the location may hold only the incoming lot. It counts stock only. When off, the lot attribute rules below are not asked at all. | `mix_lot` |
| `location_lot_commingle` (location, attribute code, `allow_mix`) | For each attribute of the SKU's lot policy, a rule on the location wins over the zone rule. `allow_mix` on is a deliberate exception. | `mix_attribute` |
| `putawayzone_lot_commingle` (zone, attribute code, `allow_mix`) | Used when the location has no rule for that attribute. | `mix_attribute` |
| `lot_policy_attribute` of `sku.lot_policy_id` | Names the attributes the rules above are asked about. A rule for another attribute is ignored. | none |
| `lot_attributes` value of the incoming lot | The rule compares it with the other lots standing on the same pallet. If the lot has no value for the attribute there is nothing to conflict with. | `mix_attribute` |
| `sku.allow_multi_lot_on_lpn` (column default off) | If the SKU does not allow several lots on one LPN, a pallet that carries another lot of that SKU fails everywhere. | `lpn_multi_lot` |
| `sku.force_separate_lpn_per_lot` (column default off) | Same effect for the incoming SKU. | `lpn_multi_lot` |

Reading notes:

- The `mix_attribute` rule compares lots on the same pallet. It does not compare the pallet with what stands in the location.
- `lpn_multi_lot` is a property of the pallet, not of the location. It gives the same answer at every location, so the step ends with no location.
- Putaway compares the incoming SKUs and lots with what is already in the location. It does not compare the pallet's own mix with the location flags, so a pallet with two SKUs or two lots can be offered an empty location with `Mix SKU` or `Mix Lot` off. The move does make that comparison (`validate_batch_self_consistency`). In a directed move it comes back as a supervisor approval for `sku_mixing` or `lot_mixing`.
- The step switches `Mixed SKU` and `Mixed lot` (diagram 4 of the other page) are a different check. They also see live reservations. The location flags here do not.
- The owner setting `owner_config.allow_mixed_lpn` is not read by putaway. It applies when stock enters an existing pallet (`DepositInto`), and putaway relocates the whole pallet.

### Where it comes from

| Item | Source |
|---|---|
| Landing check called by putaway | `crates/libs/wms-inventory/src/putaway/predicate.rs:852-942` |
| Order of the violations | `crates/libs/wms-inventory/src/inventory_service.rs:838-940` |
| `mix_sku`, `mix_lot` | `crates/libs/wms-inventory/src/inventory_service.rs:999-1105` |
| Lot attribute rules, location before zone | `crates/libs/wms-inventory/src/inventory_service.rs:1433-1610`, `:2512-2519` |
| Compared with the pallet's other lots | `crates/libs/wms-inventory/src/inventory_service.rs:1613-1700`, `crates/libs/wms-lib-core/src/model/inventory/lot_attributes.rs:213-240` |
| Lot policy of the SKU | `crates/libs/wms-inventory/src/inventory_service.rs:1705-1735` |
| `lpn_multi_lot` | `crates/libs/wms-inventory/src/inventory_service.rs:1163-1290` |
| Pallet's own mix is checked by the move, not by putaway | `crates/libs/wms-inventory/src/movement/validation.rs:788-835`, `crates/libs/wms-inventory/src/inventory_service.rs:943-985` |
| Defaults | `crates/libs/wms-lib-core/src/model/location.rs:38-39`, `crates/libs/wms-lib-core/src/model/sku.rs:22`, `:35`, `crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:2167`, `:2181` |
| Code mapping to refusal strings | `crates/libs/wms-inventory/src/putaway/predicate.rs:944-985` |

## What putaway does not read

| Area | Result |
|---|---|
| Receipt policy (`receipt_policy`, `sku.receipt_policy_id`, `owner_config.default_receipt_policy_id`) | The putaway engine and the move do not read any receipt policy field. Receiving only supplies the pallet: its LPN, lots and where it stands. Receiving also publishes the event `process.receipt.ready_for_putaway`, but no code in the repository starts a putaway from it. Putaway starts when the operator scans the pallet. |
| `location.route_sequence` | Not used by putaway. The order is `aisle`, `bay`, `level`, `code`. |
| `location.processing_type`, `location.category`, `location.abc` | Read only by the matching step conditions. |
| `sku.putaway_class` | Read only by a `Putaway class` condition. |

## Stored only. It has no effect today.

These fields are stored and shown, but no code reads them to make a decision (searched in `crates/` and `clients/rf-go`).

| Object | Fields |
|---|---|
| Putaway zone | `inbound_loc`, `outbound_loc`, `rf_pick_strategy`, `replenishment_allowed`, `replenishment_threshold`, `default_label_printer`, `default_report_printer`, `auto_print_addr_label`, `auto_print_carton_label` |
| Location | `cube` (the location's own volume; the checks read `max_cube_capacity`), `check_digit` (written once when a location is created) |
| Receipt policy | `receipt_without_po`, `receipt_without_asn`, `no_sku_on_po`, `asn_po_qty_discrepancy`, `po_qty_validation`, `excess_message`, `shortage_message` and the `po_*` fields. See [13-receive-checks-and-policy.md](13-receive-checks-and-policy.md). |

## Not confirmed by code

- Whether `location.footprint` is the field labelled "Pallet positions on floor" on every screen. The column name and the stack formula are in code. To verify: open a location card, tab Dimensions.

## Related pages

- [Putaway pipeline, step by step](21-putaway-engine-steps.md)
- [What each setting changes (policy and step)](22-putaway-influence-step-settings.md)
- [Policy reference: zone settings](../../admin/policies/02-putaway-zone-settings.md)
- [Policy reference: location settings](../../admin/policies/03-location-settings.md)
- [Policy reference: SKU level settings](../../admin/policies/34-sku-level-settings.md)
- [Policy reference: lot policy and attributes](../../admin/policies/32-lot-policy-and-attributes.md)
