# WMS API guide

This guide explains the WMS JSON-RPC API. Use it to read data from the warehouse system and to run actions such as receiving goods, moving stock and picking orders.

The guide focuses on supported request formats, responses and operational workflows for the current API.

## What the API is

- The API is **JSON-RPC 2.0 over HTTP**. All business calls go to one URL: `POST /api/rpc`.
- A call names a **method** (for example `receipt_close`) and sends **params** (a JSON object).
- The API has **967 methods** in 9 contexts. The full list is in the
  [method reference](reference/index.md).

## Base URL

| Place | Base URL |
|---|---|
| Local development | `http://localhost:8081` |
| Other places | The Quark API address supplied by your administrator. |

The examples use port `8081`; your installation may use another address. API
routes sit under `/api`. The health route sits at `/health`.

## Endpoints

| Method and path | Needs login | Purpose |
|---|---|---|
| `POST /api/login` | No | Log in with a user name and password. Sets a cookie. |
| `POST /api/logoff` | Cookie | Remove the cookie. |
| `POST /api/rpc` | Yes (except 4 metadata methods and `rpc.discover`) | Call a method. |
| `GET /api/rpc` | No | Returns the OpenRPC document. Same as `rpc.discover`. |
| `GET /health` | No | Health check. Returns `{"result":{"success":true}}` when required services are available. Root path, not under `/api`. |

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
| [Quickstart](01-quickstart.md) | Log in and make your first call with `curl`. |
| [Authentication and permissions](02-authentication.md) | Cookie, API key, permissions, warehouse and tenant. |
| [Request and response format](03-request-and-response-format.md) | The request and response shape, `meta` and `data`, filters and paging. |
| [Command types and concurrency](04-command-types-and-concurrency.md) | Query, stateless command and stateful command. Safe repeats. Conflicts. |
| [Errors](05-errors.md) | Error shapes, names and recovery actions. |
| [Rate limits and limits](06-rate-limits-and-limits.md) | Paging, request-size and operational limits. |
| [Webhooks and events](07-webhooks-and-events.md) | Integration events, subscribers and webhook delivery. |
| [Workflows by example](08-workflows-by-example.md) | Call sequences: receive, put away, ship. |
| [Method reference](reference/index.md) | Every method, grouped by context. |

## The 9 contexts

| Context | Methods | What it covers |
|---|---|---|
| `enterprise` | 78 | Users, roles, permissions, API keys, user warehouses, audit log, settings, override grants |
| `master_data` | 127 | Owners, SKUs, locations, packs, policies, barcode formats |
| `inbound` | 119 | ASNs, receipts, receipt lines, damage, receipt policies |
| `inventory` | 161 | Moves, putaway, holds, serials, adjustments, counts, transaction log |
| `outbound` | 298 | Shipment orders, allocation, waves, picking, packing, cartonization |
| `tasks` | 48 | Work areas, operators, equipment profiles, task claim and finish |
| `reporting` | 51 | Reports, labels, templates, printers |
| `rf` | 11 | Handheld (RF) screen definitions |
| `integration` | 74 | Stock reads, marking, entity attributes, event registry, events, subscribers, deliveries |

A context is only a way to group methods. The URL and the call format are the same for all of them.

## Conventions in this guide

- `$BASE_URL` is your base URL, for example `http://localhost:8081`.
- `$WAREHOUSE_ID` is the number of the warehouse you work in. Get it from
  `list_user_warehouses`.
- Placeholders such as `<sku_code>` stand for values you must replace.
- Example responses show the shape. The values are made up.
