const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
    name: "seek",
    description: "Seek the currently playing song",
    options: [
      {
        name: "time",
        description: "<10s || 10m || 10h>",
        required: true,
        type: "STRING"
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

        const args = interaction.options.getString("time");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
           return await interaction.editReply({embeds: [thing]});
        }

        const time = ms(args)
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = client.emoji.forward;
        const emojirewind = client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
                 return await interaction.editReply({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
           return await interaction.editReply({embeds: [thing]});
            }
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
             return await interaction.editReply({embeds: [thing]});
        }
	
    }
};
