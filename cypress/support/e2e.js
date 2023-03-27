// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/commands';
import './commands/assetList';
import './commands/assetMap';
import './commands/dashboard';
import './commands/devices';
import './commands/myAccount';
import './commands/organization';
import './commands/userManagement';
import './commands/MFA';
import './commands/reports';
import '@cypress/xpath';
import 'cypress-real-events/support';

Cypress.on(
	'uncaught:exception',
	() =>
		//returning false here prevents cypress from failing the test
		false
);

after(() => {
	cy.task('generateReport');
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
