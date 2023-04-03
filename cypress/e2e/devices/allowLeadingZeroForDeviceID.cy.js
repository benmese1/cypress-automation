describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
		cy.dashboardMenu('Devices');
	});
	it('Verify Device ID can start with 0', () => {
		//Verify Device ID can start with 0

		let deviceID = '0' + Math.floor(Math.random() * 900000000000000);
		cy.get('[data-testid="btn-sub-header-action-Add Device"]').click();
		cy.get('[data-testid="form-control-input-imei"]').type(deviceID);

		cy.get('[data-testid="autocomplete-customer_orgs_id"]').click();
		cy.get('#combo-box-demo-option-0').click();

		cy.get('[data-testid="autocomplete-assets_id"]').click();

		cy.get('[data-testid="autocomplete-prd_cde"]').click();
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

		cy.get('[data-testid="autocomplete-customer_orgs_id"]').click();
		cy.get('#combo-box-demo-option-0').click();

		cy.get('[data-testid="autocomplete-assets_id"]').click();

		cy.get('[data-testid="autocomplete-prd_cde"]').click();
		cy.get('#combo-box-demo-option-0').click();
		cy.get('[data-testid="global-button-component"]').click();

		cy.get('[data-testid="form-org-create-edit"] > .px-6').contains('Should be min 14 and max 16 characters length');
	});
});
