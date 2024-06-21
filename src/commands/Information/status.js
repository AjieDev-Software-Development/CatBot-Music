const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    category: "Information",
    aliases: [ "stats" ],
    description: "Show status bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const duration1 = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        const about = message.client.emoji.about;
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
        const embed = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setDescription(`
${about}**Status**
**= STATISTIK =**
**• Servers** : ${scount}
**• Channels** : ${ccount}
**• Pengguna** : ${mcount}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Platfrom** : ${os.type}
**• Waktu aktif** : ${duration1}
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Jumlah Memori** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} MiB
> **• Memori Bebas** : ${(os.freemem() / 1024 / 1024).toFixed(2)} MiB
> **• Jumlah Heap** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MiB
> **• Penggunaan Heap** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MiB
`);
         message.reply({embeds: [embed]});
    }
	}