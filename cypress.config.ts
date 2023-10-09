import { defineConfig } from "cypress";
import { version } from "./package.json";

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 1,
  },
  env: {
    version,
  },
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
