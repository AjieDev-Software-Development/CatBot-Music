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
            `Node ${(node.options.identifier)}` +
            `\nPlayer: ${node.stats.players}` +
            `\nPlaying Players: ${node.stats.playingPlayers}` +
            `\nUptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
            `\n\nMemory` +
            `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)} MiB` +
            `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)} MiB` +
            `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)} MiB` +
            `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)} MiB` +
            "\n\nCPU" +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
        .setAuthor({
            name: 'Lavalink Node',
            iconURL: client.user.displayAvatarURL({ dynamic: true, format: 'png' })
          })          
            .setDescription(`\`\`\`${all}\`\`\``)
            .setColor(client.embedColor)
        message.reply({embeds: [embed]})
    }
                                          }
