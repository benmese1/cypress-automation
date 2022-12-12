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

let dataJSON = {
	// is the id of the organization. Get from DB
	customer_orgs_id: ObjectId('6360e41ae6a755784674543d'),
	name: 'CFQU119342',
	category: 'Container',
	// UTC date ISO date
	added_date: ISODate('2022-11-01T15:44:11.218+0000'),
	added_by: 'knandanoor',
	vin: 'NA',
	license_plate: NumberInt(-1),
	license_state: 'KY',
	length: NumberInt(-1),
	height: NumberInt(-1),
	num_of_axles: NumberInt(-1),
	wheel_config: 'NA',
	door_type: 'NA',
	tags: 'Asset_Id:CFQU119342',
	asset_group: 'COFC Logistics',
	trip_st: 'Parked',
	prd_cde: 'NA',
	dwell_t: NumberInt(-1),
	last_gps_t: ISODate('2022-10-26T08:22:00.000+0000'),
	lst_evnt_t: ISODate('2022-10-26T08:22:00.000+0000'),
	imei: NumberLong(15115004699681),
	make: 'na',
	odo: NumberInt(0),
	ext_v: NumberInt(0),
	batt_v: 4.1,
	location: {
		type: 'Point',
		coordinates: [-84.37117, 33.7031],
	},
	city: 'Atlanta',
	state: 'Georgia',
};
