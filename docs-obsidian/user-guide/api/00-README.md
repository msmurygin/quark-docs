# WMS API guide

This guide explains the WMS JSON-RPC API. Use it to read data from the warehouse system and to run actions such as receiving goods, moving stock and picking orders.

Every fact in this guide comes from the source code in the separate Quark WMS repository. When a fact could not be checked in the code, it is marked with `> Not confirmed by code:`.

## What the API is

- The API is **JSON-RPC 2.0 over HTTP**. All business calls go to one URL: `POST /api/rpc`.
- A call names a **method** (for example `receipt_close`) and sends **params** (a JSON object).
- The server is `app-server`. It is a Rust program built on Axum.
- The API has **932 methods** in 9 contexts. The full list is in [reference/index.md](reference/index.md).

## Base URL

| Place | Base URL |
|---|---|
| Local development | `http://localhost:8081` |
| Other places | The address of your `app-server`. Ask your administrator. |

The local port comes from `SERVICE_WEB_PORT = "8081"` in `.cargo/config.toml`. The API routes sit under `/api`. Two operations routes, `/health` and `/metrics`, sit at the root.

## Endpoints

| Method and path | Needs login | Purpose |
|---|---|---|
| `POST /api/login` | No | Log in with a user name and password. Sets a cookie. |
| `POST /api/logoff` | Cookie | Remove the cookie. |
| `POST /api/rpc` | Yes (except 4 metadata methods and `rpc.discover`) | Call a method. |
| `GET /api/rpc` | No | Returns the OpenRPC document. Same as `rpc.discover`. |
| `GET /api/auth-bridge` | Service token | Single sign-on from `web-ui-server`. Not for outside callers. |
| `POST /api/admin/rbac/reseed` | API key only | Rebuild the default permissions. See [02-authentication.md](02-authentication.md). |
| `GET /health` | No | Health check. Returns `{"result":{"success":true}}` when the database answers. Root path, not under `/api`. |
| `GET /metrics` | No | Delivery metrics for the integration worker. Root path. |

## The OpenRPC document

The server publishes a machine-readable description of every method.

- Call `GET /api/rpc`, or call the method `rpc.discover` with `POST /api/rpc`. No login is needed.
- The document follows OpenRPC 1.3.2. The API version in `info.version` is `1.0.0`.
- Download the machine-readable catalogue from the [API portal](pathname:///api/openrpc.json).
- Each method has extra keys that start with `x-quark-`. They tell you the command type, the roles that have access by default, and which version fields the method checks.

There is **no version number in the URL**. The path is always `/api/rpc`. A change to a method shows up as a different schema hash (`x-quark-request-schema-hash` and `x-quark-response-schema-hash`) in the OpenRPC document.

## What is in this guide

| File | What you learn |
|---|---|
| [01-quickstart.md](01-quickstart.md) | Log in and make your first call with `curl`. |
| [02-authentication.md](02-authentication.md) | Cookie, API key, permissions, warehouse and tenant. |
| [03-request-and-response-format.md](03-request-and-response-format.md) | The request and response shape, `meta` and `data`, filters and paging. |
| [04-command-types-and-concurrency.md](04-command-types-and-concurrency.md) | Query, stateless command and stateful command. Safe repeats. Conflicts. |
| [05-errors.md](05-errors.md) | Every error shape and code in the code base. |
| [06-rate-limits-and-limits.md](06-rate-limits-and-limits.md) | The limits that exist, and the ones that do not. |
| [07-webhooks-and-events.md](07-webhooks-and-events.md) | Integration events, subscribers and webhook delivery. |
| [08-workflows-by-example.md](08-workflows-by-example.md) | Call sequences: receive, put away, ship. |
| [reference/index.md](reference/index.md) | Every method, grouped by context. |

## The 9 contexts

| Context | Methods | What it covers |
|---|---|---|
| `enterprise` | 78 | Users, roles, permissions, API keys, user warehouses, audit log, settings, override grants |
| `master_data` | 127 | Owners, SKUs, locations, packs, policies, barcode formats |
| `inbound` | 119 | ASNs, receipts, receipt lines, damage, receipt policies |
| `inventory` | 161 | Moves, putaway, holds, serials, adjustments, counts, transaction log |
| `outbound` | 263 | Shipment orders, allocation, waves, picking, packing, cartonization |
| `tasks` | 48 | Work areas, operators, equipment profiles, task claim and finish |
| `reporting` | 51 | Reports, labels, templates, printers |
| `rf` | 11 | Handheld (RF) screen definitions |
| `integration` | 74 | Stock reads, marking, entity attributes, event registry, events, subscribers, deliveries |

A context is only a way to group methods. The URL and the call format are the same for all of them.

## Conventions in this guide

- `$BASE_URL` is your base URL, for example `http://localhost:8081`.
- `$WAREHOUSE_ID` is the number of the warehouse you work in. In the development seed, `WH1` has the id `1000`.
- Placeholders such as `<sku_code>` stand for values you must replace.
- Example responses show the shape. The values are made up.

## How this guide is maintained

The method catalog and the files in `reference/` are generated from Quark WMS code. The server source and its Rust generator live in the separate WMS repository; they are not part of this documentation website. Maintainers generate and review the catalog there, then update `openrpc.json` and `reference/` here.

The website builds the API portal from that reviewed catalog with `npm run gen:api` in `docs-site`. Its tests compare the generated portal with the catalog. They do not certify a customer's running installation.

The numbered API chapters are written by hand. When a method changes, check the relevant examples and instructions against the current catalog and implementation.
