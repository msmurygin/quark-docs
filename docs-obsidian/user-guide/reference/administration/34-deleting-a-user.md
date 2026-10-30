# Deleting a user

Use this page to remove an account for good. In most cases it is better to set the status to `Disabled`: see [Locking or disabling an account](32-locking-or-disabling-an-account.md).

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- The account is not of type `Admin` or `Sys`, unless you are a super-user.
- You accept that the deletion cannot be undone from the screen.
- The user has never appeared in the [Audit log](15-audit-log.md). If the user has, the deletion is refused (see below).

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`, and click the user.
3. On the `General` tab, click `Delete`.
4. The card closes and you go back to the list.

There is no confirmation window in the metadata of the button. The deletion happens on the click.

## What changes

| What | Change |
|---|---|
| Table `enterprise.user` | The row is deleted. |
| Tables `enterprise.user_warehouse` and `enterprise.user_api_key` | The user's rows are deleted too (foreign key `ON DELETE CASCADE`). The API keys stop working. |
| Table `enterprise.audit_log` | A row of kind `user_mutation` with the old values (without the password hash). |
| Warehouse data | Other tables that store a user number (for example who created a receipt) keep the number. The code read for this page does not remove it. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `Only a superuser can change or delete the superuser account {id}` | The account is `Admin` or `Sys`. | Ask a super-user. |
| A foreign key error naming `audit_log_user_id_fkey` | The user appears in `enterprise.audit_log`: as the actor of a change, or in a refused call. The foreign key from the audit log to the user has no `ON DELETE` rule, so the database refuses the deletion. | Set `Status` to `Disabled` instead. |

Because every administrator action is written to the audit log with the actor, an account that has ever changed a user, a role or a permission cannot be deleted. The same holds for a role named in a refused call (`audit_log_role_id_fkey`).

## Related pages

- [User card, General tab](11-user-general-tab.md)
- [Locking or disabling an account](32-locking-or-disabling-an-account.md)
- [Audit log](15-audit-log.md)
- API: `delete_user`, `delete_many_user`. RF terminal: none.
