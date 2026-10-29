# Generating an API key

Use this page to give a program a key so that it can call the WMS API as a user.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- Decide which user the key acts as. **The key has the same rights as that user's role.** Make a separate user for a program, and give it only the role it needs.
- That user must have `API access` switched on and a status of `Active` or `Invited`. See [User card, General tab](11-user-general-tab.md).
- Decide how long the key should last: 30 days, 90 days, 1 year or never.

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`, and click the user.
3. Open the tab `API Keys`.
4. Click `Generate Key`. The window `Generate API Key` opens.
5. Type a `Name` that tells you what the key is for, for example `nightly-erp-sync`.
6. Pick `Expires`.
7. Click `Generate`.
8. The window `API Key Created` shows the key **once**. Copy it now and keep it in a safe place.
9. Click `I saved it — Close`.

The program sends the key in the header `Authorization: Bearer <key>`.

## What changes

| What | Change |
|---|---|
| Table `enterprise.user_api_key` | One new row with the name, the first 20 characters of the key (`key_prefix`), the hash of the key and the expiry. The key itself is not stored. |
| Table `enterprise.audit_log` | A row of kind `api_key_mutation` with the id, user, name, prefix and expiry. |
| The key list | The new key shows with its `Name`, `Prefix` and `Expires`. `Revoked` is empty. |

## What can go wrong

| Problem | Meaning | Fix |
|---|---|---|
| `No user selected — open a user detail first.` | No user card is open behind the window. | Open the user first. |
| You closed the window without copying the key | The key cannot be shown again. | Revoke the key and generate a new one. See [Revoking an API key](36-revoking-an-api-key.md). |
| An error that says the key was revoked because its one-time value could not be displayed | The window could not be filled, so the system revoked the key for safety. | Generate a new key. |
| The program gets HTTP 401 | The key is revoked or expired, the user has `API access` off or is `Locked` or `Disabled`, or the key text is wrong. The reply is the same for all causes. | Check the card of the user and the key list. |
| The program gets HTTP 403 | The key is accepted, but the role of the user lacks the right for the method. | Change the role or the permissions. See [Who can do what](91-who-can-do-what.md). |

## Related pages

- [User card, API Keys tab](13-user-api-keys-tab.md)
- [Revoking an API key](36-revoking-an-api-key.md)
- [Who can do what](91-who-can-do-what.md)
- Administrator guide: [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `generate_user_api_key`. RF terminal: none.
