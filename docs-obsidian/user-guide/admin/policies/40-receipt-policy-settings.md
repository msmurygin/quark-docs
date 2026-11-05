---
title: Receipt Policy Settings
description: Configure blind receiving, LPN, pack, date and ASN quantity checks.
sidebar_position: 41
last_update:
  date: 2026-11-05
---

# Receipt policy settings

A receipt policy controls which receiving differences are allowed, which require confirmation and which stop the receipt.

Open **Sidebar > Warehouse Configuration > Policies > Receipt Policy**.

## Before you start

- Confirm which receipt policy each SKU uses.
- Configure the owner's default receipt policy for compatible imports that do not assign one directly.
- Complete the SKU pack, date, lot and serial settings used by the checks.
- Confirm who may approve receipt quantity exceptions.

By default, an **Admin** or **Manager** can maintain a receipt policy. **Operator** and **Viewer** roles can read it. Custom permissions may change access.

## Which policy applies

The system resolves the receipt policy in this order:

1. the policy assigned to the SKU;
2. the owner's default receipt policy when the SKU has no assignment.

Current SKU setup requires a receipt policy, so normal UI-created SKUs use the first rule. A receive is refused if neither assignment is available.

The policy is read when the operator receives the line. A saved change affects later receive actions; it does not re-evaluate stock already received.

## Allow, Warning and Hard Error

Several fields use the same three choices:

| Choice | Result |
| :--- | :--- |
| **Allow** | The policy check does not stop the receive. |
| **Warning** | The receive pauses and asks for acknowledgement. The user can continue only when that refusal is overridable for their permissions. |
| **Hard Error** | The receive stops. It cannot be acknowledged. |

Warnings for blind receiving, missing LPN, unplanned SKU, pack multiple and date checks can be confirmed in the receiving workflow. Excess and shortage confirmations require the corresponding receipt quantity override permission, normally assigned to a supervisor.

## Settings used by current receiving workflows

Current receiving decisions evaluate these 12 receipt-policy settings:

| Tab | Setting | What it controls |
| :--- | :--- | :--- |
| **General** | **Receipt Without ASN** | Starting or continuing a blind receipt without an ASN. |
| **General** | **Receipt Without LPN** | Receiving stock without a destination LPN. |
| **General** | **No SKU on ASN** | Receiving a SKU that is not present on the ASN. |
| **General** | **Qty Pack Multiple Check** | Requiring the quantity to be a multiple of the largest configured pack tier. |
| **General** | **Date Deviation Check** | Applying shelf-life and captured-date validation. |
| **Qty validation against ASN (RF)** | **Execute Qty validation** | Enabling ASN quantity comparison by SKU or supplier lot. |
| **Qty validation against ASN (RF)** | **Excess Override** | Asking for confirmation above the soft excess limit. |
| **Qty validation against ASN (RF)** | **Excess Override %** | Soft excess percentage. |
| **Qty validation against ASN (RF)** | **Excess Error** | Refusing quantities above the hard excess limit. |
| **Qty validation against ASN (RF)** | **Excess Error %** | Hard excess percentage. |
| **Qty validation against ASN (RF)** | **Shortage Override** | Asking for confirmation and a reason above the shortage limit. |
| **Qty validation against ASN (RF)** | **Shortage Override %** | Shortage percentage. |

The remaining compatibility fields on the form do not configure a current receiving decision. In particular, **Receipt Without PO**, **No SKU on PO**, **ASN/PO Qty Discrepancy**, the message-only switches and the fields on **Qty validation against PO (RF)** do not replace the ASN workflow. Leave them unchanged unless your implementation team provides a product-specific instruction.

## Blind receiving: Receipt Without ASN

Use **Receipt Without ASN** to control receiving without an advance shipment notice.

- **Allow** — the operator can receive without an ASN.
- **Warning** — the operator sees that the receive has no ASN and can choose **Receive Anyway**.
- **Hard Error** — receiving without an ASN is refused.

The check applies when a blind receipt is started and when receiving continues against a document created as **No ASN**. This setting is active; it is not only a saved preference.

## Receipt Without LPN

Use **Receipt Without LPN** when the warehouse permits loose stock at the destination.

- **Allow** — the receive can complete without an LPN.
- **Warning** — the operator must acknowledge the missing LPN.
- **Hard Error** — an LPN is required.

Without an LPN, an automatic hold that would normally target the LPN is placed on the location when the rule supports a location hold.

## No SKU on ASN

Use **No SKU on ASN** for an item scanned against an ASN that has no matching line.

- **Allow** — the receiving workflow may add the unplanned item.
- **Warning** — in aggregate ASN receiving, the operator is asked whether to receive it anyway. In case-level receiving, the current workflow treats **Warning** like **Allow** and creates the unplanned line without that question.
- **Hard Error** — the scan is refused.

A refused scan does not leave a new receipt line behind. Blind receiving does not use this check because there is no ASN plan to compare with.

## Pack multiple check

