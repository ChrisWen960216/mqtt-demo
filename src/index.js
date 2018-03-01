/** Created By ChrisWen
 *  MQTT-DEMO
 */
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  client.subscribe('Presence');
  client.publish('Presence', 'Hello MQTT');
});

client.on('message', (topic, message) => {
  console.log(message.toString());
  client.end();
});

