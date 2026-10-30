# Box damaged: replace the box on a cart position

**What this shows.** What `pick_assignment_position_replace_container` does when the box at a position is damaged and the operator scans a new box.

```mermaid
sequenceDiagram
    actor Op as Operator
    participant RF as RF PKA51
    participant API as position_replace_container
    participant Rules as Replace and bind rules
    participant Inv as Inventory
    participant DB as Tables

    Op->>RF: Box Damaged, scan the new box
    RF->>API: position number, new box code
    API->>DB: renew leases, lock assignment and positions
    API->>Rules: position Bound, new box differs
    API->>Rules: old box not on hold, new box passes bind checks
    API->>Inv: goods, packages, serials into the new box
    alt old box is reusable
        API->>DB: old box Empty, LPN hold Damaged
    else old box is disposable
        API->>DB: old box Disposed
    end
    API->>DB: position keeps carton, new box, record written
    API->>DB: assignment version plus 1
    API-->>RF: result, next step
```

## Reading the diagram

- The new box must pass the same checks as a box bound at the start: empty, registered, not on hold, type and size as planned, not on another cart, usage allowed for the owner. Or it is the planned carton's own label. See [How a cart is built](12-cart-assignment.md).
- The call is refused when the scanned box is already the position's box (`SameBox`), when it was written off, or when the damaged box carries a hold of its own. A hold that lands on the new or old box after the first check is found again under the container lock, and the whole replacement rolls back.
- The picks keep their `carton_id`. Only the physical box of the position changes. The swap is written in `pick_position_container_replacement`.
- A repeat with a new key on a position that already holds the scanned box after a replacement answers `already_replaced` and writes nothing.
- The route status does not change. A replacement is not a route command.
## Related pages

- [Box full and target exceptions](31-box-full-and-target-exceptions.md)
- [How a cart is built](12-cart-assignment.md)
- [Operator guide: picking](../../operator/09-picking.md)
