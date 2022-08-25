const faker = require("faker")
import './types/util'

const words = ["int", "string", "byte"]
const randomNumber = faker.datatype.number({ 'min': 0, 'max': words.length - 1 });
let randomWord = words[randomNumber];

let randomData = {
    "name": faker.name.firstName(),
    "topic": "iot_device/topic",
    "payload": []
}

let randomPayload = [{
    "name": faker.random.alpha(5) + '-latitude',
    "static": false,
    "type": "location",
    "lat": faker.address.latitude(),
    "long": faker.address.longitude(),
    "radius": faker.datatype.number({ 'min': 1, 'max': 1000000 }
    )
},
{
    "name": faker.random.alpha(5),
    "static": false,
    "type": randomWord,
    "min": 1,
    "max": 100000,
    "default": 1
}
]

// JSON.stringify flattens the data into one line in a format that the data simulator can accept. 
// However, the simulator can only accept one object per data file. So, for right now we will need
// to add additional payload, and keep the data file to one object. Once an api is built (Krishna
// said it is in progress) we can start pushing data directly up to an api. 

// the file sample_build.json represents real client data, we just don't know what all of the fields 
// are, exactly. We are building out some of the files now into different data types (per their names)
// and plan on being able to specify so many of one type or another and randomly grabbing so many items 
// from each file. Also, we want to be able to specify if we want specific items from each file. 
export function dataCreation(data) {
    const randomNumber = faker.datatype.number({ 'min': 0, 'max': randomPayload.length});
    let nums = randomPayload[randomNumber];

    if(data.random === true){
        // for (let i = 1; i <= data.count; i++) { randomData.payload.push(nums) }
        for (let i = 1; i <= data.count; i++) { chassisArr[chassisItems].push(randomData.payload) }
        cy.writeFile('cypress/data/files/' + fileName, randomData)
    }


    for (let i = 1; i <= p; i++) {
        randomData.payload.push(nums)
    }

    // cy.writeFile('cypress/data/files/' + fileName, randomData)

}



