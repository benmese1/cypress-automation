// @team4
import userdata from '../../fixtures/createuser.json';
describe('Search functionality in User management', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click User Management
		cy.dashboardMenu('User Management');
	});

	it('Search users by providing status', () => {
		cy.searchOrgsAndUsers(userdata[0].searchData.status);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-status"]').should('be.visible');
		cy.get("[role='cell'][data-field='status']").each(($item) => {
			if (cy.wrap($item).should('have.text', userdata[0].searchData.status)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});

	it('Search users by providing Role', () => {
		cy.searchOrgsAndUsers(userdata[0].searchData.role);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-role"]').should('be.visible');
		cy.get("[role='cell'][data-field='groups']").each(($item) => {
			if (cy.wrap($item).should('have.text', userdata[0].searchData.role)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});

	it('Search users by providing company', () => {
		cy.searchOrgsAndUsers(userdata[0].searchData.company);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-company/sub-company"]').should('be.visible');
		cy.get("[role='cell'][data-field='orgKeys']").each(($item) => {
			if (cy.wrap($item).should('have.text', userdata[0].searchData.company)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});
});
