

let tpmsArr = [
    { "name": "h-tpms_alpha-id", "default": "", "min": 1, "type": "int", "max": 10000 },
    { "name": "h-tpms_alpha-status", "default": "Unresponsive", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_alpha-received_time", "type": "timestamp", "tsformat": "default" },
    { "name": "h-tpms_alpha-selector", "type": "int", "min": 1, "max": 10000, "default": 1 },
    { "name": "h-tpms_alpha-name", "default": "Alpha TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_alpha-display_name", "default": "A TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_alpha-num_sensors", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "h-tpms_alpha-tpms_measures", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_beta-id", "default": "", "min": 1, "type": "int", "max": 10000000000 },
    { "name": "h-tpms_beta-status", "default": "Offline", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_beta-received_time", "type": "timestamp", "tsformat": "default" },
    { "name": "h-tpms_beta-selector", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "h-tpms_beta-name", "default": "Beta TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_beta-display_name", "default": "Beta TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-tpms_beta-num_sensors", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "h-tpms_beta-tpms_beta_measure", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_alpha-id", "default": "", "min": 1, "type": "int", "max": 10000 },
    { "name": "s-tpms_alpha-status", "default": "Unresponsive", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_alpha-received_time", "type": "timestamp", "tsformat": "default" },
    { "name": "s-tpms_alpha-selector", "type": "int", "min": 1, "max": 10000, "default": 1 },
    { "name": "s-tpms_alpha-name", "default": "Alpha TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_alpha-display_name", "default": "A TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_alpha-num_sensors", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "s-tpms_alpha-tpms_measures", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_beta-id", "default": "", "min": 1, "type": "int", "max": 100000 },
    { "name": "s-tpms_beta-status", "default": "Offline", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_beta-received_time", "type": "timestamp", "tsformat": "default" },
    { "name": "s-tpms_beta-selector", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "s-tpms_beta-name", "default": "Beta TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_beta-display_name", "default": "Beta TPMS", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-tpms_beta-num_sensors", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "s-tpms_beta-tpms_beta_measure", "min": 0, "static": false, "type": "string", "max": 24 }

]