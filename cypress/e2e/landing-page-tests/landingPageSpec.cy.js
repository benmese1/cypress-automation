describe('Landing page view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {cacheSession: false})
			.waitForLoad();
	});

	it('verify moving assets', () => {
		cy.get('[data-testid="dashboard-tile-total-assets-value"]')
			.invoke('text')
			.then(parseFormattedTextToFloat)
			.then(totalAssets => {
				cy.get('[data-testid="active-assets-value"]')
					.invoke('text')
					.then(parseFormattedTextToFloat)
					.should('be.lessThan', totalAssets)
					.then(movingAssets => {
						cy.get('[data-testid="inactive-assets-value"]')
							.invoke('text')
							.then(parseFormattedTextToFloat)
							.should('eq', totalAssets - movingAssets)
					})
			})
	})

	it('verify Landing page for user with first name', () => {
		cy.url().should('include', '/dashboard');
		cy.contains('Welcome back, Dinesh');
	});

	it('verify that location selector appeared', () => {
		cy.get('[data-testid="selector-input"]').should('be.visible');
	});

	it(' Verify search placeholder text test', () => {
		cy.get('[data-testid="selector-input"] input')
			.invoke('attr', 'placeholder')
			.should('equal', 'Find An Asset');
	});

	it('Navigate into the map by clicking on "Asset Map" button test', () => {
		cy.get('[data-testid="dashboard-component-buttons-asset-map"] button')
			.click()
			.url()
			.should('include', 'map')
			.get('[aria-label="Map"]')
			.should("be.visible");
	});

	it('Navigate into the Device Management page by clicking on "My Devices" button test', () => {
		cy.get('[data-testid="dashboard-component-buttons-device-management"] button')
			.click()
			.url()
			.should('include', 'devices');
	});

	it('Navigate into the Asset Management by clicking on Total Assets dashboard tile test', () => {
		cy.get('[data-testid="dashboard-tile-total-assets"]').click().url().should('include', 'assets');
	});

	it('Navigate into the Asset Management by clicking on Assets Moving dashboard tile test', () => {
		cy.get('[data-testid="dashboard-tile-active-assets"]').click().url().should('include', 'assets');
	});

	it('Navigate into the Asset Management by clicking on Total Miles Traveled dashboard tile test', () => {
		cy.get('[data-testid="dashboard-tile-total-distance"]').click().url().should('include', 'assets');
	});
});

async function parseFormattedTextToFloat (text) {
	const value = text.match(/(\d|,|\.)+/g)[0]
	return Number(value.replaceAll(",",""))
}
