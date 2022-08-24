

let id = [
{"name":"h-chassis-id","default":"","min":1,"type":"int","max":10000000000}
]

let status = [
{"name":"h-chassis-status","default":"null","min":0,"static":false,"type":"string","max":24}
]

let received_time_stamp = [
{"name":"h-chassis-received_time_stamp","type":"timestamp","tsformat":"default"}
]

let selector = [
{"name":"h-chassis-selector","min":0,"static":false,"type":"string","max":12}
]

let name = [
{"name":"h-chassis-name","default":"Chassis","min":0,"static":false,"type":"string","max":24}
]

let display_name = [
{"name":"h-chassis-display_name","default":"Chassis/Cargo Sensor","min":0,"static":false,"type":"string","max":24}
]

let condition = [
{"name":"h-chassis-condition","default":"Sensor Fault","min":0,"static":false,"type":"string","max":24}
]

let cargo_state= [
{"name":"h-chassis-cargo_state","min":0,"static":false,"type":"string","max":12}
]

let dist_mm = [
{"name":"h-chassis-dist_mm","type":"int","min":1,"max":10,"default":1}
]

let age_seconds = [
{"name":"h-chassis-age_seconds","type":"int","min":1,"max":100,"default":1}
]

let code1 = [
{"name":"h-chassis-code1","type":"int","min":1,"max":1000,"default":255}
]

let code2 = [
{"name":"h-chassis-code2","type":"int","min":1,"max":1000,"default":255}
]

let cargo_state_tmc = [
{"name":"h-chassis-cargo_state_tmc","default":"Empty","min":0,"static":false,"type":"string","max":24}
]