describe('Landing page view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false }).waitForLoad();
	});

	it('verify that Landing page opened after login', () => {
		cy.url().should('include', '/dashboard');
		cy.contains('Welcome back, qa_automation');
	});

	it('verify that location selector appeared', () => {
		cy.get('[data-testid="location-selector-input"]').should('be.visible');
	});

	it('verify that Organisation tile link to My Organization page', () => {
		cy.get('.relative [data-testid="dashboard-component"]').within(() => {
			cy.contains('[data-testid="dashboard-tile-component"]', 'Organization').should('be.visible').click();
			cy.url().should('include', '/organizations');
		});
	});

	it('verify that the Asset List tile link to the Asset Management page', () => {
		cy.get('.relative [data-testid="dashboard-component"]').within(() => {
			cy.contains('[data-testid="dashboard-tile-component"]', /^Asset List$/)
				.should('be.visible')
				.click();
			cy.url().should('include', '/assets');
		});
	});

	it(' Verify search placeholder text test', () => {
		cy.get('[data-testid="location-selector-input"] input')
			.invoke('attr', 'placeholder')
			.should('equal', 'Find An Asset');
	});

	it('Navigate into the map by clicking on "Asset Map" button test', () => {
		cy.get('[data-testid="dashboard-component-buttons-asset-map"] button').click().url().should('include', 'map');
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
