---
title: "Administrator Guide - First Login and Navigation"
type: user-guide
audience: customer administrator
status: draft
updated: 2026-10-29
---

# First Login and Navigation

## 1. Sign in

### What you will do

Sign in to the web UI and reach the main screen.

### Before you start

- You need a user name and a password from the person who installed the tenant.
- For a new tenant, the first administrator is created by an operator command, not by a screen.
  The command is `app-server bootstrap-admin` and it needs three settings:
  `BOOTSTRAP_ADMIN_USERNAME`, `BOOTSTRAP_ADMIN_EMAIL`, `BOOTSTRAP_ADMIN_PASSWORD`
  (`app-server/src/cli.rs`). Four more settings are optional:
  `BOOTSTRAP_ADMIN_LOCALE` (default `en-US`), `BOOTSTRAP_ADMIN_DATE_FORMAT` (`yyyy-MM-dd`),
  `BOOTSTRAP_ADMIN_TIMEZONE` (`UTC`), `BOOTSTRAP_ADMIN_MODE` (`light`).
- That command works only when the tenant has **zero users**.
  It needs at least one warehouse and the `ADMIN` role to exist
  (`wms-lib-core/src/model/initial_admin.rs`). The new user gets the `ADMIN` role
  in the first warehouse and signs in with the password you set.
- Change the password after the first sign-in. Nothing forces you to do it.

### Steps

1. Open the web UI address your installer gave you.
2. In the field `Username`, type your user name.
3. In the field `Password`, type your password. Use the eye button to show or hide it.
4. Click `Sign in`.
5. Optional: use the `RU` / `EN` button on the sign-in page to change the language of the sign-in page. Use the moon/sun button to change the theme.

![Web sign-in page](../assets/screens/login.png)

*Caption: the sign-in page with the fields Username and Password. Focus: Sign in form on the right: Username, Password and the Sign in button. The teal numbers on the picture mark: 1 Username, 2 Password, 3 Sign in button.*

### Field reference

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Username` | Your login name. | Any text. Must match an existing user. | `alex.morgan` |
| `Password` | Your password. | At least 8 characters. | Use the password issued by your administrator. |

The sign-in form and user administration use the same eight-character minimum. Passwords shorter than eight characters are rejected before any user data is written.

### What you should see

- The main screen opens with the left sidebar.
- Your active warehouse is part of your session. The visual position is not documented in the metadata.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| A password length message | The password field failed the form check. | Type a longer password. |
| `Login failed.` | The server did not accept the credentials. | Check the user name and the password. |
| Login is refused for an RF terminal only | The user has `RF device login` turned off (`rf_login = false`). The refusal looks the same as a wrong password. | Turn on `RF device login` for the user (see `02-users-roles-permissions.md`). |
| Sign-in returns an error with no detail after a database reset | The session data was reset. | Ask the system administrator to restart the web service, then sign in again. |

### What this affects later

- Your session stores your user, your active warehouse and your permissions.
  Menus and buttons depend on the role you hold in that warehouse.

## 2. Warehouse and Enterprise mode

### What you will do

Understand which warehouse you work in, and when you are in Enterprise mode.

### Before you start

- A user can have several warehouses. Each assignment has a role (see `02-users-roles-permissions.md`).
- The assignment marked `Default` opens first (`is_default`).

### Steps

1. After sign-in, look at the warehouse button in the top bar. It shows the code of the active warehouse.
2. To change the warehouse, click that button (tooltip `Switch warehouse`).
   A pop-up `Switch warehouse` opens. It has a search field and one row per warehouse (name, code and your role).
   Click a row.
   The server route is `POST /warehouse/switch`.
   It clears all form and navigation state and reloads the app
   (`web-ui-server/src/routes/warehouse_handler.rs`).
3. To work on users, roles, translations and integration settings, switch to **Enterprise**.
   The Enterprise entry exists only for users who hold the `ADMIN` role in at least one warehouse.

If you hold `ADMIN` in any warehouse, the first row of the pop-up is `Enterprise` (tag `admin`). If you hold no warehouse assignment, the pop-up says `No warehouses assigned`
(`web-ui-server/src/components/partials/masthead.rs`, `application_menu.rs`).

### What you should see

- In a warehouse: the **warehouse sidebar** (section 3).
- In Enterprise mode: the **enterprise sidebar** (section 4). The warehouse code is `ENTERPRISE` and the warehouse id is `0`.

### If something goes wrong

| Message | Meaning | Fix |
|---|---|---|
| The `Reports` page shows a banner instead of reports | In Enterprise mode the report data sets have no warehouse schema. | Switch to a real warehouse (`web-ui-server/.../reports_iframe.rs`, "enterprise context" case). |
| You are in Enterprise mode but every screen is denied | Your role in the linked warehouse is not `ADMIN`. | Ask an administrator to give you `ADMIN` on a warehouse. |

### What this affects later

- Data is stored per warehouse schema. A record made in `WH1` is not visible in `WH2`.
- Users, roles, event settings and the code lists of the enterprise live above all warehouses.

## 3. Warehouse sidebar (menu 1, "Sidebar navigation")

The tree below comes from the table `menu_items` of the meta-ui database after all migrations.
Labels are the English labels. The order follows `sort_order`.
Items with the same `sort_order` appear in the order the database returns them.

```
Overview
  Dashboard
  Reports
