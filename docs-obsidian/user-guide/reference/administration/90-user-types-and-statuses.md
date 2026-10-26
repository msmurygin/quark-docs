# User types and statuses

Two fields of the user card decide what an account may do before roles are even looked at: `Type` and `Status`.
This page lists every value and what the code does with it.

## User types

The field is `Type` (`typ`) on the [General tab](11-user-general-tab.md). The values come from the database enum `enterprise.user_typ` and the list `USER_TYP`.

| Value | Label in the list | Skips permission checks | What it is for |
|---|---|---|---|
| `User` | User | No | An ordinary person. This is the default. |
| `Admin` | Administrator | **Yes** | A super-user account. |
| `Sys` | System | **Yes** | A system account. |
| `Agent` | Agent | No | The code treats it exactly like `User`. |

Source: `crates/libs/wms-lib-auth/src/user_typ.rs:68` (`is_superuser` is true for `Admin` and `Sys` only).

What "skips permission checks" means: for an API call, the server finds that the user is a super-user and lets the call through without looking at any permission row (`crates/libs/wms-lib-auth/src/authorization/api_check.rs`, function `check_api_call`, step 2). A super-user does not need a role for this. For a button on the web screen (the web action gate), a super-user is let through only when they hold no role in the current scope; with a role, that role decides (`crates/services/web-ui-server/src/extensions/tx_helper.rs:1747`). The `Enterprise` sidebar is still opened only through a warehouse row with the role `ADMIN` (see [Enterprise sidebar](00-administration-overview.md)).

### Who may set or manage a super-user

The model refuses these (`crates/libs/wms-lib-core/src/model/user.rs:644` and `:676`):

| Action | Allowed for | Refusal |
|---|---|---|
| Create or change a user so that `Type` is not what the account already has | A super-user only. | `Only a superuser can set a user's type to {type}` |
| Change, set the password of, or delete an account whose stored type is `Admin` or `Sys` | A super-user only. | `Only a superuser can change or delete the superuser account {id}` |

An ordinary `ADMIN` role can therefore not make anyone a super-user and cannot take over a super-user account by resetting its password.
A form that sends back the type the account already has is accepted. The system account behind background jobs (user 0) counts as a super-user (`user.rs:692`).

## User statuses

The field is `Status` (`status`). The values come from the enum `enterprise.user_status` and the list `USER_STATUS`.

| Value | Label | May sign in | Meaning |
|---|---|---|---|
| `Active` | Active | Yes | The normal state. The default. |
| `Invited` | Invited | Yes | The account exists but its owner has not set a password yet. It is let through, because with no password there is nothing to sign in with. |
| `Locked` | Locked | **No** | An administrator took access away (for example a compromised account). |
| `Disabled` | Disabled | **No** | An administrator took access away (for example a departed employee). |

Source: `crates/libs/wms-lib-auth/src/user_status.rs:52`, `may_sign_in`.

`Locked` and `Disabled` are the same to the code. Both close every door at once:

| Door | Where it is checked |
|---|---|
| Sign-in by password | `verify_credentials`, after the password matched (`crates/libs/wms-lib-web/src/handlers/handlers_login.rs:134`). |
| A session that is already open (cookie) | On every request (`crates/libs/wms-lib-web/src/middleware/mw_auth.rs:617`). |
| A managed API key | `ApiKeyStore::validate` (`crates/libs/wms-lib-auth/src/authentication/api_key.rs:272`). |
| A web server call that carries a service token | `UserBmc::may_sign_in` (`mw_auth.rs:494`). |
| The supervisor authorization window | It uses the same sign-in check. |

The refusal on the web looks exactly like a wrong password: `Invalid username or password`. The user is not told that the account is locked.

The status is **never** changed by the system. The sign-in throttle and the failed-attempt counter do not lock an account. See [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md).

The sign-in switches `API access` and `RF device login` are separate from the status. `API access` off refuses only managed API keys. `RF device login` off refuses only sign-in from the RF handheld.

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [Locking or disabling an account](32-locking-or-disabling-an-account.md)
- [Sign-in, passwords and sessions](92-sign-in-passwords-and-sessions.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_user`, `update_user`. RF terminal: none.
