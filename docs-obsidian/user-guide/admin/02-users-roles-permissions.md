---
title: "Administrator Guide - Users, Roles and Permissions"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-25
---

# Users, Roles and Permissions

## 1. How access works

A user can sign in only after an administrator creates the user.
A user can work in a warehouse only after an administrator assigns that warehouse and a role.

| Concept | Meaning |
|---|---|
| User | A person or a system account. |
| Role | A named set of permissions, for example `OPERATOR`. |
| Warehouse assignment | The warehouse a user can open and the role used there. |
| Permission | A right to view data, change it, delete it or run an action. |

Important rules:

- Every login name and role code must be unique.
- A user can have only one role assignment per warehouse and one default warehouse.
- You cannot lock, disable or delete the account you are currently using.
- Every active warehouse must keep at least one sign-in-capable `ADMIN`.
- You cannot delete a role while users still hold it.

The active warehouse decides which role is used. Menus and actions that are not allowed for that role are hidden or refused. Use **Enterprise > Permission Matrix** to review the effective permissions instead of assuming that every deployment uses the same defaults.

## 2. Seeded roles

The standard setup includes these roles:

| Code | Name | Standard role | Purpose |
|---|---|---|---|
| `ADMIN` | Administrator | yes | Full access to all forms |
| `MANAGER` | Warehouse Manager | yes | Config and operations access |
| `OPERATOR` | Operator | yes | Day-to-day warehouse operations |
| `VIEWER` | Viewer | yes | Read-only access |
| `SUPERVISOR` | Supervisor | yes | Authorizes overrides (close-with-discrepancy etc.) |
| `metadata_admin` | RF Metadata Admin | no | Can read AND write RF screen metadata |

Use the roles as a starting point:

- `ADMIN` manages users, warehouses and access.
- `MANAGER` manages warehouse configuration and operations.
- `SUPERVISOR` handles operational exceptions and authorised overrides.
- `OPERATOR` performs day-to-day warehouse work.
- `VIEWER` has read-only access where it is granted.
- `metadata_admin` is reserved for RF-screen administration.

Always review the effective rights in **Enterprise > Permission Matrix** before go-live. Filter by resource type and give each role only the access required for its job.

## 3. Create a user

### What you will do

Create a new user and set a password.

### Before you start

- Role: `ADMIN`.
- You are in Enterprise mode.
- You know the user name, e-mail and language of the person.

### Steps

1. Open `Sidebar > Users & Roles > Users`.
2. Click `New User`.
3. On the tab `General`, fill `Login`, `Full name`, `Email`, `Type` and `Status`.
4. Fill `Password`.
5. Set `Language`, `Timezone`, `Date Format` and `Theme`.
6. Click `Save`. The button `Revert` undoes unsaved edits.
7. Open the tab `Warehouses & Roles` and assign a warehouse (section 4).

![Users list in Enterprise mode with four users](../assets/screens/enterprise-users.png)

*Caption: the user list with the buttons New User and Refresh. Focus: Each row shows the login, role, warehouse and the Active badge.*

![User form, General tab](../assets/screens/enterprise-user-detail.png)

*Caption: the General tab of the user card. Focus: Check Login, Email, Status, API access and RF device login. The tabs Warehouses & Roles and API Keys are next to General. The teal numbers mark: 1 Login, 2 API access, 3 RF device login.*

### Field reference

