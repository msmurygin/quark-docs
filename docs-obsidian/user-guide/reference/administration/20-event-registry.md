# Event registry

The **event registry** is the catalogue of event types: a list of codes such as `process.receipt.closed`.
When something happens in the system (a receipt is closed, a record is saved), the system can write an **event** to the event log. [Subscribers](22-subscribers.md) receive those events.
The registry says which event types exist.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Integrations > Event Registry`.

The menu item is `ent_event_registry_menu`. It opens the list `ent_event_registry_list_form`. The card is `ent_event_registry_normal_form`. The data object is `event_registry` (table `enterprise.event_registry`).

## The list

| Label | Column | Type | Filter | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | The row id. |
| `Code` | `code` | Text | Text | The event code. |
| `Name` | `name` | Text | Text | A readable name. |
| `Category` | `category` | Text | Text | The category. |
| `Active` | `is_active` | Yes/No | none | Whether the event may be written. |
| `Builtin` | `is_builtin` | Yes/No | none | Whether the event type came with the product. |

All columns are read only.

| Button | Needs | What it does | Task page |
|---|---|---|---|
| `New` | Nothing | Opens an empty card in place of the list. | [Adding an event type](41-adding-an-event-type.md) |
| `Delete` | One or more ticked rows | Deletes selected custom rows. Built-in rows are protected. | [Adding an event type](41-adding-an-event-type.md) |
| `Refresh` | Nothing | Reads the list again. | |

Click a row to open its card.
Selected rows are deleted one by one, not as a group. If the selection reaches a built-in row, that row is refused; custom rows already deleted stay deleted. A successful batch reports `{n} Event Registry record(s) deleted`.

## The card

| Label | Column | Type | Required | Allowed values and default | What it does |
|---|---|---|---|---|---|
| `Code` | `code` | Text, up to 100 characters. Unique. | Yes | Dot-separated, for example `bio.receipt.after_insert`, `process.receipt.closed`, `schedule.daily.lot_check` (the column comment). | The key of the event type. **It cannot be changed after the first save.** |
| `Name` | `name` | Text, up to 200 characters | Yes | Any text. | Stored only. It has no effect today. |
| `Description` | `description` | Text | No | Any text, or empty. | Stored only. It has no effect today. |
| `Category` | `category` | Drop-down, up to 30 characters | Yes | `bio_lifecycle` (BIO Lifecycle), `business` (Business, the database default), `field_change`, `form_render`, `scheduled`, `policy`, `custom`. | Stored only. It has no effect today. |
| `Active` | `is_active` | Check box | No | On by default. | For the events `bio.<table>.<operation>` that the system writes when a record is saved, this decides whether the event is written. See below. |
| `Builtin` | `is_builtin` | Check box | No | Read only. **Yes** for a product event type; **No** for an entry created by an administrator. | Distinguishes protected product types from removable custom types. |

Buttons: `Save` saves and goes back. `Delete` deletes a custom event type and goes back. A built-in event type cannot be deleted.

The columns `bio_def_id` and `payload_schema` have no field. The second one describes the payload of the event as a JSON schema.

An entry created from **New** is always saved as custom, so **Builtin** shows **No** after the first save. The create action cannot mark an entry as built-in.

## What the registry really does

Only two things in the code read the registry (searched in Rust, SQL, Go and TypeScript):

1. **`Active` gates the record-change events.** When a record of a table is created, changed or deleted through the generic layer, the system builds the code `bio.{table}.{operation}` (for example `bio.receipt.after_insert`). It writes the event only if the registry holds a row with this code and `Active` is on. Otherwise nothing is written
   (`crates/libs/wms-lib-core/src/model/base/crud_fns.rs:669` and `:704`).
   Several of the shipped `bio.*` rows are switched off (for example the three `bio.handling_unit_type.*` rows, `012_handling_unit_type.sql`).
2. **The screen and the API list it.** `list_event_registry` and the other methods return the rows.

The business events `process.*` (for example `process.receipt.closed`) are written by the business code. That code does not look at the registry. Switching `Active` off for such a row does not stop the event (`crates/libs/wms-lib-core/src/model/integration/event_publisher.rs`, `publish_typed_in_txn`).
The code of a business event must still match a row, by agreement (`event_publisher.rs:23`), but nothing checks it.

The seeded rows come from the enterprise migrations. The list on your screen is the truth for your system.

## Rules

| Rule | Where it comes from |
|---|---|
| `Code` is unique. | Unique key `event_registry_code_key`. A duplicate gives `Duplicate entry on event_registry (constraint ...)`. |
| An administrator-created type is custom. | **Builtin** is read only and the create action always saves **No**. |
| A built-in type cannot be deleted. | Delete returns `built-in event type '{code}' cannot be deleted`. |
| After the first save only `Name`, `Description`, `Category` and `Active` can change. | `update_event_registry` accepts only these four fields (`crates/services/app-server/src/web/rpcs/event_registry_rpc.rs:24`). |
| Deleting a type deletes its bindings. | The foreign key `event_binding.event_id` is `ON DELETE CASCADE`. |

Before deleting a custom type, confirm that its bindings are no longer needed. Deletion removes those bindings, but existing event and delivery history remains available.

## Who can use it

`create_event_registry`, `update_event_registry` and `delete_event_registry` are open to the default roles `ADMIN` and `MANAGER`.
The read methods are open to `ADMIN`, `MANAGER`, `OPERATOR` and `VIEWER` (`event_registry_rpc.rs:7`).
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Adding an event type](41-adding-an-event-type.md)
- [Event monitor](21-event-monitor.md)
- [Subscribers](22-subscribers.md)
- [Event and delivery statuses](93-event-and-delivery-statuses.md)
- Administrator guide: [Integrations and API](../../admin/09-integrations-and-api.md)
- API: `create_event_registry`, `update_event_registry`, `delete_event_registry`, `list_event_registry`. RF terminal: none.
