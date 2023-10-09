import { defineConfig } from "cypress";

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 1,
  },
  env: {
    version: process.env.npm_package_version,
  },
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
