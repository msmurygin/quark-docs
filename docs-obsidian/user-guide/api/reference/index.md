# API reference index

This reference lists **932** JSON-RPC methods. It is generated from the production OpenRPC catalog (`openrpc.json`). The catalog holds 932 methods.
The catalog is the production catalog. No registered method is hidden: the server routes all 932 methods it registers for discovery.

## How to read a method entry

- **Category** tells you how to call the method safely. `query` only reads. `stateless_command` changes data and needs an idempotency key. `stateful_command` also needs the current version of the row. `not declared` means the catalog gives no command type. See [04-command-types-and-concurrency.md](../04-command-types-and-concurrency.md).
- **Permission** is the RBAC resource the server checks for your role. The roles listed are the default grants. An administrator can change them.
- **Parameters** are the keys inside `params`. A row such as `data.sku_code` is a field inside `data`.
- **Errors** are derived from the category and operation of the method. A handler can return more. The full list of codes is in [05-errors.md](../05-errors.md).
- The text in the Description columns comes from the doc comments in the Rust source. Some are short or technical.
- Placeholders such as `<sku_code>` in examples are not real values. Replace them.

## Counts

| Category | Methods |
|---|---|
| query | 23 |
| query (read method, type not declared) | 438 |
| stateful_command | 124 |
| stateless_command | 173 |
| write method, type not declared | 174 |

"Type not declared" means the method has no `x-quark-command-type` in the catalog. For a read method the reference still shows the category `query`, inferred from the operation. For a write method it shows `not declared`.

## Methods by context

### Enterprise (78)

[enterprise.md](enterprise.md). Users, roles and permissions, user warehouses, API keys, audit log, system settings, supervisor override grants, projects, dashboard settings, handling unit types and the log level switch. These methods work across all warehouses.

