// @team2
const pages = ['Asset List', 'Devices', 'My Organization', 'User Management'];

describe('Header view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: true }).waitForLoad();
	});

	pages.forEach((page) => {
		it(`verify the header for ${page} page`, () => {
			cy.dashboardMenu(page);
			cy.contains('[data-testid="header"]', page).should('not.exist');
			// check table name
			cy.contains('h1', page).should('be.visible');
		});
	});
});
