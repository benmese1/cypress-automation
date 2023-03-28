import * as otplib from 'otplib';

/**
 * Login in to application with default username and two-factor authentication
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('login', (user, pwd, { cacheSession = true } = {}) => {
	const login = () => {
		cy.visit('/login');
		cy.get('.visible-lg #signInFormUsername').type(user, { force: true });
		cy.get('.visible-lg #signInFormPassword').type(pwd, { force: true });
		cy.get('.visible-lg .btn-primary').click({ force: true });
		if (Cypress.env('MFAenabled')) {
			const securitykey = Cypress.env('TESTMFA');
			let code = getMFACode(securitykey);
			cy.get('input[id=totpCodeInput]').type(code);
			cy.get('#signInButton').click();
		}
	};
	if (cacheSession) {
		cy.session(user, login);
		cy.visit('/dashboard');
		cy.contains(`Sign In as ${user}`).click({force: true});
	} else {
		login();
	}	
});

/**
 * Login in to application with out two-factor authentication
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('loginWithOutAuthenticator', (user, pwd, { cacheSession = true } = {}) => {
	const login = () => {
		cy.visit('/login');
		cy.get('.visible-lg #signInFormUsername').type(user, { force: true });
		cy.get('.visible-lg #signInFormPassword').type(pwd, { force: true });
		cy.get('.visible-lg .btn-primary').click({ force: true });
	};
	if (cacheSession) {
		cy.session(user, login);
		cy.visit('/dashboard');
		cy.contains(`Sign In as ${user}`).click({force: true});
	} else {
		login();
	}
});

/**
 * authenticate using two-factor authentication
 * @param {string} securitykey
 */
Cypress.Commands.add('authenticator', (securitykey) => {
	if (Cypress.env('MFAenabled')) {
		let code = getMFACode(securitykey);
		cy.get('input[id=totpCodeInput]').type(code);
		cy.get('#signInButton').click();
	}
});

/**
 * authenticate using two-factor authentication
 * @param {string} securitykey
 * @returns MFA code
 */

function getMFACode(securitykey) {
	let code = otplib.authenticator.generate(securitykey);
	return code;
}

/**
 * Generates API token and stores in cookie for 1hr
 * API token can be retrieved in scripts by using cy.getCookie('apitoken')
 */

Cypress.Commands.add('generateAPIToken', () => {
	cy.getCookie('apitoken').then((token) => {
		if (token && token.value) {
			cy.log('token to be used is :' + cy.getCookie('apitoken'));
		} else {
			cy.request({
				method: 'POST',
				url: Cypress.env('cognito_uri'),
				headers: {
					'X-Amz-Target': Cypress.env('X-Amz-Target'),
					'Content-Type': Cypress.env('Content-Type'),
				},
				body: {
					AuthFlow: Cypress.env('AuthFlow'),
					ClientId: Cypress.env('ClientId'),
					AuthParameters: { USERNAME: Cypress.env('TESTusername'), PASSWORD: Cypress.env('TESTpassword') },
				},
			}).should((response) => {
				expect(response.status).to.eq(200);
				if (Cypress.env('MFAenabled')) {
					expect(response.status).to.eq(200);
					expect(response.body).to.have.property('Session');
					global.Session = response.body.Session;
					let securitykey = Cypress.env('TESTMFA');
					cy.request({
						method: 'POST',
						url: Cypress.env('cognito_uri'),
						headers: {
							'X-Amz-Target': Cypress.env('X-Amz-Target-Auth'),
							'Content-Type': Cypress.env('Content-Type-Auth'),
						},
						body: {
							ChallengeName: Cypress.env('ChallengeName'),
							ChallengeResponses: {
								USERNAME: Cypress.env('TESTusername'),
								SOFTWARE_TOKEN_MFA_CODE: getMFACode(securitykey),
							},
							Session: global.Session,
							ClientId: Cypress.env('ClientId'),
							UserPoolId: Cypress.env('UserPoolId'),
						},
					}).should((response) => {
						expect(response.status).to.eq(200);
						expect(response.body.AuthenticationResult).to.have.property('IdToken');
						expect(response.body.AuthenticationResult).to.have.property('ExpiresIn').to.eq(3600);
						// Token is stored and will be consumed in graphQL API call
						cy.setCookie('apitoken', response.body.AuthenticationResult.IdToken, { expires: 3600 });
						cy.getCookie('apitoken').should('exist');
					});
				} else {
					expect(response.body.AuthenticationResult).to.have.property('IdToken');
					expect(response.body.AuthenticationResult).to.have.property('ExpiresIn').to.eq(3600);
					cy.setCookie('apitoken', response.body.AuthenticationResult.IdToken, { expires: 3600 });
					cy.getCookie('apitoken').should('exist');
					// cy.log('Token = ' + cy.getCookie('apitoken').value);
				}
			});
		}
	});
});

/**
 * Waits until the spinner disappears from the page
 * @param {number} timeout - timeout in milliseconds, default is 30 sec
 */
