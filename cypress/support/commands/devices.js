Cypress.Commands.add('openDevices', () => {
	cy.get('[data-testid="header"] [role="button"]')
		.click('left')
		.get('[data-testid="side-menu"]')
		.should('be.visible')
		.contains('Devices')
		.click()
		.url()
		.should('include', '/devices');
});

Cypress.Commands.add('searchDevices', (searchCriteria) => {
	cy.get("input[placeholder='Search']").should('be.visible').type(searchCriteria).wait(1000);
});
Cypress.Commands.add('searchDevices', (searchCriteria) => {
	// Wait for 'Assets' table loading
	cy.get('[data-rowindex]').should('have.length.gt', 1);
	cy.get("input[placeholder='Search']").should('be.visible').clear().type(searchCriteria).wait(1000);
});
