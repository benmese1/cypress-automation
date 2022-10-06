

export let generalArr = [
    { "name": "h-general-server_ip", "default": "172.31.34.14", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-general-device_ip", "default": "172.31.34.14", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-general-device_port", "type": "int", "min": 1, "max": 10000, "default": 1 },
    { "name": "h-general-server_port", "type": "int", "min": 1, "max": 10000, "default": 1 },
    { "name": "h-general-rawreport", "min": 0, "static": false, "type": "string", "max": 300 },
    { "name": "h-general-uuid", "min": 0, "static": false, "type": "string", "max": 36 },
    { "name": "h-general-company_id", "min": 0, "static": false, "type": "string", "max": 16 },
    { "name": "h-general-device_type", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-general-c_s_n", "type": "int", "min": 1, "max": 100000, "default": 1 },
    { "name": "h-general-d_s_n", "type": "int", "min": 1, "max": 100000, "default": 1 },
    { "name": "h-general-old_record_id", "type": "int", "min": 1, "max": 1000, "default": 1 },
    { "name": "h-general-recieved_time_stamp", "type": "timestamp", "tsformat": "default" },
    { "name": "s-general-server_ip", "default": "172.31.34.14", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-general-device_ip", "default": "172.31.34.14", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-general-device_port", "type": "int", "min": 1, "max": 10000000, "default": 100 },
    { "name": "s-general-server_port", "type": "int", "min": 1, "max": 10000000, "default": 100 },
    { "name": "s-general-rawreport", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "s-general-uuid", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "s-general-company_id", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "s-general-device_type", "default": "freight-l", "min": 0, "static": false, "type": "string", "max": 12 },
    { "name": "s-general-customer_seq_number", "type": "int", "min": 1, "max": 100000, "default": 100 },
    { "name": "s-general-device_seq_number", "type": "int", "min": 1, "max": 100000, "default": 100 },
    { "name": "s-general-old_record_id", "type": "int", "min": 1, "max": 1000, "default": 1 }
];