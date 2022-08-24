

let id = [
{"name":"h-g-m-f-id","type":"int","min":1,"max":100,"default":1}
]

let status = [
{"name":"h-g-m-f-status","min":0,"static":false,"type":"string","max":8}
]

let timestamp = [
{"name":"h-g-m-f-received_time_stamp","type":"timestamp","tsformat":"default"}
]

let selector = [
{"name":"h-g-m-f-selector","min":0,"static":false,"type":"string","max":24}
]

let name = [
{"name":"h-g-m-f-name","default":"General Report Data","min":0,"static":false,"type":"string","max":24}
]

let display_name = [
{"name":"h-g-m-f-display_name","default":"General TLV","min":0,"static":false,"type":"string","max":24}
]

let gpsstatus_index = [
{"name":"h-g-m-f-gpsstatus_index","type":"int","min":1,"max":100,"default":1}
]

let num_satellites = [
{"name":"h-g-m-f-num_satellites","type":"int","min":1,"max":1000000000,"default":100}
]

let hdop = [
{"name":"h-g-m-f-hdop","type":"int","min":1,"max":1000000000,"default":10000000}
]

let external_power_volts = [
{"name":"h-g-m-f-external_power_volts","type":"float","min":1,"max":23,"precision":1}
]

let internal_power_volts = [
{"name":"h-g-m-f-internal_power_volts","type":"float","min":1,"max":20,"precision":2}
]

let odometer_kms = [
{"name":"h-g-m-f-odometer_kms","type":"float","min":1,"max":5000000,"precision":1}
]

let latitude = [
{"name":"h-g-m-f-latitude", "type":"location","lat":39.943436,"long":-74.915885,"radius":1000000}
]

let altitude_feet = [
{"name":"h-g-m-f-altitude_feet","type":"int","min":1,"max":1000000000000,"default":1000000000}
]

let speed_kms = [
{"name":"h-g-m-f-speed_kms","type":"int","min":1,"max":1000000,"default":0}
]

let heading = [
{"name":"h-g-m-f-heading","type":"int","min":1,"max":1000,"default":100}
]

let rssi = [
{"name":"h-g-m-f-rssi","type":"int","min":1,"max":1000,"default":100}
] 

let gps_time = [
{"name":"h-g-m-f-gps_time","type":"timestamp","tsformat":"default"}
]

let power = [
{"name":"h-g-m-f-power","default":"external","min":0,"static":false,"type":"string","max":24}
]

let trip = [
{"name":"h-g-m-f-trip","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let ignition = [
{"name":"h-g-m-f-ignition","min":0,"static":false,"type":"string","max":24}
]

let motion = [
{"name":"h-g-m-f-motion","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let shipping_mode = [
{"name":"h-g-m-f-shipping_mode","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let vib_trip = [
{"name":"h-g-m-f-vib_trip","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let charger = [
{"name":"h-g-m-f-charger","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let tamper = [
{"name":"h-g-m-f-tamper","default":"Off","min":0,"static":false,"type":"string","max":24}
]

let odometer_field = [
{"name":"h-g-m-f-odometer_field","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let status_field = [
{"name":"h-g-m-f-status_field","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let ext_int_power = [
{"name":"h-g-m-f-ext_int_power","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let gps_field = [
{"name":"h-g-m-f-gps_field","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let altitude_field = [
{"name":"h-g-m-f-altitude_field","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let speedheading_field = [
{"name":"h-g-m-f-speedheading_field","default":"enabled","min":0,"static":false,"type":"string","max":24}
]

let speed_miles = [
{"name":"h-g-m-f-speed_miles","type":"int","min":1,"max":100,"default":0}
]
