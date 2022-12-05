const { time } = require("console");

describe('Click on the canvas zoom the cluster and view the asset', () => {
    it('Success canvas click test and verify and view asset details', () => {

        // Login to Dev Environment
        cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

        // Assert the user is visible 
        cy.get("[aria-label='account of current user']").should('be.visible');

        // Click Asset Maps
        cy.dashboardMenu("Asset Map");
        
        // Wait for the map to reload
        cy.mapWait();
  
       //Click on the sort list
       cy.get('[data-testid="menu-sort"]').click({force: true});
       cy.get('[data-testid="reported-oldest"]').click({force: true});

       cy.get('[data-testid="2022-10-10T14:38:00.000Z"]')

       cy.get('[data-testid="menu-sort"]').click({force: true});
       cy.get('[data-testid="name-a-z"]').click({force: true});

       cy.compareText('63613ecbe6a7557846747341', '63613ecbe6a7557846746fff')
       .then((val) => {
           assert.equal(val, -1, "The names are sorted in ascending order");    
       });
       
       cy.get('[data-testid="menu-sort"]').click({force: true});
       cy.get('[data-testid="name-z-a"]').click({force: true});

       cy.compareText('63613ecbe6a755784674652d', '63613ecbe6a7557846747021')
       .then((val) => {
           assert.equal(val, 1, "The names are sorted in descending order");      
       });
      
       cy.get('[data-testid="menu-sort"]').click({force: true});
       cy.get('[data-testid="location-a-z"]').click({force: true});

       cy.compareText('63613ecbe6a75578467465e7','63613ecbe6a755784674661d')
       .then((val) => {
           assert.equal(val, -1, "The location are sorted in ascending order");    
       });
      
       cy.get('[data-testid="menu-sort"]').click({force: true});
       cy.get('[data-testid="location-z-a"]').click({force: true});

       cy.compareText('63613ecbe6a7557846747420', '63613ecbe6a7557846746769')
       .then((val) => {
           assert.equal(val, 1, "The location are sorted in descending order");
       }); 
})
})
