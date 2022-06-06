import {CommandRegistry} from "./command";
import {base_responses} from "./base_responses";

describe("Commands", () => {
    let registry: CommandRegistry;

    beforeAll(() => {
        registry = new CommandRegistry();
    });

    test('Command string without param', () => {
        expect(registry.build_command_string({name: 'measure'})).toEqual(Buffer.from('\x02M\x03\x0D\x0A', 'ascii'));
    });

    test('Command string with param', () => {
        expect(registry.build_command_string({
            name: 'dim_unit',
            params: 'M'
        })).toEqual(Buffer.from('\x02"M\x03\x0D\x0A', 'ascii'));
    });

    test('Bad response command', () => {
        expect(registry.get_response_for('empty')).toEqual([[...base_responses.PREFIX, ...base_responses.SUFIX], [...base_responses.PREFIX, ...base_responses.SUFIX]]);
    });
});