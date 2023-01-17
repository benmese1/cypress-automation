describe('staring session and bypassing mfa', () => {
	beforeEach(() => {
		// logs in
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		// cy.waitForLoad();

		// selects authenticator app instead of email and clicks on continue
		cy.get('[value="SOFTWARE_TOKEN_MFA"]').click();
		cy.get('[value="submit"]').click();

		// selecting the option to show the secret key
		cy.get('#showSecretKeyButton').click();
	});

	// it('verify that the side menu opened after the menu bar click', () => {
	// 	clickDashboardMenu();
	// 	cy.get('[data-testid="side-menu"]').should('be.visible');
	// });

	// it('verify that menu item Asset List is linked to assets page', () => {
	// 	clickDashboardMenu();
	// 	cy.get('[data-testid="side-menu"]').should('be.visible').contains('Asset List').click();
	// 	cy.url().should('include', '/assets');
	// });

	// it('verify that menu item Asset Map is linked to the map page', () => {
	// 	clickDashboardMenu();
	// 	cy.get('[data-testid="side-menu"]').should('be.visible').contains('Asset Map').click();
	// 	cy.url().should('include', '/map');
	// });

	// const clickDashboardMenu = () => {
	// 	cy.get('[data-testid="header"] [role="button"]').click();
	// };
});
