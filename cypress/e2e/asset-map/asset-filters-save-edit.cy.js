// @team1
describe('Verify and search assets using filters such as asset tags, asset search and gps signal', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify and view asset details by saving editing and renaming asset filters', () => {
		// click on status filter
		cy.get('[data-testid="filter-item-Status"]').click();

		// select moving assets
		cy.get('[data-testid="Moving - 0"]').click();

		// clicking on bookmark save button
		cy.get('[data-testid="BookmarksIcon"]').click();

		// entering name in modal box and clicking save
		cy.get('[role="dialog"] input').type('asset filter 1');
		cy.xpath('//p[contains(text(), "Save")]').click();

		//verifying success popup appeared
		cy.get('[data-testid="snackbar-alert"]').contains('Success!');

		//deleting filter

		//click on three filter dots upper right hand corner
		cy.get('[data-testid="MoreVertIcon"]').click();

		// click on delete filter icon
		cy.xpath('(//p[contains(text(), "asset filter 1")]/following::span[@title="Delete"])[1]').click();

		// click on delete in the popup modal
		cy.xpath('//p[contains(text(), "Delete")]').click();

		//verifying success popup appeared
		cy.get('[data-testid="snackbar-alert"]').contains('Success!');
	});
});
