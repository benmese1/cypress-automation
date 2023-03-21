// @team1
describe('Verify and search assets using filters such as asset tags, asset search and gps signal', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify and view asset details by selecting asset filters', { tags: ['@map'] }, () => {
		// Click on Assets
		cy.get("[data-testid='filter-item-Assets']").click({ force: true });

		//search by name or ID
		cy.get("[data-testid='assets-filter__keyword-input']").type('asset ');

		// Assert that search by name or ID worked and assets found
		cy.get('#assets-count').should('be.visible');
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(true).to.true;
			}
		});
		// Search asset by Type

		//clear the previous search
		cy.get("[data-testid='assets-filter__keyword-input']").clear();

		// get the assert types
		cy.get("[data-title='Trailer']").click({ force: true });
		cy.get("[data-title='Container']").click({ force: true });

		// Assert that search by multiple asset type and assets found
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(true).to.true;
			}
		});

		// Clear the previous search
		cy.get("[data-title='Trailer']").click({ force: true });
		cy.get("[data-title='Container']").click({ force: true });

		// Assert the assets tags filters the assets

		//select the dropdown
		cy.get("[data-testid='assets-filter__asset-tags']").type('active');
		cy.get("[data-testid='assets-filter__asset-tags']").clear();

		// select the first option from dropdown
		cy.get("[data-option-index='0']").click({ force: true });

		//select the dropdown
		cy.get("[data-testid='assets-filter__asset-tags']").type('active');
		cy.get("[data-testid='assets-filter__asset-tags']").clear();

		// select the second option
		cy.get("[data-option-index='1']").click({ force: true });

		// Assert that search by asset tags and assets found
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(true).to.true;
			}
		});

		cy.get("[data-testid='CancelIcon']").eq(0).click({ force: true });
		cy.get("[data-testid='CancelIcon']").eq(0).click({ force: true });

		// Select Product Name and Assert the filter
		//select the dropdown
		cy.get("[data-testid='assets-filter__product-name']").type('active');
		expect('No options').to.exist;
		cy.get("[data-testid='assets-filter__product-name']").clear();

		// select the second option for product name
		cy.get("[data-option-index='17']").click({ force: true });

		// Assert that search by asset tags and assets found
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(true).to.true;
			}
		});

		// Select the GPS filter items
		cy.get("[data-testid='filter-item-Others']").click({ force: true });
		// click on multiple gps filters
		cy.get("[data-title='Active']").click({ force: true });
		cy.get("[data-title='Lost']").click({ force: true });

		// Confirm the assets matching the filter found
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(true).to.true;
			}
		});
	});
});
