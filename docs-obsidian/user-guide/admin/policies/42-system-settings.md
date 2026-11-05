---
title: "System Settings"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-11-05
---

# System Settings

System settings control warehouse-wide behavior that is not owned by a receipt,
putaway, allocation or picking policy. Each warehouse has its own values.

Change a setting only after reviewing the workflows listed on this page. Most
changes apply to the next command or newly created work; they do not rewrite
open documents or history.

## Open the settings

1. Open `Sidebar > Warehouse Configuration > Settings & Reference Data > System
   Settings`.
2. Find the required **Config Key**.
3. Review **Description** and **Default Value**.
4. Change **Value** and save.
5. Test the affected workflow in the same warehouse.

**Admin** and **Manager** maintain system settings. **Config Key**, **Default
Value**, **Description** and **Editable** are read-only on this screen. A row
whose **Editable** value is off cannot be changed here.

Use the format shown in the table below. An empty, invalid or out-of-range value
may cause the product to use its default instead.

## Current settings

### Receiving, audit and command safety

| Config Key | Normal value | What it controls |
|---|---|---|
| `ALLOW_CLOSE_WITH_DISCREPANCY` | `1` | Allows an authorised discrepancy override when closing a planned receipt that is partial, over its plan, or still pending with a nonzero expected quantity. It does not bypass unresolved serial or damage work. |
| `ENABLE_RECEIPT_AUDIT` | `1` | Records new field-level changes to receipt headers. Turning it off does not remove existing audit history. |
| `ENABLE_SKU_AUDIT` | `false` | Records new changes to SKU records. Turning it on does not create history for earlier changes. |
| `RECEIPT_LOCK_TIMEOUT_MS` | `5000` | How long a receipt operation waits when another operation is changing the same receipt. Use a positive whole number of milliseconds. |
| `ORDER_LOCK_TIMEOUT_MS` | `5000` | How long an order operation waits when another operation is changing the same order. Use a positive whole number of milliseconds. |
| `IDEMPOTENCY_TTL_DAYS` | `7` | How long a replay-safe command keeps its stored result for the same idempotency key and payload. |

When `ALLOW_CLOSE_WITH_DISCREPANCY` is on, the user still needs the required
authority to confirm the discrepancy. When it is off, correct the receipt or
resolve the planned quantity before closing it.

### Moves, putaway and counts

| Config Key | Normal value | What it controls |
|---|---|---|
| `MOVE_HOLD_POLICY` | `warn` | `warn` applies the hold code's interactive warning or block when moving held source stock. `silent` skips the source LPN/lot hold check. Location hold checks still apply. |
| `MOVE_REQUIRE_LPN` | `0` | When on, prevents a stock move from leaving loose stock at an ordinary destination. Whole-LPN relocation and receipt rules are separate. |
| `PUTAWAY_RESERVATION_TTL_MIN` | `15` | Lifetime, in positive whole minutes, of a new directed-putaway location reservation when no owner-specific value takes precedence. |
| `PUTAWAY_LOCK_TIMEOUT_MS` | `5000` | How long putaway waits for a destination that another operation is reserving. Use a positive whole number of milliseconds. |
| `COUNT_ON_PUTAWAY_DEVIATION` | `0` | When on, requests a count of the destination after an operator confirms a directed-putaway deviation. |
| `COUNT_ON_PICK_CANCELLED` | `0` | When on, requests a source-location count when an order cancellation removes a pick whose source was already confirmed. |

`MOVE_HOLD_POLICY = silent` is a broad operational choice. Test it with LPN,
lot and location holds before using it. It does not make held stock available to
allocation and does not disable location-level move checks.

### Locations

| Config Key | Normal value | What it controls |
|---|---|---|
| `CHECK_DIGIT_ENABLED` | `true` | Generates a check digit for newly created locations, including locations created by the bulk generator. Existing locations do not change. |
| `LOC_GEN_PATTERN` | `<AISLE_PREFIX><AISLE>-<LEVEL>-<LOC>` | Pattern used by the location generator for new location codes. |

The location pattern can use the aisle, level and location prefix, number and
suffix placeholders shown by the generator. Test one small range before
creating a large location set.

### Task assignment

| Config Key | Normal value | What it controls |
|---|---|---|
| `TASK_LEASE_TTL_MIN` | `15` | How long newly claimed work stays assigned before it may return to the pool after the operator stops responding. |
| `TASK_SKIP_COOLDOWN_MIN` | `10` | How long skipped work stays out of the shared pool before it may be offered again. |
| `TASK_SKIP_ESCALATE_AFTER` | `3` | Number of skips after which work waits for supervisor attention. |
| `TASK_MAX_CONCURRENT_DEFAULT` | `1` | Default number of tasks an operator may hold when no work area supplies its own limit. |
| `TASK_ALLOW_RELEASE_DEFAULT` | `1` | Default permission to release or skip work when no work area supplies its own rule. |

Work-area settings take precedence when the terminal requests work for a named
area. A change does not rewrite an existing task's current lease end
immediately. The next claim, heartbeat, progress update or other lease renewal
uses the new value.

### Manual picking and consolidation

