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

export interface BaseResponseMap {
    key: string;
    length: number;
    converter: (null | ((value: string) => (string | number | boolean)[]));
}

export interface BaseResponse {
    [key: string]: string | boolean | number | undefined;
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
    length_1_dbw?: string;
    length_2_dbw?: string;
    width_dbw?: string;
    height_dbw?: string;
    length_1_cpi?: string;
    length_2_cpi?: string;
    width_cpi?: string;
    height_cpi?: string;
    length_1_blanking?: string;
    length_2_blanking?: string;
    width_blanking?: string;
    height_blanking?: string;
    length_1_gain?: string;
    length_2_gain?: string;
    width_gain?: string;
    height_gain?: string;
    length_1_pulses?: string;
    length_2_pulses?: string;
    width_pulses?: string;
    height_pulses?: string;
    length_1_wait_time?: string;
    length_2_wait_time?: string;
    width_wait_time?: string;
    height_wait_time?: string;
    model_number?: string;
    scale_capacity?: string;
    firmware_version?: string;
}