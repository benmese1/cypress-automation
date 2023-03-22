// @team4
import org from '../../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('View and Edit Org for Equipmentmanager', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('EquipmentmanagerUsername'), Cypress.env('EquipmentmanagerPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('EquipmentMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of create new org button, My Organization view access and My Organization edit access for equipment role', () => {
		cy.dashboardMenu('My Organization');
		// Verify that create New Button should not present  for Equipmentmanager Role
		cy.get('[data-testid="management-my-organization"]', { timeout: 2000 }).should('exist');
		cy.get('[data-testid="btn-sub-header-action-Create New"]', { timeout: 1000 }).should('not.exist');
		//Verify My Organization view access for Equipmentmanager Role
		cy.verifyMyOrganizationTableView();
		//Verify My Organization edit access for Equipmentmanager Role
		cy.editOrg(
			org[0].equipmentmanagereditorg.companyname,
			org[0].equipmentmanagereditorg.Brand,
			org[0].equipmentmanagereditorg.Type,
			org[0].equipmentmanagereditorg.Timezone,
			org[0].equipmentmanagereditorg.DistanceUnitPreference
		);
	});
});
