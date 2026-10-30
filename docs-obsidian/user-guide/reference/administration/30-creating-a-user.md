# Creating a user

Use this page to add a new account. A new account can sign in, but it can do nothing until you give it a warehouse and a role.

## Before you start

- You hold the role `ADMIN` on a warehouse, so you can open Enterprise. See [Enterprise sidebar](00-administration-overview.md).
- You know the login the person will use. A login cannot be used twice.
- You know which warehouse and which role the person needs. See [Roles](14-roles.md).
- To make an account of type `Admin` or `Sys`, you must yourself be a super-user. See [User types and statuses](90-user-types-and-statuses.md).

## Steps

1. Switch to **Enterprise**.
2. Open `Users & Roles > Users`.
3. Click `New User`. An empty card opens on the right.
4. On the `General` tab fill `Login`, `Full name`, `Email` and `Password`.
5. Leave `Type` as `User` and `Status` as `Active`, unless you need something else.
6. Check `Language`, `Timezone`, `Date Format` and `Theme`.
7. Click `Save`. The message `User record created successfully` appears and the user shows in the list.
8. Open the tab `Warehouses & Roles` and follow [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md). The warehouse assignment can be added only after the user is saved.

## What changes

| What | Change |
|---|---|
| Table `enterprise.user` | One new row. The password is stored as an Argon2id hash. `pwd_changed_at` is set, so `Password age, days` starts at 0. |
| Table `enterprise.audit_log` | One row of kind `user_mutation`, and one more for the password hash step. The password itself is never written. |
| Access | None yet. The user has no warehouse and no role. |

## What can go wrong

| Message | Meaning | Fix |
|---|---|---|
| `User {username} already exists` | The login is taken. | Pick another login. |
| `Only a superuser can set a user's type to {type}` | You are not a super-user and you chose `Admin`, `Sys` or `Agent`. | Keep `User`, or ask a super-user. |
| `Duplicate entry on user (constraint ...)` | Another unique key was hit. | Read the constraint name and change that value. |
| A required field message | `Login`, `Full name`, `Email`, `Type` or `Status` is empty. | Fill it. |

## Related pages

- [Users list](10-users-list.md)
- [User card, General tab](11-user-general-tab.md)
- [Assigning a user to a warehouse](33-assigning-a-user-to-a-warehouse.md)
- [Messages catalogue](94-messages-catalogue.md)
- API: `create_user` (it takes the password with the other fields). RF terminal: the user signs in on the handheld if `RF device login` is on.
