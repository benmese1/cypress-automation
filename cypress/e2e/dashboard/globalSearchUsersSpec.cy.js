// @team2
import searchData from '../../fixtures/globalsearch.json';

describe('Global "Users" Search verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true }).waitForLoad();
	});

	it('Users option can be selected for global search', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Users"]').click();
		cy.get('[data-testid="selector-input"] input').invoke('attr', 'placeholder').should('equal', 'Find a User');
	});

	it('Recent Searches is not displayed while clicking on Global Search input', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Users"]').click();
		cy.get('[data-testid="selector-input"] input').first().click().wait(500);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when less than 3 characters is typed', () => {
		cy.globalSearch('Users', 'o', false);
		cy.get('[role="listbox"] li').should('not.exist');

		cy.globalSearch('Users', 'ol', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when not existing search term is typed', () => {
		cy.globalSearch('Users', 'NOT_EXISTS', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should be displayed for Global Search when 3 characters of existing term is typed', () => {
		cy.globalSearch('Users', 'Ole', false);
		cy.get('[role="listbox"] li span').first().contains('Ole', { matchCase: false });
	});

	it('"Keep typing" is displayed when Global Search is performed for less than 3 characters typed', () => {
		cy.globalSearch('Users', 'Ol');
		cy.url().should('include', '/user-management');

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'Ol');
		cy.get('.text-typography').should('have.text', 'Keep typing...');
	});

	it('No data should be displayed on Users List table when not existing search term is typed', () => {
		cy.globalSearch('Users', 'NOT_EXISTS');
		cy.url().should('include', '/user-management');
		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'NOT_EXISTS').wait(1000);
		cy.get('[data-testid="page"]').should('contain.text', 'No results found');
	});

	it('Data should be displayed on Users List table when part of existing search term is typed', () => {
		cy.globalSearch('Users', 'equip', false);
		cy.get('[role="listbox"] li span').first().click();
		cy.url().should('include', '/user-management');
		cy.get('[data-testid="items-list-search-input"]').contains('equip').wait(1000);

		cy.get('[data-rowindex]').each(($row) => {
			cy.wrap($row).contains('equip', { matchCase: false });
		});
	});

	it('Global User Search by existing "Created Date"', () => {
		cy.globalSearch('Users', '03/07/2023');

		cy.url().should('include', '/user-management');
		cy.get('[data-testid="items-list-search-input"]').should('have.value', '2023-03-07').wait(1000);

		cy.get('[role="cell"][data-field="added_date"]').each(($cell) => {
			cy.wrap($cell).should('contain.text', '03/07/2023');
		});
	});

	searchData.users.forEach((search) => {
		it.only(`Global User Search by existing "${search.option}"'`, () => {
			//select 'Users' option on Global search and type search term
			cy.globalSearch('Users', search.term, false);
			cy.get('[role="listbox"] li span').contains(search.term, { matchCase: false }).click();
			//verify 'Users' page is opened
			cy.url().should('include', '/user-management');

			//verify value in search input
			cy.get('[data-testid="items-list-search-input"]').should('have.value', search.term).wait(1000);

			//verify each cell of provided column has corresponding search value
			cy.get(`[role='cell'][data-field='${search.datafield}']`).each(($cell) => {
				cy.wrap($cell).contains(search.term, { matchCase: false });
			});

			//get back to Landing page and verify 'Recent searches' list includes search term
			cy.dashboardMenu('Dashboard');
			cy.get('[data-testid="selector"] [role="button"]').click();
			cy.get('[data-testid="global-search-select-item-Users"]').click();
			cy.get('[data-testid="selector-input"] input').first().click();
			cy.get('[role="listbox"] li span').first().should('have.text', search.term);
		});
	});
});
