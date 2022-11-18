describe('Create New Organization management',() =>{


    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.get("[aria-label='account of current user']").should('be.visible');
     })
 
 
     it('Click on Create and verify the newly organization created' , () =>{
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('My Organization').click({force: true})
            cy.wait(4000)
        cy.url().should('include', '/organizations') 
         cy.get("[data-testid='global-button-component']").contains('Create New').click()
         cy.log("Create New button clicked")
     })
 
 
 
 })