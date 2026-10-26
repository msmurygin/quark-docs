# Return codes

A refused receiving command carries a **return code**. The web screens show the message. The RF terminal and the API show the code too.
This page lists the codes that the receiving commands use, in plain words.
Source: `crates/libs/wms-shared/src/validation_codes.rs:25-112`.

**Overridable** means that a person with the right can accept the refusal and go on. A supervisor does it on the screen or with a grant. A code that is not overridable is final.

## Plan and quantity

| Code | Name | Meaning | Where you meet it |
|---|---|---|---|
| 22 | `ReceiptWithoutAsnDoc` | The receipt has no ASN document. | Not seen on the web screens. |
| 24 | `NoSkuOnAsn` | The SKU is not on the receipt. Overridable when the owner policy is `Warning`. | [Receiving a line](36-receiving-a-line.md) |
| 25 | `ReceiptWithoutLpn` | Goods received with no pallet label. Depends on the owner policy. | [Receiving a line](36-receiving-a-line.md) |
| 27 | `QtyExcess` | More than expected, above the limit of the owner. Overridable below the hard limit. | [Receiving a line](36-receiving-a-line.md) |
| 28 | `QtyShortage` | Less than expected, above the shortage limit of the owner. Overridable. | [Receiving a line](36-receiving-a-line.md) |
| 29 | `PoQtyExcess` | More than the purchase order allows. | Not seen on the web screens. |
| 30 | `QtyNotPackMultiple` | The quantity is not a whole number of packs. | [Receiving a line](36-receiving-a-line.md) |

## Lot attributes

| Code | Name | Meaning |
|---|---|---|
| 33 | `ExternalLotAttrsMismatch` | The same external lot was used with different lot attributes. |
| 34 | `LotAttributesMustMatch` | A strict lot attribute differs from the expected value. Not overridable. See [Expected lot attributes tab](26-line-expected-lot-attributes-tab.md). |
| 35 | `LotAttributeMissing` | A required lot attribute has no value. |
| 36 | `LotAttributeMismatch` | A lot attribute differs from the expected value. Overridable for attributes that allow it. |
| 37 | `LotAttributeFormatInvalid` | A lot attribute has a wrong format. |

## System

| Code | Name | Meaning | Fix |
|---|---|---|---|
| 40 | `OptimisticLockConflict` | The record changed since you read it. | Refresh and retry. |
| 41 | `LockTimeout` | Someone else holds the receipt. | Wait and retry. |
| 42 | `IdempotencyConflict` | The same request key was used for a different request. | Make a new request. |
| 43 | `MandatoryFieldMissing` | A needed value is missing, for example a shortage reason. | Give the value. |
| 44 | `IdempotencyInProgress` | The same request is still being processed. | Retry with the same key. |

## Dates and temperature

| Code | Name | Meaning |
|---|---|---|
| 45 | `DateExpirationTooSoon` | The expiry date is nearer than the minimum shelf life. |
| 46 | `DateManufacturedTooOld` | The goods are older than the maximum age on receipt. |
| 47 | `DateDeliveryByPassed` | The delivery-by date has passed. |
| 48 | `DateBestByPassed` | The best-by date has passed. |
| 49 | `DateExpirationMissing` | The lot has no expiration date, and one is required and cannot be worked out. |
| 50 | `TemperatureOutOfRange` | The temperature is outside the range of the SKU. |
| 51 | `TemperatureRequired` | The SKU needs a temperature and none was given. |

## Containers, cases and serials

| Code | Name | Meaning |
|---|---|---|
| 55 | `ContainerMixNotAllowed` | The owner does not allow mixed pallets. |
| 56 | `MultiLotOnContainerNotAllowed` | The SKU does not allow several lots on one pallet. |
| 57 | `CommingledContainerNotAllowed` | The owner does not allow commingled pallets. |
| 58 | `ContainerHierarchyInvalid` | The pallet and box structure is not valid. |
| 59 | `ContainerInvalid` | The pallet or box was not found. |
| 60 | `SsccInvalid` | The SSCC label has a wrong format. |
| 62 | `CaseIdRequired` | A case label is needed. |
| 65 | `SerialRequired` | The SKU needs a serial for each unit. |
| 66 | `SerialFormatInvalid` | The serial has a wrong format. |
| 67 | `SerialDuplicate` | The serial already exists for this warehouse and owner. |
| 95 | `SerialAsnNotAdvised` | The serial is not on the pre-advised list. See [Pre-advised serials tab](25-line-pre-advised-serials-tab.md). |

Codes 80 to 94 belong to serial tracking and are not specific to receipts.

## State and closing

| Code | Name | Meaning | Where you meet it |
|---|---|---|---|
| 70 | `InvalidStateForOperation` | The status of the receipt does not allow the action. | Every task page. See [Receipt statuses](90-receipt-statuses-and-transitions.md). |
| 71 | `CannotCloseWithExceptions` | Closing with a discrepancy. Overridable by a supervisor. Not overridable when `ALLOW_CLOSE_WITH_DISCREPANCY` is off. | [Closing a receipt](42-closing-a-receipt.md) |
| 72 | `CannotCancelWithInventory` | Goods were received on a line, so the receipt cannot be cancelled. Not overridable. | [Cancelling a receipt](43-cancelling-a-receipt.md) |
| 73 | `CannotCloseWithOpenSerialEpisode` | A serial capture is not finished. Not overridable. | [Closing a receipt](42-closing-a-receipt.md) |
| 74 | `CannotCancelIncompleteCaptureEpisode` | An operator may not cancel a serial capture that has fewer serials than expected. Only a supervisor can force it closed. | [Capturing serial numbers](37-capturing-serial-numbers.md) |
| 76 | `DestinationLocationHeld` | The destination location has a hold. Overridable or not follows the hold code. | [Receiving a line](36-receiving-a-line.md) |
| 77 | `CannotCloseWithPendingDamage` | A damage record has no final disposition. Not overridable. | [Closing a receipt](42-closing-a-receipt.md) |

Code 75 is not used. It was removed on purpose.

## Related pages

- [Messages catalogue](93-messages-catalogue.md)
- [Who can do what](91-who-can-do-what.md)
- API: Inbound API reference
