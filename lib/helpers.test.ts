import {helpers} from "./helpers";

test('Helper decode', () => {
    let res = helpers.decode('TEST')
    expect(res).toEqual(['TEST', '']);
});

test('Helper base_extract no error', () => {
    let res = helpers.base_extract('L0323')
    expect(res).toEqual(['0323', '']);
});

test('Helper base_extract low_precision error', () => {
    let res = helpers.base_extract('L-0323')
    expect(res).toEqual(['0323', 'low_precision']);
});

test('Helper base_extract low error', () => {
    let res = helpers.base_extract('L_0323')
    expect(res).toEqual(['0323', 'low']);
});

test('Helper base_extract over error', () => {
    let res = helpers.base_extract('L~0323')
    expect(res).toEqual(['0323', 'over']);
});

test('Helper dim_to_bool english', () => {
    let res = helpers.dim_to_bool('E')
    expect(res).toEqual([false, '']);
});

test('Helper dim_to_bool metric', () => {
    let res = helpers.dim_to_bool('M')
    expect(res).toEqual([true, '']);
});

test('Helper extract_dim_unit english', () => {
    let res = helpers.extract_dim_unit('E')
    expect(res).toEqual(['in', '']);
});

test('Helper extract_dim_unit metric', () => {
    let res = helpers.extract_dim_unit('M')
    expect(res).toEqual(['cm', '']);
});

test('Helper extract_dim_unit unknown unit', () => {
    let res = helpers.extract_dim_unit('G')
    expect(res).toEqual(['unknown', 'Unknown Unit']);
});

test('Helper extract_weight_unit english', () => {
    let res = helpers.extract_weight_unit('E')
    expect(res).toEqual(['lb', '']);
});

test('Helper extract_weight_unit metric', () => {
    let res = helpers.extract_weight_unit('M')
    expect(res).toEqual(['kg', '']);
});

test('Helper extract_weight_unit unknown unit', () => {
    let res = helpers.extract_weight_unit('G')
    expect(res).toEqual(['unknown', 'Unknown Unit']);
});

test('Helper extract_factor', () => {
    let res = helpers.extract_factor('L0323')
    expect(res).toEqual([323, '']);
});

test('Helper extract_measure', () => {
    let res = helpers.extract_measure('L03.23')
    expect(res).toEqual([3.23, '']);
});

test('Helper dom_intl_to_bool international', () => {
    let res = helpers.dom_intl_to_bool('I')
    expect(res).toEqual([true, '']);
});

test('Helper dom_intl_to_bool domestic', () => {
    let res = helpers.dom_intl_to_bool('F')
    expect(res).toEqual([false, '']);
});

test('Helper get_error corner_sensor', () => {
    let res = helpers.get_error('C')
    expect(res).toEqual(['corner_sensor', '']);
});

test('Helper get_error measure_error', () => {
    let res = helpers.get_error('M')
    expect(res).toEqual(['measure_error', '']);
});

test('Helper get_error zeroing_error', () => {
    let res = helpers.get_error('Z')
    expect(res).toEqual(['zeroing_error', '']);
});

test('Helper get_error unknown error', () => {
    let res = helpers.get_error('H')
    expect(res).toEqual(['unknown', 'Unknown Error']);
});

test('Helper ack_to_bool acknowledge', () => {
    let res = helpers.ack_to_bool('A')
    expect(res).toEqual([true, '']);
});

test('Helper ack_to_bool not acknowledge', () => {
    let res = helpers.ack_to_bool('N')
    expect(res).toEqual([false, '']);
});