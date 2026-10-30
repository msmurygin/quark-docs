# User card, General tab

The `General` tab is the first tab of the user card. It holds the identity of the account, the sign-in switches and the personal settings.
The form is `enterprise_user_basic`. The data object is `enterprise_user` (table `enterprise.user`).

The card opens on the right of the [Users list](10-users-list.md). Its tabs are `General`, [Warehouses & Roles](12-user-warehouses-and-roles-tab.md) and [API Keys](13-user-api-keys-tab.md).

## Toolbar

| Button | What it does | Task page |
|---|---|---|
| `Save` | Saves the card. A new user is created, an existing one is updated (`generic_save`). | [Creating a user](30-creating-a-user.md) |
| `Revert` | Reads the card again from the server and drops your unsaved edits (`generic_refresh`). | |
| `Delete` | Deletes the user and goes back (`generic_delete`). | [Deleting a user](34-deleting-a-user.md) |

## Fields

The fields are in four blocks: the main block, `STATUS`, `AUDIT` and `PREFERENCES`.

### Main block

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Login` | `username` | Text, up to 128 characters. Unique. | Yes | Any text. A duplicate is refused with `User {username} already exists`. | The name typed at sign-in. Matching is exact: `Anna` and `anna` are two logins. (The sign-in throttle folds case; the lookup does not.) |
| `Full name` | `full_name` | Text, up to 200 characters | Yes (screen). The column accepts empty. | Any text. | Shown in the Users list and as the person's name. The login is shown when it is empty. |
| `Email` | `email` | Text, up to 120 characters | Yes | Any text. Not checked for format by the database. | Contact address. |
| `Employee ID` | `employee_id` | Text, up to 50 characters | No | Any text. | Stored only. It has no effect today. |
| `Language` | `locale` | Drop-down of active languages | Yes in the database | The active rows of `locale`: `en` English, `ru` Русский, `kk` Қазақша. | The language of the screens for this user. |
| `Password` | `pwd` | Password field | No on the screen | Any text. Empty means "keep the current password". | Sets a new password. The stored value is an Argon2id hash. The field is always empty when the card opens, because the hash is never sent to the screen. See [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md). |
| `Type` | `typ` | Drop-down | Yes | `User` (default), `Admin` (Administrator), `Sys` (System), `Agent`. | `Admin` and `Sys` skip permission checks. Only such a user may set the field. See [User types and statuses](90-user-types-and-statuses.md). |

### STATUS block

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Status` | `status` | Drop-down | Yes | `Active` (default), `Invited`, `Locked`, `Disabled`. | `Locked` and `Disabled` stop all sign-in, including sessions already open. |
| `API access` | `api_access` | Switch | No | On (default) or off. | When off, the managed API keys of this user are refused. Cookie sign-in is not affected. |
| `RF device login` | `rf_login` | Switch | No | On (default) or off. | When off, sign-in from the RF handheld is refused. Browser sign-in is not affected. |

### AUDIT block

All four fields are read only. The server writes them.

| Label | Column | Type | What it shows |
|---|---|---|---|
| `Created` | `add_when` | Date and time | When the account was created. |
| `Last login` | `last_login_at` | Date and time | The last successful sign-in by password (`/api/login`). The failure count is set back to 0 at the same time. |
| `Failed attempts (24h)` | `failed_login_attempts` | Whole number | The failed password attempts in a rolling 24 hours. When the last failure is older than 24 hours, the next failure restarts the count at 1. |
| `Password age, days` | computed from `pwd_changed_at` | Whole number | Whole days since the stored password hash last changed. It is empty when no change is recorded. A hash that is rebuilt after a sign-in to upgrade its scheme also resets this age. |

The column `last_failed_login_at` is stored but has no field on the card.

### PREFERENCES block

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Timezone` | `timezone` | Drop-down, up to 50 characters | Yes in the database | The active values of the list `TIMEZONE`, for example `UTC`, `Europe/Berlin`, `Europe/Moscow`, `Europe/Kyiv`, `Asia/Dubai`, `America/New_York`. | The zone in which this user sees dates and times. |
| `Date Format` | `date_format` | Drop-down, up to 20 characters | Yes in the database | The active values of the list `DATEFORMAT`, for example `yyyy-MM-dd`, `dd.MM.yyyy`, `MM/dd/yyyy`, `dd/MM/yyyy HH:mm:ss`. | How this user sees dates. |
| `Theme` | `mode` | Drop-down, up to 20 characters | Yes in the database | `dark` (Dark theme), `light` (Light theme). | The colour theme at sign-in. |

The lists `TIMEZONE`, `DATEFORMAT` and `THEME` are rows of `enterprise.code_list_value`. The lists `USER_TYP` and `USER_STATUS` come from migration 011.

## What it affects

| Field | Read by |
|---|---|
| `Status` | Sign-in, every request with a session cookie, and every managed API key. |
| `Type` | Every permission check, and the guards that let only a superuser manage a superuser. |
| `API access` | `ApiKeyStore::validate`. |
| `RF device login` | The sign-in route. |
| `Language`, `Timezone`, `Date Format`, `Theme` | The web screens of this user. |

## Messages

| Message | When |
|---|---|
| `User {username} already exists` | The login is taken. |
| `Only a superuser can set a user's type to {type}` | You are not a superuser and you changed `Type`. Sending the type the account already has is accepted. |
| `Only a superuser can change or delete the superuser account {id}` | You are not a superuser and the account is of type `Admin` or `Sys`. The refusal covers save, password change and delete. |
| `Duplicate entry on user (constraint ...)` | A unique key other than the login was hit. |

See [Messages catalogue](94-messages-catalogue.md).

## Related pages

- [Users list](10-users-list.md)
- [Creating a user](30-creating-a-user.md)
- [Resetting a password](31-resetting-a-password.md)
- [Locking or disabling an account](32-locking-or-disabling-an-account.md)
- [User types and statuses](90-user-types-and-statuses.md)
- API: `create_user`, `update_user`, `delete_user`, `get_user`. RF terminal: the switch `RF device login` decides whether the account may sign in on the handheld.
