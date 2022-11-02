
describe('Login', () => {
    it('Success login test', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
        cy.get("[aria-label='account of current user']").should('be.visible');
        cy.get('button').contains('Show map').click();  
        cy.wait(30000);
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
              .click(buttonX, buttonY);
          });
    })

    it.skip('Incorrect password test', () => {
        cy.login(Cypress.env('username'), 'incorrect', { cacheSession: false });
        cy.contains('Incorrect username or password.')
    })

    it.skip('Empty login test', () => {
        cy.login(' ', ' ', { cacheSession: false });
        cy.contains('The username you entered cannot be empty or contain only spaces')
    })

    it.skip('Empty password test', () => {
        cy.login(Cypress.env('username'), ' ', { cacheSession: false });
        cy.contains('The password you entered cannot be empty or contain only spaces');
    })
})
