import org from '../../fixtures/createorg.json';
const sizes = ['samsung-note9', 'ipad-2', 'iphone-8', [1170, 2532]];

describe('Create New Organization management', () => {
	sizes.forEach((size) => {
		let randomnumber = Math.floor(Math.random() * 10000);
		it(`Create New Organization management filed validations on ${size} screen`, () => {
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}
			cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
			cy.waitForLoad();
			cy.get("[aria-label='account of current user']").should('be.visible');
			cy.dashboardMenu('My Organization');
			cy.createNewOrganization(
				'SORG' + randomnumber,
				org[0].suborg.Description,
				org[0].suborg.Brand,
				org[0].suborg.Timezone
			);
			cy.logout();
		});
	});
});
