import userdata from '../../fixtures/createuser.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Edit and Update User', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Navigate to User Management and update the User', () => {
		cy.dashboardMenu('User Management');
		cy.log('Edit User');
		cy.editUser(
			userdata[0].edituser.UserName,
			userdata[0].edituser.LastName,
			userdata[0].edituser.FirstName,
			userdata[0].edituser.Phonenumber
		);
	});
});
