const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "invite",
    description: "get my invite link",

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
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
			new MessageButton()
    .setLabel("YouTube Channel")
    .setStyle("LINK")
    .setURL("https://youtube.com/AJI345ID"),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setURL("https://dsc.gg/ajidevserver")
			);

            const mainPage = new MessageEmbed()
            .setAuthor({
                name: 'CatBot Music',
                iconURL: 'https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png'
              })
            .setThumbnail('https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png')
             .setColor('#303236')
             .addFields({ name: 'Do you want to hear music with me?', value: `[Invite Me to your server!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)` } )
           await interaction.followUp({embeds: [mainPage], components: [row]})
    }
		}