

let device_id = [
{"name":"h-report_header-device_id","min":0,"static":false,"type":"string","max":24}
]

let sequence = [
{"name":"h-report_header-sequence","type":"int","min":1,"max":10000,"default":100}
]

let acknowledge = [
{"name":"h-report_header-acknowledge","type":"bool"}
]

let event_id = [
{"name":"h-report_header-event_id","type":"int","min":1,"max":1000,"default":100}
]

let r_t_i_str = [
{"name":"h-report_header-r_t_i_str","type":"timestamp","tsformat":"default"}
]

let r_t_i_year = [
{"name":"h-report_header-r_t_i-year","type":"int","min":1,"max":2030,"default":2022}
]

let r_t_i_month = [
{"name":"h-report_header-r_t_i-month","type":"int","min":1,"max":12}
]

let r_t_i_day = [
{"name":"h-report_header-r_t_i-day","type":"int","min":1,"max":31}
]

let r_t_i_hour = [
{"name":"h-report_header-r_t_i-hour","type":"int","min":0,"max":23}
]

let r_t_i_minute = [
{"name":"h-report_header-r_t_i-minutes","type":"int","min":0,"max":59}
]

let r_t_i_seconds = [
{"name":"h-report_header-r_t_i-seconds","type":"int","min":0,"max":59}
]

let ack_n = [
{"name":"h-report_header-ack_n","type":"int","min":0,"max":1}
]