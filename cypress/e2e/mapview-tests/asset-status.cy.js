
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
         
        cy.get('[data-testid="filter-item-Status"]').click({force:true});
        cy.get('[data-testid="Moving - 0"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-testid="Moving - 0"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
        }); });

        cy.get('[data-testid="Parked - 1"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1]);
        }); });

        cy.get('[data-testid="Low - 2"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();

                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

        cy.get('[data-testid="Medium - 3"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

        cy.get('[data-testid="Large - 4"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(6,9));
        }); });

        cy.get('[data-testid="Mega - 5"]').eq(0).click({force:true}).then(($btn) => {
            let elem1 = $btn.text();
            cy.get('#assets-count').then(($div) => { 
                let elem2 = $div.text();
                assert.equal(elem2.split(' ')[0], elem1.split(' ')[1].substring(5,8));
        }); });

})
})