export class helpers {
    static decode(value: string): string[] {
        return [Buffer.from(value, 'ascii').toString('binary'), ''];
    }

    static extract_measure(value: string) {
        let extraction = helpers.base_extract(value);
        let value_str = extraction[0];
        let error = extraction[1];
        return [value_str, error];
    }

    static base_extract(value: string): string[] {
        let acc_value = value.slice(1);
        let error = '';
        let value_str = helpers.decode(acc_value)[0];
        value_str = value_str.trim();
        let first_char = value_str.slice(0,1);

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

    static dim_to_bool(value: string) {
        let value_str = helpers.decode(value)[0];
        return [value_str == 'M', ''];
    }

    static extract_factor(value: string) {
        let extraction = helpers.base_extract(value);
        return [extraction[0], ''];
    }

    static dom_intl_to_bool(value: string) {
        let extraction = helpers.decode(value);
        return [extraction[0] == 'I', ''];
    }

    static get_error(value: string) {
        let value_str = helpers.decode(value)[0];
        switch (value_str){
            case 'C':
                return ['corner_sensor', ''];
                break;
            case 'M':
                return ['measure_error', ''];
                break;
            case 'Z':
                return ['zeroing_error', ''];
                break;
            default:
                return ['unknown', ''];
        }
    }

    static ack_to_bool(value: string) {
        let extraction = helpers.decode(value);
        return [extraction[0] == 'A', ''];
    }
}