Management & Control
  Receiving
    Receipts
  Orders & Waves
    Orders
    Waves
  Shipping
    Transport Resources
    Dispatches
    Load Plans
    Loads
  Inventory
    Balances
    Holds
    Adjustments
    Counts
    Lot Transfers
    Replenishment
    Pending Move-In
  Execution Control
    Task Board
    Pick Assignments
    Order Control (Manual)
    Pick Pallets (Manual)
  Exceptions
    Pick Target Exceptions
    Packing Exceptions
    Skip History
  Stations
    Distribution Stations
    Consolidation Stations
    Station Routes
  Handling Units
    Handling Unit Registry
  History
    Transactions
Warehouse Configuration
  Warehouse Readiness
  Topology
    Locations
    Putaway Zones
    3D Warehouse
  Work Areas & Equipment
    Work Areas
    Equipment Profiles
  Product Data
    Owners
    SKUs
    Packs
    Barcode Formats
    Attributes
  Policies
    Allocation Policy
    Replenishment Policy
    Putaway Policy
    Cartonization Policy
    Lot Policy
    Receipt Policy
    Picking Policies
  Counting
    Cycle Count Policies
    Count Tolerances
  Reason Codes
    Hold Codes
    Pick Short Reasons
    Adjustment Reasons
  Operator Permissions
    Operators
  Dashboards
    Board Settings
    Metric Thresholds
  Settings & Reference Data
    System Settings
    Code List
