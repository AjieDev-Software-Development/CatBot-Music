const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: [ "addme" ],
    description: "Giving your invite link CatBot Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=544655015377&scope=applications.commands%20bot`),
			new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL("https://dsc.gg/ajidevserver"),
    new MessageButton()
    .setLabel("Service Status")
    .setStyle("LINK")
    .setURL("https://stat.ajieblogs.eu.org")
			);

      const mainPage = new MessageEmbed()
      .setAuthor({
        name: 'CatBot Music',
        iconURL: 'https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png'
      })      
      .setThumbnail('https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png')
       .setColor('#303236')
      .addFields({ name: 'Do you want to hear music with me?', value: `[Invite Me to your server!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)` } )
           message.reply({embeds: [mainPage], components: [row]})
    }
				}