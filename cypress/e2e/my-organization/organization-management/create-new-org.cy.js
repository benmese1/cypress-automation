// @team4
import org from '../../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Create New Organization management', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SuperadminUsername'), Cypress.env('SuperadminPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SuperadminMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Click on Create and verify the newly organization created', () => {
		cy.dashboardMenu('My Organization');

		// create new org
		cy.createNewOrganization(
			'TRUCK' + randomnumber,
			org[0].suborg.parentcompany,
			org[0].suborg.Brand,
			org[0].suborg.Type,
			org[0].suborg.Timezone,
			org[0].suborg.DistanceUnitPreference
		);
	});
});
