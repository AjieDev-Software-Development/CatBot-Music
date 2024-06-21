const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Dapatkan tautan undangan saya",

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
            .setThumbnail('https://cdn.discordapp.com/app-icons/978900995386011718/bd441dbc9821a0e9a66af3b875014bdc.png')
             .setColor('#303236')
             .addFields({ name: 'Maukah kamu mendengarkan musik bersamaku?', value: `[Undang Saya ke server Anda!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)` } )
           await interaction.followUp({embeds: [mainPage], components: [row]})
    }
		}