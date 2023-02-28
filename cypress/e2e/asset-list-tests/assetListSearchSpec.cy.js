import assets from '../../fixtures/createasset.json';

describe('Asset Management page search tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify Search Results for Assets Table', () => {
		cy.generateRandom(100000, 900000).then((prefix) => {
			let assetModel = assets.asset_mandatoryfields;
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;

			// Create new asset for searching
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			// Wait for 'Assets' table loading
			cy.get("[role='cell'][data-field='name'] div").should('have.length.gte', 1);

			// Search created asset
			cy.searchAssets(assetModel.assetNickname);

			// Select 'Asset Nickname'
			showColumn('Asset Nickname');

			// Verify search result in 'Assets' table
			cy.get("[role='cell'][data-field='name'] div").each(($item) => {
				cy.wrap($item).should('contain.text', assetModel.assetNickname);
			});
		});
	});
});

const showColumn = (column) => {
	// Open columns dialog
	cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible').click();
	// Enable only one column
	cy.contains('button[type=button]', 'Hide all').click();
	cy.contains('label', column).click();
	// Hide columns dialog
	cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
};
