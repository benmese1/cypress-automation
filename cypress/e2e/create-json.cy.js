// import data from '../fixtures/data-example.json'
import {dataCreation} from '../support/factory/main.js'
import {additionalDataCreation} from '../support/factory/main.js'

describe('writing data to json file', () => {
    let fileName = 'dataTest.json';

    before(() => {
        dataCreation(fileName);
        // additionalDataCreation(fileName)
      })
    

    it('writes data to JSON file', () => {
        // cy.createJSON('iot.json', fileName);
    })


})