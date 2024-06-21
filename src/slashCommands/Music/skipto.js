const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    description: "Forward lagu",
    options: [
      {
        name: "number",
        description: "pilih nomor lagu",
        required: true,
        type: "NUMBER"
		}
	],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
        const guild = interaction.guild;
        const botMember = await guild.members.fetch(client.user);
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Anda tidak terhubung di vc")]});
      if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)]});

      const args = interaction.options.getNumber("number");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Tidak ada musik yang diputar.");
           return await interaction.editReply({embeds: [thing]});
        }

        const position = Number(args);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
        .setColor("RED")
				.setDescription(`Penggunaan: ${prefix}volume <Jumlah lagu dalam antrian>`)
            return await interaction.editReply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Lagu`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return await interaction.editReply({embeds: [thing]});
	
    }
};
