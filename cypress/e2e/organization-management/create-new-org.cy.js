import org from '../../fixtures/createorg.json';
let randomnumber = Math.floor((Math.random() * 10000) );

describe('Create New Organization management',() =>{
  
    beforeEach(() => {
          cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
          cy.get("[aria-label='account of current user']").should('be.visible');
      })
  
     it('Click on Create and verify the newly organization created' , () =>{           
      cy.dashboardMenu("My Organization");

      // click on confirm sign in
      cy.get("[class='btn btn-primary submitButton-customizable']").eq(0).click({force: true});  

      //wait for page loading
      cy.waitForLoad()  

      // Naviage to My Organization
      cy.dashboardMenu("My Organization");
    
      // create new org
      cy.log("Create New button clicked"); 
      cy.createNewOrganization(org[0].suborg.ParentOrganization,'SORG'+randomnumber,org[0].suborg.Type,org[0].suborg.Description,org[0].suborg.Brand,org[0].suborg.Timezone);
  
      })

    })