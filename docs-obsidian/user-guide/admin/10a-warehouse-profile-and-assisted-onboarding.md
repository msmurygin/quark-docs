# Warehouse profile and assisted onboarding

## What this is

The General Distribution profile is a reviewed standard setup for an inactive
warehouse. Assisted onboarding can turn confirmed customer requirements and
that standard into an explainable plan. It can inspect the current setup and
check selected policy behaviour without changing warehouse data. It does
**not** apply the plan or change the warehouse automatically.

An administrator remains responsible for reviewing every planned change,
approving it and carrying it out through the supported administrator workflows.

## When to use it

Use the profile while preparing a new, inactive warehouse. It is not an upgrade
tool for an active warehouse.

The core checklist covers:

- warehouse topology and master data;
- receipt, putaway, allocation, replenishment and picking policies;
- packing and shipping configuration;
- work areas, equipment, users and permissions.

The plan adds cartonization, integrations, reports and labels only when the
confirmed requirements say they are needed.

## What the assistant can do

The assistant separates preparation from execution:

- **Inspect and validate:** read the current setup, preview generated locations
  and run supported policy checks without saving changes.
- **Prepare for approval:** describe proposed warehouse records and policy
  changes for an administrator to review.
- **Plan only:** prepare cartonization, report and label drafts that still need
  their normal editor, preview and validation workflow.

The assistant cannot publish policies, activate reports, render or print
documents, or make configuration changes by itself. Normal role permissions
still apply when an administrator carries out an approved change.

## Information to confirm first

Record explicit answers for:

- whether integrations are required;
- whether reports are required;
- whether labels are required;
- whether customer-defined cartons are required;
- whether road transport is required;
- which approved customer report samples define the expected output.

Road transport requires the reporting scope because the standard output includes the
CMR consignment note. Report samples cannot be supplied when reports are out of
scope.

## Reference catalogues

When labels are in scope, the European English label catalogue contains pallet,
SKU, location, LPN, handling-unit and shipping labels.

When reports are in scope, the report catalogue contains:

- Goods Receipt Note;
- Putaway List;
- Picking List;
- Packing List;
- Delivery Note;
- Inventory Count Sheet;
- Stock Adjustment Report;
- CMR Consignment Note when road transport is required.

The assisted plan uses the European English catalogue. It does not select a
different UI language or a country-specific document set.

## Review and validate the setup

1. Confirm that the target warehouse is still inactive.
2. Review the customer facts and every planned configuration area.
3. Review previews and validation results. Resolve every warning before
   approving a change.
4. Apply approved changes through the normal administrator workflow.
5. Run one controlled scenario through **Receive**, **Putaway**, **Allocate**,
   **Replenish**, **Pick**, **Pack**, **Load** and **Goods Issue**.
6. Open every required report and label in its editor. Validate and preview it,
   then compare the output with the approved sample.
7. Activate the warehouse only after the full scenario passes.

## Current limitation

There is no customer UI that applies a warehouse profile in one step. Assisted
onboarding currently prepares a deterministic plan and validates its scope; it
does not create or publish business-specific reason codes, policies or other
warehouse records by itself. Report and label drafts remain plan items until an
administrator creates, validates and activates them through the supported
editors.

## Related guides

- [Go-Live Checklist for a New Tenant](10-checklist-go-live.md)
- [Warehouse Structure](03-warehouse-structure.md)
- [Outbound Setup](06-outbound-setup.md)
- [Printing and Labels](07-printing-and-labels.md)
- [Reports and Dashboards](08-reports-and-dashboards.md)
