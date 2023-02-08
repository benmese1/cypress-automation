import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('View and Edit Org for Equipmentmanager', () => {
	beforeEach(() => {
		cy.login(Cypress.env('EquipmentmanagerUsername'), Cypress.env('EquipmentmanagerPassword'), { cacheSession: false });
		cy.waitForLoad().get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of create new org button, My Organization view access and My Organization edit access for equipment role', () => {
		cy.dashboardMenu('My Organization');
		// Verify that create New Button should not present  for Equipmentmanager Role
		cy.verifyCreateNewOrgNotExist();
		//Verify My Organization view access for Equipmentmanager Role
		cy.verifyMyOrganizationTableView(); //
		cy.log('Edit Org');
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
