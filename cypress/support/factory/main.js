const faker = require("faker")

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

// still need a "Rosetta Stone" of payload explanations so we can mock them out and then create 
// the different data types we might need. 
export function dataCreation(fileName, p = 1) {
    const randomNumber = faker.datatype.number({ 'min': 0, 'max': randomPayload.length - 1 });
    let nums = randomPayload[randomNumber];

    for (let i = 1; i <= p + 1; i++) {
        randomData.payload.push[randomPayload[0]]
    }

    cy.log(randomPayload[0])
    // writeToFile(fileName);

    // cy.writeFile('cypress/data/files/' + fileName, JSON.stringify(randomData))
    cy.writeFile('cypress/data/files/' + fileName, randomData)

}

function writeToFile (fileName) {
    cy.writeFile('cypress/data/files/' + fileName, randomData)
}


