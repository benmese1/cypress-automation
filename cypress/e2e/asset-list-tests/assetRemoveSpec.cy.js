let prefix = Math.floor(100000 + Math.random() * 900000);

describe('Asset Management removal tests', {retries: 0}, () => {
    beforeEach(function () {

        cy.fixture('createasset').then((assets) => {
            this.assets=assets
         })

        cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    });

    it('Removed asset can`t be found in assets table', function () {

        let assetModel = this.assets[0].asset;
        let assetNickname =  assetModel.AssetNickname + prefix;
        
        // Create new asset for removing
        cy.createNewAsset(assetModel.CompanyName,
        assetModel.AssetId + prefix,
        assetNickname,
        prefix, 
        assetModel.AssetType);

        // Wait for 'Assets' table loading
        getAssetListTableRow().should("have.length.gte", 1);
        
        // Search created asset and remove it
        cy.removeAsset(assetNickname);

        //Wait for 'Asset' table update
        getAssetListTableRow().should("have.length", 0);
        getAssetListTableRow().should("have.length.gte", 1);

         // Search removed asset
         cy.searchAssets(assetNickname);

         getAssetListTableRow().should("have.length", 0);
    });
    
});

function getAssetListTableRow() {
    return cy.get(".MuiDataGrid-row");
}
