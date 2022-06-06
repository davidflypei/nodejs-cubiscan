import {CubiScan} from "./index";
import * as net from "net";

describe("Parsing Responses", () => {
    let cubiscan: CubiScan;
    let socketServer: net.Server;
    let socket: net.Socket

    beforeAll((done) => {
         socketServer = net.createServer((newsocket) => {
            socket = newsocket;
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
        socket.end();
    });

    test('Parse positive measure response', () => {
        let response_msg = '\x02MAC004600,L020.0,W010.0,H030.0,M,K500.50,D510.50,M,F0010,I\x03\x0D\x0A';
        let response = cubiscan.parse_response('continuous_measure', response_msg);
        expect(response.command).toEqual('M');
        expect(response.acknowledge).toEqual(true);
        expect(response.origin).toEqual('C');
        expect(response.location).toEqual('004600');
        expect(response.Length).toEqual(20.0);
        expect(response.width).toEqual(10.0);
        expect(response.height).toEqual(30.0);
        expect(response.dim_unit).toEqual('cm');
        expect(response.weight).toEqual(500.50);
        expect(response.dim_weight).toEqual(510.50);
        expect(response.weight_unit).toEqual('kg');
        expect(response.factor).toEqual(10);
        expect(response.intl_unit).toEqual(true);
    });

    test('Parse negative measure response', () => {
        let response = cubiscan.parse_response('continuous_measure', '\x02MNCZ\x03\x0D\x0A');
        expect(response.command).toEqual('M');
        expect(response.acknowledge).toEqual(false);
        expect(response.origin).toEqual('C');
        expect(response.error).toEqual('zeroing_error');
    });

    test('Parse factor response', () => {
        let response = cubiscan.parse_response('set_factor', '\x02FA\x03\x0D\x0A');
        expect(response.command).toEqual('F');
        expect(response.acknowledge).toEqual(true);
    });

    test('Parse negative factor response', () => {
        let response = cubiscan.parse_response('set_factor', '\x02FN\x03\x0D\x0A');
        expect(response.command).toEqual('F');
        expect(response.acknowledge).toEqual(false);
    });

    test('Testing', (done) => {
        socket.on('data', (data) => {
            socket.write('\x02MAC004600,L020.0,W010.0,H030.0,M,K500.50,D510.50,M,F0010,I\x03\x0D\x0A');
        });
        cubiscan.measure().then((data) => {
            expect(data.command).toEqual('M');
            done();
        });
    });
});