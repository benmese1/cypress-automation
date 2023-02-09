Cypress.Commands.add('login', (user, pwd, { cacheSession = true } = {}) => {
	const login = () => {
		cy.visit('/login');
		cy.get('.visible-lg #signInFormUsername').type(user, { force: true });
		cy.get('.visible-lg #signInFormPassword').type(pwd, { force: true });
		cy.get('.visible-lg .btn-primary').click({ force: true });
	};
	if (cacheSession) {
		cy.session(user, login);
	} else {
		login();
	}
});

/**
 * Waits until the spinner disappears from the page
 * @param {number} timeout - timeout in milliseconds, default is 30 sec
 */
Cypress.Commands.add('waitForLoad', (timeout) => {
	if (typeof timeout === 'undefined') {
		timeout = 180000;
	}
	cy.get('[data-testid="spinner"]', { timeout: timeout })
		.should('exist')
		.get('[data-testid="spinner"]', { timeout: timeout })
		.should('not.exist');
});

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

Cypress.Commands.add('openDevices', () => {
	cy.get('[data-testid="header"] [role="button"]')
		.click('left')
		.get('[data-testid="side-menu"]')
		.should('be.visible')
		.contains('Devices')
		.click()
		.url()
		.should('include', '/devices');
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
	cy.get("input[placeholder='Search']").should('be.visible').clear().type(searchCriteria).wait(1000);
});

Cypress.Commands.add('searchDevices', (searchCriteria) => {
	cy.get("input[placeholder='Search']").should('be.visible').type(searchCriteria).wait(1000);
});

Cypress.Commands.add('mapWait', () => {
	cy.intercept('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js')
		.as('map')
		.wait('@map');
});

Cypress.Commands.add('compareText', () => {
	cy.get('[data-testid*="asset-"]')
		.eq(0)
		.then(($btn) => {
			let elem1 = $btn.text();
			cy.get('[data-testid*="asset-"]')
				.eq(1)
				.then(($btn1) => {
					let elem2 = $btn1.text();
					return elem1.localeCompare(elem2);
				});
		});
});

//Click on the Dashboard menu
Cypress.Commands.add('dashboardMenu', (menu) => {
	const dashboardMenu = ['Dashboard', 'Asset Map', 'Asset List', 'Devices', 'My Organization', 'User Management'];
	cy.get('[data-testid="header"] [role="button"]')
		.click()
		.wait(500)
		.get('[data-testid="side-menu"]')
		.should('be.visible');
	dashboardMenu.forEach((dashboard) => {
		if (menu === dashboard) {
			cy.contains(dashboard).click({ force: true }).wait(100).end();
		} else {
			cy.log('check the selector for dashboard');
		}
	});
});

/** Global search of option and provided search term
 * Supported options: Assets, Devices, Locations, Users, Organizations
 * @param {string} searchOption - searched option
 * @param {string} searchTerm - searched value
 * @param {boolean} isSubmit - type enter if true, default is true
 */
Cypress.Commands.add('globalSearch', (searchOption, searchTerm, isSubmit) => {
	if (typeof isSubmit === 'undefined') {
		isSubmit = true;
	}
	const dataTestid = {
		Assets: 'global-search-select-item-Assets',
		Locations: 'global-search-select-item-Locations',
		Devices: 'global-search-select-item-Devices',
		Users: 'global-search-select-item-Users',
		Organizations: 'global-search-select-item-Organizations',
	};
	cy.get('[data-testid="global-search-select"] [role="button"]').click().wait(500);
	cy.get(`[data-testid='${dataTestid[searchOption]}']`).click();

	if (isSubmit) {
		cy.get('[data-testid="selector-input"] input')
			.first()
			.clear()
			.type(searchTerm + '{enter}');
	} else {
		cy.get('[data-testid="selector-input"] input').first().clear().type(searchTerm);
	}
});

