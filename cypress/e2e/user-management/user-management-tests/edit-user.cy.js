// @team4
import userdata from '../../../fixtures/createuser.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Edit and Update User', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SuperadminUsername'), Cypress.env('SuperadminPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SuperadminMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Navigate to User Management and update the User', () => {
		cy.dashboardMenu('User Management');
		cy.get('[data-testid="items-list-search-input"]').type(userdata[0].edituser.UserName);
		cy.editUser(
			userdata[0].edituser.UserName,
			userdata[0].edituser.LastName,
			userdata[0].edituser.FirstName,
			userdata[0].edituser.Phonenumber
		);
	});
});
