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
      
  await message.reply({ content: "<a:loading:1149237433859330098> Memproses..." }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
  .setAuthor({
    name: "Mendapat tanggapan! Inilah hasilnya...",
    iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
  })  
    .setColor(client.embedColor)
    .addFields({ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true })
    .addFields({ name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true })
    .setFooter({
        text: `Diminta oleh ${message.author.username}`,
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