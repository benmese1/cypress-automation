describe('Create New Organization management',() =>{
    beforeEach(() => {
          cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
          cy.get("[aria-label='account of current user']").should('be.visible');
      })
  
      
     it('Click on Create and verify the newly organization created' , () =>{
        cy.navigateToLeftmenuItemsInHomePage('Organization');
        cy.wait(1000);
        /* On Navigating to Organization page application is loading
         as a temporary fix to completed the automation following steps are performed
        reload  the page 
        login 
        wait for certain time 
        and navigate to organization        
        */
       //Name whicle creating sub org should be unique so appending  randowm 4 digit number to "SORG_"
        let randomnumber = Math.floor((Math.random() * 10000) );

        cy.reload();
        cy.get('.visible-md > .modal-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .cognito-asf > :nth-child(2) > .btn').click();
        cy.wait(10000);   
        cy.navigateToLeftmenuItemsInHomePage('Organization');
        cy.log("Create New button clicked");
        cy.wait(10000);
        cy.createNewOrganization('demo-root-org','SORG'+randomnumber,'custom','this is test org created by cypress automation','mani','Mountain Standard (GMT-7)');


      })

    })