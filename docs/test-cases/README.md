# Test Cases

Developed test cases for [Open Customer Data API](https://bitbucket.org/thiagohcn/customer-data-apijava/src/master/) to cover positive scenarios, negative scenarios and edge cases.

## Endpoints

### GET /accounts/v1/accounts

* [Retrieve accounts with allowed consent](tc-01.md)
* [Retrieve accounts with expired consent](tc-02.md)
* [Retrieve accounts with rejected consent](tc-03.md)
* [Retrieve accounts with pending consent](tc-04.md)
* [Retrieve accounts without consent](tc-05.md)
* [Retrieve accounts with another customer's consentId](tc-06.md)
* [Retrieve accounts with a token in the incorrected format](tc-07.md)
* [Retrieve accounts with invalid scope](tc-08.md)
* [Retrieve accounts with consents scope](tc-09.md)
* [Retrieve accounts without token](tc-10.md)
* [Retrieve accounts with unregistered consentId](tc-11.md)
* [Retrieve accounts with invalid consentId](tc-12.md)
* [Send POST request to /accounts/v1/accounts](tc-13.md)
* [Send PUT request to /accounts/v1/accounts](tc-14.md)
* [Send DELETE request to /accounts/v1/accounts](tc-15.md)

### GET /accounts/v1/account/{accountId}

* [Retrieve account by Id with allowed consent](tc-16.md)
* [Retrieve account without Id](tc-17.md)
* [Retrieve account by invalid Id](tc-18.md)
* [Retrieve account by unregistered Id](tc-19.md)
* [Retrieve account by Id with expired consent](tc-20.md)
* [Retrieve account by Id with rejected consent](tc-21.md)
* [Retrieve account by Id with pending consent](tc-22.md)
* [Retrieve account by Id without consent](tc-23.md)
* [Retrieve account by Id with another customer's consentId](tc-24.md)
* [Retrieve account by Id with a token in the incorrected format](tc-25.md)
* [Retrieve account by Id with invalid scope](tc-26.md)
* [Retrieve account by Id with consents scope](tc-27.md)
* [Retrieve account by Id without token](tc-28.md)
* [Retrieve account by Id with unregistered consentId](tc-29.md)
* [Retrieve account by Id with invalid consentId](tc-30.md)
* [Send POST request to /accounts/v1/account/{accountId}](tc-31.md)
* [Send PUT request to /accounts/v1/account/{accountId}](tc-32.md)
* [Send DELETE request to /accounts/v1/account/{accountId}](tc-33.md)