| Method | Category | What it does |
|---|---|---|
| [batch_update_role_permissions](enterprise.md#batch_update_role_permissions) | not declared* | Batch-update role_permission cells (Permission Matrix save) |
| [batch_upsert_permission_matrix](enterprise.md#batch_upsert_permission_matrix) | not declared* | Insert-or-update role_permission cells from the Permission Matrix UI |
| [count_audit_log](enterprise.md#count_audit_log) | query* | Count audit_log — CRUD. |
| [count_handling_unit_type](enterprise.md#count_handling_unit_type) | query* | Count handling_unit_type — CRUD. |
| [count_role](enterprise.md#count_role) | query* | Count role — CRUD. |
| [count_role_permission](enterprise.md#count_role_permission) | query* | Count role_permission — CRUD. |
| [count_user](enterprise.md#count_user) | query* | Count user — CRUD. |
| [count_user_api_key](enterprise.md#count_user_api_key) | query* | Count user_api_key — CRUD. |
| [count_user_warehouse](enterprise.md#count_user_warehouse) | query* | Count user_warehouse — CRUD. |
| [create_dashboard_metric_threshold](enterprise.md#create_dashboard_metric_threshold) | stateless_command | Dashboard: a threshold for a metric that has none. |
| [create_handling_unit_type](enterprise.md#create_handling_unit_type) | not declared* | Create a new handling_unit_type — CRUD. |
| [create_project](enterprise.md#create_project) | not declared* | Create a project |
| [create_role](enterprise.md#create_role) | not declared* | Create a new role — CRUD. |
| [create_role_permission](enterprise.md#create_role_permission) | not declared* | Create a new role_permission — CRUD. |
| [create_system_settings](enterprise.md#create_system_settings) | not declared* | Create a new system_settings — CRUD. |
| [create_user](enterprise.md#create_user) | not declared* | Create a new user — CRUD. |
| [create_user_warehouse](enterprise.md#create_user_warehouse) | not declared* | Create a new user_warehouse — CRUD. |
| [dashboard_metric_catalogue](enterprise.md#dashboard_metric_catalogue) | query* | Dashboard: every metric the rail can hold — key, name, live or demo. |
| [dashboard_metric_threshold_delete](enterprise.md#dashboard_metric_threshold_delete) | stateful_command | Dashboard: delete a threshold, on the version read. |
| [dashboard_metric_threshold_get](enterprise.md#dashboard_metric_threshold_get) | query* | Dashboard: one metric threshold, as its card loads it. |
| [dashboard_metric_threshold_list](enterprise.md#dashboard_metric_threshold_list) | query* | Dashboard: the warehouse's metric thresholds. |
| [dashboard_setting_get](enterprise.md#dashboard_setting_get) | query* | Dashboard: the warehouse's board settings card. |
| [dashboard_setting_list](enterprise.md#dashboard_setting_list) | query* | Dashboard: the board settings, as a one-row list. |
| [dashboard_snapshot_rpc](enterprise.md#dashboard_snapshot_rpc) | query* | Dashboard: control-center snapshot |
| [delete_many_role](enterprise.md#delete_many_role) | not declared* | Delete multiple role by IDs — CRUD. |
| [delete_many_role_permission](enterprise.md#delete_many_role_permission) | not declared* | Delete multiple role_permission by IDs — CRUD. |
| [delete_many_user](enterprise.md#delete_many_user) | not declared* | Delete multiple user by IDs — CRUD. |
| [delete_many_user_warehouse](enterprise.md#delete_many_user_warehouse) | not declared* | Delete multiple user_warehouse by IDs — CRUD. |
| [delete_project](enterprise.md#delete_project) | not declared* | Delete a project |
| [delete_role](enterprise.md#delete_role) | not declared* | Delete a role by ID — CRUD. |
| [delete_role_permission](enterprise.md#delete_role_permission) | not declared* | Delete a role_permission by ID — CRUD. |
| [delete_system_settings](enterprise.md#delete_system_settings) | not declared* | Delete a system_settings by ID — CRUD. |
| [delete_user](enterprise.md#delete_user) | not declared* | Delete a user by ID — CRUD. |
| [delete_user_warehouse](enterprise.md#delete_user_warehouse) | not declared* | Delete a user_warehouse by ID — CRUD. |
| [generate_user_api_key](enterprise.md#generate_user_api_key) | not declared* | Generate API key for user; returns plaintext exactly once |
| [get_audit_log](enterprise.md#get_audit_log) | query* | Get a audit_log by ID — CRUD. |
| [get_handling_unit_type](enterprise.md#get_handling_unit_type) | query* | Get a handling_unit_type by ID — CRUD. |
| [get_log_level](enterprise.md#get_log_level) | query* | Read the live log filter directive |
| [get_role](enterprise.md#get_role) | query* | Get a role by ID — CRUD. |
| [get_role_permission](enterprise.md#get_role_permission) | query* | Get a role_permission by ID — CRUD. |
| [get_system_settings](enterprise.md#get_system_settings) | query* | Get a system_settings by ID — CRUD. |
| [get_user](enterprise.md#get_user) | query* | Get a user by ID — CRUD. |
| [get_user_api_key](enterprise.md#get_user_api_key) | query* | Get a user_api_key by ID — CRUD. |
| [get_user_warehouse](enterprise.md#get_user_warehouse) | query* | Get a user_warehouse by ID — CRUD. |
| [get_warehouse_defaults](enterprise.md#get_warehouse_defaults) | query* | Get defaults for the active warehouse |
| [list_audit_event_kinds](enterprise.md#list_audit_event_kinds) | query* | Distinct event_kind values from enterprise.audit_log_view (set-filter feed). |
| [list_audit_log](enterprise.md#list_audit_log) | query* | List audit_log — CRUD. |
| [list_handling_unit_type](enterprise.md#list_handling_unit_type) | query* | List handling_unit_type — CRUD. |
| [list_permission_matrix](enterprise.md#list_permission_matrix) | query* | List permission matrix slice (resources × roles × R/W/D/X bits) |
| [list_projects](enterprise.md#list_projects) | query* | List projects (filtered) |
| [list_role](enterprise.md#list_role) | query* | List role — CRUD. |
| [list_role_permission](enterprise.md#list_role_permission) | query* | List role_permission — CRUD. |
| [list_role_permissions_tree](enterprise.md#list_role_permissions_tree) | query* | Tree view of role_permission rows grouped by resource_type (AG Grid SSRM). |
| [list_system_settings](enterprise.md#list_system_settings) | query* | List system_settings — CRUD. |
| [list_user](enterprise.md#list_user) | query* | List user — CRUD. |
| [list_user_api_key](enterprise.md#list_user_api_key) | query* | List user_api_key — CRUD. |
| [list_user_warehouse](enterprise.md#list_user_warehouse) | query* | List user_warehouse — CRUD. |
| [list_user_warehouses](enterprise.md#list_user_warehouses) | query* | List warehouses accessible by a user (user_id optional → caller's Ctx.user_id by default) |
| [me](enterprise.md#me) | query* | Get current user info |
| [revoke_user_api_key](enterprise.md#revoke_user_api_key) | not declared* | Revoke an API key for its parent user; retries preserve the first revoke time |
| [set_log_level](enterprise.md#set_log_level) | not declared* | Set the live log filter directive |
| [supervisor_override_grant](enterprise.md#supervisor_override_grant) | stateless_command | Mint a supervisor override grant for the pairs a refused command reported. |
| [update_dashboard_metric_threshold](enterprise.md#update_dashboard_metric_threshold) | stateful_command | Dashboard: save a threshold's levels, on the version read. |
| [update_dashboard_setting](enterprise.md#update_dashboard_setting) | stateful_command | Dashboard: save the board settings card, on the version read. |
| [update_handling_unit_type](enterprise.md#update_handling_unit_type) | not declared* | Update a handling unit type; its code is the stable key and cannot change. |
| [update_project](enterprise.md#update_project) | not declared* | Update a project |
| [update_role](enterprise.md#update_role) | not declared* | Update mutable role fields; code is immutable and null is explicit. |
| [update_role_permission](enterprise.md#update_role_permission) | not declared* | Update role-permission grants; null and identity changes are rejected. |
| [update_system_settings](enterprise.md#update_system_settings) | not declared* | Update the value of an editable system setting; metadata is immutable. |
| [update_user](enterprise.md#update_user) | not declared* | Update an account through the guarded security model; audit facts are read-only. |
| [update_user_warehouse](enterprise.md#update_user_warehouse) | not declared* | Update an assignment's role/default marker; null and identity changes are rejected. |
| [warehouse_admin_create](enterprise.md#warehouse_admin_create) | not declared* | Create an inactive warehouse and provision its complete application schema. |
| [warehouse_admin_get](enterprise.md#warehouse_admin_get) | query* | Read one warehouse definition and schema readiness in Enterprise administration. |
| [warehouse_admin_list](enterprise.md#warehouse_admin_list) | query* | List warehouse definitions and actual schema readiness in Enterprise administration. |
| [warehouse_admin_update](enterprise.md#warehouse_admin_update) | not declared* | Rename or change warehouse activity; activation requires current schema migrations. |
| [warehouse_set_shared_tote_mixed_owners](enterprise.md#warehouse_set_shared_tote_mixed_owners) | stateless_command | Set whether goods of several owners may share one station route's tote in the active warehouse. |
| [warehouse_set_station_route_abandoned_after](enterprise.md#warehouse_set_station_route_abandoned_after) | stateless_command | Set after how many minutes with no activity a station route counts as abandoned in the active warehouse. |
| [warehouse_settings_list](enterprise.md#warehouse_settings_list) | query | List the active warehouse with the rules its settings screen sets (one row; an id filter rereads it). |

### Master data (127)

[master_data.md](master_data.md). Reference data: owners, SKUs, locations, put-away zones, packs, barcode formats, code lists and similar set-up records.

| Method | Category | What it does |
|---|---|---|
| [calc_pack_pallet_breakdown](master_data.md#calc_pack_pallet_breakdown) | query* | Calculate pack pallet breakdown (alias of calc_pack_quantity_breakdown) |
| [calc_pack_quantity_breakdown](master_data.md#calc_pack_quantity_breakdown) | query* | Calculate quantity breakdown across pack hierarchy levels |
| [convert_pack_uom](master_data.md#convert_pack_uom) | query* | Convert quantity between UOMs within a pack |
| [count_barcode_format](master_data.md#count_barcode_format) | query* | Count barcode_format — CRUD. |
| [count_barcode_format_detail](master_data.md#count_barcode_format_detail) | query* | Count barcode_format_detail — CRUD. |
| [count_code_list](master_data.md#count_code_list) | query* | Count code_list — CRUD. |
| [count_code_list_value](master_data.md#count_code_list_value) | query* | Count code_list_value — CRUD. |
| [count_loc](master_data.md#count_loc) | query* | Count locations |
| [count_loc_lot_commingle](master_data.md#count_loc_lot_commingle) | query* | Count location lot commingle rules |
| [count_owner](master_data.md#count_owner) | query* | Count owner — CRUD. |
| [count_owner_address](master_data.md#count_owner_address) | query* | Count owner_address — CRUD. |
| [count_owner_bank_account](master_data.md#count_owner_bank_account) | query* | Count owner_bank_account — CRUD. |
| [count_owner_config](master_data.md#count_owner_config) | query* | Count owner_config — CRUD. |
| [count_pack](master_data.md#count_pack) | query* | Count packs |
| [count_putawayzone](master_data.md#count_putawayzone) | query* | Count putawayzone — CRUD. |
| [count_putawayzone_lot_commingle](master_data.md#count_putawayzone_lot_commingle) | query* | Count putawayzone lot commingle rules |
| [count_sku_barcode](master_data.md#count_sku_barcode) | query* | Count sku_barcode — CRUD. |
| [create_barcode_format](master_data.md#create_barcode_format) | not declared* | Create a new barcode_format — CRUD. |
| [create_barcode_format_detail](master_data.md#create_barcode_format_detail) | not declared* | Create a new barcode_format_detail — CRUD. |
| [create_code_list](master_data.md#create_code_list) | not declared* | Create a new code_list — CRUD. |
| [create_code_list_value](master_data.md#create_code_list_value) | not declared* | Create a new code_list_value — CRUD. |
| [create_loc](master_data.md#create_loc) | not declared* | Create a location (auto check-digit) |
| [create_loc_lot_commingle](master_data.md#create_loc_lot_commingle) | not declared* | Create a location lot commingle rule |
| [create_owner](master_data.md#create_owner) | stateless_command | Create an owner master-data root. |
| [create_owner_address](master_data.md#create_owner_address) | not declared* | Create a new owner_address — CRUD. |
| [create_owner_bank_account](master_data.md#create_owner_bank_account) | not declared* | Create a new owner_bank_account — CRUD. |
| [create_owner_config](master_data.md#create_owner_config) | stateless_command | Create the optional configuration owned by one owner. |
| [create_owner_full](master_data.md#create_owner_full) | not declared* | Create owner with addresses and config in one call |
| [create_pack](master_data.md#create_pack) | not declared* | Create a pack (header only) |
| [create_pack_item](master_data.md#create_pack_item) | not declared* | Create a single pack item |
| [create_pack_with_items](master_data.md#create_pack_with_items) | not declared* | Create a pack with child items |
| [create_putawayzone](master_data.md#create_putawayzone) | not declared* | Create a new putawayzone — CRUD. |
| [create_putawayzone_lot_commingle](master_data.md#create_putawayzone_lot_commingle) | not declared* | Create a putawayzone lot commingle rule |
| [create_sku](master_data.md#create_sku) | stateless_command | Create a SKU master-data root after validating its packaging UOM. |
| [create_sku_barcode](master_data.md#create_sku_barcode) | stateless_command | Attach a barcode to one SKU, deriving owner and SKU code from its id. |
| [create_sku_full](master_data.md#create_sku_full) | stateless_command | Create a SKU and optional serial configuration atomically |
| [delete_barcode_format](master_data.md#delete_barcode_format) | not declared* | Delete a barcode_format by ID — CRUD. |
| [delete_barcode_format_detail](master_data.md#delete_barcode_format_detail) | not declared* | Delete a barcode_format_detail by ID — CRUD. |
| [delete_code_list](master_data.md#delete_code_list) | not declared* | Delete a code_list by ID — CRUD. |
| [delete_code_list_value](master_data.md#delete_code_list_value) | not declared* | Delete a code_list_value by ID — CRUD. |
| [delete_loc](master_data.md#delete_loc) | not declared* | Delete a location |
| [delete_loc_lot_commingle](master_data.md#delete_loc_lot_commingle) | not declared* | Delete a location lot commingle rule |
| [delete_many_barcode_format](master_data.md#delete_many_barcode_format) | not declared* | Delete multiple barcode_format by IDs — CRUD. |
| [delete_many_barcode_format_detail](master_data.md#delete_many_barcode_format_detail) | not declared* | Delete multiple barcode_format_detail by IDs — CRUD. |
| [delete_many_code_list](master_data.md#delete_many_code_list) | not declared* | Delete multiple code_list by IDs — CRUD. |
| [delete_many_locs](master_data.md#delete_many_locs) | not declared* | Delete multiple locations by IDs |
| [delete_many_owner_bank_account](master_data.md#delete_many_owner_bank_account) | not declared* | Delete multiple owner_bank_account by IDs — CRUD. |
| [delete_many_sku_barcode](master_data.md#delete_many_sku_barcode) | not declared* | Delete multiple sku_barcode by IDs — CRUD. |
| [delete_owner](master_data.md#delete_owner) | stateless_command | Delete an unreferenced owner and its owned master-data subresources. |
| [delete_owner_address](master_data.md#delete_owner_address) | not declared* | Delete a owner_address by ID — CRUD. |
| [delete_owner_bank_account](master_data.md#delete_owner_bank_account) | not declared* | Delete a owner_bank_account by ID — CRUD. |
| [delete_pack](master_data.md#delete_pack) | not declared* | Delete a pack (header only) |
| [delete_pack_item](master_data.md#delete_pack_item) | not declared* | Delete a pack item |
| [delete_pack_with_items](master_data.md#delete_pack_with_items) | not declared* | Delete a pack with its items |
| [delete_putawayzone](master_data.md#delete_putawayzone) | not declared* | Delete a putawayzone by ID — CRUD. |
| [delete_putawayzone_lot_commingle](master_data.md#delete_putawayzone_lot_commingle) | not declared* | Delete a putawayzone lot commingle rule |
| [delete_sku](master_data.md#delete_sku) | stateless_command | Delete an unreferenced SKU and its owned serial configuration. |
| [delete_sku_barcode](master_data.md#delete_sku_barcode) | not declared* | Delete a sku_barcode by ID — CRUD. |
| [gen_locs](master_data.md#gen_locs) | not declared* | Generate locations from a pattern (bulk create) |
| [generate_check_digit](master_data.md#generate_check_digit) | query* | Compute check digit for a location code |
| [get_barcode_format](master_data.md#get_barcode_format) | query* | Get a barcode_format by ID — CRUD. |
| [get_barcode_format_detail](master_data.md#get_barcode_format_detail) | query* | Get a barcode_format_detail by ID — CRUD. |
| [get_code_list](master_data.md#get_code_list) | query* | Get a code_list by ID — CRUD. |
| [get_code_list_value](master_data.md#get_code_list_value) | query* | Get a code_list_value by ID — CRUD. |
| [get_loc](master_data.md#get_loc) | query* | Get a location by ID |
| [get_loc_by_code](master_data.md#get_loc_by_code) | query* | Get location by code (varchar PK) |
| [get_loc_lot_commingle](master_data.md#get_loc_lot_commingle) | query* | Get a location lot commingle rule by ID |
| [get_next_key](master_data.md#get_next_key) | not declared* | Get next global or scoped counter value |
| [get_owner](master_data.md#get_owner) | query* | Get a owner by ID — CRUD. |
| [get_owner_address](master_data.md#get_owner_address) | query* | Get a owner_address by ID — CRUD. |
| [get_owner_bank_account](master_data.md#get_owner_bank_account) | query* | Get a owner_bank_account by ID — CRUD. |
| [get_owner_config](master_data.md#get_owner_config) | query* | Get a owner_config by ID — CRUD. |
| [get_owner_config_by_owner](master_data.md#get_owner_config_by_owner) | query* | Get owner config by owner ID (1:1 relationship) |
| [get_owner_full](master_data.md#get_owner_full) | query* | Get owner with addresses and config aggregated |
| [get_pack](master_data.md#get_pack) | query* | Get a pack by ID (header only) |
| [get_pack_hierarchy](master_data.md#get_pack_hierarchy) | query* | Get pack items as tree/hierarchy view |
| [get_pack_item](master_data.md#get_pack_item) | query* | Get a pack item by ID |
| [get_pack_with_items](master_data.md#get_pack_with_items) | query* | Get a pack by ID with items |
| [get_putawayzone](master_data.md#get_putawayzone) | query* | Get a putawayzone by ID — CRUD. |
| [get_putawayzone_by_code](master_data.md#get_putawayzone_by_code) | query* | Get putaway zone by code (varchar PK) |
| [get_putawayzone_lot_commingle](master_data.md#get_putawayzone_lot_commingle) | query* | Get a putawayzone lot commingle rule by ID |
| [get_sku](master_data.md#get_sku) | query* | Get a sku by ID — CRUD. |
| [get_sku_audit](master_data.md#get_sku_audit) | query* | Get a sku_audit by ID — CRUD. |
| [get_sku_barcode](master_data.md#get_sku_barcode) | query* | Get a sku_barcode by ID — CRUD. |
| [get_sku_full](master_data.md#get_sku_full) | query* | Get SKU with its optional serial configuration |
| [get_sku_info](master_data.md#get_sku_info) | query* | Get SKU by sku_code + owner_id |
| [list_barcode_format](master_data.md#list_barcode_format) | query* | List barcode_format — CRUD. |
| [list_barcode_format_detail](master_data.md#list_barcode_format_detail) | query* | List barcode_format_detail — CRUD. |
| [list_code_list](master_data.md#list_code_list) | query* | List code_list — CRUD. |
| [list_code_list_value](master_data.md#list_code_list_value) | query* | List code_list_value — CRUD. |
| [list_loc](master_data.md#list_loc) | query* | List locations (filtered) |
| [list_loc_lot_commingle](master_data.md#list_loc_lot_commingle) | query* | List location lot commingle rules (filtered) |
| [list_owner](master_data.md#list_owner) | query* | List owner — CRUD. |
| [list_owner_address](master_data.md#list_owner_address) | query* | List owner_address — CRUD. |
| [list_owner_bank_account](master_data.md#list_owner_bank_account) | query* | List owner_bank_account — CRUD. |
| [list_owner_config](master_data.md#list_owner_config) | query* | List owner_config — CRUD. |
| [list_pack_items](master_data.md#list_pack_items) | query* | List pack items (filtered) |
| [list_packs](master_data.md#list_packs) | query* | List packs (filtered) |
| [list_putawayzone](master_data.md#list_putawayzone) | query* | List putawayzone — CRUD. |
| [list_putawayzone_lot_commingle](master_data.md#list_putawayzone_lot_commingle) | query* | List putawayzone lot commingle rules (filtered) |
| [list_sku](master_data.md#list_sku) | query* | List sku — CRUD. |
| [list_sku_audit](master_data.md#list_sku_audit) | query* | List sku_audit — CRUD. |
| [list_sku_barcode](master_data.md#list_sku_barcode) | query* | List sku_barcode — CRUD. |
| [next_barcode_format_detail_sequence](master_data.md#next_barcode_format_detail_sequence) | query* | Get next sequence value for a barcode format detail |
| [parse_barcode](master_data.md#parse_barcode) | query* | Parse a raw barcode string using a named or ID-referenced format |
| [preview_gen_locs](master_data.md#preview_gen_locs) | query* | Preview generated locations and per-location attributes without creating them |
| [recalculate_pack_hierarchy](master_data.md#recalculate_pack_hierarchy) | not declared* | Recalculate base_qty and hierarchy_level for all items in a pack |
| [search_owners](master_data.md#search_owners) | query* | Substring search of owners (owner_type='Own' only); used by the RCBLIND01 F2 picker |
| [update_barcode_format](master_data.md#update_barcode_format) | not declared* | Update a barcode format with explicit keep, clear and set semantics. |
| [update_barcode_format_detail](master_data.md#update_barcode_format_detail) | not declared* | Update a barcode format detail with explicit keep, clear and set semantics. |
| [update_code_list](master_data.md#update_code_list) | not declared* | Update code-list reference fields; null and identity changes are rejected. |
| [update_code_list_value](master_data.md#update_code_list_value) | not declared* | Update a code-list value with explicit keep, clear and set semantics. |
| [update_loc](master_data.md#update_loc) | not declared* | Update a location; an explicit JSON null or a blank on section clears it back to NULL (its own section). |
| [update_loc_lot_commingle](master_data.md#update_loc_lot_commingle) | not declared* | Update a location lot commingle rule |
| [update_owner](master_data.md#update_owner) | not declared* | Update owner master data with explicit keep, clear and set semantics. |
| [update_owner_address](master_data.md#update_owner_address) | not declared* | Update an owner address without changing its owner identity. |
| [update_owner_bank_account](master_data.md#update_owner_bank_account) | not declared* | Update an owner bank account without changing its owner identity. |
| [update_owner_config](master_data.md#update_owner_config) | not declared* | Update owner configuration with explicit keep, clear and set semantics. |
| [update_owner_full](master_data.md#update_owner_full) | not declared* | Update owner with addresses and config in one call |
| [update_pack](master_data.md#update_pack) | not declared* | Update a pack (header only) |
| [update_pack_item](master_data.md#update_pack_item) | not declared* | Update a pack item |
| [update_pack_with_items](master_data.md#update_pack_with_items) | not declared* | Update a pack with child items |
| [update_putawayzone](master_data.md#update_putawayzone) | not declared* | Update putaway-zone settings without changing its stable code. |
| [update_putawayzone_lot_commingle](master_data.md#update_putawayzone_lot_commingle) | not declared* | Update a putawayzone lot commingle rule |
| [update_sku](master_data.md#update_sku) | not declared* | Update mutable SKU attributes without changing owner or SKU code. |
| [update_sku_barcode](master_data.md#update_sku_barcode) | not declared* | Update a SKU barcode without re-parenting it to another SKU or owner. |
| [update_sku_full](master_data.md#update_sku_full) | not declared* | Update a SKU aggregate atomically |

### Inbound (119)

[inbound.md](inbound.md). Receiving: ASNs and receipts, receipt lines, damage, case-level receiving, receipt policies and lot policies.

| Method | Category | What it does |
|---|---|---|
| [assign_lpn](inbound.md#assign_lpn) | not declared* | Mint N fresh LPN codes from the warehouse container_code sequence (FOR-UPDATE-locked, no collisions) |
| [count_lot_policy](inbound.md#count_lot_policy) | query* | Count lot_policy — CRUD. |
| [count_lot_policy_attribute](inbound.md#count_lot_policy_attribute) | query* | Count lot_policy_attribute — CRUD. |
| [count_receipt](inbound.md#count_receipt) | query* | Count receipt — CRUD. |
| [count_receipt_detail](inbound.md#count_receipt_detail) | query* | Count receipt_detail — CRUD. |
| [count_receipt_detail_damage](inbound.md#count_receipt_detail_damage) | query* | Count receipt_detail_damage — CRUD. |
| [count_receipt_detail_lot_attributes](inbound.md#count_receipt_detail_lot_attributes) | query* | Count receipt_detail_lot_attributes — CRUD. |
| [count_receipt_policy](inbound.md#count_receipt_policy) | query* | Count receipt_policy — CRUD. |
| [create_lot_policy_attribute_form](inbound.md#create_lot_policy_attribute_form) | stateless_command | Add one custom attribute through the metadata form. |
| [create_lot_policy_form](inbound.md#create_lot_policy_form) | stateless_command | Create a lot policy from the metadata form. |
| [create_receipt](inbound.md#create_receipt) | not declared* | Create a new receipt — CRUD. |
| [create_receipt_detail](inbound.md#create_receipt_detail) | not declared* | Add a receipt line atomically while the parent receipt accepts planning changes. |
| [create_receipt_detail_lot_attributes](inbound.md#create_receipt_detail_lot_attributes) | not declared* | Add an expected lot attribute while the parent receipt accepts planning changes. |
| [create_receipt_policy](inbound.md#create_receipt_policy) | stateless_command | Create a complete receipt-policy configuration. |
| [delete_lot_policy](inbound.md#delete_lot_policy) | stateless_command | Delete an unreferenced lot policy and all of its owned attributes. |
| [delete_lot_policy_attribute_form](inbound.md#delete_lot_policy_attribute_form) | stateless_command | Delete one custom attribute through the metadata form. |
| [delete_many_lot_policy](inbound.md#delete_many_lot_policy) | stateless_command | Delete unreferenced lot policies and all of their owned attributes. |
| [delete_many_lot_policy_attribute_form](inbound.md#delete_many_lot_policy_attribute_form) | stateless_command | Delete selected custom attributes through the metadata list. |
| [delete_many_receipt](inbound.md#delete_many_receipt) | not declared* | Delete receipts atomically; refuses the batch when any line has received quantity. |
| [delete_many_receipt_detail](inbound.md#delete_many_receipt_detail) | not declared* | Delete receipt lines atomically after locking and validating every affected parent. |
| [delete_many_receipt_policy](inbound.md#delete_many_receipt_policy) | stateless_command | Delete unreferenced receipt-policy configurations. |
| [delete_receipt](inbound.md#delete_receipt) | not declared* | Delete a receipt atomically; refuses when any line has received quantity. |
| [delete_receipt_detail](inbound.md#delete_receipt_detail) | not declared* | Delete a receipt line — refused once the receipt is Closed, Cancelled or OnHold. |
| [delete_receipt_detail_lot_attributes](inbound.md#delete_receipt_detail_lot_attributes) | not declared* | Delete an expected lot attribute while the parent receipt accepts planning changes. |
| [delete_receipt_policy](inbound.md#delete_receipt_policy) | stateless_command | Delete an unreferenced receipt-policy configuration. |
| [find_planned_case](inbound.md#find_planned_case) | query* | Find a planned case row by label within a case-level receipt |
| [find_printer_for_context](inbound.md#find_printer_for_context) | query* | Resolve a printer for (user, owner, warehouse) via the User→Owner→Warehouse priority chain |
| [find_receipt_by_number](inbound.md#find_receipt_by_number) | query* | Find receipt by receipt_number; optional kind filter |
| [find_receipt_by_rma](inbound.md#find_receipt_by_rma) | query* | Find Customer Return by RMA reference (receipt.rma OR external_receipt_number, scoped to receipt_type=CustomerReturn) |
| [find_receipt_line_by_sku](inbound.md#find_receipt_line_by_sku) | query* | Find receipt_detail by (receipt_id, sku_code) — single row; null if absent |
| [find_unreceived_cases](inbound.md#find_unreceived_cases) | query* | Cases still in Planned status — what's expected but not yet received |
| [get_asn_by_number](inbound.md#get_asn_by_number) | query* | Exact-match resolver for a scanned ASN — single receipt or DocumentNotFound; used by RCASN01 autoSubmit |
| [get_cancel_blockers](inbound.md#get_cancel_blockers) | query* | Reasons CancelReceipt would refuse (D-19): terminal status, non-Pending completion, received qty present |
| [get_case_envelope](inbound.md#get_case_envelope) | query* | Case envelope: resolve a scanned case label to its SKU + lot_policy_attributes for the RCCASE02LINE dynamic lot-attribute prompt |
| [get_case_level_asn_by_number](inbound.md#get_case_level_asn_by_number) | query* | Case-level entry-screen lookup: same shape as get_asn_by_number, errors out when receipt is Aggregate-granularity |
| [get_close_blockers](inbound.md#get_close_blockers) | query* | Reasons CloseReceipt would refuse: terminal status, unresolved serial capture, qty mismatch, pending damage |
| [get_lot_policy](inbound.md#get_lot_policy) | query* | Get a lot_policy by ID — CRUD. |
| [get_lot_policy_attribute](inbound.md#get_lot_policy_attribute) | query* | Get a lot_policy_attribute by ID — CRUD. |
| [get_lot_policy_attribute_form](inbound.md#get_lot_policy_attribute_form) | query | Get one lot-policy attribute with its aggregate version. |
| [get_owner_damage_policy](inbound.md#get_owner_damage_policy) | query* | Damage routing policy for an owner (None/Hold/Reject per severity) |
| [get_receipt](inbound.md#get_receipt) | query* | Get a receipt by ID — CRUD. |
| [get_receipt_audit](inbound.md#get_receipt_audit) | query* | Get a receipt_audit by ID — CRUD. |
| [get_receipt_detail](inbound.md#get_receipt_detail) | query* | Get a receipt_detail by ID — CRUD. |
| [get_receipt_detail_damage](inbound.md#get_receipt_detail_damage) | query* | Get a receipt_detail_damage by ID — CRUD. |
| [get_receipt_detail_history](inbound.md#get_receipt_detail_history) | query* | Per-line history: header audit + matching transaction_log entries (no detail-audit table; this is the closest available) |
| [get_receipt_detail_line](inbound.md#get_receipt_detail_line) | query* | Get one receipt line with its open-serial-capture flag and LPN codes — the line card's read. |
| [get_receipt_detail_lot_attributes](inbound.md#get_receipt_detail_lot_attributes) | query* | Get a receipt_detail_lot_attributes by ID — CRUD. |
| [get_receipt_full](inbound.md#get_receipt_full) | query* | Receipt envelope: header + lines + last audit row in one roundtrip |
| [get_receipt_hold_history](inbound.md#get_receipt_hold_history) | query* | Receipt OnHold history (place/release events) sourced from receipt_audit status field |
| [get_receipt_policy](inbound.md#get_receipt_policy) | query* | Get a receipt_policy by ID — CRUD. |
| [get_receipt_receive_context](inbound.md#get_receipt_receive_context) | query* | One receipt line as the Receive dialog shows it: pack units, lot prompts, offered LPN, over-receipt limits. |
| [get_receipt_summary](inbound.md#get_receipt_summary) | query* | Receipt summary for close confirmation: per-line ordered/received/short/over/damaged + totals + can_close hint |
| [get_sku_envelope](inbound.md#get_sku_envelope) | query* | SKU envelope: sku + serial_config + barcodes for receive-flow round-trip elimination |
| [list_damage_action_codes](inbound.md#list_damage_action_codes) | query* | Active damage action codes (None/Hold/Reject) — code_list_id 1005 |
| [list_damage_severity_codes](inbound.md#list_damage_severity_codes) | query* | Active damage severity codes (Minor/Major/Total) — code_list_id 1006 |
| [list_lot_policy](inbound.md#list_lot_policy) | query* | List lot_policy — CRUD. |
| [list_lot_policy_attribute](inbound.md#list_lot_policy_attribute) | query* | List lot_policy_attribute — CRUD. |
| [list_my_open_receipts](inbound.md#list_my_open_receipts) | query* | List non-terminal receipts created by a user (RF 'my open' landing list) |
| [list_open_blind_receipts](inbound.md#list_open_blind_receipts) | query* | List open NoAsn receipts for the Receive Blind landing screen |
| [list_open_customer_returns](inbound.md#list_open_customer_returns) | query* | List open Customer Returns (CustomerReturn type, NOT Closed/Cancelled) for the RCRTN01 F2 picker |
| [list_qty_adjust_reasons](inbound.md#list_qty_adjust_reasons) | query* | Reasons for adjusting a received qty — code list `qty_adjust_reason` |
| [list_receipt](inbound.md#list_receipt) | query* | List receipt — CRUD. |
| [list_receipt_audit](inbound.md#list_receipt_audit) | query* | List receipt_audit — CRUD. |
| [list_receipt_cases](inbound.md#list_receipt_cases) | query* | List cases on a receipt with optional status / pallet filter |
| [list_receipt_detail](inbound.md#list_receipt_detail) | query* | List receipt_detail — CRUD. |
| [list_receipt_detail_damage](inbound.md#list_receipt_detail_damage) | query* | List receipt_detail_damage — CRUD. |
| [list_receipt_detail_lines](inbound.md#list_receipt_detail_lines) | query* | List receipt lines with their open-serial-capture flag — the receipt screen's read. |
| [list_receipt_detail_lot_attributes](inbound.md#list_receipt_detail_lot_attributes) | query* | List receipt_detail_lot_attributes — CRUD. |
| [list_receipt_policy](inbound.md#list_receipt_policy) | query* | List receipt_policy — CRUD. |
| [list_shortage_reasons](inbound.md#list_shortage_reasons) | query* | Shortage reasons for a short ASN receive — code list `shortage_reason` |
| [lookup_asn](inbound.md#lookup_asn) | query* | Search non-terminal ASN headers by number / external_number; predefined filters for the receive-against-ASN UI |
| [lookup_case_level_asn](inbound.md#lookup_case_level_asn) | query* | lookup_asn restricted to case-level inventory tracking: Pallet or Case (RCCASE01 picker) |
| [lot_policy_config_create](inbound.md#lot_policy_config_create) | stateless_command | Create a complete lot-policy configuration atomically. |
| [lot_policy_config_save](inbound.md#lot_policy_config_save) | stateful_command | Save a complete lot-policy configuration without overwriting a newer edit. |
| [lot_policy_config_template](inbound.md#lot_policy_config_template) | query | The draft a new lot policy starts from. |
| [lot_policy_config_view](inbound.md#lot_policy_config_view) | query | Read a lot policy and all of its custom attributes as one configuration. |
| [pre_validate_adjust_qty](inbound.md#pre_validate_adjust_qty) | query* | Dry-run AdjustQty: terminal-status / negative-qty / picked-qty mismatch checks |
| [pre_validate_cancel](inbound.md#pre_validate_cancel) | query* | Dry-run CancelReceipt — derived from get_cancel_blockers (D-19 rules) |
| [pre_validate_close](inbound.md#pre_validate_close) | query* | Dry-run CloseReceipt — wraps get_close_blockers with the D-21 allow_discrepancy override |
| [pre_validate_put_on_hold](inbound.md#pre_validate_put_on_hold) | query* | Dry-run PutOnHold — refuses on terminal status; surfaces 'already on hold' as a noop hint |
| [pre_validate_receive_against_asn](inbound.md#pre_validate_receive_against_asn) | query* | Dry-run ReceiveAgainstAsn: receipt status / qty &gt; 0 / temperature / pack-multiple / dates / serials / lot attrs vs expected / hold condi… |
| [pre_validate_receive_blind_line](inbound.md#pre_validate_receive_blind_line) | query* | Dry-run ReceiveBlindLine: receipt status / qty / SKU + owner / pipeline (no expected lot attrs comparison) |
| [pre_validate_receive_case_level](inbound.md#pre_validate_receive_case_level) | query* | Dry-run ReceiveCaseLevelLine: receipt status / case status / unplanned-policy / SKU presence |
| [pre_validate_receive_return](inbound.md#pre_validate_receive_return) | query* | Dry-run ReceiveReturn: qty / SKU lookup / pipeline (Resaleable+NeedsRefurb only) — Damaged/Discard skip pipeline |
| [pre_validate_report_damage](inbound.md#pre_validate_report_damage) | query* | Dry-run ReportDamage: terminal-status / non-positive qty / damage exceeds unallocated received qty |
| [receipt_adjust_received_qty](inbound.md#receipt_adjust_received_qty) | stateful_command | Adjust a previously received qty (delta + reason). |
| [receipt_cancel](inbound.md#receipt_cancel) | stateful_command | Cancel a receipt (D-19, completion=Pending only). |
| [receipt_cancel_planned_case](inbound.md#receipt_cancel_planned_case) | stateless_command | Cancel a planned case before it is received (D-69e SameReceipt). |
| [receipt_close](inbound.md#receipt_close) | stateful_command | Close a receipt with optional discrepancy override (D-21). |
| [receipt_create_case_level_asn](inbound.md#receipt_create_case_level_asn) | stateless_command | Load a case-level ASN (D-69, ADR-046). |
| [receipt_damage_context](inbound.md#receipt_damage_context) | query | What a damage report on one receipt line is about: the line number, the SKU and its description, the receipt number, the line's unit, how m… |
| [receipt_damage_destination](inbound.md#receipt_damage_destination) | query | Where a damage report of this severity sends the goods: whether the destination field is shown at all (only Major → QC and Total → Damage m… |
| [receipt_damage_photo_upload_url](inbound.md#receipt_damage_photo_upload_url) | query | Ask for a presigned PUT link to upload one damage photo, for a receipt line. |
| [receipt_damage_photo_view_urls](inbound.md#receipt_damage_photo_view_urls) | query | Presigned GET links for the photos already stored on one damage record. |
| [receipt_damage_vocabulary](inbound.md#receipt_damage_vocabulary) | query | What a damage report may say: with no severity, the four severities the `damage_severity` column accepts; with one, the `damage_reason` val… |
| [receipt_kpi_aggregate](inbound.md#receipt_kpi_aggregate) | query* | Aggregate receipt KPI metrics from integration_event (Spec 5.5.4). |
| [receipt_move_damage_to_rtv](inbound.md#receipt_move_damage_to_rtv) | stateless_command | Move a damaged LPN to RTV staging — triggers MoveCommand(MoveToRtv), sets disposition='RTV', publishes damage.disposition_decided + damage.… |
| [receipt_put_on_hold](inbound.md#receipt_put_on_hold) | stateless_command | Put a receipt on hold (cascades to non-terminal details). |
| [receipt_receive_against_asn](inbound.md#receipt_receive_against_asn) | stateless_command | Receive against an existing ASN line (D-22). |
| [receipt_receive_blind](inbound.md#receipt_receive_blind) | stateless_command | Open a fully blind receipt + first line. |
| [receipt_receive_blind_line](inbound.md#receipt_receive_blind_line) | stateless_command | Receive a blind SKU line on an existing receipt. |
| [receipt_receive_case_level_line](inbound.md#receipt_receive_case_level_line) | stateless_command | Commit one case-level scan (planned or unplanned). |
| [receipt_receive_return](inbound.md#receipt_receive_return) | stateless_command | Receive a customer return (RMA flow). |
| [receipt_receive_return_line](inbound.md#receipt_receive_return_line) | stateless_command | Receive an additional line on an existing Customer Return (multi-line F3). |
| [receipt_release_from_hold](inbound.md#receipt_release_from_hold) | stateless_command | Release a receipt from hold. |
| [receipt_replace_pallet](inbound.md#receipt_replace_pallet) | stateless_command | Regroup all/some Planned cases onto another pallet; received stock requires an inventory move (D-69d). |
| [receipt_report_damage](inbound.md#receipt_report_damage) | stateless_command | Report damage on a receipt detail (D-26). |
| [receipt_set_damage_disposition](inbound.md#receipt_set_damage_disposition) | stateful_command | Set damage disposition marker (Repurpose \| Destroyed) — no physical effect, just records the decision + publishes damage.disposition_decide… |
| [receipt_write_off_damage](inbound.md#receipt_write_off_damage) | stateless_command | Write off a damage record — decrements inventory, releases Damaged hold, sets disposition='WrittenOff', publishes damage.disposition_decide… |
| [search_asns](inbound.md#search_asns) | query* | Substring search of non-terminal ASN headers (alias for lookup_asn; used by RCASN01 F2 picker) |
| [search_open_lpns](inbound.md#search_open_lpns) | query | Plates a receive may be sent to, by code substring — the Receive dialog's LPN picker. |
| [update_lot_policy_attribute_form](inbound.md#update_lot_policy_attribute_form) | stateful_command | Update one custom lot-policy attribute through the metadata form. |
| [update_lot_policy_form](inbound.md#update_lot_policy_form) | stateful_command | Update lot-policy settings from the metadata form. |
| [update_receipt](inbound.md#update_receipt) | not declared* | Update the reference data on a receipt — refused once it is Closed or Cancelled. |
| [update_receipt_detail](inbound.md#update_receipt_detail) | not declared* | Update the reference data on a receipt line — refused once the receipt is Closed or Cancelled. |
| [update_receipt_detail_lot_attributes](inbound.md#update_receipt_detail_lot_attributes) | not declared* | Update an expected lot value without moving the row to another attribute. |
| [update_receipt_policy](inbound.md#update_receipt_policy) | stateful_command | Update a receipt policy without overwriting a newer configuration. |
| [validate_lpn_unused](inbound.md#validate_lpn_unused) | query* | Check if an LPN code is free to assign (no live inventory under that container) |
| [validate_pallet_unique](inbound.md#validate_pallet_unique) | query* | Check if a pallet LPN is unique enough to assign on a given receipt |

### Inventory (161)

[inventory.md](inventory.md). Stock: moves, put-away and put-away policies, holds, serial numbers, adjustments, counts, the transaction log, lot lookup and barcode scan reading.

| Method | Category | What it does |
|---|---|---|
| [barcode_scan_parse](inventory.md#barcode_scan_parse) | query | Read one scan with the auto-detected barcode formats: the format that claimed it and its normalized values (GTIN, LPN, serial, internal lot… |
| [cancel_episode](inventory.md#cancel_episode) | stateless_command | Operator-explicit episode cancellation. |
| [capture_serial](inventory.md#capture_serial) | stateless_command | Capture one serial during a receipt-line collection loop. |
| [count_inventory_balance_serial](inventory.md#count_inventory_balance_serial) | query* | Count inventory_balance_serial — CRUD. |
| [count_inventory_hold_code](inventory.md#count_inventory_hold_code) | query* | Count inventory_hold_code — CRUD. |
| [count_inventory_pending_move_in](inventory.md#count_inventory_pending_move_in) | query* | Count inventory_pending_move_in — CRUD. |
| [count_putaway_policy](inventory.md#count_putaway_policy) | query* | Count putaway_policy — CRUD. |
| [count_putaway_policy_detail](inventory.md#count_putaway_policy_detail) | query* | Count putaway_policy_detail — CRUD. |
| [count_putaway_step_criterion](inventory.md#count_putaway_step_criterion) | query* | Count putaway_step_criterion — CRUD. |
| [count_sku_pick_location](inventory.md#count_sku_pick_location) | query* | Count the pick locations of SKUs. |
| [count_sku_serial_config](inventory.md#count_sku_serial_config) | query* | Count sku_serial_config — CRUD. |
| [count_transaction_log](inventory.md#count_transaction_log) | query* | Count transaction_log — CRUD. |
| [create_inventory_adjustment](inventory.md#create_inventory_adjustment) | stateless_command | Create a Draft inventory adjustment from its header form (reason, comment). |
| [create_inventory_adjustment_line](inventory.md#create_inventory_adjustment_line) | stateless_command | Add a line from the line form: owner, SKU, lot, location, container picked or typed. |
| [create_inventory_count](inventory.md#create_inventory_count) | stateless_command | Open a count from its header form: kind, mode, recounts, a comment — no location yet. |
| [create_inventory_count_policy](inventory.md#create_inventory_count_policy) | stateless_command | Create a cycle-count policy from its form. |
| [create_inventory_hold](inventory.md#create_inventory_hold) | stateless_command | Create an inventory hold scoped to a lot, location, or container (LPN). |
| [create_inventory_hold_code](inventory.md#create_inventory_hold_code) | not declared* | Create a new inventory_hold_code — CRUD. |
| [create_inventory_hold_row](inventory.md#create_inventory_hold_row) | not declared* | Create an inventory hold from the Holds form (CRUD shape; system fields filled by HoldService). |
| [create_lot_transfer](inventory.md#create_lot_transfer) | stateless_command | Create a Draft lot transfer from its header form (number as New drew it, comment). |
| [create_lot_transfer_line](inventory.md#create_lot_transfer_line) | stateless_command | Add a line from the line form: the document and the stock row picked, a quantity, serials. |
| [create_putaway_policy](inventory.md#create_putaway_policy) | stateless_command | Create a putaway policy whose steps are owned by the putaway pipeline. |
| [create_sku_pick_location](inventory.md#create_sku_pick_location) | stateless_command | Assign a pick location to a SKU: a Pick, SpeedPick or Case location, in a unit of the SKU's pack. |
| [create_sku_serial_config](inventory.md#create_sku_serial_config) | stateless_command | Create the optional serial-tracking configuration owned by one SKU. |
| [delete_inventory_hold_code](inventory.md#delete_inventory_hold_code) | not declared* | Delete a inventory_hold_code by ID — CRUD. |
| [delete_many_inventory_hold_code](inventory.md#delete_many_inventory_hold_code) | not declared* | Delete multiple inventory_hold_code by IDs — CRUD. |
| [delete_many_putaway_policy](inventory.md#delete_many_putaway_policy) | stateless_command | Delete unreferenced putaway policies and their owned steps and criteria. |
| [delete_putaway_policy](inventory.md#delete_putaway_policy) | stateless_command | Delete an unreferenced putaway policy and all of its owned steps and criteria. |
| [delete_sku_pick_location](inventory.md#delete_sku_pick_location) | stateless_command | Unassign a pick location from a SKU; refused while the location holds the SKU. |
| [force_close_episode](inventory.md#force_close_episode) | stateless_command | Supervisor force-close of an episode that's stuck or abandoned. |
| [generate_lpn](inventory.md#generate_lpn) | stateless_command | Generate a fresh LPN container code (LPN + zero-padded sequence) for the Hard-Move New-LPN preview. |
| [get_inventory_adjustment_line](inventory.md#get_inventory_adjustment_line) | query* | Get one adjustment line as its form shows it (owner and container by code). |
| [get_inventory_balance_serial](inventory.md#get_inventory_balance_serial) | query* | Get a inventory_balance_serial by ID — CRUD. |
| [get_inventory_hold_code](inventory.md#get_inventory_hold_code) | query* | Get a inventory_hold_code by ID — CRUD. |
| [get_lot_transfer_line](inventory.md#get_lot_transfer_line) | query* | Get one lot transfer line as its form shows it (owner and container by code, quantity free now, serials). |
| [get_putaway_policy](inventory.md#get_putaway_policy) | query* | Get a putaway_policy by ID — CRUD. |
| [get_putaway_policy_detail](inventory.md#get_putaway_policy_detail) | query* | Get a putaway_policy_detail by ID — CRUD. |
| [get_putaway_step_criterion](inventory.md#get_putaway_step_criterion) | query* | Get a putaway_step_criterion by ID — CRUD. |
| [get_sku_pick_location](inventory.md#get_sku_pick_location) | query* | Get one pick location of a SKU. |
| [get_sku_serial_config](inventory.md#get_sku_serial_config) | query* | Get a sku_serial_config by ID — CRUD. |
| [get_sku_serial_config_by_sku](inventory.md#get_sku_serial_config_by_sku) | query* | Get SKU serial config by SKU ID (1:1 relationship) |
| [get_transaction_log](inventory.md#get_transaction_log) | query* | Get a transaction_log by ID — CRUD. |
| [handling_unit_register](inventory.md#handling_unit_register) | stateless_command | Register N handling units of one type at a location and print their labels once. |
| [inventory_adjust_reason_list](inventory.md#inventory_adjust_reason_list) | query* | List the inventory adjustment reasons with their policy, retired ones too (or the one an id names). |
| [inventory_adjust_reason_set_count](inventory.md#inventory_adjust_reason_set_count) | stateless_command | Set whether posting an adjustment with this reason counts the locations it changed. |
| [inventory_adjustment_add_line](inventory.md#inventory_adjustment_add_line) | stateless_command | Add one line from flat fields (container by code; pack and unit default to the SKU's). |
| [inventory_adjustment_add_lines](inventory.md#inventory_adjustment_add_lines) | stateless_command | Add lines (identity + target quantity) to an unposted adjustment. |
| [inventory_adjustment_approve](inventory.md#inventory_adjustment_approve) | stateful_command | Approve a validated adjustment whose reason requires approval. |
| [inventory_adjustment_card_get](inventory.md#inventory_adjustment_card_get) | query* | Get one inventory adjustment's header, flat, with whether it needs approval. |
| [inventory_adjustment_create](inventory.md#inventory_adjustment_create) | stateless_command | Create a Draft inventory adjustment, optionally with its lines. |
| [inventory_adjustment_delete](inventory.md#inventory_adjustment_delete) | stateful_command | Delete an adjustment that was never posted, with its lines. |
| [inventory_adjustment_generate_lines](inventory.md#inventory_adjustment_generate_lines) | stateless_command | Add a line, target = current quantity, for every stock row a filter names. |
| [inventory_adjustment_get](inventory.md#inventory_adjustment_get) | query* | Get one inventory adjustment with its lines. |
| [inventory_adjustment_line_preview_list](inventory.md#inventory_adjustment_line_preview_list) | query* | List adjustment lines with the live current/effect forecast or the posted effect. |
| [inventory_adjustment_list](inventory.md#inventory_adjustment_list) | query* | List inventory adjustments, filtered like any list (by status, reason, number). |
| [inventory_adjustment_list_lines](inventory.md#inventory_adjustment_list_lines) | query* | List adjustment lines, filtered like any list (by adjustment, status, SKU). |
| [inventory_adjustment_post](inventory.md#inventory_adjustment_post) | stateful_command | Post the adjustment: set every line's stock to its target, all or nothing. |
| [inventory_adjustment_remove_line](inventory.md#inventory_adjustment_remove_line) | stateful_command | Remove one line from an unposted adjustment. |
| [inventory_adjustment_reverse](inventory.md#inventory_adjustment_reverse) | stateless_command | Make a Draft that sets a posted adjustment's stock back (target = ledger before). |
| [inventory_adjustment_update_line](inventory.md#inventory_adjustment_update_line) | stateful_command | Change one line's target quantity, reason or comment. |
| [inventory_adjustment_validate](inventory.md#inventory_adjustment_validate) | stateless_command | Judge every line without changing stock; Validated when all pass. |
| [inventory_count_accept](inventory.md#inventory_count_accept) | stateful_command | Accept a location's variance with its cause: post an adjustment to what was counted. |
| [inventory_count_add_locations](inventory.md#inventory_count_add_locations) | stateless_command | Add locations to an open count — by code, or every countable one of zones: freeze and snapshot them. |
| [inventory_count_cancel](inventory.md#inventory_count_cancel) | stateful_command | Cancel a count: its live locations thaw, nothing is adjusted. |
| [inventory_count_card_get](inventory.md#inventory_count_card_get) | query* | Get one inventory count flat, with its locations and where its tasks stand. |
| [inventory_count_complete](inventory.md#inventory_count_complete) | stateless_command | Finish counting a location: compare with its snapshot; close it or leave a variance. |
| [inventory_count_confirm_empty](inventory.md#inventory_count_confirm_empty) | stateless_command | Confirm the location being counted holds nothing. |
| [inventory_count_create](inventory.md#inventory_count_create) | stateless_command | Start a selective count of locations: freeze them and snapshot their stock. |
| [inventory_count_delete](inventory.md#inventory_count_delete) | stateful_command | Delete a count nothing was counted in; its locations thaw. |
| [inventory_count_get](inventory.md#inventory_count_get) | query* | Get one inventory count with its tasks. |
| [inventory_count_list](inventory.md#inventory_count_list) | query* | List inventory counts, filtered like any list (by status, number). |
| [inventory_count_list_tasks](inventory.md#inventory_count_list_tasks) | query* | List count tasks with what each count found (by count, location, status). |
| [inventory_count_location_results](inventory.md#inventory_count_location_results) | query* | Every result line of a counted location — all attempts: lot and its attributes, LPN, expected, counted, difference, adjustment. |
| [inventory_count_location_serials](inventory.md#inventory_count_location_serials) | query* | Every serial a count of the location judged — all attempts: serial, SKU, lot, LPN, outcome (Found, Missing, Relocated, Registered), where t… |
| [inventory_count_observe](inventory.md#inventory_count_observe) | stateless_command | Record stock found in the location being counted (SKU, lot, quantity). |
| [inventory_count_policy_create](inventory.md#inventory_count_policy_create) | stateless_command | Create a cycle-count policy: which locations, how often, how many a run. |
| [inventory_count_policy_delete](inventory.md#inventory_count_policy_delete) | stateful_command | Delete a cycle-count policy, on the version read; the counts it made stay. |
| [inventory_count_policy_get](inventory.md#inventory_count_policy_get) | query* | Get one cycle-count policy, flat, as its card loads it. |
| [inventory_count_policy_list](inventory.md#inventory_count_policy_list) | query* | List cycle-count policies (by code, active). |
| [inventory_count_policy_run](inventory.md#inventory_count_policy_run) | stateless_command | Run a cycle-count policy now: start a count of the locations it finds due. |
| [inventory_count_policy_save](inventory.md#inventory_count_policy_save) | stateful_command | Change a cycle-count policy, on the version read. |
| [inventory_count_recount](inventory.md#inventory_count_recount) | stateful_command | Have a location with a variance counted again, as a new attempt. |
| [inventory_count_remove_location](inventory.md#inventory_count_remove_location) | stateful_command | Take a location nobody counted off a count; it thaws. |
| [inventory_count_task_at_location](inventory.md#inventory_count_task_at_location) | stateless_command | The counter is at the location given to them: scanning it starts (or resumes) its count. |
| [inventory_count_task_card_get](inventory.md#inventory_count_task_card_get) | query* | Get one count task flat: location, attempt, status, how many lines differ, whether a recount is allowed. |
| [inventory_count_task_get](inventory.md#inventory_count_task_get) | query* | One location's count; a blind count hides the system quantity until counted. |
| [inventory_count_task_leave](inventory.md#inventory_count_task_leave) | stateless_command | Leave the location being counted for later: it goes back to the pool. |
| [inventory_count_task_take_next](inventory.md#inventory_count_task_take_next) | stateless_command | Give the counter their next location to count: in the work area named, or across the areas they may count in. |
| [inventory_count_tolerance_get](inventory.md#inventory_count_tolerance_get) | query* | Count variance tolerances: one class's, as its card loads it. |
| [inventory_count_tolerance_list](inventory.md#inventory_count_tolerance_list) | query* | Count variance tolerances: every SKU ABC class's, A to C. |
| [inventory_count_void_observation](inventory.md#inventory_count_void_observation) | stateless_command | Take back one recorded entry of the location being counted. |
| [list_active_holds_by_lpn](inventory.md#list_active_holds_by_lpn) | query* | List active inventory holds attached to an LPN; optional `code` filter narrows by hold-type. |
| [list_force_close_candidates](inventory.md#list_force_close_candidates) | query* | List every unresolved Receive or Pick serial-capture episode in the warehouse — Open / InProgress / AwaitingConfirmation / Abandoned. |
| [list_handling_unit](inventory.md#list_handling_unit) | query* | List registered handling units, filtered like any list (by type, status, location). |
| [list_inventory_balance_serial](inventory.md#list_inventory_balance_serial) | query* | List inventory_balance_serial — CRUD. |
| [list_inventory_hold_code](inventory.md#list_inventory_hold_code) | query* | List inventory_hold_code — CRUD. |
| [list_inventory_pending_move_in](inventory.md#list_inventory_pending_move_in) | query* | List inventory_pending_move_in — CRUD. |
| [list_open_episodes_for_operator](inventory.md#list_open_episodes_for_operator) | query* | List the calling operator's own still-open serial-capture episodes (Open / InProgress / AwaitingConfirmation). |
| [list_open_episodes_for_receipt](inventory.md#list_open_episodes_for_receipt) | query* | List Open / InProgress / AwaitingConfirmation serial-capture episodes attached to any detail of a receipt. |
| [list_putaway_policy](inventory.md#list_putaway_policy) | query* | List putaway_policy — CRUD. |
| [list_putaway_policy_detail](inventory.md#list_putaway_policy_detail) | query* | List putaway_policy_detail — CRUD. |
| [list_putaway_step_criterion](inventory.md#list_putaway_step_criterion) | query* | List putaway_step_criterion — CRUD. |
| [list_sku_pick_location](inventory.md#list_sku_pick_location) | query* | List the pick locations of SKUs, with the SKU's owner and the location's zone and route. |
| [list_sku_serial_config](inventory.md#list_sku_serial_config) | query* | List sku_serial_config — CRUD. |
| [list_transaction_log](inventory.md#list_transaction_log) | query* | List transaction_log — CRUD. |
| [location_checks](inventory.md#location_checks) | query* | Every check of a location, the latest first: its counts and every answer to "is it empty?" — when, who, what it came to, which operation as… |
| [location_confirm_empty](inventory.md#location_confirm_empty) | stateless_command | Answer whether a location is empty, where an operation asked: kept as evidence; an answer the stock contradicts asks for a count. |
| [location_report_unexpected](inventory.md#location_report_unexpected) | stateless_command | Report stock the system does not show at a location: kept as evidence, and the location is counted. |
| [lot_attribute_template](inventory.md#lot_attribute_template) | query* | What a SKU's lot policy asks for: prompts to search a lot by and to create one with. |
| [lot_create_by_attributes](inventory.md#lot_create_by_attributes) | stateless_command | A lot of these attributes, made as the SKU's lot policy says: the matching one or a new one (reuse), always a new one (per receipt, per rec… |
| [lot_search_by_attributes](inventory.md#lot_search_by_attributes) | query* | A SKU's lots matching the attributes and the receipt given, each with its receipts (no quantities); creates nothing. |
| [lot_transfer_add_line](inventory.md#lot_transfer_add_line) | stateless_command | Add a line for a stock row (default: everything free of it), with its serials if tracked. |
| [lot_transfer_card_get](inventory.md#lot_transfer_card_get) | query* | Get one lot transfer's header, flat, with its line count and whether Post is accepted. |
| [lot_transfer_create](inventory.md#lot_transfer_create) | stateless_command | Create a Draft lot transfer (its number is drawn unless one is given). |
| [lot_transfer_delete](inventory.md#lot_transfer_delete) | stateful_command | Delete a lot transfer that was never posted, with its lines. |
| [lot_transfer_line_attribute_list](inventory.md#lot_transfer_line_attribute_list) | query* | List the lot attributes lines give their stock, filtered by line, with the grid key and line version. |
| [lot_transfer_line_list](inventory.md#lot_transfer_line_list) | query* | List lot transfer lines with the owner, container and SKU names, filtered and sorted like any list (by document, LPN, owner). |
| [lot_transfer_list](inventory.md#lot_transfer_list) | query* | List lot transfers with the poster's name, filtered and sorted like any list (by status, number, poster). |
| [lot_transfer_post](inventory.md#lot_transfer_post) | stateful_command | Post the transfer: move every line's stock into its new lot, all or nothing. |
| [lot_transfer_remove_line](inventory.md#lot_transfer_remove_line) | stateful_command | Remove one line from a Draft lot transfer, on the line version read. |
| [lot_transfer_set_line_attributes](inventory.md#lot_transfer_set_line_attributes) | stateful_command | Set the lot attributes a line's stock is given, on the line version read. |
| [lot_transfer_update_header](inventory.md#lot_transfer_update_header) | stateful_command | Change a Draft lot transfer's comment, on the header version read. |
| [lot_transfer_update_line](inventory.md#lot_transfer_update_line) | stateful_command | Change one line's quantity (and serials), on the line version read. |
| [move_execute](inventory.md#move_execute) | stateless_command | Generic Move primitive — validates and executes inventory movement (Putaway, Pick, MoveToQc, MoveToDamage, MoveToRtv, ReleaseFromQc, etc.)… |
| [move_source_holds](inventory.md#move_source_holds) | query* | The holds on a move's source, sorted by what can be done about them: `overridable` codes a supervisor can lift for this move, `blocking` co… |
| [print_lpn_label](inventory.md#print_lpn_label) | stateless_command | Print the LPN-ID label (ZPL) for a container to the operator's resolved printer. |
| [putaway_criterion_vocabulary](inventory.md#putaway_criterion_vocabulary) | query | The values a putaway criterion may take: its properties, their attributes, and the values of one. |
| [putaway_dry_run](inventory.md#putaway_dry_run) | query | What the putaway engine would do with one LPN under one policy, in words: the pallet, which step wins and where it would go, and every step… |
| [putaway_explain_location](inventory.md#putaway_explain_location) | query | Ask the putaway engine which location it would choose for a received LPN, without reserving anything. |
| [putaway_pipeline_view](inventory.md#putaway_pipeline_view) | query | Read one putaway policy's step pipeline with its criteria, its readback, its refusals and its never-runs marks. |
| [putaway_release_reservation](inventory.md#putaway_release_reservation) | stateless_command | Release a pending putaway reservation, freeing the location before its TTL expires. |
| [putaway_step_add](inventory.md#putaway_step_add) | stateless_command | Add an empty step at the end of one putaway policy's pipeline; the system numbers it. |
| [putaway_step_delete](inventory.md#putaway_step_delete) | stateful_command | Delete one putaway step, against the version it was read at; its conditions go with it. |
| [putaway_steps_reorder](inventory.md#putaway_steps_reorder) | stateful_command | Reorder one putaway policy's steps, against the policy's version. |
| [putaway_steps_save](inventory.md#putaway_steps_save) | stateful_command | Write every edited putaway step of one policy, each against its own version, with its conditions. |
| [putaway_suggest_location](inventory.md#putaway_suggest_location) | stateless_command | Suggest and reserve the location a received LPN should be put away into. |
| [release_inventory_hold](inventory.md#release_inventory_hold) | stateless_command | Release an inventory hold by id. |
| [remove_captured_serial](inventory.md#remove_captured_serial) | stateless_command | Drop one wrongly-captured serial from an open episode. |
| [replenishment_cancel](inventory.md#replenishment_cancel) | stateful_command | Call an open replenishment off on the version read; its task leaves the pool. |
| [replenishment_confirm](inventory.md#replenishment_confirm) | stateless_command | The operator brought a replenishment: the stock moves into the pick location and the task closes (short with a reason). |
| [replenishment_count](inventory.md#replenishment_count) | query* | Count replenishments. |
| [replenishment_get](inventory.md#replenishment_get) | query* | Get one replenishment. |
| [replenishment_list](inventory.md#replenishment_list) | query* | List replenishments, filtered like any list (by status, pick location, SKU). |
| [replenishment_plan](inventory.md#replenishment_plan) | stateless_command | Replenish now: every pick location at or below its minimum gets what it lacks from storage, as Replenish tasks. |
| [replenishment_take_next](inventory.md#replenishment_take_next) | stateless_command | Give the operator their next replenishment: the one in hand first, else one from the pool of their areas. |
| [serial_dispose](inventory.md#serial_dispose) | stateless_command | Dispose a damaged or returned serial (terminal). |
| [serial_move](inventory.md#serial_move) | stateless_command | Move an Active or Held serial to a new location/container. |
| [serial_pick](inventory.md#serial_pick) | stateless_command | Pick a reserved serial onto a pick task (Reserved → Picked). |
| [serial_reserve](inventory.md#serial_reserve) | stateless_command | Reserve a serial for an allocation (Active → Reserved). |
| [serial_return](inventory.md#serial_return) | stateless_command | Return a previously shipped serial via RMA receipt (Shipped → Returned). |
| [serial_ship](inventory.md#serial_ship) | stateless_command | Ship a picked serial to a customer (Picked → Shipped, clears location). |
| [update_inventory_adjustment](inventory.md#update_inventory_adjustment) | stateful_command | Save an adjustment's header form: reason and comment, on the version read. |
| [update_inventory_adjustment_line](inventory.md#update_inventory_adjustment_line) | stateful_command | Save a line form: target, reason, comment, on the line's version read. |
| [update_inventory_count_policy](inventory.md#update_inventory_count_policy) | stateful_command | Save a cycle-count policy's form, on the version read. |
| [update_inventory_count_tolerance](inventory.md#update_inventory_count_tolerance) | stateful_command | Count variance tolerances: save a class's card, on the version read. |
| [update_inventory_hold_code](inventory.md#update_inventory_hold_code) | not declared* | Update hold-code behavior without changing its stable code. |
| [update_lot_transfer](inventory.md#update_lot_transfer) | stateful_command | Save a lot transfer's header form: the comment, on the version read. |
| [update_lot_transfer_line](inventory.md#update_lot_transfer_line) | stateful_command | Save a line form: quantity and serials, on the line's version read. |
| [update_putaway_policy](inventory.md#update_putaway_policy) | stateful_command | Update a putaway policy header without overwriting a newer edit. |
| [update_sku_pick_location](inventory.md#update_sku_pick_location) | stateful_command | Edit a pick location of a SKU on the version read. |
| [update_sku_serial_config](inventory.md#update_sku_serial_config) | not declared* | Update serial-tracking settings without changing their SKU identity. |

### Outbound (263)

[outbound.md](outbound.md). Shipping: shipment orders, allocation, waves, picking, packing, cartonization and replenishment policies.

| Method | Category | What it does |
|---|---|---|
| [allocation_pipeline_view](outbound.md#allocation_pipeline_view) | query | Read one allocation policy's step pipeline — its readback, its skip reasons and its closed steps — optionally narrated over the drafts the… |
| [allocation_policy_clone](outbound.md#allocation_policy_clone) | stateless_command | Clone any allocation policy and all its steps into a new draft. |
| [allocation_policy_deactivate](outbound.md#allocation_policy_deactivate) | stateful_command | Retire a published allocation policy without making it editable again. |
| [allocation_policy_publish](outbound.md#allocation_policy_publish) | stateful_command | Publish a valid allocation-policy draft and make it executable. |
| [allocation_policy_validate](outbound.md#allocation_policy_validate) | query | Validate an allocation-policy draft and return every publication blocker. |
| [allocation_step_add](outbound.md#allocation_step_add) | stateless_command | Add an empty step at the end of one allocation policy's pipeline; the system numbers it. |
| [allocation_step_delete](outbound.md#allocation_step_delete) | stateful_command | Delete one allocation step, against the version it was read at. |
| [allocation_steps_reorder](outbound.md#allocation_steps_reorder) | stateful_command | Reorder one allocation policy's steps, against the policy's version. |
| [allocation_steps_save](outbound.md#allocation_steps_save) | stateful_command | Write every edited step of one allocation policy, each against its own version. |
| [cartonization_exception_list](outbound.md#cartonization_exception_list) | query* | List pick target execution exceptions (box full) for the supervisor, newest first. |
| [cartonization_exception_retry](outbound.md#cartonization_exception_retry) | stateless_command | Retry the repair of a box-full exception that waits for recovery, as a supervisor. |
| [cartonization_policy_create](outbound.md#cartonization_policy_create) | stateless_command | Create a cartonization policy and its ordered cartons atomically. |
| [cartonization_policy_save](outbound.md#cartonization_policy_save) | stateful_command | Replace a cartonization policy and its ordered cartons atomically. |
| [cartonization_policy_template](outbound.md#cartonization_policy_template) | query | The draft a new cartonization policy starts from. |
| [cartonization_policy_view](outbound.md#cartonization_policy_view) | query | Read the complete cartonization policy in solver order. |
| [confirm_shipment](outbound.md#confirm_shipment) | stateful_command | Irreversible complete-Load Goods Issue: atomic stock, serials, Orders, Load and Dispatch. |
| [consolidation_add](outbound.md#consolidation_add) | stateless_command | Put a packed box onto an outbound pallet at the consolidation station. |
| [consolidation_board_box_list](outbound.md#consolidation_board_box_list) | query* | List the boxes waiting at a consolidation station, on a pallet or not yet. |
| [consolidation_board_pallet_list](outbound.md#consolidation_board_pallet_list) | query* | List a consolidation station's open pallets and the closed ones still standing there. |
| [consolidation_queue_list](outbound.md#consolidation_queue_list) | query* | List the boxes waiting at a consolidation station and its open pallets. |
| [consolidation_remove](outbound.md#consolidation_remove) | stateless_command | Take a box off an open consolidation pallet. |
| [consolidation_session_close](outbound.md#consolidation_session_close) | stateless_command | Close the caller's consolidation session. |
| [consolidation_session_open](outbound.md#consolidation_session_open) | stateless_command | Open (or resume) the caller's session at a consolidation station. |
| [consolidation_station_card_get](outbound.md#consolidation_station_card_get) | query* | Read one consolidation station's counts, as its card loads them. |
| [consolidation_station_list](outbound.md#consolidation_station_list) | query* | List the consolidation stations with their waiting boxes and pallets. |
| [consolidation_target_close](outbound.md#consolidation_target_close) | stateful_command | Close a consolidation pallet: it becomes an outbound unit of its own. |
| [consolidation_target_get](outbound.md#consolidation_target_get) | query* | Read a consolidation pallet and the boxes on it. |
| [consolidation_target_reopen](outbound.md#consolidation_target_reopen) | stateful_command | Reopen a closed consolidation pallet (supervisor). |
| [consolidation_unit_get](outbound.md#consolidation_unit_get) | query* | Read a box waiting for consolidation: its order, route and the pallet it goes on. |
| [container_dispose](outbound.md#container_dispose) | stateless_command | Dispose a container (force=true cascades through children). |
| [container_repack](outbound.md#container_repack) | stateless_command | Repack inventory from one container into another (drains source). |
| [container_restructure](outbound.md#container_restructure) | stateless_command | Re-parent a container or detach it (validates hierarchy). |
| [count_allocation_policy](outbound.md#count_allocation_policy) | query* | Count allocation_policy — CRUD. |
| [count_allocation_policy_detail](outbound.md#count_allocation_policy_detail) | query* | Count allocation_policy_detail — CRUD. |
| [count_cartonization_policy](outbound.md#count_cartonization_policy) | query* | Count cartonization_policy — CRUD. |
| [count_cartonization_policy_detail](outbound.md#count_cartonization_policy_detail) | query* | Count cartonization_policy_detail — CRUD. |
| [count_order_type](outbound.md#count_order_type) | query* | Count order types |
| [count_pick_short_reason_action](outbound.md#count_pick_short_reason_action) | query* | Count pick_short_reason_action — CRUD. |
| [count_pick_short_reason_revision](outbound.md#count_pick_short_reason_revision) | query* | Count pick_short_reason_revision — CRUD. |
| [count_replenishment_policy](outbound.md#count_replenishment_policy) | query* | Count replenishment_policy — CRUD. |
| [count_replenishment_policy_detail](outbound.md#count_replenishment_policy_detail) | query* | Count replenishment_policy_detail — CRUD. |
| [count_shipment_order](outbound.md#count_shipment_order) | query* | Count shipment orders |
| [count_shipment_order_line](outbound.md#count_shipment_order_line) | query* | Count shipment order lines |
| [create_allocation_policy](outbound.md#create_allocation_policy) | stateless_command | Create an allocation policy whose steps are owned by the allocation pipeline. |
| [create_cartonization_policy_detail_form](outbound.md#create_cartonization_policy_detail_form) | stateless_command | Add one carton candidate through the metadata detail form. |
| [create_cartonization_policy_form](outbound.md#create_cartonization_policy_form) | stateless_command | Create a cartonization policy from the metadata form. |
| [create_replenishment_policy](outbound.md#create_replenishment_policy) | not declared* | Create a new replenishment_policy — CRUD. |
| [delete_allocation_policy](outbound.md#delete_allocation_policy) | stateless_command | Delete an unreferenced allocation policy and all of its owned steps. |
| [delete_cartonization_policy](outbound.md#delete_cartonization_policy) | stateless_command | Delete an unreferenced cartonization policy and all of its owned cartons. |
| [delete_cartonization_policy_detail_form](outbound.md#delete_cartonization_policy_detail_form) | stateless_command | Delete one carton candidate through the metadata detail form. |
| [delete_many_allocation_policy](outbound.md#delete_many_allocation_policy) | stateless_command | Delete unreferenced allocation policies and their owned steps. |
| [delete_many_cartonization_policy](outbound.md#delete_many_cartonization_policy) | stateless_command | Delete unreferenced cartonization policies and all of their owned cartons. |
| [delete_many_cartonization_policy_detail_form](outbound.md#delete_many_cartonization_policy_detail_form) | stateless_command | Delete selected carton candidates through the metadata list. |
| [delete_many_replenishment_policy](outbound.md#delete_many_replenishment_policy) | not declared* | Delete multiple replenishment_policy by IDs — CRUD. |
| [delete_replenishment_policy](outbound.md#delete_replenishment_policy) | not declared* | Delete a replenishment_policy by ID — CRUD. |
| [dispatch_add_order](outbound.md#dispatch_add_order) | stateful_command | Add active Order planning intent to a Draft Dispatch. |
| [dispatch_create](outbound.md#dispatch_create) | stateless_command | Create a manual Dispatch. |
| [dispatch_get](outbound.md#dispatch_get) | query* | Get Dispatch stops, Order intent and physical unit assignments. |
| [dispatch_header_get](outbound.md#dispatch_header_get) | query* | Read a flat Dispatch header and its current version, without claiming work. |
| [dispatch_header_list](outbound.md#dispatch_header_list) | query* | Filter and page Dispatch headers for planning. |
| [dispatch_list](outbound.md#dispatch_list) | query* | List Dispatches. |
| [dispatch_order_list](outbound.md#dispatch_order_list) | query* | Filter and page current Order transport intent; removed history is excluded. |
| [dispatch_plan](outbound.md#dispatch_plan) | stateful_command | Freeze a manually prepared Dispatch as Planned. |
| [dispatch_remove_order](outbound.md#dispatch_remove_order) | stateful_command | Remove active Order planning intent from a Draft Dispatch. |
| [dispatch_stop_add](outbound.md#dispatch_stop_add) | stateful_command | Add an ordered delivery stop to a Draft Dispatch. |
| [dispatch_stop_list](outbound.md#dispatch_stop_list) | query* | Filter and page ordered Dispatch stops, without changing their sequence. |
| [dispatch_stop_resequence](outbound.md#dispatch_stop_resequence) | stateful_command | Replace the complete stop order of a Draft Dispatch and audit it. |
| [dispatch_stop_update](outbound.md#dispatch_stop_update) | stateful_command | Edit a delivery stop on a Draft Dispatch. |
| [find_shipment_order_by_number](outbound.md#find_shipment_order_by_number) | query* | Find a shipment order by order_number |
| [get_allocation_policy](outbound.md#get_allocation_policy) | query* | Get a allocation_policy by ID — CRUD. |
| [get_allocation_policy_detail](outbound.md#get_allocation_policy_detail) | query* | Get a allocation_policy_detail by ID — CRUD. |
| [get_cartonization_policy](outbound.md#get_cartonization_policy) | query* | Get a cartonization_policy by ID — CRUD. |
| [get_cartonization_policy_detail](outbound.md#get_cartonization_policy_detail) | query* | Get a cartonization_policy_detail by ID — CRUD. |
| [get_cartonization_policy_detail_form](outbound.md#get_cartonization_policy_detail_form) | query | Get one carton candidate with its policy aggregate version. |
| [get_order_type](outbound.md#get_order_type) | query* | Get an order type |
| [get_pick_short_reason_action](outbound.md#get_pick_short_reason_action) | query* | Get one Pick-short action by its metadata UI compound key. |
| [get_pick_short_reason_revision](outbound.md#get_pick_short_reason_revision) | query* | Get a pick_short_reason_revision by ID — CRUD. |
| [get_replenishment_policy](outbound.md#get_replenishment_policy) | query* | Get a replenishment_policy by ID — CRUD. |
| [get_replenishment_policy_detail](outbound.md#get_replenishment_policy_detail) | query* | Get a replenishment_policy_detail by ID — CRUD. |
| [get_shipment_order](outbound.md#get_shipment_order) | query* | Get a shipment order |
| [get_shipment_order_full](outbound.md#get_shipment_order_full) | query* | Get a shipment order with its lines |
| [get_shipment_order_line](outbound.md#get_shipment_order_line) | query* | Get a shipment order line |
| [get_shipment_order_line_lot_requirements](outbound.md#get_shipment_order_line_lot_requirements) | query* | Get one shipment Order line's expected lot requirements |
| [list_allocation_policy](outbound.md#list_allocation_policy) | query* | List allocation_policy — CRUD. |
| [list_allocation_policy_detail](outbound.md#list_allocation_policy_detail) | query* | List allocation_policy_detail — CRUD. |
| [list_cartonization_policy](outbound.md#list_cartonization_policy) | query* | List cartonization_policy — CRUD. |
| [list_cartonization_policy_detail](outbound.md#list_cartonization_policy_detail) | query* | List cartonization_policy_detail — CRUD. |
| [list_order_type](outbound.md#list_order_type) | query* | List order types (filtered) |
| [list_pick_short_reason_action](outbound.md#list_pick_short_reason_action) | query* | List Pick-short actions as a metadata UI read projection. |
| [list_pick_short_reason_revision](outbound.md#list_pick_short_reason_revision) | query* | List pick_short_reason_revision — CRUD. |
| [list_replenishment_policy](outbound.md#list_replenishment_policy) | query* | List replenishment_policy — CRUD. |
| [list_replenishment_policy_detail](outbound.md#list_replenishment_policy_detail) | query* | List replenishment_policy_detail — CRUD. |
| [list_shipment_order](outbound.md#list_shipment_order) | query* | List shipment orders (filtered) |
| [list_shipment_order_line](outbound.md#list_shipment_order_line) | query* | List shipment order lines (filtered) |
| [load_cancel](outbound.md#load_cancel) | stateful_command | Cancel an empty not-shipped Load after all physical units were explicitly unloaded. |
| [load_complete](outbound.md#load_complete) | stateful_command | Complete all required units only after rechecking their immutable content. |
| [load_get](outbound.md#load_get) | query* | Read current Load, transport, static manifest and membership from one snapshot. |
| [load_header_get](outbound.md#load_header_get) | query* | Read a flat Load header and its version without advancing physical loading or shipment. |
| [load_header_list](outbound.md#load_header_list) | query* | Filter and page Load headers; no claims, loading facts or Goods Issue. |
| [load_lookup](outbound.md#load_lookup) | query* | Look up an exact Load label without changing progress or stock. |
| [load_open](outbound.md#load_open) | stateful_command | Open Load from a reviewed Frozen plan and registered transport. |
| [load_plan_add_unit](outbound.md#load_plan_add_unit) | stateful_command | Add a current root from the seen unit and transport cards to an ExplicitUnit plan. |
| [load_plan_create](outbound.md#load_plan_create) | stateless_command | Create a working Load Plan (Explicit policy selects ExplicitUnit mode). |
| [load_plan_freeze](outbound.md#load_plan_freeze) | stateful_command | Freeze the reviewed complete unit set with per-unit/assignment version echoes; not Load authorization. |
| [load_plan_generate](outbound.md#load_plan_generate) | stateful_command | Generate stop groups on a Planned Dispatch; explicit units remain manually selected. |
| [load_plan_get](outbound.md#load_plan_get) | query* | Get stop groups and current physical planning members (not load authorization). |
| [load_plan_header_get](outbound.md#load_plan_header_get) | query* | Read a flat Load Plan header and its seen version without advancing it. |
| [load_plan_header_list](outbound.md#load_plan_header_list) | query* | Filter and page Load Plan headers; no membership or physical execution change. |
| [load_plan_remove_unit](outbound.md#load_plan_remove_unit) | stateful_command | Remove an explicit planning member, without touching stock. |
| [load_plan_reopen](outbound.md#load_plan_reopen) | stateful_command | Supervisor pre-Load replan with mandatory audited reason. |
| [load_plan_resequence](outbound.md#load_plan_resequence) | stateful_command | Replace the complete explicit unit order. |
| [load_plan_set_position](outbound.md#load_plan_set_position) | stateful_command | Set an intended transport position, or explicitly clear it with null. |
| [load_start](outbound.md#load_start) | stateful_command | Confirm the reviewed Load's exact transport before loading units. |
| [load_unit_confirm](outbound.md#load_unit_confirm) | stateful_command | Confirm the scanned reviewed unit against current sequence/content; Loaded is not Shipped. |
| [load_unit_remove](outbound.md#load_unit_remove) | stateful_command | Controlled physical unload acknowledgment with required scan/reason; preserve history and stock. |
| [load_unit_review](outbound.md#load_unit_review) | query* | Validate a scanned physical root and show its card; no Loading commitment. |
| [outbound_unit_assign](outbound.md#outbound_unit_assign) | stateful_command | Assign an unassigned physical root from the confirmed current Order plan (version 0). |
| [outbound_unit_assignment_get](outbound.md#outbound_unit_assignment_get) | query* | Get unit transport intent, current Order plan and explicit change history. |
| [outbound_unit_reassign](outbound.md#outbound_unit_reassign) | stateful_command | Explicitly align an assigned physical root with its confirmed current Order plan; no stock movement. |
| [packing_add](outbound.md#packing_add) | stateless_command | Move picked goods from the pallet being repacked into an open output carton. |
| [packing_carton_close](outbound.md#packing_carton_close) | stateful_command | Close a package or an output carton with its measured weight; prints its shipping label. |
| [packing_carton_open](outbound.md#packing_carton_open) | stateless_command | Open the next output carton for a pallet being repacked, by the box's label. |
| [packing_carton_reopen](outbound.md#packing_carton_reopen) | stateful_command | Reopen a closed package with a supervisor's grant and a reason. |
| [packing_carton_void](outbound.md#packing_carton_void) | stateful_command | Void an open package; the unit keeps waiting to be packed. |
| [packing_exception_get](outbound.md#packing_exception_get) | query* | Read one open packing exception, as the supervisor's card loads it. |
| [packing_exception_list](outbound.md#packing_exception_list) | query* | List the open packing exceptions that hold orders back, oldest first. |
| [packing_exception_report](outbound.md#packing_exception_report) | stateless_command | Report missing or unexpected goods in an open package; blocks the order's packing. |
| [packing_exception_resolve](outbound.md#packing_exception_resolve) | stateful_command | Resolve an open packing exception after investigation; the order packs if nothing else holds it. |
| [packing_exception_resolve_short](outbound.md#packing_exception_resolve_short) | stateful_command | Write a package's missing goods off to Lost and resolve its PACK_SOURCE_SHORT. |
| [packing_exception_resolve_unexpected](outbound.md#packing_exception_resolve_unexpected) | stateful_command | Set a packing carton's unexpected item aside for a count and resolve its PACK_UNEXPECTED_ITEM. |
| [packing_queue_list](outbound.md#packing_queue_list) | query* | List the units waiting to be packed at a pack station, oldest first. |
| [packing_remove](outbound.md#packing_remove) | stateless_command | Move picked goods out of an output carton: back onto its pallet or into another open carton. |
| [packing_source_complete](outbound.md#packing_source_complete) | stateful_command | Complete a repacked pallet: its obligation is satisfied and its router unit consumed. |
| [packing_work_get](outbound.md#packing_work_get) | query* | Read the station's view of one unit: its package, what it should and does hold, the weights. |
| [packing_work_open](outbound.md#packing_work_open) | stateless_command | Open the packing work of a unit at a station, by its id or its container's label. |
| [pick_assignment_bind_position](outbound.md#pick_assignment_bind_position) | stateless_command | Bind a scanned box to a position of the operator's pick assignment carrier. |
| [pick_assignment_board_get](outbound.md#pick_assignment_board_get) | query* | Get one pick assignment as the board shows it, in any status. |
| [pick_assignment_complete](outbound.md#pick_assignment_complete) | stateless_command | Deliver your pick assignment's carrier (or a carrier dissolved with goods) to its delivery location and complete it. |
| [pick_assignment_complete_supervised](outbound.md#pick_assignment_complete_supervised) | stateful_command | Deliver a pick assignment's carrier waiting for delivery (Delivering, or dissolved with goods) on its holder's behalf, as a supervisor. |
| [pick_assignment_dissolve](outbound.md#pick_assignment_dissolve) | stateful_command | Dissolve your own pick assignment; after its first commit with a supervisor's grant. |
| [pick_assignment_dissolve_supervised](outbound.md#pick_assignment_dissolve_supervised) | stateful_command | Dissolve any live pick assignment as a supervisor, with a reason. |
| [pick_assignment_get](outbound.md#pick_assignment_get) | query* | Return a pick assignment (or the operator's live one) with its version. |
| [pick_assignment_list](outbound.md#pick_assignment_list) | query* | List pick assignments in any status for the supervisor's board, newest first. |
| [pick_assignment_position_close](outbound.md#pick_assignment_position_close) | stateless_command | Report the box at a position of your pick assignment full: it closes, the rest goes into new cartons. |
| [pick_assignment_position_hand_over](outbound.md#pick_assignment_position_hand_over) | stateless_command | Hand the picks of a full box whose repair failed over to recovery: they leave your carrier. |
| [pick_assignment_position_list](outbound.md#pick_assignment_position_list) | query* | List the positions of pick assignments (filter by assignment_id). |
| [pick_assignment_position_replace_container](outbound.md#pick_assignment_position_replace_container) | stateless_command | Replace the damaged box at a position of your pick assignment by a new box: the goods move into it. |
| [pick_assignment_skip](outbound.md#pick_assignment_skip) | stateless_command | Skip a pick inside your pick assignment: it moves to the end of the route. |
| [pick_assignment_start](outbound.md#pick_assignment_start) | stateless_command | Build a pick assignment of whole planned targets on a scanned carrier. |
| [pick_commit](outbound.md#pick_commit) | stateful_command | Atomically commit a full Pick into its prepared DROPID. |
| [pick_confirm_internal_lot](outbound.md#pick_confirm_internal_lot) | stateless_command | Confirm the Pick's reserved internal lot (scanned or typed) as a durable fact and renew the task lease. |
| [pick_confirm_item](outbound.md#pick_confirm_item) | stateless_command | Confirm the Pick item barcode as a durable fact and renew the task lease. |
| [pick_confirm_location](outbound.md#pick_confirm_location) | stateless_command | Confirm the Pick source location as a durable fact and renew the task lease. |
| [pick_confirm_lot_attributes](outbound.md#pick_confirm_lot_attributes) | stateless_command | Confirm the Pick lot's checkable attributes (one scan or typed values) as durable facts and renew the task lease. |
| [pick_confirm_qty](outbound.md#pick_confirm_qty) | stateless_command | Confirm the full Pick quantity as an audit fact and renew the task lease. |
| [pick_confirm_serial](outbound.md#pick_confirm_serial) | stateless_command | Capture one or more serial numbers for a Pick without moving inventory. |
| [pick_confirm_source_lpn](outbound.md#pick_confirm_source_lpn) | stateless_command | Confirm the Pick source LPN as a durable fact and renew the task lease. |
| [pick_destination_retarget](outbound.md#pick_destination_retarget) | stateful_command | Send the goods of a cart waiting for delivery or of a loaded pick pallet to another location when the frozen one no longer takes them, as a… |
| [pick_detail_delete](outbound.md#pick_detail_delete) | stateless_command | Delete one reservation (pick) from an order, releasing its qty. |
| [pick_dispatch_next](outbound.md#pick_dispatch_next) | stateless_command | Assign the next executable Pick using fixed dispatch phases. |
| [pick_drop_close](outbound.md#pick_drop_close) | stateless_command | Close a pick pallet: its whole tree moves from INTRANSIT into its frozen destination location. |
| [pick_drop_current](outbound.md#pick_drop_current) | query* | The operator's open pick pallet: its label, order, goods and frozen destination location. |
| [pick_drop_list](outbound.md#pick_drop_list) | query | List every operator's open pick pallet with its record version and whether its frozen destination still takes it, for the supervisor. |
| [pick_drop_open](outbound.md#pick_drop_open) | stateless_command | Open the operator's pick pallet (a scanned DRP label) for the task's order in INTRANSIT. |
| [pick_manual_complete](outbound.md#pick_manual_complete) | stateful_command | Complete a reviewed workstation Pick: actual stock, Pick, Task and durable receipt atomically. |
| [pick_manual_finalize](outbound.md#pick_manual_finalize) | stateless_command | Hand off completed workstation roots using their frozen routes; never mark Pack done. |
| [pick_manual_review](outbound.md#pick_manual_review) | query* | Review workstation Pick source requirements without an RF lease. |
| [pick_reconciliation_report](outbound.md#pick_reconciliation_report) | query* | Report task/Pick lifecycle and dispatch-eligibility inconsistencies. |
| [pick_reject](outbound.md#pick_reject) | stateful_command | Reject untouched Pick work using Task Manager cooldown and refusal audit. |
| [pick_short](outbound.md#pick_short) | stateful_command | Atomically commit a partial or zero Pick and persist remediation intent. |
| [pick_short_reason_create_draft](outbound.md#pick_short_reason_create_draft) | stateless_command | Create the next editable revision of a Pick-short reason. |
| [pick_short_reason_get](outbound.md#pick_short_reason_get) | query* | Get one Pick-short reason revision with actions. |
| [pick_short_reason_list](outbound.md#pick_short_reason_list) | query* | List all Pick-short reason revisions with actions. |
| [pick_short_reason_publish](outbound.md#pick_short_reason_publish) | stateful_command | Validate and publish an immutable Pick-short reason revision. |
| [pick_short_reason_retire](outbound.md#pick_short_reason_retire) | stateful_command | Retire a published Pick-short reason revision. |
| [pick_short_reason_update_draft](outbound.md#pick_short_reason_update_draft) | stateful_command | Replace one Pick-short draft and its typed action set. |
| [pick_substitute_source_lpn](outbound.md#pick_substitute_source_lpn) | stateless_command | Take the Pick's remaining from another LPN of the same lot at the location and renew the task lease. |
| [pick_work_get](outbound.md#pick_work_get) | query* | Return authoritative Pick work and prepared DROPID state for reconnect. |
| [picking_policy_create_draft](outbound.md#picking_policy_create_draft) | stateless_command | Create the next editable revision of a picking policy. |
| [picking_policy_get](outbound.md#picking_policy_get) | query* | Get one picking-policy revision with its sections. |
| [picking_policy_list](outbound.md#picking_policy_list) | query* | List picking-policy revisions, filtered like any list (by status, code). |
| [picking_policy_publish](outbound.md#picking_policy_publish) | stateful_command | Validate and publish a picking-policy revision, retiring the previous one. |
| [picking_policy_retire](outbound.md#picking_policy_retire) | stateful_command | Retire a published picking-policy revision no work area depends on. |
| [picking_policy_update_draft](outbound.md#picking_policy_update_draft) | stateful_command | Replace the description and sections of one picking-policy draft. |
| [replenishment_policy_save](outbound.md#replenishment_policy_save) | stateful_command | Replenishment policy: save its urgency rule, on the version read. |
| [shared_pick_commit](outbound.md#shared_pick_commit) | stateful_command | Collect all or part of a station route stop into the route's shared tote. |
| [shared_pick_route_get](outbound.md#shared_pick_route_get) | query | The operator's live station route: its workable stops with their task versions, and its totes. |
| [shared_pick_route_list](outbound.md#shared_pick_route_list) | query | List every live tote of every live station route with its route version, its frozen station and whether its operator is gone, for the super… |
| [shared_pick_route_start](outbound.md#shared_pick_route_start) | stateless_command | Start a portion of a station wave's route by wave code, or resume the operator's live one. |
| [shared_pick_tote_bind](outbound.md#shared_pick_tote_bind) | stateless_command | Bind an empty registered shared tote to the operator's station route. |
| [shared_pick_tote_complete_supervised](outbound.md#shared_pick_tote_complete_supervised) | stateful_command | Deliver (or release, if empty) a live shared tote of a station route whose operator is gone, as a supervisor. |
| [shared_pick_tote_deliver](outbound.md#shared_pick_tote_deliver) | stateless_command | Deliver a station route's shared tote to its frozen station. |
| [shared_pick_tote_release](outbound.md#shared_pick_tote_release) | stateless_command | Give an empty shared tote of the operator's station route back to the handling-unit registry. |
| [shipment_order_allocate](outbound.md#shipment_order_allocate) | stateful_command | Allocate a released order's open lines against available stock. |
| [shipment_order_allocate_preview](outbound.md#shipment_order_allocate_preview) | query* | Preview what allocation would do for this order. |
| [shipment_order_cancel](outbound.md#shipment_order_cancel) | stateful_command | Cancel an order (refused once anything is picked). |
| [shipment_order_cancel_allocation](outbound.md#shipment_order_cancel_allocation) | stateful_command | Release every reservation on the order; the picks are deleted. |
| [shipment_order_close](outbound.md#shipment_order_close) | stateful_command | Close a released order once every line is terminal. |
| [shipment_order_create](outbound.md#shipment_order_create) | stateless_command | Create a draft shipment order with its lines. |
| [shipment_order_fulfilment_list](outbound.md#shipment_order_fulfilment_list) | query* | Current Order fulfilment by line, including unreserved demand; all quantities in base units. |
| [shipment_order_line_adjust_qty](outbound.md#shipment_order_line_adjust_qty) | stateful_command | Set a line's ordered quantity (supervisor lane; works on reserved lines). |
| [shipment_order_line_cancel_qty](outbound.md#shipment_order_line_cancel_qty) | stateful_command | Cancel part or all of a line's quantity, with a reason. |
| [shipment_order_line_remove](outbound.md#shipment_order_line_remove) | stateful_command | Delete a line from a draft order. |
| [shipment_order_line_set_lot_requirements](outbound.md#shipment_order_line_set_lot_requirements) | stateful_command | Replace a draft Order line's expected lot and lot-attribute values. |
| [shipment_order_line_upsert](outbound.md#shipment_order_line_upsert) | stateful_command | Add or edit a draft order's line. |
| [shipment_order_release](outbound.md#shipment_order_release) | stateful_command | Release a draft order (full validation, freezes the ship-to address). |
| [shipment_order_ship](outbound.md#shipment_order_ship) | stateful_command | Ship a fully picked order: atomic Goods Issue, serials, counters, close and outbox. |
| [shipment_order_shipment_history](outbound.md#shipment_order_shipment_history) | query* | Immutable Goods Issue deltas by Order line; read only, no shipment retry or stock movement. |
| [shipment_order_update](outbound.md#shipment_order_update) | stateful_command | Edit a shipment order's header fields. |
| [shipment_order_validate](outbound.md#shipment_order_validate) | query* | Dry-run the release checks. |
| [stage_unit_assign](outbound.md#stage_unit_assign) | stateful_command | Assign a ready physical root to an exact Stage without moving stock. |
| [stage_unit_confirm](outbound.md#stage_unit_confirm) | stateful_command | Confirm the assigned Stage and expected source, moving the entire picked root atomically. |
| [stage_unit_get](outbound.md#stage_unit_get) | query* | Read unit transport, Stage card, physical source and execution fact in one snapshot. |
| [stage_unit_lookup](outbound.md#stage_unit_lookup) | query* | Find the exact live Stage root by container label, without changing assignment or stock. |
| [stage_unit_transfer](outbound.md#stage_unit_transfer) | stateful_command | Transfer an intact staged remainder from a completed trip to the current Planned Dispatch, preserving evidence and physical stock. |
| [station_box_bind](outbound.md#station_box_bind) | stateless_command | Put an empty box on a distribution station's position. |
| [station_box_close](outbound.md#station_box_close) | stateless_command | Close a distribution station position's box once nothing more is coming to it. |
| [station_box_close_full](outbound.md#station_box_close_full) | stateless_command | Close a distribution station position's full box; the position waits for a new one. |
| [station_box_deliver](outbound.md#station_box_deliver) | stateless_command | Carry a station position's closed box to the pack station it waits for. |
| [station_card_get](outbound.md#station_card_get) | query* | Read one distribution station's position counts, as its card loads them. |
| [station_configure](outbound.md#station_configure) | stateless_command | Give a distribution station its number of positions. |
| [station_excess_context](outbound.md#station_excess_context) | query* | Resolve excess report codes within a distribution station. |
| [station_excess_count](outbound.md#station_excess_count) | stateless_command | Count station excess now (supervisor): returning remainder will stop until counting ends. |
| [station_excess_list](outbound.md#station_excess_list) | query* | Read station excess facts and their inventory-count request receipts. |
| [station_excess_report](outbound.md#station_excess_report) | stateless_command | Report station excess now; request counting after the wall becomes free. |
| [station_get](outbound.md#station_get) | query* | Read a distribution station's positions with the order and wave holding each. |
| [station_list](outbound.md#station_list) | query* | List the locations that may be distribution stations, with their positions counted. |
| [station_order_withdraw](outbound.md#station_order_withdraw) | stateful_command | Withdraw an unshipped station order and free its tote remainder for return. |
| [station_place](outbound.md#station_place) | stateless_command | Place goods from a tote into a distribution station position's box. |
| [station_place_suggest](outbound.md#station_place_suggest) | query* | Suggest the station position that wants an item from a tote, and how much. |
| [station_position_list](outbound.md#station_position_list) | query* | List one distribution station's positions with the order, wave and box of each. |
| [station_remainder_order](outbound.md#station_remainder_order) | query* | Read a station tote order before a supervisor decides to withdraw it. |
| [station_tote_lost](outbound.md#station_tote_lost) | stateless_command | Declare a whole tote lost before reaching the station (supervisor). |
| [station_tote_short](outbound.md#station_tote_short) | stateless_command | Declare all remaining units of an item absent or damaged in a station tote. |
| [transport_unit_get](outbound.md#transport_unit_get) | query* | Read a transport resource card without changing or claiming it. |
| [transport_unit_list](outbound.md#transport_unit_list) | query* | List transport resources with ordinary list filtering and pagination; no loading claims. |
| [transport_unit_register](outbound.md#transport_unit_register) | stateless_command | Register a transport resource, never a warehouse container. |
| [update_allocation_policy](outbound.md#update_allocation_policy) | stateful_command | Update an allocation policy header without overwriting a newer edit. |
| [update_cartonization_policy_detail_form](outbound.md#update_cartonization_policy_detail_form) | stateful_command | Update one carton candidate through the metadata detail form. |
| [update_cartonization_policy_form](outbound.md#update_cartonization_policy_form) | stateful_command | Update cartonization policy header fields from the metadata form. |
| [wave_add_order](outbound.md#wave_add_order) | stateful_command | Add an Order to a Draft Wave. |
| [wave_cancel](outbound.md#wave_cancel) | stateful_command | Cancel a Wave before release starts. |
| [wave_create](outbound.md#wave_create) | stateless_command | Create a manual Wave. |
| [wave_get](outbound.md#wave_get) | query* | Get a Wave with members and progress. |
| [wave_header_get](outbound.md#wave_header_get) | query* | Read a flat Wave header without advancing it. |
| [wave_header_list](outbound.md#wave_header_list) | query* | Filter and page Wave headers without release or membership changes. |
| [wave_list](outbound.md#wave_list) | query* | List Waves. |
| [wave_policy_build](outbound.md#wave_policy_build) | stateful_command | Build bounded Draft Waves from a versioned Wave policy. |
| [wave_policy_create](outbound.md#wave_policy_create) | stateless_command | Create a Wave policy. |
| [wave_policy_get](outbound.md#wave_policy_get) | query* | Get a Wave policy. |
| [wave_policy_list](outbound.md#wave_policy_list) | query* | List Wave policies. |
| [wave_policy_preview](outbound.md#wave_policy_preview) | query* | Preview the Draft Waves a policy would build. |
| [wave_policy_save](outbound.md#wave_policy_save) | stateful_command | Save a versioned Wave policy. |
| [wave_preview](outbound.md#wave_preview) | query* | Preview release eligibility for every Wave order. |
| [wave_release](outbound.md#wave_release) | stateful_command | Freeze and enqueue a Wave for release. |
| [wave_remove_order](outbound.md#wave_remove_order) | stateful_command | Remove an Order from a Draft Wave. |
| [wave_retry_blocked](outbound.md#wave_retry_blocked) | stateful_command | Retry only blocked or failed Wave orders. |
| [wave_set_station](outbound.md#wave_set_station) | stateful_command | Name or clear the distribution station of a Draft Wave. |
| [work_area_assign_picking_policy](outbound.md#work_area_assign_picking_policy) | stateless_command | Point a work area at a published picking policy (none: DISCRETE). |
| [work_area_equipment_policy_create](outbound.md#work_area_equipment_policy_create) | stateless_command | Name the picking policy a work area works by for one equipment profile. |
| [work_area_equipment_policy_delete](outbound.md#work_area_equipment_policy_delete) | stateless_command | Remove a work area's policy for one equipment profile (back to the area default). |
| [work_area_equipment_policy_list](outbound.md#work_area_equipment_policy_list) | query* | List work areas' picking policies by equipment profile (filter by work_area_id). |
| [work_area_equipment_policy_update](outbound.md#work_area_equipment_policy_update) | stateless_command | Point a work area's equipment-profile row at another published picking policy. |

### Tasks (48)

[tasks.md](tasks.md). The task manager: work areas, operators, equipment profiles and the claim, report and finish cycle of a task.

| Method | Category | What it does |
|---|---|---|
| [count_equipment_profile](tasks.md#count_equipment_profile) | query* | Count equipment_profile — CRUD. |
| [count_operator](tasks.md#count_operator) | query* | Count operator — CRUD. |
| [count_operator_task_permission](tasks.md#count_operator_task_permission) | query* | Count operator_task_permission — CRUD. |
| [count_task](tasks.md#count_task) | query* | Count tasks, optionally filtered. |
| [count_work_area](tasks.md#count_work_area) | query* | Count work_area — CRUD. |
| [create_equipment_profile](tasks.md#create_equipment_profile) | not declared* | Create a new equipment_profile — CRUD. |
| [create_equipment_profile_zone_exclusion](tasks.md#create_equipment_profile_zone_exclusion) | not declared* | Create a new equipment_profile_zone_exclusion — CRUD. |
| [create_operator_task_permission](tasks.md#create_operator_task_permission) | not declared* | Create a new operator_task_permission — CRUD. |
| [create_work_area](tasks.md#create_work_area) | not declared* | Create a work area, optionally naming its pack station (a Pack location). |
| [create_work_area_zone](tasks.md#create_work_area_zone) | not declared* | Create a new work_area_zone — CRUD. |
| [delete_equipment_profile](tasks.md#delete_equipment_profile) | not declared* | Delete a equipment_profile by ID — CRUD. |
| [delete_equipment_profile_zone_exclusion](tasks.md#delete_equipment_profile_zone_exclusion) | not declared* | Delete a equipment_profile_zone_exclusion by ID — CRUD. |
| [delete_many_equipment_profile](tasks.md#delete_many_equipment_profile) | not declared* | Delete multiple equipment_profile by IDs — CRUD. |
| [delete_many_equipment_profile_zone_exclusion](tasks.md#delete_many_equipment_profile_zone_exclusion) | not declared* | Delete multiple equipment_profile_zone_exclusion by IDs — CRUD. |
| [delete_many_operator_task_permission](tasks.md#delete_many_operator_task_permission) | not declared* | Delete multiple operator_task_permission by IDs — CRUD. |
| [delete_operator_task_permission](tasks.md#delete_operator_task_permission) | not declared* | Delete a operator_task_permission by ID — CRUD. |
| [delete_work_area](tasks.md#delete_work_area) | not declared* | Delete a work_area by ID — CRUD. |
| [delete_work_area_zone](tasks.md#delete_work_area_zone) | not declared* | Delete a work_area_zone by ID — CRUD. |
| [get_equipment_profile](tasks.md#get_equipment_profile) | query* | Get a equipment_profile by ID — CRUD. |
| [get_equipment_profile_zone_exclusion](tasks.md#get_equipment_profile_zone_exclusion) | query* | Get a equipment_profile_zone_exclusion by ID — CRUD. |
| [get_operator](tasks.md#get_operator) | query* | Get a operator by ID — CRUD. |
| [get_operator_task_permission](tasks.md#get_operator_task_permission) | query* | Get a operator_task_permission by ID — CRUD. |
| [get_task](tasks.md#get_task) | query* | Get a task by id. |
| [get_work_area](tasks.md#get_work_area) | query* | Get a work_area by ID — CRUD. |
| [get_work_area_zone](tasks.md#get_work_area_zone) | query* | Get a work_area_zone by ID — CRUD. |
| [list_equipment_profile](tasks.md#list_equipment_profile) | query* | List equipment_profile — CRUD. |
| [list_equipment_profile_zone_exclusion](tasks.md#list_equipment_profile_zone_exclusion) | query* | List equipment_profile_zone_exclusion — CRUD. |
| [list_operator](tasks.md#list_operator) | query* | List operator — CRUD. |
| [list_operator_task_permission](tasks.md#list_operator_task_permission) | query* | List operator_task_permission — CRUD. |
| [list_task](tasks.md#list_task) | query* | List tasks, optionally filtered. |
| [list_work_area](tasks.md#list_work_area) | query* | List work_area — CRUD. |
| [list_work_area_zone](tasks.md#list_work_area_zone) | query* | List work_area_zone — CRUD. |
| [sync_operators](tasks.md#sync_operators) | stateless_command | Sync this warehouse's operators from its users now (the same projection the 5-minute background sync runs). |
| [task_claim](tasks.md#task_claim) | stateless_command | Claim work: your own unfinished task if you have one, else one from the pool. |
| [task_delete](tasks.md#task_delete) | stateless_command | Delete a task nobody has claimed; its pick stays reserved. |
| [task_delete_many](tasks.md#task_delete_many) | stateless_command | Delete several unclaimed tasks at once; claimed ones are skipped and named. |
| [task_finish](tasks.md#task_finish) | stateless_command | Finish a claimed task (Completed or Shorted, decided by qty done). |
| [task_force_release](tasks.md#task_force_release) | stateful_command | Supervisor forcibly returns someone else's claimed task, or an escalated pooled one, to the pool. |
| [task_heartbeat](tasks.md#task_heartbeat) | stateless_command | Renew the holder's live task lease without reporting quantity progress. |
| [task_reassign](tasks.md#task_reassign) | stateful_command | Supervisor reassigns a task to another operator. |
| [task_report_progress](tasks.md#task_report_progress) | stateless_command | Report progress (qty done) on a claimed task. |
| [task_skip](tasks.md#task_skip) | stateless_command | Give a claimed task back: refuse it (cools down) or hand it back (available at once). |
| [update_equipment_profile](tasks.md#update_equipment_profile) | not declared* | Update equipment limits without changing the profile's stable code. |
| [update_equipment_profile_zone_exclusion](tasks.md#update_equipment_profile_zone_exclusion) | not declared* | Move an equipment-profile exclusion to another zone; null/profile changes are rejected. |
| [update_operator](tasks.md#update_operator) | not declared* | Update an operator's equipment profile; an explicit JSON null clears it (the operator is on foot). |
| [update_operator_task_permission](tasks.md#update_operator_task_permission) | not declared* | Update a task permission's type, work area, or dedicated Pick rollout flag; null and operator changes are rejected. |
| [update_work_area](tasks.md#update_work_area) | not declared* | Update work-area behavior and its pack station without changing its stable code. |
| [update_work_area_zone](tasks.md#update_work_area_zone) | not declared* | Move a work-area association to another zone; null/work-area changes are rejected. |

### Reporting (51)

[reporting.md](reporting.md). Reports, labels, templates and printers.

| Method | Category | What it does |
|---|---|---|
| [count_label_definition](reporting.md#count_label_definition) | query* | Count label_definition — CRUD. |
| [count_label_template](reporting.md#count_label_template) | query* | Count label_template — CRUD. |
| [count_printer_assignment](reporting.md#count_printer_assignment) | query* | Count printer_assignment — CRUD. |
| [count_printer_configuration](reporting.md#count_printer_configuration) | query* | Count printer_configuration — CRUD. |
| [count_report_definition](reporting.md#count_report_definition) | query* | Count report_definition — CRUD. |
| [count_report_template](reporting.md#count_report_template) | query* | Count report_template — CRUD. |
| [create_label_definition](reporting.md#create_label_definition) | not declared* | Create a new label_definition — CRUD. |
| [create_label_template](reporting.md#create_label_template) | not declared* | Create a new label_template — CRUD. |
| [create_printer_assignment](reporting.md#create_printer_assignment) | not declared* | Create a new printer_assignment — CRUD. |
| [create_printer_configuration](reporting.md#create_printer_configuration) | not declared* | Create a new printer_configuration — CRUD. |
| [create_report_definition](reporting.md#create_report_definition) | not declared* | Create a new report_definition — CRUD. |
| [create_report_template](reporting.md#create_report_template) | not declared* | Create a new report_template — CRUD. |
| [delete_label_definition](reporting.md#delete_label_definition) | not declared* | Delete a label_definition by ID — CRUD. |
| [delete_label_template](reporting.md#delete_label_template) | not declared* | Delete a label_template by ID — CRUD. |
| [delete_many_label_definition](reporting.md#delete_many_label_definition) | not declared* | Delete multiple label_definition by IDs — CRUD. |
| [delete_many_label_template](reporting.md#delete_many_label_template) | not declared* | Delete multiple label_template by IDs — CRUD. |
| [delete_many_printer_assignment](reporting.md#delete_many_printer_assignment) | not declared* | Delete multiple printer_assignment by IDs — CRUD. |
| [delete_many_printer_configuration](reporting.md#delete_many_printer_configuration) | not declared* | Delete multiple printer_configuration by IDs — CRUD. |
| [delete_many_report_definition](reporting.md#delete_many_report_definition) | not declared* | Delete multiple report_definition by IDs — CRUD. |
| [delete_many_report_template](reporting.md#delete_many_report_template) | not declared* | Delete multiple report_template by IDs — CRUD. |
| [delete_printer_assignment](reporting.md#delete_printer_assignment) | not declared* | Delete a printer_assignment by ID — CRUD. |
| [delete_printer_configuration](reporting.md#delete_printer_configuration) | not declared* | Delete a printer_configuration by ID — CRUD. |
| [delete_report_definition](reporting.md#delete_report_definition) | not declared* | Delete a report_definition by ID — CRUD. |
| [delete_report_template](reporting.md#delete_report_template) | not declared* | Delete a report_template by ID — CRUD. |
| [generate_label_data](reporting.md#generate_label_data) | query* | Generate label render data |
| [generate_report_data](reporting.md#generate_report_data) | query* | Generate report render data |
| [get_label_definition](reporting.md#get_label_definition) | query* | Get a label_definition by ID — CRUD. |
| [get_label_template](reporting.md#get_label_template) | query* | Get a label_template by ID — CRUD. |
| [get_printer_assignment](reporting.md#get_printer_assignment) | query* | Get a printer_assignment by ID — CRUD. |
| [get_printer_configuration](reporting.md#get_printer_configuration) | query* | Get a printer_configuration by ID — CRUD. |
| [get_report_album](reporting.md#get_report_album) | query* | Get one report for the album/wizard |
| [get_report_definition](reporting.md#get_report_definition) | query* | Get a report_definition by ID — CRUD. |
| [get_report_template](reporting.md#get_report_template) | query* | Get a report_template by ID — CRUD. |
| [list_label_definition](reporting.md#list_label_definition) | query* | List label_definition — CRUD. |
| [list_label_template](reporting.md#list_label_template) | query* | List label_template — CRUD. |
| [list_printer_assignment](reporting.md#list_printer_assignment) | query* | List printer_assignment — CRUD. |
| [list_printer_configuration](reporting.md#list_printer_configuration) | query* | List printer_configuration — CRUD. |
| [list_report_album](reporting.md#list_report_album) | query* | List reports for the album screen |
| [list_report_definition](reporting.md#list_report_definition) | query* | List report_definition — CRUD. |
| [list_report_template](reporting.md#list_report_template) | query* | List report_template — CRUD. |
| [print_label](reporting.md#print_label) | query* | Generate label ZPL for printing |
| [print_report](reporting.md#print_report) | query* | Generate report PDF |
| [send_label_to_printer](reporting.md#send_label_to_printer) | not declared* | Print label directly to Zebra printer |
| [set_report_favorite](reporting.md#set_report_favorite) | stateless_command | Star or unstar a report for the calling user |
| [test_dataset](reporting.md#test_dataset) | query* | Test dataset SQL query |
| [update_label_definition](reporting.md#update_label_definition) | not declared* | Update a label definition; stable code is immutable and nullable links are explicit. |
| [update_label_template](reporting.md#update_label_template) | not declared* | Update a label template without changing its stable code. |
| [update_printer_assignment](reporting.md#update_printer_assignment) | not declared* | Update a printer-routing rule; a warehouse scope explicitly clears scope_id. |
| [update_printer_configuration](reporting.md#update_printer_configuration) | not declared* | Update printer configuration with explicit nullable-field semantics. |
| [update_report_definition](reporting.md#update_report_definition) | not declared* | Update a report definition; identity/provenance are immutable and nullable links are explicit. |
| [update_report_template](reporting.md#update_report_template) | not declared* | Update a report template without changing its stable code. |

### RF screens (11)

[rf.md](rf.md). Handheld (RF) screen definitions and the screen graph.

| Method | Category | What it does |
|---|---|---|
| [activate_revision](rf.md#activate_revision) | not declared* | Set an existing revision as the active one for (id, environment); returns the previous. |
| [fetch_reachable_from](rf.md#fetch_reachable_from) | query* | Bundle: every ScreenFile transitively reachable from rootId via metadata graph. |
| [fetch_screen](rf.md#fetch_screen) | query* | Fetch one ScreenFile JSON v2 by id (with optional ifNoneMatch ETag check). |
| [get_revision](rf.md#get_revision) | query* | Cheap revision-only check (no body) for a given screen + environment. |
| [get_screen_def](rf.md#get_screen_def) | query* | Get a single screen definition by ID |
| [get_screen_defs](rf.md#get_screen_defs) | query* | Batch-fetch screen definitions by IDs |
| [get_screen_tree](rf.md#get_screen_tree) | query* | Get the designer tree structure |
| [list_screen_def](rf.md#list_screen_def) | query* | List all screen definitions for the current warehouse |
| [list_screens](rf.md#list_screens) | query* | List screens active in environment (id/title/type/category/revision; no body). |
| [save_all_screen_defs](rf.md#save_all_screen_defs) | not declared* | Atomically replace all screen definitions and save tree |
| [save_screen](rf.md#save_screen) | not declared* | Validate body and append a new ScreenFile revision (does NOT activate). |

### Integration (74)

[integration.md](integration.md). Methods for integrations: stock and balance reads, marking (SGTIN) confirmations, entity attributes, the event registry, integration events and their deliveries.

| Method | Category | What it does |
|---|---|---|
| [confirm_aggregation](integration.md#confirm_aggregation) | not declared* | Marking: confirm regulator aggregation acknowledgement |
| [confirm_inbound](integration.md#confirm_inbound) | not declared* | Marking: confirm inbound regulator acknowledgement |
| [confirm_kz_inbound](integration.md#confirm_kz_inbound) | not declared* | (The code comment for this item is not in English. |
| [confirm_outbound](integration.md#confirm_outbound) | not declared* | Marking: confirm outbound regulator acknowledgement |
| [confirm_pharma_inbound](integration.md#confirm_pharma_inbound) | not declared* | (The code comment for this item is not in English. |
| [count_attribute_def](integration.md#count_attribute_def) | query* | Count attribute_def — CRUD. |
| [count_attribute_value](integration.md#count_attribute_value) | query* | Count attribute_value — CRUD. |
| [count_event_registry](integration.md#count_event_registry) | query* | Count event_registry — CRUD. |
| [count_integration_event](integration.md#count_integration_event) | query* | Count integration_event — CRUD. |
| [count_integration_event_delivery](integration.md#count_integration_event_delivery) | query* | Count integration_event_delivery — CRUD. |
| [count_integration_subscriber](integration.md#count_integration_subscriber) | query* | Count integration_subscriber — CRUD. |
| [count_inventory_balance](integration.md#count_inventory_balance) | query* | Count inventory_balance — CRUD. |
| [count_inventory_balance_by_container](integration.md#count_inventory_balance_by_container) | query* | Count inventory_balance_by_container — CRUD. |
| [count_inventory_balance_by_lot](integration.md#count_inventory_balance_by_lot) | query* | Count inventory_balance_by_lot — CRUD. |
| [count_inventory_balance_by_sku](integration.md#count_inventory_balance_by_sku) | query* | Count inventory_balance_by_sku — CRUD. |
| [count_inventory_balance_lot](integration.md#count_inventory_balance_lot) | query* | Count inventory_balance_lot — CRUD. |
| [count_inventory_balance_on_hold](integration.md#count_inventory_balance_on_hold) | query* | Count inventory_balance_on_hold — CRUD. |
| [count_inventory_hold](integration.md#count_inventory_hold) | query* | Count inventory_hold — CRUD. |
| [count_inventory_hold_detail](integration.md#count_inventory_hold_detail) | query* | Count inventory_hold_detail — CRUD. |
| [count_inventory_pending_move_in_ui](integration.md#count_inventory_pending_move_in_ui) | query* | Count inventory_pending_move_in_ui — CRUD. |
| [count_serial_capture_episode_open](integration.md#count_serial_capture_episode_open) | query* | Count serial_capture_episode_open — CRUD. |
| [create_attribute_def](integration.md#create_attribute_def) | not declared* | Create a new attribute_def — CRUD. |
| [create_attribute_value](integration.md#create_attribute_value) | not declared* | Create a new attribute_value — CRUD. |
| [create_event_registry](integration.md#create_event_registry) | not declared* | Create a new event_registry — CRUD. |
| [create_integration_subscriber](integration.md#create_integration_subscriber) | stateless_command | Create a validated integration event subscriber. |
| [delete_attribute_def](integration.md#delete_attribute_def) | not declared* | Delete a attribute_def by ID — CRUD. |
| [delete_attribute_value](integration.md#delete_attribute_value) | not declared* | Delete a attribute_value by ID — CRUD. |
| [delete_event_registry](integration.md#delete_event_registry) | not declared* | Delete a event_registry by ID — CRUD. |
| [delete_integration_subscriber](integration.md#delete_integration_subscriber) | not declared* | Delete a integration_subscriber by ID — CRUD. |
| [get_all_stock](integration.md#get_all_stock) | query* | Inventory: get all stock |
| [get_attribute_def](integration.md#get_attribute_def) | query* | Get a attribute_def by ID — CRUD. |
| [get_attribute_value](integration.md#get_attribute_value) | query* | Get a attribute_value by ID — CRUD. |
| [get_attribute_value_enriched](integration.md#get_attribute_value_enriched) | query* | Get enriched attribute_value by id (with attribute_def fields) |
| [get_available_stock](integration.md#get_available_stock) | query* | Inventory: get available stock |
| [get_box_sgtins](integration.md#get_box_sgtins) | query* | Marking: get box SGTINs |
| [get_container_hierarchy](integration.md#get_container_hierarchy) | query* | Get by-container balances as a hierarchy (tree) view |
| [get_entity_attribute_row](integration.md#get_entity_attribute_row) | query* | Get single entity attribute row by def_id |
| [get_entity_attributes](integration.md#get_entity_attributes) | query* | Get all attribute definitions with values for a specific entity |
| [get_event_registry](integration.md#get_event_registry) | query* | Get a event_registry by ID — CRUD. |
| [get_expected_sgtins](integration.md#get_expected_sgtins) | query* | Marking: get expected SGTINs |
| [get_integration_event](integration.md#get_integration_event) | query* | Get a integration_event by ID — CRUD. |
| [get_integration_event_delivery](integration.md#get_integration_event_delivery) | query* | Get a integration_event_delivery by ID — CRUD. |
| [get_integration_subscriber](integration.md#get_integration_subscriber) | query* | Get a integration_subscriber by ID — CRUD. |
| [get_inventory_hold](integration.md#get_inventory_hold) | query* | Get a inventory_hold by ID — CRUD. |
| [get_kz_inbound_codes](integration.md#get_kz_inbound_codes) | query* | (The code comment for this item is not in English. |
| [get_pharma_sgtins](integration.md#get_pharma_sgtins) | query* | Marking: get pharma SGTINs |
| [get_shipment_sgtins](integration.md#get_shipment_sgtins) | query* | Marking: get shipment SGTINs |
| [get_withdrawal_codes](integration.md#get_withdrawal_codes) | query* | Marking: get withdrawal codes |
| [list_attribute_def](integration.md#list_attribute_def) | query* | List attribute_def — CRUD. |
| [list_attribute_value](integration.md#list_attribute_value) | query* | List attribute_value — CRUD. |
| [list_event_registry](integration.md#list_event_registry) | query* | List event_registry — CRUD. |
| [list_integration_event](integration.md#list_integration_event) | query* | List integration_event — CRUD. |
| [list_integration_event_delivery](integration.md#list_integration_event_delivery) | query* | List integration_event_delivery — CRUD. |
| [list_integration_subscriber](integration.md#list_integration_subscriber) | query* | List integration_subscriber — CRUD. |
| [list_inventory_balance](integration.md#list_inventory_balance) | query* | List inventory_balance — CRUD. |
| [list_inventory_balance_by_container](integration.md#list_inventory_balance_by_container) | query* | List inventory_balance_by_container — CRUD. |
| [list_inventory_balance_by_lot](integration.md#list_inventory_balance_by_lot) | query* | List inventory_balance_by_lot — CRUD. |
| [list_inventory_balance_by_sku](integration.md#list_inventory_balance_by_sku) | query* | List inventory_balance_by_sku — CRUD. |
| [list_inventory_balance_kpi](integration.md#list_inventory_balance_kpi) | query* | List inventory_balance_kpi — CRUD. |
| [list_inventory_balance_lot](integration.md#list_inventory_balance_lot) | query* | List inventory_balance_lot — CRUD. |
| [list_inventory_balance_on_hold](integration.md#list_inventory_balance_on_hold) | query* | List inventory_balance_on_hold — CRUD. |
| [list_inventory_hold](integration.md#list_inventory_hold) | query* | List inventory_hold — CRUD. |
| [list_inventory_hold_detail](integration.md#list_inventory_hold_detail) | query* | List inventory_hold_detail — CRUD. |
| [list_inventory_pending_move_in_ui](integration.md#list_inventory_pending_move_in_ui) | query* | List inventory_pending_move_in_ui — CRUD. |
| [list_position_serials](integration.md#list_position_serials) | query* | Serial numbers on one inventory position (container or loose location + sku/lot/owner). |
| [list_serial_capture_episode_open](integration.md#list_serial_capture_episode_open) | query* | List serial_capture_episode_open — CRUD. |
| [save_entity_attributes](integration.md#save_entity_attributes) | not declared* | Bulk upsert attribute values for an entity |
| [search_inventory_balances](integration.md#search_inventory_balances) | query* | RF stock search by any of lot / location / LPN / serial / SKU / owner. |
| [sync_stock_log](integration.md#sync_stock_log) | not declared* | Inventory: sync stock log |
| [update_attribute_def](integration.md#update_attribute_def) | not declared* | Update an attribute definition with strict nullable-field semantics. |
| [update_attribute_value](integration.md#update_attribute_value) | not declared* | Update an attribute value with explicit keep, clear and set semantics. |
| [update_event_registry](integration.md#update_event_registry) | not declared* | Update mutable event-catalog metadata; code/builtin identity is immutable. |
| [update_integration_subscriber](integration.md#update_integration_subscriber) | not declared* | Update integration subscriber configuration with explicit webhook clearing. |
| [update_inventory_hold](integration.md#update_inventory_hold) | not declared* | Update inventory-hold comments and auto-release schedule |

`*` The category is inferred from the operation. The catalog does not declare it.

## Special method: rpc.discover

`rpc.discover` is not in the catalog. The server answers it before the login check. It returns the whole OpenRPC document. `GET /api/rpc` returns the same document. See [00-README.md](../00-README.md).

## Methods that skip the login or the permission check

Read from `routes_rpc.rs`:

- No login needed: `fetch_screen`, `fetch_reachable_from`, `list_screens`, `get_revision`
- Login needed, but no permission row is checked: `me`, `list_user_warehouses`

## Gaps in the catalog

- Methods with no summary: 0.
- Methods that list no parameters and really take none (checked in the handler): 8: `me`, `get_warehouse_defaults`, `list_audit_event_kinds`, `get_log_level`, `list_force_close_candidates`, `list_open_episodes_for_operator`, `get_screen_tree`, `list_screen_def`.
- Methods whose catalog entry is empty although they take parameters: 4: `create_project`, `delete_project`, `list_projects`, `update_project`. Their parameters and result fields are read from the Rust source and shown in the reference.
- Methods that list no parameters and are not checked: 0.
