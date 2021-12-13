/// <reference types="cypress" />

describe('a quick api request ', () => {
  
    it('verifies randomly selected content on home-page', () => {
      cy.request({
        method: 'GET',
        url: 'https://api.demoblaze.com/entries'
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.Items[2].desc).to.equal('The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.')
        expect(response.body.Items[6].desc).to.equal('The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 \nprocessor and it comes with 3GB of RAM. The phone packs 32GB of internal\n storage that can be expanded up to 128GB via a microSD card. ')
      })
    })
  
  })
  