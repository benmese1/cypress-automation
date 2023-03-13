import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);
let suborgrandomnumber = Math.floor(Math.random() * 10000);

describe('Create New Organization management', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Create and verify the newly created organization', () => {
		cy.dashboardMenu('My Organization');

		// create new org
		cy.log('Create New button clicked');
		cy.createNewOrganization(
			'TRUCK' + randomnumber,
			org[0].suborg.parentcompany,
			org[0].suborg.Brand,
			org[0].suborg.Type,
			org[0].suborg.Timezone,
			org[0].suborg.DistanceUnitPreference
		);
	});
	it('Create sub org from parent org and verify the newly created sub organization from parent organization', () => {
		cy.dashboardMenu('My Organization');

		// create new sub org
		cy.log('Create New button clicked');
		cy.createNewOrganization(
			'TRUCK' + suborgrandomnumber,
			'TRUCK' + randomnumber,
			org[0].suborg1.Brand,
			org[0].suborg1.Type,
			org[0].suborg1.Timezone,
			org[0].suborg1.DistanceUnitPreference
		);
	});
});
