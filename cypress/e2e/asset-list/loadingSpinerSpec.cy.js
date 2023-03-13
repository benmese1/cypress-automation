// @viktoriya
describe('Loading spinner verification', () => {
	it('verify that the download icon from the landing page has disappeared on the asset list page', () => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.url().should('include', '/dashboard');
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Asset List').click();
		cy.url().should('include', '/assets');
		cy.get('[data-testid="spinner"]').should('not.exist');
	});
});

const clickDashboardMenu = () => {
	cy.wait(1);
	cy.get('[data-testid="header"] [role="button"]').should('be.visible').click();
};
