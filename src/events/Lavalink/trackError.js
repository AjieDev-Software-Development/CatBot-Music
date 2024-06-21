const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
      .setTitle("[❌] Gagal untuk memuat")
        .setDescription("❌ Kesalahan saat memuat, Lacak kesalahan yang rusak. | Kesalahan karena node tidak dapat melanjutkan permintaan.")
        .setFooter({ text: "Silakan coba lagi nanti atau bergabunglah dengan server dukungan."});
    channel.send({embeds: [thing]});
    client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}