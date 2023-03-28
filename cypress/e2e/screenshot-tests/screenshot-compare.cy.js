describe('comparing two screenshots for difference at the pixel level', () => {
	beforeEach(() => {
		// logs in with test1 username and password from config folder files
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true }).waitForLoad();
	});

	it(`compares the same page screenshot taken at two different times`, () => {
		// navigates to asset map page
		cy.dashboardMenu('Asset Map');

		// changing the viewport to first location
		cy.waitForLoad();
		cy.searchLocation('Chicago, Illinois', true);

		// takes the first screenshot
		cy.compareSnapshot('chicago');
	});
});
