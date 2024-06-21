const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
      .setTitle("[❌] Failed to Load")
        .setDescription("❌ Error when loading, Track corrupt error. | Error because node cannot proceed the request.")
        .setFooter({ text: "Please try again later or join support server."});
    channel.send({embeds: [thing]});
    client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}