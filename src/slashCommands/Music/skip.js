const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
        name: "skip",
        description: "To skip a song/track from the queue.",
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} color 
     */

  run: async (client, interaction) => {
    await interaction.deferReply({
            ephemeral: false
        });
        const guild = interaction.guild;
        const botMember = await guild.members.fetch(client.user);
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Anda tidak terhubung di vc")]});
      if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`Kamu tidak terhubung ke <#${botMember.voice.channelId}> untuk menggunakan perintah ini.`)]});

   	const emojiskip = client.emoji.skip;
  if(!interaction.member.voice?.channel) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Anda tidak terhubung ke saluran suara untuk menggunakan perintah ini.")]
    }).catch(() => {});
    
  if(botMember.voice.channel && interaction.member.voice?.channelId !== botMember.voice.channelId) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Kamu tidak terhubung ke ${botMember.voice.channel} untuk menggunakan perintah ini.`)]
    }).catch(() => {});
      const player = client.manager.get(interaction.guildId);
    if(!player) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Tidak ada yang diputar saat ini.`)]
    }).catch(() => {});
    if(player && player.state !== "CONNECTED") {
       player.destroy(); 
      return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Tidak ada yang diputar saat ini.`)]
      }).catch(() => {});
    };
   if(!player.queue) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Tidak ada yang diputar saat ini.")]
   }).catch(() => {});
        if(!player.queue.current) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Tidak ada yang diputar saat ini.")]
      }).catch(() => {});

        if(!player.queue.size) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Tidak ada lagu tersisa dalam antrean untuk dilewati.")]
      }).catch(() => {});

        player.stop();
        return await interaction.editReply({
            embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiskip} **Dilewati** \n[${player.queue.current.title}](${player.queue.current.uri})`)]
        }).catch(() => {});
  }
					}
