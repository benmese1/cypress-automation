import stringifyObject from 'stringify-object';
import {prettyString} from '../factory/stringify'

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

// might have to pull out the payload as an array of objects, stringify that, remove "" from the ints and 
// booleans, then put it back. Nothing else has quite done it right yet, despite multiple different attempts. 

// after we flatten data properly, we will move on to creating as much of it as we want. 
export function dataCreation(fileName) {
    // var cleaned = JSON.stringify(randomData.payload, null, 2);
    // let unquoted = cleaned.replace(/"([^"]+)":/g, '$1:');
    // randomData.payload = cleaned;
    // prettyString(randomData);

    const pretty = stringifyObject(randomData, {
		indent: '  ',
		singleQuotes: false,
		inlineCharacterLimit: 1000
	});

    cy.writeFile('cypress/data/files/' + fileName, randomData)
}
