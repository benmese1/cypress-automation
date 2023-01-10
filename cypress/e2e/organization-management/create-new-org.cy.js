import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Create New Organization management', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Click on Create and verify the newly organization created', () => {
		cy.dashboardMenu('My Organization');

		// create new org
		cy.log('Create New button clicked');
		cy.createNewOrganization(
			'SORG' + randomnumber,
			org[0].suborg.Brand,
			org[0].suborg.Type,
			org[0].suborg.Timezone,
			org[0].suborg.DistanceUnitPreference
		);
	});
});
