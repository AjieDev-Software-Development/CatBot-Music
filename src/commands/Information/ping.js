const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
  await message.reply({ content: "Pinging..." }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
  .setAuthor({
    name: "Got a response! Here's the result...",
    iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
  })  
    .setColor(client.embedColor)
    .addFields({ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true })
    .addFields({ name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true })
    .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
      })
      
    .setTimestamp();

  await msg.edit({
    content: "\`Pong!!🏓\`",
    embeds: [PingEmbed]
  })
 })
 }
}