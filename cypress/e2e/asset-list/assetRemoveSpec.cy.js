// @team2
import assets from '../../fixtures/createasset.json';

describe('Asset Management removal tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Removed asset can`t be found in assets table',{tags: ['@smoke', '@removing', '@asset']}, () => {
		let assetModel = assets.asset_mandatoryfields;

		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;

			// Create new asset for removing
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			// Wait for 'Assets' table loading
			cy.get('[data-rowindex]').should('have.length.gt', 1);

			// Search created asset and remove it
			cy.removeAsset(assetModel.assetNickname).wait(2000);

			// Search removed asset
			cy.get("input[placeholder='Search']").should('be.visible').clear().type(assetModel.assetNickname).wait(1000);
			cy.get('[data-rowindex]').should('have.length', 0);
		});
	});
});
