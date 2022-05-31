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
        {'key': 'space_metric', 'length': 1, 'converter': helpers.dim_to_bool},
        {'key': 'weight', 'length': 7, 'converter': helpers.extract_measure},
        {'key': 'dim_weight', 'length': 7, 'converter': helpers.extract_measure},
        {'key': 'weight_metric', 'length': 1, 'converter': helpers.dim_to_bool},
        {'key': 'factor', 'length': 5, 'converter': helpers.extract_factor},
        {'key': 'intl_unit', 'length': 1, 'converter': helpers.dom_intl_to_bool},
    ];

    static NEG_MEASURE = [
        {'key': 'origin', 'length': 1, 'converter': helpers.decode},
        {'key': 'error', 'length': 1, 'converter': helpers.get_error},
    ];

    static DIM_CALIBRATION = [
        {'key': 'identifier', 'length': 2, 'converter': Number},
    ];

    static WEIGHT_CALIBRATION = [
        {'key': 'identifier', 'length': 2, 'converter': Number},
    ];

    static TEST = [
        {'key': 'identifier', 'length': 2, 'converter': Number},
    ];

    static REPORT_UNITS = [
        {'key': 'space_metric', 'length': 1, 'converter': helpers.dim_to_bool},
        {'key': 'weight_metric', 'length': 1, 'converter': helpers.dim_to_bool},
        {'key': 'intl_unit', 'length': 1, 'converter': helpers.dom_intl_to_bool},
        {'key': 'factor', 'length': 4, 'converter': Number},
        {'key': 'location', 'length': 6, 'converter': helpers.decode},
    ];
}