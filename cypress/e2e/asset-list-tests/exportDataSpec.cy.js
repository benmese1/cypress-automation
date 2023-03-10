// @PRJIND-2390
describe('Asset Management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		})
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('verify export button is visible and downloading CSV file', () => {
		cy.get('[data-testid = btn-sub-header-action-Export]').should('be.visible').click().wait(2000);

		cy.readFile(`${downloadsPath}` + '\\' + `${getExportedFileName()}`).should('contain', csvFileHeader);
	});

	const downloadsPath = Cypress.config('downloadsFolder');
	const csvFileHeader =
		'Company Name,Asset ID,Asset Nickname,Device ID,Product Name,Trip Status,Last Event,City,State,Zip,Asset Type,Asset Tags,Latitude,Longitude,VIN,# of Tires,# of Axles,Length,Door Type,GPS Time';
});

function getExportedFileName() {
	return `Phillips Connect assets - ${new Date().toLocaleDateString().split('/').join('_')}.csv`;
}
