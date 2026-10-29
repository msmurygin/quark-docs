# Revoking an API key

Use this page to stop a key from working: it leaked, the program is retired, or the person who held it has left.
A revoked key cannot be restored. Generate a new one instead.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- You know the `Prefix` or the `Name` of the key. Prefixes are listed on the `API Keys` tab.

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`, and click the user who owns the key.
3. Open the tab `API Keys`.
4. Tick the row of the key.
5. Click `Revoke`. The window `Revoke API Key` opens. It says that the key is revoked at once, that services using it get 401, and that it cannot be undone.
6. Click `Revoke` in the window.

The row now shows a time in `Revoked`.

## What changes

| What | Change |
|---|---|
| Table `enterprise.user_api_key` | `revoked_at` is set to the current time. The calculated status becomes `Revoked`. |
| Cache | The server that handled the revoke forgets the key at once. Another app-server process may still accept the key from its cache for up to 30 seconds. |
| Table `enterprise.audit_log` | A row of kind `api_key_mutation`. |

If you revoke a key that is already revoked, the request succeeds without changing it. The original `revoked_at` time remains the record of when the key first stopped working. The request includes both the key id and the user id from the open user card, so a stale row selection cannot revoke another user's key.

## What can go wrong

| Problem | Meaning | Fix |
|---|---|---|
| `No API key row is selected.` | No row was ticked. | Tick the row and try again. |
| The key still works for a short time | The 30-second cache on another server. | Wait, or lock the user (see [Locking or disabling an account](32-locking-or-disabling-an-account.md)). |

## Related pages

- [User card, API Keys tab](13-user-api-keys-tab.md)
- [Generating an API key](35-generating-an-api-key.md)
- API: `revoke_user_api_key`. RF terminal: none.
