import data from '../fixtures/data-example.json'
import {dataCreation} from '../support/data-factory'

describe('writing data to json file', () => {
    let fileName = 'dataTest.json';

    before(() => {
        dataCreation(fileName);
      })
    

    it('writes data to JSON file', () => {
        // cy.createJSON('iot.json', fileName);
    })


})