---
title: "Administrator Guide - Warehouse Documents"
type: user-guide
audience: customer administrator, warehouse supervisor
status: draft
updated: 2026-11-02
---

# Warehouse Documents

Use the order and receipt lists to issue, download and print warehouse documents. The document is a snapshot: once issued, its contents and number do not change when the order or receipt changes later.

The standard forms are operational templates, not tax invoices or legal advice. Have your accountant or legal adviser approve the forms before using them as statutory documents.

## 1. Available documents

| Document | Start from | What must exist before issue |
|---|---|---|
| Packing list | Shipment Orders | At least one closed package. |
| Pick list | Shipment Orders | At least one pick for the order. |
| Goods issue note | Shipment Orders | Shipped quantity, priced order lines and one currency. |
| CMR | Shipment Orders | Something to carry, a carrier and gross weight. |
| Goods receipt note | Receipts | A supplier, received quantity, priced receipt lines and one currency. |

These are English descriptions of the supplied document types. The document
picker shows the label for the selected language.

`Print Documents` is available on the Shipment Orders and Receipts lists. It is not available on a dispatch or trip card.

## 2. Prepare the legal entity and business partners

### What you will do

Identify the company that issues warehouse documents and fill the identifiers used on the forms.

### Before you start

- Role: `ADMIN` or `MANAGER`.
- The issuer and the supplier, customer or carrier exist in `Owners`.
- Only one owner can be the legal entity of a warehouse.

### Steps

1. Open `Sidebar > Warehouse Configuration > Product Data > Owners`.
2. Open the company that operates the warehouse.
3. On `General`, turn on `Legal entity of this warehouse`.
4. Fill `Company`, the postal address and at least one of `EIK / BULSTAT` or `VAT`.
5. Fill `EORI` when the document or customs process needs it.
6. Click `Save`.
7. Open each supplier, customer and carrier used on a document and complete its company and address. A goods receipt or goods issue note also requires `EIK / BULSTAT` or `VAT` for its counterparty.

For a Bulgarian issuer, priced document lines must use EUR. Lines in several currencies cannot be placed on one document.

### Field reference

| Field | Meaning | Allowed values | Example |
|---|---|---|---|
| `Legal entity of this warehouse` | Makes this owner the issuer on warehouse documents. | On or off. Only one owner per warehouse can be on. | on |
| `EIK / BULSTAT` | Bulgarian company identifier. | 9 or 13 digits. | `123456789` |
| `VAT` | VAT identifier. | Up to 18 characters. | `BG123456789` |
| `EORI` | Customs identifier. | Two country letters followed by up to 15 letters or digits. | `BG123456789` |

## 3. Download a PDF

### What you will do

Issue a document and save its PDF without requiring a configured printer.

### Before you start

- Role: `ADMIN`, `MANAGER`, `SUPERVISOR` or `OPERATOR`.
- Complete the issuer and document prerequisites in sections 1 and 2.
- For a shipment document, the order exists in `Shipment Orders`. For a receipt note, the receipt exists in `Receipts`.

### Steps for an order

1. Open `Sidebar > Management & Control > Orders & Waves > Orders`.
2. Tick exactly one order.
3. Click `Print Documents`.
4. Choose the document and set **Language** to English or Bulgarian. The
   language name itself can be displayed in that language.
5. Click `Download PDF`.
6. Open the downloaded file and verify the company, counterparty, lines, quantities, currency and number.

### Steps for a receipt

1. Open `Sidebar > Inbound > Receipts`.
2. Tick exactly one receipt.
3. Click `Print Documents`.
4. Choose `Language` and click `Download PDF`.
5. Open the goods receipt note and verify its supplier, lines, quantities, currency and number.

The first successful download or print issues the document. Repeating the action for the same subject and document type returns the same live document and number. English and Bulgarian are two renderings of that one document, not two separately numbered documents.

## 4. Print to a document printer

### What you will do

Send the same PDF to an active document printer.

### Before you start

- An active printer configuration of kind `Document` exists and can be reached over IPP.
- If the operator should not choose a printer each time, an active printer assignment exists.

### Steps

1. Open the order or receipt list and tick exactly one row.
2. Click `Print Documents`.
3. Choose the document and language.
4. To override routing, choose a printer in `Printer (empty: the one assigned)`. Leave it empty to use an assignment.
5. Click `Print`.
6. Wait for `Document {number} sent to printer {printer_code}`.

