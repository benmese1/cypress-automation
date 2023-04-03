// @team1
describe('Click on the canvas zoom the cluster and view the asset', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('Success canvas click test and verify and view asset details', () => {
		// Click on the Asset
		cy.get('[data-testid*="asset-"]', {timeout: 20000}).eq(0).should('be.visible').click({ force: true });

		// Verify Asset Name
		cy.get('[data-testid*="asset-"]')
			// .eq(0)
			.should('exist');

		// Verify City State
		cy.get('[data-testid="LocationOnIcon"]')
			// .eq(0)
			.should('exist')

		// Verify Time Stamp
		cy.get('[data-testid="CheckIcon"]')
			// .eq(0)
			.should('exist');

		// Expand the Additional tab
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(0).click({ force: true });

		// Close out the additional details box by clicking the X
		cy.get("[class='MuiTouchRipple-root css-w0pj6f']").eq(1).click({ force: true });
	});
});
