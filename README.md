# customer-data-api-cypress-tests

## Prerequisites

- [nodejs](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/about-npm)


## Setup

### 1. Clone the project

```shell
git clone git@github.com:tatiane-oliveira/customer-data-api-cypress-tests.git
```

### 2. Install packages 

```shell
npm install
```

### 3. Run the tests

```shell
npx cypress run
```

To generate the test report
```shell
npx allure serve
```

## Project Structure
---
``` bash
📂allure-results/        # Contains the data files in the Allure format, which are generated using the npx allure serve command
📂cypress/               # Root folder for Cypress project
  📂e2e/                 # Contains the spec files
  📂fixtures/            # Store static data files that are used by tests
  📂support/             # Contains files that support the tests, such as reusable functions or global configuration 
📂node_modules/          # Contains the project's dependencies, which are installed using the npm install command
📄cypress.config.js      # Configs and Cypress.task functions
📄.env                   # Environment variables
📄.gitignore             # Files and dirs ignored by git
📄package-lock.json      # Dependencies of dependencies
📄package.json           # Dependencies of the project
```
