// @team4
import org from '../../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify view access to Usermanagement page for supervisor role', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SupervisorUsername'), Cypress.env('SupervisorPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SupervisorMFA'));
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify view access for supervisor role', () => {
		cy.dashboardMenu('User Management');
		// Verify that create New Button should not present  for supervisor Role
		cy.get('[data-testid="management-user-management"]', { timeout: 2000 }).should('exist');
		cy.get('[data-testid="btn-sub-header-action-Create New"]', { timeout: 1000 }).should('not.exist');
		//Verify Usermanagement view access for supervisor Role
		cy.verifyMyOrganizationTableView();
	});
});
