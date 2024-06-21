const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose')
module.exports = {
    name: "setprefix",
    description: "Tetapkan Prefix untuk bot default: `cbm!`" ,   options: [
    {
      name: "prefix",
      description: "Tetapkan Prefix untuk bot default: `cbm!`",
      required: true,
      type: "STRING"
		}
	],

  
  execute: async (message, args, client) => {
      
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('Anda harus memiliki izin `MANAGE GUILD` untuk menggunakan perintah ini.');
    if (!args[0]) {
    const embed = new MessageEmbed()
        .setDescription("Silakan berikan prefix yang ingin Anda atur!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }

    if (args[1]) {
       const embed = new MessageEmbed()
        .setDescription("Anda tidak dapat menetapkan prefix argumen ganda")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }

    if (args[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("Anda tidak dapat mengirim prefix lebih dari 3 karakter")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }

    const res = await pre.findOne({ guildid: message.guild.id })
      let prefix = args.join(" ");
      let p;
      if (!res) p = ">"
      else p = res.prefix;
      const noperms = new MessageEmbed()
        .setColor("#651FFF")
        .setDescription(`Prefix untuk server ini adalah \`${p}\``)
      let newprefix = args.join(" ");
      if (!args[0]) return message.reply({embeds: [noperms]});
      else {
        pre.findOne({ guildid: message.guild.id }).then(result => {
          let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            guildid: message.guild.id,
            prefix: prefix
          })
          let send = new MessageEmbed()
            .setDescription(`Mengubah prefix menjadi \`${newprefix}\``)
            .setTimestamp()
            .setColor("#651FFF")
          message.reply({embeds: [send]});
          if (!result || result == []) {
            duck.save().catch(console.error);
          } else {
            pre.deleteOne({ guildid: message.guild.id }).catch(console.error)
            duck.save().catch(console.error)
          }
      })}
   }
}
