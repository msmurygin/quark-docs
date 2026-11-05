# Errors

This page explains the error shapes and codes an API client must handle.

## The error answer

A failed call returns an HTTP error status and this body:

```json
{
  "id": 8,
  "error": {
    "message": "RPC_PARAMS_INVALID",
    "data": {
      "req_uuid": "6f3d2a7e-0f44-4a43-bb51-0a9c3c8a5d11",
      "detail": "missing field `owner_id`"
    }
  }
}
```

| Member | Meaning |
|---|---|
| `id` | The `id` of your request. It is `null` when the server refused the call before it ran the method (login, scope, permission, request parsing). |
| `error.message` | The **error name**, in capital letters. This is what your program should switch on. It is not a sentence. |
| `error.data.req_uuid` | The id of this request in the server log. Give it to support. It is not your correlation id. |
| `error.data.detail` | More information. It is `null`, a text, a number, or an object. For `RF_ERROR` it is an object (see below). |

Things to know:

- This is **not** the JSON-RPC 2.0 error object. There is no `jsonrpc` key, and no numeric `code`.
- A failed answer has no `result`.
- Do not parse sentences. Some texts are written in the language of the user (`locale`). Switch on `error.message`, `detail.return_code`, `detail.class`, `detail.context.code` and `detail.error_code`.
- One case returns **HTTP 200 with an error body**: `APPLICATION_RETURN`. Always check for `error` in the body, not only the HTTP status.
- The server does not return stack traces. Some validation refusals can include
  a constraint identifier; treat it as diagnostic text and switch on the error
  name instead.

## HTTP status and error names

These names appear in `error.message`.

### Login and scope

| HTTP | Name | `detail` | Meaning | What to do |
|---|---|---|---|---|
| 403 | `LOGIN_FAIL` | null | Wrong user or password, throttled, a handheld client for a user without `rf_login`, or a user whose status is `Locked` or `Disabled` (checked after the password matched). All look the same on purpose. | Check the login. Wait a minute if you failed many times. |
| 401 | `NO_AUTH` | null | No valid cookie, API key or service token. Also an expired or revoked key, and any cookie, key or service token of a user who is now `Locked` or `Disabled`. | Log in again, or check the key. |
| 400 | `WAREHOUSE_SELECTOR_INVALID` | null | `X-Warehouse-Id` is not a positive number, `X-Data-Scope` is not `warehouse` or `enterprise`, or the removed `X-Warehouse-Schema` header was sent. | Fix the header. |
| 400 | `WAREHOUSE_SELECTOR_CONFLICT` | null | Both `X-Data-Scope: enterprise` and `X-Warehouse-Id` were sent. | Send one of them. |
| 400 | `WAREHOUSE_REQUIRED` | null | No `X-Warehouse-Id`, and you do not have exactly one default warehouse. | Send `X-Warehouse-Id`. |
| 403 | `WAREHOUSE_NOT_AVAILABLE` | null | You may not use this warehouse, or it is not active. | Pick a warehouse from `list_user_warehouses`. |
| 403 | `ENTERPRISE_SCOPE_NOT_AVAILABLE` | null | You asked for the enterprise scope and have no enterprise role. | Use a warehouse scope. |

### Permission (RBAC)

| HTTP | Name | `detail` | Meaning | What to do |
|---|---|---|---|---|
| 403 | `RBAC_FORBIDDEN` | The method name | Your role has no execute permission on this method. | Ask an administrator. See [Authentication and permissions](02-authentication.md). |
| 403 | `RBAC_NO_ROLE` | Your user id | You have no role in this warehouse. | Ask an administrator to assign a role. |

If the permission lookup itself fails, you get HTTP 503 with `SERVICE_ERROR`. The server fails closed: it does not let the call through.

### Request format

| HTTP | Name | `detail` | Meaning |
|---|---|---|---|
| 400 | `RPC_REQUEST_INVALID` | Text | The body is not a valid request: `jsonrpc` is missing or not `"2.0"`, `id` is missing, `method` is missing or not a string. |
| 400, 413, 415 | `RPC_REQUEST_INVALID` | Request error text | The HTTP body could not be read as JSON: it is not JSON (400), it is larger than 2 MB (413), or `Content-Type` is not `application/json` (415). The HTTP status keeps the kind of refusal; the body uses the error shape above. |
| 400 | `RPC_REQUEST_METHOD_UNKNOWN` | `rpc method '<name>' unknown` | No such method. |
| 400 | `RPC_PARAMS_INVALID` | Text from the JSON parser | A parameter is missing or has the wrong type, or the method needs params and you sent none. |

