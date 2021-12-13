/// <reference types="cypress" />

describe('a quick api request ', () => {

    // this test does a quick api verification of the request url
  
    it('makes a basic XHR request', () => {
      cy.request('https://www.demoblaze.com/config.json')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('API_URL').equal('https://api.demoblaze.com')
          expect(response.body).to.have.property('HLS_URL').equal('https://hls.demoblaze.com')
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  
  })
  