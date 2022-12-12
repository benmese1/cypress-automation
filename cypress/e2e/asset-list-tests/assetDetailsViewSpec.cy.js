describe('Asset Management page -- details view verification', {retries:0}, () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    })

    it('verify Asset details View collapsable', () => {
        clickFirstRow();
        cy.get('#details-summary').should('be.visible');
        cy.get('#battery-block').should('be.visible');

        clickOutside();
        cy.get('#details-summary').should('not.exist');
        cy.get('#battery-block').should('not.exist');
    })
})

const clickFirstRow = () => {
    cy.get('[role="grid"] [data-rowindex="0"]').click();
}

const clickOutside = () => {
    cy.get('body').click(0,0);
}
