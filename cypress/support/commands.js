

Cypress.Commands.add('createJSON', (fileName) => {

    cy.writeFile('cypress/data/files/' + fileName, cy.fixture('chassis'))

})


// Cypress.Commands.add('deleteJSON', (fileName) => {

//     // cy.exec(`rm -rf ${fileName}`);

// })





// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
