# Packing: void a package, reopen a closed one

**What this shows.** The two ways to undo packing work: void an open package, or reopen a closed one with a supervisor's grant.

Both commands exist in the API. There is no RF screen for either.

## Reopen a closed package

```mermaid
sequenceDiagram
    actor Pk as Packer
    actor Sv as Supervisor
    participant Ro as packing_carton_reopen
    participant Gr as supervisor_override_grant
    participant Fl as router unit
    participant Db as carton, obligation, job, journal

    Pk->>Ro: carton, version, reason
    Ro-->>Pk: SUPERVISOR_CONFIRMATION_REQUIRED, pair 122
    Sv->>Gr: the pair, supervisor login typed in
    Gr-->>Pk: grant id
    Pk->>Ro: carton, version, reason, override_grant_id
    Ro->>Ro: grant must name exactly that carton
    Ro->>Db: lock order, job, obligation, carton
    Ro->>Ro: version differs gives error 40
    Ro->>Fl: lock the unit
    Ro->>Ro: carton Closed, unit not Consumed, nothing downstream
    Ro->>Db: carton Open
    Ro->>Db: Verify obligation Open again
    Ro->>Fl: Pack step withdrawn, unit waits at the station
    Ro->>Db: a Packed job goes back to Open
    Ro->>Db: journal row, who and why
    Ro->>Gr: grant spent
```

Rules:

- A reopen without a grant is refused. The answer names the one pair the grant must carry: code 122, subject `packing_carton:<id>`.
- A carton that is not `Closed` answers `PACK_CARTON_NOT_CLOSED` before any grant is asked for.
- A unit that is `Consumed` (its goods went into other packages) answers `PACKAGE_DOWNSTREAM_COMMITTED`. No later step exists yet, so the downstream guard always answers "not committed".
- An output carton of a repack has no obligation. Its source's obligation stays as it is. The unit its first close made waits for `Pack` again.
- A grant opens one carton once.

## Void an open package

```mermaid
sequenceDiagram
    actor Pk as Packer
    participant Vo as packing_carton_void
    participant Fl as router unit
    participant Db as carton and job

    Pk->>Vo: carton, version
    Vo->>Db: lock order, job, carton
    Vo->>Vo: version differs gives error 40
    Vo->>Vo: carton must be Open
    opt output carton of a repack
        Vo->>Vo: carton must be empty
        Vo->>Fl: unit its first close made, if any, becomes Consumed
    end
    Vo->>Db: carton Voided
    Note over Fl: a Verify unit still waits for Pack
```

Rules:

- A void moves no stock. The obligation stays `Open`.
- For a package under verification, the next `packing_work_open` makes a fresh package over the same box.
- An output carton with picked goods inside cannot be voided: `packing_remove` takes the goods out first (`PACK_CARTON_CONTAINER_NOT_EMPTY`).

## Where it comes from

| Claim | Source |
|---|---|
| Both are stateful commands on the carton version | `crates/services/app-server/src/web/rpcs/packing_rpc.rs:165` |
| Reopen without a grant is refused with the pair | `crates/libs/wms-outbound/src/packing/commands/carton_reopen.rs:10` |
| Grant must name that one pair | `crates/libs/wms-outbound/src/packing/commands/carton_reopen.rs:172` |
| Reopen steps and locks | `crates/libs/wms-outbound/src/packing/commands/carton_reopen.rs:32` |
| What a reopen decides | `crates/libs/wms-outbound/src/domain/packing_carton/aggregate.rs:439` |
| Verify obligation goes back to `Open` | `crates/libs/wms-outbound/src/domain/packing_obligation/aggregate.rs:108` |
| Router step withdrawn | `crates/libs/wms-outbound/src/packing/commands/carton_reopen.rs:234` |
| No step exists after packing yet | `crates/libs/wms-outbound/src/flow/ports.rs:87` |
| Pair code 122 | `crates/libs/wms-shared/src/validation_codes.rs:683` |
| Mint a grant | `crates/services/app-server/src/web/rpcs/override_grant_rpc.rs:103` |
| Void steps and locks | `crates/libs/wms-outbound/src/packing/commands/carton_void.rs:118` |
| Output carton voided only empty | `crates/libs/wms-outbound/src/domain/packing_carton/aggregate.rs:385` |
| Void and reopen have no RF screen | `crates/libs/wms-lib-sql/sql/rf-screens/103_uc_pack_verify.sql:32` |

## Related pages

- [Packing: verify a box](30-packing-verify-journey.md)
- [Packing: repack a pallet](31-packing-repack-journey.md)
- [Packing (operator)](../../operator/10-packing-verify.md)
- [Overview of this area](00-overview.md)
