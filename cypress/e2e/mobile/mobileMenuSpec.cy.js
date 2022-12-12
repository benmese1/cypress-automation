describe('Mobile Asset Management View verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
	});

	it('Iphone portrait view', () => {
		cy.viewport('iphone-5', 'portrait');
		cy.waitForLoad();
		validateSideMenu();
	});

	it('Iphone landscape view', () => {
		cy.viewport('iphone-5', 'landscape');
		cy.waitForLoad();
		validateSideMenu();
	});

	it('Ipad portrait view', () => {
		cy.viewport('ipad-2', 'portrait');
		cy.waitForLoad();
		validateSideMenu();
	});

	it('Ipad landscape view', () => {
		cy.viewport('ipad-2', 'landscape');
		cy.waitForLoad();
		validateSideMenu();
	});

	const validateSideMenu = () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu_nav-list"]').should('be.visible');
		cy.get('[data-testid="side-menu_nav-list"]').within(() => {
			cy.contains('Dashboard').should('be.visible');
			cy.contains('Asset Map').should('be.visible');
			cy.contains('Dashboard').should('be.visible');
			cy.contains('Dashboard').should('be.visible');
		});
		cy.get('[data-testid="customer-support-links"]').should('be.visible');
		clickDashboardMenu();
		cy.get('[data-testid="side-menu_nav-list"]').should('not.be.visible');

		cy.dashboardMenu('User Management');
		cy.url().should('include', '/user-management');
	};

	const clickDashboardMenu = () => {
		cy.get('[data-testid="header"] [role="button"]').click();
	};
});
