const { MessageEmbed, Client } = require("discord.js")
const pre= require("../../schema/prefix.js");

module.exports = async (client, interaction) => {
   
    let prefix = client.prefix;
    const ress =  await pre.findOne({guildid: interaction.guildId})
    if(ress && ress.prefix)prefix = ress.prefix;
   
    let color = client.embedColor;
     
     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        const guild = interaction.guild;
        const botMember = await guild.members.fetch(client.user);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.editReply({
          content: `Only <@867303900884893727> can use this command!`
        }).catch(() => {});
        }
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.player && !player) {
          await interaction.editReply({
                    content: `There is no player for this guild.`
                }).catch(() => {});
        }
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `You must be in a voice channel!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== botMember.voice.channel) { 
           await interaction.editReply({
                    content: `You must be in the same channel as ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
    await SlashCommands.run(client, interaction, prefix);
} catch (error) {
    console.error('Unexpected error:', error);

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';

    if (interaction.replied) {
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setTitle("Unexpected Error occurred!")
                    .setDescription("Please make sure you are in the correct Voice Channel and have the correct Bot Permissions.")
                    .addFields({ name: 'Error Details', value: errorMessage})
                    // Add more fields or customize as needed
            ]
        }).catch(() => {});
    } else {
        await interaction.followUp({
            ephemeral: true,
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setTitle("Unexpected Error occurred!")
                    .setDescription("Please make sure you are in the correct Voice Channel and have the correct Bot Permissions.")
                    .addFields({ name: 'Error Details', value: errorMessage})
                    // Add more fields or customize as needed
            ]
        }).catch(() => {});
    }
}
}

}
