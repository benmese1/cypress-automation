// import data from '../fixtures/data-example.json'
import {randomDataCreation} from '../support/factory/main.js';
import {specificDataCreation} from '../support/factory/main.js';

describe('writing data to json file', () => {
    let fileName = 'dataTest.json';
    let count = 5;
    let specificDatatArr = ['chassis.chassisArr', 'generalArr', 'tempArr'];

    before(() => {
        // randomDataCreation(fileName, count);
        specificDataCreation(fileName, specificDatatArr);

      })
    

    it('writes data to JSON file', () => {
        // cy.createJSON('iot.json', fileName);
    })


})