```

Notes:

- All three top-level sections start collapsed. Open one level at a time. Closing a parent also closes and hides every group below it.
- `Shipping` collects transport resources, dispatches, load plans and loads. Shipping one complete order still starts from `Management & Control > Orders & Waves > Orders`.
- `Management & Control > Inventory > Replenishment` lists replenishments of pick locations. `Warehouse Configuration > Policies > Replenishment Policy` opens the urgency settings read by the planner; each pick location's `Min` and `Max` still decide when and how much to replenish.
- `Overview > Dashboard` opens the home dashboard. The dashboard also remains the first tab in the top bar.

The `dashboard` form is the home page. It is the default tab of the main work area (`tab_containers.default_tab_id` = tab `dashboard`), so it opens right after sign-in. The breadcrumb entry `Dashboard` brings you back to it and clears the other screens (`web-ui-server/src/services/viewport_service.rs`, `routes/breadcrumb_handler.rs`).

### Menu item to screen

| Menu path | Opens (form code) | Covered in |
|---|---|---|
| `Warehouse Configuration > Settings & Reference Data > Code List` | `code_list_list_form` | `11-faq.md`, `05-inbound-setup.md` |
| `Warehouse Configuration > Reason Codes > Hold Codes` | `hold_code_list_form` | `05-inbound-setup.md` |
| `Warehouse Configuration > Product Data > Owners` | `owner_list_form` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Warehouse Configuration > Topology > Locations` | `location_list_form` | `03-warehouse-structure.md` |
| `Warehouse Configuration > Topology > Putaway Zones` | `putawayzone_list_form` | `03-warehouse-structure.md` |
| `Warehouse Configuration > Topology > 3D Warehouse` | `warehouse_3d` (HTML page) | `03-warehouse-structure.md` |
| `Warehouse Configuration > Work Areas & Equipment > Work Areas` | `work_area_list_form` | `03-warehouse-structure.md` |
| `Warehouse Configuration > Work Areas & Equipment > Equipment Profiles` | `equipment_profile_list_form` | `03-warehouse-structure.md` |
| `Management & Control > Stations > Distribution Stations` | `distribution_station_list_form` | `06-outbound-setup.md` |
| `Management & Control > Stations > Consolidation Stations` | `consolidation_station_list_form` | `06-outbound-setup.md` |
| `Management & Control > Exceptions > Packing Exceptions` | `packing_exception_list_form` | `operator/10-packing-verify.md` |
| `Management & Control > Execution Control > Order Control (Manual)` | `order_control_tabbed` | `operator/11-order-control-after-picking.md` |
| `Warehouse Configuration > Settings & Reference Data > System Settings` | `sys_settings_list_form` | `10-checklist-go-live.md` |
| `Warehouse Configuration > Dashboards > Board Settings` | `dashboard_setting_list_form` | `08-reports-and-dashboards.md` |
| `Warehouse Configuration > Dashboards > Metric Thresholds` | `dashboard_threshold_list_form` | `08-reports-and-dashboards.md` |
| `Warehouse Configuration > Product Data > Packs` | `pack_list_form` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Warehouse Configuration > Policies > Allocation Policy` | `allocation_policy_list_form` | `06-outbound-setup.md` |
| `Warehouse Configuration > Policies > Putaway Policy` | `putaway_policy_list_form` | `05-inbound-setup.md` |
| `Warehouse Configuration > Policies > Cartonization Policy` | `cartonization_policy_list_form` | `06-outbound-setup.md` |
| `Warehouse Configuration > Policies > Lot Policy` | `lot_policy_list_form` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Warehouse Configuration > Policies > Receipt Policy` | `receipt_policy_list_form` | `05-inbound-setup.md` |
| `Warehouse Configuration > Reason Codes > Pick Short Reasons` | `pick_short_reason_list_form` | `06-outbound-setup.md` |
| `Warehouse Configuration > Policies > Picking Policies` | `picking_policy_list_form` | `06-outbound-setup.md` |
| `Warehouse Configuration > Counting > Cycle Count Policies` | `inventory_count_policy_list_form` | `03-warehouse-structure.md` (short note) |
| `Management & Control > Handling Units > Handling Unit Registry` | `handling_unit_registry_type_list_form` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Warehouse Configuration > Product Data > Barcode Formats` | `barcode_format_list_form` | `07-printing-and-labels.md` |
| `Management & Control > Receiving > Receipts` | `receipt_list` | `05-inbound-setup.md` |
| `Warehouse Configuration > Product Data > SKUs` | `sku_list` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Warehouse Configuration > Product Data > Attributes` | `attribute_def_list_form` | `04-owners-sku-uom-pack-hierarchy.md` |
| `Management & Control > Orders & Waves > Orders` | `shipment_order_list` | `06-outbound-setup.md` |
| `Management & Control > Inventory > ...` | inventory balances, holds, adjustments, counts, replenishments and pending move-in | `05-inbound-setup.md` (holds), `11-faq.md` |
| `Overview > Reports` | reports catalogue | `08-reports-and-dashboards.md` |
| `Management & Control > Execution Control > Task Board` | `task_board_list_form` | `06-outbound-setup.md` |
| `Management & Control > Execution Control > Pick Assignments` | `pick_assignment_board_list_form` | `06-outbound-setup.md` |
| `Management & Control > Exceptions > Pick Target Exceptions` | `pick_target_exception_list_form` | `06-outbound-setup.md` |
| `Management & Control > Exceptions > Skip History` | `task_skip_board_list_form` | `06-outbound-setup.md` |
| `Warehouse Configuration > Operator Permissions > Operators` | `operator_list_form` | `03-warehouse-structure.md` |

