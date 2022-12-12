const faker = require('faker');
const chassis = require('./types/chassis');
const general = require('./types/general');
const gmf = require('./types/gmf');
const random = require('./types/random');
const reportHeader = require('./types/report-header');
const temp = require('./types/temp');
const tpms = require('./types/tpms');
const voltage = require('./types/voltage');

let dataTypes = [
	chassis.chassisArr,
	general.generalArr,
	gmf.gmfArr,
	random.randomArr,
	reportHeader.reportHeaderArr,
	temp.tempArr,
	tpms.tpmsArr,
	voltage.voltageArr,
];

let randomData = {
	name: faker.name.firstName(),
	topic: 'iot_device/topic',
	payload: [],
};

export function randomDataCreation(fileName, count) {
	for (let i = 0; i < count; i++) {
		randomData.payload.push(randomDataCall());
	}
	cy.writeFile('cypress/data/files/' + fileName, randomData);
}

export function specificDataCreation(fileName, arr) {
	arr.forEach((arrs) => {
		randomData.payload.push(getDataTypes(arrs));
	});

	cy.writeFile('cypress/data/files/' + fileName, randomData);
}

const getDataTypes = (DT) => {
	const types = {
		chassis: chassis.chassisArr,
		general: general.generalArr,
		gmf: gmf.gmfArr,
		ramdom: random.randomArr,
		reportHeader: reportHeader.reportHeaderArr,
		temp: temp.tempArr,
		voltage: voltage.voltageArr,
	};

	return types[DT] ?? 'unknown data type';
};

// still need to work on printing out the objects in randomData payload on one line (for each object)
function randomDataCall() {
	let dataTypeCount = Math.floor(Math.random() * dataTypes.length);

	let DTresponse = dataTypes[dataTypeCount];

	let DTinnerResponse = Math.floor(Math.random() * DTresponse.length);

	let DTdata = DTresponse[DTinnerResponse];

	let stringData = JSON.stringify(DTdata);

	// let jsonString = stringData.replace(/[^a-zA-Z0-9-_:, ]/g, '');

	// var output = '';
	// for (var property in DTdata) {
	//   output += property + ':' + DTdata[property]+'; ';
	// }

	return DTdata;
}

function replacer(key, value) {
	return value.replace(/[^\w\s]/gi, '');
}
