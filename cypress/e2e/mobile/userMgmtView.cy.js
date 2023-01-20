const sizes = ['iphone-8','ipad-2', [1170, 2532], 'samsung-note9'];

describe('Mobile User Management View verification', () => {
	sizes.forEach((size) => {
		it(`User management table columns visibility on ${size} screen`, () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}

			cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
                cacheSession: false,
            })
                .waitForLoad();
            cy.get("[aria-label='account of current user']")
                .should('be.visible')
                .dashboardMenu('User Management');
            userViewHeaderList();
			validatePageView();
			validateCreateNew();
		});

        /**
		 * Validate columns on the user mgmt table
		 */
		const userViewHeaderList = () => {
			//verifying fields on the user mgmt table
            cy.get('[data-testid="column-header-company/sub-company"]').should('be.visible');
            cy.get('[data-testid="column-header-last-name"]').should('be.visible');
            cy.get('[data-testid="column-header-first-name"]').should('be.visible');
            cy.get('[data-testid="column-header-username"]').should('be.visible');
            cy.get('[data-testid="column-header-email"]').should('be.visible');
            cy.get('[data-testid="column-header-phone-number"]').should('be.visible');
            cy.get('[data-testid="column-header-role"]').should('be.visible');
            cy.get('[data-testid="column-header-last-login-date"]').should('be.visible');
            cy.get('[data-testid="column-header-status"]').should('be.visible');
            cy.get('[data-testid="column-header-created-date"]').should('be.visible');
            cy.get('[data-testid="column-header-updated-date"]').should('be.visible');
        };

        

		/**
		 * Validate buttons and fields on the user management table
		 */
		const validatePageView = () => {
			cy.get('[data-testid="page"]').should('be.visible').contains('User Management');
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
			// Validate Company/Sub-company name present on the table
			cy.get('[role="grid"] div .MuiDataGrid-virtualScroller')
				.scrollTo('topLeft', { ensureScrollable: false })
				.get('[data-testid="column-header-company/sub-company"]')
				.should('be.visible');

			// Validate Distance unit prefence field name present on the table
			cy.get('[role="grid"] div .MuiDataGrid-virtualScroller')
				.scrollTo('topRight', { ensureScrollable: false })
				.get('[data-testid="column-header-updated-date"]')
				.should('be.visible');
		};

		/**
		 * Validate Create new button and cancel the dialog once create new drawer opened
		 */
		const validateCreateNew = () => {
			cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
			cy.get('[data-testid="text-style-wrapper"]').contains('Create User Account').should('be.visible');
			cy.get('[data-testid="btn-org-form-cancel"]').contains('Cancel').click();
			cy.logout();
		};
	});
});
