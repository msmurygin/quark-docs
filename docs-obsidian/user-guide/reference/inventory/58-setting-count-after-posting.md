# Setting count after posting

Use this page to choose whether the locations changed by an adjustment are counted after the adjustment is posted. The choice is made for each reason.

## Before you start

- You are `ADMIN` or `MANAGER`. `inventory_adjust_reason_set_count` is open only to them.
- You know which reasons should lead to a count. For example, you may want a count after every `LOST`.

## Steps

1. Open `Inventory Balances > Adjustment Reasons`.
2. Tick one reason.
3. Click `Count After Posting` to turn the count on, or `Do Not Count` to turn it off.
4. Check the column `Count After Posting`.

## What the screen says

| Result | Message |
|---|---|
| On | `Reason {code}: a posted adjustment counts the locations it changed` |
| Off | `Reason {code}: a posted adjustment counts nothing` |
| No row | `Tick one reason` |
| The list changed | `The list has moved on — tick the reason again and retry` |
| Refused | `Reason {code} was not changed: {error}` |

## What changes

Only the key `count_after_post` in the `metadata` of that value of the code list `inv_adjust_reason`. The other keys stay as they were. The change is a set, not a toggle.

Later, when an adjustment with that reason is posted, each location of a changed line is named once, and the post sends the event `process.inventory.count_requested` with source `Adjustment`. An internal subscriber handles it (`count_requested_by_event`, `crates/libs/wms-inventory/src/service/inventory_count/request_location.rs`):

- If a live row of another count already counts the location (`Open` or `Variance`), the request joins that count and nothing new is made.
- Otherwise a count of type `Event` for that one location starts: `Blind`, recounted by another counter. The location goes to Task Manager ahead of the planned ones.
- If the count's rules refuse the location (a location type nobody counts, a location another operation froze), the refusal is stored as the result of the event delivery. No screen shows it.

A document that a count made (source `InventoryCount`) asks for nothing.

> Not confirmed by code: where an operator can see a refused request. To verify: turn the setting on, post an adjustment on a location that is frozen by a hard count, and look at `Integration > Delivery Log`.

## Related pages

- [Adjustment reasons](31-adjustment-reasons.md)
- [Posting an adjustment](48-posting-an-adjustment.md)
- [Counts list](26-counts-list.md) (source `Adjustment`)
- API: `inventory_adjust_reason_set_count` (stateless command)
- RF terminal: none.
