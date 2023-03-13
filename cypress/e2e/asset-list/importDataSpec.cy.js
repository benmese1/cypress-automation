// @viktoriya
import crypto from 'crypto';

describe('Asset Management import verification', () => {
	const filePath = 'cypress/downloads/assets.csv';
	const csvHeader = 'Asset ID,Asset Name,VIN,Category,# of Tires,# of Axles,Length,Door Type,Tags\r\n';
	const assetId = crypto.randomBytes(16).toString('hex');
	const assetName = 'CFQU' + Math.random() * 6;
	const otherStaticData = 'NA,Container,12,3,20,NA';
	const assetTag = 'automation_test';

	before(() => {
		let generatedArrayData = [];
		generatedArrayData.push(assetId, assetName, otherStaticData, assetTag);
		cy.writeFile(filePath, csvHeader + generatedArrayData.join(','));
	});

	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.openAssetsList();
	});

	it('Verify import button is visible and upload CSV file', () => {
		cy.contains('button', 'Upload')
			.should('be.visible')
			.click()
			.get('.MuiDialog-paper h2')
			.should('be.visible')
			.and('contain.text', 'Upload file')
			.get('#file-upload-input')
			.selectFile(filePath, { force: true })
			.get('.MuiDialogActions-root button')
			.last()
			.click()
			.get('.text-success')
			.should('be.visible')
			.get('[role="dialog"] [data-testid="global-button-component"]')
			.should('be.visible')
			.click()
			.searchAssets(assetName)
			.get("[data-field='name'] div")
			.each(($item) => {
				cy.wrap($item).should('have.text', assetName);
			});
	});
});
