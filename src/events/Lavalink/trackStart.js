const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
    
module.exports = async (client, player, track, payload) => {
  const emojiplay = client.emoji.play;
  
  const thing = new MessageEmbed()
    .setDescription(`<a:playing:1149237828581068850> **Playing**\n [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``)
    .setThumbnail(track.displayThumbnail("3"))
    .setColor(client.embedColor)
    .setTimestamp()
   const But1 = new MessageButton().setCustomId("vdown").setEmoji("🔉").setStyle("SECONDARY");
    
   const But2 = new MessageButton().setCustomId("stop").setEmoji("⏹️").setStyle("DANGER");

   const But3 = new MessageButton().setCustomId("pause").setEmoji("⏯️").setStyle("SUCCESS");

   const But4 = new MessageButton().setCustomId("skip").setEmoji("⏭️").setStyle("PRIMARY");
    
   const But5 = new MessageButton().setCustomId("vup").setEmoji("🔊").setStyle("SECONDARY");
   
   const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);
   
  let NowPlaying = await client.channels.cache
    .get(player.textChannel)
    .send({ embeds: [thing], components: [row] });
  player.setNowplayingMessage(NowPlaying);
  
  const collector = NowPlaying.createMessageComponentCollector({
    filter: (b) => {
      if(b.guild.me.voice.channelId && b.guild.me.voice.channelId === b.member.voice.channelId) return true;
      else {
        b.reply({content: `You are not connected to ${b.guild.me.voice.channelId} to use this interactions.`, ephemeral: true}); return false;
        };
     },
     time: track.duration,
      });
        collector.on("collect", async (i) => {
            if (i.customId === "vdown") {
               if (!player) {
                 return collector.stop();
               }
              let amount = Number(player.volume) - 10;
               await player.setVolume(amount);
              i.reply({content: `Volume set to ${amount} `, ephemeral: true});
           } else if (i.customId === "stop") {
                if (!player) {
                    return collector.stop();
                }
                await player.stop();
                await player.queue.clear();
                i.reply({content: "Music Is Stopped", ephemeral: true});
                return collector.stop();
            } else if (i.customId === "pause") {
                if (!player) {
                    return collector.stop();
                }
                player.pause(!player.paused);
                const Text = player.paused ? "paused" : "resume";
                i.reply({content: `I have ${Text} the music!`, ephemeral: true});
            } else if (i.customId === "skip") {
                if (!player) {
                    return collector.stop();
                }
                await player.stop();
                i.reply({content: "Music skipped!", ephemeral: true});
                if (track.length === 1) {
                    return collector.stop();
                }
            } else if (i.customId === "vup") {
               if (!player) {
                 return collector.stop();
               }
               let amount = Number(player.volume) + 10;
            if(amount >= 150) return i.reply({ content: `Volume has ben set to maximum.`, ephemeral: true });
               await player.setVolume(amount);
               i.reply({content: `Volume set to ${amount} `, ephemeral: true});
                return;
            }
      });
}
