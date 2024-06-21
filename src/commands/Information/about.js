const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: [ "botinfo" ],
    description: "See about CatBot Music (Plus)",
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
    .setLabel("Dukungan")
    .setStyle("LINK")
    .setURL("https://dsc.gg/ajidevserver"),
    new MessageButton()
    .setLabel("Status Layanan")
    .setStyle("LINK")
    .setURL("https://stat.ajieblogs.eu.org")
			);
            const mainPage = new MessageEmbed()
            .setAuthor({
                name: 'CatBot Music',
                iconURL: 'https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png'
              })              
            .setThumbnail('https://ajieblogs.eu.org/dl/img/petv2.png')
            .setColor('#303236')
            .addFields({ name: 'Pengembang/Pengelola', value: '[AjieDev a.k.a AjieG](https://github.com/AjieDev)', inline: true})
            .addFields({ name:'Dibuat Menggunakan', value: 'Node.js', inline: true})
            .addFields({ name:'Dihosting dengan', value: '**VPS Server**', inline: true})
            .addFields({ name:'\u200b', value: `CatBot Music adalah Pemutar Audio Sederhana untuk Discord, dan Gratis untuk digunakan.`}
            )
        return message.reply({embeds: [mainPage], components: [row]});
    }
}