# Packing: verify a picked box

**What this shows.** The steps at a pack station for a box that came off a carrier: open, check, weigh, close, and report a mismatch. This is action `Verify`.

Verify moves no stock. The operator checks that the box holds what was picked into it, weighs it and closes it. A shipping label prints after the close.

```mermaid
sequenceDiagram
    actor Op as Packer
    participant Rf as RF PACK00 to PACK04
    participant Q as packing_queue_list
    participant Op1 as packing_work_open
    participant Vw as packing_work_get
    participant Cl as packing_carton_close
    participant Ex as packing_exception_report
    participant Fl as router unit
    participant Db as job, obligation, carton
    participant Pr as label printer

    Op->>Rf: scan station
    Rf->>Q: station code
    Q-->>Rf: waiting boxes
    Op->>Rf: scan box label
    Rf->>Op1: container_code, station
    Op1->>Op1: refuse if the box holds serial-tracked stock
    Op1->>Db: job Open, obligation Verify, carton Open
    Op1->>Fl: claim the unit (Pending, Pack, this station)
    Op1-->>Rf: unit, carton, carton version
    Rf->>Vw: unit id
    Vw-->>Rf: picked, in the box, expected weight, printer
    alt box does not match (F7)
        Rf->>Ex: carton, code, note
        Ex->>Db: exception Open and blocking
    else box matches
        Op->>Rf: type weight, optional other printer
        Rf->>Cl: carton, version, weight, printer code
        Cl->>Cl: version differs gives error 40
        Cl->>Cl: judge_close on the real content
        Cl->>Cl: every lot in the box fit to ship today
        Cl->>Db: carton Closed with weights, obligation Satisfied
        Cl->>Fl: Pack done, router picks next, none, unit Completed
        Cl->>Db: job Packed if every rule agrees
        Cl-->>Rf: weights, verdict, order_packed, label printer
        Cl--)Pr: shipping label, after the commit
    end
```

## What `judge_close` checks on a package under verification

In this order. The first failure stops the close and nothing is written.

| Check | Error code |
|---|---|
| The carton is `Open` | `PACK_CARTON_NOT_OPEN` |
| No serial-tracked stock inside | `SERIAL_PACKING_NOT_SUPPORTED` |
| No stock of another order | `MULTI_ORDER_CARTON_NOT_SUPPORTED` |
| No stock that belongs to no order | `PACK_UNEXPECTED_ITEM` |
| The box is not empty | `PACK_CARTON_EMPTY` |
| Every picked item is there | `PACK_SOURCE_SHORT` |
| Nothing more than picked | `PACK_UNEXPECTED_ITEM` |
| A weight was typed | `PACK_WEIGHT_REQUIRED` |
| The weight is a number above 0 | `PACK_WEIGHT_INVALID` |
| Every lot in the box is fit to ship on the warehouse day | `LOT_NOT_FIT_TO_SHIP` |

The lot check runs last, only on a box all the checks above accepted. A lot is fit to ship when its expiration is later than today plus the SKU's shelf life (the minimum days left at shipping). A lot that expires today, is already expired, or expires on or before that date is not fit. A lot with no expiration date has nothing to judge and passes. The first unfit lot by lot code is named.

There is no weight tolerance. A box heavier or lighter than expected still closes. The verdict is `Recorded` when an expected weight exists, otherwise `NotComparable`.

## When the close is refused `LOT_NOT_FIT_TO_SHIP`

The refusal reads on the terminal as the phrase plus three values: the lot, its expiration date and the date it had to expire after. The answer's `context` carries the same values and the SKU and owner. Nothing is written: the box stays `Open`, the order stays unpacked, no label prints.

What the packer can do today, with the packing commands that exist:

1. Put the box aside and call a supervisor. The close will be refused again as long as that lot is in the box, whatever the weight.
2. The supervisor decides what happens to the lot with the stock tools (a hold, an adjustment, a move out of the pick flow). Packing never corrects stock.
3. `packing_exception_report` does not fit this case. It knows two codes, `PACK_SOURCE_SHORT` and `PACK_UNEXPECTED_ITEM`, and reporting one would block the order for a reason that is not true.
4. `packing_carton_void` does not help a box under verification either: it leaves the goods in the box, and the next `packing_work_open` makes a fresh package over the same box, refused again at the close.
5. `packing_remove` takes goods out of an **output carton** of a repack only: back onto the pallet while the pallet's obligation is open, or into another open carton of the order. That moves the unfit lot out of this carton, but the same lot is refused in any carton of the order, so the way back onto the pallet is the one that makes sense. A box under verification has no such command.

There is no command that settles this refusal. A supervisor-resolved exception for it is an owner decision and does not exist yet. Until it does, the route is manual.

## Rules in the diagram

- `packing_work_open` is a stateless command. Opening a box that is already open answers `already_open` and writes nothing.
- `packing_carton_close` is a stateful command on the carton version. A carton changed since the screen read it answers 40 with its current state.
- `packing_exception_report` records `PACK_SOURCE_SHORT` or `PACK_UNEXPECTED_ITEM`. No stock is corrected. The open exception keeps the order from being packed.
- A printer that fails never undoes the close. A replay of the close prints nothing.
- Void and reopen exist as commands, but no RF screen. See [32](32-packing-void-and-reopen.md).
## Related pages

- [Packing, verify and repack (operator)](../../operator/10-packing-verify.md)
- [Packing: repack a pallet](31-packing-repack-journey.md)
- [When is an order packed](33-packing-influence-when-packed.md)
- [Weights, printer and station](34-packing-influence-weights-printer-station.md)
- [Overview of this area](00-overview.md)
