describe('Verify User management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		})
			.waitForLoad();
		cy.get("[aria-label='account of current user']")
			.should('be.visible')
			.dashboardMenu('User Management');
	});

	it('Verify user management table columns visibility in table view', () => {
		//verifying fields on the user mgmt table
		const columnsHeaderList = [
			'Company/Sub Company',
			'Last Name',
			'First Name',
			'Username',
			'Email',
			'Phone Number',
			'Role',
			'Last Login Date',
			'Created Date',
			'Status',
			'Created Date',
			'Updated Date',
		];
		cy.get('[data-testid="items-list-column-header"]')
			.should('be.visible')
			.each((header) => {
				expect(header.text()).oneOf(columnsHeaderList);
			})
			.should('have.length', columnsHeaderList.length);
	});

	it('Get organization name for the associated user logged', () => {
		cy.url().should('include', '/user-management');
		cy.get('[data-testid="page"]').should('be.visible').contains('User Management');
		cy.get('[data-testid="page"] h3').then(function ($elem) {
			cy.log('Organization name for the user:' + $elem.text());
		});
	});
});
