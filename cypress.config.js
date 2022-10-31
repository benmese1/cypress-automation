import { defineConfig } from 'cypress';
<<<<<<< HEAD
// import xpath from 'cypress-xpath';
import merge from 'deepmerge'
import * as path from 'path';
import fs from 'fs-extra';

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    '..',
    'connect1-qa/cypress/config',
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}
=======
>>>>>>> master

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
<<<<<<< HEAD
e2e: {
  experimentalSessionAndOrigin: true,
  setupNodeEvents(on, config) {
    const file = config.env.fileConfig || 'dev';

    return getConfigurationByFile(file);
=======
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/test-results.xml",
    testCaseSwitchClassnameAndName: false
  },
  retries: {
    runMode: 2,
    openMode: 2,
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      if (config.env.dev) {
        return {
          baseUrl: "https://dev-connect1.phillips-connect.com",
          env: {
            env: "dev",
            username: "qa_automation",
            password: "rN57ytdZFrvVbwlBSPc0$",
            client_id: "2652adm3ps89eqhr5ap54kd85i",
          },
        };
      } else
        return {
          baseUrl: "https://qa-connect1.phillips-connect.com/",
          env: {
            env: "qa",
            username: "",
            password: "",
            client_id: "2652adm3ps89eqhr5ap54kd85i",
          },
        };
    },
>>>>>>> master
  },
},
})
<<<<<<< HEAD














=======
>>>>>>> master
