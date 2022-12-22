describe('Asset Management page general tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify assets table is displayed', () => {
		cy.get('.MuiDataGrid-root').should('be.visible');
	});

	it('Verify assets table columns visibility', () => {
		const columnHeadersList = [
			'Icon',
			'Asset ID',
			'Asset Nickname',
			'Device ID',
			'Product Name',
			'Trip Status',
			'City',
			'State',
			'Asset Type',
			'Battery Icon',
			'Asset Tags',
			'Last Event'
		];
		cy.get('.MuiDataGrid-columnHeaderTitle')
			.each((el) => {
				expect(el.text()).oneOf(columnHeadersList);
			})
			.should('have.length', columnHeadersList.length);
	});

	it('Paging test', () => {
		cy.get('[data-rowindex="0"] .MuiDataGrid-cell')
			.should('be.visible')
			.get('.mr-3')
			.should('contain.text', '1 - 100 of')
			//go to second page
			.get('[aria-label="Go to page 2"]')
			.click()
			.get('[data-rowindex="100"] .MuiDataGrid-cell')
			.should('be.visible')
			.get('.mr-3')
			.should('contain.text', '101 - 200 of')
			.get('.MuiPaginationItem-root[aria-current="true"]')
			.should('have.text', '2');
	});

	it('Search "Keep typing..." test', () => {
		cy.searchAssets('a').get('.text-typography').should('have.text', 'Keep typing...');
	});

	it('Add Asset button and Asset list header are visible test', () => {
		cy.get('.text-3xl')
			.should('have.text', 'Asset List')
			.get('[data-testid="global-button-component"]')
			.last()
			.should('have.text', 'Add Asset');
	});

	it('Pin and unpin column in Asset list table test', () => {
		//pin Device ID column to the left side
		cy.pinColumn('Device ID', 'left')
			.get('[data-testid="items-list-pinned-column-left-header"] [data-testid="items-list-column-header"]')
			.should('have.text', 'Device ID')
			//pin Battery Power colum to the right
			.pinColumn('Battery Icon', 'right')
			.get('[data-testid="items-list-pinned-column-right-header"] [data-testid="items-list-column-header"]')
			.should('have.text', 'Battery Icon')
			.unpinColumn('Device ID')
			.get('[data-testid="items-list-pinned-column-left-header"] [data-testid="items-list-column-header"]')
			.should('not.exist');
	});

	it('Pin multiple columns to one side in Asset list table test', () => {
		//pin Device ID and Battery Power columns to the left side
		cy.pinColumn('Device ID', 'left');
		cy.pinColumn('Battery Icon', 'left')
			.get('[data-testid="items-list-pinned-column-left-header"] [data-testid="items-list-column-header"]')
			.first()
			.should('have.text', 'Device ID')
			.get('[data-testid="items-list-pinned-column-left-header"] [data-testid="items-list-column-header"]')
			.last()
			.should('have.text', 'Battery Icon');
	});
});
