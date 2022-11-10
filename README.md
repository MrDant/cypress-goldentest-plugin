# cypress-plugins

Creation de plugins pour cypress

## Install

```
npm i git+https://github.com/MrDant/cypress-plugins.git
```

## Setup

```cypress.config.js
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

```cypress/support.js
import goldenTest from 'cypress-golden-test/command'
```
