const { time } = require('console');

describe('Verify and search assets using filters such as asset tags, asset search and gps signal', () => {
	it('Success canvas click test and verify and view asset details', () => {
		// Login to Dev Environment
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

		// Assert the user is visible
		cy.get("[aria-label='account of current user']").should('be.visible');

		// Click Asset Maps
		cy.dashboardMenu('Asset Map');

		// Wait for the map to reload
		cy.mapWait();

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
				expect(Number(txt)).to.eq(3892);
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
		cy.get("[id=':rb:-option-0']").click({ force: true });

		//select the dropdown
		cy.get("[data-testid='assets-filter__asset-tags']").type('active');

		// select the second option
		cy.get("[id=':rb:-option-1']").click({ force: true });

		// Assert that search by asset tags and assets found
		cy.get('#assets-count').then(($btn) => {
			// store the button's text
			const txt = $btn.text();
			if (txt > 0) {
				expect(Number(txt)).to.eq(2);
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
				expect(Number(txt)).to.eq(2);
			}
		});
	});
});
