import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('View and Edit Org for supervisor role', () => {
	beforeEach(() => {
		cy.login(Cypress.env('SupervisorUsername'), Cypress.env('SupervisorPassword'), {
			cacheSession: false,
		});
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of create new org button, My Organization view access and My Organization edit access for supervisor role', () => {
		cy.dashboardMenu('My Organization');
		// Verify that create New Button should not present  for supervisor Role
		cy.verifyCreateNewOrgNotExist();
		//Verify My Organization view access for supervisor Role
		cy.verifyMyOrganizationTableView(); //
		cy.log('Edit Org');
		//Verify My Organization edit access for supervisor Role
		cy.editOrg(
			org[0].supervisoreditorg.companyname,
			org[0].supervisoreditorg.Brand,
			org[0].supervisoreditorg.Type,
			org[0].supervisoreditorg.Timezone,
			org[0].supervisoreditorg.DistanceUnitPreference
		);
	});
});
