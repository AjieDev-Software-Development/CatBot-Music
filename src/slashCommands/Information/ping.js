const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Tes Ping WebSocket",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        await interaction.editReply({ content: "<a:loading:1149237433859330098> Memproses..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const api_ping = client.ws.ping;

            await interaction.editReply({
                content: "`Pong!!🏓`",
                embeds: [new MessageEmbed().setAuthor({
                    name: "Mendapat tanggapan! Inilah hasilnya...",
                    iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
                  })
                  .setColor(client.embedColor).setFooter({
                    text: `Diminta oleh ${interaction.member.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, format: 'png' })
                  })
                  .addFields([{ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true }]).setTimestamp()]
            });
        })
    }
			}