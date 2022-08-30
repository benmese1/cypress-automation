// import data from '../fixtures/data-example.json'
import {dataCreation} from '../support/factory/main.js'

describe('writing data to json file', () => {
    let fileName = 'dataTest.json';

    let dataObject = {
        "random": true,
        "count": 15,
        "name": "name",
        "topic": "iot_device/topic",
        "payload": [{name:'random'}]
    }

    before(() => {
        dataCreation(fileName, dataObject);
        // cy.createJSON(fileName)
      })
    

    it('writes data to JSON file', () => {
        // cy.createJSON('iot.json', fileName);
    })


})