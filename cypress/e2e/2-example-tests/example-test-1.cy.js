import testUser from '../../fixtures/users.json';

describe('UI test verification for contact, about us, log in and sign up modals', () => {

    beforeEach(() => {
        // this will visit the baseURL that you have set in your framework
        cy.visit('/')
    })

    it('logs in using user JSON directly', () => {
        cy.intercept('/config.json').as('index')

        // finds login field and clicks on it
        cy.get('#login2').click();
        cy.wait(1000)

        // fills out login information and clicks on log in button
        cy.get('#loginusername').type(testUser[0].user1.username)
        cy.wait(1000)
        cy.get('#loginpassword').type(testUser[0].user1.password)
        cy.wait(1000)
        cy.get('[onclick="logIn()"]').click()

        // waiting for the home page to load 
        cy.wait('@index')

        // logging out 
        cy.logOutDB();

    })

    it('logs in using custom command', () => {

        // calls custom login command
        cy.logInDB()
        // getting username of logged in user after you log in
        cy.get('#nameofuser')


    })




})