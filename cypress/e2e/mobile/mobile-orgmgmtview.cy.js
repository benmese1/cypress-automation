describe('Mobile Organization Management View verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
	});

	it('Iphone8 portrait view', () => {
		cy.viewport('iphone-8', 'portrait');
		cy.waitForLoad(2000);
		cy.get("[aria-label='account of current user']").should('be.visible');
		cy.dashboardMenu('My Organization');
		validatePageView();
		validateCreateNew();
	});

	it('Ipad portrait view', () => {
		cy.viewport('ipad-2', 'portrait');
		cy.waitForLoad(2000);
		cy.get("[aria-label='account of current user']").should('be.visible');
		cy.dashboardMenu('My Organization');
		validatePageView();
		validateCreateNew();
	});

	it('Samsung note9 portrait view', () => {
		cy.viewport('samsung-note9', 'portrait');
		cy.waitForLoad(2000);
		cy.get("[aria-label='account of current user']").should('be.visible');
		cy.dashboardMenu('My Organization');
		validatePageView();
		validateCreateNew();
	});

	/**
	 * Validate buttons and fields on the organization management table
	 */
	const validatePageView = () => {
		cy.get('[data-testid="page"]').should('be.visible').contains('My Organization');
		// Validate buttons
		cy.get('[data-testid="global-button-component"]').contains('Upload').should('be.visible');
		cy.get('[data-testid="global-button-component"]').contains('Export').should('be.visible');
		cy.get('[data-testid="global-button-component"]').contains('Create New').should('be.visible');
		// Validate table
		//Validate Organization name present on the table
		cy.get('.MuiDataGrid-virtualScroller').scrollTo('topLeft');
		cy.get('[role="columnheader"][aria-label="Organization Name"]').should('be.visible');
		//Validate Created field name present on the table
		cy.get('.MuiDataGrid-virtualScroller').scrollTo('topRight');
		cy.get('[role="columnheader"][data-field="added_date"]').should('be.visible');
	};

	/**
	 * Validate Create new button and cancel the dialog once create new drawer opened
	 */
	const validateCreateNew = () => {
		cy.get('[data-testid="global-button-component"]').contains('Create New').click();
		cy.get('[role="dialog"]').contains('Create New').should('be.visible');
		cy.get('[data-testid="global-text-btn-component"]').contains('Cancel').click();
		cy.logout();
	};
});
