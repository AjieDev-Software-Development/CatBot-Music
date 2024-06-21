const delay = require("delay");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = async (client, player) => {
  const channel = client.channels.cache.get(player.textChannel);

  // Delete the Now Playing message
  if (player.nowPlayingMessage) {
    player.nowPlayingMessage.delete().catch(console.error);
    player.nowPlayingMessage = null;
  }

  // Check if the queue is empty
  if (!player.queue.length) {
    const emojiwarn = client.emoji.warn;
    const thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiwarn} **Antrean musik berakhir**`)
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

    channel.send({ embeds: [thing] });
  }
};