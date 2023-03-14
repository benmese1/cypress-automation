// @team4
import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor(Math.random() * 10000);
let suborgrandomnumber = Math.floor(Math.random() * 10000);

describe('Organization management - Transfer Company', () => {
	beforeEach(() => {
		cy.login(Cypress.env('clientadminusername_Acme'), Cypress.env('clientadminpassword_Acme'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

	it('Create new level2 sub-organization and transfer the level-2 sub-company to level-1 sub-company', () => {
		// create new org
		let company = 'Acme Trucking' + ' ' + suborgrandomnumber;
		cy.createNewOrganization(
			company,
			org[0].suborg1_acme.parentcompany,
			org[0].suborg1_acme.Brand,
			org[0].suborg1_acme.Type,
			org[0].suborg1_acme.Timezone,
			org[0].suborg1_acme.DistanceUnitPreference
		);
		//search the created new org
		cy.searchOrgsAndUsers(company);
		//Transfer the company to other sub-company
		cy.transferOrg(company, org[0].transferSubOrg.parentcompany);
		cy.get('[data-testid="items-list-search-input"]').should('be.visible').clear().wait(1000);
		//verify the transferred sub-company exists in the organization management table
		cy.searchOrgsAndUsers(company);
		cy.get('[data-testid="column-header-parent-company"]').should('be.visible');
		cy.get("[role='cell'][data-field='parent_company'] div").each(($item) => {
			if (cy.wrap($item).should('have.text', org[0].transferSubOrg.parentcompany)) {
				cy.log('Matched the parent company with the transferred company');
				return;
			}
		});
	});

	it('Create new level2 sub-organization and transfer the level-2 sub-company to main sub-company', () => {
		// create new org
		let company = 'Acme Trucking' + ' ' + suborgrandomnumber;
		cy.createNewOrganization(
			company,
			org[0].suborg1_acme.parentcompany,
			org[0].suborg1_acme.Brand,
			org[0].suborg1_acme.Type,
			org[0].suborg1_acme.Timezone,
			org[0].suborg1_acme.DistanceUnitPreference
		);
		//search the created new org
		cy.searchOrgsAndUsers(company);
		//Transfer the company to other sub-company
		cy.transferOrg(company, org[0].transferOrg.parentcompany);
		cy.get('[data-testid="items-list-search-input"]').should('be.visible').clear().wait(1000);
		//verify the transferred sub-company exists in the organization management table
		cy.searchOrgsAndUsers(company);
		cy.get('[data-testid="column-header-parent-company"]').should('be.visible');
		cy.get("[role='cell'][data-field='parent_company'] div").each(($item) => {
			if (cy.wrap($item).should('have.text', org[0].transferOrg.parentcompany)) {
				cy.log('Matched the parent company with the transferred company');
				return;
			}
		});
	});
});
