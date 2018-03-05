const mosca = require('mosca');

const ascoltatore = {};
const settings = {
  port: 1883,
  backend: ascoltatore,
};

const server = new mosca.Server(settings);

server.on('published', (packet, client) => {
  console.log('Published', packet.payload.toString());
});
