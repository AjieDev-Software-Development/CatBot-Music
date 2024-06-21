const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
  let own = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addFields({ name: 'Name', value: `\`${guild.name}\``})
    .addFields({ name: 'ID', value: `\`${guild.id}\``})
    .addFields({ name: 'Owner', value: `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``})
    .addFields({ name: 'Member Count', value: `\`${guild.memberCount}\` Members`})
    .addFields({ name: 'Creation Date', value: `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``})
    .setColor(client.embedColor)
    .addFields({ name: `${client.user.username}'s Server Count`, value: `\`${client.guilds.cache.size}\` Severs`})
    .setTimestamp()
    channel.send({embeds: [embed]})
	
}