Form `enterprise_user_basic`. Labels are the English labels.

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Login` (required) | Login name. Unique. | Text up to 128 characters. | `op2` |
| `Full name` (required in the form) | Name shown in lists. | Text up to 200 characters. | `Anna Petrova` |
| `Email` (required) | Contact address. | Text up to 120 characters. | `anna@example.com` |
| `Employee ID` | Personnel number. | Text up to 50 characters. | `E-0042` |
| `Language` | UI language. | Codes from the `locale` registry: `en`, `ru`, `kk`. | `en` |
| `Password` | Initial password. When editing, leave it empty to keep the current password. | At least 8 characters and your organisation's password rules. | (secret) |
| `Type` (required) | Account type. | `User`, `Admin`, `Sys`, `Agent`. Only a superuser (`Admin` or `Sys`) can set a value other than `User`. | `User` |
| `Status` (required) | Account status. | `Active`, `Invited`, `Locked`, `Disabled`. `Locked` and `Disabled` block sign-in, open sessions and API keys. `Active` and `Invited` are let in. | `Active` |
| `Created` | Audit. Read-only. | Date and time. | |
| `Last login` | Audit. Read-only. | Date and time. | |
| `Failed attempts (24h)` | Audit. Read-only. | Whole number. | |
| `Password age, days` | Audit. Read-only. Hint: "Days since the password was last changed". | Whole number. | |
| `Timezone` | Used to show dates. | A configured timezone. | `Europe/Sofia` |
| `Date Format` | Date format. | Values from the `DATEFORMAT` code list (9 values). | `dd.MM.yyyy HH:mm:ss` |
| `Theme` | Light or dark. | Values of `THEME` (2 values). | `dark` |
| `API access` | May this user call the API with a key? | On or off. Default on. | on |
| `RF device login` | May this user sign in on an RF terminal? | On or off. Default on. | on |

### What you should see

- The user appears in the list `Users`.
- `Created` shows the time of creation.
- The `Password age, days` field starts counting from the password change.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| The login already exists | Another user has the same login. | Choose another login. |
| The selected account type is not permitted | You tried to create a privileged account without sufficient access. | Leave **Type** as **User**, or ask an authorised administrator. |
| The account cannot be changed | Your account may not manage this privileged account. | Ask an authorised administrator. |
| You cannot lock or delete your own account | The change would lock you out. | Use another `ADMIN` account to make the change. |
| The last active administrator cannot be removed | The change would leave an active warehouse without an administrator who can sign in. | Assign or activate another `ADMIN` for every listed warehouse first. |
| You do not have permission | Your role cannot create users. | Use an `ADMIN` account. |
| A required field is empty | One or more required values are missing. | Fill every required field. |

### What this affects later

- The user can sign in with the user name and password.
- Without a warehouse assignment, the user has no data and no role (section 4).
- `Language`, `Timezone` and `Date Format` set what the user sees.
- The operator list in each warehouse is built from eligible users. See [Warehouse Structure](03-warehouse-structure.md#7-operator-sync).
- Changing the password ends the user's open sessions. When you edit a user and leave **Password** empty, the current password stays.

## 4. Assign a warehouse and a role

### What you will do

Give a user access to a warehouse with a role.

### Before you start

- Role: `ADMIN`.
- The user exists. The warehouse exists and is ready.

### Steps

1. Open `Sidebar > Users & Roles > Users`.
2. Open the user.
3. Open the tab `Warehouses & Roles`.
4. Click `Assign`.
5. In the new row, pick `Warehouse` and `Role`.
6. Turn on `Default` for the warehouse that should open first.
7. Click `Save`.
8. To remove access, select the row and click `Remove`.

![enterprise_user_warehouses - Warehouses & Roles](../assets/screens/enterprise-user-warehouses.png)

*Caption: the tab Warehouses & Roles with the buttons Refresh, Assign, Remove, Save.*

### Field reference

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Warehouse` | The warehouse to open. | An existing warehouse. One row per warehouse per user. | `WH1` |
| `Role` | The role in that warehouse. | An active role. | `OPERATOR` |
| `Default` | Opens first at sign-in. | On for at most one row of the user. | on |

### What you should see

- The row appears in the grid.
- At the next sign-in the user sees the default warehouse.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| **Record already exists** | The user already has this warehouse. | Edit the existing row. |
| The default warehouse cannot be saved | Another row is already the default. | Turn off **Default** on the other row first. |

### What this affects later

- The role decides which menus, buttons and API methods the user can use in that warehouse.
- A user with the `ADMIN` role in any warehouse can open Enterprise mode.
- Permission changes apply to subsequent actions. Ask affected users to refresh or sign in again if an open page still shows an old menu.

## 5. Create or edit a role

### What you will do

Create a custom role and set its permissions.

### Before you start

- Role: `ADMIN`.

### Steps

1. Open `Sidebar > Users & Roles > Roles`.
2. Click `New Role`.
3. Fill `Code`, `Name` and `Description`. Keep `Active` on.
4. Click `Save`.
5. Open `Sidebar > Permission Matrix`.
6. Find the new role in the columns. Set read, write, delete and execute bits for each resource.
7. Save the matrix.

![Roles list with six roles](../assets/screens/enterprise-roles.png)

*Caption: the role list with columns Code, Name, Description, Members, Resources, Active, System. Focus: SYS marks a system role; the line under each name shows members and resources. The teal number 1 marks the Warehouse Manager role.*

![Permission matrix: resources in rows, roles in columns](../assets/screens/enterprise-permission-matrix.png)

*Caption: the permission matrix. Focus: A green cell means the role has that right (R, W, D or X).*

### Field reference

