describe('Landing page view test verification', () => {

    it('verify Landing page for user with first name', () => {
        loginAsUserWithFirstName();
        cy.url().should('include', '/dashboard');
        cy.contains('Welcome back, James');
    });
});

const loginAsUserWithFirstName = () => {
    cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {cacheSession: false})
        .waitForLoad();
}
