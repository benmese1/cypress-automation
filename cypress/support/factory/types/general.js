

let server_ip = [
{"name":"h-general-server_ip", "default":"172.31.34.14", "min":0, "static":false, "type":"string", "max":24}
]

let device_ip = [
{"name":"h-general-device_ip","default":"172.31.34.14","min":0,"static":false,"type":"string","max":24}
]

let device_port = [
{"name":"h-general-device_port","type":"int","min":1,"max":10000,"default":1}
]

let server_port = [
{"name":"h-general-server_port","type":"int","min":1,"max":10000,"default":1}
]

let rawreport = [
{"name":"h-general-rawreport","min":0,"static":false,"type":"string","max":300}
]

let uuid = [
{"name":"h-general-uuid","min":0,"static":false,"type":"string","max":36}
]

let company_id = [
{"name":"h-general-company_id","min":0,"static":false,"type":"string","max":16}
]

let device_type = [
{"name":"h-general-device_type","min":0,"static":false,"type":"string","max":24}
]

let c_s_n = [
{"name":"h-general-c_s_n","type":"int","min":1,"max":100000,"default":1}
]

let d_s_n = [
{"name":"h-general-d_s_n","type":"int","min":1,"max":100000,"default":1}
]

let old_record_id = [
{"name":"h-general-old_record_id","type":"int","min":1,"max":1000,"default":1}
]

let recieved_time_stamp = [
{"name":"h-general-recieved_time_stamp","type":"timestamp","tsformat":"default"}
]