Cypress.Commands.add("getAccounts", (token) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "GET",
    url: "/test-api/accounts/v1/accounts",
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postAccounts", (token) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "POST",
    url: "/test-api/accounts/v1/accounts",
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("putAccounts", (token) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "PUT",
    url: "/test-api/accounts/v1/accounts",
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteAccounts", (token) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "DELETE",
    url: "/test-api/accounts/v1/accounts",
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getAccount", (token, consentId) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "GET",
    url: `/test-api/accounts/v1/account/${consentId}`,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("putAccount", (token, consentId) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "PUT",
    url: `/test-api/accounts/v1/account/${consentId}`,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postAccount", (token, consentId) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "POST",
    url: `/test-api/accounts/v1/account/${consentId}`,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteAccount", (token, consentId) => {
  cy.api({
    failOnStatusCode: false,
    headers: {
      authorization: token,
    },
    method: "DELETE",
    url: `/test-api/accounts/v1/account/${consentId}`,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postConsent", (consent) => {
  cy.api({
    body: consent,
    headers: {
      authorization: Cypress.env("token"),
    },
    method: "POST",
    url: "/test-api/consents/v1/consents",
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("putConsent", (consent) => {
  cy.api({
    body: consent,
    headers: {
      authorization: Cypress.env("token"),
    },
    method: "PUT",
    url: `/test-api/consents/v1/consents/${Cypress.env("consentId")}`,
  }).then((response) => {
    return response;
  });
});
