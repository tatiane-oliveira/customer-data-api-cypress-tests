const { Base64 } = require("js-base64");
import { faker } from "@faker-js/faker";

const encodeToken = (headerData, payloadData) => {
  const header = `${Base64.encode(JSON.stringify(headerData))}.`;
  const payload = `${Base64.encode(JSON.stringify(payloadData))}.`;
  const token = `Bearer ${header}${payload}`;
  Cypress.env("token", token);
};

const generateToken = (scopeType) => {
  const token = {
    header: {
      alg: "none",
      typ: "JWT",
    },
    payload: {
      scope: scopeType,
      client_id: generateClientId(),
    },
  };
  return token;
};

const generateClientId = () => {
  return (
    Cypress._.toLower(faker.person.firstName()) +
    faker.number.int({ min: 1, max: 100 })
  );
};

const generateUuid = () => {
  return faker.string.uuid();
};

const createAuthorizedConsentAccountsRead = () => {
  createConsent("accounts", "authorized");
};

const createRejectedConsentAccountsRead = () => {
  createConsent("accounts", "rejected");
};

const createAuthorizedConsentCrediCardRead = () => {
  createConsent("credit_card", "authorized");
};

const generateFutureDate = () => {
  const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
  return lastDayOfYear.toISOString();
};

const generateDynamicAccountData = (accountData) => {
  accountData.consents.create.creditCard.data.expirationDateTime =
    generateFutureDate();
  accountData.consents.create.accounts.data.expirationDateTime =
    generateFutureDate();
};

const createConsent = (consentType, status) => {
  cy.fixture("accounts").then((accountData) => {
    generateDynamicAccountData(accountData);
    const consentsToken = generateToken("consents");
    const consents = accountData.consents;
    encodeToken(consentsToken.header, consentsToken.payload);
    const consent =
      consentType == "credit_card"
        ? consents.create.creditCard
        : consents.create.accounts;
    cy.postConsent(consent).then((response) => {
      cy.log(JSON.stringify(response.body));
      const consentId = response.body.data.consentId;

      Cypress.env("clientId", response.body.data.clientId);
      Cypress.env("consentId", consentId);

      if (status) {
        const accountsToken = generateToken(`accounts consent:${consentId}`);
        const putData =
          status == "authorized"
            ? consents.update.authorize
            : consents.update.reject;
        cy.putConsent(putData).then((response) => {
          cy.log(JSON.stringify(response.body));
          encodeToken(accountsToken.header, accountsToken.payload);
        });
      }
    });
  });
};

module.exports = {
  encodeToken,
  generateClientId,
  generateToken,
  generateUuid,
  createAuthorizedConsentAccountsRead,
  createRejectedConsentAccountsRead,
  createAuthorizedConsentCrediCardRead,
};
