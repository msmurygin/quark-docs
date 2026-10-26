# Creating a handling unit type

Use this page to add a kind of reusable carrier (a tote, a pallet, a cart) so that units of it can be registered in a warehouse.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- Choose a `Code` of up to 30 characters. It cannot be changed later.
- Know what the carrier holds: goods, other carriers (a cart that holds totes), or both.
- For a cart: know how many places (`Positions`) it has.
- If the carrier is checked against box sizes, have its inner size and maximum load ready. Use the same units as your cartonization boxes (see the note on [Handling unit types](18-handling-unit-types.md)).

## Steps

1. Switch to **Enterprise**.
2. Open `Configuration > Handling Unit Types`.
3. Click `New`. An empty card opens.
4. Fill `Code` and `Name`.
5. Set what the carrier holds: tick `Holds Inventory`, `Holds Containers`, or both. At least one must be on.
6. For a cart: tick `Holds Containers` and type `Positions` (1 or more). Leave `Positions` empty for any other type.
7. Tick `Returnable` if the carrier comes back (on by default).
8. Fill `Inner Length`, `Inner Width`, `Inner Height` and `Max Gross Weight` if you want the fit check. Leave 0 to skip it.
9. Pick `Default Usage Policy` if you need one. Leave it empty to let the owner of each unit decide.
10. Type a `Code Prefix` of capital letters and digits (up to 10), for example `T`. With none, unit codes begin with `HU`.
11. Click `Save`. You go back to the list.

Then register units of the type in the warehouse sidebar. That screen is not part of this section.

## What changes

| What | Change |
|---|---|
| Table `enterprise.handling_unit_type` | One new row. `tracking` is `ByInstance`. |
| Warehouses | The type is available to every warehouse at once. |

The type is not audited: the code has no audit event for it (`HandlingUnitTypeBmc` has no audit setting).

## What can go wrong

| Problem | Meaning | Fix |
|---|---|---|
| `Duplicate entry on handling_unit_type (constraint ...)` | The code is taken. | Use another code. |
| Error naming `ck_hut_positions` | `Positions` is set but `Holds Containers` is off, or `Positions` is under 1. | Tick `Holds Containers` or clear `Positions`. |
| Error naming `ck_hut_holds_something` | Both `Holds Inventory` and `Holds Containers` are off. | Tick one. |
| Error naming `ck_hut_code_prefix` | The prefix has small letters, spaces, or is over 10 characters. | Use A to Z and 0 to 9. |
| Error naming `ck_hut_physics_not_negative` | A size or weight is negative. | Use 0 or more. |
| You cannot change `Code` or delete the type | By design. There is no delete method. | Switch `Active` off to retire it. |

## Related pages

- [Handling unit types](18-handling-unit-types.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_handling_unit_type`, `update_handling_unit_type`. RF terminal: none.