**Qty Pack Multiple Check** compares the received quantity with the largest configured pack tier above one base unit.

Example: a pack contains tiers of 1, 12 and 480 base units. A quantity of 960 is a valid multiple of 480; a quantity of 500 is not.

The check is skipped when the policy is **Allow**, the SKU has no usable pack hierarchy or no tier is above one base unit.

## Date deviation check

**Date Deviation Check** applies the SKU and lot-policy date rules, including:

- minimum shelf life on receipt;
- maximum age on receipt;
- delivery-by date;
- best-by date;
- required expiration date when it cannot be derived.

The comparison uses the warehouse's local day. A blank optional date is skipped unless the lot policy requires it or another captured date can derive it.

Keep the SKU shelf-life values and lot-policy date attributes complete before switching this check to **Warning** or **Hard Error**.

## ASN quantity validation

On **Qty validation against ASN (RF)**, set **Execute Qty validation** to:

| Value | Comparison |
| :--- | :--- |
| **None** | Do not run ASN excess or shortage checks. |
| **Sku** | In aggregate receiving, compare totals across all receipt lines for the SKU. |
| **Lot** | In aggregate receiving, compare lines with the same supplier lot. If no supplier lot can be matched, the check falls back to the SKU total. |

Blind receipts and returns have no ASN plan, so this quantity comparison does not run for them.

Case-level receiving uses the same switch and percentages but compares the individual planned case quantity rather than the receipt-wide SKU or supplier-lot total. If that case has an expected quantity of zero, the case-level quantity check is skipped.

### Excess limits

Use a soft limit for quantities that a permitted user may approve and a hard limit for quantities that nobody may approve.

- Turn on **Excess Override** and set **Excess Override %** for the soft limit.
- Turn on **Excess Error** and set **Excess Error %** for the hard limit.
- The hard limit is checked first.
- The comparison is strictly above the percentage: exactly on the limit is accepted.
- A blank enabled percentage behaves as zero.
- If both switches are off, normal excess quantities are accepted.

Example: expected 100, soft limit 5%, hard limit 20%.

- 105 is accepted.
- 106 requires an excess override.
- 121 is refused.

In aggregate receiving, an expected quantity of zero makes any received quantity excess. It requires confirmation unless **Excess Error** is on, in which case it is refused. Case-level receiving skips its quantity check when the planned case quantity is zero.

### Shortage limit

Turn on **Shortage Override** and set **Shortage Override %** when a shortage above the limit must be confirmed. Aggregate receiving also classifies that shortage with a reason.

In aggregate receiving, the shortage is evaluated when the scan closes the last open line for the SKU. If another line is still open, the remaining quantity is treated as work still to come. Confirmation also requires a configured shortage reason.

Case-level receiving compares the scanned case with that case's planned quantity. A case shortage can be confirmed without selecting a shortage reason.

There is no receipt-policy hard shortage percentage. In aggregate receiving, a permitted user confirms the shortage and selects a configured reason; case-level receiving confirms it without a reason.

## Other receiving checks

The receipt policy is only part of receiving validation. The workflow can also check:

- active holds on the destination;
- required lot attributes and supplier-lot consistency;
- temperature capture and limits;
- shortage reasons;
- serial-number capture for serialized inbound stock;
- automatic holds configured by SKU or owner settings.

Configure those rules in their respective setup pages. Changing an unrelated compatibility field in the receipt policy does not enable them.

## Save a policy safely

1. Open the policy and note which SKUs or owners use it.
2. Change one decision group at a time.
3. Click **Save**.
4. If another user saved first, reload the policy, review their change and apply yours again.
5. Test one compliant receive and each intended warning or hard-error path.
6. Confirm the correct role can acknowledge the warning.

The **Code** cannot be changed after creation. Do not delete a policy while a SKU or an owner default still uses it.

## Troubleshooting

| Symptom | What to check |
| :--- | :--- |
| Blind receive is refused | Check **Receipt Without ASN** on the policy selected for the SKU. |
| Warning cannot be confirmed | Confirm the refusal is overridable and the user has the required receipt override permission. |
| ASN quantity is not checked | Confirm **Execute Qty validation** is **Sku** or **Lot** and the workflow is receiving against an ASN. |
| Excess is accepted unexpectedly | Confirm **Excess Override** or **Excess Error** is on and its percentage is populated as intended. |
| Shortage is not requested yet | Check whether another line for the SKU is still open. |
| Pack multiple is unexpected | Review the SKU's largest pack tier and the unit used for the received quantity. |
| Date check behaves unexpectedly | Review the warehouse day, captured lot dates, SKU shelf-life settings and required lot attributes. |

## Related guides

- [Inbound Setup](../05-inbound-setup.md)
- [Owner Settings and Policy Resolution](./41-owner-settings-and-policy-resolution.md)
- [Lot Policy and Attributes](./32-lot-policy-and-attributes.md)
- [Reason Codes and Holds](./43-reason-codes-and-holds.md)
