# Resetting a password

Use this page to give a user a new password. This is the only way to change a password in the product: no screen lets a user change their own.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- The account is not of type `Admin` or `Sys`, unless you are a super-user yourself. The system refuses a normal administrator here, so that nobody can take over a super-user account by changing its password.
- You have a new password of at least 8 characters that follows your organisation's password policy.

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`.
3. Click the user. The card opens.
4. On the `General` tab, type the new password in `Password`. The field is empty when the card opens; the old password is never shown.
5. Click `Save`.
6. Tell the user the new password in a safe way. The system does not ask the user to change it at first sign-in.

## What changes

| What | Change |
|---|---|
| Password record | The new password replaces the old one as a one-way hash. **Password age, days** returns to 0. |
| Audit log | The change is recorded without the password or its hash. |
| Open sessions | Existing authenticated sessions end. The user signs in again with the new password. |
| API keys | Not changed. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Only a superuser can change or delete the superuser account {id}` | The account is `Admin` or `Sys`, and you are not a super-user. | Ask a super-user. |
| The user still cannot sign in | The status is `Locked` or `Disabled`, `RF device login` is off for the handheld, or the password is shorter than 8 characters. | Check the card. The sign-in always answers `Invalid username or password`. |
| `Password must have at least 8 characters.` | The password is too short. | Set a password of 8 or more characters. |

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- [Locking or disabling an account](32-locking-or-disabling-an-account.md)
- API: `update_user` with the field `pwd`. An empty `pwd` changes nothing. RF terminal: none.
