Cypress.Commands.add('createJSON', (fileName) => {

    cy.writeFile('cypress/data/files/' + fileName, cy.fixture('chassis'))

})


// Cypress.Commands.add('deleteJSON', (fileName) => {

//     // cy.exec(`rm -rf ${fileName}`);

// })


Cypress.Commands.add('login', (user, pwd) => {
    // const args = {
    //     username: user, password: pwd,
    //     client_id: Cypress.env('client_id'), redirect_uri: Cypress.config().baseUrl + '/login'
    // }
    // cy.visit("/login");
    // cy.origin('https://devconnect1userpooldomain.auth.us-west-2.amazoncognito.com', {args}, ({
    //                                                                                              username,
    //                                                                                              password,
    //                                                                                              client_id,
    //                                                                                              redirect_uri,
    //                                                                                          }) => {
    //     cy.visit('/login?client_id=' + client_id + '&response_type=code&scope=email+openid+profile&redirect_uri=' + redirect_uri);
    //     cy.get('.visible-lg #signInFormUsername').type(username);
    //     cy.get('.visible-lg #signInFormPassword').type(password, {log: false});
    //     cy.get('.visible-lg .btn-primary').click();
    // });
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
