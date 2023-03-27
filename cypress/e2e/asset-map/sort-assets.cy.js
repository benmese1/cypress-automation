// @team1
const { time } = require('console');

describe('Click on the canvas zoom the cluster and view the asset', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('Success canvas click test and verify and view asset details', () => {
		//Click on the sort list
		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		// Assert the assets are sorted as per the recent date
		cy.get('[data-testid="reported-recent"]').click({ force: true });
		let today = new Date();
		cy.get('[data-timestamp*="Z"]').each(($e) => {
			cy.wrap($e)
				.invoke('attr', 'data-timestamp')
				.then(($current_date) => {
					cy.log($current_date);
					const date = new Date($current_date);
					expect(today).to.gte(date);
					today = date;
				});
		});

		//Click on the sort list
		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		// Assert the assets are sorted as per the oldest date
		cy.get('[data-testid="reported-oldest"]').click({ force: true });
		let prev = 0;
		cy.get('[data-timestamp*="Z"]').each(($e) => {
			cy.wrap($e)
				.invoke('attr', 'data-timestamp')
				.then(($current_date) => {
					const date = new Date($current_date);
					const prev_date = new Date(prev);
					expect(prev_date).to.lte(date);
					prev = $current_date;
				});
		});

		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		cy.get('[data-testid="name-a-z"]').click({ force: true });

		cy.compareText().then((val) => {
			assert.equal(val, -1, 'The names are sorted in ascending order');
		});

		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		cy.get('[data-testid="name-z-a"]').click({ force: true });

		cy.compareText().then((val) => {
			assert.equal(val, 1, 'The names are sorted in descending order');
		});

		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		cy.get('[data-testid="location-a-z"]').click({ force: true });

		cy.compareText().then((val) => {
			assert.equal(val, -1, 'The location are sorted in ascending order');
		});

		cy.get('[data-testid="menu-sort"]').eq(0).click({ force: true });
		cy.get('[data-testid="location-z-a"]').click({ force: true });

		cy.compareText().then((val) => {
			assert.equal(val, 1, 'The location are sorted in descending order');
		});
	});
});
