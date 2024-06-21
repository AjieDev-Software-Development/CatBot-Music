const MusicBot = require("./src/structures/MusicClient");
const { keep_alive } = require("./keep_alive");
const client = new MusicBot();
const trackEndHandler = require('./src/events/Lavalink/queueEnd');

client.connect()
client.on('trackEnd', (player, track, payload) => {
  trackEndHandler(client, player);
});

module.exports = client; 
