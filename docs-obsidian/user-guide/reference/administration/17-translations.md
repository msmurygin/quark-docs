# Translations

The `Translations` screen is where you read and write the texts of the screens in each language.
It has two tabs: `Labels` (the captions of screens, fields, buttons and menus) and `Messages` (the sentences the system shows, such as errors and toasts).
English is the original text. Each other language has one translation slot for each text.

## How to open it

1. Switch to **Enterprise**. See [Enterprise sidebar](00-administration-overview.md).
2. Open `Configuration > Translations`.

The menu item is `ent_translations`. It opens the form `translations_tabbed` with the tabs `Labels` (`translations_label_list`) and `Messages` (`translations_message_list`).

## Languages

The languages are the active rows of the table `locale` of the metadata database. The product ships three:

| Code | Name | Is the original |
|---|---|---|
| `en` | English | Yes |
| `ru` | Русский | No |
| `kk` | Қазақша | No |

Each text has one slot for each active language except the original. The slots are made by database triggers: `label_fanout` when a label is made and `locale_backfill` when a language is switched on
(`crates/libs/wms-lib-core/src/model/label.rs`, module comment). For messages, every key has a row for every active language (`crates/services/web-ui-server/src/i18n/registry.rs:169`).

An empty slot means "not translated yet". The screen then shows the English text. A blank translation is stored as empty (NULL), never as a blank string: the extension `blank_text_is_absent` does it, and the database refuses a blank string as a second guard
(`crates/services/web-ui-server/src/extensions/customization/bio_extensions/blank_text_is_absent_ext.rs`).
Spaces only count as blank.

## Labels tab

The form is `translations_label_list` (data object `translations_label`, table `label`).

| Label | Column | Type | Filter | Visible | What it shows |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | The label id. The list is sorted by it, oldest first. |
| `English` | `default_text` | Text | Text | Yes | The English caption. This column is also the quick filter. |

All columns are read only. There is no toolbar. Click a row to open the label.

### The label page

The form is the shell `translations_label_shell`. The top part is `translations_label_header`, the bottom part is `translations_label_detail`.

**Top part (the original text).** Data object `translations_label`.

| Label | Column | Type | Required | What it does |
|---|---|---|---|---|
| `English` | `default_text` | Text area | Yes | The original caption, which every screen shows when a translation is missing. |

The button `Save` validates and saves it (`generic_validate`, `generic_save`).
Changing the English text does not touch the other languages. They keep their words, even if they no longer fit.

**Bottom part (the translations).** Data object `translations_label_text` (view `label_text_with_locale`). The grid has one row for each active non-original language.

| Label | Column | Type | Editable | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | Hidden. |
| `Language` | `locale_code` | Text | No | The language code. Sorted ascending. |
| `Language Name` | `locale_name` | Text | No | The name of the language. |
| `Translation` | `text` | Text | Yes | The translated caption. Empty means not translated. |

The button `Save` saves the changed cells (`generic_grid_save`).

## Messages tab

The form is `translations_message_list` (data object `translations_message`, table `message_keys`).

| Label | Column | Type | Filter | Visible | What it shows |
|---|---|---|---|---|---|
| `ID` | `id` | Whole number | Number | No | The key id. |
| `Key` | `message_key` | Text | Text | Yes | The key, for example `auth.login_failed`. The list is sorted by it. Also a quick filter. |
| `English` | `default_text` | Text | Text | Yes | The English sentence. Also a quick filter. |

All columns are read only. Click a row to open the message.

### The message page

The form is the shell `translations_message_shell`.

**Top part.** Data object `translations_message`.

| Label | Column | Type | Required | Editable | What it does |
|---|---|---|---|---|---|
| `Key` | `message_key` | Text | Yes | No | The name the program uses to find the text. It cannot be changed here. |
| `English` | `default_text` | Text area | Yes | Yes | The original sentence. |

The button `Save` validates and saves it.

**Bottom part.** Data object `translations_message_text` (view `message_translations_with_locale`).

| Label | Column | Type | Editable | What it shows |
|---|---|---|---|---|
| `ID` | `id` | Whole number | No | Hidden. |
| `Language` | `locale` | Text | No | The language code. Sorted ascending. |
| `Language Name` | `locale_name` | Text | No | The name of the language. |
| `Translation` | `translated_text` | Text | Yes | The translated sentence. Empty means not translated. |

Some messages hold place-holders such as `{0}` and `{1}`, which the program fills in, for example `Imported {0} cells across {1} roles.`
Keep the place-holders in the translation.

## What it affects

- The texts of every web screen, for users whose `Language` is the translated language (see [User card, General tab](11-user-general-tab.md)).
- The translations are loaded into a registry in memory. Only slots with words are loaded (`registry.rs:169`).

> Not confirmed by code: how soon a saved translation appears on other screens, and whether the web server must reload its metadata first. The registry is loaded at start and rebuilt by `TranslationRegistry::refresh` (`registry.rs:604`); this page did not find who calls it after a save. To verify: translate one label, open a screen that uses it as a user of that language, and note if the new text shows without a restart.

## Who can use it

These screens read and write the metadata database through the generic actions `generic_save`, `generic_grid_save` and `generic_validate`, not through API methods.
There is no `list_label` or similar method. Who may press the buttons is decided by the web action gate and the form gate (see [Who can do what](91-who-can-do-what.md)).
In Enterprise only `ADMIN` reaches the screen.

## Related pages

- [Translating a label or message](39-translating-a-label-or-message.md)
- [Messages catalogue](94-messages-catalogue.md)
- Administrator guide: [Users, roles and permissions](../../admin/02-users-roles-permissions.md)
- API: none. The screen writes through the actions `generic_save` and `generic_grid_save`. RF terminal: none.
