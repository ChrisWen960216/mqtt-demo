const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('requireDeviceTemp');
});

client.on('message', (topic, message) => {
  const deviceId = message.toString();
  setTimeout(() => {
    client.publish(`temp/${deviceId}`, `${Math.random()}`);
  }, 3000);
});
