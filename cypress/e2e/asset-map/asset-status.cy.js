// @team1
const { time } = require('console');

describe('Click on the canvas zoom the cluster and view the asset status', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('Success canvas click test and verify and view asset details and verify the asset status', () => {
		cy.get('[data-testid="filter-item-Status"]').click({ force: true });
		cy.get('[data-testid="Moving - 0"]', { timeout: 10000 }).should('be.visible');
		cy.get('[data-testid="Moving - 0"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count', { timeout: 20000 }).should('be.visible');
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();
					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
				});
			});

		cy.get('[data-testid="Parked - 1"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count', { timeout: 20000 }).should('be.visible');
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();
					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
				});
			});

		cy.get('[data-testid="Low - 2"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count', { timeout: 20000 }).should('be.visible');
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();

					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5, 8));
				});
			});

		cy.get('[data-testid="Medium - 3"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count', { timeout: 20000 }).should('be.visible');
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();
					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5, 8));
				});
			});

		cy.get('[data-testid="Large - 4"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();
					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(6, 9));
				});
			});

		cy.get('[data-testid="Mega - 5"]')
			.eq(0)
			.click({ force: true })
			.then(($btn) => {
				let elem1 = $btn.text();
				cy.get('#assets-count', { timeout: 20000 }).should('be.visible');
				cy.get('#assets-count').then(($div) => {
					let elem2 = $div.text();
					assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5, 8));
				});
			});
	});
});