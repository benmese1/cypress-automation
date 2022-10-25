

Cypress.Commands.add('logInDB', () => {

    // finds login field and clicks on it
    cy.get('#login2').click();

    // fills out login information and clicks on log in button
    cy.get('#loginusername').type(Cypress.env('username'))
    cy.wait(1000)
    cy.get('#loginpassword').type(Cypress.env('password'))
    cy.wait(1000)
    cy.get('[onclick="logIn()"]').click()

})

Cypress.Commands.add('logOutDB', () => {

    // finds login field and clicks on it
    cy.wait(1000)
    cy.get('#logout2').click();

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
