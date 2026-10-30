# Assigning a user to a warehouse

Use this page to give a user access to a warehouse with a role, to change the role, to change the default warehouse, or to take access away.

## Before you start

- The user exists and is saved. See [Creating a user](30-creating-a-user.md).
- The warehouse is active, and so is the role. The drop-downs list only active ones.
- You hold the role `ADMIN` and can open Enterprise.

## Steps: add an assignment

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`, and click the user.
3. Open the tab `Warehouses & Roles`.
4. Click `Assign`. A new row appears.
5. Pick the `Warehouse` and the `Role`.
6. Tick `Default` if this is the warehouse that should open at sign-in. Only one row of a user may be the default.
7. Click `Save`.

## Steps: change a role or the default

1. Open the tab `Warehouses & Roles` of the user.
2. Change `Role` or `Default` in the row. You cannot change `Warehouse` of an existing row.
3. Click `Save`.

If you tick `Default` on a second row, the database refuses it (a user has at most one default). Untick the old default first, save, then tick the new one.

## Steps: take access away

1. Open the tab `Warehouses & Roles` of the user.
2. Tick the rows to remove.
3. Click `Remove`.

## What changes

| What | Change |
|---|---|
| Table `enterprise.user_warehouse` | A row is added, changed or deleted. |
| Table `enterprise.audit_log` | A row of kind `user_warehouse_mutation` for each change. |
| Cached decisions | The cache of role decisions is cleared at once, and the web permission cache is refreshed by `rbac_cache_refresh`. |
| The user's access | API calls see the new assignment at once, because the role cache is cleared. The switcher list of a user who is already signed in is read at sign-in (see the note below). |
| Enterprise | A row with the role `ADMIN` lets the user open Enterprise. Removing the last such row takes Enterprise away at the next switch or check. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Duplicate entry on user_warehouse (constraint user_warehouse_user_id_warehouse_id_key)` | The user already has a row for this warehouse. | Change the existing row. |
| `Duplicate entry on user_warehouse (constraint idx_user_warehouse_default)` | The user already has another default warehouse. | Untick the other default first. |
| `Cannot save: parent record not saved. Please save the parent first.` | The user card was never saved. | Save the `General` tab first. |
| An API call from this user is refused as `warehouse_required` | The user has no default, or more than one. | Mark exactly one default. |

## Related pages

- [User card, Warehouses & Roles tab](12-user-warehouses-and-roles-tab.md)
- [Roles](14-roles.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_user_warehouse`, `update_user_warehouse`, `delete_user_warehouse`, `delete_many_user_warehouse`. RF terminal: none.
