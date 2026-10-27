# Diagrams

This part of the guide shows how the system works as pictures.
It answers three questions: who calls whom, which setting changes what, and which statuses a record can have.

Use it if you configure policies, build an integration, or support operators.
It does not teach you which button to press. For that, use the operator and administrator guides.

## The three kinds of diagram

| Kind | Question it answers | How to read it |
|---|---|---|
| **Sequence** | Who calls whom, and in what order? | Read from top to bottom. Each arrow is one call or one write. The columns are the actors: the operator, the screen, an API method, the domain code, the tables. |
| **Influence** | Which setting changes which decision, and what do I see as a result? | Read from left to right: **setting**, then **decision** in the flow, then **outcome** on screen or in the data. |
| **State** | Which statuses does a record have, and how does it move between them? | Each box is a status. Each arrow is a change that the system allows. |

## Legend

| Shape or line | Meaning |
|---|---|
| Solid arrow | A call, or a change of status. |
| Dashed arrow | A reply or a result. |
| Box in a sequence diagram | An actor. For example the operator, a screen, an API method or a table. |
| Box in an influence diagram | A setting, a decision or an outcome. The wording on the arrow says how they are linked. |

## How to use these diagrams

Each diagram shows the current product flow, the decisions that affect it and
the related settings. Use the links below a diagram to continue with the
operator guide or the relevant screen reference.

A setting that is stored but that no code reads is not drawn in an influence diagram.
The page lists it as stored only.

## Areas

| Area | What it shows | Start page |
|---|---|---|
| **Inbound and putaway** | How a receipt starts and is received (ASN, blind, return, case-level), the receipt checks, serials, lots, damage, hold and close. Putaway: the RF journey, how the engine picks a location, which policy, zone, location or SKU setting changes the result, and the move. | [Overview](inbound/00-overview.md) |
| **Allocation and reservation** | Release and Allocate, how a policy chooses stock, waves, holds, unallocate. Which setting changes which reservation. | [Overview](allocation/00-overview.md) |
| **Picking and Task Manager** | How a pick becomes a task, the RF pick journey, short pick, drop-off, the ways a task returns to the pool. Which policy, area or operator setting decides who gets what. | [Overview](picking/00-overview.md) |
| **After picking** | Carton plan, packing, hand-off to the pack station, dispatch planning, order closure. What exists and what is not built (sorting, loading, shipping). | [Overview](post-pick/00-overview.md) |

## Start here

[How to read the diagrams](01-how-to-read.md) has one small example of each kind.
