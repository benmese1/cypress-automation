describe('Verify Organization management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		})
			.waitForLoad();
		cy.get("[aria-label='account of current user']")
			.should('be.visible')
			.dashboardMenu('My Organization');
	});

	it('Verify organization management table columns visibility in table view', () => {
		//verifying fields on the org mgmt table
		const columnsHeaderList = [
			'Company Name',
			'Brand',
			'Type',
			'Timezone',
			'Number of Devices',
			'Updated Date',
			'Created Date',
			'Distance Unit Preference',
		];
		cy.get('[data-testid="items-list-column-header"]')
			.should('be.visible')
			.each((header) => {
				expect(header.text()).oneOf(columnsHeaderList);
			})
			.should('have.length', columnsHeaderList.length);
	});

	it('Get the My organization name when user logged', () => {
		cy.url().should('include', '/organizations');
		cy.get('[data-testid="page"]').should('be.visible').contains('My Organization');
		cy.get('[data-testid="page"] h3').then(function ($elem) {
			cy.log('My Organization name:' + $elem.text());
		});
	});
});
