const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setTitle("[❌] Gagal untuk memuat")
        .setDescription("Kesalahan: Track Tersangkut, Soket Node Hang Up")
        .setFooter({ text: "Silakan coba lagi nanti atau bergabunglah dengan server dukungan."});
    channel.send({embeds: [thing]});
    client.logger.log(`Error when loading song! Track is stuck in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

			}