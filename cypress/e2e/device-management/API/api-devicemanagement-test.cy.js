// Dummy API test
/// <reference types="cypress" />

context('Token generate Requests', () => {
 // the URI will be added to line #6
  beforeEach(() => {
    cy.request('')
  })

  // Manage HTTP requests in your app

  it('cy.request() - make an API request to find Token', () => {
    // https://on.cypress.io/request
    // Method will be added to line #14 with the URI
    cy.request('POST','')
      .should((response) => {
        expect(response.status).to.eq()
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
         expect(response.body).to.have.property('')
      })
  })
    
})
