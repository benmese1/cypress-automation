import testUser from '../../fixtures/users.json';

//Use the cy.fixture() method to pull data from fixture file
before(function () {
    cy.fixture('users').then(function (data) {
        this.data = data;
    })
})

describe('UI test verification for contact, about us, log in and sign up modals', () => {

    beforeEach(() => {
        // this will visit the baseURL that you have set in your framework
        cy.visit('/')
    })

    afterEach(() => {
        cy.logOutDB();
    })

    // it('logs in preloading user data into this', () => {
    //     cy.fixture('users').then(function (data) {
    //         this.data = data;
    //     })

    //     // finds login field and clicks on it
    //     cy.get('#login2').click();

    //     // fills out login information and clicks on log in button
    //     cy.get('#loginusername').type(this.data.username)
    //     cy.wait(1000)
    //     cy.get('#loginpassword').type(this.data.password)
    //     cy.wait(1000)
    //     cy.get('[onclick="logIn()"]').click()

    // })

    it('logs in using user JSON directly', () => {

        // finds login field and clicks on it
        cy.get('#login2').click();
        cy.wait(1000)

        // fills out login information and clicks on log in button
        cy.get('#loginusername').type(testUser[0].user1.username)
        cy.wait(1000)
        cy.get('#loginpassword').type(testUser[0].user1.password)
        cy.wait(1000)
        cy.get('[onclick="logIn()"]').click()


    })

    it('logs in using custom command', () => {

        // calls custom login command
        cy.logInDB()
        cy.get('#nameofuser')

    })




})