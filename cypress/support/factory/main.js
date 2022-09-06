const faker = require("faker");
const chassis = require('./types/chassis');
const general = require('./types/general');
const gmf = require('./types/gmf');
const random = require('./types/random');
const reportHeader = require('./types/report-header');
const temp = require('./types/temperature');
const tpms = require('./types/tpms')
const voltage = require('./types/voltage')

let dataTypes = [chassis.chassisArr, 
                general.generalArr, 
                gmf.gmfArr, 
                random.randomArr, 
                reportHeader.reportHeaderArr, 
                temp.tempArr,
                tpms.tpmsArr, 
                voltage.voltageArr];


// let random_index = Math.floor(Math.random() * dataTypes.length);

let randomData = {
    "name": faker.name.firstName(),
    "topic": "iot_device/topic",
    "payload": []
};

// need to stringify the data in the payload'

// for loop pushes same object data.count amount of times. Occasionally fails as well. Might be a race condition. 
// forEach loop works as intended, and pulls entire array of objects into payload. 

export function dataCreation(fileName, data) {

    for (let i = 0; i < data.count; i++) {

        // randomData.payload.push(JSON.stringify(randomDataCall(), null, '/[^\w\s]/gi,'));
        randomData.payload.push(JSON.stringify(randomDataCall()));

    }

    // DTrandom.forEach((dt) => {
    //         randomData.payload.push(dt);
    //       })

    cy.writeFile('cypress/data/files/' + fileName, randomData);

}

function randomDataCall() {

    let dataTypeCount = faker.datatype.number({ 'min': 0, 'max': dataTypes.length - 1 });
    let DTrandom = dataTypes[dataTypeCount];

    return DTrandom[dataTypeCount];
}



