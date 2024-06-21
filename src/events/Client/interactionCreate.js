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
          content: `Hanya <@867303900884893727> dapat menggunakan perintah ini!`
        }).catch(() => {});
        }
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.player && !player) {
          await interaction.editReply({
                    content: `Tidak ada pemain untuk guild ini.`
                }).catch(() => {});
        }
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `Anda harus berada di saluran suara!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== botMember.voice.channel) { 
           await interaction.editReply({
                    content: `Anda harus berada di saluran yang sama dengan ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
    await SlashCommands.run(client, interaction, prefix);
} catch (error) {
    console.error('Kesalahan tak terduga:', error);

    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak terduga.';

    if (interaction.replied) {
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setTitle("[UXP ERR] Terjadi Kesalahan Tak Terduga!")
                    .setDescription("Pastikan Kamu berada di Voice Channel yang benar dan memiliki Izin Bot yang benar ya! | Silahkan laporkan ke admin jika masalah ini terjadi...")
                    .addFields({ name: 'Detil kesalahan', value: errorMessage})
                    // Add more fields or customize as needed
            ]
        }).catch(() => {});
    } else {
        await interaction.followUp({
            ephemeral: true,
            embeds: [
                new MessageEmbed()
                    .setColor(client.embedColor)
                    .setTitle("[UXP ERR] Terjadi Kesalahan Tak Terduga!")
                    .setDescription("Pastikan Kamu berada di Voice Channel yang benar dan memiliki Izin Bot yang benar ya! | Silahkan laporkan ke admin jika masalah ini terjadi...")
                    .addFields({ name: 'Detil Kesalahan', value: errorMessage})
                    // Add more fields or customize as needed
            ]
        }).catch(() => {});
    }
}
}

}
