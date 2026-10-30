# Users list

The `Users` screen lists every user account of the company. Accounts are shared by all warehouses.
The list is on the left. When you open a user, the user card opens on the right.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Users & Roles > Users`.

The menu item is `ent_users_list`. It opens the form `enterprise_users_shell`. The shell has two slots:
the list `enterprise_users_list` in `slot_1` and the user card `enterprise_user_detail` in `slot_2`.

## What the screen has

| Part | What it is |
|---|---|
| Toolbar | Two buttons: `New User` and `Refresh`. |
| Search box | Placeholder `Search by login, name, email…`. It filters the rows on your screen as you type. |
| Three filters | `All statuses`, `All roles`, `All warehouses`. Each lists only the values that occur in the rows loaded. |
| Count | The number of users shown, for example `3 of 12 users`. |
| Rows | One card for each user. |

The search and the filters run in the browser, on the rows already loaded.
The server does not know the filtered count.

### What a row shows

| Part of the card | Source |
|---|---|
| Round picture with initials | The full name, or the login when the full name is empty. |
| Name | `Full name`, or the login when the full name is empty. |
| Second line | `login · ROLE · WAREHOUSE`. Parts that are empty are left out. |
| Key badge | The number of **active** API keys of the user. A key is active when it is not revoked and has not expired. |
| Status pill | The status: `Active`, `Invited`, `Locked` or `Disabled`. `Locked` is drawn as an error state. |

`ROLE` and `WAREHOUSE` come from one warehouse only: the **default** warehouse of the user, or, when no default is marked, the one with the lowest warehouse id.
A user with several warehouses shows only one of them.
The data comes from the view `enterprise.user_list_card`.

The form itself also defines a table with these columns. They are the fields that the BIO `enterprise_user_list` reads.

| Label | Field | Type | Filter | Visible |
|---|---|---|---|---|
| `ID` | `id` | Whole number | none | No |
| `Username` | `username` | Text | Text | Yes |
| `Email` | `email` | Text | Text | Yes |
| `Type` | `typ` | Enum | Set | Yes |
| `Full Name` | `full_name` | Text | none | Yes |
| `Status` | `status` | Enum | none | Yes |

All columns are read only.

## Toolbar buttons

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `New User` | Nothing | Opens an empty user card on the right (`generic_new`). Nothing is saved until you press `Save` on the card. | [Creating a user](30-creating-a-user.md) |
| `Refresh` | Nothing | Reads the list again. | |

There is no `Delete` button on the list. A user is deleted from the card: see [User card, General tab](11-user-general-tab.md).

## Row action

| Action | Result |
|---|---|
| Click a row | Opens the user card on the right, with the tabs `General`, `Warehouses & Roles` and `API Keys`. |

## Who can use it

Only a user in Enterprise mode, so only a user with the role `ADMIN` on some warehouse.
The API methods behind the screen are `list_user`, `get_user` and `count_user`. Their default roles are `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER`. The default role `SUPERVISOR` is not in that list.
See [Who can do what](91-who-can-do-what.md).

## What this screen affects

- Nothing by itself. The list only reads.

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [User card, Warehouses & Roles tab](12-user-warehouses-and-roles-tab.md)
- [User card, API Keys tab](13-user-api-keys-tab.md)
- [User types and statuses](90-user-types-and-statuses.md)
- API: `list_user`, `count_user`, `get_user`. The `New User` button calls no API until you save. RF terminal: none.
