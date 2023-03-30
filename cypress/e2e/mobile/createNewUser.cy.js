import userdata from '../../fixtures/createuser.json';
const sizes = ['samsung-note9', 'ipad-2', 'iphone-8', [1170, 2532]];

describe('Create New User in User management', () => {
	sizes.forEach((size) => {
		let randomnumber = Math.floor(Math.random() * 30000);
		it(`Navigate to User Management and Create new user ${size} screen`, () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}
			cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true });
			cy.waitForLoad();
			cy.get("[aria-label='account of current user']").should('be.visible');
			cy.dashboardMenu('User Management');
			cy.createNewUser(
				userdata[0].user.LastName,
				userdata[0].user.FirstName,
				'user_' + randomnumber,
				userdata[0].user.Parentorg,
				'user_' + randomnumber + '@test.com',
				userdata[0].user.Phonenumber,
				userdata[0].user.Role
			);
			// cy.logout();
		});
	});
});
