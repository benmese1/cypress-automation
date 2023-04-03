describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	it('Verify update device rows visibility in raw', () => {
		//verifying fields on the update device draw
		cy.wait(1000);
		cy.get('[data-id="6408e977b0885d6b3494be64"] > [data-field="org_name"]').click();
		cy.get(':nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > #combo-box-demo-label').contains(
			'Company Name'
		);
		cy.get(':nth-child(2) > .MuiFormControl-root > .MuiFormLabel-root').contains('Device ID');
		cy.get(':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > #combo-box-demo-label').contains('Asset ID');
		cy.get(':nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > #combo-box-demo-label').contains(
			'Product Name'
		);
		cy.get(':nth-child(5) > .MuiFormControl-root > .MuiFormLabel-root').contains('Order Group');
		cy.get(':nth-child(7) > .MuiFormControl-root > .MuiFormLabel-root').contains('Order #');
		cy.get(':nth-child(8) > .MuiFormControl-root > .MuiFormLabel-root').contains('SIM ID');
		cy.get(':nth-child(9) > .MuiFormControl-root > .MuiFormLabel-root').contains('Packing List');
	});
});
