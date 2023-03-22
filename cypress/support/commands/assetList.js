Cypress.Commands.add('openAssetsList', () => {
	cy.get('[data-testid="header"] [role="button"]')
		.click('left')
		.get('[data-testid="side-menu"]')
		.should('be.visible')
		.contains('Asset List')
		.click()
		.url()
		.should('include', '/assets')
		.get('.MuiDataGrid-row', { timeout: 30000 })
		.should('be.visible');
});

/** Pin column on Asset list page
 * @param {string} columnName - asset table column name
 * @param {string} side - there are only two options: left and right.
 * NOTE: case-sensitive parameters!!!
 */
Cypress.Commands.add('pinColumn', (columnName, side) => {
	cy.get('.MuiDataGrid-columnHeader[aria-label="' + columnName + '"] .MuiDataGrid-menuIcon button')
		.click({ force: true })
		.get('.MuiDataGrid-menuList')
		.should('be.visible')
		.contains('Pin to ' + side)
		.click();
	cy.wait(1000);
});

/** Unpin column on Asset list page
 * @param {string} columnName - asset table column name
 * @param {string} side - there are only two options: left and right.
 * NOTE: case-sensitive parameters!!!
 */
Cypress.Commands.add('unpinColumn', (columnName) => {
	cy.get('.MuiDataGrid-columnHeader[aria-label="' + columnName + '"] .MuiDataGrid-menuIcon button')
		.click({ force: true })
		.get('.MuiDataGrid-menuList')
		.should('be.visible')
		.contains('Unpin')
		.click();
});

Cypress.Commands.add('searchAssets', (searchCriteria) => {
	// Wait for 'Assets' table loading
	cy.get('[data-rowindex]').should('have.length.gt', 1);
	cy.get("input[placeholder='Search']").should('be.visible').clear().type(searchCriteria).wait(1000);
});

Cypress.Commands.add('assertFilterDates', (filter) => {
	cy.get('[data-timestamp*="Z"]').each(($e) => {
		cy.wrap($e)
			.invoke('attr', 'data-timestamp')
			.then(($current_date) => {
				const date = new Date($current_date);
				expect(filter).to.lte(date);
			});
	});
});

Cypress.Commands.add('showHideColumnAssetsList', (columnName) => {
	cy.get('[data-testid="TripleDotsVerticalIcon"]').eq(1).click({ force: true });
	cy.get('[role="tooltip"]').should('be.visible').contains('Show columns').click();
	cy.get('[role="tooltip"]').should('be.visible').contains(columnName).click().wait(1000);
});

Cypress.Commands.add('addAssetsFilter', (columnName, operator, value) => {
	cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible').click({ force: true }).wait(500);
	cy.get('[role="tooltip"] .MuiDataGrid-filterForm').as('filterPopup');

	//find elements within 'Filter' Popup
	cy.get('@filterPopup').find('select').eq(1).select(columnName);
	cy.get('@filterPopup').find('select').eq(2).select(operator);

	if (!operator.includes('empty')) {
		cy.get('@filterPopup').find('input').last().type(value).wait(500);
	}

	cy.clickOutside();
});

//Method Name :createNewAsset
//Used to create a new Asset
//Params - asset model with propeties. Properties can be optional
Cypress.Commands.add('createNewAsset', (asset) => {
	cy.get('[data-testid="btn-sub-header-action-Add Asset"]').click();
	
	cy.fillAssetForm(asset);

	cy.get('[data-testid="global-button-component"]').click();
});

//Method Name :fillAssetForm
//Used to fill the Asset Form
//Params - asset model with propeties. Properties can be optional
Cypress.Commands.add('fillAssetForm', (asset) => {

	//wait for spinner
	cy.get('[role="progressbar"]', { timeout: 30000 }).should('not.exist')
	cy.get('[name="customer_orgs_id"]').click().realType(`${asset.companyName}{enter}`);
	cy.get('li').contains(asset.companyName).click();
	cy.get('[name="asset_id"]').clear().realType(asset.assetId);
	cy.get('[name="name"]').clear().realType(asset.assetNickname);
	cy.get('[name="category"]').click();
	cy.get('li').contains(asset.assetType).click();

	//fill optional parameters
	cy.safeTypeAndSelect('[name="prd_cde"]', asset.productName);
	cy.safeTypeAndSelect('[data-testid="creatable-autocomplete-tags"]', asset.assetTags);
	cy.safeType('[name="vin"]', asset.vin);
	cy.safeSelect('//label[contains(text(),"of Tires")]/..', asset.numOfTires, true);
	cy.safeSelect('//label[contains(text(),"of Axles")]/..', asset.numOfAxles, true);
	cy.safeType('[name="length"]', asset.length);
	cy.safeTypeAndSelect('[data-testid="form-control-input-door_type"]', asset.doorType);
});

//Method Name :removeAsset
//Used to remove an Asset
//Params - assetNickname
Cypress.Commands.add('removeAsset', (assetNickname) => {
	cy.searchAssets(assetNickname).get('[role="grid"] [data-rowindex="0"]').click();

	cy.get('[data-testid="details-drawer-remove-btn"]').click();

	cy.get('[data-testid="delete-confirmation-dialog-remove-btn"]').should('be.visible').click();
});

/** Open Asset for specific organization and value
 *  @param {string} orgName - name of organization whithin cell click should be performed
 *  @param {string} fieldName - value of cell to click
 *  @param {number} rowIndex - index of row to select cell within
 */
Cypress.Commands.add('openAsset', (orgName, fieldName, rowIndex) => {
	if (typeof rowIndex === 'undefined') {
		rowIndex = 0;
	}
	const dataField = {
		Icon: 'icon',
		'Battery Icon': 'batt_v',
		'Asset ID': 'asset_id',
		'Asset Nickname': 'name',
		'Device ID': 'imei',
		'Product Name': 'prd_cde',
		'Trip Status': 'trip_st',
		'Last Event': 'lst_evnt_t',
		City: 'city',
		State: 'state',
		'Asset Type': 'category',
		'Asset Tags': 'tags',
	};

	//select cells based on the column header name
	cy.xpath(
		`//div[@data-field='org_name']//div[contains(text(),'${orgName}')]//ancestor::div[@role='row']//div[@data-field='${dataField[fieldName]}']`
	)
		.eq(rowIndex)
		.click();
});
