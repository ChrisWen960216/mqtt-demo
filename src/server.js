const mosca = require('mosca');

// mongodb connected
const pubSubSettings = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {},
};

const moscaSettings = {
  port: 1883,
  backend: pubSubSettings,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mosca',
  },
};


function setup() {
  console.log('Server is running!');
}

const server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', (client) => {
  console.log('client connected', client.id);
});

server.on('published', (packet, client) => {
  console.log(packet.payload);
});

