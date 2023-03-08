describe('Verify device management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	it('Verify device management table columns visibility in table view', () => {
		//verifying fields on the device mgmt table

		cy.get('[data-testid="column-header-company-name"]').should('be.visible');
		cy.get('[data-testid="column-header-device-id"]').should('be.visible');
		cy.get('[data-testid="column-header-asset-id"]').should('be.visible');
		cy.get('[data-testid="column-header-product-code"]').should('be.visible');
		cy.get('[data-testid="column-header-product-name"]').should('be.visible');
		cy.get('[data-testid="column-header-order-group"]').should('be.visible');
		cy.get('[data-testid="column-header-created-date"]').should('be.visible');
		cy.get('[data-testid="column-header-last-updated"]').should('be.visible');
		cy.get('[data-testid="column-header-associated"]').should('be.visible');
		cy.get('[data-testid="column-header-firmware-version"]').should('be.visible');
		cy.get('[data-testid="column-header-config"]').should('be.visible');
	});
});
