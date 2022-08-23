const faker = require("faker")

const words = ["int", "string", "byte"]
const randomNumber = faker.datatype.number({ 'min': 0, 'max': words.length - 1 });
let randomWord = words[randomNumber];

let randomData = {
    "name": faker.name.firstName(),
    "topic": "iot_device/topic",
    "payload": [
        ({"name": faker.random.alpha(5), "type": randomWord, "min": 1, "max": 100000, "default": 1})
    ]
}

let randomPayload = {"name":"h-g-m-f-latitude", "type":"location",
                     "lat":39.943436,"long":-74.915885,"radius":1000000}

// JSON.stringify flattens the data into one line in a format that the data simulator can accept. 
// However, the simulator can only accept one object per data file. So, for right now we will need
// to add additional payload, and keep the data file to one object. Once an api is built (Krishna
// said it is in progress) we can start pushing data directly up to an api. 

// still need a "Rosetta Stone" of payload explanations so we can mock them out and then create 
// the different data types we might need. 
export function dataCreation(fileName) {

      cy.writeFile('cypress/data/files/' + fileName, JSON.stringify(randomData))

}


  
