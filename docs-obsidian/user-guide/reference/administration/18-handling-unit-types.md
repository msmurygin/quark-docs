# Handling unit types

A **handling unit** is a reusable carrier: a tote, a pallet, a cart. A **handling unit type** describes a kind of carrier: its size, whether it holds goods or other carriers, and whether it comes back.
The list of types is common to all warehouses. Individual carriers of a type (the units, with their own codes) are registered later in the warehouse sidebar.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Shared Handling Unit Types`.

The menu item is `handling_unit_type_menu`. It opens the list `handling_unit_type_list_form`. The card is `handling_unit_type_normal_form`. The data object is `handling_unit_type` (table `enterprise.handling_unit_type`).
The screens come from the migration `080_handling_unit_screens.sql`.

## The list

| Label | Column | Type | Visible | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | The type id. |
| `Code` | `code` | Text | Yes | The code of the type. |
| `Name` | `name` | Text | Yes | The name. |
| `Active` | `active` | Yes/No | Yes | Whether new units may be registered and used. |
| `Inventory` | `holds_inventory` | Yes/No | Yes | Whether the carrier holds goods. |
| `Containers` | `holds_containers` | Yes/No | Yes | Whether the carrier holds other carriers. |
| `Returnable` | `returnable` | Yes/No | Yes | Whether the carrier comes back. |
| `Usage Policy` | `default_usage_policy` | Text | Yes | `OwnOnly`, `WarehouseShared`, or empty. |
| `Prefix` | `code_prefix` | Text | Yes | The prefix of unit codes. |

All columns are read only.

| Button | What it does | Task page |
|---|---|---|
| `New` | Opens an empty card in place of the list (`generic_new`). | [Creating a handling unit type](40-creating-a-handling-unit-type.md) |
| `Refresh` | Reads the list again (`generic_refresh`). | |

Click a row to open its card in place of the list.

## The card

The card has one button, `Save`. It saves and goes back to the list (`generic_save`).
There is no delete: the API has no delete method for types. To retire a type, switch `Active` off.

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Code` | `code` | Text, up to 30 characters. Unique. | Yes | Any text. | The stable key of the type. **It cannot be changed after the first save.** |
| `Name` | `name` | Text, up to 200 characters | Yes | Any text. | The name. |
| `Active` | `active` | Check box | No | On by default. | An inactive type is refused when registering units and when a unit is bound as a carrier or a box. |
| `Holds Inventory` | `holds_inventory` | Check box | No | On by default. | A unit of a type that holds no inventory, or that holds containers, cannot take goods directly when binding a box. |
| `Holds Containers` | `holds_containers` | Check box | No | Off by default. | Makes the type a carrier of other units, such as a cart. Needed for `Positions`. |
| `Positions` | `positions` | Whole number | No | Empty, or 1 or more. Allowed only when `Holds Containers` is on. | The number of places on the carrier. A carrier is accepted for an assignment only when its type holds containers and has positions. |
| `Shippable` | `shippable` | Check box | No | Off by default. | Stored only. It has no effect today. |
| `Returnable` | `returnable` | Check box | No | On by default. | A unit registered from a returnable type is marked reusable; otherwise it is marked disposable. |
| `Inspect on Return` | `return_inspection` | Check box | No | Off by default. | Stored only. It has no effect today. |
| `Default Usage Policy` | `default_usage_policy` | Drop-down | No | `OwnOnly`, `WarehouseShared`, or empty. | Who may use a unit by default. Empty means: decided by the owner of the unit. A unit owned by the warehouse is shared; a unit owned by a client is for that client only. A single unit can override it. |
| `Inner Length` | `inner_length` | Decimal | No | 0 or more. 0 by default. | Inner size. Used to check that a planned box fits the carrier. 0 means "unknown" and skips the check. |
| `Inner Width` | `inner_width` | Decimal | No | 0 or more. 0 by default. | As above. |
| `Inner Height` | `inner_height` | Decimal | No | 0 or more. 0 by default. | As above. |
| `Max Gross Weight` | `max_gross_weight` | Decimal | No | 0 or more. 0 by default. | The heaviest allowed load. Used in the same fit check. 0 means unknown. |
| `Tare Weight` | `tare_weight` | Decimal | No | 0 or more. 0 by default. | Stored only. It has no effect today. |
| `Code Prefix` | `code_prefix` | Text, up to 10 characters | No | Capital letters A to Z and digits only, 1 to 10 of them. | The start of the code of each unit registered from this type. Empty gives the prefix `HU`. |

The column `tracking` has no field. It is set to `ByInstance`, the only value: each unit is told apart by its own code, not counted as a quantity.

### Rules the database enforces

| Rule | Message when broken |
|---|---|
| `Positions` needs `Holds Containers` on, and must be at least 1 | A check-constraint error naming `ck_hut_positions`. |
| The type must hold goods, containers, or both | `ck_hut_holds_something`. |
| Sizes and weights cannot be negative | `ck_hut_physics_not_negative`. |
| `Code Prefix` is 1 to 10 capital letters and digits | `ck_hut_code_prefix`. |
| `Code` is unique | `Duplicate entry on handling_unit_type (constraint ...)`. |

## What it affects

- **Registering units.** A unit is made from an active type, 1 to 500 at a time, with codes made from the prefix.
- **Picking.** A carrier or box must be of an active type that fits what the cartonization plan asks for.

## Who can use it

The API methods `create_handling_unit_type` and `update_handling_unit_type` are open to the default roles `ADMIN` and `MANAGER`.
`list_handling_unit_type`, `get_handling_unit_type` and `count_handling_unit_type` are open to `ADMIN`, `MANAGER`, `SUPERVISOR`, `OPERATOR` and `VIEWER`.
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Creating a handling unit type](40-creating-a-handling-unit-type.md)
- [Who can do what](91-who-can-do-what.md)
- API: `create_handling_unit_type`, `update_handling_unit_type`, `list_handling_unit_type`. RF terminal: none for the types. Units are registered from the warehouse sidebar.
