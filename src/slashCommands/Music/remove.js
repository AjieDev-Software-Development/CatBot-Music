const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "remove",
    description: "Hapus lagu dari antrean",
    options: [
      {
        name: "number",
        description: "Jumlah lagu dalam antrian",
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
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)]});

        const args = interaction.options.getNumber("number");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Tidak ada musik yang diputar.");
           return await interaction.editReply({embeds: [thing]});
        }

       const position = (Number(args) - 1);
       if (position > player.queue.size) {
         const number = (position + 1);
         let thing = new MessageEmbed()
           .setColor("RED")
           .setDescription(`Tidak ada lagu di nomornya ${number}.\nJumlah Lagu: ${player.queue.size}`);
          return await interaction.editReply({ embeds: [thing] });
       }
     
    const song = player.queue[position]
    player.queue.remove(position);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setTimestamp()
      .setDescription(`${emojieject} DIHAPUS\n[${song.title}](${song.uri})`)
    return await interaction.editReply({ embeds: [thing] });
     
       }
     };
