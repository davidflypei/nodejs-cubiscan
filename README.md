# nodejs-cubiscan
[![codecov](https://codecov.io/gh/davidflypei/nodejs-cubiscan/branch/main/graph/badge.svg?token=WS5X4P29ZZ)](https://codecov.io/gh/davidflypei/nodejs-cubiscan)
![example workflow](https://github.com/davidflypei/nodejs-cubiscan/actions/workflows/main.yml/badge.svg)

This module allows you to connect and interface to a Cubiscan ([https://cubiscan.com/](https://cubiscan.com/)) device over the network. It's still a bit of a work in progress, but the main commands work. Feel free to make/recommend improvements where possible.

### Tested Commands:

- measure
- setDimUnit
- setWeightUnit
- values
- units
- test
- zero

### Commands Need Testing:

- continuousMeasure
- dimCalibration
- setFactor
- setLocation
- scaleCalibration

## Usage

```Node
const CubiScan = require("@greathobbies/nodejs-cubiscan");

let cubiscan = new CubiScan({ip_address: '192.168.0.20', port: 49000});

cubiscan.measure().then(data => {
  console.log(data);
});
```


## Extras

Based on camptocamp's Python library [camptocamp/cubiscan](https://github.com/camptocamp/cubiscan).