### Data and business rules

| HTTP | Name | `detail` | Meaning |
|---|---|---|---|
| 400 | `ENTITY_NOT_FOUND` | `{ "entity": "<entity>", "id": <n> }` | No record has this id. |
| 400 | `CODE_LIST_VALUE_NOT_FOUND` | The code | A value is not in its code list. |
| 400 | `LOCATION_NOT_FOUND` | The location code | No such location. |
| 400 | `UNIQUE_VIOLATION` | null | A row with this unique value already exists. |
| 400 | `DEPENDENT_DATA_EXIST` | `{ "entity": "<entity>", "id": [<ids>] }` | You cannot delete the record because other records still refer to it. |
| 400 | `INVALID_DATA` | Text | A value breaks a validation or business rule. Correct the value named in the detail. |
| 400 | `MODEL_ERROR` | Text | A model-layer error that no other name covers. |
| 400 | `INTERNAL_SYSTEM_ERROR` | Text | A business-logic system error with a message. |
| 400 | `RF_ERROR` | Object | A structured domain refusal. See the next section. |
| 200 | `APPLICATION_RETURN` | `{ "message": "<text>", "return_code": <n> }` | A UI instruction carried in the `error` field. Handle the instruction even though the HTTP status is 200. |
| 500 | `SERVICE_ERROR` | null | Something failed on the server that the caller cannot fix. A `list_options.limit` above 5000 is one example. |
| 503 | `SERVICE_ERROR` | null | The permission lookup or the warehouse lookup failed. Try again. |

A `SERVICE_ERROR` carries no detail on purpose. Use `req_uuid` to find the cause in the log.

## The `RF_ERROR` detail

Business commands report their refusals as `RF_ERROR` with HTTP 400. `detail` is an object. Every domain uses the same keys:

```json
{
  "message": "quantity exceeds the plan",
  "return_code": 27,
  "class": "SupervisorOverride",
  "is_overridable": true,
  "context": { "pairs": [ { "code": 27, "subject": "receipt:42/line:105" } ] }
}
```

| Key | Type | Meaning |
|---|---|---|
| `message` | text | A sentence for a person. May be in the user's language. |
| `return_code` | integer | The numeric code. See the tables below. `0` means "no special code, read the message". |
| `class` | text | What kind of problem it is. See below. |
| `is_overridable` | boolean | `true` if a supervisor (or the operator) may accept it and repeat the command. |
| `context` | object or null | Extra facts that depend on the code. |
| `error_code` | text | Only on wave errors (a top-level key next to `message`). See the wave table. |

### Class

| `class` | Meaning | What to do |
|---|---|---|
| `Retry` | Temporary. | Retry as the code says (40, 41, 44). |
| `UserInput` | The user can fix the input. | Show the message. Let the user correct it. |
| `SupervisorOverride` | A supervisor may allow it. | Use the override flow (below). |
| `HardFail` | Not allowed. | Show the message. Do not retry unchanged. |
| `Anomaly` | A serial-number anomaly guard fired. | Follow `is_overridable`: use the override flow when it is `true`; otherwise stop. |
| `StateMachine` | The object is in the wrong state for this action. | Read the state. |

### Return codes that every domain shares

| Code | Class | Meaning | What to do |
|---|---|---|---|
| 0 | HardFail (or UserInput) | A plain business refusal. The message says why. | Show the message. |
| 9 | HardFail | A document was not found (`context: {entity, doc_number}`). | Check the number. |
| 40 | Retry | **Version conflict.** `context.current_state` holds the row's current `version` (and often `status`). | Read the state. Decide again. Send with the new version. See [Command types and concurrency](04-command-types-and-concurrency.md). |
| 41 | Retry | A row lock timed out, or contended stock could not be taken. | Wait and send the same call again. |
| 42 | HardFail | The idempotency key was already used for different data or another command. | Make a new key. |
| 44 | Retry | The first call with this key is still running. | Send the same call again with the same key. |
| 70 | HardFail or UserInput | The object is in the wrong state, or a rule refuses the action. For outbound, picking and packing, `context.code` says exactly which rule. | Read the message and `context.code`. |

