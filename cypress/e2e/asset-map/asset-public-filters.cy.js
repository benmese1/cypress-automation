// @team1
describe('Create and remove public asset filters', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('create and remove public asset filters', () => {
		// click on status filter
		cy.get('[data-testid="filter-item-Status"]').click();

		// select moving assets
		cy.get('[data-testid="Moving - 0"]').click();

		// clicking on bookmark save button
		cy.get('[data-testid="BookmarksIcon"]').click();

		// entering name in modal box and clicking save
		cy.get('[data-testid="filter-textbox"]').type('asset filter 1');
		cy.get('[data-testid="dialog-action-btn"]').click();

		//verifying success popup appeared
		cy.get('[data-testid="snackbar-alert"]').contains('Success!');

		//click on three filter dots upper right hand corner
		cy.get('[data-testid="MoreVertIcon"]').click();

		// click on update filter icon
		cy.get('[title="Update"]').eq(0).click();

		//make the filter public by clicking shared
		cy.get('[data-indeterminate="false"]').check({ force: true });

		// Confirm that filter is public and Shared is checked
		cy.get('[data-indeterminate="false"]').should('be.checked');

		// click on update in the popup modal
		cy.get('[data-testid="dialog-action-btn"]').click();

		//click on three filter dots upper right hand corner
		cy.get('[data-testid="MoreVertIcon"]').click();

		// click on update filter icon
		cy.get('[title="Update"]').eq(0).click();

		// Uncheck the shared and make the filter private
		cy.get('[data-indeterminate="false"]').uncheck({ force: true });

		// click on update in the popup modal
		cy.get('[data-testid="dialog-action-btn"]').click();

		//verifying success popup appeared
		cy.get('[data-testid="snackbar-alert"]').contains('Success!');

		//click on three filter dots upper right hand corner
		cy.get('[data-testid="MoreVertIcon"]').click();

		// click on update filter icon
		cy.get('[title="Update"]').eq(0).click();

		// Confirm that filter is private and Shared is unchecked
		cy.get('[data-indeterminate="false"]').should('not.be.checked');

		// click on Cancel in the popup modal
		cy.get('[data-testid="dialog-cancel-btn"]').click();

		//click on three filter dots upper right hand corner
		cy.get('[data-testid="MoreVertIcon"]').click();

		// click on update filter icon
		cy.get('[title="Delete"]').eq(0).click();

		//try make the filter public by clicking shared
		cy.get('[data-indeterminate="false"]').check({ force: true });

		// Confirm that filter is unchanged and Shared remains unchecked as we cannot make filter public by clicking delete icon
		cy.get('[data-indeterminate="false"]').should('be.disabled');

		// click on Cancel in the popup modal
		cy.get('[data-testid="dialog-cancel-btn"]').click();
	});
});
