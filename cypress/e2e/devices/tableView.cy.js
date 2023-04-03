// @team3

describe('Search and filter assets', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	it('Demo Feedback on Table View', () => {
		cy.get('.flex-col > .h-full').should('not.contain', 'State');
	});

	it('Remove ID field ', () => {
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click({ force: true });
		cy.get('.MuiDataGrid-panelContent').should('not.contain', '_id');
	});
});
