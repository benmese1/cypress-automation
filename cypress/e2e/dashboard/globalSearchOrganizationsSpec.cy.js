// @team2
import searchData from '../../fixtures/globalsearch.json';

describe('Global "Organizations" Search verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true }).waitForLoad();
	});

	it('Organizations option can be selected for global search', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Organizations"]').click();
		cy.get('[data-testid="selector-input"] input')
			.invoke('attr', 'placeholder')
			.should('equal', 'Find an Organization');
	});

	it('Recent Searches is not displayed while first time clicking on Global Search input', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Organizations"]').click();
		cy.get('[data-testid="selector-input"] input').first().click().wait(500);
		cy.get('[role="listbox"]').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when less than 3 characters typed', () => {
		cy.globalSearch('Organizations', 'F', false);
		cy.get('[role="listbox"] li').should('not.exist');

		cy.globalSearch('Organizations', 'Fl', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when not existing search term typed', () => {
		cy.globalSearch('Organizations', 'NOT_EXISTS', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should be displayed for Global Search when 3 characters of existing term typed', () => {
		cy.globalSearch('Organizations', 'Fle', false);
		cy.get('[role="listbox"] li span').first().should('contain.text', 'Fle');
	});

	it('"Keep typing" is displayed when Global Search is performed for less than 3 characters typed', () => {
		cy.globalSearch('Organizations', 'Re');
		cy.url().should('include', '/organizations');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'Re');
		cy.get('[data-testid="page"]').should('contain.text', 'Keep typing...');
	});

	it('No data should be displayed on Organizations List table when not existing search term typed', () => {
		cy.globalSearch('Organizations', 'NOT_EXISTS');
		cy.url().should('include', '/organizations');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'NOT_EXISTS');
		cy.get('[data-testid="page"]').should('contain.text', 'No results found');
	});

	it('The "Recent Search" item can be removed from List', () => {
		cy.globalSearch('Organizations', 'Fleet');
		cy.url().should('include', '/organizations');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'Fleet').wait(1000);
		cy.get('[data-rowindex]').each(($row) => {
			cy.wrap($row).should('contain.text', 'Fleet');
		});

		//get back to Landing page and verify 'Recent searches' list includes search term
		cy.dashboardMenu('Dashboard');
		cy.get('[data-testid="selector"] [role="button"]').click();
		cy.get('[data-testid="global-search-select-item-Organizations"]').click();
		cy.get('[data-testid="selector-input"] input').first().click();
		cy.get('[role="listbox"] li span').first().should('have.text', 'Fleet');

		//remove Recent Search item
		cy.get('[role="listbox"] button').click();
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Global Organizations Search by existing "Created Date"', () => {
		cy.globalSearch('Organizations', '03/07/2023', false);
		cy.get('[role="listbox"] li span').first().click();

		cy.url().should('include', '/organizations');
		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);
		cy.get('[data-testid="items-list-search-input"]').should('have.value', '2023-01-31').wait(1000);

		cy.get('[role="cell"][data-field="added_date"]').each(($cell) => {
			cy.wrap($cell).should('contain.text', '03/07/2023');
		});
	});

	searchData.organizations.forEach((search) => {
		it(`Global Search by existing "${search.option}"'`, () => {
			//select 'Organizations' option on Global search and type search term
			cy.globalSearch('Organizations', search.term);

			//verify 'Organizations' page is opened
			cy.url().should('include', '/organizations');

			// Wait for table loading
			cy.get('[role="row"]').should('have.length.gt', 1);

			//verify value in search input
			cy.get('[data-testid="items-list-search-input"]').should('have.value', search.term).wait(1000);

			//verify each cell of provided column has corresponding search value
			cy.get(`[role='cell'][data-field='${search.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', search.term);
			});

			//get back to Landing page and verify 'Recent searches' list includes search term
			cy.dashboardMenu('Dashboard');
			cy.get('[data-testid="selector"] [role="button"]').click();
			cy.get('[data-testid="global-search-select-item-Organizations"]').click();
			cy.get('[data-testid="selector-input"] input').first().click();
			cy.get('[role="listbox"] li span').first().should('have.text', search.term);
		});
	});
});
