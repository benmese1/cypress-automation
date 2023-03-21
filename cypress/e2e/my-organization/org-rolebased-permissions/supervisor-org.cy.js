// @team4
import org from '../../../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('View and Edit Org for supervisor role', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SupervisorUsername'), Cypress.env('SupervisorPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SupervisorMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of create new org button, My Organization view access and My Organization edit access for supervisor role', () => {
		cy.dashboardMenu('My Organization');
		// Verify that create New Button should not present  for supervisor Role
		cy.get('[data-testid="management-my-organization"]', { timeout: 2000 }).should('exist');
		cy.get('[data-testid="btn-sub-header-action-Create New"]', { timeout: 1000 }).should('not.exist');
		//Verify My Organization view access for supervisor Role
		cy.verifyMyOrganizationTableView();
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
