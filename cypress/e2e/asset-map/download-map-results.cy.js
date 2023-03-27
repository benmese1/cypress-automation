// @team1
const path = require('path');
const dayjs = require('dayjs');

describe('Verify and download the map results as excel and csv file', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify and download the map results as excel file', () => {
		// click on More Icons
		cy.get('[data-testid="MoreVertIcon"]').click({ force: true });

		// Download the excel format
		cy.get('[data-testid="FileDownloadIcon"]').eq(0).click({ force: true });

		// verify the file was downloaded
		const downloadsFolder = Cypress.config('downloadsFolder');
		var dname = dayjs().format('MM-DD-YYYY');
		var filename = 'Phillips Connect Assets - ' + dname + '.xlsx';
		const downloadedFilename = path.join(downloadsFolder, filename);

		cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).should((buffer) =>
			expect(buffer.length).to.be.gt(100)
		);
	});

	it('verify and download the map results as csv file', () => {
		// click on More Icons
		cy.get('[data-testid="MoreVertIcon"]').click({ force: true });

		// Download the csv format
		cy.get('[data-testid="FileDownloadIcon"]').eq(1).should('be.visible');
		cy.get('[data-testid="FileDownloadIcon"]').eq(1).click({ force: true });

		// verify the file was downloaded
		const downloadscsvFolder = Cypress.config('downloadsFolder');
		var dname = dayjs().format('MM-DD-YYYY');
		var filename = 'Phillips Connect Assets - ' + dname + '.csv';
		const downloadedcsvFilename = path.join(downloadscsvFolder, filename);

		cy.readFile(downloadedcsvFilename, 'binary', { timeout: 15000 }).should((buffer) =>
			expect(buffer.length).to.be.gt(100)
		);
	});
});
