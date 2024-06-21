const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Mengubah volume musik yang sedang diputar.",
      options: [
      {
        name: "number",
        description: "berikan nomor volume Anda ",
        required: true,
        type: "NUMBER"
	  	}
	],

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
      if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)]});

    const volumeEmoji = client.emoji.volumehigh;
    const emojivolume = client.emoji.volumehigh;
		
    const vol = interaction.options.getNumber("number");

  	const player = client.manager.get(interaction.guildId);
	  if(!player) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Tidak ada musik yang diputar.`)]
    }).catch(() => {});
    if (!player.queue.current) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Tidak ada musik yang diputar.`)]
    }).catch(() => {});
  const volume = Number(vol);
		if (!volume || volume < 0 || volume > 100) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Penggunaan: ${client.prefix}volume <Jumlah volume antara 0 - 100>`)]
    }).catch(() => {});

   player.setVolume(volume);   
  if (volume > player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume diatur ke: **${volume}%**`)]
    }).catch(() => {});
  else if (volume < player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume diatur to: **${volume}%**`)]
    }).catch(() => {});
   else 
  await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume disetel ke: **${volume}%**`)]
    }).catch(() => {});
   }
			}
