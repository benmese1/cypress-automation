

export let tempArr = [
    { "name": "h-temperature-id", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "h-temperature-status", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-r_time_stamp", "type": "timestamp", "tsformat": "default" },
    { "name": "h-temperature-selector", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-name", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-display_name", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-ambient_temp", "type": "float", "min": 1, "max": 200, "precision": 2 },
    { "name": "h-temperature-internal_temp", "type": "float", "min": 1, "max": 200, "precision": 2 },
    { "name": "s-temperature-id", "type": "int", "min": 1, "max": 10000, "default": 100 },
    { "name": "s-temperature-status", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-temperature-received_time", "type": "timestamp", "tsformat": "default" },
    { "name": "s-temperature-selector", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-temperature-name", "min": 0, "default": "Internal Gateway Temperature Sensors", "static": false, "type": "string", "max": 48 },
    { "name": "s-temperature-display_name", "min": 0, "default": "Temperature", "static": false, "type": "string", "max": 48 },
    { "name": "s-temperature-ambient_temp", "type": "int", "min": 1, "max": 100, "default": 10 },
    { "name": "s-temperature-internal_temp", "type": "int", "min": 1, "max": 100, "default": 31 }
]