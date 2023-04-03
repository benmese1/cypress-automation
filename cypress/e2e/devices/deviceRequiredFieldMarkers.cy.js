describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.dashboardMenu('Devices');
	});
	it('verify Devices required fields Markers', () => {
		//Verify Device fields Markers
		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get('.MuiGrid-spacing-xs-1 > .MuiGrid-root > :nth-child(2)').contains('indicates a required field');
		cy.get('#combo-box-demo-label > .text-error').should('be.visible');
		cy.get(':nth-child(2) > .MuiFormControl-root > .MuiFormLabel-root > .text-error').should('be.visible');
	});
});
