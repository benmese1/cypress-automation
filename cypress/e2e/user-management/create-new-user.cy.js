import userdata from '../../fixtures/createuser.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Create New Organization management', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Click on Create and verify the newly organization created', () => {
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
