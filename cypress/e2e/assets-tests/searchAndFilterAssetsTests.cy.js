describe('Search and filter assets', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.waitForLoad();
    });

    it('Search asset by address test', () => {
        cy.openAssetsList()
            .searchAssets('Atlanta, Georgia')
            .get(".MuiDataGrid-row [data-field='address'] div").each(($item) => {
            cy.wrap($item).should('have.text', 'Atlanta, Georgia');
        });
    });

    it('Search asset by Company name test', () => {
        cy.openAssetsList()
            .searchAssets('test_sub_org_2')
            .get(".MuiDataGrid-row [data-field='company_id'] div").each(($item) => {
            cy.wrap($item).should('have.text', 'test_sub_org_2');
        });
    });

    it('Search asset by Asset name test', () => {
        cy.openAssetsList()
            .searchAssets('asset-root_org-3-5')
            .get(".MuiDataGrid-row [data-field='asset_name'] div").each(($item) => {
            cy.wrap($item).should('have.text', 'asset-root_org-3-5');
        });
    });

    it('Search asset by longitude test', () => {
        cy.openAssetsList()
            .searchAssets('-95.98861492')
            .showHideColumnAssetsList('Longitude')
            .get(".MuiDataGrid-row [data-field='longitude'] div").each(($item) => {
            cy.wrap($item).should('have.text', '-95.98861492');
        });
    })

    it('Search asset by latitude test', () => {
        cy.openAssetsList()
            .searchAssets('41.24705907')
            .showHideColumnAssetsList('Latitude')
            .get(".MuiDataGrid-row [data-field='latitude'] div").each(($item) => {
            cy.wrap($item).should('have.text', '41.24705907');
        });
    })

    it('Search assets verify that number of results correct test', () => {
        cy.openAssetsList()
            .searchAssets('41.24705907')
            .get('.mr-3').invoke('text')
            .should((actual) => {
                expect(parseInt(actual.split(' of ')[1]))
                    .to.eq(Cypress.$(".MuiDataGrid-row").length)
            });
    })

    it('Filter assets: verify that number of results correct test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'equals', 'test_sub_org_2')
            .get('.mr-3').invoke('text')
            .should((actual) => {
                expect(parseInt(actual.split(' of ')[1]))
                    .to.eq(Cypress.$(".MuiDataGrid-row").length)
            });
    })


    it('Add asset filter by Company name equals test_sub_org_1 test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'equals', 'test_sub_org_2')
            .get(".MuiDataGrid-row [data-field='company_id'] div").each(($item) => {
            cy.wrap($item).should('have.text', 'test_sub_org_1');
        });
    })

    it('Add asset filter by Company name contains test_sub_org test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'contains', 'test_sub_org')
            .get(".MuiDataGrid-row [data-field='company_id'] div").each(($item) => {
            cy.wrap($item).should('contain.text', 'test_sub_org');
        });
    })

    it('Add asset filter by Company name ends with 2 test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'ends with', '2')
            .get(".MuiDataGrid-row [data-field='company_id'] div").each(($item) => {
            cy.wrap($item).should('contain.text', '2');
        });
    })

    it('Add asset filter by Company name is empty test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'is empty', '')
            .get(".MuiDataGrid-row [data-field='company_id'] div").should('not.exist');
    });

    it('Add multiple asset filter by Company name contains test and Asset type is Tractor test', () => {
        cy.openAssetsList()
            .addAssetsFilter('Company Name', 'contains', 'test')
            .addAssetsFilter('Asset Type', 'equals', 'Tractor')
            .get(".MuiDataGrid-row [data-field='company_id'] div").each(($item) => {
            cy.wrap($item).should('contain.text', 'test')
        })
            .get(".MuiDataGrid-row [data-field='category']").each(($item) => {
            cy.wrap($item).should('have.text', 'Tractor')
        });
    });
});