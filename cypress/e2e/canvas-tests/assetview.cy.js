
describe('Click on the canvas zoom the cluster and view the asset', () => {
    it('Success canvas click test and verify and view asset details', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
        cy.get("[aria-label='account of current user']").should('be.visible');
        cy.get('p').contains('Asset List View 1').click({force: true});  
        cy.wait(20000);
      //  cy.intercept('https://cognito-identity.us-west-2.amazonaws.com/').as('map');
     //  cy.wait('@map');
        cy.get("[class='mapboxgl-canvas']").then($canvas => {
            // Get dimension of the canvas
      
            const canvasWidth = $canvas.width();
            const canvasHeight = $canvas.height();
      
            // Divide in half since cursor will be at center of canvas
      
            const canvasCenterX = canvasWidth / 2;
            const canvasCenterY = canvasHeight / 2;
      
            // Determine the click position by dissecting the space where the button is
            // This helps allow the test to work responsively
      
              const buttonX = canvasCenterX - 100; //( ( canvasCenterX / 3 ) * 2 );
              const buttonY = canvasCenterY + 100; //( ( canvasCenterY / 3 ) * 2 );
      
            // Wrap the canvas with the Cypress API, scroll it into view, and click in the location!
         //   cy.wait(100000);
            cy.wrap($canvas)
              .scrollIntoView()
              .click(buttonX, buttonY, {force: true});
          });
        cy.get("[class='w-3/4 truncate text-sm']").eq(0).click({force: true});

        // Verify Asset Name
        cy.get("[class='w-3/4 truncate text-sm']").eq(0).should('include.text', "CFQU321266");

        // Verify City State 
        cy.get("[class='truncate']").eq(0).should('include.text', "De Baca County, New Mexico");

        // Verify Time Stamp
       // cy.get("[class='flex w-1/4 items-center gap-0.5 whitespace-nowrap rounded-sm bg-green px-1 py-0 text-3xs text-white']").eq(0).should('include.text', "5 hours");

        // Expand the Additional tab
        cy.get("[class='MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06']").eq(0).click({force: true});

         // Close out the additional details box by clicking the X
         cy.get("[class='MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06']").eq(1).click({force: true});
})
})
