import org from '../../fixtures/createorg.json';
describe('Search functionality in Organization management', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

	it('Search organization by providing company name', () => {
		cy.searchOrgsAndUsers(org[0].searchData.orgname);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-company-name"]').should('be.visible');
		cy.get("[role='cell'][data-field='name'] div").each(($item) => {
			if (cy.wrap($item).should('have.text', org[0].searchData.orgname)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});

	it('Search organization by providing Parent Company', () => {
		cy.searchOrgsAndUsers(org[0].searchData.parentcompany);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-parent-company"]').should('be.visible');
		cy.get("[role='cell'][data-field='parent_company'] div").each(($item) => {
			if (cy.wrap($item).should('have.text', org[0].searchData.parentcompany)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});

	it('Search organization by providing Timezone', () => {
		cy.searchOrgsAndUsers(org[0].searchData.timezone);
		//Verify that results are probably based search
		cy.get('[data-testid="column-header-time-zone"]').should('be.visible');
		cy.get("[role='cell'][data-field='time_zones'] div").each(($item) => {
			if (cy.wrap($item).should('have.text', org[0].searchData.timezone)) {
				cy.log('Matched the search criteria');
				return false;
			}
		});
	});
});