Form `enterprise_role_basic`.

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Code` (required) | Stable identity of the role. It cannot change after creation. | Unique text up to 50 characters. | `PICKER` |
| `Name` (required) | Display name. | Text up to 200 characters. | `Picker` |
| `Description` | Free text. | Text. | `Floor pickers` |
| `Active` | Whether the role can be assigned and used. | On or off. | on |

List columns: `Code`, `Name`, `Description`, `Members`, `Resources`, `Active`, `System`. Buttons: `New Role`, `Refresh`.

### What you should see

- The role shows in the list with `Members` = 0.
- The role appears as a column in the permission matrix after you refresh it.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| **Record already exists** | The code exists. | Use another code. |
| **Cannot delete: record is in use** | A user still holds the role. | Change the users to another role first. |
| **You do not have permission** | The action is not granted to your role. | Ask an administrator to review the role in the matrix. |

### What this affects later

- Treat a new custom role as having no usable access until you configure and test it.
- Every permission change is written to `Audit`.
- Do not delete or repurpose the standard roles. Create a custom role when the standard responsibility does not fit.

## 6. Read the audit log

### What you will do

See who changed permissions and which calls were denied.

### Steps

1. Open `Sidebar > Audit`.
2. Use the column filters. Click `Refresh`.

![enterprise_audit_log - Audit Log](../assets/screens/enterprise-audit-log.png)

*Caption: the audit log list.*

### Field reference (columns)

`Warehouse`, `Target`, `Resource`, `Bit`, `Time`, `Resource Type`, `User`, `Role`, `Detail`, `Event`.

### What you should see

- One row per audited event.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| Empty list | No event matches or no event was written. | Clear the filters. |

### What this affects later

- Nothing. The log is read-only.

## 7. Create an API key

### What you will do

Create a key so another system can call the API as a user.

### Before you start

- Role: `ADMIN`.
- The user has `API access` turned on.

### Steps

1. Open the user card. Open the tab `API Keys`.
2. Click `Generate Key`.
3. Fill `Name`. Pick `Expires`.
4. Click `Generate`.
5. Copy the key from the window. It says `API key created successfully` and `This key will not be shown again — copy it now.` **This is the only time the key is shown.**
6. Click `I saved it — Close`. The server forgets the plain key.
7. To stop a key, select it and click `Revoke`. The window says `Revokes immediately. Services using this key get 401. Cannot be undone.` Click `Revoke` again.

![enterprise_user_api_keys - API Keys](../assets/screens/enterprise-user-api-keys.png)

*Caption: the API Keys tab with the buttons Generate Key, Revoke, Refresh.*

![enterprise_user_api_key_create - Generate API key](../assets/screens/enterprise-user-api-key-create.png)

*Caption: the dialog with Name and Expires.*

### Field reference

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Name` (required) | Label in the list and the audit log. | Text. | `ERP link` |
| `Expires` (required) | How long the key stays valid. | `Never`, `1 year`, `90 days`, `30 days` (code list `API_KEY_EXPIRY`). | `90 days` |

List columns: `Expires`, `Prefix`, `Status`, `Name`, `Revoked`, `Last Used`.

### What you should see

- A key that starts with `wms_live_sk_`. Send it as `Authorization: Bearer <key>`.
- The list shows the key `Prefix` and `Status`.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| HTTP 401 on a call | The key is revoked, expired or unknown. | Generate a new key. |
| The key is rejected and the log says `api_access disabled` | The key owner has `API access` off. | Turn on `API access` for the user. |

### What this affects later

- The external system acts with the role of the key owner. Use a user with a limited role.
- Only a hash of the key is stored.

## 8. Roles and the warehouse operator list

Users with a warehouse assignment, `RF device login` on and status `Active` become **operators** in that warehouse.
The operator list is refreshed periodically. See [Warehouse Structure](03-warehouse-structure.md#7-operator-sync).

## 9. Passwords and sessions

- Passwords and API keys are stored in a one-way protected form.
- Signing out ends the server session and clears the cookie.
- Change the initial administrator password after the first sign-in.
- Passwords must contain at least 8 characters. Apply your organisation's stronger password policy as well.
- Repeated failed sign-ins are temporarily slowed. The sign-in page deliberately does not reveal whether the user name or password was wrong.
- The user card shows recent failed attempts for investigation. A successful sign-in resets the counter.
- Changing a password ends the user's open sessions.

See [Sign-in, passwords and sessions](../reference/administration/92-sign-in-passwords-and-sessions.md) for operator and support guidance.
