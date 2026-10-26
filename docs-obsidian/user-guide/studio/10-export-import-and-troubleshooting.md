---
title: "Export, import and troubleshooting"
slug: /studio/export-import-and-troubleshooting/
---

# Export, import and troubleshooting

## Export a module

Open the module status menu, then choose **Overview → Export JSON** to obtain a configuration snapshot. Check the module and version before saving the file. Treat exports as configuration data: keep them in the approved project location and review them before sharing.

## Import configuration

The current Graph Explorer does not provide a connected import button. If your project needs a configuration import, agree the supported procedure with the implementation team. Do not look for the import controls described in older Studio help pages.

Review the source and contents before any supported import. Importing metadata is not the same as migrating warehouse stock or customer transactions. Afterwards, inspect the configuration and test the affected workflow through the agreed change process.

## Common problems

| Symptom | First checks |
| --- | --- |
| Editing controls are disabled | Check whether the selected module is Active, Archived or Draft |
| A form is missing from the graph | Check the selected module, layer and filters; use Fit |
| A change is not visible in WMS | Check the draft you edited, the applied version and the affected screen |
| A button opens the wrong record | Inspect the source interaction, parameters and navigation destination |
| A tab changes unexpectedly | Check the target tab or slot and its parent context |
| Apply or import fails | Read the server response; do not keep retrying without understanding it |
| Architecture Catalog or API Map fails | Check the session, installation and displayed error |

## Report a documentation problem

Include the page address, the step that differs and the screen label you see. A screenshot can help, but remove customer stock, contact details and credentials before sharing it. Never include a session cookie, access token or password.

## Recovery after an applied change

Recovery depends on what changed and which versions remain available. Inspect version history and agree the recovery procedure with the person responsible for the installation. Do not assume that discarding a draft reverses an already active version or undoes operational transactions.
