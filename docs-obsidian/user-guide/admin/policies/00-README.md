---
title: "Policy Reference - Index"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-10
---

# Policy Reference - Index

This folder lists **every setting that changes what the warehouse system does**.
For each setting it says where to find it on the screen, what it is called in the
database, what it does, which code reads it, and what happens to documents and
stock when you change it.

Use it in two ways:

- **"What does this setting do?"** Go to the file of the policy family (table 1).
- **"Why did the system do this?"** Follow the flow in section 2. It names the policy
  that decides at each stage, from receiving to packing.

All statements come from the code and the database migrations of this repository.
Paths such as `wms-inbound/src/...` are under `crates/libs/`.

## 1. The policy families

| Family | One line | File |
|---|---|---|
| **Receipt policy** | How strict receiving is: LPN needed, SKU not on the ASN, over and short receipts, pack multiples, dates. | [40-receipt-policy-settings.md](./40-receipt-policy-settings.md) |
| **Receiving rules around the policy** | Supervisor rights and grants, closing with a discrepancy, damage, returns, blind receipts, auto holds. | [40-receipt-policy-settings.md](./40-receipt-policy-settings.md) sections 5 to 8 |
| **Owner configuration** | Per-owner defaults: policies, locations, units, damage actions, LPN rules, label printing. | [41-owner-settings-and-policy-resolution.md](./41-owner-settings-and-policy-resolution.md) |
| **Policy resolution** | For every policy: SKU, then owner, then what is left. One table. | [41-owner-settings-and-policy-resolution.md](./41-owner-settings-and-policy-resolution.md) Part A |
| **SKU-level settings** | The columns on the SKU that pick a policy or override a rule. | [34-sku-level-settings.md](./34-sku-level-settings.md) |
| **System settings** | Warehouse-wide keys: close with discrepancy, audit, move rules, time-outs, tasks, label renderer. | [42-system-settings.md](./42-system-settings.md) |
| **Dashboard settings** | The Control Center rail, thresholds, demo figures, expiry horizon. | [42-system-settings.md](./42-system-settings.md) section 5 |
| **Printing and labels** | Printer assignment order, renderer address, auto-print. | [42-system-settings.md](./42-system-settings.md) section 6 |
| **Hold codes** | What a hold forbids: putting, taking, or both; strict or confirmable. | [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md) section 2 |
| **Reason lists** | Adjustment, shortage, quantity-adjust, damage reasons. | [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md) sections 3 to 6 |
| **Returns** | Return conditions and where each goes. | [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md) section 7 and file 40 section 8.2 |
| **Handling unit types** | Boxes, totes, carts: what each flag changes. | [43-reason-codes-and-holds.md](./43-reason-codes-and-holds.md) section 8 |
| **Putaway** | Policy, steps, conditions, zones, locations. | [00-putaway-overview.md](./00-putaway-overview.md), [01-putaway-policy-steps-and-criteria.md](./01-putaway-policy-steps-and-criteria.md), [02-putaway-zone-settings.md](./02-putaway-zone-settings.md), [03-location-settings.md](./03-location-settings.md) |
| **Allocation** | Which stock an order line reserves, in which order. | [10-allocation-overview.md](./10-allocation-overview.md), [11-allocation-policy-steps-and-criteria.md](./11-allocation-policy-steps-and-criteria.md) |
| **Waves** | Which orders go together and when they are released. | [12-wave-overview.md](./12-wave-overview.md), [13-wave-policy-settings.md](./13-wave-policy-settings.md) |
| **Picking** | Picking policy, work areas, equipment, operator rights, pick-short reasons, counts. | [20-picking-overview.md](./20-picking-overview.md), [21-picking-policy-settings.md](./21-picking-policy-settings.md), [22-work-areas-equipment-and-permissions.md](./22-work-areas-equipment-and-permissions.md), [23-pick-short-reasons.md](./23-pick-short-reasons.md), [24-inventory-count-policy.md](./24-inventory-count-policy.md) |
| **Cartonization** | Which boxes to use and how to pack the picks into them. | [30-cartonization-overview.md](./30-cartonization-overview.md), [31-cartonization-policy-settings.md](./31-cartonization-policy-settings.md) |
| **Lot policy** | Lot dates, attributes, when a new lot is made. | [32-lot-policy-and-attributes.md](./32-lot-policy-and-attributes.md) |
| **Serial rules** | Serial tracking per SKU. | [33-serial-configuration.md](./33-serial-configuration.md) |
| **Replenishment** | Placeholder only. No engine exists. | [35-replenishment-status.md](./35-replenishment-status.md) |

## 2. What decides what: from receipt to shipment

Each row is a stage. "Decided by" is the setting or policy that changes the result.
"Looked up from" says where the server finds it.

