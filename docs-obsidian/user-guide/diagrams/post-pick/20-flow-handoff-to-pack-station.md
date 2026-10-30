# From picking to the pack station

**What this shows.** How a picked box becomes a waiting unit at a pack station, and how the station sees its queue.

This page focuses on the hand-off to packing. The outbound flow can also continue through consolidation and order control before staging; see the [post-pick overview](00-overview.md).

```mermaid
sequenceDiagram
    actor Pk as Picker
    participant St as pick_assignment_start
    participant Rt as OutboundFlowRoute
    participant Co as pick_assignment_complete
    participant Ho as OutboundFlowHandOff
    participant Fl as outbound_flow_unit
    participant As as outbound_unit_assignment
    participant Q as packing_queue_list
    actor Pa as Packer

    Pk->>St: scan carrier
    alt policy Completion is ConfirmAtLocation
        St->>Rt: station of the work area?
        Rt-->>St: Pack at the station, or nothing
    else policy Completion is Complete
        Note over St: never routed
    end
    Note over St: delivery location and capability are frozen on the assignment
    Pk->>Co: deliver carrier at the location
    Co->>Co: move the boxes to the delivery location
    opt assignment has a frozen capability
        loop each loaded box with picked picks
            Co->>Ho: box, picks, Pack, station
            Ho->>Fl: new unit, Pending, next Pack, assigned station
            Ho->>Fl: one membership row per pick
            Ho->>As: copy dispatch intent if there is one
        end
    end
    Pa->>Q: station code
    Q->>Fl: Pending, next Pack, assigned here
    Q-->>Pa: oldest first, with order number and box label
```

## Rules in the diagram

- No station on the work area means no routing. Picking works as before and no unit is made.
- The decision is made once at start and never recomputed. The hand-off copies it.
- One pick belongs to exactly one unit. A second hand-off of the same pick is refused.
- A unit is one box off a carrier (`Box`), or one closed discrete pallet (`Pallet`). For a pallet the same hand-off runs when the pallet is closed (`pick_drop_close`). See [21](21-flow-influence-station-routing.md) for the pallet rules.
- A station code that no location has is refused with `STATION_UNKNOWN`, not answered with an empty queue.
- Not built: re-route or reassign of a unit.
## Related pages

- [Picking (operator)](../../operator/09-picking.md)
- [Which settings send a unit to a station](21-flow-influence-station-routing.md)
- [Packing: verify a box](30-packing-verify-journey.md)
- [Overview of this area](00-overview.md)
