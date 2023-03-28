// @team1
describe('Click on the canvas zoom the cluster and view the asset', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
		});

	it('Success canvas click test and verify and view asset details', () => {
		// Click on the Asset
		cy.get('[data-testid*="asset-"]', {timeout: 20000}).eq(0).should('be.visible').click({ force: true });

		// Verify Asset Name
		cy.xpath("//p[contains(text(), '378977')]").should('include.text', '378977');

		// Verify City State
		cy.xpath("//span[contains(text(), 'Hamilton County, TN')]").should('include.text', 'Hamilton County, TN');

		// Verify Time Stamp
		cy.xpath("//span[contains(text(), '2 minutes')]").eq(0).should('include.text', '2 minutes');

		// Expand the Additional tab
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(0).click({ force: true });

		// Close out the additional details box by clicking the X
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(1).click({ force: true });
	});
});