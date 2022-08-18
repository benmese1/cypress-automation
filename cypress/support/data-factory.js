const faker = require("faker")

const words = ["int", "string", "byte"]
const randomNumber = faker.datatype.number({ 'min': 0, 'max': words.length - 1 });
let randomWord = words[randomNumber];

let randomData = {
    "name": faker.name.firstName(),
    "topic": faker.random.alphaNumeric() + '/' +
        faker.random.alphaNumeric() + '/' +
        faker.random.alphaNumeric() + '/' +
        faker.random.alphaNumeric() + '/' +
        faker.random.word(),
    "payload": JSON.stringify([
        {"name": faker.random.alpha(5), "type": randomWord, "min": 1, "max": 100000, "default": 1}
    ])
}


//going to create random data objects, and we will then write those data objects to a file in the data folder.
//will probably have different functions for different types of objects? 
//maybe have a random option, where it will create a randomized selection of differnt data objects. 
//will probably create the randomized object first
export function dataCreation(fileName) {
    // let ranDat = JSON.stringify(randomData)
    // let unquoted = ranDat.replace(/"([^"]+)":/g, '$1:');
    let payString = JSON.stringify(randomData.payload);
    let unquoted = payString.replace(/"([^"]+)":/g, '$1:');
    randomData.payload = unquoted;

    cy.writeFile('cypress/data/files/' + fileName, randomData)
}
