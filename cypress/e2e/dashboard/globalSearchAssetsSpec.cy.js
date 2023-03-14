// @team2
describe('Global "Assets" Search verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false }).waitForLoad();
	});

	it('Assets option can be selected for global search', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Assets"]').click();
		cy.get('[data-testid="selector-input"] input').invoke('attr', 'placeholder').should('equal', 'Find an Asset');
	});

	it('Suggestions should not be displayed for Global Assets Search when less than 3 characters typed', () => {
		cy.globalSearch('Assets', 'A', false);
		cy.get('[role="listbox"] li').should('not.exist');

		cy.globalSearch('Assets', 'AU', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Assets Search when not existing search term typed', () => {
		cy.globalSearch('Assets', 'NOT_EXISTS', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should be displayed for Global Search when 3 characters of existing term typed', () => {
		cy.globalSearch('Assets', 'AUT', false);
		cy.get('[role="listbox"] li span').first().should('contain.text', 'AUT');
	});

	it('No data should be displayed on Asset Map List when not existing search term typed', () => {
		cy.globalSearch('Assets', 'NOT_EXISTS');
		cy.url().should('include', '/map');

		// Wait for map load
		cy.wait(1000);
		cy.get('#assets-count').should('contain.text', '0');
	});

	it('Global Asset Search by existing "Asset Id"', () => {
		cy.globalSearch('Assets', 'CFQU52');

		cy.url().should('include', '/map');

		// Wait for map load
		cy.wait(2000);
		cy.get('#assets-count').then(($val) => {
			expect(parseInt($val.text())).to.be.gte(1);
		});

		//Verify Search results on Map page
		cy.get('[data-testid*="asset-"]').each(($assetButton) => {
			cy.wrap($assetButton).should('contain.text', 'CFQU52');
		});
	});
});
