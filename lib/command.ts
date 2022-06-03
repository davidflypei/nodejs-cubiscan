import "./base_responses";
import {base_responses} from "./base_responses";

export class CommandRegistry {
    command_bits: any;
    response_mappings: any;

    constructor() {
        this.command_bits = {};
        this.response_mappings = {};
        this.init_base_mappings();
    }

    init_base_mappings() {
        this.add_command(
            'continuous_measure', Buffer.from('C', 'ascii'),
            base_responses.MEASURE, base_responses.NEG_MEASURE
        );

        this.add_command(
            'dim_calibration', Buffer.from('D', 'ascii'),
            base_responses.DIM_CALIBRATION, []
        );
        this.add_command(
            'dim_unit', Buffer.from('"', 'ascii'), [], []
        );
        this.add_command(
            'set_factor', Buffer.from('F', 'ascii'), [], []
        );
        this.add_command(
            'location', Buffer.from('L', 'ascii'), [], []
        );
        this.add_command(
            'measure', Buffer.from('M', 'ascii'),
            base_responses.MEASURE, base_responses.NEG_MEASURE
        );
        this.add_command(
            'weight_calibration', Buffer.from('S', 'ascii'),
                base_responses.WEIGHT_CALIBRATION, []
        );
        this.add_command(
            'test', Buffer.from('T', 'ascii'), base_responses.TEST, []
        );
        this.add_command(
            'units', Buffer.from('U', 'ascii'), base_responses.REPORT_UNITS, []
        );
        this.add_command(
            'values', Buffer.from('V', 'ascii'), base_responses.VALUES, []
        );
        this.add_command(
            'weight_unit', Buffer.from('#', 'ascii'), [], []
        );
        this.add_command(
            'zero', Buffer.from('Z', 'ascii'), [], []
        );
    }

    add_command(name: string, command_bit: object, response: object, neg_response: object) {
        this.command_bits[name] = command_bit;
        this.response_mappings[name] = [response, neg_response];
    }

    build_command_string({name, params=''}: {name: string, params: string}) {
        let byte = this.command_bits[name];
        let command = Buffer.from('02', 'hex') + byte;
        if (params) {
            command += params;
        }
        command += Buffer.from('030D0A', 'hex');
        return command;
    }

    get_response_for(name: string) {
        let mappings = this.response_mappings[name];
        if (mappings === undefined) {
            mappings = [[], []];
        }
        let complete_resp = [...base_responses.PREFIX, ...mappings[0], ...base_responses.SUFIX];
        let complete_neg_resp = [...base_responses.PREFIX, ...mappings[1], ...base_responses.SUFIX];
        return [complete_resp, complete_neg_resp];
    }
}

