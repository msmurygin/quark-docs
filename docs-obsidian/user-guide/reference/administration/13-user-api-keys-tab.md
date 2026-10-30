# User card, API Keys tab

An **API key** lets a program call the WMS API as this user, without a password.
The `API Keys` tab lists the keys of the user, makes new ones and revokes old ones.
The form is `enterprise_user_api_keys`. The data object is `enterprise_user_api_key` (view `enterprise.user_api_key_view`).

## Toolbar

| Button | What it does | Task page |
|---|---|---|
| `Generate Key` | Opens the window `Generate API Key`. | [Generating an API key](35-generating-an-api-key.md) |
| `Revoke` | Opens the window `Revoke API Key` for the ticked row. | [Revoking an API key](36-revoking-an-api-key.md) |
| `Refresh` | Reads the list again. | |

## Columns

All columns are read only.

| Label | Column | Type | Visible | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The key row id. |
| `Name` | `name` | Text, up to 100 characters | Yes | The name you gave the key. |
| `Prefix` | `key_prefix` | Text, 20 characters | Yes | The first 20 characters of the key, for example `wms_live_sk_AB12CD34`. It tells keys apart. It is not enough to use the key. |
| `Expires` | `expires_at` | Date and time | Yes | When the key stops working. Empty means it never expires. |
| `Revoked` | `revoked_at` | Date and time | Yes | When the key was revoked. Empty means not revoked. |
| `Last Used` | `last_used_at` | Date and time | Yes | The last time the key was accepted. The server writes it when it checks the key against the database, not on every call. Calls answered from the 30-second cache do not update it, so it can be late by up to that time. |
| `Status` | `status` | Text | No | `Revoked` when `revoked_at` is set, otherwise `Expired` when `expires_at` has passed, otherwise `Active`. Calculated by the view. |

The secret part of the key is stored only as an Argon2id hash (`key_hash`). The hash is never sent to the screen or the audit log.

## Window: Generate API Key

The form is `enterprise_user_api_key_create`. The key is made for the user whose card is open.

| Label | Field | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Name` | `name` | Text, up to 100 characters | Yes | Any text. Shown in the key list and the audit log. When left empty, the server uses `api-key`. | A label for you. It has no other effect. |
| `Expires` | `expires_preset` | Radio group | Yes | `30 days`, `90 days`, `1 year`, `Never`. When no choice reaches the server, 30 days is used. | When the key expires, counted from now. An unknown value is treated as 30 days. |

Buttons: `Cancel` closes the window. `Generate` makes the key and opens `API Key Created`.
The rules are in `crates/services/web-ui-server/src/extensions/server_actions/api_key_actions.rs` (`preset_to_expires_at`, line 90; the name and preset defaults, lines 269 and 273).

## Window: API Key Created

The form is `enterprise_user_api_key_created`. It shows, all read only:

| Label | What it shows |
|---|---|
| `API key created successfully` | A notice. |
| `Name` | The name. |
| `Key` | The full key, once. The format is `wms_live_sk_` followed by 32 letters and digits. |
| `Expires` | The expiry time, or empty for `Never`. |
| `This key will not be shown again — copy it now.` | A warning. |

The button `I saved it — Close` closes the window. The key cannot be shown again, because only its hash is kept.
If the window cannot be filled, the new key is revoked at once and you see an error.

## Window: Revoke API Key

The form is `enterprise_user_api_key_revoke_confirm`. It shows the notice
`Revokes immediately. Services using this key get 401. Cannot be undone.`
and the buttons `Cancel` and `Revoke`.

`Revoke` acts on the first ticked row of the key list. With no row ticked, the action stops with `No API key row is selected.`

## How a key is used

A program sends the key in the HTTP header `Authorization: Bearer wms_live_sk_...`.
The server accepts the key only when all of these hold:

1. The key exists and matches its hash.
2. It is not revoked.
3. It has not expired.
4. The owning user has `API access` switched on.
5. The owning user's status is `Active` or `Invited` (not `Locked` or `Disabled`).

Every failure gives the same outward answer, so a caller cannot tell which check failed.
The result is kept in a cache for 30 seconds (`WMS_API_KEY_TTL_SECS`). Revoking clears the cache entry on the server that handled the revoke at once.
Another app-server process can keep accepting the key for up to 30 seconds.

A key acts with the **role of its user**. It has no permissions of its own. See [Who can do what](91-who-can-do-what.md).

## What it affects

- A new key is a new row in `enterprise.user_api_key` and an audit row of kind `api_key_mutation`. The audit row holds the id, user, name, prefix and expiry, never the key or its hash.
- Revoking sets `revoked_at` and writes a second audit row.

## Who can use it

The API methods `generate_user_api_key`, `revoke_user_api_key`, `list_user_api_key`, `get_user_api_key` and `count_user_api_key` are open to the default role `ADMIN` only.

## Related pages

- [User card, General tab](11-user-general-tab.md) (the `API access` switch)
- [Generating an API key](35-generating-an-api-key.md)
- [Revoking an API key](36-revoking-an-api-key.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- Administrator guide: [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `generate_user_api_key`, `revoke_user_api_key`, `list_user_api_key`. RF terminal: none.
