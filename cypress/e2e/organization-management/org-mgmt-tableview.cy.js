
describe('Verify Organization management table view', () => {

    beforeEach(() => {
        cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
        cy.waitForLoad()
        cy.get("[aria-label='account of current user']").should('be.visible');
        cy.dashboardMenu('My Organization')
    })

    it('Click on My Organization module and verify the fields present in My Organization management table view', () => {         
        //verifying fields on the org mgmt table  
        //Org Name visibility
        cy.get('[data-field="name"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('Organization Name');
        //Brand field visibility
        cy.get('[data-field="brand"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('Brand');
        //TimeZone field visibiity
        cy.get('[data-field="time_zones"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('Timezone');
        //No. of Devices field visibility
        cy.get('[data-field="asset_count"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('No. of Devices');
        //Updated field visibility
        cy.get('[data-field="updated_date"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('Updated')
        //Created field visibility
        cy.get('[data-field="added_date"] .MuiDataGrid-columnHeaderTitle').should('be.visible').contains('Created')

    })

    it('Get the My organization name when user logged', () => {
        cy.url().should('include', '/organizations')
        cy.get('[data-testid="page"]').should('be.visible').contains('My Organization')
        cy.get('[data-testid="page"] h3').then(function($elem) {
            cy.log("My Organization name:"+ $elem.text())
       })
    }) 

    it('verify export button is visible and downloading CSV file', () => {
        cy.url().should('include', '/organizations')
        cy.get('[aria-label="Export"]')
            .should('be.visible')
            .click()
        cy.wait(600)
        cy.get('[role="menuitem"]').contains('Download as CSV').click({force :true})
        cy.readFile(downloadsPath + exportFilename).should('contain', csvFileHeader)
    })

    const downloadsPath = 'cypress/downloads/'
    const exportFilename = 'Phillips Connect.csv'
    const csvFileHeader = 'Organization Name,Brand,Timezone,No. of Devices,Updated,Created'

})