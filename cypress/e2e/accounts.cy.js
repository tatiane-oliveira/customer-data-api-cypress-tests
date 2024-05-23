import {
  encodeToken,
  generateClientId,
  generateToken,
  generateUuid,
  createAuthorizedConsentAccountsRead,
  createRejectedConsentAccountsRead,
  createAuthorizedConsentCrediCardRead,
} from "../support/utils";

describe("GET /accounts/v1/accounts", () => {
  context("Positive scenarios", () => {
    beforeEach(() => {
      createAuthorizedConsentAccountsRead();
    });

    it("should sucessfully return accounts data when authenticated", () => {
      cy.getAccounts(Cypress.env("token")).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(200);
        const { data } = response.body;
        expect(data).is.not.empty;
      });
    });

    it("should return accounts data in the expected JSON schema", () => {
      cy.getAccounts(Cypress.env("token")).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.headers["content-type"]).to.eq("application/json");
        const { data } = response.body;
        expect(data).to.be.an("Array");

        const schema = {
          title: "Accounts Schema",
          type: "object",
          required: ["id", "bank", "accountNumber", "creationDateTime"],
          properties: {
            id: {
              type: "string",
            },
            bank: {
              type: "string",
            },
            accountNumber: {
              type: "string",
            },
            creationDateTime: {
              type: "string",
              format: "date-time",
            },
          },
        };
        expect(data[0]).to.be.jsonSchema(schema);
      });
    });
  });

  context("Negative and Edge scenarios", () => {

    it("should fails with 403 (Forbidden) status code when send a POST request", () => {
     cy.wrap(createAuthorizedConsentAccountsRead())
      .then(() => {
        cy.postAccounts(Cypress.env("token")).then((response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.be.eq(403);
        });
      })  
    });

    it("should fails with 403 (Forbidden) status code when send a PUT request", () => {
      cy.wrap(createAuthorizedConsentAccountsRead())
       .then(() => {
         cy.putAccounts(Cypress.env("token")).then((response) => {
           cy.log(JSON.stringify(response.body));
           expect(response.status).to.be.eq(403);
         });
       })  
     });

     it("should fails with 403 (Forbidden) status code when send a DELETE request", () => {
      cy.wrap(createAuthorizedConsentAccountsRead())
       .then(() => {
         cy.deleteAccounts(Cypress.env("token")).then((response) => {
           cy.log(JSON.stringify(response.body));
           expect(response.status).to.be.eq(403);
         });
       })  
     });
    it("should fails with 401 (Unauthorized) status code when there is no Authorization header", () => {
      cy.getAccounts(undefined).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(401);
      });
    });

    it("should fails with 403 (Forbidden) status code when consent Id is not present on the request", () => {
      const token = generateToken("accounts");
      encodeToken(token.header, token.payload);
      cy.getAccounts(Cypress.env("token")).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(403);
      });
    });

    it("should fails with 404 (Not found) status code when consent Id is not found", () => {
      const scope = `accounts consent:urn:bank:${generateUuid()}`;
      const token = generateToken(scope);
      encodeToken(token.header, token.payload);
      cy.getAccounts(Cypress.env("token")).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(404);
      });
    });

    it("should fails with 401 (Unauthorized) status code when Authorization header is invalid", () => {
      const token = generateToken("accounts");
      encodeToken(token.header, token.payload);
      const encodedToken = Cypress.env("token").replace("Bearer ", "");
      cy.getAccounts(encodedToken).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(401);
      });
    });

    it("should fails with 403 (Forbidden) status code when consent Id is from another client", () => {
      createAuthorizedConsentAccountsRead();
      const scope = `accounts consent:${Cypress.env("consentId")}`;
      const token = generateToken(scope);
      encodeToken(token.header, token.payload);
      cy.getAccounts(Cypress.env("token")).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.be.eq(403);
      });
    });

    it("should fails with 403 (Forbidden) status code when consent is not ACCOUNTS_READ", () => {
      cy.wrap(createAuthorizedConsentCrediCardRead())
        .then(() => {
          cy.getAccounts(Cypress.env("token")).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.be.eq(403);
          });
        })
    });

    it("should fails with 403 (Forbidden) status code when consent status is REJECTED", () => {
      cy.wrap(createRejectedConsentAccountsRead())
      .then(() => {
        cy.getAccounts(Cypress.env("token")).then((response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.be.eq(403);
        });
      })
    });
  });
});

describe("GET /accounts/v1/account/{accountId}", () => {
  context("Positive scenarios", () => {
    beforeEach(() => {
      cy.wrap(createAuthorizedConsentAccountsRead()).then(() => {
        cy.getAccounts(Cypress.env("token")).then((response) => {
          cy.log(JSON.stringify(response.body));
          Cypress.env("accountData", response.body.data[0]);
        });
      });
    });
    it("should sucessfully return account data when authenticated", () => {
      const account = Cypress.env("accountData");
      cy.getAccount(Cypress.env("token"), account.id).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body).is.not.empty;
        const { id, accountNumber, bank } = response.body.data;
        expect(account.id).to.be.eq(id);
        expect(account.bank).to.be.eq(bank);
        expect(account.accountNumber).to.be.eq(accountNumber);
      });
    });

    it("should return account data in the expected JSON schema", () => {
      const account = Cypress.env("accountData");
      cy.getAccount(Cypress.env("token"), account.id).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.headers["content-type"]).to.be.eq("application/json");

        const { data } = response.body;
        const schema = {
          title: "Account Schema",
          type: "object",
          required: ["id", "bank", "accountNumber", "creationDateTime"],
          properties: {
            id: {
              type: "string",
            },
            bank: {
              type: "string",
            },
            accountNumber: {
              type: "string",
            },
            creationDateTime: {
              type: "string",
              format: "date-time",
            },
          },
        };
        expect(data).to.be.jsonSchema(schema);
      });
    });
  });

  context("Negative and Edge scenarios", () => {
    beforeEach(() => {
      cy.wrap(createAuthorizedConsentAccountsRead()).then(() => {
        cy.getAccounts(Cypress.env("token")).then((response) => {
          cy.log(JSON.stringify(response.body));
          Cypress.env("accountData", response.body.data[0]);
        });
      });
    });

    it("should fails with 403 (Forbidden) status code when send a POST request", () => {
      const account = Cypress.env("accountData");
      cy.postAccount(Cypress.env("token"), account.id).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(403);
      });
    });

    it("should fails with 403 (Forbidden) status code when send a PUT request", () => {
      const account = Cypress.env("accountData");
      cy.putAccount(Cypress.env("token"), account.id).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(403);
      });
    });

    it("should fails with 403 (Forbidden) status code when send a DELETE request", () => {
      const account = Cypress.env("accountData");
      cy.deleteAccount(Cypress.env("token"), account.id).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(403);
      });
    });

    it("should fails with 403 (Forbidden) status code when account Id is not present on the request", () => {
      cy.getAccount(Cypress.env("token"), "").then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(403);
      });
    });

    it("should fails with 404 (Not found) status code when account Id is not found", () => {
      cy.getAccount(Cypress.env("token"), generateUuid()).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(404);
      });
    });

    it("should fails with 403 (Forbidden) status code when account Id format is incorrect", () => {
      cy.getAccount(Cypress.env("token"), generateClientId()).then(
        (response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(403);
        }
      );
    });
  });
});
