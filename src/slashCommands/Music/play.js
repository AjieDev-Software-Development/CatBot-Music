const { CommandInteraction, Client, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "play",
  description: "Untuk memutar beberapa lagu.",
  options: [
    {
      name: "input",
      description: "Input pencarian (nama/url)",
      required: true,
      type: "STRING"
    }
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    const botMember = interaction.guild.members.cache.get(client.user.id);

    if (!botMember.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Saya tidak memiliki cukup izin untuk menjalankan perintah ini! Tolong beri saya izin \`CONNECT\` atau \`SPEAK\`.`)
        ]
      });
    }

    const { channel } = interaction.member.voice;
    if (!botMember.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Saya tidak memiliki cukup izin untuk terhubung ke saluran suara Anda. Tolong beri saya izin \`CONNECT\` atau \`SPEAK\`.`)
        ]
      });
    }

    // Check if the user is not in a voice channel
    if (!interaction.member.voice.channel) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("You are not connected to a voice channel.")
        ]
      });
    }

    if (botMember.voice.channel && botMember.voice.channelId !== interaction.member.voice.channelId) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You are not connected to <#${botMember.voice.channelId}> to use this command.`)
        ]
      });
    }

    // Original emoji variables
      const emojiaddsong = client.emoji.addsong;
      const emojiplaylist = client.emoji.playlist;
      let search = interaction.options.getString("input");
      let res;
      
    
    let player = client.manager.create({
      guild: interaction.guildId,
      textChannel: interaction.channelId,
      voiceChannel: interaction.member.voice.channelId,
      selfDeafen: true,
      volume: 100
    });
    
      if (player.state != "CONNECTED") await player.connect();
      if (search.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get(client.config.nodes.id);
        let Searched = await node.load(search);

        switch (Searched.loadType) {
          case "LOAD_FAILED":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription('Gagal Memuat Daftar Putar.')]});

          case "NO_MATCHES":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription('tidak ada hasil yang ditemukan.')]});
            
          case "TRACK_LOADED":
            player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.user));
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
         const loadmusic = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Ditambahkan ke antrean** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
         .setFooter({ text: `Diminta oleh ${interaction.user.username}` })
         return await interaction.editReply({embeds: [loadmusic]});
           
          case "SEARCH_RESULT":
            player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.user));
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
             const searchmusic = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription(`${emojiplaylist} **Ditambahkan ke antrean** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
             .setFooter({ text: `Diminta oleh ${interaction.user.username}` })
            return await interaction.editReply({ embeds: [searchmusic] });
            
          case "PLAYLIST_LOADED":
            let songs = [];
            for (let i = 0; i < Searched.tracks.length; i++)
              songs.push(TrackUtils.build(Searched.tracks[i], interaction.user));
            player.queue.add(songs);
            if (
              !player.playing &&
              !player.paused &&
              player.queue.totalSize === Searched.tracks.length
            )
              player.play();
          const playlistload = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Menambahkan Daftar Putar ke antrian** [${Searched.playlistInfo.name}](${search}) - [\`${Searched.tracks.length}\`]`)
             .setFooter({ text: `Diminta oleh ${interaction.user.username}` })
         return await interaction.editReply({embeds: [playlistload]});
        }
      } else {
        try {
          res = await player.search(search);
          if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`:x: | **Terjadi kesalahan saat mencari**`)]});
          }
        } catch (err) {
          console.log(err)
        }
        switch (res.loadType) {
          case "NO_MATCHES":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("❌ | **Tidak ada hasil yang ditemukan.**")]});
          case "TRACK_LOADED":
            player.queue.add(res.tracks[0], interaction.user);
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
            const trackload = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription(`${emojiplaylist} Ditambahkan ke antrean [${res.tracks[0].title}](${res.tracks[0].uri}) - \`[${convertTime(res.tracks[0].duration)}]\``)
            .setFooter({ text: `Diminta oleh ${interaction.user.username}` });
             return await interaction.editReply({embeds: [trackload]});
           case "PLAYLIST_LOADED":
            player.queue.add(res.tracks);
            await player.play();
            
         const playlistloadds = new MessageEmbed()
    .setColor(client.embedColor)
    .setTimestamp();

const playlistName = res.playlist.name;
const playlistDuration = res.playlist.duration;

if (interaction.options && interaction.options.get("input")) {
    const searchInput = interaction.options.get("input").value;
    playlistloadds.setDescription(`${emojiplaylist} Daftar putar ditambahkan ke antrean [${playlistName}](${searchInput}) - \`[${convertTime(playlistDuration)}]\``);
} else {
    playlistloadds.setDescription(`${emojiplaylist} Daftar putar ditambahkan ke antrean [${playlistName}] - \`[${convertTime(playlistDuration)}]\``);
}

return await interaction.editReply({ embeds: [playlistloadds] });

          case "SEARCH_RESULT":
            const track = res.tracks[0];
            player.queue.add(track);
            
            if (!player.playing && !player.paused && !player.queue.length) {
               const searchresult = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setThumbnail(track.displayThumbnail("3"))
                .setDescription(`${emojiplaylist} Ditambahkan ke antrean [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]`)
               .setFooter({ text: `Diminta oleh ${interaction.user.username}` });
                
              player.play();
            return await interaction.editReply({embeds: [searchresult]});
            
            } else {
               const thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setThumbnail(track.displayThumbnail("3"))
                .setDescription(`${emojiplaylist} Ditambahkan ke antrean [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``)
               .setFooter({ text: `Diminta oleh ${interaction.user.username}` });
             
                return await interaction.editReply({embeds: [thing]});
          
            }
        }
      }
  }
}
