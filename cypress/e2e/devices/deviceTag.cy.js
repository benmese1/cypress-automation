describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.get(
			'[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]'
		).click();
	});
	// it('Verify tag column in table view', () => {
	// 	//verifying tags fields on the device mgmt table

	// 	cy.get('[data-testid="column-header-device-tags"]').should('be.visible');
	// });

	it('Create device with tag', () => {
		//verifying create device with tag

		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get('[data-testid="form-control-input-imei"]').type(deviceID_Numeric());

		function deviceID_Numeric() {
			var text = '';
			var possible = '0123456789';

			for (var i = 0; i < 10; i++) text += '0' + possible.charAt(Math.floor(Math.random() * 15));

			return text;
		}

		cy.get(
			':nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator'
		).click();
		cy.get('#combo-box-demo-option-0').click();

		cy.get(
			':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();

		cy.get(
			':nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get('[data-testid="creatable-autocomplete-tags"]').click();
		cy.get('#creatable-autocomplete-option-1').click();

		cy.get('[data-testid="global-button-component"]').click();
		cy.wait(1000);
		cy.get('[data-testid="snackbar-alert"]').should('be.visible');
	});
});
