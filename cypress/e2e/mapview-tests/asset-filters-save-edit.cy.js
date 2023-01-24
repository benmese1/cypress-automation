describe('Verify and search assets using filters such as asset tags, asset search and gps signal', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify and view asset details by selecting asset filters', () => {
		// Click on Assets
		cy.get("[data-testid='filter-item-Assets']").click({ force: true });

		//search by name or ID
		cy.get("[data-testid='assets-filter__keyword-input']").type('asset ');

		cy.get("[data-testid='BookmarksIcon']").click({ force: true }).as('winOpenButton');

		cy.window().then((win) => {
			cy.stub(win, 'open');
			//cy.get('@winOpen');
			// give a name to filter
			cy.get(["id*=':r'"]).click({ force: true });
			cy.get(["id*=':r'"]).type('asset-filter');
			cy.get('@winOpen').should('be.called');
		});

		// Search asset by Type
	});
});
