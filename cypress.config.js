import { defineConfig } from 'cypress';
import * as path from 'path';
import fs from 'fs-extra';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';
import cypressSplit from 'cypress-split';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve('..', 'connect1-qa/cypress/config', `${file}.json`);

	return fs.readJson(pathToConfigFile);
}

export default defineConfig({
	chromeWebSecurity: false,
	preserveOnce: 'sessionCookie',
	fixturesFolder: 'cypress/fixtures',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
	defaultCommandTimeout: 12000,
	execTimeout: 12000,
	requestTimeout: 12000,
	responseTimeout: 12000,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		reporterEnabled: 'mochawesome,mocha-junit-reporter',
		mochawesomeReporterOptions: {
			reportDir: 'cypress/results/mochawesome-report',
			reportFilename: '[name].html',
			overwrite: true,
			json: false,
			charts: true,
			embeddedScreenshots: true,
			inlineAssets: false,
			html: true,
		},
		mochaJunitReporterReporterOptions: {
			mochaFile: 'cypress/results/test-results-[hash].xml',
			testCaseSwitchClassnameAndName: false,
		},
	},
	e2e: {
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			cypressSplit(on, config), allureWriter(on, config);
			getCompareSnapshotsPlugin(on, config);

			const file = config.env.fileConfig;
			return getConfigurationByFile(file);
		},
	},
});
