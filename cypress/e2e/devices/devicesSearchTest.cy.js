describe('Landing device management page and search box working verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad();
	});
	it('verify that menu item Devices is linked to Device Management', () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Devices').click();
		cy.url().should('include', '/devices');
	});

	it('Search device by deviceId test', () => {
		cy.searchDevice('2489').it('Search asset by address test', () => {
			cy.searchDevice('2489')
				.get(".MuiDataGrid-row [data-field='Device ID'] div")
				.each(($item) => {
					cy.wrap($item).should('have.text', '2489');
				});
		});
	});
});
