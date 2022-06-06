import {base_responses, BaseResponseMap} from "./base_responses";

export class CommandRegistry {
    command_bits: { [key: string]: string };
    response_bits: { [key: string]: string };
    response_mappings: {[key: string]: (BaseResponseMap[][] | [])};

    constructor() {
        this.command_bits = {};
        this.response_bits = {};
        this.response_mappings = {};
        this.init_base_mappings();
    }

    init_base_mappings() {
        this.add_command(
            'continuous_measure', 'C', 'M',
            base_responses.MEASURE, base_responses.NEG_MEASURE
        );

        this.add_command(
            'dim_calibration', 'D', 'D',
            base_responses.DIM_CALIBRATION, []
        );
        this.add_command(
            'dim_unit', '"', '"', [], []
        );
        this.add_command(
            'set_factor', 'F', 'F', [], []
        );
        this.add_command(
            'location', 'L', 'L', [], []
        );
        this.add_command(
            'measure', 'M', 'M',
            base_responses.MEASURE, base_responses.NEG_MEASURE
        );
        this.add_command(
            'weight_calibration', 'S', 'S',
                base_responses.WEIGHT_CALIBRATION, []
        );
        this.add_command(
            'test', 'T', 'T', base_responses.TEST, []
        );
        this.add_command(
            'units', 'U', 'U', base_responses.REPORT_UNITS, []
        );
        this.add_command(
            'values', 'V', 'V', base_responses.VALUES, []
        );
        this.add_command(
            'weight_unit', '#', '#', [], []
        );
        this.add_command(
            'zero', 'Z', 'Z', [], []
        );
    }

    add_command(name: string, command_bit: string, response_bit: string, response: (BaseResponseMap[] | []), neg_response: BaseResponseMap[] | []): void {
        this.command_bits[name] = command_bit;
        this.response_bits[name] = response_bit;
        this.response_mappings[name] = [response, neg_response];
    }

    build_command_string({name, params=''}: {name: string, params?: string}): Buffer {
        let byte = this.command_bits[name];
        let command: Buffer[] = [];
        command.push(Buffer.from('02', 'hex'));
        command.push(Buffer.from(byte, 'ascii'));
        if (params) {
            command.push(Buffer.from(params));
        }
        command.push(Buffer.from('030D0A', 'hex'));
        return Buffer.concat(command);
    }

    get_response_for(name: string): BaseResponseMap[][] {
        let mappings = this.response_mappings[name];
        if (mappings === undefined) {
            mappings = [[], []];
        }
        let complete_resp = [...base_responses.PREFIX, ...mappings[0], ...base_responses.SUFIX];
        let complete_neg_resp = [...base_responses.PREFIX, ...mappings[1], ...base_responses.SUFIX];
        return [complete_resp, complete_neg_resp];
    }
}

