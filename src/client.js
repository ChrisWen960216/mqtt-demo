const mqtt = require('mqtt');


const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('presence');
});

client.on('message', (topic, message) => {
  const str = new Promise((resolve, reject) => resolve(message.toString()));
  async function printData() {
    console.log(await str);
  }
  printData();
});

