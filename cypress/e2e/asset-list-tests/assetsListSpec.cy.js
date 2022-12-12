describe('Asset Management page general tests', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    })

    it('Verify assets table is displayed', () => {
        cy.get('.MuiDataGrid-root')
            .should('be.visible');
    })

    it('Verify assets table columns visibility', () => {
        const columnHeadersList = ['Company Name', 'Asset Name', 'Device ID', 'Product', 'Last Reported Date',
            'Location', 'Asset Type', 'Trip Status', 'Dwell Time', 'Battery Power', 'Asset Tags']
        cy.get('.MuiDataGrid-columnHeaderTitle')
            .each((el) => {
                expect(el.text()).oneOf(columnHeadersList)
            })
            .should('have.length', columnHeadersList.length);
    })

    it('Paging test', () => {
        cy.get('[data-rowindex="0"] .MuiDataGrid-cell')
            .should('be.visible')
            .get('.mr-3')
            .should("contain.text", '1 - 100 of')
            .get('[aria-label="Go to page 2"]')
            .click()
            .get('[data-rowindex="100"] .MuiDataGrid-cell')
            .should('be.visible')
            .get('.mr-3')
            .should("contain.text", '101 - 200 of')
            .get('.MuiPaginationItem-root[aria-current="true"]')
            .should("have.text", '2');
    })

    it('Search "Keep typing..." test', () => {
        cy.searchAssets('a')
            .get('.text-typography')
            .should("have.text", 'Keep typing...');
    })

    it('Asset list header is visible test', () => {
        cy.get('.text-3xl')
            .should("have.text", 'Asset List');
    })

    it('Add Asset button is visible test', () => {
        cy.get('[data-testid="global-button-component"]').last()
            .should("have.text", 'Add Asset');
    })
})
