Cypress.Commands.add('createJSON', (fileName) => {

    cy.writeFile('cypress/data/files/' + fileName, cy.fixture('chassis'))

})


// Cypress.Commands.add('deleteJSON', (fileName) => {

//     // cy.exec(`rm -rf ${fileName}`);

// })


Cypress.Commands.add('login', (user, pwd) => {
    cy.visit("/login");
    cy.get('.visible-lg #signInFormUsername').type(user);
    cy.get('.visible-lg #signInFormPassword').type(pwd, {log: false});
    cy.get('.visible-lg .btn-primary').click();
})

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
