export class helpers {
    static decode(value: string): [string, string] {
        return [Buffer.from(value, 'ascii').toString(), ''];
    }

    static extract_measure(value: string): [number, string] {
        let extraction = helpers.base_extract(value);
        let value_str = extraction[0];
        let error = extraction[1];
        return [Number(value_str), error];
    }

    static base_extract(value: string): [string, string] {
        let acc_value = value.slice(1);
        let error = '';
        let value_str = helpers.decode(acc_value)[0];
        value_str = value_str.trim();
        let first_char = value_str.slice(0,1).toString();

        if (isNaN(Number(first_char))) {
            if (first_char == '_') {
                error = 'low';
            } else if (first_char == '-') {
                error = 'low_precision';
            } else if (first_char == '~') {
                error = 'over';
            }

            value_str = value_str.slice(1);
        }

        return [value_str, error];
    }

    static dim_to_bool(value: string): [boolean, string] {
        let value_str = helpers.decode(value)[0];
        return [value_str == 'M', ''];
    }

    static extract_dim_unit(value: string): [string, string] {
        let value_str = helpers.decode(value)[0];
        switch (value_str) {
            case 'E':
                return ['in', ''];
            case 'M':
                return ['cm', ''];
            default:
                return ['unknown', 'Unknown Unit'];
        }
    }

    static extract_weight_unit(value: string): [string, string] {
        let value_str = helpers.decode(value)[0];
        switch (value_str) {
            case 'E':
                return ['lb', ''];
            case 'M':
                return ['kg', ''];
            default:
                return ['unknown', 'Unknown Unit'];
        }
    }

    static extract_factor(value: string): [number, string] {
        let extraction = helpers.base_extract(value);
        return [Number(extraction[0]), ''];
    }

    static dom_intl_to_bool(value: string): [boolean, string] {
        let extraction = helpers.decode(value);
        return [extraction[0] == 'I', ''];
    }

    static get_error(value: string): [string, string] {
        let value_str = helpers.decode(value)[0];
        switch (value_str){
            case 'C':
                return ['corner_sensor', ''];
            case 'M':
                return ['measure_error', ''];
            case 'Z':
                return ['zeroing_error', ''];
            default:
                return ['unknown', 'Unknown Error'];
        }
    }

    static ack_to_bool(value: string): [boolean, string] {
        let extraction = helpers.decode(value);
        return [extraction[0] == 'A', ''];
    }
}