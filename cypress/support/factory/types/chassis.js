


let chassisArr = [{
    id: {"name":"h-chassis-id","default":"","min":1,"type":"int","max":10000000000},
    chassis_status: {"name":"h-chassis-status","default":"null","min":0,"static":false,"type":"string","max":24},
    received_time_stamp: {"name":"h-chassis-received_time_stamp","type":"timestamp","tsformat":"default"},
    selector: {"name":"h-chassis-selector","min":0,"static":false,"type":"string","max":12},
    chassis_name: {"name":"h-chassis-name","default":"Chassis","min":0,"static":false,"type":"string","max":24},
    display_name: {"name":"h-chassis-display_name","default":"Chassis/Cargo Sensor","min":0,"static":false,"type":"string","max":24},
    condition: {"name":"h-chassis-condition","default":"Sensor Fault","min":0,"static":false,"type":"string","max":24},
    cargo_stat: {"name":"h-chassis-cargo_state","min":0,"static":false,"type":"string","max":12},
    dist_mm: {"name":"h-chassis-dist_mm","type":"int","min":1,"max":10,"default":1},
    age_seconds: {"name":"h-chassis-age_seconds","type":"int","min":1,"max":100,"default":1},
    code1: {"name":"h-chassis-code1","type":"int","min":1,"max":1000,"default":255},
    code2: {"name":"h-chassis-code2","type":"int","min":1,"max":1000,"default":255},
    cargo_state_tmc: {"name":"h-chassis-cargo_state_tmc","default":"Empty","min":0,"static":false,"type":"string","max":24}
}]

let chassisItems = chassisArr[Math.floor(Math.random() * chassisArr.length)];