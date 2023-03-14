// @team3
describe('Login', () => {
	it('Success login test', () => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.get("[aria-label='account of current user']").should('be.visible');
	});
});
