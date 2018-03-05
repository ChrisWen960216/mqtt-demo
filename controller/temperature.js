// import { resolve } from 'url';

const mqtt = require('mqtt');


// client.on('connect', () => {
//   console.log('>>> connected');
//   client.subscribe('/temperature');
// });

// client.on('message', (topic, message) => {
//   const temperature = parseInt(message.toString(), 10);
//   const data = { temperature };
//   client.publish('/tips', JSON.stringify(data));
//   console.log(JSON.stringify(data));
// });

class TemperatureController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  static getData(request, response) {
    const client = mqtt.connect('mqtt://localhost:1883');
    client.subscribe('temp');
    client.publish('requireData');

    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('HAHA')), 2000);
      client.on('message', (topic, message) => {
        const data = message.toString();
        return resolve(data);
      });
    }).then((data) => {
      response.json({ data, code: 0 });
      client.end();
    }).catch((error) => {
      response.json({ error, code: 1 });
      client.end();
    });
  }
}


module.exports = TemperatureController;
