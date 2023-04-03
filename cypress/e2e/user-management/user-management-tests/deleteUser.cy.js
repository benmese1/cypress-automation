// @team4
import userdata from '../../../fixtures/createuser.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Delete Pending User in User management', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SuperadminUsername'), Cypress.env('SuperadminPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SuperadminMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Navigate to User Management, create and search for new user and remove the newly created user with status pending', () => {
		cy.dashboardMenu('User Management');
		// create new user
		cy.log('Create New button clicked');
		cy.createNewUser(
			userdata[0].user.LastName,
			userdata[0].user.FirstName,
			'user_' + randomnumber,
			userdata[0].user.Parentorg,
			'user_' + randomnumber + '@test.com',
			userdata[0].user.Phonenumber,
			userdata[0].user.Role
		);
		// search for the newly created user
		cy.get('[data-testid="items-list-search-input"]').type('user_' + randomnumber);
		// click on the user
		cy.xpath('//div[text()="' + 'user_' + randomnumber + '"]').click();
		// click on remove user
		cy.get('[data-testid="btn-user-remove"] ').contains('Remove').click();
		//verify if user is removed successfully
		cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User removed / inactivated successfully.');
		// search for the newly created user
		cy.get('[data-testid="items-list-search-input"]')
			.clear()
			.type('user_' + randomnumber);
		cy.get('[role="grid"]')
			.contains('user_' + randomnumber)
			.should('not.exist');
	});
});
