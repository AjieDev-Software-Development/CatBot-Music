const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "about",
    description: "Show CatBot(Music) info",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
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
            .setThumbnail('https://ajieblogs.eu.org/dl/img/petv2.png')
            .setColor('#303236')
            .addFields(
                { name: 'Developer/Maintainer', value: '[AjieDev a.k.a AjieG](https://github.com/AjieDev)', inline: true },
                { name: 'Made Using', value: 'NodeJS', inline: true },
                { name: 'Hosted with', value: '**VPS Server**', inline: true },
                { name: '\u200b', value: 'CatBot Music is A Simple Audio Player for Discord, and its Free to use.' }
            )
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}
