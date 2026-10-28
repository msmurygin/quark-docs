---
title: "Connectors and API keys"
---

# Connectors and API keys

A connector describes how a flow reaches one external system. It combines a transport, base URL, authentication method and resilience settings. An API key stores the sensitive values used by that connector or by a notification channel.

Create separate connectors and credentials for test and production environments.

## Create a connector

### From a connector template

1. Open **Connectors**.
2. Find the system you need and select **Use**.
3. Open the new tenant connector.
4. Complete **Connection setup**.
5. Select **Save credentials & test**.

Selecting **Use** on the same connector template again reuses the tenant clone created from that template. If you need a separate connector for another environment, create it with **+ New Connector**, give it a distinct code and name, and copy only the non-secret provider settings you have reviewed.

### From scratch

1. Open **Connectors** and select **+ New Connector**.
2. Enter **Code** and **Name**.
3. Choose **Category**: Marketplace, Marking, ERP, WMS or Generic.
4. Choose the **Transport** required by the remote service.
5. Enter **Base URL**.
6. Choose **Auth Type**.
7. Add **Transport Config (JSON)** only when the selected transport needs it.
8. Save the connector, open it and run **Test**.

Available transports include HTTP, JSON-RPC, FTP, XML-RPC, 1C HTTP, SAP RFC, GOST Proxy and Mock. Available authentication methods include None, Bearer Token, API Key Header, Two Headers, Basic Auth, OAuth2 and OAuth2 Refresh Token.

Choose **None** only when the remote endpoint is intentionally unauthenticated.

## Connection settings

| Setting | Purpose |
| --- | --- |
| **Name** | Human-readable connector name. Include the environment when useful. |
| **Category** | Groups the connector in the interface. |
| **Base URL** | Address of the external service. Do not include credentials in it. |
| **Auth Type** | How requests authenticate. |
| **Timeout (sec)** | Maximum time allowed for one connector request. |
| **Force UTC** | Converts applicable date and time values to UTC for this connection. |
| **Active** | Allows flows to use the connector. |

Advanced settings include default headers, rate limits, retry behaviour and circuit-breaker settings. Start with the connector template's values. Change them only with the remote provider's limits and idempotency rules in hand.

## Store a credential

The recommended route is to let **Connection setup** create and bind the credential for you. To create one directly:

1. Open **API Keys** and select **+ New Key**.
2. Enter a stable **Code** and descriptive **Name**.
3. Choose **Provider** and **Key Type**.
4. Paste the secret into **Key / Token**. The field accepts a single value or a JSON object when the provider needs several values.
5. Save the key.

The key list shows metadata such as provider, type, environment, status and version. It does not reveal the stored secret. A key past its configured expiry is shown as **expired** and is not accepted for a new binding or as a replacement credential.

### Credential rules

- Never put tokens, passwords or client secrets into a flow step, mapping, variable, log message, URL or screenshot.
- Use a separate key for each provider account and environment.
- Use the least-privileged remote account that can complete the flow.
- Rotate connector credentials through **Connection setup** so that the replacement is tested before it becomes the only active binding.
- Replace an **expired** key before activating or reactivating a dependent flow.
- Prefer **API Key (encrypted)** when a notification channel offers a choice of credential storage.

## Test a connector

1. Open the tenant connector.
2. Confirm that **Base URL**, **Auth Type** and credential binding belong to the same environment.
3. Select **Test** or **Save credentials & test**.
4. Read the returned message.

The connector test checks connection and authentication. It does not prove that every operation in every flow is permitted. Run a controlled flow after the connector test passes.

## Replace connector credentials safely

1. Open the connector and enter the replacement values in **Connection setup**.
2. Select **Save credentials & test**.
3. Wait for **Credentials saved and connection verified.**
4. Run one controlled flow and check its result in **Monitor**.

The platform keeps the current credential binding while it tests the replacement. If the connection test fails, the unverified key is unbound and revoked, and the previous credentials stay bound. Correct the replacement values and try again; do not revoke the previous key after a failed test.

## Change or remove a connector safely

An active flow protects the connector it uses. If deactivation or deletion is refused:

1. Open **Flows** and identify every active flow that uses the connector.
2. Pause those flows.
3. Make the connector change and run **Test**.
4. Validate each affected flow.
5. Activate the flows again and watch their first run in **Monitor**.

Deleting a connector deactivates it so that past run history remains understandable. Do not delete a connector simply to rotate a credential.

## Revoke an API key safely

1. Create the replacement key.
2. Bind or save it through the connector or notification channel.
3. Test the connection or channel.
4. Run one controlled flow if the key belongs to a connector.
5. Open **API Keys** and select **Revoke** on the old key.

The platform refuses a revocation that would leave an active flow without a usable authenticated connector. Pause the affected flows or bind a tested replacement, then retry.

## Troubleshooting

| Symptom | Likely cause | Recovery |
| --- | --- | --- |
| Selecting **Use** on **Generic HTTP API** does not create a connector or show an error | The template does not have the service-specific Base URL needed for an HTTP connector | Do not select **Use** repeatedly. Select **+ New Connector**, choose **HTTP**, enter the provider's **Base URL** and authentication method, then save and test it. |
| Connection test cannot reach the service | Wrong URL, DNS, firewall or remote outage | Confirm the environment URL and network route; retry only after reachability is restored. |
| Authentication is rejected | Wrong auth type, expired secret or mismatched account fields | Compare the connector fields with the provider's credential type; save and test the replacement. |
| **Connection test failed: ... Previous credentials were kept.** | The replacement credentials could not authenticate or reach the provider | Leave the previous key active, correct the replacement values and select **Save credentials & test** again. |
| API key shows **expired** | Its configured validity period ended | Create and bind a replacement, test the connector, then revoke the old key if it is still active in storage. |
| Rate-limit errors appear in runs | Request volume exceeds the provider limit | Review the connector rate limit and the trigger frequency; do not add retries blindly. |
| Connector cannot be disabled or deleted | An active flow depends on it | Pause the flow, change the connector, validate and reactivate. |
| Key cannot be revoked | It is still the only usable credential for an active flow | Bind and test a replacement, or pause the dependent flow. |
| **Could not load API keys** | The key list request failed | Select **Retry**. Do not assume an empty list until the request succeeds. |

Connector request totals, failures, success rate and average duration are also shown in **Dashboard > Connector Health** for the recent period.
