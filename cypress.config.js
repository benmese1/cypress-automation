import { defineConfig } from 'cypress';
import merge from 'deepmerge'
import * as path from 'path';
import * as fs from 'fs-extra';

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  e2e: {
    setupNodeEvents(on, config) {
      if (config.env.dev) {
        return {
          baseUrl: "https://www.weather.com",
          env: {
            env: "dev",
            auth_username: "<email>",
            auth_password: "<password>",
          },
        };
      } else
        return {
          baseUrl: "https://www.google.com/",
          env: {
            env: "qa",
            auth_username: "<email>",
            auth_password: "<password>",                  
          },
        };
    },
  },
})








