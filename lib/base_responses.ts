import {helpers} from './helpers';

export class base_responses {
    static PREFIX: BaseResponseMap[] = [
        {'key': 'start', 'length': 1, 'converter': null},
        {'key': 'command', 'length': 1, 'converter': helpers.decode},
        {'key': 'acknowledge', 'length': 1, 'converter': helpers.ack_to_bool},
    ];

    static SUFIX: BaseResponseMap[] = [
        {'key': 'end', 'length': 1, 'converter': null},
        {'key': 'cr', 'length': 1, 'converter': null},
        {'key': 'lf', 'length': 1, 'converter': null},
    ];

    static MEASURE: BaseResponseMap[] = [
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

    static NEG_MEASURE: BaseResponseMap[] = [
        {'key': 'origin', 'length': 1, 'converter': helpers.decode},
        {'key': 'error', 'length': 1, 'converter': helpers.get_error},
    ];

    static DIM_CALIBRATION: BaseResponseMap[] = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static WEIGHT_CALIBRATION: BaseResponseMap[] = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static TEST: BaseResponseMap[] = [
        {'key': 'identifier', 'length': 2, 'converter': helpers.decode},
    ];

    static REPORT_UNITS: BaseResponseMap[] = [
        {'key': 'dim_unit', 'length': 1, 'converter': helpers.extract_dim_unit},
        {'key': 'weight_unit', 'length':1, 'converter': helpers.extract_weight_unit},
        {'key': 'intl_unit', 'length': 1, 'converter': helpers.dom_intl_to_bool},
        {'key': 'factor', 'length': 4, 'converter': helpers.extract_factor},
        {'key': 'location', 'length': 6, 'converter': helpers.decode},
    ];

    static VALUES: BaseResponseMap[] = [
        {'key': 'length_1_dbw', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_2_dbw', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'width_dbw', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'height_dbw', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_1_cpi', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_2_cpi', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'width_cpi', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'height_cpi', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_1_blanking', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_2_blanking', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'width_blanking', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'height_blanking', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_1_gain', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_2_gain', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'width_gain', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'height_gain', 'length': 4, 'converter': helpers.extract_number},
        {'key': 'length_1_pulses', 'length': 2, 'converter': helpers.extract_number},
        {'key': 'length_2_pulses', 'length': 2, 'converter': helpers.extract_number},
        {'key': 'width_pulses', 'length': 2, 'converter': helpers.extract_number},
        {'key': 'height_pulses', 'length': 2, 'converter': helpers.extract_number},
        {'key': 'length_1_wait_time', 'length': 3, 'converter': helpers.extract_number},
        {'key': 'length_2_wait_time', 'length': 3, 'converter': helpers.extract_number},
        {'key': 'width_wait_time', 'length': 3, 'converter': helpers.extract_number},
        {'key': 'height_wait_time', 'length': 3, 'converter': helpers.extract_number},
        {'key': 'model_number', 'length': 4, 'converter': helpers.decode},
        {'key': 'scale_capacity', 'length': 3, 'converter': helpers.extract_number},
        {'key': 'firmware_version', 'length': 5, 'converter': helpers.decode},
    ];
}

export interface BaseResponseMap {
    key: string;
    length: number;
    converter: (null | ((value: string) => (string | number | boolean)[]));
}

export interface BaseResponse {
    [key: string]: any;
    start?: string;
    command?: string;
    acknowledge?: boolean;
    error?: string;
    end?: string;
    cr?: string;
    lf?: string;
    origin?: string;
    location?: string;
    Length?: number;
    width?: number;
    height?: number;
    dim_unit?: string;
    weight?: number;
    dim_weight?: number;
    weight_unit?: string;
    factor?: number;
    intl_unit?: boolean;
    identifier?: string;
    length_1_dbw?: number;
    length_2_dbw?: number;
    width_dbw?: number;
    height_dbw?: number;
    length_1_cpi?: number;
    length_2_cpi?: number;
    width_cpi?: number;
    height_cpi?: number;
    length_1_blanking?: number;
    length_2_blanking?: number;
    width_blanking?: number;
    height_blanking?: number;
    length_1_gain?: number;
    length_2_gain?: number;
    width_gain?: number;
    height_gain?: number;
    length_1_pulses?: number;
    length_2_pulses?: number;
    width_pulses?: number;
    height_pulses?: number;
    length_1_wait_time?: number;
    length_2_wait_time?: number;
    width_wait_time?: number;
    height_wait_time?: number;
    model_number?: string;
    scale_capacity?: number;
    firmware_version?: string;
};