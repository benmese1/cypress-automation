import { defineConfig } from 'cypress';
import * as path from 'path';
import fs from 'fs-extra';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve('..', 'connect1-qa/cypress/config', `${file}.json`);

	return fs.readJson(pathToConfigFile);
}

export default defineConfig({
	chromeWebSecurity: false,
	fixturesFolder: 'cypress/fixtures',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
	defaultCommandTimeout: 8000,
	reporter: 'mochawesome',
	reporterOptions: {
		mochaFile: 'results/test-results-[hash].xml',
		reportDir: 'cypress/results',
		overwrite: false,
		html: false,
		json: true,
		testCaseSwitchClassnameAndName: false,
	},
	e2e: {
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			getCompareSnapshotsPlugin(on, config);

			const file = config.env.fileConfig;
			return getConfigurationByFile(file);
		},
	},
});
