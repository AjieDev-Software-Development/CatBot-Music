const { MessageEmbed, Permissions } = require("discord.js");
const pre= require("../../schema/prefix.js");

module.exports = async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress =  await pre.findOne({guildid: message.guild.id})
   if(ress && ress.prefix)prefix = ress.prefix;
   
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**› Prefix-ku di server ini adalah \`${prefix}\`**\n**› Anda dapat melihat semua jenis perintah saya \`${prefix}\`help**`);
      message.channel.send({embeds: [embed]})
    };
   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `Saya tidak punya izin **\`SEND_MESSAGES\`** untuk masuk <#${message.channelId}> mengeksekusi **\`${command.name}\`**.` }).catch(() => {});

    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `Saya tidak punya izin **\`EMBED_LINKS\`** izin untuk menjalankan perintah **\`${command.name}\`** ini.` }).catch(() => {});
    
    const embed = new MessageEmbed()
        .setColor("RED");

    // args: true,
    if (command.args && !args.length) {
        let reply = `Anda tidak memberikan argumen apa pun, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nPenggunaan: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("Anda tidak dapat menggunakan perintah ini.");
        return message.channel.send({embeds: [embed]});
    }
   if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
        return channel.send({ content: `Kesalahan: Saya memerlukan izin \`EMBED_LINKS\` untuk bekerja.` });
      }
    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Hanya <@867303900884893727> dapat menggunakan perintah ini!");
        return message.channel.send({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("Tidak ada pemain untuk guild ini.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setDescription("Anda harus berada di Voice Channel");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel) {
    if(message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
            embed.setDescription(`Anda harus berada di saluran yang sama dengan ${message.client.user}!`);
            return message.channel.send({embeds: [embed]});
        }
    }
}

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("Terjadi kesalahan saat menjalankan perintah itu.\nSaya telah menghubungi pemilik bot untuk segera memperbaikinya.");
        return message.channel.send({embeds: [embed]});
    }
  }
