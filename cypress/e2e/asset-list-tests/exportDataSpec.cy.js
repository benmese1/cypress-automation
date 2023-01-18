describe('Asset Management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), {
			cacheSession: false,
		})
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('verify export button is visible and downloading CSV file', () => {
		cy.url()
			.should('include', '/assets')
			.contains('button', 'Export')
			.should('be.visible')
			.click()
			.wait(2000)
			.readFile(downloadsPath + exportFilename)
			.should('contain', csvFileHeader);
	});

	const downloadsPath = 'cypress/downloads/';
	const exportFilename = 'Phillips Connect.csv';
	const csvFileHeader =
		'Company Name,Asset ID,Asset Name,Address,Device ID,Device IP,Latitude,Longitude,Ambient Temp,Internal Temp,Battery Power,Main Power,Received Timestamp,Time,Stale Time';
});
