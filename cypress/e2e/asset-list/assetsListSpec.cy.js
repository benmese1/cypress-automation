// @viktoriya
import assets from '../../fixtures/createasset.json';
const dayjs = require('dayjs');

describe('Asset Management page general tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify Material UI Premium buttons above table header', () => {
		// Verify Material UI Premium Columns button
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
		// Verify Material UI Premium Filters button
		cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
		// Verify Material UI Premium Density button
		cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
		// Verify Material UI Premium Export button
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');
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
		cy.get("[role='columnheader']").each((el) => {
			expect(el.text()).oneOf(columnHeadersList);
		});
		cy.get("[role='columnheader']").should('have.length', columnHeadersList.length);
	});

	it('Verify assets table all columns visibility', () => {
		const allColumnHeadersList = [
			'Company Name',
			'Icon',
			'Battery Icon',
			'Asset ID',
			'Asset Nickname',
			'Device ID',
			'Product Name',
			'Last Reported Date',
			'Associated',
			'Trip Status',
			'City',
			'State',
			'Zip',
			'Asset Type',
			'Asset Tags',
			'Latitude',
			'Longitude',
			'Vin',
			'# of Tires',
			'# of Axles',
			'Length',
			'Door Type',
			'GPS Time',
		];

		// Show all columns
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
		cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
		cy.clickOutside();

		cy.get("[role='columnheader']").each((el) => {
			expect(el.text()).oneOf(allColumnHeadersList);
		});
	});

	it.only('Verify all data is displayed on Asset Lists Table', () => {
		let assetModel = assets.asset_withoptional;
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;

			var fieldsToCheck = [
				{ dataField: 'organization', value: assetModel.companyName, regex: false },
				{ dataField: 'asset_id', value: assetModel.assetId, regex: false },
				{ dataField: 'name', value: assetModel.assetNickname },
				{
					dataField: 'lst_evnt_t',
					value: new RegExp(dayjs().format('MM/DD/YYYY') + ' ' + '((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))'),
					regex: true,
				},
				{ dataField: 'device_associated', value: 'No', regex: false },
				{ dataField: 'category', value: assetModel.assetType, regex: false },
				{ dataField: 'tags', value: assetModel.assetTags, regex: false },
				{ dataField: 'vin', value: assetModel.vin, regex: false },
				{ dataField: 'wheel_config', value: assetModel.numOfTires, regex: false },
				{ dataField: 'num_of_axles', value: assetModel.numOfAxles, regex: false },
				{ dataField: 'length', value: assetModel.length, regex: false },
				{ dataField: 'door_type', value: assetModel.doorType, regex: false },
				{ dataField: 'last_gps_t', value: /^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/, regex: true },
			];

			// Create new asset with mandatory fields
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			// Show all columns
			cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
			cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
			cy.clickOutside();

			cy.searchAssets(assetModel.assetNickname);

			// Verify the following fields in table have correct values
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('topRight', { ensureScrollable: false });
			fieldsToCheck.forEach((field) => {
				cy.get('[data-rowindex]')
					.find(`[data-field='${field.dataField}']`)
					.then(($val) => {
						if (field.regex == true) {
							expect($val.text()).to.matches(field.value);
						} else {
							expect($val.text()).to.contain(field.value);
						}
					});
			});
		});
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
