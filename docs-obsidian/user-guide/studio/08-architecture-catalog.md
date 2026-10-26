---
title: "Architecture Catalog"
slug: /studio/architecture-catalog/
---

# Architecture Catalog

Architecture Catalog is a read-only view of the executable architecture known to the running server. Use it to connect a configuration question to the forms, BIOs and registered code involved.

## What it shows

| Section | What you can inspect |
| --- | --- |
| Forms | Form codes and kind or source details |
| BIOs | Data entity codes and source details |
| Runtime registries | Registered code and the metadata that uses it |

The header shows a metadata revision. Counts describe the catalog returned by your running server, so they can change between installations and revisions.

## Find a specific item

1. Open **Architecture Catalog** in the top navigation.
2. Filter by a code, kind or usage.
3. Find the relevant row.
4. Choose **Open exact row** to inspect its configuration in Studio.
5. For a registered item, inspect its usages before deciding what depends on it.

An empty usage list means the registered code is currently unbound in this catalog. It does not mean the code is missing or that it is automatically enabled.

## If the catalog does not load

Read the error shown by the page. Check that you are signed in to the intended installation and can access Studio. Give the administrator the view name, the time and the error message, without including session cookies or credentials.