Cypress.Commands.add('waitForLoad', (timeout) => {
	if (typeof timeout === 'undefined') {
		timeout = 30000;
	}
	cy.get('[data-testid="spinner_svg"]', { timeout: timeout })
		.should('exist')
		.get('[data-testid="spinner_svg"]', { timeout: timeout })
		.should('not.exist');
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
	cy.get('[data-testid="selector"] [role="button"]').should('be.visible').click().wait(500);
	cy.get(`[data-testid='${dataTestid[searchOption]}']`).click();

	if (isSubmit) {
		cy.get('[data-testid="selector-input"] input')
			.first()
			.clear()
			.type(searchTerm + '{enter}', { delay: 100 }, { force: true });
	} else {
		cy.get('[data-testid="selector-input"] input').first().clear().type(searchTerm);
	}
});

//logout from the application
Cypress.Commands.add('logout', () => {
	cy.get('[data-testid="AccountCircleIcon"]').should('be.visible').click().wait(100).get('li[role="menuitem"]').click();
});

Cypress.Commands.add('clickOutside', () => {
	cy.get('body').click(0, 0);
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

//#region General commands

/** Safe type of value. Can be used to handle filling a large form that has many optional fields
 * If value is empty - error is not thrown
 *  @param {string} value - value to set
 *  @param {string} locator - locator of element to set value
 */
Cypress.Commands.add('safeType', (locator, value) => {
	if (typeof value != 'undefined') {
		cy.get(locator).clear().realType(value);
	}
});

/** Safe type and select of value. Can be used to handle filling a large form that has many optional fields
 * If value is empty - error is not thrown
 *  @param {string} value - value to set
 *  @param {string} locator - locator of element to set value
 */
Cypress.Commands.add('safeTypeAndSelect', (locator, value) => {
	if (typeof value != 'undefined') {
		cy.get(locator).realClick().realType(value);
		cy.get('li').contains(value).realClick();
	}
});

/** Safe select of value. Can be used to handle filling a large form that has many optional fields
 * If value is empty - error is not thrown
 *  @param {string} value - value to set
 *  @param {string} locator - locator of element to set value
 *  @param {boolean} isXpath - if true 'xPath' strategy is used to find an element
 */
Cypress.Commands.add('safeSelect', (locator, value, isXpath) => {
	if (typeof isXpath === 'undefined') {
		isXpath = false;
	}
	if (typeof value != 'undefined') {
		isXpath ? cy.xpath(locator).realClick() : cy.get(locator).realClick().wait(500);
		cy.get(`[data-value="${value}"]`).should('be.visible').realClick().wait(500);
	}
});

/**
 * Returns a random integer number of length - give length as integer parameter
 */

Cypress.Commands.add('generateRandomNumber', (length) => {
	return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
});

/**
 * Returns a random integer number between min (inclusive) and max (exclusive)
 */
Cypress.Commands.add('generateRandom', (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
});

Cypress.Commands.add('selectDate', (monthName, dayName, yearName) => {
	cy.selectYear(yearName);
	cy.selectMonth(monthName);
	cy.selectDay(dayName);
});

/** Select year in datepicker
 *  @param {number} yearName - year number to select
 */
Cypress.Commands.add('selectYear', (yearName, limit = 50) => {
	if (limit < 0) {
		throw new Error('Year searching limit reached');
	}
	let currentYear = new Date().getFullYear();

	cy.get("[role='dialog'] [role='presentation']").then(($yearAndMonthLabel) => {
		if ($yearAndMonthLabel.text().includes(yearName)) {
			return;
		} else {
			if (yearName < currentYear) {
				cy.get("[data-testId='ArrowLeftIcon']").click();
			} else if (yearName > currentYear) {
				cy.get("[data-testId='ArrowRightIcon']").click();
			}
		}
		cy.selectYear(yearName, limit - 1);
	});
});

/** Select month in datepicker
 *  @param {string} monthName - name of month to select
 */
Cypress.Commands.add('selectMonth', (monthName, limit = 12) => {
	if (limit < 0) {
		throw new Error('Month searching limit reached');
	}
	var months = {
		January: '1',
		February: '2',
		March: '3',
		April: '4',
		May: '5',
		June: '6',
		July: '7',
		August: '8',
		September: '9',
		October: '10',
		November: '11',
		December: '12',
	};
	let currentMonthNumber = new Date().getMonth() + 1;
	let givenMonthNumber = months[monthName];
	cy.get("[role='dialog'] [role='presentation']").then(($yearAndMonthLabel) => {
		if ($yearAndMonthLabel.text().includes(monthName)) {
			return;
		} else {
			if (givenMonthNumber < currentMonthNumber) {
				cy.get("[data-testId='ArrowLeftIcon']").click();
			} else if (givenMonthNumber > currentMonthNumber) {
				cy.get("[data-testId='ArrowRightIcon']").click();
			}
		}
		cy.selectMonth(monthName, limit - 1);
	});
});

/** Select day in datepicker
 *  @param {Number} dayName - day number select
 */
Cypress.Commands.add('selectDay', (dayName) => {
	cy.get("[role='dialog'] button").contains(dayName).click();
});
//#endregion

/** Expand section with specific name on Drawer
 *  @param {string} sectionName - section's name to expand
 */
Cypress.Commands.add('expandDrawerSection', (sectionName) => {
	cy.contains('[role="button"]', sectionName).then(($section) => {
		cy.wrap($section)
			.invoke('attr', 'aria-expanded')
			.then(($is_expanded) => {
				if ($is_expanded === 'false') {
					$section.click();
				}
			});
	});
});

/**
 * Filter the organizations
 */
Cypress.Commands.add('generic_addFilter', (columnName, operator, value) => {
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
