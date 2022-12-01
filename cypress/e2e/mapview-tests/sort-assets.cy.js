const { time } = require("console");

describe('Click on the canvas zoom the cluster and view the asset', () => {
    it('Success canvas click test and verify and view asset details', () => {

        // Login to Dev Environment
        cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

        // Assert the user is visible 
        cy.get("[aria-label='account of current user']").should('be.visible');

        // Click Asset List View
     //   cy.get('p').contains('Asset List View 1').click({force: true}); 
          cy.get('path[d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"]').click({force:true});
          cy.xpath("//b[contains(text(), 'Asset Map')]").click({force: true});
        
        // Wait for the map to reload
        cy.mapWait();
  
       //Click on the sort list
       cy.xpath("//span[contains(text(), 'Reported (Most Recent)')]").click({force: true});
       cy.xpath("//li[contains(text(), 'Reported (Oldest)')]").click({force: true});

       cy.xpath("//span[contains(text(), 'Reported (Oldest)')]").click({force: true});
       cy.xpath("//li[contains(text(), 'Name (A to Z)')]").click({force: true});

       cy.compareText('p[class="w-10/12 truncate text-sm text-primary sm:w-3/4"]')
       .then((val) => {
           assert.equal(val, -1, "The names are sorted in ascending order");    
       });
      
       
       cy.xpath("//span[contains(text(), 'Name (A to Z)')]").click({force: true});
       cy.xpath("//li[contains(text(), 'Name (Z to A)')]").click({force: true});

       cy.compareText('p[class="w-10/12 truncate text-sm text-primary sm:w-3/4"]')
       .then((val) => {
           assert.equal(val, 1, "The names are sorted in descending order");      
       });
      
       cy.xpath("//span[contains(text(), 'Name (Z to A)')]").click({force: true});
       cy.xpath("//li[contains(text(), 'Location (A to Z)')]").click({force: true});

       cy.compareText('span[class="truncate"]')
       .then((val) => {
           assert.equal(val, -1, "The location are sorted in ascending order");    
       });
      
       cy.xpath("//span[contains(text(), 'Location (A to Z)')]").click({force: true});
       cy.xpath("//li[contains(text(), 'Location (Z to A)')]").click({force: true});

       cy.compareText('span[class="truncate"]')
       .then((val) => {
           assert.equal(val, 1, "The location are sorted in descending order");
       }); 
})
})
