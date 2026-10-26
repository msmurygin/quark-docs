# By Container tab

The `By Container` tab shows **one row for each container** (pallet, case, tote) with the total of the stock in it. Containers are drawn in parent and child order: a case that stands on a pallet is shown under the pallet and indented.
The form is `inventory_balance_container_list`. The data object is `inventory_balance_by_container`, over the view of the same name. The list is read by `list_inventory_balance_by_container`, and the tree order comes from `get_container_hierarchy` (action `generic_flat_hierarchy`, `crates/services/web-ui-server/src/extensions/generic/tree_query_action.rs:315`).

The list is read only. A click on a row does nothing.

## Which containers are shown

All containers except those with status `Disposed` or `Planned` (`crates/libs/wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:2335-2362`). A container with no stock is shown with quantity 0.

## Columns

| Label | Column | Type | Filter | Quick filter | Shown at first | What it shows |
|---|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | No | The id of the container. |
| `Container` | `code` | Text | Text | Yes | Yes | The container code (LPN). Drawn with a glyph and an indent by depth. |
| `Type` | `container_type` | Text | Text | Yes | Yes | `Pallet`, `Case`, `Tote` or `Generic`. |
| `Parent` | `parent_code` | Text | Text | No | Yes | The code of the container this one stands in. Empty for a top container. |
| `Location` | `location` | Text | Text | Yes | Yes | The current location of the container (`container.current_loc`). |
| `Status` | `status` | Text | Text | Yes | Yes | `On hold` when a hold that is on names this container's code. Otherwise the status of the container: `Active`, `Empty`, `InTransit`. |
| `SKU` | `sku_count` | Whole number | Number | No | Yes | How many different SKUs are in the container. The header says `SKU`, the value is a count. |
| `Qty` | `qty` | Decimal | Number | No | Yes | The sum of `qty` over the balance rows of the container itself. |
| `Alloc` | `qty_allocated` | Decimal | Number | No | Yes | The sum of `qty_allocated`. |
| `ATP` | `atp` | Decimal | Number | No | Yes | The sum of `atp`. See [ATP](01-balances-screen-overview.md#atp-available-to-promise). |
| `Origin` | `origin` | Text | Text | No | Yes | How the container came to exist (`container.origin`). |
| `Created` | `created` | Date and time | Date | No | Yes | When the container was created (`container.add_when`). |
| `Owner` | `owner_id` | Whole number | Number | Yes | Yes | Shown as the owner code. |

## What each column affects

### Qty, Alloc, ATP

- Only the balance rows whose `container_id` is this container are added. The stock of a child container is shown on the child's own row, not added to the parent. The tree view is only a layout.

### Status

- The view uses `On hold` for **any** hold that is on and has this container's code in `lpn`, whether or not the hold blocks anything.
- The statuses `Disposed` and `Planned` never show, because those containers are left out.

> Not confirmed by code: whether the child rows are added to the parent row's `Qty` when the screen draws the tree. The view groups by container only. To verify: open a pallet with a case on it that holds stock, and compare the pallet's `Qty` with the case's.

## Related pages

- [Balances screen](01-balances-screen-overview.md)
- [By Location tab](10-by-location-tab.md)
- [On Hold tab](16-on-hold-tab.md)
- API: `list_inventory_balance_by_container`, `count_inventory_balance_by_container`, `get_container_hierarchy`
- RF terminal: none.
