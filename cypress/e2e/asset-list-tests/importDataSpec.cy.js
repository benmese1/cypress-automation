import crypto from 'crypto';

describe('Asset Management import verification', () => {
	const filePath = 'cypress/downloads/assets.csv';
	const csvHeader =
		'Company Name,Asset ID,Asset Name,Device ID,Device IP,Latitude,Longitude,Ambient Temp,Internal Temp,Asset Type,Address,Trip Status,Dwell Time,Battery Power,Stale Time,Asset Tags\r\n';
	const companyName = 'Phillips Connect';
	const assetId = crypto.randomBytes(16).toString('hex');
	const assetName = 'CFQU' + Math.random() * 6;
	const otherStaticData = 'NA,NA,34.52315,-115.54382,NA,NA,Container,"Will County, Illinois",Parked,-1,5.0,1.1';
	const staleTime = new Date().toISOString();
	const assetTag = 'test';

	before(() => {
		let generatedArrayData = [];
		generatedArrayData.push(companyName, assetId, assetName, otherStaticData, staleTime, assetTag);
		cy.writeFile(filePath, csvHeader + generatedArrayData.join(','));
	});

	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false }).waitForLoad().openAssetsList();
	});

	it('Verify import button is visible and upload CSV file', () => {
		cy.contains('button', 'Upload')
			.should('be.visible')
			.click()
			.get('.MuiDialogTitle-root')
			.should('be.visible')
			.and('have.text', 'Upload Assets CSV file')
			.get('[name="file"]')
			.selectFile(filePath, { force: true })
			.get('.MuiDialogActions-root button')
			.first()
			.click()
			.waitForLoad()
			.get('[data-testid="snackbar-title"]')
			.should('have.text', 'Assets were uploaded Successfully!')
			.searchAssets(assetName)
			.get(".MuiDataGrid-row [data-field='asset_name'] div")
			.each(($item) => {
				cy.wrap($item).should('have.text', assetName);
			});
	});
});
