

export let tempArr = [
    { "name": "h-temperature-id", "type": "int", "min": 1, "max": 1000000000, "default": 100 },
    { "name": "h-temperature-status", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-r_time_stamp", "type": "timestamp", "tsformat": "default" },
    { "name": "h-temperature-selector", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-name", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-display_name", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-temperature-ambient_temp", "type": "float", "min": 1, "max": 200, "precision": 2 },
    { "name": "h-temperature-internal_temp", "type": "float", "min": 1, "max": 200, "precision": 2 }
]