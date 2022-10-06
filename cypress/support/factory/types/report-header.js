

export let reportHeaderArr = [
    { "name": "h-report_header-device_id", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "h-report_header-sequence", "type": "int", "min": 1, "max": 10000, "default": 100 },
    { "name": "h-report_header-acknowledge", "type": "bool" },
    { "name": "h-report_header-event_id", "type": "int", "min": 1, "max": 1000, "default": 100 },
    { "name": "h-report_header-r_t_i_str", "type": "timestamp", "tsformat": "default" },
    { "name": "h-report_header-r_t_i-year", "type": "int", "min": 1, "max": 2030, "default": 2022 },
    { "name": "h-report_header-r_t_i-month", "type": "int", "min": 1, "max": 12 },
    { "name": "h-report_header-r_t_i-day", "type": "int", "min": 1, "max": 31 },
    { "name": "h-report_header-r_t_i-hour", "type": "int", "min": 0, "max": 23 },
    { "name": "h-report_header-r_t_i-minutes", "type": "int", "min": 0, "max": 59 },
    { "name": "h-report_header-r_t_i-seconds", "type": "int", "min": 0, "max": 59 },
    { "name": "h-report_header-ack_n", "type": "int", "min": 0, "max": 1 },
    { "name": "s-report_header-device_id", "min": 0, "static": false, "type": "string", "max": 24 },
    { "name": "s-report_header-sequence", "type": "int", "min": 1, "max": 100000, "default": 1000 },
    { "name": "s-report_header-acknowledge", "type": "bool" },
    { "name": "s-report_header-event_id", "type": "int", "min": 1, "max": 1000000, "default": 1000 },
    { "name": "s-report_header-r_t_i_str", "type": "timestamp", "tsformat": "default" },
    { "name": "s-report_header-r_t_i-year", "type": "int", "min": 1, "max": 2030, "default": 2022 },
    { "name": "s-report_header-r_t_i-month", "type": "int", "min": 1, "max": 12, "default": 6 },
    { "name": "s-report_header-r_t_i-day", "type": "int", "min": 1, "max": 31, "default": 1 },
    { "name": "s-report_header-r_t_i-hour", "type": "int", "min": 0, "max": 23, "default": 10 },
    { "name": "s-report_header-r_t_i-minutes", "type": "int", "min": 0, "max": 59, "default": 10 },
    { "name": "s-report_header-r_t_i-seconds", "type": "int", "min": 0, "max": 59, "default": 10 },
    { "name": "s-report_header-ack_n", "type": "int", "min": 0, "max": 1, "default": 1 }
];