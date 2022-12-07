const { time } = require("console");
import 'dayjs/locale/nb'


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
      // Assert the assets are sorted as per the recent date 
        cy.get('[data-testid="reported-recent"]').click({force: true});
        let time_prev = 0;
        let index =0;
        let today = new Date();
        cy.get('[data-timestamp*="Z"]').each(($e) => { 
                cy
                .wrap($e).invoke('attr', 'data-timestamp')
                .then($current_date => {
               
                 const date = new Date($current_date);
                 if(index ==0)
                 {
                    index = index + 1;
                 }
                 else
                 if(index > 0)
                 {
                    today = new Date(time_prev);
                 }
                
                 expect(date).to.lte(today);  
                 time_prev = $current_date;    
                      
             });
         })

        //Click on the sort list
        cy.get('[data-testid="menu-sort"]').click({force: true});
       // Assert the assets are sorted as per the oldest date 
       cy.get('[data-testid="reported-oldest"]').click({force: true});
       time_prev = 0;
       let ind = 0;
       cy.get('[data-timestamp*="Z"]').each(($e) => { 
               cy
               .wrap($e).invoke('attr', 'data-timestamp')
               .then($current_date => {
                const date = new Date($current_date);
                const current = new Date(time_prev);
                if(ind == 0)
                {
                expect(date).to.lte(current);  
                 ind = ind +1;
                }
                else
                if(ind > 0)
                {
                    expect(current).to.lte(date);  
                }
                time_prev = $current_date;    
                     
            });
        })

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
