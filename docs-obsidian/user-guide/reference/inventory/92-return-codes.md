# Return codes

A refused command carries a **return code**. The web screens show the message. The RF terminal and the API show the code too.
This page lists the codes that the adjustment, count and move commands use, in plain words, and the stable **line codes** that name why an adjustment line or a count was refused.
For the receiving codes see [Inbound: Return codes](../inbound/92-return-codes.md).

## Return codes of adjustments and counts

| Code | Class | Meaning | Where you meet it |
|---|---|---|---|
| 0 | Hard fail | A business refusal with a message. For counts the stable name is in `context.code`. For a refused post the lines are in `context.lines`. | Every task page. |
| 40 | Retry | The version you read is out of date. The answer holds `current_state` (`version`, `status`). | [Approving](47-approving-an-adjustment.md), [Posting](48-posting-an-adjustment.md), [Deleting](50-deleting-an-adjustment.md), [Accepting a variance](54-accepting-a-variance.md), [Recounting](55-recounting-a-location.md), [Cancelling a count](56-cancelling-a-count.md). Read the document again and decide again. |
| 41 | Retry | Stock of an adjusted identity appeared while `Post` was locking. Nothing was written. | [Posting an adjustment](48-posting-an-adjustment.md). Post again. |
| 42 | Hard fail | The same request key was used for a different request. | The API. Make a new request. |
| 44 | Retry | The same request is still being processed. | The API. Retry with the same key. |
| 70 | Hard fail | The status of the document does not allow the command. For adjustments: not validated, needs approval, posted, no lines, not posted, already reversed. For counts: the count is not open, the location is not open or has no variance, the location was counted, the count has counts. | Every task page. See [Statuses](90-statuses-and-transitions.md). |

None of these refusals can be overridden (`is_overridable` is false).

## Adjustment line codes

