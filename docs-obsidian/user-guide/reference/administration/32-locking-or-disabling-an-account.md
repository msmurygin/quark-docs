# Locking or disabling an account

Use this page to take access away from a person at once: a departed employee, a lost handheld, a suspected stolen password.
`Locked` and `Disabled` work the same way in the code. Use `Locked` for a temporary stop and `Disabled` for a person who has left. This is a convention; the system does not tell them apart.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- The account is not of type `Admin` or `Sys`, unless you are a super-user.
- Nothing in the system stops you from locking your own account or the last administrator. Do not lock the account you are using.

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`, and click the user.
3. On the `General` tab, set `Status` to `Locked` or `Disabled`.
4. Click `Save`.

To restore access later, set `Status` back to `Active`.

## What changes

| Door | Effect |
|---|---|
| Web sign-in | Refused with `Invalid username or password`, after the password was checked. |
| A person who is signed in now | The next request is refused. Open sessions end (`crates/libs/wms-lib-web/src/middleware/mw_auth.rs:617`). |
| API keys of the user | Refused. The keys are not revoked and work again when the status goes back to `Active`. A cache keeps an earlier answer for up to 30 seconds. |
| Handheld | Refused, as for the web. |
| Supervisor authorization | The user can no longer authorize actions. |

The record stays. The user's data, warehouse assignments and API keys are not deleted.

To stop only one door, use the switches instead of the status: `API access` stops managed API keys, `RF device login` stops the handheld. See [User card, General tab](11-user-general-tab.md).

## What can go wrong

| Problem | Meaning |
|---|---|
| The user is still active a few seconds later | An API key that was accepted a moment ago is cached for up to 30 seconds. |
| `Only a superuser can change or delete the superuser account {id}` | The account is `Admin` or `Sys`. |

## Related pages

- [User types and statuses](90-user-types-and-statuses.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- [Revoking an API key](36-revoking-an-api-key.md)
- API: `update_user` with the field `status`. RF terminal: none.
