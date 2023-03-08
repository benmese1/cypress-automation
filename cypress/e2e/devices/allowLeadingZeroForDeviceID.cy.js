describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.get(
			'[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]'
		).click();
	});
	it('Verify Device ID can start with 0', () => {
		//Verify Device ID can start with 0
		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get('[data-testid="form-control-input-imei"]').type(deviceID_Numeric());

		function deviceID_Numeric(max) {
			var text = '';
			var possible = '0123456789';

			for (var i = 0; i < 10; i++) text += '0' + possible.charAt(Math.floor(Math.random() * 16));

			return text;
		}

		cy.get(
			':nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator'
		).click();
		cy.get('#combo-box-demo-option-0').click();

		cy.get(
			':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get(
			':nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get('[data-testid="global-button-component"]').click();

		cy.get('[data-testid="snackbar-alert"]').should('be.visible');
	});
	it('verify Device ID must  be min 14 and max 16 characters length', () => {
		//Verify Device ID
		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get('[data-testid="form-control-input-imei"]').type(deviceID_Numeric());

		function deviceID_Numeric() {
			var text = '';
			var possible = '0123456789';

			for (var i = 0; i < 10; i++) text += '0' + possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}

		cy.get(
			':nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator'
		).click();
		cy.get('#combo-box-demo-option-0').click();

		cy.get(
			':nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get(
			':nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment'
		).click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get('[data-testid="global-button-component"]').click();

		cy.get('[data-testid="form-org-create-edit"] > .px-6').contains('Should be min 14 and max 16 characters length');
	});
});
