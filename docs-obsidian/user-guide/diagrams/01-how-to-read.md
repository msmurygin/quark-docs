# How to read the diagrams

Each example below is a tiny example, not a product flow.
The names in it are made up to show the shape of the diagram.
Product diagrams are grouped in the area pages that follow.

## Sequence: who calls whom

**What this shows.** The order of calls between four actors. This is an example, not a product flow.

```mermaid
sequenceDiagram
    actor Operator
    participant Screen
    participant Method as API method
    participant Table
    Operator->>Screen: press button
    Screen->>Method: call with data
    Method->>Table: write row
    Table-->>Method: row saved
    Method-->>Screen: result
    Screen-->>Operator: show message
```

Read it from top to bottom. A solid arrow is a call. A dashed arrow is the reply.

## Influence: setting, decision, outcome

**What this shows.** How one setting changes one decision and what you then see. This is an example, not a product flow.

```mermaid
flowchart LR
    S["Setting: limit = 5"] -->|is compared with| D{"Decision: is count over limit?"}
    D -->|yes| O1["Outcome: step is refused"]
    D -->|no| O2["Outcome: step is accepted"]
```

Read it from left to right: setting, decision, outcome.

## State: statuses

**What this shows.** The statuses of a record and the changes between them. This is an example, not a product flow.

```mermaid
stateDiagram-v2
    [*] --> Open
    Open --> Closed: close
    Open --> Cancelled: cancel
    Closed --> [*]
    Cancelled --> [*]
```

Each box is a status. Each arrow is an allowed change. An arrow from the dot is the start. An arrow to the dot is the end.

## Related pages

- [Diagrams overview](00-README.md)
