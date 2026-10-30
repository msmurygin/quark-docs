# Cartonization: why a unit is not placed

**What this shows.** The checks the solver makes, in order, when a unit goes into no box, and what the order screen shows for each reason.

```mermaid
flowchart TD
    U["Unit goes into no box"] --> D0{"A side of the pack item is 0?"}
    D0 -- yes --> R0["No dimensions"]
    D0 -- no --> D1{"No active carton in the policy?"}
    D1 -- yes --> R1["No candidate cartons"]
    D1 -- no --> D2{"Block has many units, each fits alone?"}
    D2 -- yes --> R2["Splitting not allowed"]
    D2 -- no --> D3{"Size fits but weight blocks a box?"}
    D3 -- "unit weight unknown" --> R3["No weight"]
    D3 -- "weight over the limit" --> R4["Overweight"]
    D3 -- no --> R5["Nothing fits"]
    R0 --> OUT["Exceptions tab row, plan PlannedWithExceptions"]
    R1 --> OUT
    R2 --> OUT
    R3 --> OUT
    R4 --> OUT
    R5 --> OUT
    OUT --> BL["Pick with no placed unit: BLOCKED, no task"]
```

Check 0 runs before any packing. Checks 1 to 4 run only after the solver found no place, in the order drawn. "Nothing fits" is the default answer, so it comes last.

## What you see and what fixes it

| Reason on the Exceptions tab | Hint on the screen | What to change |
|---|---|---|
| No dimensions | fix on the pack card | Length, width and height of the pack item. |
| No weight | fix on the pack card | Weight of the pack item, or set every carton's max gross weight to 0. |
| No candidate cartons | fix in the policy | Add or activate a carton row. |
| Splitting not allowed | fix in the policy | Set **Pick splitting** to `Allow`. |
| Overweight | fix in the policy | Raise the max gross weight of a carton, or correct a wrong pack item weight. |
| Nothing fits | fix in the policy | Add a bigger carton. A max-units limit that blocks the unit is also reported as "Nothing fits". |

The action on every row is always "Stop this line". The six "Exception handling" drop-downs on the policy are read and then ignored. Save refuses `Ship as is`.

To recover, fix the data, then reserve or release the order again. The plan input holds sizes, weights, rotation rule and the whole policy. If any of them changed, the plan is recalculated. If nothing changed, the old result stays.
## Related pages

- [Exceptions tab](../../reference/outbound/15-cartonization-exceptions-tab.md)
- [Cartonization: how it works](../../admin/policies/30-cartonization-overview.md)
- [Cartons and pack item](13-cartonization-influence-cartons-and-pack-item.md)
- [Overview of this area](00-overview.md)
