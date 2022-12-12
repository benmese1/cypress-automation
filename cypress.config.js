import { defineConfig } from 'cypress';
import * as path from 'path';
import fs from 'fs-extra';

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve('..', 'connect1-qa/cypress/config', `${file}.json`);

	return fs.readJson(pathToConfigFile);
}

export default defineConfig({
	chromeWebSecurity: false,
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
	reporter: 'junit',
	defaultCommandTimeout: 8000,
	reporterOptions: {
		mochaFile: 'results/test-results.xml',
		testCaseSwitchClassnameAndName: false,
	},
	retries: {
		runMode: 2,
		openMode: 2,
	},
	e2e: {
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			const file = config.env.fileConfig || 'dev';

			return getConfigurationByFile(file);
		},
	},
});
