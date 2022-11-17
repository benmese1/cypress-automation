describe('Validate data on the Organization management table view',() =>{
    

    /*beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.get("[aria-label='account of current user']").should('be.visible');
     })*/
 
     /*it('Click on My Organization module and verify that fields present on My Organization management table view', () =>{   
         cy.get('[data-testid="header"] [role="button"]').click({force: true})
        cy.wait(2000)
        cy.get('[data-testid="side-menu"]').should('be.visible')
        cy.get('[data-testid="header"] [role="button"]').click({force: true})
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('My Organization').click({force: true})
            cy.wait(4000)
        cy.url().should('include', '/organizations')
         //verifying fields on the org mgmt table   
         //Name field visibility
         cy.get('[data-field="__tree_data_group__"]').should('be.visible').contains('Name') 
         cy.log("name field visible on org mgmt table")
         //Description field visibility
         cy.get('[data-field="description"]').should('be.visible').contains('Description') 
         cy.log("Description field visible on org mgmt table")
         //Timezone field visibility
         cy.get('[data-field="time_zones"]').should('be.visible').contains('Timezone') 
         cy.log("Timezone field visible on org mgmt table")
         //No. of Devices field visibility
         cy.get('[data-field="asset_count"]').should('be.visible').contains('No. of Devices') 
         cy.log("No. of Devices field visible on org mgmt table")
         //Updated field visibility
         cy.get('[data-field="updated_date"]').should('be.visible').contains('Updated') 
         cy.log("Updated field visible on org mgmt table")
         //Created field visibility
         cy.get('[data-field="added_date"]').should('be.visible').contains('Created') 
         cy.log("Created field visible on org mgmt table")

     })*/

     it('Click on My Organization module and verify that data present on My Organization management table view', () =>{ 
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.get("[aria-label='account of current user']").should('be.visible');  
        cy.get('[data-testid="header"] [role="button"]').click({force: true})
        cy.wait(2000)
        cy.get('[data-testid="side-menu"]').should('be.visible')
        cy.get('[data-testid="header"] [role="button"]').click({force: true})
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('My Organization').click({force: true})
            cy.wait(4000)
        cy.url().should('include', '/organizations')
        //verifying data on the org mgmt table   
        //verify name of the organizaton
        cy.xpath("//span[contains(text(), 'Philliips Connect')]").should('include.text', "Philliips Connect");
        cy.log("Philliips Connect organnization name present in org mgmt table")


     })
        
 
 
 })