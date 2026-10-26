# Sign-in, passwords and sessions

This page states, from the code, how sign-in works, what rules a password must meet, how failed attempts are handled and how long a session lasts.
Every statement has a source. Where the code is silent, the page says so.

## Sign-in on the web

1. The sign-in page sends `Login` and `Password` to the web server.
2. The web server checks the form. The password must be at least **6 characters** long. The message text on screen reads `Password must have at least 8 characters.`, which does not match the number 6 in the rule (`crates/services/web-ui-server/src/routes/http_params.rs:26`).
3. The web server calls the app server at `/api/login` with the login and password.
4. The app server checks the credentials in one function, `verify_credentials` (`crates/libs/wms-lib-web/src/handlers/handlers_login.rs:81`). The supervisor authorization window uses the same function.
5. On success the app server sets the cookie `auth-token`. The web server then reads who you are (`me`), changes the session id (a guard against a planted session id), and fills the session with your warehouses and permissions (`crates/services/web-ui-server/src/routes/login_handler.rs`).
6. The browser is sent to the page it asked for, or to `/`.

The first warehouse is the one marked `Default` on [Warehouses & Roles](12-user-warehouses-and-roles-tab.md); with none marked, the first row.

### What the sign-in checks, in order

| Step | Check | If it fails |
|---|---|---|
| 1 | The throttle allows another try (see below). | The same reply as a wrong password. |
| 2 | The login exists. | The same reply as a wrong password. The server still spends the time of a password hash, so the two cases cannot be told apart by timing. |
| 3 | The user has a password. | The same reply. |
| 4 | The password matches. | The same reply. The failure is counted on the user card (`Failed attempts (24h)`). |
| 5 | The status lets the user in: `Active` or `Invited` (`user_status.rs:52`). | The same reply. Checked only **after** the password matched. |
| 6 | If the request is from an RF handheld, `RF device login` is on. | The same reply. |

All of them give HTTP 403 and the same body, `Invalid username or password` (message key `auth.login_failed`). The user is never told which check failed (`crates/libs/wms-lib-web/src/error.rs:198`).
Steps 1 to 5 are in `verify_credentials`; step 6 is in `api_login_handler` (`handlers_login.rs:220`). The handheld is recognised by the request header `X-Rf-Client` with the value `rf-go` or `rf-web`. A request without the header is never treated as a handheld.

## Failed attempts: throttle, not lockout

| Item | Value | Source |
|---|---|---|
| Failures allowed | 10 | `crates/libs/wms-lib-auth/src/authentication/login_throttle.rs:45` |
| Window | 60 seconds. Every attempt, accepted or refused, restarts it. | `login_throttle.rs:51` |
| Keys | The login, folded to lower case. And the client address when the transport gives one. Either key at its limit refuses the try. | `login_throttle.rs`, function `keys` |
| What a success does | Clears the counters. | `record_success` |
| Where the counters live | In memory of one app-server process. With several processes, each keeps its own counters. | module comment |

When the limit is reached, further tries are refused with the same reply as a wrong password, without looking at the password.
The web sign-in does not pass a client address today, so only the login key applies there (`handlers_login.rs`, comment in `api_login_handler`).

**An account is never locked by failed attempts.** The code has no rule that sets the status to `Locked` after failures; an administrator does it by hand (see [Locking or disabling an account](32-locking-or-disabling-an-account.md)).
The reason is written in the module comment: an attacker could otherwise lock out the shift supervisor.

The counter `Failed attempts (24h)` on the user card is separate. It is written to the database and is only a display. It counts wrong passwords and "no password" cases, not unknown logins.

## Passwords

| Question | Answer from the code |
|---|---|
| How is a password stored? | As an Argon2id hash with a per-user salt (`pwd_salt`) and a secret key from the server settings (`SERVICE_PWD_KEY`). The text is `#02#` followed by the hash. The parameters are the library defaults (`crates/libs/wms-lib-auth/src/pwd/scheme/scheme_02.rs`). |
| Can an administrator read it? | No. The card shows an empty `Password` field; the hash is not part of the record sent to the screen (`UserInfo`). It is also kept out of the audit log. |
| Minimum length when **setting** a password | 8 characters. The same model-layer rule applies when creating a user, saving a new password, and calling the password update entry point directly. |
| Complexity, history, expiry | No rule found. The column `must_rotate_password` exists, and nothing reads it. |
| Minimum length when **signing in** | 8 characters on the web form, using the same policy and message as password writes. |
| Can a user change their own password? | No screen for it was found. An administrator sets the password on the [General tab](11-user-general-tab.md). |
| An old hash scheme | When a user with an older scheme signs in, the hash is rebuilt in the new scheme at that moment (`handlers_login.rs:138`). The `Password age, days` is reset by it. |
| Does a password change end open sessions? | Yes. The password hash, change time and per-user `token_salt` are replaced in one update. Tokens signed with the previous salt fail on their next request (`user.rs`, `update_pwd`). |

