import filterData from '../../fixtures/orgsfilter.json';

describe('Filter Organizations', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

    filterData.orgs.forEach((filter) => {
		it(`Orgs Filtering by existing "${filter.columnname}"'`, () => {
			cy.generic_addFilter(filter.columnname, filter.operator, filter.value);
			//verify each cell of provided column has corresponding search value
			cy.get(`[role='cell'][data-field='${filter.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', filter.value);
			});
		});
	});
});