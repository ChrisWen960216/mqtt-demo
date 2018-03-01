/** Created By ChrisWen
 *  MQTT-DEMO
 */
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

// const message = {
//   topic: '/hello/world',
//   payload: 'abcde', // or a Buffer
//   qos: 2, // 0, 1, or 2
//   retain: false, // or true
// };

client.on('connect', () => {
  client.publish('/hello/world', 'Hello wrold');
});

