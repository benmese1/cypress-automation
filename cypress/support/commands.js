
Cypress.Commands.add('DEVlogin', (username, password) => {
        cy.session([username, password], () => {
            cy.visit('https://dev-connect1.phillips-connect.com/demo');
            cy.get('button').contains('Login').click()

            cy.origin(
                "https://devconnect1userpooldomain.auth.us-west-2.amazoncognito.com/login",
                { args: [username, password] },
                ([username, password]) => {
                    cy.get('#signInFormUsername').type(username, {force: true});
                    cy.get('#signInFormPassword').type(password, {force: true});
                    // cy.xpath('(//input[@name="signInSubmitButton"])[1]').click();
                    cy.get('[name="signInSubmitButton"]').first().click({force: true});
                }
            );
                cy.get('h1[class="font-bold"]').should('exist')
        })

})



Cypress.Commands.add('logInDB', () => {
    // we would usually put the cy.visit() here as well, but left it in the beforeEach, just for training purposes

    // finds login field and clicks on it
    cy.get('#login2').click();

    // fills out login information and clicks on log in button
    // this timeout is unique to this selector. It will query for this selector for up to one second
    cy.get('#loginusername', { timeout: 1000 }).type(Cypress.env('username'))
    cy.get('#loginpassword', { timeout: 1000 }).type(Cypress.env('password'))
    cy.get('[onclick="logIn()"]').click()
    // a hard coded wait. The test will stop here for 1 sec, even if the element is available to interact with
    cy.wait(1000)
    // this is testing that the modal is no longer open
    cy.get('#exampleModalLabel', { timeout: 2000 }).should('not.be.visible')
})


Cypress.Commands.add('logOutDB', () => {
    // here is a hard coded wait. Technically a dynamic wait is better, but these can be useful still
    cy.wait(1000)
    // finds logout link and clicks on it
    cy.get('#logout2', { timeout: 2000 }).click();

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
