

Cypress.Commands.add('createJSON', (fileName, data) => {

    cy.writeFile('cypress/data/files/' + fileName, data)

})


Cypress.Commands.add('deleteJSON', (fileName) => {

    // cy.exec(`rm -rf ${fileName}`);

})





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
