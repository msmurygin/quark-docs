# Syncing operators

Use this when a new person cannot be given work, is missing from the operators list, or still shows as active after leaving.
The operators list is a copy of the system users. The sync updates the copy.

## Before you start

- You need the role `ADMIN` or `MANAGER`. The web action `operator_sync` and the method `sync_operators` are for these two roles by default. See [Who can do what](91-who-can-do-what.md).
- The user must exist in `Users & Roles`, have **RF login** switched on, have the status `Active`, and be linked to this warehouse. Otherwise the sync will not add the user.
- Select the warehouse you want to sync. The sync works for the active warehouse only.

## Steps

1. Open `Warehouse Configuration > Operator Permissions > Operators`.
2. Click `Sync`.
3. Read the message. The list is read again.

## What happens

The system copies the users of the active warehouse who have RF login, are `Active`, and belong to the warehouse:

| Case | Result |
|---|---|
| A user is not in the list | A row is added with `Active` = `Yes`. |
| A user's login or name changed, or the row was inactive | The row is updated and set active. |
| A row is active, but its user lost RF login, is no longer `Active`, or left the warehouse | The row is set to `Active` = `No`. It is never deleted, because tasks refer to it. |
| `Equipment Profile` | Never touched by the sync. |

The messages are:

| Message | When |
|---|---|
| `Operators synced: {n} added or updated` | Only additions or updates. |
| `Operators synced: {n} deactivated` | Only deactivations. |
| `Operators synced: {n} added or updated, {m} deactivated` | Both. |
| `Operators are up to date — nothing changed` | Nothing to do. A second press reads like this. It is not an error. |
| `Operator sync failed: {message}` | The call failed. For example `Choose a warehouse first — operators are synced per warehouse`. |

Source: `crates/libs/wms-lib-core/src/model/tasks/operator.rs:200-274`, `crates/services/web-ui-server/src/extensions/customization/operator/sync_action.rs:20-60`.

## The same sync runs by itself

A background job runs the same sync for every active warehouse every 5 minutes.
The first run comes 5 minutes after the server starts. Until then the list can be empty.
Source: `crates/services/app-server/src/services/cleanup_tasks.rs:150,990-1016`.

## What it affects

- Only an active operator can be the target of `Reassign`.
- A deactivated operator can no longer be given pick work by a new `pick_dispatch_next`. The shift-equipment step refuses an inactive operator.

> Not confirmed by code: what happens to the tasks an operator holds when the sync deactivates the operator. The sync changes only the operator row. The lease reaper returns the tasks when the lease runs out. To verify: deactivate a user who holds a task and watch the `Task Board`.

## Related pages

- [Operators](50-operators-list.md)
- [Task Permissions](52-task-permissions.md)
- API: `sync_operators` (stateless command; needs no idempotency key; takes no parameters)
- RF terminal: none.
