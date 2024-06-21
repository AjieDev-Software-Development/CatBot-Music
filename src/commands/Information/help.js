const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Help`)
    .setDescription(` Halo **<@${message.author.id}>**, Saya <@${client.user.id}>.  \n\nPemutar Audio Sederhana untuk Discord\nSelamat datang di Panel Bantuan!\n\n\<a:12:988753984267354143>\ ➤ Musik\n\<a:13:988754230691131452>\ ➤ Informasi\n\⚙️\ ➤ Konfigurasi\n\n *Pilih tombol kategori di bawah untuk melihat perintah bot* \n\n`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({
      text: `Diminta oleh ${message.author.tag}`,
      iconURL: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
    })
                
    let but1 = new MessageButton().setCustomId("home").setLabel("Home").setStyle("SUCCESS").setEmoji('🏘️')
  
    let but2 = new MessageButton().setCustomId("music").setLabel("Music").setStyle("PRIMARY").setEmoji('988753984267354143')
  
    let but3 = new MessageButton().setCustomId("info").setLabel("Info").setStyle("PRIMARY").setEmoji('988754230691131452');

    let but4 = new MessageButton().setCustomId("config").setLabel("Config").setStyle("PRIMARY").setEmoji('915229540182286356');

     let _commands;
     let editEmbed = new MessageEmbed();
     
    const m = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] });

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === message.author.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Hanya **${message.author.tag}** dapat menggunakan tombol ini, jika mau maka Anda harus menjalankan perintah lagi.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
		 if(!m) return;
        await m.edit({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
    });
    collector.on('collect', async (b) => {
        if(b.customId === "home") {
           if(!m) return;
           return await m.edit({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Musik").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Musik").setFooter({ text: `Total ${_commands.length} perintah musik.`});
           if(!m) return;
           return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "Info").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Informasi").setFooter({ text: `Total ${_commands.length} Perintah informasi.`})
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Konfigurasi").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Konfigurasi").setFooter({ text:`Total ${_commands.length} Perintah konfigurasi.`})
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         
        }
     });
   }
 }
