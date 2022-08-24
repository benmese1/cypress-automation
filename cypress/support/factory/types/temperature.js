

let id = [
{"name":"h-temperature-id","type":"int","min":1,"max":1000000000,"default":100}
]

let status = [
{"name":"h-temperature-status","min":0,"static":false,"type":"string","max":24}
]

let r_time_stamp = [
{"name":"h-temperature-r_time_stamp","type":"timestamp","tsformat":"default"}
]

let selector = [
{"name":"h-temperature-selector","min":0,"static":false,"type":"string","max":24}
]

let name = [
{"name":"h-temperature-name","min":0,"static":false,"type":"string","max":24}
]

let display_name = [
{"name":"h-temperature-display_name","min":0,"static":false,"type":"string","max":24}
]

let ambient_temp = [
{"name":"h-temperature-ambient_temp","type":"float","min":1,"max":200,"precision":2}
]

let internal_temp = [
{"name":"h-temperature-internal_temp","type":"float","min":1,"max":200,"precision":2}
]