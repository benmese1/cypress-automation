import assets from '../../fixtures/createasset.json';

describe('Asset Creation Verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify asset creation with mandatory fields only', () => {
		let assetModel = assets.asset_mandatoryfields;
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;

			var fieldsToCheck = [
				{ name: 'Asset ID', value: assetModel.assetId },
				{ name: 'Asset Nickname', value: assetModel.assetNickname },
				{ name: 'Asset Type', value: assetModel.assetType },
			];
			// Create new asset with mandatory fields
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			cy.searchAssets(assetModel.assetNickname);
			cy.openAsset(assetModel.companyName, 'Asset ID');
			cy.get('header').should('contain.text', assetModel.companyName);
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
	});

	it('Verify asset creation with already existing Asset Id within the same Company', () => {
		let assetModel = assets.asset_mandatoryfields;
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;
			
			// Create new asset#1
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			// Try to create new asset#2 with existing Asset Id within the same Company
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Creation Failed');
			cy.get('[data-testid="snackbar-title"]').parent().should('contain.text', 'Asset with given asset ID already exists')
		});
	});

	it('Verify asset creation with missed mandatory fields', () => {
		cy.get('[data-testid="btn-sub-header-action-Add Asset"]').click();

		//Input one optional field
		cy.get('[name="vin"]').realType('123456789');

		//Click on 'Create'
		cy.get('[data-testid="global-button-component"]').click();

		//Verify notifications
		cy.get('[data-testid="add-asset-form"]').should('contain.text', 'Company Name is required');
		cy.get('[data-testid="add-asset-form"]').should('contain.text', 'Asset ID is required');
		cy.get('[data-testid="add-asset-form"]').should('contain.text', 'Asset Nickname is required');
		cy.get('[data-testid="add-asset-form"]').should('contain.text', 'Asset Type is required');
	});
});
