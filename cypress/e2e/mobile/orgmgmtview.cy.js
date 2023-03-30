const sizes = ['iphone-8', 'ipad-2', [1170, 2532], 'samsung-note9'];

describe('Mobile Organization Management View verification', () => {
	sizes.forEach((size) => {
		it(`Org management table columns visibility on ${size} screen`, () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}

			cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
				cacheSession: true,
			}).waitForLoad();
			cy.get("[aria-label='account of current user']").should('be.visible');
			// Click Organization Management
			cy.dashboardMenu('My Organization');
			validatePageView();
			validateCreateNew();
		});

		/**
		 * Validate buttons and fields on the organization management table
		 */
		const validatePageView = () => {
			cy.get('[data-testid="company-phillips-connect"]').should('be.visible');
			// Verify Premium Columns button
			cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
			// Verify Filters button
			cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
			// Verify Density button
			cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
			// Verify Export button
			cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');
			//Verify Create New button visibility
			cy.get('[data-testid="btn-sub-header-action-Create New"]').should('be.visible');
			// Validate table
			// Validate Organization name present on the table
			cy.get('[role="grid"] div .MuiDataGrid-virtualScroller').scrollTo('topLeft', { ensureScrollable: false });
			cy.get('[role="columnheader"][data-field="name"]').should('be.visible');

			// Validate Distance unit prefence field name present on the table
			cy.get('[role="grid"] div .MuiDataGrid-virtualScroller').scrollTo('topRight', { ensureScrollable: false });
			cy.get('[role="columnheader"][data-field="distance_unit_preference"]').should('be.visible');
		};

		/**
		 * Validate Create new button and cancel the dialog once create new drawer opened
		 */
		const validateCreateNew = () => {
			cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
			cy.get('[data-testid="text-style-wrapper"]').contains('Create Organization').should('be.visible');
			cy.clickOutside();
			// cy.logout();
		};
	});
});
