const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
// client.on('message', (topic, message) => {
//   const data = message.toString();
//   client.unsubscribe(`/res/device/${token}`);
//   // client.end();
//   return ({ type: 'OPS_SUCCESS', data });
// });
module.exports = client;
