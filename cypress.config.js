import { defineConfig } from 'cypress';
// import xpath from 'cypress-xpath';
import merge from 'deepmerge'
import * as path from 'path';
import * as fs from 'fs-extra';

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      if (config.env.dev) {
        return {
          baseUrl: "https://www.weather.com",
          env: {
            env: "dev",
            username: "<email>",
            password: "<password>",
          },
        };
      } else
        return {
          baseUrl: "https://www.demoblaze.com",
          env: {
            env: "qa",
            username: "modistester",
            password: "123456",                  
          },
        };
    },
  },
})








