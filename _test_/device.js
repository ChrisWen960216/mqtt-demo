/**
 *
 * @return {number} 0:成功,1:失败
 */

const mqtt = require('mqtt');

function main() {
  const args = process.argv.splice(2);
  const deviceId = args[0];
  if (!deviceId) {
    console.log('用法: node device {deviceId}');
    return 1;
  }

  const client = mqtt.connect('mqtt://127.0.0.1:1883');
  client.on('connect', () => {
    client.subscribe(`/req/device/${deviceId}`);
  });

  client.on('message', (topic, message) => {
    const token = message.toString();
    if (deviceId === 'timeout') return 0;
    switch (topic) {
      case `/req/device/${deviceId}`:
        client.publish(`/res/device/${token}`, `{"deviceId":"${deviceId}","timestamp":${Date.now()}}`);
        break;
      default:
      // do nothing
    }
  });
  return 0;
}

main();