| # | Stage | What happens | Decided by | Looked up from | Files |
|---|---|---|---|---|---|
| 1 | **Receive** | The operator receives goods against an ASN, blind, or as a return. The server accepts, asks a question, or refuses. | **Receipt policy**; owner flags; SKU hold, shelf-life and temperature fields; lot policy; serial rules; hold codes on the destination | SKU `receipt_policy_id` (the owner default is never reached today) | 40, 32, 33, 34, 43 |
| 2 | **Close the receipt** | The receipt closes, or a discrepancy needs a supervisor. | system setting `ALLOW_CLOSE_WITH_DISCREPANCY`; supervisor right `receipt.override_close_discrepancy` | system setting | 40 section 7, 42 |
| 3 | **Putaway** | The system suggests a location for the LPN. | **Putaway policy** (steps, conditions); zone and location settings; owner reservation time | SKU `putaway_policy_id`, then owner default | 00 to 03, 41 |
| 4 | **Stock becomes available** | Holds, lot dates and location status decide if stock can be reserved. | **Hold codes** (taking direction); location status | hold code table | 43 |
| 5 | **Allocation** | An order line reserves stock. | **Allocation policy** | SKU `allocation_policy_id`, then owner default, **when the order line is created**; then frozen on the line | 10, 11, 41 |
| 6 | **Wave** | Orders are grouped and released. | **Wave policy** | chosen by the user or the schedule | 12, 13 |
| 7 | **Picking** | Tasks are given to operators; the picker confirms or shorts. | **Picking policy**; work area; equipment profile; pick-short reasons; task system settings | work area and equipment, then work area default, then `DISCRETE` | 20 to 24, 42 |
| 8 | **Cartonization** | Picks are planned into boxes. | **Cartonization policy**; pack hierarchy flags; handling unit types | SKU `cartonization_policy_id`, then owner default; none means no plan | 30, 31, 43 section 8 |
| 9 | **Packing and shipping label** | The packer closes a carton; the shipping label prints. | the carton plan; the work area's pack station; printer assignment; label renderer | pack station of the work area; printer: zone, user, owner, warehouse | 22, 42 section 6 |

Packing and shipping have **no policy of their own**. They follow the carton plan,
the pack station of the work area and the printing rules.

Two things run across all stages:

- **Holds** (file 43) are checked at receive, putaway, move, allocation and picking.
- **Supervisor rights** (file 40 section 5) are needed for quantity overrides and for
  closing a receipt with a discrepancy.

## 3. How to read a setting entry

Every setting, field, key or code value is described with the same items. An item that
does not apply is left out. If a setting is stored but nothing reads it, the entry says
**Stored only. It has no effect today.**

| Item | What it tells you |
|---|---|
| **UI label** | The exact English label on the screen and the menu path, for example `Sidebar > Policy > Receipt Policy`, tab `General`, field `Receipt Without LPN`. For settings without a screen: `API only` and the method name (for example `update_owner_config`). |
| **Column / key** | The database table and column, or the `system_settings` key. |
| **Type and range** | The data type, the allowed values, minimum and maximum, and whether it can be empty. |
| **Default** | The default in the database schema, and the value in the seed data (the rows a new database is created with). |
| **Meaning** | What the setting is for, in plain words. |
| **Affects** | The process, screen or message the setting changes, and the source file and line where the code reads it (`path:line`). |
| **Message** | The exact text the user sees when the setting makes the system refuse or ask. `<x>` is a value filled in at run time. |
| **Example** | A number or a short scenario. |
| **Interactions** | Which other setting or level wins when two disagree. |
| **When empty** | What happens when the value is empty or the row does not exist. |
| **When you change it** | What happens to documents and stock that already exist. In most cases: nothing is rewritten, and the next command uses the new value. |

Terms:

- **Stored only** means: the value is saved and shown, but a search over the whole code
  base finds no code that uses it to decide anything.
- **Confirmable** (or **overridable**) means the operator can answer "yes, go on". A
  confirmable refusal is a question. A **final** refusal cannot be answered.
- **Capability** means a permission of type `api` in the role table, for example
  `receipt.override_qty_shortage`.
- **Cascade of policies** means: the first level that has a value wins. The levels are
  written left to right.

## 4. Counts

| File | Settings documented | Of them stored only |
|---|---|---|
| 40 | 26 receipt policy columns, plus the receiving rules around them | 15 |
| 41 | 42 owner settings, plus 23 lookup chains (10 policy chains, 13 other chains) | 20 |
| 42 | 20 system settings keys, 4 dashboard board settings (rail, demo, plan, horizon), 4 threshold fields, 6 printing items, 7 constants | 4 zone printer fields; 5 printer configuration fields |
| 43 | 16 hold codes with 8 fields each, 11 adjustment reasons, 5 shortage reasons, 5 quantity-adjust reasons, 18 damage reasons, 4 severities, 3 damage actions of the screen (7 in the database), 3 dispositions, 4 return conditions, 17 handling unit type fields | `rank`, `shippable`, `return_inspection`, `tare_weight`, `tracking`, `lot_hold_code`, `target_disposition`, `return_reason_code` |

## 5. Known problems found while writing this reference

The full list with file and line is at the end of each file. The most important ones:

1. **The owner default receipt policy is never used.** `sku.receipt_policy_id` cannot be empty
   (file 40 section 1.1, file 41 A.2).
2. **Availability ignores `Enforce` and `Overridable` of a hold code** (file 43 note A).
3. **15 of 26 receipt policy columns and 20 of 42 owner settings do nothing.**
4. **Four owner damage actions are accepted but do nothing** (file 40 section 8.1).
5. **`return_reason_code` is required by the return commands and thrown away** (file 43 section 7.2).
6. ~~Time-out keys accepted 0, which means "wait for ever".~~ Fixed (P-13, commit `420b6746a`): a lock time-out of 0 or less is read as 5000 ms (file 42 section 1.1).

See also the shorter guides one level up: `../05-inbound-setup.md`, `../06-outbound-setup.md`,
`../07-printing-and-labels.md`, `../04-owners-sku-uom-pack-hierarchy.md`.
