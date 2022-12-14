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

Cypress.Commands.add('searchAssets', (searchCriteria) => {
	cy.get("input[placeholder='Search']").should('be.visible').type(searchCriteria).wait(1000);
});

Cypress.Commands.add('mapWait', () => {
	cy.intercept('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js')
		.as('map')
		.wait('@map');
});

Cypress.Commands.add('compareText', () => {
	cy.get('[data-testid*="63613"]')
		.eq(0)
		.then(($btn) => {
			let elem1 = $btn.text();
			cy.get('[data-testid*="63613"]')
				.eq(1)
				.then(($btn1) => {
					let elem2 = $btn1.text();
					return elem1.localeCompare(elem2);
				});
		});
});

//Click on the Dashboard menu

Cypress.Commands.add('dashboardMenu', (menu) => {
	const dashboardMenu = [
		'Dashboard',
		'Asset Map',
		'Asset List',
		'Devices',
		'My Organization',
		'My Account',
		'User Management',
	];
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

//logout from the application
Cypress.Commands.add('logout', () => {
	cy.get('[data-testid="AccountCircleIcon"]').should('be.visible').click().wait(100).get('li[role="menuitem"]').click();
});

Cypress.Commands.add('createJSON', (fileName) => {
	cy.writeFile('cypress/data/files/' + fileName, cy.fixture('chassis'));
});

Cypress.Commands.add('logInDB', () => {
	// we would usually put the cy.visit() here as well, but left it in the beforeEach, just for training purposes

	// finds login field and clicks on it
	cy.get('#login2').click();

	// fills out login information and clicks on log in button
	// this timeout is unique to this selector. It will query for this selector for up to one second
	cy.get('#loginusername', { timeout: 1000 }).type(Cypress.env('username'));
	cy.get('#loginpassword', { timeout: 1000 }).type(Cypress.env('password'));
	cy.get('[onclick="logIn()"]').click();
	// a hard coded wait. The test will stop here for 1 sec, even if the element is available to interact with
	cy.wait(1000);
	// this is testing that the modal is no longer open
	cy.get('#exampleModalLabel', { timeout: 2000 }).should('not.be.visible');
});

Cypress.Commands.add('logOutDB', () => {
	// here is a hard coded wait. Technically a dynamic wait is better, but these can be useful still
	cy.wait(1000);
	// finds logout link and clicks on it
	cy.get('#logout2', { timeout: 2000 }).click();
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
	cy.get('[data-testid="TripleDotsVerticalIcon"]')
		.eq(1)
		.click({ force: true })
		.get('.MuiDataGrid-menuList')
		.should('be.visible')
		.contains('Filter')
		.click()
		.get('.MuiDataGrid-filterForm')
		.should('be.visible')
		.get('.MuiDataGrid-filterFormColumnInput select')
		.last()
		.select(columnName)
		.get('.MuiDataGrid-filterFormOperatorInput select')
		.last()
		.select(operator);
	if (!operator.includes('empty')) {
		cy.get('.MuiDataGrid-filterFormValueInput input').last().type(value);
	}
	cy.wait(1000);
});

/** Set location on Asset Map page
 * @param {string} location - searched location value
 * @param {boolean} isSubmit - type enter if true, default is true
 */
Cypress.Commands.add('searchLocation', (location, isSubmit) => {
	if (typeof isSubmit === 'undefined') {
		isSubmit = true;
	}
	cy.get('[data-testid="location-button"]')
		.click()
		.get('[data-testid="location-selector"]')
		.type('{selectall}{backspace}')
		.type(location);
	if (isSubmit) {
		cy.get('[data-testid="location-selector"]').type('{enter}').waitForLoad();
	}
});

/**
 * Waits until the spinner disappears from the page
 * @param {number} timeout - timeout in milliseconds, default is 30 sec
 */
Cypress.Commands.add('waitForLoad', (timeout) => {
	if (typeof timeout === 'undefined') {
		timeout = 30000;
	}
	cy.get('[data-testid="spinner"]', { timeout: timeout })
		.should('exist')
		.get('[data-testid="spinner"]', { timeout: timeout })
		.should('not.exist');
});

//Method Name :createNewOrganization
// Used to create a new Organization
//Params parentorgname,divisioname,name,description,brand,timezone
Cypress.Commands.add('createNewOrganization', (name, description, brand, timezone) => {
	cy.get('button').contains('Create New').click();
	cy.get("[name='name']").type(name);
	cy.xpath("//label[contains(text(),'Description')]/parent::div//textarea[@name='description']").type(description);
	cy.get("[name='brand']").type(brand);
	cy.get("[name='time_zones']").click();
	cy.get('li').contains(timezone).click();
	cy.get('.MuiGrid-root > [data-testid="global-button-component"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Created Successfully!');
});

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
