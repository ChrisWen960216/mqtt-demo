const express = require('express');
const Promise = require('bluebird');
const mqtt = require('mqtt');

const app = express();

function getDeviceInfo(deviceId, client) {
  return new Promise((resolve) => {
    client.on('connect', () => {
      client.subscribe(`/res/device/${deviceId}`);
      client.publish(`/req/device/${deviceId}`);
    });
    client.once('message', (topic, message) => {
      switch (topic) {
        case `/res/device/${deviceId}`:
          resolve(message.toString());
          break;
        default:
          // return 1;
      }
    });
  });
}

app.get('/device/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const client = mqtt.connect('mqtt://127.0.0.1:1883');
  getDeviceInfo(deviceId, client)
    .then((msg) => {
      res.send(msg);
    })
    .timeout(3000)
    .catch((e) => {
      console.log(e.toString());
      res.send(e.toString());
    })
    .finally(() => {
      client.unsubscribe(`/res/device/${deviceId}`);
      client.end();
    });
});


app.listen(8888);
