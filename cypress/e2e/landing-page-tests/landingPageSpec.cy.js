describe('Landing page view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false }).waitForLoad();
	});

	it('Verify moving assets', () => {
		cy.get('[data-testid="dashboard-tile-total-assets-value"]')
			.invoke('text')
			.then(parseFormattedTextToFloat)
			.then((totalAssets) => {
				cy.get('[data-testid="active-assets-value"]')
					.invoke('text')
					.then(parseFormattedTextToFloat)
					.should('be.lessThan', totalAssets)
					.then((movingAssets) => {
						cy.get('[data-testid="inactive-assets-value"]')
							.invoke('text')
							.then(parseFormattedTextToFloat)
							.should('eq', totalAssets - movingAssets);
					});
			});
	});

	it('Verify Asset widgets display actual data', () => {
		cy.xpath('//*[@data-testid="dashboard-tile-total-assets"]//*[@data-testid="total-assets-secondary-value"]')
		.each(($secondaryValue) => {
			cy.wrap($secondaryValue).invoke('text')
			.then(parseFormattedTextToFloat)
			.should('be.gt', 0);
		});
		cy.xpath('//*[@data-testid="dashboard-tile-active-assets"]//*[@data-testid="total-assets-secondary-value"]')
		.each(($secondaryValue) => {
			cy.wrap($secondaryValue).invoke('text')
			.then(parseFormattedTextToFloat)
			.should('be.gt', 0);
		});
	});

	it('Verify Landing page for user with first name', () => {
		cy.url().should('include', '/dashboard');
		cy.get('[data-testid="dashboard-component"] h3').contains(/^Welcome back, (.+)/);
	});

	it('Navigate into the map by clicking on "Asset Map" button', () => {
		cy.get('[data-testid="dashboard-component-buttons-asset-map"] button').click();
		cy.url().should('include', 'map');
		cy.get('[aria-label="Map"]').should('be.visible');
	});

	it('Navigate into the Device Management page by clicking on "My Devices" button', () => {
		cy.get('[data-testid="dashboard-component-buttons-device-management"] button').click();
		cy.url().should('include', 'devices');
	});

	it('Navigate into the Asset Management by clicking on Total Assets dashboard tile', () => {
		cy.get('[data-testid="dashboard-tile-total-assets"]').click();
		cy.url().should('include', 'assets');
	});

	it('Navigate into the Asset Management by clicking on Assets Moving dashboard title', () => {
		cy.get('[data-testid="dashboard-tile-active-assets"]').click();
		cy.url().should('include', 'assets');
	});

	it('Navigate into the Asset Management by clicking on Total Miles Traveled dashboard tile', () => {
		cy.get('[data-testid="dashboard-tile-total-distance"]').click();
		cy.url().should('include', 'assets');
	});

	it('Verify Navigation by Menu', () => {
		cy.dashboardMenu('Asset List');
		cy.url().should('include', 'assets');
		cy.get('[data-testid = "management-asset-list"]').should('contain.text', 'Asset List');

		cy.dashboardMenu('Devices');
		cy.url().should('include', 'device');
		cy.get('[data-testid = "management-devices"]').should('contain.text', 'Devices');

		cy.dashboardMenu('My Organization');
		cy.url().should('include', 'organizations');
		cy.get('[data-testid = "management-my-organization"]').should('contain.text', 'My Organization');

		cy.dashboardMenu('User Management');
		cy.url().should('include', 'user-management');
		cy.get('[data-testid = "management-user-management"]').should('contain.text', 'User Management');

		cy.dashboardMenu('My Account');
		cy.url().should('include', 'my-account');
		cy.get('[data-testid = "form-control-input-firstName"]').should('exist');

		cy.dashboardMenu('Asset Map');
		cy.url().should('include', 'map');
		cy.get('[data-testid = "location-button"]').should('exist');
	});
});

async function parseFormattedTextToFloat(text) {
	const value = text.match(/(\d|,|\.)+/g)[0];
	return Number(value.replaceAll(',%', ''));
}
