
Cypress.Commands.add('login', (user, pwd, {cacheSession = true} = {}) => {
    const login = () => {
        cy.visit("/login");
        cy.get('.visible-lg #signInFormUsername').type(user);
        cy.get('.visible-lg #signInFormPassword').type(pwd, {log: false});
        cy.get('.visible-lg .btn-primary').click();
    }
    if (cacheSession) {
        cy.session(user, login)
    } else {
        login()
    }
})


Cypress.Commands.add('mapWait', () => {
    cy.intercept('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js').as('map');
    cy.wait('@map');
})

//Click on the Dashboard menu

Cypress.Commands.add('dashboardMenu', (menu) => {
    const dashboardMenu = ['Asset Map','Asset List','Devices','My Organization','User Management']
    cy.get('[data-testid="header"] [role="button"]').click()
    cy.wait(500)
    cy.get('[data-testid="side-menu"]').should('be.visible')
    dashboardMenu.forEach((dashboard) => {
        if(menu == dashboard ){
            cy.contains(dashboard).click({ force: true })
            cy.wait(100)
            cy.end()  
        }  
        else{
            cy.log("check the selector for dashboard")
        } 
    })
    


        



})

//logout from the application
Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="AccountCircleIcon"]').should('be.visible').click()
    cy.wait(100)
    cy.get('li[role="menuitem"]').click()
})

Cypress.Commands.add('createJSON', (fileName) => {
    cy.writeFile('cypress/data/files/' + fileName, cy.fixture('chassis'))
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

Cypress.Commands.add('waitForLoad', () => {
    cy.wait(2000)
    cy.get('[data-testid="spinner"]', {timeout: 30000}).should('not.exist')
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