Every form code in this table is traced in the migrations: menu item, then a menu-click event (`ui_event`), then a tab (`tab_items.target_form_id`), then the form (`form_base.code`). Only `Task Board`, `Skip History`, `Users`, `Roles`, `Audit Log`, `Permission Matrix` and `Translations` also have a direct `target_form_id` on the menu row.
Items added after the first baseline (for example `Counts`, `Pick Assignments`, `Handling Unit Registry` and `Board Settings`) use the same navigation pattern.
`Management & Control > Handling Units > Handling Unit Registry` opens the registry list.

![Warehouse sidebar with all top-level sections collapsed](../assets/screens/menu-navigation-collapsed.png)

*Caption: the sidebar immediately after sign-in. `Overview`, `Management & Control` and `Warehouse Configuration` are collapsed.*

![Warehouse sidebar with Management and Control and Shipping expanded](../assets/screens/menu-navigation.png)

*Caption: the warehouse sidebar with `Management & Control > Shipping` expanded. Each deeper level is indented; other branches remain collapsed.*

## 4. Enterprise sidebar (menu 3, "Enterprise Sidebar")

```
Enterprise Overview
Warehouses
Owners
Users & Roles
  Users
  Roles
Permission Matrix
Audit
Shared Handling Unit Types
Translations
Integrations
  Event Registry
  Events
  Subscribers
  Deliveries
  IPaaS
Platform Tools
  Metadata Studio
  RF UI Designer
  RPC Documentation
```

Notes:

- `Enterprise Overview` opens the Enterprise landing page.
- `Users & Roles`, `Integrations` and `Platform Tools` start collapsed, just like groups in the warehouse sidebar.
- `IPaaS` is available under `Integrations`; it is no longer shown in a warehouse sidebar.
- `Metadata Studio`, `RF UI Designer` and `RPC Documentation` are grouped under `Platform Tools`.

| Menu path | Form code |
|---|---|
| `Users & Roles > Users` | `enterprise_users_shell` |
| `Users & Roles > Roles` | `enterprise_role_detail` |
| `Audit` | `enterprise_audit_log` |
| `Permission Matrix` | `enterprise_permission_matrix` |
| `Translations` | `translations_tabbed` |
| `Shared Handling Unit Types` | `handling_unit_type_list_form` |
| `Integrations > Event Registry` | `ent_event_registry_list_form` |
| `Integrations > Events` | `ent_integration_event_list_form` |
| `Integrations > Subscribers` | `ent_integration_subscriber_list_form` |
| `Integrations > Deliveries` | `ent_event_delivery_list_form` |
| `Integrations > IPaaS` | Integration Platform |
| `Platform Tools > Metadata Studio` | Metadata Studio |
| `Platform Tools > RF UI Designer` | RF UI Designer |
| `Platform Tools > RPC Documentation` | RPC method reference |


## 5. Common screen types

| Screen type | What it looks like | Typical buttons |
|---|---|---|
| List | A table with filters, paging (10, 20, 50 or 100 rows) and row selection. | `New`, `Delete`, `Refresh` |
| Card (Normal form) | Fields in a form. | `Save`, `Delete` |
| Tabbed card | A card with several tabs. | `Save`, `Delete` |
| Modal | A pop-up with a short form. | A confirm button and a cancel button. |
| Wizard | A pop-up with steps. | `Back`, `Next`, `Finish` |

Rules that apply everywhere:

- A field marked required in the metadata cannot be left empty.
- A field with a picker (type `PopupValuePicker`) opens a list. Pick one row.
- Lists that show "Version" use optimistic locking. If someone else saved first, you get a conflict message:
  `Someone changed this record after you opened it. Look at the current version and make your change again.`
  Refresh and repeat your change.

The generic message for an empty required field is `<Field name> is required`, for example `Code is required`. The field name comes from the column name with the first letter in capitals and underscores turned into spaces (`web-ui-server/src/extensions/generic/validate_action.rs`, `resolve_required_message`). A form can set its own text per field (`<field>_required`). The message key `validation.required_field` ("Field {0} is required") exists only in the archived migrations. The current product does not use it.
