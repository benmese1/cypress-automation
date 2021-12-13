/// <reference types="cypress" />

describe('UI test verification on homepage', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseurl'))
    })

    it('verifies category nav content', () => {

        // verifies content of categories nav bar on left hand side of screen
        cy.get('[class="list-group-item"]').should(($lgi) => {
            // verifies # of elements found
            expect($lgi).to.have.length(4)
            // verifies content of element
            expect($lgi.first()).to.contain('CATEGORIES')
            expect($lgi.next()).to.contain('Phones')
            expect($lgi.next()).to.contain('Laptops')
            expect($lgi.last()).to.contain('Monitors')

        })

    })

    it('verifies homepage content when category nav items are clicked on', () => {

        // clicks on Phones nav option
        cy.xpath('//*[contains(text(), "Phones")]').click()

        // verifies that phones appear on the homepage
        cy.get('[class="col-lg-4 col-md-6 mb-4"]').should(($phones) => {
            // verifies content of elements
            expect($phones.first()).to.contain('Samsung galaxy s6')
            expect($phones.next()).to.contain('Nokia lumia 1520')
            expect($phones.next()).to.contain('Nexus 6')
        })

        // clicks on laptops nav option
        cy.xpath('//*[contains(text(), "Laptops")]').click()

        // verifies that laptops appear on the homepage
        cy.get('[class="col-lg-4 col-md-6 mb-4"]').should(($laptops) => {
            // verifies content of elements
            expect($laptops.first()).to.contain('Sony vaio i5')
            expect($laptops.next()).to.contain('Sony vaio i7')
            expect($laptops.next()).to.contain('MacBook air')
        })

        // clicks on monitors nav option
        cy.xpath('//*[contains(text(), "Monitors")]').click()

        // verifies that monitors appear on the homepage
        cy.get('[class="col-lg-4 col-md-6 mb-4"]').should(($monitors) => {
            // verifies content of elements
            expect($monitors.first()).to.contain('Apple monitor 24')
            expect($monitors.next()).to.contain('ASUS Full HD')
        })

    })



})
