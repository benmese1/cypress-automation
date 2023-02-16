describe('Asset Management page general tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('verify Material UI Premium buttons above table header', () => {
		// Verify Material UI Premium Columns button
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
		// Verify Material UI Premium Filters button
		cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
		// Verify Material UI Premium Density button
		cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
		// Verify Material UI Premium Export button
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');
	});

	it('Verify assets table is displayed', () => {
		cy.get("[role='grid']").should('be.visible');
	});

	it('Verify assets table columns visibility', () => {
		const columnHeadersList = [
			'Company Name',
			'Icon',
			'Asset ID',
			'Asset Nickname',
			'Device ID',
			'Product Name',
			'Trip Status',
			'Last Reported Date',
			'City',
			'State',
			'Asset Type',
			'Battery Icon',
			'Asset Tags',
		];
		cy.get("[role='columnheader']")
			.each((el) => {
				expect(el.text()).oneOf(columnHeadersList);
			})
			.should('have.length', columnHeadersList.length);
	});

	it('Paging test', () => {
		cy.get('[data-rowindex="0"]').should('be.visible');
		cy.get('[data-testid="page"]').should('contain.text', '1 - 100 of'); 
		
		//go to second page
		cy.get('[aria-label="Go to page 2"]').click();
		cy.get('[data-rowindex="100"]').should('be.visible');
		cy.get('[data-testid="page"]').should('contain.text', '101 - 200 of');
		cy.get('button[aria-current="true"]').should('have.text', '2');
	});

	it('Search "Keep typing..." test', () => {
		cy.searchAssets('a').get('.text-typography').should('have.text', 'Keep typing...');
	});

	it('Add Asset, Export, Upload buttons and Asset list header are visible test', () => {
		cy.get("[data-testid='management-asset-list']").should('have.text', 'Asset List');

		//Add Asset button visibility check
		cy.get('[data-testid="btn-sub-header-action-Add Asset"]').should('have.text', 'Add Asset');

		//Export button visibility check
		cy.get('[data-testid="btn-sub-header-action-Export"]').should('have.text', 'Export');

		//Upload button visibility check
		cy.get('[data-testid="btn-sub-header-action-Export"]').should('have.text', 'Export');
	});

	it('Pin and unpin column in Asset list table test', () => {
		//pin Device ID column to the left side
		cy.pinColumn('Device ID', 'left');
		cy.get('[data-testid="items-list-pinned-column-left-header-0"] [data-testid = "column-header-device-id"]')
			.should('be.visible')
			.and('have.text', 'Device ID');

		//pin Battery Power colum to the right
		cy.pinColumn('Battery Icon', 'right');
		cy.get('[data-testid="items-list-pinned-column-right-header-0"] [data-testid = "column-header-battery-icon"]')
			.should('be.visible')
			.and('have.text', 'Battery Icon');

		cy.unpinColumn('Device ID');
		cy.get('[data-testid="items-list-pinned-column-left-header-0"] [data-testid = "column-header-device-id"]').should(
			'not.exist'
		);
	});

	it('Pin multiple columns to one side in Asset list table test', () => {
		//pin Device ID and Battery Power columns to the left side
		cy.pinColumn('Device ID', 'left');
		cy.pinColumn('Battery Icon', 'left');

		cy.get('[data-testid="items-list-pinned-column-left-header-0"] [data-testid = "column-header-device-id"]').should(
			'have.text',
			'Device ID'
		);

		cy.get(
			'[data-testid="items-list-pinned-column-left-header-0"] [data-testid = "column-header-battery-icon"]'
		).should('have.text', 'Battery Icon');
	});
});
