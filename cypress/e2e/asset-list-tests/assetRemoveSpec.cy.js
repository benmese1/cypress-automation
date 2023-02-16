import assets from '../../fixtures/createasset.json';
let prefix = Math.floor(100000 + Math.random() * 900000);

describe('Asset Management removal tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Removed asset can`t be found in assets table', () => {
		let assetModel = assets[0].asset;
		let assetNickname = assetModel.AssetNickname + prefix;

		// Create new asset for removing
		cy.createNewAsset(assetModel.CompanyName, assetModel.AssetId + prefix, assetNickname, prefix, assetModel.AssetType);

		// Wait for 'Assets' table loading
		cy.get('[data-rowindex]').should('have.length.gt', 1);

		// Search created asset and remove it
		cy.removeAsset(assetNickname).wait(2000);

		// Search removed asset
		cy.searchAssets(assetNickname);

		cy.get('[data-rowindex]').should('have.length', 0);
	});
});
