
describe('Validate data on the Organization management table view',() =>{
    

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.get("[aria-label='account of current user']").should('be.visible');
     })
 
     it('Click on My Organization module and verify that fields present on My Organization management table view', () =>{   
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('My Organization').click({force: true})
            cy.wait(4000)
        cy.url().should('include', '/organizations')
         //verifying fields on the org mgmt table   
         //Name field visibility
         cy.get('[data-field="__tree_data_group__"]').should('be.visible').contains('Name') 
         //Description field visibility
         cy.get('[data-field="description"]').should('be.visible').contains('Description') 
         //Timezone field visibility
         cy.get('[data-field="time_zones"]').should('be.visible').contains('Timezone') 
         //No. of Devices field visibility
         cy.get('[data-field="asset_count"]').should('be.visible').contains('No. of Devices') 
         //Updated field visibility
         cy.get('[data-field="updated_date"]').should('be.visible').contains('Updated') 
         //Created field visibility
         cy.get('[data-field="added_date"]').should('be.visible').contains('Created') 

     })

     it('Click on My Organization module and verify that data present on My Organization management table view', () =>{  
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('My Organization').click({force: true})
            cy.wait(4000)
        cy.url().should('include', '/organizations')
        //verifying data on the org mgmt table   
        //verify name of the organizaton
        cy.xpath("//span[contains(text(), 'Philliips Connect')]").should('include.text', "Philliips Connect");
        //Time zone data validation
        cy.get("div:nth-of-type(2) > div:nth-of-type(3) > .MuiDataGrid-cellContent").should('include.text', "EST");
        //Updated validation
        cy.get("div:nth-of-type(2) > div:nth-of-type(6)").should('include.text', "11/1/2022")
        //logout from the application
        cy.logout() 

     })
        
 
 
 })