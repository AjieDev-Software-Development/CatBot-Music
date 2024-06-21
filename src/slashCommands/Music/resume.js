const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "resume",
    description: "Lanjutkan musik yang sedang diputar",
	
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
        const song = player.queue.current;

       if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Tidak ada musik yang diputar.");
             return interaction.editReply({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} Pemain sudah **dilanjutkan**.`)
                .setTimestamp()
           return interaction.editReply({embeds: [thing]});
        }

        player.pause(false);

        let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Dilanjutkan**\n[${song.title}](${song.uri})`)
            .setColor(client.embedColor)
            .setTimestamp()
         return interaction.editReply({embeds: [thing]});
	
    }
};
