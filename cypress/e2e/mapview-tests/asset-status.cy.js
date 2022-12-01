
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
         
        cy.get('button[data-testid="filter-item-Status"]').click({force:true});
        cy.wait(10000);
        cy.get('div[data-testid="moving - 0"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
        }); });

        cy.get('div[data-testid="parked - 1"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
        }); });

        cy.get('div[data-testid="low - 2"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();

                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

        cy.get('div[data-testid="medium - 3"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

        cy.get('div[data-testid="large - 4"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(6,9));
        }); });

        cy.get('div[data-testid="mega - 5"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('div[class="text-sm font-bold text-typography"]').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

})
})