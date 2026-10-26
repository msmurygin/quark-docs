---
title: "Interactions and navigation"
slug: /studio/interactions-and-navigation/
---

# Interactions and navigation

An interaction connects a user action to behaviour and, where needed, to navigation. A toolbar button, row click and field change are different triggers; check which one you are editing.

## Inspect before changing

Select the source form and open its navigation or interaction details. Identify the trigger, any linked extension or handler, the navigation kind and the destination. A target form alone does not describe the complete action.

## Common navigation intentions

| Intention | What to check |
| --- | --- |
| Replace the current screen | The destination and current record context |
| Return to the previous screen | The return path and any save action before it |
| Open a form in a shell slot | The parent shell, target slot and child form |
| Open a form in a tab | The intended tab and the record passed to it |
| Stay on the current screen | The action result and whether the displayed data refreshes |

The available navigation kinds and fields are shown by the editor. Do not copy a navigation code from another module without checking its destination and parameters.

## Connect mode

Use Connect mode in an editable draft to create a supported connection between nodes. Read the connection menu and confirm what kind of link you are adding. Afterwards, select the new connection and inspect its details in the sidebar.

## Test a list-to-detail journey

1. Open the list with representative records.
2. Open one record using the intended row or toolbar action.
3. Confirm that the detail form shows that record.
4. Save a small test change.
5. Return to the list and check the displayed result.
6. Repeat with an empty list or an unavailable record where your workflow permits it.

A field-change interaction can run while the user is still editing. Check its trigger and dependencies so that it does not overwrite another field unexpectedly.
