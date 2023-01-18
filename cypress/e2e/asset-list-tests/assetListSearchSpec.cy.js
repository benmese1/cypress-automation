let prefix = Math.floor(100000 + Math.random() * 900000);

describe('Asset Management page search tests', () => {
	beforeEach(function () {
		cy.fixture('createasset').then((assets) => {
			this.assets = assets;
		});

		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('verify search results for assets table', function () {
		let assetModel = this.assets[0].asset;
		let assetNicknameToSearch = assetModel.AssetNickname + prefix;

		// Create new asset for searching
		cy.createNewAsset(
			assetModel.CompanyName,
			assetModel.AssetId + prefix,
			assetNicknameToSearch,
			prefix,
			assetModel.AssetType
		);

		// Wait for 'Assets' table loading
		cy.get("[role='cell'][data-field='name'] div").should('have.length.gte', 1);

		// Search created asset
		cy.searchAssets(assetNicknameToSearch);

		// Select 'Asset Nickname'
		showColumn('Asset Nickname');

		// Verify search result in 'Assets' table
		cy.get("[role='cell'][data-field='name'] div").each(($item) => {
			cy.wrap($item).should('contain.text', assetNicknameToSearch);
		});
	});
});

const showColumn = (column) => {
	// Open columns dialog
	getColumnsButton().should('be.visible').click();
	// Enable only one column
	cy.contains('button[type=button]', 'Hide all').click();
	cy.contains('label', column).click();
	// Hide columns dialog
	getColumnsButton().click();
};

function getColumnsButton() {
	return cy.xpath("//button[contains(text(), 'Columns')]");
}
