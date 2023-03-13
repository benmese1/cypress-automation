// @tazim
const path = require('path');
const dayjs = require('dayjs');

describe('Verify and download the map results as csv file', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify and download the map results as csv file', () => {
		// click on download map
		cy.get('[data-testid="DownloadOutlinedIcon"]').click({ force: true });

		const downloadsFolder = Cypress.config('downloadsFolder');
		var dname = dayjs().format('MM-DD-YYYY');
		var filename = 'Phillips Connect assets - ' + dname + '.csv';
		const downloadedFilename = path.join(downloadsFolder, filename);

		cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).should((buffer) =>
			expect(buffer.length).to.be.gt(100)
		);
	});
});
