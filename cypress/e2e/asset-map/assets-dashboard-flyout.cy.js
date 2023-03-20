// @team1
describe('Click on the asset dashboard flyout ', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('Success click on asset dashboard flyout and close it', () => {
		//Click on the asset and check if flyout opens
		cy.get('[data-testid*="asset-"]', { timeout: 20000 }).eq(0).should('be.visible');
		cy.get('[data-testid*="asset-"]')
			.eq(0)
			.click({ force: true })
			.then(() => {
				//Click on close button to close the flyout
				cy.get('[data-testid="CloseIcon"]').eq(0).click({ force: true });
			});
	});
});
