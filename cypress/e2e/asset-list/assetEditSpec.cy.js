// @team2
import assets from '../../fixtures/createasset.json';

describe('Asset Creation Verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify asset editing with mandatory and optional fields', () => {
		let assetModelInit = assets.asset_withoptional;
		let assetModelUpd = assets.asset_withoptional_upd;

		var fieldsToCheck = [
			{ name: 'Asset ID', value: assetModelUpd.assetId },
			{ name: 'Asset Nickname', value: assetModelUpd.assetNickname },
			{ name: 'Product Name', value: assetModelUpd.productName },
			{ name: 'Device ID', value: '' },
			{ name: 'Asset Type', value: assetModelUpd.assetType },
			{ name: 'Asset Tags', value: assetModelInit.assetTags },
			{ name: 'VIN', value: assetModelUpd.vin },
			{ name: '# of Tires', value: assetModelInit.numOfTires },
			{ name: '# of Axles', value: assetModelInit.numOfAxles },
			{ name: 'Length', value: `${assetModelUpd.length}'` },
			{ name: 'Door Type', value: assetModelUpd.doorType },
		];

		// Create new asset
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModelInit.assetId += prefix;
			assetModelInit.assetNickname += prefix;
			assetModelInit.vin += prefix;
			cy.createNewAsset(assetModelInit);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			cy.searchAssets(assetModelInit.assetNickname);
			cy.openAsset(assetModelInit.companyName, 'Asset ID');
		});

		// Update created asset with a new data model
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModelUpd.assetId += prefix;
			assetModelUpd.assetNickname += prefix;
			assetModelUpd.vin += prefix;
			// Edit asset
			cy.expandDrawerSection('Change Details');
			cy.fillAssetForm(assetModelUpd);
			cy.get('[data-testid="details-drawer-close-btn"]').click();
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Updated Successfully!');

			cy.searchAssets(assetModelUpd.assetNickname);
			cy.openAsset(assetModelUpd.companyName, 'Asset ID');

			// Verify the following fields have correct values
			fieldsToCheck.forEach((field) => {
				cy.get('#details-summary p')
					.contains(field.name)
					.next()
					.then(($val) => {
						expect($val.text()).to.contain(field.value);
					});
			});
		});
	});

	it('Verify asset removing mandatory fields and further submit', () => {
		let assetModelInit = assets.asset_withoptional;

		// Create new asset
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModelInit.assetId += prefix;
			assetModelInit.assetNickname += prefix;
			assetModelInit.vin += prefix;
			cy.createNewAsset(assetModelInit);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			cy.searchAssets(assetModelInit.assetNickname);
			cy.openAsset(assetModelInit.companyName, 'Asset ID');

			// Edit asset - remove mandatory field
			cy.expandDrawerSection('Change Details');
			cy.get('[name="asset_id"]').clear();
			cy.get('[data-testid="details-drawer-close-btn"]').click();
			cy.get('#details').should('contain.text', 'Asset ID is required');
		});
	});
});
