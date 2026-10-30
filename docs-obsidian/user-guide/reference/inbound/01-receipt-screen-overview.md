# Receipt screen

The receipt screen opens when you click a row of the [receipts list](00-receipts-overview.md) or press `New`.
It shows one receipt. The **header** is in the top part. The **lines** are in the bottom part.

![Receipt 0000000011: the Header tab on top and the list of lines below](../../assets/screens/receipt-detail.png)

*Caption: a receipt in status InProgress. Focus: 1 The Completion field shows Partially received while the Status field shows InProgress. 2 The Damage Records tab. The lines are in the list below, with the buttons New, Delete, Refresh, Receive, Resume scan and Adjust Qty.*

## Layout

The screen is a shell form (`receipt_shell`) with two slots.

| Slot | Form | Share of the height | Content |
|---|---|---|---|
| Top | `receipt_tabbed` ("Receipt") | 40% | The header, in seven tabs. |
| Bottom | `receipt_detail_list` ("Receipt Lines") | 60% | The lines of the receipt. |

The breadcrumb shows `Dashboard > Receipts > {receipt number}`.
The arrow at the left of the toolbar goes back to the list.

## Header tabs

| Tab | Page | What it holds |
|---|---|---|
| `Header` | [Header tab](10-header-tab.md) | Number, owner, status, type, carrier, supplier, PO, door, expected date. |
| `Dates` | [Dates tab](11-dates-tab.md) | Eight dates. |
| `Shipping` | [Shipping tab](12-shipping-tab.md) | Vehicle, driver, trailer, temperature, weight, volume. |
| `Summary` | [Summary tab](13-summary-tab.md) | Completion, version, close summary, cancel summary. Read only. |
| `Audit` | [Audit tab](14-audit-tab.md) | The change history of the header. Read only. |
| `Damage Records` | [Damage Records tab](15-damage-records-tab.md) | Reported damage. Read only. |
| `Expected Boxes` | [Expected Boxes tab](16-expected-boxes-tab.md) | Planned pallets and boxes, with `Move Boxes` and `Cancel Box`. |

## Header toolbar (`receipt_tabbed_toolbar`)

| Button | What it does |
|---|---|
| Back arrow | Returns to the receipts list. |
| `Save` | Checks that `Receipt Number` and `Owner` are filled, then saves the header. A new receipt is created. A saved receipt is updated. |
| `Delete` | Deletes this receipt and its unreceived lines, then returns to the list. See [Deleting receipts](32-deleting-receipts.md). |

The status buttons (hold, release, cancel, close) are on the [receipts list](00-receipts-overview.md), not on this screen.

## Lines area

The lines list has its own toolbar. See [Receipt lines list](20-receipt-lines-list.md).
Click a line to open the **line card**. The card replaces the lines list in the bottom slot.
The card has its own tabs. See [Line detail tab](21-line-detail-tab.md).

## What changes on screen with the status

| Status of the receipt | Header fields | Lines toolbar |
|---|---|---|
| New, not saved | `Receipt Number`, `Owner` and `Receipt Type` can be edited. | Buttons are grey with the text "Save receipt first". |
| `Open`, `InProgress` | Reference fields can be edited. `Receipt Number`, `Owner`, `Status` and `Completion` cannot. `Receipt Type` can be edited only for types `Sscc` and `CaseLevel` in status `Open`. | `New` and `Delete` work. |
| `OnHold` | Same as above. | `New` and `Delete` are grey: "The receipt is closed, cancelled or on hold - lines can no longer be added or removed". |
| `Closed`, `Cancelled` | Every field is read only. | `New` and `Delete` are grey with the same text. |

## Related pages

- [Receipts list](00-receipts-overview.md)
- [Header tab](10-header-tab.md)
- [Receipt lines list](20-receipt-lines-list.md)
- [Receipt statuses and transitions](90-receipt-statuses-and-transitions.md)
