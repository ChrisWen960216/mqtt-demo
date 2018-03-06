// import { resolve } from 'url';

const mqtt = require('mqtt');

class TemperatureService {
  constructor(param) {
    this.param = param;
  }

  getData() {
    const deviceId = this.param;
    const client = mqtt.connect('mqtt://localhost:1883');
    client.subscribe(`temp/${deviceId}`);
    client.publish('requireDeviceTemp', `${deviceId}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        client.unsubscribe(`temp/${deviceId}`);
        client.end();
        resolve({ type: 'TIME_OUT' });
      }, 5000);
      client.on('message', (topic, message) => {
        const data = message.toString();
        client.unsubscribe(`temp/${deviceId}`);
        client.end();
        return resolve({ type: 'OPS_SUCCESS', data });
      });
    });
  }
}


module.exports = TemperatureService;
