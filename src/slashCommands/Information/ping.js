const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "WebSocket Ping Test",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        await interaction.editReply({ content: "Pining..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const api_ping = client.ws.ping;

            await interaction.editReply({
                content: "`Pong!!🏓`",
                embeds: [new MessageEmbed().setAuthor({
                    name: "Got a response! Here's the result...",
                    iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
                  })
                  .setColor(client.embedColor).setFooter({
                    text: `Requested by ${interaction.member.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, format: 'png' })
                  })
                  .addFields([{ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true }]).setTimestamp()]
            });
        })
    }
			}