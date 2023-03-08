describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.get(
			'[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]'
		).click();
	});
	it('verify Devices required fields Markers', () => {
		//Verify Device ID
		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get(':nth-child(2) > [data-testid="text-style-wrapper"]').contains('indicates a required field');
		cy.get('#combo-box-demo-label > .text-error').should('be.visible');
		cy.get(':nth-child(2) > .MuiFormControl-root > .MuiFormLabel-root > .text-error').should('be.visible');
	});
});
