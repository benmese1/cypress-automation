// @viktoriya
describe('Global "Assets" Search verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false }).waitForLoad();
	});

	it('Locations option can be selected for global search', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Locations"]').click();
		cy.get('[data-testid="selector-input"] input').invoke('attr', 'placeholder').should('equal', 'Find a Location');
	});

	it('Suggestions should not be displayed for Global Locations Search when less than 3 characters typed', () => {
		cy.globalSearch('Locations', 'S', false);
		cy.get('[role="listbox"] li').should('not.exist');

		cy.globalSearch('Locations', 'Sa', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Locations Search when not existing search term typed', () => {
		cy.globalSearch('Locations', 'NOT_EXISTS', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should be displayed for Global Search when 3 characters of existing term typed', () => {
		cy.globalSearch('Locations', 'Argen', false);
		cy.get('[role="listbox"] li span').each(($item) => {
			cy.wrap($item).should('contain.text', 'Argen');
		});
	});

	it('All data should be displayed on Asset Map List when not existing search term typed', () => {
		cy.globalSearch('Locations', 'NOT_EXISTS');
		cy.url().should('include', '/map');

		// Wait for map load
		cy.wait(1000);
		cy.get('[data-testid="location-button"]').should('contain.text', 'NOT_EXISTS');
		cy.get('#assets-count').then(($val) => {
			expect(parseInt($val.text())).to.be.gte(10000);
		});

		it('Global Location Search by existing "Location"', () => {
			cy.globalSearch('Locations', 'New York, USA');

			cy.url().should('include', '/map');

			// Wait for map load
			cy.wait(2000);
			cy.get('#assets-count').then(($val) => {
				expect(parseInt($val.text())).to.be.gte(1);
			});

			//Verify 'Location name' is displayed on Asset Map Page
			cy.get('[data-testid="location-button"]').should('contain.text', 'New York, USA');
		});
	});
});
