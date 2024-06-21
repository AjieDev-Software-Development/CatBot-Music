const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "node",
    category: "Information",
    description: "Check node information",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {
  
  
     const all = client.manager.nodes.map(node => 
            `SERVER AUDIO ${(node.options.identifier)}` +
            `\nPemain: ${node.stats.players}` +
            `\nPemain Bermain: ${node.stats.playingPlayers}` +
            `\nWaktu aktif: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
            `\n\nPenyimpanan` +
            `\nMemori yang Dipesan: ${Math.round(node.stats.memory.reservable / 1024 / 1024)} MiB` +
            `\nMemori yang Digunakan: ${Math.round(node.stats.memory.used / 1024 / 1024)} MiB` +
            `\nMemori Bebas: ${Math.round(node.stats.memory.free / 1024 / 1024)} MiB` +
            `\nMemori yang Dialokasikan: ${Math.round(node.stats.memory.allocated / 1024 / 1024)} MiB` +
            "\n\nCPU" +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nBeban Sistem: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nBeban Lavalink: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
        .setAuthor({
            name: 'Node Lavalink',
            iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
          })          
            .setDescription(`\`\`\`${all}\`\`\``)
            .setColor(client.embedColor)
        message.reply({embeds: [embed]})
    }
                                          }
