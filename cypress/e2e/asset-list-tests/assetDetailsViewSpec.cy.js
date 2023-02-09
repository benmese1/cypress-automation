describe('Asset Management page -- details view verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify Asset Details View is collapsable', () => {
		cy.openAsset('COFC', 'Asset ID');
		cy.get('#details-summary').should('exist');
		cy.get('#battery-block').should('exist');

		cy.clickOutside();
		cy.get('#details-summary').should('not.exist');
		cy.get('#battery-block').should('not.exist');
	});

	it('Verify Critical battery state on Asset Details View', () => {
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.1');

		//verify each 'Battery Icon' cells have appropriate icon
		cy.get("[role='cell'][data-field='batt_v']").each(($cell) => {
			cy.wrap($cell).find('[data-testid = "battery-svg-critical"]').should('exist');
		});

		cy.openAsset('COFC', 'Asset ID');

		//verify 'Battery Icon' is displayed
		cy.get('[data-testid = "battery-svg-critical"]').should('exist');

	    cy.get('#details-summary p').contains('Battery').next().then(($val) => {
			expect(parseFloat($val.text().replace(" V", ""))).to.be.lessThan(3.2);
		});
	});

	it('Verify Warning battery state on Asset Details View', () => {
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.3');

		//verify each 'Battery Icon' cells have appropriate icon
		cy.get("[role='cell'][data-field='batt_v']").each(($cell) => {
			cy.wrap($cell).find('[data-testid = "battery-svg-warning"]').should('exist');
		});

		cy.openAsset('COFC', 'Asset ID');

		//verify 'Battery Icon' is displayed
		cy.get('[data-testid = "battery-svg-warning"]').should('exist');

		//verify 'Battery Voltage' value
		cy.get('#details-summary p').contains('Battery').next().then(($val) => {
			expect(parseFloat($val.text().replace(" V", ""))).to.be.greaterThan(3.2).lessThan(3.4);
		});
	});

	it('Verify Full battery state on Asset Details View', () => {
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.9');

		//verify each 'Battery Icon' cells have appropriate icon
		cy.get("[role='cell'][data-field='batt_v']").each(($cell) => {
			cy.wrap($cell).find('[data-testid = "battery-svg-full"]').should('exist');
		});

		cy.openAsset('COFC', 'Asset ID');

		//verify 'Battery Icon' is displayed
		cy.get('[data-testid = "battery-svg-full"]').should('exist');

		//verify 'Battery Voltage' value
		cy.get('#details-summary p').contains('Battery').next().then(($val) => {
			expect(parseFloat($val.text().replace(" V", ""))).to.be.greaterThan(3.4).lessThan(4.2);
		});
	});
});
