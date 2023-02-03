describe('Verify the map legend filters', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify the map legend filters', () => {
		let mapcontents = [
			'Parked Unknown Low Dwell',
			'Parked Unknown  Medium Dwell',
			'Parked Unknown  Large Dwell',
			'Parked Unknown  Mega Dwell',
			'Moving Loaded',
			'Moving Empty',
			'Moving Unknown',
			'Parked Empty Low Dwell',
			'Parked Empty Medium Dwell',
			'Parked Empty Large Dwell',
			'Parked Empty Mega Dwell',
			'Parked Loaded Low Dwell',
			'Parked Loaded Medium Dwell',
			'Parked Loaded Large Dwell',
			'Parked Loaded Mega Dwell',
		];
		// click on download map
		cy.get('[class="absolute right-14 bottom-14 md:bottom-10 "]', { timeout: 10000 }).should('be.visible');

		cy.get('[data-testid="map-details-drawer"]').eq(0).should('be.visible');
		cy.get('[data-testid="map-details-drawer"]').eq(0).scrollIntoView().click({ force: true });
		var i = 0;
		cy.get('[class="flex"]').each(($elem) => {
			//cy.log($elem.text());
			expect($elem.text()).to.eq(mapcontents[i++]);
		});
	});
});
