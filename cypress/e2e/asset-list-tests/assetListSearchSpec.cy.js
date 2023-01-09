describe('Asset Management page search tests', {retries: 0}, () => {
    beforeEach(() => {
        cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    });

    it('verify probably based search results for assets table', () => {
        const assetName = 'Test Asset 44'
        cy.get('[data-testid="items-list-search-input"]')
            .should('be.visible')
            .type(assetName)

        showColumn('Asset Nickname')

        // verify that results are probably based search
        cy.get("[role='cell'][data-field='name'] div")
            .each(($item) => {
                cy.wrap($item).should('contain.text', assetName);
            });
    });
});

const showColumn = (column) => {
    // Open columns dialog
    cy.get('[data-testid="asset-table-toolbar-columns-btn"]')
        .should('be.visible')
        .click()
    // Enable only one column
    cy.contains('button[type=button]', 'Hide all')
        .click()
    cy.contains('label', column)
        .click()
    // Hide columns dialog
    cy.get('[data-testid="asset-table-toolbar-columns-btn"]')
        .click()
}
