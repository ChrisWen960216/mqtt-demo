// import { resolve } from 'url';

// const mqtt = require('mqtt');
const client = require('../global');
const getHashToken = require('../common/token');

class TemperatureService {
  constructor(param) {
    this.param = param;
  }

  getData() {
    const deviceId = this.param;
    const token = getHashToken();
    client.subscribe(`/res/device/${token}`);
    client.publish(`/req/device/${deviceId}`, token);

    return new Promise((resolve) => {
      setTimeout(() => {
        client.unsubscribe(`/res/device/${token}`);
        // client.end();
        resolve({ type: 'TIME_OUT' });
      }, 15000);
      client.on('message', (topic, message) => {
        const data = message.toString();
        client.unsubscribe(`/res/device/${token}`);
        // client.end();
        return resolve({ type: 'OPS_SUCCESS', data });
      });
    });
  }
}

// function getData(param) {
//   const deviceId = param;
//   const token = getHashToken();
//   client.subscribe(`/res/device/${token}`);
//   client.publish(`/req/device/${deviceId}`, token);

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       client.unsubscribe(`/res/device/${token}`);
//       // client.end();
//       resolve({ type: 'TIME_OUT' });
//     }, 15000);

//     client.once('message', (topic, message) => {
//       let data = '';
//       if (topic.toString() === `/res/device/${token}`) {
//         data = message.toString();
//       }
//       client.unsubscribe(`/res/device/${token}`);
//       // client.end();
//       return resolve({ type: 'OPS_SUCCESS', data });
//     });
//   });
// }


module.exports = TemperatureService;
// module.exports = getData;
