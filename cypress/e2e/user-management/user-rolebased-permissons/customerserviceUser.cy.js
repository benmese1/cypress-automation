// @team4
import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to Usermanagement page for Customerservice', () => {
	beforeEach(() => {
		cy.login(Cypress.env('CustomerserviceUsename'), Cypress.env('CustomerservicePassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of Usermanagement access for Customerservice role', () => {
		//click on AppMenu and Verify not exists of Usermanagement menu Item
		cy.verifyNotExistsOfAppMenuItems('Usermanagement');
	});
});
