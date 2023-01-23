import org from '../../fixtures/createorg.json';
describe('Filter Organizations', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

    it('Search organization by providing company name', () => {
		cy.searchOrgs(org[0].searchData.orgname);
        //Verify that results are probably based search
        cy.get('[data-testid="column-header-company-name"]')
            .should('be.visible');
		cy.get("[role='cell'][data-field='name'] div")
			.each(($item) => {
                cy.wrap($item).should('contain.text', org[0].searchData.orgname);
			});
	});

    it('Search organization by providing Brand', () => {
		cy.searchOrgs(org[0].searchData.brandname);
        //Verify that results are probably based search
        cy.get('[data-testid="column-header-brand"]')
            .should('be.visible');
		cy.get("[role='cell'][data-field='brand'] div")
			.each(($item) => {
                cy.wrap($item).should('contain.text', org[0].searchData.brandname);
			});
	});

    it('Add filter by Organization name equals to the searched criteria', () => {
        //Click on the Filters and provide the value we want to search
		cy.addOrgsFilter('Company Name', 'equals', org[0].searchData.orgname);
		cy.get("[role='cell'][data-field='name'] div")
			.each(($item) => {
				cy.wrap($item).should('have.text', org[0].searchData.orgname);
			});
	});

    it('Add filter by Timezone equals to the searched criteria', () => {
        //Click on the Filters and provide the value we want to search
		cy.addOrgsFilter('Timezone', 'equals', org[0].searchData.timezone)
			.get("[role='cell'][data-field='time_zones'] div")
			.each(($item) => {
				cy.wrap($item).should('have.text', org[0].searchData.timezone);
			});
	});

});