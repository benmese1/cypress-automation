// @team1
describe('Verify the map legend filters list to understand asset status on map', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify the map legend filters list to understand asset status on map', () => {
		let mapcontents = [
			'Moving Empty',
			'Moving Loaded',
			'Moving Unknown',
			'Parked Empty Large Dwell',
			'Parked Empty Low Dwell',
			'Parked Empty Medium Dwell',
			'Parked Empty Mega Dwell',
			'Parked Loaded Large Dwell',
			'Parked Loaded Low Dwell',
			'Parked Loaded Medium Dwell',
			'Parked Loaded Mega Dwell',
			'Parked Unknown  Large Dwell',
			'Parked Unknown  Medium Dwell',
			'Parked Unknown  Mega Dwell',
			'Parked Unknown Low Dwell',
		];
		// make sure map legend is visible
		cy.get('[data-testid="map-legend-drawer"]').should('be.visible');

		// click on maplegend list
		cy.get('[data-testid="map-legend-drawer"]').scrollIntoView().click({ force: true });
		var i = 0;
		// assert the list for different status of assets
		cy.get('[class="flex"]').each(($elem) => {
			expect($elem.text()).to.eq(mapcontents[i++]);
		});
	});
});
