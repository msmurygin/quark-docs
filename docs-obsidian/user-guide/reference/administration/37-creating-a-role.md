# Creating a role

Use this page to add a role for a group of people whose rights are not covered by the built-in roles.
A new role starts with **no rights at all**. You give it rights in the [Permission matrix](16-permission-matrix.md).

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- Choose a `Code`. It cannot be changed later. Use capital letters and no spaces, as the built-in roles do.
- Write down which screens and buttons the role needs. The matrix lists menu items, forms, API methods and web actions.
- Know that the built-in roles `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER` get default rights from their code. A role with another code gets none. See [Who can do what](91-who-can-do-what.md).

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Roles`.
3. Click `New Role`. An empty card opens on the right.
4. Fill `Code` and `Name`. `Description` is optional but helps: the role search also looks in it.
5. Leave `Active` ticked.
6. Click `Save`.
7. Open the [Permission matrix](16-permission-matrix.md) and switch on the rights of the new role. See [Changing permissions in the matrix](38-changing-permissions-in-the-matrix.md).
8. Assign the role to users on the tab `Warehouses & Roles` of each user. See [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md).

## What changes

| What | Change |
|---|---|
| Table `enterprise.role` | One new row with `is_system` off. |
| Table `enterprise.audit_log` | A row of kind `role_mutation`. |
| Caches | The cached role and permission decisions are cleared. |
| The matrix | The new role gets a column. It has no rows yet; each cell you switch on creates a row. |

When the app server starts (or the permission catalogue is reseeded), it writes permission rows for every **active role**. A role with a code other than the five built-in ones gets rows with all bits off. Until then a missing row means "denied". You switch on what you need.

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Duplicate entry on role (constraint role_code_key)` | The code is taken. | Pick another code. |
| Users with the role cannot do anything | The role has no permission rows with **X** on. | Switch on the rights in the matrix. |
| You cannot change `Code` | By design. | Create a new role and move the users. |

## Related pages

- [Roles](14-roles.md)
- [Permission matrix](16-permission-matrix.md)
- [Changing permissions in the matrix](38-changing-permissions-in-the-matrix.md)
- API: `create_role`. RF terminal: none.
