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

let dataData = {"name":"Rodrick","topic":"iot_device/topic","payload":[{"name":"lazuf","type":"byte","min":1,"max":100000,"default":1}]};

let finalData = {};

// might have to pull out the payload as an array of objects, stringify that, remove "" from the ints and 
// booleans, then put it back. Nothing else has quite done it right yet, despite multiple different attempts. 

// after we flatten data properly, we will move on to creating as much of it as we want. 
export function dataCreation(fileName) {

    // finalData = randomData.assign(dataData)
    randomData = {...randomData, dataData }

      cy.writeFile('cypress/data/files/' + fileName, JSON.stringify(randomData))

}

export function additionalDataCreation(fileName) {
    cy.writeFile('cypress/data/files/' + fileName, JSON.stringify(randomData))
}



  