### Receipt return codes (inbound)

Receipt, serial and case-level commands use this table.

| Code | Name | Class | Overridable | Meaning |
|---|---|---|---|---|
| 22 | ReceiptWithoutAsnDoc | SupervisorOverride | yes | Receiving without an ASN document. |
| 24 | NoSkuOnAsn | SupervisorOverride | yes | The SKU is not on the ASN. |
| 25 | ReceiptWithoutLpn | SupervisorOverride | yes | Receiving with no LPN (pallet label). |
| 27 | QtyExcess | SupervisorOverride | yes, supervisor | More received than planned, beyond the allowance. Needs `receipt.override_qty_excess`. |
| 28 | QtyShortage | SupervisorOverride | yes, supervisor | Less received than planned, beyond the allowance. Needs `receipt.override_qty_shortage`. |
| 29 | PoQtyExcess | SupervisorOverride | yes | More than the purchase order quantity. |
| 30 | QtyNotPackMultiple | UserInput | no | Quantity is not a multiple of the pack size. |
| 33 | ExternalLotAttrsMismatch | HardFail | no | The same supplier lot was used with different lot attributes. |
| 34 | LotAttributesMustMatch | HardFail | no | The ASN is strict about lot attributes and they do not match. |
| 35 | LotAttributeMissing | UserInput | no | A required lot attribute is missing. |
| 36 | LotAttributeMismatch | SupervisorOverride | yes | A lot attribute differs from the expected one. |
| 37 | LotAttributeFormatInvalid | UserInput | no | A lot attribute has the wrong format. |
| 40 | OptimisticLockConflict | Retry | no | Version conflict. |
| 41 | LockTimeout | Retry | no | The receipt is locked by another call. |
| 42 | IdempotencyConflict | HardFail | no | Key reused for different data. |
| 43 | MandatoryFieldMissing | UserInput | no | A mandatory field is missing. |
| 44 | IdempotencyInProgress | Retry | no | The first call with this key is still running. |
| 45 | DateExpirationTooSoon | SupervisorOverride | yes | The expiry date is too close. |
| 46 | DateManufacturedTooOld | SupervisorOverride | yes | The manufacture date is too old. |
| 47 | DateDeliveryByPassed | SupervisorOverride | yes | The delivery-by date has passed. |
| 48 | DateBestByPassed | SupervisorOverride | yes | The best-by date has passed. |
| 49 | DateExpirationMissing | SupervisorOverride | yes | The lot has no expiration date and none can be worked out from the manufactured date. |
| 50 | TemperatureOutOfRange | SupervisorOverride | yes | The temperature is out of range. |
| 51 | TemperatureRequired | UserInput | no | A temperature is required. |
| 55 | ContainerMixNotAllowed | UserInput | no | The owner does not allow mixed LPNs. |
| 56 | MultiLotOnContainerNotAllowed | UserInput | no | The SKU does not allow more than one lot on an LPN. |
| 57 | CommingledContainerNotAllowed | UserInput | no | The owner does not allow commingled LPNs. |
| 58 | ContainerHierarchyInvalid | UserInput | no | The container hierarchy is not valid. |
| 59 | ContainerInvalid | UserInput | no | The container was not found or is not valid. |
| 60 | SsccInvalid | UserInput | no | The GS1 SSCC has a wrong format. |
| 62 | CaseIdRequired | UserInput | no | A case id is required. |
| 65 | SerialRequired | UserInput | no | Serial numbers are required. |
| 66 | SerialFormatInvalid | UserInput | no | A serial number has the wrong format. |
| 67 | SerialDuplicate | UserInput | no | The serial number already exists (for this warehouse and owner). |
| 70 | InvalidStateForOperation | UserInput | no | The receipt is in the wrong state for this action. |
| 71 | CannotCloseWithExceptions | SupervisorOverride | yes, supervisor | The receipt is not fully received. Needs `receipt.override_close_discrepancy`. |
| 72 | CannotCancelWithInventory | HardFail | no | You cannot cancel a receipt that already has stock. |
| 73 | CannotCloseWithOpenSerialEpisode | HardFail | no | A serial-capture episode is still open. Finish or cancel it first. |
| 74 | CannotCancelIncompleteCaptureEpisode | HardFail | no | You cannot cancel a capture episode that has missing serials. Only a supervisor can force-close it. |
| 76 | DestinationLocationHeld | SupervisorOverride | by hold policy | The destination location has an enforcing hold. |
| 77 | CannotCloseWithPendingDamage | HardFail | no | Damage records still have no final disposition. |
| 80 | SerialNotFound | UserInput | no | No such serial number. |
| 81 | SerialInvalidStateForOperation | StateMachine | no | The serial is in the wrong state for this action. |
| 82 | SerialAlreadyShipped | UserInput | no | The serial was already shipped. |
| 83 | SerialAlreadyDisposed | UserInput | no | The serial was already disposed. |
| 84 | SerialHeld | UserInput | no | The serial is on hold. |
| 85 | SerialOwnerMismatch | UserInput | no | The serial belongs to another owner. |
| 86 | SerialNotInContainer | UserInput | no | The serial is not in the container. |
| 87 | SerialCheckDigitFailed | UserInput | no | The check digit is wrong. |
| 88 | SerialReturnWithoutShip | Anomaly | yes | `serial_return` on a serial that is not `Shipped`. |
| 89 | SerialAtTwoLocations | Anomaly | no | The serial is detected at two locations by an integrity check. It is reported in operational logs rather than returned by a customer API method. |
| 90 | SerialVelocityAnomaly | Anomaly | no | A serial shipped too soon after it was received (the SKU's `Velocity Threshold (min)`, default 30). Never an error: `serial_ship` ships, records `AnomalyFlagged` in the serial's history and publishes `process.serial.flagged_anomaly` with `anomaly_code` 90. |
| 91 | SerialMassAnomaly | Anomaly | yes | A receive would put more active serials in one container than the SKU limit (`max_per_lpn`). |
| 92 | SerialReusedAfterDisposed | Anomaly | no | A receive registers a serial that was disposed before. |
| 93 | SerialPatternAnomaly | Anomaly | no | A serial-pattern issue detected by an integrity check. It is reported in operational logs rather than returned by a customer API method. |
| 94 | SerialLotMismatch | UserInput | no | The serial belongs to another lot. This response is reserved for serial and lot validation. |
| 95 | SerialAsnNotAdvised | UserInput | no | The serial was not advised on the ASN. |

Code 75 was removed on purpose and is never sent. Codes 55 to 60 are container codes.

Serial response codes have a fixed `is_overridable` value. Owner settings do
not change that value, and no separate override permission is associated with
these serial codes.

The serial codes reach you the same way from every method: during a receipt (for example `receipt_receive_against_asn`) and from the `serial_*` methods (`serial_return`, `serial_pick`, `serial_move`, `capture_serial`, `cancel_episode`, and so on). The answer is `RF_ERROR` with the `return_code` (80 to 95, or a receipt code such as 74), `class`, `is_overridable` and `context`. A serial that does not exist is 80; an action the serial's state does not allow is 81 (`StateMachine`). A wrong scan the operator must fix has `return_code` 0 and class `UserInput`.

### Move return codes

`move_execute` and other move-based commands use a separate set of numbers. They **overlap** with receipt serial codes 80 to 86, so read the code together with the method you called.

| Code | Meaning | Overridable |
|---|---|---|
| 80 | The source LPN has an active hold. | by hold policy |
| 81, 82 | Retired. They are not used and not reused. | |
| 83 | The source location has an overridable hold. | yes |
| 84 | The destination location has an overridable hold. | yes |
| 85 | Directed putaway deviation: a soft rule (capacity, mixing, location type) refused the location the system chose. The subject names the rule (`capacity`, `sku_mixing`, `lot_mixing`, `multi_lot_on_lpn`, `attribute_mixing`, `loc_type`). | yes |
| 86 | An unresolved serial-capture episode blocks this move. | no |

For an overridable move refusal, `context.pairs` holds every unaccepted `{code, subject}` pair of the whole move, so you can ask for one approval. Send them back in `meta.acknowledged_overrides`, or get a grant (below). A pair the server did not raise gives a hard refusal.

A directed move may answer with `context.redirect = {location, pending_move_in_id}`: the nearest usable location, already reserved for this pallet. Pass `pending_move_in_id` back to stay in directed mode.

### Codes for picking, packing and other overrides

| Code | Used by | Meaning |
|---|---|---|
| 120 | `pick_assignment_dissolve` | Dissolve a pick assignment that already holds picked goods. A supervisor must approve. |
| 121 | `pick_drop_close` | Close another operator's open pick pallet. Needs capability `pick_drop.close_foreign`, or a grant from someone who has it. |
| 122 | `packing_carton_reopen` | Reopen a closed packing carton. A supervisor must approve. |

### `context.code` strings

Outbound, packing, picking, task and container commands give a second, text code at `detail.context.code`. The `return_code` is `70` for these. Switch on `context.code`.

Pick pallets (`pick_drop_open`, `pick_drop_close`, `pick_dispatch_next`):

`DROP_CODE_INVALID`, `DROP_CODE_TAKEN`, `DROP_STILL_OPEN`, `DROP_NOT_OPEN`, `DROP_NOT_YOURS`, `DROP_OTHER_ORDER`, `DROP_CLOSED`, `DROP_EMPTY`, `DROP_LOCATION_UNKNOWN`, `DROP_LOCATION_TYPE_NOT_ALLOWED`, `DROP_LOCATION_UNUSABLE`, `DROP_DESTINATION_DIFFERS`, `DROP_ORDER_RETARGETED`, `DROP_DESTINATION_DEAD`, `DROP_DESTINATION_NOT_ALLOWED`, `DROP_DESTINATION_UNRESOLVED`, `WRONG_DROP_LOCATION`, `OVERRIDE_GRANT_REFUSED`, `OVERRIDE_GRANT_NOT_FOR_THIS_PALLET`.

Pick source confirmation (`pick_confirm_*`): `SOURCE_CONFIRMATION_REQUIRED`, `CONFIRMATION_SOURCE_CHANGED`, `WRONG_LOT_ATTRIBUTES`, `LOT_SOURCE_AMBIGUOUS`, `WRONG_SOURCE_LPN`, `WRONG_INTERNAL_LOT`, `SOURCE_NOT_PHYSICALLY_IDENTIFIABLE`, `MANUAL_ENTRY_NOT_ALLOWED`, `EVIDENCE_NOT_IN_PLAN`, `SOURCE_EXPIRED`, `SOURCE_ON_HOLD`, `BARCODE_UNREADABLE`, `NO_LOT_IN_SCOPE`, `NO_VERIFIABLE_ATTRIBUTES`, `ATTRIBUTES_DO_NOT_SEPARATE_LOTS`, `LOCATION_ALLOWS_MIXING`, `SEVERAL_LOTS_IN_SCOPE`.

Pick dispatch and assignment: `IN_PICK_ASSIGNMENT`, `UNKNOWN_WORK_AREA`, `UNKNOWN_EQUIPMENT_PROFILE`, `EQUIPMENT_PROFILE_INACTIVE`, `PICK_ASSIGNMENT_CHANGED`. Start, bind, route, completion, carton-full and replacement rules can add more codes.

Packing (`packing_*`): `PACK_UNIT_UNKNOWN`, `PACK_CONTAINER_UNKNOWN`, `PACK_CARTON_UNKNOWN`, `PACK_UNIT_NOT_NAMED`, `PACK_CONTAINER_NOT_WAITING_HERE`, `PACK_PRINTER_UNKNOWN`, `PACK_JOB_PACKED`, `PACK_NOT_A_VERIFIED_PACKAGE`, `PACK_VERSION_CONFLICT` (this one comes with return code 40), `SUPERVISOR_CONFIRMATION_REQUIRED` (overridable), `OVERRIDE_GRANT_REFUSED`, `OVERRIDE_GRANT_NOT_FOR_THIS_CARTON`, `PACK_REOPEN_REASON_REQUIRED`.

Outbound flow units: `STATION_UNKNOWN`, `UNIT_UNKNOWN`, `UNIT_NOT_PENDING`, `UNIT_NOT_WAITING_FOR_THIS_STEP`, `UNIT_AT_ANOTHER_STATION`, `UNIT_STEP_NOT_WITHDRAWABLE`, `HANDOFF_ALREADY_DONE`.

Moves and containers: `CONTAINER_STANDS_ELSEWHERE` (with `stands_at`), `CONTAINER_HELD_BY_PICKING` (with `stands_at`), `IN_TRANSIT_LOCATION` (with `side`), `MOVE_LOCATION_CHANGED` (with `side`).

When a command claims or releases several tasks together, the refusal lists each task in `context.refusals` with a reason such as `CONTENDED`, `NOT_FOUND`, `NOT_IN_POOL` or `TOO_HEAVY`.

These lists are **not complete**. A client must handle an unknown
`context.code` by its `return_code` and `class` rather than failing on an
unrecognized text code.

### Wave errors

Wave commands add a top-level `error_code` in `detail`:

| `error_code` | `return_code` | Meaning |
|---|---|---|
| `WAVE_VERSION_CONFLICT` | 40 | The wave changed. Read it again. |
| `WAVE_POLICY_VERSION_CONFLICT` | 40 | The wave policy changed. |
| `WAVE_MEMBERSHIP_CHANGED` | 40 | The orders in the wave changed while you worked. |
| `ORDER_ALREADY_IN_ACTIVE_WAVE` | 0 | The order is already in another active wave. |
| `WAVE_CODE_ALREADY_EXISTS` | 0 | A wave with this code exists. |
| `WAVE_POLICY_CODE_ALREADY_EXISTS` | 0 | A wave policy with this code exists. |
| `WAVE_NOT_FOUND`, `WAVE_POLICY_NOT_FOUND` | 0 | No such wave or policy. |
| `WAVE_RULE_REFUSED`, `WAVE_POLICY_RULE_REFUSED` | 0 | A business rule refused the action. |
| `IDEMPOTENCY_REFUSED` | 42 or 44 | Key problem. |
| `WAVE_SYSTEM_ERROR` | 0 | A server fault. |

## Override flow

When `is_overridable` is `true` (or the class is `SupervisorOverride`):

1. Read `detail.context.pairs`.
2. If the person who is working may accept it alone (the code needs no capability), repeat the command with the codes in `meta.acknowledged_overrides`. A receipt uses numbers (`[27]`). A move uses pairs.
3. If a supervisor must accept it, call `supervisor_override_grant` with the `pairs` (and the supervisor's `username` and `password` if you are not the supervisor). Then repeat the command with the returned `grant_id` as `override_grant_id` (in `data`, or in `ctx` for `move_execute`).
4. For a receipt command, a refusal of the grant itself comes back as `RF_ERROR` with `class: "UserInput"`, `return_code: 0` and `context.grant_refusal` (a text reason). Pick pallets and packing cartons use `OVERRIDE_GRANT_REFUSED` and the `NOT_FOR_THIS_...` codes listed above.

See [Authentication and permissions](02-authentication.md) for who may approve which code.

## Errors from routes outside `/api/rpc`

### `POST /api/login`

| HTTP | Body |
|---|---|
| 200 | `{"result":{"success":true}}` and the cookie `auth-token`. |
| 403 | `LOGIN_FAIL` in the error shape above. |
| 400 | The body is not valid JSON. |
| 415 | `Content-Type` is not `application/json`. |
| 422 | The JSON is valid, but `username` or `pwd` is missing or is not a string. |

For these three, the body is plain text rather than the JSON error shape above.
`/api/rpc` returns the same request problems in the standard error shape.

### `GET /health`

HTTP 200 and `{"result":{"success":true}}` means the API and its required
data service are available. An unavailable dependency returns HTTP 500 and
`SERVICE_ERROR`. If tenant access and readiness cannot be verified, the route
returns HTTP 503 with `TENANT_ACCESS_UNAVAILABLE`.

## Quick guide: what should my program do?

| You see | Do |
|---|---|
| HTTP 401 | Log in again. |
| HTTP 403 `RBAC_*` | Stop. Ask an administrator. |
| HTTP 400 `RPC_*`, `INVALID_DATA`, `ENTITY_NOT_FOUND` | Fix the request. Do not retry unchanged. |
| `RF_ERROR` class `Retry` (40, 41, 44) | Retry as described in [Command types and concurrency](04-command-types-and-concurrency.md). |
| `RF_ERROR` with `is_overridable` | Use the override flow. |
| `RF_ERROR` class `HardFail` or `UserInput` | Show `detail.message`. |
| HTTP 500 or 503 | Retry later with the same idempotency key. Give `req_uuid` to support if it keeps happening. |
