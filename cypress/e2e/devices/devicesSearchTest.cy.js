describe('Search and filter assets', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	it('Search device ID test', () => {
		cy.searchDevices('861836059903026')
			.get('[data-id="6386390ccb2ab377cdeaeab6"] > [data-field="imei"] > .MuiDataGrid-cellContent')
			.each(($item) => {
				cy.wrap($item).should('have.text', '861836059903026');
			});
	});

	it('Search devices by SIM test', () => {
		cy.searchDevices('8944501910209408132')
			.get('[data-id="6386390ccb2ab377cdeaeab6"] > [data-field="sim_num"] > .MuiDataGrid-cellContent')
			.each(($item) => {
				cy.wrap($item).should('have.text', '8944501909193398598');
			});
	});
	it('Search devices by Product Name test', () => {
		cy.searchDevices('SolarNet™')
			.get('[data-id="63863905cb2ab377cdead8e7"] > [data-field="prd_name"]')
			.each(($item) => {
				cy.wrap($item).should('have.text', 'SolarNet™');
			});
	});
});
