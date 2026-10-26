# Changing permissions in the matrix

Use this page to give a role a right, or take one away: to open a screen, to press a button, to call an API method.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- Your role may run `batch_upsert_permission_matrix`. Otherwise the switches are grey. By default `ADMIN` and `MANAGER` may.
- You know the **kind** of right you need. Read [Permission matrix](16-permission-matrix.md): a menu item is shown by **R**; a form opens with any bit; an API method and a web action run with **X**.
- A change is saved as soon as you click, and takes effect at once on the server that saved it.

## Steps: change one cell

1. Switch to **Enterprise**.
2. Open `Configuration > Users & Roles > Permission Matrix`.
3. Pick a resource type chip (`Menu Items`, `Forms`, `API Methods`, `Server Actions`) or type a part of the resource code in `Search resource code`.
4. Find the row and the role column.
5. Click the switch you need: **R**, **W**, **D** or **X**.
6. Wait for the pulsing dot to go. The change is saved.

A button needs two rights: the web action (type `Server Actions`) and the API method behind it (type `API Methods`). Look both up on [Who can do what](91-who-can-do-what.md).

## Steps: change many cells from a file

1. Click `Export CSV` to get the current state.
2. Edit the file. Keep the header `resource_type,resource_code,role_code,r,w,d,x`. Write `true` or `false` in the last four columns.
3. Click `Import CSV` and pick the file.
4. Read the question `Apply {n} permission changes from CSV?` and click OK.
5. The page reloads after `Imported {n} cells across {m} roles.`

Only roles that are columns on the screen are imported. Lines for other roles are skipped without a message.

## Steps: see what you changed

Click `Diff only`. The table then shows only the rows you changed in this browser session. Click it again to see all rows.

## What changes

| What | Change |
|---|---|
| Table `enterprise.role_permission` | The row for the (role, type, code) is inserted or updated with the four bits. |
| Table `enterprise.audit_log` | One row of kind `role_permission_mutation` for each cell that really changed, with the old and new bits. |
| Cache | All cached API decisions on the server are cleared. |
| Users | A user's next request uses the new rights. Other server processes catch up within seconds, according to the code comment in `permission_matrix_rpc.rs`. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Failed to update permission` with `Retry` | The save failed. The switch went back to its old state. | Read the reason, then press `Retry`. |
| `This row is no longer on screen` | You pressed `Retry` after searching or paging away. | Find the row again and click the switch. |
| `Invalid CSV: CSV header missing required columns` | The first line is not the expected header. | Use an exported file as the base. |
| `No matching rows in CSV.` | No line names a role on screen. | Check the `role_code` column. |
| The switches are grey | Your role may not run `batch_upsert_permission_matrix`. | Ask an administrator. |
| A user keeps the right for a while | A cache on another server. | Wait a few seconds. |

Do not switch off **X** on `batch_upsert_permission_matrix` for the role `ADMIN`, nor **R** on the `Permission Matrix` menu item. You would lock yourself out of this screen and could only repair it through the API or the database.

## Related pages

- [Permission matrix](16-permission-matrix.md)
- [Roles](14-roles.md)
- [Who can do what](91-who-can-do-what.md)
- [Audit log](15-audit-log.md)
- API: `list_permission_matrix`, `batch_upsert_permission_matrix`. RF terminal: none.
