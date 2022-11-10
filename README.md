# Cypress goldentest plugin

A plugin to compare image snapshot

## Install

```
npm i git+https://github.com/MrDant/cypress-goldentest-plugin.git
```

## Setup

_`./cypress.config.js`_

```js
import { defineConfig } from 'cypress';
import goldenTest from 'cypress-golden-test'
export default defineConfig({
  e2e: {
    ...
    setupNodeEvents(on, config) {
        goldenTest(on, config)
    },
  },
  ...
});
```

_`./cypress/support/e2e.(js/ts)`_

```js
import goldenTest from "cypress-golden-test/src/command";
```

## To use

_`./cypress/exemple.cy.js`_

```js
describe("Home goldenTest", () => {
  it("goldenTest", () => {
    cy.visit("/");
    cy.get("header");
    cy.goldenTest();
  });
});
```
