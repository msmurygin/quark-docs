---
title: "Runtime API Map"
slug: /studio/runtime-api-map/
---

# Runtime API Map

Runtime API Map shows how the running server describes API methods, active overrides and compatibility information. It is an inspection view, not an API client.

## States

| State | Meaning to investigate |
| --- | --- |
| Native | The map identifies the native implementation |
| Overridden | Active override information is present |
| Not ready | The map reports a readiness issue |
| Incompatible | The map reports a compatibility issue |

Read the reason displayed for the method. A state label alone is not enough to decide whether a change can be applied.

## Inspect a method

1. Open **Runtime API Map** in the top navigation.
2. Use the search and state filters to find the method.
3. Read its owner, class, operation and override information.
4. Where an active binding is shown, check its module, version and warehouse context.
5. Open **Schemas and compatibility hashes** to compare the published and observed request and response descriptions.

A missing published schema or a compatibility warning needs investigation before changing an override. Do not assume that every method can be overridden.

For calling the WMS JSON-RPC API, use the [API guide](../api/00-README.md) and its generated reference. The Runtime API Map serves a different purpose: understanding the implementation that is active in your installation.
