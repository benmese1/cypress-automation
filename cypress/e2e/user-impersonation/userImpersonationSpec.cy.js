import impersonationdata from '../../fixtures/impersonation.json';

describe('Verify from Superadmin able to see Impersonate user option in popover menu, search user and impersonation user name after switch over', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('verify from Superadmin able to see Impersonate user option in popover menu, search user and impersonation user name after switch over, Verify User Management table data from Imersonate user,Verify organization table data from Imersonate user and Stop Impersonation', () => {
		cy.myAcount_ImpersonateUser(
			impersonationdata[0].impersonation.username,
			impersonationdata[0].impersonation.fnamelname
		);

		//Verify targeted user, user management table has the data
		cy.dashboardMenu('User Management');
		cy.get('[data-testid="management-user-management"]', { timeout: 2000 }).should('exist');
		cy.get('[data-testid="btn-sub-header-action-Create New"]', { timeout: 2000 }).should('exist');
		cy.verifyMyOrganizationTableView();
		cy.waitForLoad();

		//Verify targeted user organization table has the data
		cy.dashboardMenu('My Organization');
		cy.get('[data-testid="management-my-organization"]', { timeout: 2000 }).should('exist');
		cy.get('[data-testid="btn-sub-header-action-Create New"]', { timeout: 1000 }).should('exist');
		cy.verifyMyOrganizationTableView();

		//Stop Impersonating
		cy.myAcount_StopImpersonating();
	});
});
