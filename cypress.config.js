import {defineConfig} from 'cypress'

export default defineConfig({
    chromeWebSecurity: false,
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
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
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            // return require('./cypress/support/index.js')(on, config)
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3000',
    },
})
