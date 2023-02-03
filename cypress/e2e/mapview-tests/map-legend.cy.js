describe('Verify the map legend filters list to understand asset status on map', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify the map legend filters list to understand asset status on map', () => {
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
		// make sure map legend is visible
		cy.get('[data-testid="map-details-drawer"]').eq(0).should('be.visible');

		// click on maplegend list
		cy.get('[data-testid="map-details-drawer"]').eq(0).scrollIntoView().click({ force: true });
		var i = 0;
		// assert the list for different status of assets
		cy.get('[class="flex"]').each(($elem) => {
			expect($elem.text()).to.eq(mapcontents[i++]);
		});
	});
});
