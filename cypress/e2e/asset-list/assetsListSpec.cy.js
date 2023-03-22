// @team2
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
			'Associated',
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

	it('Verify all data is displayed on Asset Lists Table', () => {
		let assetModel = assets.asset_withoptional;
		cy.generateRandom(100000, 900000).then((prefix) => {
			assetModel.assetId += prefix;
			assetModel.assetNickname += prefix;

			var fieldsToCheck = [
				{ dataField: 'org_name', value: assetModel.companyName, regex: false },
				{ dataField: 'asset_id', value: assetModel.assetId, regex: false },
				{ dataField: 'name', value: assetModel.assetNickname },
				{
					dataField: 'lst_evnt_t',
					value: new RegExp(dayjs().format('MM/DD/YYYY')),
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
				{ dataField: 'last_gps_t', value: /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/, regex: true },
			];

			// Create new asset with mandatory fields
			cy.createNewAsset(assetModel);
			cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');

			// Show all columns
			cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
			cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
			cy.clickOutside();
			cy.wait(500);

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

	it('Verify sorting of Asset Lists Table', () => { 
		var fieldsToCheck = [
			{ dataField: 'org_name', type: 'string' },
			{ dataField: 'asset_id', type: 'string'},
			{ dataField: 'name', type: 'string' },
			{ dataField: 'imei', type: 'string' },
			{ dataField: 'lst_evnt_t', type: 'date' },
			{ dataField: 'device_associated', type: 'string' },
			{ dataField: 'city', type: 'string' },
			{ dataField: 'state', type: 'string' },
			{ dataField: 'category', type: 'string' }, 
			{ dataField: 'tags', type: 'string' },
		]

		//wait for spinner on Asset Lists Table
		cy.get('[role="progressbar"]', { timeout: 30000 }).should('not.exist')
		
		fieldsToCheck.forEach((field) => {
			//click on sort button
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('top');
			cy.get(`[data-field='${field.dataField}'] [data-testid *= 'items-list-column-sort-btn']`).click({force:true})	
			//verify sorting ASC: top, middle, bottom of the table
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('center');
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('bottom');
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			// navigate to page#2 and verify sorting ASC  
			cy.get('[aria-label="Go to page 2"]').click();
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			// navigate to page#1 and verify sorting ASC  
			cy.get('[aria-label="Go to page 1"]').click();
			verifyTableIsSortedByColumn(field.dataField, true, field.type)

			//click on sort button
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('top');
			cy.get(`[data-field='${field.dataField}'] [data-testid *= 'items-list-column-sort-btn']`).click({force:true})
			//verify sorting DESC: top, middle, bottom of the table
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('center');
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('bottom');
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			// navigate to page#2 and verify sorting DESC  
			cy.get('[aria-label="Go to page 2"]').click();
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			// navigate to page#1 and verify sorting DESC  
			cy.get('[aria-label="Go to page 1"]').click();
			verifyTableIsSortedByColumn(field.dataField, false, field.type)

		});
	});

	it('Verify sorting of Asset Lists Table - Hidden fields', () => { 
		var fieldsToCheck = [
			{ dataField: 'postcode', type: 'string' },
			{ dataField: 'latitude', type: 'float' },
			{ dataField: 'longitude', type: 'float' },
			{ dataField: 'vin', type: 'string' },
			{ dataField: 'wheel_config', type: 'float' },
			{ dataField: 'num_of_axles', type: 'float' },
			{ dataField: 'length', type: 'float' },
			{ dataField: 'last_gps_t', type: 'date' }, 
			{ dataField: 'door_type', type: 'string' },
		]

		//wait for spinner on Asset Lists Table
		cy.get('[role="progressbar"]', { timeout: 30000 }).should('not.exist')
		
		// Show all columns
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
		cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
		cy.clickOutside();

		fieldsToCheck.forEach((field) => {
			cy.get('.MuiDataGrid-virtualScroller').scrollTo('topRight').wait(200);
			//click on 'Sort by ASC' item from header menu 
			cy.get(`[data-field='${field.dataField}'] [data-testid="TripleDotsVerticalIcon"]`).click({ force: true });
			cy.get('[role="tooltip"]').should('be.visible').contains('Sort by ASC').click({ force: true }, {delay: 200});
			//verify sorting ASC: top, middle, bottom of the table
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('right').wait(200);
			verifyTableIsSortedByColumn(field.dataField, true, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('bottomRight').wait(200);
			verifyTableIsSortedByColumn(field.dataField, true, field.type)

			//click on 'Sort by DESC' item from header menu
			cy.get('.MuiDataGrid-virtualScroller').scrollTo('topRight').wait(200);
			cy.get(`[data-field='${field.dataField}'] [data-testid="TripleDotsVerticalIcon"]`).click({ force: true });
			cy.get('[role="tooltip"]').should('be.visible').contains('Sort by DESC').click({ force: true },{delay: 200});
			//verify sorting DESC: top, middle, bottom of the table
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('right').wait(200);
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('bottomRight').wait(200);
			verifyTableIsSortedByColumn(field.dataField, false, field.type)
		});
	});

	function verifyTableIsSortedByColumn(columnDataField, isASC, type) {
		cy.get('[data-rowindex]')
		.find(`[data-field='${columnDataField}']`)
		.then(($cells) => Cypress._.map($cells, (el) => 
			type == 'date' && el.innerText ? new Date(el.innerText) : 
			type == 'float' && el.innerText ? parseFloat(el.innerText) :
			el.innerText.toUpperCase()))
		.then((cells) => {
			const sorted = isASC ? Cypress._.sortBy(cells) : Cypress._.sortBy(cells).reverse();
			cy.log('actual: ' + cells.join(', '))
			cy.log('expected: '+ sorted.join(', '))
			expect(sorted).to.deep.equal(cells)
		});
	}
});
