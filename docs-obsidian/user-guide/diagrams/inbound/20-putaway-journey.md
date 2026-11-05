# Putaway: from the scanned pallet to the new location

Putaway on the RF terminal has two calls: ask where the pallet goes, then move it there.
Both diagrams below use the screens `PUTW01`, `PUTW02`, `PUTW03`, `PUTW_OVR` and `PUTW_DONE`.

## Diagram 1. Ask where the pallet goes

**What this shows:** which screen calls which API method, what the engine reads and writes, and what the operator sees when the answer comes back.

```mermaid
sequenceDiagram
    autonumber
    actor Op as Operator
    participant RF as RF screens
    participant API as Quark API
    participant PE as Putaway engine
    participant DB as Database

    Op->>RF: PUTW01 scan the pallet LPN
    RF->>API: search_inventory_balances (lpn)
    API->>DB: read stock rows of the LPN
    API-->>RF: rows with container_id, SKU, lot, owner, location, qty
    Op->>RF: PUTW02 press Enter on the row
    Note over RF: A row without container_id is loose stock.<br/>The screen says "Loose stock has no pallet to put away"
    RF->>API: putaway_suggest_location (container_id)
    Note over RF,API: PUTW03 sends this call when it opens.<br/>It makes a new idempotency key for every ask
    API->>DB: claim the idempotency key
    API->>PE: SuggestLocation in one transaction
    PE->>DB: lock the container row
    PE->>DB: read pallet, policy, steps, conditions, timers
    loop each step in order of sequence
        PE->>DB: read candidate locations and run 4 checks on each
    end
    PE->>DB: lock the location, check again, insert inventory_pending_move_in
    PE-->>API: location, pending_move_in_id, expires_at, trace
    API->>DB: save the result for the key and commit
    API-->>RF: location, or no location with a reason
    RF-->>Op: TAKE TO location, or No location available
```

Reading notes:

- The loop stops at the first step that returns a location. If no step returns one, the answer is "no location" with the reason `no_eligible_location`, or `pallet_already_reserved` when another request holds the pallet's reservation right now.
- The reason is shown on `PUTW03` as `No location available: <reason> - Esc to give up`. The text is the raw code.
- The screen keeps `pending_move_in_id` and sends it in the next call (Diagram 2).
- If the operator presses Esc while a reservation exists, the screen asks "Give up this putaway?" and then calls `putaway_release_reservation`.
## Diagram 2. Take the pallet there

**What this shows:** what `move_execute` does when the operator scans the location, and the three ways it can end: done, "a supervisor must approve", or "go to another location".

```mermaid
sequenceDiagram
    autonumber
    actor Op as Operator
    participant RF as RF screen PUTW03
    participant API as Quark API
    participant MV as MovementService
    participant DB as Database

    Op->>RF: scan the location (the field starts with the suggestion)
    RF->>API: move_execute (source_type putaway, source_container_id, dest_loc, pending_move_in_id)
    API->>MV: MoveCommand in one transaction
    MV->>DB: read the reservation: Active, not expired, same pallet
    MV->>DB: lock source and destination location
    MV->>MV: holds, location type, capacity, landing rules
    alt a soft rule is broken on the suggested location
        MV-->>RF: refused, is_overridable, pair (85, rule)
        RF->>API: supervisor_override_grant (pairs, supervisor user, password)
        API->>DB: insert inventory_override_grant
        API-->>RF: grant_id
        Note over RF: PUTW03 is the top screen again, so it asks for a suggestion again.<br/>The operator scans. move_execute now carries override_grant_id
    else the process forbids the location
        MV-->>RF: redirect with a replacement location and a new reservation
        Note over RF: The screen swaps location and reservation id and stays
    else all checks pass
        MV->>DB: move the container and its stock to the location
        MV->>DB: reservation becomes Consumed (Cancelled if it landed elsewhere)
        MV->>DB: transaction_log row and event process.inventory.moved
    end
    API-->>RF: total_qty_moved
    RF-->>Op: PUTW_DONE shows LPN to location
```

Reading notes:

- A soft rule is one of: capacity, location type, SKU mixing, lot mixing,
  several lots on one LPN, or attribute mixing. The operator may confirm past
  it only for the suggested location. Scanning another location runs the
  ordinary checks in full.
- If the reserved destination becomes unavailable, Quark can redirect the
  pallet to the nearest usable location and reserve the replacement.
- When the pallet lands in a location other than the reserved one, the reservation is set to `Cancelled`. When it lands in the reserved one, it is set to `Consumed`.
- If the system setting `COUNT_ON_PUTAWAY_DEVIATION` is `1` and the move landed through an acknowledged deviation, the destination is queued for a count (event `process.inventory.count_requested`).
- `PUTW03` requests a fresh suggestion whenever the operator returns to it.
  The previous live reservation is cancelled before a replacement is made.
- See [Move execution checks](25-move-execute.md) for the order of validations.
## Related pages

- [Operator guide: Putaway](../../operator/05-putaway.md)
- [Putaway pipeline, step by step](21-putaway-engine-steps.md)
- [What each setting changes (policy and step)](22-putaway-influence-step-settings.md)
- [What each setting changes (master data)](23-putaway-influence-master-data.md)
- [Reservation life cycle, timers and what the operator sees](24-putaway-reservation-and-refusals.md)
- [Policy reference: putaway overview](../../admin/policies/00-putaway-overview.md)
