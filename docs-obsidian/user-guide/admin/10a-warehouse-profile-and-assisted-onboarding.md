# Warehouse profile and assisted onboarding

## What this is

The General Distribution profile is a reviewed standard setup for an inactive
warehouse. Assisted onboarding can turn confirmed customer requirements and
that standard into an explainable plan. It does **not** apply the plan or change
the warehouse automatically.

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
3. Approve and apply changes through the normal administrator workflow.
4. Run one controlled scenario through **Receive**, **Putaway**, **Allocate**,
   **Replenish**, **Pick**, **Pack**, **Load** and **Goods Issue**.
5. Check required reports and labels against the approved samples.
6. Activate the warehouse only after the full scenario passes.

## Current limitation

There is no customer UI that applies a warehouse profile in one step. Assisted
onboarding currently prepares a deterministic plan and validates its scope; it
does not create or publish business-specific reason codes, policies or other
warehouse records by itself.

## Related guides

- [Go-Live Checklist for a New Tenant](10-checklist-go-live.md)
- [Warehouse Structure](03-warehouse-structure.md)
- [Outbound Setup](06-outbound-setup.md)
- [Printing and Labels](07-printing-and-labels.md)
- [Reports and Dashboards](08-reports-and-dashboards.md)