| Config Key | Normal value | What it controls |
|---|---|---|
| `MANUAL_PICK_REQUIRE_TO_LPN` | `false` | When on, a manual workstation pick requires an explicit destination LPN. When off, the workflow may use the whole source, a planned carton or a generated Case as applicable. |
| `CONSOLIDATION_UNROUTED_BOXES` | `Refuse` | `Refuse` keeps a box waiting until its order has a Dispatch route. `OneOrder` allows an unrouted box to open a pallet for its own owner and order. |
| `CONSOLIDATION_AUTO_CLOSE` | `Off` | `On` closes a consolidation pallet automatically when all expected boxes are present or its gross-weight limit is reached. `Off` requires an explicit close. |

See [Consolidation Stations](../06a-consolidation-board.md) for station setup,
weight requirements and the operator flow.

### Printing and warehouse time

| Config Key | Normal value | What it controls |
|---|---|---|
| `LABEL_RENDERER_URL` | deployment value | Optional warehouse override for the label-rendering service. A non-empty **Value** overrides deployment configuration only when it differs from **Default Value**. |
| `WAREHOUSE_TIMEZONE` | `UTC` | IANA time-zone name used to determine the warehouse's local day. |

Use an IANA name such as `Europe/Sofia`. The warehouse day affects daily
processes such as inventory-count policy scheduling and follows daylight-saving
changes for that zone.

Printing also requires a label definition, template, printer configuration and
an active assignment. See [Printing and Labels](../07-printing-and-labels.md).

When `LABEL_RENDERER_URL` is absent, empty, or equal to **Default Value**, the
deployment `RENDERER_URL` is authoritative. Web-side label or report previews
without warehouse context always use the deployment address, not the warehouse
override.

### Implementation-managed setting

`OVERRIDE_GRANT_TTL_SECONDS` controls how long a newly issued supervisor
override remains valid. When it is not configured, the product uses five
minutes. This key is not part of the baseline System Settings list; change it
only through the approved deployment or administration workflow.

## Dashboard settings

Dashboard configuration has its own screens:

- `Sidebar > Warehouse Configuration > Dashboards > Board Settings`
- `Sidebar > Warehouse Configuration > Dashboards > Metric Thresholds`

Only **Admin** and **Manager** can read or change **Board Settings** and **Metric
Thresholds**. Other authorised roles may view the dashboard and metric
catalogue, but not these configuration records.

### Board Settings

| Field | Meaning |
|---|---|
| **Rail slot 1** to **Rail slot 6** | Selects the six metrics displayed in the Control Center rail. Use six different catalogue metrics. |
| **Show demo figures** | Allows design sample values where a metric has no live source. It does not change measured values. |
| **Throughput plan (units/hour)** | Adds a positive hourly plan line to the throughput chart. Leave empty for no plan line. |
| **Expiring within (days)** | Sets the horizon for the lots-expiring exception. Enter 1 to 365 days. |

Available rail metrics include released orders, picked lines, pending
shipments, inventory accuracy, labour on floor, open receipts, received lines,
pending putaway, stock on hold and executed moves. **Dock utilisation** is a
demo-only metric because dock-door utilisation is not currently measured.

### Metric Thresholds

Use a threshold to color a measured rail metric without changing stock or
documents.

1. Select a **Metric**.
2. Set **Bad when** to **Above — high is bad** or **Below — low is bad**.
3. Enter **Alert at**, **Critical at**, or both.
4. Save and check the Control Center.

For **Above**, the critical value must be at least as high as the alert value.
For **Below**, the critical value must be at least as low. A value exactly at a
threshold reaches that level. Demo figures are not assigned alert levels.

## Change control

Before changing a production setting:

1. Record the current value and the reason for the change.
2. Identify the next command, job or scheduler pass that will read it.
3. Make the change during an agreed operating window.
4. Run one controlled happy path and one relevant refusal or recovery path.
5. Confirm the result in the user interface and operational logs available to
   the administrator.
6. Restore the previous value if the expected behavior is not observed.

## If something goes wrong

| Symptom | Likely cause | What to do |
|---|---|---|
| A setting cannot be saved | The row is read-only, the value is too long, or its format is invalid. | Use the documented format and check **Editable**. Do not create a replacement key with a similar spelling. |
| The previous behavior continues | The setting applies only to newly created work, or a work-area/owner value takes precedence. | Review the precedence described above and repeat the test with new work. |
| A lock timeout appears repeatedly | Concurrent users or automation are changing the same receipt, order or destination. | Let the current operation finish and retry. Increase a timeout only after confirming the contention is expected. |
| Labels do not print after changing the renderer address | The renderer, template, printer or assignment is unavailable. | Check the complete print setup; do not assume the renderer address alone selects a printer. |
| Daily count scheduling uses the wrong date | The warehouse time zone is wrong or invalid. | Save the correct IANA time-zone name and check the next scheduler pass. |
| A dashboard rail value shows no source | The selected metric has no live data source and demo figures are off. | Select a live metric or enable demo figures only for a demonstration environment. |

## Related guides

- [Go-Live Checklist for a New Tenant](../10-checklist-go-live.md)
- [Warehouse Structure](../03-warehouse-structure.md)
- [Reason Codes, Holds and Handling Unit Types](43-reason-codes-and-holds.md)
- [Inventory Count Policy and Count Settings](24-inventory-count-policy.md)
- [Printing and Labels](../07-printing-and-labels.md)
- [Reports and Dashboards](../08-reports-and-dashboards.md)
