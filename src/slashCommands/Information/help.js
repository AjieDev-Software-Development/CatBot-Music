const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "help",
    description: "Butuh bantuan? , jangan khawatir tekan enter sekarang!",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {
        await interaction.deferReply({
          ephemeral: false
        });
  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Help`)
    .setDescription(` Halo **<@${interaction.member.user.id}>**, Saya <@${client.user.id}>.  \n\nPemutar Audio Sederhana untuk Discord\nSelamat datang di Panel Bantuan!\n\n\<a:12:988753984267354143>\ ➤ Musik\n\<a:13:988754230691131452>\ ➤ Informasi\n\⚙️\ ➤ Konfigurasi\n\n *Pilih tombol kategori di bawah untuk melihat perintah bot* \n\n`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({
      text: `Requested by: ${interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({ dynamic: true, format: 'png' })
    })
    
    
    let but1 = new MessageButton().setCustomId("home").setLabel("Home").setStyle("SUCCESS").setEmoji('🏘️')
  
    let but2 = new MessageButton().setCustomId("music").setLabel("Music").setStyle("PRIMARY").setEmoji('988753984267354143')
  
    let but3 = new MessageButton().setCustomId("info").setLabel("Info").setStyle("PRIMARY").setEmoji('988754230691131452');

    let but4 = new MessageButton().setCustomId("config").setLabel("Config").setStyle("PRIMARY").setEmoji('915229540182286356');

     let _commands;
     let editEmbed = new MessageEmbed();
     
     await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === interaction.member.user.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Hanya **${interaction.member.user.tag}** dapat menggunakan tombol ini, jika mau maka Anda harus menjalankan perintah lagi.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
        await interaction.editReply({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
     });
    collector.on('collect', async (b) => {
        if(b.customId === "home") {
           return await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Musik").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Musik").setFooter({ text: `Total ${_commands.length} perintah musik.` });
             ;
 
           return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "Informasi").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Informasi").setFooter({ text: `Total ${_commands.length} Perintah informasi.`})
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Konfigurasi").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Perintah Konfigurasi").setFooter({ text: `Total ${_commands.length} Perintah konfigurasi.`})
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         
        }
     });
   }
 }
