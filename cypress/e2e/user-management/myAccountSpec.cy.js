// @team4
import account from '../../fixtures/myaccount.json';
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify My Account page', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click My Account
		cy.dashboardMenu('My Account');
	});

	it('Verify by changing firstname and lastname in my account tab and check the same updated for the user', () => {
		//Clear the existing data and enter the data
		let firstName = account[0].myaccount.firstname + ' ' + randomnumber;
		let lastName = account[0].myaccount.lastname + ' ' + randomnumber;
		cy.get('[data-testid="form-control-input-firstName"]').should('be.visible').clear().type(firstName).wait(2000);
		cy.get('[data-testid="form-control-input-lastName"]').should('be.visible').clear().type(lastName).wait(1000);
		cy.get('[data-testid="autocomplete-time_zones"]').click().type('Eastern Standard (GMT-5)').type('{enter}');
		//Save the data
		cy.get('[data-testid="btn-account-form-submit"]').click();
		// cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User Updated Successfully!');
		//Go to Dashboard and check the user firstname
		cy.dashboardMenu('Dashboard');
		cy.wait(5000);
		// update - first name to be displayed with welcome message
		cy.get('.MuiTypography-h3').then(($elem) => {
			const message = $elem.text();
			expect(message).to.contain(firstName);
			console.log('Firstname matched with the Account details');
		});
		//Go to User management and check the user lastname
		cy.dashboardMenu('User Management');
		cy.searchOrgsAndUsers(account[0].myaccount.email);
		cy.get('[data-testid="column-header-last-name"]').should('be.visible');
		cy.get("[role='cell'][data-field='lastName'] div").each(($item) => {
			const last_name = $item.text();
			expect(last_name).to.equal(lastName);
			console.log('Lastname matched with the Account details');
		});
	});

	it('Verify with out updating any details and check it goes to Dashboard when we click on Done', () => {
		//Check all fields visible
		cy.get('[data-testid="form-control-input-firstName"]').should('be.visible');
		cy.get('[data-testid="form-control-input-lastName"]').should('be.visible');
		cy.get('[data-testid="form-control-input-email"]').should('be.visible');
		cy.get('[data-testid="form-control-input-phoneNumber"]').should('be.visible');
		cy.get('[data-testid="autocomplete-time_zones"]').should('be.visible');
		//Click on Done button
		cy.get('[data-testid="btn-account-form-done"]').should('be.visible').click();
		//Page should goes to Dashboard
		cy.url().should('include', '/dashboard');
	});
});
