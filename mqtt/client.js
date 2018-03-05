const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('requireData');
});

client.on('message', (topic, message) => {
  setTimeout(() => {
    client.publish('temp', `${Math.random()}`);
  }, 3000);
});
