---
title: "Graph Explorer"
slug: /studio/graph-explorer/
---

# Graph Explorer

Use Graph Explorer to follow the relationship between a module, its data entities, forms and actions.

## Open and find your module

1. Sign in to your WMS installation, then open Studio from its configured entry point.
2. Select **Graph Explorer** in the top navigation.
3. Use the module selector to find the module you need. Check its version and **Active**, **Draft** or **Archived** status.
4. Choose a layer, then select a node. Read its details in the sidebar before opening an editor.
5. Use **Fit** to bring the graph back into view if you lose your position.

Active modules are shown read-only. Create a draft before editing configuration.

## Layers

| Layer | What it helps you inspect |
| --- | --- |
| BIOs | Data entities and their relationships |
| Forms | Screens, tabs, slots and form connections |
| Extensions | Registered behaviour and bindings |
| Navigation | Transitions between screens |
| Menu | Menu entries for the module |
| Toolbar | Available actions and their items |

The floating controls provide panning, selection, zoom, fit and draft editing actions. Availability depends on the selected layer and whether the module can be edited.

## Keyboard shortcuts

Shortcuts apply when focus is not in a text input.

| Key | Action |
| --- | --- |
| `F` | Fit the graph |
| `Escape` | Close the sidebar and leave Connect mode |
| `+` or `=` | Zoom in |
| `-` | Zoom out |
| `1` | BIOs |
| `2` | Forms |
| `3` | Toolbar |
| `4` | Extensions |
| `5` | Navigation |
| `6` | Menu |

## Follow a connection

Select a form and inspect its details and navigation. Distinguish a form connection from a data relationship: a tab or slot describes screen composition, while a BIO relationship describes related data. Use the sidebar and connection labels to establish which one you are changing.
