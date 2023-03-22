// @team4
import org from '../../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Edit and Update Org', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SuperadminUsername'), Cypress.env('SuperadminPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SuperadminMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Navigate to My Organization and update the Organization', () => {
		cy.dashboardMenu('My Organization');
		cy.get('[data-testid="items-list-search-input"]').type(org[0].editorg.companyname);
		cy.editOrg(
			org[0].editorg.companyname,
			org[0].editorg.Brand,
			org[0].editorg.Type,
			org[0].editorg.Timezone,
			org[0].editorg.DistanceUnitPreference
		);
	});
});
