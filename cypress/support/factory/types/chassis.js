

export let chassisArr = [
    { "name": "h-chassis-id", "default": "", "min": 1, "type": "int", "max": 10000000000 },
    { "name": "h-chassis-status", "default": "null", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-chassis-received_time_stamp", "type": "timestamp", "tsformat": "default" },
    { "name": "h-chassis-selector", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "h-chassis-name", "default": "Chassis", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-chassis-display_name", "default": "Chassis/Cargo Sensor", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-chassis-condition", "default": "Sensor Fault", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-chassis-cargo_state", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "h-chassis-dist_mm", "type": "int", "min": 1, "max": 10, "default": 1 },
    { "name": "h-chassis-age_seconds", "type": "int", "min": 1, "max": 100, "default": 1 },
    { "name": "h-chassis-code1", "type": "int", "min": 1, "max": 1000, "default": 255 },
    { "name": "h-chassis-code2", "type": "int", "min": 1, "max": 1000, "default": 255 },
    { "name": "h-chassis-cargo_state_tmc", "default": "Empty", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-chassis-id", "default": "", "min": 1, "type": "int", "max": 100000 },
    { "name": "s-chassis-status", "default": "null", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-chassis-received_time_stamp", "type": "timestamp", "tsformat": "default" },
    { "name": "s-chassis-selector", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "s-chassis-name", "default": "Chassis", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-chassis-display_name", "default": "Chassis/Cargo Sensor", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-chassis-condition", "default": "Sensor Fault", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-chassis-cargo_state", "min": 1, "static": false, "type": "string", "max": 12 },
    { "name": "s-chassis-dist_mm", "type": "int", "min": 1, "max": 10, "default": 1 },
    { "name": "s-chassis-age_seconds", "type": "int", "min": 1, "max": 100, "default": 1 },
    { "name": "s-chassis-code1", "type": "int", "min": 1, "max": 1000, "default": 255 },
    { "name": "s-chassis-code2", "type": "int", "min": 1, "max": 1000, "default": 255 },
    { "name": "s-chassis-cargo_state_tmc", "default": "Empty", "min": 5, "static": false, "type": "string", "max": 24 },
];

let chassisItems = chassisArr[Math.floor(Math.random() * chassisArr.length)];