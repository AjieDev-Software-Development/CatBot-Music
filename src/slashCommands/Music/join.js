const { MessageEmbed, CommandInteraction, Client, Permissions } = require("discord.js")

module.exports = {
  name: "join",
  description: "Bergabung dengan Voice Channel",
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
      const botMember = interaction.guild.members.cache.get(client.user.id);
      if(!botMember.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
      const { channel } = interaction.member.voice;
      if(!botMember.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
      if(!botMember.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command.`)]});
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)]});

    const emojiJoin = client.emoji.join;

    if (!botMember.voice.channel) {

      const player = client.manager.create({
        guild: interaction.guildId,
        textChannel: interaction.channelId,
        voiceChannel: interaction.member.voice.channelId,
        selfDeafen: true,
        volume: 100
      });


      player.connect();
     
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiJoin} **Bergabung dengan Voice Channel**\nTersambung <#${channel.id}> dan di bound di <#${interaction.channel.id}>`)
      return interaction.editReply({ embeds: [thing] });

    } else if (botMember.voice.channel !== channel) {

      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Anda harus berada di channel yang sama dengan ${interaction.client.user}`);
      return interaction.editReply({ embeds: [thing] });
    }

  }
};
