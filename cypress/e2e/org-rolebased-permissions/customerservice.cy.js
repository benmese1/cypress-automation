import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to My Org for customerservice', () => {
	beforeEach(() => {
		cy.login(Cypress.env('CustomerserviceUsename'), Cypress.env('CustomerservicePassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of My Organization view access and My Organization access for customerservice role', () => {
		//click on AppMenu and Verify not exists of My Organization menu Item
		cy.verifyNotExistsOfAppMenuItems('My Organization');
	});
});
