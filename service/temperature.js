// const mqtt = require('mqtt');
const client = require('../global');
const getHashToken = require('../common/token');

class TemperatureService {
  constructor(param) {
    this.param = param;
  }

  getData() {
    return new Promise((resolve) => {
      const deviceId = this.param;
      const token = getHashToken();
      client.subscribe(`/res/device/${token}`);
      client.publish(`/req/device/${deviceId}`, token);

      function handleMsg(topic, message) {
        if (topic.toString() === `/res/device/${token}`) {
          const data = message.toString();
          client.unsubscribe(`/res/device/${token}`);
          client.removeListener('message', handleMsg);
          return resolve({ type: 'OPS_SUCCESS', data });
        }
      }

      client.once('message', handleMsg);

      // 定时器
      setTimeout(() => {
        client.unsubscribe(`/res/device/${token}`);
        client.removeListener('message', handleMsg);
        return resolve({ type: 'TIME_OUT' });
      }, 1000);
    });
  }
}


module.exports = TemperatureService;
// module.exports = getData;
