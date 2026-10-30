# Translating a label or message

Use this page to give a screen text in another language, or to correct a text.

## Before you start

- You hold the role `ADMIN` and can open Enterprise.
- You know whether the text is a **label** (a caption on a screen, a field, a button, a menu) or a **message** (a sentence such as an error or a notice). Labels are on the `Labels` tab, messages on the `Messages` tab.
- You know the language code you will write: `ru` for Русский, `kk` for Қазақша.
- The person who will read the text has this language set in `Language` on the [user card](11-user-general-tab.md).

## Steps: translate a label

1. Switch to **Enterprise**.
2. Open `Translations`. The tab `Labels` is open.
3. Find the label. Type a part of the English text in the quick filter, or use the filter of the column `English`.
4. Click the row. The label page opens.
5. In the grid below, find the row of your language.
6. Click the cell `Translation` and type the text.
7. Click `Save` under the grid. The message `Changes saved` appears.

## Steps: translate a message

1. Open `Translations` and click the tab `Messages`.
2. Find the message by its `Key` (for example `auth.login_failed`) or by its English text.
3. Click the row.
4. Type the text in the cell `Translation` of your language.
5. Click `Save` under the grid.

If the English text contains place-holders such as `{0}`, keep them in the translation. The program fills them in.

## Steps: correct the English text

1. Open the label or message as above.
2. Change `English` in the top part.
3. Click `Save` in the top part. For a label, `Default text is required` appears if you left it empty.

The translations of the other languages are not changed. Check them after you change the English.

## Steps: take a translation back

Clear the cell `Translation` and save. The slot becomes empty (not translated), and the screen shows the English text again. A text of only spaces is treated as empty too.

## What changes

| What | Change |
|---|---|
| Table `label_text` (labels) or `message_translations` (messages) | The slot of the language holds the new text, or is empty. |
| Table `label` or `message_keys` | `default_text` holds the new English text (when you changed it). |
| Screens | They show the new text, after the web server has reloaded its translations. |

## What can go wrong

| Problem | Meaning | Fix |
|---|---|---|
| `Default text is required` | `English` is empty. | Type the English text. |
| The screen still shows English | The slot is empty, or the web server has not reloaded yet, or the user's `Language` is not the one you translated. | Check each in turn. |
| A label appears as `[label:1234]` | The web server could not read its translation registry for that request. | Reload the page; if it stays, report it with the number. |

## Related pages

- [Translations](17-translations.md)
- [User card, General tab](11-user-general-tab.md) (the `Language` field)
- API: none. The screen saves through `generic_save` and `generic_grid_save`. RF terminal: none.
