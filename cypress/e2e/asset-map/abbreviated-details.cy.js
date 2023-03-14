// @team1
describe('Click on the canvas zoom the cluster and view the asset', () => {
	it('Success canvas click test and verify and view asset details', () => {
		// Login to Dev Environment
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

		// Assert the user is visible
		cy.get("[aria-label='account of current user']").should('be.visible');

		// Click Asset List View
		cy.get('p').contains('Asset List View 1').click({ force: true });

		// Wait for the map to reload
		cy.mapWait();

		// Click on the Asset
		cy.xpath("//p[contains(text(), 'CFQU119342')]").click({ force: true });

		// Verify Asset Name
		cy.xpath("//p[contains(text(), 'CFQU119342')]").should('include.text', 'CFQU119342');

		// Verify City State
		cy.xpath("//span[contains(text(), 'Atlanta, Georgia')]").should('include.text', 'Atlanta, Georgia');

		// Verify Time Stamp
		cy.xpath("//span[contains(text(), '13 hours')]").eq(0).should('include.text', '13 hours');

		// Expand the Additional tab
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(0).click({ force: true });

		// Close out the additional details box by clicking the X
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(1).click({ force: true });
	});
});
