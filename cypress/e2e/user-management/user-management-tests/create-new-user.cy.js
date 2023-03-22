// @team4
import userdata from '../../../fixtures/createuser.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Create New User in User management', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SuperadminUsername'), Cypress.env('SuperadminPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SuperadminMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Navigate to User Management and Create new user', () => {
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
	});
});
