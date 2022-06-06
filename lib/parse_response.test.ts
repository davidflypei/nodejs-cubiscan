import {CubiScan} from "./index";
import * as net from "net";
import exp = require("constants");

describe("Parsing Responses", () => {
    let cubiscan: CubiScan;
    let socketServer: net.Server;

    beforeAll((done) => {
         socketServer = net.createServer((socket) => {
            socket.on('data', (data) => {
                switch (data.toString()) {
                    case '\x02C\x03\x0D\x0A': // Continuous Measure
                        socket.write('\x02MAC004600,L020.0,W010.0,H030.0,M,K500.50,D510.50,M,F0010,I\x03\x0D\x0A');
                        break;
                    case '\x02D\x03\x0D\x0A': // Dim Calibrate
                        socket.write('\x02DA01\x03\x0D\x0A');
                        break;
                    case '\x02"M\x03\x0D\x0A': // Set Dim Unit
                        socket.write('\x02"A\x03\x0D\x0A');
                        break;
                    case '\x02FD\x03\x0D\x0A': // Set Factor
                        socket.write('\x02FA\x03\x0D\x0A');
                        break;
                    case '\x02L012345\x03\x0D\x0A': // Set Location
                        socket.write('\x02LA\x03\x0D\x0A');
                        break;
                    case '\x02M\x03\x0D\x0A': // Measure
                        socket.write('\x02MAC004600,L020.0,W010.0,H030.0,M,K500.50,D510.50,M,F0010,I\x03\x0D\x0A');
                        break;
                    case '\x02S100.00\x03\x0D\x0A': // Scale Calibration
                        socket.write('\x02SA01\x03\x0D\x0A');
                        break;
                    case '\x02T\x03\x0D\x0A': // Test
                        socket.write('\x02TA01\x03\x0D\x0A');
                        break;
                    case '\x02U\x03\x0D\x0A': // Units
                        socket.write('\x02UAMMI0050012345\x03\x0D\x0A');
                        break;
                    case '\x02V\x03\x0D\x0A': // Values
                        socket.write('\x02VA01.1,01.2,01.3,01.4,0001,0002,0003,0004,2.01,2.02,2.03,2.04,03.5,03.6,03.7,03.8,05,06,07,08,010,011,012,013,1100,100,9.999                           \x03\x0D\x0A');
                        break;
                    case '\x02#M\x03\x0D\x0A': // Set Weight Units
                        socket.write('\x02#A\x03\x0D\x0A');
                        break;
                    case '\x02Z\x03\x0D\x0A': // Zero
                        socket.write('\x02ZA\x03\x0D\x0A');
                        break;
                }
            });
        });

        socketServer.listen(() => {
            const address = socketServer.address();
            //@ts-ignore
            cubiscan = new CubiScan({ip_address: address.address, port: address.port, timeout: 30});
            cubiscan.socket.on('connect', done);
        });
    });

    afterAll(() => {
        cubiscan.endSocket();
        socketServer.close();
    });

    test('Parse positive measure response', (done) => {
        let response_msg = '\x02MAC004600,L020.0,W010.0,H030.0,M,K500.50,D510.50,M,F0010,I\x03\x0D\x0A';
        let response = cubiscan.parse_response('continuous_measure', response_msg);
        try{
            expect(response).toEqual({
                command: 'M',
                acknowledge: true,
                origin: 'C',
                location: '004600',
                Length: 20.0,
                width: 10.0,
                height: 30.0,
                dim_unit: 'cm',
                weight: 500.50,
                dim_weight: 510.50,
                weight_unit: 'kg',
                factor: 10,
                intl_unit: true
            });
            done();
        } catch (e) {
            done(e);
        }
    });

    test('Parse negative measure response', (done) => {
        let response = cubiscan.parse_response('continuous_measure', '\x02MNCZ\x03\x0D\x0A');
        try{
            expect(response).toEqual({
                command: 'M',
                acknowledge: false,
                origin: 'C',
                error: 'zeroing_error'
            });
            done();
        } catch (e) {
            done(e);
        }

    });

    test('Parse factor response', (done) => {
        let response = cubiscan.parse_response('set_factor', '\x02FA\x03\x0D\x0A');
        try{
            expect(response).toEqual({
                command: 'F',
                acknowledge: true
            });
            done();
        } catch (e) {
            done(e);
        }
    });

    test('Parse negative factor response', (done) => {
        let response = cubiscan.parse_response('set_factor', '\x02FN\x03\x0D\x0A');
        try{
            expect(response).toEqual({
                command: 'F',
                acknowledge: false
            });
            done();
        } catch (e) {
            done(e);
        }
    });

    test('Continuous Measure', (done) => {
        cubiscan.continuousMeasure().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'M',
                    acknowledge: true,
                    origin: 'C',
                    location: '004600',
                    Length: 20.0,
                    width: 10.0,
                    height: 30.0,
                    dim_unit: 'cm',
                    weight: 500.50,
                    dim_weight: 510.50,
                    weight_unit: 'kg',
                    factor: 10,
                    intl_unit: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Dim Calibration', (done) => {
        cubiscan.dimCalibration().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'D',
                    acknowledge: true,
                    identifier: '01'
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Set Dim Units', (done) => {
        cubiscan.setDimUnit('M').then((response) => {
            try{
                expect(response).toEqual({
                    command: '"',
                    acknowledge: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Factor Toggle', (done) => {
        cubiscan.setFactor('D').then((response) => {
            try{
                expect(response).toEqual({
                    command: 'F',
                    acknowledge: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Set Location', (done) => {
        cubiscan.setLocation('012345').then((response) => {
            try{
                expect(response).toEqual({
                    command: 'L',
                    acknowledge: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Measure', (done) => {
        cubiscan.measure().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'M',
                    acknowledge: true,
                    origin: 'C',
                    location: '004600',
                    Length: 20.0,
                    width: 10.0,
                    height: 30.0,
                    dim_unit: 'cm',
                    weight: 500.50,
                    dim_weight: 510.50,
                    weight_unit: 'kg',
                    factor: 10,
                    intl_unit: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Scale Calibration', (done) => {
        cubiscan.scaleCalibration('100.00').then((response) => {
            try{
                expect(response).toEqual({
                    command: 'S',
                    acknowledge: true,
                    identifier: '01'
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Test', (done) => {
        cubiscan.test().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'T',
                    acknowledge: true,
                    identifier: '01'
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Units', (done) => {
        cubiscan.units().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'U',
                    acknowledge: true,
                    dim_unit: 'cm',
                    weight_unit: 'kg',
                    intl_unit: true,
                    factor: 50,
                    location: '012345'
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Values', (done) => {
        cubiscan.values().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'V',
                    acknowledge: true,
                    length_1_dbw: 1.1,
                    length_2_dbw: 1.2,
                    width_dbw: 1.3,
                    height_dbw: 1.4,
                    length_1_cpi: 1,
                    length_2_cpi: 2,
                    width_cpi: 3,
                    height_cpi: 4,
                    length_1_blanking: 2.01,
                    length_2_blanking: 2.02,
                    width_blanking: 2.03,
                    height_blanking: 2.04,
                    length_1_gain: 3.5,
                    length_2_gain: 3.6,
                    width_gain: 3.7,
                    height_gain: 3.8,
                    length_1_pulses: 5,
                    length_2_pulses: 6,
                    width_pulses: 7,
                    height_pulses: 8,
                    length_1_wait_time: 10,
                    length_2_wait_time: 11,
                    width_wait_time: 12,
                    height_wait_time: 13,
                    model_number: '1100',
                    scale_capacity: 100,
                    firmware_version: '9.999'
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Set Weight Units', (done) => {
        cubiscan.setWeightUnit('M').then((response) => {
            try{
                expect(response).toEqual({
                    command: '#',
                    acknowledge: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    test('Zero', (done) => {
        cubiscan.zero().then((response) => {
            try{
                expect(response).toEqual({
                    command: 'Z',
                    acknowledge: true
                });
                done();
            } catch (e) {
                done(e);
            }
        });
    });
});