import {CommandRegistry} from "./command";
import * as net from "net";

const EXCLUDED = ['start', 'end', 'cr', 'lf']

module.exports = class CubiScan {
  ip_address: string;
  port: number;
  timeout: number;
  registry: any;
  buffer_recv_size: number;
  ssl: boolean;

  constructor({ip_address, port, timeout=30, ssl=false, buffer_recv_size=1024}: {ip_address: string, port: number, timeout?: number, ssl?: boolean, buffer_recv_size?: number}) {
    this.ip_address = ip_address;
    this.port = port;
    this.timeout = timeout;
    this.buffer_recv_size = buffer_recv_size;
    this.ssl = ssl;
    this.registry = new CommandRegistry();
  }

  async make_request({command, param = ''}: {command: string, param?: string}): Promise<object> {
    return new Promise((resolve, reject) => {
      let command_string = this.registry.build_command_string({name: command, params: param});
      let socket = new net.Socket();
      socket.connect(this.port, this.ip_address);
      socket.on('connect',function() {
        socket.write(command_string);
      });

      socket.on('data', (d) => {
        socket.end();
        socket.on('close', () => {
          resolve(this.parse_response(command, d.toString()));
        });
      });
    });
  }

  parse_response(command: string, data: string): object {
    data = data.replace(/(b'0x00'$)/, '');
    let mappings = this.registry.get_response_for(command);
    let mapping = mappings[0];
    let neg_mapping = mappings[1];
    let used_map = mapping;
    let index = 0;
    let res_dict = Array();
    let sections = data.split(Buffer.from(',', 'ascii').toString('binary'));
    sections.forEach(section => {
      let start = 0;
      while (start < section.length) {
        let key;
        try {
          key = used_map[index]['key'];
        } catch (e) {
          break;
        }
        let length = used_map[index]['length'];
        let converter = used_map[index]['converter'];
        if (EXCLUDED.includes(key)) {
          start += length;
          index += 1;
          continue;
        }
        let end = (start + length);
        let value = section.slice(start, end);
        res_dict[key] = (converter ? converter(value)[0] : value);
        start = end;
        index += 1;
        if (key == 'acknowlage') {
          used_map = neg_mapping;
        }
      }
    });
    return res_dict;
  }

  async continuousMeasure(): Promise<object> {
    return this.make_request({command: "continuous_measure"});
  }

  async dimCalibration(): Promise<object> {
    return this.make_request({command: "dim_calibration"});
  }

  async setDimUnit(unitP: string): Promise<object> {
    switch (unitP.toLowerCase()) {
      case 'cm':
        unitP = 'M';
        break;
      case 'in':
        unitP = 'E';
        break;
      case 'm':
        unitP = 'M';
        break;
      case 'e':
        unitP = 'E';
        break;
    }
    return this.make_request({command:"dim_unit", param: unitP});
  }

  async setFactor(factorP: string): Promise<object> {
    return this.make_request({command: "set_factor", param: factorP});
  }

  async setLocation(locationP: string): Promise<object> {
    return this.make_request({command: "location", param: locationP});
  }

  async measure(): Promise<object> {
    return this.make_request({command: "measure"});
  }

  async scaleCalibration(weightP: string): Promise<object> {
    return this.make_request({command: "weight_calibration", param: weightP});
  }

  async test(): Promise<object> {
    return this.make_request({command: "test"});
  }

  async units(): Promise<object> {
    return this.make_request({command: "units"});
  }

  async values(): Promise<object> {
    return this.make_request({command: 'values'});
  }

  async setWeightUnit(unitP: string): Promise<object> {
    switch (unitP.toLowerCase()) {
      case 'kg':
        unitP = 'M';
        break;
      case 'lb':
        unitP = 'E';
        break;
      case 'm':
        unitP = 'M';
        break;
      case 'e':
        unitP = 'E';
        break;
    }
    return this.make_request({command: "weight_unit", param: unitP});
  }

  async zero(): Promise<object> {
    return this.make_request({command: "zero"});
  }
}