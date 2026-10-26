# Which picking policy is read for a pick

**What this shows.** For each part of picking, which policy revision the system reads: the policy of the area, the fallback `DISCRETE`, or a copy frozen on the cart or the pallet.

```mermaid
flowchart TD
    A["RF entry PICK01 Discrete Pick"] --> D["Policy DISCRETE, published"]
    B["RF entry PKA00 Pick by Area"] --> L["Lookup: equipment row, area default, DISCRETE"]
    L --> C{"Carrier Required?"}
    C -->|"yes"| S["Cart: policy copy frozen at start"]
    C -->|"no"| Z["Discrete dispatch in the area"]
    S --> S1["Copy decides route, completion, proof"]
    D --> P1["Proof fields read from DISCRETE"]
    Z --> P1
    D --> W1["Pallet opens under DISCRETE"]
    Z --> W2{"Pick in the area's zones?"}
    W2 -->|"yes"| W3["Pallet opens under area policy"]
    W2 -->|"no"| W1
    W1 --> W4["Pallet freezes its revision"]
    W3 --> W4
```

## Reading the diagram

- The lookup for `Pick by Area` is: the row of the area for the operator's equipment profile in `work_area_picking_policy`, else `work_area.picking_policy_code`, else `DISCRETE`. An operator who chose `On foot` has no profile, so the area default applies. A code with no published revision is an error (`picking policy {code} has no published revision`), not a silent `DISCRETE`.
- Only `Carrier Required` of the live policy decides, at dispatch, between a task and `Scan Carrier`. The shape check of the policy makes `Unit` = `PlannedTarget` always carry `Carrier Required` = Yes.
- A cart keeps the policy it started with. A new revision does not change a live assignment.
- The five source-proof fields of a **discrete** pick are read from the published revision of `DISCRETE` at the moment of each scan, whatever policy the area has. A policy of `Unit` = `Order` with another code contributes its pallet fields only. Its proof fields are never read for a discrete pick.
- A pallet freezes its revision when it is opened. A new revision does not change an open pallet.
- A pick that is taken through `PICK01` always opens its pallet under `DISCRETE`, because that entry sends no area. `pick_drop_open` receives `work_area_code` only from the `Pick by Area` flow.
- `Retire` is refused for `DISCRETE` and for any code an area uses.

## Where it comes from

| What | Source |
|---|---|
| Lookup of the area policy | `crates/libs/wms-lib-core/src/model/outbound/picking_policy.rs:600-650` |
| Dispatch reads the policy of area and equipment | `crates/libs/wms-outbound/src/picking/commands/dispatch_next.rs:259-300` |
| Cart start copies the policy | `crates/libs/wms-outbound/src/picking/commands/start.rs:179-200` and `:370-372` |
| Copy shape | `crates/libs/wms-outbound/src/domain/pick_assignment/aggregate.rs:25-48` |
| Source proof: copy on a cart, `DISCRETE` otherwise | `crates/libs/wms-outbound/src/picking/confirmation/source_facts.rs:62-92` |
| Pallet opens under the area policy or `DISCRETE` | `crates/libs/wms-outbound/src/picking/commands/drop_open.rs:113-143` and `:180-196` |
| Pallet reads its frozen revision | `crates/libs/wms-outbound/src/picking/deposit/onto_pallet.rs:178-200` |
| Count flag reads the pallet's revision or the cart's copy | `crates/libs/wms-outbound/src/picking/emptied_location.rs:37-60` |
| Shape rules of a policy | `crates/libs/wms-outbound/src/domain/picking_policy/aggregate.rs:195-262` |
| `Pick by Area` sends the area, `PICK01` does not | `crates/libs/wms-lib-sql/sql/rf-screens/110_uc_pick_aggregated_cart.sql`, `crates/libs/wms-lib-sql/sql/rf-screens/111_uc_pick_drop_area.sql` |

## Related pages

- [Cart policy fields](51-influence-picking-policy.md)
- [Source proof fields](57-influence-source-proof.md)
- [Pallet fields](56-influence-pallet-fields.md)
- [Picking policy settings (reference)](../../admin/policies/21-picking-policy-settings.md)
- [Work areas, equipment and permissions](../../admin/policies/22-work-areas-equipment-and-permissions.md)
