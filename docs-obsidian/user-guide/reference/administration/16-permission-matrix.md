# Permission matrix

The `Permission Matrix` is one big table. Each row is a **resource** (a menu item, a form, an API method or a button action). Each column is a **role**. Each cell has four switches: **R**, **W**, **D**, **X**.
You switch a cell on or off, and the change is saved at once.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Permission Matrix`.

The menu item is `ent_permission_matrix`. It opens the form `enterprise_permission_matrix`, a form of the kind `PermissionMatrix`.
The form settings (`form_permission_matrix_properties`) say: 50 resources on a page, and the save method is `batch_upsert_permission_matrix`.

## What the screen has

| Part | What it is |
|---|---|
| Search box | `Search resource code`. Filters the rows by a part of the resource code, ignoring capitals. It waits 300 ms after you stop typing. |
| `Import CSV` | Reads a CSV file and applies it. Shown only when you may edit. |
| `Export CSV` | Saves the rows on screen as a CSV file. Always shown. |
| `Diff only` | Shows only the rows you changed in this browser session. |
| Resource type chips | `Resource types`: one chip for each of `Menu Items`, `Forms`, `API Methods`, `Server Actions`, and an `All` chip. |
| Table | Resources down the side, one column for each active role, sorted by role code. |
| Footer | `N resources`, `N roles`, the page range `1–50 of M`, and the buttons `‹ Previous` and `Next ›`. |

There is no `Save` button. The page says so in its code: an edit is saved as you make it (`crates/services/web-ui-server/src/components/layout/permission_matrix.rs:513`).

### The four switches

| Switch | Bit | Meaning |
|---|---|---|
| **R** | `can_read` | Read. For a **menu item**, this is the bit that shows or hides the item in the sidebar. |
| **W** | `can_write` | Write. |
| **D** | `can_delete` | Delete. |
| **X** | `can_execute` | Execute. For an **API method** and a **server action**, this is the only bit that is checked. |

How each type of resource reads the bits (`crates/libs/wms-lib-auth/src/authorization/mod.rs`, function `is_invokable`; `sidenav.rs:102`):

| Resource type (`resource_type`) | What the resource is | Bit that decides |
|---|---|---|
| `menu_item` | An item of the sidebar. | **R**. A missing row means the item is shown. |
| `form` | A screen. | **Any** of the four. A form is closed only when some role has a row for it and this role has no bit on. |
| `api` | A method of the API, or an administrative capability such as `admin.rbac.reseed`. | **X**. A missing row means denied. |
| `server_action` | The code behind a button, for example `receipt_close`. | **X**. A missing row means denied. |

### Which resources are listed

The matrix lists the pairs `(resource type, code)` that have at least one row in `enterprise.role_permission`, plus every API method of the running server.
So a menu item or form that has **no** row for any role is not in the matrix (`crates/services/app-server/src/web/rpcs/permission_matrix_rpc.rs`, function `list_permission_matrix`).
Rows for API methods, capabilities and server actions are created when the app server starts (`crates/libs/wms-lib-auth/src/authorization/seeder.rs`). The seeder does not create rows for menu items or forms.

> Not confirmed by code: the exact `resource_code` that a `form` row carries (the form code or the form id). The sidebar reads `menu_item` rows by the menu item id (`sidenav.rs:105`), the form check reads `form` rows by the form code (`cache.rs:3221`), and the matrix looks a label up by id (`permission_matrix.rs`, function `resource_label`). To verify: open the matrix, filter the chip `Forms`, and read the code of a row.

## Editing a cell

1. Click one of the switches R, W, D or X.
2. The switch flips on screen at once and shows a pulsing dot.
3. After 250 ms without another click on that cell, the change is sent (`ui/wms-lib/permission_matrix.ts:42`). The call is `batch_upsert_permission_matrix`.
4. On success, the dot goes away. On failure, the switch flips back and a red message appears: `Failed to update permission`, with a `Retry` button.

If you click the same cell again within 250 ms, only the last state is sent.
If the row has left the screen (you searched or paged) when `Retry` is pressed, you see `This row is no longer on screen`.

The save is an insert-or-update: a missing row is created (`permission_matrix_rpc.rs`). One audit row of kind `role_permission_mutation` is written for each cell that really changed. A write that changes nothing writes no audit row.
After a save, the server clears all cached permission decisions at once. Other servers pick the change up on their next poll of the permission epoch (about one second) according to the code comment in `permission_matrix_rpc.rs`.

### The edit gate

The switches are enabled only when your role may run `batch_upsert_permission_matrix`. Otherwise they are disabled and `Import CSV` is hidden (`crates/services/web-ui-server/src/rendering/lifecycle.rs:627`).
The save route checks the same rule again on the server, so a disabled switch that is re-enabled by hand is still refused with `Forbidden("permission_matrix_save")` (`crates/services/web-ui-server/src/routes/permission_matrix_save.rs`).
To read the matrix at all, the role must be able to run `list_permission_matrix` (`lifecycle.rs:654`).

## CSV export and import

`Export CSV` writes the file `permission_matrix_{date}.csv` with the columns
`resource_type,resource_code,role_code,r,w,d,x`. It has one line for each cell of the rows on screen, and the values `true` or `false`.

`Import CSV` takes a file in the same format.

1. The file needs the header columns named above. Without them: `Invalid CSV: CSV header missing required columns`.
2. A line is used only if its `role_code` is a role column on screen. Other lines are skipped, without a message. Lines may name resources that are not on screen.
3. A value counts as on only when it reads `true`, in any capitals. Anything else is off.
4. If no line is usable: `No matching rows in CSV.`
5. Otherwise a confirmation window asks `Apply {n} permission changes from CSV?`.
6. On OK, one call saves everything. Then `Imported {n} cells across {m} roles.` appears and the page reloads.
7. On failure: `Import failed: {reason}`.

The parser splits on commas and does not read quoted commas or line breaks in a field (`permission_matrix.ts:560`).

## Who can use it

| Action | API method | Default roles |
|---|---|---|
| Read the matrix | `list_permission_matrix` | `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER` |
| Change cells, import | `batch_upsert_permission_matrix` | `ADMIN`, `MANAGER` |

Source: `permission_matrix_rpc.rs:409`. In Enterprise, only `ADMIN` reaches the screen.
A `MANAGER` can call `batch_upsert_permission_matrix` directly through the API in a warehouse scope, and the matrix does not stop a role from editing its own cells. See the findings file for this section.

## Related pages

- [Roles](14-roles.md)
- [Changing permissions in the matrix](38-changing-permissions-in-the-matrix.md)
- [Who can do what](91-who-can-do-what.md)
- [Audit log](15-audit-log.md)
- [Messages catalogue](94-messages-catalogue.md)
- API: `list_permission_matrix`, `batch_upsert_permission_matrix`. RF terminal: none.
