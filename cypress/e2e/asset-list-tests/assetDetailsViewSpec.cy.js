describe('Asset Management page -- details view verification', { retries: 0 }, () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('verify Asset details View collapsable', () => {
		clickFirstRow();
		cy.get('#details-summary').should('be.visible');
		cy.get('#battery-block').should('exist');

		cy.clickOutside();
		cy.get('#details-summary').should('not.exist');
		cy.get('#battery-block').should('not.exist');
	});
});

const clickFirstRow = () => {
	cy.get('[role="grid"] [data-rowindex="0"]').click();
};

