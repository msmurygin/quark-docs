---
title: "Transfer stock to another lot"
---

# Transfer stock to another lot

Use a lot transfer when stock is physically in the correct location and LPN but its lot or lot attributes must change. The transfer keeps the location, container, owner and SKU. It moves the selected quantity from the source lot to a matching or newly created target lot.

## Before you start

- You have the **ADMIN**, **MANAGER** or **SUPERVISOR** role. Operators cannot create or post lot transfers.
- The source stock exists in **Balances** and has free quantity.
- The SKU has the correct lot policy and attributes.
- You know the attribute values the stock should have after the transfer.

## Create the document

1. Open **Management & Control > Inventory > Lot Transfers**.
2. Select **New**. The system assigns an `LTR` number and opens a **Draft** document.
3. Add a **Comment** when it will help the reviewer understand the correction.
4. Select **Save**.
5. In **Lot Transfer Lines**, select **Add Line**.
6. Open **Stock** and choose the exact balance row. Check its location, LPN, SKU, source lot and available quantity.
7. Enter **Quantity**, or leave it empty to take all quantity currently free on that stock row.
8. For a serial-tracked SKU, enter the serials that move with this line, one serial for each moved unit. You may leave the list empty only when the line transfers the full free quantity; in that case, every free serial on the chosen stock row moves.
9. Select **Save**.

The saved line shows the source identity and a **Lot Attributes** table. **Was** is the value on the source lot. **Becomes** is the value the stock will receive.

## Set the target lot attributes

1. In the **Lot Attributes** table, enter each new value under **Becomes**.
2. Complete every required attribute.
3. Select **Save Attributes**.
4. Repeat for other lines when several stock positions need the same controlled change.

If an existing lot has exactly the resulting attribute set, the stock joins that lot. Otherwise posting creates a new lot and marks the line as **New Lot**.

## Post the transfer

1. Return to the document header.
2. Check every line, its quantity and the **Becomes** values.
3. Select **Post**.

Posting is all or nothing. Every line moves, or none of them does. The stock remains in the same location and LPN; only its lot identity changes.

The transfer can be refused when:

- the source stock no longer has the selected free quantity;
- required lot attributes are empty or invalid;
- the source or target lot is on hold;
- the SKU's lot policy changed after the line was prepared;
- a hard inventory count is protecting the location and no supervisor authorization is available;
- another user changed the document after you opened it.

A posted transfer is read only. Delete is available only while the document is still a draft.

## What you should see

- The source lot loses the posted quantity.
- The target lot gains the same quantity in the same location and LPN.
- **New Lot** tells you whether posting created the target lot.
- The inventory transaction history records the transfer.
