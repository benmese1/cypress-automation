import faker from 'faker';

describe('UI test verification for contact, about us, log in and sign up modals', () => {

    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })

    it('verifies contact modal content', () => {

        // clicks on the contact nav option
        cy.xpath('//a[a@clss="nav-link" and contains(text(), "Contact")]').click()
        // fills out contact form
        // faker is a library that provides fake informatin so you don't need to hard-code it in, if you don't want to
        cy.get('#recipient-email').click().type(faker.internet.exampleEmail())
        cy.get('#recipient-name').type(faker.name.findName())
        cy.get('#message-text').type(faker.lorem.sentence())

        // clicks on the close button
        cy.xpath('(//button[contains(text(), "Close")])[1]').click()

        // verifies modal is no longer open
        cy.get('#exampleModalLabel').should('not.be.visible')

    })

    it('verifies about us modal content', () => {

        // clicks on About Us
        cy.xpath('//a[@class="nav-link" and contains(text(), "About us")]').click()

        // clicks on play button
        cy.xpath('//span[@class="vjs-control-text" and contains(text(), "Play Video")]').click({force: true})
        // cy.xpath('//div[@class="vjs-loading-spinner"]//span[contains(text(), "Play")]')

        // waits three seconds, so you can listen to glorious video content
        cy.wait(3000)

        // verifying that the video is playing
        cy.get('.vjs-has-started.vjs-playing')

        // presses pause button
        cy.xpath('//div[@class="vjs-control-bar"]//span[contains(text(), "Pause")]').click({force: true})

        // closes the modal
        // we use a realClick here, instead of a force:true, to simulate a real user clicking the close button
        cy.xpath('(//button[contains(text(), "Close")])[1]').realClick()

        // verifies about us modal disappears
        cy.get('#videoModalLabel').should('not.be.visible')

    })


    it('verifies log in modal content', () => {

        // clicks on the log in nav option
        cy.get('#login2').click()

        // verifies text username and password are visible
        cy.xpath('(//label[contains(text(), "Username:")])[2]')
        cy.xpath('(//label[contains(text(), "Password:")])[2]')

        // fills out contact form
        cy.get('#loginusername').type(faker.internet.userName())
        cy.get('#loginpassword').type(faker.internet.password())

        // clicks on the close button
        cy.xpath('(//button[contains(text(), "Close")])[3]').click()

        // verifies modal is no longer open
        cy.get('[for="log-name"]').should('not.be.visible')

    })

    it('verifies sign up modal content', () => {

        // clicks on the sign up nav option
        cy.get('#signin2').click()

        // verifies text username and password are visible
        cy.get('[for="sign-username"]')
        cy.get('[for="sign-password"]')

        // fills out contact form
        cy.get('#sign-username').type(faker.internet.userName())
        cy.get('#sign-password').type(faker.internet.password())

        // clicks on the close button
        cy.xpath('(//button[contains(text(), "Close")])[2]').click()

        // verifies modal is no longer open
        cy.get('#signInModalLabel').should('not.be.visible')

    })

})
