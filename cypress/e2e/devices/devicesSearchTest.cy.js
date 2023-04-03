//@team3
import searchData from '../../fixtures/devicesearch.json';

describe('Search devices', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad().openDevices();
	});
	searchData.devices.forEach((search) => {
		it(`Device Searching by existing "${search.option}"'`, () => {
			cy.wait(10000);
			cy.searchDevices(search.term);

			//verify each cell of provided column has corresponding search value
			cy.get('[role="grid"] .MuiDataGrid-virtualScroller').scrollTo('topRight', { ensureScrollable: false });
			cy.get(`[role='cell'][data-field='${search.datafield}']`).each(($cell) => {
				cy.wrap($cell).should('contain.text', search.term);
			});
		});
	});
});