//logout from the application
Cypress.Commands.add('logout', () => {
	cy.get('[data-testid="AccountCircleIcon"]').should('be.visible').click().wait(100).get('li[role="menuitem"]').click();
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
	cy.get('[data-testid="TripleDotsVerticalIcon"]')
		.eq(1)
		.click({ force: true })
		.get('.MuiDataGrid-menuList')
		.should('be.visible')
		.contains('Show columns')
		.click()
		.get('.MuiDataGrid-panel')
		.should('be.visible')
		.contains(columnName)
		.click()
		.wait(1000);
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

/** Set location on Asset Map page
 * @param {string} location - searched location value
 * @param {boolean} isSubmit - type enter if true, default is true
 */
Cypress.Commands.add('searchLocation', (location, isSubmit) => {
	if (typeof isSubmit === 'undefined') {
		isSubmit = true;
	}
	cy.get('[data-testid="location-button"]').click({ force: true });
	cy.wait(1000);
	if (isSubmit) {
		cy.get('[data-testid="filter-bar-location-selector-wrapper"] button').type(
			location + '{enter}',
			{ delay: 100 },
			{ force: true }
		);
		// the map animation when you change location can take up to 6 seconds zooming out from one location
		// and zooming in to another. This wait ensures the zoom is complete before other actions are taken.
		cy.wait(6000);
	} else {
		cy.get('[data-testid="filter-bar-location-selector-wrapper"] button').type(
			location,
			{ delay: 100 },
			{ force: true }
		);
	}
});

//Method Name :createNewOrganization
//Used to create a new Organization
//Params companyname,brand,type,timezone,distancepreference
Cypress.Commands.add('createNewOrganization', (companyname, parentcompany, brand, type, timezone, distancepref) => {
	cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
	cy.get('[data-testid="input-org-name"]').type(companyname);
	cy.get('[data-testid="input-org-parent-company"]').click();
	cy.get('li').contains(parentcompany).click();
	cy.get('[data-testid="input-org-brand"]').click();
	cy.get('li').contains(brand).click();
	cy.get('[data-testid="input-org-type"]').click();
	cy.get('li').contains(type).click();
	cy.get('[data-testid="input-org-timezone"]').click();
	cy.get('li').contains(timezone).click();
	cy.get('[data-testid="input-org-distance-unit-preference"]').click();
	cy.get('li').contains(distancepref).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Created Successfully!');
});

//Method Name :createNewAsset
//Used to create a new Asset
//Params - mandatory fields companyname, assetId, assetNickname, deviceId, assetType
Cypress.Commands.add('createNewAsset', (companyName, assetId, assetNickname, deviceId, assetType) => {
	cy.get('[data-testid="btn-sub-header-action-Add Asset"]').click();

	cy.get('[data-testid="autocomplete-customer_orgs_id"]').click().type(`${companyName}{enter}`);
	cy.get('li').contains(companyName).click();

	cy.get('[data-testid="form-control-input-asset_id"]').type(assetId);
	cy.get('[data-testid="form-control-input-name"]').type(assetNickname);
	cy.get('[data-testid="form-control-input-imei"]').type(deviceId);
	cy.get('[data-testid="autocomplete-category"]').click();
	cy.get('li').contains(assetType).click();

	cy.get('[data-testid="global-button-component"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Asset Created Successfully!');
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
	if (rowIndex === 'undefined') {
		rowIndex = 1;
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
		`//*[@data-field='organization']//div[contains(text(),'${orgName}')]//ancestor::*[@role='row']//div[@data-field='${dataField[fieldName]}']`
	)
		.eq(rowIndex)
		.click();
});

/** Expand section with specific name on Drawer
 *  @param {string} sectionName - section's name to expand
 */
Cypress.Commands.add('expandDrawerSection', (sectionName) => {
	cy.contains('[role="button"]', sectionName).then(($section) => {
		$section.invoke('attr', 'aria-expanded').then(($is_expanded) => {
			if ($is_expanded === 'false') {
				$section.click();
			}
		});
	});
});

//Method Name :createNewUser
//Used to create a new User
//Params Company/SubCompany,lastName,firstName,username,email,phonenumber,role
Cypress.Commands.add('createNewUser', (lastName, firstName, name, parentorg, email, phonenumber, role) => {
	cy.log(parentorg);
	cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
	cy.get('[data-testid="form-control-input-lastName"]').type(lastName);
	cy.get('[data-testid="form-control-input-firstName"]').type(firstName);
	cy.get('[data-testid="form-control-input-name"]').type(name);
	cy.get('[data-testid="autocomplete-customer_orgs_id"]').click();
	cy.get('li').contains(parentorg).click();
	cy.get('[data-testid="form-control-input-email"]').type(email);
	cy.get('[data-testid="form-control-input-phoneNumber"]').type(phonenumber);
	cy.get('[data-testid="autocomplete-groups"]').click();
	cy.get('li').contains(role).click();
	cy.get('[data-testid="global-button-component"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User Created Successfully!');
});

//Method Name :editUser
//Used to edit a given user
//Params name, lastName, firstName, phonenumber
Cypress.Commands.add('editUser', (name, lastName, firstName, phonenumber) => {
	cy.xpath('//div[text()="' + name + '"]').click();
	cy.get('[data-testid="form-control-input-lastName"]').clear().type(lastName);
	cy.get('[data-testid="form-control-input-firstName"]').clear().type(firstName);
	cy.get('[data-testid="form-control-input-phoneNumber"]').clear().type(phonenumber);
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User Updated Successfully!');
});

//Method Name :editOrg
//Used to edit a given Org
//Params companyname, brand, type, timezone, distancepreference
Cypress.Commands.add('editOrg', (companyname, brand, type, timezone, distancepref) => {
	cy.xpath('//div[text()="' + companyname + '"]').click();
	cy.get('[data-testid="input-org-brand"]').clear().type(brand);
	cy.get('[data-testid="input-org-type"]').clear().type(type);
	cy.get('li').contains(type).click();
	cy.get('[data-testid="input-org-timezone"]').clear().type(timezone);
	cy.get('li').contains(timezone).click();
	cy.get('[data-testid="input-org-distance-unit-preference"]').clear().type(distancepref);
	cy.get('li').contains(distancepref).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Updated Successfully!');
});

Cypress.Commands.add('clickOutside', () => {
	cy.get('body').click(0, 0);
});

/**
 * Search for the organizations& users
 */
Cypress.Commands.add('searchOrgsAndUsers', (searchCriteria) => {
	cy.get('[data-testid="items-list-search-input"]').should('be.visible').type(searchCriteria).wait(1000);
});

//Method Name :verifyMyOrganizationTableView
//Used to verify if My Organization table exits
//Params No Param
Cypress.Commands.add('verifyMyOrganizationTableView', () => {
	cy.get('[role="grid"]').invoke('attr', 'aria-rowcount').then(parseInt).should('be.gte', 1);
});

//Method Name :verifyNotExistsOfAppMenuItems
//Used to verify if My Organization table exits
//Params menu
Cypress.Commands.add('verifyNotExistsOfAppMenuItems', (menu) => {
	cy.get('[data-testid="header"] [role="button"]')
		.click()
		.wait(500)
		.get('[data-testid="side-menu"]')
		.should('be.visible');
	switch (menu) {
		case 'Dashboard':
			cy.get('#dashboard-cta > b').should('not.exist');
			break;
		case 'Assetmap':
			cy.get('#asset-map-ctav > b').should('not.exist');
			break;
		case 'Assetlist':
			cy.get('#asset-list-cta > b').should('not.exist');
			break;
		case 'Devices':
			cy.get('#devices-cta > b').should('not.exist');
			break;
		case 'My Organization':
			cy.get('#organization-cta > b').should('not.exist');
			break;
		case 'Usermanagement':
			cy.get('#user-management-cta > b').should('not.exist');
			break;
	}
});

// https://reflect.run/articles/comparing-screenshots-in-cypress/
// https://www.npmjs.com/package/cypress-image-diff-js?activeTab=readme
// takes and compares a snapshot to the snapshot in your base folder
// cypress has a default screenshot funtionality built in, if all you want to do is take a screenshot
// https://docs.cypress.io/api/commands/screenshot
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');
compareSnapshotCommand();

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
