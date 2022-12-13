describe('Landing device management page and search box working verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad();
	});

	context('Iphone-5 resolution', () => {
		beforeEach(() => {
			cy.viewport('iphone-5');
		});
		it('verify that search box working', () => {
			//opening device management page
			cy.get(
				'[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]'
			).click();
			cy.waitForLoad();
			// search box typing and get result
			cy.get('.MuiInputBase-input').type('werewr9090');
			cy.waitForLoad();
			cy.get('[data-field="prd_cde"] > .MuiDataGrid-cellContent').should('have.text', 'werewr9090');
		});
	});
});
