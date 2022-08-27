import './types/util';
const faker = require("faker");
const chassis = require('./types/chassis');
const general = require('./types/general');
const hgmf = require('./types/h-g-m-f');
const temp = require('./types/temperature');
const reportHeader = require('./types/report-header');

let dataTypes = [chassis.chassisArr, general.generalArr, hgmf.hgmfArr, reportHeader.reportHeaderArr, temp.tempArr];
let dataTypeCount = faker.datatype.number({'min':0, 'max': dataTypes.length});
let DTrandom = dataTypes[dataTypeCount];

let random_index = Math.floor(Math.random() * dataTypes.length);

let randomData = {
    "name": faker.name.firstName(),
    "topic": "iot_device/topic",
    "payload": []
};

// need to stringify the data in the payload

// for loop pushes same object data.count amount of times. Occasionally fails as well. Might be a race condition. 
// forEach loop works as intended, and pulls entire array of objects into payload. 

function randomDataCall () {
    return DTrandom[dataTypeCount];
}

export function dataCreation(fileName, data) {

    for(let i=0; i<data.count; i++){
        
        randomData.payload.push(randomDataCall());
    }

    // DTrandom.forEach((dt) => {
    //         randomData.payload.push(dt);
    //       })

    cy.writeFile('cypress/data/files/' + fileName, randomData);

}



