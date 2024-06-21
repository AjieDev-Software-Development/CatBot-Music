const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "clearqueue",
    description: "Hapus Antrian",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
        const guild = interaction.guild;
        const botMember = await guild.members.fetch(client.user);
        if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
        if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)]});

        const player = interaction.client.manager.get(interaction.guildId);              
       if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Tidak ada musik yang diputar.");
             return interaction.editReply({embeds: [thing]});
        }
        
     		player.queue.clear();

		  const emojieject = client.emoji.remove;

		  let thing = new MessageEmbed()
	   		.setColor(client.embedColor)
  			.setTimestamp()
		  	.setDescription(`${emojieject} Menghapus semua lagu dari antrean`)
         return interaction.editReply({embeds: [thing]});
	
    }
};
