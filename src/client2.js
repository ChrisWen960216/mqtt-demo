const mqtt = require('mqtt');


const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  // client.subscribe('presence');
  client.publish('presence', 'Hello World', { qos: 2 });
});

// client.publish('presence', 'Hello mqtt');

client.on('message', (topic, message) => {
  console.log(topic);
  console.log(message.toString());
  client.end();
});