From the order and receipt lists, no work location is supplied to printer routing. When no printer is chosen, Quark therefore uses the first matching active assignment in this order:

1. the current user;
2. the goods owner;
3. the warehouse default.

Within the same scope, the lower assignment priority wins. Only a printer of kind `Document` can print warehouse documents; a label printer is refused.

## 5. Document numbers and corrections

- A document number contains Arabic digits and is unique within its document type and warehouse.
- The PDF file name uses the number padded to ten digits.
- An issued document is immutable and is not deleted.
- If an issued document is wrong, an authorized user annuls it with a reason and issues a replacement. The replacement receives a new number.
- Changing an order or receipt does not rewrite an already issued document.

Do not issue the final goods receipt or goods issue note until its quantities, prices, currency and parties are ready for the permanent snapshot.

## 6. SSCC on shipping units

An owner can have a `GS1 company prefix` of 4 to 12 digits. Quark uses it to generate an 18-digit GS1 SSCC for that owner's shipping units. The last digit is the GS1 check digit.

If the owner has no GS1 company prefix, the shipping unit remains without an SSCC. Add the prefix before creating the shipping unit when the process or customer requires SSCC labels.

## 7. If something goes wrong

| Error code | Message or symptom | Meaning | Fix |
|---|---|---|---|
| `DOC_NO_LEGAL_ENTITY` | `no owner is marked as the legal entity of this warehouse` | The document has no issuer. | Turn on `Legal entity of this warehouse` for one owner. |
| `DOC_NO_IDENTIFIER` | A party has no EIK/BULSTAT and no VAT number. | The issuer or counterparty cannot be identified on the document. | Fill `EIK / BULSTAT` or `VAT` on that owner. |
| `DOC_SEVERAL_CURRENCIES` | The lines are priced in several currencies. | One document cannot combine the currencies. | Correct or split the source lines. |
| `DOC_NOT_EURO` | A Bulgarian document is in EUR, but the lines use another currency. | The source prices use the wrong currency for this form. | Price the lines in EUR before issuing. |
| `DOC_NO_PICKS` | The order has no picks. | A pick list has nothing to show. | Release and pick the order first. |
| `DOC_NO_CLOSED_PACKAGE` | The order has no closed package yet. | A packing list needs a closed package. | Complete packing and close the package. |
| `DOC_NOTHING_SHIPPED` | The order has shipped nothing yet. | A goods issue note needs shipped quantity. | Complete Goods Issue first. |
| `DOC_LINES_UNPRICED` | Some order or receipt lines have no value from the ERP. | A goods note cannot calculate its amounts. | Send or enter the missing prices. |
| `DOC_NO_SUPPLIER` | The receipt has no supplier. | The goods receipt note has no counterparty. | Select a supplier on the receipt. |
| `DOC_NOTHING_RECEIVED` | The receipt has received nothing yet. | The goods receipt note has no received lines. | Receive the goods first. |
| `DOC_NO_CARRIER` | Neither the order nor its dispatch names a carrier. | CMR has no carrier. | Select a carrier on the order or dispatch. |
| `DOC_NOTHING_TO_CARRY` | The order has nothing to carry yet. | CMR has no shipped or packed goods. | Prepare the goods before issuing CMR. |
| `DOC_NO_GROSS_WEIGHT` | No measured or item gross weight is available. | CMR cannot show the gross weight. | Record a measured weight or complete item weights. |
| `DOC_NO_DOCUMENT_PRINTER` | No document printer is assigned. | Automatic routing found no printer. | Choose a document printer or click `Download PDF`. |
| `DOC_PRINTER_UNKNOWN` | No active printer with the selected code exists. | The configuration is missing or inactive. | Activate the printer or choose another one. |
| `DOC_LABEL_PRINTER` | The selected printer prints labels, not documents. | The printer has the wrong kind. | Choose a printer of kind `Document`. |
| `DOC_PRINTER_PORT_INVALID` | The printer port is invalid. | Its connection settings cannot be used. | Correct the printer configuration. |
| `DOC_PRINTER_FAILED` | The printer did not print. | The IPP request failed. | Check printer availability and connection, then retry or download the PDF. |

## 8. What this affects later

- Order and receipt changes after issue do not change the document snapshot.
- Printed and downloaded versions in both supported languages keep the same number.
- The GS1 company prefix also controls SSCC generation for the owner's shipping units.
