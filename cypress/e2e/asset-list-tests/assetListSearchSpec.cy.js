import assets from '../../fixtures/createasset.json';
let prefix = Math.floor(100000 + Math.random() * 900000);

describe('Asset Management page search tests', {retries: 0}, () => {
    beforeEach(() => {
        cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    });

    it('verify search results for assets table', () => {

        let assetNicknameToSearch = assets[0].asset.AssetNickname + prefix;
        
        // Create new asset for searching
        cy.createNewAsset(assets[0].asset.CompanyName,
        assets[0].asset.AssetId + prefix,
        assetNicknameToSearch,
        prefix, 
        assets[0].asset.AssetType);

        // Wait for 'Assets' table loading
        cy.get("[role='cell'][data-field='name'] div")
        .should("have.length.gte", 1)
        
        // Search created asset
        cy.searchAssets(assetNicknameToSearch)

        // Select 'Asset Nickname'
        showColumn('Asset Nickname')

        // Verify search result in 'Assets' table
        cy.get("[role='cell'][data-field='name'] div")
            .each(($item) => {
                cy.wrap($item).should('contain.text', assetNicknameToSearch);
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
