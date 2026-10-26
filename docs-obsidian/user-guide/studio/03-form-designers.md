---
title: "Form designers"
slug: /studio/form-designers/
---

# Form designers

Studio provides editors for different kinds of forms. Start from an existing form in the draft and open the designer that matches its kind.

## Detail and edit forms

Use the Form Designer to arrange fields and adjust their properties. Select a field to inspect its label, widget, layout and other available settings in the property drawer. Change one setting at a time when investigating an existing screen.

A visible label is not the stored field name. Check the data binding before renaming, moving or adding a field. Use the preview to inspect layout, then use the actual WMS screen to check behaviour.

## Lists

The List Designer configures list columns and their display properties. Check the bound field, order, width, formatter and editor settings where they are available. A column that looks correct in an empty preview still needs a check with representative rows.

Test long values, blank values and the operation that opens a record from the list.

## Tabbed forms and shells

Tabbed and shell designers arrange child forms in a larger workspace. Check the selected child form and its tab or slot, rather than assuming the visible tab caption identifies the underlying form.

When a toolbar action should update a child tab, use the intended tab navigation. Test that the user stays in the expected parent context. See [Interactions and navigation](04-interactions-and-navigation.md).

## HTML-file forms

HTML-file forms use their own page content rather than the normal field layout. The HTML editor is a separate editing surface. Review custom content and its resource references before applying it. Do not paste credentials, customer data or untrusted scripts into a page.

## Check an edited screen

1. Confirm that the correct field or column is bound.
2. Check its label and required settings.
3. Review a narrow layout and long text in the designer.
4. Save the draft configuration.
5. Apply through the agreed change process.
6. Test opening, editing, saving and returning in the WMS interface.
