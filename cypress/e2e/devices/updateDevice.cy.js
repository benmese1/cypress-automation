describe('update device verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
	});

	// it('update device negative test', () => {
	//     cy.get('[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]').click()
	//           .waitForLoad();
	//     cy.get('[data-id="0"] > [data-field="sim_num"] > .MuiDataGrid-cellContent').click()
	//           .waitForLoad();

	//     cy.get('.slide-pane__title > [data-testid="text-style-wrapper"]').should('have.text', 'Update Device')
	//     cy.get(':nth-child(4) > .w-full > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click()
	//     cy.get('#assets_id-option-0').click()
	//     cy.get('.MuiGrid-root > [data-testid="global-button-component"]').click()
	//     cy.get('.MuiAlert-message').should('be.visible')

	// })
	it('update device positive test', () => {
		cy.get('[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]')
			.click()
			.waitForLoad();
		cy.get('[data-id="0"] > [data-field="sim_num"] > .MuiDataGrid-cellContent').click().waitForLoad();
		cy.get('.Mui-selected > [data-field="sim_num"] > .MuiDataGrid-cellContent').click().waitForLoad();

		cy.get('.slide-pane__title > [data-testid="text-style-wrapper"]').should('have.text', 'Update Device');
		cy.get('#prd_cde').click();
		cy.get('[data-value="77-6210"]').click();
		cy.get('.MuiGrid-root > [data-testid="global-button-component"]').click();
		cy.get('.Mui-selected > [data-field="dev_id"]').should('have.text', '12345');
	});
});
