/// <reference types="cypress" />

describe('UI test verification ', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseurl'))
    })

    it('verifies header content', () => {

        // verifies that the navigation brand item is present and contains the correct text
        // the text PRODUCT STORE has extra spaces in it, but displays as exptected. Bring up to team. 
        cy.xpath('//a[contains(text(), "PRODUCT STORE")]')

        // gets the navbar list and runs through it, verifying the contents
        cy.get('.navbar-nav.ml-auto > li').should(($nav) => {
            expect($nav).to.have.length(8)
            expect($nav.eq(0)).to.contain('Home')
            expect($nav.eq(1)).to.contain('Contact')
            expect($nav.eq(2)).to.contain('About us')
            expect($nav.eq(3)).to.contain('Cart')
            expect($nav.eq(4)).to.contain('Log in')
            expect($nav.eq(5)).to.contain('Log out')
            expect($nav.eq(6)).to.contain('')
            expect($nav.eq(7)).to.contain('Sign up')

        })

    })

    it('verifies navbar items work as expected', () => {
        // *********************************************************************************************
        // the about us modal is being a tad difficult to interact with. The closing of each of the modals
        // has been less than ideal. Next steps to solve those two issues would be to implement a command
        // that clicks somewhere else on the page as a way of closing the modal. I would also request a unique 
        // selector be added for the X that closes the modals
        // *********************************************************************************************
        
        // clicks on the home nav button
        cy.xpath('//a[@class="nav-link" and contains(text(), "Home ")]').click()

        // verifies that the home nav button brings you to the home page by finding the categories nav item
        cy.get('.navbar-nav.ml-auto > li')

        // clicks on the contact button
        cy.xpath('//a[@class="nav-link" and contains(text(), "Contact")]').click()

        // verifies contact modal appears
        cy.get('#exampleModalLabel')

        // closing contact modal
        cy.xpath('(//button[@class="close" and @aria-label="Close"])[1]').click()

        // // // clicks on About Us
        // cy.xpath('//a[@class="nav-link" and contains(text(), "About us")]').click({force: true})

        // // // verifies about us modal appears
        // cy.get('#videoModalLabel')

        // // // closing about us modal
        // cy.xpath('//*[@id="videoModal"]/div/div/div[1]/button/span').click({force: true})

        // clicks on cart
        cy.xpath('//a[@class="nav-link" and contains(text(), "Cart")]').click({force:true})

        // verifies cart navs you to cart page by finding purchase button.
        // you could alternatly look for the button and purchase text
        cy.get('.btn.btn-success')

        // clicks on log in 
        cy.get('#login2').click()

        // verifies log in modal appears
        cy.get('[for="log-name"]')

        // closing log in modal
        cy.xpath('(//button[@class="close" and @aria-label="Close"])[3]').click({force: true})

        // clicks on sign up
        cy.get('#signin2').click({force: true})

        // verifies sign up modal appears
        cy.get('#signInModalLabel')

        // closes sign up modal
        // cy.xpath('(//button[@class="close" and @aria-label="Close"])[2]').click()

    })

})
