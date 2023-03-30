// @team2
describe('Landing stats view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true });
		cy.waitForLoad();
	});

	it('Verify total assets tile', () => {
		cy.get('[data-testid="dashboard-tile-total-assets"]').should('be.visible').contains('Total Assets');

		cy.get('[data-testid="dashboard-tile-total-assets"]').within(() => {
			// Check the names of total asset groups
			cy.contains('0-30k');
			cy.contains('30-60k');
			cy.contains('60k+');

			// Check the value of total asset groups
			cy.get('[data-testid="total-assets-secondary-value"]')
				.should('have.length', 3)
				.each((item) => {
					cy.wrap(item).contains(/\d\d?%/);
				});
		});

		cy.get('[data-testid="dashboard-tile-total-assets"]').click();
		cy.url().should('include', '/assets');
	});

	it('Verify assets moving tile', () => {
		cy.get('[data-testid="dashboard-tile-active-assets"]').should('be.visible').contains('Assets Moving');

		cy.get('[data-testid="dashboard-tile-active-assets"]').within(() => {
			cy.contains('Parked Assets');
			cy.contains('Low Dwell');
			cy.contains('Medium Dwell');
			cy.contains('High Dwell');
			cy.contains('Mega Dwell');
		});

		cy.get('[data-testid="active-assets-value"]').contains(/\d+/);

		cy.get('[data-testid="dashboard-tile-active-assets"]').within(() => {
			cy.get('[data-testid="total-assets-secondary-value"]')
				.should('have.length', 4)
				.each((item) => {
					cy.wrap(item).contains(/\d+/);
				});
		});

		cy.get('[data-testid="dashboard-tile-active-assets"]').click();

		cy.url().should('include', '/assets');
	});
});
