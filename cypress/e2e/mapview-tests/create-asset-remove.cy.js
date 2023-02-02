const path = require('path');
const dayjs = require('dayjs');

describe('Verify create asset and verify it is removed sucessfully from list', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify create asset and verify it is removed sucessfully from list', () => {
		// click on download map
		/*cy.get('[data-testid="DownloadOutlinedIcon"]').click({ force: true });

		const downloadsFolder = Cypress.config('downloadsFolder');
		var dname = dayjs().format('MM-DD-YYYY');
		var filename = 'Phillips Connect assets - ' + dname + '.csv';
		const downloadedFilename = path.join(downloadsFolder, filename);

		cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).should((buffer) =>
			expect(buffer.length).to.be.gt(100)
		);*/

		// Click on More Icons
		cy.get('[data-testid="MoreVertIcon"]').click({ force: true });

		//Click on Add Icon New Asset
		cy.get('[data-testid="AddIcon"]').click({ force: true });

		// Click on Company Name
		cy.get('[name="customer_orgs_id"]').click({ force: true });

		// select the first company from the list
		cy.get("[data-option-index='0']").click({ force: true });

		// Add asset Id
		const asset_id = Math.random().toString().substr(2, 9);

		cy.get('[name="asset_id"]').type(asset_id);

		// Add asset nickname
		const nickname = 'NickName ' + Math.random().toString().substr(2, 9);

		cy.get('[name="name"]').type(nickname);

		// Select the device ID
		cy.get('[name="imei"]').click({ force: true });

		cy.get('[data-option-index="0"]').click({ force: true });

		// Select product name
		cy.get('[name="prd_cde"]').click({ force: true });

		cy.get('[data-option-index="0"]').click({ force: true });

		// Select the asset type

		cy.get('[name="category"]').click({ force: true });

		// select the first asset type from the list
		cy.get("[data-option-index='0']").click({ force: true });

		// Select asset tag

		cy.get('[data-testid="creatable-autocomplete-tags"]').click({ force: true });

		// select the asset tag from the list
		cy.get("[data-option-index='1']").click({ force: true });

		// Add Vin
		const Vin = 'Vin ' + Math.random().toString().substr(2, 9);

		cy.get('[name="vin"]').scrollIntoView().type(Vin);

		// No of Tires
		cy.get('[name="wheel_config"]').scrollIntoView().type('4');

		// No of Axles
		cy.get('[name="num_of_axles"]').type('2');

		// Length
		cy.get('[name="length"]').scrollIntoView().type('83');

		// Save the Asset
		cy.get("[data-testid='global-button-component']").click({ force: true });

		// Search/Read the asset in asset List

		cy.dashboardMenu('Asset List');
		cy.get('[data-testid="items-list-search-input"]').type(asset_id);

		// assert that the Asset is added successfully

		cy.get(`[title="${asset_id}"]`).contains(asset_id.toString());

		// Remove the asset

		cy.get(`[title="${asset_id}"]`).click({ force: true });

		cy.get('[data-testid="details-drawer-remove-btn"]').should('be.visible');

		cy.get('[data-testid="details-drawer-remove-btn"]').click({ force: true });

		cy.get('[data-testid="delete-confirmation-dialog-remove-btn"]').click({ force: true });

		// Confirm that the asset was removed
		cy.get('[data-testid="items-list-search-input"]').type(asset_id);
		cy.get('[data-testid="page"]').contains('No results found.');
	});
});
