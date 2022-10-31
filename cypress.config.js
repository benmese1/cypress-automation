import { defineConfig } from 'cypress';
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

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
e2e: {
  experimentalSessionAndOrigin: true,
  setupNodeEvents(on, config) {
    const file = config.env.fileConfig || 'dev';

    return getConfigurationByFile(file);
  },
},
})














