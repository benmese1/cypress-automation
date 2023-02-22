import summary from '../../fixtures/assetsummary_dynamic.json';
import assets from '../../fixtures/createasset.json';
let prefix = Math.floor(100000 + Math.random() * 900000);

describe('Asset Summary Section Verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('When Solar Amparage is null than no Solar field is displayed', () => {
		cy.searchAssets('368428');
		cy.openAsset('Werner Enterprises, Inc.', 'Asset ID');
		cy.expandDrawerSection('Summary');

		cy.get('#details-summary p').should('not.contain', 'Solar');
	});

	summary.assets.forEach((field) => {
		it(`Verify dynamic field "${field.fieldname}" has valid value on Asset Summary Section'`, () => {
			cy.addAssetsFilter(field.fieldname, 'starts with', field.value);
			cy.get('[data-rowindex="0"]').click();

			cy.expandDrawerSection('Summary');
			cy.get('#details-summary p')
				.contains(field.fieldname)
				.next()
				.then(($val) => {
					expect($val.text()).to.contains(field.value);
				});
		});
	});

	it('Verify static fields have valid value on Asset Summary Section', () => {
		let assetModel = assets.asset_withoptional;
		assetModel.assetId += prefix;
		assetModel.assetNickname += prefix;
		assetModel.vin += prefix;

		var fieldsToCheck = [
			{ name: 'Asset ID', value: assetModel.assetId },
			{ name: 'Asset Nickname', value: assetModel.assetNickname },
			{ name: 'Product Name', value: assetModel.productName },
			{ name: 'Device ID', value: '' },
			{ name: 'Asset Type', value: assetModel.assetType },
			{ name: 'Asset Tags', value: assetModel.assetTags },
			{ name: 'VIN', value: assetModel.vin },
			{ name: '# of Tires', value: assetModel.numOfTires },
			{ name: '# of Axles', value: assetModel.numOfAxles },
			{ name: 'Length', value: `${assetModel.length}'` },
			{ name: 'Door Type', value: assetModel.doorType },
		];
		// Create new asset for removing
		cy.createNewAsset(assetModel);

		// Wait for 'Assets' table loading
		cy.get('[data-rowindex]').should('have.length.gt', 1);

		cy.openAsset(assetModel.companyName, 'Asset ID');

		cy.expandDrawerSection('Summary');

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

	it('Verify voltage fields have valid value on Asset Summary Section', () => {
		var fieldsToCheck = [
			{ name: 'Battery', value: /^[+-]?[0-9]*[.]?[0-9] V/ },
			{ name: 'Primary Voltage', value: /^[+-]?[0-9]*[.]?[0-9] V/ },
			{ name: 'Secondary Voltage', value: /^[+-]?[0-9]*[.]?[0-9] V/ },
			{ name: 'Solar', value: /^[+-]?[0-9]*[.]?[0-9] Amps+$/ },
		];

		cy.searchAssets('377707');
		cy.openAsset('Werner Enterprises, Inc.', 'Asset ID');
		cy.wait(2000);
		// Verify the following fields have correct values

		fieldsToCheck.forEach((field) => {
			cy.get('#details-summary p')
				.contains(field.name)
				.next()
				.then(($val) => {
					expect($val.text()).to.matches(field.value);
				});
		});
	});
});
