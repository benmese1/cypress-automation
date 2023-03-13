// @viktoriya
import searchData from '../../fixtures/assetsearch.json';
import filterData from '../../fixtures/assetfilter.json';

describe('Search and filter assets', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().openAssetsList();
	});

	searchData.assets.forEach((search) => {
		it(`Asset Searching by existing "${search.option}"'`, () => {
			// Show all columns
			cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
			cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
			cy.clickOutside();

			cy.searchAssets(search.term);

			//verify each cell of provided column has corresponding search value
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('topRight', { ensureScrollable: false });
			cy.get(`[role='cell'][data-field='${search.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', search.term);
			});
		});
	});

	filterData.assets.forEach((filter) => {
		it(`Asset Filtering by existing "${filter.columnname}"'`, () => {
			cy.addAssetsFilter(filter.columnname, filter.operator, filter.value);

			//verify each cell of provided column has corresponding search value
			cy.get(`[role='cell'][data-field='${filter.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', filter.value);
			});
		});
	});
});
