# Bug Report: #05

Autorized to retrieve account by Id with consentId created by another customer

## Details

### Steps to reproduce

1. Generate token with `consents` scope.

2. Send Post to `/consents/v1/consents` to create an `ACCOUNTS_READ` permission.

```bash
curl --location 'http://localhost:8080/test-api/consents/v1/consents' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "data": {
        "permissions": "ACCOUNTS_READ",
        "expirationDateTime": "<DATE_TIME>"
    }
}'
```

3. Send Put to `/consents/v1/consents/{consentId}` to authorize consent.

```bash
curl --location --request PUT 'http://localhost:8080/test-api/consents/v1/consents/<CONSENT_ID>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "data": {
        "status": "AUTHORISED"
    }
}'
```

4. Generate token with `accounts` scope using consentId created by another customer.

5. Send Get to `/accounts/v1/accounts/{accountId}` to retrieve accounts.

```bash
curl --location 'http://localhost:8080/test-api/accounts/v1/account/<ACCOUNT_ID>' \
--header 'Authorization: Bearer <TOKEN>'
```

### Expected result
Should not be allowed to retrieve account using a consentId created by another customer.

### Observed result
The customer who created the consent is not checked before providing access permission to retrieve account data.

## Priorization

### Priority
`High`

### Reason
Failure to authorize access to account data, also affects `GET /accounts/v1/accounts`.