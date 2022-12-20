describe('Search and filter assets', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	it('Demo Feedback on Table View', () => {
		cy.get('[data-id="6386390ccb2ab377cdeaeab6"] > [data-field="imei"]')
			.click()
			.get('.py-6')
			.should('not.be.visible', 'State');
	});

	it('Remove ID field ', () => {
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]')
			.click()
			.get('.MuiDataGrid-panelContent')

			.should('not.contain', '_id');
	});
});
