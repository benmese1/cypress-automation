// @team2
import searchData from '../../fixtures/globalsearch.json';

describe('Global "Devices" Search verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true }).waitForLoad();
	});

	it('Device option can be selected for global search', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Devices"]').click();
		cy.get('[data-testid="selector-input"] input').invoke('attr', 'placeholder').should('equal', 'Find a Device');
	});

	it('Recent Searches is not displayed while clicking on Global Search input', () => {
		cy.get('[data-testid="selector"] [role="button"]').click().wait(500);
		cy.get('[data-testid="global-search-select-item-Devices"]').click();
		cy.get('[data-testid="selector-input"] input').first().click().wait(500);
		cy.get('[role="listbox"]').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when less than 3 characters typed', () => {
		cy.globalSearch('Devices', 'S', false);
		cy.get('[role="listbox"] li').should('not.exist');

		cy.globalSearch('Devices', 'SP', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should not be displayed for Global Search when not existing search term typed', () => {
		cy.globalSearch('Devices', 'NOT_EXISTS', false);
		cy.get('[role="listbox"] li').should('not.exist');
	});

	it('Suggestions should be displayed for Global Search when 3 characters of existing term typed', () => {
		cy.globalSearch('Devices', 'SPI', false);
		cy.get('[role="listbox"] li span').first().should('contain.text', 'SPI');
	});

	it('"Keep typing" is displayed when Global Search is performed for less than 3 characters typed', () => {
		cy.globalSearch('Devices', 'AU');
		cy.url().should('include', '/devices');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'AU');
		cy.get('[data-testid="page"]').should('contain.text', 'Keep typing...');
	});

	it('No data should be displayed on Device List table when not existing search term typed', () => {
		cy.globalSearch('Devices', 'NOT_EXISTS');
		cy.url().should('include', '/devices');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', 'NOT_EXISTS');
		cy.get('[data-testid="page"]').should('contain.text', 'No results found');
	});

	it('Data should be displayed on Device List table when existing search term typed', () => {
		cy.globalSearch('Devices', '15115');
		cy.url().should('include', '/devices');

		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);

		cy.get('[data-testid="items-list-search-input"]').should('have.value', '15115');
		cy.get('[data-rowindex]').each(($row) => {
			cy.wrap($row).should('contain.text', '15115');
		});
	});

	it('Global Device Search by existing "Created Date"', () => {
		cy.globalSearch('Devices', '10/17/2022', false);
		cy.get('[role="listbox"] li span').first().click();

		cy.url().should('include', '/devices');
		// Wait for table loading
		cy.get('[role="row"]').should('have.length.gt', 1);
		cy.get('[data-testid="items-list-search-input"]').should('have.value', '2022-10-17').wait(1000);

		cy.get('[role="cell"][data-field="added_date"]').each(($cell) => {
			cy.wrap($cell).should('contain.text', '10/17/2022');
		});
	});

	searchData.devices.forEach((search) => {
		it(`Global Search by existing "${search.option}"'`, () => {
			//select 'Devices' option on Global search and type search term
			cy.globalSearch('Devices', search.term);

			//verify 'Devices' page is opened
			cy.url().should('include', '/devices');

			// Wait for table loading
			cy.get('[role="row"]').should('have.length.gt', 1);

			// Show all columns
			cy.get('[data-testid="asset-table-toolbar-columns-btn"]').click();
			cy.get('[role="tooltip"]').should('be.visible').contains('Show all').click();
			cy.clickOutside();

			//verify value in search input
			cy.get('[data-testid="items-list-search-input"]').should('have.value', search.term).wait(1000);

			//verify each cell of provided column has corresponding search value
			cy.get(`[role='cell'][data-field='${search.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', search.term);
			});

			//get back to Landing page and verify 'Recent searches' list includes search term
			cy.dashboardMenu('Dashboard');
			cy.get('[data-testid="selector"] [role="button"]').click();
			cy.get('[data-testid="global-search-select-item-Devices"]').click();
			cy.get('[data-testid="selector-input"] input').first().click();
			cy.get('[role="listbox"] li span').first().should('have.text', search.term);
		});
	});
});
