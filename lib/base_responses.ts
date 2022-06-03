import {helpers} from './helpers';

export class base_responses {
    static PREFIX = [
        {'key': 'start', 'length': 1, 'converter': null},
        {'key': 'command', 'length': 1, 'converter': helpers.decode},
        {'key': 'acknowledge', 'length': 1, 'converter': helpers.ack_to_bool},
    ];

    static SUFIX = [
        {'key': 'end', 'length': 1, 'converter': null},
        {'key': 'cr', 'length': 1, 'converter': null},
        {'key': 'lf', 'length': 1, 'converter': null},
    ];

    static MEASURE = [
        {'key': 'origin', 'length': 1, 'converter': helpers.decode},
        {'key': 'location', 'length': 6, 'converter': helpers.decode},
        {'key': 'Length', 'length': 6, 'converter': helpers.extract_measure},
        {'key': 'width', 'length': 6, 'converter': helpers.extract_measure},
        {'key': 'height', 'length': 6, 'converter': helpers.extract_measure},
        {'key': 'dim_unit', 'length': 1, 'converter': helpers.extract_dim_unit},
        {'key': 'weight', 'length': 7, 'converter': helpers.extract_measure},
        {'key': 'dim_weight', 'length': 7, 'converter': helpers.extract_measure},
        {'key': 'weight_unit', 'length':1, 'converter': helpers.extract_weight_unit},
        {'key': 'factor', 'length': 5, 'converter': helpers.extract_factor},
        {'key': 'intl_unit', 'length': 1, 'converter': helpers.dom_intl_to_bool},
    ];

    static NEG_MEASURE = [
        {'key': 'origin', 'length': 1, 'converter': helpers.decode},
        {'key': 'error', 'length': 1, 'converter': helpers.get_error},
    ];

    static DIM_CALIBRATION = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static WEIGHT_CALIBRATION = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static TEST = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static REPORT_UNITS = [
        {'key': 'dim_unit', 'length': 1, 'converter': helpers.extract_dim_unit},
        {'key': 'weight_unit', 'length':1, 'converter': helpers.extract_weight_unit},
        {'key': 'intl_unit', 'length': 1, 'converter': helpers.dom_intl_to_bool},
        {'key': 'factor', 'length': 4, 'converter': helpers.extract_factor},
        {'key': 'location', 'length': 6, 'converter': helpers.decode},
    ];

    static VALUES = [
        {'key': 'length_1_dbw', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_2_dbw', 'length': 4, 'converter': helpers.decode},
        {'key': 'width_dbw', 'length': 4, 'converter': helpers.decode},
        {'key': 'height_dbw', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_1_cpi', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_2_cpi', 'length': 4, 'converter': helpers.decode},
        {'key': 'width_cpi', 'length': 4, 'converter': helpers.decode},
        {'key': 'height_cpi', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_1_blanking', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_2_blanking', 'length': 4, 'converter': helpers.decode},
        {'key': 'width_blanking', 'length': 4, 'converter': helpers.decode},
        {'key': 'height_blanking', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_1_gain', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_2_gain', 'length': 4, 'converter': helpers.decode},
        {'key': 'width_gain', 'length': 4, 'converter': helpers.decode},
        {'key': 'height_gain', 'length': 4, 'converter': helpers.decode},
        {'key': 'length_1_pulses', 'length': 2, 'converter': helpers.decode},
        {'key': 'length_2_pulses', 'length': 2, 'converter': helpers.decode},
        {'key': 'width_pulses', 'length': 2, 'converter': helpers.decode},
        {'key': 'height_pulses', 'length': 2, 'converter': helpers.decode},
        {'key': 'length_1_wait_time', 'length': 3, 'converter': helpers.decode},
        {'key': 'length_2_wait_time', 'length': 3, 'converter': helpers.decode},
        {'key': 'width_wait_time', 'length': 3, 'converter': helpers.decode},
        {'key': 'height_wait_time', 'length': 3, 'converter': helpers.decode},
        {'key': 'model_number', 'length': 4, 'converter': helpers.decode},
        {'key': 'scale_capacity', 'length': 3, 'converter': helpers.decode},
        {'key': 'firmware_version', 'length': 5, 'converter': helpers.decode},
    ];
}