A refused line stores one of these in `error_code`, and the post names them in `context.lines`. The messages and the cause of each are in [Validating an adjustment](46-validating-an-adjustment.md#line-refusals).

`INVALID_TARGET_QTY`, `DUPLICATE_IDENTITY`, `INVENTORY_IDENTITY_GONE`, `BELOW_RESERVED_QTY`, `STOCK_CHANGED_SINCE_COUNT`, `DUPLICATE_DOCUMENT_IDENTITY`, `SERIAL_TRACKED_NOT_SUPPORTED`, `LOT_UNKNOWN`, `LOCATION_REFUSES_STOCK`, `LOCATION_IN_TRANSIT`, `CONTAINER_STANDS_ELSEWHERE`, `CONTAINER_HELD_BY_PICKING`, `REASON_UNKNOWN`, `REASON_INACTIVE`, `REASON_FORBIDS_INCREASE`, `REASON_FORBIDS_DECREASE`, `REASON_REQUIRES_COMMENT`.

## Count codes

Each count refusal names itself in `context.code`.

| Code | Return code | Message | Meaning |
|---|---|---|---|
| `COUNT_NOT_OPEN` | 70 | `the count is {status}, not open` | The count is closed or cancelled. |
| `COUNT_TASK_NOT_OPEN` | 70 | `the count of {location} is {status}: it is not being counted` | The location row is not `Open`. |
| `COUNT_NO_VARIANCE` | 70 | `the count of {location} is {status}: there is no variance to decide` | Accept or recount on a row that is not a variance. |
| `COUNT_TASK_COUNTED` | 70 | `{location} has been counted: it stays in the count — accept, recount or cancel` | Remove on a counted row. |
| `COUNT_HAS_COUNTS` | 70 | `count {number} has been counted: it is cancelled, not deleted` | Delete on a count with counts. |
| `COUNT_CONFIRMED_EMPTY` | 0 | `{location} was confirmed empty: nothing more can be recorded in it` | RF. |
| `COUNT_NOT_EMPTY` | 0 | `{location} holds counted stock, so it cannot be confirmed empty` | RF. |
| `COUNT_NOTHING_COUNTED` | 0 | `nothing was counted in {location}: record what is there, or confirm that it is empty` | RF: "Done" with nothing recorded. |
| `COUNT_SAME_COUNTER` | 0 | `a recount of {location} is counted by somebody other than the first counter` | RF. |
| `COUNT_NOTHING_TO_COUNT` | 0 | `{location} is not being counted` | RF: a location nobody counts. |
| `COUNT_RECOUNT_LIMIT` | 0 | `{location} has been recounted {n} time(s), the most this count allows: accept the variance or cancel the count` | [Recounting a location](55-recounting-a-location.md). |
| `COUNT_NO_LOCATIONS` | 0 | `a count needs at least one location` | Start by API with no location. |
| `COUNT_STOCK_MOVED_PAST_COUNT` | 0 | `more stock left {location} after it was counted than the count found there: recount it` | A soft count. |
| `COUNT_NOT_STARTED_BY_HAND` | 0 | `a {kind} count is made by its policy or event, not started by hand` | [Creating a count](51-creating-a-count.md). |
| `COUNT_NOTHING_CHOSEN` | 0 | `choose the locations or the zones to add` | [Adding locations](52-adding-locations-to-a-count.md). |
| `COUNT_LOCATION_ALREADY_IN` | 0 | `already in this count: {codes}` | |
| `COUNT_SCOPE_EMPTY` | 0 | `nothing can be counted in {scope}: every location is blocked or already being counted` | |
| `COUNT_LOCATION_BUSY` | 0 | `already being counted: {codes}` | Another count holds the location. |
| `COUNT_LOCATION_NOT_COUNTABLE` | 0 | `cannot be frozen for a count (unknown, blocked or under another operation): {codes}` | |
| `COUNT_LOCATION_NEVER_COUNTED` | 0 | `never counted (lost stock or open pick pallets): {codes}` | |
| `COUNT_LOCATION_TYPE_NEVER_COUNTED` | 0 | `location type {type} is never counted` | A cycle-count policy. |
| `COUNT_INVALID_QTY` | 0 | `quantity {qty} is not a positive number` | RF. |
| `COUNT_UNKNOWN_SKU` | 0 | `SKU {code} does not exist for this owner` | RF. |
| `COUNT_AMBIGUOUS_OWNER` | 0 | `SKU {code} belongs to several owners: name the owner` | RF. |
| `COUNT_UNKNOWN_OWNER` | 0 | `no owner {code}` | RF. |
| `COUNT_UNKNOWN_CONTAINER` | 0 | `no container {code}` | |
| `COUNT_UNKNOWN_LOT` | 0 | `lot {lot} is not a lot of {sku}: F2 on Lot finds a lot by its attributes` | RF. |
| `COUNT_NO_UNIT` | 0 | `SKU {code} has no default unit: name the unit` | RF. |
| `COUNT_POLICY_WITHOUT_SCOPE`, `COUNT_POLICY_WITHOUT_ITEM_SCOPE`, `COUNT_POLICY_MIXED_SCOPE`, `COUNT_POLICY_CODE_TAKEN`, `COUNT_POLICY_INACTIVE` | 0 | Cycle-count policies. | Not described in this section. |
| `COUNT_TASK_NOT_GIVEN` | 0 | `{location} is not given to you: take your next location` | RF. |
| `COUNT_TASK_HELD` | 0 | `{location} is being counted by {holder}` | RF. |
| `COUNT_NOTHING_TO_TAKE` | 0 | `nothing to count` or `nothing to count in area {area}` | RF. |
| `COUNT_UNKNOWN_WORK_AREA` | 0 | `no work area {code}` | RF. |
| `COUNT_OUTSIDE_ITEMS` | 0 | `this count counts only {item}: {sku} lot {lot} is not part of it` | RF, count of the item only. |
| `COUNT_ITEM_NOT_SELECTIVE` | 0 | `only a selective or a cycle count is counted by item` | |
| `COUNT_SUBSET_WITHOUT_ITEM` | 0 | `a count of the item only needs the item: name SKUs, lots or LPNs` | |
| `COUNT_CAUSE_REQUIRED` | 0 | `say why the count differs: choose a cause ("Not established" if nobody knows)` | [Accepting a variance](54-accepting-a-variance.md) with no cause. |
| `COUNT_CAUSE_NOT_OFFERED` | 0 | `{code} is not a cause you can choose` | The cause is unknown, switched off, or the system's own `WITHIN_TOLERANCE`. |
| `COUNT_VARIANCE_ABOVE_LIMIT` | 0 | `this variance is worth {value}, more than the {limit} you may accept: a manager accepts it` | Above `Manager above (value)` of the count tolerances, without `inventory_count.accept_large_variance`. |
| `COUNT_NOT_WITHIN_TOLERANCE` | 0 | `this variance is not within the count tolerance: a supervisor decides it` | The accept on its own found the tolerance changed. The row stays `Variance`. |
| `COUNT_INVALID_INPUT` | 0 | A free message (comment too long, recounts out of range, number too long). | |

A variance that the adjustment refuses is answered with `the variance cannot be adjusted: ...`, and carries the lines of the adjustment in `context.lines`.

## Move codes

A refused move uses its own code space, 80 to 99, which **overlaps** the serial codes of the receiving section (80 `SerialNotFound` and so on). Read a code together with the method that answered. For `move_execute`:

| Code | Meaning | Overridable |
|---|---|---|
| 80 | The source container has a hold that is on. | Yes, when the hold code is `overridable`. |
| 81 | The source location has a flag. **Retired**: never raised. | |
| 82 | The destination location has a flag. **Retired**: never raised. | |
| 83 | The source location has a covering hold. | Yes, when the hold code is `overridable`. |
| 84 | The destination location has a covering hold. | Yes, when the hold code is `overridable`. |
| 85 | A directed putaway landed at a location other than the suggested one (a soft rule refused it). | Yes (a deviation). |
| 86 | A serial capture is not finished, so this kind of move is unsafe. | No. |

A move failure carries `is_overridable` and the list of `(code, subject)` pairs in `context.pairs`. The Move stock document raises one supervisor prompt for the whole list. See [Move stock](17-move-stock-document.md).

## Related pages

- [Messages catalogue](93-messages-catalogue.md)
- [Who can do what](91-who-can-do-what.md)
- [Inbound: Return codes](../inbound/92-return-codes.md)
- API: the error codes of each method are on its page in the API reference.
