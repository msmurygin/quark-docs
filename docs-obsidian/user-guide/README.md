# WMS user guide

| Part | For | Start here |
|---|---|---|
| [operator/](operator/00-README.md) | Warehouse staff using the RF terminal (receiving, putaway, move, count, pick, pack) | `operator/00-README.md` |
| [admin/](admin/00-README.md) | Administrators who set up and run the web application | `admin/00-README.md` |
| [studio/](studio/00-README.md) | Configuration and implementation teams | `studio/00-README.md` |
| [integration-platform/](integration-platform/00-README.md) | Teams that connect WMS, ERPs, marketplaces and other services | `integration-platform/00-README.md` |
| [api/](api/00-README.md) | Integrators who call the JSON-RPC API | `api/00-README.md` |
| [assets/](assets/) | Screenshots (`assets/screens/*.png`) and the list of missing ones | [MISSING-SCREENSHOTS.md](assets/MISSING-SCREENSHOTS.md) |

## Screenshot conventions

- **Where they come from.** Every picture is made by `scripts/docs-screenshots/` (see its `README.md`): `capture.mjs` + `screens.json` for the web UI, `capture-rf.mjs` + `rf-screens.json` for the RF terminal. Do not edit PNGs by hand; change the manifest and capture again.
- **File names.** The file name is the manifest id in kebab-case: `receipts-list.png`, `rf-receive-asn.png`. Web shots are 1440x900 at 2x (2880x1800); RF shots are 390x780 at 2x. Web shots use the light theme; RF shots use the dark terminal theme.
- **Syntax in the guides.** `![Alt text](../assets/screens/<id>.png)`, then a blank line (admin) or the next line (operator) with an italic caption.
  - Alt text: one plain-English sentence that says what the screen is and what is on it. It is what a screen reader says.
  - Caption: ends with `Focus: ...`, a short sentence that says where to look (for example "The Status field shows Released."). Full-page web shots are generic, so the caption must say which part to look at.
- **One picture, several places.** One full page can serve more than one placeholder (for example the order form is used for both the header and the lines). The caption names the part to look at.
- **Placeholders.** A placeholder keeps its old name (form code such as `hold_form`, or screen code such as `PICK02`) until a real picture exists. The list is in [assets/MISSING-SCREENSHOTS.md](assets/MISSING-SCREENSHOTS.md), with the data each shot needs and its manifest id.
- **Adding a screen.** Add an entry to the manifest, mark it `"status":"untested"` until you have run it on the stand and looked at the result, capture it with `--only <id>`, then change the guide. The runners ignore the `status` and `note` keys. A plain run without `--only` also runs untested entries, so expect some `_failed_*.png` files until they are checked.
- **Check every picture before you use it.** Open the PNG. A shot taken too early shows "Loading..." (two of them did), and some screens are empty because the seed has no data.

## Known quality gaps (recorded, not fixed)

- Seed data looks like test data: receipt numbers such as `ca12afU2` and `9e3d50A1`, LPNs such as `L-SET-0583b929`, and **DEMO** badges on the dashboard tiles.
- The breadcrumb shows the record id, not the number on the form: the order form shows `0000000002` but the breadcrumb says `1001`. The user, role and location forms show the same effect (`1000`, `1071`).
- The RPC Documentation page shows the stand port in its curl example (`http://127.0.0.1:18081/api/rpc`). Real installations use their own address.
- No annotations or call-outs yet. Only `menu-navigation.png` has a red frame. Readers must rely on the caption.
- The web sidebar is cropped in the middle of the menu in several shots (it scrolls on its own), so the group you are reading about may be hidden.
- Some seed content is not in English (the report names in Reports) and the user form shows an empty Full name.
- Pick Assignments is empty, and the Enterprise Warehouses shot (`enterprise-warehouses.png`) is a blank page.
