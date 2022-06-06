import {CommandRegistry} from "./command";


test('Command string without param', () => {
    let registry = new CommandRegistry();
    expect(registry.build_command_string({name: 'measure'})).toEqual(Buffer.from('\x02M\x03\x0D\x0A', 'ascii'));
});

test('Command string with param', () => {
    let registry = new CommandRegistry();
    expect(registry.build_command_string({name: 'dim_unit', params: 'M'})).toEqual(Buffer.from('\x02"M\x03\x0D\x0A', 'ascii'));
});