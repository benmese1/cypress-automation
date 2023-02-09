import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to Usermanagement page for fleetmanager role', () => {
	beforeEach(() => {
		cy.login(Cypress.env('FleetmanagerUsername'), Cypress.env('FleetmanagerPassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of Usermanagement access for fleetmanager role', () => {
		//click on AppMenu and Verify not exists of Usermanagement menu Item
		cy.verifyNotExistsOfAppMenuItems('Usermanagement');
	});
});