Note: the system enforces no rules for a *good* password. If your company needs such rules, they must be a rule for your administrators.

## Sessions

There are two layers.

| Layer | What it is | How long | Source |
|---|---|---|---|
| `auth-token` cookie | A signed token. It holds the login, an expiry time and is signed with the user's salt. The cookie is `HttpOnly`, `SameSite=Lax` and valid for the whole site. In production it is also `Secure`. It is renewed on **every** request that carries it, so it expires after an idle time. | `SERVICE_TOKEN_DURATION_SEC` seconds. The development setting is 1800 (30 minutes), also the default of the Kubernetes setup. | `crates/libs/wms-lib-auth/src/token/mod.rs:55`, `crates/libs/wms-lib-web/src/utils/token.rs`, `.cargo/config.toml`, `crates/services/tenant-manager/src/provision_k8s.rs` |
| Web session | The server-side store of the screens: warehouse, permissions, form states. Kept in the database. | `UI_SERVICE_SESSION_DURATION_MINUTES` minutes of **inactivity**. The development setting is 60. In production the session cookie is `Secure` and `SameSite=Lax`. | `crates/services/web-ui-server/src/auth/session_store.rs:213`, `.cargo/config.toml:67` |

The values in `.cargo/config.toml` are for development. It sets
`SERVICE_ENV=development`, which is the only mode that removes `Secure` so a
browser can use plain HTTP on localhost. Kubernetes app-server deployments set
`SERVICE_ENV=production`; a missing or unknown value also keeps `Secure`
enabled. The web UI uses its existing `UI_SERVICE_ENV` setting for the same
choice when it copies the login cookie to the browser.

What ends a session before the time runs out:

| Event | Effect |
|---|---|
| The user presses sign out | App-server validates the presented token and rotates the user's `token_salt`, then the web session is deleted and the browser cookie is removed. Because tokens are stateless, this ends every browser session for that account. |
| The status becomes `Locked` or `Disabled` | The next request is refused (`mw_auth.rs:617`). |
| The account is deleted | The next request finds no user. |
| The user's `token_salt` changes | All tokens of the user stop working. Password change and sign-out both rotate it. |

A token copied before a password change or sign-out stops working because its signature no longer matches the user's new salt. The server keeps no token list, so revocation applies to all browser sessions of the account together.
Changing a role or a warehouse assignment takes effect without a new sign-in: the server clears its cached decisions at once, and the web permissions are refreshed by the cache refresh (see [Permission matrix](16-permission-matrix.md)).

### Cookie flags

Both authentication cookies use `HttpOnly`, path `/` and `SameSite=Lax`.
In production both also use `Secure`, so the public WMS address must be HTTPS.
The app server applies this policy when login creates `auth-token` and whenever
middleware renews it. The web UI applies the same policy when it copies the
app-server login cookie; this prevents a secure upstream cookie from being
silently downgraded at the browser boundary.

## Service tokens

The web server calls the app server for you with a **service token**, valid 24 hours, signed with `SERVICE_INTERNAL_AUTH_KEY` (`token/mod.rs`, `generate_service_token`). The app server still checks the user's status on every such call (`mw_auth.rs:494`).

## API keys

A program can sign in with an API key instead. See [User card, API Keys tab](13-user-api-keys-tab.md). A key is checked against the same user status and, in addition, the `API access` switch.

## Supervisor authorization

Some screens ask a supervisor to authorize an action (the window `Supervisor Authorization` asks for `Supervisor username` and `Supervisor password`).

- The credentials go through the same `verify_credentials` and the same throttle, keyed by the operator who is asking (`override_grant_rpc.rs`).
- Authority belongs to the roles `SUPERVISOR`, `MANAGER` and `ADMIN` (`crates/libs/wms-lib-auth/src/authorization/override_role.rs:14`). For receipt overrides the capabilities `receipt.override_close_discrepancy`, `receipt.override_qty_shortage` and `receipt.override_qty_excess` are needed, which only `SUPERVISOR` holds by default.
- A refused attempt gives one reply for every cause: `those supervisor credentials were not accepted`.
- The grant is single-use and expires after a few minutes (`override_grant_rpc.rs`, the method description).

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [Resetting a password](31-resetting-a-password.md)
- [User types and statuses](90-user-types-and-statuses.md)
- [Messages catalogue](94-messages-catalogue.md)
- API: `/api/login`, `/api/logoff`, `me`, `update_user`, `supervisor_override_grant`. RF terminal: the handheld signs in through the same route with the header `X-Rf-Client`.
